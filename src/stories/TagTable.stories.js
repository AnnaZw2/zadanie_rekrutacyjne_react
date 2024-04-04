import { TagTable } from "../components/TagTable";

export default {
    title: "TagTable",
    component: TagTable,
    argTypes: {
        handleSort: { action: 'handleSort' },
        handlePageChange: { action: 'handlePageChange' },
        handleRowsPerPageChange: { action: 'handleRowsPerPageChange' },
        setSortOrder: { action: 'setSortOrder' }
    }
}


const Template = (args) => <TagTable {...args} />;
export const TagTableStory = Template.bind({});


const tagsData = [
    { name: 'Tag z', popular: 200 },
    { name: 'Tag c', popular: 150 },
    { name: 'Tag x', popular: 100 },
    { name: 'Tag f', popular: 57 },
    { name: 'Tag h', popular: 45 },
    { name: 'Tag m', popular: 30 },
    { name: 'Tag t', popular: 23 },
    { name: 'Tag i', popular: 20 },
    { name: 'Tag o', popular: 10 },
    { name: 'Tag k', popular: 5 },
];

TagTableStory.args = {

    tags: tagsData, 

    page: 1, 
    rowsPerPage: 10,
    sortConfig: { 
        sortBy: 'count', 
        sortOrder: 'desc', 

    },
    loading: false, 
}

export const Loading = Template.bind({});
Loading.args = {
    ...TagTableStory.args,
    tags: [],
    loading: true
}