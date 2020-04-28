import React from "react";
import { makeStyles } from "@material-ui/styles";
import { useState, memo, useEffect } from "react";
import { IHero } from "../../interfaces/hero";

interface IProps {
  hero: IHero;
}

const useStyles = makeStyles({
  hero: {
    position: "absolute",
    width: 20,
    height: 20,
    backgroundColor: "yellow"
  }
});

const Hero = (props: IProps) => {
  const classes = useStyles();
  const [actualPositionTop, setActualPostionTop] = useState(0);
  const [actualPositionLeft, setActualPostionLeft] = useState(0);

  useEffect(() => {
    positionHero(props.hero);
  }, [props.hero]);

  const positionHero = (hero: IHero) => {
    const element: any = document.getElementById(
      `${hero.positionY}x${hero.positionX}`
    );

    if (!element) return;

    const heroElement: any = document.getElementById("hero");

    setActualPostionTop(element.offsetTop + 20);
    setActualPostionLeft(element.offsetLeft + 20);

    heroElement.scrollIntoView({ block: "center" });
  };

  return (
    <div
      id="hero"
      style={{ top: actualPositionTop, left: actualPositionLeft }}
      className={classes.hero}
    />
  );
};

export default memo(Hero);
