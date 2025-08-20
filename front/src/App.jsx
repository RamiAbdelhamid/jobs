import React, { Suspense } from "react";
const Home = React.lazy(() => import("./pages/Home"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
function App() {

  return (
    <>  
   <Router>
     <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">جارٍ التحميل...</div>}>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/dashboard" element={<Dashboard />} />
       </Routes>
     </Suspense>
   </Router>
<Toaster position="top-center" />
    </>
  )
}

export default App
