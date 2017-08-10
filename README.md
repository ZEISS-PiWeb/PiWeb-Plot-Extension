# PiWeb Custom Plot

<img style="display: block; margin: auto;" src="gfx/Logo.png" >

## Quickstart

In order to create your first own custom plot, you should be familiar with __JavaScript__ and __Json__. As javascript is untyped, we suggest you to develop your extension using __Typescript__.  

PiWeb searches for extensions in several locations. Ordered by their priority, these are:

* In the application data directory `%APPDATA%\Zeiss\PiWeb\Extensions`  
* In the program data directory `%PROGRAMDATA%\Zeiss\PiWeb\Extensions`
* The `Extensions` folder in the PiWeb installation directory

The package structure looks like the following:

<img class="framed" src="gfx/folder_structure.png"/>

<a id="markdown-1-create-the-folder-myextension" name="1-create-the-folder-myextension"></a>
#### 1. Create the folder `MyExtension` 

In case the `Extensions` folder doesn't exist, you must **create** it first. Now **create your project folder** in the extensions folder and name it `MyExtension`.

<a id="markdown-2-create-the-file-packagejson" name="2-create-the-file-packagejson"></a>
#### 2. Create the file `package.json`

The package configuration static parameters of your extension, such as its name, a description, the appearance of its entry in the PiWeb toolbox and the properties that are adjustable by the user. A complete reference of the options can be found in the chapter '[Package Definition](https://zeiss-piweb.github.io/PiWeb-Customplot/#package-definition)'. For now, use the minimum setup shown below.

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


<a id="markdown-3-create-the-file-tsconficjson" name="3-create-the-file-tsconficjson"></a>
#### 3. Create the file `tsconfic.json`

It contains necessary information for the typescript compiler, like input and output directories and compiler switches. Just copy the code below and you'll be fine.

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

<a id="markdown-4-create-the-folder-types-and-copy-the-file-piwebdts-into-it" name="4-create-the-folder-types-and-copy-the-file-piwebdts-into-it"></a>
#### 4. Create the folder `@types` and copy the file `piweb.d.ts` into it

These are the type definitions of the PiWeb custom plot interface. It will enable productivity features like syntax highlighting and auto completion in your IDE. You can find this file **TODO**. The folder `@types` was defined as the type root in the `tsconfig.json` file.

<a id="markdown-5-create-the-folder-src-and-create-the-file-indexts-in-it" name="5-create-the-folder-src-and-create-the-file-indexts-in-it"></a>
#### 5. Create the folder `src` and create the file `index.ts` in it

 This is where your extension is actually rendered. In the example below, we use the drawing API to render an orange rectangle that fills the whole area of the plot. A complete reference of the drawing functions can be found in the chapter [`DrawingContext`](https://zeiss-piweb.github.io/PiWeb-Customplot/#drawingcontext).

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