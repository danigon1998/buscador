import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function CustomButton({ title, onPress }) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#5998F0", 
    padding: 10,
    borderRadius: 50,
    marginLeft: 10
  },
  buttonText: {
    color: "white", 
    textAlign: "center",
    justifyContent:"center"
  },
});
