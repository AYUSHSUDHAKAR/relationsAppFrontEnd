import { API } from "../../backend";

export const addPeople = (name) => {
  console.log(JSON.stringify(name));
  return fetch(`${API}/api/person/add`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(name),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const updatePeople = (name) => {
  console.log(JSON.stringify(name));
  return fetch(`${API}/api/person/update`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(name),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const deletePeople = (name) => {
  return fetch(`${API}/api/person/delete`, {
    method: "DELETE",
    headers: {
      //   Accept:"application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(name),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getPeople = () => {
  return fetch(`${API}/api/person`, {
    method: "GET",
    // headers:{
    //   Accept:"application/json",
    //   "Content-Type":"application/json"
    // }
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addRelation = (relation) => {
  return fetch(`${API}/api/relation/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(relation),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateRelation = (relation) => {
  return fetch(`${API}/api/relation/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(relation),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteRelation = (relation) => {
  return fetch(`${API}/api/relation/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(relation),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getRelations = () => {
  return fetch(`${API}/api/relation`, {
    method: "GET",
    // headers: {
    //   "Content-Type": "application/json",
    // },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getConnection = (connection) => {
  console.log(connection);
  return fetch(`${API}/api/connection`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(connection),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
