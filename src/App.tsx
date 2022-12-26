import { Route, Routes } from 'react-router-dom';

/** Components */
import { Auth, Header, Home, Meal } from './components';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index path="/" element={Auth(<Home />)} />
        <Route path=":id" element={Auth(<Meal />)} />
        <Route path="login" element={Auth(<Home />)} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
