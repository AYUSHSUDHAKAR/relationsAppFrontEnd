import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "Some Title",
  description = "My Description",
  className = "container bg-light text-white p-4",
  children,
}) => {
  return (
    <div className="top">
      <Menu />
      <div className="">
        <div className="jumbotron bg-secondary text-white text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead mb-0">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
    </div>
  );
};

export default Base;
