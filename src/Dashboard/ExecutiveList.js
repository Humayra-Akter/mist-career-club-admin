import React from "react";

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

  return <div></div>;
};

export default ExecutiveList;
