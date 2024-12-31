import React from "react";
import { Link } from "react-router-dom";

function CardCategory({ category }) {
  return (
    <Link
      to={"/subcategories/" + category?._id}
      className="w-full h-36 relative     bg-white shadow-sm rounded flex flex-col justify-end items-center pb-4 duration-200 cursor-pointer hover:scale-[1.1]">
      <img
        className="w-24 bg-black rounded-xl absolute -top-6  object-cover outline-4 outline-black p-0.5 shadow-md"
        src={`http://localhost:8000/categories/` + category?.image}
      />
      <h2> {category?.name}</h2>
    </Link>
  );
}

export default CardCategory;
