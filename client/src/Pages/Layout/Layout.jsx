import { Outlet, Link } from "react-router-dom";
import FilterSort from "../../Components/FilterSort";
import LoginForm from "../../Components/LoginForm";

import "./Layout.css"

const Layout = () => {

    return (
        <div className="Layout">
            <header>
                <div className="header-container">
                    <img src="/img/book-logo.png" alt="book logo" className="logo" />
                    <FilterSort />
                    <LoginForm />
                </div>
            </header>
            <div className="container">
                <nav>
                    <ul className="nav-menu">
                        <li>
                            <Link to='/' className="link">Home</Link>
                        </li>
                        <li>
                            <Link to='/favorites' className="link">Favorites</Link>
                        </li>
                        <li>
                            <Link to='/books' className="link">Books</Link>
                        </li>
                        <li>
                            <Link to='/authors' className="link">Authors</Link>
                        </li>
                        <li>
                            <Link to='/genres' className="link">Genres</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="outlet">
                <Outlet />
            </div>
            <footer>
                <span className="copyright">© Akos Kft. Minden jog fenntartva! Mert én az mondtam!</span>
            </footer>
        </div>
    );
};


export default Layout;