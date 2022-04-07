const express = require("express");

const middleware = [
	express.static("public"),
	express.json({ limit: "10mb" }),
	express.urlencoded({ extended: true, limit: "10mb" }),
];

module.exports = (app) => {
	middleware.forEach((m) => {
		app.use(m);
	});
};
