import React from "react";

export default function Pagination({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="py-2 text-white justify-center flex w-full">
      <div>
        <p className="text-sm text-gray-700">
          Showing
          <span className="font-medium">
            {" "}
            {currentPage * postsPerPage - 6}{" "}
          </span>
          to
          <span className="font-medium"> {currentPage * postsPerPage} </span>
          of
          <span className="font-medium"> {totalPosts} </span>
          results
        </p>
        <nav className="block ">
          <ul className="flex pl-7 rounded list-none flex-wrap">
            <li>
              {pageNumbers.map((number) => (
                <a
                  onClick={() => {
                    paginate(number);
                  }}
                  href="#"
                  className={
                    currentPage === number
                      ? " bg-pink-600 border-red-300  text-gray-500  hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                      : "bg-blue border-gray-300  text-red-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  }
                >
                  {number}
                </a>
              ))}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
