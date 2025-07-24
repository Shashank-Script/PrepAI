import React, { Suspense } from "react";
import { RingLoader } from "react-spinners";

const layout = ({ children }) => {
  return (
    <div className="px-5">
      <Suspense
        fallback={<RingLoader className="mt-4" width={"100%"} color="gray" />}
      >
        {children}
      </Suspense>
    </div>
  );
};

export default layout;
