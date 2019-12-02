import React from "react";
import clsx from "clsx";
import classes from "./RightPanel.module.scss";

export const RightPanel = () => {
  return (
    <div className={clsx("bg-secondary p-2", classes.root)}>
      <h4 className="text-primary">Latest comments</h4>
    </div>
  );
};
