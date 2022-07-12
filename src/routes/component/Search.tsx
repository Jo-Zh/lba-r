import React from "react";

const Search = () => {
  return (
    <form role="search" method="POST" className="form-group bg-light">
      <div className="input-group input-group-sm">
        <input
          type="text"
          name="search"
          className="text-dark my-1"
          placeholder="Search for "
          aria-describedby="inputGroup-sizing-sm"
        />
        <button type="submit" className="btn btn-outline-warning btn-sm my-1">
          <i className="bi bi-search">IN</i>
        </button>
        <select
          className="rounded my-1 "
          name="field"
          id="floatingSelectGrid"
          defaultValue={"content"}
        >
          <option value="title">title</option>
          <option value="content">content</option>
          <option value="writer">poster</option>
        </select>
      </div>
    </form>
  );
};
export default Search;
