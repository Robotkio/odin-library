const trash_ico = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete-circle</title><path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M17,7H14.5L13.5,6H10.5L9.5,7H7V9H17V7M9,18H15A1,1 0 0,0 16,17V10H8V17A1,1 0 0,0 9,18Z" /></svg>';
let myLibrary = [];
const btnAddBook = document.getElementById("submit-book");
const libraryDisplay = document.getElementById("library");

function Book(title = "", author = "") {
    if (!new.target) { throw Error("new not used"); }
    this.title = title;
    this.author = author;
    this.id = crypto.randomUUID();
}

btnAddBook.addEventListener("click", (event) => {
    event.preventDefault();
    addBookToLibrary();
});

updateLibraryDisplay();

function addBookToLibrary() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let book = new Book(title, author);
    myLibrary.push(book);

    updateLibraryDisplay();
}

function removeBookFromLibrary(id) {
    myLibrary = myLibrary.filter((book, index, array) => {
        return book.id == id ? null : book;
    });
    updateLibraryDisplay();
}

function updateLibraryDisplay() {
    libraryDisplay.innerHTML = "";
    myLibrary.forEach((book) => {
        libraryDisplay.appendChild(buildBookCard(book));
    });
}

function buildBookCard(book) {
    let containing = document.createElement("div");
    containing.classList.add("book");
    containing.setAttribute("id", book.id);

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

    let title = document.createElement("div");
    title.classList.add("title");
    title.innerText = book.title;
    containing.appendChild(title);

    let author = document.createElement("div");
    author.classList.add("author");
    author.innerText = book.author;
    containing.appendChild(author);

    let id = document.createElement("div");
    id.classList.add("id");
    id.innerText = book.id;
    containing.appendChild(id);

    return containing;
}