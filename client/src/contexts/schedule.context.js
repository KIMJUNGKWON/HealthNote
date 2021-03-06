import React, { createContext, useReducer, useContext } from "react";
import scheduleReducer from "../reducers/schedule.reducer.js";
import Axios from "axios";
import setAuthToken from "../utils/setAuthToken";

import { SET_SCHEDULE, GET_SCHEDULES } from "../reducers/types";

export const ScheduleContext = createContext();
export const DispatchContext = createContext();

const initialState = [
  {
    title: null,
    id: null, // phonenum
    start: null,
    finish_dncd: false
  }
];

export const ScheduleProvider = props => {
  const setSchedule = async data => {
    // unusedpt, start_date, days, phonenum
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const settings = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    try {
      const res = await Axios.post(
        "/api/schedules/setSchedule",
        data,
        settings
      );
      console.log("schedule.context_ SET_SCHEDULE_ res.data", res.data);
      dispatch({ type: SET_SCHEDULE, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  const getAllSchedules = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await Axios.get("/api/schedules/getAllSchedules");
      dispatch({ type: GET_SCHEDULES, payload: res.data });
      console.log("schedule.context/getAllSchedules/res.data", res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const [schedules, dispatch] = useReducer(scheduleReducer, initialState);

  return (
    <ScheduleContext.Provider
      value={{ schedules, setSchedule, getAllSchedules }}
    >
      <DispatchContext.Provider value={dispatch}>
        {" "}
        {/*dispatch를 계속해서 만들어내지 않게 객체형태로 보내지 않는다 */}
        {props.children}
      </DispatchContext.Provider>
    </ScheduleContext.Provider>
  );
};
