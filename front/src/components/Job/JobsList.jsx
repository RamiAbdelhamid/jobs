import React from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useEffect, useMemo, useState } from 'react'
import JobCard from '../Shared/JobCard'
import { Search, Filter, Briefcase, Grid3X3, List } from 'lucide-react'

function JobsList({ initialStatusFilter = 'true', showFilters = false, showHomeFilters = false }) {
  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState(initialStatusFilter); // 'all' | 'true' | 'false'
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    axios
      .get(`/api/showjob`, { params: { status: statusFilter === 'all' ? undefined : statusFilter } })
      .then((res) => {
        if (mounted) {
          setJobs(res.data || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("تعذر جلب الوظائف.");
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [statusFilter]);

  const titleOptions = useMemo(() => {
    const set = new Set();
    jobs.forEach((j) => {
      if (j?.title) set.add(String(j.title));
    });
    return Array.from(set);
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter((job) => {
      const matchesQuery = !q || [job.title, job.location, job.description, job.skills_required]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q));
      const matchesCategory = category === 'all' || String(job.title) === category;
      return matchesQuery && matchesCategory;
    });
  }, [jobs, query, category]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-100 rounded-xl">
              <Briefcase size={24} className="text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">الوظائف المتاحة</h1>
              <p className="text-gray-600 mt-1">
                اكتشف فرص العمل المناسبة لك ({filteredJobs.length} وظيفة متاحة)
              </p>
            </div>
          </div>

          {/* View Toggle */}
          {(showFilters || showHomeFilters) && (
            <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1 ">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition cursor-pointer ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                title="عرض شبكي"
              >
                <Grid3X3 size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition cursor-pointer ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                title="عرض قائمة"
              >
                <List size={20} />
              </button>
            </div>
          )}

        </div>

        {/* Filters Section */}
        {(showFilters || showHomeFilters) && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Filter size={18} className="text-gray-500" />
              <h3 className="font-semibold text-gray-900">تصفية النتائج</h3>
            </div>

            <div className={`grid grid-cols-1 ${showHomeFilters ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-4`}>
            {/* Search Input */}
              <div className="relative">
                <Search size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="ابحث في الوظائف..."
                />
              </div>

              {/* Category Filter */}
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className=" cursor-pointer w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
              >
                <option value="all">جميع المجالات</option>
                {titleOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              {/* Status Filter - Only show in dashboard */}
              {showFilters && (
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
                >
                  <option value="true">الوظائف المنشورة</option>
                  <option value="false">المسودات</option>
                  <option value="all">جميع الوظائف</option>
                </select>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      )}

      {/* Jobs Grid */}
      {!loading && (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              viewMode={viewMode}
              showAdminActions={showFilters}
              onDeleted={(deletedId) => {
                setJobs((prev) => prev.filter((j) => j._id !== deletedId));
              }}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredJobs.length === 0 && (
        <div className="text-center py-20">
          <div className="p-6 bg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <Briefcase size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">لا توجد وظائف</h3>
          <p className="text-gray-600">
            {query || category !== 'all'
              ? 'لم يتم العثور على وظائف مطابقة لمعايير البحث الخاصة بك'
              : 'لا توجد وظائف متاحة حالياً'
            }
          </p>
          {(query || category !== 'all') && (
            <button
              onClick={() => {
                setQuery('');
                setCategory('all');
              }}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              مسح الفلاتر
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default JobsList