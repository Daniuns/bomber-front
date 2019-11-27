import React, { useEffect } from "react";
import logo from "./logo.svg";
import { makeStyles } from "@material-ui/core/styles";
import testService from "./services/TestService";
const useStyles = makeStyles({
  root: {
    textAlign: "center"
  },

  appLogo: {
    height: "40vmin"
  },

  appHeader: {
    backgroundColor: "#282c34",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
    color: "white"
  },

  appLink: {
    color: "#09d3ac"
  }
});

const App: React.FC = () => {
  const classes = useStyles();
  useEffect(() => {
    testService.getMethodTest(12).subscribe(a => console.log("getMessage", a));

    testService.postMethodTest().subscribe(a => console.log("postMessage", a));

    testService
      .deleteMethodTest(14)
      .subscribe(v => console.log("DeleteMessage:", v));
  }, []);

  return (
    <div className={`${classes.root}`}>
      <header className={`${classes.appHeader}`}>
        <img src={logo} className={`${classes.appLogo}`} alt="logo" />
        <p>
          Read <code>README.md</code> to more informations.
        </p>
        <a
          className={`${classes.appLink}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Base Project React
        </a>
      </header>
    </div>
  );
};

export default App;
