import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Home } from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/Forget";
import { UserDashboard } from "./components/Usercomponent/UserDashboard";
import { ParcelHistory } from "./components/Usercomponent/ParcelHistory";
import { Viewparcel } from "./components/Usercomponent/Viewparcel";
import TrackParcel from "./components/Usercomponent/Trackparcel";
import { Admin } from "./components/Admindasboard/admin";
import { AllParcels } from "./components/Admindasboard/Allparcels";
import AssignRider from "./components/Admindasboard/Assignrider";
import { ChangeparcelStatus } from "./components/Admindasboard/ChangeparcelStatus";
import { Rider } from "./components/RiderComponent/Rider";
import AssignedParcels from "./components/RiderComponent/RiderAssigned";
import UpdateParcelStatus from "./components/RiderComponent/updateParcel";
import RiderProfile from "./components/RiderComponent/RiderProfile";
import CreateParcel from "./components/Usercomponent/AddParcel";
import ProtectedRoute from "./components/Protected";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/forgot", element: <ForgotPassword /> },

  // User Routes
  {
    path: "/user/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["user"]}>
        <UserDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/parcel/create",
    element: (
      <ProtectedRoute allowedRoles={["user"]}>
        <CreateParcel />
      </ProtectedRoute>
    ),
  },
  {
    path: "/parcel/history",
    element: (
      <ProtectedRoute allowedRoles={["user"]}>
        <ParcelHistory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/view/parcel/:id",
    element: (
      <ProtectedRoute allowedRoles={["user"]}>
        <Viewparcel />
      </ProtectedRoute>
    ),
  },
  {
    path: "/parcel/track",
    element: (
      <ProtectedRoute allowedRoles={["user", "admin", "rider"]}>
        <TrackParcel />
      </ProtectedRoute>
    ),
  },

  // Admin Routes
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Admin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/parcels",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AllParcels />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/assign",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AssignRider />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/status",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <ChangeparcelStatus />
      </ProtectedRoute>
    ),
  },

  // Rider Routes
  {
    path: "/rider/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["rider"]}>
        <Rider />
      </ProtectedRoute>
    ),
  },
  {
    path: "/rider/parcels",
    element: (
      <ProtectedRoute allowedRoles={["rider"]}>
        <AssignedParcels />
      </ProtectedRoute>
    ),
  },
  {
    path: "/rider/parcelUpdate",
    element: (
      <ProtectedRoute allowedRoles={["rider"]}>
        <UpdateParcelStatus />
      </ProtectedRoute>
    ),
  },
  {
    path: "/rider/profile",
    element: (
      <ProtectedRoute allowedRoles={["rider"]}>
        <RiderProfile />
      </ProtectedRoute>
    ),
  },
]);

export default router;
