import React, { useState, useEffect } from "react";
import Base from "./Base";
import { getConnection, getPeople } from "./helper/Helper";

import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";

const Connections = () => {
  const [values, setValues] = useState({
    person: "",
    connectedTo: "",
    error: "",
    success: false,
    peoples: [],
    connections: [],
  });

  const { person, connectedTo, error, success, peoples, connections } = values;

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    console.log(value);
    setValues({ ...values, [name]: value });
  };

  const onFind = (event) => {
    event.preventDefault();
    getConnection({ person, connectedTo })
      .then((data) => {
        setValues({ ...values, success: true, connections: data });
      })
      .catch((err) => {
        console.log("error in find connection");
      });
  };

  useEffect(() => {
    console.log(connections);
  }, [connections]);

  const preload = () => {
    getPeople()
      .then((data) => {
        setValues({ ...values, peoples: data });
      })
      .catch((err) => {
        console.log("error in preload connection");
      });
  };

  useEffect(() => {
    preload();
  }, []);

  const findConnectionForm = () => {
    return (
      <div className="row">
        <div className="col-md-10 offset-sm-1">
          <form>
            <div className="row">
              <div className="col-sm-3 offset-sm-1 py-1">
                <label className="text-dark form-label ">Person</label>

                <select
                  onChange={handleChange("person")}
                  className="form-select"
                  id="autoSizingSelect"
                >
                  <option defaultValue>Choose Person...</option>
                  {peoples &&
                    peoples.map((people, index) => {
                      return (
                        <option key={index} value={people}>
                          {people}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="col-sm-3 offset-sm-1 py-1">
                <label className="text-dark form-label">Related To</label>
                <select
                  onChange={handleChange("connectedTo")}
                  className="form-select"
                  id="autoSizingSelect"
                >
                  <option defaultValue>Choose Person...</option>
                  {peoples &&
                    peoples.map((people, index) => {
                      return (
                        <option key={index} value={people}>
                          {people}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="d-grid col-sm-2 offset-sm-1 py-2">
                <button
                  type="button"
                  onClick={onFind}
                  className="btn btn-success"
                >
                  Find Connection
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderRelation = () => {
    var end = "";
    return (
      <>
        {success && connections.length != 0 && (
          <>
            <h2 className="text-dark text-center content">CONNECTION</h2>
            <Timeline align="alternate">
              {connections.map((connection, index) => {
                end = connection.end;
                return (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineDot color="secondary" />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent className="text-dark">
                      {connection.start}
                    </TimelineContent>
                  </TimelineItem>
                );
              })}
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="secondary" />
                </TimelineSeparator>
                <TimelineContent className="text-dark">{end}</TimelineContent>
              </TimelineItem>
            </Timeline>
          </>
        )}
        {success && connections.length == 0 && (
          <h2 className="text-dark text-center mt-5">
            {person} is not connected to {connectedTo}
          </h2>
        )}
      </>
    );
  };
  return (
    <Base title="Connections" description="Know your connections here">
      {findConnectionForm()}
      {renderRelation()}
    </Base>
  );
};

export default Connections;
