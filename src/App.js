import React, { useState} from 'react';
import { Helmet } from 'react-helmet'
import Weather from './app_component/weather-component';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import Form from './app_component/form.component';
import './index.css'
const API_key ="7423ba7452e4d16630ac165851af02ea";

// API CALL api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


function App() {
  let [weather,WeatherData] = useState({
    city:undefined,
    icon:undefined,
    celsius:undefined,
    temp_max:undefined,
    temp_min:undefined,
    descrition:"",
    error:false,
  })

// const mounted = useRef();

  function calCelsius(temp){
    let cell = Math.floor(temp-273.15);
    return cell
  }

  let weatherIcon = {
    Thunderstorm:"wi-thunderstorm",
    Drizzle : "wi-sleet",
    Rain: "wi-storm-showers",
    Snow:"wi-snow",
    Atmosphere:"wi-fog",
    Clear:"wi-day-sunny",
    Clouds:"wi-day-fog"
  }

  function get_WeatherIcon(icons,rangeID){
    let icon = undefined
      switch(true)
      {
        case rangeID >=200 && rangeID<=232:
          icon=weatherIcon.Thunderstorm
        break;
        case rangeID >=300 && rangeID<=321:
          icon=weatherIcon.Drizzle
        break;
        case rangeID >=500 && rangeID<=531:
          icon=weatherIcon.Rain 
        break;
        case rangeID >=600 && rangeID<=622:
          icon=weatherIcon.Snow 
        break;
        case rangeID >=701 && rangeID<=781:
          icon=weatherIcon.Atmosphere 
        break;
        case rangeID===800:
          icon=weatherIcon.Clear
        break;
        case rangeID >=801 && rangeID<=8042:
          icon=weatherIcon.Clouds 
        break;
        default:
            icon=weatherIcon.Clouds 
      }
      return icon
      
  }

  const getWeather = async (event)=>{
    event.preventDefault()
    const city = event.target.elements.city.value;
    const country = event.target.elements.country.value;

    if(city && country)
    {
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);
    const response = await api_call.json()
    WeatherData({
      city:`${response.name} , ${response.sys.country}`,
    celsius:calCelsius(response.main.temp),
    temp_max:calCelsius(response.main.temp_max),
    temp_min:calCelsius(response.main.temp_min),
    description:response.weather[0].description,
    icon:get_WeatherIcon(weatherIcon,response.weather[0].id),
    error:false,
    })
  }else 
  {
    WeatherData((prev)=>{
      return {
        ...prev,
        error:true,
      }
    })
  }

    
  }



  

  // useEffect(() => {
  //   if (!mounted.current) {
  //     getWeather()
  //     mounted.current = true;
  //   } 
  // });
 
  return (
    <div className="App">
      <Helmet>
          <title>Weather App</title>
        </Helmet>
    <Form loadweather={getWeather} error={weather.error}/>
     <Weather city={weather.city}
       temp_celsius = {weather.celsius}
       temp_max={weather.temp_max}
       temp_min = {weather.temp_min}
      description = {weather.description}
      weatherIcon = {weather.icon}       

     />
    </div>
    
  );
}

export default App;
