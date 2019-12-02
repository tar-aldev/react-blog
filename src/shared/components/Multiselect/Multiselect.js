import React, { useState, useEffect, useRef, useMemo, memo } from "react";

import classes from "./Multiselect.module.scss";
import clsx from "clsx";
import { Badge } from "react-bootstrap";

const Multiselect = ({ options, selectedOptions, setSelectedOptions }) => {
  const [selectOpened, setSelectOpened] = useState(false);
  const component = useRef({});

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = e => {
    if (component.current.contains(e.target)) {
      return;
    }
    setSelectOpened(false);
  };

  const handleSelectOpen = () => {
    setSelectOpened(!selectOpened);
  };

  const handleOptionSelected = selectedOption => e => {
    e.stopPropagation();
    const foundIndex = selectedOptions.findIndex(
      option => option._id === selectedOption._id
    );
    if (foundIndex === -1) {
      setSelectedOptions([...selectedOptions, selectedOption]);
    }
  };

  const onRemoveSelectedOption = _id => e => {
    e.stopPropagation();
    const updated = selectedOptions.filter(option => option._id !== _id);
    setSelectedOptions(updated);
  };

  console.log("RERENDER MULTISELECT");

  return (
    <div
      ref={component}
      onClick={handleSelectOpen}
      className={clsx(classes.selectedOptionsWrapper, "bg-secondary mb-2")}
    >
      <div>
        {selectedOptions.length === 0 ? (
          <span className={classes.placeholderText}>Select...</span>
        ) : (
          selectedOptions.map(option => (
            <Badge
              key={option._id}
              pill
              variant="success"
              className={clsx("mr-1", classes.selectedOption)}
              onClick={onRemoveSelectedOption(option._id)}
            >
              {option.name}
            </Badge>
          ))
        )}
      </div>
      <div>
        <i className="fas fa-sort-down" />
      </div>
      {selectOpened && (
        <div className={clsx(classes.optionsContainer, "bg-secondary p-2")}>
          {options.map(option => (
            <div
              key={option._id}
              className={clsx(classes.option, "py-1 mb-1 d-flex")}
              onClick={handleOptionSelected(option)}
            >
              <Badge pill variant="success">
                {option.name}
              </Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Multiselect.propTypes = {};

export default memo(Multiselect);
