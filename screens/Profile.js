import { Alert, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet, View } from "react-native";
import React ,{useState}  from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { add, remove, dateStamp, update } from "../redux/FriendListSlice";
import convertUTCToLocalTime from "../functions/DateConversion";
import DateTimePickerModal from "react-native-modal-datetime-picker";



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

    const [editMode, setEditMode] = useState(false);
    const toggleEditMode = () => {
      setEditMode(!editMode);
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
            <View style={styles.container}>
                <Text style={styles.profileText}>{currentEntry.firstName}'s Profile</Text>
                {!editMode ? 
                  <Text style={styles.profileText}>First Name: {currentEntry.firstName}</Text> : 
                    <View style={styles.editLine}>
                      <Text style={styles.profileText}>First Name: </Text><TextInput 
                      value={newFirstName}
                      onChangeText={onChangeNewFirstName}
                      style={{borderWidth:1, padding:3, width:120}} >
                      </TextInput>
                    </View>
                }
                {!editMode ? 
                  <Text style={styles.profileText}>Last Name: {currentEntry.lastName}</Text> : 
                    <View style={styles.editLine}>
                      <Text style={styles.profileText}>Last Name: </Text><TextInput 
                      value={newLastName}
                      onChangeText={onChangeNewLastName}
                      style={{borderWidth:1, padding:3, width:120}} >
                      </TextInput>
                    </View>
                }
                {!editMode ? 
                  <Text style={styles.profileText}>Phone Number: {currentEntry.phoneNumber}</Text> : 
                    <View style={styles.editLine}>
                      <Text style={styles.profileText}>Phone Number: </Text><TextInput 
                      value={newPhoneNumber}
                      onChangeText={onChangeNewPhoneNumber}
                      style={{borderWidth:1, padding:3, width:120}} >
                      </TextInput>
                    </View>
                }
                {!editMode ? 
                  <Text style={styles.profileText}>Last Contact Date: {convertUTCToLocalTime(currentEntry.date)}</Text> :
                  <View style={styles.editLine}>
                    <Text style={styles.profileText}>Last Contact Date: {convertUTCToLocalTime(newDate)}</Text><TouchableOpacity style={styles.stamp} onPress={showDatePicker}><Text>Edit Date</Text></TouchableOpacity>
                  </View>
                }
                <TouchableOpacity style={styles.stamp} onPress={() => dispatch(dateStamp({date: new Date().toISOString(), id: currentEntry.id}))}><Text>Quick</Text><Text>Stamp</Text></TouchableOpacity>
                <TouchableOpacity style={styles.stamp} onPress={() => showConfirmDialog(currentEntry.id)}><Text>Remove Friend</Text></TouchableOpacity>
                {!editMode ? <TouchableOpacity style={styles.stamp} onPress={() => toggleEditMode()}><Text>Edit Friend</Text></TouchableOpacity> :
                  <TouchableOpacity style={styles.stamp} onPress={() => {
                    dispatch(update({firstName: newFirstName, lastName: newLastName, phoneNumber: newPhoneNumber, date: newDate.toISOString(), id: currentEntry.id}));
                    toggleEditMode()
                  }}><Text>Save Friend</Text></TouchableOpacity>
                }
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height:'95%',
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor:'#88BBD6',
    },

    profileText: {
        margin: 10,
    },

    stamp: {
        margin:5,
        height:40,
        width:80,
        backgroundColor:'#99D3DF',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 10,
        borderWidth:1,
    },

    editLine: {
      flexDirection: "row",
    }
  });
  