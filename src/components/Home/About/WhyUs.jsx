import React from 'react';
import { FaShippingFast, FaShieldAlt, FaHeadset, FaTags } from 'react-icons/fa';

const WhyUs = () => {
    const features = [
        {
            title: 'Fast Delivery',
            description: 'We guarantee rapid delivery of your order.',
            icon: <FaShippingFast className="text-white text-3xl" />,
            bgColor: 'bg-blue-500'
        },
        {
            title: 'Authentic Product',
            description: 'Experience genuine quality with our authentic products.',
            icon: <FaTags className="text-white text-3xl" />,
            bgColor: 'bg-pink-500'
        },
        {
            title: 'Secure Payment',
            description: 'Guaranteed secure payments for peace of mind.',
            icon: <FaShieldAlt className="text-white text-3xl" />,
            bgColor: 'bg-purple-500'
        },
        {
            title: 'Customer Support',
            description: '24/7 accessible customer support for all your needs.',
            icon: <FaHeadset className="text-white text-3xl" />,
            bgColor: 'bg-orange-500'
        }
    ];

    return (
        <div className="text-black max-w-[1440px] mx-auto py-10 mt-6 px-4">
            <div className='flex justify-center'>
            <h2 className="text-center text-3xl font-bold mb-12 border-b pb-2 border-gray-200 max-w-fit">Why Choose Us</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="flex flex-col hover:shadow-lg transition-all ease-in-out cursor-pointer items-center bg-white shadow rounded-lg p-6"
                    >
                        <div className={`w-16 h-16 flex items-center justify-center rounded-full mb-4 ${feature.bgColor}`}>
                            {feature.icon}
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-600 text-center">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhyUs;
