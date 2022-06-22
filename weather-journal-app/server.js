// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const app = express();

// Start up an instance of app
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 3000;
// Setup Server
const server = app.listen(port, listening);


function listening() {
    console.log('Server running');
    console.log(`running on localhost: ${port}`);
};

//get function
// Callback function to complete GET '/all'
app.get('/all', sendData);

function sendData(request, response) {
    response.send(projectData);
}

//post Route function
app.post('/add', addData);

function addData(request, response) {
    console.log(request.body)
    projectData.date = request.body.date;
    projectData.temp = request.body.temp;
    projectData.content = request.body.content;
    response.send(projectData);
}