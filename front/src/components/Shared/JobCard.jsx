import React, { useState } from 'react';
import JobStatus from '../Dashboard/JobStatus';
import { MapPin, DollarSign, Clock, Calendar, GraduationCap, Briefcase, Globe, Car, Gift, Trash2, X, Phone, Mail } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

function JobCard({ job, viewMode = 'grid', showAdminActions = false, onDeleted }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/job/${job._id}`);
      toast.success('تم حذف الوظيفة');
      if (onDeleted) onDeleted(job._id);
      setShowDeleteConfirm(false);
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || 'تعذر حذف الوظيفة');
    }
  };

  // Compact view for list mode
  if (viewMode === 'list') {
    return (
      <>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
          <div className="p-4 flex items-center justify-between">
            <div className="flex-1 cursor-pointer" onClick={() => setShowDetails(true)}>
              <h3 className="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                {job.title}
              </h3>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  {job.location}
                </span>
                {job.salary && (
                  <span className="flex items-center gap-1">
                    <DollarSign size={14} />
                    {job.salary}
                  </span>
                )}
                {job.Number_of_working_days && (
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {job.Number_of_working_days} يوم
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <JobStatus jobId={job._id} status={job.status} />
              {showAdminActions && (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition"
                  title="حذف الوظيفة"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal for List View */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowDeleteConfirm(false)} />
            <div className="relative bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">تأكيد الحذف</h3>
                <button 
                  onClick={() => setShowDeleteConfirm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
              <p className="text-gray-600 mb-6">
                هل أنت متأكد من حذف الوظيفة "{job.title}"؟ لا يمكن التراجع عن هذا الإجراء.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  حذف
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Job Details Modal for List View */}
        {showDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowDetails(false)} />
            <div className="relative bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto shadow-xl">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
                  <button 
                    onClick={() => setShowDetails(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">معلومات الوظيفة</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-gray-400" />
                        <span className="text-gray-700">الموقع: {job.location}</span>
                      </div>
                      {job.salary && (
                        <div className="flex items-center gap-2">
                          <DollarSign size={16} className="text-gray-400" />
                          <span className="text-gray-700">الراتب: {job.salary}</span>
                        </div>
                      )}
                      {job.Number_of_working_days && (
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-gray-400" />
                          <span className="text-gray-700">أيام العمل: {job.Number_of_working_days}</span>
                        </div>
                      )}
                      {job.Number_of_working_hours && (
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-gray-400" />
                          <span className="text-gray-700">ساعات العمل: {job.Number_of_working_hours}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">المتطلبات</h3>
                    <div className="space-y-3">
                      {job.Education_level && (
                        <div className="flex items-center gap-2">
                          <GraduationCap size={16} className="text-gray-400" />
                          <span className="text-gray-700">التعليم: {job.Education_level}</span>
                        </div>
                      )}
                      {job.Experience_level && (
                        <div className="flex items-center gap-2">
                          <Briefcase size={16} className="text-gray-400" />
                          <span className="text-gray-700">الخبرة: {job.Experience_level}</span>
                        </div>
                      )}
                      {job.language && (
                        <div className="flex items-center gap-2">
                          <Globe size={16} className="text-gray-400" />
                          <span className="text-gray-700">اللغات: {job.language}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {job.Phone_number && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">معلومات التواصل</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-gray-400" />
                        <span className="text-gray-700">رقم الهاتف: {job.Phone_number}</span>
                      </div>
                      
                      {job.email && (
                        <div className="flex items-center gap-2">
                          <Mail size={16} className="text-gray-400" />
                          <span className="text-gray-700">البريد الالكتروني: {job.email}</span>
                        </div>
                      )}
                      
                      {job.whatsapp_number && (
                        <div className="flex items-center gap-2">
                          <Phone size={16} className="text-gray-400" />
                          <span className="text-gray-700">رقم الواتساب: {job.whatsapp_number}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {job.description && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">الوصف</h3>
                    <p className="text-gray-700 leading-relaxed">{job.description}</p>
                  </div>
                )}
                
                {job.skills_required && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">المهارات المطلوبة</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.skills_required.split(',').map((skill, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Grid view (existing design)
  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-100">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h2 
              className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors cursor-pointer"
              onClick={() => setShowDetails(true)}
            >
              {job.title}
            </h2>
            <JobStatus jobId={job._id} status={job.status} />
          </div>
          
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={16} />
            <span className="text-sm">{job.location}</span>
          </div>
        </div>

        {/* Content */}
       

        {/* Action Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center gap-3">
          <button 
            onClick={() => setShowDetails(true)}
            className="cursor-pointer flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm"
          >
            عرض التفاصيل
          </button>
          {showAdminActions && (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="cursor-pointer p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition"
              title="حذف الوظيفة"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowDeleteConfirm(false)} />
          <div className="relative bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">تأكيد الحذف</h3>
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              هل أنت متأكد من حذف الوظيفة "{job.title}"؟ لا يمكن التراجع عن هذا الإجراء.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDelete}
                className="cursor-pointer flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                حذف
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="cursor-pointer flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition-colors"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Job Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowDetails(false)} />
          <div className="relative bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto shadow-xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
                <button 
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">معلومات الوظيفة</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gray-400" />
                      <span className="text-gray-700">الموقع: {job.location}</span>
                    </div>
                    {job.salary && (
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} className="text-gray-400" />
                        <span className="text-gray-700">الراتب: {job.salary}</span>
                      </div>
                    )}
                    {job.Number_of_working_days && (
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-400" />
                        <span className="text-gray-700">أيام العمل: {job.Number_of_working_days}</span>
                      </div>
                    )}
                    {job.Number_of_working_hours && (
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-400" />
                        <span className="text-gray-700">ساعات العمل: {job.Number_of_working_hours}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">المتطلبات</h3>
                  <div className="space-y-3">
                    {job.Education_level && (
                      <div className="flex items-center gap-2">
                        <GraduationCap size={16} className="text-gray-400" />
                        <span className="text-gray-700">التعليم: {job.Education_level}</span>
                      </div>
                    )}
                    {job.Experience_level && (
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} className="text-gray-400" />
                        <span className="text-gray-700">الخبرة: {job.Experience_level}</span>
                      </div>
                    )}
                    {job.language && (
                      <div className="flex items-center gap-2">
                        <Globe size={16} className="text-gray-400" />
                        <span className="text-gray-700">اللغات: {job.language}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
            {job.Phone_number && (
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-gray-400" />
              <span className="text-gray-700">رقم الهاتف: {job.Phone_number}</span>
            </div>
           )}
          
           {job.email && (
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-gray-400" />
              <span className="text-gray-700">البريد الالكتروني: {job.email}</span>
            </div>
           )}
               {job.whatsapp_number && (
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-gray-400" />
              <span className="text-gray-700">رقم الواتساب: {job.whatsapp_number}</span>
            </div>
           )}


              {job.description && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">الوصف</h3>
                  <p className="text-gray-700 leading-relaxed">{job.description}</p>
                </div>
              )}

              
              {job.skills_required && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">المهارات المطلوبة</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills_required.split(',').map((skill, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default JobCard;