// // src/pages/Documents.jsx
// import React, { useContext, useEffect, useRef, useState } from "react";
// import { UploadCloud, Search, FileText, DownloadCloud, Trash2, File } from "lucide-react";
// import axios from "../../util/axiosInstance";
// import { UserInfoContext } from "../../context/contextApi";
// import toast from "react-hot-toast";
// import Layout from "../../components/Layout";

// const Documents = () => {
//   const { user } = useContext(UserInfoContext);
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [query, setQuery] = useState("");
//   const inputRef = useRef();

//   const fetchFiles = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`/api/documents/${user.id}`);
//       setFiles(res.data?.data || []);
//     } catch (err) {
//       console.error("Fetch docs failed", err);
//       toast.error("Failed to load documents");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user?.id) fetchFiles();
//   }, [user]);

//   const handleUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const form = new FormData();
//     form.append("file", file);
//     form.append("userId", user.id);

//     try {
//       await axios.post("/api/documents/upload", form, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       toast.success("File uploaded successfully");
//       fetchFiles();
//     } catch (err) {
//       toast.error("Upload failed");
//     } finally {
//       inputRef.current.value = "";
//     }
//   };

//   const handleDownload = (doc) => {
//     if (!doc.url) return;
//     window.open(doc.url, "_blank");
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/api/documents/${id}`);
//       toast.success("File deleted successfully");
//       fetchFiles();
//     } catch (err) {
//       toast.error("Delete failed");
//     }
//   };

//   const filteredFiles = files.filter((f) =>
//     (f.originalName || f.name || "").toLowerCase().includes(query.toLowerCase())
//   );

//   return (
//     <Layout>
//       <div className="p-6 flex-1 overflow-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//           <h1 className="text-3xl font-bold text-gray-900">My Documents</h1>
//           <label className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl cursor-pointer hover:bg-blue-700 transition">
//             <UploadCloud className="w-5 h-5" /> Upload
//             <input ref={inputRef} type="file" className="hidden" onChange={handleUpload} />
//           </label>
//         </div>

//         {/* Search */}
//         <div className="flex justify-start mb-6">
//           <div className="flex items-center gap-2 border rounded-lg px-3 py-2 w-full max-w-md shadow-sm">
//             <Search className="w-4 h-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search documents..."
//               className="w-full outline-none text-sm placeholder-gray-400"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Files Grid */}
//         {loading ? (
//           <p className="text-gray-500">Loading...</p>
//         ) : filteredFiles.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-20 text-gray-400">
//             <FileText className="w-12 h-12 mb-3" />
//             No documents found
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredFiles.map((f) => (
//               <div
//                 key={f._id}
//                 className="bg-white rounded-2xl shadow p-4 flex flex-col justify-between hover:shadow-lg transition"
//               >
//                 <div className="flex items-center gap-3 mb-3">
//                   <File className="w-6 h-6 text-blue-600" />
//                   <div className="truncate font-medium">{f.originalName || f.name}</div>
//                 </div>
//                 <div className="text-gray-400 text-sm mb-3">
//                   {new Date(f.createdAt).toLocaleDateString()} • {f.size ? `${(f.size / 1024).toFixed(1)} KB` : "—"}
//                 </div>
//                 <div className="flex justify-end gap-2">
//                   <button onClick={() => handleDownload(f)} className="p-2 rounded-lg hover:bg-gray-100 transition">
//                     <DownloadCloud className="w-4 h-4 text-blue-600" />
//                   </button>
//                   <button onClick={() => handleDelete(f._id)} className="p-2 rounded-lg hover:bg-gray-100 transition">
//                     <Trash2 className="w-4 h-4 text-red-500" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default Documents;
import React, { useEffect, useState } from "react";
import axios from "../../util/axiosInstance";
import toast from "react-hot-toast";
import Layout from "../../components/layout.jsx";
import { FileText, Trash2, Download } from "lucide-react";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [kind, setKind] = useState("OTHER");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // ✅ Get user info from localStorage
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("employeeId");
    if (token && userId) setUser({ token, userId });
  }, []);

const fetchDocuments = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return;

  try {
    const res = await axios.get("/api/documents", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setDocuments(res.data || []);
  } catch (err) {
    console.error(err);
    toast.error(err?.response?.data?.message || "Failed to fetch documents");
  }
};


  useEffect(() => {
    if (user) fetchDocuments();
  }, [user]);

  // // ✅ Upload document
  // const handleUpload = async (e) => {
  //   e.preventDefault();
  //   if (!file || !title) return toast.error("File and title are required");

  //   const token = localStorage.getItem("accessToken");
  //   const employeeId = localStorage.getItem("employeeId");
  //   if (!token || !employeeId) return toast.error("User not authenticated");

  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("title", title);
  //   formData.append("kind", kind);
  //   formData.append("employee", employeeId);
  //   formData.append("uploadedBy", employeeId);

  //   try {
  //     setLoading(true);
  //     await axios.post("/api/documents/upload", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     toast.success("✅ Document uploaded successfully");
  //     setFile(null);
  //     setTitle("");
  //     setKind("OTHER");
  //     fetchDocuments();
  //   } catch (err) {
  //     console.error(err);
  //     toast.error(err?.response?.data?.message || "Upload failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // ✅ Download document
  const handleDownload = async (id, title) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return toast.error("User not authenticated");

    try {
      const res = await axios.get(`/api/documents/download/${id}`, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${token}` },
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", title);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      toast.error("Download failed");
    }
  };

  // // ✅ Delete document
  // const handleDelete = async (id) => {
  //   if (!window.confirm("Are you sure you want to delete this document?")) return;

  //   const token = localStorage.getItem("accessToken");
  //   if (!token) return toast.error("User not authenticated");

  //   try {
  //     await axios.delete(`/api/documents/${id}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     toast.success("🗑️ Document deleted");
  //     fetchDocuments();
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Delete failed");
  //   }
  // };

  return (
    <Layout>
      <div className="p-6 flex-1 overflow-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">📊 Reports</h1>
          <h2 className="text-gray-500 text-sm">view, and download reports</h2>
        {/* Document List */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          {documents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-6">
              {documents.map((doc) => (
                <div
                  key={doc._id}
                  className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-lg transition"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <FileText className="w-8 h-8 text-indigo-500" />
                    <div>
                      <h4 className="text-lg font-medium text-gray-800">{doc.title}</h4>
                      <p className="text-sm text-gray-500">{doc.kind}</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-2">
                    Employee:{" "}
                    {doc.employee
                      ? `${doc.employee.firstName} ${doc.employee.lastName}`
                      : "Global"}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    Uploaded By:{" "}
                    {doc.uploadedBy
                      ? `${doc.uploadedBy.firstName} ${doc.uploadedBy.lastName}`
                      : "-"}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDownload(doc._id, doc.title)}
                      className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      <Download className="w-4 h-4" /> Download
                    </button>
                    {/* <button
                      onClick={() => handleDelete(doc._id)}
                      className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button> */}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No Reports found</p>
          )}
        </div>
       
      </div>
    </Layout>
  );
};

export default Documents;

