import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

// We pass the "transaction" as a prop from the list
export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  // Since you have a 'type' field, we can use that for the sign 
  // or stick to the amount value
  const sign = transaction.amount < 0 ? '-' : '+';

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      <div>
        <strong>{transaction.text} </strong>
        <span className="category-tag">{transaction.category}</span>
      </div>
      <span>{sign}${Math.abs(transaction.amount)}</span>
      <button 
        onClick={() => deleteTransaction(transaction._id)} 
        className="delete-btn"
      >
        x
      </button>
    </li>
  );
};