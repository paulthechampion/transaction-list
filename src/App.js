import './App.css';
import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllTransactions from "./components/AllTransactions";
import AddTransactions from "./components/AddTransactions";
import Footer from "./components/Footer";
import Header from "./components/Header";
import transactionList from "./assets/transactionList";

export const TransactionContext = React.createContext();

function App() {
  const transactions = new transactionList()
  return (
	<div className="App">
	  <BrowserRouter>
		<TransactionContext.Provider value={transactions}>
			<div className="main-content">
			
				<Header/>
				<Routes>
					<Route exact path="/" element={<AddTransactions/>}/>
					<Route exact path="/all-transactions" element={<AllTransactions/>}/>
				</Routes>
			</div>
			<Footer/>
		</TransactionContext.Provider>
	  </BrowserRouter>
	</div>
  );
}

export default App;
