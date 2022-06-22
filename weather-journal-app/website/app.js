    /* Global Variables */
    //Personal API key for OpenWeatherApp API
    // 'https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}'

    //const { default: axios } = require("axios");

    const baseURI = 'https://api.openweathermap.org/data/2.5/weather?zip=';
    const apiKey = '&appid=4b6a0d9c0ced5dd9bd93259756f7c52f&units=imperial';
    //defining the variables
    const zip = document.querySelector('#zip');
    const feelings = document.querySelector('#feelings');
    const generate = document.querySelector('#generate');
    const temp = document.querySelector('#temp');
    const content = document.querySelector('#content');
    const date = document.querySelector('#date')



    // Create a new date instance dynamically with JS
    let d = new Date();
    let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();


    // Event listener to add function to existing HTML DOM element
    document.getElementById('generate').addEventListener('click', (event) => {
        /* Function called by event listener */
        event.preventDefault();

        //fetch weather Data from OpenWeatherApi
        const weather = `${baseURI}${zip.value}${apiKey}`;
        weatherData(weather).then(data => {
            console.log(data);
            postData("/add", { date: newDate, temp: data.main.temp, content: feelings.value.trim() }).then(res => {
                location.reload();
            })
        })
    })



    /* Function to GET Web API Data*/
    const weatherData = async(url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log('error', error);
        }
    };


    //https://classroom.udacity.com/nanodegrees/nd0011-edoworx/parts/cd0429/modules/7def9f6a-9656-42f9-8d02-1d6868014809/lessons/ls1846/concepts/10e4b6e9-1248-4ad9-abaf-c416cd6ca4eb
    /* Function to POST data */

    const postData = async(url, data) => {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        try {
            const newData = await response.json();
            console.log(newData);
            return newData;
        } catch (error) {
            console.log('error', error);
        }

    };



    //https://review.udacity.com/#!/rubrics/4671/view
    const retrieveData = async() => {
        const request = await fetch('/all');
        try {
            // Transform into JSON
            const allData = await request.json()
            console.log(allData)
                // Write updated data to DOM elements
            if (Object.keys(allData).length > 0) {
                date.innerHTML = allData.date;
                temp.innerHTML = Math.round(allData.temp) + 'degrees';
                content.innerHTML = allData.content;
            }

        } catch (error) {
            console.log('error', error);
            // appropriately handle the error
        }
    }

    retrieveData().then(res => {
        console.log("data retrieval successful")
    })