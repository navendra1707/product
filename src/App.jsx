import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './app.route';

function App() {
  return (
    <div>
       <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
    </div>
  );
}

export default App;
