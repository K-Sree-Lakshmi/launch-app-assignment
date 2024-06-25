import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";

import { SIGNUP, HOME } from "../../constants/routesConstant";
import { LOGIN_FIELD_VALIDATION_MESSAGE } from "../../constants/stringConstants";
import { setLoginStatus } from "../../services/login";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEmpty(password) || isEmpty(username)) {
      alert(LOGIN_FIELD_VALIDATION_MESSAGE);
    } else {
      if (isEmpty(props.userDetails)) {
        navigate(SIGNUP);
      } else if (
        props.userDetails.some(
          (obj) => obj.password.toLowerCase() !== password.toLowerCase()
        )
      ) {
        navigate(SIGNUP);
      } else {
        // if its email is present redirect to home
        props.setLoginStatus(true);
        navigate(HOME);
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 300,
        mx: "auto",
        mt: 5,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Login
      </Button>
    </Box>
  );
};

const mapStateToProps = (store) => {
  const { signupReducer, loginReducer } = store;
  return {
    userDetails: signupReducer.userDetails,
    loginStatus: loginReducer.loginStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLoginStatus: (body) => dispatch(setLoginStatus(body)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
