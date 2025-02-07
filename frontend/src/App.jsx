import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FirstPage from './component/FirstPage';
import Transactions from './component/Transactions'; 
import Statistics from './component/Statistics';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<FirstPage />} />
        <Route path='/transactions' element={<Transactions />} />
        <Route path='/statistics/:month' element={<Statistics />} />
      </Routes>
    </Router>
  );
}

export default App;