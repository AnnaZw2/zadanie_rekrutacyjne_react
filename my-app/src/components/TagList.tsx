import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { TagElement } from "./TagElement";
import { Tag } from "../types";
import {
  Alert,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

import "./TagList.css";

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

  const columns = [
    { field: "name", headerName: "Name of tag", flex: 1 },
    {
      field: "count",
      headerName: "Number of related posts",
      flex: 1,
      valueGetter: (params: any) => params.row.count.toLocaleString(),
    },
  ];

  return (
    <div className="container">
      <h1>Tags</h1>

      <div>
        <div>Set number of tags per page:</div>

        <div className="setElements">
          <TextField
            inputProps={{
              type: "number",
              min: minVal,
              max: maxVal,
            }}
            style={{ width: "8vh"}}
            size="small"
            value={value}
            onChange={handleChange}
            onKeyDown={(e) => (e.keyCode == 13 ? handleSubmit() : null)}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">Error: {error.message}</Alert>}
      {warning && (
        <Alert severity="warning" onClose={handleAlertClose}>
          {warning}
        </Alert>
      )}

      {/* <ul className="tags-container">
        <li>Name of the tag</li>
        <li>Number of related posts</li>
        {tags.map((tag: Tag) => (
          <TagElement tag={tag} />
        ))}
        {}
      </ul> */}

      <Table sx={{ width: "80vh", margin: "auto",marginBottom:"10vh"  }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight:"bold"}}>Name of the tag</TableCell>
            <TableCell sx={{fontWeight:"bold"}}>Number of related posts</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tags.map((tag: Tag) => (
            <TagElement key={tag.name} tag={tag} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export { TagList };
