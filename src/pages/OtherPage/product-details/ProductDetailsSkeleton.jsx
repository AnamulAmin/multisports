import React from 'react';

const ProductDetailsSkeleton = () => {
    return (
        <section class="flex flex-col md:flex-row">
            
            <div class="w-full p-10">
                
                <div class="w-full h-96 lg:h-[500px] bg-gray-200 rounded-lg skeleton"></div>

                
                <div class="grid grid-cols-4 gap-3 mt-5">
                    <div class="w-full h-24 bg-gray-200 rounded-lg skeleton"></div>
                    <div class="w-full h-24 bg-gray-200 rounded-lg skeleton"></div>
                    <div class="w-full h-24 bg-gray-200 rounded-lg skeleton"></div>
                    <div class="w-full h-24 bg-gray-200 rounded-lg skeleton"></div>
                </div>
            </div>

            
            <div class="w-full p-10">
                
                <div class="h-8 w-3/4 bg-gray-200 rounded-md skeleton mb-4"></div>

                
                <div class="space-y-3">
                    <div class="h-4 w-full bg-gray-200 rounded-md skeleton"></div>
                    <div class="h-4 w-5/6 bg-gray-200 rounded-md skeleton"></div>
                    <div class="h-4 w-2/3 bg-gray-200 rounded-md skeleton"></div>
                </div>

                
                <div class="flex items-center gap-6 my-5">
                    <div class="h-8 w-32 bg-gray-200 rounded-md skeleton"></div>
                    <div class="h-6 w-20 bg-gray-200 rounded-md skeleton"></div>
                </div>

                
                <div class="border-b w-full"></div>

                
                <div class="mt-5">
                    <div class="h-6 w-20 bg-gray-200 rounded-md skeleton mb-2"></div>
                    <div class="flex gap-2">
                        <div class="w-10 h-10 bg-gray-200 rounded-lg skeleton"></div>
                        <div class="w-10 h-10 bg-gray-200 rounded-lg skeleton"></div>
                        <div class="w-10 h-10 bg-gray-200 rounded-lg skeleton"></div>
                    </div>
                </div>

                
                <div class="mt-5">
                    <div class="h-6 w-20 bg-gray-200 rounded-md skeleton mb-2"></div>
                    <div class="flex gap-5">
                        <div class="w-8 h-8 bg-gray-200 rounded-md skeleton"></div>
                        <div class="w-8 h-8 bg-gray-200 rounded-md skeleton"></div>
                        <div class="w-8 h-8 bg-gray-200 rounded-md skeleton"></div>
                    </div>
                </div>

                
                <div class="border-b w-full my-6"></div>

                
                <div class="flex flex-col gap-4 mb-4">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-gray-200 rounded-lg skeleton"></div>
                        <div class="w-20 h-12 bg-gray-200 rounded-md skeleton"></div>
                        <div class="w-12 h-12 bg-gray-200 rounded-lg skeleton"></div>
                    </div>
                    <div class="w-full h-12 bg-gray-200 rounded-lg skeleton"></div>
                </div>

               
                <div class="border-b w-full my-6"></div>

              
                <div class="space-y-3">
                    <div class="h-4 w-1/2 bg-gray-200 rounded-md skeleton"></div>
                    <div class="h-4 w-1/3 bg-gray-200 rounded-md skeleton"></div>
                </div>

               
                <div class="my-5 space-y-3">
                    <div class="h-10 w-full bg-gray-200 rounded-md skeleton"></div>
                    <div class="h-10 w-full bg-gray-200 rounded-md skeleton"></div>
                    <div class="h-10 w-full bg-gray-200 rounded-md skeleton"></div>
                </div>
            </div>
        </section>

    );
};

export default ProductDetailsSkeleton;