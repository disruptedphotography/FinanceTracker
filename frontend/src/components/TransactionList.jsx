import React, { useContext, useEffect } from 'react';
import { Transaction } from './Transaction';
import { GlobalContext } from '../context/GlobalState';

const TransactionList = () => {
  // Pulling state and the fetch function from Context
  const { transactions, getTransactions } = useContext(GlobalContext);

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
        <h3>History</h3>
        <ul className="list">
        {transactions && transactions
            .filter(t => t !== null && typeof t === 'object' && t._id) // Clean the data first
            .map(transaction => (
            <Transaction key={transaction._id} transaction={transaction} />
            ))
        }
        </ul>
    </>
  );
};

export default TransactionList;