import React, { Suspense } from "react";
import { RingLoader } from "react-spinners";

const layout = ({ children }) => {
  return (
    <div className="px-5">
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
