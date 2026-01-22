import React, { useState, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

const AddTransaction = () => {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);
    const [type, setType] = useState('expense')
    const [category, setCategory] = useState("")

    const { addTransaction } = useContext(GlobalContext)

    const onSubmit = e => {
        e.preventDefault()

        const submittedAmount = type === 'expense' ? -Math.abs(amount) : Math.abs(amount)

        const newTransaction = {
            text, amount: submittedAmount,
            type,
            category
        }

        addTransaction(newTransaction)

        setText('')
        setAmount(0)
        setCategory('')
    }

    return (
        <>
            <h3>Add New Transaction</h3>
            <form onSubmit={onSubmit}>

                <div className="form-control">
                    <label htmlFor="text">Text</label>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder='Enter text...' required/>
                </div>

                <div className="form-control">
                    <label>Category</label>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Food, Rent, Salary" required />
                </div>

                <div className="form-control">
                    <label>Type </label>
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                </div>

                <div className="form-control">
                    <label htmlFor="amount">Amount</label>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Enter amount...' />
                </div>
                <button className="btn">Add Transaction</button>

            </form>
        </>
    )
}


export default AddTransaction;