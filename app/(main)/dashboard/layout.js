import React, { Suspense } from "react";
import { RingLoader } from "react-spinners";

const layout = ({ children }) => {
  return (
    <div className="px-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold gradient-title">Industry Insights</h1>
      </div>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <RingLoader color="white" />
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
};

export default layout;
