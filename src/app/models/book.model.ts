import { Schema, model } from "mongoose";
import { IBook } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook>(
	{
		title: { type: String, required: true },
		author: { type: String, required: true },
		genre: {
			type: String,
			required: true,
			enum: [
				"FICTION",
				"NON_FICTION",
				"FANTASY",
				"SCIENCE",
				"BIOGRAPHY",
				"HISTORY",
				"SELF_HELP",
				"MEMOIR",
				"PSYCHOLOGY",
				"THRILLER",
				"ROMANCE",
			],
		},
		isbn: { type: String, required: true, unique: true },
		description: { type: String },
		copies: { type: Number, required: true, min: 0 },
		available: { type: Boolean, default: true },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

bookSchema.methods.updateAvailability = function () {
	this.available = this.copies > 0;
};
bookSchema.pre("save", function (next) {
	console.log(`Book saving: ${this.title}`);
	next();
});

bookSchema.post("save", function (doc) {
	console.log(`Book saved: ${doc.title}`);
});

export const Book = model<IBook>("Book", bookSchema);
