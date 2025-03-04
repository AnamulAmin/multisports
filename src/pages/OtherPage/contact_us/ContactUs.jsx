import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import axios from 'axios'; // Assuming you're using Axios for HTTP requests
import Swal from 'sweetalert2'; // Import SweetAlert2
import useAxiosSecure from '../../../Hook/useAxiosSecure';

const ContactUs = () => {
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '', // Changed from subject to company
        message: ''
    });

    const [status, setStatus] = useState(''); // To handle success or error messages

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const response = await axiosSecure.post('contact-requests/post', formData);
            setStatus('Message sent successfully!'); // Success message
            setFormData({
                name: '',
                email: '',
                phone: '',
                company: '', // Reset the company field
                message: ''
            });

            // Show success SweetAlert
            Swal.fire({
                title: 'Success!',
                text: 'Your message has been sent successfully.',
                icon: 'success',
                confirmButtonText: 'OK',
            });
        } catch (error) {
            setStatus('Failed to send message. Please try again later.'); // Error message

            // Show error SweetAlert
            Swal.fire({
                title: 'Error!',
                text: 'Failed to send the message. Please try again.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="">
            <div
                className="relative h-44 md:h-60 w-full bg-cover bg-center"
                style={{ backgroundImage: `url('https://gamcaslip.com/wp-content/uploads/2022/05/gamca-medical-slip-contat-us.jpg')` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center">
                    <h1 className="text-2xl md:text-8xl font-bold text-white md:mb-4">Contact Us</h1>
                    <p className="text-sm md:text-3xl tracking-widest text-gray-200">Don't hesitate to ask !</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-4 py-8 mt-5 w-[90%] md:max-w-[1440px] mx-auto">
                {/* Left Section */}
                <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-4">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Get In Touch</h2>
                    <p className=" mb-6">
                        We look forward to hearing from you. Our support team is always ready to chat. We eagerly anticipate the opportunity to assist you and welcome any communication from your end.
                    </p>
                    <div className="mb-4">
                        <h3 className="text-xl mb-4 font-semibold ">Corporate Office</h3>
                        <p className="flex items-center ">
                            <FaMapMarkerAlt className="text-blue-500 mr-2" /> 24, 3 Tajmahal Rd, Dhaka 1207
                            info@multisports.com.bd
                        </p>
                        <p className="flex items-center  mt-2">
                            <FaPhoneAlt className="text-blue-500 mr-2" /> +88-01313-197426
                        </p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-xl mb-4 font-semibold ">Customer Service</h3>
                        <p className="flex items-center ">
                            <FaEnvelope className="text-blue-500 mr-2" /> support@multisports.com
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl mb-4 font-semibold ">Vendor Support</h3>
                        <p className="flex items-center ">
                            <FaEnvelope className="text-blue-500 mr-2" /> operation@multisports.com
                        </p>
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-full md:w-1/2 bg-white p-6 rounded-lg border shadow">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="text"
                                required
                                name="name"
                                value={formData.name}
                                placeholder="Enter Your Name"
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-gray-400"
                            />
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                placeholder="Enter Your Email"
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-gray-400"
                            />
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                required
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                placeholder="Enter Your Phone Number"
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-gray-400"
                            />
                        </div>
                        {/* Changed subject to company */}
                        <input
                            type="text"
                            required
                            name="company"
                            value={formData.company}
                            placeholder="Enter Your Company Name"
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-gray-400"
                        />
                        <textarea
                            name="message"
                            required
                            value={formData.message}
                            placeholder="Write Your Message"
                            onChange={handleInputChange}
                            rows="4"
                            className="resize-none w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-gray-400"
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2"
                            disabled={loading} // Disable the button when loading
                        >
                            {loading ? (
                                <span className="loading loading-spinner text-white"></span> // DaisyUI loading spinner
                            ) : (
                                "SEND"
                            )}
                        </button>

                    </form>
                    {status && (
                        <div className={`mt-4 text-center ${status.includes('success') ? 'text-blue-500' : 'text-red-500'}`}>
                            {status}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
