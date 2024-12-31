import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "./Modal";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  // Fetch events from the backend
  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:5000/event");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to fetch events.");
    }
  };

  // Delete an event
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const response = await fetch(`http://localhost:5000/event/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Event deleted successfully.");
        fetchEvents(); // Refresh the event list
      } else {
        throw new Error("Failed to delete event.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle form submission for editing
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", editEvent.title);
    formData.append("date", editEvent.date);
    formData.append("description", editEvent.description);
    if (editEvent.images) {
      for (let i = 0; i < editEvent.images.length; i++) {
        formData.append("images", editEvent.images[i]);
      }
    }

    try {
      const response = await fetch(
        `http://localhost:5000/event/${editEvent._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Event updated successfully.");
        setEditEvent(null); // Close the modal
        setModalOpen(false);
        fetchEvents(); // Refresh the event list
      } else {
        throw new Error("Failed to update event.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle input changes for editing
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditEvent({ ...editEvent, [name]: value });
  };

  // Handle image change for editing
  const handleImageChange = (e) => {
    setEditEvent({ ...editEvent, images: e.target.files });
  };

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Event List</h1>
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Images</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td className="border px-4 py-2">{event.title}</td>
              <td className="border px-4 py-2">{event.date}</td>
              <td className="border px-4 py-2">{event.description}</td>
              <td className="border px-4 py-2">
                {event.images &&
                  event.images.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Event ${index + 1}`}
                      className="w-16 h-16 object-cover"
                    />
                  ))}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => {
                    setEditEvent(event);
                    setModalOpen(true);
                  }}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
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
        {editEvent && (
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={editEvent.title}
                onChange={handleEditChange}
                className="border bg-white w-full p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={editEvent.date}
                onChange={handleEditChange}
                className="border bg-white w-full p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={editEvent.description}
                onChange={handleEditChange}
                className="border bg-white w-full p-2 rounded"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="border bg-white w-full p-2"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default EventList;
