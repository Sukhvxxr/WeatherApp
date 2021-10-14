const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), { origin: "cors" });
    const respData = await resp.json();

    console.log(respData);
    addWeatherToPage(respData);
}


function addWeatherToPage(data) {
    const temp = KtoC(data.main.temp);

    const weather = document.createElement("div");

    
    weather.classList.add("weather");
    console.log(weather.classList);

    weather.innerHTML = `
        <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> 
        ${temp}°C <img 
        src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
        
        <small>${data.weather[0].main}</small>
        <h2>${data.name}</h2>
    `;

    // cleanup
    main.innerHTML = "";

    main.appendChild(weather);

    // condition loop for background img
    if (data.weather[0].main=='Clear'){
        document.body.style.backgroundImage="url('./Assets/clear.jpg')";
      }
      else if(data.weather[0].main=='Thunderstorm'){
        document.body.style.backgroundImage="url('./Assets/thunderstrom.jpg')";
      }
      else if(data.weather[0].main=='Snow'){
        document.body.style.backgroundImage="url('./Assets/snow.jpg')";
      }
      else if(data.weather[0].main=='Clouds'){
        document.body.style.backgroundImage="url('./Assets/clouds.jpg')";
      }
      else if(data.weather[0].main=='Rain'){
        document.body.style.backgroundImage="url('./Assets/rain.jpg')";
      }
      else if(data.weather[0].main=='Drizzle'){
        document.body.style.backgroundImage="url('./Assets/drizzle.jpg')";
      }
      else {
        document.body.style.backgroundImage="url('./Assets/atmosphere.jpg')";
      }
}

function KtoC(K) {
    return Math.floor(K - 273.15);
}


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const city = search.value;

    if (city) {
        getWeatherByLocation(city);
    }
});