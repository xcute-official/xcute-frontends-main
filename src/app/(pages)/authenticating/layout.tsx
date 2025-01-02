import React from "react";

const layout = ({children}:{children: React.ReactNode;}) => {
  return (
    <div className="w-full h-full">
        <div className="mt-16 w-full">
            <div className="w-fit mx-auto">
                {children}
            </div>
        </div>
    </div>
  )
};

export default layout;
