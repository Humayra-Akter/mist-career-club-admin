import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";

import { ToastContainer } from "react-toastify";
import Welcome from "./Dashboard/Welcome";
import Navbar from "./Dashboard/Navbar";
import EventCreate from "./Dashboard/EventCreate";
import EventList from "./Dashboard/EventList";
import AddPanel from "./Dashboard/AddPanel";
import PanelList from "./Dashboard/PanelList";

function App() {
  return (
    <div className="bg-white text-black">
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Welcome />} />

          <Route path="eventCreate" element={<EventCreate />} />
          <Route path="eventList" element={<EventList />} />
          <Route path="addPanel" element={<AddPanel />} />
          <Route path="panelList" element={<PanelList />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
