import React from "react";

import ErrorsToasts from ".";

import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  component: ErrorsToasts,
  title: "MiniComponents/ErrorsToasts",
} as ComponentMeta<typeof ErrorsToasts>;

const Template: ComponentStory<typeof ErrorsToasts> = (args) => (
  <ErrorsToasts {...args} />
);

export const Main = Template.bind({});
Main.args = {
  errors: [{ messageHeader: "Что-то пошло не так", intent: "danger" }],
};
