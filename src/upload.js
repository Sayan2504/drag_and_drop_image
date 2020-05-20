import React, { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const UploadForm = () => {
  const [image, setImage] = useState([]);

  const previewImage = (files) => {
    let images = [];
    Object.values(files).map((file) => {
      let singleImage = {
        preview: URL.createObjectURL(file),
        raw: file,
        text: file.name
      };
      images.push(singleImage);
    });
    setImage(images);
  };

  useEffect(() => {
    console.log("useState", image);
  }, [image]);

  const singleImage = image.map(singleImage => (
    <div className="col-sm-3">
      <div className="form-group">
        {singleImage.preview ? (
          <>
            <div className="card">
              <div className="card-body">
                <img src={singleImage.preview} alt="" width="205" height="150"/>
                <div className="mt-1 text-center"><strong>{singleImage.text}</strong></div> 
              </div>
            </div>  
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  ));

  return (
    <div className="row justify-content-center upload-image">
      <div className="col-sm-12">
        <h3 className="text-center">
          <strong>Upload Image</strong>
        </h3>
      </div>
      <div className="col-sm-10">
        <div className="card">
          <div className="card-header">
            <form encType="multipart/form-data">
              <div className="form-group">
                <h5>Add Image</h5>
                <input type="file" className="form-control" 
                  onChange={(e) => { previewImage(e.target.files);}}
                  multiple
                />
              </div>
              <div className="row">
                {singleImage}  
              </div>
              <div className="form-group">
                <h5>Description</h5>
                <input type="text" className="form-control" placeholder="Add description about the image(s)"/>
              </div>
              <button className="btn btn-primary btn-block">Upload Images</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;