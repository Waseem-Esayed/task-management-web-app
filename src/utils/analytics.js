import ReactGA from "react-ga4";

export const initGA = () => ReactGA.initialize("G-9RT4QB5DP3");
export const logPageView = (path) =>
  ReactGA.send({ hitType: "pageview", page: path });
