const homeRoute = require("../routes/home.route");

const routes = [
	{
		path: "/",
		handler: homeRoute,
	},
];

module.exports = (app) => {
	routes.forEach((r) => {
		app.use(r.path, r.handler);
	});
};
