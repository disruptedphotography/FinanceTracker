import React, { createContext, useReducer } from 'react'
import axios from 'axios'
import AppReducer from './AppReducer'

const initialState = {
    transactions: [],
    error: null,
    loading: true
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {
    // FIXED: changed cosnt to const
    const [state, dispatch] = useReducer(AppReducer, initialState)

    async function getTransactions() {
  try {
    const res = await axios.get('/api/transactions');

    dispatch({
      type: 'GET_TRANSACTIONS',
      payload: res.data.data // res.data is the axios object, .data is your backend array
    });
  } catch (err) {
    dispatch({
      type: 'TRANSACTION_ERROR',
      payload: err.response.data.error
    });
  }
}

    async function deleteTransaction(id) {
        try {
            await axios.delete(`/api/transactions/${id}`)
            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            })
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            })
        }
    }

    async function addTransaction(transaction) {
        const config = { headers: { 'Content-Type': 'application/json' } };

        try {
            const res = await axios.post('/api/transactions', transaction, config);

            const newTransaction = res.data.data ? res.data.data : res.data;

            dispatch({
                type: 'ADD_TRANSACTION',
                payload: newTransaction
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response?.data?.error || 'Server Error'
            });
        }
    }

    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            error: state.error,
            loading: state.loading,
            getTransactions,
            deleteTransaction,
            addTransaction
        }}>
            {children}
        </GlobalContext.Provider>
    )
}