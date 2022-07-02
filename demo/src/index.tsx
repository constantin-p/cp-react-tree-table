import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/index.css";
import "./styles/header.css";
import "./styles/table.css";
import "./styles/responsive.css";

import Demo from "./components/Demo";
import Layout from "./components/Layout";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Layout><Demo /></Layout>
  </React.StrictMode>
);

