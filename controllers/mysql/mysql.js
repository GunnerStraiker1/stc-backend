var mysql = require('mysql');

function insertarDBPrograma(req, res, cn, programs) {
    var sql = "INSERT INTO programas (nombre, objetivo, descripcion, cobertura,"+
        " requisitos, programa, periodo) VALUES ?"
    cn.query(sql, [programs], (err, result)=>{
        if(err) throw err 
        res.send(result)
    })
}

function obtenerDBPrograma(req, res, cn, programs) {
    var sql = "SELECT * FROM programas"
    cn.query(sql, (err, result)=>{
        if(err) throw err 
        res.send(result)
    })
}

module.exports={
    insertarDBPrograma, obtenerDBPrograma
}