const Movie = require("../models/Movie.model");

exports.homeGetController = async (req, res, next) => {
	try {
		const movie = await Movie.find();
		res.render("index", {
			movie,
		});
	} catch (err) {
		next(err);
	}
};

exports.homePostController = async (req, res, next) => {
	const { name, type, img } = req.body;
	const movie = new Movie({
		name,
		type,
	});
	try {
		await saveImage(movie, img);
		await movie.save();
		res.redirect("/");
	} catch (err) {
		next(err);
	}
};

// save the image into the mongodb
let imageMimeType = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
const saveImage = async (movie, imgEncoded) => {
	if (imgEncoded == null) return;
	const img = JSON.parse(imgEncoded);
	if (img != null && imageMimeType.includes(img.type)) {
		movie.img = new Buffer.from(img.data, "base64");
		movie.imgType = img.type;
	}
};
