const ProductSkeleton = ({ skeletons = 8 }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {Array.from({ length: skeletons }).map((_, index) => (
                <div
                    key={index}
                    className="bg-white rounded-lg overflow-hidden animate-pulse"
                >
                    {/* Image Placeholder */}
                    <div className="h-40 md:h-80 bg-gray-200 rounded"></div>

                    {/* Content Placeholder */}
                    <div className="p-4">
                        {/* Title */}
                        <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
                        <div className="h-4 bg-gray-300 rounded mb-4 w-1/2"></div>

                        {/* Description */}
                        <div className="h-3 bg-gray-200 rounded mb-2 w-full"></div>
                        <div className="h-3 bg-gray-200 rounded mb-2 w-5/6"></div>

                        {/* Price */}
                        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};


export default ProductSkeleton;
