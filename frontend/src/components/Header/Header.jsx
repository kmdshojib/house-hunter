import React from 'react'

const Header = () => {
  return (
    <div className="navbar bg-base-100 border-b border-gray-300 shadow-md">
      <div className="navbar-start">

        <a className="btn btn-ghost normal-case text-xl">House Hunter</a>
      </div>
      <div className="navbar-end">
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a>Item 1</a></li>
            <li tabIndex={0}>
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 absolute right-3">
            <li><a>Item 1</a></li>
            <hr />
            <li><a>Item 3</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header