import React from "react";
import Modal from "./Modal";

const ExecutiveList = () => {
  const [executives, setExecutives] = useState([]);
  const [editExecutive, setEditExecutive] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch executives from the backend
  const fetchExecutives = async () => {
    try {
      const response = await fetch("http://localhost:5000/executives");
      const data = await response.json();
      setExecutives(data);
    } catch (error) {
      console.error("Error fetching executives:", error);
      toast.error("Failed to fetch executives.");
    }
  };

  // Delete a director
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this executive?"))
      return;

    try {
      const response = await fetch(`http://localhost:5000/executives/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("executive deleted successfully.");
        fetchExecutives(); // Refresh the executives list
      } else {
        throw new Error("Failed to delete executive.");
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
    formData.append("name", editExecutive.name);
    formData.append("department", editExecutive.department);
    formData.append("year", editExecutive.year);
    formData.append("segment", editExecutive.segment);
    formData.append("term", editExecutive.term);

    // Add the updated image if provided
    if (editExecutive.imageFile) {
      formData.append("image", editExecutive.imageFile);
    }

    try {
      const response = await fetch(
        `http://localhost:5000/executive/${editExecutive._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Executive updated successfully.");
        setEditExecutive(null);
        setModalOpen(false);
        fetchExecutives(); // Refresh the executive list
      } else {
        throw new Error("Failed to update Executive.");
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
    setEditExecutive({ ...editExecutive, [name]: value });
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditExecutive({ ...editExecutive, imageFile: file });
  };

  // Fetch directors on component mount
  useEffect(() => {
    fetchExecutives();
  }, []);

  return (
    <div>
      <h1 className="text-3xl text-center mb-7 font-bold mt-4">
        Executive List
      </h1>
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
          {executives.map((executive) => (
            <tr key={executive._id}>
              <td className="border capitalize px-4 py-2">{executive.name}</td>
              <td className="border px-4 py-2">{executive.department}</td>
              <td className="border px-4 py-2">{executive.year}</td>
              <td className="border px-4 py-2">{executive.segment}</td>
              <td className="border px-4 py-2">{executive.term}</td>
              <td className="border px-4 py-2">
                {executive.image && (
                  <img
                    src={executive.image}
                    alt="executive"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => {
                    setEditExecutive(executive);
                    setModalOpen(true);
                  }}
                  className="bg-yellow-700 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(executive._id)}
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
        {editExecutive && (
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={editExecutive.name}
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
                value={editExecutive.department}
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
                value={editExecutive.segment}
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
                value={editExecutive.term}
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
                value={editExecutive.year}
                onChange={handleEditChange}
                className="border bg-white w-full p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image</label>
              {editExecutive.image && (
                <img
                  src={editExecutive.image}
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

export default ExecutiveList;
