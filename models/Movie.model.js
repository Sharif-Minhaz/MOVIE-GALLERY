const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	type: {
		type: String,
		required: true,
		trim: true,
	},
	img: {
		type: Buffer,
		required: true,
	},
	imgType: {
		type: String,
		required: true,
		trim: true,
	},
});

movieSchema.virtual("imgSrc").get(function () {
	if (this.img != null && this.imgType != null) {
		return `data:${this.imgType};charset=utf-8;base64,${this.img.toString("base64")}`;
	}
});

const Movie = model("movie", movieSchema);

module.exports = Movie;
