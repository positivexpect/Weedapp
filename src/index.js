import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Ensure Tailwind is properly loaded
import NewReviewForm from "./NewReviewForm"; 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NewReviewForm />
  </React.StrictMode>
);

// Removed reportWebVitals(); since it's no longer needed
