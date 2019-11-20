import React from "react";
import { Badge } from "react-bootstrap";

export const BadgesList = ({ tags }) => {
  return (
    <div>
      {tags.map((tag, index) => (
        <Badge pill variant="success" className="mr-1 text-sm" key={index}>
          {tag.name}
        </Badge>
      ))}
    </div>
  );
};
