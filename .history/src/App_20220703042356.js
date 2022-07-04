import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Input from "./component/Input";

function App() {

  const [degrees, setDegrees]=useState(null)
  const [location, setLocation]=useState('')
  const [userLocation, setUserLocation]=useState('')
  const [description, setDescription]=useState('')
  const [icon, setIcon]=useState('')
  const [Humidity, setHumidity]=useState(null)
  const [wind, setWind]=useState(null)
  const [country, setCountry]=useState(null)
  const [dataFetched, setDataFetched]=useState(false)

  const API_KEY ='cd4a8fc206a4832cee986f7118990cd7'

  const fetchData = async (e) =>{
    e.preventDefault()

    try{

      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&appid=${API_KEY}&units=metric`)
      const data = await res.data
  
        setDegrees(data.main.temp)
        setLocation(data.name)
        setDescription(data.weather[0].description)
        setIcon(data.weather[0].icon)
        setHumidity(data.main.humidity)
        setWind(data.wind.speed)
        setCountry(data.sys.country)
  
         setDataFetched(true) 
    }catch(err){
      console.log(err)
      alert('please enter a valid location')
    }

  }

  const defaultDataFetched = async ()=>{
        
       if(!dataFetched){

         const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=jamaica&appid=${API_KEY}&units=metric`)
         const data = await res.data
     
           setDegrees(data.main.temp)
           setLocation(data.name)
           setDescription(data.weather[0].description)
           setIcon(data.weather[0].icon)
           setHumidity(data.main.humidity)
           setWind(data.wind.speed)
           setCountry(data.sys.country)
       }


  }

  useEffect(()=>{
    defaultDataFetched()
  }, [])

  return (
    <div className="App">
      <div className="weather">
        <Input 
          text={(e)=>setUserLocation(e.target.value)}
          submit={fetchData}
          func={fetchData}
        />

        <div className="weather_display">
          <h3 className="weather_location">weather in {location}</h3>

          <div className="weather_degrees">{degrees}C°</div>
          <div className="weather_description">
            <div >
              <div className="weather_description_head">
              <span className="weather_icon">
                <img src={`http://openweathermap.org/img/w/${icon}.png`} alt='weather icon'/> 
              </span>
              <h3>{description}</h3>
              </div>

              <h3>Humidity: {Humidity}%</h3>
              <h3>Wind speed: {wind} m/s</h3>
            </div>
            <div className="weather_country">
              <h3>{country}</h3>
              <h2 className="weather_date">4/30/2022, 2:05:24 PM</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
