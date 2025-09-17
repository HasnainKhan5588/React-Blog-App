import React, { useState } from "react";
import Nav from "../component/Nav";
import { account, databases, ID } from "../appwrite/services";
import { useNavigate } from "react-router-dom";

function CreatePage() {
    const [imageURL, setImageURL] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await account.get();
            const response = await databases.createDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                ID.unique(),
                {
                    imageLink: imageURL,
                    title,
                    description,
                    author: user.$id,
                }
            );
            if (response) {
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 min-h-screen flex flex-col items-center">
            <Nav />
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-2xl w-full max-w-lg p-8 flex flex-col gap-6 mt-10"
            >
                <h2 className="font-extrabold text-3xl text-gray-700 text-center">
                    ✍️ Create Blog
                </h2>

                <input
                    type="text"
                    placeholder="Image URL"
                    value={imageURL}
                    onChange={(e) => setImageURL(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />

                <input
                    type="text"
                    placeholder="Blog Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />

                <textarea
                    rows={5}
                    placeholder="Blog Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition resize-none"
                />

                <button
                    type="submit"
                    className="p-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg transition duration-300 ease-in-out"
                >
                    🚀 Create Blog
                </button>
            </form>
        </div>
    );
}

export default CreatePage;
