import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "./Modal";

const DirectorList = () => {
  const [directors, setDirectors] = useState([]);
  const [editDirector, setEditDirector] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch directors from the backend
  const fetchDirectors = async () => {
    try {
      const response = await fetch("http://localhost:5000/director");
      const data = await response.json();
      setDirectors(data);
    } catch (error) {
      console.error("Error fetching directors:", error);
      toast.error("Failed to fetch directors.");
    }
  };

  // Delete a director
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this director?"))
      return;

    try {
      const response = await fetch(`http://localhost:5000/director/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Director deleted successfully.");
        fetchDirectors(); // Refresh the director list
      } else {
        throw new Error("Failed to delete director.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle form submission for editing
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("name", editDirector.name);
    formData.append("department", editDirector.department);
    formData.append("year", editDirector.year);
    formData.append("segment", editDirector.segment);
    formData.append("term", editDirector.term);

    // Add the updated image if provided
    if (editDirector.imageFile) {
      formData.append("image", editDirector.imageFile);
    }

    try {
      const response = await fetch(
        `http://localhost:5000/director/${editDirector._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Director updated successfully.");
        setEditDirector(null);
        setModalOpen(false);
        fetchDirectors(); // Refresh the director list
      } else {
        throw new Error("Failed to update director.");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes for editing
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditDirector({ ...editDirector, [name]: value });
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditDirector({ ...editDirector, imageFile: file });
  };

  // Fetch directors on component mount
  useEffect(() => {
    fetchDirectors();
  }, []);

  return (
    <div>
      <h1 className="text-3xl text-center mb-7 font-bold mt-4">Director List</h1>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-primary">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Department</th>
            <th className="border px-4 py-2">Year</th>
            <th className="border px-4 py-2">Segment</th>
            <th className="border px-4 py-2">Term</th>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {directors.map((director) => (
            <tr key={director._id}>
              <td className="border capitalize px-4 py-2">{director.name}</td>
              <td className="border px-4 py-2">{director.department}</td>
              <td className="border px-4 py-2">{director.year}</td>
              <td className="border px-4 py-2">{director.segment}</td>
              <td className="border px-4 py-2">{director.term}</td>
              <td className="border px-4 py-2">
                {director.image && (
                  <img
                    src={director.image}
                    alt="Director"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => {
                    setEditDirector(director);
                    setModalOpen(true);
                  }}
                  className="bg-yellow-700 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(director._id)}
                  className="bg-red-700 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Editing */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        {editDirector && (
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={editDirector.name}
                onChange={handleEditChange}
                className="border bg-white w-full p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={editDirector.department}
                onChange={handleEditChange}
                className="border bg-white w-full p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Segment</label>
              <input
                type="text"
                name="segment"
                value={editDirector.segment}
                onChange={handleEditChange}
                className="border bg-white w-full p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Term</label>
              <input
                type="text"
                name="term"
                value={editDirector.term}
                onChange={handleEditChange}
                className="border bg-white w-full p-2 rounded"
                required
              />
            </div>{" "}
            <div>
              <label className="block text-sm font-medium mb-1">Year</label>
              <input
                type="number"
                name="year"
                value={editDirector.year}
                onChange={handleEditChange}
                className="border bg-white w-full p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image</label>
              {editDirector.image && (
                <img
                  src={editDirector.image}
                  alt="Current"
                  className="w-16 h-16 object-cover mb-2"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="border bg-white w-full p-2"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${
                isSubmitting ? "bg-gray-500" : "bg-blue-500"
              } text-white px-4 py-2 rounded`}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default DirectorList;
