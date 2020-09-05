import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getWeatherIcon } from '../../utils/weather';

const Weather = ({ weather, hasError }) => (
  <div className="container">
    <h2 className="heading">Weather at the time</h2>
    {hasError ? <p>No weather data is available.</p>
      : (
        <div className="weatherGroup">
          <FontAwesomeIcon icon={getWeatherIcon(weather)} className="weatherIcon" />
          <div>{weather}</div>
        </div>
      )}
  </div>
);

export default Weather;