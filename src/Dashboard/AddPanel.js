import { useState } from "react";

const departments = [
  "Architecture (AE)",
  "Aeronautical Engineering (AE)",
  "Biomedical Engineering (BME)",
  "Civil Engineering (CE)",
  "Computer Science & Engineering (CSE)",
  "Electrical, Electronic and Communication Engineering (EECE)",
  "Environmental, Water Resources and Coastal Engineering (EWCE)",
  "Industrial and Production Engineering (IPE)",
  "Mechanical Engineering (ME)",
  "Naval Architecture and Marine Engineering (NAME)",
  "Nuclear Science & Engineering (NSE)",
  "Petroleum & Mining Engineering (PME)",
];

const segments = [
  "President",
  "General Secretary",
  "Event Management",
  "Communication",
  "Brand Promotion",
  "Logistic",
  "Creative Design",
  "Workshop Management",
];

export default function AddPanel() {
  const [term, setTerm] = useState("Spring");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [panel, setPanel] = useState(
    Array(8).fill({
      name: "",
      department: "",
      segment: "",
      year: "",
      image: null,
    })
  );

  const handleChange = (index, field, value) => {
    const updatedPanel = [...panel];
    updatedPanel[index][field] = value;
    setPanel(updatedPanel);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Panel Allotment Form</h2>
      <label className="block mb-2 font-medium">Term:</label>
      <select
        className=" bg-white w-full p-2 border rounded-md"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        disabled={isSubmitted}
      >
        <option value="Spring">Spring</option>
        <option value="Fall">Fall</option>
      </select>

      <form onSubmit={handleSubmit} className="mt-4">
        {segments.map((segment, index) => (
          <div key={index} className="border p-4 rounded-lg mb-4">
            <h3 className="font-semibold mb-2">{segment}</h3>
            <input
              type="text"
              placeholder="Name"
              className=" bg-white w-full p-2 border rounded-md mb-2"
              onChange={(e) => handleChange(index, "name", e.target.value)}
              disabled={isSubmitted}
            />
            <select
              className=" bg-white w-full p-2 border rounded-md mb-2"
              onChange={(e) =>
                handleChange(index, "department", e.target.value)
              }
              disabled={isSubmitted}
            >
              <option value="">Select Department</option>
              {departments.map((dept, i) => (
                <option key={i} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Year"
              className=" bg-white w-full p-2 border rounded-md mb-2"
              onChange={(e) => handleChange(index, "year", e.target.value)}
              disabled={isSubmitted}
            />
            <input
              type="file"
              className=" bg-white w-full p-2 border rounded-md"
              onChange={(e) => handleChange(index, "image", e.target.files[0])}
              disabled={isSubmitted}
            />
          </div>
        ))}
        <button
          type="submit"
          className={`w-full p-3 rounded-md text-white font-bold mt-4 ${
            isSubmitted ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={isSubmitted}
        >
          {isSubmitted ? "Panel Locked" : "Submit Panel"}
        </button>
      </form>
    </div>
  );
}
