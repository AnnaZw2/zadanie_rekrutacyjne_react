import { TagElement } from "./TagElement";
import { Tag } from "../types";
import PropTypes from "prop-types";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import React from "react";

function TagTable({
  getTags,
  tags,
  setWarning,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  sortConfig,
  loading,
}: any) {
  const handleSort = (field: "name" | "popular") => {
    if (sortConfig.sortBy === field) {
      const newSortOrder = sortConfig.sortOrder === "asc" ? "desc" : "asc";
      sortConfig.setSortOrder(newSortOrder);
    } else {
      // Reset sort order
      sortConfig.setSortOrder("asc");
      sortConfig.setSortBy(field);
    }
    getTags(
      rowsPerPage,
      field,
      sortConfig.sortOrder === "asc" ? "desc" : "asc",
      page
    );
  };

  const handlePageChange = (event: any, newPage: number) => {
    setPage(newPage);
    getTags(rowsPerPage, sortConfig.sortBy, sortConfig.sortOrder, newPage);
  };

  const handleRowChange = (event: any) => {
    const currentRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(currentRowsPerPage);
    getTags(currentRowsPerPage, sortConfig.sortBy, sortConfig.sortOrder, page);
    setWarning(null);
    setPage(1);
  };
  return (
    <div className="container">
      <TableContainer sx={{ maxWidth: "100%", overflowX: "auto" }}>
        <Table
          sx={{
            width: { xs: "100%", sm: "80vh", lg: "60vh" },
            margin: "auto",
            marginBottom: "10vh",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>
                Name of the tag
                <TableSortLabel
                  active={sortConfig.sortBy === "name"}
                  direction={sortConfig.sortOrder}
                  onClick={() => handleSort("name")}
                />
              </TableCell>

              <TableCell sx={{ fontWeight: "bold" }}>
                Number of related posts
                <TableSortLabel
                  active={sortConfig.sortBy === "popular"}
                  direction={sortConfig.sortOrder}
                  onClick={() => handleSort("popular")}
                />
              </TableCell>
            </TableRow>
          </TableHead>

          {tags.length !== 0 ? (
            <>
              <TableBody>
                {tags.map((tag: Tag) => (
                  <TagElement tag={tag} />
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    count={-1}
                    page={!tags.length || tags.length <= 0 ? 1 : page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowChange}
                  />
                </TableRow>
              </TableFooter>
            </>
          ) : null}
          {loading && (
            <TableRow>
              <TableCell colSpan={2} align="center" sx={{ border: "none" }
            }>
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}
        </Table>
      </TableContainer>
    </div>
  );
}

TagTable.propTypes = {
  getTags: PropTypes.func,
  tags: PropTypes.array,
  setWarning: PropTypes.func,
  page: PropTypes.number,
  setPage: PropTypes.func,
  rowsPerPage: PropTypes.number,
  setRowsPerPage: PropTypes.func,
  sortConfig: {
    sortBy: PropTypes.string,
    setSortOrder: PropTypes.func,
    setSortBy: PropTypes.func,
  },
  loading: PropTypes.bool,
};

export { TagTable };
