require("dotenv").config();

const express = require('express'),
    app = express(),
    cors = require('cors'),
    parser = require('body-parser'),
    router = require('./app/routes/Router'),
    port = 777;





//cors settings
const corsOptions = {
    origin: "*"
};

//middleware
app.use(parser.json());
app.use(parser.urlencoded({
    extended: true
}));
app.use(cors(corsOptions));
app.use(express.json());

//routing
app.get('/', (req, res) => {
    return res.status(200).json({
        message: "Hidropol API Services Gateway"
    });
});

app.use(router);

//start server
app.listen(port, () => console.log(`API Gateway running at port ${port}`));