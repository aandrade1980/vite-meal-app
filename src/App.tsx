import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

/** Components */
import { Header, Home, Login } from './components';
import { ToastContainer } from 'react-toastify';

/** Dynamic */
const MealComponent = lazy(() =>
  import('./components').then(module => ({ default: module.Meal }))
);

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/:id"
          element={
            <Suspense>
              <MealComponent />
            </Suspense>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Suspense fallback={null}>
        <ToastContainer />
      </Suspense>
    </div>
  );
}

export default App;
