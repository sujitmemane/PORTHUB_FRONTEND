import DashboardRedirect from "@/components/common/DashboardRedirect";
import RoleBasedRoute from "@/components/common/RoleBasedRoute";
import AppContextProvider from "@/contexts/AppContextProvider";
import Bills from "@/features/bills/pages/Bills";
import DashboardLayout from "@/layouts/DashboardLayout";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import StudentsAdminPage from "@/pages/dashboard/super-user/students";

import TemplateEngine from "@/pages/dashboard/super-user/TemplateEngine";
import SuperBills from "@/pages/dashboard/super-user/SuperBills.tsx";
import RegisterOrganization from "@/pages/onboarding/RegisterOrganization";

// User Dashboard Pages
// import UserDashboard from "@/pages/dashboard/user/UserDashboard";
// import UserProfile from "@/pages/dashboard/user/UserProfile";
// import UserSettings from "@/pages/dashboard/user/UserSettings";

// Admin Dashboard Pages
// import AdminDashboard from "@/pages/dashboard/admin/AdminDashboard";
// import AdminUsers from "@/pages/dashboard/admin/AdminUsers";
// import AdminReports from "@/pages/dashboard/admin/AdminReports";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SuperCreateBill from "@/pages/dashboard/super-user/SuperCreateBill";
import TwitterClone from "@/TwitterClone";
import GetStarted from "@/pages/onboarding/GetStarted";
import SecondStep from "@/pages/onboarding/SecondStep";
import MainProfile from "@/pages/dashboard/profile/MainProfile";
import SideProfile from "@/pages/dashboard/profile/SideProfile";

export default function AppRoutes() {
  return (
    <div>
      <BrowserRouter>
        {/* <AppContextProvider> */}
        <Routes>
          {/* Authentication Routes */}

          <Route path="/sample" element={<TwitterClone />} />

          <Route path="/auth">
            <Route path="sign-in" element={<Login />} />
            <Route path="sign-up" element={<Register />} />
          </Route>

          {/* Onboarding Routes */}
          <Route path="/onboarding">
            <Route index element={<GetStarted />} />
            <Route path="get-started" element={<SecondStep />} />
          </Route>

          <Route path="/dashboard">
            <Route
              index
              element={
                <DashboardLayout
                  mainElement={<MainProfile />}
                  sideElement={<SideProfile />}
                />
              }
            />
          </Route>

          {/* <Route path="*" element={<Navigate to="/dashboard" replace />} /> */}
        </Routes>
        {/* </AppContextProvider> */}
      </BrowserRouter>
    </div>
  );
}
