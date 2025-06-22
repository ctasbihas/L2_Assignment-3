import express, { Application } from "express";
import { booksRouter } from "./app/controllers/book.controller";
import { borrowRouter } from "./app/controllers/borrow.controller";

const app: Application = express();

app.use(express.json());

app.use("/api/books", booksRouter);
app.use("/api/borrow", borrowRouter);

app.get("/", (req, res) => {
	res.send("Server is running");
});

export default app;
