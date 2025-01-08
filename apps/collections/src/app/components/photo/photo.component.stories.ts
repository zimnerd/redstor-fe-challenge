import type { Meta, StoryObj } from '@storybook/angular';
import { PhotoComponent } from './photo.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<PhotoComponent> = {
  component: PhotoComponent,
  title: 'PhotoComponent'
};
export default meta;
type Story = StoryObj<PhotoComponent>;

export const Primary: Story = {
  args: {}
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/photo works!/gi)).toBeTruthy();
  }
};
