import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../../pages/dashboard/dashboard";
import ReferralsRewards from "../../pages/referralsRewards/referralsRewards";
import EarningRedemption from "../../pages/earningRedemptions/earningRedemption";
import Login from "../../pages/auth/Login";
import Forgot from "../../pages/auth/Forgot";
import PushupNotification from "../../pages/pushupNotification/pushupNotification";



// import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/referral" element={<ReferralsRewards />} />
        <Route path="/earning" element={<EarningRedemption />} />
        <Route path="/pushup" element={<PushupNotification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />


        {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
