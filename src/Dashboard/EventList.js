import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "./Modal";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", editEvent.title);
    formData.append("date", editEvent.date);
    formData.append("description", editEvent.description);

    // Check if a new main image is uploaded
    if (editEvent.mainImage) {
      formData.append("mainImage", editEvent.mainImage);
    } else {
      formData.append("existingMainImage", editEvent.existingMainImage);
    }

    // Include updated existing images
    formData.append(
      "existingImages",
      JSON.stringify(editEvent.existingImages || [])
    );

    // Add new images
    if (editEvent.newImages) {
      for (let i = 0; i < editEvent.newImages.length; i++) {
        formData.append("images", editEvent.newImages[i]);
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
        setEditEvent(null);
        setModalOpen(false);
        fetchEvents(); // Refresh the event list
      } else {
        throw new Error("Failed to update event.");
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
    setEditEvent({ ...editEvent, [name]: value });
  };

  const handleMainImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setEditEvent({
        ...editEvent,
        mainImage: e.target.files[0], // New main image
        existingMainImage: null, // Remove old main image
      });
    }
  };

  // Handle new image addition
  const handleImageChange = (e) => {
    setEditEvent({
      ...editEvent,
      newImages: [...(editEvent.newImages || []), ...e.target.files],
    });
  };

  // Handle deletion of an existing image
  const handleExistingImageDelete = (imageIndex) => {
    const updatedImages = editEvent.existingImages.filter(
      (_, index) => index !== imageIndex
    );
    setEditEvent({ ...editEvent, existingImages: updatedImages });
  };

  // Handle deletion of a newly added image
  const handleNewImageDelete = (imageIndex) => {
    const updatedImages = editEvent.newImages.filter(
      (_, index) => index !== imageIndex
    );
    setEditEvent({ ...editEvent, newImages: updatedImages });
  };

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <div>
      <h1 className="text-3xl text-center mb-7 font-bold">Event List</h1>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
        {events?.map((event) => (
          <div
            key={event?._id}
            className="bg-white p-4 rounded-lg shadow-lg shadow-slate-200 border-2  flex items-center justify-center"
          >
            <div>
              <h2 className="text-2xl capitalize text-center my-3 text-blue-800 font-bold">
                {event?.title}
              </h2>

              <img
                src={event?.mainImage}
                alt="Main Event"
                className="w-24 h-24 object-cover border-2 rounded-md mx-auto my-4"
              />
              <div>
                <div className="flex gap-2 flex-wrap">
                  {event?.images &&
                    event?.images.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`Event ${index + 1}`}
                        className="w-16 h-16 object-cover border-2 rounded-md"
                      />
                    ))}
                </div>
              </div>
              <p className="font-bold text-lg my-3 text-center my-3">
                {event?.date}
              </p>
              <p className="text-justify">{event?.description}</p>
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => {
                    setEditEvent({
                      ...event,
                      existingImages: event.images || [],
                    });
                    setModalOpen(true);
                  }}
                  className="bg-yellow-700 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="bg-red-700 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Modal for Editing */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        {editEvent && (
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
              <label className="block text-sm font-medium mb-1">
                Main Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleMainImageChange}
                className="border bg-white w-full p-2 mt-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Images</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {editEvent.existingImages?.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`Existing Image ${index + 1}`}
                      className="w-16 h-16 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleExistingImageDelete(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {editEvent.newImages?.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`New Image ${index + 1}`}
                      className="w-16 h-16 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleNewImageDelete(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="border bg-white w-full p-2 mt-2"
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
export default EventList;
