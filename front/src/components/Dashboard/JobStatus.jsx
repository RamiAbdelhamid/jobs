
import axios from "axios";
import toast from "react-hot-toast";

    axios.defaults.baseURL = "http://localhost:3000";
function JobStatus({ jobId, status }) {

    //update job status
    const updateJobStatus = (status) => {  
        if (!jobId) {
            toast.error("معرف الوظيفة غير متوفر.");
            return;
        }
        axios.put(`/api/updatejobstatus/${jobId}`, { status })
            .then((res) => {
                toast.success("تم تحديث حالة الوظيفة.");
                // simple way to refresh list after update
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            })
            .catch((err) => {
                const serverMessage = err?.response?.data?.message;
                console.error(err);
                toast.error(serverMessage || "حدث خطأ. حاول مرة أخرى.");
            });
    };


    return (
        <div className="mt-4">
            {status === 'true' ? (
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    منشورة
                </span>
            ) : (
                <div className="flex items-center gap-3">
                    <button className="bg-green-600 hover:bg-green-700 transition text-white px-3 py-2 rounded-md" onClick={() => updateJobStatus(true)}>نشر</button>
                    <button className="bg-gray-600 hover:bg-gray-700 transition text-white px-3 py-2 rounded-md" onClick={() => updateJobStatus(false)}>مسودة</button>
                </div>
            )}
        </div>
    )
}

export default JobStatus
