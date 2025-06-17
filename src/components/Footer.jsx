import React from "react";

const Footer = () => {
  return (
    <div className="">
      <div className="bg-slate-700 text-white flex justify-around items-center p-2 mt-5 "> 
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-400">&lt;</span>
          <span className="text-4xl">Pass</span>
          <span className="text-green-400 text-3xl">Man/&gt;</span>
        </h1>
        <div>created by <span className="font-bold text-lg">Anurag Tyagi </span></div>
      </div>
    </div>
  );
};

export default Footer;
