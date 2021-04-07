import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const UpdateOrder = (props) => {
  let id = parseInt(props.match.params.id);

  const [billId, setBillId] = useState(id);
  const [status, setStatus] = useState("");
  const [message, setMessge] = useState("");

  const billStatusChangeHandler = (e) => {
    let status = e.target.value;
    setStatus(status);
  };

  const updateStatus = (e) => {
    e.preventDefault();

    const data = {
      billId: billId,
      status: status,
    };

    Axios.put("http://localhost:3001/updateStatus", data)
      .then((data) => {
        console.log("done");
        setStatus("");
        setMessge("Successfully Updated");
      })
      .catch((err) => {
        console.log("Error! Please try again");
      });
  };

  return (
    <div className="main-container mt-4">
      <div className="row mt-4">
        <div className="col-md-5 col-sm-10 offset-sm-2 offset-md-4 mt-4">
          <h3 className="users">Update Order Status</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-4 offset-sm-2 offset-md-3">
          <p>{message}</p>
          <h4 className="mt-4">Bill Number : {billId}</h4>
          <form onSubmit={updateStatus}>
            <div className="form-group mt-4">
              <label htmlFor="exampleInputEmail1 mt-4">New Status</label>
              <input
                type="text"
                onChange={billStatusChangeHandler}
                value={status}
                required
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Completed"
              />
            </div>
            <button type="submit" className="btn btn-warning mr-2">
              Update Status
            </button>
            <Link to="/dashbord">
              <button className="btn btn-warning">Dashbord</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrder;
