import { useState, useReducer, useEffect } from 'react';

const FETCH_STATUS = {
  INIT: 'FETCH_INIT',
  SUCCESS: 'FETCH_SUCCESS',
  FAILURE: 'FETCH_FAILURE',
};

const createDataFetchReducer = () => (state, action) => {
  switch (action.type) {
    case FETCH_STATUS.INIT:
      return {
        ...state,
        isSearching: true,
        isError: false,
      };
    case FETCH_STATUS.SUCCESS:
      return {
        ...state,
        isSearching: false,
        isError: false,
        results: action.payload,
      };
    case FETCH_STATUS.FAILURE:
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
  const [apiRetrigger, setApiRetrigger] = useState();
  const [state, dispatch] = useReducer(createDataFetchReducer(), {
    isSearching: false,
    isError: false,
    results: initialData,
  });

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: FETCH_STATUS.INIT });
      try {
        const data = await apiAction(param);
        if (!didCancel) {
          dispatch({ type: FETCH_STATUS.SUCCESS, payload: data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: FETCH_STATUS.FAILURE });
        }
      }
    };

    if (typeof param !== 'undefined' && param !== null) fetchData();

    return () => {
      didCancel = true;
    };
  }, [param, apiAction, apiRetrigger]);

  return [state, param, setParam, setApiRetrigger];
}
