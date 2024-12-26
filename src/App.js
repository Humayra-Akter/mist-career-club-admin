import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";

import { ToastContainer } from "react-toastify";
import Welcome from "./Dashboard/Welcome";
import Navbar from "./Dashboard/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Welcome />} />

          {/* <Route path="oven" element={<OvenBookings />}></Route> */}
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
