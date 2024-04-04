import React from 'react';
import { ErrorWarningAlert } from "../components/ErrorWarningAlert";

export default {
    title: "ErrorWarningAlert",
    component: ErrorWarningAlert,
    argTypes: {
        handleAlertClose: { action: 'handleAlertClose' }
    }
};

const Template = (args) => <ErrorWarningAlert {...args} />;
export const ErrorStory = Template.bind({});

ErrorStory.args = {
    error: {message: "This is an error message"},

};

export const WarningStory = Template.bind({});
WarningStory.args = {
    warning: "This is a warning message",
};