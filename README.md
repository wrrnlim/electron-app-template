# Electron App Template With Auto-Updater

This is a template repository for an [Electron](https://www.electronjs.org/) app with an auto-update menu option. Trigger the auto-update code within `app.on('ready') to have auto updates on start up. The auto-updater uses [electron-updater](https://www.npmjs.com/package/electron-updater) to check app version against GitHub Releases, and updates the app if necessary. The below guide will help you get started on an Electron project.

## Initialization

To get started on an Electron app using this template, clone the reposity and install all dependencies with:  
```$ npm install```  
and run with:  
```$ npm start```

## Guide to set up your own Electron project with auto-updater

The following steps will explain how I created this template repository. I am not an expert in Electron and there may be more elegant ways to create an auto-updating Electron app; this is just the steps I took to create my first Electron app. Please open an [issue](https://github.com/wrrnlim/electron-app-template/issues/new/choose) if there is a better way to complete any of the steps below!  

The examples will utilize [`npm`](https://www.npmjs.com/). You may also use [`yarn`](https://yarnpkg.com/). `npm` can be installed with [nodejs](https://nodejs.org/en/).  

To start an npm project:  
```$ npm init```  
Add the `-y` flag to skip initialization prompts.  

Then add Electron as a dev dependency:  
```$ npm i electron@13.5.1 --save-dev --save-exact```  
We will be using Electron version 13.5.1 in this template. You may use another version, but the template may not work as functions differ between versions. ``--save-exact` ensures that `npm` will always use version 13.5.1 of Electron.  

Add electron-builder and electron-updater as a dev dependecy:  
```$ npm i electron-updater --save-dev```  

## Resources used

- `index.html` is adapted from [Heroes Template](https://getbootstrap.com/docs/5.0/examples/heroes/) from Bootstrap.
