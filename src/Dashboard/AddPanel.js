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
      term: "",
      name: "",
      department: "",
      segment: "",
      image: null,
    })
  );

  const handleChange = (index, field, value) => {
    const updatedPanel = [...panel];
    updatedPanel[index][field] = value;
    setPanel(updatedPanel);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const formData = new FormData();
    formData.append("term", term);
    formData.append("panel", JSON.stringify(panel)); // Convert panel array to JSON string

    panel.forEach((member, index) => {
      if (member.image) {
        formData.append("images", member.image); // Append all images
      }
    });

    try {
      const response = await fetch("http://localhost:5000/panel", {
        method: "POST",
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitted(true);

  //   try {
  //     for (const entry of panel) {
  //       const formData = new FormData();
  //       formData.append("name", entry.name);
  //       formData.append("department", entry.department);
  //       formData.append("segment", entry.segment);
  //       formData.append("term", term);
  //       formData.append("image", entry.image);

  //       const response = await fetch("http://localhost:5000/panel", {
  //         method: "POST",
  //         body: formData,
  //       });

  //       if (!response.ok) {
  //         console.error("Failed to submit panel entry:", entry);
  //       }
  //     }

  //     console.log("Panel submitted successfully!");
  //   } catch (error) {
  //     console.error("Error submitting panel:", error);
  //   }
  // };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Panel Allotment Form</h2>

      <form onSubmit={handleSubmit} className="mt-4">
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
        {segments.map((segment, index) => (
          <div key={index} className="border p-4 rounded-lg mb-4">
            <h3 className="font-semibold mb-2">{segment}</h3>
            <input
              type="text"
              placeholder="Name"
              className=" bg-white w-full p-2 border rounded-md mb-2"
              onChange={(e) => handleChange(index, "name", e.target.value)}
              disabled={isSubmitted}
              // required
            />
            <select
              className=" bg-white w-full p-2 border rounded-md mb-2"
              onChange={(e) =>
                handleChange(index, "department", e.target.value)
              }
              disabled={isSubmitted}
              // required
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
              className=" bg-white w-full p-2 border rounded-md"
              onChange={(e) => handleChange(index, "image", e.target.files[0])}
              disabled={isSubmitted}
              // required
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
          Submit Panel
          {/* {isSubmitted ? "Panel Locked" : "Submit Panel"} */}
        </button>
      </form>
    </div>
  );
}
