import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const EventCreate = () => {
  const [events, setEvents] = useState([]);
  const [images, setImages] = useState([]); // Updated for multiple images
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  // Fetch events from the backend
  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:5000/event");
      if (!response.ok) throw new Error("Failed to fetch events.");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      toast.error(error.message || "An error occurred while fetching events.");
    }
  };

  // Handle event creation
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", date);
    formData.append("description", description);

    // Append multiple images to FormData
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]); // Field name should match backend
    }

    try {
      const response = await fetch("http://localhost:5000/event", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Event created successfully!");
        setTitle("");
        setDate("");
        setDescription("");
        setImages([]);
        fetchEvents(); // Refresh events
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create event.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6  rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">Event Management</h1>

      {/* Event creation form */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border bg-white rounded w-full p-2"
              placeholder="Enter event title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded bg-white w-full p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Images</label>
            <input
              type="file"
              accept="image/*"
              multiple // Allow multiple files
              onChange={(e) => setImages(e.target.files)} // Handle multiple files
              className="border rounded bg-white w-full p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded bg-white w-full p-2"
              placeholder="Enter event description"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventCreate;
