import React from "react";
import { Tag } from "../types";

interface TagElementProps {
  tag: Tag;
}

function TagElement({ tag }: TagElementProps) {
    const formatCount = tag.count.toLocaleString();
  return (
    <div>
      {tag.name} - {formatCount}
      

    </div>
  );
}
export { TagElement };
