import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "../../pages/dashboard/dashboard";
import ReferralsRewards from "../../pages/referralsRewards/referralsRewards";
import EarningRedemption from "../../pages/earningRedemptions/earningRedemption";
import Login from "../../pages/auth/Login";
import Forgot from "../../pages/auth/Forgot";
import PushupNotification from "../../pages/pushupNotification/pushupNotification";
import { UserContext } from "../../utils/UseContext/useContext";
import Error from "../../pages/Errror/error";

// import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  // Check Auth Functionality
  const { AuthLocal, setAuthLocal } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getValue = sessionStorage.getItem("Auth");
      setAuthLocal(getValue);
      setLoading(false);
    
  }, []);

  if (loading) return null;

  return (
    <Router>
      <Routes>
        {!AuthLocal && (
          <Route path="/" element={<Navigate to="/login" replace />} />
        )}
        {AuthLocal && <Route path="/" element={<Dashboard />} />}

        {/* Public Routes */}
        <Route
          path="/login"
          element={AuthLocal ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/forgot"
          element={AuthLocal ? <Navigate to="/" replace /> : <Forgot />}
        />

        {/* Protected Routes */}
        <Route
          path="/referral"
          element={
            AuthLocal ? <ReferralsRewards /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/earning"
          element={
            AuthLocal ? <EarningRedemption /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/pushup"
          element={
            AuthLocal ? (
              <PushupNotification />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        {/* Catch-all route */}
        <Route path="*" element={<Error />} />

        {/* <Route path="/" element={<Dashboard />} />
        <Route path="/referral" element={<ReferralsRewards />} />
        <Route path="/earning" element={<EarningRedemption />} />
        <Route path="/pushup" element={<PushupNotification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
