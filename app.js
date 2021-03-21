
const api_key = "at_ZzZVjArXnOH1rZilfV6dLLU3znxTE";
const tokenMapBox = 'pk.eyJ1IjoiZGFtaWVuNDciLCJhIjoiY2ttaWZjdGlkMGdwZjJvcTQ0cnQ0OGFsZCJ9.UXafMQTbzWAr3_sjxdsX1w';
let resultAPI;

const enteredIP = document.querySelector('.inputIP input');
const submitButton = document.querySelector('.inputIP button');
const printIp = document.querySelector('.result-ip');
const printLocation = document.querySelector('.result-location');
const printTime = document.querySelector('.result-time');
const printIsp = document.querySelector('.result-isp');

let mymap = L.map('map').setView([48, 2], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: `${tokenMapBox}`
}).addTo(mymap);

submitButton.addEventListener('click', (e)=>{
    e.preventDefault();
    fetchIP(enteredIP.value);
});


function fetchIP(ipRead){
    fetch(`https://geo.ipify.org/api/v1?apiKey=${api_key}&ipAddress=${ipRead}`)
    .then((response) => {
        return response.json();
    })
    .then((dataIP) => {
        resultAPI = dataIP;
        console.log(resultAPI);

        if(resultAPI.ip === undefined){
            printIp.innerText = 'Invalid IP Address';
            printLocation.innerText = 'Invalid IP Address';
            printTime.innerText = 'Invalid IP Address';
            printIsp.innerText = 'Invalid IP Address';
        } else {
            printIp.innerText = resultAPI.ip;
            printLocation.innerText = `${resultAPI.location.country.toUpperCase()}: ${resultAPI.location.city}`;
            printTime.innerText = resultAPI.location.timezone;
            printIsp.innerText = resultAPI.isp;
            mymap.setView([resultAPI.location.lat, resultAPI.location.lng], 15);
        }



    });
}

function printData(){

}