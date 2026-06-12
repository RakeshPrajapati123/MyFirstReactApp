import React, { useState } from "react";

export const AddTodo = (props) => {

const [title, setTitle] = useState("");
const [desc, setDesc] = useState("");
const submit = (e) => {
e.preventDefault();
if(!title || !desc) {
    alert("Title and description can not be blank.");
}
    else
{


props.addTodo(title, desc);
 setTitle("");
      setDesc("");
}
}
  return (
    <div className="container">
        <h3> Add a Todo </h3>
      <form onSubmit={submit} className="row g-3">
  <div className="col-md-6">
    <label htmlFor="inputTitle" className="form-label">Todo Title</label>
    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" id="inputTitle" />
  </div>
  <div className="col-md-6">
    <label htmlFor="inputDesc" className="form-label">Description</label>
    <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} className="form-control" id="inputDesc" />
  </div>
  {/* <div class="col-12">
    <label for="inputAddress" class="form-label">Address</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" />
  </div>
  <div class="col-12">
    <label for="inputAddress2" class="form-label">Address 2</label>
    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
  </div>
  <div class="col-md-6">
    <label for="inputCity" class="form-label">City</label>
    <input type="text" class="form-control" id="inputCity" />
  </div>
  <div class="col-md-4">
    <label for="inputState" class="form-label">State</label>
    <select id="inputState" class="form-select">
      <option selected>Choose State</option>
      <option>Uttar Pradesh</option>
      <option>Madhya Pradesh</option>
      <option>Gujrat</option>
      <option>Andhra Pradesh</option>
      <option>Arunachal Pradesh</option>
      <option>Bihar</option>
      <option>Rajasthan</option>
      <option>Uttra Khand</option>
      <option>Hariyana Pradesh</option>
      <option>Punjab</option>
    </select>
  </div>
  <div class="col-md-2">
    <label for="inputZip" class="form-label">Zip</label>
    <input type="text" class="form-control" id="inputZip" />
  </div>
  <div class="col-12">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="gridCheck" />
      <label class="form-check-label" for="gridCheck">
        Check me out
      </label>
    </div>
  </div> */}
  <div className="col-12">
    <button type="submit" className="btn btn-primary">Add Todo</button>
  </div>
</form>
    </div>
  );
};
