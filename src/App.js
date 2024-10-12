import React ,{useState} from "react";
const api={
  key: "792781e3b1c27fec65ee35edb86b0cd4",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App(){
  const [query,setQuery]=useState('');
  const [weather,setWeather]=useState({});

  const search=evt=>{
    if(evt.key==="Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res =>res.json())
      .then(result=>{
        setWeather(result);
        setQuery("");
        console.log(result);
      });
    }
  }

  const dateBuilder=(d)=>{
    let months=["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  let day=days[d.getDay()];
  let date=d.getDate();
  let month=months[d.getMonth()];
  let year=d.getFullYear();
  return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input type="text"
          className="search-bar"
          placeholder="search..."
          onChange={e=>setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        <div>
  {(typeof weather.main !== "undefined") ? (
    <div className="location-box">
      <div className="location">{weather.name}, {weather.sys.country}</div>
      <div className="date">{dateBuilder(new Date())}</div> 
    </div>
  ) : null} {/* Fallback when weather.main is undefined */}

  <div className="weather-box">
    <div className="temp">
      {weather.main ? `${Math.round(weather.main.temp)}°C` : "Loading..."}
    </div>
    <div className="weather">
      {weather.weather ? weather.weather[0].description : "Loading..."}
    </div>
  </div>
</div>
      </main>

    </div>
  );
}

export default App;
