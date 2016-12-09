# backbone-boilerplate

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
