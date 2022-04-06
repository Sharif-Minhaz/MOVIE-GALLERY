require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.info(`Server running at, http://localhost:${port}`);
});
