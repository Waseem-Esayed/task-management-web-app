import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import styles from '../styles/navbar.module.css'
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from '../features/theme/themeSlice'
import { logout } from '../features/auth/authSlice'
import { Sun, Moon, User, ArrowRightFromLine } from "lucide-react";
import logoBlack from '../assets/logo-black.png'
import logoWhite from '../assets/logo-white.png'

const NavBtn = ({ text, end, to }) => {
  const location = useLocation();

  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => {
        const isRoot = location.pathname === "/" && to === "/home";
        return `${styles.navLink} ${(isActive || isRoot) ? styles.active : ""}`;
      }}
    >
      {text}
    </NavLink>
  )
}

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isDemo = useSelector((state) => state.auth.isDemo);
  const theme = useSelector((state) => state.theme.theme);
  const username = useSelector((state) => state.auth.username)

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  }

  const handleLogout = () => {
    dispatch(logout())
    if (!location.pathname.startsWith("/dashboard")) {
      navigate("/home")
    }
  }

  return (
    <header className={`${styles.header} ${theme === 'dark' ? styles.darkHeader : ''}`}>
      <div className={styles.nav}>
        <nav>
          <NavLink to='/home' className={styles.logoContainer}>
            <img src={theme === 'dark' ? logoWhite : logoBlack} alt="TaskFlow Logo" className={styles.logo} />
            <span className={styles.title}>TaskFlow</span>
          </NavLink>
        </nav>
        <nav className={styles.navLinkContainer}>
          <NavBtn text='Home' to='/home' end />
          {(isLoggedIn || isDemo) && <NavBtn text='Dashboard' to='/dashboard' />}
          <NavBtn text='About' to='/about' />
        </nav>
      </div>

      <div className={styles.rightSide}>
        <button className={styles.themeBtn} onClick={handleToggleTheme}>
          {theme === 'dark' ? <Sun className={styles.themeIcon} /> : <Moon className={styles.themeIcon} />
          }
        </button>
        {!(isLoggedIn || isDemo) &&
          <Link to='/auth' className={styles.loginBtn}>
            Login
          </Link>
        }
        {(isLoggedIn || isDemo) &&
          <>
            <div className={styles.demoContainer}>
              <User className={styles.demoIcon} />
              {username}
            </div>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              <ArrowRightFromLine className={styles.logoutIcon} />
              <span>Logout</span>
            </button>
          </>
        }
      </div>
    </header>
  )
}

export default Navbar;