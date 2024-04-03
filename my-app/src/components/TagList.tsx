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
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
} from "@mui/material";

import "./TagList.css";

function TagList() {
  const [tags, setTags] = useState([] as Tag[]);
  const [error, setError] = useState<Error | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"name" | "popular">("popular");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
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

  async function getTags(
    elementsPerPage = defaultVal,
    sortFiled = "popular",
    sortDirection = "desc"
  ) {
    try {
      const response = await fetch(
        `https://api.stackexchange.com/2.3/tags?order=${sortDirection}&sort=${sortFiled}&site=stackoverflow&key=4UBaAyJbbK0NiBol8i*vZA((&pagesize=${elementsPerPage}`
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

  const handleSort = (field: "name" | "popular") => {
    if (sortBy === field) {
      const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
      setSortOrder(newSortOrder);
    } else {
      // Reset sort order
      setSortOrder("asc");
      setSortBy(field);
    }
    getTags(value, field, sortOrder === "asc" ? "desc" : "asc");
  };

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

      <TableContainer sx={{ maxWidth: "100%", overflowX: "auto" }}>
        <Table
          sx={{
            width: { xs: "100%", sm: "80vh" },
            margin: "auto",
            marginBottom: "10vh",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>
                Name of the tag
                <TableSortLabel
                  active={sortBy === "name"}
                  direction={sortOrder}
                  onClick={() => handleSort("name")}
                />
              </TableCell>

              <TableCell sx={{ fontWeight: "bold" }}>
                Number of related posts
                <TableSortLabel
                  active={sortBy === "popular"}
                  direction={sortOrder}
                  onClick={() => handleSort("popular")}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tags.map((tag: Tag) => (
              <TagElement key={tag.name} tag={tag} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export { TagList };
