import React from "react";
import { Link, useLocation } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";

function Nav() {
    const location = useLocation();

    const linkClasses = (path) =>
        `relative text-lg font-medium transition-all duration-300 ${location.pathname === path
            ? "text-green-600 after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-green-600 after:rounded"
            : "text-gray-600 hover:text-green-600"
        }`;

    return (
        <nav className="bg-white shadow-md sticky w-full top-0 z-50">
            <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
                {/* Logo / Brand */}
                <h2 className="text-2xl font-extrabold text-green-600 tracking-wide">
                    BlogApp
                </h2>

                {/* Nav Links */}
                <ul className="flex gap-8 items-center">
                    <Link to="/" className={linkClasses("/")}>
                        Home
                    </Link>
                    <Link to="/createblog" className={linkClasses("/createblog")}>
                        Create Blog
                    </Link>
                    <Link to="/profile" className={linkClasses("/profile")}>
                        Profile
                    </Link>
                    <LogoutBtn />
                </ul>
            </div>
        </nav>
    );
}

export default Nav;
