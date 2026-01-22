// MODULES
const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDB = require("./config/db")

// ROUTES
const transactionRoutes = require("./routes/transactionRoutes")

dotenv.config();
connectDB()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Finance Tracker API is running...");
});

app.use("/api/transactions", transactionRoutes)












app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})