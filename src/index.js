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
      corsProxy: 'https://cors.isomorphic-git.org',  // Required for cross-origin Git servers in browsers
      url: 'https://github.com/isomorphic-git/isomorphic-git',
    });
    console.log('Repo cloned successfully!');
  } catch (err) {
    console.error('Error cloning:', err);
  }
}

// Run on page load
window.addEventListener('load', cloneRepo);
