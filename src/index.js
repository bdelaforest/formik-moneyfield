import React from "react";
import ReactDOM from "react-dom";
import { Field, Form, Formik } from "formik";

import Description from "./Description";
import FormExample from "./FormExample";
import Header from "./Header";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Header />

      <FormExample />

      <Description />

      <div className="author">
        <a href="https://www.margo.com" target="_blank">
          Margo Bank
        </a>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
