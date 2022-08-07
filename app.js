require("dotenv").config();
const express = require('express');
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 5000;

const cors = require("cors");
app.use(cors());
app.use(express.json());


const api = require('./src/api/');
app.use('/', api);
    
app.listen(PORT, () => console.log(`API started on port: ${PORT}`));