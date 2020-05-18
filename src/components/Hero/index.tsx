import React from "react";
import { makeStyles } from "@material-ui/styles";
import { useState, memo, useEffect } from "react";
import { IHero } from "../../interfaces/hero";
import * as BmanF from "../../assets/Sprites/Bomberman/Front/Bman_F_f00.png";

interface IProps {
  hero: IHero;
}

const useStyles = makeStyles({
  hero: {
    position: "absolute",
    width: 35,
    height: 70,
    zIndex: 9,
    "& > img": {
      width: "100%",
      height: "100%",
      position: "relative"
    }
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

    setActualPostionTop(element.offsetTop - 45);
    setActualPostionLeft(element.offsetLeft - 2);

    heroElement.scrollIntoView({ block: "center" });
  };

  return (
    <div
      id="hero"
      style={{
        top: actualPositionTop,
        left: actualPositionLeft,
        transition: "all 0.2s"
      }}
      className={classes.hero}
    >
      <img src={`${BmanF}`} />
    </div>
  );
};

export default memo(Hero);
