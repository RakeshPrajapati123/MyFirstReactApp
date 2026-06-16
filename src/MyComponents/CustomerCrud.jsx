import React, { useEffect, useState } from "react";
import axios from "axios";

function CustomerCRUD() {
  const GET_URL = "http://localhost:57224/api/AjaxAPI/GetCustomers";
  const INSERT_URL = "http://localhost:57224/api/AjaxAPI/InsertCustomer";
  const UPDATE_URL = "http://localhost:57224/api/AjaxAPI/UpdateCustomer";
  const DELETE_URL = "http://localhost:57224/api/AjaxAPI/DeleteCustomer";

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

  //------Delete functionality with confirmation dialog on 16-06-2026 by Rakesh Prajapati------
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.post(DELETE_URL, {
        CustomerID: deleteId,
      });

      getCustomers(); // refresh from database

      setShowConfirm(false);
    } catch (error) {
      console.error(error);
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
                        onClick={() => handleDeleteClick(customer.CustomerID)}
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

      {showConfirm && (
        <div
          className="modal d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  className="btn-close btn-close-white"
                  onClick={() => setShowConfirm(false)}
                ></button>
              </div>

              <div className="modal-body">
                <p>Are you sure you want to delete this customer?</p>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </button>

                <button className="btn btn-danger" onClick={confirmDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        //-------Delete Confirmation Modal on 16-06-2026 by Rakesh Prajapati------
      )}
    </div>
  );
}

export default CustomerCRUD;
