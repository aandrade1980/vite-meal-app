import { Route, Routes } from 'react-router-dom';
import { Home, Meal } from './components';

function App() {
  return (
    <div className="App">
      <header>Header</header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Meal />} />
      </Routes>
    </div>
  );
}

export default App;
