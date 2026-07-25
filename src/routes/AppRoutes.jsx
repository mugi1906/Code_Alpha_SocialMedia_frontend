import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import { AnimatePresence } from "framer-motion";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Create from "../pages/post/Create";
import Home from "../pages/home/Home";
import CreatePost from '../components/post/CreatePost'
import Profile from "../pages/profile/Profile";
import UserProfile from "../pages/profile/UserProfile";

import Search from "../pages/search/Search";

import SavedPosts from "../pages/saved/SavedPosts";

import Notifications from "../pages/notification/Notifications";

import SinglePost from "../pages/post/SinglePost";

function AppRoutes() {

    return (

        <div>
            
            <Routes>

                {/* Public Routes */}

                <Route

                    path="/login"

                    element={<Login />}

                />

                <Route

                    path="/register"

                    element={<Register />}

                />

                {/* Protected Routes */}

                <Route

                    path="/"

                    element={

                        <ProtectedRoute>

                            <Home />

                        </ProtectedRoute>

                    }

                />

                <Route
                    path="/create"
                    element={
                        <ProtectedRoute>
                            <Create />
                        </ProtectedRoute>
                    }
                />

                <Route

                    path="/profile"

                    element={

                        <ProtectedRoute>

                            <Profile />

                        </ProtectedRoute>

                    }

                />

                <Route

                    path="/profile/:userId"

                    element={

                        <ProtectedRoute>

                            <UserProfile />

                        </ProtectedRoute>

                    }

                />

                <Route

                    path="/search"

                    element={

                        <ProtectedRoute>

                            <Search />

                        </ProtectedRoute>

                    }

                />

                <Route

                    path="/saved"

                    element={

                        <ProtectedRoute>

                            <SavedPosts />

                        </ProtectedRoute>

                    }

                />

                <Route

                    path="/notifications"

                    element={

                        <ProtectedRoute>

                            <Notifications />

                        </ProtectedRoute>

                    }

                />

                <Route

                    path="/post/:id"

                    element={

                        <ProtectedRoute>

                            <SinglePost />

                        </ProtectedRoute>

                    }

                />

            </Routes>

        </div>

    );

}

export default AppRoutes;