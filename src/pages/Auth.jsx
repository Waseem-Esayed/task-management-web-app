import styles from '../styles/auth.module.css'
import logoBlack from '../assets/logo-black.png'
import logoWhite from '../assets/logo-white.png'
import { useDispatch, useSelector } from 'react-redux';
import { User } from 'lucide-react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { setAuth, setDemo } from '../features/auth/authSlice'

const Auth = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const [currentValue, setCurrentValue] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleChange = (e) => {
    setCurrentValue(e.target.value);
  }

  const handleDemo = (e) => {
    e.preventDefault();
    dispatch(setDemo());
    setRedirect(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const cleanValue = currentValue.trim();
    if (!cleanValue) return;
    setCurrentValue(cleanValue);
    dispatch(setAuth(true, currentValue))
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <main className={`${styles.section} ${theme === 'dark' ? styles.darkPage : ''}`}>
        <header className={styles.header}>
          <img
            src={theme === 'dark' ? logoWhite : logoBlack}
            alt="TaskFlow Logo"
            className={styles.logo}
          />
          <h1 className={styles.title}>TaskFlow</h1>
        </header>

        <p className={styles.instruction}>
          Sign in to access your task dashboard
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.welcome}>
            <i className="fa-solid fa-arrow-right-to-bracket"></i>
            Welcome Back
          </h2>

          <div className={styles.labelWrapper}>
            <label htmlFor="username">Username</label>
          </div>
          <div className={styles.inputWrapper}>
            <User />
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              autoComplete="new-password"
              value={currentValue}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className={`${styles.signInBtn} ${currentValue.trim() ? styles.signInBtnAvailable : ''}`} disabled={!currentValue.trim()}>
            Sign In
          </button>

          <p className={styles.orText}>OR TRY DEMO</p>

          <button type="button" className={styles.demoBtn} onClick={handleDemo}>
            <User />
            Demo Login
          </button>

          <aside className={styles.demoInfo}>
            <h3>Demo Information:</h3>
            <ul>
              <li>No password required - this is a mock authentication</li>
              <li>Your data persists in browser localStorage</li>
              <li>Try creating, editing, and dragging tasks</li>
              <li>Toggle dark mode with the theme switcher</li>
            </ul>
          </aside>
        </form>

        <footer className={styles.note}>
          <p>
            This is a demo application for portfolio purposes.<br />
            No real authentication or data collection occurs.
          </p>
        </footer>
      </main>
    </>
  );
}

export default Auth;
