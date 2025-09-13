import { useSelector } from 'react-redux';
import styles from '../styles/notFound.module.css'
import { Search, CircleAlert, House, ArrowLeft } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const theme = useSelector((state) => state.theme.theme);
  const navigate = useNavigate();

  return (
    <main className={`${styles.main} ${theme === 'dark' ? styles.darkPage : ''}`}>
      <div className={styles.container}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subTitle}>Page Not Found</h2>
        <h3 className={styles.description}>The Page you are looking for does not exist or has been removed.</h3>
        <div className={styles.iconsContainer}>
          <Search size="100%" />
          <CircleAlert />
        </div>
        <NavLink className={styles.goHomeBtn} to="/home" replace>
          <House size="1rem" />
          Go Home
        </NavLink>
        <button className={styles.goBackBtn} onClick={() => navigate(-1, { replace: true })}>
          <ArrowLeft size="1rem" />
          Go Back
        </button>
        <div className={styles.commonPagesContainer}>
          <p>Common Pages:</p>
          <div>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/auth">Login</NavLink>
          </div>
        </div>
      </div>
    </main>
  )
}

export default NotFound