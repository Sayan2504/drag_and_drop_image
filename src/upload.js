import React, {useState} from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const UploadForm = () => {
  const [image, setImage] = useState({ preview: "", raw: "", text: "" });

  const previewImage = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
        text: e.target.files[0].name
      });
    }
  }

  return (
    <div className="row justify-content-center upload-image">
      <div className="col-sm-12">
        <h3 className="text-center"><strong>Upload Image</strong></h3>
      </div>
      <div className="col-sm-6">
        <div className="card">
          <div className="card-body">
            <form>
              <div className="form-group">
                <h5 text>Add Image</h5>
                <input type="file" className="form-control" onChange={previewImage} multiple/>
              </div>
              <div className="col-sm-3">
                <div className="form-group">
                  {image.preview ? (
                    <>
                      <img src={image.preview} alt="" width="150" height="150"/>
                      <div className="mt-1 text-center"><strong>{image.text}</strong></div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>  
              </div>
              <div className="form-group">
                <h5>Description</h5>
                <input type="text" className="form-control" placeholder="Add description about the image(s)"/>
              </div>
              <button className="btn btn-primary btn-block">Upload</button>
            </form> 
          </div>  
        </div>
      </div>
    </div> 
  );
}

export default UploadForm