import { Alert, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet, View, Image, ScrollView } from "react-native";
import React ,{useState}  from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { add, remove, dateStamp, update, setPhoto, removePhoto } from "../redux/FriendListSlice";
import convertUTCToLocalTime from "../functions/DateConversion";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';




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
        Alert.alert('Not allowed to use the camera!')
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
      if (image) {dispatch(setPhoto({image: image, id: id}));}
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
      hideDatePicker();
    };
  

    return (
        <SafeAreaView>
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
              <Image style={styles.imageStyle} resizeMode='contain' source={(currentEntry.image) ? currentEntry.image : require('../assets/emptyAvatar3.png')} />
              {!editMode ? 
                <Text style={styles.titleText}>{currentEntry.firstName}'s Profile</Text> : 
                  <View style={styles.titleLine}>
                    <Text style={styles.titleText}>{currentEntry.firstName}'s Profile</Text>
                    <View style={styles.imageButtonContainer}>
                    <TouchableOpacity style={styles.imageButton} onPress={() => takeImageHandler(currentEntry.id)}><Text style={styles.buttonText}>Select Photo</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.imageButton} onPress={() => dispatch(removePhoto({id: currentEntry.id}))}><Text style={styles.buttonText}>Remove Photo</Text></TouchableOpacity>
                    </View>
                  </View>
              }
              {!editMode ? 
                <Text style={styles.profileText}>First Name: {currentEntry.firstName}</Text> : 
                  <View style={styles.editLine}>
                    <Text style={styles.profileText}>First Name: </Text><TextInput 
                    value={newFirstName}
                    onChangeText={onChangeNewFirstName}
                    style={styles.profileTextInput} >
                    </TextInput>
                  </View>
              }
              {!editMode ? 
                <Text style={styles.profileText}>Last Name: {currentEntry.lastName}</Text> : 
                  <View style={styles.editLine}>
                    <Text style={styles.profileText}>Last Name: </Text><TextInput 
                    value={newLastName}
                    onChangeText={onChangeNewLastName}
                    style={styles.profileTextInput} >
                    </TextInput>
                  </View>
              }
              {!editMode ? 
                <Text style={styles.profileText}>Phone Number: {currentEntry.phoneNumber}</Text> : 
                  <View style={styles.editLine}>
                    <Text style={styles.profileText}>Phone Number: </Text><TextInput 
                    value={newPhoneNumber}
                    onChangeText={onChangeNewPhoneNumber}
                    style={styles.profileTextInput} >
                    </TextInput>
                  </View>
              }
              {!editMode ? 
                <Text style={styles.profileText}>Last Contact Date: {convertUTCToLocalTime(currentEntry.date)}</Text> :
                <View style={styles.editLine}>
                  <Text style={styles.profileText}>Last Contact Date: {convertUTCToLocalTime(newDate)}</Text><TouchableOpacity style={styles.stamp} onPress={showDatePicker}><Text style={styles.buttonText}>Edit Date</Text></TouchableOpacity>
                </View>
              }
              <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.stamp} onPress={() => dispatch(dateStamp({date: new Date().toISOString(), id: currentEntry.id}))}><Text style={styles.buttonText}>Quick Stamp</Text></TouchableOpacity>
              <TouchableOpacity style={styles.stamp} onPress={() => showConfirmDialog(currentEntry.id)}><Text style={styles.buttonText}>Remove Friend</Text></TouchableOpacity>
              {!editMode ? <TouchableOpacity style={styles.stamp} onPress={() => toggleEditMode()}><Text style={styles.buttonText}>Edit Friend</Text></TouchableOpacity> :
                <TouchableOpacity style={styles.stamp} onPress={() => {
                  dispatch(update({firstName: newFirstName, lastName: newLastName, phoneNumber: formatPhoneNumber(newPhoneNumber), date: newDate.toISOString(), id: currentEntry.id}));
                  toggleEditMode()
                }}><Text style={styles.buttonText}>Save Friend</Text></TouchableOpacity>
              }
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
        height:'95%',
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor:'#88BBD6',
    },
    
    scrollContainer: {
      height:'100%',
      width: '100%',
      backgroundColor: '#88BBD6',
    },

    profileText: {
        margin: 10,
        fontSize: 20,
    },
    
    titleText: {
      margin: 10,
      fontSize: 25,
    },

    profileTextInput: {
      fontSize: 20,
      borderWidth: 1, 
      padding: 5, 
      width: 180
    },

    stamp: {
        margin:5,
        height:60,
        width:80,
        flex: 1,
        backgroundColor:'#99D3DF',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 10,
        borderWidth:1,
    },

    editLine: {
      flexDirection: "row",
      alignItems: 'center'
    },

    
    titleLine: {
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: "space-between",
      width: '100%'
    },

    buttonRow: {
      flexDirection: 'row',
    },

    buttonText: {
      fontSize: 20,
      paddingHorizontal: 13,
      textAlign: 'center'
    },

    imageStyle: {
      flex: 1,
      width: '60%',
      height: 200,
      alignSelf: 'center'
    },

    imageButton: {
      margin:5,
      height:60,
      width:100,
      backgroundColor:'#99D3DF',
      justifyContent:'center',
      alignItems:'center',
      borderRadius: 10,
      borderWidth:1,
    },

    imageButtonContainer: {
      flexDirection: 'row',
    }
  });
  