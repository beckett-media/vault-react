import { useState, useReducer, useEffect } from 'react';

const createDataFetchReducer = () => (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isSearching: true,
        isError: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isSearching: false,
        isError: false,
        results: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isSearching: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

export default function useFilter(apiAction, initialParam, initialData) {
  const [param, setParam] = useState(initialParam);
  const [state, dispatch] = useReducer(createDataFetchReducer(), {
    isSearching: false,
    isError: false,
    results: initialData,
  });

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const data = await apiAction(param);
        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };

    if (typeof param !== 'undefined' && param !== null) fetchData();

    return () => {
      didCancel = true;
    };
  }, [param, apiAction]);

  return [state, param, setParam];
}
