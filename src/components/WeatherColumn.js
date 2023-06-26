const WeatherColumn = ({props}) => {
  return (
    <div className='weatherCol'>
        <h3>{props.weather}</h3>
        <h3>{props.weatherDescription}</h3>
        <h3>{props.temperature}</h3>
        <h3>{props.temperatureF}</h3>
        <p className='errorMSG'>{props.errMSG}</p>
      </div>
  );
}
export default WeatherColumn;
