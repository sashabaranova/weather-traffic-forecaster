import React, { useState, useEffect } from 'react';
import * as geometry from 'spherical-geometry-js';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import useTrafficApi from '../../hooks/useTrafficApi';
import useWeatherApi from '../../hooks/useWeatherApi';
import DateTime from '../DateTime';
import Locations from '../Locations';
import LocationItem from '../LocationItem';
import Weather from '../Weather';
import TrafficImage from '../TrafficImage';
import { chunkData, getSearchQuery } from '../../utils/fn';
import { calculateLastPage } from '../../utils/pagination';
import { getClosestLocationName } from '../../utils/geo';

const Main = () => {

  const [newDate, setNewDate] = useState(new Date());
  const [currPage, setCurrPage] = useState(0);
  const [lastPage, setLastPage] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [locationName, setLocationName] = useState('');

  const [{ trafficData, isLoading }, fetchTraffic] = useTrafficApi();
  const [{ weatherMetaData, weatherData, isLoading: weatherLoading }, fetchWeather] = useWeatherApi();

  const locationsData = chunkData(trafficData)[currPage] || [];

  const getLocationName = item => {
    const { location: { latitude, longitude } } = item;
    const latLng = new geometry.LatLng(latitude, longitude);
    const name = getClosestLocationName(latLng, weatherMetaData);
    return name;
  };

  useEffect(() => {
    const searchQuery = getSearchQuery(newDate);

    fetchTraffic({ searchQuery });
    fetchWeather({ searchQuery });
  }, [newDate]);

  useEffect(() => {
    if (trafficData.length > 0 && weatherData.length > 0 && !isLoading && !weatherLoading) {
      const name = getLocationName(locationsData[0]);
      setLocationName(name);
    }
  }, [isLoading, weatherLoading, currPage]);

  useEffect(() => {
    if (trafficData.length > 0) {
      const newLastPage = calculateLastPage(trafficData.length);
      setLastPage(newLastPage);
    }
  }, [trafficData, currPage]);

  useEffect(() => {
    setActiveIndex(0);
  }, [currPage]);

  const handlePageChange = page => setCurrPage(page);

  const handleDateChange = date => {
    if (date) {
      setNewDate(date);
    }
  };

  const onItemClick = (index, name) => {
    setActiveIndex(index);
    setLocationName(name);
  };

  const weather = weatherData.filter(({ area }) => area === locationName)[0]
    ? weatherData.filter(({ area }) => area === locationName)[0].forecast : '';

  return (
    <Grid container spacing={2} className="main">
      <Grid item xs={12}>
        <h1>SG Traffic Weather</h1>
        <Divider />
      </Grid>
      <DateTime date={newDate} onChange={handleDateChange} />
      <Grid item md={8} xs={12}>
        {locationsData.length > 0 && weatherMetaData.length > 0 && (
          <Locations
            currPage={currPage}
            lastPage={lastPage}
            onPageClick={handlePageChange}
          >
            {locationsData.map((item, i) => {
              const { camera_id } = item;
              const name = getLocationName(item);
              return (
                <LocationItem
                  isActive={i === activeIndex}
                  name={`Camera ${camera_id} (${name})`}
                  onClick={() => onItemClick(i, name)}
                />
              );
            })}
          </Locations>
        )}
      </Grid>
      <Grid item xs={12} md={4}>
        <Weather weather={weather} hasError={!weather} />
      </Grid>
      <Grid item md={8} xs={12}>
        {locationsData.length > 0 && (
          <TrafficImage src={locationsData[activeIndex].image} hasError={!locationsData[activeIndex].image} />
        )}
      </Grid>
    </Grid>
  );
};

export default Main;