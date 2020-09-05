import { useReducer } from 'react';
import fetchWeatherDataReducer from '../reducers/fetchWeatherDataReducer';
const API_ENDPOINT = 'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast';

const useTrafficApi = () => {
  const [state, dispatch] = useReducer(fetchWeatherDataReducer, {
    isLoading: false,
    hasError: false,
    weatherData: [],
    errorMessage: '',
  })

  const fetchWeather = async ({ searchQuery }) => {
    const url = `${API_ENDPOINT}?date_time=${searchQuery}`;

    console.log('url', url);

    dispatch({ type: 'FETCH_WEATHER' });

    try {
      const response = await fetch(url);
      if (response.ok) {
        const { area_metadata: weatherMetaData, items } = await response.json();
        const { forecasts: weatherData } = items[0];

        dispatch({
          type: 'FETCH_WEATHER_SUCCESS',
          payload: { weatherMetaData, weatherData },
        });
      } else {
        const { message } = await response.json();

        dispatch({
          type: 'FETCH_WEATHER_FAILURE',
          errorMessage: message,
        });
      }
    } catch(error) {
      dispatch({
        type: 'FETCH_WEATHER_FAILURE',
        errorMessage: error.toString(),
      });
    }
  }

  return [state, fetchWeather];
}

export default useTrafficApi;
