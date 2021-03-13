# ToulisThesis
 This repository contains the app developed during my diploma thesis in the department of Electrical and Computer Engineering of University of Patras.
 The goal of the app is to mainly showcase technologies such as React Native as a tool for mobile development. The app's function is to provide interaction between the user and spaces of cultural importance.

 In order to run the app on your local machine, some steps need to be followed in order to complete the setup. 


Setup:

Once cloned from the depository, navigate to the project directory. First you will need to delete the package-lock.json file. Next, on a command window run <npm install>. This should install the dependencies of the project. 

The app is focused on an android version, so Android Studio is needed to run the app on a simulated device. Following the instructions in the link provided under the React Native CLI Quickstart tab, you can complete the setup and launch the app in a virtual android device: https://reactnative.dev/docs/environment-setup. The steps necessary are only the ones under the Android development environment section.


Launch:

To launch the app, open two terminals. From the root of the project directory write <npx react-native start>. This will start the Metro Javascript Bundler. Once this process is complete, on the next terminal you can initialize the app in the android emulator by writing <npx react-native run-android>. The first initialisation will take a couple of minutes, but if there are no issues, the app will load on the virtual device.


