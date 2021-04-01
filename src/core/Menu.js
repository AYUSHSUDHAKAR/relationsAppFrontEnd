import React from "react";
import { Link, withRouter } from "react-router-dom";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#198754" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Menu = ({ history }) => {
  return (
    <div className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <ul className="nav">
          <li className="nav-item">
            <Link style={currentTab(history, "/")} className="nav-link" to="/">
              Add People
            </Link>
          </li>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/relations")}
              className="nav-link"
              to="/relations"
            >
              Relations
            </Link>
          </li>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/connection")}
              className="nav-link"
              to="/connection"
            >
              Connection
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default withRouter(Menu);
