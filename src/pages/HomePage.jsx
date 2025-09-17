import React, { useEffect, useState } from "react";
import Nav from "../component/Nav";
import Card from "../component/Card";
import { databases } from "../appwrite/services";
import { motion } from "motion/react";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_ID
        );
        if (res) {
          setPosts(res.documents);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white">
      {/* Navbar */}
      <Nav />

      {/* Page Heading */}
      <div className="text-center py-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
          Explore Blogs 🚀
        </h1>
        <p className="text-slate-300 mt-2 text-lg">
          Discover the latest posts from our community
        </p>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="flex justify-center flex-wrap gap-8 max-w-7xl mx-auto py-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-72 h-60 bg-slate-600 rounded-2xl animate-pulse"
            >
              <div className="h-40 bg-slate-500 rounded-t-2xl"></div>
              <div className="p-4 space-y-2">
                <div className="h-4 bg-slate-500 rounded w-2/3"></div>
                <div className="h-3 bg-slate-500 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Posts Grid */}
      {!loading && (
        <div className="flex justify-center mx-auto flex-wrap gap-8 max-w-7xl py-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.$id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="transition-transform"
            >
              <Card
                imageUrl={post.imageLink}
                title={post.title}
                description={post.description}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
