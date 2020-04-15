// server.js
// load the things we need
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var db = mongoose.connection;
// mongoose.connect('mongodb://localhost/nema', { useNewUrlParser: true, useFindAndModify: false });


var bodyParser = require('body-parser');
app.use(bodyParser.json())
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));


mongoose.connect('mongodb+srv://sayil:sayil2194@cluster0-knm9b.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});

const Message = require('./messageSchema')
// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/', function (req, res) {
    res.render('index', {title : "welcome to covid"});
});

app.post('/save', function (req, res) {
    var message = new Message({
        state: "Lagos State",
        call: [ 08023169495, 08033565529, 08052817243, 08028971864],
        location: {
            type: "Point",
            coordinates: [3.406448, 6.465422]
        },
    });
    message.save((err, message) => {
        if (err) console.log(err);
        console.log(message);
        res.send(message)
    });
})

app.post('/find', (req, res) => {
    let long = req.body.long
    let lat = req.body.lat
    Message.createIndexes();
    Message.find({
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [long, lat]
                },
                $maxDistance: 90000
            }
        }
    }).find((error, results) => {
        if (error) console.log(error);
        console.log(JSON.stringify(results, 0, 2));
        res.send(results)
       
    });

    console.log(req.body)
})
app.post('/fing', (req, res) => {
    // Message.findOne((error, results) => {
    //     if (error) console.log(error);
    //     console.log(JSON.stringify(results, 0, 2));
    //     res.send(JSON.stringify(results, 0, 2))
    // });

    console.log('working')
    res.send(req.body.firstName)
})

// about page 
app.get('/about', function (req, res) {
    res.render('pages/about');
});

app.listen(8080);
console.log('8080 is the magic port');