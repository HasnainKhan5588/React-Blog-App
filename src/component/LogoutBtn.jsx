import React from "react";

function LogoutBtn() {
    return (
        <button
            className="bg-red-500 text-white font-medium px-4 py-2 rounded-lg shadow-md 
                 hover:bg-red-600 hover:shadow-lg active:scale-95 
                 transition duration-300 ease-in-out"
        >
            🔒 Logout
        </button>
    );
}

export default LogoutBtn;


