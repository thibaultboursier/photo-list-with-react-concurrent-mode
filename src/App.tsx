import React, { FC, useState, useCallback, useRef } from "react";

// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Types
import { Photo as PhotoType } from "./modules/photo/types";

// Components
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import PhotoList from "./modules/photo/components/PhotoList";

// API
import { fetchPhotos } from "./modules/photo/api";

const App: FC = () => {
  const hasEverLoadedPhotosRef = useRef(false);
  const [photos, setPhotos] = useState<PhotoType[]>();
  const [isLoading, setIsLoading] = useState(false);

  const loadPhotos = async () => {
    setIsLoading(true);
    const photos = await fetchPhotos();

    setPhotos(photos);
    setIsLoading(false);
    hasEverLoadedPhotosRef.current = true;
  };

  const onButtonClick = () => {
    loadPhotos();
  };

  return (
    <Container>
      <Row className="py-4">
        <h1>My photos</h1>
      </Row>
      <Row>
        <Button disabled={isLoading} onClick={onButtonClick}>
          {isLoading && (
            <>
              {" "}
              <Spinner
                as="span"
                animation="border"
                className="mr-2"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </>
          )}
          {!isLoading && (
            <>{hasEverLoadedPhotosRef.current ? "Reload" : "Load"}</>
          )}
        </Button>
      </Row>
      {photos && photos.length > 0 && <PhotoList photos={photos} />}
    </Container>
  );
};

export default App;
