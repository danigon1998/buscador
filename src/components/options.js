import React, { useState } from "react";
import { View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function Options({ selectedOption, setSelectedOption }) {
  const [open, setOpen] = useState(false);
  const optionItems = [
    { label: "Crecimento", value: "Crecimento" },
    { label: "Valor", value: "Valor" },
  ];

  return (
    <View>
      <DropDownPicker
        open={open}
        value={selectedOption}
        items={optionItems}
        setOpen={setOpen}
        setValue={(value) => {
          setSelectedOption(value);
          setOpen(false); 
        }}
        containerStyle={{ width: 150, height: 40 , marginBottom: 50}}
        style={{ backgroundColor: "#fafafa"}}
        itemStyle={{
          justifyContent: "flex-start",
        }}
        dropDownStyle={{ backgroundColor: "#fafafa" }}
        placeholder="Selecione uma opcão"
      />
    </View>
  );
}
