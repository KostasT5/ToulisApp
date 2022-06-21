# PlacesApp
This repository contains the app developed during my diploma thesis in the department of Electrical and Computer Engineering of University of Patras. Built on the robust cross-platform framework of React Native, PlacesApp utilizes powerful and expansive data sets provided by Google APIs and location-based technologies to deliver information on cultural and sites of interest in the proximity of the user. Other than recommending places to visit, the app generates a path between these locations of interest for the user to navigate. There are four distinct thematic paths for the user to follow: tourist attractions, churches, museums, parks & squares. 

PlacesApp makes use of Maps API to display the map of the user's general area, Places API to fetch details on locations in either one of the four categories mentioned and Directions API to generate and suggest a route between them. The outgoing and ingoing data is filtered through a cloud server running on Heroku. The user can check photos and reviews of a location uploaded by previous visitors. In addition, they can submit their own photo and review once they are in close proximity with such a location.

![image](https://user-images.githubusercontent.com/58190713/174788066-83732ea3-d530-4602-a350-c020bbb9c79c.png)



The app has completed the first rounds of development and is fully functional. Some additional work needs to be done, in terms of polish and implementing user feedback from the testing and review process, before it is available through the Android and iOs app stores. However, if you wish to run the app in development mode, after cloning this repository you can follow the instructions below:

Setup:

Navigate to the project directory and run <npm install>. This should install the dependencies of the project. If this command doesn't complete successfully, you will need to delete the package-lock.json file from the project's root directory and try again.

The app is focused on an android version, so it can run on an Android device or a simulated device through Android Studio. Following the instructions in the link provided under the React Native CLI Quickstart tab, you can complete the setup and launch the app in a virtual android device: https://reactnative.dev/docs/environment-setup. 


