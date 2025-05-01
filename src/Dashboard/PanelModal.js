import React, { useState } from "react";

const PanelModal = ({ member, closeModal }) => {
  const [formData, setFormData] = useState({
    name: member.name,
    department: member.department,
    segment: member.segment,
    image: member.image,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("department", formData.department);
    data.append("segment", formData.segment);
    if (formData.image instanceof File) {
      data.append("image", formData.image);
    }

    const response = await fetch(`http://localhost:5000/panel/${member._id}`, {
      method: "PUT",
      body: data,
    });

    if (response.ok) {
      console.log("Panel member updated");
      closeModal();
    } else {
      console.error("Update failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-slate-900 border rounded-xl p-6 w-1/3 space-y-4 relative">
        <h2 className="text-xl font-bold mb-4 text-white text-center">
          Edit Member
        </h2>

        <label className="block text-sm font-medium text-white">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block text-sm font-medium text-white">
          Department
        </label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block text-sm font-medium text-white">Segment</label>
        <input
          type="text"
          name="segment"
          value={formData.segment}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block text-sm font-medium text-white">Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.files[0] })
          }
        />

        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-400 rounded-lg text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 rounded-lg text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PanelModal;
