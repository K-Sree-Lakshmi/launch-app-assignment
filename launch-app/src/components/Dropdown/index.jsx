import React, { useEffect, useState } from "react";
import "./dropdown.css";

const DropdownComponent = (props) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [listYears, setListYears] = useState("");

  useEffect(() => {
    if (props.resetClicked) {
      setListYears("");
      setSelectedValue("");
    }
  }, [props.resetClicked]);

  useEffect(() => {
    let years = [...new Set(props.options.map((item) => item.launch_year))];
    setListYears(years);
  }, [props.options]);

  const handleChangeYears = (event) => {
    setSelectedValue(event.target.value);
    props.onChangeValue(event.target.value);
  };

  return (
    <div className="dropdown-container">
      <select value={selectedValue} onChange={handleChangeYears}>
        <option value="" disabled>
          Select a Year{" "}
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
    </div>
  );
};

export default DropdownComponent;
