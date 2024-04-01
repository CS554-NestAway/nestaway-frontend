import React from "react";

const SearchBar = () => {
  return (
    <div className="flex bg-secondary shadow-shadow2 text-accent2 rounded-2xl gap-2 whitespace-nowrap cursor-pointer">
      <div className="flex justify-center rounded-2xl hover:bg-accent1 w-full h-full py-2 px-6">
        Destination
      </div>
      <div className="flex justify-center rounded-2xl hover:bg-accent1 w-full h-full py-2 px-6">
        Check-In
      </div>
      <div className="flex justify-center rounded-2xl hover:bg-accent1 w-full h-full py-2 px-6">
        Check-Out
      </div>
      <div className="flex justify-center rounded-2xl bg-primary text-accent1 hover:bg-action w-full h-full py-2 px-6">
        Search
      </div>
    </div>
  );
};

export default SearchBar;
