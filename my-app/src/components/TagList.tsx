import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { TagElement } from "./TagElement";
import { Tag } from "../types";
import { Alert, Button, TextField } from "@mui/material";

function TagList() {
  const [tags, setTags] = useState([] as Tag[]);
  const [error, setError] = useState<Error | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const defaultVal = 25;
  const minVal = 10;
  const maxVal = 200;
  const [value, setValue] = useState<number>(defaultVal);
  useEffect(() => {
    // checking loader
    // setTimeout(() => {
    //   getTags();
    // }, 5000);

    getTags();
  }, []);

  async function getTags(elementsPerPage = defaultVal) {
    try {
      const response = await fetch(
        `https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow&key=4UBaAyJbbK0NiBol8i*vZA((&pagesize=${elementsPerPage}`
      );
      const data = await response.json();
      const fomrmatData: Tag[] = data.items.map((item: any) => {
        return {
          name: item.name,
          count: item.count,
        };
      });
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
      } else {
        console.error("Unknown error:", error);
      }
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    setLoading(true);
    if (value < minVal) {
      getTags(minVal);
      setValue(minVal);
      setWarning(`Minimum number of elements per page is ${minVal}`);
    } else if (value > maxVal) {
      getTags(maxVal);
      setValue(maxVal);
      setWarning(`Maximum number of elements per page is ${maxVal}`);
    } else {
      getTags(value);
      setWarning(null);
    }
  };

  const handleAlertClose = () => {
    setError(null);
    setWarning(null);
  };

  return (
    <div className="container">
      <h1>Tags</h1>

      <div>
        <div>Set number of tags per page:</div>
        <TextField
          inputProps={{ type: "number", min: minVal, max: maxVal }}
          style={{ width: "8vh" }}
          value={value}
          onChange={handleChange}
          onKeyDown={(e) => (e.keyCode == 13 ? handleSubmit() : null)}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </div>

      {loading && <CircularProgress />}
      {error && (
        <Alert severity="error" onClose={handleAlertClose}>
          Error: {error.message}
        </Alert>
      )}
      {warning && (
        <Alert severity="warning" onClose={handleAlertClose}>
          {warning}
        </Alert>
      )}

      <ul className="tags-container">
        {tags.map((tag: Tag) => (
          <TagElement tag={tag} />
        ))}
        {}
      </ul>
    </div>
  );
}

export { TagList };
