const mysql = require('../app/config/connection').con;

function postblog(req,res){
    title = req.body.title;
    subtitle = req.body.subtitle;
    description = req.body.description;
    note = req.body.note;
    conclusion = req.body.conclusion;
    if(req.file){
        files = req.file.path
        const newFile = files.replace('uploads\\photos\\', '');
        let qry = "INSERT INTO blogpost (title, subtitle, description , conclusion , note, image ) values (?, ?, ?, ?, ?, ?)";
        mysql.query(qry, [title,subtitle,description, conclusion, note, newFile], (err, results) => {
            if (err) throw err;
            else {
                res.redirect('/viewblog');
            }
        });
    }else{
        let qry = "INSERT INTO blogpost (title, subtitle, description , conclusion , note ) values (?, ?, ?, ?, ?)";
        mysql.query(qry, [title,subtitle,description, conclusion, note], (err, results) => {
            if (err) throw err;
            else {
                res.redirect('/viewblog');
            }
        }); 
    }
    
}   

module.exports = postblog;