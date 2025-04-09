const express = require('express');
const dbConnect = require("./config/connectDB");
require("dotenv").config();
const cors = require('cors');
const swagger = require('./swagger');

const userRouter = require("./routes/users");
const destinationRouter = require("./routes/destinations");
const uploadRouter = require("./routes/images");
const storyRouter = require("./routes/story");
const authRouter = require("./routes/auth");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// connect DB
dbConnect();

const app = express();

app.use(express.json());
app.use(cors());

swagger(app);

app.listen(PORT, HOST, () => {
    console.log(`listening on PORT: ${PORT}`);
});

// body parser middleware
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/destination", destinationRouter);
app.use("/api/story", storyRouter);
app.use("/api/upload", uploadRouter);

app.use("/api/auth", authRouter);
