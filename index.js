 const express = require('express');
const app = express();
const morgan = require('morgan');
const port = 8000;
const db = require('./config/mongoose');
const bodyParser = require('body-parser');

//Using Morgan
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS Error Handle
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

app.use('/', require('./routes'));

//Handling Errors if none of the Routes Works

app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message:error.message
        }
    });
});

//Setting up server
app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});