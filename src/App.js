import NotFoundPage from "./Pages/NotFoundPage";
import HomePage from './Pages/HomePage';
import CreateTaskPage from './Pages/CreateTaskPage';
import TaskPage from "./Pages/TaskPage";
import TasksPage from "./Pages/TasksPage";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import { isLoggedIn } from "./Helper/Axios";

function App() {
  return (
    <div className="App">
      <Routes>HomePage
          <Route exact={true} path="/" element={<HomePage />} />
          <Route exact={true} path="/create" element={isLoggedIn() ? (<CreateTaskPage />) : (<Navigate replace to={"/"}/>)} />
          <Route exact={true} path="/task/:id" element={isLoggedIn() ? (<TaskPage />) : (<Navigate replace to={"/"}/>)} />
          <Route exact={true} path="/tasks" element={isLoggedIn() ? (<TasksPage />) : (<Navigate replace to={"/"}/>)} />
          <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
