import { CircularProgress, Container } from "@mui/material";
import { TagTable } from "./components/TagTable";
import "./App.css";
import { useEffect, useState } from "react";
import { Tag } from "./types";
import { TagHeader } from "./components/TagHeader";
import { ErrorWarningAlert } from "./components/ErrorWarningAlert";
function App() {
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

    getTags();
  }, []);

  async function getTags(
    rowsPerPage = defaultRowsPerPage,
    sortFiled = "popular",
    sortDirection = "desc",
    page = 1
  ) {
    try {
      setLoading(true);
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

  const handleChange = (event: any) => {
    setRowsPerPage(event.target.value);
  };

  const handleSubmit = () => {
    setLoading(true);
    if (rowsPerPage < minRowsPerPage) {
      getTags(minRowsPerPage, sortConfig.sortBy, sortConfig.sortOrder, page);
      setRowsPerPage(minRowsPerPage);
      setWarning(`Minimum number of elements per page is ${minRowsPerPage}`);
    } else if (rowsPerPage > maxRowsPerPage) {
      getTags(maxRowsPerPage, sortConfig.sortBy, sortConfig.sortOrder, page);
      setRowsPerPage(maxRowsPerPage);
      setWarning(`Maximum number of elements per page is ${maxRowsPerPage}`);
    } else {
      getTags(rowsPerPage, sortConfig.sortBy, sortConfig.sortOrder, page);
      setWarning(null);
    }
  };

  const handleAlertClose = () => {
    setError(null);
    setWarning(null);
  };

  const sortConfig = {
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
  };


  return (
    <Container className="app">
      <TagHeader
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        minRowsPerPage={minRowsPerPage}
        maxRowsPerPage={maxRowsPerPage}
      />

 

      <ErrorWarningAlert
        error={error}
        warning={warning}
        handleAlertClose={handleAlertClose}
      />

      <TagTable
        getTags={getTags}
        tags={tags}
        setWarning={setWarning}
        sortConfig={sortConfig}
        defaultRowsPerPage={defaultRowsPerPage}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        loading={loading}
      ></TagTable>
    </Container>
  );
}

export default App;
