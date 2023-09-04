import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Topbar from './Topbar.jsx';
import routes from '../routes';

export default function App({ serverData = null }) {
  return (
    <>
      <Topbar />
      <Routes>
        {routes.map((route) => {
          const { path, fetchInitialData, component: Component } = route;
          return (
            <Route
              key={path}
              path={path}
              element={
                <Component
                  data={serverData}
                  fetchInitialData={fetchInitialData}
                />
              }
            />
          );
        })}
      </Routes>
    </>
  );
}
