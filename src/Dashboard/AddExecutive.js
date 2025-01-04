import React, { useState } from "react";
import { toast } from "react-toastify";

const AddExecutive = () => {
  const [executives, setExecutives] = useState([
    { segment: "", department: "", name: "", image: null },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    "Event Management",
    "Communication",
    "Brand Promotion",
    "Logistic",
    "Creative Design",
    "Workshop Management",
  ];

  const handleChange = (index, field, value) => {
    const updatedExecutives = [...executives];
    updatedExecutives[index][field] = value;
    setExecutives(updatedExecutives);
  };

  const handleImageChange = (index, file) => {
    const updatedExecutives = [...executives];
    updatedExecutives[index].image = file;
    setExecutives(updatedExecutives);
  };

  const addExecutive = () => {
    setExecutives([
      ...executives,
      { segment: "", department: "", name: "", image: null },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      for (const executive of executives) {
        const formPayload = new FormData();
        formPayload.append("segment", executive.segment);
        formPayload.append("department", executive.department);
        formPayload.append("name", executive.name);
        formPayload.append("image", executive.image);

        const response = await fetch("http://localhost:5000/executive", {
          method: "POST",
          body: formPayload,
        });

        if (!response.ok) {
          throw new Error("Failed to add an executive.");
        }
      }

      toast.success("Executives added successfully!");
      setExecutives([{ segment: "", department: "", name: "", image: null }]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-bold text-center mb-6">Add Executive</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {executives.map((executive, index) => (
          <div key={index} className="space-y-4 border-b pb-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Segment</label>
              <select
                value={executive.segment}
                onChange={(e) => handleChange(index, "segment", e.target.value)}
                className="border bg-white w-full p-2 rounded"
                required
              >
                <option value="">Select a segment</option>
                {segments.map((segment, idx) => (
                  <option key={idx} value={segment}>
                    {segment}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Department
              </label>
              <select
                value={executive.department}
                onChange={(e) =>
                  handleChange(index, "department", e.target.value)
                }
                className="border bg-white w-full p-2 rounded"
                required
              >
                <option value="">Select a department</option>
                {departments.map((dept, idx) => (
                  <option key={idx} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={executive.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                className="border bg-white w-full p-2 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(index, e.target.files[0])}
                className="border bg-white w-full p-2"
                required
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addExecutive}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          Add Another Executive
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`${
            isSubmitting ? "bg-gray-500" : "bg-blue-500"
          } text-white px-4 py-2 rounded`}
        >
          {isSubmitting ? "Saving..." : "Save Executives"}
        </button>
      </form>
    </div>
  );
};

export default AddExecutive;
