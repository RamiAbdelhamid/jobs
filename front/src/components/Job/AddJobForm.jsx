    import React, { useState } from "react";
    import axios from "axios";
    import toast from "react-hot-toast";
    import { Asterisk } from 'lucide-react';
    axios.defaults.baseURL = "https://jobs-l5nc.onrender.com";

function AddJobForm() {
    const [job, setJob] = useState({
      type_of_employment_contract: "",
      title: "",
      job_sector: "",
      description: "",
      location: "",
      salary: "",
      Number_of_working_days: "",
      Number_of_working_hours: "",
      Additional_benefits: "",
      Education_level: "",
      Experience_level: "",
      language: "",
      driving_licence: "",
      vehicle_ownership: "",
      skills_required: "",
      Phone_number: "",
      email: "",
      whatsapp_number: "",
    });

    const [errors, setErrors] = useState({});
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      // Clear previous errors
      setErrors({});
      
      // Validate contact information - at least one is required
      const hasContactInfo = job.Phone_number.trim() || job.email.trim() || job.whatsapp_number.trim();
      if (!hasContactInfo) {
        setErrors({ contact: 'يجب إدخال رقم هاتف أو بريد إلكتروني أو رقم واتساب واحد على الأقل' });
        toast.error('يجب إدخال معلومات التواصل');
        return;
      }
      
      try {
        await axios.post("/api/addjob", job);
        toast.success("تم إرسال طلبك. يرجى الانتظار لمراجعة الطلب.", {duration: 5000 , style: {
          background: "green",
          color: "white",
        }});
  
        
        setJob({ title: "", description: "", location: "", salary: "", Number_of_working_days: "", Number_of_working_hours: "", Additional_benefits: "", Education_level: "", Experience_level: "", language: "", driving_licence: "", vehicle_ownership: "", skills_required: "", Phone_number: "", email: "", whatsapp_number: "" });
        setErrors({});
      } catch (err) {
        console.error(err);
        toast.error("حدث خطأ. حاول مرة أخرى.", {duration: 5000 , style: {
          background: "red",
          color: "white",
        }});
      }
    };

    const RequiredField = ({ children }) => (
      <span className="inline-flex items-center gap-1">
        {children}
        <Asterisk size={12} className="text-red-500" />
      </span>
    );

    const ContactField = ({ children, required = false }) => (
      <span className="inline-flex items-center gap-1">
        {children}
        {required && <Asterisk size={12} className="text-red-500" />}
      </span>
    );
  
    return (
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-extrabold mb-6">أضف وظيفة</h1>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <RequiredField>اسم الوظيفة</RequiredField>
              </label>
              <input
                type="text"
                placeholder="مثال: مطور ويب"
                required
                value={job.title}
                onChange={(e) => setJob({ ...job, title: e.target.value })}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <RequiredField>الموقع</RequiredField>
              </label>
              <input
                type="text"
                placeholder="مثال: الرياض، جدة"
                required
                value={job.location}
                onChange={(e) => setJob({ ...job, location: e.target.value })}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <RequiredField>وصف الوظيفة</RequiredField>
            </label>
            <textarea
              placeholder="اشرح تفاصيل الوظيفة والمهام المطلوبة..."
              required
              value={job.description}
              onChange={(e) => setJob({ ...job, description: e.target.value })}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={4}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <RequiredField>الراتب</RequiredField>
              </label>
              <input
                type="text"
                placeholder="مثال: 500 "
                required
                value={job.salary}
                onChange={(e) => setJob({ ...job, salary: e.target.value })}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <RequiredField>عدد أيام العمل</RequiredField>
              </label>
              <input
                type="text"
                placeholder="مثال: 5 "
                required
                value={job.Number_of_working_days}
                onChange={(e) => setJob({ ...job, Number_of_working_days: e.target.value })}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <RequiredField>عدد ساعات العمل</RequiredField>
              </label>
              <input
                type="text"
                placeholder="مثال: 8 "
                required
                value={job.Number_of_working_hours}
                onChange={(e) => setJob({ ...job, Number_of_working_hours: e.target.value })}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <RequiredField>مستوى التعليم</RequiredField>
              </label>
              <input
                type="text"
                placeholder="مثال: بكالوريوس"
                required
                value={job.Education_level}
                onChange={(e) => setJob({ ...job, Education_level: e.target.value })}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <RequiredField>مستوى الخبرة</RequiredField>
              </label>
              <input
                type="text"
                placeholder="مثال: 3 سنوات"
                required
                value={job.Experience_level}
                onChange={(e) => setJob({ ...job, Experience_level: e.target.value })}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <RequiredField>اللغات المطلوبة</RequiredField>
              </label>
              <input
                type="text"
                placeholder="مثال: العربية، الإنجليزية"
                required
                value={job.language}
                onChange={(e) => setJob({ ...job, language: e.target.value })}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                رخصة قيادة
              </label>
              <input
                type="text"
                placeholder="مثال: مطلوبة/غير مطلوبة"
                value={job.driving_licence}
                onChange={(e) => setJob({ ...job, driving_licence: e.target.value })}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ملكية مركبة
              </label>
              <input
                type="text"
                placeholder="مثال: مطلوبة/غير مطلوبة"
                value={job.vehicle_ownership}
                onChange={(e) => setJob({ ...job, vehicle_ownership: e.target.value })}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <RequiredField>المهارات المطلوبة</RequiredField>
            </label>
            <input
              type="text"
              placeholder="مثال: JavaScript, React, Node.js"
              required
              value={job.skills_required}
              onChange={(e) => setJob({ ...job, skills_required: e.target.value })}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              المزايا الإضافية
            </label>
            <input
              type="text"
              placeholder="مثال: تأمين صحي، بدل نقل"
              value={job.Additional_benefits}
              onChange={(e) => setJob({ ...job, Additional_benefits: e.target.value })}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                رقم الهاتف
              </label>
              <input
                type="text"
                placeholder="مثال: 0788888888"
                value={job.Phone_number}
                onChange={(e) => setJob({ ...job, Phone_number: e.target.value })}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                البريد الالكتروني
              </label>
              <input
                type="email"
                placeholder="مثال: example@gmail.com"
                value={job.email}
                onChange={(e) => setJob({ ...job, email: e.target.value })}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              رقم الواتساب
            </label>
            <input
              type="text"
              placeholder="مثال: 0788888888"
              value={job.whatsapp_number}
              onChange={(e) => setJob({ ...job, whatsapp_number: e.target.value })}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Contact Info Error */}
          {errors.contact && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm flex items-center gap-2">
                <span className="text-red-500">⚠️</span>
                {errors.contact}
              </p>
            </div>
          )}

          {/* Contact Info Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-blue-700 text-sm flex items-center gap-2">
              <span className="text-blue-500">ℹ️</span>
              يجب إدخال واحد على الأقل من: رقم الهاتف، البريد الإلكتروني، أو رقم الواتساب
            </p>
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white p-3 rounded-lg cursor-pointer hover:bg-indigo-700 transition"
          >
            أضف الوظيفة
          </button>
        </form>
      </div>
    );
  }

  export default AddJobForm