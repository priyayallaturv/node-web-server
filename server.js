const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
//register middlerware
//order of this matters

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}:${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) =>{
    if(err){
        console.log('Unable to the server');
    }
  });
  next(); // if middleware doesnt call next then express is never called
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

//setup partials
hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})
app.get('/', (req, res) => {
  //res.send('<h1>hello express!</h1>');
  // res.send({
  //   name: 'Priya',
  //   likes:[
  //     'traveling',
  //     'hiking'
  //   ]
  // });
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
    //moving to hbs rendering
    //currentYear: new Date().getFullYear()
  });
});

app.get('/about',(req, res) => {
    //res.send('About Page');
    res.render('about.hbs', {
      pageTitle: 'About Page'
      //moving to hbs rendering
      //currentYear: new Date().getFullYear()
    });
});

app.get('/bad',(req, res) => {
  res.send({
    errorMessage: 'Bad request'
  });
});
app.listen(port,() => {
  console.log(`Server is running on port ${port}`);
});
