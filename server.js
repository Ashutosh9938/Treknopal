const express = require('express');
const mysql = require('./app/config/connection').con;
const hbs = require('hbs');
const app = express();
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const port = 3000; 


let path = __dirname + '/views/';
let newpath = __dirname ;
app.use(express.static(path));
app.use(express.static(newpath));
app.set('view engine', 'hbs');

app.get('/postblog', (req, res) => {
    res.render(path + 'postblog'); 
});

app.get('/', (req, res) => {
    let qry = `SELECT * FROM blogpost ORDER BY id DESC LIMIT 3;`
    mysql.query(qry, (err, results) => {
        if (err) throw err;
        else {
            res.render(path + 'landing',{blogposts : results}); 
        }
    }); 
    
});

app.get('/admin', (req, res) => {
    res.render(path + 'admin'); 
});


app.post('/viewmore', urlencodedParser, (req, res) => {
    id = req.body.id
    let qry = `SELECT * FROM blogpost where id = ?`
     mysql.query(qry, [id], (err, results) => {
        if (err) throw err;
        else {
            res.render(path + 'singlePost', {blogposts : results}); 
        }
    }); 
});

const viewblog = require('./app/viewblog.js');

app.get('/viewblog', (req, res) => {
    viewblog(req, res)
});

const postblog = require('./app/postblog.js');
let PhotoUpload = require('./app/config/multer.photos.js');

app.post('/process_blog', urlencodedParser, PhotoUpload.single("image"), (req, res) => {
   postblog(req, res)
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});