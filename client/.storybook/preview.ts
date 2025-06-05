import type { Preview } from '@storybook/react-webpack5';
import '../public/css/tailwind.css';

const preview: Preview = {
	parameters: {
		layout: 'centered',
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
