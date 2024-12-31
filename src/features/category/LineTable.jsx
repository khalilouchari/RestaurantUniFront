import React from "react";

function LineTable({ category, editFun, deleteFun }) {
  return (
    <tr className="bg-white border-b ">
      <th scope="row" className="px-6  ">
        <img
          className="w-10 rounded-full object-cover border-4 border-black"
          src={
            `http://localhost:8000/${
              category?.image?.startsWith("category") ? "categories" : "brands"
            }/` + category?.image
          }
        />
      </th>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
        {category?.name?.slice(0, 16)}
        {category?.name?.length > 16 ? "..." : ""}
      </th>
      <td className="px-6 py-4 truncate w-20  h-10">
        {category?.slug?.slice(0, 16)}{" "}
        {category?.slug?.length > 16 ? "..." : ""}
      </td>

      <td className="px-6 py-4"> {category?.createdAt?.slice(0, 10)}</td>
      <td className="px-6 py-4 flex space-x-3">
        <button onClick={editFun}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </button>
        <button onClick={deleteFun}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>{" "}
      </td>
    </tr>
  );
}

export default LineTable;
