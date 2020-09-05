export default (state, action) => {
  const { payload, errorMessage } = action;

  switch (action.type) {
    case 'FETCH_WEATHER':
      return {
        ...state,
        isLoading: true,
        hasError: false,
        weatherData: [],
        weatherMetaData: [],
        errorMessage: '',
      };
    case 'FETCH_WEATHER_SUCCESS':
      const { weatherMetaData, weatherData } = payload;

      return {
        ...state,
        isLoading: false,
        hasError: false,
        weatherData,
        weatherMetaData,
      };
    case 'FETCH_WEATHER_FAILURE':
      return {
        ...state,
        isLoading: false,
        hasError: true,
        errorMessage,
      };
    default:
      return state;
  }
};