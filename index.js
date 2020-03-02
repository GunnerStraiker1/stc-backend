var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var control = require('./controllers/programas')
var db = require('./controllers/mysql/data')
var multer = require('multer');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var fs = require('fs');

app.use(bodyParser.json());

db.connection.connect((err)=>{
    if(err) throw err
    console.log("Conectado");
});

app.get('/',function(req,res){
    res.sendFile(__dirname + "/index.html");
});

/** API path that will upload the files */
app.post('/upload', (req, res) => control.insertarPrograma(req, res, db.connection));
app.get('/programas', (req, res) => control.obtenerProgramas(req, res, db.connection));

app.listen('3000', function(){
    console.log('running on 3000...');
});