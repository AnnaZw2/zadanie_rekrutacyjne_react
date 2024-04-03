import { Button, TextField } from "@mui/material";
import React from "react";
interface TagHeaderProps {
  minRowsPerPage: number;
  maxRowsPerPage: number;
  rowsPerPage: number;
 
  handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  handleSubmit: any;
}

function TagHeader({
    minRowsPerPage,
    maxRowsPerPage,
    rowsPerPage,

    handleChange,
    handleSubmit,
}: TagHeaderProps) {
    return (
        <div>
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
                        onKeyDown={(e: any) => (e.keyCode === 13 ? handleSubmit() : null)}
                    />
                    <Button variant="contained" onClick={handleSubmit}>
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
}

export { TagHeader };
