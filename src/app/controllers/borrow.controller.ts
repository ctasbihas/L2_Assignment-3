import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";

export const borrowRouter = express.Router();

borrowRouter.post("/", async (req: Request, res: Response) => {
	try {
		const { book: bookId, quantity, dueDate } = req.body;

		if (!bookId || !quantity || !dueDate) {
			res.status(400).json({
				success: false,
				message: "Book, quantity, and dueDate are required",
			});
			return;
		}

		const book = await Book.findById(bookId);
		if (!book) {
			res.status(404).json({
				success: false,
				message: "Book not found",
			});
			return;
		}

		if (book.copies < quantity) {
			res.status(400).json({
				success: false,
				message: "Not enough copies available",
			});
			return;
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
		return;
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
		return;
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Failed to retrieve borrowed books summary",
			error,
		});
		return;
	}
});
