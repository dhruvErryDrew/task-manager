import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import TaskList from './components/TaskList/TaskList';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/tasks" element={<TaskList/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
