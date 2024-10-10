var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mysql = require('mysql2');
var app = express();
app.use(cors());

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const books = [
    {isbn: '1', name: 'Book 1', price: '100.000 VND', desciption: 'Description 1'},
    {isbn: '2', name: 'Book 2', price: '200.000 VND', desciption: 'Description 2'},
    {isbn: '3', name: 'Book 3', price: '300.000 VND', desciption: 'Description 3'}
];

const authors = [
    {id: '1', name: 'Author 1', dob: '01/01/1991', avatar: 'https://www.w3schools.com/w3images/avatar2.png'},
    {id: '2', name: 'Author 2', dob: '02/02/1992', avatar: 'https://www.w3schools.com/w3images/avatar3.png'},
    {id: '3', name: 'Author 3', dob: '03/03/1993', avatar: 'https://www.w3schools.com/w3images/avatar4.png'}
];

//Xem thông tin sách và tác giả
app.get('/getBooks', function (req, res) {
    res.send(books);
});

app.get('/getAuthors', function (req, res) {
    res.send(authors);
});

//Thêm sách và tác giả
app.post('/addBook', function (req, res) {
    const book = req.body;
    books.push(book);
    res.send(books);
});

app.post('/addAuthor', function (req, res) {
    const author = req.body;
    authors.push(author);
    res.send(authors);
});

//Cập nhật sách và tác giả
app.put('/updateBook', function (req, res) {
    const book = req.body;
    const index = books.findIndex(b => b.isbn === book.isbn);
    books[index] = book;
    res.send(books);
});

app.put('/updateAuthor', function (req, res) {
    const author = req.body;
    const index = authors.findIndex(a => a.id === author.id);
    authors[index] = author;
    res.send(authors);
});

//Xóa sách và tác giả
app.delete('/deleteBook/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const index = books.findIndex(b => b.isbn === isbn);
    books.splice(index, 1);
    res.send(books);
});

app.delete('/deleteAuthor/:id', function (req, res) {
    const id = req.params.id;
    const index = authors.findIndex(a => a.id === id);
    authors.splice(index, 1);
    res.send(authors);
});

var server = app.listen(5505, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Server is running at http://%s:%s', host, port);
});

var con = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "12082019",
    insecureAuth : true,
    database: "bookstore"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!!!")
    var sql = "SELECT * FROM books";
    con.query(sql, function(err, results) {
    if (err) throw err;
    console.log(results);
    })
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!!!")
    var sql = "SELECT * FROM authors";
    con.query(sql, function(err, results) {
    if (err) throw err;
    console.log(results);
    })
});

app.get('/getAllBooks', function (req, res) {
    var sql = "SELECT * FROM books";
    con.query(sql, function(err, results) {
    if (err) throw err;
    res.send(results);
    });
})

app.get('/getAllAuthors', function (req, res) {
    var sql = "SELECT * FROM authors";
    con.query(sql, function(err, results) {
    if (err) throw err;
    res.send(results);
    });
})