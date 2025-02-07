const transactionModel = require("../models/transactions.model");

class TransactionServices {
  async initialiseTransactions(transactionsData) {
    try {
      await transactionModel.deleteMany();
      return await transactionModel.insertMany(transactionsData);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getTransactions() {
    try {
      return await transactionModel.find();
    } catch (err) {
      throw err;
    }
  }

  async getMonthTransactions(month){
    try {
      if (!month) {
        throw new Error("Month parameter is required");
      }
  
      const transactions = await transactionModel.find();
  
      const monthTransaction = transactions.filter((txn) => {
        const txnMonth = new Date(txn.dateOfSale).getMonth() + 1;
        return txnMonth === parseInt(month);
      });
  
      return monthTransaction; // Make sure to return the result
    } catch (err) {
      throw err;
    }
  }
  

  async getSearchedTransactions(searchString) {
    try {
      // Ensure searchString is a valid string before using $regex
      if (typeof searchString !== "string") {
        throw new Error("Invalid search query");
      }

      const query = {
        $or: [
          { title: { $regex: searchString, $options: "i" } },
          { category: { $regex: searchString, $options: "i" } },
          { description: { $regex: searchString, $options: "i" } },
        ],
      };

      // Check if the input is a valid number for price filtering
      const parsedPrice = parseFloat(searchString);
      if (!isNaN(parsedPrice)) {
        query.$or.push({ price: parsedPrice });
      }

      return await transactionModel.find(query);
    } catch (err) {
      throw err;
    }
  }

  async getStatistics(month) {
    try {
      const transactions = await transactionModel.find();

      // Filter transactions based on the provided month
      const monthTransaction = transactions.filter((txn) => {
        const txnMonth = new Date(txn.dateOfSale).getMonth() + 1;
        return txnMonth === parseInt(month);
      });

      const totalSaleAmount = monthTransaction.reduce(
        (acc, item) => acc + item.price,
        0
      );

      const soldItems = monthTransaction.filter((item) => item.sold);
      const soldItemsTotal = soldItems.length;
      const notSoldItems = monthTransaction.filter((item) => !item.sold);
      const notSoldItemsTotal = notSoldItems.length;
      const totalSale =  soldItems.reduce((total,item) => total+item.price,0);

      return {
        monthTransaction,
        monthTransaction,
        totalSaleAmount,
        soldItems,
        notSoldItems,
        soldItemsTotal,
        notSoldItemsTotal,
        totalSale
      };
    } catch (err) {
      throw err;
    }
  }

  async getBarChart(month) {
    try {
      const transactions = await transactionModel.find();

      // Filter transactions based on the provided month
      const monthTransaction = transactions.filter((txn) => {
        const txnMonth = new Date(txn.dateOfSale).getMonth() + 1;
        return txnMonth === parseInt(month);
      });

      const priceRanges = {
        "0-100": 0,
        "101-200": 0,
        "201-300": 0,
        "301-400": 0,
        "401-500": 0,
        "501-600": 0,
        "601-700": 0,
        "701-800": 0,
        "801-900": 0,
        "901-above": 0,
      };

      monthTransaction.forEach(({ price }) => {
        if (price <= 100) priceRanges["0-100"]++;
        else if (price <= 200) priceRanges["101-200"]++;
        else if (price <= 300) priceRanges["201-300"]++;
        else if (price <= 400) priceRanges["301-400"]++;
        else if (price <= 500) priceRanges["401-500"]++;
        else if (price <= 600) priceRanges["501-600"]++;
        else if (price <= 700) priceRanges["601-700"]++;
        else if (price <= 800) priceRanges["701-800"]++;
        else if (price <= 900) priceRanges["801-900"]++;
        else priceRanges["901-above"]++;
      });

      return priceRanges;
    } catch (err) {
      throw err;
    }
  }

  async getPieChart(month) {
    try {
      const transactions = await transactionModel.find();

      // Filter transactions based on the provided month
      const monthTransaction = transactions.filter((txn) => {
        const txnMonth = new Date(txn.dateOfSale).getMonth() + 1;
        return txnMonth === parseInt(month);
      });

      const categoryCounts = {};

      monthTransaction.forEach(({ category }) => {
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      });

      return categoryCounts;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = TransactionServices;
