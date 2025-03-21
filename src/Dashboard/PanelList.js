import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import PanelModal from "./PanelModal";

const PanelList = () => {
  const [panelData, setPanelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPanelData = async () => {
      try {
        const response = await fetch("http://localhost:5000/panel");
        const data = await response.json();
        setPanelData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching panel data:", error);
        setLoading(false);
      }
    };

    fetchPanelData();
  }, []);

  const groupedData = panelData.reduce((acc, item) => {
    const key = `${item.year} - ${item.term}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});

  const handleEditClick = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-10">
      {Object.keys(groupedData).map((group) => (
        <div
          key={group}
          className="rounded-3xl shadow-xl overflow-hidden border"
        >
          <div className="bg-gradient-to-r from-slate-800 to-blue-800 p-6">
            <h2 className="text-2xl text-center font-bold text-white">
              {group} Term Panel
            </h2>
          </div>
          <div className="p-6 space-y-4 grid lg:grid-cols-3 gap-4">
            {groupedData[group].map((member) => (
              <div
                key={member._id}
                className="flex items-center rounded-xl border text-white border-slate-600 shadow-md p-4 relative group hover:shadow-lg transition"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-20 w-20 object-cover rounded-full border-2 border-white"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold capitalize">
                    {member.name}
                  </h3>
                  <p className="text-sm text-white">{member.segment}</p>
                  <p className="text-xs text-gray-300">{member.department}</p>
                </div>

                <button
                  onClick={() => handleEditClick(member)}
                  className="absolute top-3 right-3 text-gray-3600 hover:text-blue-600"
                >
                  <Pencil size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {isModalOpen && (
        <PanelModal
          member={selectedMember}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PanelList;
