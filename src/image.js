import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const type = "Image";

const Image = ( { image, moveImage, index } ) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    item: { type, id: image.id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, drop] = useDrop({
    accept: type,
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      
      if (dragIndex === hoverIndex) { 
        return;
      }
      moveImage(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });
  
  drag(drop(ref));
  
  return(
    <div className="col-sm-3 mt-3 imageCube">
      <div className="hvrbox" ref={ref} style={{ opacity: isDragging ? 0 : 1 }}>
        <div className="card">
          <div className="card-header">
            <img src={image.photo.preview} alt="" width="210" height="150" />
            <div className="mt-1 text-center">
              <strong>{image.photo.text}</strong>
            </div>
          </div>
        </div>
        <div className="hvrbox-layer_top hvrbox-layer_scale">
          <div className="hvrbox-text">
            {image.description ? image.description : image.photo.text}
          </div>
        </div>
      </div>
    </div>
  );
}; 

export default Image;