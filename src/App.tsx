import { Route, Navigate, BrowserRouter, Routes } from "react-router-dom";
import { Fragment } from "react";
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
