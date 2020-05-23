import React, { useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const Images = ({ imgData }) => {
  const images = [];

  imgData.forEach((item) => {
    item.images.forEach((image) => {
      let t = {
        photo: image,
        description: item.description,
      };
      images.push(t);
    });
  });

  console.log(images);

  const imgList = images.map((image) => (
    <div className="col-sm-3 mt-3">
      <div class="hvrbox">
        <div className="card">
          <div className="card-header">
            <img src={image.photo.preview} alt="" width="210" height="150" />
            <div className="mt-1 text-center">
              <strong>{image.photo.text}</strong>
            </div>
          </div>
        </div>
        <div class="hvrbox-layer_top hvrbox-layer_scale">
          <div class="hvrbox-text">
            {image.description ? image.description : image.photo.text}
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="container">
      <div className="row">{imgList}</div>
    </div>
  );
};

export default Images;