import React, { useState } from "react";

function Pagination({PageProp,Goahead,Gobehind}) {
    
  return (
    <div className="flex justify-center ">
      <button class="p-2 border-2 rounded-l-md border-gray-400 hover:bg-green-300 " onClick={Gobehind}>
        -
      </button>
      <button class="p-2 border-2 border-gray-400">
        {PageProp}
      </button>
      <button class="p-2 border-2 rounded-r-md border-gray-400 hover:bg-green-300 "onClick={Goahead}>
        +
      </button>
    </div>
  );
}

export default Pagination;
