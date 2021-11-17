import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

import DeleteIcon from "@material-ui/icons/Delete";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
// import Loading from "../Loading";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
      width: "80%",
    },
  },

  title: {
    color: "var(--browntext)",
  },
  titleBar: {
    background: "rgba(0,0,0,0)",
  },

  gridList: {},

  picture: {
    borderRadius: 25,
  },
}));

function useWidth() {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || "xs"
  );
}

const getGridListCols = (width) => {
  if (isWidthUp("xl", width)) {
    return 5;
  }

  if (isWidthUp("lg", width)) {
    return 4;
  }

  if (isWidthUp("md", width)) {
    return 3;
  }

  return 3;
};

const getGridListCellHeight = (width) => {
  if (isWidthUp("xl", width)) {
    return 200;
  }

  if (isWidthUp("lg", width)) {
    return 150;
  }

  return 100;
};

export default function PictureList({ pictures, removePicture, isEditing }) {
  const classes = useStyles();
  const width = useWidth();

  if (!pictures) return null;

  const cols = getGridListCols(width);
  const cellHeight = getGridListCellHeight(width);

  return (
    <ImageList
      cellHeight={cellHeight}
      className={classes.gridList}
      cols={cols}
      spacing={12}
    >
      {pictures.map((pic, index) => (
        <ImageListItem key={pic === 'loading' ? `loading${index}` : pic} className={classes.picture}
        onClick={() => console.log(pic)}
        
        >
          <img src={pic} alt="loading" />}
          {isEditing && (
            <GridListTileBar
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton
                  aria-label={`delete ${pic}`}
                  onClick={() => removePicture(pic)}
                >
                  <DeleteIcon className={classes.title} />
                </IconButton>
              }
            />
          )}
        </ImageListItem>
      ))}
    </ImageList>
  );
}