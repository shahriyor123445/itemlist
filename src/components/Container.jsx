import React from "react";

const Container = ({ color, children }) => {
  return (
    <div style={{ backgroundColor: color, padding: "20px" }}>{children}</div>
  );
};

export default Container;
