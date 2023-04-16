let userInput = document.querySelector('.userInput'),
flashMag = document.querySelector('#flashMag'),
 weather = document.querySelector('.weather'),
 //Get Info 
 InputCity = document.querySelector('#city'),
 locationBtn = document.querySelector('#getLocation'),

 backBtn = document.querySelector('.back'),
 weatherImg = document.querySelector('.weatherImg'),
 temperature = document.querySelector('.temp'),
 weatherStatus = document.querySelector('.weather-status'),
 weatherLocation = document.querySelector('.weather-location-name'),
 feelTemp = document.querySelector('.feel-temp'),
 Userhumidity = document.querySelector('.humidity');

 // add event Listiner
 locationBtn.addEventListener('click', getUserLocation);
 InputCity.addEventListener('keyup', getCityLocation);
 
//API
let API;
//Api Key
let key = `f8b8c4bf420eabf1562ebdb10416b045`;
 //get User Lication
function getUserLocation (e) {
    if(navigator){
        navigator.geolocation.getCurrentPosition(onSuccess,onError);
    }
    else{
        window.alert("Your Browser dosn't Support Geo Location");   
    }
    
}
//City Weather Collect
function getCityLocation(e){
    if(e.key == 'Enter' && InputCity.value != ""){
        requestCity(InputCity.value);
    }
}
function requestCity(cityName){
    API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${key}`;
    // console.log(API);
    fetachData();
}
function onSuccess(e){
    // console.log(e)
    details = e.coords;
    // console.log(details);
    let {latitude,longitude} = details;
    // console.log(latitude,longitude)
    API = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`;
    fetachData();
    // console.log(API)
}
function onError(e){
    flashMag.innerText = e.message;
    flashMag.style.color = '#ff0000';
    flashMag.style.background = '#ff000040';
}


function fetachData(){
    flashMag.innerText = 'Getting weather details...';
    flashMag.style.color = '#042404';
    flashMag.style.background = '#00ff004a';
    fetch(API)
    .then(response => response.json())
    .then(response => weatherDetails(response))
    .catch((e) => {
        flashMag.innerText = 'Something Wrong...';
        flashMag.style.color = '#ff0000';
        flashMag.style.background = '#ff000040';
    })
}

function weatherDetails(data){
    if(data.cod == "404"){
        flashMag.style.color = '#ff0000';
        flashMag.style.background = '#ff000040';
        flashMag.innerText = `${InputCity.value} is not valid city name`;
        InputCity.value = "";
    }
    else{
        userInput.style.display = 'none';
        weather.style.display = 'block';
        // console.log(data);
        let cityname = data.name;
        let country = data.sys.country;
        let {id, description} = data.weather[0];
        let {feels_like,humidity,temp} = data.main;

        if(id == 800){
            weatherImg.src = "assets/img/clear.svg";
        }else if(id >= 200 && id <= 232){
            weatherImg.src = "assets/img/storm.svg";  
        }else if(id >= 600 && id <= 622){
            weatherImg.src = "assets/img/snow.svg";
        }else if(id >= 701 && id <= 781){
            weatherImg.src = "assets/img/haze.svg";
        }else if(id >= 801 && id <= 804){
            weatherImg.src = "assets/img/cloud.svg";
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            weatherImg.src = "assets/img/rain.svg";
        }

        temperature.innerText = Math.round(temp);
        weatherStatus.innerText = description;
        weatherLocation.innerText = `${cityname}, ${country}`;
        feelTemp.innerText = Math.round(feels_like);
        Userhumidity.innerText = Math.round(humidity);
        InputCity.value = "";
    }
}
backBtn.addEventListener('click', openCard);
function openCard(){
    flashMag.innerText = '';
    flashMag.style.background = 'transparent';
    flashMag.style.color = '#000';
    
    userInput.style.display = 'block';
    weather.style.display = 'none';
}