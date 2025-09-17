import React from "react";

function Card({ imageUrl, title, description }) {
    return (
        <div
            className="w-[300px] bg-white rounded-2xl shadow-md hover:shadow-xl 
                 transition duration-300 ease-in-out overflow-hidden group"
        >
            {/* Image */}
            <div className="w-full h-[180px] overflow-hidden">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 
                     transition-transform duration-500 ease-in-out"
                />
            </div>

            {/* Content */}
            <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                    {title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {description}
                </p>
            </div>
        </div>
    );
}

export default Card;
