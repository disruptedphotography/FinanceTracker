const mongoose = require("mongoose")

const TransactionSchema = new mongoose.Schema({
    text: {
        type: String,
        trim: true,
        required: [true, 'Please add a description (e.g., "Grocery Shopping")']
    },
    amount: {
        type: Number,
        required: [true, 'Please add a positive or negative amount']
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true
    },
    category: {
        type: String,
        required: [true, 'Please select a category'],
        default: 'General'
    },
    date: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String,
        trim: true,
        maxlength: [200, 'Notes cannot be longer than 200 characters']
    }
}, {
    // This automatically adds "createdAt" and "updatedAt" timestamps
    timestamps: true 
});


module.exports = mongoose.model('Transaction', TransactionSchema);
