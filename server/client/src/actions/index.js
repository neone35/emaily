import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

// action-creator
export const fetchUser = () => {
    // With redux-thunk, use dispatch function directly
    // Make async call to back-end and after that return action
    return async function (dispatch) {
        const res = await axios.get("/api/current_user");
        dispatch({ type: FETCH_USER, payload: res.data });
    };

    // Without redux-thunk
    // const request = axios.get("/api/current_user");
    // return {
    //     type: FETCH_USER,
    //     payload: request
    // };
};

export const handleToken = (token) =>
    async (dispatch) => {
        const res = await axios.post("/api/stripe", token);
        dispatch({ type: FETCH_USER, payload: res.data });
    };

export const submitSurvey = (values, history) =>
    async (dispatch) => {
        const res = await axios.post("/api/surveys", values);
        history.push('/surveys');
        dispatch({ type: FETCH_USER, payload: res.data });
    };

export const fetchSurveys = () =>
    async (dispatch) => {
        const res = await axios.get('/api/surveys');
        dispatch({ type: FETCH_SURVEYS, payload: res.data });
    };