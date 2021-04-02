import React, { useState, useEffect } from "react";
import Base from "./Base";
import {
  getPeople,
  addRelation,
  getRelations,
  updateRelation,
  deleteRelation,
} from "./helper/Helper";

const Relations = () => {
  const [values, setValues] = useState({
    person: "",
    relatedTo: "",
    relation: "",
    error: "",
    success: false,
    update: false,
    del: false,
    peoples: [],
    relations: [],
  });

  const {
    person,
    relatedTo,
    relation,
    error,
    success,
    update,
    del,
    peoples,
    relations,
  } = values;

  const onAdd = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });

    addRelation({ person, relatedTo, relation })
      .then((data) => {
        setValues({
          ...values,
          person: "",
          relatedTo: "",
          relation: "",
          success: true,
        });
        preload();
      })
      .catch((err) => {
        console.log("error in add relation");
      });
  };
  const onUpdate = (event) => {
    // event.preventDefault();
    // setValues({ ...values, error: false });
    console.log({ person, relatedTo, relation });

    updateRelation({ person, relatedTo, relation })
      .then((data) => {
        setValues({
          ...values,
          person: "",
          relatedTo: "",
          relation: "",
          success: true,
          update: false,
        });
      })
      .catch((err) => {
        console.log("error in Update relation");
      });
  };

  const onDelete = (person, relatedTo, relation) => {
    // event.preventDefault();
    console.log({ person, relatedTo, relation });

    deleteRelation({ person, relatedTo, relation })
      .then((data) => {
        setValues({
          ...values,
          success: true,
        });
        preload();
      })
      .catch((err) => {
        console.log("error in Delete relation");
      });
  };

  const handleChange = (name) => (event) => {
    var value = event.target.value;
    console.log(value);
    if (value == "Choose Person..." || value == "Choose Relation...") {
      value = "";
      setValues({ ...values, [name]: value });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const preload = async () => {
    const people = await getPeople()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log("error in People");
      });
    const relation = await getRelations()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log("error in relation");
      });

    setValues({ ...values, peoples: people, relations: relation });
  };

  useEffect(() => {
    preload();
  }, [update]);

  const addRelationForm = () => {
    return (
      <div className="row">
        <div className="col-md-10 offset-sm-1">
          <form>
            <div className="row">
              <div className="col-sm-3 py-1">
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

              <div className="col-sm-3 py-1">
                <label className="text-dark form-label ">Relation</label>

                <select
                  onChange={handleChange("relation")}
                  className="form-select"
                  id="autoSizingSelect"
                >
                  <option defaultValue>Choose Relation...</option>
                  <option value="Friend">Friend</option>
                  <option value="Son">Son</option>
                  <option value="Brother">Brother</option>
                  <option value="Sister">Sister</option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Grand Father">Grand Father</option>
                  <option value="Grand Mother">Grand Mother</option>
                  <option value="Uncle">Uncle</option>
                </select>
              </div>

              <div className="col-sm-3 py-1">
                <label className="text-dark form-label">Related To</label>
                <select
                  onChange={handleChange("relatedTo")}
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
                  onClick={onAdd}
                  disabled={!person || !relatedTo || !relation}
                  className="btn btn-success"
                >
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const updateRelationForm = () => {
    return (
      <div className="row content">
        <div className="col-md-10 offset-sm-1">
          <form>
            <div className="row">
              <div className="col-sm-3 py-1">
                <label className="text-dark form-label">Person</label>

                <input
                  className="form-control"
                  type="text"
                  onChange={handleChange("person")}
                  value={person}
                />
              </div>
              <div className="col-sm-3 py-1">
                <label className="text-dark form-label">Relation</label>

                <input
                  className="form-control"
                  type="text"
                  onChange={handleChange("relation")}
                  value={relation}
                />
              </div>
              <div className="col-sm-3 py-1">
                <label className="text-dark form-label">Related To</label>

                <input
                  className="form-control"
                  type="text"
                  onChange={handleChange("relatedTo")}
                  value={relatedTo}
                />
              </div>
              <div className="d-grid col-sm-2 offset-sm-1 py-2">
                <button
                  type="button"
                  onClick={onUpdate}
                  disabled={person == "" || relatedTo == "" || relation == ""}
                  className="btn btn-success"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };
  const relationsRender = () => {
    return (
      <div className="row text-center">
        <h2 className="mt-3 text-dark">RELATIONSHIPS</h2>

        {relations &&
          relations.map((relation, index) => {
            return (
              <div key={index} className="col-sm-10 offset-sm-1 mt-4">
                <div className="shadow rounded">
                  <div className="card bg-dark ">
                    <div className="card-body p-2">
                      <div className="row">
                        <div className="card-title col-sm-7 py-1">
                          <h4 className="mb-0">
                            {relation.start} is {relation.relation} of{" "}
                            {relation.end}
                          </h4>
                        </div>
                        <div className="d-grid col-6 col-sm-2 py-2">
                          <button
                            type="button"
                            onClick={() => {
                              setValues({
                                ...values,
                                person: relation.start,
                                relatedTo: relation.end,
                                relation: relation.relation,
                                error: false,
                                update: true,
                              });
                            }}
                            className="btn btn-warning"
                          >
                            Edit
                          </button>
                        </div>
                        <div className="d-grid col-6 col-sm-2 py-2">
                          <button
                            type="button"
                            onClick={() => {
                              onDelete(
                                relation.start,
                                relation.end,
                                relation.relation
                              );
                            }}
                            className="btn btn-danger"
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
    );
  };

  return (
    <Base title="Relation" description="Know/Add your relations here">
      {addRelationForm()}
      {update && updateRelationForm()}
      {relationsRender()}
    </Base>
  );
};

export default Relations;
