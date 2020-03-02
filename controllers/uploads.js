var multer = require('multer');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var fs = require('fs');
var mysqlFuncs = require('./mysql/mysql')

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});
var upload = multer({ //multer settings
        storage: storage,
        fileFilter : function(req, file, callback) { //file filter
            if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
                return callback(new Error('Wrong extension type'));
            }
            callback(null, true);
        }
    }).single('file');

function uploadExcel(req, res, cn) {
    var exceltojson;
    upload(req,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
        /** Multer gives us file info in req.file object */
        if(!req.file){
            res.json({error_code:1,err_desc:"No file passed"});
            return;
        }
        /** Check the extension of the incoming file and
         *  use the appropriate module
         */
        if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }
        try {
            exceltojson({
                input: req.file.path,
                output: null, //since we don't need output.json
                lowerCaseHeaders:true
            }, function(err,result){
                if(err) {
                    res.json({error_code:1,err_desc:err, data: null, info: result});
                    return
                }

                var data = [];
                switch (req.params.data) {
                    case 'program':
                        result.map((program) =>{
                            if (program.name != '') {
                                data.push(
                                    [program.nombre,
                                    program.objetivo,
                                    program.descripcion,
                                    program.cobertura,
                                    program.requisitos,
                                    program.programa,
                                    program.periodo]
                                    )
                            }
                        })
                        mysqlFuncs.insertarDBPrograma(req, res, cn, data)
                        break;

                    case 'indice':
                        result.map((program) =>{
                            if (program.name != '') {
                                data.push(
                                    [program.nombre,
                                    program.objetivo,
                                    program.descripcion,
                                    program.cobertura,
                                    program.requisitos,
                                    program.programa,
                                    program.periodo]
                                    )
                            }
                        })
                        break;
                
                    default:
                        break;
                }






                // res.json({error_code:0,err_desc:null, data: result});
                // return
            });
        } catch (e){
            res.json({error_code:1,err_desc:"Corupted excel file"});
        }
        try {
            fs.unlinkSync(req.file.path);
        } catch(e) {
            //error deleting the file
        }
    })
}

module.exports = {
    uploadExcel,
}
