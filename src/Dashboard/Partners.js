import React, { useEffect, useState } from "react";

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPartner, setEditingPartner] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    image: "",
    details: "",
    file: null,
  });

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const response = await fetch("http://localhost:5000/partner");
      if (!response.ok) {
        throw new Error("Failed to fetch partners");
      }
      const data = await response.json();
      setPartners(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this partner?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/partner/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPartners(partners.filter((p) => p._id !== id));
      } else {
        throw new Error("Delete failed");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (partner) => {
    setEditingPartner(partner._id);
    setEditData({
      name: partner.name,
      image: partner.image,
      details: partner.details,
    });
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editData.name);
      formData.append("details", editData.details);

      if (editData.file) {
        formData.append("image", editData.file);
      }

      const res = await fetch(
        `http://localhost:5000/partner/${editingPartner}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (res.ok) {
        fetchPartners();
        setEditingPartner(null);
      } else {
        throw new Error("Update failed");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-3xl text-white text-center mt-7 mb-10 font-bold">
        Partners List
      </h1>

      {loading && <p className="text-center text-white">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {partners?.map((partner) => (
          <div
            key={partner?._id}
            className="bg-slate-800 p-4 rounded-lg shadow-md shadow-slate-50 border flex flex-col items-center justify-center"
          >
            {editingPartner === partner._id ? (
              <>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                  className="mb-2 px-2 py-1 rounded"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setEditData({ ...editData, file: e.target.files[0] })
                  }
                  className="mb-2 px-2 py-1 rounded"
                />

                <textarea
                  value={editData.details}
                  onChange={(e) =>
                    setEditData({ ...editData, details: e.target.value })
                  }
                  className="mb-2 px-2 py-1 rounded"
                />
                <div className="flex gap-3 mt-3">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                    onClick={handleUpdate}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-500 text-white px-3 py-1 rounded"
                    onClick={() => setEditingPartner(null)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl capitalize text-center my-3 text-white font-bold">
                  {partner?.name}
                </h2>

                <img
                  src={partner?.image}
                  alt="Partner Logo"
                  className="object-cover border-2 rounded-md mx-auto my-4"
                />

                <p className="font-bold text-lg my-3 text-center text-white">
                  {partner?.details}
                </p>

                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => handleEdit(partner)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(partner._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
