import type { Meta, StoryObj } from '@storybook/angular';
import { CollectionComponent } from './collection.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta<CollectionComponent> = {
  component: CollectionComponent,
  title: 'CollectionComponent',
  decorators: [
    moduleMetadata({
      imports: []
    })
  ]
};
export default meta;
type Story = StoryObj<CollectionComponent>;

export const Primary: Story = {
  args: {}
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/collection works!/gi)).toBeTruthy();
  }
};
