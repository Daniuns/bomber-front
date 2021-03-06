import React from "react";
import { makeStyles } from "@material-ui/styles";
import { useState, memo, useEffect } from "react";
import { IHero } from "../../interfaces/hero";
import { heroImages } from "../../sevices/hero/heroImages";

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
  console.log("speed", props.hero.img);
  return (
    <div
      id="hero"
      style={{
        top: actualPositionTop,
        left: actualPositionLeft,
        transition: `all ${props.hero.speed}s`
      }}
      className={classes.hero}
    >
      <img src={`${heroImages.get(`${props.hero.img}`)}`} />
    </div>
  );
};

export default memo(Hero);
