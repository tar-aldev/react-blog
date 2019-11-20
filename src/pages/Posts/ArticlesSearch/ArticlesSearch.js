import React from "react";
import PropTypes from "prop-types";
import { InputGroup, FormControl } from "react-bootstrap";

const ArticlesSearch = ({
  searchStr,
  onSearchChange,
  searchBy,
  onSearchByChange,
}) => {
  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">
            <i className="fas fa-search"></i>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          style={{ width: "70%" }}
          placeholder="Search by..."
          value={searchStr}
          onChange={onSearchChange}
        />
        <FormControl
          placeholder="Search by"
          as="select"
          value={searchBy}
          onChange={onSearchByChange}
        >
          <option value="author">Author</option>
          <option value="title">Title</option>
        </FormControl>
      </InputGroup>
    </div>
  );
};

ArticlesSearch.propTypes = {};

export default ArticlesSearch;
