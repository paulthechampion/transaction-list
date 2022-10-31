// A retailer offers a rewards program to its customers, awarding points based on each recorded purchase. 
// A customer receives 2 points for every dollar spent over $100 in each transaction, 
// plus 1 point for every dollar spent over $50 in each transaction 
// (e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points).
// Given a record of every transaction during a three month period,
// calculate the reward points earned for each customer per month and total.

function calculateRewards(price) {
    if (price >=50 && price < 100) {
        return price-50;
    } else if (price >100){
        return (2*(price-100) + 50);
    }
    return 0;
}

class Transaction {
    constructor(price, product, description, date) {
        this.price = price;
        this.product = product;
        this.description = description || null;
        this.rewards = calculateRewards(price);
        this.transactionDate = date;
    }
}

export default class TransactionList {
    constructor() {
        this.list = [];
    }

    getLast3MonthsList(transaction) {
        var today = new Date();
        const threeOldDate = today.setMonth(today.getMonth() - 3);
        let filteredList = transaction.list.filter(trans => new Date(trans.transactionDate).setMonth(new Date(trans.transactionDate).getMonth()) > threeOldDate);
		return filteredList.sort((a,b) => new Date(b.transactionDate) - new Date(a.transactionDate));
    }

    getAllTransactions() {
        return this.list.sort((a,b) => b.transactionDate-a.transactionDate);
    }

    addTransaction({price, product, description, date}) {
        const transaction = new Transaction(price, product, description, date);
        this.list.push(transaction);
    }

    getTotalRewards() {
        return this.list.length ? this.list.reduce((acc,key)=>key.rewards+acc, 0) : 0;
    }

    rewardPerMonth() {
        let last3MonthRewardsInDesc = [];
        for(let i=0; i<3; i++) {
            let filteredList = this.list.filter(trans => trans.transactionDate.getMonth() == (new Date).getMonth() - i );
            last3MonthRewardsInDesc[i] = filteredList.reduce((acc,key)=>key.rewards+acc,0);
        }
        return last3MonthRewardsInDesc;
    }
}