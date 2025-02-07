import React, { useEffect, useState, useRef, useCallback } from "react";
import { Box, Button, CircularProgress, Typography, TextField, MenuItem, FormControl, Select, InputLabel } from "@mui/material";
import axios from "axios";
import "./style.css";
import { Link } from "react-router-dom";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const debounceSearch = (fn, delay) => {
  let timerId;
  return function (...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => fn(...args), delay);
  };
};

const URL = "https://product-transactions-ca5a.onrender.com";

const Transactions = () => {
  const [txnData, setTxnData] = useState([]);
  const [totaldata, setTotaldata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalpage, setTotalPage] = useState(6);
  const [listLayout, setListLayout] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [month,setMonth] = useState("3");
  const perPage = 19;

  const fetchTxnPage = async () => {
    try {
      setLoading(true);
      setError("");
      let res = await axios.get(`${URL}/data/${page}`);

      if (Array.isArray(res.data.data)) {
        setTxnData(res.data.data);
      } else {
        setError("Unexpected data format.");
      }
    } catch (e) {
      setError("Error fetching transactions. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const fetchTxnMonth = async () => {
    try {
      setLoading(true);
      setError("");
      let res = await axios.get(`${URL}/transactions?month=${month}`);

      if (Array.isArray(res.data.data)) {
        setTxnData(res.data.data);
      } else {
        setError("Unexpected data format.");
      }
    } catch (e) {
      setError("Error fetching transactions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  

  const handleChange = (param) => {
   
      window.location.href = `/statistics/${param}`;
  
  };

  
  useEffect(() => {
    fetchTxnPage();
  }, [page]);

  useEffect(() => {
    fetchTxnPage();
 
  }, []);

  useEffect(() => {
    fetchTxnMonth();
  }, [month]);

  const performSearch = async (searchText) => {
    try {
      setLoading(true);
      setError("");
      let res = await axios.get(`${URL}/search/${searchText}`);

      if (Array.isArray(res.data.data)) {
        setTxnData(res.data.data);
      } else {
        setError("Unexpected data format.");
      }
    } catch (e) {
      setError("Transactions Not found");
    } finally {
      setLoading(false);
    }
  };

  const debounce = useRef(debounceSearch(performSearch, 1000)).current;

  useEffect(() => {
    if (!searchText.trim()) {
      fetchTxnPage();
      return;
    }
    debounce(searchText);
  }, [searchText]);

  const onPrev = () => {
    setPage((prevState) => prevState - 1);
  };
  const onNext = () => {
    setPage((prevState) => prevState + 1);
  };


  return (
    <Box>
      <Box
        sx={{
          bgcolor: "#252323",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50px",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{
            width: "80%",
            maxWidth: "500px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "white" },
              "&.Mui-focused fieldset": { borderColor: "white" },
            },
            "& .MuiInputLabel-root": { color: "white" },
            "& .MuiInputBase-input": { color: "white" },
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "20px",
        }}
      >
        {loading ? (
          <h4>Loading ...</h4>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : txnData.length === 0 ? (
          <Typography color="white">No transactions available.</Typography>
        ) : (
          <>
            <Box
              sx={{
                width: "90%",
                maxWidth: "900px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                margin: "20px",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  margin: "20px",
                  gap: "20px",
                }}
              >
               <FormControl sx={{ minWidth: 150, backgroundColor: "white", borderRadius: "5px" }}>
                  <InputLabel>Select Month</InputLabel>
                  <Select value={month} onChange={(e) => setMonth(e.target.value)} label="Select Month">
                    {months.map((month, index) => (
                      <MenuItem key={index} value={index + 1}>
                        {month}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "10px",
                }}
              >
                <Button
                  variant="outlined"
                  color="black"
                  disabled={page === 1}
                  onClick={onPrev}
                >
                  Prev
                </Button>
                <Box
                  sx={{
                    width: "150px",
                    height: "50px",
                    borderRadius: "10px",
                    backgroundColor: "#252323",
                    color: "white",
                    textAlign: "center",
                    lineHeight: "50px",
                  }}
                >
                  {searchText ? `Search Results` : `${page} of ${totalpage}`}
                </Box>
                <Button
                  variant="outlined"
                  color="black"
                  disabled={page >= totalpage}
                  onClick={onNext}
                >
                  Next
                </Button>
              </Box>
            </Box>

            <Box
              sx={{
                width: "90%",
                maxWidth: "900px",
                display: "flex",
                flexDirection: "column",
                border: "2px solid black",
                borderRadius: "10px",
                padding: "10px",
                gap: "10px",
              }}
            >
              {txnData.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    backgroundColor: "#252323",
                    color: "white",
                    padding: "10px",
                    display: "flex",
                    gap: "10px",
                    borderRadius: "5px",
                  }}
                >
                  <Typography variant="body2" sx={{ color: "#636363" }}>
                    {item.id}
                  </Typography>
                  <Box sx={{}} className="img-box">
                    <img src={item.image} alt="Transaction" />
                  </Box>
                  <Box sx={{ width: "80%" }}>
                    <Typography variant="body2" sx={{ color: "#636363" }}>
                      {item.category.toUpperCase() || ""}
                    </Typography>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="h6">
                        {item.title || "No Title"}
                      </Typography>
                      <Button
                        variant="outlined"
                        sx={{ color: "white" }}
                        onClick={() => handleChange(new Date(item.dateOfSale).getMonth() + 1)}
                      >
                        View Statistics
                      </Button>
                    </Box>

                    {/* <Typography variant="body2">
                    {item.description?.slice(0, 100) || "No Description"}...
                  </Typography> */}
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="body1">
                        Price: {item.price}
                      </Typography>
                      {item.sold ? (
                        <Typography variant="body1" sx={{ color: "green" }}>
                          SOLD
                        </Typography>
                      ) : (
                        <Typography variant="body1" sx={{ color: "red" }}>
                          NOTSOLD
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Transactions;
