# InteractivePlayGround

Interactive Playground used within browser to showcase widgets.

# Instructions
* Clone the repository
* cordova prepare
* npm run start-dev

To run the app:
* Android - cordova run android
* IOS - cordova run ios
* Browser - npm run browser -- -Dorg.gradle.java.home=<JAVA8_HOME>
* SWT - npm run swt -- -Dorg.gradle.java.home=<JAVA8_HOME>

# Local dev testing
To serve files from localhost for testing playground:

* Use the following security policy in index.html of android:
```
<meta http-equiv="Content-Security-Policy"
content="
default-src 'self' data: blob:;
script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: http://192.168.1.37:8081;
script-src-elem 'self' blob: http://192.168.1.37:8081;
connect-src 'self' http://192.168.1.37:8081 ws://192.168.1.37:8081 http://192.168.1.37:8080;
img-src 'self' data: content: http:;
style-src 'self' 'unsafe-inline';
media-src *;
worker-src 'self' blob:;">
```

* Add to application tag of AndroidManifest.xml 
```
android:usesCleartextTraffic="true"
```
