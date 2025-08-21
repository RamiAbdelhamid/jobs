import React from "react";
const HeroSection = React.lazy(() => import("../components/HeroSection"));
const Navbar = React.lazy(() => import("../components/Shared/Navbar"));
const Footer = React.lazy(() => import("../components/Shared/Footer"));
const JobsList = React.lazy(() => import("../components/Job/JobsList"));
import { Suspense } from 'react';
import axios from "axios";
import { Toaster } from "react-hot-toast";
axios.defaults.baseURL = "https://jobs-l5nc.onrender.com"; 
function Home() {
  return (
    <div className="font-[Cairo]">
      <Toaster position="top-center" />
        <Suspense fallback={<div className="p-6">Loading...</div>}>
        <Navbar />
        <HeroSection />
        <JobsList showFilters={false} showHomeFilters={true} />
        <Footer />
      </Suspense>
    </div>
  );
}

export default Home;
