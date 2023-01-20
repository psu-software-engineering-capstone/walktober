# Walktober

Welcome to the Walktober project! Walktober is a yearly fitness challenge at PSU, and this project aims to design and implement a new software platform to support the event. The new platform should have a modern look and feel, be responsive and accessible on different devices, and have improved design, graphics, and branding. It should also have better controls, analytics, and be more fun for participants. Additionally, it should have a simpler configuration for PSU administrators, with a focus on how PSU runs the Walktober event, and provide backend reports.

## Getting started

To get started with this project, you will need to have Node.js installed on your system. If you don't have it already, you can download and install it from the [Node.js website](https://nodejs.org/ko/).

Once you have Node.js installed, you can install the Ionic CLI with npm by running the following command:

```bash
npm install -g @ionic/cli
```

If you previously had the Ionic CLI installed, you may need to uninstall it and then install the updated version due to a change in package name. To do this, run the following commands:

```bash
$ npm uninstall -g ionic
$ npm install -g @ionic/cli
```

Next, clone this repository to your desktop using the following command:

```bash
git clone https://github.com/psu-software-engineering-capstone/walktober.git
```

Next, install all the required packages by running the following command in the root of your project:

```bash
$ npm install
```

## Running the app

Most of the development work for this app can be done right in the browser using the ionic serve command:

```bash
$ ionic serve
```

If ionic serve command does not work, try using the npm run start command:

```bash
$ npm run start
```

To run the app on iOS, you will need to have Xcode installed on your Mac. Once you have Xcode set up, you can run the following command in the root of your project:

```bash
$ ionic cap run ios
```

This will build and run the app on an iPhone or iPad simulator that is installed on your Mac.

To run the app on Android, you will need to have Android Studio and the Android SDK installed on your computer. Once you have those set up, you can run the following command in the root of your project:

```bash
$ ionic cap run android
```

This will build and run the app on an Android emulator that is installed on your computer, or on a connected Android device if one is detected.

## Troubleshooting

If you encounter any permission issues while working with this project, try following the instructions on resolving permission errors in the [Ionic documentation](https://ionicframework.com/docs/developing/tips#resolving-permission-errors).
