// ^ first card
let cityname = document.getElementById("cityname");
let degree1 = document.getElementById("degree1");
let todayStateImg = document.getElementById("todayStateImg");
let todayStateText = document.getElementById("todayStateText");
let humidity = document.getElementById("humidity");
let windToday = document.getElementById("wind-today");
let windDirection1 = document.getElementById("windDirection1");
let nextmaxtemp = document.getElementById("nextmaxtemp");
let nextmaxtemp2 = document.getElementById("nextmaxtemp2");
let minDegree=document.getElementById("minDegree1");
let minDegree2=document.getElementById("minDegree2");
let nextIcon1=document.getElementById("nextIcon1")
let nextIcon2=document.getElementById("nextIcon2")
let nextState1=document.getElementById("nextState1")
let nextState2=document.getElementById("nextState2")
let todayName=document.getElementById("todayName")
let numDay=document.getElementById("numDay")
let mayName=document.getElementById("mayName")
let lastDayName=document.getElementById("lastDayName")
let nextDayName=document.getElementById("nextDayName")
let yourLocation=document.getElementById("yourLocation")















// ! fetch Api Data
async function getWeatherData(city) {
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=eae08abc8f834ba7bbf73105241410&q=${city}&days=3`)
    let weatherData = await weatherResponse.json()
    return weatherData;
}


//! display today data
function DisplayTodayData(data) {

    todayName.innerHTML= new Date().toLocaleDateString("en-us",{weekday:"long"})
    numDay.innerHTML=new Date().getDate()
    mayName.innerHTML=new Date().toLocaleDateString("en-us",{month:"long"})
    cityname.innerHTML = data.location.name;
    degree1.innerHTML = data.current.temp_c;
    todayStateImg.setAttribute("src", data.current.condition.icon);
    todayStateText.innerHTML = data.current.condition.text;
    humidity.innerHTML = data.current.humidity + "%";
    windToday.innerHTML = data.current.wind_kph + "km/h";
    windDirection1.innerHTML = data.current.wind_dir;
}

//! display next data
function displayNextData(data) {
    nextDayName.innerHTML=new Date(data.forecast.forecastday[1].date).toLocaleDateString("en-us",{weekday:"long"})
    lastDayName.innerHTML=new Date(data.forecast.forecastday[2].date).toLocaleDateString("en-us",{weekday:"long"})
    nextmaxtemp.innerHTML = data.forecast.forecastday[1].day.maxtemp_c
    nextmaxtemp2.innerHTML = data.forecast.forecastday[2].day.maxtemp_c
    minDegree.innerHTML=data.forecast.forecastday[1].day.mintemp_c+`<sup> o </sup> c`;
    minDegree2.innerHTML=data.forecast.forecastday[2].day.mintemp_c+`<sup> o </sup> c`;
    nextIcon1.setAttribute("src",data.forecast.forecastday[1].day.condition.icon)
    nextIcon2.setAttribute("src",data.forecast.forecastday[2].day.condition.icon)
    nextState1.innerHTML=data.forecast.forecastday[1].day.condition.text;
    nextState2.innerHTML=data.forecast.forecastday[2].day.condition.text;
    


}

//* start app
async function StartApp(city="cairo") {
    let weatherData = await getWeatherData(city);
    if(!weatherData.error)
        {
    DisplayTodayData(weatherData);
    displayNextData(weatherData);
    }

}
StartApp()

yourLocation.addEventListener("input",function(){
    StartApp(yourLocation.value)
})