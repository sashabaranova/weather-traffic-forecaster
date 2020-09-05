import * as geometry from 'spherical-geometry-js';

const calcDistance = (p1, p2) =>
(geometry.computeDistanceBetween(p1, p2) / 1000).toFixed(2);

export const getClosestLocationName = (location, locationList) => {

  let minDistance;
  let minIndex = 0;

  for (let i = 0; i < locationList.length; i++) {
    const { label_location: { latitude: lat2, longitude: lon2 } } = locationList[i];
    const latLong = new geometry.LatLng(lat2, lon2);
    const distance = calcDistance(location, latLong);

    if (i === 0) {
      minDistance = distance;
      continue;
    }

    if (distance <= minDistance ) {
      minDistance = distance;
      minIndex = i;
    }
  }

  return locationList[minIndex].name;
}