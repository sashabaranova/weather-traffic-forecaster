import { useReducer } from 'react';
import fetchTrafficDataReducer from '../reducers/fetchTrafficDataReducer';
const API_ENDPOINT = 'https://api.data.gov.sg/v1/transport/traffic-images';

const useTrafficApi = () => {
  const [state, dispatch] = useReducer(fetchTrafficDataReducer, {
    isLoading: false,
    hasError: false,
    trafficData: [],
    errorMessage: '',
  })

  const fetchTraffic = async ({ searchQuery }) => {
    const url = `${API_ENDPOINT}?date_time=${searchQuery}`;

    console.log('url', url);

    dispatch({ type: 'FETCH_TRAFFIC' });

    try {
      const response = await fetch(url);
      if (response.ok) {
        const { items } = await response.json();
        const { cameras } = items[0];

        dispatch({
          type: 'FETCH_TRAFFIC_SUCCESS',
          payload: cameras,
        });
      } else {
        const { message } = await response.json();

        dispatch({
          type: 'FETCH_TRAFFIC_FAILURE',
          errorMessage: message,
        });
      }
    } catch(error) {
      dispatch({
        type: 'FETCH_TRAFFIC_FAILURE',
        errorMessage: error.toString(),
      });
    }
  }

  return [state, fetchTraffic];
}

export default useTrafficApi;
