const router = require("express").Router();
const transactionsController = require("../controllers/transactions.controllers"); 
router.get("/initialize-db", transactionsController.initializeDB); 
router.get("/transactions", transactionsController.getMonthTransactions); 
router.get("/data/:page", transactionsController.getTransactions); 
router.get("/search/:searchstring", transactionsController.getSearchResult); 
router.get("/statistics", transactionsController.getStatistics);
router.get("/bar-chart", transactionsController.getBarChart);
router.get("/pie-chart", transactionsController.getPieChart);
router.get("/combined", transactionsController.getCombinedData);


module.exports = router;
