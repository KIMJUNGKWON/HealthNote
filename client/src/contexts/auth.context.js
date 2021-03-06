import React, { createContext, useReducer } from "react";
import authReducer from "../reducers/auth.reducer";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from "../reducers/types";

export const AuthContext = createContext();
export const AuthProvider = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    trainer: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // 유저 로드
  // - 토큰을 글로벌 헤드에 담은 후 토큰에 담긴 email 정보를 통해 트레이너(유저) 전체 정보를 가져온다.
  // - 유저정보를 가져온 후 state에 담는다.
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/auth");
      await dispatch({ type: USER_LOADED, payload: res.data }); // payload는 찾은 trainer
      console.log("로드 유저", res.data);
    } catch (err) {
      console.log(err);
      dispatch({ type: AUTH_ERROR });
    }
  };

  // 유저 등록
  // - 회원가입 양식 데이터를 서버로 보낸다.
  // - 토큰을 받아온다.
  // - 성공일 경우 토큰을 state에 담고 에러일 경우 state.error에 에러 메세지를 담는다.
  const register = async formData => {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/trainers", formData, config);
      if (res.status === 200 || res.status === 201) {
        // response.ok (200~299)
        dispatch({ type: REGISTER_SUCCESS, payload: res.data }); // res.data = token
        console.log(res.data);
        loadUser();
      } else {
        dispatch({ type: REGISTER_FAIL, payload: res.data.msg });
      }
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error.response.data.msg });
    }
  };

  // 유저 로그인
  const login = async formData => {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/auth", formData, config);
      if (res.status === 200 || res.status === 201) {
        // response.ok (200~299)
        console.log(res.data)
        await dispatch({ type: LOGIN_SUCCESS, payload: res.data }); // res.data = token
        await loadUser();
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg }); // 로그인 실패시 자동으로 서버의 msg가 catch로 옴(axios의 경우만)
    }
  };

  // 유저 로그아웃
  const logout = () => dispatch({ type: LOGOUT });

  // 에러 초기화
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        trainer: state.trainer,
        error: state.error,
        clearErrors,
        register,
        loadUser,
        login,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
