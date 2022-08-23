import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

/** Components */
import { Auth, Header, Home } from './components';
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
        <Route path="/" element={Auth(<Home />)} />
        <Route
          path="/:id"
          element={<Suspense>{Auth(<MealComponent />)}</Suspense>}
        />
        <Route path="/login" element={Auth(<Home />)} />
      </Routes>
      <Suspense fallback={null}>
        <ToastContainer />
      </Suspense>
    </div>
  );
}

export default App;
