/** @format */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			// '/api': 'https://orca-app-hv5fr.ondigitalocean.app/',
			// '/api': 'http://localhost:8000/',
		},
	},
});
