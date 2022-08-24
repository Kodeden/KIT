import { Alert, Text, SafeAreaView, ImageBackground, TextInput, StyleSheet, View, Image, ScrollView } from "react-native";
import React ,{useState}  from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { add, remove, dateStamp, update, setPhoto, removePhoto } from "../redux/FriendListSlice";
import convertUTCToLocalTime from "../functions/DateConversion";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { launchCameraAsync, useCameraPermissions, PermissionStatus, launchImageLibraryAsync, useMediaLibraryPermissions } from 'expo-image-picker';
import AntDesign from "react-native-vector-icons/AntDesign";




export default function Profile({ route }) {

    const showConfirmDialog = (id) => {
      return Alert.alert(
        "Confirm Remove Friend",
        "Are you sure you want to remove this friend?",
        [
          {
            text: "Yes",
            onPress: () => {
                navigation.navigate("Home");
                dispatch(remove(id));
            },
          },
          {
            text: "No",
          },
        ]
      );
    };

    const formatPhoneNumber = (phoneNumberString) => {
      var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
      var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
      if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3]
      }
      return null
    }

    const [editMode, setEditMode] = useState(false);
    const toggleEditMode = () => {
      setEditMode(!editMode);
    }

    const [cameraPermissionStatus, requestPermission] = useCameraPermissions()

    async function verifyPermissions(){
      if(cameraPermissionStatus.status === PermissionStatus.UNDETERMINED) {
        const permissionResponse = await requestPermission()
        return permissionResponse.granted
      }
  
      if(cameraPermissionStatus.status === PermissionStatus.DENIED){
        Alert.alert('Camera permissions are currently denied for this application.')
        return false
      }
  
      return true
    }

    async function takeImageHandler(id) {
      const hasPermission = await verifyPermissions()
      if(!hasPermission) return
      const image = await launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 16],
        quality: 0.5,
      })
      if (image.cancelled !== true) {dispatch(setPhoto({image: image, id: id}));}
    }

    const navigation = useNavigation();
    const list = useSelector((state) => state.friendList);
    const dispatch = useDispatch();
    const id = route.params?.id || 0;
    const currentEntry = list.find(entry => entry.id === id);
    const [newFirstName, onChangeNewFirstName] = useState(currentEntry.firstName);
    const [newLastName, onChangeNewLastName] = useState(currentEntry.lastName);
    const [newPhoneNumber, onChangeNewPhoneNumber] = useState(currentEntry.phoneNumber);
    const [newDate, onChangeNewDate] = useState(new Date(currentEntry.date));
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
    const handleConfirm = (date) => {
      onChangeNewDate(date);
      dispatch(update({id: currentEntry.id, date: new Date(date).toISOString()}));
      hideDatePicker();
    };
  

    return (
        <SafeAreaView>
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
              <View style={styles.profileContainer}>
                <ImageBackground style={styles.imageStyle} resizeMode='cover' source={(currentEntry.image) ? currentEntry.image : require('../assets/emptyAvatar4.png')}>
                  {editMode ? <AntDesign name="delete" style={styles.icon} onPress={() => dispatch(removePhoto({id: currentEntry.id}))} /> : null}
                  {(editMode || !currentEntry.image) ? <AntDesign name="camera" style={styles.icon} onPress={() => takeImageHandler(currentEntry.id)} /> : null}
                </ImageBackground>
                <View style={styles.titleLine}>
                  <Text style={styles.titleText}>{currentEntry.firstName}'s Profile</Text>
                  <View style={styles.buttonRow}>
                    <AntDesign name="edit" style={styles.icon} onPress={() => toggleEditMode()} />
                    <AntDesign name="deleteuser" style={styles.icon} onPress={() => showConfirmDialog(currentEntry.id)} />
                  </View>
                </View>
              {!editMode ? 
                <Text style={styles.profileText}>First Name: {currentEntry.firstName}</Text> : 
                  <View style={styles.editLine}>
                    <Text style={styles.editLineText}>First Name: </Text><TextInput 
                    value={newFirstName}
                    onChangeText={e => {
                      onChangeNewFirstName(e);
                      dispatch(update({id: currentEntry.id, firstName: e}))
                    }}
                    style={styles.editLineTextInput} >
                    </TextInput>
                  </View>
              }
              {!editMode ? 
                <Text style={styles.profileText}>Last Name: {currentEntry.lastName}</Text> : 
                  <View style={styles.editLine}>
                    <Text style={styles.editLineText}>Last Name: </Text><TextInput 
                    value={newLastName}
                    onChangeText={e => {
                      onChangeNewLastName(e);
                      dispatch(update({id: currentEntry.id, lastName: e}))
                    }}
                    style={styles.editLineTextInput} >
                    </TextInput>
                  </View>
              }
              {!editMode ? 
                <Text style={styles.profileText}>Phone Number: {currentEntry.phoneNumber}</Text> : 
                  <View style={styles.editLine}>
                    <Text style={styles.editLineText}>Phone Number: </Text><TextInput 
                    value={newPhoneNumber}
                    onChangeText={e => {
                      onChangeNewPhoneNumber(e);
                      dispatch(update({id: currentEntry.id, phoneNumber: formatPhoneNumber(e)}))
                    }}
                    style={styles.editLineTextInput} >
                    </TextInput>
                  </View>
              }
              <View style={styles.editLine}>
                  <Text style={styles.profileText}>Last Contact Date: {convertUTCToLocalTime(newDate)}</Text>
                  <AntDesign name="sync" style={styles.icon} onPress={() => dispatch(dateStamp({date: new Date().toISOString(), id: currentEntry.id}))} />
                  <AntDesign name="calendar" style={styles.icon} onPress={showDatePicker} />
              </View>
            </View>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    height:'100%',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
},

scrollContainer: {
  height:'100%',
  width: '100%',
  backgroundColor: '#001525',
},

buttonContainer: {
  width: '100%',
  justifyContent:'flex-end',
  flex: 2,
},

profileContainer: {
  flex: 3,
  backgroundColor:'#001525',
  width: '100%',
},

profileText: {
    margin: 10,
    fontSize: 20,
    color: '#DDD'
},

titleText: {
  margin: 10,
  fontSize: 25,
  color: '#DDD'
},

stamp: {
    margin:5,
    height:60,
    width:60,
    backgroundColor:'#99D3DF',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 10,
    borderWidth:1,
},

icon: {
    fontSize: 30,
    backgroundColor: '#DDD',
    borderRadius: 5,
    margin: 5,
    padding: 3,
},

editLine: {
  flexDirection: "row",
  alignItems: 'center'
},

editLineText: {
  flex:2,
  alignItems: 'center',
  margin: 10,
  fontSize: 20,
  color: '#DDD'
},

editLineTextInput: {
  flex: 3,
  fontSize: 20,
  borderWidth: 1, 
  padding: 5, 
  marginHorizontal: 5,
  color: '#DDD',
  borderColor: '#DDD'
},

titleLine: {
  flexDirection: "row",
  alignItems: 'center',
  justifyContent: "space-between",
  width: '100%'
},

buttonRow: {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center'
},

buttonText: {
  fontSize: 20,
  paddingHorizontal: 13,
  textAlign: 'center'
},

imageStyle: {
  flex: 1,
  width: 200,
  height: 250,
  alignSelf: 'center',
  alignItems: 'flex-start',
  justifyContent: 'flex-end',
  flexDirection: 'row',
},

imageButtonContainer: {
  flexDirection: 'row',
}
  });
  