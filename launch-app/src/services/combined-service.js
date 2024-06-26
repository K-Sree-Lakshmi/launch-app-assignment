import { combineReducers } from "redux";

import loginReducer from "./login";
import signupReducer from "./signup";
import homeReducer from "./home";

const rootReducer = combineReducers({
  loginReducer,
  signupReducer,
  homeReducer
});

export default rootReducer
