var mysqlFuncs = require('./mysql/mysql')
var uploadExcel = require('./uploads')

async function insertarPrograma(req, res, cn) {
    req.params.data= "program"
    uploadExcel.uploadExcel(req, res, cn)
}

function obtenerProgramas(req, res, cn) {
    // req.params.data= "program"
    mysqlFuncs.obtenerDBPrograma(req, res, cn);
    // uploadExcel.uploadExcel(req, res, cn)
}

module.exports={
    insertarPrograma,
    obtenerProgramas
}