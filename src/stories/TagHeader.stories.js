import { TagHeader } from "../components/TagHeader";
import "../components/TagHeader.css";
export default {
    title: "TagHeader",
    component: TagHeader,
    argTypes: {
        handleChange: { action: 'handleChange' },
        handleSubmit: { action: 'handleSubmit' }
    }

};

const Template = (args) => <TagHeader {...args} />;


export const TagHeaderStory = Template.bind({});

TagHeaderStory.args = {
    minRowsPerPage: 10,
    maxRowsPerPage: 100,
    rowsPerPage: 10,
}