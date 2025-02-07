import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Ensure axios is imported
import StatisticDetail from "./StatisticDetail";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const URL = "http://localhost:3000";

const Statistics = () => {
  const { month } = useParams();
  const [totalSale, setTotalSale] = useState(0);
  const [totalSoldItems, setTotalSoldItems] = useState(0);
  const [totalUnsoldItems, setTotalUnsoldItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const monthIndex = Number(month) - 1;
  const monthName = months[monthIndex] || "Invalid Month";

  const fetchTxn = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(
        `${URL}/statistics?month=${monthIndex + 1}`
      );
      // console.log("->", res.data.data);
      // console.log("Total Sale:", res.data.data.totalSale);
      // console.log("Total Sold Items:", res.data.data.soldItemsTotal);
      // console.log("Total Unsold Items:", res.data.data.notSoldItemsTotal);

      setTotalSale(res.data.data.totalSale);
      setTotalSoldItems(res.data.data.soldItemsTotal);
      setTotalUnsoldItems(res.data.data.notSoldItemsTotal);
    } catch (e) {
      setError("Error fetching transactions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTxn();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant="h4">{monthName} Transactions</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "20px",
          margin: "10px",
        }}
      >
        {loading ? (
          <Typography variant="h6">Loading...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <>
            <StatisticDetail
              totalSale={totalSale}
              totalSoldItems={totalSoldItems}
              totalUnsoldItems={totalUnsoldItems}
            />
            <BarChart
              month = {monthIndex}
            />
            <PieChart
               month = {monthIndex}
            />
          </>
        )}
      </Box>
    </div>
  );
};

export default Statistics;
