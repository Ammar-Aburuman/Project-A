export const ExpenseTracker = () => {
    return (
        <div className="expense-tracker">

            <div className="container">
                <h1>Expense Tracker</h1>
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
            </div>

        </div>
    );
}