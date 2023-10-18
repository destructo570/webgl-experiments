import React from "react";

const CanvasWrapper = (props) => {
  const {
    children,
    position = "fixed",
    width = "100vw",
    height = "100vh",
  } = props;

  return (
    <div
      style={{
        position,
        width,
        height,
        top: 0,
        left: 0,
        outline: "none",
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default CanvasWrapper;
