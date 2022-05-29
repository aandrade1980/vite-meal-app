import { Route, Routes } from 'react-router-dom';
import { Header, Home, Meal } from './components';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Meal />} />
      </Routes>
    </div>
  );
}

export default App;
