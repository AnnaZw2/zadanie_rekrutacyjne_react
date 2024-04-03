import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";  
import { TagElement } from "./TagElement";
import { Tag } from "../types";

function TagList() {
  const [tags, setTags] = useState([] as Tag[]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getTags() {
      try {
        const response = await fetch(
          "https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow"
        );
        const data = await response.json();
        const fomrmatData:Tag[] = data.items.map((item: any) => {
            return {
                name: item.name,
                count: item.count
            };
        })
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setTags(fomrmatData);
        setError(null);
        return data.items;
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching tags:", error);
          setError(error);
          setTags([]);
          throw error;
        } else {
          console.error("Unknown error:", error);
          throw error;
        }
      } finally{
        setLoading(false);
      
      }
    }
    setTimeout(() => {
        getTags();
    },5000)
 
  }, []);

  return (
    <div>
     
      <h1>Tags</h1>
      {loading && <CircularProgress />}
      {error && <div>Error: {error.message}</div>}
      <ul>
        {tags.map((tag:Tag) => (
           <TagElement  tag={tag}/>
        ))}
        {}
   
      </ul>
    </div>
  );
}

export { TagList };
