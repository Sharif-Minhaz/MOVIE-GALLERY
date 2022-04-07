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
	try {
		let find = await Movie.find({name: name.toLowerCase()});
		if (find && find.length != 0) {
			return res.send(
				`"${name}" movie already exists in the gallery! <a  onclick='history.go(-1)' href='javascript:void(0)'>Back to home</a>`
			);
		}
		const movie = new Movie({
			name: name.toLowerCase(),
			type,
		});
		saveImage(movie, img);
		await movie.save();
		res.redirect("/");
	} catch (err) {
		next(err);
	}
};

// save the image into the mongodb
let imageMimeType = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
const saveImage = (movie, imgEncoded) => {
	if (imgEncoded == null) return;
	const img = JSON.parse(imgEncoded);
	if (img != null && imageMimeType.includes(img.type)) {
		movie.img = new Buffer.from(img.data, "base64");
		movie.imgType = img.type;
	}
};
