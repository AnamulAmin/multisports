import React from "react";

const TableSkeleton = () => {
    return (
        <div className="overflow-x-auto w-full border rounded-xl p-3">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>
                            <div className="w-24 h-6 bg-gray-300 rounded animate-pulse"></div>
                        </th>
                        <th>
                            <div className="w-24 h-6 bg-gray-300 rounded animate-pulse"></div>
                        </th>
                        <th>
                            <div className="w-24 h-6 bg-gray-300 rounded animate-pulse"></div>
                        </th>
                        <th>
                            <div className="w-24 h-6 bg-gray-300 rounded animate-pulse"></div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <tr key={index}>
                            
                            <td>
                                <div className="w-24 h-6 bg-gray-300 rounded animate-pulse"></div>
                            </td>
                            <td>
                                <div className="w-24 h-6 bg-gray-300 rounded animate-pulse"></div>
                            </td>
                            <td>
                                <div className="w-24 h-6 bg-gray-300 rounded animate-pulse"></div>
                            </td>
                            <td>
                                <div className="w-24 h-6 bg-gray-300 rounded animate-pulse"></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableSkeleton;
