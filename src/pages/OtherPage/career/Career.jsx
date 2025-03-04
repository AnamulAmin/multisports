import React from "react";

const Career = () => {
    return (
        <div className="relative max-w-[90%] md:max-w-[1440px] mx-auto">
            <p className="text-center text-3xl md:text-6xl my-4 md:my-8 mb-6 md:mb-12 font-bold">Career</p>
            {/* Background Image with Overlay */}
            <div 
                className="relative h-44 md:h-96 w-full bg-cover bg-center" 
                style={{ backgroundImage: `url('https://image-service.usw2.wp-prod-us.cultureamp-cdn.com/apTK0trLZZ5SWeRWWQnj9sqCSIE=/1440x0/cultureampcom/production/a18/2b0/f9f/a182b0f9feb6db1aabdb472f/blog-career-pathing.png')` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start">
                    <h1 className="text-2xl md:text-8xl font-bold text-white md:mb-2 ml-7 md:ml-44">JOIN US</h1>
                    <p className="text-sm md:text-3xl tracking-widest text-gray-200 ml-7 md:ml-44">BUILD YOUR EPIC CAREER</p>
                </div>
            </div>

            {/* Description Section */}
            <div className="">
                <p className="text-gray-700 md:text-lg mt-5 md:mt-10 leading-relaxed">
                    We believe in the possibilities and encourage the creativity of individuals providing a space to grow and develop themselves. As one of the prominent fashion retail brands in Bangladesh, we believe in creating platforms and engaging work culture, which is committed to the growth and development of professionally and personally. SaRa presents numerous opportunities in Fashion Designing, Fashion Marketing, Fashion Retailing, Fashion Merchandising, Sourcing, Supply Chain, Sales & Distribution, Operation, Human Resource Management, Information technology, Finance & Accounts, etc.
                </p>
            </div>

            {/* Job Vacancy Section */}
            
                <h2 className="text-2xl md:text-5xl font-bold mt-3 md:mt-9 text-gray-800">Job Vacancy</h2>
                <p className="text-red-500 mt-6 md:mt-8 italic font-bold text-center md:text-3xl text-xl">No Circular Found</p>
        </div>
    );
};

export default Career;
