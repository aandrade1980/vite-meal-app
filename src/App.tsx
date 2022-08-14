import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

/** Components */
import { Header, Home, Login } from './components';

/** Dynamic */
const MealComponent = lazy(() =>
  import('./components').then(module => ({ default: module.Meal }))
);

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
    </div>
  );
}

export default App;
