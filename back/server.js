require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
//Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));
//Routes
    app.get("/", (req, res) => {
        res.send("Hello World!");
    });

    app.use("/api", require("./routes/AddJob"));
    app.use("/api", require("./routes/ShowJob"));
    app.use("/api", require("./routes/JobStatus"));
    

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on("error", (err) => {
    console.log(err);
});
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
}); 
