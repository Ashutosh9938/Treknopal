const mysql = require('../app/config/connection').con;

function viewblog(req,res){
    let qry = "SELECT * FROM blogpost";
    mysql.query(qry, (err, results) => {
        if (err) throw err;
        else {
           res.render('blogpage', {blogposts: results});
        }
    }); 
}

module.exports = viewblog;