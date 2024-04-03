import { Tag } from "../types";
import { Divider, ListItem, ListItemText } from "@mui/material";

interface TagElementProps {
  tag: Tag;
}

function TagElement({ tag }: TagElementProps) {
  const formatCount = tag.count.toLocaleString();
  return (
    <ListItem >
      <ListItemText
        primary={tag.name}
        secondary={`Related posts: ${formatCount}`}
      />
    </ListItem>
  );
}
export { TagElement };
