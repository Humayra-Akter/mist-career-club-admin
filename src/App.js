import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";

import { ToastContainer } from "react-toastify";
import Welcome from "./Dashboard/Welcome";
import Navbar from "./Dashboard/Navbar";
import EventCreate from "./Dashboard/EventCreate";
import EventList from "./Dashboard/EventList";
import AddDirector from "./Dashboard/AddDirector";
import DirectorList from "./Dashboard/DirectorList";

function App() {
  return (
    <div className="bg-white text-black">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Welcome />} />

          <Route path="eventCreate" element={<EventCreate />} />
          <Route path="eventList" element={<EventList />} />
          <Route path="addDirector" element={<AddDirector />} />
          
          <Route path="directorList" element={<DirectorList />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
