import React from "react"

export const Error404: React.FC = () => {
    return (
        <div className="flex justify-center items-center flex-col align-middle h-[100vh]">
            <span className="font-black text-9xl text-gray-600">404</span>
            <span className="text-md text-black">I could not find that page.</span>
        </div>
    );
}

export default Error404;
