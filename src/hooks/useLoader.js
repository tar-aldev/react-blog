import React from "react";

export default (mainComponent, state) => {
  if (state.isLoading) {
    return <p>Loading...</p>;
  }
  return mainComponent();
};
