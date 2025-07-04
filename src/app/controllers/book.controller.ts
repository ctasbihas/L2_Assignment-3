import express, { Request, Response } from "express";
import { Book } from "../models/book.model";

export const booksRouter = express.Router();

booksRouter.get("/", async (req: Request, res: Response) => {
	try {
		const {
			filter,
			sortBy = "createdAt",
			sort = "asc",
			limit = "10",
		} = req.query;

		const query: any = {};
		if (filter) query.genre = filter;

		const books = await Book.find(query)
			.sort({ [sortBy as string]: sort === "asc" ? 1 : -1 })
			.limit(parseInt(limit as string));

		res.status(200).json({
			success: true,
			message: "Books retrieved successfully",
			data: books,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Failed to get books",
			error,
		});
	}
});
booksRouter.get("/:id", async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const book = await Book.findById(id);
		if (!book) {
			res.status(404).json({
				success: false,
				message: "Book not found",
			});
			return;
		}
		res.status(200).json({
			success: true,
			message: "Book retrieved successfully",
			data: book,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Failed to get book",
			error,
		});
	}
});
booksRouter.post("/", async (req: Request, res: Response) => {
	try {
		const book = await Book.create(req.body);
		res.status(201).json({
			success: true,
			message: "Book created successfully",
			data: book,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: "Book creation failed",
			error,
		});
	}
});
booksRouter.put("/:bookId", async (req: Request, res: Response) => {
	try {
		const { bookId } = req.params;
		const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {
			new: true,
			runValidators: true,
		});
		if (!updatedBook) {
			res.status(404).json({
				success: false,
				message: "Book not found",
			});
			return;
		}
		res.status(200).json({
			success: true,
			message: "Book updated successfully",
			data: updatedBook,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: "Book update failed",
			error,
		});
	}
});
booksRouter.delete("/:bookId", async (req: Request, res: Response) => {
	try {
		const { bookId } = req.params;
		const deletedBook = await Book.findByIdAndDelete(bookId);
		if (!deletedBook) {
			res.status(404).json({
				success: false,
				message: "Book not found",
			});
			return;
		}
		res.status(200).json({
			success: true,
			message: "Book deleted successfully",
			data: null,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Failed to delete book",
			error,
		});
	}
});
