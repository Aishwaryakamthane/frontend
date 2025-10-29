import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { useDispatch } from "react-redux";
import { pushNotification } from "../features/notification/notificationSlice";

export default function DocumentUpload() {
  const [file, setFile] = useState(null);
  const [uploads, setUploads] = useState([]);
  const dispatch = useDispatch();

  // Fetch existing uploaded documents from backend
  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await api.get("/documents");
        setUploads(res.data || []);
      } catch (err) {
        console.error("Error fetching documents:", err);
      }
    };
    fetchDocs();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Replace with your actual API endpoint
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploadedFile = {
        id: res.data?.id || Date.now(),
        name: file.name,
        status: "Uploaded Successfully",
      };
      setUploads((prev) => [uploadedFile, ...prev]);
      setFile(null);

      // ✅ Toast notification
      dispatch(
        pushNotification({
          title: "Upload Complete",
          message: `${file.name} uploaded successfully.`,
        })
      );
    } catch (err) {
      console.error(err);
      setUploads((prev) => [
        { id: Date.now(), name: file.name, status: "Failed" },
        ...prev,
      ]);
      dispatch(
        pushNotification({
          title: "Upload Failed",
          message: `${file.name} could not be uploaded.`,
        })
      );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">📄 Document Upload</h2>

      <form onSubmit={handleUpload} className="flex flex-col md:flex-row gap-4 items-center">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full md:w-auto border rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-900"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
        >
          Upload
        </button>
      </form>

      {/* Uploaded file list */}
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
              <th className="py-2 px-3 text-left">File Name</th>
              <th className="py-2 px-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {uploads.map((u) => (
              <tr
                key={u.id}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <td className="py-2 px-3">{u.name}</td>
                <td
                  className={`py-2 px-3 font-semibold ${
                    u.status === "Uploaded Successfully"
                      ? "text-green-600"
                      : u.status === "Processing"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {u.status}
                </td>
              </tr>
            ))}
            {!uploads.length && (
              <tr>
                <td colSpan={2} className="text-center py-3 text-gray-500">
                  No documents uploaded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
