import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Image,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { uploadImageAsync } from "../uploadImageAsync";

export default function UsersEdit({ route }) {
  const { item, documentId } = route.params;
  const [Username, setusername] = useState(item?.username);
  const [email, setEmail] = useState(item?.email);
  const [linetoken, setLineToken] = useState(item?.LineToken);
  const [role, setRole] = useState(item?.Role);
  const [image, setImage] = useState(item?.image_url);

  const handleConfirmationRole = (itemValue) => {
    Alert.alert(
      "Confirm change",
      "Are you sure you want to change this data ?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => handleunitChange(itemValue),
        },
      ],
      { cancelable: false }
    );
  };
  const handleunitChange = (itemValue) => {
    setRole(itemValue);
  };

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
      console.log(result.assets[0].uri);
    }
  };

  async function addItem() {
    const docRef = doc(db, "Myfridge", auth.currentUser.uid);
    const imageUrl = await uploadImageAsync(image);

    try {
      await updateDoc(docRef, {
        username: itemusername,
        Time_End: setEmail,
        image_url: imageUrl,
      });
      console.log("Document updated successfully");
    } catch (error) {
      console.log(error);
      console.error("Error updating document: ", error);
    }
    setItemName("");
    setQuantity("");
    setImage(null);
    setSelectedDate(new Date());
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Add an item</Text>
          <TouchableOpacity style={styles.closeButton}>
            <Text>X</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: 100, height: 100 }}
            />
          ) : (
            <Text>Add Photo</Text>
          )}
        </TouchableOpacity>

        <Picker
          selectedValue={role}
          style={styles.picker}
          onValueChange={handleConfirmationRole}
        >
          <Picker.Item label="User" value="User" />
          <Picker.Item label="Admin" value="Admin" />
        </Picker>

        <TextInput style={styles.input} value={item.id} editable={false} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={Username}
          onChangeText={setusername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput style={styles.input} value={linetoken} editable={false} />

        <Pressable style={styles.button} onPress={addItem}>
          <Text style={styles.text}>Update User</Text>
        </Pressable>
        {/* <Button
        title="Add item"
        onPress={() => console.log(selectedDate + "AddItemScreen")}
      /> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    color: "#4CAF50",
    alignItems: "center",
    minHeight: "50px",
    minWidth: "20%",
    maxWidth: 500,
    fontWeight: "800",
  },
  closeButton: {
    padding: 10,
  },
  input: {
    // marginVertical: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
    // padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  imagePicker: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    width: 100,
    height: 100,
    marginTop: 10,
  },
  picker: {
    marginTop: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#4CAF50",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});