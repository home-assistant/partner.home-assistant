import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/js/index.js', // Update this to your actual JS file path
    output: {
        file: '_site/js/index.js',
        format: 'iife', // IIFE is good for browser use
        name: 'MyBundle', // Global variable name
        sourcemap: true
    },
    plugins: [
        resolve(), // Allows importing modules from node_modules
        terser()   // Minifies the output
    ]
};