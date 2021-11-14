import React, { useState } from "react";

export default function PhotoUploader({ urls, progress, handleChange, handleUpload, onSubmit }) {
  const [isLoading, setLoading] = useState(false);

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
    <div>
        <progress value={progress} max="100" />
        <input
            accept="image/jpeg"
            id="photoSelector"
            type="file"
            multiple
            onChange={handleSubmit}
        />
        {/* <button onClick={handleUpload}>Upload</button> */}
        {urls ? urls.map(url => <div>{url}</div>) : null}
        <img src={urls} alt="" />
    </div>
  );
}