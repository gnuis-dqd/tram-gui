const bookForm = document.getElementById("bookForm");
const bookList = document.getElementById("bookList");

async function loadBooks() {
  const res = await fetch("/api/books");
  const books = await res.json();

  bookList.innerHTML = "";

  books.forEach(book => {
    const card = document.createElement("div");
    card.className = "book-card";

    card.innerHTML = `
      <h3>${book.name}</h3>
      <p>Loại: ${book.category}</p>
      <p>Tình trạng: ${book.condition}</p>
      <p class="price">${book.price.toLocaleString("vi-VN")} VND</p>
      <p>Trạng thái: ${book.status}</p>
      <p>Còn: ${book.daysLeft} ngày</p>
      <button class="delete-btn" onclick="deleteBook(${book.id})">Xóa</button>
    `;

    bookList.appendChild(card);
  });
}

bookForm.addEventListener("submit", async function(e) {
  e.preventDefault();

  const book = {
    name: document.getElementById("name").value,
    category: document.getElementById("category").value,
    condition: document.getElementById("condition").value,
    price: document.getElementById("price").value
  };

  await fetch("/api/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(book)
  });

  bookForm.reset();
  loadBooks();
});

async function deleteBook(id) {
  await fetch(`/api/books/${id}`, {
    method: "DELETE"
  });

  loadBooks();
}

loadBooks();
