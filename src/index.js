import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/Store";
import { SocketProvider } from "./context/SocketProvider";
import ErrorBoundary from "./services/ErrorBoundary";
import ErrorComponent from "./components/ErrorTest";
// import './index.css'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <ErrorBoundary>
        <App />
        </ErrorBoundary>
      </SocketProvider>
    </Provider>
  </React.StrictMode>
);
