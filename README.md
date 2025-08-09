# Webpack with Isomorphic-Git Example

This is a simple example project demonstrating how to set up a Webpack-bundled web application that
uses [isomorphic-git](https://isomorphic-git.org/), a pure JavaScript implementation of Git that
works in both Node.js and browsers. The project includes a basic browser-based Git clone operation
using LightningFS for file system emulation.

## Prerequisites

- Node.js (version 14 or higher) and npm installed.
- Basic knowledge of the command line.

## Installation

1. Create a new project directory and navigate into it:
   ```
   mkdir webpack-isomorphic-git && cd webpack-isomorphic-git
   ```

2. Initialize the npm project:
   ```
   npm init -y
   ```

3. Install the required dependencies:
   ```
   npm install --save-dev webpack webpack-cli html-webpack-plugin buffer
   npm install isomorphic-git @isomorphic-git/lightning-fs
   ```

## Configuration

1. Create a `webpack.config.js` file in the root directory with the following content:
   ```javascript
   const path = require('path');
   const HtmlWebpackPlugin = require('html-webpack-plugin');
   const webpack = require('webpack');

   module.exports = {
     entry: './src/index.js',
     output: {
       filename: 'bundle.js',
       path: path.resolve(__dirname, 'dist'),
     },
     mode: 'development',
     resolve: {
       fallback: {
         buffer: require.resolve('buffer/'),
       },
     },
     plugins: [
       new HtmlWebpackPlugin({
         title: 'Webpack with isomorphic-git',
       }),
       new webpack.ProvidePlugin({
         Buffer: ['buffer', 'Buffer'],
       }),
     ],
   };
   ```

2. Create a `src` directory and add an `index.js` file inside it with the following content:
   ```javascript
   import * as git from 'isomorphic-git';
   import http from 'isomorphic-git/http/web';
   import LightningFS from '@isomorphic-git/lightning-fs';

   // Initialize file system
   const fs = new LightningFS('myfs');

   // Example: Clone a repo (runs in browser console)
   async function cloneRepo() {
     const dir = '/tutorial';
     try {
       await git.clone({
         fs,
         http,
         dir,
         corsProxy: 'https://cors.isomorphic-git.org',
         url: 'https://github.com/isomorphic-git/isomorphic-git',
       });
       console.log('Repo cloned successfully!');
     } catch (err) {
       console.error('Error cloning:', err);
     }
   }

   // Run on page load
   window.addEventListener('load', cloneRepo);
   ```

3. Update your `package.json` file to include a build script under the `"scripts"` section:
   ```json
   "scripts": {
     "build": "webpack"
   }
   ```

## Usage

1. Build the project:
   ```
   npm run build
   ```

2. This will generate a `dist` folder containing `index.html` and `bundle.js`. Open `dist/index.html` in your web browser (you may need a local server for full functionality, e.g., install `http-server` globally with `npm install -g http-server` and run `http-server dist`).

3. Check the browser console to see the Git clone operation in action. It should log "Repo cloned successfully!" upon completion.

## Optional: Development Server

For hot reloading during development:

1. Install the Webpack dev server:
   ```
   npm install --save-dev webpack-dev-server
   ```

2. Update `webpack.config.js` to include:
   ```javascript
   devServer: {
     contentBase: './dist',
     port: 8080
   }
   ```

3. Add a start script to `package.json`:
   ```json
   "scripts": {
     "build": "webpack",
     "start": "webpack serve"
   }
   ```

4. Run the dev server:
   ```
   npm start
   ```
   Visit `http://localhost:8080` in your browser.

## Notes

- This setup uses a CORS proxy (`https://cors.isomorphic-git.org`) to handle browser same-origin policy issues during Git operations. For production, consider setting up your own proxy.
- Switch Webpack's `mode` to `'production'` for optimized builds.
- Explore more isomorphic-git APIs in the [official documentation](https://isomorphic-git.org/docs/en/alphabetical) for advanced Git operations.
