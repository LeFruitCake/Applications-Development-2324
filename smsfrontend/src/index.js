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
import TaskPage from './Pages/TaskPage';
import { UserProvider } from './ContextProvider/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
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
              path='companyProfile/:companyID'
              element={<CompanyProfile/>}
            />
            <Route
              element={<TaskPage/>}
              path='/taskpage/:taskID'/>
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
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
