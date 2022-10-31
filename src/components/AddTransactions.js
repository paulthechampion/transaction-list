import React, { useContext, useState } from "react";
import { TransactionContext } from "../App";

export default function AddTransactions() {

	const [ transaction, setTransaction ] = useState({ product : "", price : "", description: "", date: "" });
	const [ message, setMessage ]= useState(null);
	const transactionList = useContext(TransactionContext);
	const oldTransactionList = JSON.parse(localStorage.getItem("transactionList"));
	const todaysDate = new Date().toLocaleDateString()
	if(message) {

		setTimeout( () => {
		setMessage(null);
		}, 7000);
	}

	const onChange = e => {

		setTransaction({ ...transaction, [e.target.name] : e.target.value });
	}

	const onSubmit = e => {

		e.preventDefault();
		transactionList.addTransaction(transaction);
		if (oldTransactionList) {

			oldTransactionList.list.push(transactionList.list[0]);
			localStorage.setItem("transactionList", JSON.stringify(oldTransactionList));
			document.getElementById("transaction-form").reset();
		}else {

			localStorage.setItem("transactionList", JSON.stringify(transactionList));
			document.getElementById("transaction-form").reset();
		}
		setTransaction({ product : "", price : "", description: "", date: "" })
		setMessage("Added new transaction");
	}

	return (

		<div className="transaction-main-div">
			<div>
				<form onSubmit={onSubmit} className="transaction-form" id="transaction-form">
					<h1> Add A New Transaction </h1>
					<div className="message-div">
						{message ?  <span>{message}</span>  : null}
					</div>
					<div>
						<input type="text" onChange={onChange} name="product" placeholder="Enter Product name" required/> <br/>
						<input type="date" onChange={onChange} name="date" max={todaysDate} placeholder="yyyy-mm-dd" required/> 
						<input type="number" onChange={onChange} name="price" placeholder="Enter Price" required/> <br/>
						<textarea placeholder="Describe your product (not required)" onChange={onChange} name="description">

						</textarea> <br/>
						<button type="submit">
							Submit <span className="plus-icon"></span> 
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
