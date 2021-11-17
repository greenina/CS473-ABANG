import React, { useState } from "react";

import {
    Button,
    IconButton,
    Theme,
    Tooltip,
    makeStyles,
  } from "@material-ui/core";

import PhotoCamera from '@material-ui/icons/AddAPhoto';

const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: "none",
    },
    photoSelector: {
      color: "var(--browntext)",
    },
  }));

export default function PhotoUploader({ urls, progress, handleChange, handleUpload, onSubmit }) {
  const [isLoading, setLoading] = useState(false);
  const classes = useStyles();

  const readImage = (file) => {
    return new Promise((rs, rj) => {
      const fileReader = new FileReader();
      fileReader.onload = () => rs(fileReader.result);
      fileReader.onerror = () => rj(fileReader.error);
      fileReader.readAsDataURL(file);
    });
  };

  const handleSubmit = async ({ target }) => {
    setLoading(true);
    onSubmit(Array.from(target.files));

    for (var i = 0; i < target.files.length; i++) {
      var file = target.files[i];
      // create 하고 지우는 이상한 짓 안하고 생긴 image 가져다 쓸 방안? 지금 저기서 만든 친구를 가져다 쓰려면 CORS 쓰면서 난리남..
      var imageElement = document.createElement("img");
      var imgData = await readImage(file);
      imageElement.src = imgData;

      imageElement.onload = async () => {
        setLoading(false);
        imageElement.remove();
      };
    }
  };

  return (
    <>
      <input
        accept="image/jpeg"
        className={classes.input}
        id="photoSelector"
        type="file"
        multiple
        onChange={handleSubmit}
      />
      <Tooltip title="Select Image">
        <label htmlFor="photoSelector">
          <IconButton
            className={classes.photoSelector}
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera fontSize="medium" />
          </IconButton>
        </label>
        
      </Tooltip>
    </>
  );
}