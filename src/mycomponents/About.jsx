import React from 'react'

export const About = () => {
  return (

    <div className="container-fluid mt-4">
      <div className="card shadow-sm">
        <div className="card-body">

          <h1 className="text-center mb-4">About Us</h1>

          <p>
            Welcome to the Customer Management Application.
          </p>

          <p>
            This application is a learning project built using React.js and REST APIs.
            It demonstrates Create, Read, Update and Delete (CRUD) operations
            through a modern user interface.
          </p>

          <h3>Key Features</h3>

          <ul className="list-group mb-4">
            <li className="list-group-item">Add Customers</li>
            <li className="list-group-item">View Customers</li>
            <li className="list-group-item">Update Customer Information</li>
            <li className="list-group-item">Delete Customers</li>
            <li className="list-group-item">REST API Integration</li>
          </ul>

          <h3>Technologies Used</h3>

          <div className="mb-3">
            <span className="badge bg-primary me-2">React.js</span>
            <span className="badge bg-success me-2">JavaScript</span>
            <span className="badge bg-info text-dark me-2">Bootstrap 5</span>
            <span className="badge bg-secondary">REST API</span>
          </div>

        </div>
      </div>
    </div>
  );
}
   
export default About;

