ffi-builder
========
### What is Foreign Function Interface(`ffi`) on `Node.js `?
`ffi` is a Node.js addon for loading and calling dynamic libraries using
pure JavaScript. It can be used to create bindings to native libraries without
writing any `C++` code.
### First things first
* This package is just a short hand to maintain libraries from differenct languages to your `Node.js` project directory.
* Please make sure you have the language build tools installed on your system, this library doesn't provide any build system.
* Refer [ffi-factory-examples] for a working code.
* Read `ffi` documentation for consuming the library

>**Notice: This module is not an replacement for the `ffi` package, infact thi module dosen't even depend on the `ffi` package.**

### What `ffi-builder` has to offer?
Well, `ffi-builder` provides flexibility to keep the dynamic library source code directly in the `Node.js` project directory (symbolic link directory can also be used) and provides an option to build or republish the library via `Node.js` process.

> The sole purpose of this package is to maintain the external dynamic library source code inside the `Node.js` directory, but this can also be used as an individual build system.

>**Notice: This is not a replacement for ffi package, infact this has no dependency over the ffi package**

How to?
-------
* Anywhere in your `Node.js` project directory, create a folder to put all the library files *(preferebly **addons** directory on project root folder)*
* For a more detailed introduction to ffi-builder, see the [ffi-builder docs][wiki-link].
* For a more detailed introduction to ffi, see the [node-ffi tutorial page][ffi-tutorial].

Requirements
-------
* Node.js
* External library build tools
* Command Prompt/Terminal

Installation
-------
Make sure you have all the requirements installed and run the following command on the working directory:
``` bash
$ npm install ffi-builder
```

License
-------
GNU General Public License v3.0. See `License` file.

[ffi-factory-examples]: https://github.com/mahadeer13/ffi-factory-examples
[ffi-tutorial]: https://github.com/node-ffi/node-ffi/wiki/Node-FFI-Tutorial
[wiki-link]: https://github.com/mahadeer13/ffi-builder/wiki/ffi-builder-API-Reference