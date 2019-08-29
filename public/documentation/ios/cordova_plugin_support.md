#Cordova Plugin Support

Crosswalk for iOS provides support for Cordova Plugins by introducing the Cordova.framework based on the Crosswalk Extension mechanism. The [Cordova extension](https://cocoapods.org/pods/crosswalk-extension-cordova) is responsible for managing the life cycle of the Cordova Plugins, replicates the environment that Cordova Plugins run in, and provides the functionalities that Cordova Plugins need based on the Crosswalk Extension framework. You can leverage the existing Cordova Plugins to extend Crosswalk's functionalities without changing any code of the plugins.

## Cordova Plugin API

We are going to support all the Cordova Plugin API in the coming future, the status of API availability is:

###  Supported

* [org.apache.cordova.battery-status](https://github.com/apache/cordova-plugin-battery-status)
* [org.apache.cordova.console](https://github.com/apache/cordova-plugin-console)
* [org.apache.cordova.contacts](https://github.com/apache/cordova-plugin-contacts)
* [org.apache.cordova.device](https://github.com/apache/cordova-plugin-device)
* [org.apache.cordova.device-motion](https://github.com/apache/cordova-plugin-device-motion)
* [org.apache.cordova.device-orientation](https://github.com/apache/cordova-plugin-device-orientation)
* [org.apache.cordova.dialogs](https://github.com/apache/cordova-plugin-dialogs)
* [org.apache.cordova.file](https://github.com/apache/cordova-plugin-file)
* [org.apache.cordova.file-transfer](https://github.com/apache/cordova-plugin-file-transfer)
* [org.apache.cordova.geolocation](https://github.com/apache/cordova-plugin-geolocation)
* [org.apache.cordova.globalization](https://github.com/apache/cordova-plugin-globalization)
* [org.apache.cordova.inappbrowser](https://github.com/apache/cordova-plugin-inappbrowser)
* [org.apache.cordova.media](https://github.com/apache/cordova-plugin-media)
* [org.apache.cordova.media-capture](https://github.com/apache/cordova-plugin-media-capture)
* [org.apache.cordova.network-information](https://github.com/apache/cordova-plugin-network-information)
* [org.apache.cordova.vibration](https://github.com/apache/cordova-plugin-vibration)
* [org.apache.cordova.splashscreen](https://github.com/apache/cordova-plugin-splashscreen)
* [org.apache.cordova.statusbar](https://github.com/apache/cordova-plugin-statusbar)

### Under Development

* [org.apache.cordova.camera](https://github.com/apache/cordova-plugin-camera)

You are warmly welcome to contribute together with us to enable more Cordova Plugins for Crosswalk.

## Quickstart

In this section we'd like to show you a simple demo application with `org.apache.cordova.device` embedded to demonstrate the processes to create an application with Cordova Plugin support.

### Setup DeviceDemo Project

#### Create DeviceDemo Project

We need to create an application project to host the Cordova plugin and the web resources.

1. Create `DeviceDemo` Project

  * Open Xcode. Create an iOS application with the "Single View Application" template with project name: "DeviceDemo". Select "Swift" as project language.

  * For quick demo, replace the auto-generated `ViewController.swift` with the corresponding file in [crosswalk-ios/AppShell/AppShell/CordovaViewController.swift](https://github.com/crosswalk-project/crosswalk-ios/blob/master/AppShell/AppShell/CordovaViewController.swift), which has setup a XWalkView instance for you already.

  * Just clear the contents of the auto-generated `ViewController.swift` file, replace them with: [crosswalk-ios/AppShell/AppShell/CordovaViewController.swift](https://github.com/crosswalk-project/crosswalk-ios/blob/master/AppShell/AppShell/CordovaViewController.swift).

2. Use [CocoaPods](https://cocoapods.org/) to integrate the [crosswalk-ios](https://cocoapods.org/pods/crosswalk-ios) and [crosswalk-extension-cordova](https://cocoapods.org/pods/crosswalk-extension-cordova) into the project.

  * In the `DeviceDemo` directory, create a file called `Podfile`:
  ```cmdline
  > cd DeviceDemo
  > touch Podfile
  ```

  With the contents as below:

  ```
  platform :ios, '8.1'
  use_frameworks!
  pod 'crosswalk-extension-cordova', '~> 1.1'
  ```

  This will tell CocoaPods that the deploy target is iOS 8.1+ and to integrate library `crosswalk-extension-cordova` with the latest version of `1.1.x`. Remember to add `use_frameworks!` which is because `crosswalk-ios` is partly written in Swift and it has to be built as a framework instead of a static library.

  You may notice that we haven't added the dependency of `crosswalk-ios`. This is not necessary because `crosswalk-extension-cordova` depends on `crosswalk-ios` and the dependency is automatically handled by CocoaPods.

  * Install the `Pod` targets into the project.

  Quit the Xcode firstly, then in the `DeviceDemo` directory, use the following command to install pods:

  ```cmdline
  > pod install
  ```

  Then you'll find a `DeviceDemo.xcworkspace` is generated, and CocoaPods will notify you to use this workspace instead of the `DeviceDemo.xcodeproj` from now on.

3. Open the `DeviceDemo.xcworkspace`, try to build the `DeviceDemo` application target, to see if it works fine.

#### Import `org.apache.cordova.device` Plugin Resources

Next step is to import both native and html5 resources from [org.apache.cordova.device](https://github.com/apache/cordova-plugin-device) into the project.

1. Clone org.apache.cordova.device

  ```cmdline
  > git clone https://github.com/apache/cordova-plugin-device.git
  ```

2. Add native part of the plugin source file in to the application

  * Select `DeviceDemo` project, in `File` -> `Add Files to "DeviceDemo"...`,

  * add `CDVDevice.h` and `CDVDevice.m` from `cordova-plugin-device/src/ios` into the project.

  * Notice: Xcode will notify you if you need to create the bridging header, just create it.

3. Add HTML5 part of resources into the application

  ```cmdline
  > cd DeviceDemo; mkdir -p www/plugins/org.apache.cordova.device/www/
  > cd www; 
  > cp ../../cordova-plugin-device/www/device.js \
       plugins/org.apache.cordova.device/www
  > vim plugins/org.apache.cordova.device/www/device.js
  ```

  As the `device.js` only provides the content of implementation of the `device` object, we need to wrap it into a cordova module before importing it into the web app's context. (We will provide a script to make this step automatic.)

  ```javascript
  cordova.define("org.apache.cordova.device.device", function(require, exports, module) {
    // The original content of device.js goes here.
    ...
  });
  ```

4. Create the configuration needed by Cordova Extension

  We also need to add a configuration file to tell Cordova Extension how to load the Cordova Plugin. Here we simulated the way that Cordova project does, in order to provide the same behavior as the Cordova project. In `www` directory:

  ```cmdline
  > touch cordova_plugins.js
  > vim cordova_plugins.js
  ```

  With the content:

  ```javascript
  cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
      {
          "file": "plugins/org.apache.cordova.device/www/device.js",
          "id": "org.apache.cordova.device.device",
          "clobbers": [
              "device"
          ]
      }
  ];
  module.exports.metadata =
  // TOP OF METADATA
  {
      "org.apache.cordova.device": "0.2.12"
  }
  // BOTTOM OF METADATA
  });
  ```

#### Create The Web Apps

After importing the device plugin, we need to create the web application part to leverage the ability of the device plugin.

1. Create `index.html` in `www` directory.

  ```cmdline
  > touch index.html
  > vim index.html
  ```

  With the content:

  ```html
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <style>
          table, th, td {
              border: 1px solid black;
              border-collapse: collapse;
          }
          th, td {
              padding: 5px;
          }
      </style>
      <title>Cordova device API plugin demo</title>
  </head>
  <body>
      <p>This is the demo page for testing org.cordova.plugin.device.</p>
      <table id='table' style='width:100%'>
          <caption>Device Properties</caption>
          <thead>
              <tr>
                  <th>Name</th>
                  <th>Value</th>
              </tr>
          </thead>
      </table>
      <script>
          document.addEventListener("deviceready", onDeviceReady, false);
          function onDeviceReady() {
              var table = document.getElementById('table');
              for (var propName in device) {;
                  if (typeof(device[propName]) == 'function') {
                      continue;
                  }
                  var row = document.createElement('tr');
                  var name = document.createElement('td');
                  var value = document.createElement('td');
                  name.innerHTML = propName;
                  value.innerHTML = device[propName];
                  row.appendChild(name);
                  row.appendChild(value);
                  table.appendChild(row);
              }
          }
      </script>
  </body>
  </html>
  ```

  In this demo we will listen to the `deviceready` event and retrieve the system information from the `device` object, and then add them into a table. The `device` object is provided by `org.apache.cordova.device` plugin and the system information is gathered from native side.

2. Embed the web resources into the project

  We need to add the web resources(including plugin and app resources) into the project and package as a native iOS application.

  * Select `DeviceDemo` project, in `File` -> `Add Files to "DeviceDemo"...`,

  * Add `www` directory into the project, with `Create folder references` option selected.

3. Create the `manifest.plist` for the project

  The `manifest.plist` describes the extension info embedding with the application, as well as the Cordova Plugin info with it.

  * Select `DeviceDemo` project, in `File` -> `New` -> `File`,

  * Choose `iOS` -> `Resource` -> `Property List`, and enter the name: `manifest`.

  Then add:

  * `start_url` with String type and `index.html` as value.
  * `xwalk_extensions` with Array type, and add:
    * `xwalk.cordova` as an entry.
  * `cordova_plugins` with Array type and add an item of Dictionary type within it. In the dictionary type add:
    * `class` for key and `CDVDevice` for value;
    * `name` for key and `Device` for value;

4. Build and run the `DeviceDemo` application target on `iOS Device` to see if it works fine.

  Now the demo should be ready to use. That's it.

## Demos

In the [demos](https://github.com/crosswalk-project/ios-extensions-crosswalk/tree/master/demos) directory of [ios-extension-crosswalk](https://github.com/crosswalk-project/ios-extensions-crosswalk) project, there are two demos to demonstrate the usage of Cordova plugin support. You may try them out to see how it works.
