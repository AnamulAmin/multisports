import React from "react";
import { Link } from "react-router-dom";
import CustomImage from "../../ImageComponents/CustomImage";

// Utility function to strip HTML tags
const stripHtml = (html) => {
    let doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
};

export default function BlogCard({ data }) {
    const { title, blogCategory, image, shortDescription, _id } = data;
    const cleanDescription = stripHtml(shortDescription);

    return (
        <Link to={`/blog/${_id}`} className="border text-black poppins rounded-md hover:shadow">
            <div className="rounded-t h-48 w-full">
                <CustomImage
                    imageKey={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-3 flex flex-col justify-around gap-3">
                <p className="text-sm font-normal">{blogCategory}</p>
                <div className="flex flex-col gap-2">
                    <Link
                        to={`/blog/${_id}`}
                        className="text-base font-medium hover:text-gray-700 cursor-pointer"
                    >
                        {title}
                    </Link>
                    <p className="text-sm">
                        {cleanDescription.length > 120
                            ? `${cleanDescription.slice(0, 120)} ...`
                            : cleanDescription}{" "}
                    </p>
                </div>
            </div>
        </Link>
    );
}
