import { Route, Routes } from 'react-router-dom';

/** Components */
import { Header, Home, Meal, Login } from './components';

/** Context */
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <Header />
      {user ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Meal />} />
        </Routes>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
