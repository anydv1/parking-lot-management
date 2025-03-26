const express = require("express");
const bodyParser = require("body-parser");
const parkingRoutes = require("./router/mainRouter");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

app.use("/parking", parkingRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


module.exports = app;
