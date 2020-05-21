import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const Images = ({image, description}) => {

  const singleImage = image && image.map(singleImage => (
    <div className="col-sm-3">
      <div className="card">
        <div className="card-header mt-1">
          <img src={singleImage.preview} alt="" width="205" height="150"/>
          <div className="mt-1 text-center"><strong>{singleImage.text}</strong></div> 
        </div>
      </div>  
    </div>
  ));

  return(
    <div className="container">
      <div className = "row justify-content-center">
        <div className="col-sm-12">
          <h3 className="text-center mt-2">
            <strong>Photos</strong>
          </h3>
        </div>
      </div>  
      <div className ="row justify-content-center mt-2">
        <div className="col-sm-12">
          {singleImage} 
        </div>       
      </div>
    </div>              
  )
}

export default Images;