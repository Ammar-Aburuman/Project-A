import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransactions";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import "./styles.css";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";

export const ExpenseTracker = () => {

    const {addTransaction} = useAddTransaction();
    const {transactions} = useGetTransactions();
    const {name,profilePhoto} = useGetUserInfo();
    const navigate = useNavigate();

    const [descrption,setDescription] = useState("");
    const [transactionAmount,setTransactionAmount] = useState(0);
    const [transactionType,setTransactionType] = useState("expense");

    const onSubmit = async (e) => {
        e.preventDefault() //prevents page refresh on form submission
        addTransaction({descrption, transactionAmount, transactionType})
    };

    const signUserOut = async() => {
        try {
        await signOut(auth)
        localStorage.clear()
        navigate("/")                       
    }
        
        catch (err) {
            console.error(err);
        }
    }

    return (
        <>
        <div className="expense-tracker">

            <div className="container">
                <h1> {name}'s Expense Tracker</h1>
                <div className="balance">
                    <h3>Your balance</h3>
                    <h2>$0.00</h2>
                </div>
                <div className="summary">
                    <div className="income">
                        <h4>Income</h4>
                        <p>$0.00</p>
                    </div>
                    <div className="expenses">
                    <h4>Income</h4>
                    <p>$0.00</p>
                    </div>
                </div>
                <form className="add-transaction" onSubmit={onSubmit}>
                    <input type="text" placeholder="Description" required onChange={(e) => setDescription(e.target.value)}/>

                    <input type="number" placeholder="Amount" required onChange={(e) => setTransactionAmount(e.target.value)}/>

                    <input type="radio" id="expense" value="expense" checked ={transactionType === "expense"} required onChange={(e) => setTransactionType(e.target.value)}/>

                    <label htmlFor="expense">Expense</label>
                    

                    <input type="radio" id="income" value="income" checked ={transactionType === "income"} required onChange={(e) => setTransactionType(e.target.value)}/>

                    <label htmlFor="income">Income</label>

                    <button type="submit">Add Transaction</button>
                </form>
            </div>
            {profilePhoto && <div className="profile"><img className="profile-photo" src={profilePhoto} alt="" referrerpolicy="no-referrer" /></div>}
            <button className="sign-out-button" onClick={signUserOut}>
                Sign out
            </button>

        </div>
        <div className="transactions">
            <h3>Transactions</h3>

             <ul>
                {transactions.map((transaction) => {
                    const {descrption, transactionAmount, transactionType} = transaction;
                    return (
                        <li>
                            <h4>{descrption}</h4>
                            <p> ${transactionAmount}- <label style={{color: transactionType === "expense" ? "Red" : "Green"}}>{transactionType}</label></p>
                        </li>
                    );
                })}
            </ul> 
        </div>
        </>
    );
}