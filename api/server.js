const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDb = require("./config/db")
const authRoute = require("./routes/authRoute")
const userRoute = require("./routes/usersRoute")
const postRoute = require("./routes/postRoute")
const categoryRoute = require("./routes/categoryRoute")
const multer = require("multer")
const path = require('path');

const app = express();

// config env
dotenv.config();

// database call
connectDb();

// middlewares
app.use(express.json())
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")));

// Multer Image Upload

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "images")
//     },
//     filename: (req, file, cb) => {
//         cb(null, "hello.jpeg")
//     }
// });

// const upload = multer({ storage: storage });
// app.post("/api/v1/upload", upload.single("file"), (req, res) => {
//     res.status(200).json("File has been uploaded")
// });


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
});

const upload = multer({ storage: storage });
app.post("/api/v1/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded")
})



// Routing
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute)
app.use("/api/v1/post", postRoute)
app.use("/api/v1/category", categoryRoute)

app.get("/", (req, res) => {
    res.send("Server is running")
})


app.get("/about", (req, res) => {
    res.send("Hello from about route")
})


const port = process.env.PORT || 8800;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})