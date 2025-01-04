import React, { useState } from "react";
import { toast } from "react-toastify";

const AddAssociative = () => {
  const [associatives, setAssociatives] = useState([
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
    const updatedAssociatives = [...associatives];
    updatedAssociatives[index][field] = value;
    setAssociatives(updatedAssociatives);
  };

  const handleImageChange = (index, file) => {
    const updatedAssociatives = [...associatives];
    updatedAssociatives[index].image = file;
    setAssociatives(updatedAssociatives);
  };

  const addAssociative = () => {
    setAssociatives([
      ...associatives,
      { segment: "", department: "", name: "", image: null },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      for (const associative of associatives) {
        const formPayload = new FormData();
        formPayload.append("segment", associative.segment);
        formPayload.append("department", associative.department);
        formPayload.append("name", associative.name);
        formPayload.append("image", associative.image);

        const response = await fetch("http://localhost:5000/associative", {
          method: "POST",
          body: formPayload,
        });

        if (!response.ok) {
          throw new Error("Failed to add an Associative.");
        }
      }

      toast.success("Associative added successfully!");
      setAssociatives([{ segment: "", department: "", name: "", image: null }]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-bold text-center mb-6">Add Associative</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {associatives.map((associative, index) => (
          <div key={index} className="space-y-4 border-b pb-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Segment</label>
              <select
                value={associative.segment}
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
                value={associative.department}
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
                value={associative.name}
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
          onClick={addAssociative}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          Add Another Associative
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`${
            isSubmitting ? "bg-gray-500" : "bg-blue-500"
          } text-white px-4 py-2 rounded`}
        >
          {isSubmitting ? "Saving..." : "Save Associative"}
        </button>
      </form>
    </div>
  );
};

export default AddAssociative;
