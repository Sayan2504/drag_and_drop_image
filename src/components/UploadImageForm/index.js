import React, { useState, useRef } from "react";
import { Container, Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import "./styles.css";

const UploadForm = ( { onSubmit } ) => {
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const imageInputRef = useRef();

  const addDescription = (e) => {
    setDescription(e.target.value)
  };

  const preview = (files) => {
    let previewImageGrid = Object.values(files).map((file) => {
      return {
        key: file.name,
        preview : URL.createObjectURL(file)
      }
    } );
    setImages(previewImageGrid);
  };

  const singleImage = images.map(singleImage => (
    <Col key={ singleImage.key } className="mt-2 pl-1 pr-1 image-tile-preview">
      { singleImage.preview ? (
        <Image src = { singleImage.preview } alt="" fluid />
      ) : (
        <></>
      ) }
    </Col>
  ));

  return (
    <Container>
      <Row className="justify-content-center heading">
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
                onSubmit(images, description);
                setDescription("");
                imageInputRef.current.value = "";
                setImages([]);
              } } >
                <Form.Group>
                  <Form.Label><strong>Add Image</strong></Form.Label>
                  <Form.File
                    onChange = { e => { preview(e.target.files); } }
                    ref = { imageInputRef }
                    multiple required
                    title = "Please enter image(s) for uploading"
                  />
                </Form.Group>
                <Row className="mt-2 pl-2 pr-2" xs={1} md={3} lg={4}>
                  { singleImage }
                </Row>
                <Form.Group className="mt-3">
                  <Form.Label><strong>Description</strong></Form.Label>
                  <Form.Control value = { description }
                    onChange = { addDescription } placeholder="Add description about the image(s) (optional)"
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
