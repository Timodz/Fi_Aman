const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const restify = require('express-restify-mongoose')
const app = express()
const router = express.Router()
const path = require('path')
const _Hajj = require('./models/Hajj')
const _Admin = require('./models/Admin')
const db = require('./config/db')

app.use(bodyParser.json())
app.use(methodOverride())

app.use(express.static(__dirname + '/public'));

const {Schema} = mongoose

// mongoose.connect('mongodb://terry_baz:hajjhack2018@ds157901.mlab.com:57901/hajjhack')
mongoose.connect('mongodb://'+db.username+':'+db.password+'@127.0.0.1:'+db.port+'/'+db.dbname)


var Hajj = new mongoose.Schema(_Hajj)

restify.serve(router, mongoose.model('Hajj', Hajj))


var Admin = new mongoose.Schema(_Admin)

restify.serve(router, mongoose.model('Admin', Admin))


app.use(router)

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// app.get('/dashboard', function(req, res) {
//     res.sendFile(path.join(__dirname + '/public/home.html'));
// });

app.get('/dashboard', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/dashboard.html'));
});


app.get('/statistics', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/statistics.html'));
});

app.listen(3000, () => {
    console.log('Express server listening on port 3000')
})