const form = document.querySelector("form");
const weatherInfo = document.querySelector(".weather-info-cont");
const returnBtn = document.querySelector(".weather-info-cont .submit-button")

const getWeatherInfo = async (city) => {
    const APIKey = "b3b3db6000e67ca4cc2a0cb74806f0ab"

    let geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`)
    let geoData = await geoResponse.json()
    
    const latitude = geoData[0].lat
    const longitude = geoData[0].lon
    
    let weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIKey}`)
    return await weatherResponse.json()
}

form.addEventListener("submit", (e)=>{
    e.preventDefault()
    const cityInput = e.target.children[1].children[0]
    getWeatherInfo(cityInput.value)
    .then((data)=>{
        console.log(data)
        form.style.display = "none";
        weatherInfo.style.display = "block";
        
        weatherInfo.children[0].textContent = data.name
        weatherInfo.children[1].textContent = `The Current Temperature is: ${data.main.temp} Farenheit`;
        weatherInfo.children[2].textContent = `It is currently ${data.weather[0].description}`
    })
    .catch((message)=>{
        form.style.display = "none";
        weatherInfo.style.display = "block";

        weatherInfo.children[0].textContent = `There was an error getting your weather data, please try again!`;
    })
})

returnBtn.addEventListener("click",()=>{
    form.style.display = "block";
    weatherInfo.style.display = "none";
})