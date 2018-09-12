const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

const port = process.env.PORT || 8080;

var app=express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('scremIt', (text) =>{
  return text.toUpperCase();
});

app.set('view engine','hbs');

// Express Middleware

app.use((req,res,next)=>{
  var dat=new Date().toString();
  var slog=`Date : ${dat},Request Method : ${req.method},Request URL : ${req.url}`
  console.log(slog);
  fs.appendFile('server.log',slog + '\n',(err)=>{
if(err){
    console.log("Problem occured while writing the log");
}
  });
  next();
})

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));

// app.get('/',(req,res)=>{
//   res.send("Hello Appa");
// });

app.get('/json',(req,res)=>{
  res.send({
    Name : 'Allimuthu',
    RelationShip : 'Appa'
  });
});

app.get('/bad',(req,res)=>{
  res.send("page not avaliable");
});

app.get('/jsonbad',(req,res)=>{
  res.send({
     Code : '404',
    Desc : 'page not found'
  });
});

//hbssssssssssssssss

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    PageTitle:'About Page',
    Name : 'Allimuthu',
    //CurrentYear:new Date().getFullYear()
  });
});

app.get('/',(req,res)=>{
  res.render('home.hbs',{
    PageTitle:'Home Page',
    welcome : 'Welcome to first Node web site'
  //  CurrentYear : new Date().getFullYear()
});
});

app.listen(port,()=>{
  console.log(`Server is up and running on ${port}`);
});
