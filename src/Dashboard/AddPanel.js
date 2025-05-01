
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
  "Club Coordinator",
  "Event Management",
  "Communication",
  "Brand Promotion",
  "Logistic",
  "Creative Design",
  "Workshop Management",
];

export default function AddPanel() {
  const [term, setTerm] = useState("Spring");
  const [year, setYear] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [panel, setPanel] = useState(
    segments.map((segment) => ({
      name: "",
      department: "",
      segment: segment,
      image: null,
    }))
  );

  const handleChange = (index, field, value) => {
    const updatedPanel = [...panel];
    updatedPanel[index][field] = value;
    setPanel(updatedPanel);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Prepare panel with year and term included inside each member object
    const filledPanel = panel.map((member) => ({
      ...member,
      term: term,
      year: year,
    }));

    const formData = new FormData();
    formData.append("panel", JSON.stringify(filledPanel));

    panel.forEach((member) => {
      if (member.image) {
        formData.append("images", member.image);
      }
    });

    try {
      const response = await fetch("http://localhost:5000/panel", {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        body: formData,
      });

      if (response.ok) {
        console.log("Panel submitted successfully!");
      } else {
        console.error("Failed to submit panel.");
      }
    } catch (error) {
      console.error("Error submitting panel:", error);
    }
  };

  return (
    <div className="max-w-4xl text-white mx-auto p-6 shadow-md rounded-lg">
      <h1 className="text-3xl text-white font-bold text-center mb-6">
        Panel Allotment Form
      </h1>

      <form onSubmit={handleSubmit} className="mt-4">
        <label className="block mb-2 font-medium">Term:</label>
        <select
          className="w-full p-2 mb-4 border rounded-md"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          disabled={isSubmitted}
          required
        >
          <option value="Spring">Spring</option>
          <option value="Fall">Fall</option>
        </select>

        <label className="block mb-2 font-medium">Year:</label>
        <input
          type="number"
          placeholder="Year"
          className="w-full p-2 border rounded-md mb-6"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          disabled={isSubmitted}
          required
        />

        {segments.map((segment, index) => (
          <div key={index} className="border p-4 rounded-lg mb-4">
            <h3 className="font-semibold mb-2">{segment}</h3>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border rounded-md mb-2"
              onChange={(e) => handleChange(index, "name", e.target.value)}
              disabled={isSubmitted}
              required
            />
            <select
              className="w-full p-2 border rounded-md mb-2"
              onChange={(e) =>
                handleChange(index, "department", e.target.value)
              }
              disabled={isSubmitted}
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept, i) => (
                <option key={i} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <input
              type="file"
              className="w-full p-2 border rounded-md"
              onChange={(e) => handleChange(index, "image", e.target.files[0])}
              disabled={isSubmitted}
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className={`border text-white px-4 py-2 rounded hover:bg-blue-800 transition-all duration-200 flex items-center justify-center w-1/3 mx-auto ${
            isSubmitted ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={isSubmitted}
        >
          Submit Panel
        </button>
      </form>
    </div>
  );
}
