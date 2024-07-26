console.log("Hello World!\n==========\n");

// PROJECT Section
console.log("PROJECT:\n==========\n");

const books = [
    {
        id: 1,
        title: "Name of the Wind",
        author: "Patrick Rothfuss",
        read: true,
    }
]

class Book {
    constructor(id, title, author, read) {
      this.id = id;
      this.title = title;
      this.author = author;
      this.read = read;
    }
  }

  class Library {
    constructor(books) {
        this.bookCount = books.length;
        this.books = books;
    }

    addBook() {
        console.log("addBook")
        //Select the inputs from the form -- title, author and read
        const title = document.getElementById("title");
        const author = document.getElementById("author");
        const read = document.getElementById("read");
        //Increment book count property
        this.nextId++;
        //Create an instance form my Book class with the input values
        const newBook = new Book(
            this.nextId, 
            title.value, 
            author.value, 
            read.checked
        );
         //pass new book instance into the array 
        this.books.push(newBook);
        // Select the table body
        const tbody = document.getElementById("tableBody");
        //Create new table row
        const newTr = document.createElement("tr");
        newTr.classList.add(newBook.id);
        newTr.addEventListener("dblclick", () => {
            this.removeBook(newBook.id);
            //this.removeBook(parseInt(event.target.classList[0]));
        });
        //Create 3 new table data cells
        const newTitle = document.createElement("td");
        const newAuthor = document.createElement("td");
        const newRead = document.createElement("td");
        //Add text content to td's with book values
        newTitle.textContent = title.value;
        newAuthor.textContent = author.value;
        const newCheckBox = document.createElement("input");
        newCheckBox.classList.add(newBook.id);
        newCheckBox.type = "checkbox";
        newCheckBox.checked = read.checked;
        newCheckBox.disabled = read.checked;
        newCheckBox.addEventListener("click", (event) => {
            console.log(event.target.classList[0]);
            this.markRead(event.target, newBook.id);
        });
        newRead.appendChild(newCheckBox);
        //Append the td's to the tr'
        newTr.append(newTitle);
        newTr.append(newAuthor);
        newTr.append(newRead);
        //Append the tr to the tbody
        tbody.appendChild(newTr);
    }
    // loops through each book, compares id passed in to books id
    markRead(checkbox, id) { 
        console.log(checkbox);
        console.log(id);

        this.books.forEach((book) => {
            if(id === book.id) {
                book.read = true;
                checkbox.disabled = true;
            }
        });
    }

    removeBook(bookId) {
        // Reassign the books array after filtering out the remove book
        this.books = this.books.filter(({id}) => bookId !== id);
        // Remove the book from the DOM
        const tbody = document.getElementById("tableBody");
        tbody.removeChild(document.getElementsByClassName(bookId)[0]);
    }
  }

  const library = new Library(books);

  const form = document.getElementById("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
        library.addBook();
  });