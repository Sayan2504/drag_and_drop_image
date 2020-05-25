import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const type = "Image";

const Image = ( { image, moveImage, index } ) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    // item denotes the element type, unique identifier (id) and the index (position)
    item: { type, id: image.id, index },
    // collect method is like an event listener, it monitors whether the element is dragged and expose that information
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, drop] = useDrop({
    accept: type,
    // This method is called when we hover over an element while dragging
    hover(item) { // item is the dragged element
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      //console.log(dragIndex);

      // current element where the dragged element is hovered on
      const hoverIndex = index;
      //console.log(hoverIndex);
      
      // If the dragged element is hovered in the same place, then do nothing
      if (dragIndex === hoverIndex) { 
        return;
      }
      moveImage(dragIndex, hoverIndex);
      // If it is dragged around other elements, then move the image and set the state with position changes
      //moveImage(dragIndex, hoverIndex);
      /*
        Update the index for dragged item directly to avoid flickering
        when the image was half dragged into the next
      */
      item.index = hoverIndex;
    }
  });
  
  drag(drop(ref));
  
  return(
    <div className="col-sm-3 mt-3">
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