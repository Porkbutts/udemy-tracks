import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "signout":
      return { token: null };
    case "clear_error":
      return { ...state, errorMessage: "" };
    case "auth_success":
      return { errorMessage: "", token: action.payload };
    case "auth_error":
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const signup =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const rsp = await trackerApi.post("/signup", { email, password });
      await AsyncStorage.setItem("token", rsp.data.token);
      dispatch({
        type: "auth_success",
        payload: rsp.data.token,
      });
      navigate("TrackList");
    } catch (err) {
      dispatch({
        type: "auth_error",
        payload: "Something went wrong with signup",
      });
    }
  };

const signin =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const rsp = await trackerApi.post("/signin", { email, password });
      await AsyncStorage.setItem("token", rsp.data.token);
      dispatch({
        type: "auth_success",
        payload: rsp.data.token,
      });
      navigate("TrackList");
    } catch (err) {
      dispatch({
        type: "auth_error",
        payload: "Something went wrong with signin",
      });
    }
  };

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
  navigate("loginFlow");
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error" });
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "auth_success", payload: token });
    navigate("TrackList");
  } else {
    navigate("loginFlow");
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: "" }
);
