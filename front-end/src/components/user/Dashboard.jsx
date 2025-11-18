
// import React, { useContext, useEffect, useState } from "react";
// import { BarChart, ClipboardList, Clock, FileText } from "lucide-react";
// import axios from "../../util/axiosInstance";
// import { UserInfoContext } from "../../context/contextApi";

// const Dashboard = () => {
//   const { user } = useContext(UserInfoContext);
//   const [stats, setStats] = useState({
//     attendanceRate: 0,
//     leaves: 0,
//     tasksPending: 0,
//     docs: 0,
//   });
//   const [recentActivity, setRecentActivity] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//   const fetchDashboard = async () => {
//     try {
//       setLoading(true);

//       // ✅ Fetch total leaves for employee
//       const leaveRes = await axios.get(`/api/leaves/${user.id}`);
//       const totalLeaves = leaveRes?.data?.totalLeaves || 0;

//       // ✅ Fetch attendance percentage
//       const attendanceRes = await axios.get(`/api/attendance/${user.id}`);
//       const attendanceRate = attendanceRes?.data?.percentage
//         ? parseFloat(attendanceRes.data.percentage)
//         : 0;

//       setStats((prev) => ({
//         ...prev,
//         leaves: totalLeaves,
//         attendanceRate, // 👈 now attendance will show
//       }));

//     } catch (err) {
//       console.warn("Dashboard fetch failed", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (user?.id) fetchDashboard();
// }, [user]);


//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-800">Overview</h1>
//         <p className="text-sm text-gray-500">
//           Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}!
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="bg-white p-4 rounded-2xl shadow hover:shadow-md transition flex items-center gap-4">
//           <div className="p-3 rounded-lg bg-indigo-50">
//             <BarChart className="w-6 h-6 text-indigo-600" />
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Attendance Rate</p>
//             <p className="text-xl font-semibold text-indigo-600">
//               {stats.attendanceRate?.toFixed(1)}%
//             </p>
//           </div>
//         </div>

//         <div className="bg-white p-4 rounded-2xl shadow hover:shadow-md transition flex items-center gap-4">
//           <div className="p-3 rounded-lg bg-green-50">
//             <FileText className="w-6 h-6 text-green-600" />
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Leaves</p>
//             <p className="text-xl font-semibold">{stats.leaves}</p>
//           </div>
//         </div>

//         <div className="bg-white p-4 rounded-2xl shadow hover:shadow-md transition flex items-center gap-4">
//           <div className="p-3 rounded-lg bg-yellow-50">
//             <Clock className="w-6 h-6 text-yellow-600" />
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Pending Tasks</p>
//             <p className="text-xl font-semibold">{stats.tasksPending}</p>
//           </div>
//         </div>

//         <div className="bg-white p-4 rounded-2xl shadow hover:shadow-md transition flex items-center gap-4">
//           <div className="p-3 rounded-lg bg-blue-50">
//             <ClipboardList className="w-6 h-6 text-blue-600" />
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Documents</p>
//             <p className="text-xl font-semibold">{stats.docs}</p>
//           </div>
//         </div>
//       </div>

//       {/* Main grid: Chart + Recent */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="bg-white rounded-2xl shadow p-6 lg:col-span-2">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-gray-700">
//               Monthly Attendance
//             </h3>
//             <div className="text-sm text-gray-500">Summary</div>
//           </div>
//           <div className="h-56 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-200 text-gray-400">
//             <p>Chart placeholder — plug your chart library here</p>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow p-6">
//           <h3 className="text-lg font-semibold text-gray-700 mb-3">
//             Recent Activity
//           </h3>
//           {loading ? (
//             <p className="text-gray-500">Loading...</p>
//           ) : recentActivity.length === 0 ? (
//             <p className="text-gray-500 text-sm">No recent activity</p>
//           ) : (
//             <ul className="space-y-3 text-sm">
//               {recentActivity.map((act, i) => (
//                 <li key={i} className="flex items-start gap-3">
//                   <div className="w-2.5 h-2.5 mt-2 rounded-full bg-indigo-500" />
//                   <div className="flex-1">
//                     <p className="text-gray-700">
//                       {act.title || act.message}
//                     </p>
//                     <p className="text-xs text-gray-400">
//                       {new Date(
//                         act.date || act.createdAt
//                       ).toLocaleString()}
//                     </p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState, useContext } from "react";
import { BarChart, ClipboardList, Clock, FileText } from "lucide-react";
import axios from "../../util/axiosInstance";
import toast from "react-hot-toast";
import { UserInfoContext } from "../../context/contextApi";

const Dashboard = () => {
  const { user } = useContext(UserInfoContext);
  const [employee, setEmployee] = useState(null);
  const [stats, setStats] = useState({
    attendanceRate: 0,
    leaves: 0,
    tasksPending: 0,
    docs: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchDashboard = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);

      // ✅ Employee Details
      const res = await axios.get(`/api/employee/${user.id}`);
      setEmployee(res.data || {});

      // ✅ Leaves (safe fallback)
      let totalLeaves = 0;
      try {
        const leaveRes = await axios.get(`/api/leaves/${user.id}`);
        totalLeaves = leaveRes?.data?.totalLeaves || 0;
      } catch {
        totalLeaves = 0;
      }

      // ✅ Attendance (safe fallback)
      let attendanceRate = 0;
      let records = [];
      try {
        const attendanceRes = await axios.get(`/api/attendance/${user.id}`);
        records = attendanceRes?.data?.records || [];
        const present = records.filter(r => r.status === "present").length;
        const late = records.filter(r => r.status === "late").length;
        const halfDay = records.filter(r => r.status === "half-day").length;
        const absent = records.filter(r => r.status === "absent").length;
        const totalDays = present + late + halfDay + absent;
        attendanceRate =
          totalDays > 0 ? ((present + late + halfDay) / totalDays) * 100 : 0;
      } catch {
        records = [];
        attendanceRate = 0;
      }

      // ✅ Tasks (safe fallback)
      let pendingTasksCount = 0;
      try {
        const tasksRes = await axios.get(`/api/task/${user.id}`);
        const tasks = tasksRes?.data?.task || [];
        pendingTasksCount = tasks.filter(t => t.status === "PENDING").length;
      } catch {
        pendingTasksCount = 0;
      }

      // ✅ Achievements (NEW)
      let achievementsCount = 0;
      try {
        const achRes = await axios.get(`/api/achievements/${user.id}`);
        achievementsCount = achRes?.data?.totalAchievements || 0;
      } catch {
        achievementsCount = 0;
      }

      // // ✅ Documents (safe fallback)
      // let docsCount = 0;
      // try {
      //   const docsRes = await axios.get(`/api/documents/${user.id}`);
      //   const documents = docsRes?.data?.documents || [];
      //   docsCount = documents.length;
      // } catch {
      //   docsCount = 0;
      // }

      // ✅ Update Stats
      setStats({
        attendanceRate,
        leaves: totalLeaves,
        tasksPending: pendingTasksCount,
        // docs: docsCount,
        achievements: achievementsCount, // 👈 NEW
      });

      // ✅ Recent activity (attendance based)
      setRecentActivity(records.slice(-5));
    } catch (err) {
      console.error("Dashboard fetch failed", err);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  fetchDashboard();
}, [user]);



  return (
    <div className="p-6 space-y-6">
      {/* Header Row: Right-aligned */}
      <div className="flex justify-end items-center">
        <div className="text-right">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, <span className="text-blue-600">{employee?.firstName || "Employee"}</span>
          </h1>
          <p className="text-gray-500">Here’s an overview of your tasks</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-4">
          <div className="p-3 rounded-lg bg-indigo-50">
            <BarChart className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Attendance Rate</p>
            <p className="text-xl font-semibold text-indigo-600">
              {stats.attendanceRate.toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-4">
          <div className="p-3 rounded-lg bg-green-50">
            <FileText className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Leaves</p>
            <p className="text-xl font-semibold">{stats.leaves}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-4">
          <div className="p-3 rounded-lg bg-yellow-50">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Pending Tasks</p>
            <p className="text-xl font-semibold">{stats.tasksPending}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-4">
          <div className="p-3 rounded-lg bg-blue-50">
            <ClipboardList className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Achievements</p>
            <p className="text-xl font-semibold">{stats. achievements}</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Recent Activity</h3>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : recentActivity.length === 0 ? (
          <p className="text-gray-500 text-sm">No recent activity</p>
        ) : (
          <ul className="space-y-3 text-sm">
            {recentActivity.map((act, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 mt-2 rounded-full bg-indigo-500" />
                <div className="flex-1">
                  <p className="text-gray-700">{act.status || act.title}</p>
                  <p className="text-xs text-gray-400">{new Date(act.date || act.createdAt).toLocaleString()}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

