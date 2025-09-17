import React, { useEffect, useState } from "react";
import Nav from "../component/Nav";
import { account, databases } from "../appwrite/services";
import { Query } from "appwrite";
import Card from "../component/Card";

function ProfilePage() {
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchUserData() {
        try {
            let result = await account.get();
            if (result) {
                setUser(result);
                const res = await databases.listDocuments(
                    import.meta.env.VITE_APPWRITE_DATABASE_ID,
                    import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                    [Query.equal("author", result.$id)]
                );
                setBlogs(res.documents);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className="bg-gradient-to-br from-slate-500 via-slate-600 to-slate-800 min-h-screen text-white">
            <Nav />
            <div className="flex justify-center items-center px-4 py-10">
                {loading ? (
                    // Skeleton Loader
                    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 animate-pulse">
                        <div className="h-20 w-20 rounded-full bg-slate-300 mx-auto mb-4"></div>
                        <div className="h-6 bg-slate-300 rounded w-1/2 mx-auto mb-2"></div>
                        <div className="h-4 bg-slate-300 rounded w-3/4 mx-auto"></div>
                    </div>
                ) : user ? (
                    <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 text-gray-800 transition transform hover:scale-105">
                        {/* Avatar */}
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-md">
                            {user.name.charAt(0).toUpperCase()}
                        </div>

                        {/* User Info */}
                        <h2 className="text-2xl font-extrabold text-gray-900 text-center">
                            {user.name}
                        </h2>
                        <p className="text-gray-600 mb-6 text-center">{user.email}</p>

                        {/* Blogs */}
                        {blogs.length > 0 ? (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    My Blogs
                                </h3>
                                <div className="grid gap-6 sm:grid-cols-2">
                                    {blogs.map((blog) => (
                                        <Card
                                            key={blog.$id}
                                            imageUrl={blog.imageLink}
                                            title={blog.title}
                                            description={blog.description}
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p className="mt-6 text-gray-500 text-center">No blogs yet.</p>
                        )}
                    </div>
                ) : (
                    <p className="text-gray-200">Failed to load user.</p>
                )}
            </div>
        </div>
    );
}

export default ProfilePage;
