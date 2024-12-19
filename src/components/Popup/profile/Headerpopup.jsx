import React from "react";

const Headerpopup = ({ title }) => {
  return (
    <h2 className="text-[28px] font-semibold mb-6 border-zinc-300 border-b text-primary">
      {title}
    </h2>
  );
};

export default Headerpopup;
