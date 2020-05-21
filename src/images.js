import React, { useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const Images = ({ imgData }) => {

  useEffect(() => {
    console.log(imgData);
  }, [imgData]);

  const imgList = imgData.images.map((image) => (
    <div className="col-sm-3">
      <div className="card">
        <div className="card-header">
          <img src={image.preview} alt="" width="210" height="150"/>
          <div className="mt-1 text-center"><strong>{image.text}</strong></div>
        </div>
      </div>
    </div>      
  ));
  
  return (
    <div className="container">
      <div className="row mt-4">    
        {imgList}
      </div>
    </div>
  );
};

export default Images;