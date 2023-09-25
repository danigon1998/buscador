import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Table2({ title, data }) {
  const headerMetrics = data[0]?.valor || [];
  const dates = data.slice(1).map((item) => item.date);

  return (
    <View style={styles.tableContainer}>
      <Text style={styles.tableTitle}>{title}</Text>
      <View style={styles.tableHeader}>
        <View style={styles.headerCell} />
        {dates.map((date, index) => (
          <Text key={index} style={styles.headerCell}>
            {date}
          </Text>
        ))}
      </View>
      {headerMetrics.map((metric, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.headerCell}>{metric}</Text>
          {data.slice(1).map((item, i) => (
            <Text
              key={i}
              style={[
                styles.tableCell,
                index % 2 !== 0
                  ? item.valor[index] > 0
                    ? styles.green // Impar e positivo (verde)
                    : styles.red // Impar e negativo (vermelho)
                  : {},
              ]}
            >
              {item.valor[index]}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tableContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 50,
  },
  tableTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    fontSize: 7,
    padding: 5,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 7,
    padding: 3,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
    fontSize: 6,
    borderLeftWidth: 1,
    padding: 1,
  },
  green: {
    backgroundColor: "green",
  },
  red: {
    backgroundColor: "red",
  },
});
