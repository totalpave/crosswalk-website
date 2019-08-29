/*
 * version.js used to dynamically update the content
 * shown on the main site, including the home page and any
 * content loaded from documentation/, contribute/.
 *
 * Client side replacement occurs in xwalk.js replace_version_string
 *
 * To see which pages from the main site are using this replacement:

   grep -ricE '[^!]\${XWALK(-[^-]+){3}}' * | grep -v '0$'

 *
 * The following pattern is replaced:
 *
 * ${XWALK-<CHANNEL>-<PLATFORM>-<ARCH>}
 *
 * To prevent replacement (eg., for a wiki page documenting
 * this process, prefix the ${XWALK...} with an exclamation (!)
 *
 * For example:
 *
 *   crosswalk-${XWALK-BETA-ANDROID-X86}.zip
 *   crosswalk-!${XWALK-BETA-ANDROID-X86}.zip
 *
 * would result in:
 *
 *   crosswalk-2.31.27.0.zip
 *   crosswalk-${XWALK-BETA-ANDROID-X86}.zip
 *
 * See './site.sh promote' for a script to update this file
 * and push it to the website without pushing an entirely new
 * website (eg., without needing to run './site.sh mklive').
 *
 */

var stable="16.45.421.19";
var beta="17.46.448.6";
var canary="18.46.471.0";

var versions = {
    stable: {
        android: {
            x86: stable,
            arm: stable
        },
        'android-webview': {
            x86: stable,
            arm: stable
        },
        cordova: {
            x86: stable,
            arm: stable
        }
    },
    beta: {
        android: {
            x86: beta,
            arm: beta
        },
        'android-webview': {
            x86: beta,
            arm: beta
        },
        cordova: {
            x86: beta,
            arm: beta
        }
    },
    canary: {
      android: {
          x86: canary,
          arm: canary
      },
      'android-webview': {
          x86: canary,
          arm: canary
      },
      cordova: {
          x86: canary,
          arm: canary
      }
    }
};
