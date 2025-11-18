// import React, { useState } from "react";
// import {
//   User,
//   Mail,
//   Lock,
//   Phone as PhoneIcon,
//   Calendar,
//   Building2,
//   BriefcaseBusiness,
//   GraduationCap,
//   BadgeCheck,
//   Loader2,
//   Eye,
//   EyeOff,
// } from "lucide-react";
// import axios from "../../util/axiosInstance.js";
// import { Link } from "react-router-dom";

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
// const phoneRegex = /^[0-9+\-()\s]{6,}$/;

// const DEPARTMENTS = ["HR", "IT", "Finance", "Marketing", "Sales"];
// const POSITIONS = ["Manager", "Team Lead", "Developer", "Designer", "Intern", "HR"];
// const EDUCATION = ["Matric", "Intermediate", "Bachelor", "Master", "MPhil", "PhD", "Other"];

// const initialForm = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   password: "",
//   phone: "",
//   address: "",
//   dateOfBirth: "",
//   department: "",
//   position: "",
//   experience: "",
//   education: "",
// };

// const Field = ({
//   label,
//   name,
//   icon: Icon,
//   type = "text",
//   value,
//   onChange,
//   error,
//   options,
//   placeholder,
//   children,
// }) => (
//   <div className="flex flex-col gap-1">
//     <label htmlFor={name} className="text-sm font-medium text-gray-700">
//       {label}
//     </label>
//     <div className="relative flex items-center rounded-xl border bg-white focus-within:ring-2 focus-within:ring-indigo-500 shadow-sm">
//       {Icon && <Icon className="absolute left-3 h-5 w-5 text-gray-400" />}
//       {options ? (
//         <select
//           id={name}
//           name={name}
//           value={value}
//           onChange={onChange}
//           className="w-full rounded-xl bg-transparent pl-10 pr-3 py-2 outline-none text-gray-900"
//         >
//           <option value="">Select {label.toLowerCase()}</option>
//           {options.map((o) => (
//             <option key={o} value={o}>
//               {o}
//             </option>
//           ))}
//         </select>
//       ) : children ? (
//         children
//       ) : (
//         <input
//           id={name}
//           name={name}
//           type={type}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           className="w-full rounded-xl bg-transparent pl-10 pr-3 py-2 outline-none text-gray-900 placeholder:text-gray-400"
//         />
//       )}
//     </div>
//     {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
//   </div>
// );

// export default function SignUpPage() {
//   const [formData, setFormData] = useState(initialForm);
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   const validate = () => {
//     const {
//       firstName,
//       lastName,
//       email,
//       password,
//       phone,
//       address,
//       dateOfBirth,
//       department,
//       position,
//       experience,
//       education,
//     } = formData;
//     const errs = {};
//     if (!firstName) errs.firstName = "Required";
//     if (!lastName) errs.lastName = "Required";
//     if (!email) errs.email = "Required";
//     else if (!emailRegex.test(email)) errs.email = "Invalid email";
//     if (!password || password.length < 6) errs.password = "Min 6 chars";
//     if (!phone) errs.phone = "Required";
//     else if (!phoneRegex.test(phone)) errs.phone = "Invalid phone";
//     if (!address) errs.address = "Required";
//     if (!dateOfBirth) errs.dateOfBirth = "Required";
//     if (!department) errs.department = "Required";
//     if (!position) errs.position = "Required";
//     if (!experience) errs.experience = "Required";
//     if (!education) errs.education = "Required";
//     return errs;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     const v = validate();
//     if (Object.keys(v).length) return setErrors(v);

//     try {
//       setSubmitting(true);
//       const { data } = await axios.post("/api/users/signup", formData);
//       if (!data.success) throw new Error(data.message || "Signup failed");
//       setMessage("✅ Account created successfully! Redirecting...");
//       setFormData(initialForm);
//     } catch (err) {
//       setMessage(err?.response?.data?.message || err.message);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600  px-4">
//       <div className="w-full max-w-4xl my-5 bg-white rounded-3xl shadow-xl p-8 md:p-12">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-900">Create Your Account</h2>
//           <p className="text-sm text-gray-500">Fill in the details below to get started</p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid sm:grid-cols-2 gap-5">
//             <Field
//               label="First Name"
//               name="firstName"
//               icon={User}
//               value={formData.firstName}
//               onChange={handleChange}
//               error={errors.firstName}
//               placeholder="Usman"
//             />
//             <Field
//               label="Last Name"
//               name="lastName"
//               icon={User}
//               value={formData.lastName}
//               onChange={handleChange}
//               error={errors.lastName}
//               placeholder="Ali"
//             />
//             <Field
//               label="Email"
//               name="email"
//               icon={Mail}
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               error={errors.email}
//               placeholder="you@example.com"
//             />
//             <Field label="Password" name="password" icon={Lock} error={errors.password}>
//               <div className="relative w-full">
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="••••••••"
//                   className="w-full rounded-xl bg-transparent pl-10 pr-10 py-2 outline-none text-gray-900 placeholder:text-gray-400"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute inset-y-0 right-2 grid place-items-center px-2 text-gray-500"
//                 >
//                   {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                 </button>
//               </div>
//             </Field>
//             <Field
//               label="Phone"
//               name="phone"
//               icon={PhoneIcon}
//               value={formData.phone}
//               onChange={handleChange}
//               error={errors.phone}
//               placeholder="03XX-XXXXXXX"
//             />
//             <Field
//               label="Address"
//               name="address"
//               icon={Building2}
//               value={formData.address}
//               onChange={handleChange}
//               error={errors.address}
//               placeholder="Street, City"
//             />
//             <Field
//               label="Date of Birth"
//               name="dateOfBirth"
//               icon={Calendar}
//               type="date"
//               value={formData.dateOfBirth}
//               onChange={handleChange}
//               error={errors.dateOfBirth}
//             />
//             <Field
//               label="Department"
//               name="department"
//               icon={Building2}
//               value={formData.department}
//               onChange={handleChange}
//               error={errors.department}
//               options={DEPARTMENTS}
//             />
//             <Field
//               label="Position"
//               name="position"
//               icon={BriefcaseBusiness}
//               value={formData.position}
//               onChange={handleChange}
//               error={errors.position}
//               options={POSITIONS}
//             />
//             <Field
//               label="Experience"
//               name="experience"
//               icon={BadgeCheck}
//               type="number"
//               value={formData.experience}
//               onChange={handleChange}
//               error={errors.experience}
//               placeholder="0"
//             />
//             <Field
//               label="Education"
//               name="education"
//               icon={GraduationCap}
//               value={formData.education}
//               onChange={handleChange}
//               error={errors.education}
//               options={EDUCATION}
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={submitting}
//             className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white py-3 font-semibold shadow-md hover:bg-blue-700 cursor-pointer transition disabled:opacity-60"
//           >
//             {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Create Account"}
//           </button>

//           <p className="text-sm text-gray-500 text-center">
//             Already have an account?{" "}
//             <Link to={"/login"} className="text-blue-600 font-medium hover:underline">
//               Login
//             </Link>
//           </p>

//           {message && (
//             <div className="text-sm text-center p-3 rounded-xl bg-indigo-50 text-blue-600">
//               {message}
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Phone as PhoneIcon,
  Calendar,
  Building2,
  BriefcaseBusiness,
  GraduationCap,
  BadgeCheck,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import axios from "../../util/axiosInstance.js";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const phoneRegex = /^[0-9+\-()\s]{6,}$/;

const DEPARTMENTS = ["HR", "IT", "Finance", "Marketing", "Sales"];
const POSITIONS = ["Manager", "Team Lead", "Developer", "Designer", "Intern", "HR"];
const EDUCATION = ["Matric", "Intermediate", "Bachelor", "Master", "MPhil", "PhD", "Other"];

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone: "",
  address: "",
  dateOfBirth: "",
  department: "",
  position: "",
  experience: "",
  education: "",
  image: "",
};

const Field = ({ label, name, icon: Icon, type = "text", value, onChange, error, options, placeholder, children }) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={name} className="text-sm font-medium text-gray-700">{label}</label>
    <div className="relative flex items-center rounded-xl border bg-white focus-within:ring-2 focus-within:ring-indigo-500 shadow-sm">
      {Icon && <Icon className="absolute left-3 h-5 w-5 text-gray-400" />}
      {options ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full rounded-xl bg-transparent pl-10 pr-3 py-2 outline-none text-gray-900"
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : children ? (
        children
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-xl bg-transparent pl-10 pr-3 py-2 outline-none text-gray-900 placeholder:text-gray-400"
        />
      )}
    </div>
    {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
  </div>
);

export default function SignUpPage() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const errs = {};
    if (!formData.firstName) errs.firstName = "Required";
    if (!formData.lastName) errs.lastName = "Required";
    if (!formData.email) errs.email = !emailRegex.test(formData.email) ? "Invalid email" : "Required";
    if (!formData.password || formData.password.length < 6) errs.password = "Min 6 chars";
    if (!formData.phone) errs.phone = !phoneRegex.test(formData.phone) ? "Invalid phone" : "Required";
    if (!formData.address) errs.address = "Required";
    if (!formData.dateOfBirth) errs.dateOfBirth = "Required";
    if (!formData.department) errs.department = "Required";
    if (!formData.position) errs.position = "Required";
    if (!formData.experience) errs.experience = "Required";
    if (!formData.education) errs.education = "Required";
    // if (!formData.image) errs.image = "Profile picture is required";
    return errs;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const v = validate();
  if (Object.keys(v).length) return setErrors(v);

  try {
    setSubmitting(true);
   const { data } = await axios.post("/api/users/signup", formData);

// status 201 aya to successful hoga
if (data && data.user) {
  toast.success(data.message || "User registered successfully", { duration: 4000, position: "top-right" });
  setFormData(initialForm);
} else {
  toast.error(data.message || "Signup failed", { duration: 5000, position: "top-right" });
} 
} catch (err) {
    //  Only on network/server error
    toast.error(` ${err?.response?.data?.message || err.message}`, { duration: 5000, position: "top-right" });
  } finally {
    setSubmitting(false);
  }
};


  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 px-4">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-full max-w-4xl my-5 bg-white rounded-3xl shadow-xl p-8 md:p-12">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Create Your Account</h2>
          <p className="text-sm text-gray-500">Fill in the details below to get started</p>
        </div>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-28 h-28">
            {formData.image ? (
              <img
                src={formData.image}
                alt="profile preview"
                className="w-28 h-28 rounded-full object-cover border-2 border-gray-300 shadow-sm"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-4xl font-bold border-2 border-gray-300">
                <User />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => setFormData(prev => ({ ...prev, image: reader.result }));
                  reader.readAsDataURL(file);
                }
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
            />
          </div>
          {errors.image && <p className="text-xs text-red-600 mt-1">{errors.image}</p>}
          <p className="text-sm text-gray-500 mt-2">Upload Profile Picture</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="First Name" name="firstName" icon={User} value={formData.firstName} onChange={handleChange} error={errors.firstName} placeholder="Usman" />
            <Field label="Last Name" name="lastName" icon={User} value={formData.lastName} onChange={handleChange} error={errors.lastName} placeholder="Ali" />
            <Field label="Email" name="email" icon={Mail} type="email" value={formData.email} onChange={handleChange} error={errors.email} placeholder="you@example.com" />
            <Field label="Password" name="password" icon={Lock} error={errors.password}>
              <div className="relative w-full">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-xl bg-transparent pl-10 pr-10 py-2 outline-none text-gray-900 placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-2 grid place-items-center px-2 text-gray-500"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </Field>
            <Field label="Phone" name="phone" icon={PhoneIcon} value={formData.phone} onChange={handleChange} error={errors.phone} placeholder="03XX-XXXXXXX" />
            <Field label="Address" name="address" icon={Building2} value={formData.address} onChange={handleChange} error={errors.address} placeholder="Street, City" />
            <Field label="Date of Birth" name="dateOfBirth" icon={Calendar} type="date" value={formData.dateOfBirth} onChange={handleChange} error={errors.dateOfBirth} />
            <Field label="Department" name="department" icon={Building2} value={formData.department} onChange={handleChange} error={errors.department} options={DEPARTMENTS} />
            <Field label="Position" name="position" icon={BriefcaseBusiness} value={formData.position} onChange={handleChange} error={errors.position} options={POSITIONS} />
            <Field label="Experience" name="experience" icon={BadgeCheck} type="number" value={formData.experience} onChange={handleChange} error={errors.experience} placeholder="0" />
            <Field label="Education" name="education" icon={GraduationCap} value={formData.education} onChange={handleChange} error={errors.education} options={EDUCATION} />
          </div>

          <button type="submit" disabled={submitting} className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white py-3 font-semibold shadow-md hover:bg-blue-700 cursor-pointer transition disabled:opacity-60">
            {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Create Account"}
          </button>

          <p className="text-sm text-gray-500 text-center">
            Already have an account? <Link to={"/login"} className="text-blue-600 font-medium hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
