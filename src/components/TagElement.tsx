import React from "react";
import { Tag } from "../types";
import {
  TableCell,
  TableRow,
} from "@mui/material";

interface TagElementProps {
  tag: Tag;
}

function TagElement({ tag }: TagElementProps) {
  const formatCount = tag.count?.toLocaleString();
  return (
    <TableRow>
      <TableCell>{tag.name}</TableCell>
      <TableCell>{formatCount}</TableCell>
    </TableRow>
  );
}
export { TagElement };
