import React, { useState } from "react";
import { View, Button, Platform, StyleSheet, Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Text } from "react-native-elements";
// import dayjs from 'day.js';

export default function DateTimeComponent({ value }) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // const date = dayjs.unix(parseInt(value));
    // const readableDate = date.format("MM/DD/YYYY");
    // const unixTimestamp = parseInt(value, 10); // Convert string to number
    // const dateObject = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds and create a Date object

    console.log("currentDate datepicker component ", currentDate);
    console.log(
      "value datepicker component "
      // dateObject
      // value
      // new Date(value).toLocaleString("en-GB", { timeZone: "UTC" })
    );
    // console.log("value datepicker component ", value.toDate());

    setShow(Platform.OS === "ios");

    if (value) {
      setDate(value);
    } else {
      setDate(currentDate);
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <View>
      <View>
        <Pressable style={styles.button} onPress={showDatepicker}>
          <Text style={styles.text}>เลือกเวลาที่ต้องการแจ้งเตือน</Text>
        </Pressable>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
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
