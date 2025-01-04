import React, { useState } from "react";
import { toast } from "react-toastify";

const AddDirector = () => {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    segment: "",
    term: "",
    image: null,
  });
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

  const terms = ["Spring Term", "Fall Term"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      toast.error("Please upload an image for the director.");
      return;
    }

    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("department", formData.department);
    formPayload.append("segment", formData.segment);
    formPayload.append("term", formData.term);
    formPayload.append("image", formData.image);

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/director-panel", {
        method: "POST",
        body: formPayload,
      });

      if (response.ok) {
        toast.success("Director added successfully!");
        setFormData({
          name: "",
          department: "",
          segment: "",
          term: "",
          image: null,
        });
        e.target.reset(); // Reset the file input
      } else {
        throw new Error("Failed to add director.");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-bold text-center mb-6">Add Director</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border bg-white w-full p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="border bg-white w-full p-2 rounded"
            required
          >
            <option value="">Select a department</option>
            {departments.map((dept, index) => (
              <option key={index} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Segment</label>
          <select
            name="segment"
            value={formData.segment}
            onChange={handleChange}
            className="border bg-white w-full p-2 rounded"
            required
          >
            <option value="">Select a segment</option>
            {segments.map((seg, index) => (
              <option key={index} value={seg}>
                {seg}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Term</label>
          <select
            name="term"
            value={formData.term}
            onChange={handleChange}
            className="border bg-white w-full p-2 rounded"
            required
          >
            <option value="">Select a term</option>
            {terms.map((term, index) => (
              <option key={index} value={term}>
                {term}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border bg-white w-full p-2"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`${
            isSubmitting ? "bg-gray-500" : "bg-blue-500"
          } text-white px-4 py-2 rounded`}
        >
          {isSubmitting ? "Saving..." : "Add Director"}
        </button>
      </form>
    </div>
  );
};

export default AddDirector;
