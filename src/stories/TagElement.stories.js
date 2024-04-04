import { TagElement } from "../components/TagElement";

export default {
    title: "TagElement",
    component: TagElement

}

const Template = (args) => <TagElement {...args} />;
export const TagElementStory = Template.bind({});
TagElementStory.args = {
    tag: {
        name: "tag name",
        count: 18907097
    }
}