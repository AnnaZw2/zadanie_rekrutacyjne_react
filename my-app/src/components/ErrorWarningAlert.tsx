import React from 'react';
import { Alert } from "@mui/material";

interface ErrorWarningAlertProps {
  error: Error | null;
  warning: string | null;
  handleAlertClose: () => void;
}

const ErrorWarningAlert: React.FC<ErrorWarningAlertProps> = ({ error, warning, handleAlertClose }) => {
  return (
    <>
      {(error || warning) && (
        <Alert severity={error ? "error" : "warning"} onClose={handleAlertClose}>
          {error ? `Error: ${error.message}` : warning}
        </Alert>
      )}
    </>
  );
}

export  {ErrorWarningAlert};
