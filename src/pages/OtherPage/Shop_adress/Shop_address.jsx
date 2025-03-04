import React from 'react';

const Shop_address = () => {
    const shops = [
        {
            name: "Multisports Banani Outlet",
            address: "Block-B, Road-12, Plot-15, Banani, Dhaka - 1213",
            opening: "10:00 AM to 9:00 PM (Everyday)",
            contact: "+8801234567890",
            image: "https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg"
        },
        {
            name: "Multisports Gulshan Outlet",
            address: "House-15, Road-123, Gulshan-2, Dhaka - 1212",
            opening: "10:00 AM to 9:30 PM (Everyday)",
            contact: "+8809876543210",
            image: "https://img.freepik.com/premium-photo/set-sport-equipment_1273576-6886.jpg"
        },
        {
            name: "Multisports Dhanmondi Outlet",
            address: "House-25, Road-4A, Dhanmondi, Dhaka - 1209",
            opening: "10:00 AM to 10:00 PM (Closed on Friday)",
            contact: "+8801122334455",
            image: "https://media.istockphoto.com/id/1136317339/photo/sports-equipment-on-floor.jpg?s=612x612&w=0&k=20&c=-aI8u_Se89IC-HJZYH724ei5z-bIcSvRW6qUwyMtRyE="
        },
    ];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-semibold text-center my-8">Multisports Outlets</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {shops.map((shop, index) => (
                    <div 
                        key={index} 
                        className="bg-white border rounded-lg shadow transition-all ease-in-out hover:shadow-lg"
                    >
                        <img 
                            src={shop.image} 
                            alt={shop.name} 
                            className="w-full h-72 object-cover rounded-t-lg" 
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-bold  mb-2">{shop.name}</h3>
                            <p className="text-gray-600 mb-2"><strong>Address:</strong> {shop.address}</p>
                            <p className="text-gray-600 mb-2"><strong>Opening:</strong> {shop.opening}</p>
                            <p className="text-gray-600"><strong>Contact:</strong> {shop.contact}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shop_address;
