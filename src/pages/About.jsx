import { useSelector } from 'react-redux';
import { Heart } from 'lucide-react';
import styles from '../styles/about.module.css'
import logoBlack from '../assets/logo-black.png'
import logoWhite from '../assets/logo-white.png'

const InfoBox = ({ title, dataType }) => {
  const features = [
    "Drag & drop task management",
    "Real-time state management with Redux",
    "Persistent storage with localStorage",
    "Dark mode support",
    "Fully responsive design",
    "Mobile-first approach",
    "Type-safe development",
    "Modern UI components",
    "Authentication simulation",
  ];
  const heartIcon = <Heart size="18px" color='red' />;

  const technologies = [
    "React 18",
    "TypeScript",
    "Redux Toolkit",
    "React Router",
    "React DnD",
    "Tailwind CSS",
    "Shadcn/ui",
    "Lucide Icons",
    "Local Storage",
  ]

  const architectures = {
    "State Management": "Built with Redux Toolkit for predictable state management. Separate slices for tasks, authentication, and theme preferences with automatic localStorage persistence.",
    "Component Architecture": "Modular component design with clear separation of concerns. Custom hooks for Redux integration and reusable UI components built with Shadcn/ui.",
    "Responsive Design": "Mobile-first approach using Tailwind CSS with responsive grid layouts and adaptive navigation. Optimized for both desktop and mobile experiences.",
    "Drag & Drop": "Implemented with React DnD library supporting both mouse and touch interactions. Visual feedback and smooth animations enhance the user experience."
  };

  const devFocus = [
    "Complex state management with Redux Toolkit",
    "TypeScript for type safety and better developer experience",
    "Custom hooks and component composition patterns",
    "Performance optimization with React best practices",
    "Accessibility considerations and semantic HTML",
    "Clean code architecture and maintainable patterns",
  ]

  return (
    <div className={`${styles.infoBox} ${styles[`${dataType}`]}`}>
      <h3>
        {dataType === "features" && heartIcon}
        {title}
      </h3>

      {dataType === "features" &&
        <ul>
          {features.map((feature, i) => {
            return (
              <li key={i} className={styles.feature}>
                {feature}
              </li>
            )
          })}
        </ul>
      }

      {dataType === "technologies" &&
        <ul>
          {technologies.map((technology, i) => {
            return (
              <li key={i} className={styles.technology}>
                {technology}
              </li>
            )
          })}
        </ul>
      }

      {dataType === "architectures" &&
        <ul>
          {Object.entries(architectures).map(([title, description], i) => {
            return (
              <li key={i} className={styles.architecture}>
                <h4>{title}</h4>
                <p>{description}</p>
              </li>
            )
          })}
        </ul>
      }

      {dataType === "devFocus" &&
        <div>
          <p>This application demonstrates advanced React development patterns including:</p>
          <ul>
            {devFocus.map((focus, i) => {
              return (
                <li key={i} className={styles.focus}>
                  {"• "}{focus}
                </li>
              )
            })}
          </ul>
        </div>
      }
    </div>
  )
}

const About = () => {
  const theme = useSelector((state) => state.theme);

  return (
    <main className={`${styles.page} ${theme === 'dark' ? styles.darkPage : ''}`}>
      <section className={styles.header}>
        <div>
          <img src={theme === 'dark' ? logoWhite : logoBlack} alt="TaskFlow Logo" className={styles.logo} />
          <h1 className={styles.title}>TaskFlow</h1>
        </div>
        <h2>A modern task management application built with React, TypeScript, and Redux. Designed to showcase advanced frontend development skills.</h2>
      </section>

      <section className={styles.main}>
        <InfoBox title="Features" dataType="features" />
        <InfoBox title="Technology Stack" dataType="technologies" />
        <InfoBox title="Architecture & Design" dataType="architectures" />
        <InfoBox title="Development Focus" dataType="devFocus" />
      </section>

      <section className={styles.footer}>
        <hr />
        <p>Built with ❤️ as a portfolio project to showcase modern React development skills.</p>
      </section>
    </main >
  )
}

export default About