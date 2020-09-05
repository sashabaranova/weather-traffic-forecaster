export default (state, action) => {
  const { payload, errorMessage } = action;

  switch (action.type) {
    case 'FETCH_TRAFFIC':
      return {
        ...state,
        isLoading: true,
        hasError: false,
        trafficData: [],
        errorMessage: '',
      };
    case 'FETCH_TRAFFIC_SUCCESS':
      return {
        ...state,
        isLoading: false,
        hasError: false,
        trafficData: payload,
      };
    case 'FETCH_TRAFFIC_FAILURE':
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