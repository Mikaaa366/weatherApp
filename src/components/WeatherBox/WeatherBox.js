import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';


const WeatherBox = props => {
  const [weather, setWeather] = useState('');
  const[pending, setPending] = useState('');
  const [error, setError] = useState('');

  const handleCityChange = useCallback((city) => {  
    console.log ('city', city)

    setPending(true);
    setError(false);
    
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=437c035e1dae2dd1ee1d1afe02092cf4&units=metric`)
    
    .then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          console.log(data);
          const weatherData = {
            city: data.name,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            description: data.weather[0].main,
          };
          setWeather(weatherData);
          setPending(false);
        });
      } else {
        setError(true);
      }

  });
  }, []);
  return (
    <section>
      <PickCity action={handleCityChange} />
      {weather && !pending && <WeatherSummary {...weather} />}
      {!error && pending && <Loader />}
      {error && <ErrorBox />}
    </section>
  )
};

export default WeatherBox;