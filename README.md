# PiWeb Custom Plot

<img style="display: block; margin: auto;" src="gfx/Logo.png" >

## Quickstart

In order to create your first own custom plot, you should be familiar with __JavaScript__ and __Json__. As javascript is untyped, we suggest you to develop your extension using __Typescript__.  

PiWeb searches for extensions in several locations. Ordered by their priority, these are:

  * The `Extensions` folder in the PiWeb installation directory
  * In the program data directory `%PROGRAMDATA%\Zeiss\PiWeb\Extensions`
  * In the common application data directory `%APPDATA%\Zeiss\PiWeb\Extensions`  

In case the `Extensions` folder doesn't exist, you must create it first. Now create your own project folder in the extensions folder and name it `MyExtension`.
Now, create the following files and folders in your project folder:

<img class="framed" src="gfx/folder_structure.png"/>

**piweb.d.ts:** Contains the type definitions of the PiWeb custom plot interface. It will enable productivity features like syntax highlighting and auto completion in your IDE. You can find this file **TODO**.

**tsconfic.json:** Contains necessary information for the typescript compiler, like input and output directories and compiler switches. Just copy the code below and you'll be fine.

```json
{
    "compilerOptions": {
    "target": "es6",
    "strictNullChecks": true,
    "module": "commonjs",
    "sourceMap": false,
    "moduleResolution": "node",
    "noImplicitAny": true,
    "outDir" : "lib",       
    "rootDir" : "src",
    "typeRoots": ["./@types"]
    }
}
```

**package.json:** Defines static parameters of your extension, such as its name, a description, the appearance of its entry in the PiWeb toolbox and the properties that are adjustable by the user. A complete reference of the options can be found in the chapter '[Package Definition](#package-definition)'. For now, use the minimum setup shown below.

```json
{
    "name": "myextension",
    "version": "0.2.0",
    "main": "lib",
    "engines": {
        "piweb": "0.2.x"
    },
    "piweb_actions": {
        "load": "compile_typescript"
    },
    "piweb_extension": {
        "type": "plot",		
        "display": "MyExtension"		
    }
}
```

**index.ts:** This is where your extension is actually rendered. In the example below, we use the drawing API to render an orange rectangle that fills the whole area of the plot. A complete reference of the drawing functions can be found in the chapter [`DrawingContext`](#drawingcontext).

```TypeScript
import * as piweb from 'piweb'
import * as host from 'piweb_host'
import drawing = piweb.drawing;

host.on("render", renderPlot);

function renderPlot(drawingContext: drawing.DrawingContext) {
  const size = host.getSize();
  drawingContext.setBrush( drawing.Brushes.OrangeRed);
  drawingContext.drawRectangle(0, 0, size.width, size.height);
}
```

When we save all files and start the PiWeb Designer, we should find our extension in the **General** section of the toolbox:

<img class="framed" src="gfx/toolbox_start.png">

For further information, please read the [reference manual](http://zeiss-piweb.github.io/PiWeb-Customplot).
