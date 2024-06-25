import { combineReducers } from "redux";

import loginReducer from "./login";
import signupReducer from "./signup";

const rootReducer = combineReducers({
  loginReducer,
  signupReducer
});

export default rootReducer
