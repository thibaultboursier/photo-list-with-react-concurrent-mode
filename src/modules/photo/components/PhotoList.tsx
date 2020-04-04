import React, {
  FC,
  useState,
  useCallback,
  useEffect,
  // @ts-ignore
  useTransition,
  Suspense,
} from "react";

// Types
import { Photo as PhotoType } from "../types";

// Components
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Photo from "./Photo";

type Props = {
  photos: PhotoType[];
};

const PhotoList: FC<Props> = ({ photos }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [filteredPhotos, setFilteredPhotos] = useState(photos);
  const [startTransition, isPending] = useTransition({
    timeoutMs: 3000,
  });

  useEffect(() => {
    startTransition(() =>
      setFilteredPhotos(isChecked ? photos.slice(0, 15) : photos)
    );
  }, [isChecked]);

  const onChange = useCallback((e) => {
    setIsChecked((previousValue) => !previousValue);
  }, []);

  return (
    <Suspense fallback={<div>Hello</div>}>
      <section className="mt-4">
        <Row className="py-2">
          <Form>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                disabled={isPending}
                checked={isChecked}
                onChange={onChange}
                type="checkbox"
                label="Display first 15 photos"
              />
            </Form.Group>
          </Form>
        </Row>
        <Row className="py-2">
          <strong>{filteredPhotos.length}</strong>&nbsp;photos displayed
          (on&nbsp;
          <strong>{photos.length}</strong>)
        </Row>
        <Row>
          {filteredPhotos.map((photo) => (
            <Photo key={photo.id} {...photo} />
          ))}
        </Row>
      </section>
    </Suspense>
  );
};

export default PhotoList;
