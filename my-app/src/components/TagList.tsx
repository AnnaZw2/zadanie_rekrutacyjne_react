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
  TablePagination,
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
  const [page, setPage] = useState(0);
  const defaultRowsPerPage = 25;
  const minRowsPerPage = 10;
  const maxRowsPerPage = 200;
  const [rowsPerPage, setRowsPerPage] = useState<number>(defaultRowsPerPage);

  useEffect(() => {
    // checking loader
    // setTimeout(() => {
    //   getTags();
    // }, 5000);

    setLoading(true)
    getTags();
  }, []);

  async function getTags(
    rowsPerPage = defaultRowsPerPage,
    sortFiled = "popular",
    sortDirection = "desc",
    page = 1
  ) {
    try {
      console.log(page, rowsPerPage);
      const response = await fetch(
        `https://api.stackexchange.com/2.3/tags?page=${page}&pagesize=${rowsPerPage}&order=${sortDirection}&sort=${sortFiled}&site=stackoverflow&key=4UBaAyJbbK0NiBol8i*vZA((`
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
  console.log(page);
  const handleChange = (event: any) => {
    setRowsPerPage(event.target.value);
  };

  const handleSubmit = () => {
    setLoading(true);
    if (rowsPerPage < minRowsPerPage) {
      getTags(minRowsPerPage, sortBy, sortOrder, page);
      setRowsPerPage(minRowsPerPage);
      setWarning(`Minimum number of elements per page is ${minRowsPerPage}`);
    } else if (rowsPerPage > maxRowsPerPage) {
      getTags(maxRowsPerPage, sortBy, sortOrder, page);
      setRowsPerPage(maxRowsPerPage);
      setWarning(`Maximum number of elements per page is ${maxRowsPerPage}`);
    } else {
      getTags(rowsPerPage, sortBy, sortOrder, page);
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
    getTags(rowsPerPage, field, sortOrder === "asc" ? "desc" : "asc", page);
  };

  const handlePageChange = (event: any, newPage: number) => {
    setPage(newPage);
    console.log("new page", newPage);
    getTags(rowsPerPage, sortBy, sortOrder, newPage);
  };

  const handleRowChange = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
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
              min: minRowsPerPage,
              max: maxRowsPerPage,
            }}
            size="small"
            value={rowsPerPage}
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
          {tags.length > 0 && (
            <TablePagination
              count={-1}
              page={!tags.length || tags.length <= 0 ? 1 : page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[10, 25, 50, 100, 200]}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowChange}
            />
          )}
        </Table>
      </TableContainer>
    </div>
  );
}

export { TagList };
