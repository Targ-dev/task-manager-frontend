import { Link } from "react-router-dom"
import logo from "../assets/logo.png"

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow">
        <div className="flex items-center justify-between px-4 md:px-20">
            <div className="flex items-center">
                <img src={logo} className="w-12 md:w-15" />
                <div className="text-2xl md:text-3xl font-bold">Listify</div>
            </div>
            <div className="flex items-center py-5 text-sm space-x-2 md:space-x-10">
                <Link>About us</Link>
                <Link>Contact us</Link>
            </div>
        </div>
        </nav>
    )
}

export default Navbar;