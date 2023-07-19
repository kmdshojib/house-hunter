import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { logout } from "../../features/auth/authSlice";



const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogOut = () => {
    localStorage.removeItem("token")
    dispatch(logout())

    navigate("/")
  }
  return (
    <div className="navbar bg-base-100 border-b border-gray-300 shadow-md">
      <div className="navbar-start">

        <Link to="/" className="btn btn-ghost normal-case text-xl">House Hunter</Link>
      </div>
      <div className="navbar-end">
        <div className="hidden lg:flex mr-5">
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
          </ul>
          {
            !user ? <>
              <Link to="/signup" className='btn btn-primary btn-md mr-3'>Sign Up</Link>
              <Link to="/signin" className='btn btn-primary btn-md'>Sign In</Link>
            </> : <Link onClick={handleLogOut} className='btn btn-primary btn-md'>Log Out</Link>
          }
        </div>
        {/* mobile header */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 absolute right-3">
            <li><Link to="/">Home</Link></li>
            <hr />
            <li><Link to="/dashboard">Dashboard</Link></li>
            <hr />
            {
              !user ? <>
                <li><Link to="/signup" className='btn btn-primary text-sm btn-sm mb-3 mt-3'>Sign Up</Link></li>
                <hr />
                <li>  <Link to="/signin" className='btn btn-primary text-sm btn-sm mb-3 mt-3'>Sign In</Link></li>
              </> : <li><Link onClick={handleLogOut} className='btn btn-primary text-sm btn-sm mb-3 mt-3'>Log Out</Link></li>
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header