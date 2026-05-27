const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

let books = [
  {
    id: 1,
    name: "Kinh tế vi mô",
    category: "Giáo trình",
    condition: "Loại A",
    price: 65000,
    status: "Đang bán",
    daysLeft: 14
  }
];

app.get("/api/books", (req, res) => {
  res.json(books);
});

app.post("/api/books", (req, res) => {
  const newBook = {
    id: Date.now(),
    name: req.body.name,
    category: req.body.category,
    condition: req.body.condition,
    price: Number(req.body.price),
    status: "Đang chờ duyệt",
    daysLeft: 30
  };

  books.push(newBook);
  res.json(newBook);
});

app.delete("/api/books/:id", (req, res) => {
  books = books.filter(book => book.id !== Number(req.params.id));
  res.json({ message: "Đã xóa sách" });
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});