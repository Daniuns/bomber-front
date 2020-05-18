import { useEffect, memo } from "react";
import mapService from "../../sevices/map";
import { useState } from "react";
import React from "react";
import { makeStyles } from "@material-ui/styles";
import { enTypeMap } from "../../interfaces/map";
import * as floor from "../../assets/map/floor.gif";
import * as wall from "../../assets/map/wall.gif";
import { SQM_SIZE } from "../../settings";

const useStyles = makeStyles({
  floor: {
    width: SQM_SIZE,
    height: SQM_SIZE,
    backgroundColor: "#743b23",
    fontSize: 8,
    color: "#FFF",
    boxSizing: "border-box",
    backgroundImage: `url(${floor})`
  },
  content: {
    display: "flex"
  },
  wall: {
    width: SQM_SIZE,
    height: SQM_SIZE,
    fontSize: 8,
    color: "#FFF",
    boxSizing: "border-box",
    backgroundImage: `url(${floor})`,
    "& > img": {
      width: 60,
      position: "relative"
    }
  }
});

const Map = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [activeDebug, setActiveDebug] = useState(false);

  useEffect(() => {
    mapService.generateMap();

    const sub$ = mapService
      .isLoading()
      .subscribe(isLoading => setLoading(isLoading));

    return () => {
      sub$.unsubscribe();
    };
  }, []);

  const typeField = (value: string) => {
    if (value === enTypeMap.WALL) {
      return classes.wall;
    }
    return classes.floor;
  };

  const activeDebugAction = () => {
    setActiveDebug(v => !v);
  };

  if (!!loading) {
    return <div>Aguarde...</div>;
  }
  console.log("mapppp", mapService.getMap());
  return (
    <div>
      <button onClick={activeDebugAction}>Debug</button>
      {mapService.getMap().map((position, key) => {
        return (
          <div className={classes.content} key={key}>
            {position.map(p => {
              return (
                <div
                  id={`${p.positionY}x${p.positionX}`}
                  className={`uniqueField ${typeField(p.type)}`}
                  key={`${p.positionY} x ${p.positionX}`}
                  style={{
                    border: `${
                      activeDebug
                        ? p.bloked
                          ? "1px solid red"
                          : "1px solid rgb(255, 255, 255, 0.5)"
                        : ""
                    }`
                  }}
                >
                  {activeDebug && (
                    <div
                      style={{ position: "absolute" }}
                    >{`${p.positionY} x ${p.positionX}`}</div>
                  )}

                  {p.type === enTypeMap.WALL && <img src={wall as any} />}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default memo(Map);
