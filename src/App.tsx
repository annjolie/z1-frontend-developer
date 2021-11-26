import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'typeface-roboto';
import './App.scss';

const Home = lazy(() => import('./routes/Home/Home'));
const Camera = lazy(() => import('./routes/Camera/Camera'));

const App = () => (
  <div className="App">
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/camera" element={<Camera />} />
        </Routes>
      </Suspense>
    </Router>
  </div>
);

export default App;
