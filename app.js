require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

const setMiddlewares = require("./middlewares/middleware");
const setRoutes = require("./routes/route");

// setup view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// set middlewares and routes
setMiddlewares(app);
setRoutes(app);

const port = process.env.PORT || 3000;
const { DB_USER, DB_PASSWORD } = process.env;

mongoose
	.connect(
		`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.h9bja.mongodb.net/movieGallery?retryWrites=true&w=majority`,
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then(() => {
		app.listen(port, () => {
			console.info(`Server running at, http://localhost:${port}`);
		});
	})
	.catch((err) => console.error(err));
