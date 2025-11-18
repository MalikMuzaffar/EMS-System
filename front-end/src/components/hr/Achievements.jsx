
// import React, { useEffect, useState } from "react";
// import axios from "../../util/axiosInstance";
// import toast from "react-hot-toast";
// import { Plus, Edit, Trash } from "lucide-react";
// import Sidebar from "../sideBar";

// export default function Achievements() {
//   const [achievements, setAchievements] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [editing, setEditing] = useState(null);
//   const [formData, setFormData] = useState({ title: "", body: "", user: "" });

//   // Fetch achievements + employees together
//   const fetchAll = async () => {
//     try {
//       setLoading(true);
//       const [achRes, empRes] = await Promise.all([
//         axios.get("/api/achievements"),
//         axios.get("/api/employee/"),
//       ]);
//       setAchievements(achRes.data.data || []);
//       setEmployees(empRes.data.employees || []);
//     } catch (error) {
//       toast.error(error?.response?.data?.message || error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAll();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Create or Update achievement
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // ensure a user is selected
//     if (!formData.user) {
//       toast.error("Please select an employee to assign this achievement.");
//       return;
//     }

//     try {
//       if (editing) {
//         const res = await axios.put(`/api/achievements/${editing._id}`, formData);
//         toast.success(res.data.message || "Achievement updated");
//       } else {
//         const res = await axios.post("/api/achievements", formData);
//         toast.success(res.data.message || "Achievement created");
//       }

//       setFormData({ title: "", body: "", user: "" });
//       setEditing(null);
//       setShowForm(false);
//       await fetchAll();
//     } catch (error) {
//       toast.error(error?.response?.data?.message || error.message);
//     }
//   };

//   // Delete achievement (optimistic UI update)
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this achievement?")) return;
//     try {
//       const res = await axios.delete(`/api/achievements/${id}`);
//       toast.success(res.data.message || "Achievement deleted");
//       setAchievements((prev) => prev.filter((a) => a._id !== id));
//     } catch (error) {
//       toast.error(error?.response?.data?.message || error.message);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-gray-600 animate-pulse">Loading achievements & employees...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="w-64 bg-white shadow-lg">
//         <Sidebar />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-800">Achievements</h1>
//           <button
//             onClick={() => {
//               setShowForm(true);
//               setEditing(null);
//               setFormData({ title: "", body: "", user: "" });
//             }}
//             className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//             disabled={employees.length === 0}
//             title={employees.length === 0 ? "No employees to assign" : "Create Achievement"}
//           >
//             <Plus size={18} /> Create Achievement
//           </button>
//         </div>

//         {/* Form */}
//         {showForm && (
//           <form
//             onSubmit={handleSubmit}
//             className="bg-white p-6 shadow-md rounded-lg mb-6 space-y-4"
//           >
//             <input
//               type="text"
//               name="title"
//               placeholder="Achievement Title"
//               value={formData.title}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded-lg"
//               required
//             />

//             <textarea
//               name="body"
//               placeholder="Achievement Description"
//               value={formData.body}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded-lg"
//               rows="4"
//               required
//             />

//             <div>
//               <label className="text-sm text-gray-600">Assign To</label>
//               <select
//                 name="user"
//                 value={formData.user}
//                 onChange={handleChange}
//                 className="w-full border px-3 py-2 rounded-lg mt-1"
//                 required
//               >
//                 <option value="">-- Select an employee --</option>
//                 {employees.map((emp) => (
//                   <option key={emp._id} value={emp._id}>
//                     {emp.firstName || ""} {emp.lastName || ""} {emp.email ? `(${emp.email})` : ""}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="flex gap-4">
//               <button
//                 type="submit"
//                 className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//               >
//                 {editing ? "Update" : "Create"}
//               </button>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowForm(false);
//                   setEditing(null);
//                 }}
//                 className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         )}

//         {/* Achievements List */}
//         {achievements.length === 0 ? (
//           <p className="text-gray-500 text-center py-6">No achievements found.</p>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {achievements.map((ach) => (
//               <div
//                 key={ach._id}
//                 className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition"
//               >
//                 <h2 className="text-xl font-bold text-gray-800">{ach.title}</h2>
//                 <p className="text-gray-600 mt-2">{ach.body}</p>
//                 <p className="text-sm text-gray-400 mt-2">
//                   By: {ach.user?.firstName || "—"} {ach.user?.lastName || ""}
//                 </p>

//                 <div className="flex gap-3 mt-4">
//                   <button
//                     onClick={() => {
//                       setEditing(ach);
//                       setFormData({
//                         title: ach.title || "",
//                         body: ach.body || "",
//                         user: ach.user?._id || "",
//                       });
//                       setShowForm(true);
//                     }}
//                     className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
//                   >
//                     <Edit size={16} /> Update
//                   </button>

//                   <button
//                     onClick={() => handleDelete(ach._id)}
//                     className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
//                   >
//                     <Trash size={16} /> Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "../../util/axiosInstance";
import toast from "react-hot-toast";
import { Plus, Edit, Trash, Award } from "lucide-react";
import Sidebar from "../sideBar";

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ title: "", body: "", user: "" });

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [achRes, empRes] = await Promise.all([
        axios.get("/api/achievements"),
        axios.get("/api/employee/"),
      ]);
      setAchievements(achRes.data.data || []);
      setEmployees(empRes.data.employees || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.user) {
      toast.error("Please select an employee to assign this achievement.");
      return;
    }
    try {
      if (editing) {
        const res = await axios.put(`/api/achievements/${editing._id}`, formData);
        toast.success(res.data.message || "Achievement updated");
      } else {
        const res = await axios.post("/api/achievements", formData);
        toast.success(res.data.message || "Achievement created");
      }
      setFormData({ title: "", body: "", user: "" });
      setEditing(null);
      setShowForm(false);
      await fetchAll();
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/achievements/${id}`);
      toast.success(res.data.message || "Achievement deleted");
      setAchievements((prev) => prev.filter((a) => a._id !== id));
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg animate-pulse">
          Loading achievements & employees...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white shadow-md">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 mt-12 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Award className="text-indigo-600" size={28} /> Achievements
          </h1>
          <button
            onClick={() => {
              setShowForm(true);
              setEditing(null);
              setFormData({ title: "", body: "", user: "" });
            }}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow-md"
            disabled={employees.length === 0}
            title={employees.length === 0 ? "No employees to assign" : "Create Achievement"}
          >
            <Plus size={18} /> New Achievement
          </button>
        </div>

        {/* Modal Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
            <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl p-6 relative">
              {/* Close Button */}
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditing(null);
                }}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              >
                ✖
              </button>

              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {editing ? "Update Achievement" : "Create Achievement"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  placeholder="🏆 Achievement Title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />

                <textarea
                  name="body"
                  placeholder="✨ Describe the achievement..."
                  value={formData.body}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  rows="3"
                  required
                />

                <div>
                  <label className="text-sm font-medium text-gray-700">Assign To</label>
                  <select
                    name="user"
                    value={formData.user}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-lg mt-1 focus:ring-2 focus:ring-indigo-500 outline-none"
                    required
                  >
                    <option value="">-- Select an employee --</option>
                    {employees.map((emp) => (
                      <option key={emp._id} value={emp._id}>
                        {emp.firstName} {emp.lastName} ({emp.email})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 shadow"
                  >
                    {editing ? "Update" : "Create"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditing(null);
                    }}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Achievements List */}
        {achievements.length === 0 ? (
          <p className="text-gray-500 text-center py-8 text-lg">No achievements found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((ach) => (
              <div
                key={ach._id}
                className="bg-white shadow rounded-xl p-5 hover:shadow-lg transition"
              >
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Award className="text-yellow-500" size={18} /> {ach.title}
                </h2>
                <p className="text-gray-600 mt-2">{ach.body}</p>
                <p className="text-sm text-gray-400 mt-2">
                  👤 {ach.user?.firstName} {ach.user?.lastName}
                </p>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => {
                      setEditing(ach);
                      setFormData({
                        title: ach.title || "",
                        body: ach.body || "",
                        user: ach.user?._id || "",
                      });
                      setShowForm(true);
                    }}
                    className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1.5 rounded-lg hover:bg-yellow-600"
                  >
                    <Edit size={14} /> Edit
                  </button>

                  <button
                    onClick={() => handleDelete(ach._id)}
                    className="flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600"
                  >
                    <Trash size={14} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
