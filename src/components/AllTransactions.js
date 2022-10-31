import React, { useContext, useState } from "react";
import { TransactionContext } from "../App";

export default function AllTransactions() {
	
	const localStore = localStorage.getItem("transactionList");
	const [ message, setMessage ] = useState(null);
	const [ transactionList, setTransactionList ] = useState(localStore ? JSON.parse(localStore) : null);
	const getLast3MonthsList = useContext(TransactionContext).getLast3MonthsList;
	const [showLastThreeMonths, setShowLastThreeMonths] = useState(false)
	const [buttonText, setButtonText] = useState("Show only Last 3 Months")
	const [oldTransactionList, setOldTransactionList] = useState({});

	if(message) {
		
		setTimeout( () => {
			setMessage(null);
		},7000);
	}
	console.log("Sanity check", transactionList)
	function deleteTransaction(index) {
	
		if(transactionList.list.length > 1) {
			
			transactionList.list.splice(index, 1);
			setTransactionList({ list: transactionList.list });
			localStorage.setItem("transactionList", JSON.stringify({ list: transactionList.list }));
			setMessage("Delete Successful");
			return;
		}else {
			
			setTransactionList(null);
			localStorage.removeItem("transactionList");
			setMessage("Delete Successful");
		}
	}

	function formatDate(string) {
		
		var options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
		return new Date(string).toLocaleDateString('en-US',options);
	}
	
	async function toggleThreeMonths() {

		setShowLastThreeMonths(!showLastThreeMonths)
		if(showLastThreeMonths){

			setTransactionList({list:oldTransactionList.list});
			setButtonText("Show only Last 3 Months")
			setMessage("Displaying all Transactions")
			setOldTransactionList({});

		}else {

			const filteredList = getLast3MonthsList(transactionList)
			setButtonText("Show All Transactions");
			setMessage("Displaying only last 3 Months Transations");
			setOldTransactionList(transactionList)
			setTransactionList({ list: filteredList });
		}
	}

	function deleteAll() {
		
		setTransactionList(null);
		localStorage.removeItem("transactionList");
	}

	function renderContent() {
		
		if(transactionList && transactionList.list.length > 0) {
		
			return (
				<>
				<h1>
					All transactions
				</h1>
				<div className="message-div">
					{ message ?  <span>{message}</span>  : null }
				</div>
				<table>
					<thead>
						<tr>
							<th>Product name</th>
							<th>Price ($)</th>
							<th>Rewards</th>
							<th>Description</th>
							<th>Date</th>
						</tr>
					</thead>
					<tbody>
						{transactionList.list.map((list, index) => {
							return(
									<tr key={index}>
										<th>{list.product}</th>
										<th className="price-table"><span className="price">$ {list.price}</span></th>
										<th><span  className="rewards">{list.rewards}</span></th>
										<th className="description-table">{list.description}</th>
										<th>{formatDate(list.transactionDate)}</th>
										<th><button className="delete-btn" onClick={ () => {deleteTransaction(index)}}>Delete</button></th>
									</tr>
							)
						})}
					</tbody>
				</table>
				
				<button onClick={toggleThreeMonths} className="toggle3mths">{buttonText}</button>
				<button onClick={deleteAll} className="delete-btn">Delete All Transactions</button>
				</>
			)
		}else {
			
			return (
				<div className='no-transactions'> You have no Transactions yet </div>
			)
		}
	}

	return (
		<div className="transaction-main-div all-transaction-div">
			{renderContent()}
		</div>
  )
}
