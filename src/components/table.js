import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Table({ data }) {
  const price = data[7].value
  const analystTargetPrice = data[6].value
  return (
    <View style={styles.tableContainer}>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Medida</Text>
        <Text style={styles.headerCell}>Valor</Text>
      </View>
      {data.map((item, index) => (
        <View
          key={index}
          style={[
            styles.tableRow,
            index % 2 === 0 ? styles.evenRow : styles.oddRow,
            item.metric === "Price" && price && analystTargetPrice
            ? getBackgroundColorForPriceVsAnalystTarget(price, analystTargetPrice)
            : getBackgroundColor(item.metric, item.value),
          ]}
        >
          <Text style={styles.tableCell}>{item.metric}</Text>
          <Text style={styles.tableCell}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tableContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 30,
    width: 300,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },
  evenRow: {
    backgroundColor: "#f9f9f9",
  },
  oddRow: {
    backgroundColor: "#fff",
  },
  tableCell: {
    flex: 1,
    padding: 10,
  },
  yellowRow: {
    backgroundColor: "yellow",
  },
  redRow: {
    backgroundColor: "red",
  },
  greenRow: {
    backgroundColor: "green",
  },
});

function getBackgroundColor(metric, value) {
  if (metric === "PERatio") {
    const per = parseFloat(value);
    if (per > 40) {
      return styles.redRow;
    } else if (per > 20) {
      return styles.yellowRow;
    } else if (per < 20 && per >= 0) {
      return styles.greenRow;
    } else {
      return styles.redRow;
    }
  }
  else if (metric === "PEGRatio") {
    const per = parseFloat(value);
    if (per > 2) {
      return styles.redRow;
    } else if (per > 1.5) {
      return styles.yellowRow;
    } else if (per < 1.5 && per >= 0) {
      return styles.greenRow;
    } else {
      return styles.redRow;
    }
  }else if (metric === "ForwardPE") {
    const forwardPER = parseFloat(value);
    if (forwardPER > 40) {
      return styles.redRow;
    } else if (forwardPER > 20) {
      return styles.yellowRow;
    } else if (forwardPER < 20 && forwardPER >= 0) {
      return styles.greenRow; 
    } else {
      return styles.redRow; 
    }
    
  } else if (metric === "EV To EBITDA") {
    const evToEBITDA = parseFloat(value);
    if (evToEBITDA > 30) {
      return styles.redRow; 
    } else if (evToEBITDA > 20) {
      return styles.yellowRow;
    } else if (evToEBITDA < 15 && evToEBITDA >= 0) {
      return styles.greenRow; 
    } else {
      return styles.redRow;
    }
  }else if (metric === "Dividend Yield (%)") {
    const dividendYield = parseFloat(value);
    if (dividendYield > 3) {
      return styles.greenRow;
    } else if (dividendYield >= 1.5) {
      return styles.yellowRow;
    } else {
      return styles.redRow;
    }
  } else if (metric === "Price To Sales Ratio TTM") {
    const priceToSales = parseFloat(value);
    if (priceToSales > 10) {
      return styles.redRow; 
    } else if (priceToSales > 5) {
      return styles.yellowRow; 
    } else {
      return styles.greenRow;
    }
  }
  return null;
}

function getBackgroundColorForPriceVsAnalystTarget(price, analystTargetPrice) {
  const priceValue = parseFloat(price);
  const analystTargetValue = parseFloat(analystTargetPrice);

  const priceDifferencePercentage = ((analystTargetValue - priceValue) / priceValue) * 100;

  if (priceDifferencePercentage >= 20) {
    return styles.greenRow;
  } else if (priceDifferencePercentage >= 0 && priceDifferencePercentage < 20) {
    return styles.yellowRow;
  } else {
    return styles.redRow;
  }
}
