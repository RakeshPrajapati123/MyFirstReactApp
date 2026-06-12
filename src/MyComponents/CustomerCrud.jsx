import React, { useEffect, useState } from "react";
import axios from "axios";

function CustomerCRUD() {
  const GET_URL = "http://localhost:57224/api/AjaxAPI/GetCustomers";
  const INSERT_URL = "http://localhost:57224/api/AjaxAPI/InsertCustomer";
  const UPDATE_URL = "http://localhost:57224/api/AjaxAPI/UpdateCustomer";
  const DELETE_URL = "http://localhost:57224/api/AjaxAPI/DeleteCustomer";

  //const API_URL = "http://localhost:57224/api/AjaxAPI/GetCustomers";

  const [customers, setCustomers] = useState([]);

  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    country: "",
  });

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = () => {
    axios
      .get(GET_URL)
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.id === 0) {
      axios
        .post(INSERT_URL, formData)
        .then(() => {
          alert("Customer Added Successfully");
          resetForm();
          getCustomers();
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .post(UPDATE_URL, {
          CustomerID: formData.id,
          Name: formData.name,
          Country: formData.country,
        })
        .then(() => {
          alert("Customer Updated Successfully");
          resetForm();
          getCustomers();
        })
        .catch((err) => console.error(err));
    }
  };

  const editCustomer = (customer) => {
    setFormData({
      id: customer.CustomerID,
      name: customer.Name,
      country: customer.Country,
    });
  };

  const deleteCustomer = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      axios
        .post(DELETE_URL, {
          CustomerID: id,
        })
        .then(() => {
          alert("Customer Deleted Successfully");
          getCustomers();
        })
        .catch((err) => console.error(err));
    }
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      name: "",
      country: "",
    });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3>Customer CRUD Operations</h3>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Customer Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Country</label>
                <input
                  type="text"
                  name="country"
                  className="form-control"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-success me-2">
              {formData.id === 0 ? "Save" : "Update"}
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetForm}
            >
              Clear
            </button>
          </form>
        </div>
      </div>

      <div className="card mt-4 shadow">
        <div className="card-header bg-dark text-white">
          <h4>Customer List</h4>
        </div>

        <div className="card-body">
          <table className="table table-bordered table-striped table-hover">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Country</th>
                <th width="200">Actions</th>
              </tr>
            </thead>

            <tbody>
              {customers.length > 0 ? (
                customers.map((customer) => (
                  <tr key={customer.CustomerID}>
                    <td>{customer.CustomerID}</td>
                    <td>{customer.Name}</td>
                    <td>{customer.Country}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => editCustomer(customer)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteCustomer(customer.CustomerID)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No Records Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CustomerCRUD;
