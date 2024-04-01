import React from "react";

const SearchBar = () => {
  return (
    <div className="flex bg-accent1 shadow-shadow2 text-accent2 rounded-full gap-2 whitespace-nowrap cursor-pointer">
      <div className="flex justify-center rounded-full hover:bg-secondary w-full h-full py-2 px-6">
        Destination
      </div>
      <div className="flex justify-center rounded-full hover:bg-secondary w-full h-full py-2 px-6">
        Check-In
      </div>
      <div className="flex justify-center rounded-full hover:bg-secondary w-full h-full py-2 px-6 ">
        Check-Out
      </div>
      <div className="flex justify-center rounded-full bg-primary text-accent1 hover:bg-action w-full h-full py-2 px-6 ">
        Search
      </div>
    </div>
  );
};

export default SearchBar;
