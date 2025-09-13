import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Users, Zap, Shield } from 'lucide-react';
import styles from '../styles/home.module.css'
import logoBlack from '../assets/logo-black.png'
import logoWhite from '../assets/logo-white.png'

const FeatureCard = ({ title, description, imgSrc, icon }) => {
  return (
    <div className={styles.featureCard}>
      <div className={styles.iconContainer}>
        {imgSrc && <img src={imgSrc} alt={title} />}
        {icon}
      </div>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  )
}

const Home = () => {
  const theme = useSelector((state) => state.theme.theme);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isDemo = useSelector((state) => state.auth.isDemo);

  return (
    <main className={`${styles.main} ${theme === 'dark' ? styles.darkPage : ''}`}>
      <section className={styles.landingSection}>
        <h1>Organize Your Work<br />Get Things Done</h1>
        <h3>TaskFlow helps you manage projects, track progress, and collaborate with your team. Simple, powerful, and built for modern workflows.</h3>
        <nav>
          <NavLink to={(isLoggedIn || isDemo) ? "/dashboard" : "/auth"} className={styles.dashboardOrAuthBtn}>
            {(isLoggedIn || isDemo) ? "Go To Dashboard" : "Get Started"}
            <ArrowRight size="1.05rem" />
          </NavLink>
          <NavLink to='/about' className={styles.learnMoreBtn}>Learn More</NavLink>
        </nav>
      </section>

      <section className={styles.featuresSection}>
        <div className={styles.h2_h3_Wrapper}>
          <h2>Everything you need to stay organized</h2>
          <h3>Powerful features designed to help you and your team work more efficiently.</h3>
        </div>
        <div className={styles.featuresContainer}>
          <FeatureCard
            title="Task Management"
            description="Create, organize, and track your tasks with an intuitive drag-and-drop interface."
            imgSrc={theme === 'dark' ? logoWhite : logoBlack}
          />
          <FeatureCard
            title="Team Collaboration"
            description="Work together seamlessly with shared boards and real-time updates."
            icon={<Users />}
          />
          <FeatureCard
            title="Boost Productivity"
            description="Stay focused and get more done with our streamlined workflow tools."
            icon={<Zap />}
          />
          <FeatureCard
            title="Secure & Reliable"
            description="Your data is safe with us. Built with modern security best practices."
            icon={<Shield />}
          />
        </div>
      </section>

      <section className={styles.messageSection}>
        <h2>Ready to boost your productivity?</h2>
        <h3>Join thousands of teams already using TaskFlow to get things done.</h3>
        {(!isLoggedIn && !isDemo) &&
          <nav>
            <NavLink to="/auth" className={styles.startForFreeBtn}>
              Start For Free
              <ArrowRight size="1.05rem" />
            </NavLink>
          </nav>
        }
      </section>
    </main>
  )
}

export default Home