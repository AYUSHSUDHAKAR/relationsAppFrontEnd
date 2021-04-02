import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Base from "./Base";
import {
  addPeople,
  deletePeople,
  getPeople,
  updatePeople,
} from "./helper/Helper";
import "../App.css";

const Home = () => {
  const [values, setValues] = useState({
    name: "",
    oldName: "",
    error: "",
    success: false,
    peoples: [],
  });

  var { name, oldName, error, success, peoples } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onAdd = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    console.log(name);
    addPeople({ name })
      .then((data) => {
        // setValues({
        //   ...values,
        //   name: "",
        //   error: "",
        //   success: true,
        // });
        preload();
      })
      .catch((err) => {
        console.log("error in Add People");
      });
  };

  const onUpdate = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    console.log(name);
    updatePeople({ name, oldName })
      .then((data) => {
        // setValues({
        //   ...values,
        //   name: "",
        //   oldName: "",
        //   error: "",
        //   success: true,
        // });
        preload();
      })
      .catch((err) => {
        console.log("error in Update People");
      });
  };

  const onDelete = (name) => {
    // event.preventDefault();
    setValues({ ...values, error: false });
    console.log(name);
    deletePeople({ name })
      .then((data) => {
        setValues({
          ...values,
          name: "",
          error: "",
          success: true,
        });
        preload();
      })
      .catch((err) => {
        console.log("error in Delete People");
      });
  };

  const preload = () => {
    getPeople()
      .then((data) => {
        setValues({
          ...values,
          peoples: data,
          name: "",
          error: "",
          oldName: "",
        });
      })
      .catch((err) => {
        console.log("error in Preload People");
      });
  };

  useEffect(() => {
    preload();
  }, []);

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New Account was created successfully. Please{" "}
            <Link to="/signin">Login Here</Link>{" "}
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const addPeopleForm = () => {
    return (
      <>
        <div className="row mt-0">
          <div className="col-md-10 offset-sm-1">
            <form>
              <div className="row">
                <label className="col-sm-2 text-dark col-form-label col-form-label-lg py-2">
                  Name
                </label>
                <div className="col-sm-6 py-2">
                  <input
                    className="form-control"
                    type="text"
                    onChange={handleChange("name")}
                    value={name}
                  />
                </div>
                <div className="d-grid col-sm-2 py-2">
                  <button
                    type="button"
                    onClick={onAdd}
                    disabled={!name}
                    className="btn btn-success btn-block"
                  >
                    Add {name}
                  </button>
                </div>
                <div className="d-grid col-sm-2 py-2">
                  <button
                    type="button"
                    onClick={onUpdate}
                    disabled={!name}
                    className="btn btn-success btn-block"
                  >
                    Update {name}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="row content">
          <h2 className="text-dark text-center">PEOPLES</h2>
          {peoples &&
            peoples.map((people, index) => {
              return (
                <div className="col-md-3 mt-4" key={index}>
                  <div className="shadow rounded">
                    <div className="card bg-dark">
                      <div className="card-body text-center">
                        <h5 className="card-title mb-2">{people}</h5>
                        <div className="row">
                          <div className=" d-grid col-6">
                            <button
                              type="button"
                              onClick={() => {
                                setValues({
                                  ...values,
                                  name: people,
                                  oldName: people,
                                });
                              }}
                              className="btn btn-warning btn-block mt-3"
                            >
                              Edit
                            </button>
                          </div>
                          <div className="d-grid col-6">
                            <button
                              type="button"
                              onClick={() => {
                                onDelete(people);
                              }}
                              className="btn btn-danger btn-block mt-3"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </>
    );
  };

  return (
    <Base title="Add People" description="You can add more people here">
      {addPeopleForm()}
    </Base>
  );
};

export default Home;
