import type { Meta, StoryObj } from '@storybook/angular';
import { AppComponent } from './app.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<AppComponent> = {
  component: AppComponent,
  title: 'AppComponent'
  // Add any additional parameters or decorators if needed
};
export default meta;
type Story = StoryObj<AppComponent>;

export const Primary: Story = {
  args: {
    // Add any default args for the primary story
  },
  // Optionally add a play function to simulate interactions
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Add any interactions or assertions for the primary story
  }
};

export const Heading: Story = {
  args: {
    // Add any specific args for the heading story
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/app works!/gi)).toBeTruthy();
  }
};

// Add more stories to demonstrate different states or features of the component
export const WithCustomTitle: Story = {
  args: {
    // Example: title: 'Custom Title'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Add assertions to verify the custom title is rendered
  }
};

// Add more stories as needed
