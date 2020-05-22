import React, { useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const Images = ({ imgData }) => {

  useEffect(() => {
    console.log(imgData);
  }, [imgData]);

  const imgList = imgData.images.map((image) => (
    <div className="col-sm-3 mt-3">
      <div class="hvrbox">
        <div className="card">
          <div className="card-header">
            <img src={image.preview} alt="" width="210" height="150"/>
            <div className="mt-1 text-center"><strong>{image.text}</strong></div>
          </div>
        </div>
        <div class="hvrbox-layer_top hvrbox-layer_scale">
		      <div class="hvrbox-text">
            {imgData.description ? (
              imgData.description
            ) : (
              image.text
            )}
          </div>
	      </div>
      </div>  
    </div>  
  ));

  return (
    <div className="container">
      <div className="row">    
        {imgList}
      </div>
    </div>
  );
};

export default Images;