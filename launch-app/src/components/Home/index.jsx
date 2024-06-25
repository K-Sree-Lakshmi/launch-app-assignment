import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { connect } from "react-redux";
import axios from "axios";

import { LOGIN } from "../../constants/routesConstant";
import { setLoginStatus } from "../../services/login";
import { setLaunchListValues, clearHomePage } from "../../services/home";

import SearchComponent from "../Search";
import "./home.css";
import { cloneDeep } from "lodash";
import DropdownComponent from "../Dropdown";

const Home = (props) => {
  const [render, setRender] = useState(false);
  const [launchList, setLaunchList] = useState([]);
  const [pageLoader, setPageLoader] = useState(false);
  const [resetFilters, setResetFilters] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!props.loginStatus) {
      setRender(false);
      navigate(LOGIN);
    } else {
      setRender(true);
    }
  }, [props.loginStatus]);

  useEffect(() => {
    if (render) {
      fetchList();
    }
  }, [render]);

  const fetchList = async () => {
    try {
      setPageLoader(true);
      let response = await axios.get("https://api.spacexdata.com/v3/launches");
      setLaunchList(response?.data);
      props.setLaunchListValues(cloneDeep(response?.data));
      setPageLoader(false);
    } catch (e) {
      console.log(e);
      setPageLoader(false);
    }
  };

  const logout = () => {
    props.setLoginStatus(false);
    props.clearHomePage();
    navigate(LOGIN);
  };

  const onChangeValue = (value) => {
    if (value) {
      let filteredData = props.launchListValues.filter((item) =>
        item.mission_name.toLowerCase().includes(value.toLowerCase())
      );
      setLaunchList(filteredData);
    } else {
      setLaunchList(props.launchListValues);
    }
  };

  const onChangeValueYear = async (value) => {
    try {
      setResetFilters(false);
      setPageLoader(true);
      let response = await axios.get("https://api.spacexdata.com/v3/launches", {
        params: {
          launch_year: value,
        },
      });
      setLaunchList(response?.data);
      props.setLaunchListValues(cloneDeep(response?.data));
      setPageLoader(false);
    } catch (e) {
      console.log(e);
      setPageLoader(false);
    }
  };

  const resetFilterValues = () => {
    fetchList();
    setResetFilters(true);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <div style={{ flexGrow: 1 }}></div>{" "}
          {/* This will push the button to the right */}
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {render && (
        <>
          <div className="search-bar-container">
            <SearchComponent onChangeValue={onChangeValue} />
            <div className="search-bar-container">
              <div className="button-margin">
                <DropdownComponent
                  options={launchList}
                  onChangeValue={onChangeValueYear}
                  resetClicked={resetFilters}
                />
              </div>

              <Button
                variant="outlined"
                color="error"
                onClick={resetFilterValues}
              >
                Reset Filters
              </Button>
            </div>
          </div>
          {pageLoader ? (
            <div className="loader-container">
              <CircularProgress />
            </div>
          ) : (
            <div className="launch-list">
              {launchList.map((launch) => (
                <div key={launch.flight_number} className="launch-item">
                  <img
                    src={launch.links.mission_patch}
                    alt={launch.mission_name}
                    className="launch-image"
                  />
                  <div className="launch-details">
                    <h2>{launch.mission_name}</h2>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(launch.launch_date_local).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Rocket:</strong> {launch.rocket.rocket_name}
                    </p>
                    <p>
                      <strong>Launch Site:</strong>{" "}
                      {launch.launch_site.site_name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (store) => {
  const { loginReducer, homeReducer } = store;
  return {
    loginStatus: loginReducer.loginStatus,
    launchListValues: homeReducer.launchListValues,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLoginStatus: (body) => dispatch(setLoginStatus(body)),
    setLaunchListValues: (body) => dispatch(setLaunchListValues(body)),
    clearHomePage: (body) => dispatch(clearHomePage(body)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
