# backbone-boilerplate
Backbone is not framework. Backbone+Marionette still is not a framework. It has not a lot of things out of the box, be prepared to write some "this-should-be-in-framework" by yourself. Backbone is just bricks which you can use to build SPA. Environment offers a lot of tools and libraries to cover other areas, so when you need implement pagination or something, someone probably already wrote it. This boilerplate gives you some tools and file structure, so you can just work with your code. 

## Quick start

1. Clone this repo using `git clone`.
1. Install dependencies with `npm install`.
1. Run `npm run watch:dev` to start building application
1. Run `npm run serve:mock` to start server with mocked api
1. Run `npm run provide:proxy:mock` to start proxy server delegating ajax calls to mock server

### Predefined run scripts

1. `build:prod` Building application (included concating and obfuscating)
1. `fix-code` Running lint --fix (usefull to clean up code before commits)
1. `serve:mock` Running local server with mocked api
1. `proxy` Running proxy server with delegation to remote server
1. `proxy:mock` Running proxy server with delegation to local server with mocks.
1. `test:console-report` Running test process and reporting results to console output
1. `test:file-report` Running test process and reporting results to file
1. `watch:dev` Running building process with watching files functionality
1. `watch:tests`: Running testing process with watching files functionality

## How to use
The approach to implement the proposed design intents to encapsulate each module in such a way that can be easily reused and doesn’t generate side effects. To handle dependencies between modules we use CommonJS that is supported by Browserify.
Presented structure allows you to implement MVC pattern with both: unidirectional (known currently from FLUX) and multidirectional data flow.

### Router
About basic usage you can read [Marionette.AppRouter documentation](http://marionettejs.com/docs/v2.4.7/marionette.approuter.html)
For better navigation through application you should register events. To keep triggers simple just pass essential data and the rest calculations keep inside event callbacks.
If in your application router is getting bigger you can always spit it into smaller chunks. Keep in mind that marionette allows you to add routs at runtime, so you can define them where needed/more comfortable to maintain.

### Screens
Screens are set of default properties, controller methods and views frames.
They are invoked by the router depending on a URL and represents top level application views, e.g. http://<server>/tasks -> screens/tasks/index.js.
They are responsible for interpreting data passed by the router and based on it send request to service and use required modules to process received data. Modules should return prepared view instance so screen's controller only render it in proper place. Screens shouldn't communicate with each other, because only one should be started at one time. When one screen is starting other should be stopped (also all used modules should be stopped with it).
Its responsibilities are:
1.	indicate all the dependencies to any other JavaScript functions and templates,
1.	render the DOM objects into the main HTML page,
1.	handle all the events over any DOM object in it,
1. manage the AJAX web services required for its functionality.

### Modules
Modules should provide complete parts of view with it's functionality. In perfect world all of them should be reusable. Modules can communicate with other modules and screens only using event triggers or provided API (choose one and keep it consistent). Each module should be built of as little parts as needed: a module consists of controller, view definition and HTML template(s); some modules can be built only with view definition and HTML template(s).

### Entities
Entities are responsible for defining data model and communication with APIs outside UI application. Entities communicate with other modules and screens only using event triggers or provided API (choose one and keep it consistent).

### Helpers
Provide utils and helpers

### Stores
Can be used as separate source for data if there is need to store some on client site at runtime. Responsible for caching data shared between different modules.

### Vendors
Provide abstract definitions or can register commands used by Screens or Modules. Eg. http vendor provide methods for different types of AJAX calls with additional functionality.
In our project we also put here caching functionality and different types of popups which was registered with reqres Marionette object.

### Behaviors
Definitions of Marionette behaviors used in application (eg. tabs, accordion, go to top, ect. functionality). More about Behaviors you can read in [Marionette documentation](http://marionettejs.com/docs/v2.4.7/marionette.behavior.html)
