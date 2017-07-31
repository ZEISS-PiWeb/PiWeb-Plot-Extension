# PiWeb Custom Plot

![alt text](gfx/Logo.png "logo")

# Overview

<!-- TOC -->

- [Quickstart](#quickstart)
- [The Package Definition](#the-package-definition)
    - [Localization](#localization)
    - [Package Format](#package-format)
        - [Top Level Properties](#top-level-properties)
        - [Engines Properties](#engines-properties)
        - [Piweb Actions](#piweb-actions)
        - [PiWeb Extensions](#piweb-extensions)
- [PiWeb Host](#piweb-host)
    - [Basic Functions](#basic-functions)
    - [Environment](#environment)
    - [Properties](#properties)
- [Drawing](#drawing)
    - [Common](#common)
        - [Point](#point)
        - [Size](#size)
    - [DrawingContext](#drawingcontext)
    - [Geometry](#geometry)
        - [FillRule](#fillrule)
        - [GeometryCombineMode](#geometrycombinemode)
        - [LineGeometry](#linegeometry)
        - [RectangleGeometry](#rectanglegeometry)
        - [EllipseGeometry](#ellipsegeometry)
        - [PathGeometry](#pathgeometry)
            - [PathFigure](#pathfigure)
            - [PathSegment](#pathsegment)
                - [ArcSegment](#arcsegment)
                - [LineSegment](#linesegment)
                - [BezierSegment](#beziersegment)
                - [QuadraticBezierSegment](#quadraticbeziersegment)
                - [PolyLineSegment](#polylinesegment)
                - [PolyBezierSegment](#polybeziersegment)
                - [PolyQuadraticBezierSegment](#polyquadraticbeziersegment)
        - [GeometryGroup](#geometrygroup)
        - [CombinedGeometry](#combinedgeometry)
    - [Pens and Brushes](#pens-and-brushes)
        - [Color](#color)
        - [Brush](#brush)
            - [SolidColorBrush](#solidcolorbrush)
            - [LinearGradientBrush](#lineargradientbrush)
            - [RadialGradientBrush](#radialgradientbrush)
        - [Pen](#pen)
            - [LineCap](#linecap)
            - [LineJoin](#linejoin)
    - [Text](#text)
        - [FormattedText](#formattedtext)
    - [Font](#font)
        - [FontWeight](#fontweight)
            - [FontStyle](#fontstyle)
            - [FontStretch](#fontstretch)
- [Data Provider](#data-provider)
    - [Common](#common-1)
        - [AttributeType](#attributetype)
        - [Attribute](#attribute)
        - [AttributeItem](#attributeitem)
    - [Configuration Interface](#configuration-interface)
        - [Configuration](#configuration)
        - [EntityType](#entitytype)
        - [AttributeDefinition](#attributedefinition)
    - [Catalog Interface](#catalog-interface)
        - [Catalog](#catalog)
        - [CatalogEntry](#catalogentry)
    - [Inspection Plan Interface](#inspection-plan-interface)
        - [InspectionPlanItemType](#inspectionplanitemtype)
        - [InspectionPlanPath](#inspectionplanpath)
        - [InspectionPlanItem](#inspectionplanitem)
        - [PathElement](#pathelement)
    - [Measurement Interface](#measurement-interface)
        - [MeasurementMode](#measurementmode)
        - [Measurement](#measurement)
        - [MeasurementValue](#measurementvalue)
    - [System Variable Interface](#system-variable-interface)
- [Tooltips](#tooltips)
    - [Introduction](#introduction)
    - [Classes](#classes)
        - [TooltipShapeCollection](#tooltipshapecollection)
        - [TooltipShape](#tooltipshape)
        - [TooltipPointShape](#tooltippointshape)
        - [TooltipGeometryShape](#tooltipgeometryshape)

<!-- /TOC -->
<a id="markdown-quickstart" name="quickstart"></a>
## Quickstart

In order to create your first own custom plot, you should be familiar with __JavaScript__ and __Json__. As javascript is untyped, we suggest you to develop your extension using __Typescript__.  

PiWeb searches for extensions in several locations. Ordered by their priority, these are:

  * The `Extensions` folder in the PiWeb installation directory
  * In the program data directory `%PROGRAMDATA%\Zeiss\PiWeb\Extensions`
  * In the common application data directory `%APPDATA%\Zeiss\Piweb\Extensions`  

In case the `Extensions` folder doesn't exist, you must create it first. Now create your own project folder in the extensions folder an name it `MyExtension`.
Now, create the following files and folders in your project folder:

![alt text](gfx/folder_structure.png "Extension folder structure")

**piweb.d.ts:** Contains the type definitions of the PiWeb custom plot interface. It will enable productivity features like syntax highlighting and auto completion in your IDE. You can find this file ***[here]***.

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

**package.json:** Defines static parameters of your extension, such as its name, a description, the appearance of its entry in the PiWeb toolbox and the properties that are adjustable by the user. A complete reference of the options can be found ***[here]***. For now, use the minimum setup shown below.

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

**index.ts** This is where your extension is actually rendered. In the example below, we use the drawing API to render an orange rectangle that fills the whole area of the plot.

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

When we save all files and start the Piweb Designer, we should find our extension in the **General** section of the toolbox:

![alt text](gfx/toolbox_start.png "Toolbox entry")

<a id="markdown-the-package-definition" name="the-package-definition"></a>
## The Package Definition


In [chapter 1](#quickstart) we already created a very simple package definition in the file **package.json**. Although it's sufficient to get us started, there are a lot more settings to be discovered.

<a id="markdown-localization" name="localization"></a>
### Localization

Every text that appears in the user interface of PiWeb can be localized. Simply replace the plain text with a localization dictionary:

```json
{    
    "piweb_extension": {        
        "display": "MyExtension"        
    }
}
```

```json
{
    "piweb_extension": {        
        "display": {
            "" : "My invariant Extension",
            "en-US": "My Extension",
            "de-DE": "Meine Erweiterung"
        }   
    }
}
```

As you can see, the localized version contains an entry for the invariant culture, which is also used as a fallback value, in case the required culture is not translated. Later in this chapter, all localizable properties marked as `localizable string` properties.

<a id="markdown-package-format" name="package-format"></a>
### Package Format

<a id="markdown-top-level-properties" name="top-level-properties"></a>
#### Top Level Properties

**name `string`**

Custom string that is used to identify the package internally. Must be composed from lower case characters, digits and a set of special characters:
`'$', '-', '_', '.', '+', '!', '*', '\'', '(', ')', ','`. It must have a length between 1 and 214 characters and may not start with a dot (`.`) or an underscore (`_`).

**version `string`**

A valid semantic version string containing three numbers, separated by dots. For more information about semantic versioning, visit the [project website](http://semver.org/).

**main `string`**

Path to folder that contains the `index.js` file. In case you used typescript, it is the value of the property `outDir` in the `tsconfig.json` file.

**engines `object`**

Defines the supported engine versions of this plot. Please read the engines chapter for further information

**piweb_actions `object`**

Defines additional actions. Please read the [actions chapter](#piweb-actions)  for further information

**piweb_extension `object`**

Defines the content of the extension. Please read the [extensions chapter](#piweb-extensions) for further information

<a id="markdown-engines-properties" name="engines-properties"></a>
#### Engines Properties

**piweb `string`**

A valid semantic version string containing three numbers, separated by dots. It identifies the toolset that PiWeb will use to execute the extension. For more information about semantic versioning, visit the [project website](http://semver.org/).

<a id="markdown-piweb-actions" name="piweb-actions"></a>
#### Piweb Actions

**load `string`**

A string describing actions, that will be executed when the package loads. Currently, the only recognized value is `compile_typescript`, which will trigger the typescript compiler.

<a id="markdown-piweb-extensions" name="piweb-extensions"></a>
#### PiWeb Extensions

**type `enumeration`**

Identifies the extension type. Currently, the only accepted value is `plot`, which identifies a piweb plot extension.

**display `localizable string`**

Sets the display name of the entry in the piweb toolbox.

**description `localizable string`**

Sets the description of the entry in the piweb toolbox, which is visible when the user hovers over the entry.

**icon `string`**

Path to the icon, relative to the `package.json` file. Usually, you simply specify the filename, and place the icon next to your `package.json` file. The icon is used on several places in PiWeb Designer, such as the toolbox, the page structure and the element properties tab. PiWeb can handle the following file formats: `bmp`, `gif`, `ico`, `jpg`, `png`, `tiff`, `wmp`.

> PiWeb will scale the image to a size of 16\*16 and 32\*32 pixels. To achieve the best result, use an `ico` file that contains bitmaps of both sizes.

**toolbox `object`**

**propertygrid `object`**

<a id="markdown-piweb-host" name="piweb-host"></a>
## PiWeb Host

You can retrieve information about the element, its properties and settings by using the `host` interface. To access it, include the PiWeb host module in your script.

```TypeScript
import * as host from 'piweb_host'
```

<a id="markdown-basic-functions" name="basic-functions"></a>
### Basic Functions

**getSize `Size`**

```TypeScript
function getSize(): Size;
```

Returns the current size of the element in **millimeters**. 

**getPosition `Point`**

```TypeScript
function getPosition(): Point;
```

Returns the position of the element on the report page in **millimeters**.

<a id="markdown-environment" name="environment"></a>
### Environment

The `environment` interface is accessible via the `piweb` interface and exposes the following members

**isDesignMode `boolean`**

```TypeScript
const isDesignMode : boolean = piweb.environment.isDesignMode;
```

If `true`, the plot is rendered by the PiWeb Designer, otherwise it's rendered by the PiWeb Monitor. Some very complex elements don't render their complete content while in design mode, to guarantee a smooth and fluent editing in PiWeb Designer.

**toolboxItemName `string`**

```TypeScript
const toolboxItemName : string = piweb.environment.toolboxItemName;
```

In case you specified multiple toolbox items in the `package.json` file, this is the interface to find out, which item the user picked. The returned value is equal to the property name you used to identity the toolbox entry.

**currentCulture `CultureInfo`**

```TypeScript
const currentCulture : CultureInfo = piweb.environment.currentCulture;
```

Returns the culture in which the host process has been started. You can use this information to

<a id="markdown-properties" name="properties"></a>
### Properties

The properties you define in the `package.json` file can be accessed via the `piweb.properties` interface. To enable type checking, there is one function for each available datatype.

**getStringProperty `string`**

```TypeScript
piweb.properties.getStringProperty(id : string) : string
```

Returns the value of the property with the name `id` as a string.

**getIntegerProperty `number`**

```TypeScript
piweb.properties.getIntegerProperty(id : string) : number
```

Returns the value of the property with the name `id` as a number.

**getDoubleProperty `number`**

```TypeScript
piweb.properties.getDoubleProperty(id : string) : number
```
 
Returns the value of the property with the name `id` as a number. 

<a id="markdown-drawing" name="drawing"></a>
## Drawing  
 
To access the drawing classes, import the piweb interface in your script. All necessary classes for drawing are encapsulated in the `piweb.drawing` module. The custom plot will be rendered whenever something changes, e.g. a property value, its size or position. When this happens, the custom plot api will emit the `render` event, which has a [`DrawingContext`](#drawingcontext) object as its parameter.

```TypeScript
import * as piweb from 'piweb'
import * as host from 'piweb_host'

host.on("render", render);

function render(context: piweb.drawing.DrawingContext) {
    ...
}
```
 
Be aware that all coordinates and values are interpreted as **millimeters**. PiWeb draws with a resolution of **96 DPI**, so one millimeter is equal to `96 / 25.4 ~ 3.58` pixels, or one pixel is equal to `25.4 / 96 ~ 0.2646` millimeters. PiWeb will take care, that everything you draw is aligned to display coordinates, so nothing will look blurry.

<a id="markdown-common" name="common"></a>
### Common

<a id="markdown-point" name="point"></a>
#### Point

```TypeScript
class Point()
```

Represents a position

**x `number`**

Hoirizontal position.

**y `number`**

Vertical position

<a id="markdown-size" name="size"></a>
#### Size

```TypeScript
class Size()
```

Represents a position

**width `number`**

Hoirizontal dimension.

**height `number`**

Vertical dimention.

<a id="markdown-drawingcontext" name="drawingcontext"></a>
### DrawingContext

```TypeScript
class DrawingContext
```

Used to draw to the plot area that is displayed by the PiWeb Designer and PiWeb Monitor.

**drawLine `void`**

<img style="float: right;margin-left:20px" src="gfx/drawLine.svg">

```TypeScript
function drawLine(start: Point, end: Point): void;
```
Draws a line using from `start` to `end` using the pen which has been previously set with the `setPen` function. In case you want to draw a larger number of lines, consider using the `drawLines` or `drawGeometry` function to improve the drawing performance.

**drawLines `void`**

<img style="float: right;margin-left:20px" src="gfx/drawLines.svg">

```TypeScript
function drawLines(lines: Point[]): void;
```
Draws multiple lines that are **not** connected using the pen which has been previously set with the `setPen` function. The number of points provided as parameter `lines` must be even. Each two points describe a line. In case you want to draw connected points, please consider using the function `drawGeometry` instead of using the `drawLines` function with duplicate points.

**drawRectangle `void`**

<img style="float: right;margin-left:20px" src="gfx/drawRectangle.svg">

```TypeScript
function drawRectangle(x: number, y: number, w: number, h: number): void;
```
Draws a rectangle with of width `w` and height `h` at Point `x;y` and fills it with the brush which has been previously set using the `setBrush` function, and strokes it using the pen which has been previously set with the `setPen` function. In case you want to draw a larger number of rectangles, consider using the `drawGeometry` function with a `GeometryGroup`, containing multiple `RectangleGeometry` objects to improve the drawing performance.

**drawEllipse `void`**

<img style="float: right;margin-left:20px" src="gfx/drawEllipse.svg">

```TypeScript
function drawEllipse(center: Point, radiusX: number, radiusY: number): void;
```
Draws an ellipse around the point `center` and fills it with the brush which has been previously set using the `setBrush` function, and strokes it using the pen which has been previously set with the `setPen` function. In case you want to draw a larger number of ellipses (e.g. points), consider using the `drawGeometry` function with a `GeometryGroup`, containing multiple `EllipseGeometry` objects to improve the drawing performance.

**drawGeometry `void`**

<img style="float: right;margin-left:20px" src="gfx/drawGeometry.svg">

```TypeScript
function drawGeometry(geometry: Geometry): void;
```
Draws the specified `Geometry` and fills it with the brush which has been previously set using the `setBrush` function, and strokes it using the pen which has been previously set with the `setPen` function. In case you want to draw a larger number of geometries, consider greating a `GeometryGroup`, containing multiple `Geometry` objects to improve the drawing performance. For more information about geometries, please read the chapter [Geometry](#geometry)

**drawText `void`**

<img style="float: right;margin-left:20px" src="gfx/drawText.svg">

```TypeScript
function drawText(text: FormattedText, position: Point): void;
```
Draws the specified `FormattedText` at the specified `position`. There are numerous properties which will help you to adjust how the text is layouted and displayed. For more information, please read the chapter [FormattedText](#formattedText) and [Font](#font)

**drawImage `void`**

<img style="float: right;margin-left:20px" src="gfx/drawImage.svg">

```TypeScript
function drawImage(data: Buffer, rectangle: Rect): void;
```

Draws the specified image buffer into the specifield `rectangle`. In case the image size differs from the rectangle, the image will be stretched.

**drawDrawing `void`**

```TypeScript
function drawDrawing(drawing: Drawing): void;
```

Draws the specified drawing into the current drawing context. To set the position and size of the drawing, use the `pushTransform` function.

**setPen `void`**
```TypeScript
function setPen(pen: Pen | null): void;
```

Sets the pen that will be used for all subsequent calls to `drawLine`, `drawLines`, `drawRectangle`, `drawEllipse` and `drawGeometry`. In case you don't want your rectangle, ellipse or geometry to be stroked, pass `null` as parameter into the function.

**setBrush  `void`**

```TypeScript
function setBrush(brush: Brush | null): void;
```

Sets the brush that will be used for all subsequent calls to `drawRectangle`, `drawEllipse` and `drawGeometry`. In case you don't want your rectangle, ellipse or geometry to be filled, pass `null` as parameter into the function.

**pushTransform `void`**

```TypeScript
function pushTransform(transformation: Transform): void;
```
Multiplies the current transformation matrix with a new transformation matrix. To undo it, use the `pop` function.

**pushClip `void`**

```TypeScript
function pushClip(geometry: Geometry): void;
```

Sets a new clip geometry. All subsequent drawing calls will only be rendered inside the fill area of the specified `geometry`. Be aware that unfilled geometries like straight lines don't have any fill area, which means that all subsequent drawing calls have no effect.

**pushOpacity `void`**

```TypeScript
function pushOpacity(opacity: number): void;
```

Sets the opacity of all subsequent drawing calls. When drawing transparent objects, the transparency of the object is multiplied with the specified `opacity`.

**pop `void`**

```TypeScript
function pop(): void;
```

Removes the most recent effect caused by `pushTransform`, `pushOpacity` or `pushClip` from the stack. This function will cause an error in case none of the specified commands has been executed before.

<a id="markdown-geometry" name="geometry"></a>
### Geometry

```TypeScript
abstract class Geometry
```

Geometries can be used for drawing and clipping. Multiple geometries can be combined using the GroupGeometry or CombinedGeometry classes.

**transform `Transform?`**

All geometries can have a transformation. The default value is the identity transform.

<a id="markdown-fillrule" name="fillrule"></a>
#### FillRule

```TypeScript
enum FillRule
```

Determines how overlapping geometries are filled.

**`evenOdd` (default)**

<img class="smallImage" src="gfx/evenOdd.svg">

Fills all areas that are overlapped by an odd number of geometries.
<br><br><br>

**`nonZero`**

<img class="smallImage" src="gfx/nonZero.svg">

Fills all areas that are overlapped by at least one geometry. 
<br><br><br>

<a id="markdown-geometrycombinemode" name="geometrycombinemode"></a>
#### GeometryCombineMode

```TypeScript
enum GeometryCombineMode
```

Determines how two geometries are combined.

**`union` (default)**

<img class="smallImage" src="gfx/union.svg">

The resulting geometry is the area that is overlapped by the first or second geometry or both.
<br><br>

**`intersect`**

<img class="smallImage" src="gfx/intersect.svg">

The resulting geometry is the area that is overlapped by both geometries.
<br><br>

**`xor`**

<img class="smallImage" src="gfx/xor.svg">

The resulting geometry is the area that is overlapped by the first or second geometry, but not both.
<br><br>

**`exclude`**

<img class="smallImage" src="gfx/exclude.svg">

The second geometry is subtracted from the first. 
<br><br>

<a id="markdown-linegeometry" name="linegeometry"></a>
#### LineGeometry

```TypeScript
class LineGeometry extends Geometry
```

Line geometries are quite simple, and are mostly used in combination with other geometries.

**start [`Point`](#point)**

The point where the line begins

**end [`Point`](#point)**

The point where the line ends

<a id="markdown-rectanglegeometry" name="rectanglegeometry"></a>
#### RectangleGeometry

```TypeScript
class RectangleGeometry extends Geometry
```

Describes a rectangle that can be stroked or filled.

**position [`Point`](#point)**

The position of the top left corner

**width `number`**

The horizontal dimension

**height `number`**

The vertical dimension

<a id="markdown-ellipsegeometry" name="ellipsegeometry"></a>
#### EllipseGeometry

```TypeScript
class EllipseGeometry extends Geometry
```

Describes a rectangle that can be stroked or filled.

**position [`Point`](#point)**

The center of the ellipse

**radiusX `number`**

The horizontal radius

**radiusY `number`**

The vertical radius

<a id="markdown-pathgeometry" name="pathgeometry"></a>
#### PathGeometry

```TypeScript
class PathGeometry extends Geometry
```

Pathgeometries are composed of one or more [PathFigure](#pathfigure) objects, which are themselves composed of [PathSegment](#pathsegment) objects. 

**fillRule [`FillRule`](#fillrule)**

Describes how overlapping geometries are filled.

**figures [`PathFigure[]`](#pathfigure)**

The collection of path figures, that compose the [`PathGeometry`](#pathgeometry). 

<a id="markdown-pathfigure" name="pathfigure"></a>
##### PathFigure

```TypeScript
class PathFigure
```

Multiple path figures compose a [`PathGeometry`](#pathgeometry). The path figures of a path geometry are **not** connected, so they appear as independent shapes.

**startPoint [`Point`](#point)**

The first Point of the path figure.

**segments [`PathSegment[]`](#pathsegment)**

The segments of the path figure. Each segment is connected to the last point of the previous segment, or to the start point in case it's the first segment in the path figure.

**isClosed `boolean`**

Determines whether the last point of the path figure should be connected to the start point. The connection is a straight line.

<a id="markdown-pathsegment" name="pathsegment"></a>
##### PathSegment

```TypeScript
abstract class PathSegment
```

Path segments define one or more points that describe a line or curve. Following path segments are supported

<a id="markdown-arcsegment" name="arcsegment"></a>
###### ArcSegment

```TypeScript
class ArcSegment extends PathSegment
```

Represents an elliptical arc between two points. To define an arc segment you have to specify two points and an ellipse. Usually, there are two possible ellipses of the same size through two points, and on these two ellipses, there are four different ellipse segments which go from the first the the second point. To define how the arc segment looks like, you have to specifiy additional parameters as shown in the following picture:

<img style="margin-left:20px;margin-right:20px; width:256px; height:auto;" src="gfx/arcSegment.svg">


* <font color="#56abff">blue:</font> arcType `small`, sweepDirection `counterclockwise`
* <font color="#ffab56">orange:</font> arcType `small`, sweepDirection `clockwise`
* <font color="#67cc00">green:</font> arcType `large`, sweepDirection `counterclockwise`
* <font color="#b40000">red:</font> arcType `large`, sweepDirection `clockwise`

**to [`Point`](#point)**

Endpoint of the arc.

**size [`Size`](#size)**

The x- and y radius of the underlying ellipse on which the arc segment is based on. In case the ellipse is too small to span an arc between the startpoint and the endpoint, it will be scaled until it fits, preserving the aspect ratio of the ellipse.

**angle `number`**

Rotation angle of the ellipse in *degrees*.

**arcType `enumeration`**

Since there are always two different arcs with the same radius and the same sweep direction between two points, this parameter can be used to determine which one is used. Valid values are `small` and `large`.

**sweepDirection `enumeration`**

Since there are always two different arcs with the same radius and the same arc size between two points, this parameter can be used to determine which one is used. Valid values are `clockwise` and `counterclockwise`.

<a id="markdown-linesegment" name="linesegment"></a>
###### LineSegment

```TypeScript
class LineSegment extends PathSegment
```

Creates a line between two points in a [PathFigure](#pathfigure). In case you want to use multiple line segments consecutively, consider using the [PolyLineSegment](#polylinesegment).

**to [`Point`](#point)**

The endpoint of the line segment. 

<a id="markdown-beziersegment" name="beziersegment"></a>
###### BezierSegment

```TypeScript
class BezierSegment extends PathSegment
```

Describes a bezier segment, using the last point of the previous segment as start point. In case you want to use multiple bezier segments consecutively, consider using the [PolyBezierSegment](#polybeziersegment).

**control [`Point`](#point)**

First control point of the bezier curve.

**control2 [`Point`](#point)**

Second control point of the bezier curve.

**to [`Point`](#point)**

End point of the bezier curve.

<a id="markdown-quadraticbeziersegment" name="quadraticbeziersegment"></a>
###### QuadraticBezierSegment

```TypeScript
class QuadraticBezierSegment extends PathSegment
```

Describes a quadratic bezier segment, using the last point of the previous segment as start point. In case you want to use multiple quadratic bezier segments consecutively, consider using the [PolyQuadraticBezierSegment](#polyquadraticbeziersegment).

**control [`Point`](#point)**

Control point of the bezier curve.

**to [`Point`](#point)**

End point of the bezier curve.

<a id="markdown-polylinesegment" name="polylinesegment"></a>
###### PolyLineSegment

```TypeScript
class PolyLineSegment extends PathSegment
```

Describes a line strip, including the last point of the previous segment.

**points [`Point[]`](#point)**

The collection of [Point](#point) objects that defines this segment.

<a id="markdown-polybeziersegment" name="polybeziersegment"></a>
###### PolyBezierSegment

```TypeScript
class PolyBezierSegment extends PathSegment
```

Describes multiple bezier segments, including the last point of the previous segment. The number of points provided must be a multiple of three, since a single bezier segment is defined by three points.

**points [`Point[]`](#point)**

The collection of [Point](#point) objects that defines this segment.

<a id="markdown-polyquadraticbeziersegment" name="polyquadraticbeziersegment"></a>
###### PolyQuadraticBezierSegment

```TypeScript
class PolyQuadraticBezierSegment extends PathSegment
```

Describes multiple bezier segments, including the last point of the previous segment. The number of points provided must be a multiple of two, since a single quadratic bezier segment is defined by two points.

**points [`Point[]`](#point)**

The collection of [Point](#point) objects that defines this segment.

<a id="markdown-geometrygroup" name="geometrygroup"></a>
#### GeometryGroup

```TypeScript
class GeometryGroup extends Geometry
```

Describes a set of geometries that are consolidated into a group. To define how the resulting geometry is filled, use the `fillRule` parameter

**children [`Geometry[]`](#geometry)**

The geometries of which this geometry group is composed.

**fillRule [`FillRule`](#fillrule)**

Describes how overlapping geometries are filled.

<a id="markdown-combinedgeometry" name="combinedgeometry"></a>
#### CombinedGeometry

```TypeScript
class CombinedGeometry extends Geometry
```

Describes a geometry, that is composed of exactly two child geometries. The difference to the [GeometryGroup](#geometrygroup) is, that the CombinedGeometry is regarded as a single geometry with a single outline, rather than just a collection of children. To achieve this, the combination mode must be specified. CombinedGeometry objects can themselves be combined again.

**geometry1 [`Geometry`](#geometry)**

The first child.

**geometry2 [`Geometry`](#geometry)**

The second child.

**combineMode [`GeometryCombineMode`](#geometrycombinemode)**

Determines how the two geometries are combined into one single geometry.

<a id="markdown-pens-and-brushes" name="pens-and-brushes"></a>
### Pens and Brushes

<a id="markdown-color" name="color"></a>
#### Color

```TypeScript
class Color
```

Describes a color with red, green, blue and alpha channel.

**r `number`**

The red channel value in the range of `[0..255]`.

**g `number`**

The green channel value in the range of `[0..255]`.

**b `number`**

The blue channel value in the range of `[0..255]`.

**a `number?`**

The alpha channel value in the range of `[0..255]`, where `0` is completely translucent and `255` is opaque.

<a id="markdown-brush" name="brush"></a>
#### Brush

```TypeScript
abstract class Brush
```

Describes how an arbitary geometry is filled.

**opacity `number`**

The opacity of the brush. Valid values are in the range of `[0..1]`, where `0` is completely translucent and `1` is opaque.

<a id="markdown-solidcolorbrush" name="solidcolorbrush"></a>
##### SolidColorBrush

```TypeScript
class SolidColorBrush extends Brush
```

Describes a brush that fills an area with a single color.

**color [`Color`](#color)**

The color of this brush.

<a id="markdown-lineargradientbrush" name="lineargradientbrush"></a>
##### LinearGradientBrush

```TypeScript
class LinearGradientBrush extends Brush
```

Describes a brush that fills an area with a linear gradient.

**color [`Color`](#color)**

The start color of the gradient.

**color2 [`Color`](#color)**

The end color of the gradient.

**rotation `number`**

The angle in degrees about which the gradient is rotated around the center.

<a id="markdown-radialgradientbrush" name="radialgradientbrush"></a>
##### RadialGradientBrush

```TypeScript
class RadialGradientBrush extends Brush
```

Describes a brush that fills an area with a radial gradient.


**color [`Color`](#color)**

The color at the center of the gradient.

**color2 [`Color`](#color)**

The color at the outer border of the gradient.

**center [`Point`](#point)**

The relative center in coordinates from `[0..1]`.

<a id="markdown-pen" name="pen"></a>
#### Pen

```TypeScript
class Pen
```

Describes the way lines are stroked.

**brush [`Brush`](#brush)**

The brush that is used to fill the outline procudes with the pen.

**thickness `number`**

The thickness of stroke procudes by the pen in **millimeters**.

**startCap [`LineCap`](#linecap)**

The geometry added to the beginning of the stroke.

**endCap [`LineCap`](#linecap)**

The geometry added to the end of the stroke.

**lineJoin [`LineJoin`](#linejoin)**

The geometry added between to segments of the stroke.

**dashStyle `number[]`**

The definition of the dashses used to render the stroke. The default value is empty, which will render one solid line. The length of the dashses and gaps specified here are multiplied with the thickness of the pen when it is drawn. So in case you want dashses with a length of one millimeter on a pen with 0.1 mm thickness, you must specify a dash of length 10 here.

**dashOffset `number`**

The offset of the first dash. The stroke is solid to the specified offset. The specified offset is multiplied with the pens thickness, just like the dashstyle. Be aware that a **positive** offset will move the dashses **against stroke direction**

**dashCap [`LineCap`](#linecap)**

The geometry added at the beginning and end of each dash.

<a id="markdown-linecap" name="linecap"></a>
##### LineCap

```TypeScript
enum LineCap
```

Determines the geometry at the start and/or end of a line.

**`flat`**

<img style="float: left;margin-left:20px;margin-right:20px" src="gfx/penLineCapFlat.svg">

No extra geometry is added.

**`round`**

<img style="float: left;margin-left:20px;margin-right:20px" src="gfx/penLineCapRound.svg">

Adds a half circle with the diameter of the pens thickness.

**`square`**

<img style="float: left;margin-left:20px;margin-right:20px" src="gfx/penLineCapSquare.svg">

Adds a half square with the side length of the pens thickness.

<br>

<a id="markdown-linejoin" name="linejoin"></a>
##### LineJoin

```TypeScript
enum LineJoin
```

Determines the geometry between two linear segments of a line.

**`bevel`**

<img style="float: left;margin-left:20px;margin-right:20px" src="gfx/penLineJoinBevel.svg">

Adds a triangle that connects the two non-overlapping points of the lines.

**`miter`**

<img style="float: left;margin-left:20px;margin-right:20px" src="gfx/penLineJoinMiter.svg">

Extends the outlines of the two lines until they cut each other, and fills the enclosed area.

**`round`**

<img style="float: left;margin-left:20px;margin-right:20px" src="gfx/penLineJoinRound.svg">

Creates a circle around the cutting point with the radius of half the pens thickness.

<br>

<a id="markdown-text" name="text"></a>
### Text

<a id="markdown-formattedtext" name="formattedtext"></a>
#### FormattedText

```TypeScript
class FormattedText
```

Describes a textblock with a certain style and size, in which the text can be arranged.

**text `string`**

The text to be formatted. The text can include linebreaks.

**font [`Font`](#font)**

The font that describes how the text is rendered

**maxTextWidth `number`**

Determines after how many millimeters the text is supposed to wrap.

**maxTextHeight `number`**

Determines, how many lines of text can be rendered. The specified text will be wrapped until the specified `maxTextHeight` is reached. The last line will then either be cut off or rendered will ellipsis, depending on the specified font.

<a id="markdown-font" name="font"></a>
### Font

```TypeScript
class Font
```

Describes how a text is displayed

**fontFamily `string`**

Determines which font family will be used to display the text. Be aware that some font families don't support all characters.

**fontWeight [`FontWeight`](#fontweight)**

Determines the font weight.

**fontStyle [`FontStyle`](#fontstyle)**

Determines the font style.

**fontStretch [`FontStretch`](#fontstretch)**

Can be used to render the text stretched or dense.

**size `number`**

The font size in **millimeters**. PiWeb will automatically calculate the appropriate font size from the specified height.

**foreGround [`Brush`](#brush)**

The brush which is used to fill the text.

<a id="markdown-fontweight" name="fontweight"></a>
#### FontWeight

```TypeScript
enum FontWeight
```

The font weight is used to display letters bolder or thinner. Most fonts only support a subset of the following font weights.

| Identifier | numeric value |
|------------|--------------------|
| **`Thin`**|**100**|
| **`ExtraLight`**|**200**|
| **`Light`**|**300**|
| **`Normal`**|**400**|
| **`Medium`**|**500**|
| **`SemiBold`**|**600**|
| **`Bold`**|**700**|
| **`ExtraBold`**|**800**|
| **`Black`**|**900**|
| **`ExtraBlack`**|**950**|

<a id="markdown-fontstyle" name="fontstyle"></a>
##### FontStyle 

```TypeScript
enum FontStyle
```

The font style can be used to display letters in a cursive way. 

**`Normal` (default)**

The text will be displayed as usual.

**`Italic`**

Some fonts have a built in italic letter set, which can be used by specifying the italic font style.

**`Oblique`**

For fonts which have no built in italic letter set, the oblique font style allows to apply a skew transform to the normal font to make it look cursive. The italic style will usually look more pleasing though.

<a id="markdown-fontstretch" name="fontstretch"></a>
##### FontStretch

```TypeScript
enum FontStretch
```

Used to condense or expand the font horizontally.

| Identifier | Changed width/height ratio |
|------------|--------------------|
| **`UltraCondensed`**|**50%** of the default widht/height ratio|
| **`ExtraCondensed`**|**62.5%** of the default widht/height ratio|
| **`Condensed`**|**75%** of the default widht/height ratio|
| **`SemiCondensed`**|**87.5%** of the default widht/height ratio|
| **`Normal`**|**100%** of the default widht/height ratio|
| **`SemiExpanded`**|**112.5%** of the default widht/height ratio|
| **`Expanded`**|**125%** of the default widht/height ratio|
| **`ExtraExpanded`**|**150%** of the default widht/height ratio|
| **`UltraExpanded`**|**200%** of the default widht/height ratio|
  
<a id="markdown-data-provider" name="data-provider"></a>
## Data Provider

The data provider is exposed in the `piweb.data` namespace. Be aware that **the data can change**. Whenever this happens, the custom plot engine will emit the `dataChanged` event.

```TypeScript
import * as piweb from 'piweb'
import * as host from 'piweb_host'

host.on("dataChanged", loadData);

function loadData() {
    const provider = piweb.data.provider;
    ...
}
```

<a id="markdown-common-1" name="common-1"></a>
### Common

<a id="markdown-attributetype" name="attributetype"></a>
#### AttributeType

```TypeScript
enum AttributeType
```

Describes, which kind of value an attribute is supposed to have. All attributes can also have `undefined` as value.

**`String`**

The attribute has a `string` value.

**`Integer`**

The attribute has an integral `number` value.

**`Double`**

The attribute has a floating point `number` value.

**`Date`**

The attribute has a `Date` value.

**`Catalog`**

The attribute has a `number` value, that is to be interpreted as the key of a **[`CatalogEntry`](#catalogentry)**.

<a id="markdown-attribute" name="attribute"></a>
#### Attribute

```TypeScript
class Attribute
```

An attribute stores additional information about an arbitary entity. Entities with attributes are parts, characteristics, measurements, measurement values and catalog entries. An attribute is identified by its `Key`. To get information about the type and usage of an attribute, use the `Key` to get the **[`AttributeDefinition`](#attributedefinition)** from the **[`Configuration`](#configuration)**.

**key `number`**

An unsigned 16 bit integer that identifies the attribues definition.

**type [`AttributeType`](#attributetype)**

The datatype of the attributes value.

**value `number | string | Date | undefined`**

The actual value of the attribute. Refer to the `type` to get the datatype.

<a id="markdown-attributeitem" name="attributeitem"></a>
#### AttributeItem

```TypeScript
abstract class AttributeItem
```

An attribute item has a set of attributes. Only attributes that actually have a value are returned, so the number of attributes is usually lower than the number of attribute definitions that refer to the entity type of the attribute item.

**attributes [`Map<number, Attribute>`](#attribute)**

The list of attributes that belong to this attribute item. 

**getValue `string | number | Date | undefined`**

```TypeScript
function getValue(key: number): string | number | Date | undefined
```

Returns the value that corresponds to the specified attribute key. In case the attribute was not found the function returns `undefined`.

<a id="markdown-configuration-interface" name="configuration-interface"></a>
### Configuration Interface

Use the following function to get the database configuration from the piweb server. 

**getConfiguration [`Configuration`](#configuration)**

```TypeScript
function getConfiguration() : Configuration
```

<a id="markdown-configuration" name="configuration"></a>
#### Configuration

```TypeScript
class Configuration
```

The configuration contains all attribute definitions for parts, characteristics, measurements, measurement values and catalogs.

**partAttributes [`Map<number, AttributeDefinition>`](#attributedefinition)**

The set of attribute definitions refering to inspection plan parts.

**characteristicAttributes [`Map<number, AttributeDefinition>`](#attributedefinition)**

The set of attribute definitions refering to inspection plan characteristics.

**measurementAttributes [`Map<number, AttributeDefinition>`](#attributedefinition)**

The set of attribute definitions refering to measurements.

**valueAttributes [`Map<number, AttributeDefinition>`](#attributedefinition)**

The set of attribute definitions refering to measurement values.

**catalogAttributes [`Map<number, AttributeDefinition>`](#attributedefinition)**

The set of attribute definitions refering to catalog entries.
<a id="markdown-entitytype" name="entitytype"></a>
#### EntityType

```TypeScript
enum EntityType
```

Lists all entities that have attributes attached to them.

**`Characteristic`**

Inspection plan characteristic. Common attributes are tolerances and classification attributes.

**`Part`**

Inspection plan part. Common attributes are identification attributes, e.g. name and number.

**`Measurement`**

Measurement. Common attributes are time, machine, operator and batch number.

**`Value`**

Value. The most common attribute is the measurement value (K1).

**`Catalog`**

Attributes for Catalog entries. These refer to the "*columns*" of a catalog.


<a id="markdown-attributedefinition" name="attributedefinition"></a>
#### AttributeDefinition

```TypeScript
class AttributeDefinition
```

**key `number`**

An unsigned short to identify the attribute.

**description `string`**

An unlocalized description text of the attribute.

**dataType [`AttributeType`](#attributetype)**

The datatype of the values of the attribute

**entityType [`EntityType`](#entitytype)**

The entity type this attribute belongs to.

**catalog `string | undefined`**

In case the `dataType` is `Catalog`, this field contains a base64 encoded guid that identifies the **[`Catalog`](#catalog)** that is used by this attribute.

<a id="markdown-catalog-interface" name="catalog-interface"></a>
### Catalog Interface

Use the following function to get the catalogs that are configured in the the piweb server. Catalogs are identified by a `Guid`, which is stored as a base64 encoded byte array. 

**getCatalogs [`Map<string, Catalog>`](#catalog)**

```TypeScript
function getCatalogs() : Map<string, Catalog>;
```

<a id="markdown-catalog" name="catalog"></a>
#### Catalog

```TypeScript
class Catalog
```
**guid `string`**

A base64 encoded `guid` that identifies the catalog.

**name `string`**

An unlocalized name that is used only for displaying purposes.

**validAttributes `number[]`**

A list of keys that refer to the [`AttributeDefinitions`](#attributedefinition) that correspond to this catalog.

**entries [`Map<number, CatalogEntry>`](#catalogentry)**

A set of catalog entries of which this catalog is composed.

<a id="markdown-catalogentry" name="catalogentry"></a>
#### CatalogEntry

Catalog entries used as enumeration values of attributes in the PiWeb Database.

```TypeScript
class CatalogEntry extends AttributeItem
```

**key `number`**

A 16 bit integer that identifies the catalog entry. When accessing an attribute with the datatype `Catalog`, a 16 bit integer is returned that refers to this key.

<a id="markdown-inspection-plan-interface" name="inspection-plan-interface"></a>
### Inspection Plan Interface

**getInspectionPlan [`Map<string, InspectionPlanItem>`](#inspectionplanitem)**

```TypeScript
function getInspectionPlan() : Map<string, InspectionPlanItem>;
```

Returns all inspection plan items that are bound to the custom plot element with databinding. You can change the databinding in the PiWeb Designer. Every inspection plan entity is identified by a `Guid`, which is stored as a base64 encoded byte array. 

<a id="markdown-inspectionplanitemtype" name="inspectionplanitemtype"></a>
#### InspectionPlanItemType

```TypeScript
enum InspectionPlanItemType
```

**`Characteristic`**

Refers to an inspection plan characteristic.

**`Part`**

Refers to an inspection plan part.

<a id="markdown-inspectionplanpath" name="inspectionplanpath"></a>
#### InspectionPlanPath

```TypeScript
class InspectionPlanPath
```

Every inspection plan item can be identified by its path. Inspection plan paths look similar to file system paths, where parts refer to folders and characteristics refer to files. The difference is, that characteristics can have child characteristics.

**pathElements [`PathElement[]`](#pathelement)**

The set of path elements of which the path is composed.

<a id="markdown-inspectionplanitem" name="inspectionplanitem"></a>
#### InspectionPlanItem

```TypeScript
class InspectionPlanItem extends AttributeItem
```

Describes a part or a characteristic of the inspection plan.

**uuid `string`**

The `Guid` that is used to identify the item. It is stored as a base64 encoded byte array.

**type [`InspectionPlanItemType`](#inspectionPlanItemType)**

The item type, which is either `Part` or `Characteristic`.

**path [`InspectionPlanPath`](#inspectionplanpath)**

The path of the item in the inspection plan structure.

<a id="markdown-pathelement" name="pathelement"></a>
#### PathElement

```TypeScript
class PathElement
```

**name `string`**

The name of the part or characteristic that is represented by this path element.

**type [`InspectionPlanItemType`](#inspectionPlanItemType)**

The type of the inspection plan item that is represented by this path element.

<a id="markdown-measurement-interface" name="measurement-interface"></a>
### Measurement Interface

Returns all measurements that are associated to the parts that are bound to the custom plot element with databinding. You can change the databinding and the measurement selection in the PiWeb Designer. Every measurement is identified by a `Guid`, which is stored as a base64 encoded byte array. 

**getMeasurements [`Map<string, Measurement>`](#measurement)**

```TypeScript
function getMeasurements(mode: MeasurementMode) : Map<string, InspectionPlanItem>;
```

<a id="markdown-measurementmode" name="measurementmode"></a>
#### MeasurementMode

```TypeScript
enum MeasurementMode
```

Determines whether or not to fetch measurement values.

**`WithoutValues`**

Only the measurements are fetched, including their attributes.

**`WithValues`**

Fetches the measurements as well as their values.

<a id="markdown-measurement" name="measurement"></a>
#### Measurement

```TypeScript
class Measurement extends AttributeItem
```

Describes a measurement of an inspection plan part. 

**uuid `string`**

The uuid that identifies this measurement as base64 encoded byte array.

**part `string`**

The uuid that identifies the part this measurement is associated to.

**values [`Map<string, MeasurementValue>`](#measurementvalue)**

The values that are associated to this measurement. In case you fetched the measurements without values, the set is empty.

<a id="markdown-measurementvalue" name="measurementvalue"></a>
#### MeasurementValue

```TypeScript
class MeasurementValue extends AttributeItem
```

**characteristic `string`**

The uuid that identifies the characteristic this measurement value is associated to.

<a id="markdown-system-variable-interface" name="system-variable-interface"></a>
### System Variable Interface

Returns the result of a system variable expression. The evaluation result depends on the databinding and measurement selection of the custom plot element, as well as the current page state and many other parameters. Just like the other data provider methods, you should reevaluate the result when the `dataChange` event occured.

```TypeScript
getSystemVariable(expression: string): undefined | string | number | Date | Array<any>;
```

Some system variable expressions can return arrays as a result. Every member of this array might have a different datatype.

<a id="markdown-tooltips" name="tooltips"></a>
## Tooltips

<a id="markdown-introduction" name="introduction"></a>
### Introduction

PiWeb Monitor has a feature we call `info mode`. While the info mode is active, or while the CTRL key is pressed, the point or geometry that is next to the mouse cursor is highlighted and can be clicked to show a tooltip for the point or geometry. Tooltips usually contain information about the measurement or characteristic that is displayed at this point or region of the plot:

![alt text](gfx/infomode.png "infomode")

The custom plot API allows you to define your own tooltips, using the `onCreateTooltips` callback method of the tooltip provider:

```TypeScript
import * as piweb from 'piweb'

piweb.tooltips.provider.onCreateTooltips = createTooltipShapes;

function createTooltipShapes(): piweb.tooltips.TooltipShapeCollection {
	return new piweb.tooltips.TooltipShapeCollection([
        ...
    ]);
}
```

<a id="markdown-classes" name="classes"></a>
### Classes

<a id="markdown-tooltipshapecollection" name="tooltipshapecollection"></a>
#### TooltipShapeCollection

```TypeScript
class TooltipShapeCollection
```

Describes a list of [`TooltipShape`](#tooltipshape) objects.

**shapes [`TooltipShape[]`](#tooltipshape)**

The shapes of which this collection is composed.

<a id="markdown-tooltipshape" name="tooltipshape"></a>
#### TooltipShape

```TypeScript
abstract class TooltipShape
```

Describes a single area or point with additional information that can be accessed when PiWeb Monitor is in info mode. You can specify a characteristic and a measurement in form of their base64 encoded guids, to display a very detailed tooltip that contains information about the measurement value. You must specify both guids to display these additional information.

**text `string`**

A custom text that is displayed on top of the tooltip.

**characteristic `string | undefined`**

The `Guid` of the characteristic this tooltip shape refers to. In case the shape doesn't refer to any characteristic, set this property to undefined (**default**).

**measurement `string | undefined`**

The `Guid` of the measurement this tooltip shape refers to. In case the shape doesn't refer to any measurement, set this property to undefined (**default**).

<a id="markdown-tooltippointshape" name="tooltippointshape"></a>
#### TooltipPointShape

```TypeScript
class TooltipPointShape extends TooltipShape
```

Describes a tooltip shape that is located at a specific point. The highlight will always be displayed as a circle of the same size, disregarding the zoom level of the report.

**point [`Point`](#point)**

The point on which this tooltip shape is located. The displayed circle uses this point as center.

<a id="markdown-tooltipgeometryshape" name="tooltipgeometryshape"></a>
#### TooltipGeometryShape

```TypeScript
class TooltipGeometryShape extends TooltipShape
```

Describes a tooltip shape that spans over an area, described by the `geometry` parameter. When active, the whole geometry will be highlighted.

**shape [`Geometry`](#geometry)**

The geometry of the tooltip shape.
 
