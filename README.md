# Electron App Template With Auto-Updater
![status](https://img.shields.io/badge/status-complete-green) ![Electron version](https://img.shields.io/badge/electron-v13.5.1-blue) [![GitHub Release Date](https://img.shields.io/github/release-date/wrrnlim/electron-app-template)](https://github.com/wrrnlim/electron-app-template/releases)

This is a template repository for an [Electron](https://www.electronjs.org/) app with an auto-update menu option (Help -> Check for updates). Trigger the auto-update code within `app.on('ready')` to have auto updates on start up. The auto-updater uses [electron-updater](https://www.npmjs.com/package/electron-updater) to check app version against GitHub Releases, and updates the app if necessary. The below guide will help you get started on an Electron project.  

*Note: Releases must be on a public repository for auto-updates to work. If you want to keep your code private, create a separate repository, make these [changes](https://github.com/wrrnlim/electron-app-template/wiki/Starting-an-Electron-Project#private-repository-workaround), and create releases there.*

Check out the [guide](https://github.com/wrrnlim/electron-app-template/wiki/Starting-an-Electron-Project) in this repository's wiki to create your own Electron app with an auto-updater!

![screenshot](/assets/img/electron-app-template-screenshot.png)

## Table of Contents

- [Initialization](#Initialization)
- [Starting your own Electron project](#starting-your-own-electron-project)
- [Building the app](#Building-the-app)

## Initialization

To get started on an Electron app using this template, create a repository from this template and install all dependencies with:

```shell
$ npm install
```  

Then run with:

```shell
$ npm start
```

## Things to change

Make sure to change the following in `package.json`

- [ ] App name, version, description, etc
- [ ] `"build":{"appId"}` to be your release repository
- [ ] Set your app icon path in `build`
And change the following in `index.js`
- [ ] Menu links in `menuTemplate` variable
- [ ] Window titles
- [ ] Change icon path

## Starting your own Electron project

If you are completely new to npm and/or Electron, I have outlined what this code does and the steps I have taken to create this repository in the [wiki](https://github.com/wrrnlim/electron-app-template/wiki/Starting-an-Electron-Project).

## Resources used

- `index.html` is adapted from [Heroes Template](https://getbootstrap.com/docs/5.0/examples/heroes/) from Bootstrap.
