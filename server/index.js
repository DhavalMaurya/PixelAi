const express = require("express")
const dotenv = require("dotenv").config()
const PORT = process.env.PORT || 5000


const cors = require("cors");
const chatRouter = require("./routes/Chat");
const authRouter = require("./routes/Auth");
const {dbConnect} = require("./config/databse");

const app = express();

dbConnect();

// app.use(cors())
app.use(cors({
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow custom headers
    credentials: true // If you need to send cookies or auth tokens
  }))
app.use(express.json())

app.use("/chat" , chatRouter);
app.use("/auth" , authRouter);


app.listen(PORT,()=>{console.log("server is runnong on port 5000")})