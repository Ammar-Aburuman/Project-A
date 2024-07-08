import { useEffect, useState } from "react";
import { useGetTransactions } from "./useGetTransactions"

export const useGetBalance = () => {

    const [income, setIncome] = useState(0)
    const [expense, setExpense] = useState(0)
    const [balance, setBalance] = useState(0)

    const {transactions} = useGetTransactions();
   
    useEffect(() => {
        let newIncome = 0;
        let newExpense = 0;

        transactions.forEach((transaction) => {
            const { transactionAmount, transactionType } = transaction;

            if (transactionType === "income") {
                newIncome += parseInt(transactionAmount);
            } else {
                newExpense += parseInt(transactionAmount);
            }
        });

        setIncome(newIncome);
        setExpense(newExpense);
        setBalance(newIncome - newExpense);
    },[transactions]);
    
    
    
    return {balance,income,expense};


}