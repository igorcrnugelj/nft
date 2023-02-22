import {
  Route,
  redirect,
  Navigate,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import React, { Fragment } from "react";
import logo from "./logo.svg";
import Home from "./pages/Home";
import Generator from "./pages/Generator";
import Header from "./components/layout/Header";
import { Provider } from "react-redux";
import store from "./store/store";
import Wallet from "./components/wallet/Wallet";
import setupInterceptor from "./components/axios/Interceptor";

function App() {
  setupInterceptor(store);
  return (
    <Fragment>
      <div className="App">
        {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
        <Provider store={store}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/generator" element={<Generator />} />
              <Route path="/wallet" element={<Wallet />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      </div>
    </Fragment>
  );
}

export default App;
