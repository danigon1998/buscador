import React from "react";
import { View, TextInput, Text } from "react-native";
import { useState } from "react";
import Options from "../components/options";
import axios from "axios";
import Table from "../components/table";
import Table2 from "../components/table2";
import CustomButton from "../components/customButton";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [value, setValue] = useState("");
  const [dados, setDados] = useState([]);
  const [dados2, setDados2] = useState([]);
  const [dados3, setDados3] = useState([]);
  const key = "WTSL3OQC6IFZXGJX";

  const handleSearch = async (searchValue) => {
    if (value != searchValue) {
      setDados([]);
      setDados2([]);
      setDados3([]);
      setValue(searchValue);
    }
    if (selectedOption === "Valor") {
      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${searchValue}&apikey=${key}`
        );
        const stockData = response.data;
        if (stockData) {
          let d = [];
          d.push({ metric: "PERatio", value: stockData.PERatio });
          d.push({ metric: "PEGRatio", value: stockData.PEGRatio });
          d.push({ metric: "ForwardPE", value: stockData.ForwardPE });
          d.push({ metric: "EV To EBITDA", value: stockData.EVToEBITDA });
          d.push({
            metric: "Dividend Yield (%)",
            value: parseFloat(stockData.DividendYield) * 100,
          });
          d.push({
            metric: "Price To Sales Ratio TTM",
            value: stockData.PriceToSalesRatioTTM,
          });
          d.push({
            metric: "Analyst Target Price",
            value: stockData.AnalystTargetPrice,
          });
          d.push({
            metric: "Price",
            value: (
              parseFloat(stockData.MarketCapitalization) /
              parseFloat(stockData.SharesOutstanding)
            ).toFixed(2),
          });

          setDados(d);
        }
      } catch (error) {
        console.error("Erro na hora de obter os dados:", error);
      }
    } else if (selectedOption === "Crecimento") {
      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${searchValue}&apikey=${key}`
        );
        const stockData = response.data;
        if (stockData) {
          let revenue = [];
          let grossProfit = [];
          let operatingIncome = [];
          let netIncome = [];
          let quartely = [
            {
              date: "Header",
              valor: [
                "Revenue",
                "% Grown Revenue",
                "Gross Profit",
                "% Grown Gross Profit",
                "Operating Income",
                "% Grown Operating Income",
                "Net Income",
                "% Grown Net Income",
              ],
            },
          ];
          let annual = [
            {
              date: "Header",
              valor: [
                "Revenue",
                "% Grown Revenue",
                "Gross Profit",
                "% Grown Gross Profit",
                "Operating Income",
                "% Grown Operating Income",
                "Net Income",
                "% Grown Net Income",
              ],
            },
          ];
          for (let i = 0; i < 4; i++) {
            revenue.push(stockData.annualReports[i].totalRevenue);
            grossProfit.push(stockData.annualReports[i].grossProfit);
            operatingIncome.push(stockData.annualReports[i].operatingIncome);
            netIncome.push(stockData.annualReports[i].netIncome);
            annual.push({
              date: stockData.annualReports[i].fiscalDateEnding,
              valor: [
                revenue[i],
                (
                  ((parseFloat(revenue[i]) -
                    parseFloat(stockData.annualReports[i + 1].totalRevenue)) /
                    Math.abs(
                      parseFloat(stockData.annualReports[i + 1].totalRevenue)
                    )) *
                  100
                ).toFixed(2),
                grossProfit[i],
                (
                  ((parseFloat(grossProfit[i]) -
                    parseFloat(stockData.annualReports[i + 1].grossProfit)) /
                    Math.abs(
                      parseFloat(stockData.annualReports[i + 1].grossProfit)
                    )) *
                  100
                ).toFixed(2),
                operatingIncome[i],
                (
                  ((parseFloat(operatingIncome[i]) -
                    parseFloat(
                      stockData.annualReports[i + 1].operatingIncome
                    )) /
                    Math.abs(
                      parseFloat(stockData.annualReports[i + 1].operatingIncome)
                    )) *
                  100
                ).toFixed(2),
                netIncome[i],
                (
                  ((parseFloat(netIncome[i]) -
                    parseFloat(stockData.annualReports[i + 1].netIncome)) /
                    Math.abs(
                      parseFloat(stockData.annualReports[i + 1].netIncome)
                    )) *
                  100
                ).toFixed(2),
              ],
            });
          }
          revenue = [];
          grossProfit = [];
          operatingIncome = [];
          netIncome = [];
          for (let i = 0; i < 5; i++) {
            revenue.push(stockData.quarterlyReports[i].totalRevenue);
            grossProfit.push(stockData.quarterlyReports[i].grossProfit);
            operatingIncome.push(stockData.quarterlyReports[i].operatingIncome);
            netIncome.push(stockData.quarterlyReports[i].netIncome);
            quartely.push({
              date: stockData.quarterlyReports[i].fiscalDateEnding,
              valor: [
                revenue[i],
                (
                  ((parseFloat(revenue[i]) -
                    parseFloat(
                      stockData.quarterlyReports[i + 1].totalRevenue
                    )) /
                    Math.abs(
                      parseFloat(stockData.quarterlyReports[i + 1].totalRevenue)
                    )) *
                  100
                ).toFixed(2),
                grossProfit[i],
                (
                  ((parseFloat(grossProfit[i]) -
                    parseFloat(stockData.quarterlyReports[i + 1].grossProfit)) /
                    Math.abs(
                      parseFloat(stockData.quarterlyReports[i + 1].grossProfit)
                    )) *
                  100
                ).toFixed(2),
                operatingIncome[i],
                (
                  ((parseFloat(operatingIncome[i]) -
                    parseFloat(
                      stockData.quarterlyReports[i + 1].operatingIncome
                    )) /
                    Math.abs(
                      parseFloat(
                        stockData.quarterlyReports[i + 1].operatingIncome
                      )
                    )) *
                  100
                ).toFixed(2),
                netIncome[i],
                (
                  ((parseFloat(netIncome[i]) -
                    parseFloat(stockData.quarterlyReports[i + 1].netIncome)) /
                    Math.abs(
                      parseFloat(stockData.quarterlyReports[i + 1].netIncome)
                    )) *
                  100
                ).toFixed(2),
              ],
            });
          }

          setDados3(annual);
          setDados2(quartely);
        }
      } catch (error) {
        console.error("Erro na hora de obter os dados:", error);
      }
    }
  };

  return (
    <View style={{ flexDirection: "column", alignItems: "center" }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 10 }}>
        Explorador de Ações
      </Text>
      <Text
        style={{
          fontSize: 16,
          marginBottom: 20,
          color: "gray",
          marginHorizontal: 30,
          textAlign: "justify",
        }}
      >
        O Explorador de Ações (empresas que estão na bolsa de valores) é a sua
        ferramenta definitiva para encontrar informações valiosas sobre ações.
        Pesquise por símbolos de ações e obtenha dados abrangentes de valuation
        e crescimento para tomar decisões informadas de investimento. Os dados
        mostrados se dividem por cores. Quando estão em verde mostra uma
        situação postivia, em amarelo neutral e em vermelho negativa.
      </Text>
      <View style={{ flexDirection: "row", marginBottom: 30, width: 300 }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, padding: 10 }}
          placeholder="Coloque o simbolo da ação"
          value={searchValue}
          onChangeText={(text) => setSearchValue(text)}
        />
        <CustomButton
          title="Buscar"
          onPress={() => handleSearch(searchValue)}
        />
      </View>
      <Options
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      {selectedOption === "Valor" && dados.length > 0 && <Table data={dados} />}
      {selectedOption === "Crecimento" && dados3.length > 0 && (
        <Table2 title={"Annual Data"} data={dados3} />
      )}
      {selectedOption === "Crecimento" && dados2.length > 0 && (
        <Table2 title={"Quartely Data"} data={dados2} />
      )}
    </View>
  );
}
