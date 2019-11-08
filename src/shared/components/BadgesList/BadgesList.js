import React from "react";
import { Badge } from "react-bootstrap";

export const BadgesList = ({ tags }) => {
  return (
    <div>
      {tags.map((tag, index) => (
        <Badge variant="success" className="mr-1" key={index}>
          {tag.name}
        </Badge>
      ))}
    </div>
  );
};
