function Getdates(){
  const newdate = new Date();
  const date = newdate.getDate();
  const year = newdate.getFullYear();
  const month = newdate.getMonth();
  const day = newdate.getDay();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const datearr = {"date":date,"month":month,"year":year, "Day":days[day]};
  return datearr;
}

function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

        try {
          const response = await fetch(url, {
            headers: {
              'User-Agent': 'WeatherSphere/1.0 (youremail@example.com)',
              'Accept-Language': 'en'
            }
          });

          const data = await response.json();
          console.log(data);
          const complete_city = data.address.county || "Unknown";
          const city = complete_city.replace("mandal", "").trim();
          console.log(city); // Output: "kapra"
          resolve(city);
        } catch (error) {
          console.error("Error fetching city:", error);
          reject(error);
        }
      },
      function (error) {
        console.error("Error getting location:", error.message);
        reject(error);
      }
    );
  });
}


async function getData(cityName){
  const url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+cityName+"?unitGroup=us&key=VP8WSUHAEP7GLZWCPKFF4K8T4&contentType=json";
  const response = await fetch(url);
  const formatted_response = await response.json();
  return formatted_response;
}
async function updateinfo(){
  try {
  const searchInput = document.getElementById("searchBox");
  const cityName = searchInput.value.trim();
  if (!cityName) {
    alert("Please enter a city name."); 
    return;
  }
 
    const getdate = Getdates();
    const apidata = await getData(cityName); 
    const conditions = apidata.currentConditions.conditions;
    console.log(apidata);
    
    const addinfo = document.querySelector(".current-weather");
    
   
    const existingInfo = addinfo.querySelector(".location-info");
    const existingweatherInfo = addinfo.querySelector(".weather-display");
    const existingweatherdeatlis  = addinfo.querySelector(".weather-details");
    if (existingInfo && addinfo.contains(existingInfo)) {
      addinfo.removeChild(existingInfo);
    }
    if (existingweatherInfo && addinfo.contains(existingweatherInfo)) {
      addinfo.removeChild(existingweatherInfo);
    }
    if (existingweatherdeatlis && addinfo.contains(existingweatherdeatlis)) {
      addinfo.removeChild(existingweatherdeatlis);
    }
    
    
    const newelement = document.createElement("div");
    newelement.classList.add("location-info");

   
    const formattedDate = `${getdate.Day}, ${getdate.month}, ${getdate.date}, ${getdate.year}`;
    const temperature = apidata.currentConditions.temp;
    const humidity = apidata.currentConditions.humidity;
    const visibility = apidata.currentConditions.visibility;
    const windspeed = apidata.currentConditions.windspeed;
    let capitalized = cityName.charAt(0).toUpperCase() + cityName.slice(1);
    // console.log(formattedDate);

    newelement.innerHTML = `
    <h2>${capitalized}</h2>
    <p class="date">${formattedDate}</p>
    <p class="weather-desc">${conditions}</p>
    <div class="weather-display">
                    <div class="temperature">
                        <span class="temp-value">${temperature}</span>
                        <span class="temp-unit">°F</span>
                    </div>
                    <div class="weather-icon">
                        <i class="fas fa-cloud-sun"></i>
                    </div>
                </div>
                <div class="weather-details">
                    <div class="detail-item">
                        <i class="fas fa-wind"></i>
                        <span>${windspeed} mph</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-tint"></i>
                        <span>${humidity}%</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-eye"></i>
                        <span>${visibility} mi</span>
                    </div>
                </div>
            </div>
  `;
  
  addinfo.appendChild(newelement);

  // update 5days info

  
    const add5dayinfo = document.querySelector(".forecast-section");
    const existing5dayInfo = add5dayinfo.querySelector(".forecast-container");
    if (existing5dayInfo && add5dayinfo.contains(existing5dayInfo)) {
      add5dayinfo.removeChild(existing5dayInfo);
    }
    const new5dayelement = document.createElement("div");
    new5dayelement.classList.add("forecast-container");

   
    const Date1st = apidata.days[0].datetime;
    const temperature1st = apidata.days[0].tempmax;
    const mintemp1st = apidata.days[0].tempmin;
  
    const Date2nd = apidata.days[1].datetime;
    const temperature2nd = apidata.days[1].tempmax;
    const mintemp2nd = apidata.days[1].tempmin;

    const Date3rd = apidata.days[2].datetime;
    const temperature3rd = apidata.days[2].tempmax;
    const mintemp3rd = apidata.days[2].tempmin;

    const Date4th = apidata.days[3].datetime;
    const temperature4th = apidata.days[3].tempmax;
    const mintemp4th = apidata.days[3].tempmin;

    const Date5th = apidata.days[4].datetime;
    const temperature5th = apidata.days[4].tempmax;
    const mintemp5th = apidata.days[4].tempmin;

    new5dayelement.innerHTML = `
    <div class="forecast-card">
  <p class="day">${Date1st}</p>
  <i class="fas fa-sun"></i>
  <div class="temps">
      <span class="high">${temperature1st}°</span>
      <span class="low">${mintemp1st}°</span>
  </div>
</div>
<div class="forecast-card">
  <p class="day">${Date2nd}</p>
  <i class="fas fa-cloud-sun"></i>
  <div class="temps">
      <span class="high">${temperature2nd}°</span>
      <span class="low">${mintemp2nd}°</span>
  </div>
</div>
<div class="forecast-card">
  <p class="day">${Date3rd}</p>
  <i class="fas fa-cloud-rain"></i>
  <div class="temps">
      <span class="high">${temperature3rd}°</span>
      <span class="low">${mintemp3rd}°</span>
  </div>
</div>
<div class="forecast-card">
  <p class="day">${Date4th}</p>
  <i class="fas fa-sun"></i>
  <div class="temps">
      <span class="high">${temperature4th}°</span>
      <span class="low">${mintemp4th}°</span>
  </div>
</div>
<div class="forecast-card">
  <p class="day">${Date5th}</p>
  <i class="fas fa-cloud-sun"></i>
  <div class="temps">
      <span class="high">${temperature5th}°</span>
      <span class="low">${mintemp5th}°</span>
  </div>
</div>
</div>
</div>
`;
add5dayinfo.appendChild(new5dayelement);
//hourly forecastupdate
const addhourlyinfo = document.querySelector(".hourly-section");
const existinghourlyInfo = addhourlyinfo.querySelector(".hourly-container");
if (existinghourlyInfo && addhourlyinfo.contains(existinghourlyInfo)) {
  addhourlyinfo.removeChild(existinghourlyInfo);
}
const newhourlyelement = document.createElement("div");
newhourlyelement.classList.add("hourly-container");

const now = new Date();

const hours = now.getHours();     // 0 - 23
const currenttime = `${hours}:00:00`
// console.log(currenttime);

const time = apidata.days[0].hours;
// console.log(time);

let html = '';

  time.forEach(item => {
    if(item.datetime >= currenttime){
    html += `<div class="hourly-card">
    <p class="time">${(item.datetime.slice(0,2)-12)} pm</p>
    <i class="fas fa-sun"></i>
    <p class="temp">${item.temp}°</p>
    </div>`;
    }
  });


newhourlyelement.innerHTML = html;
addhourlyinfo.appendChild(newhourlyelement);

} catch (error) {
  console.error("Error updating info:", error);
 
}
}

async function updateInfoWithCurrentLocation() {
  try {
    const currentCity = await getLocation();
    const searchBox = document.getElementById("searchBox");
    searchBox.value = currentCity.charAt(0).toUpperCase() + currentCity.slice(1); // Set input field value
    await updateinfo();            // Call main update function
  } catch (error) {
    console.error("Could not update weather info with current location:", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updateInfoWithCurrentLocation();
});

