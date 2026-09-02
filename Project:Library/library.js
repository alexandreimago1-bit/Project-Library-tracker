const myLibrary = [];
// variables
const newBookBtn = document.getElementById("new-book-btn");
const bookDialog = document.getElementById("book-dialog");
const bookForm = document.getElementById("book-form");
const libraryContainer = document.getElementById("library-container");
const cancelBtn = document.getElementById("cancel-btn");


// Book constructor
function Book(title, author, pages, read){
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function(){
    this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false);

console.log(myLibrary);

console.log(myLibrary[0].read);

myLibrary[0].toggleRead();

console.log(myLibrary[0].read);

function renderLibrary(){
libraryContainer.innerHTML = "";

    myLibrary.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.setAttribute("data-id", book.id);

        const title = document.createElement("h3");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = `Author: ${book.author}`;

        const pages = document.createElement("p");
        pages.textContent = `Pages: ${book.pages}`;

        const readBtn = document.createElement("button");
        readBtn.textContent = book.read ? "Read" : "Not Read";
        readBtn.classList.add(book.read ? "read" : "not-read");
        readBtn.addEventListener("click", () => {
            book.toggleRead();
            readBtn.textContent = book.read ? "Read" : "Not Read";
            readBtn.classList.toggle("read");
            readBtn.classList.toggle("not-read");
        });

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => {
            const index = myLibrary.findIndex(b => b.id === book.id);
            if (index !== -1) {
                myLibrary.splice(index, 1);
                libraryContainer.removeChild(bookCard);
            }
        });

        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(pages);
        bookCard.appendChild(readBtn);
        bookCard.appendChild(removeBtn);

        libraryContainer.appendChild(bookCard); 
    })
}

renderLibrary();

newBookBtn.addEventListener("click", () => {
    bookDialog.showModal();
});

cancelBtn.addEventListener("click", () => {
    bookDialog.close();
});

bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    addBookToLibrary(title, author, pages, read);
    renderLibrary();

    bookForm.reset();
    bookDialog.close();
});
