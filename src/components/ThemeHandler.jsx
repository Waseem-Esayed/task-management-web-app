import { useSelector } from "react-redux";
import { useEffect } from "react";

function ThemeHandler() {
  const theme = useSelector((state) => state.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return null;
}

export default ThemeHandler;
