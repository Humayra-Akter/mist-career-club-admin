import { useState } from "react";

export default function AddPartner() {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("details", details);
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:5000/partner", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Partner added successfully!");
        setName("");
        setImage(null);
        // reset file input
        e.target.reset();
      } else {
        alert("Failed to add partner. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl bg-slate-800 mx-auto p-6 rounded-lg shadow-xl border mt-10">
      <h1 className="text-3xl text-white font-bold text-center mb-6">
        Create New Event
      </h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <label className="block mb-2 font-medium">Partner Company Name:</label>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded-md mb-6"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="block text-sm font-medium mb-1">Partner logo:</label>
        <input
          type="file"
          accept="image/*"
          className="border bg-white w-full p-2 mb-6"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <label className="block mb-2 font-medium">Details:</label>
        <input
          type="text"
          placeholder="Details"
          className="w-full p-2 border rounded-md mb-6"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          required
        />

        <button
          type="submit"
          className="border text-white px-4 py-2 rounded hover:bg-blue-800 transition-all duration-200 flex items-center justify-center w-1/3 mx-auto"
        >
          Submit Partner
        </button>
      </form>
    </div>
  );
}
