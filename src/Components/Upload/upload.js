import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import "./upload.css";

const UploadForm = ({onSubmit}) => {
  const [image, setImage] = useState([]);
  const [description,setDescription] = useState("");
  const imageInputRef = useRef();

  const addDescription = (e) => {
      setDescription(e.target.value)
  };

  const previewImage = (files) => {
    let images = [];
    Object.values(files).map((file) => {
      let singleImage = {
        preview: URL.createObjectURL(file),
        text: file.name
      };
      images.push(singleImage);
    });
    setImage(images);
  };

  const singleImage = image.map(singleImage => (
    <Col sm={4} className="mt-3">
      {singleImage.preview ? (
        <Image src={singleImage.preview} alt="" fluid/>
      ) : (
        <></>
      )}
    </Col>
  ));

  return (
    <Container>
      <Row className="justify-content-center upload-image">
        <Col>
          <h3 className="text-center"><strong>Image Gallery</strong></h3>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col>
          <Card>
            <Card.Header>
              <Form encType="multipart/form-data"
                onSubmit = {e => {
                e.preventDefault();
                onSubmit(image, description);
                setDescription("");
                imageInputRef.current.value = "";
                setImage([]);
              }}>
                <Form.Group>
                  <Form.Label><strong>Add Image</strong></Form.Label>
                  <Form.File
                    onChange={e => { previewImage(e.target.files);}}
                    ref={imageInputRef}
                    multiple required autoFocus
                    title = "Please enter image(s) for uploading"
                  />
                </Form.Group>
                <Row className="mt-2 justify-content-center" xs={1} md={3} lg={4}>
                  {singleImage}
                </Row>
                <Form.Group className="mt-3">
                  <Form.Label><strong>Description</strong></Form.Label>
                  <Form.Control value={description}
                    onChange={addDescription} placeholder="Add description about the image(s) (optional)"
                    title = "Please enter description for the image(s) (optional)"
                  />
                </Form.Group>
                <Button variant="primary" size="md" type="submit" block>Upload Images</Button>
              </Form>
            </Card.Header>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UploadForm;
