import React, { useEffect, useState } from "react";
import "./dropdown.css";
import "../Home/home.css";

const DropdownComponent = (props) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [listYears, setListYears] = useState("");
  const [listStatus, setListStatus] = useState("");
  const [selectedValueStatus, setSelectedValueStatus] = useState("");

  useEffect(() => {
    if (props.resetClicked) {
      setListYears("");
      setSelectedValue("");
      setListStatus("");
      setSelectedValueStatus("");
    }
  }, [props.resetClicked]);

  useEffect(() => {
    let years = [...new Set(props.options.map((item) => item.launch_year))];
    let status = ["True", "False"];
    setListYears(years);
    setListStatus(status);
  }, [props.options]);

  const handleChangeYears = (event) => {
    setSelectedValue(event.target.value);
    let payload = { year: event.target.value, status: selectedValueStatus };
    props.onChangeValue(payload);
  };

  const handleChangeStatus = (event) => {
    setSelectedValueStatus(event.target.value);
    let payload = { year: selectedValue, status: event.target.value };
    props.onChangeValue(payload);
  };

  return (
    <div>
      <select value={selectedValue} onChange={handleChangeYears} className="button-margin">
        <option value="" disabled>
          Select Launch Year{" "}
        </option>
        {listYears &&
          listYears.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
      </select>

      <select value={selectedValueStatus} onChange={handleChangeStatus}>
        <option value="" disabled>
          Select Launch Status{" "}
        </option>
        {listStatus &&
          listStatus.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default DropdownComponent;
