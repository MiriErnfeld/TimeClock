const express = require("express")
const router = express.Router()
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
// const cors = require("cors");

const noteRoute = require('./routes/api');

dotenv.config();

const PORT = 3007;
const DB_CONNECT = process.env.DB_CONNECT
//  const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/easycart";

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/", noteRoute)


// ACCESS_TOKEN_SECRET=5254a6966ca8868d4031d20e8a55312de37abfb91ea6d1d49f74cc0081dde043d5394d15bc3384ec4d6ef8e37095675fd931fe296c4c7971c4e8c125d0411bbe
// SOCKET_PORT:5010


mongoose.connect(
    DB_CONNECT,
    {
        useUnifiedTopology: true,
        // useNewUrlParser: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
    },
    (err) => {
        if (err) throw err;
        ConnectFlag = true;
        console.log("Connected to MongoDB");
    }
);

// router.get('/get', (req, res, next) => {
//     console.log("hiiiiii");
//     res.status(200).json({
//         message: "Here we are handling the get request for the products"
//     });
// });

process.on("uncaughtException", function (err) {
    console.error("Caught exception: " + err);
    throw err;
});

// Bellow MongoDB and Above Listen Sever
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("./build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "./build", "index.html"));
//   });
// }

app.listen(PORT, () => {
    console.error("Server is running on port", PORT);
});


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
// app.use(cors());
app.all("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
    res.header(
        "Access-Control-Allow-Headers",
        'Content-Type, Authorization, Content-Length, X-Requested-With'
    );
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }

});

