import { useEffect, memo } from "react";
import mapService from "../../sevices/map";
import { useState } from "react";
import React from "react";
import { makeStyles } from "@material-ui/styles";
import { enTypeMap } from "../../interfaces/map";
import * as floor from "../../assets/map/floor.gif";
import * as wall from "../../assets/map/wall.gif";

const useStyles = makeStyles({
  floor: {
    width: 60,
    height: 60,
    backgroundColor: "#743b23",
    fontSize: 14,
    boxSizing: "border-box",
    backgroundImage: `url(${floor})`
  },
  content: {
    display: "flex"
  },
  wall: {
    width: 60,
    height: 60,
    fontSize: 14,
    boxSizing: "border-box",
    backgroundImage: `url(${floor})`
  }
});

const Map = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

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

  if (!!loading) {
    return <div>Aguarde...</div>;
  }
  return (
    <div>
      {mapService.getMap().map((position, key) => {
        return (
          <div className={classes.content} key={key}>
            {position.map(p => {
              return (
                <div
                  id={`${p.positionY}x${p.positionX}`}
                  className={`uniqueField ${typeField(p.type)}`}
                  key={`${p.positionY} x ${p.positionX}`}
                >
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
