import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "./redux/authSlice";
import { getProfile } from "./services/authService";
import { useNavigate, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./protection/ProtectedRoute";
import AdminRoute from "./protection/AdminRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./components/Dashboard/DashboardHome";
import AdminLayout from "./layouts/AdminLayout";
import AdminHome from "./components/Admin/AdminHome";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import ExplorePublic from "./pages/ExplorePublic";
import ExplorePrivate from "./pages/ExplorePrivate";
import BlogDetail from "./pages/BlogDetail";
import PublicBlogDetail from "./pages/PublicBlogDetail";
import AuthorPage from "./pages/AuthorPage";
import Profile from "./pages/Profile";
import MyPosts from "./pages/MyPosts";
import AllBlogs from "./pages/AllBlogs";
import Analytics from "./pages/Analytics";
import AdminUsers from "./components/Admin/AdminUsers";

const AppContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await getProfile();
        dispatch(setCredentials({ user }));
        
        // Only redirect if we're on the home page or login/register pages
        const currentPath = window.location.pathname;
        if (currentPath === "/" || currentPath === "/login" || currentPath === "/register") {
          if (user.role === "admin") {
            navigate("/admin", { replace: true });
          } else if (user.role === "user") {
            navigate("/dashboard", { replace: true });
          }
        }
      } catch (error) {
        console.log("Not logged in or session expired", error);
      }
    };
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Remove dispatch and navigate from dependencies to prevent re-running

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/explore" element={<ExplorePublic />} />
      <Route path="/public-blog/:id" element={<PublicBlogDetail />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="create" element={<CreatePost />} />
        <Route path="edit-post/:id" element={<EditPost />} />
        <Route path="explore" element={<ExplorePrivate />} />
        <Route path="my-posts" element={<MyPosts />} />
        <Route path="all-blogs" element={<AllBlogs />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="blog/:id" element={<BlogDetail />} />
        <Route path="author/:id" element={<AuthorPage />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminHome />} />
        <Route path="users" element={<AdminUsers />} />
      </Route>
    </Routes>
  );
};

export default AppContent;
