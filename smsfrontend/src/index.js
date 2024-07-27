import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Page404 from './Pages/Page404';
import Home from './Pages/Home';
import CompanyProfile from './Pages/CompanyProfile';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Admin from './Pages/Admin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>


        <Route
          element={<Dashboard/>}
          path="/"
        >
          <Route
            path='home'
            element={<Home/>}
          />

          <Route
            element={<Admin/>}
            path='admin'
          />

          <Route
            path='companyProfile'
            element={<CompanyProfile/>}
          />
        </Route>


        <Route
          element={<h1>Yummy 1</h1>}
          path='/:teamID'
        />


        <Route
          element={<Login/>}
          path='/login'
        >

        </Route>

        <Route
          element={<Register/>}
          path='/register'
        >
        
        </Route>


        <Route
          element={<Page404/>}
          path="*"
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
