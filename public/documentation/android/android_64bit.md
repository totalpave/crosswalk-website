# Packaging apps for 64-bit devices

By default, Crosswalk applications are packaged for 32-bit architectures. It's possible to specify 64-bit targets for both ARM and x86 using the `-t <target-archs>` option in the `crosswalk-pkg` command:

```cmdline
<target-archs>
   List of CPU architectures for which to create packages.
   Currently supported ABIs are: armeabi-v7a, arm64-v8a, x86, x86_64
   * Prefixes will be matched, so "a","ar", or "arm" yield both ARM APKs
   * Same for "x" and "x8", but "x86" is an exact match, only x86-32 conforms
   * Short-hands "32" and "64" build ARM and x86 for the requested word size
   * Default behavior is equivalent to "32", creation of 32-bit installers
   Example: --targets="arm x86" builds both ARM plus 32-bit x86 packages
```

For example to build both ARM and x86 64-bit packages:

```cmdline
> crosswalk-pkg -c beta -t 64 /path/to/app
```

To build only an x86 64-bit package:

```cmdline
> crosswalk-pkg -c beta -t x86_64 /path/to/app
```

To build both 32-bit and 64-bit packages for x86 architectures:

```cmdline
> crosswalk-pkg -c beta -t x /path/to/app
```

The 64-bit packages can be uploaded to the Google Play Store and will be automatically selected for compatible devices. At the moment you need to specify either the Beta or Canary channel because 64-bit support is not yet available from the stable releases.

If you are using Crosswalk in shared mode, your application will automatically download the 64-bit optimized version of Crosswalk from the Play Store and no special action is required when packaging.

Note: support for 64-bit is not yet available in the Crosswalk Cordova Webview plugin and will be enabled soon.

