# Transactions Dashboard (MERN Stack)

## Overview
This project is a **MERN Stack Application** that provides an interactive dashboard for managing and visualizing transactions. It includes features such as transaction search, pagination, statistics, and graphical data representation using **Recharts** for bar and pie charts.

## Tech Stack
- **Frontend:** React, Recharts, Material UI
- **Backend:** Node.js, Express.js, MongoDB
- **Deployment:** Render (Backend), Vercel (Frontend)

## Folder Structure

### **Backend (`/backend`)**
```
backend/
│── src/
│   ├── config/
│   │   ├── db.js
│   ├── controllers/
│   │   ├── controller.js
│   ├── services/
│   │   ├── service.js
│   ├── model/
│   │   ├── model.js
│   ├── routes/
│   │   ├── route.js
│   ├── app.js
│── server.js
│── request.rest
│── .env
```

### **Frontend (`/frontend`)**
```
frontend/
│── src/
│   ├── component/
│   │   ├── firstpage.js
│   │   ├── transactions.js
│   │   ├── statistics.js
│   │   ├── barchart.js
│   │   ├── piechart.js
│   ├── app.js
│   ├── index.js
```

## API Routes
### **Backend Routes**
| Method | Endpoint | Description |
|--------|-------------|-------------|
| `GET` | `/initialize-db` | Initializes the database with transaction data |
| `GET` | `/transactions?month={monthNumber}` | Fetches transactions for a specific month |
| `GET` | `/data/:pageNumber` | Fetches paginated transaction data |
| `GET` | `/search/:searchString` | Searches transactions based on a query string |
| `GET` | `/statistics?month={monthNumber}` | Fetches statistics for a given month |
| `GET` | `/bar-chart?month={monthNumber}` | Fetches data for the bar chart |
| `GET` | `/pie-chart?month={monthNumber}` | Fetches data for the pie chart |
| `GET` | `/combined?month={monthNumber}` | Fetches combined statistical data |

## Deployment Links
- **Backend:** [Product Transactions API](https://product-transactions-ca5a.onrender.com)
- **Frontend:** [Transactions Frontend](https://txnfrontend.vercel.app/)

## Setup Instructions
### **Backend Setup**
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and configure the required variables.
4. Start the backend server:
   ```sh
   npm start
   ```

### **Frontend Setup**
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm start
   ```

## Features
✅ Transaction Listing with Pagination  
✅ Search Transactions by Keywords  
✅ Monthly Statistics & Summaries  
✅ Interactive **Bar Charts** & **Pie Charts** using Recharts  
✅ Database Initialization Route  
✅ Fully Deployed on **Render** (Backend) & **Vercel** (Frontend)  

## Author
This project was developed as part of an **Intern MERN Stack Coding Challenge**. 🚀

