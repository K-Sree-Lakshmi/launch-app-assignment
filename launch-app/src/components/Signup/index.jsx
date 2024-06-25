import React, { useState } from "react";
import { connect } from "react-redux";
import { TextField, Button, Container, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";

import {
  MANDATORY_FIELD_MESSAGE,
  EXISTING_USER_VALIDATION_MESSAGE,
  PASSWORD_VALIDATION_MESSAGE,
} from "../../constants/stringConstants";
import { setUserDetails } from "../../services/signup";
import { LOGIN } from "../../constants/routesConstant";

const Signup = (props) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData,"formData")
    // Add form submission logic here
    if (Object.keys(formData).some((item) => isEmpty(formData[item]))) {
      alert(MANDATORY_FIELD_MESSAGE);
    } else if (formData.password !== formData.confirmPassword) {
      alert(PASSWORD_VALIDATION_MESSAGE);
    } else {
      if (props.userDetails?.length === 0) {
        props.setUserDetails(formData);
        navigate(LOGIN);
      } else {
        let userEmails = props.userDetails.filter((item) => item.email);
        if (userEmails.incudes(formData.email)) {
          alert(EXISTING_USER_VALIDATION_MESSAGE);
        } else {
          props.setUserDetails([...props.userDetails, formData]);
          navigate(LOGIN);
        }
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign Up
        </Button>
      </form>
    </Container>
  );
};

const mapStateToProps = (store) => {
  console.log(store, "store");
  const { signupReducer } = store;
  return {
    userDetails: signupReducer.userDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserDetails: (body) => dispatch(setUserDetails(body)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
