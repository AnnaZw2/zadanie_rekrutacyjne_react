import { useEffect, useState } from "react";

function TagList() {
    const [tags, setTags] = useState([])
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    async function getTags() {
      try {
        const response = await fetch(
          "https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow"
        );
        const data = await response.json();
        console.log(data.items);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setTags(data.items);
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
      }
    }
    getTags();
  }, []);

  return (
    <div>
      <h1>Tags</h1>
      {error && <div>Error: {error.message}</div>}
      <ul>
        {tags.map((tag: any) => (
          <li key={tag.name}>{tag.name} -  {tag.count}</li>
        ))}
        {}
      </ul>
    </div>
  );
}

export { TagList };
