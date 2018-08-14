# Redis CRDT Demo

## How to use the app

1. Follow the instructions on https://github.com/redislabsdemo/RedisCRDTDockerScripts to setup a three-node cluster of active-active Redis Enterprise database.

2. Run `npm install` to install all the node modules required for this application.

3. Run multiple instances of the application as follows:
````
node server.js 3000 12000 Atlanta
node server.js 3002 12002 London
node server.js 3004 12004 Rio
````

In the command,`node server.js 3000 12000` the application runs on HTTP port 3000, and connects to Redis Enterprise on port 12000.

4. Open the app on three different browsers with the following URLs:

http://localhost:3000

http://localhost:3002

http://localhost:3004

5. Click on the pictures to increment their counters. Test how the counters work with split and connected networks.
