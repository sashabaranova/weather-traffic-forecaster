import { faCloud, faCloudRain, faCloudMoonRain, faCloudMoon, faCloudSun, faBolt, faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons';

export const getWeatherIcon = string => {
  const stringLowerCase = string.toLowerCase();
  if (stringLowerCase.includes('cloud') && stringLowerCase.includes('sun')) {
    return faCloudSun;
  } else if (stringLowerCase.includes('night') && stringLowerCase.includes('rain')) {
    return faCloudMoonRain;
  } else if (stringLowerCase.includes('night')) {
    return faCloudMoon;
  } else if (stringLowerCase.includes('rain')) {
    return faCloudRain;
  } else if (stringLowerCase.includes('cloud')) {
    return faCloud;
  } else if (stringLowerCase.includes('shower')) {
    return faCloudShowersHeavy;
  } else if (stringLowerCase.includes('thunder')) {
    return faBolt;
  } else {
    return faCloud;
  }
}
