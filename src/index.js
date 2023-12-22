import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain="dev-r6hjbqthwc6tzhg3.us.auth0.com"
        clientId="d7mfPBJGvZGCLUSfVuumHswYrx8IQlcA"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// Auth0 3rd party:-https://www.youtube.com/watch?v=oA-K3DfG1QY&t=281s
// Auth0:- https://www.youtube.com/watch?v=pdd04JzJrDw
