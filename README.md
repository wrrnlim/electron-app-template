# Electron App Template With Auto-Updater
![status](https://img.shields.io/badge/Status-Work%20in%20Progress-yellow)

This is a template repository for an [Electron](https://www.electronjs.org/) app with an auto-update menu option. Trigger the auto-update code within `app.on('ready')` to have auto updates on start up. The auto-updater uses [electron-updater](https://www.npmjs.com/package/electron-updater) to check app version against GitHub Releases, and updates the app if necessary. The below guide will help you get started on an Electron project.  

*Note: Releases must be on a public repository for auto-updates to work. If you want to keep your code private, create a separate repository and create releases there.*

![screenshot](/assets/img/electron-app-template-screenshot.png)

## Table of Contents

- [Initialization](#Initialization)
- [npm basics](#npm-basics)
- [Setting up auto-updater](#guide-to-set-up-your-own-electron-project-with-auto-updater)
- [Building the app](#Building-the-app)

## Initialization

To get started on an Electron app using this template, clone the reposity and install all dependencies with:

```shell
$ npm install
```  

and run with:

```shell
$ npm start
```

## Guide to set up your own Electron project with auto-updater

The following steps will explain how I created this template repository. I am not an expert in Electron and there may be more elegant ways to create an auto-updating Electron app; this is just the steps I took to create my first Electron app. Please open an [issue](https://github.com/wrrnlim/electron-app-template/issues/new/choose) if there is a better way to complete any of the steps below!  

The examples will utilize [npm](https://www.npmjs.com/). You may also use [yarn](https://yarnpkg.com/). `npm` can be installed with [nodejs](https://nodejs.org/en/).  

To start an npm project:

```shell
$ npm init
```  

Add the `-y` flag to skip initialization prompts.  

Then add Electron as a dev dependency:

```shell
$ npm i electron@13.5.1 --save-dev --save-exact
```

We will be using Electron version 13.5.1 in this template. You may use another version, but the template may not work as functions differ between major versions. `--save-exact` ensures that `npm` will always use version 13.5.1 of Electron.  

Add electron-builder and electron-updater as dependecies:

```shell
$ npm i electron-builder --save-dev
```

`electron-updater` has to be saved as a dependency, not as a dev-dependency:

```shell
$ npm i electron-updater --save
```

Add the following event based code to your Electron js file; by default it will be `index.js`:

```js
const { autoUpdater } = require("electron-updater"); // import the module

autoUpdater.on('checking-for-update', () => {
    showStatus('Checking for update...');
})
autoUpdater.on('update-available', (info) => {
    showStatus('Update found! Installation will begin shortly.');
})
autoUpdater.on('update-not-available', (info) => {
    showStatus('You have the newest version!');
})
autoUpdater.on('error', (err) => {
    showStatus('Error in auto-updater. ' + err);
})
autoUpdater.on('download-progress', (progressObj) => {
    showStatus('Downloading: ' + progressObj.percent.toFixed(2) + '%');
})
autoUpdater.on('update-downloaded', (info) => {
    showStatus('Update downloaded. Restart the app to apply update.');
});
```

`showStatus()` is a function that sends the status string to where you want to display it.


## Building the app

To build the app, add the following to `package.json`:

```json
"build": {
    "appId": "com.github.wrrnlim.electron-app-template",
    "win": {
    "icon": "assets/icons/icon.ico",
    "target": "nsis"
    },
    "nsis": {
    "oneClick": false
    },
    "directories": {
    "output": "release"
    }
}
```

Replace `wrrnlim` with your GitHub username and `electron-app-template` with the link to your public repository where releases will be made. You can set your icon path in `icon`, and change your build directory in `output`. The default build directory is `dist`. Note that for `.png` icons, the minimum size is 256x256px.

Add a product name if you like, and remember to change version number on new builds:

```json
  "name": "electron-app-template",
  "productName": "Electron App Template",
  "version": "2.0.0",
```

Next, add the following to the `scripts` section in `package.json`:

```json
"publish": "electron-builder -p always"
```

Set your GitHub [Personal Access Token (PAT)](https://github.com/settings/tokens/) as an environment variable:

```shell
$ export GH_TOKEN="<YOUR_TOKEN_HERE>"
```

Keep your PAT in a safe location. You will need to set it in your environment varibales everytime you need to build the app. nsure that there are no releases or draft releases in you repository with the same title. You can now build the app using:

```shell
$ npm run publish
```

This will create a draft release in your GitHub repository with the built app installer uploaded. Edit the release to publish it. These releases are what the auto-updater checks for when checking for updates.

## Resources used

- `index.html` is adapted from [Heroes Template](https://getbootstrap.com/docs/5.0/examples/heroes/) from Bootstrap.
