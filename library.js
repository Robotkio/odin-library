
/* this is the new, re-factored book class */
class Book {
    #title;
    #author;
    #read;
    #id;
    constructor(title, author) {
        this.#title = title;
        this.#author = author;
        this.#read = false;
        this.#id = crypto.randomUUID();
    }
    get title() { return this.#title; }
    get author() { return this.#author; }
    get read() { return this.#read; }
    get id() { return this.#id;}
    toggleRead() {
        this.#read = !this.#read;
    }
}

/* I decided to make a new library class to handle itself */
class Library {
    #library;
    constructor() {
        this.#library = [];
    }
    addBook(book) {
        this.#library.push(book);
    }
    removeBook(id) {
        this.#library = this.#library.filter(book => book.id !== id);
    }
    get books() {
        return this.#library;
    }
}

const libraryFunc = (function () {
    // page setup
    _btnAddBook = document.getElementById("submit-book");
    _libraryDisplay = document.getElementById("library");
    _internalLibrary = new Library();

    _btnAddBook.addEventListener("click", (event) => {
        event.preventDefault();
        addBookToLibrary();
    });

    /* re-draws all books in myLibrary into the library element */
    function _updateLibraryDisplay() {
        _libraryDisplay.innerHTML = "";
        _internalLibrary.books.forEach((book) => {
            _libraryDisplay.appendChild(_buildBookCard(book));
        });
    }

    /* reads values from the form, creates a book, adds it to myLibrary 
    and updates the display */
    function addBookToLibrary(book) {
        if (!book) {
            let title = document.getElementById("title").value;
            let author = document.getElementById("author").value;
            book = new Book(title, author);
        }
        _internalLibrary.addBook(book);
        _updateLibraryDisplay();
    }

    /* takes the id of a book, removes it from myLibrary and updates the
    display */
    function removeBookFromLibrary(id) {
        _internalLibrary.removeBook(id);
        _updateLibraryDisplay();
    }

    /* take a book object and returns a "card" element that can 
    display the book */
    function _buildBookCard(book) {
        // create containing card element
        let containing = document.createElement("div");
        containing.classList.add("book");
        containing["id"] = book.id;

        // create the delete icon element
        let delIco = document.createElement("div");
        delIco.classList.add("del-ico");
        
        let delIcoSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        delIcoSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        delIcoSvg.setAttribute("viewBox", "0 0 24 24");

        let delIcoTitle = document.createElement("title");
        delIcoTitle.innerText = "delete-circle";
        
        let delIcoPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        delIcoPath.setAttribute("d", "M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M17,7H14.5L13.5,6H10.5L9.5,7H7V9H17V7M9,18H15A1,1 0 0,0 16,17V10H8V17A1,1 0 0,0 9,18Z");

        delIco.addEventListener("click", (event) => {
            removeBookFromLibrary(event.target.parentElement.id);
        });

        delIcoSvg.appendChild(delIcoTitle);
        delIcoSvg.appendChild(delIcoPath);
        delIco.appendChild(delIcoSvg);
        containing.appendChild(delIco);

        // create read icon element
        let readIco = document.createElement("div");
        readIco.classList.add("read-ico");

        let readIcoSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); 
        readIcoSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        readIcoSvg.setAttribute("viewbox", "0 0 24 24");

        let readIcoTitle = document.createElement("title");
        let readIcoPath = document.createElementNS("http://www.w3.org/2000/svg", "path");

        if (book.read) {
            readIcoTitle.innerText = "bookmark-check-outline";
            readIcoPath.setAttribute("d", "M9.47 9.65L8.06 11.07L11 14L16.19 8.82L14.78 7.4L11 11.18M17 3H7C5.9 3 5 3.9 5 5L5 21L12 18L19 21V5C19 3.9 18.1 3 17 3M17 18L12 15.82L7 18V5H17Z");
        } else {
            readIcoTitle.innerText = "bookmark-remove";
            readIcoPath.setAttribute("d", "M17,3A2,2 0 0,1 19,5V21L12,18L5,21V5C5,3.89 5.9,3 7,3H17M8.17,8.58L10.59,11L8.17,13.41L9.59,14.83L12,12.41L14.41,14.83L15.83,13.41L13.41,11L15.83,8.58L14.41,7.17L12,9.58L9.59,7.17L8.17,8.58Z");
        }

        readIco.addEventListener("click", () => {
            book.toggleRead();
            _updateLibraryDisplay();
        });

        readIcoSvg.appendChild(readIcoTitle);
        readIcoSvg.appendChild(readIcoPath);
        readIco.appendChild(readIcoSvg);
        containing.appendChild(readIco);

        // create title element
        let title = document.createElement("div");
        title.classList.add("title");
        title.innerText = book.title;
        containing.appendChild(title);

        // create author element
        let author = document.createElement("div");
        author.classList.add("author");
        author.innerText = book.author;
        containing.appendChild(author);

        // create id element
        let id = document.createElement("div");
        id.classList.add("id");
        id.innerText = book.id;
        containing.appendChild(id);

        return containing;
    }

    _updateLibraryDisplay();
    return { addBookToLibrary, removeBookFromLibrary }
})();

libraryFunc.addBookToLibrary(new Book("Awesome Example Book", "Fake Author Esq."));