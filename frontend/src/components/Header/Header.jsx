import { Link } from "react-router-dom"


const Header = () => {
  return (
    <div className="navbar bg-base-100 border-b border-gray-300 shadow-md">
      <div className="navbar-start">

        <Link to="/" className="btn btn-ghost normal-case text-xl">House Hunter</Link>
      </div>
      <div className="navbar-end">
        <div className="hidden lg:flex mr-5">
          <ul className="menu menu-horizontal px-1">
            <li><Link>Item 1</Link></li>
            <li><Link>Item 3</Link></li>
          </ul>
          <Link to="/signup" className='btn btn-primary btn-md'>Sign Up</Link>
        </div>
        {/* mobile header */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 absolute right-3">
            <li><Link>Item 1</Link></li>
            <hr />
            <li><Link>Item 3</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header