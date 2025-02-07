const axios = require("axios");
const TransactionServices = new (require("../services/transactions.service"))();
const Joi = require("joi");


const initializeDB = async (req, res) => {
  try {
    const response = await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
    const result = await TransactionServices.initialiseTransactions(response.data);

    console.log("result:", result);

    if (result) {
      const transactions = await TransactionServices.getTransactions();
      return res.json({ message: "Transaction initialized successfully", data: transactions });
    }

    res.status(500).json({ message: "Failed to initialize transactions" });
  } catch (error) {
    console.error("Error initializing transactions:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    const { page } = req.params;  
    const limit = 10;
    const pageNumber = parseInt(page, 10) || 1;  

    const transactions = await TransactionServices.getTransactions();

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ success: false, message: "No transactions found" });
    }

    const startIndex = (pageNumber - 1) * limit;
    const paginatedTransactions = transactions.slice(startIndex, startIndex + limit);

    res.json({ success: true, data: paginatedTransactions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



const getSearchResult = async (req, res) => {
  try {
    const { searchstring } = req.params; 

    if (!searchstring) {
      return res.status(400).json({ success: false, message: '"searchString" is required' });
    }

    const transactions = await TransactionServices.getSearchedTransactions(searchstring);

    if (transactions.length > 0) {
      res.json({ success: true, data: transactions });
    } else {
      res.status(404).json({ success: false, message: "No transactions found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get transactions by month with pagination
const getMonthTransactions = async (req, res) => {
  try {
    let { month } = req.query;

    if (!month) {
      return res.status(400).json({ success: false, message: "Month is required" });
    }

    month = parseInt(month);
    

    const transactions = await TransactionServices.getMonthTransactions(month);

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ success: false, message: "No transactions found" });
    }

    res.json({ success: true, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Get statistics for a given month
const getStatistics = async (req, res) => {
  try {
    const { month } = req.query;
    const stats = await TransactionServices.getStatistics(month);
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get bar chart data for a given month
const getBarChart = async (req, res) => {
  try {
    const { month } = req.query;
    const barChartData = await TransactionServices.getBarChart(month);
    res.json({ success: true, data: barChartData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get pie chart data for a given month
const getPieChart = async (req, res) => {
  try {
    const { month } = req.query;
    const pieChartData = await TransactionServices.getPieChart(month);
    res.json({ success: true, data: pieChartData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get combined data (statistics, bar chart, and pie chart) for a given month
const getCombinedData = async (req, res) => {
  try {
    const { month } = req.query;

    const [statistics, barChart, pieChart] = await Promise.all([
      TransactionServices.getStatistics(month),
      TransactionServices.getBarChart(month),
      TransactionServices.getPieChart(month),
    ]);

    res.json({
      success: true,
      data: { statistics, barChart, pieChart },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = {
  initializeDB,
  getTransactions,
  getMonthTransactions,
  getSearchResult,
  getStatistics,
  getBarChart,
  getPieChart,
  getCombinedData,
};
