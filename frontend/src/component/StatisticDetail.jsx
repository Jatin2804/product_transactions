import { Box, Typography } from "@mui/material";
import React from "react";

const StatisticDetail = ({ totalSale, totalSoldItems, totalUnsoldItems }) => {
    
  return (
    <>
      <Typography variant="h6">Statistics</Typography>
      <Box
        sx={{
          width: "90%",
          maxWidth: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
          backgroundColor: "#252323",
          color: "white",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            width: "60%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "5px",
          }}
        >
          <Typography>Total Sale</Typography>
          <Typography>Total Sold Items</Typography>
          <Typography>Total Unsold Items</Typography>
        </Box>

        <Box
          sx={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "5px",
          }}
        >
          <Typography>: {totalSale}</Typography>
          <Typography>: {totalSoldItems}</Typography>
          <Typography>: {totalUnsoldItems}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default StatisticDetail;
