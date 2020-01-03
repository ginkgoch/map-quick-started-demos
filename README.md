# Quick Started Demos for Map Core

This represents several simple demos for pure core library. It doesn't introduce any framework to building web, desktop or mobile. Just few lines of code to show the power of its loading, query functions.

## Prerequisite

Before we kick start the demos, we need to do some preparations. 

1. [canvas](https://www.npmjs.com/package/canvas) is a 3rd party graphics library that our map component relies on. It depends on Cairo v1.10.0 or later. Choose the corresponding command to install the dependencies.
   * macOS: `brew install pkg-config cairo pango libpng jpeg giflib librsvg`
   * Ubuntu: `sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev`
   *  `Fedora: `sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel
   * Solaris: `pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto`
   *  `OpenBSD: `doas pkg_add cairo pango png jpeg giflib`
   * Windows see [this wiki](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows) for detail
2. Install the dependency with `yarn add canvas ginkgoch-map`.

> The demo required data (*.shp, *.json, *.csv) are located in the `data` folder in this parent folder for sharing data across multiple sample categories.

## Demos

Each js file is a standalone demo. Execute it with `node [replace with js file name]`.

### Quick Started

#### Render a simple map

[render-simple-map.js](quick-started/render-simple-map.js) represents how to load a shapefile and render into an image.

![render-simple-map](core/quick-started/render-simple-map.png)

#### Render a colorful map

[render-colorful-map.js](quick-started/render-colorful-map.js) represents how to load a shapefile, then extract its property table and find out the distinct field values. When we got the distinct values, it automatically generate a `ValueStyle` to set an exclusive `FillStyle` for each values. 

![render-colorful-map](core/quick-started/render-colorful-map.png)