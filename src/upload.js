import React from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Upload = () => {
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
                <input type="file" className="form-control"/>
              </div>
              <div className="form-group">
                <h5>Description</h5>
                <input type="text" className="form-control" placeholder="Add description about the image(s)"/>
              </div>
              <button type="button" className="btn btn-primary btn-block">Upload</button>
            </form>
          </div>  
        </div>
      </div>
    </div>    
  );
}

export default Upload