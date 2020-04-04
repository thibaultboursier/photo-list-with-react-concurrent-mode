import React, { memo } from "react";

// Types
import type { FC } from "react";
import type { Photo as PhotoType } from "../types";

// Components
import LazyLoad from "react-lazyload";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

type Props = PhotoType;

const Photo: FC<Props> = ({ id, title, url }) => (
  <Col className="mt-3" md={4}>
    <Card>
      <LazyLoad once>
        <Card.Img alt={title} variant="top" src={url} />
      </LazyLoad>
      <Card.Body>
        <Card.Title>Photo {id}</Card.Title>
        <Card.Text>{title}</Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

export default memo(Photo);
