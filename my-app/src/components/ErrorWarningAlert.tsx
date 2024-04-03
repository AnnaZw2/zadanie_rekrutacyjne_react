import React from 'react';
import { Alert } from "@mui/material";
import PropTypes from 'prop-types';

interface ErrorWarningAlertProps {
  error: Error | null;
  warning: string | null;
  handleAlertClose: () => void;
}



function ErrorWarningAlert({ error, warning, handleAlertClose }: ErrorWarningAlertProps)  {
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
ErrorWarningAlert.propTypes = {
  error: PropTypes.instanceOf(Error),
  warning: PropTypes.string,
  handleAlertClose: PropTypes.func,
};
export  {ErrorWarningAlert};
