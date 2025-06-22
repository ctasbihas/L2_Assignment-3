import { Request, Response } from "express";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";
import express from "express";

export const borrowRouter = express.Router();

borrowRouter.post("/", async (req: Request, res: Response) => {
	try {
		const { book: bookId, quantity, dueDate } = req.body;

		if (!bookId || !quantity || !dueDate) {
			return res.status(400).json({
				success: false,
				message: "Book, quantity, and dueDate are required",
			});
		}

		const book = await Book.findById(bookId);
		if (!book) {
			return res.status(404).json({
				success: false,
				message: "Book not found",
			});
		}

		if (book.copies < quantity) {
			return res.status(400).json({
				success: false,
				message: "Not enough copies available",
			});
		}

		book.copies -= quantity;
		book.updateAvailability();
		await book.save();

		const borrow = await Borrow.create({
			book: bookId,
			quantity,
			dueDate,
		});

		res.status(201).json({
			success: true,
			message: "Book borrowed successfully",
			data: borrow,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Failed to borrow book",
			error,
		});
	}
});
borrowRouter.get("/", async (req: Request, res: Response) => {
	try {
		const summary = await Borrow.aggregate([
			{
				$group: {
					_id: "$book",
					totalQuantity: { $sum: "$quantity" },
				},
			},
			{
				$lookup: {
					from: "books",
					localField: "_id",
					foreignField: "_id",
					as: "bookInfo",
				},
			},
			{ $unwind: "$bookInfo" },
			{
				$project: {
					_id: 0,
					book: {
						title: "$bookInfo.title",
						isbn: "$bookInfo.isbn",
					},
					totalQuantity: 1,
				},
			},
		]);

		res.status(200).json({
			success: true,
			message: "Borrowed books summary retrieved successfully",
			data: summary,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Failed to retrieve borrowed books summary",
			error,
		});
	}
});
