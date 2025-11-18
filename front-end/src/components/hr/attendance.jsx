// import React, { useEffect, useState } from "react";
// import axios from "../../util/axiosInstance";
// import toast from "react-hot-toast";

// import { TbGraph } from "react-icons/tb";
// import { FaUserTimes, FaUserCheck, FaUserClock } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// // ✅ Utility to format date (yyyy-mm-dd)
// const formatDate = (date = new Date()) =>
//   [
//     date.getFullYear(),
//     String(date.getMonth() + 1).padStart(2, "0"),
//     String(date.getDate()).padStart(2, "0"),
//   ].join("-");

// // ✅ Stat Card Component
// const StatCard = ({ icon: Icon, color, label, value }) => (
//   <li
//     className={`p-6 ${color.bg} rounded-xl shadow flex flex-col items-center justify-center`}
//   >
//     <Icon className={`${color.icon} text-3xl mb-2`} />
//     <p className={`text-lg font-semibold ${color.text}`}>{value}</p>
//     <p className="text-sm text-gray-600">{label}</p>
//   </li>
// );

// function Attendance() {
//   const [records, setRecords] = useState({});
//   const [employees, setEmployees] = useState([]);
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();
  

//   // ✅ Fetch attendance summary & employees
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const today = formatDate();

//         const [summaryRes, employeesRes] = await Promise.all([
//           axios.get(`/api/attendance/summary/daily?date=${today}`),
//           axios.get("/api/attendance/getAttendance"),
//         ]);
//         console.log(employeesRes);

//         // filter employees for today
//         const employeesToday =
//           employeesRes.data?.data?.filter((record) => {
//             const recordDate = formatDate(new Date(record.date));
//             return recordDate === today;
//           }) || [];

//         setEmployees(employeesToday);
//         setFilteredEmployees(employeesToday);

//         setRecords(summaryRes.data.summary);
//       } catch (error) {
//         toast.error(error?.response?.data?.message || error.message);
//       }
//     };

//     loadData();
//   }, []);

//   // ✅ Filter employees by search
//   useEffect(() => {
//     let temp = [...employees];

//     if (search.trim()) {
//       const query = search.toLowerCase();
//       temp = temp.filter(
//         (emp) =>
//           emp.employeeId.firstName?.toLowerCase().includes(query) ||
//           emp.employeeId.lastName?.toLowerCase().includes(query) ||
//           emp.employeeId.email?.toLowerCase().includes(query)
//       );
//     }

//     setFilteredEmployees(temp);
//   }, [search, employees]);

//   // ✅ Save updated attendance
//   const handleSave = async (empId, status) => {
//     try {
//       const res = await axios.put(`/api/attendance/${empId}`, {
//         status: status.toLowerCase(),
//       });

//       if (res.data.success) {
//         toast.success("Attendance updated!");
//         setEmployees((prev) =>
//           prev.map((e) => (e._id === empId ? { ...e, status } : e))
//         );
//       }
//     } catch (error) {
//       toast.error(error?.response?.data?.message || error.message);
//     }
//   };

//   return (
//     <div className="p-6">
//        {/* Header */}
//         <div className="flex flex-col gap-1 mb-6">
//           <h1 className="text-3xl font-bold text-gray-800">
//             Attendence, <span className="text-blue-600">Management</span>
//           </h1>
//           <p className="text-gray-500">View and manage all employee attendence</p>
//         </div>

// {/* ✅ Attendance Stats Section */}
// <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
//   {[
//     {
//       title: "Present",
//       value: records.present ?? 0,
//       icon: <FaUserCheck size={28} />,
//       gradient: "from-emerald-500 to-emerald-600",
//     },
//     {
//       title: "Late",
//       value: records.late ?? 0,
//       icon: <FaUserClock size={28} />,
//       gradient: "from-amber-400 to-amber-500",
//     },
//     {
//       title: "Half-day",
//       value: records["half-day"] ?? 0,
//       icon: <FaUserTimes size={28} />,
//       gradient: "from-indigo-500 to-indigo-600",
//     },
//     {
//       title: "Absent",
//       value: records.absent ?? 0,
//       icon: <FaUserTimes size={28} />,
//       gradient: "from-rose-500 to-rose-600",
//     },
//   ].map((item, index) => (
//     <div
//       key={index}
//       className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-5 hover:shadow-xl transition group"
//     >
//       {/* Icon Circle */}
//       <div
//         className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient} text-white shadow-md group-hover:scale-110 transition`}
//       >
//         {item.icon}
//       </div>

//       {/* Text */}
//       <div>
//         <p className="text-gray-500 text-sm font-medium">{item.title}</p>
//         <p
//           className={`text-2xl font-extrabold bg-gradient-to-r ${item.gradient} text-transparent bg-clip-text`}
//         >
//           {item.value}
//         </p>
//       </div>
//     </div>
//   ))}
// </div>


// {/* ✅ Filters */}
// <div className="flex flex-col sm:flex-row gap-4 mb-6">
//   <input
//     type="text"
//     placeholder="🔍 Search by name or email..."
//     value={search}
//     onChange={(e) => setSearch(e.target.value)}
//     className="w-full w-full px-4 py-2 rounded-xl border border-gray-300 
//                shadow-md focus:ring-2 focus:ring-blue-500 
//                focus:border-blue-500 outline-none transition"
//   />
// </div>



// {/* ✅ Employees Table */}
// <div className="bg-white shadow-md rounded-2xl overflow-hidden">
//   <table className="min-w-full text-sm text-left">
//     {/* Table Head */}
//     <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
//       <tr>
//         <th className="px-6 py-3 font-medium">Name</th>
//         <th className="px-6 py-3 font-medium">Email</th>
//         <th className="px-6 py-3 font-medium">Department</th>
//         <th className="px-6 py-3 font-medium">Status</th>
//         <th className="px-6 py-3 font-medium text-center">Actions</th>
//       </tr>
//     </thead>

//     {/* Table Body */}
//     <tbody className="divide-y divide-gray-200">
//       {filteredEmployees.length > 0 ? (
//         filteredEmployees.map((emp) => (
//           <tr
//             key={emp._id}
//             className="hover:bg-gray-50 transition"
//           >
//             <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
//               {emp.employeeId.firstName} {emp.employeeId.lastName}
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap text-gray-600">
//               {emp.employeeId.email}
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap text-gray-600">
//               {emp.employeeId.department}
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap">
//               <select
//                 value={emp.status}
//                 onChange={(e) =>
//                   setEmployees((prev) =>
//                     prev.map((el) =>
//                       el._id === emp._id ? { ...el, status: e.target.value } : el
//                     )
//                   )
//                 }
//                 className="p-2 border rounded-lg bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="present">Present</option>
//                 <option value="absent">Absent</option>
//                 <option value="late">Late</option>
//                 <option value="leave">Leave</option>
//                 <option value="half-day">Half-Day</option>
//               </select>
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap flex justify-center gap-2">
//               <button
//                 onClick={() => handleSave(emp._id, emp.status)}
//                 className="px-3 py-1 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600"
//               >
//                 Save
//               </button>
//               <button
//                 onClick={() => navigate(`/hr/attendance/${emp.employeeId._id}`)}
//                 className="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600"
//               >
//                 View
//               </button>
//             </td>
//           </tr>
//         ))
//       ) : (
//         <tr>
//           <td
//             className="px-6 py-4 text-center text-gray-500"
//             colSpan="5"
//           >
//             No employees found
//           </td>
//         </tr>
//       )}
//     </tbody>
//   </table>
// </div>

//     </div>
//   );
// }

// export default Attendance;
// import React, { useEffect, useState } from "react";
// import axios from "../../util/axiosInstance";
// import toast from "react-hot-toast";
// import { FaUserTimes, FaUserCheck, FaUserClock } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// // format yyyy-mm-dd
// const formatDate = (date = new Date()) =>
//   [
//     date.getFullYear(),
//     String(date.getMonth() + 1).padStart(2, "0"),
//     String(date.getDate()).padStart(2, "0"),
//   ].join("-");

// // Normalize status strings to UI-friendly labels
// const normalizeStatus = (s) => {
//   if (!s && s !== 0) return "Absent";
//   const t = String(s).toLowerCase();
//   if (t.includes("present")) return "Present";
//   if (t.includes("late")) return "Late";
//   if (t.includes("half")) return "Half-day";
//   if (t.includes("leave")) return "Leave";
//   if (t.includes("abs")) return "Absent";
//   // fallback: capitalize
//   return t.charAt(0).toUpperCase() + t.slice(1);
// };

// // Map UI label back to API expected string (lowercase, half-day preserved)
// const mapStatusToApi = (label) => {
//   if (!label) return "absent";
//   const t = label.toLowerCase();
//   if (t === "half-day") return "half-day";
//   return t.replace(/\s+/g, "-");
// };

// function Attendance() {
//   const [summary, setSummary] = useState({});
//   const [employees, setEmployees] = useState([]); // normalized attendance records
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(
//     new Date().toISOString().split("T")[0]
//   ); // default today
//   const [savingId, setSavingId] = useState(null);
//   const navigate = useNavigate();

//   // Fetch summary for the given date
//   const fetchSummary = async (date) => {
//     try {
//       const res = await axios.get(`/api/attendance/summary/daily?date=${date}`);
//       if (res?.data?.success) {
//         setSummary(res.data.summary || {});
//       } else if (res?.data) {
//         // if API returns but not success, try reading summary directly
//         setSummary(res.data.summary || {});
//       } else {
//         setSummary({});
//       }
//     } catch (err) {
//       console.error("Error fetching summary:", err);
//       toast.error(
//         err?.response?.data?.message || "Error fetching attendance summary"
//       );
//       setSummary({});
//     }
//   };

//   // Robust employees fetch:
//   // 1) Try /api/attendance/daily?date=YYYY-MM-DD (preferred)
//   // 2) Fallback to /api/attendance/getAttendance and filter by date
//   // Normalize each record to have: _id, employeeId (object), status (UI label)
//   const fetchEmployees = async (date) => {
//     setLoading(true);
//     try {
//       let list = [];
//       // Try preferred endpoint
//       try {
//         const res = await axios.get(`/api/attendance/daily?date=${date}`);
//         const d = res?.data;
//         if (d) {
//           if (d.success && Array.isArray(d.employees)) list = d.employees;
//           else if (Array.isArray(d.data)) list = d.data;
//           else if (Array.isArray(d)) list = d;
//           else if (Array.isArray(d.attendance)) list = d.attendance;
//           else if (Array.isArray(d.employees)) list = d.employees;
//         }
//       } catch (err) {
//         // prefer not to throw - we'll fallback below
//         console.warn("daily endpoint failed, will fallback:", err?.message);
//         list = [];
//       }

//       // Fallback if no list or empty
//       if (!Array.isArray(list) || list.length === 0) {
//         try {
//           const fb = await axios.get("/api/attendance/getAttendance");
//           const d = fb?.data;
//           let fallback = [];
//           if (Array.isArray(d?.data)) fallback = d.data;
//           else if (Array.isArray(d?.attendance)) fallback = d.attendance;
//           else if (Array.isArray(d?.employees)) fallback = d.employees;
//           else if (Array.isArray(d)) fallback = d;

//           // Filter fallback records by date (handle various date field names)
//           fallback = fallback.filter((rec) => {
//             const rawDate =
//               rec?.date ||
//               rec?.attendanceDate ||
//               rec?.createdAt ||
//               rec?.recordedAt ||
//               rec?.timestamp;
//             if (!rawDate) return false;
//             try {
//               return formatDate(new Date(rawDate)) === date;
//             } catch {
//               return false;
//             }
//           });

//           list = fallback;
//         } catch (err2) {
//           console.error("fallback getAttendance failed:", err2);
//           // nothing more we can do - leave list empty
//           list = [];
//         }
//       }

//       // Normalize list into consistent shape
//       const normalized = (list || []).map((rec) => {
//         // Determine employeeId object (various shapes)
//         let employeeId =
//           rec.employeeId ||
//           rec.employee ||
//           (rec.user ? rec.user : null) ||
//           null;

//         // if no nested employee object but rec itself contains names, create one
//         if (!employeeId) {
//           const maybeFirst = rec.firstName || rec.fname || (rec.name ? rec.name.split(" ")[0] : "");
//           const maybeLast = rec.lastName || rec.lname || (rec.name ? rec.name.split(" ").slice(1).join(" ") : "");
//           employeeId = {
//             firstName: maybeFirst || "",
//             lastName: maybeLast || "",
//             email: rec.email || rec?.employeeEmail || "",
//             department: rec.department || rec?.dept || "",
//             _id: rec.employeeId?._id || rec.employee?._id || rec.id || null,
//           };
//         }

//         // status normalization
//         const status = normalizeStatus(rec.status || rec.attendanceStatus || employeeId.status);

//         // Build normalized record: keep original props but ensure keys we use exist
//         return {
//           ...rec,
//           _id: rec._id || rec.id || (employeeId && employeeId._id) || Math.random().toString(36).slice(2),
//           employeeId,
//           status,
//         };
//       });

//       setEmployees(normalized);
//       setFilteredEmployees(normalized);
//     } catch (err) {
//       console.error("Error fetching employees:", err);
//       toast.error(err?.response?.data?.message || err?.message || "Error fetching employees");
//       setEmployees([]);
//       setFilteredEmployees([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch summary & employees on mount and when selectedDate changes
//   useEffect(() => {
//     fetchSummary(selectedDate);
//     fetchEmployees(selectedDate);
//   }, [selectedDate]);

//   // Search filter for table
//   useEffect(() => {
//     let temp = [...employees];
//     if (search.trim()) {
//       const q = search.toLowerCase();
//       temp = temp.filter((emp) => {
//         const first = emp.employeeId?.firstName?.toLowerCase() || "";
//         const last = emp.employeeId?.lastName?.toLowerCase() || "";
//         const email = emp.employeeId?.email?.toLowerCase() || "";
//         return first.includes(q) || last.includes(q) || email.includes(q);
//       });
//     }
//     setFilteredEmployees(temp);
//   }, [search, employees]);

//   // Save updated status for an attendance record (_id should be attendance record id)
//   const handleSave = async (attendanceId, statusLabel) => {
//     try {
//       setSavingId(attendanceId);
//       const apiStatus = mapStatusToApi(statusLabel); // e.g., "Half-day" -> "half-day"
//       const res = await axios.put(`/api/attendance/${attendanceId}`, {
//         status: apiStatus,
//       });

//       if (res?.data?.success) {
//         toast.success("Attendance updated!");
//         // Update local state
//         setEmployees((prev) =>
//           prev.map((e) => (e._id === attendanceId ? { ...e, status: statusLabel } : e))
//         );
//         setFilteredEmployees((prev) =>
//           prev.map((e) => (e._id === attendanceId ? { ...e, status: statusLabel } : e))
//         );
//         // Update summary (optional: re-fetch summary for accuracy)
//         fetchSummary(selectedDate);
//       } else {
//         toast.error(res?.data?.message || "Update failed");
//       }
//     } catch (err) {
//       console.error("Save error:", err);
//       toast.error(err?.response?.data?.message || err?.message || "Error saving attendance");
//     } finally {
//       setSavingId(null);
//     }
//   };

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
//         <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Daily Attendance</h2>

//         {/* Date Picker */}
//         <input
//           type="date"
//           value={selectedDate}
//           onChange={(e) => setSelectedDate(e.target.value)}
//           className="border rounded-lg px-3 py-2 text-sm sm:text-base shadow-sm focus:ring focus:ring-blue-300"
//         />
//       </div>

//       {/* Loading */}
//       {loading && <p className="text-gray-500 mb-4">Loading...</p>}

//       {/* Summary cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
//         {[
//           { title: "Present", value: summary.present ?? 0, gradient: "from-emerald-500 to-emerald-600", icon: <FaUserCheck size={28} /> },
//           { title: "Late", value: summary.late ?? 0, gradient: "from-amber-400 to-amber-500", icon: <FaUserClock size={28} /> },
//           { title: "Half-day", value: summary["half-day"] ?? 0, gradient: "from-indigo-500 to-indigo-600", icon: <FaUserClock size={28} /> },
//           { title: "Absent", value: summary.absent ?? 0, gradient: "from-rose-500 to-rose-600", icon: <FaUserTimes size={28} /> },
//         ].map((card, idx) => (
//           <div key={idx} className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-5 hover:shadow-xl transition group">
//             <div className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} text-white shadow-md`}>{card.icon}</div>
//             <div>
//               <p className="text-gray-500 text-sm font-medium">{card.title}</p>
//               <p className={`text-2xl font-extrabold bg-gradient-to-r ${card.gradient} text-transparent bg-clip-text`}>{card.value}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col sm:flex-row gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="🔍 Search by name or email..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full px-4 py-2 rounded-xl border border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//         />
//       </div>

//       {/* Employees table */}
//       <div className="bg-white shadow-md rounded-2xl overflow-hidden">
//         <table className="min-w-full text-sm text-left">
//           <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
//             <tr>
//               <th className="px-6 py-3 font-medium">Name</th>
//               <th className="px-6 py-3 font-medium">Email</th>
//               <th className="px-6 py-3 font-medium">Department</th>
//               <th className="px-6 py-3 font-medium">Status</th>
//               <th className="px-6 py-3 font-medium text-center">Actions</th>
//             </tr>
//           </thead>

//           <tbody className="divide-y divide-gray-200">
//             {filteredEmployees.length > 0 ? (
//               filteredEmployees.map((emp) => {
//                 const first = emp.employeeId?.firstName || "";
//                 const last = emp.employeeId?.lastName || "";
//                 const email = emp.employeeId?.email || "";
//                 const department = emp.employeeId?.department || emp.department || "-";
//                 const displayName = `${first} ${last}`.trim() || emp.name || "Unknown";

//                 return (
//                   <tr key={emp._id} className="hover:bg-gray-50 transition">
//                     <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">{displayName}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-gray-600">{email}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-gray-600">{department}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <select
//                         value={emp.status}
//                         onChange={(e) =>
//                           setEmployees((prev) =>
//                             prev.map((el) =>
//                               el._id === emp._id ? { ...el, status: e.target.value } : el
//                             )
//                           )
//                         }
//                         className="p-2 border rounded-lg bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500"
//                       >
//                         <option value="Present">Present</option>
//                         <option value="Absent">Absent</option>
//                         <option value="Late">Late</option>
//                         <option value="Leave">Leave</option>
//                         <option value="Half-day">Half-Day</option>
//                       </select>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap flex justify-center gap-2">
//                       <button
//                         onClick={() => handleSave(emp._id, emp.status)}
//                         disabled={savingId === emp._id}
//                         className={`px-3 py-1 text-xs rounded-lg ${savingId === emp._id ? "bg-gray-300 text-gray-700" : "bg-green-500 text-white hover:bg-green-600"}`}
//                       >
//                         {savingId === emp._id ? "Saving..." : "Save"}
//                       </button>
//                       <button
//                         onClick={() => navigate(`/hr/attendance/${emp.employeeId?._id || emp._id}`)}
//                         className="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600"
//                       >
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })
//             ) : (
//               <tr>
//                 <td className="px-6 py-4 text-center text-gray-500" colSpan="5">
//                   No employees found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Attendance;
// src/pages/Attendance.jsx


/**
 * Attendance.jsx
 * - Daily attendance view with summary cards + employee table
 * - Fetches summary from /api/attendance/summary/daily?date=YYYY-MM-DD
 * - Fetches attendance records from /api/attendance/daily?date=YYYY-MM-DD (preferred)
 *   or falls back to /api/attendance/getAttendance and filters by date
 *
 * Notes:
 * - The backend is expected to return simple summary like:
 *   { success: true, summary: { present: 10, late: 2, "half-day": 1, absent: 3 } }
 * - Attendance records should contain employee info (employeeId, name, email, dept) and status.
 */

/* --- Helpers --- */

import React, { useEffect, useState } from "react";
import axios from "../../util/axiosInstance";
import toast from "react-hot-toast";
import { FaUserCheck, FaUserClock, FaUserTimes, FaUserMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


// format date to YYYY-MM-DD
const toYYYYMMDD = (d = new Date()) =>
  [d.getFullYear(), String(d.getMonth() + 1).padStart(2, "0"), String(d.getDate()).padStart(2, "0")].join("-");

// Normalize a variety of backend status values into UI labels
const normalizeStatus = (raw) => {
  if (!raw && raw !== 0) return "Absent";
  const s = String(raw).toLowerCase();
  if (s.includes("present")) return "Present";
  if (s.includes("late")) return "Late";
  if (s.includes("half")) return "Half-day";
  if (s.includes("abs")) return "Absent";
  // fallback - capitalize first
  return s.charAt(0).toUpperCase() + s.slice(1);
};

// Map UI label back to API expected format (adjust as your backend needs)
const mapStatusToApi = (label) => {
  if (!label) return "absent";
  const t = String(label).toLowerCase();
  // common conversions; adjust case/strings per your API
  if (t === "half-day") return "half-day";
  if (t === "present") return "present";
  if (t === "late") return "late";
  return "absent";
};

// Recalculate summary counts from a list of attendance records (local instant update)
const recalcSummary = (list = []) => {
  const counts = { present: 0, late: 0, "half-day": 0, absent: 0, leave: 0 };
  list.forEach((r) => {
    const s = (r.status || "").toLowerCase();
    if (s.includes("present")) counts.present++;
    else if (s.includes("late")) counts.late++;
    else if (s.includes("half")) counts["half-day"]++;
    else counts.absent++;
  });
  return counts;
};

/* --- Component --- */
export default function Attendance() {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(toYYYYMMDD()); // default today
  const [summary, setSummary] = useState({ present: 0, late: 0, "half-day": 0, absent: 0 });
  const [employees, setEmployees] = useState([]); // normalized attendance records for the date
  const [filteredEmployees, setFilteredEmployees] = useState([]); // for search
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState(null);

  // Fetch summary (simple)
  const fetchSummary = async (date) => {
    try {
      const res = await axios.get(`/api/attendance/summary/daily?date=${date}`);
      if (res?.data?.success) {
        setSummary((prev) => ({ ...prev, ...res.data.summary }));
      } else if (res?.data?.summary) {
        // some APIs return summary even without 'success' flag
        setSummary((prev) => ({ ...prev, ...res.data.summary }));
      } else {
        // keep existing or reset to zeros
        setSummary({ present: 0, late: 0, "half-day": 0, absent: 0});
      }
    } catch (err) {
      console.error("fetchSummary error:", err);
      toast.error(err?.response?.data?.message || "Unable to fetch summary");
      setSummary({ present: 0, late: 0, "half-day": 0, absent: 0});
    }
  };

  // Fetch employees robustly:
  // 1) try /api/attendance/daily?date=...
  // 2) fallback to /api/attendance/getAttendance and filter by date field(s)
  const fetchEmployees = async (date) => {
    setLoading(true);
    try {
      let list = [];

      // Preferred endpoint
      try {
        const res = await axios.get(`/api/attendance/daily?date=${date}`);
        const d = res?.data;
        if (d) {
          // try common shapes
          if (Array.isArray(d.employees)) list = d.employees;
          else if (Array.isArray(d.data)) list = d.data;
          else if (Array.isArray(d)) list = d;
          else if (Array.isArray(d.attendance)) list = d.attendance;
        }
      } catch (err) {
        // ignore - fallback will run
        console.warn("Preferred daily endpoint failed:", err?.message || err);
      }

      // Fallback if empty
      if (!Array.isArray(list) || list.length === 0) {
        try {
          const fb = await axios.get("/api/attendance/getAttendance");
          const d = fb?.data;
          let fallback = [];
          if (Array.isArray(d?.data)) fallback = d.data;
          else if (Array.isArray(d?.attendance)) fallback = d.attendance;
          else if (Array.isArray(d?.employees)) fallback = d.employees;
          else if (Array.isArray(d)) fallback = d;

          // filter fallback by date (try multiple date fields)
          fallback = fallback.filter((rec) => {
            const raw = rec?.date || rec?.attendanceDate || rec?.createdAt || rec?.recordedAt || rec?.timestamp;
            if (!raw) return false;
            try {
              const dt = new Date(raw);
              return toYYYYMMDD(dt) === date;
            } catch {
              return false;
            }
          });

          list = fallback;
        } catch (err2) {
          console.error("Fallback getAttendance failed:", err2);
          list = [];
        }
      }

      // Normalize each record into shape we use:
      // { _id, name, department, employeeId: {...}, status }
      const normalized = (list || []).map((rec) => {
        // employee info may be nested in different fields
        let empObj = rec.employeeId || rec.employee || rec.user || null;

        if (!empObj) {
          // try to compose from record
          const first = rec.firstName || rec.fname || (rec.name ? rec.name.split(" ")[0] : "");
          const last = rec.lastName || rec.lname || (rec.name ? rec.name.split(" ").slice(1).join(" ") : "");
          empObj = {
            firstName: first || "",
            lastName: last || "",
            email: rec.email || rec.employeeEmail || "",
            department: rec.department || rec.dept || "",
            _id: rec.employeeId?._id || rec.employee?._id || rec.id || null,
          };
        }

        const name = `${empObj.firstName || ""} ${empObj.lastName || ""}`.trim() || rec.name || empObj.name || "Unknown";
        const department = empObj.department || rec.department || rec.dept || "-";

        const status = normalizeStatus(rec.status || rec.attendanceStatus || rec.statusLabel || empObj.status || rec.state);

        return {
          ...rec,
          _id: rec._id || rec.id || empObj._id || Math.random().toString(36).slice(2),
          employeeId: empObj,
          name,
          department,
          status,
        };
      });

      setEmployees(normalized);
      setFilteredEmployees(normalized);
      // Update summary immediately using the normalized list (instant feedback)
      setSummary(recalcSummary(normalized));
    } catch (err) {
      console.error("fetchEmployees error:", err);
      toast.error(err?.response?.data?.message || "Unable to fetch attendance records");
      setEmployees([]);
      setFilteredEmployees([]);
      setSummary({ present: 0, late: 0, "half-day": 0, absent: 0});
    } finally {
      setLoading(false);
    }
  };

  // Fetch summary & employees when selectedDate changes
  useEffect(() => {
    fetchSummary(selectedDate);
    fetchEmployees(selectedDate);
    // eslint-disable-next-line
  }, [selectedDate]);

  // Keep filteredEmployees in sync with search and employees
  useEffect(() => {
    if (!search.trim()) {
      setFilteredEmployees(employees);
      return;
    }
    const q = search.toLowerCase();
    setFilteredEmployees(
      employees.filter((e) => {
        const name = (e.name || "").toLowerCase();
        const email = (e.employeeId?.email || "").toLowerCase();
        const dept = (e.department || "").toLowerCase();
        return name.includes(q) || email.includes(q) || dept.includes(q);
      })
    );
  }, [search, employees]);

  // Save status to backend and update local employees + summary instantly
  const handleSave = async (attendanceId, statusLabel) => {
    if (!attendanceId) return toast.error("Invalid record");
    try {
      setSavingId(attendanceId);
      const apiStatus = mapStatusToApi(statusLabel);

      const res = await axios.put(`/api/attendance/${attendanceId}`, {
        status: apiStatus,
      });

      if (res?.data?.success) {
        toast.success("Attendance updated");
        // update local arrays
        const updated = employees.map((r) => (r._id === attendanceId ? { ...r, status: statusLabel } : r));
        setEmployees(updated);
        setFilteredEmployees(updated);
        // recalc summary locally for instant UI update
        setSummary(recalcSummary(updated));
      } else {
        toast.error(res?.data?.message || "Update failed");
      }
    } catch (err) {
      console.error("handleSave error:", err);
      toast.error(err?.response?.data?.message || "Error saving attendance");
    } finally {
      setSavingId(null);
    }
  };

  /* --- Render --- */
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Daily Attendance</h2>
          <p className="text-sm text-gray-500">Select date to view/update attendance</p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm shadow-sm focus:ring focus:ring-blue-300"
          />
        </div>
      </div>

      {/* Loading */}
      {loading && <p className="text-gray-500 mb-4">Loading attendance...</p>}

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {[
          { title: "Present", value: summary.present ?? 0, gradient: "from-emerald-500 to-emerald-600", icon: <FaUserCheck size={26} /> },
          { title: "Late", value: summary.late ?? 0, gradient: "from-amber-400 to-amber-500", icon: <FaUserClock size={26} /> },
          { title: "Half-day", value: summary["half-day"] ?? 0, gradient: "from-indigo-500 to-indigo-600", icon: <FaUserClock size={26} /> },
          { title: "Absent", value: summary.absent ?? 0, gradient: "from-rose-500 to-rose-600", icon: <FaUserTimes size={26} /> },
          // { title: "Leave", value: summary.leave ?? 0, gradient: "from-gray-400 to-gray-600", icon: <FaUserMinus size={26} /> },
        ].map((c, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 shadow flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-gradient-to-br ${c.gradient} text-white`}>{c.icon}</div>
            <div>
              <div className="text-sm text-gray-500">{c.title}</div>
              <div className="text-2xl font-extrabold">{c.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search bar */}
      <div className="flex items-center gap-3 mb-4">
        <input
          placeholder="Search by name / email / department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 shadow-sm focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Employees table */}
      <div className="bg-white rounded-2xl shadow overflow-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Department</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="text-gray-700 divide-y">
            {filteredEmployees.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan="6">
                  No records found for {selectedDate}
                </td>
              </tr>
            ) : (
              filteredEmployees.map((r, idx) => (
                <tr key={r._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3 font-medium">{r.name}</td>
                  <td className="px-4 py-3">{r.employeeId?.email || "-"}</td>
                  <td className="px-4 py-3">{r.department || "-"}</td>
                  <td className="px-4 py-3">
                    <select
                      value={r.status}
                      onChange={(e) => {
                        // update employees and filteredEmployees locally (optimistic)
                        setEmployees((prev) => prev.map((el) => (el._id === r._id ? { ...el, status: e.target.value } : el)));
                        setFilteredEmployees((prev) => prev.map((el) => (el._id === r._id ? { ...el, status: e.target.value } : el)));
                        // We DO NOT call backend here — Save button does that
                        // Also update summary instantly
                        setSummary((prev) => recalcSummary(filteredEmployees.map((el) => (el._id === r._id ? { ...el, status: e.target.value } : el))));
                      }}
                      className="border rounded px-2 py-1"
                    >
                      <option>Present</option>
                      <option>Late</option>
                      <option>Half-day</option>
                      <option>Absent</option>
                     
                    </select>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleSave(r._id, r.status)}
                      disabled={savingId === r._id}
                      className={`px-3 py-1 rounded text-white ${savingId === r._id ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                    >
                      {savingId === r._id ? "Saving..." : "Save"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


