import { useEffect, useState } from "react";
import Header from "./MyComponents/Header";
import { Footer } from "./MyComponents/Footer";
import { Todos } from "./MyComponents/Todos";
import { AddTodo } from "./MyComponents/AddTodo";
import { About } from "./MyComponents/About";
import CustomerCrud from "./MyComponents/CustomerCrud";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  let initTodo;

  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const [todos, setTodos] = useState(initTodo);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Delete Function
  const onDelete = (todo) => {
    console.log("Deleting todo", todo);

    setTodos(
      todos.filter((e) => {
        return e !== todo;
      }),
    );
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const addTodo = (title, desc) => {
    console.log("I am adding this todo", title, desc);
    let sno;

    if (todos.length === 0) {
      sno = 0;
    } else {
      sno = todos[todos.length - 1].sno + 1;
    }

    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    };

    setTodos([...todos, myTodo]);
    console.log(myTodo);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Header title="My Todos List" searchBar={false} />

        <div className="container flex-grow-1">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <AddTodo addTodo={addTodo} />

                  <hr />

                  <Todos todos={todos} onDelete={onDelete} />
                </>
              }
            />

            <Route path="/about" element={<About />} />
            <Route path="/customers" element={<CustomerCrud />} />
          </Routes>
        </div>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
