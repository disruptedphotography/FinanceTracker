import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions
    .filter(transaction => transaction !== null && transaction !== undefined)
    .map(transaction => transaction.amount)

  // 2. Sum them up using reduce
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  // 3. Format with commas for thousands (optional but looks nice)
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <>
      <h4>Your Balance</h4>
      <h1 id="balance">${numberWithCommas(total)}</h1>
    </>
  );
};