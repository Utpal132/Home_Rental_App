import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  //console.log(user);
  const [dropdownMenu, setDropdownMenu] = useState(false);
  return (
    <div className="py-[10px] px-[60px] sm:py-[10px] sm:px-5 flex justify-between items-center relative max-w-6xl mx-auto">
      <Link to={"/"}>
        <h1 className="text-slate-500 text-3xl font-bold">
          Rent
          <span className="text-slate-900">Rite</span>
        </h1>
      </Link>
      <div className="lg:flex border border-gray-500 rounded-[30px] h-[50px] px-5 gap-10 items-center">
        <input
          type="text"
          placeholder="Search..."
          className="focus:outline-none bg-transparent"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-search"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
          <path d="M21 21l-6 -6" />
        </svg>
      </div>
      <div className="flex items-center gap-5">
        {user ? (
          <Link
            to={"/create-listing"}
            className="no-underline text-slate-500 font-bold cursor-pointer hover:text-blur-500"
          >
            Become a host
          </Link>
        ) : (
          <Link
            to={"/login"}
            className="no-underline text-slate-500 font-bold cursor-pointer hover:text-blur-500"
          ></Link>
        )}
        <button
          onClick={() => setDropdownMenu(!dropdownMenu)}
          className="h-[50px] flex items-center px-[10px] border border-gray-500 rounded-[30px] gap-2.5 bg-white cursor-pointer hover:shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 6l16 0" />
            <path d="M4 12l16 0" />
            <path d="M4 18l16 0" />
          </svg>
          {!user ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-user"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
              <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
            </svg>
          ) : (
            <img
              src={`http://localhost:3000/${user?.user?.profileimagePath?.replace(
                "public",
                ""
              )}`}
              alt="profile photo"
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
        </button>
        {dropdownMenu && !user && (
          <div className="absolute bg-white right-15 sm:right-5 top-20 flex flex-col w-48 p-2.5 border border-gray-300 rounded-2xl shadow-lg z-[999]">
            <Link to={"/login"}>Sign In</Link>
            <Link to={"/register"}>Sign Up</Link>
          </div>
        )}
        {dropdownMenu && user && (
          <div className="absolute bg-white right-15 sm:right-5 top-20 flex flex-col w-48 p-2.5 border border-gray-300 rounded-2xl shadow-lg z-[999]">
            <Link to={`/ ${user.user._id}/trips`}>Trip List</Link>
            <Link to={`/ ${user.user._id}/wishlist`}>Wish List</Link>
            <Link to={`/ ${user.user._id}/properties`}>Property List</Link>
            <Link to={`/ ${user.user._id}/reservations`}>Reservation List</Link>
            <Link to={"/create-listing"}>Become A Host</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
