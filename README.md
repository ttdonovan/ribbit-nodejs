Ribbit Nodejs
=============

Ribbit is Node client for receiving Hoptoad (http://hoptoadapp.com) notifications. This was a first attempt at working with Node. Any feedback or recommendations are welcome. Enjoy.

**Usage:**

    ./chmod a+x run
    ./run hoptoad_client.js <APP_NAME> <AUTH_TOKEN>

To find the app name and auth token log into http://your_app.hoptoadapp.com and look under 'Profile'.

Requirements
------------

  * Node.js
  * Growl and growlnotify

**To build Node:**

    git clone git://github.com/ry/node.git
    cd node
    ./configure
    make
    make install

Vendor
------

  * Underscore.js 1.0.4
    * http://github.com/documentcloud/underscore/ (source)
    * http://documentcloud.github.com/underscore/ (documentation)

### TODO

  * ability to run multiple Hoptoad clients
  * read app name and auth token from file something like ~/.hoptoad_client

### Contributors

  * Tanner Donovan