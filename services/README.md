# Setup a Customized Map Server

In the previous page: [Quick Started Demos for Map Core](https://github.com/ginkgoch/map-quick-started-demos/blob/develop/README.md), I introduced the basic library of `Ginkgoch Map`. It allows developers to draw a map with shapefiles or features with thematic styles, then store it as an image on disk. It is a pretty simple and pure demo which could only guide to build some console utilities.

But `Ginkgoch` is far more powerful than that. I used to announce that `Ginkgoch Map` library allows to build cross platform server, desktop and mobile applications with only JavaScript. So today, I will try to challenge to build an interactive map. 

## Scenario

I want to build an Africa map view only on browser, I have my own Shapefiles (Countries.shp, Africa.shp). I want to set my own color for those data. Besides the static map, I want to interact with the map. Click an area and identify the area I clicked and make it highlighted. See the demo at [#]()

Let's do it!

## Prerequisite

Again, `Ginkgoch Map` is a low level map library which only focus on building map. At this stage, we need to require some other framework to help us to build service, desktop, mobile application easier. Fortunately, `Ginkgoch Map` is compatible with work with them. e.g. work with KOA to build RESTful or web applications, Electron to build desktop and React Native for mobile. In the near future, I will write more documents to cover them. But in this article, let's focus on map server or web more.



