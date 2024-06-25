import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { connect } from "react-redux";

import { LOGIN } from "../../constants/routesConstant";

const Home = (props) => {
  const [render, setRender] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.loginStatus) {
      setRender(false);
      navigate(LOGIN);
    } else {
      setRender(true);
    }
  }, [props.loginStatus]);

  return render && <div>Home</div>;
};

const mapStateToProps = (store) => {
  console.log(store, "store");
  const { loginReducer } = store;
  return {
    loginStatus: loginReducer.loginStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // setNewStoreDetailsScreenLoader: (body) =>
    //   dispatch(setNewStoreDetailsScreenLoader(body)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
