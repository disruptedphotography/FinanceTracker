const Transaction = require("../models/Transaction")

exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({date: -1})
        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        })
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' })
    }
}

exports.addTransactions = async (req, res) => {
    try {
        const newTransaction = await Transaction.create(req.body)
        res.status(201).json(newTransaction)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

exports.deleteTransactions = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id)

        if (!transaction) {
            return res.status(404).json({success: false, error: 'No transaction found'})
        }

        await transaction.deleteOne();

        return res.status(200).json({
            success: true,
            data: {}
        })
    } catch (error) {
        return res.send(500).json({ success: false, error: "Server Error" });
    }
}