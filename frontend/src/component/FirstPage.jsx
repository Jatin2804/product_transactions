import React from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const FirstPage = () => {
  return (
    <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",width:"100vw",height:"100vh",flexDirection:"column"}}>
      <h1>Click to get Transactions</h1>
        <Link style={{textDecoration:"none"}} to={"/transactions"}>
        <Button
        variant="contained"
        sx={{
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Get Transactions
      </Button>
        </Link>
     
    </Box>
  );
};

export default FirstPage;
