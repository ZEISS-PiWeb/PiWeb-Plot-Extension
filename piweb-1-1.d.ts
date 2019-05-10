declare module "internal/buffer_reader" {
	export class BufferReader {
	    _data: Buffer;
	    _currentPosition: number;
	    constructor(stream: Buffer);
	    readBool(): boolean;
	    readByte(): number;
	    readUInt16(): number;
	    readInt16(): number;
	    readInt32(): number;
	    readUInt32(): number;
	    readDouble(): number;
	    readDate(): Date;
	    readGuid(): string;
	    readString(): string;
	    readBinary(): Buffer;
	    readTimeStamp(): Date;
	}
}


declare module "internal/buffer_writer" {
	export class BufferWriter {
	    private _data;
	    private _initialBufferSize;
	    private _currentPosition;
	    constructor(initialSize?: number);
	    writeBool(bool: boolean): void;
	    writeByte(byte: number): void;
	    writeUInt32(uint: number): void;
	    writeDouble(double: number): void;
	    writeString(value: string): void;
	    writeSizedBinary(data: Buffer, length?: number): void;
	    writeRawBinary(data: Buffer, length?: number): void;
	    writeSizeAt(index: number): void;
	    getData(): Buffer;
	    getLength(): number;
	    private _reserve(count);
	}
}


declare module "internal/drawing_broker" {
	export function execOnRender(plotContext: any): Buffer;
}


declare module "internal/multimap" {
	/**
	 * @author Jordan Luyke <jordanluyke@gmail.com>
	 */
	export interface IMultiMap<K, V> {
	    clear(): void;
	    containsKey(key: K): boolean;
	    containsValue(value: V): boolean;
	    containsEntry(key: K, value: V): boolean;
	    delete(key: K, value?: V): boolean;
	    entries: MultiMapEntry<K, V>[];
	    get(key: K): Iterable<V>;
	    keys(): Iterable<K>;
	    values(): Iterable<V>;
	    put(key: K, value: V): MultiMapEntry<K, V>[];
	}
	export class MultiMap<K, V> implements IMultiMap<K, V> {
	    private _entries;
	    clear(): void;
	    containsKey(key: K): boolean;
	    containsValue(value: V): boolean;
	    containsEntry(key: K, value: V): boolean;
	    delete(key: K, value?: V): boolean;
	    readonly entries: MultiMapEntry<K, V>[];
	    get(key: K): Iterable<V>;
	    keys(): Iterable<K>;
	    values(): Iterable<V>;
	    put(key: K, value: V): MultiMapEntry<K, V>[];
	}
	export class MultiMapEntry<K, V> {
	    readonly key: K;
	    readonly value: V;
	    constructor(key: K, value: V);
	}
}


declare module "internal/regex_tools" {
	export function wildcardToRegex(wildcard: string): RegExp;
	export function escapeRegex(str: string): string;
}


declare module "internal/serializable" {
	import { BufferWriter } from 'internal/buffer_writer';
	export interface Serializable {
	    serialize(target: BufferWriter): void;
	}
}


declare module "internal/string_tools" {
	export function bytesToHex(bytes: Uint8Array): string;
	export function hexToBytes(hex: string): Buffer;
	export function bytesToGuid(bytes: Uint8Array): string;
	export function splitString(str: string, delims: string): string[];
}


declare module "internal/synchronization_scopes" {
	export function resetToleranceToken(): void;
	export function checkToleranceToken(token: any): boolean;
	export function getToleranceToken(): any;
}


declare module "internal/tooltip_broker" {
	export let drawingHighlights: {
	    buffer: Buffer;
	};
	export function getDrawingTooltips(): Buffer;
}


declare module "piweb/environment" {
	/**
	 * ## Introduction
	 *
	 * The `piweb.environment` module provides information about the element and its properties, as well as global settings.
	 * It also contains classes that are used by the functions of the `piweb.format` module.
	 *
	 * ```TypeScript
	 * import * as piweb from 'piweb';
	 * import environment = piweb.environment;
	 * ```
	 *
	 * @see [format](format.html)
	 * @module environment
	 */ /**
	* @preferred
	*/ /** */
	import { Point, Size } from "piweb/drawing/geometry/basics";
	export type LengthUnit = "mm" | "inch";
	export type AngleUnit = "degreeDecimal" | "degreeMinuteSecond" | "radian";
	/**
	 * Base interface for region info.
	 */
	export interface RegionInfoDescription {
	    /**
	     * Gets the name or ISO 3166 two-letter country/region code.
	     */
	    readonly name: string;
	}
	/**
	 * Interface for region info.
	 */
	export interface IRegionInfo extends RegionInfoDescription {
	    /**
	     * Gets the two-letter code defined in ISO 3166 for the country/region.
	     */
	    readonly twoLetterISORegionName: string;
	    /**
	     * Gets the three-letter code defined in ISO 3166 for the country/region.
	     */
	    readonly threeLetterISORegionName: string;
	}
	/**
	 * Base interface for culture info.
	 */
	export interface CultureInfoDescription {
	    /**
	     * Gets the name of the culture in the format `languagecode2-country/regioncode2`.
	     */
	    readonly name: string;
	}
	/**
	 * Interface for culture info.
	 */
	export interface ICultureInfo extends CultureInfoDescription {
	    /**
	     * Gets the ISO 639-1 two-letter code for the language of the culture.
	     */
	    readonly twoLetterISOLanguageName: string;
	    /**
	     * Gets the ISO 639-2 three-letter code for the language of the culture.
	     */
	    readonly threeLetterISOLanguageName: string;
	}
	/**
	 * Interface for time zone info.
	 */
	export interface ITimeZoneInfo {
	    /**
	     * Gets the name of the timezone.
	     */
	    readonly name: string;
	    /**
	     * Gets the standard offset of the timezone in hours.
	     */
	    readonly baseUtcOffset: number;
	    /**
	     * Returns the offset of the timezone at the specified date in hours.
	     * @param date The date at which the offset should be calculated. This takes daylight saving time etc. into account.
	     */
	    getUtcOffset(time: Date): number;
	}
	/**
	 * Contains the identifiers of a specific culture. PiWeb can use these information to provide localization and correct formatting of numbers and dates.
	 */
	export class CultureInfo implements ICultureInfo {
	    /**
	     * Gets the culture in which the host application was started.
	     */
	    static readonly currentCulture: ICultureInfo;
	    /**
	     * Gets the invariant culture.
	     */
	    static readonly invariantCulture: ICultureInfo;
	    /**
	     * Gets the name of the culture in the format `languagecode2-country/regioncode2`.
	     */
	    readonly name: string;
	    /**
	     * Gets the ISO 639-1 two-letter code for the language of the culture.
	     */
	    readonly twoLetterISOLanguageName: string;
	    /**
	     * Gets the ISO 639-2 three-letter code for the language of the culture.
	     */
	    readonly threeLetterISOLanguageName: string;
	    /**
	     * Initializes a new instance of the [[CultureInfo]] class.
	     * @param name The name of the culture.
	     */
	    constructor(name: string);
	}
	/**
	 * Contains the identifiers of a specific country or region.
	 */
	export class RegionInfo implements IRegionInfo {
	    /**
	     * Gets the region in which the host application was started.
	     */
	    static readonly currentRegion: IRegionInfo;
	    /**
	     * Gets the name or ISO 3166 two-letter country/region code.
	     */
	    readonly name: string;
	    /**
	     * Gets the two-letter code defined in ISO 3166 for the country/region.
	     */
	    readonly twoLetterISORegionName: string;
	    /**
	     * Gets the three-letter code defined in ISO 3166 for the country/region.
	     */
	    readonly threeLetterISORegionName: string;
	    /**
	     * Initializes a new instance of the [[RegionInfo]] class.
	     * @param name The name of the region.
	     */
	    constructor(name: string);
	}
	/**
	 * Contains information about a specific timezone.
	 */
	export class TimeZoneInfo implements ITimeZoneInfo {
	    /**
	     * Gets the timezone in which the host application was started.
	     */
	    static readonly localTimeZone: ITimeZoneInfo;
	    /**
	     * Gets the name of the timezone.
	     */
	    readonly name: string;
	    /**
	     * Gets the standard offset of the timezone in hours.
	     */
	    readonly baseUtcOffset: number;
	    /**
	     * Initializes a new instance of the [[TimeZoneInfo]] class.
	     * @param name The name of the time zone.
	     */
	    constructor(name: string);
	    /**
	     * Returns the offset of the timezone at the specified date in hours.
	     * @param date The date at which the offset should be calculated. This takes daylight saving time etc. into account.
	     */
	    getUtcOffset(date: Date): any;
	}
	/**
	 * If `true`, the plot is rendered by PiWeb Designer, otherwise it's rendered by PiWeb Monitor. Some very complex elements don't render
	 * their complete content while in design mode, to guarantee a smooth and fluent editing in PiWeb Designer.
	 */
	export function isDesignMode(): boolean;
	/**
	 * Returns the current size of the element in **millimeters**.
	 */
	export function getSize(): Size;
	/**
	 * Returns the position of the element on the report page in **millimeters**.
	 */
	export function getLocation(): Point;
	/**
	 * If the extensions defined multiple toolbox entries in the `package.json` manifest file, this property can be used to find out which entry the user picked.
	 * The returned value is the property name used as toolbox entry id in the manifest.
	 */
	export const toolboxItemName: string;
	/**
	 * Gets the name of the hosting PiWeb client.
	 */
	export const clientString: string;
	/**
	 * Gets the version of the hosting PiWeb client.
	 */
	export const clientVersion: string;
	/**
	 * Gets the semantic version of the plot extension API that is used to host the plot.
	 */
	export const apiVersion: string;
	/**
	 * Returns prefered display unit of length. This can be configured in the settings menu of Piweb Designer and PiWeb Monitor.
	 */
	export function getLengthUnit(): LengthUnit;
	/**
	 * Returns prefered display unit of angles. This can be configured in the settings menu of Piweb Designer and PiWeb Monitor.
	 */
	export function getAngleUnit(): AngleUnit;
	/**
	 * Returns prefered number of decimal places of displayed values. This can be configured in the settings menu of Piweb Designer and PiWeb Monitor.
	 * Use this only as a fallback value in case no prefered number of decimal places is configured for the displayed characteristic by attribute K2022.
	 */
	export function getDecimalPlaces(): number;
	export type LimitUsageReference = "nominal" | "middleOfTolerance";
	export type LimitType = "tolerance" | "warning" | "control" | "scrap";
	export class LimitsConfiguration {
	    constructor(tolerance: LimitConfiguration, warning: LimitConfiguration, control: LimitConfiguration, scrap: LimitConfiguration, yellowLimitType: LimitType, redLimitType: LimitType, limitUsageReference: LimitUsageReference);
	    readonly toleranceLimitConfiguration: LimitConfiguration;
	    readonly warningLimitConfiguration: LimitConfiguration;
	    readonly controlLimitConfiguration: LimitConfiguration;
	    readonly scrapLimitConfiguration: LimitConfiguration;
	    readonly yellowLimitConfiguration: LimitConfiguration;
	    readonly redLimitConfiguration: LimitConfiguration;
	    readonly limitUsageReference: LimitUsageReference;
	    getLimitConfiguration(type: LimitType): LimitConfiguration;
	}
	export class LimitConfiguration {
	    constructor(type: LimitType, toleranceFactor: number | undefined, name: string, priority: number);
	    readonly type: LimitType;
	    readonly toleranceFactor: number | undefined;
	    readonly name: string;
	    readonly priority: number;
	}
	export function getLimitsConfiguration(): LimitsConfiguration;
}


declare module "piweb/events" {
	/**
	 * An enumeration of supported events
	 */
	export type PiWebEvents = "load" | "render" | "dataBindingChanged" | "dataChanged" | "prepareRender";
	/**
	 * Call this function to specify a callback for a specific event.
	 * @param name The name of the event.
	 * @param callback The callback function.
	 */
	export function on(name: PiWebEvents, callback: Function): void;
	/**
	 * @private
	 */
	export function emit(name: PiWebEvents): boolean;
}


declare module "piweb/expressions" {
	/**
	 * The possible simple return types of an expression.
	 */
	export type SimpleExpressionData = string | number | Date | undefined;
	/**
	 * The possible array return types of an expression.
	 */
	export interface ExpressionDataArray extends Array<SimpleExpressionData | ExpressionDataArray> {
	}
	/**
	 * The cumulated possible return types of an expression.
	 */
	export type ExpressionDataType = SimpleExpressionData | ExpressionDataArray;
	/**
	 * Evaluates the specified expression and returns the result untyped.
	 */
	export function evaluate(expression: string): ExpressionDataType;
	/**
	 * Evaluates the specified expression and returns the result as `string` or `undefined`, in case the result can't be converted into a `string` representation.
	 * @param expression The expression to evaluate.
	 */
	export function evaluateAsString(expression: string): string | undefined;
	/**
	 * Evaluates the specified expression and returns the result as `number` or `undefined`, in case the result can't be converted into a `number` representation.
	 * @param expression The expression to evaluate.
	 */
	export function evaluateAsNumber(expression: string): number | undefined;
	/**
	 * Evaluates the specified expression and returns the result as `date` or `undefined`, in case the result can't be converted into a `date` representation.
	 * @param expression The expression to evaluate.
	 */
	export function evaluateAsDate(expression: string): Date | undefined;
	/**
	 * Evaluates the specified expression and returns the result as `array` or `undefined`, in case the result wasn't an `array` of any kind.
	 * @param expression The expression to evaluate.
	 */
	export function evaluateAsArray(expression: string): ExpressionDataArray | undefined;
}


declare module "piweb/format" {
	/**
	 * ## Introduction
	 *
	 * In many cases you'll want to create text output with numeric content, dates or time. On the other hand, you might want to parse numeric- or datetime values from files.
	 * To ensure the correct formatting, you can use the `piweb.format` module.
	 *
	 * ```TypeScript
	 * import * as piweb from 'piweb';
	 * import drawing = piweb.format;
	 * ```
	 *
	 * @module format
	 */ /**
	* @preferred
	*/ /** */
	import { CultureInfoDescription } from "piweb/environment";
	/**
	 * When parsing a date without a specified time zone, the `DateKind` parameter determines which time zone the date has.
	 *
	 * **`assumeLocal`**
	 *
	 * The represented time will be interpreted as local time.
	 *
	 * **`assumeUTC`**
	 *
	 * The represented time will be interpreted as UTC.
	 *
	 */
	export type DateKind = "assumeUtc" | "assumeLocal";
	/**
	 * Converts the specified value to its string representation using the specified format string and the culture specific format information.
	 * @param value The number to format.
	 * @param formatString The format string that tells how to format the number.
	 * Please refer to the [.Net number format specification](https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-numeric-format-strings)
	 * for a complete list of possible format strings.
	 * @param culture The culture to use for formatting. The function will use the invariant culture by default.
	 */
	export function formatNumber(value: number, formatString: string, culture?: CultureInfoDescription): string;
	/**
	 * Converts the specified string representation of a number in a specified culture specific format to its `number` equivalent. The function will
	 * return NaN in case parsing wasn't possible.
	 * @param str The string to parse.
	 * @param culture The culture to use for parsing. The function will use the invariant culture by default.
	 */
	export function parseNumber(str: string, culture?: CultureInfoDescription): number;
	/**
	 * Converts the specified date to its string representation using the specified format string and the culture specific format information.
	 * @param date The date to format.
	 * @param offsetHours The number of hours about which to offset the date.
	 * @param format The format string that tells how to format the date.
	 * Please refer to the [.Net date and time format specification](https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings)
	 * for a complete list of possible format strings.
	 * @param culture
	 */
	export function formatDate(date: Date, offsetHours?: number, format?: string, culture?: CultureInfoDescription): string;
	/**
	 * Converts the specified string to its `Date` equivalent by using culture specific format information and formatting style.
	 * @param str The string to parse
	 * @param culture The culture to use for parsing. The function will use the invariant culture by default.
	 * @param dateKind The date kind to use for parsing.
	 */
	export function parseDate(str: string, culture?: CultureInfoDescription, dateKind?: DateKind): Date;
	/**
	 * Converts the specified string to its `Date` equivalent by using culture specific format information and formatting style.
	 * @param str The string to parse
	 * @param format The format string that tells how to interpret the date.
	 * Please refer to the [.Net date and time format specification](https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings)
	 * for a complete list of possible format strings.
	 * @param culture The culture to use for parsing. The function will use the invariant culture by default.
	 * @param dateKind The date kind to use for parsing.
	 */
	export function parseDateExact(str: string, format?: string, culture?: CultureInfoDescription, dateKind?: DateKind): Date;
}


declare module "piweb" {
	/**
	 * ## Index
	 *
	 * ### Package definition
	 *
	 * For a complete description of the PiWeb custom-plot extension format, please refer to the [package](package.html) chapter.
	 *
	 * ### Modules
	 *
	 * The PiWeb plot extension API has a root module named `piweb` which encapsulates all child modules. The following child modules are available:
	 *
	 * | Module                  | Description                                |
	 * |-------------------------|--------------------------------------------|
	 * | [**`data`**](data.html) | Access the databinding of the plot element |
	 * | [**`drawing`**](drawing.html) | Draw the content of the plot extension element|
	 * | [**`environment`**](environment.html) | Access settings of the PiWeb host application|
	 * | [**`events`**](events.html) | React to events emitted by the PiWeb host application|
	 * | [**`expressions`**](expressions.html) | Evaluate system variable expressions|
	 * | [**`format`**](format.html) | Read and write localized data|
	 * | [**`logger`**](logger.html) | Write entries into the piweb log|
	 * | [**`properties`**](properties.html) | Access the plot extension elements property grid |
	 * | [**`resources`**](resources.html) | Access resources that are located in the extension package |
	 * | [**`tooltips`**](tooltips.html) | Create tooltip content for the PiWeb Monitor info mode |
	 * @module Index
	 */ /**
	* @preferred
	*/ /** */
	import * as drawing from "piweb/drawing";
	export { drawing };
	import * as data from "piweb/data";
	export { data };
	import * as logger from 'piweb/logger';
	export { logger };
	import * as tooltips from 'piweb/tooltips';
	export { tooltips };
	import * as resources from 'piweb/resources';
	export { resources };
	import * as events from 'piweb/events';
	export { events };
	import * as properties from 'piweb/properties';
	export { properties };
	import * as environment from "piweb/environment";
	export { environment };
	import * as format from "piweb/format";
	export { format };
	import * as expressions from "piweb/expressions";
	export { expressions };
}


declare module "piweb/logger" {
	/**
	 * Generates a log message with the `debug` log level.
	 * @param format The format string that shall be logged.
	 * @param param The parameters of the format string.
	 */
	export function debug(format: any, ...param: any[]): void;
	/**
	 * Generates a log message with the `info` log level.
	 * @param format The format string that shall be logged.
	 * @param param The parameters of the format string.
	 */
	export function info(format: any, ...param: any[]): void;
	/**
	 * Generates a log message with the `warning` log level.
	 * @param format The format string that shall be logged.
	 * @param param The parameters of the format string.
	 */
	export function warn(format: any, ...param: any[]): void;
	/**
	 * Generates a log message with the `error` log level.
	 * @param format The format string that shall be logged.
	 * @param param The parameters of the format string.
	 */
	export function error(format: any, ...param: any[]): void;
}


declare module "piweb/properties" {
	/**
	 * ## Introduction
	 *
	 * The properties you define in the `package.json` file can be accessed with the `piweb.properties` module. To enable type checking, there is one function for each available datatype.
	 *
	 * Definition of a property in the `package.json` file:
	 *
	 * ```
	 * {
	 * 	"name": "myplot",
	 * 	 ...
	 * 	"piweb_extension": {
	 * 	 	...
	 * 		"propertygrid": {
	 * 			"categories": {
	 * 				"general": {
	 * 					"name": "General",
	 * 					"priority": 0
	 * 				}
	 * 			},
	 * 			"entries": {
	 * 				"myproperty": {
	 * 					"name": "Do it right",
	 * 					"description": "Determines whether to do it right",
	 * 					"type": "boolean",
	 * 					"default_value": false,
	 * 					"category": "general"
	 * 				}
	 *  		}
	 * 		}
	 * 	}
	 * }
	 * ```
	 *
	 *
	 * For a complete reference of the package format, including the definition of properties, please read the chapter '[package definition](package.html#package-structure-extensions-propertygrid)'.
	 *
	 * <hr>
	 *
	 * Access the property in your script:
	 *
	 * ```TypeScript
	 * import * as piweb from 'piweb';
	 * import properties = piweb.properties;
	 *
	 * properties.getBooleanProperty('myPropertyName')
	 * ```
	 *
	 * @see [package definition](package.html#package-structure-extensions-propertygrid)
	 * @module properties
	 */ /**
	* @preferred
	*/ /** */
	import { Color, Brush, Pen, Font } from "piweb/drawing";
	/**
	 * Returns the value of the property with the name `id` as a boolean.
	 * @param id The name of the property.
	 */
	export function getBooleanProperty(id: string): boolean;
	/**
	 * Returns the value of the property with the name `id` as a string.
	 * @param id The name of the property.
	 */
	export function getStringProperty(id: string): string;
	/**
	 * Returns the value of the property with the name `id` as an integral number.
	 * @param id The name of the property.
	 */
	export function getIntegerProperty(id: string): number;
	/**
	 * Returns the value of the property with the name `id` as a floating point number.
	 * @param id The name of the property.
	 */
	export function getDoubleProperty(id: string): number;
	/**
	 * Returns the value of the property with the name `id` as a color.
	 * @param id The name of the property.
	 */
	export function getColorProperty(id: string): Color;
	/**
	 * Returns the value of the property with the name `id` as an array of colors.
	 * @param id The name of the property.
	 */
	export function getColorSchemeProperty(id: string): Color[];
	/**
	 * Returns the value of the property with the name `id` as a brush.
	 * @param id The name of the property.
	 */
	export function getBrushProperty(id: string): Brush;
	/**
	 * Returns the value of the property with the name `id` as a pen.
	 * @param id The name of the property.
	 */
	export function getPenProperty(id: string): Pen;
	/**
	 * Returns the value of the property with the name `id` as a font.
	 * @param id The name of the property.
	 */
	export function getFontProperty(id: string): Font;
	/**
	 * Returns the value of the property with the name `id` as an enumerated string.
	 * @param id The name of the property.
	 */
	export function getEnumProperty(id: string): string;
}


declare module "piweb/tooltips" {
	/**
	 * ## Introduction
	 *
	 * PiWeb Monitor has a feature we call `info mode`. While the info mode is active, or while the CTRL key is pressed, the point or geometry that is next to the mouse cursor
	 * is highlighted and can be clicked to show a tooltip for the point or geometry. Tooltips usually contain information about the measurement or characteristic that is
	 * displayed at this point or region of the plot:
	 *
	 * <img src="media://infomode.png">
	 *
	 * The plot extension API allows you add your own tooltips to a plot:
	 *
	 * ```TypeScript
	 * import * as piweb from 'piweb';
	 * import tooltips = piweb.tooltips;
	 *
	 * piweb.events.on("render", render);
	 *
	 * function render(context: piweb.drawing.DrawingContext) {
	 * 		piweb.tooltips.placeTooltip(context, [0,0], new Tooltip("myTooltipText"));
	 *
	 * 	...
	 * }
	 * ```
	 * @module tooltips
	 */ /**
	* @preferred
	*/ /** */
	import { BufferWriter } from 'internal/buffer_writer';
	import { Serializable } from 'internal/serializable';
	import { InspectionPlanItem } from 'piweb/data/inspection';
	import { Attribute } from 'piweb/data/attributes';
	import { MeasurementValue } from 'piweb/data/measurements';
	import { DrawingContext } from 'piweb/drawing/drawing';
	import { PointDescription } from 'piweb/drawing/geometry/basics';
	/**
	 * Places a simple tooltip on the plot.
	 */
	export function placeTooltip(drawingContext: DrawingContext, position: PointDescription, tooltip: Tooltip): void;
	/**
	 * Represents the content of a tooltip overlay.
	 */
	export class Tooltip implements Serializable {
	    /**
	     * @private
	     */
	    private readonly _contentLines;
	    /**
	     * Initializes a new instance of the [[Tooltip]] class.
	     * @param content The primary content of the tooltip. When specifying a measurement value or an inspection plan item, PiWeb will generate a generic tooltip for the entity.
	     */
	    constructor(content?: string | MeasurementValue | InspectionPlanItem);
	    /**
	     * Adds a new line to the tooltip.
	     * @param text The content of the tooltip line.
	     */
	    addText(text: string): void;
	    /**
	     * Adds a new collapsable line to the tooltip.
	     * @param text The content of the tooltip line.
	     * @param className The group to which the line belongs.
	     */
	    addCollapsableText(text: string, className: string): void;
	    /**
	     * Adds a fallback text line to the tooltip.
	     * @param text Content of the fallback text line.
	     */
	    addFallbackText(text: string): void;
	    /**
	     * Generates a generic tooltip for the specified measurement value and adds the lines to the current tooltip.
	     * @param value The measurement value.
	     */
	    addMeasurementValueInformations(value: MeasurementValue): void;
	    /**
	     * Generates a generic tooltip for the specified inspection plan item and adds the lines to the current tooltip.
	     * @param value The inspection plan item.
	     */
	    addCharacteristicInformations(characteristic: InspectionPlanItem): void;
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	}
	/**
	 * @private
	 */
	export namespace knownClassNames {
	    /**
	     * Class of tooltip lines which represent quick navigation
	     **/
	    const navigation = "NAVIGATELINE";
	    /**
	     * Class of measurement tooltip lines
	     **/
	    const measurement = "Measurement";
	    /**
	     * Class of measurement value count tooltip lines
	     **/
	    const measurementValuesCount = "MeasurementValuesCount";
	    /**
	     * Class of characterisitc tooltip lines
	     **/
	    const characteristic = "Characteristic";
	    /**
	     * Class of audit function tooltip lines
	     **/
	    const auditFunction = "AuditFunction";
	    /**
	     * Class of tolerance limit tooltip lines
	     **/
	    const toleranceLimits = "Tolerance";
	    /**
	     * Class of warning limit tooltip lines
	     **/
	    const warningLimits = "Warning";
	    /**
	     * Class of control limit tooltip lines
	     **/
	    const controlLimits = "ControlLimits";
	    /**
	     * Class of scrap limit tooltip lines
	     **/
	    const scrapLimits = "ScrapLimits";
	    /**
	     * Class of actual value tooltip lines
	     **/
	    const actualValue = "ActualValue";
	    /**
	     * Class of nominal value tooltip lines
	     **/
	    const nominalValue = "NominalValue";
	    /**
	     * Class of tolerance Usage tooltip lines
	     **/
	    const toleranceUsage = "ToleranceUsage";
	    /**
	     * Class of CAD position tooltip lines
	     **/
	    const cadPosition = "CadPosition";
	    /**
	     * Returns the class of any given attribute.
	     **/
	    function getAttributeClassName(attribute: Attribute | number): string;
	}
}


declare module "piweb/data/attributes" {
	/**
	 * @module data
	 */ /** */
	import { BufferReader } from 'internal/buffer_reader';
	import { Iter } from 'iter';
	export type AttributeType = "string" | "integer" | "float" | "date" | "catalog";
	/**
	 * @private
	 */
	export const enum AttributeTypeId {
	    String = 0,
	    Integer = 1,
	    Float = 2,
	    Date = 3,
	    Catalog = 4,
	}
	/**
	 * @private
	 */
	export function mapAttributeType(attributeType: AttributeTypeId): AttributeType;
	export type AttributeValue = string | number | Date;
	/**
	 * An attribute stores additional information about an arbitrary entity. Entities with attributes are parts, characteristics, measurements,
	 * measured values and catalog entries. An attribute is identified by its key. To get information about the type and usage of an attribute,
	 * use the Key to get the AttributeDefinition from the [[Configuration]].
	 */
	export class Attribute {
	    constructor(key: number, type: AttributeType, value: AttributeValue);
	    /**
	     * An unsigned 16 bit integer that identifies the attributes definition.
	     */
	    key: number;
	    /**
	     * The datatype of the attributes value.
	     */
	    type: AttributeType;
	    /**
	     * The actual value of the attribute. Refer to the type to get the datatype.
	     */
	    value: AttributeValue;
	}
	/**
	 * An attribute item has a collection of attributes. The collection contains only attributes that actually have a value, so the number
	 * of attributes is usually lower than the number of attribute definitions that refer to the entity type of the attribute item.
	 */
	export interface IAttributeItem {
	    /**
	     * Gets a collection of attributes that are associated to this item.
	     * @see [[Attribute]]
	     */
	    readonly attributes: AttributeCollection;
	}
	/**
	 * Describes an accessible collection of attributes, that is attached to an item that implements [[IAttributeItem]]. The collection offers a wide range of helper
	 * functions to allow a type safe access to the attributes values. You can iterate over the collection with a for ... of loop.
	 */
	export class AttributeCollection {
	    readonly _attributes: Map<number, Attribute>;
	    constructor(attributes: Iterable<Attribute>);
	    /**
	     * Returns an iterator over all attributes.
	     */
	    [Symbol.iterator](): Iterator<Attribute>;
	    /**
	     * Returns an iter over all attributes.
	     */
	    iter(): Iter<Attribute>;
	    /**
	     * Gets the number of attributes stored in the collection.
	     */
	    readonly length: number;
	    /**
	     * Gets an iterator over the available keys in the collection.
	     */
	    readonly keys: Iter<number>;
	    /**
	     * Returns the attribute with the specified key, or `undefined` in case there is no attribute with this key.
	     * @param key The key of the attribute.
	     */
	    getAttribute(key: number): Attribute | undefined;
	    /**
	     * Returns the value of the attribute with the specified key, or `undefined` in case there is no attribute with this key.
	     * @param key The key of the attribute.
	     */
	    getValue(key: number): string | number | Date | undefined;
	    /**
	     * Returns the value of the attribute with the specified key as `string`, or `undefined` in case there is no attribute with this key.
	     * @param key The key of the attribute.
	     */
	    getStringValue(key: number): string | undefined;
	    /**
	     * Returns the value of the attribute with the specified key as integral `number`, or `undefined` in case there is no attribute with this key or the attributes value can't be converted into an integral `number` representation.
	     * @param key The key of the attribute.
	     */
	    getIntegerValue(key: number): number | undefined;
	    /**
	     * Returns the value of the attribute with the specified key as floating point `number`, or `undefined` in case there is no attribute with this key or the attributes value can't be converted into a floating point `number` representation.
	     * @param key The key of the attribute.
	     */
	    getFloatValue(key: number): number | undefined;
	    /**
	     * Returns the value of the attribute with the specified key as `Date`, or `undefined` in case there is no attribute with this key or the attributes value can't be converted into a `Date` representation.
	     * @param key The key of the attribute.
	     */
	    getDateValue(key: number): Date | undefined;
	    /**
	     * Returns the value of the attribute with the specified key as integral `number`, representing the key of a catalog entry, or `undefined` in case there is no attribute with this key or the attributes value can't be converted into an integral `number` representation.
	     * @param key The key of the attribute.
	     */
	    getCatalogIndex(key: number): number | undefined;
	    /**
	     * Returns the value of the attribute with the specified key as `number`, or `undefined` in case there is no attribute with this key or the attributes value can't be converted into a `number` representation.
	     * @param key The key of the attribute.
	     */
	    getNumericValue(key: number): number | undefined;
	}
	/**
	 * @private
	 */
	export function readAttributes(source: BufferReader): Attribute[];
}


declare module "piweb/data/configuration" {
	import { AttributeCollection, IAttributeItem, Attribute, AttributeType } from "piweb/data/attributes";
	import { InspectionPlanItem } from "piweb/data/inspection";
	import { MeasurementValue } from "piweb/data/measurements";
	import { Iter } from 'iter';
	/**
	 * Returns the database configuration from the PiWeb server.
	 */
	export function getConfiguration(): Configuration;
	/**
	 * [[include:configurationEntity.md]]
	 */
	export type ConfigurationEntity = "characteristic" | "part" | "measurement" | "measurementValue" | "catalog";
	/**
	 * Defines the datatype, entity and other parameters of an attribute with a specific K value.
	 */
	export class AttributeDefinition {
	    /**
	     * An unsigned short to identify the attribute.
	     */
	    key: number;
	    /**
	     * An unlocalized description text of the attribute.
	     */
	    description: string;
	    /**
	     * The datatype of the values of the attribute.
	     */
	    dataType: AttributeType;
	    /**
	     * The entity type this attribute belongs to.
	     */
	    entityType: ConfigurationEntity;
	    /**
	     * In case the `dataType` is `catalog`, this field contains the id of the [[Catalog]] that is used by this attribute.
	     * You can pass the id or the whole attribute definition into a [[CatalogCollection]] to get the [[Catalog]].
	     */
	    catalogId: string | undefined;
	    /**
	     *
	     * @param key An unsigned short to identify the attribute.
	     * @param description An unlocalized description text of the attribute.
	     * @param dataType The datatype of the values of the attribute.
	     * @param entityType The entity type this attribute belongs to.
	     * @param catalogId The id of the [[Catalog]] that is used by this attribute.
	     */
	    constructor(key: number, description: string, dataType: AttributeType, entityType: ConfigurationEntity, catalogId: string | undefined);
	}
	/**
	 * The configuration contains all attribute definitions for parts, characteristics, measurements, measured values and catalogs. Additionally, it contains the catalogs that are configured in the piweb database.
	 * @see [[AttributeDefinition]]
	 * @see [[Catalog]]
	 */
	export class Configuration {
	    /**
	     * The set of attribute definitions referring to inspection plan parts.
	     */
	    partAttributes: Map<number, AttributeDefinition>;
	    /**
	     * The set of attribute definitions referring to inspection plan characteristics.
	     */
	    characteristicAttributes: Map<number, AttributeDefinition>;
	    /**
	     * The set of attribute definitions referring to measurements.
	     */
	    measurementAttributes: Map<number, AttributeDefinition>;
	    /**
	     * The set of attribute definitions referring to measured values.
	     */
	    measurementValueAttributes: Map<number, AttributeDefinition>;
	    /**
	     * The set of attribute definitions referring to catalog entries.
	     */
	    catalogAttributes: Map<number, AttributeDefinition>;
	    /**
	     * A map of all attribute definitions.
	     */
	    allAttributes: Map<number, AttributeDefinition>;
	    /**
	     * The catalogs that are configured in the PiWeb database.
	     */
	    catalogs: CatalogCollection;
	    /**
	     * @private
	     */
	    constructor(definitions: Iterable<AttributeDefinition>, catalogs: Iterable<Catalog>);
	    /**
	     * Returns the catalog entry that is identified by they catalog entry key of the specified attribute.
	     * @param attribute The attribute with a catalog entry key as its value.
	     */
	    findCatalogEntry(attribute: Attribute): CatalogEntry | undefined;
	    /**
	     * Returns the catalog entry that is used by the specified measurement value.
	     *
	     * When using enumerated characteristics, every characteristic might use an individual catalog for its measurement value.
	     * The measurement value is then the key of a catalog entry of this catalog.
	     *
	     * @param characteristic The measured characteristic.
	     * @param measurementValue The measurement value.
	     */
	    findEnumeratedCatalogEntry(characteristic: InspectionPlanItem, measurementValue: MeasurementValue): CatalogEntry | undefined;
	    /**
	     * Returns the catalog that is associated to the specified attribute or enumerated characteristic.
	     * @param attribute A catalog attribute, or an enumerated characteristic.
	     */
	    findCatalog(attribute: Attribute | InspectionPlanItem): Catalog | undefined;
	    /**
	     * Returns the attribute definition that is associated to the specified attribute.
	     * @param attribute An attribute.
	     */
	    findDefinition(attribute: Attribute): AttributeDefinition | undefined;
	}
	/**
	 * A catalog collection contains a set of catalogs, that can be accessed with an [[AttributeDefinition]], an [[InspectionPlanItem]] or a catalog id.
	 * It's possible to iterate over the catalogs like the following:
	 * ```TypeScript
	 * for (let catalog of catalogs)
	 * {
	 * 		...
	 * }
	 * ```
	 */
	export class CatalogCollection {
	    private readonly _idMap;
	    /**
	     * @private
	     */
	    constructor(catalogs: Iterable<Catalog>);
	    [Symbol.iterator](): Iterator<Catalog>;
	    /**
	     * Returns an iter over all catalogs.
	     */
	    iter(): Iter<Catalog>;
	    /**
	     * Gets the total number of catalogs stored in the collection.
	     */
	    readonly length: number;
	    /**
	     * Returns the catalog that is associated to the specified catalog attribute definition, enumerated characteristic or catalog id.
	     * @param definition A catalog attribute definition, an enumerated characteristic or a catalog id.
	     */
	    find(definition: AttributeDefinition | InspectionPlanItem | string): Catalog | undefined;
	}
	/**
	 * Describes a list of enumerated values in the PiWeb database.
	 */
	export class Catalog {
	    /**
	     * Gets the id of the catalog. It can be used to access a certain catalog in the [[CatalogCollection]].
	     */
	    catalogId: string;
	    /**
	     * Gets an unlocalized name that is used only for displaying purposes.
	     */
	    name: string;
	    /**
	     * Gets the list of keys that refer to the attribute definitions that correspond to this catalog.
	     * @see [[AttributeDefinition]]
	     */
	    validAttributes: Iterable<number>;
	    /**
	     * Gets the set of catalog entries of which this catalog is composed.
	     */
	    entries: Map<number, CatalogEntry>;
	    /**
	     * @private
	     */
	    constructor(reference: string, name: string, validAttributes: Iterable<number>, entries: Iterable<CatalogEntry>);
	    /**
	     * @private
	     */
	    getCatalogGuid(): string;
	}
	/**
	 * Describes an enumerated value of a [[Catalog]].
	 */
	export class CatalogEntry implements IAttributeItem {
	    /**
	     * Gets a 16 bit integer that identifies the catalog entry.
	     */
	    readonly key: number;
	    /**
	     * Gets the catalog attributes, often referred to as the values of the catalogs columns.
	     */
	    readonly attributes: AttributeCollection;
	    /**
	     * @private
	     */
	    constructor(key: number, attributes: Iterable<Attribute>);
	    /**
	     * @private
	     */
	    toString(): string;
	    /**
	     * @private
	     */
	    getInspectionString(): string;
	}
}


declare module "piweb/data/defect" {
	import { MeasurementValue, Measurement } from "piweb/data/measurements";
	import { Iter } from 'iter';
	import { Vector, PlotTolerance, PlotPropertyCollection } from 'piweb/data/plot';
	import { InspectionPlanItem } from 'piweb/data/inspection';
	/**
	 * Sets a value indicating whether this plot needs to fetch defects.
	 * @param value
	 * @version 1.1
	 */
	export function setFetchDefects(value: boolean): void;
	/**
	 * Represents a single voxel of a defect.
	 * @version 1.1
	 */
	export class Voxel {
	    constructor(position: Vector, size: Vector);
	    /**
	     * The corner of the voxel that is closest to the origin.
	     */
	    position: Vector;
	    /**
	     * The size of the voxel in the reference system.
	     */
	    size: Vector;
	}
	/**
	 * Represents a defect
	 * @version 1.1
	 */
	export class Defect {
	    /**
	     * @private
	     */
	    constructor(plot: DefectPlot, index: number, position: Vector, size: Vector, tolerance: PlotTolerance | undefined, properties: PlotPropertyCollection, voxels: Iterable<Voxel>);
	    /**
	     * The plot to which this defect is attached. Can be used to obtain the reference system and global tolerances, etc..
	     */
	    plot: DefectPlot;
	    /**
	     * The index of the defect in the list of defects of the defect plot.
	     */
	    index: number;
	    /**
	     * The corner of the defects bounding box that is closest to the origin.
	     */
	    position: Vector;
	    /**
	     * The size of the defects bounding box.
	     */
	    size: Vector;
	    /**
	     * The tolerance for this defect. If it is `undefined`, there's still a tolerance property on the [[DefectPlot]].
	     */
	    tolerance: PlotTolerance | undefined;
	    /**
	     * The list of custom key value pairs of this defect.
	     */
	    properties: PlotPropertyCollection;
	    /**
	     * The voxels that define this defect.
	     */
	    voxels: Iter<Voxel>;
	}
	/**
	 * A container of defects that is the result or part of the result of a single evaluation run or scan.
	 * @version 1.1
	 */
	export class DefectPlot {
	    constructor(measurementId: string, characteristicId: string, referenceSize: Vector, referenceVoxelSize: Vector, actualSize: Vector, actualVoxelSize: Vector, tolerance: PlotTolerance | undefined, properties: PlotPropertyCollection, defects: Iterable<Defect>);
	    /**
	     * @private
	     */
	    measurementId: string;
	    /**
	     * @private
	     */
	    characteristicId: string;
	    /**
	     * The reference size in voxel units.
	     */
	    referenceSize: Vector;
	    /**
	     * The size of a single voxel in voxel units. Most likely 1.
	     */
	    referenceVoxelSize: Vector;
	    /**
	     * The reference size in real-world units, e.g. mm.
	     */
	    actualSize: Vector;
	    /**
	     * The voxel size in real-world units, e.g. mm.
	     */
	    actualVoxelSize: Vector;
	    /**
	     * Global tolerance for all defects in this plot.
	     */
	    tolerance: PlotTolerance | undefined;
	    /**
	     * The list of custom key value pairs of this plot.
	     */
	    properties: PlotPropertyCollection;
	    /**
	     * The defects that are listed in this plot.
	     */
	    defects: Iter<Defect>;
	}
	/**
	 * Acts as an accessibility layer for a range of defect plots.
	 * @version 1.1
	 */
	export class DefectCollection implements Iterable<Defect> {
	    /**
	     * @private
	     */
	    private readonly _measurementIdMap;
	    /**
	     * @private
	     */
	    private readonly _measurementValueIdMap;
	    /**
	     * @private
	     */
	    private readonly _characteristicIdMap;
	    /**
	     * @private
	     */
	    private readonly _plots;
	    /**
	     * @private
	     */
	    private readonly _defects;
	    /**
	     * @private
	     */
	    constructor(plots: ReadonlyArray<DefectPlot>);
	    /**
	     * @private
	     */
	    [Symbol.iterator](): Iterator<Defect>;
	    /**
	     * Returns an iter over all defects.
	     */
	    iter(): Iter<Defect>;
	    /**
	     * Gets the total number of defects stored in the collection.
	     */
	    readonly length: number;
	    /**
	     * Returns an iterator over all plots stored in the collection.
	     */
	    getPlots(): Iter<DefectPlot>;
	    /**
	     * Returns the defect plots that are associated with the specified entity. The following associations are assumed:
	     *
	     * | Entity                            | Association |
	     * |----------------------------------|------------------------------------------------------|
	     * | [[Measurement]] | The measurement of the measurement value to which the plot is attached |
	     * | [[MeasurementValue]] | The measurement value to which the plot is attached |
	     * | [[InspectionPlanItem]] | The characteristic of the value to which the plot is attached |
	     * @param entity A measurement, measurement value or inspection plan item.
	     */
	    findPlotsByEntity(entity: Measurement | MeasurementValue | InspectionPlanItem): Iter<DefectPlot>;
	    /**
	     * Returns the defects that associated with the specified entity. The following associations are assumed:
	     *
	     * | Entity                            | Association |
	     * |----------------------------------|------------------------------------------------------|
	     * | [[Measurement]] | The measurement of the measurement value to which the defects are attached |
	     * | [[MeasurementValue]] | The measurement value to which the defects are attached |
	     * | [[InspectionPlanItem]] | The characteristic of the value to which the defects are attached |
	     * @param entity A measurement, measurement value or inspection plan item.
	     */
	    findDefectsByEntity(entity: Measurement | MeasurementValue | InspectionPlanItem): Iter<Defect>;
	    /**
	     * @private
	     */
	    first(): Defect | undefined;
	}
	/**
	 * Returns all defect plots that are bound to the plot extension element with databinding. You can change the databinding in PiWeb Designer.
	 * The defects are grouped by the measurement value they are associated to. Such a group or bundle is called [[DefectPlot]]. You can iterate
	 * either the defects or the plots by calling the [[getPlots]] method of the collection.
	 * @version 1.1
	 */
	export function getDefectCollection(): DefectCollection;
}


declare module "piweb/data" {
	/**
	 * @module data
	 * @preferred
	 *
	 * ## Introduction
	 *
	 * The `piweb.data` interface exposes methods to retrieve the inspection plan items, measurements, values and raw data that is bound to the plot extension element. Be aware that **the data can change**. Whenever this happens, the plot extension engine will emit the `dataChanged` event.
	 *
	 * ```TypeScript
	 * import * as piweb from 'piweb';
	 * import data = piweb.data;
	 *
	 * piweb.events.on("dataChanged", loadData);
	 *
	 * function loadData() {
	 *     const configuration = data.getConfiguration();
	 *     const inspectionPlan = data.getInspectionPlan();
	 *     ...
	 * }
	 * ```
	 */ /** */
	/**
	* @private
	*/
	export { IAttributeItem, Attribute, AttributeType, AttributeValue } from "piweb/data/attributes";
	/**
	 * @private
	 */
	export { getRawDataCollection, RawDataEntity, RawDataCollection, RawDataItem, getRawDataSources, setRawDataSources } from "piweb/data/raw_data";
	/**
	 * @private
	 */
	export { getInspectionPlanCollection, InspectionPlanCollection, InspectionPlanItem, InspectionPlanItemType, Limit, LimitCollection, LimitContext } from "piweb/data/inspection";
	/**
	 * @private
	 */
	export { getMeasurementCollection, MeasurementCollection, Measurement, MeasurementValue } from "piweb/data/measurements";
	/**
	 * @private
	 */
	export { getConfiguration, Configuration, AttributeDefinition, ConfigurationEntity, CatalogCollection, Catalog, CatalogEntry } from "piweb/data/configuration";
	/**
	 * @private
	 */
	export { PlotProperty, PlotPropertyType, PlotPropertyCollection, PlotTolerance, LinearPlotTolerance, RadialPlotTolerance, RectangularPlotTolerance, SpatialPlotTolerance, PlotToleranceType, Vector } from "piweb/data/plot";
	/**
	 * @private
	 */
	export { getDefectCollection, Defect, DefectPlot, DefectCollection, Voxel, setFetchDefects } from "piweb/data/defect";
	/**
	 * @private
	 */
	export { getVolumeCollection, Volume, setVolumeSources, getVolumeSources, VolumeDirection, VolumeVector, VolumeCollection } from "piweb/data/volume";
	/**
	 * @private
	 */
	export { WellKnownKeys } from "piweb/data/wellknown_keys";
	import * as path from "piweb/data/path";
	/**
	 * @private
	 */
	export { path };
}


declare module "piweb/data/inspection" {
	import { AttributeCollection, Attribute, IAttributeItem } from "piweb/data/attributes";
	import { Measurement, MeasurementValue } from 'piweb/data/measurements';
	import { RawDataItem } from 'piweb/data/raw_data';
	import { LimitType, LimitUsageReference } from 'piweb/environment';
	import { Iter } from 'iter';
	/**
	 * [[include:inspectionPlanItemType.md]]
	 */
	export type InspectionPlanItemType = "characteristic" | "part";
	/**
	 * Describes a part or a characteristic of the inspection plan.
	 */
	export class InspectionPlanItem implements IAttributeItem {
	    /**
	     * @private
	     */
	    readonly inspectionPlanItemId: string;
	    /**
	     * @private
	     */
	    readonly parentId?: string;
	    /**
	     * Gets the attributes of this inspection plan item.
	     */
	    readonly attributes: AttributeCollection;
	    /**
	     * The item type, which is either `part` or `characteristic`.
	     */
	    readonly type: InspectionPlanItemType;
	    /**
	     * The path of the item in the inspection plan structure.
	     */
	    readonly path: string;
	    /**
	     * Gets the number of characteristic elements in the path.
	     */
	    readonly characteristicDepth: number;
	    /**
	     * Gets the number of part elements in the path.
	     */
	    readonly partDepth: number;
	    /**
	     * Gets a value indicating whether the characteristic is an enumerated characteristic, which means that its measurement value represents the key of a catalog entry.
	     */
	    readonly isEnumerated: boolean;
	    /**
	     * Gets a value indicating whether the characteristic is a counting characteristic, which means that its measurement value represents a number of arbitrary entities.
	     */
	    readonly isCounted: boolean;
	    /**
	     * @private
	     */
	    readonly catalogId?: string;
	    /**
	     * Gets the name of the item, which is also the last part of the path.
	     */
	    readonly name: string;
	    /**
	     * Gets the tolerances as well as other limits of this item.
	     */
	    readonly limits: LimitCollection;
	    /**
	     * @private
	     */
	    constructor(id: string, parentId: string | undefined, type: InspectionPlanItemType, isEnumerated: boolean, catalogId: string | undefined, isCounted: boolean, path: string, partDepth: number, characteristicDepth: number, attributes: Iterable<Attribute>);
	    /**
	     * @private
	     */
	    getCatalogGuid(): string | undefined;
	    /**
	     * @private
	     */
	    getInspectionPlanGuid(): string;
	}
	/**
	 * Describes a set of inspection plan items. It offers a wide range of functions to improve its accessibility. You can iterate over the collection like the following:
	 *
	 * ```TypeScript
	 * const inspectionPlanCollection = piweb.data.getInspectionPlanCollection();
	 * for (let item of inspectionPlanCollection)
	 * {
	 *     ...
	 * }
	 * ```
	 */
	export class InspectionPlanCollection implements Iterable<InspectionPlanItem> {
	    /**
	     * @private
	     */
	    private readonly _idMap;
	    /**
	     * @private
	     */
	    private readonly _pathMap;
	    /**
	     * @private
	     */
	    constructor(items: Iterable<InspectionPlanItem>);
	    /**
	     * @private
	     */
	    [Symbol.iterator](): Iterator<InspectionPlanItem>;
	    /**
	     * Returns an iter over all inspection plan items.
	     */
	    iter(): Iter<InspectionPlanItem>;
	    /**
	     * Gets the total number of items stored in the collection.
	     */
	    readonly length: number;
	    /**
	     * Returns an iterator over all characteristics stored in the collection.
	     */
	    getCharacteristics(): Iter<InspectionPlanItem>;
	    /**
	     * Returns an iterator over all parts stored in the collection.
	     */
	    getParts(): Iter<InspectionPlanItem>;
	    /**
	     * Returns the inspection plan item that associated to the the specified entity or `undefined` if the collection contains no such inspection plan item. The following associations are assumed:
	     *
	     * | Entity                            | Association |
	     * |----------------------------------|------------------------------------------------------|
	     * | [[Measurement]] | The part to which the measurement is attached |
	     * | [[MeasurementValue]] | The characteristic to which the measurement value is attached |
	     * | [[RawDataItem]] | The part or characteristic to which the raw data is attached |
	     * @param entity A measurement, measurement value or raw data item.
	     */
	    findByEntity(entity: Measurement | MeasurementValue | RawDataItem): InspectionPlanItem | undefined;
	    /**
	     *
	     * Returns the inspection plan item that is identified by the specified path or `undefined` if the collection contains no such inspection plan item.
	     * @param path An inspection plan path.
	     */
	    findByPath(path: string): InspectionPlanItem | undefined;
	    /**
	     * Returns the parent item of the specified inspection plan item or `undefined` if the item has no parent, or the collection doesn't contain it.
	     * @param item The item whose parent is requested.
	     */
	    findParent(item: InspectionPlanItem): InspectionPlanItem | undefined;
	    /**
	     * Returns the parent part of the specified inspection plan item or `undefined` if the item has no parent, or the collection doesn't contain it.
	     * @param item The item whose parent part is requested.
	     */
	    findParentPart(item: InspectionPlanItem): InspectionPlanItem | undefined;
	    /**
	     * Returns the child items of the specified inspection plan item or. Please be aware that only those children are returned, that are included in the binding of the element.
	     * @param item The item whose children are requested.
	     */
	    findChildren(item: InspectionPlanItem): Iter<InspectionPlanItem>;
	    /**
	     * @private
	     */
	    first(): InspectionPlanItem | undefined;
	}
	/**
	 * Returns all inspection plan items that are bound to the plot extension element with databinding. You can change the databinding in PiWeb Designer.
	 */
	export function getInspectionPlanCollection(): InspectionPlanCollection;
	export class LimitCollection {
	    readonly tolerance: LimitContext;
	    readonly warning: LimitContext;
	    readonly control: LimitContext;
	    readonly scrap: LimitContext;
	    constructor(tolerance: LimitContext, warning: LimitContext, control: LimitContext, scrap: LimitContext);
	    getLimit(type: LimitType): LimitContext;
	}
	export class LimitContext {
	    private readonly _limitReference;
	    private readonly _limit;
	    readonly nominalValue: number | undefined;
	    readonly upperValueIsNatural: boolean;
	    readonly lowerValueIsNatural: boolean;
	    readonly lowerValue: number | undefined;
	    readonly upperValue: number | undefined;
	    constructor(nominalValue: number | undefined, limit: Limit, lowerValueIsNatural: boolean, upperValueIsNatural: boolean, limitReference: LimitUsageReference);
	    contains(value: MeasurementValue | number | undefined, precision?: number): boolean;
	    getlimitUsage(value: MeasurementValue | number, precision?: number): number | undefined;
	    toDisplayString(): string;
	}
	export class Limit {
	    readonly lower: number | undefined;
	    readonly upper: number | undefined;
	    readonly mid: number | undefined;
	    constructor(lower: number | undefined, upper: number | undefined);
	    containsValue(value: number, precision: number): boolean;
	}
}


declare module "piweb/data/measurements" {
	import { AttributeCollection, Attribute, IAttributeItem } from "piweb/data/attributes";
	import { InspectionPlanItem } from 'piweb/data/inspection';
	import { RawDataItem } from 'piweb/data/raw_data';
	import { Iter } from 'iter';
	/**
	 * A collection of [`Measurements`](#measurement). It offers a wide range of functions to improve its accessibility. You can iterate over the collection like the following:
	 *
	 * ```TypeScript
	 * const measurementCollection = piweb.data.getMeasurementCollection();
	 * for (let measurement of measurementCollection)
	 * {
	 *     ...
	 * }
	 * ```
	 */
	export class MeasurementCollection {
	    private readonly _idMap;
	    /**
	     * @private
	     */
	    constructor(measurements: Iterable<Measurement>);
	    /**
	     * @private
	     */
	    [Symbol.iterator](): Iterator<Measurement>;
	    /**
	     * Returns an iter over all measurements.
	     */
	    iter(): Iter<Measurement>;
	    /**
	     * Gets the number of measurements in the collection.
	     */
	    readonly length: number;
	    /**
	     * Returns the measurement that associated to the the specified raw data item or `undefined` if the collection contains no such measurement.
	     * @param entity The raw data item from which the measurement should be returned.
	     */
	    findMeasurementByEntity(entity: RawDataItem): Measurement | undefined;
	    /**
	     * Returns the measurements that are associated to the the specified inspection plan part or `undefined` if the collection contains no such measurement.
	     * @param entity The inspection plan part to search measurements for.
	     */
	    findMeasurementsByEntity(entity: InspectionPlanItem): Iter<Measurement>;
	    /**
	     * Returns the measurement value that is associated to the specified [`RawDataItem`](#rawdataitem) or `undefined` if the collection contains no such measurement value.
	     * @param entity The raw data item from which the measurement value should be returned.
	     */
	    findValueByEntity(entity: RawDataItem): MeasurementValue | undefined;
	    /**
	     * Returns the measurement values that are associated to the the specified inspection plan characteristic or `undefined` if the collection contains no such measurement.
	     * @param entity The inspection plan characteristic to search values for.
	     */
	    findValuesByEntity(entity: InspectionPlanItem): Iter<MeasurementValue>;
	    /**
	     * @private
	     */
	    first(): Measurement | undefined;
	}
	/**
	 * Describes a measurement of an inspection plan part. A measurement is composed of measurement values that are associated to characteristics.
	 * The characteristics are the children of the part to which the measurement is associated.
	 */
	export class Measurement implements IAttributeItem {
	    /**
	     * Gets the attributes of this measurement.
	     */
	    readonly attributes: AttributeCollection;
	    /**
	     * @private
	     */
	    readonly measurementId: string;
	    /**
	     * @private
	     */
	    readonly partId: string;
	    /**
	     * @private
	     */
	    readonly _values: Map<string, MeasurementValue>;
	    /**
	     * @private
	     */
	    constructor(id: string, partId: string, attributes: Iterable<Attribute>, values: Iterable<MeasurementValue>);
	    /**
	     * @private
	     */
	    getMeasurementGuid(): string;
	    /**
	     * @private
	     */
	    getPartGuid(): string;
	    /**
	     * Returns the measurement value that is associated to the specified characteristic or `undefined` if the measurement contains no such measurement value.
	     * @param entity The inspection plan characteristic to search the value for.
	     */
	    findValueByEntity(entity: InspectionPlanItem): MeasurementValue | undefined;
	    /**
	     * Gets the number of measurement values associated to this measurement.
	     */
	    readonly valueCount: number;
	    /**
	     * Returns an iter over all values that are associated to this measurement. In case you fetched the measurements without values, the set is empty.
	     */
	    readonly allMeasurementValues: Iter<MeasurementValue>;
	    /**
	     * @private
	     */
	    first(): MeasurementValue | undefined;
	}
	/**
	 * Describes a measurement value of an inspection plan characteristic.
	 */
	export class MeasurementValue implements IAttributeItem {
	    /**
	     * Gets the attributes of this measurement value.
	     */
	    readonly attributes: AttributeCollection;
	    /**
	     * @private
	     */
	    readonly characteristicId: string;
	    /**
	     * Gets the measurement to which this measurement value belongs
	     */
	    measurement: Measurement;
	    /**
	     * @private
	     */
	    readonly measurementId: string;
	    /**
	     * @private
	     */
	    constructor(characteristicId: string, attributes: Iterable<Attribute>);
	    /**
	     * @private
	     */
	    getMeasurementGuid(): string;
	    /**
	     * @private
	     */
	    getCharacteristicGuid(): string;
	}
	/**
	 * Returns all measurements that are associated to the parts that are bound to the plot extension element with databinding.
	 * You can change the databinding and the measurement selection in PiWeb Designer.
	 */
	export function getMeasurementCollection(): MeasurementCollection;
}


declare module "piweb/data/path" {
	/**
	 * @module data
	 */
	/** second comment block, needed for module merging, don't remove */
	export { basename, extname, isAbsolute, join, relative, format, normalize, sep } from "piweb/resources/path";
	export { dirname as parentname } from "piweb/resources/path";
	export interface ParsedPath {
	    /**
	     * The full parent path such as '/Part1/Part2/Point'
	     */
	    parent: string;
	    /**
	     * The name of the inspection plan entity including extension (if any) such as 'Point.X'
	     */
	    base: string;
	    /**
	     * The extension (if any) such as '.X'
	     */
	    ext: string;
	    /**
	     * The inspection plan entity name without extension (if any) such as 'Point'
	     */
	    name: string;
	}
	/**
	 * Resolves {pathSegments} to an absolute path.
	 *
	 * If the right most argument isn't already absolute, arguments are prepended in right to left order, until an absolute path is found. If after using all paths still no absolute path is found, the path is considered relative to the root.
	 * The resulting path is normalized, and trailing slashes are removed unless the path gets resolved to the root.
	 *
	 * @param pathSegments string paths to join.  Non-string arguments are ignored.
	 */
	export function resolve(...pathSegments: any[]): string;
	/**
	 * Returns an object from a path string - the opposite of format().
	 *
	 * @param pathString path to evaluate.
	 */
	export function parse(pathString: string): ParsedPath;
	/**
	 * Escapes inspection plan entity names which would be invalid as a path element.
	 *
	 * @param name inspection plan entity name to escape.
	 */
	export function escapeEntityName(name: string): string;
}


declare module "piweb/data/plot" {
	/**
	 * @module data
	 */ /** */
	import { BufferReader } from 'internal/buffer_reader';
	import { Iter } from 'iter';
	/**
	* A vector is a tuple of three numbers that can act as position, size and direction.
	*/
	export class Vector {
	    constructor(x: number, y: number, z: number);
	    /**
	     * X-Coordinate.
	     */
	    x: number;
	    /**
	     * Y-Coordinate.
	     */
	    y: number;
	    /**
	     * Z-Coordinate.
	     */
	    z: number;
	}
	/**
	 * @private
	 */
	export function readVector(source: BufferReader): Vector;
	/**
	 * Known types of plot tolerances, usually used for different plot types.
	 */
	export type PlotToleranceType = "linear" | "radial" | "rectangular" | "spatial";
	/**
	 * @private
	 */
	export const enum PlotToleranceTypeId {
	    Linear = 0,
	    Radial = 1,
	    Rectangular = 2,
	    Spatial = 3,
	}
	/**
	 * Tolerance information for plot data.
	 */
	export abstract class PlotTolerance {
	    constructor(type: PlotToleranceType);
	    /**
	     * The kind of tolererance.
	     */
	    type: PlotToleranceType;
	}
	/**
	 * Tolerance with lower and upper boundary.
	 */
	export class LinearPlotTolerance extends PlotTolerance {
	    constructor(lower: number, upper: number);
	    lower: number;
	    upper: number;
	}
	/**
	 * Tolerance with a single radius for one-dimensional natural values.
	 */
	export class RadialPlotTolerance extends PlotTolerance {
	    constructor(radius: number);
	    radius: number;
	}
	/**
	 * Tolerance with a width and height for two-dimensional natural values.
	 */
	export class RectangularPlotTolerance extends PlotTolerance {
	    constructor(width: number, height: number);
	    width: number;
	    height: number;
	}
	/**
	 * Tolerance with three dimensions for three-dimensional natural values.
	 */
	export class SpatialPlotTolerance extends PlotTolerance {
	    constructor(x: number, y: number, z: number);
	    x: number;
	    y: number;
	    z: number;
	}
	/**
	 * @private
	 */
	export function readTolerance(source: BufferReader): PlotTolerance | undefined;
	/**
	 * The supported datatypes for plot properties.
	 */
	export type PlotPropertyType = "string" | "integer" | "float" | "date" | "timespan";
	/**
	 * @private
	 */
	export const enum PlotPropertyTypeId {
	    String = 0,
	    Integer = 1,
	    Float = 2,
	    Date = 3,
	    TimeSpan = 4,
	}
	/**
	 * Represents the value of a plot property. Timespans are stored as a number, which is the number of milliseconds.
	 */
	export type PlotPropertyValue = string | number | Date;
	/**
	 * A key-value pair to store additional data in plots or plotpoints.
	 */
	export class PlotProperty {
	    constructor(name: string, description: string, type: PlotPropertyType, value: PlotPropertyValue);
	    name: string;
	    description: string;
	    value: PlotPropertyValue;
	    type: PlotPropertyType;
	}
	/**
	 * Describes an accessible collection of properties. The collection offers a wide range of helper
	 * functions to allow a type safe access to the properties values. You can iterate over the collection with a for ... of loop.
	 */
	export class PlotPropertyCollection {
	    /**
	     * @private
	     */
	    readonly _properties: Map<string, PlotProperty>;
	    constructor(properties: Iterable<PlotProperty>);
	    /**
	     * Returns an iterator over all properties.
	     */
	    [Symbol.iterator](): Iterator<PlotProperty>;
	    /**
	     * Returns an iter over all properties.
	     */
	    iter(): Iter<PlotProperty>;
	    /**
	     * Gets the number of properties stored in the collection.
	     */
	    readonly length: number;
	    /**
	     * Gets an iterator over the available name in the collection.
	     */
	    readonly names: Iter<string>;
	    /**
	     * Returns the property with the specified name, or `undefined` in case there is no property with this key.
	     * @param name The name of the property.
	     */
	    getPlotProperty(name: string): PlotProperty | undefined;
	    /**
	     * Returns the value of the property with the specified key, or `undefined` in case there is no property with this key.
	     * @param key The key of the property.
	     */
	    getValue(key: string): string | number | Date | undefined;
	    /**
	     * Returns the value of the property with the specified key as `string`, or `undefined` in case there is no property with this key.
	     * @param name The key of the property.
	     */
	    getStringValue(name: string): string | undefined;
	    /**
	     * Returns the value of the property with the specified key as integral `number`, or `undefined` in case there is no property with this key or the properties value can't be converted into an integral `number` representation.
	     * @param name The key of the property.
	     */
	    getIntegerValue(name: string): number | undefined;
	    /**
	     * Returns the value of the property with the specified key as floating point `number`, or `undefined` in case there is no property with this key or the properties value can't be converted into a floating point `number` representation.
	     * @param name The key of the property.
	     */
	    getFloatValue(name: string): number | undefined;
	    /**
	     * Returns the value of the property with the specified key as `Date`, or `undefined` in case there is no property with this key or the properties value can't be converted into a `Date` representation.
	     * @param name The key of the property.
	     */
	    getDateValue(name: string): Date | undefined;
	    /**
	     * Returns the value of the property with the specified key as `number`, which are the total milliseconds of the timespan, or `undefined` in case there is no property with this key or the properties value can't be converted into a `number` representation.
	     * @param name The key of the property.
	     */
	    getTimespanValue(name: string): number | undefined;
	    /**
	     * Returns the value of the property with the specified key as `number`, or `undefined` in case there is no property with this key or the properties value can't be converted into a `number` representation.
	     * @param key The key of the property.
	     */
	    getNumericValue(name: string): number | undefined;
	}
	/**
	 * @private
	 */
	export function readPlotProperty(source: BufferReader): PlotProperty;
	/**
	 * @private
	 */
	export function readPlotProperties(source: BufferReader): PlotPropertyCollection;
}


declare module "piweb/data/raw_data" {
	import { HostBinary } from 'piweb/resources/host_binary';
	import { InspectionPlanItem } from 'piweb/data/inspection';
	import { Measurement, MeasurementValue } from 'piweb/data/measurements';
	import { Iter } from 'iter';
	/**
	 * An enumeration to identify the entity to which a raw data item is attached.
	 */
	export type RawDataEntity = "part" | "characteristic" | "measurement" | "measurementValue";
	/**
	 * @private
	 */
	export function mapEntityType(entityType: number): RawDataEntity;
	/**
	 * Describes the information about a single raw data entry on the server. When fetching the raw data items, only these information are fetched from the server, not the data itself.
	 */
	export class RawDataItem {
	    /**
	     * @private
	     */
	    inspectionPlanItemId?: string;
	    /**
	     * @private
	     */
	    measurementId?: string;
	    /**
	     * @private
	     */
	    _checkSumBytes: Buffer;
	    /**
	     * Gets the type of the entity this item is attached to.
	     */
	    entityType: RawDataEntity;
	    /**
	     * Gets the key of this item.
	     */
	    key: number;
	    /**
	     * Gets the filename.
	     */
	    name: string;
	    /**
	     * Gets the size of the data in bytes.
	     */
	    size: number;
	    /**
	     * Gets the mime type.
	     */
	    mimeType?: string;
	    /**
	     * Gets the date when the item has been uploaded to the piweb server.
	     */
	    created: Date;
	    /**
	     * Gets the date when the item has been modified on the piweb server.
	     */
	    lastModified: Date;
	    constructor(entityType: RawDataEntity, inspectionPlanItemId: string | undefined, measurementId: string | undefined, checkSumBytes: Buffer, key: number, name: string, size: number, mimetype: string | undefined, created: Date, lastModified: Date);
	    /**
	     * @private
	     */
	    getCheckSum(): string;
	    /**
	     * @private
	     */
	    getInspectionGuid(): string | undefined;
	    /**
	     * @private
	     */
	    getMeasurementGuid(): string | undefined;
	    /**
	     * Returns the data associated to the [[RawDataItem]]. The data is returned as a [[HostBuffer]], which can be converted to a [[Buffer]] using the `makeBuffer` function.
	     */
	    getDataBuffer(): Buffer | undefined;
	    /**
	     * Returns the data associated to the [[RawDataItem]]. The data is returned as a [[Buffer]].
	     */
	    getData(): HostBinary | undefined;
	}
	/**
	 * Describes a list of raw data information with additional functions to access certain entries. You can iterate over the collection like the following:
	 *
	 *  * ```TypeScript
	 * const rawDataCollection = piweb.data.getRawDataCollection();
	 * for (let rawDataItem of rawDataCollection)
	 * {
	 *     ...
	 * }
	 * ```
	 */
	export class RawDataCollection {
	    /**
	     * @private
	     */
	    private readonly _items;
	    /**
	     * @private
	     */
	    constructor(items: Iterable<RawDataItem>);
	    /**
	     * @private
	     */
	    [Symbol.iterator](): Iterator<RawDataItem>;
	    /**
	     * Returns an iter over all raw data items.
	     */
	    iter(): Iter<RawDataItem>;
	    /**
	     * Gets the total number of items in this collection.
	     */
	    readonly length: number;
	    /**
	     * Returns the items that match one or more of the specified filter strings.
	     * @param wildcards One or more filter strings. Wildcards like '*' are allowed.
	     */
	    findByName(...wildcards: string[]): Iter<RawDataItem>;
	    /**
	     * Returns the raw data items that are associated to the specified entity.
	     * @param entity An instance of a raw data entity.
	     */
	    findByEntity(entity: InspectionPlanItem | Measurement | MeasurementValue): Iter<RawDataItem>;
	    /**
	     * @private
	     */
	    first(): RawDataItem | undefined;
	}
	/**
	 * Returns a list of all raw data entries that are bound to the plot extension via databinding. Since the raw data files are possibly quite large, they are not copied by the plot extension engine.
	 *
	 * ```TypeScript
	 * function getRawDataCollection() : RawDataCollection;
	 * ```
	 *
	 * You can specify the entity from which you wish to get the raw data, e.g. measured values or characteristics. The default behavior is to return all raw data, which can be quite slow, especially when the plot is bound to many measurement values.
	 *
	 * ```TypeScript
	 * function setRawDataSources( Iterable<RawDataEntity> sources ) : void;
	 * function getRawDataSources() : Iterable<RawDataEntity>;
	 * ```
	 */
	export function getRawDataCollection(): RawDataCollection;
	/**
	 * @private
	 */
	export enum RawDataSourceIds {
	    None = 0,
	    Parts = 1,
	    Characteristics = 2,
	    Measurements = 4,
	    MeasurementValues = 8,
	}
	/**
	 * Sets the raw data entities from which the plot extension fetches the raw data. By default, the plot fetches raw data
	 * from all entities, including measurement values. When the databinding of the plot extension element features a lot of characteristics
	 * and measurements, the raw data fetching can have a large performance impact.
	 * @param sources
	 */
	export function setRawDataSources(sources: Iterable<RawDataEntity>): void;
	/**
	 * Returns the raw data entities from which the plot extension fetches the raw data.
	 */
	export function getRawDataSources(): Iterable<RawDataEntity>;
}


declare module "piweb/data/volume" {
	import { HostBinary } from 'piweb/resources/host_binary';
	import { RawDataEntity } from 'piweb/data/raw_data';
	import { InspectionPlanItem } from 'piweb/data/inspection';
	import { Measurement, MeasurementValue } from 'piweb/data/measurements';
	import { Iter } from 'iter';
	import { PlotPropertyCollection } from 'piweb/data/plot';
	/**
	 * Known volume directions / planes
	 * @version 1.1
	 */
	export type VolumeDirection = "x" | "y" | "z";
	/**
	 * Describes a vector in the context of volumes, which can be accessed with a [[VolumeDirection]].
	 * @version 1.1
	 */
	export class VolumeVector {
	    /**
	     * X-Direction
	     */
	    x: number;
	    /**
	     * Y-Direction
	     */
	    y: number;
	    /**
	     * Z-Direction
	     */
	    z: number;
	    /**
	     * @private
	     */
	    constructor(x: number, y: number, z: number);
	    /**
	     * Returns the value of the vector in the specified direction.
	     * @param direction the volume direction.
	     */
	    get(direction: VolumeDirection): number;
	    /**
	     * Sets the value of the vector in the specified direction.
	     * @param direction the volume direction.
	     */
	    set(direction: VolumeDirection, value: number): void;
	}
	/**
	 * Describes the information about a single volume.
	 * @version 1.1
	 */
	export class Volume {
	    /**
	     * The entity type to which the volume is attached.
	     */
	    entity: RawDataEntity;
	    /**
	     * Gets the key of this item.
	     */
	    key: number;
	    /**
	     * @private
	     */
	    measurementId?: string;
	    /**
	     * @private
	     */
	    inspectionPlanItemId?: string;
	    /**
	     * Gets the filename.
	     */
	    name: string;
	    /**
	     * Gets the size of the volume in voxels.
	     */
	    size: VolumeVector;
	    /**
	     * Gets the size of a single voxel of the volume in mm.
	     */
	    resolution: VolumeVector;
	    /**
	     * Gets a collection of user data that is attached to this volume.
	     */
	    properties: PlotPropertyCollection;
	    /**
	     * @private
	     */
	    constructor(entity: RawDataEntity, inspectionPlanItemId: string | undefined, measurementId: string | undefined, key: number, name: string, size: VolumeVector, resolution: VolumeVector, properties: PlotPropertyCollection);
	    /**
	     * @private
	     */
	    getInspectionGuid(): string | undefined;
	    /**
	     * @private
	     */
	    getMeasurementGuid(): string | undefined;
	    /**
	     * Returns the slice with the specified index in the specified direction as [[Buffer]].
	     */
	    getSliceBuffer(direction: VolumeDirection, index: number): Buffer | undefined;
	    /**
	     * Returns the slice with the specified index in the specified direction as [[HostBinary]].
	     */
	    getSlice(direction: VolumeDirection, index: number): HostBinary | undefined;
	}
	/**
	 * Describes a list of volumes with additional functions to access certain entries. You can iterate over the collection like the following:
	 *
	 * ```TypeScript
	 * const volumeCollection = piweb.data.getVolumeCollection();
	 * for (let volume of volumeCollection)
	 * {
	 *     ...
	 * }
	 * ```
	 * @version 1.1
	 */
	export class VolumeCollection {
	    /**
	     * @private
	     */
	    private readonly _items;
	    /**
	     * @private
	     */
	    constructor(items: Iterable<Volume>);
	    /**
	     * @private
	     */
	    [Symbol.iterator](): Iterator<Volume>;
	    /**
	     * Returns an iter over all volume items.
	     */
	    iter(): Iter<Volume>;
	    /**
	     * Gets the total number of items in this collection.
	     */
	    readonly length: number;
	    /**
	     * Returns the items that match one or more of the specified filter strings.
	     * @param wildcards One or more filter strings. Wildcards like '*' are allowed.
	     */
	    findByName(...wildcards: string[]): Iter<Volume>;
	    /**
	     * Returns the volume items that are associated to the specified entity.
	     * @param entity An instance of a volume entity.
	     */
	    findByEntity(entity: InspectionPlanItem | Measurement | MeasurementValue): Iter<Volume>;
	    /**
	     * @private
	     */
	    first(): Volume | undefined;
	}
	/**
	 * Returns a list of all volumes that are bound to the plot extension via databinding. Since the volumes are possibly very large, they are not copied by the plot extension engine.
	 *
	 * ```TypeScript
	 * function getVolumeCollection() : VolumeCollection;
	 * ```
	 *
	 * You can specify the entity from which you wish to get the volume, e.g. measured values or characteristics. The default behavior is to return no volumes.
	 *
	 * ```TypeScript
	 * function setVolumeSources( Iterable<RawDataEntity> sources ) : void;
	 * function getVolumeSources() : Iterable<RawDataEntity>;
	 * ```
	 * @version 1.1
	 */
	export function getVolumeCollection(): VolumeCollection;
	/**
	 * Sets the raw data entities from which the plot extension fetches the volumes.
	 * @param sources
	 * @version 1.1
	 */
	export function setVolumeSources(sources: Iterable<RawDataEntity>): void;
	/**
	 * Returns the raw data entities from which the plot extension fetches the volumes.
	 * @version 1.1
	 */
	export function getVolumeSources(): Iterable<RawDataEntity>;
}


declare module "piweb/data/wellknown_keys" {
	/**
	 * @module data
	 */ /** */
	/**
	 * Describes a set of attribute keys that are known and/or interpreted by PiWeb for certain evaluations.
	 */
	export namespace WellKnownKeys {
	    /**
	     * Describes the known attribute keys for inspection plan parts.
	     */
	    namespace Part {
	        const Number: number;
	        const Description: number;
	        const Abbreviation: number;
	        const DrawingStatus: number;
	        const Line: number;
	        const ControlItem: number;
	        const VariantOfLine: number;
	        const DrawingNumber: number;
	        const DrawingName: number;
	        const Operation: number;
	        const Organisation: number;
	        const CostCenter: number;
	        const InspectionType: number;
	        const Plant: number;
	        const CallbackUri: number;
	        const CallbackUriText: number;
	        const AdjustmentDate: number;
	        const CreationDate: number;
	        const CreatedBy: number;
	        const UpdateDate: number;
	        const UpdatedBy: number;
	        const OrganisationalUnit: number;
	        const ProductionLine: number;
	        const Responsible: number;
	        const Comment: number;
	    }
	    /**
	     * Describes the known attribute keys for inspection plan characteristics.
	     */
	    namespace Characteristic {
	        const Number: number;
	        const Description: number;
	        const Abbreviation: number;
	        const Direction: number;
	        const GroupType: number;
	        const MeasurementPointRole: number;
	        const Position: number;
	        const Orientation: number;
	        const ControlItem: number;
	        const DistributionType: number;
	        const LogicalOperationString: number;
	        const DecimalPlaces: number;
	        const DesiredValue: number;
	        const NominalValue: number;
	        const LowerSpecificationLimit: number;
	        const UpperSpecificationLimit: number;
	        const LowerTolerance: number;
	        const UpperTolerance: number;
	        const LowerScrapLimit: number;
	        const UpperScrapLimit: number;
	        const LowerBoundaryType: number;
	        const UpperBoundaryType: number;
	        const Unit: number;
	        const Category: number;
	        const I: number;
	        const J: number;
	        const K: number;
	        const X: number;
	        const Y: number;
	        const Z: number;
	        const Layer: number;
	        const HasStamp: number;
	        const StampCaption: number;
	        const StampPositionX: number;
	        const StampPositionY: number;
	        const StampTargetX: number;
	        const StampTargetY: number;
	        const StampRadius: number;
	        const AuditFunction: number;
	        const LowerControlLimit: number;
	        const UpperControlLimit: number;
	        const LowerWarningLimit: number;
	        const UpperWarningLimit: number;
	        const CharacteristicType: number;
	        const MeasurementValueCatalog: number;
	        const PlotMeasurand: number;
	        const CharacteristicSpecification: number;
	        const FeatureName: number;
	        const OperationType: number;
	        const CallbackUri: number;
	        const CallbackUriText: number;
	        const MeasuredQuantityType: number;
	        const PdaSampleSize: number;
	        const PdaSampleType: number;
	        const DistributionAnalysisMode: number;
	        const LocationChartConfiguration: number;
	        const LocationChartAverageValue: number;
	        const LocationChartLowerControlLimit: number;
	        const LocationChartUpperControlLimit: number;
	        const LocationChartLowerWarningLimit: number;
	        const LocationChartUpperWarningLimit: number;
	        const VariationChartConfiguration: number;
	        const VariationChartAverageValue: number;
	        const VariationChartLowerControlLimit: number;
	        const VariationChartUpperControlLimit: number;
	        const VariationChartLowerWarningLimit: number;
	        const VariationChartUpperWarningLimit: number;
	    }
	    /**
	     * Describes the known attribute keys for measurements.
	     */
	    namespace Measurement {
	        const Time: number;
	        const EventId: number;
	        const BatchNumber: number;
	        const InspectorName: number;
	        const Comment: number;
	        const MachineNumber: number;
	        const ProcessId: number;
	        const InspectionEquipment: number;
	        const ProcessValue: number;
	        const PartsId: number;
	        const InspectionType: number;
	        const ProductionNumber: number;
	        const Contract: number;
	        const Shift: number;
	        const PartNumberIncremental: number;
	        const MeasurementStatus: number;
	        const MeasurementChangeDate: number;
	        const MeasurementChangedBy: number;
	        const AggregationJobUuid: number;
	        const AggregationInterval: number;
	        const AggregatedMeasurementCount: number;
	    }
	    /**
	     * Describes the known attribute keys for catalogs.
	     */
	    namespace Catalog {
	        const ColorSchemePositionKey: number;
	        const StatusColorKey: number;
	        const LowerClassLimitKey: number;
	        const UpperClassLimitKey: number;
	        const DistributionTypeKey: number;
	        const MeasuredQuantityTypeKey: number;
	        const PdaSampleTypeDescription: number;
	        const PdaSampleTypeKey: number;
	        const DistributionAnalysisModeDescription: number;
	        const DistributionAnalysisModeKey: number;
	    }
	    /**
	     * Describes the known attribute keys for measurement values.
	     */
	    namespace Value {
	        const MeasuredValue: number;
	        const AggregatedMinimum: number;
	        const AggregatedMaximum: number;
	        const AggregatedRange: number;
	        const AggregatedMean: number;
	        const AggregatedSigma: number;
	        const AggregatedMedian: number;
	        const AggregatedLowerQuartile: number;
	        const AggregatedUpperQuartile: number;
	        const AggregatedCp: number;
	        const AggregatedCpk: number;
	        const AggregatedValueCount: number;
	        const AggregatedYellowRange: number;
	        const AggregatedRedRange: number;
	    }
	}
}


declare module "piweb/drawing/drawing" {
	/**
	 * @module drawing
	 */
	/** file */
	import { BufferWriter } from 'internal/buffer_writer';
	import { Serializable } from "internal/serializable";
	import { PointDescription } from 'piweb/drawing/geometry/basics';
	import { BrushDescription } from 'piweb/drawing/material/brushes';
	import { PenDescription } from 'piweb/drawing/material/pen';
	import { FormattedTextDescription } from "piweb/drawing/text/formatted_text";
	import { GeometryDescription } from "piweb/drawing/geometry/geometries";
	import { TransformDescription } from "piweb/drawing/transform/transforms";
	import { TextDrawingSettingsDescription } from "piweb/drawing/text/settings";
	import { ImageDrawingSettingsDescription } from "piweb/drawing/image/settings";
	import { GeometryDrawingSettingsDescription } from "piweb/drawing/geometry/settings";
	import { Bitmap } from "piweb/drawing/image/bitmap";
	import { HighlightDescription } from "piweb/drawing/highlight/highlight";
	/**
	 * Describes the content of a drawing with the help of various drawing commands.
	 */
	export interface DrawingContext {
	    /**
	     * Draws a line using from `start` to `end` using the pen which has been previously set with the [[setPen]] function.
	     * In case you want to draw a larger number of lines, consider using the [[drawLines]] or [[drawGeometry]] function
	     * to improve the drawing performance.
	     */
	    drawLine(start: PointDescription, end: PointDescription): void;
	    /**
	     * Draws multiple lines that are **not** connected using the pen which has been previously set with the [[setPen]] function.
	     * The number of points provided as parameter `lines` must be even. Each two points describe a line. In case you want to draw
	     * connected points, please consider using the function [[drawGeometry]] instead of using the [[drawLines]] function with
	     * duplicate points.
	     */
	    drawLines(lines: PointDescription[]): void;
	    /**
	     * Draws a rectangle with of width `w` and height `h` at Point `x;y` and fills it with the brush which has been previously
	     * set using the [[setBrush]] function, and strokes it using the pen which has been previously set
	     * with the [[setPen]] function. In case you want to draw a larger number of rectangles, consider
	     * using the [[drawGeometry]] function with a [[GeometryGroup]], containing
	     * multiple [[RectangleGeometry]] objects to improve the drawing performance.
	     */
	    drawRectangle(x: number, y: number, w: number, h: number): void;
	    /**
	     * Draws an ellipse around the point `center` and fills it with the brush which has been previously set using the [[setBrush]]
	     * function, and strokes it using the pen which has been previously set with the [[setPen]] function. In case you want to draw
	     * a larger number of ellipses (e.g. points), consider using the [[drawGeometry]] function with a [[GeometryGroup]], containing
	     * multiple [[EllipseGeometry]] objects to improve the drawing performance.
	     */
	    drawEllipse(center: PointDescription, radiusX: number, radiusY: number): void;
	    /**
	     * Draws the specified [[Geometry]] and fills it with the brush which has been previously set using the [[setBrush]] function,
	     * and strokes it using the pen which has been previously set with the [[setPen]] function. In case you want to draw a larger
	     * number of geometries, consider creating a [[GeometryGroup]], containing multiple [[Geometry]] objects to improve the drawing
	     * performance. The geometry can be easily aligned with the `settings` parameter.
	     */
	    drawGeometry(geometry: GeometryDescription, settings?: GeometryDrawingSettingsDescription): void;
	    /**
	     * Draws the specified [[FormattedText]] at with the specified [[TextDrawingSettings]]. There are numerous properties which will
	     * help you to adjust how the text is arranged and displayed. For more information, please read the chapters '[FormattedText]',
	     * '[Font]' and '[TextDrawingSettings]'.
	     */
	    drawText(text: FormattedTextDescription | string, settings?: TextDrawingSettingsDescription): void;
	    /**
	     * Draws the specified [[Bitmap]] buffer that is stored with the specified [[ImageDataLayout]] with the specified [[ImageDrawingSettings]].
	     */
	    drawImage(image: Bitmap, settings?: ImageDrawingSettingsDescription): void;
	    /**
	     * Draws the specified [[Drawing]] into the current drawing context. To set the position and size of the drawing, use the
	     * [[pushTransform]] function. The drawing can be easily aligned with the `settings` parameter.
	     */
	    drawDrawing(drawing: Drawing, settings?: GeometryDrawingSettingsDescription): void;
	    /**
	     * Sets the pen that will be used for all subsequent calls to [[drawLine]], [[drawLines]], [[drawRectangle]], [[drawEllipse]]
	     * and [[drawGeometry]]. In case you don't want your rectangle, ellipse or geometry to be stroked, use the [[noPen]] function.
	     */
	    setPen(pen: PenDescription): void;
	    /**
	     * Removes the pen that has previously been set with the [[setPen]] function. All subsequent calls to [[drawLine]], [[drawLines]],
	     * [[drawRectangle]], [[drawEllipse]] and [[drawGeometry]] will not be stroked.
	     */
	    noPen(): void;
	    /**
	     * Sets the brush that will be used for all subsequent calls to [[drawRectangle]], [[drawEllipse]] and [[drawGeometry]].
	     * In case you don't want your rectangle, ellipse or geometry to be filled, use the [[noBrush]] function.
	     */
	    setBrush(brush: BrushDescription): void;
	    /**
	     * Removes the brush that has previously been set with the [[setBrush]] function. All subsequent calls to [[drawRectangle]],
	     * [[drawEllipse]] and [[drawGeometry]] will not be filled.
	     */
	    noBrush(): void;
	    /**
	     * Multiplies the current transformation matrix with another [[Transform]]. To undo it, use the [[pop]] function.
	     */
	    pushTransform(transformation: TransformDescription): void;
	    /**
	     * Sets a new clip geometry. All subsequent drawing calls will only be rendered inside the fill area of the specified `geometry`.
	     * Be aware that unfilled geometries like straight lines don't have any fill area, which means that all subsequent drawing calls
	     * have no effect. To undo it, use the [[pop]] function.
	     */
	    pushClip(geometry: GeometryDescription): void;
	    /**
	     * Sets the opacity of all subsequent drawing calls. When drawing transparent objects, the transparency of the object is
	     * multiplied with the specified `opacity`. To undo it, use the [[pop]] function.
	     */
	    pushOpacity(opacity: number): void;
	    /**
	     * Removes the most recent effect caused by [[pushTransform]], [[pushOpacity]] or [[pushClip]] from the stack. This function
	     * will cause an error in case none of the specified commands has been executed before.
	     */
	    pop(): void;
	    /**
	     * Places a highlight on the plot. The final position and alignment will be determined by the current transformation stack.
	     * Highlights associated with measurement values will be shown if the associated measurement is activated by interactive elements in a report.
	     * Highlights can also be associated with tooltips can be selected by the user and will be displayed in PiWeb Monitor.
	     */
	    placeHighlight(highlight: HighlightDescription, settings?: GeometryDrawingSettingsDescription): void;
	    /**
	     * Finalizes the drawing which this drawing context belongs to.
	     */
	    close(): void;
	}
	/**
	 * Describes a bounding box of a drawing, including position and size.
	 */
	export interface DrawingMeasurements {
	    x: number;
	    y: number;
	    width: number;
	    height: number;
	}
	/**
	 * Describes a two dimensional vector graphics image.
	 */
	export class Drawing implements Serializable {
	    private _internals;
	    /**
	     * Initializes a new instance of the [[Drawing]] class.
	     */
	    constructor();
	    /**
	     * Returns a [[DrawingContext]] which can be used to create the content of the drawing.
	     */
	    open(): DrawingContext;
	    /**
	     * @private
	     */
	    serialize(writer: BufferWriter): void;
	    /**
	     * @private
	     */
	    serializeHighlights(writer: BufferWriter): void;
	    /**
	     * Returns the bounding box of the drawing.
	     */
	    measure(): DrawingMeasurements;
	    /**
	     * @private
	     */
	    getDrawingBuffer(): Buffer;
	    /**
	     * @private
	     */
	    getHighlightBuffer(): Buffer;
	}
}


declare module "piweb/drawing/drawing_ids" {
	/**
	 * @module drawing
	 */
	/** file */
	/**
	 * @private
	 */
	export const enum ContextOperation {
	    NoOp = 0,
	    DrawLine = 1,
	    DrawLines = 2,
	    DrawRectangle = 3,
	    DrawEllipse = 4,
	    DrawGeometry = 5,
	    DrawText = 6,
	    DrawImage = 7,
	    Pop = 8,
	    PushTransform = 9,
	    SetBrush = 10,
	    SetPen = 11,
	    PushClip = 12,
	    PushOpacity = 13,
	    DrawDrawing = 14,
	    Close = 255,
	}
	/**
	 * @private
	 */
	export const enum GeometryId {
	    Line = 1,
	    Rectangle = 2,
	    Ellipse = 3,
	    Path = 4,
	    Combined = 5,
	    Group = 6,
	    Custom = 7,
	}
	/**
	 * @private
	 */
	export const enum BrushId {
	    None = 0,
	    SolidColor = 1,
	    LinearGradient = 2,
	    RadialGradient = 3,
	}
	/**
	 * @private
	 */
	export const enum PenId {
	    None = 0,
	    Direct = 1,
	}
	/**
	 * @private
	 */
	export const enum LineJoinId {
	    Bevel = 0,
	    Miter = 1,
	    Round = 2,
	}
	/**
	 * @private
	 */
	export const enum LineCapId {
	    Flat = 0,
	    Round = 1,
	    Square = 2,
	}
	/**
	 * @private
	 */
	export const enum GeometryCombineModeId {
	    Union = 0,
	    Intersect = 1,
	    Xor = 2,
	    Exclude = 3,
	}
	/**
	 * @private
	 */
	export const enum FillRuleId {
	    EvenOdd = 0,
	    Nonzero = 1,
	}
	/**
	 * @private
	 */
	export const enum TransformationId {
	    Identity = 0,
	    Translation = 1,
	    Rotation = 2,
	    Scaling = 3,
	    Shear = 4,
	    Matrix = 5,
	    Group = 6,
	}
	/**
	 * @private
	 */
	export const enum PathSegmentId {
	    Arc = 1,
	    Bezier = 2,
	    Line = 3,
	    QuadraticBezier = 4,
	    PolyBezier = 5,
	    PolyLine = 6,
	    PolyQuadraticBezier = 7,
	}
	/**
	 * @private
	 */
	export const enum SweepDirectionId {
	    Clockwise = 0,
	    Counterclockwise = 1,
	}
	/**
	 * @private
	 */
	export const enum ArcTypeId {
	    Small = 0,
	    Large = 1,
	}
	/**
	 * @private
	 */
	export const enum FlowDirectionId {
	    LeftToRight = 0,
	    RightToLeft = 1,
	}
	/**
	 * @private
	 */
	export const enum FontStretchId {
	    UltraCondensed = 1,
	    ExtraCondensed = 2,
	    Condensed = 3,
	    SemiCondensed = 4,
	    Normal = 5,
	    SemiExpanded = 6,
	    Expanded = 7,
	    ExtraExpanded = 8,
	    UltraExpanded = 9,
	}
	/**
	 * @private
	 */
	export const enum FontWeightId {
	    Thin = 100,
	    ExtraLight = 200,
	    Light = 300,
	    Normal = 400,
	    Medium = 500,
	    SemiBold = 600,
	    Bold = 700,
	    ExtraBold = 800,
	    Black = 900,
	    ExtraBlack = 950,
	}
	/**
	 * @private
	 */
	export const enum FontStyleId {
	    Normal = 0,
	    Oblique = 1,
	    Italic = 2,
	}
	/**
	 * @private
	 */
	export const enum HorizontalTextAlignmentId {
	    Left = 0,
	    Right = 1,
	    Center = 2,
	    Justify = 3,
	}
	/**
	 * @private
	 */
	export const enum VerticalTextAlignmentId {
	    Top = 0,
	    Bottom = 1,
	    Center = 2,
	}
	/**
	 * @private
	 */
	export const enum VerticalTextAnchorId {
	    Default = 0,
	    Top = 1,
	    Bottom = 2,
	    Center = 3,
	    BaseLine = 4,
	}
	/**
	 * @private
	 */
	export const enum HorizontalTextAnchorId {
	    Default = 0,
	    Left = 1,
	    Right = 2,
	    Center = 3,
	}
	/**
	 * @private
	 */
	export const enum VerticalImageAnchorId {
	    Top = 0,
	    Bottom = 1,
	    Center = 2,
	}
	/**
	 * @private
	 */
	export const enum HorizontalImageAnchorId {
	    Left = 0,
	    Right = 1,
	    Center = 2,
	}
	/**
	 * @private
	 */
	export const enum VerticalAnchorId {
	    Origin = 0,
	    Top = 1,
	    Bottom = 2,
	    Center = 3,
	}
	/**
	 * @private
	 */
	export const enum HorizontalAnchorId {
	    Origin = 0,
	    Left = 1,
	    Right = 2,
	    Center = 3,
	}
	/**
	 * @private
	 */
	export const enum TextDecorationId {
	    None = 0,
	    Underline = 1,
	    StrikeThrough = 2,
	}
	/**
	 * @private
	 */
	export const enum TextTrimmingId {
	    None = 0,
	    CharacterEllipsis = 1,
	    WordEllipsis = 2,
	}
}


declare module "piweb/drawing" {
	/**
	 * @module drawing
	 * @preferred
	 *
	 * ## Introduction
	 *
	 * All necessary classes for drawing are encapsulated in the `piweb.drawing` module. The plot extension will be rendered whenever something changes, e.g. a property value, its size or position. When this happens,
	 * the plot extension API will emit the `render` event, which has a [`DrawingContext`](#drawingcontext) object as its parameter.
	 *
	 * ```TypeScript
	 * import * as piweb from 'piweb';
	 * import drawing = piweb.drawing;
	 *
	 *
	 * piweb.events.on("render", render);
	 *
	 * function render(context: drawing.DrawingContext) {
	 *     ...
	 * }
	 * ```
	 *
	 * Be aware that all coordinates and values are interpreted as **millimeters**. PiWeb draws with a resolution of **96 DPI**, so one millimeter is equal to `96 / 25.4 ~ 3.58` pixels,
	 * or one pixel is equal to `25.4 / 96 ~ 0.2646` millimeters. PiWeb will take care, that everything you draw is aligned to display coordinates, so nothing will look blurry.
	 *
	 * ### Description objects
	 *
	 * Most drawing classes implement a description interface named similar to the class. For example, the class [[Pen]] implements [[PenDescription]]. Description interfaces only
	 * consist of properties, so that they can be represented by object literals:
	 *
	 * ```TypeScript
	 * const penDescription = {
	 * 		brush: {
	 * 			type: 'solid',
	 * 			color: {r: 255, g: 0, b: 0}
	 * 		},
	 * 		thickness: 1.0
	 * };
	 *
	 * context.setPen( penDescription );
	 * ```
	 *
	 * Most of the properties are even optional and thus don't have to be specified. Unspecified properties will assume a default value. It's often easier and much better readable to
	 * use an object literal compared to the constructor of the corresponding class:
	 *
	 * ```TypeScript
	 * const pen = new piweb.drawing.Pen(
	 * 		new piweb.drawing.SolidColorBrush(
	 * 			new piweb.drawing.Color(255, 0, 0, 255),
	 * 			1.0
	 * 		),
	 * 		1.0,
	 * 		'flat',
	 * 		'flat',
	 * 		'bevel',
	 * 		new Array<number>(),
	 * 		0.0,
	 * 		'flat'
	 * 	);
	 * ```
	 *
	 * Most functions directly accept literal objects. If nevertheless an instance of a class is required, it can be aquired by calling the static `create` method of the class. When
	 * doint this on an abstract class like [[Brush]], an additional type parameter is required. You can also call the factory method on the derived class, e.g.
	 * `SolidColorBrush.createSolidColorBrush`.
	 *
	 * ```TypeScript
	 * const pen = piweb.drawing.Pen.create({
	 * 		brush: {
	 * 			type: 'solid',
	 * 			color: {r: 255, g: 0, b: 0}
	 * 		},
	 * 		thickness: 1.0
	 * });
	 * ```
	 *
	 * This should be preferred to using constructors.
	 *
	 * **Tips:**
	 * * Colors and brushes can usually be specified as `string` (e.g. `'red'` or `'#FF0000'`).
	 * * Positions can usually be specified as arrays (`[1.0, 1.0]`) or as objects (`{x: 1.0, y: 1.0}`) or even as number, if both coordinates have the same value.
	 */ /** */
	export { Point, PointDescription, Rect, Size, SizeDescription } from "piweb/drawing/geometry/basics";
	export { GeometryType, Geometry, GeometryDescription, LineGeometry, LineGeometryDescription, RectangleGeometry, RectangleGeometryDescription, EllipseGeometry, EllipseGeometryDescription, PathGeometry, CombinedGeometry, GeometryGroup } from "piweb/drawing/geometry/geometries";
	export { PathFigure } from "piweb/drawing/geometry/path_figure";
	export { PathSegmentType, PathSegment, LineSegment, PolyLineSegment, ArcSegment, BezierSegment, PolyBezierSegment, QuadraticBezierSegment, PolyQuadraticBezierSegment } from "piweb/drawing/geometry/path_segments";
	export { FillRule, GeometryCombineMode } from "piweb/drawing/geometry/geometries";
	export { SweepDirection } from "piweb/drawing/geometry/path_segments";
	export { GeometryDrawingSettings, GeometryDrawingSettingsDescription, HorizontalAnchor, VerticalAnchor } from "piweb/drawing/geometry/settings";
	export { BrushType, Brush, BrushDescription, SolidColorBrush, LinearGradientBrush, RadialGradientBrush } from "piweb/drawing/material/brushes";
	export { Color, ColorObject, ColorDescription } from "piweb/drawing/material/color";
	export { Pen, LineCap, LineJoin } from "piweb/drawing/material/pen";
	export { FormattedText, FormattedTextDescription, FlowDirection, HorizontalTextAlignment, VerticalTextAlignment, TextTrimming, TextMeasurements } from "piweb/drawing/text/formatted_text";
	export { Font, FontDescription, FontStretch, FontStyle, FontWeight, TextDecoration } from "piweb/drawing/text/font";
	export { TextDrawingSettings, TextDrawingSettingsDescription, HorizontalTextAnchor, VerticalTextAnchor } from "piweb/drawing/text/settings";
	export { Bitmap, BitmapMeasurements, BitmapDataLayout } from "piweb/drawing/image/bitmap";
	export { ImageDrawingSettings, ImageDrawingSettingsDescription, HorizontalImageAnchor, VerticalImageAnchor } from "piweb/drawing/image/settings";
	export { TransformationType, Transform, TransformDescription, IdentityTransform, IdentityTransformDescription, MatrixTransform, MatrixTransformDescription, RotationTransform, RotationTransformDescription, ScalingTransform, ScalingTransformDescription, ShearTransform, ShearTransformDescription, TranslationTransform, TranslationTransformDescription, TransformGroup } from "piweb/drawing/transform/transforms";
	export { Drawing, DrawingContext, DrawingMeasurements } from "piweb/drawing/drawing";
	export { Highlight, HighlightDescription } from "piweb/drawing/highlight/highlight";
}


declare module "piweb/drawing/geometry/basics" {
	/**
	 * @module drawing
	 */
	/** file */
	import { BufferWriter } from "internal/buffer_writer";
	import { Serializable } from "internal/serializable";
	export interface PointObject {
	    readonly x?: number;
	    readonly y?: number;
	}
	export type PointDescription = PointObject | number[] | number;
	export interface SizeObject {
	    readonly width?: number;
	    readonly height?: number;
	}
	export type SizeDescription = SizeObject | number[] | number;
	/**
	 * Describes a point.
	 */
	export class Point implements Serializable {
	    /**
	     * Gets or sets the horizontal position
	     */
	    x: number;
	    /**
	     * Gets or sets the vertical position
	     */
	    y: number;
	    /**
	     * Initializes a new instance of the [[Point]] class.
	     * @param x The horizontal position.
	     * @param y The vertical position.
	     */
	    constructor(x: number, y: number);
	    /**
	     * @private
	     */
	    static create(description?: PointDescription): Point;
	    /**
	     * Gets a point with the coordinates (0,0).
	     */
	    static readonly origin: Point;
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	}
	/**
	 * Describes a rectangle with a position and a size.
	 */
	export class Rect implements Serializable {
	    /**
	     * Gets or sets the horizontal position.
	     */
	    x: number;
	    /**
	     * Gets or sets the vertical position.
	     */
	    y: number;
	    /**
	     * Gets or sets the horizontal size.
	     */
	    width: number;
	    /**
	     * Gets or sets the vertical size.
	     */
	    height: number;
	    /**
	     * Initializes a new instance of the [[Rect]] class.
	     * @param x The horizontal position.
	     * @param y The vertical position.
	     * @param width The horizontal dimension.
	     * @param height The vertical dimension.
	     */
	    constructor(x: number, y: number, width: number, height: number);
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	}
	/**
	 * Describes a two dimensional size.
	 */
	export class Size implements Serializable {
	    /**
	     * Gets or sets the horizontal size.
	     */
	    width: number;
	    /**
	     * Gets or sets the vertical size.
	     */
	    height: number;
	    /**
	     * Initializes a new instance of the [[Size]] class.
	     * @param width The horizontal dimension.
	     * @param height The vertical dimension.
	     */
	    constructor(width: number, height: number);
	    /**
	     * @private
	     */
	    static create(description?: SizeDescription): Size;
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	}
}


declare module "piweb/drawing/geometry/geometries" {
	/**
	 * @module drawing
	 */
	/** file */
	import { Transform, TransformDescription } from 'piweb/drawing/transform/transforms';
	import { BufferWriter } from "internal/buffer_writer";
	import { Serializable } from "internal/serializable";
	import { Point, PointDescription } from "piweb/drawing/geometry/basics";
	import { PathFigure, PathFigureDescription } from "piweb/drawing/geometry/path_figure";
	/**
	 * Determines how two geometries are combined.
	 *
	 * **`union` (default)**
	 *
	 * <img style="height:36px" src="media://union.svg">
	 *
	 * The resulting geometry is the area that is overlapped by the first or second geometry or both.
	 *
	 * **`intersect`**
	 *
	 * <img style="height:36px" src="media://intersect.svg">
	 *
	 * The resulting geometry is the area that is overlapped by both geometries.
	 *
	 * **`xor`**
	 *
	 * <img style="height:36px" src="media://xor.svg">
	 *
	 * The resulting geometry is the area that is overlapped by the first or second geometry, but not both.
	 *
	 * **`exclude`**
	 *
	 * <img style="height:36px" src="media://exclude.svg">
	 *
	 * The second geometry is subtracted from the first.
	 */
	export type GeometryCombineMode = "union" | "intersect" | "xor" | "exclude";
	/**
	 * Determines how overlapping geometries are filled.
	 *
	 * **`evenOdd` (default)**
	 *
	 * <img style="height:36px" src="media://evenOdd.svg">
	 *
	 * Fills the area that is overlapped by an odd number of geometries. *
	 *
	 * **`nonZero`**
	 *
	 * <img style="height:36px" src="media://nonZero.svg">
	 *
	 * Fills the area that is overlapped by at least one geometry.  *
	 */
	export type FillRule = "evenOdd" | "nonzero";
	/**
	 * Determines the type of a geometry.
	 */
	export type GeometryType = "line" | "rectangle" | "ellipse" | "path" | "custom" | "combined" | "group";
	/**
	 * Can be used to initialize a [[LineGeometry]].
	 */
	export interface LineDescription {
	    readonly start?: PointDescription;
	    readonly end?: PointDescription;
	    readonly transform?: TransformDescription;
	}
	/**
	 * Can be used to initialize a [[RectangleGeometry]].
	 */
	export interface RectangleDescription {
	    readonly position?: PointDescription;
	    readonly width?: number;
	    readonly height?: number;
	    readonly transform?: TransformDescription;
	}
	/**
	 * Can be used to initialize a [[EllipseGeometry]].
	 */
	export interface EllipseDescription {
	    readonly position?: PointDescription;
	    readonly radiusX?: number;
	    readonly radiusY?: number;
	    readonly transform?: TransformDescription;
	}
	/**
	 * Can be used to initialize a [[PathGeometry]].
	 */
	export interface PathDescription {
	    readonly fillRule?: FillRule;
	    readonly figures?: ArrayLike<PathFigureDescription>;
	    readonly transform?: TransformDescription;
	}
	/**
	 * Can be used to initialize a [[CustomGeometry]].
	 */
	export interface CustomDescription {
	    readonly pathString?: string;
	    readonly transform?: TransformDescription;
	}
	/**
	 * Can be used to initialize a [[GeometryGroup]].
	 */
	export interface GeometryGroupDescription {
	    readonly children?: ArrayLike<GeometryDescription>;
	    readonly fillRule?: FillRule;
	    readonly transform?: TransformDescription;
	}
	/**
	 * Can be used to initialize a [[CombinedGeometry]].
	 */
	export interface CombinedDescription {
	    readonly geometry1?: GeometryDescription;
	    readonly geometry2?: GeometryDescription;
	    readonly combineMode?: GeometryCombineMode;
	    readonly transform?: TransformDescription;
	}
	/**
	 * Can be used to initialize a [[Geometry]].
	 */
	export interface LineGeometryDescription extends LineDescription {
	    readonly type: "line";
	}
	/**
	 * Can be used to initialize a [[Geometry]].
	 */
	export interface RectangleGeometryDescription extends RectangleDescription {
	    readonly type: "rectangle";
	}
	/**
	 * Can be used to initialize a [[Geometry]].
	 */
	export interface EllipseGeometryDescription extends EllipseDescription {
	    readonly type: "ellipse";
	}
	/**
	 * Can be used to initialize a [[Geometry]].
	 */
	export interface PathGeometryDescription extends PathDescription {
	    readonly type: "path";
	}
	/**
	 * Can be used to initialize a [[Geometry]].
	 */
	export interface CustomGeometryDescription extends CustomDescription {
	    readonly type: "custom";
	}
	/**
	 * Can be used to initialize a [[Geometry]].
	 */
	export interface GeometryGroupGeometryDescription extends GeometryGroupDescription {
	    readonly type: "group";
	}
	/**
	 * Can be used to initialize a [[Geometry]].
	 */
	export interface CombinedGeometryDescription extends CombinedDescription {
	    readonly type: "combined";
	}
	/**
	 * Can be used to initialize a [[Geometry]].
	 */
	export type PureGeometryDescription = RectangleGeometryDescription | EllipseGeometryDescription | LineGeometryDescription | GeometryGroupGeometryDescription | PathGeometryDescription | CombinedGeometryDescription | CustomGeometryDescription;
	/**
	* Can be used to initialize a [[Geometry]].
	*/
	export type GeometryDescription = PureGeometryDescription | string | Geometry;
	/**
	 * Describes the final size and position of a geometry.
	 */
	export interface GeometryMeasurements {
	    /**
	     * Gets the horizontal position.
	     */
	    x: number;
	    /**
	     * Gets the vertical position.
	     */
	    y: number;
	    /**
	     * Gets the horizontal dimension.
	     */
	    width: number;
	    /**
	     * Gets the vertical dimension.
	     */
	    height: number;
	}
	/**
	 * Geometries can be used for drawing and clipping. Multiple geometries can be combined using the [[GeometryGroup]] or [[CombinedGeometry]] classes.
	 */
	export abstract class Geometry implements Serializable {
	    /**
	     * Gets or sets a geometries transformation matrix. The default value is the identity transform.
	     */
	    transform: Transform;
	    /**
	    * Gets the geometry type.
	    */
	    readonly abstract type: GeometryType;
	    /**
	     * Initializes a new [[Geometry]] instance.
	     * @protected
	     * @param transform The transformation matrix.
	     */
	    constructor(transform?: Transform);
	    /**
	     * Returns the geometry that is defined by the specified geometry description.
	     * @param description The geometry description.
	     */
	    static create(description?: GeometryDescription): Geometry;
	    /**
	     * Returns the bounding box of the geometry.
	     */
	    measure(): GeometryMeasurements;
	    /**
	     * Returns the bounding box of the specified geometry.
	     * @param geometryDescription The geometry to measure.
	     */
	    static measure(geometryDescription: GeometryDescription): GeometryMeasurements;
	    /**
	     * @private
	     */
	    abstract serialize(target: BufferWriter): void;
	}
	/**
	 * Describes a geometry that consists of a line.
	 */
	export class LineGeometry extends Geometry implements LineGeometryDescription {
	    /**
	     * Gets or sets the start point.
	     */
	    start: Point;
	    /**
	     * Gets or sets the end point
	     */
	    end: Point;
	    /**
	     * @private
	     */
	    readonly type: "line";
	    /**
	     * Initializes a new instance of the [[LineGeometry]] class.
	     * @param start The start point.
	     * @param end The end point.
	     * @param transform The transformation matrix.
	     */
	    constructor(start: Point, end: Point, transform?: Transform);
	    /**
	     * Returns the geometry that is defined by the specified geometry description.
	     * @param description The geometry description.
	     */
	    static createLineGeometry(description?: LineDescription): LineGeometry;
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	}
	/**
	 * Describes a rectangular geometry.
	 */
	export class RectangleGeometry extends Geometry implements RectangleGeometryDescription {
	    /**
	     * Gets or sets the position.
	     */
	    position: Point;
	    /**
	     * Gets or sets the width.
	     */
	    width: number;
	    /**
	     * Gets or sets the height.
	     */
	    height: number;
	    /**
	     * @private
	     */
	    readonly type: "rectangle";
	    /**
	     * Initializes a new instance of the [[RectangleGeometry]] class.
	     * @param position The position.
	     * @param width The width.
	     * @param height The height.
	     * @param transform The transformation matrix.
	     */
	    constructor(position: Point, width: number, height: number, transform?: Transform);
	    /**
	     * Returns the geometry that is defined by the specified geometry description.
	     * @param description The geometry description.
	     */
	    static createRectangleGeometry(description?: RectangleDescription): RectangleGeometry;
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	}
	/**
	 * Describes an elliptical geometry.
	 */
	export class EllipseGeometry extends Geometry implements EllipseGeometryDescription {
	    /**
	     * Gets or sets the center of the ellipse.
	     */
	    position: Point;
	    /**
	     * Gets or sets the radius in horizontal direction.
	     */
	    radiusX: number;
	    /**
	     * Gets or sets the readius in vertical direction.
	     */
	    radiusY: number;
	    /**
	     * @private
	     */
	    readonly type: "ellipse";
	    /**
	     * Initializes a new instance of the [[EllipseGeometry]] class.
	     * @param center The center of the ellipse.
	     * @param radiusX The radius in horizontal direction.
	     * @param radiusY The radius in horizontal direction.
	     * @param transform The transformation matrix.
	     */
	    constructor(center: Point, radiusX: number, radiusY: number, transform?: Transform);
	    /**
	     * Returns the geometry that is defined by the specified geometry description.
	     * @param description The geometry description.
	     */
	    static createEllipseGeometry(description?: EllipseDescription): EllipseGeometry;
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	}
	/**
	 * Describes a geometry, that is composed of multiple path figures
	 * @see [[PathFigure]]
	 */
	export class PathGeometry extends Geometry implements PathGeometryDescription {
	    /**
	     * Gets or sets the fill rule.
	     */
	    fillRule: FillRule;
	    /**
	     * Gets or sets the path figures.
	     */
	    figures: PathFigure[];
	    /**
	     * @private
	     */
	    readonly type: "path";
	    /**
	     * Initializes a new instance of the [[PathGeometry]] class.
	     * @param fillRule The fill rule.
	     * @param figures The path figures.
	     * @param transform The transformation matrix.
	     */
	    constructor(fillRule: FillRule, figures: PathFigure[], transform?: Transform);
	    /**
	     * Returns the geometry that is defined by the specified geometry description.
	     * @param description The geometry description.
	     */
	    static createPathGeometry(description?: PathDescription): PathGeometry;
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	}
	/**
	 * Describes a path geometry, that is defined by a markup string.
	 *
	 * Use the following markup to define the geometry:
	 *
	 * | Markup | Parameters | Class |
	 * |--------|-------------| -----------|
	 * | **`M p`**| **`p`** Start point| [`PathFigure`](#pathfigure) |
	 * | **`A r a l s p `**| **`r`** Radius x,y<br>**`a`** Angle<br>**`l`** IsLargeArc (1 = true, 0 = false)<br>**`s`** Sweep direction (0 = clockwise, 1 = counterclockwise)<br>**`p`** End point| [`ArcSegment`](#arcsegment) |
	 * | **`L p`**| **`p`** End point| [`LineSegment`](#linesegment) |
	 * | **`C c1 c2 p`**| **`c1`** First control point<br>**`c2`** Second control point <br>**`p`** End point|[`CubicBezierSegment`](#cubicbeziersegment) |
	 * | **`Q c p`**| **`c`** Control point<br>**`p`** End point| [`QuadraticBezierSegment`](#quadraticbeziersegment) |
	 * | **`Z`**| Closes the current figure  |
	 *
	 * Points are written in the form of `x,y`, where `x` and `y` are either invariant floating point numbers (`0.0`) or integers.
	 */
	export class CustomGeometry extends Geometry implements CustomDescription {
	    /**
	     * Gets or sets the markup string
	     */
	    pathString: string;
	    /**
	     * @private
	     */
	    readonly type: "custom";
	    /**
	     * Initializes a new instance of the [[CustomGeometry]] class.
	     * @param pathString The markup string.
	     * @param transform The transformation matrix.
	     */
	    constructor(pathString: string, transform?: Transform);
	    /**
	     * Returns the geometry that is defined by the specified geometry description.
	     * @param description The geometry description.
	     */
	    static createCustomGeometry(description?: CustomDescription | string): CustomGeometry;
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	}
	/**
	 * Describes a collection of geometries, whose children are combined using a [[FillRule]].
	 */
	export class GeometryGroup extends Geometry implements GeometryGroupGeometryDescription {
	    /**
	     * Gets or sets the children of which the group is composed.
	     */
	    children: Geometry[];
	    /**
	     * Gets or sets the fillrule.
	     */
	    fillRule: FillRule;
	    /**
	     * @private
	     */
	    readonly type: "group";
	    /**
	     * Initializes a new instance of the [[GeometryGroup]] class.
	     * @param children The children of which the group is composed.
	     * @param fillRule The fillrule.
	     * @param transform The transformation matrix.
	     */
	    constructor(children: Geometry[], fillRule: FillRule, transform?: Transform);
	    /**
	     * Returns the geometry that is defined by the specified geometry description.
	     * @param description The geometry description.
	     */
	    static createGeometryGroup(description?: GeometryGroupDescription): GeometryGroup;
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	}
	/**
	 * Describes a geometry that is the result of the combination of exactly two other geometries.
	 * The geometries are combined using the [[GeometryCombineMode]].
	 */
	export class CombinedGeometry extends Geometry implements CombinedGeometryDescription {
	    /**
	     * Gets or sets the first geometry.
	     */
	    geometry1: Geometry;
	    /**
	     * Gets or sets the second geometry.
	     */
	    geometry2: Geometry;
	    /**
	     * Gets or sets the combine mode.
	     */
	    combineMode: GeometryCombineMode;
	    /**
	     * @private
	     */
	    readonly type: "combined";
	    /**
	     *
	     * @param geometry1 The first geometry.
	     * @param geometry2 The second geometry.
	     * @param combineMode The combine mode.
	     * @param transform The transformation matrix.
	     */
	    constructor(geometry1: Geometry, geometry2: Geometry, combineMode: GeometryCombineMode, transform?: Transform);
	    /**
	     * Returns the geometry that is defined by the specified geometry description.
	     * @param description The geometry description.
	     */
	    static createCombinedGeometry(description?: CombinedDescription): CombinedGeometry;
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	}
}


declare module "piweb/drawing/geometry/path_figure" {
	/**
	 * @module drawing
	 */
	/** file */
	import { Point, PointDescription } from "piweb/drawing/geometry/basics";
	import { PathSegment, PathSegmentDescription } from "piweb/drawing/geometry/path_segments";
	import { BufferWriter } from "internal/buffer_writer";
	import { Serializable } from "internal/serializable";
	/**
	 * Can be used to initialize a [[PathFigure]].
	 */
	export interface PathFigureDescription {
	    readonly startPoint?: PointDescription;
	    readonly segments?: ArrayLike<PathSegmentDescription>;
	    readonly isClosed?: boolean;
	}
	/**
	 * Describes a component of a [[PathGeometry]]. Multiple path figures are combined using a [[FillRule]].
	 * The path figures of a path geometry are **not** connected, so they appear as independent shapes.
	 */
	export class PathFigure implements Serializable, PathFigureDescription {
	    /**
	     * Gets or sets the start point.
	     */
	    startPoint: Point;
	    /**
	     * Gets or sets the path segments.
	     */
	    segments: PathSegment[];
	    /**
	     * Gets or sets a value indicating, whether this figure is closed.
	     */
	    isClosed: boolean;
	    /**
	     * Initializes a new instance of the [[PathFigure]] class.
	     * @param startPoint The start point.
	     * @param segments The path segments.
	     * @param isClosed A value indicating, whether this figure is closed.
	     */
	    constructor(startPoint: Point, segments: PathSegment[], isClosed: boolean);
	    /**
	     * Returns the figure that is defined by the specified description.
	     * @param description A path figure description.
	     */
	    static create(description: PathFigureDescription): PathFigure;
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	}
}


declare module "piweb/drawing/geometry/path_segments" {
	/**
	 * @module drawing
	 */
	/** file */
	import { BufferWriter } from "internal/buffer_writer";
	import { Serializable } from "internal/serializable";
	import { Point, PointDescription, Size, SizeDescription } from "piweb/drawing/geometry/basics";
	/**
	 * An enumeration to determine the type of a path segment.
	 */
	export type PathSegmentType = "arc" | "bezier" | "line" | "quadraticBezier" | "polyBezier" | "polyLine" | "polyQuadraticBezier";
	/**
	 * An enumeration to determine the sweep direction of an arc segment.
	 * @see [[ArcSegment]]
	 */
	export type SweepDirection = "clockwise" | "counterclockwise";
	export type ArcType = "small" | "large";
	/**
	 * Can be used to initialize a [[LineSegment]].
	 */
	export interface LineDescription {
	    to?: PointDescription;
	}
	/**
	 * Can be used to initialize a [[PolyLineSegment]].
	 */
	export interface PolyLineDescription {
	    points?: PointDescription[];
	}
	/**
	 * Can be used to initialize an [[ArcSegment]].
	 */
	export interface ArcDescription {
	    to?: PointDescription;
	    size?: SizeDescription;
	    angle?: number;
	    arcType?: ArcType;
	    sweepDirection?: SweepDirection;
	}
	/**
	 * Can be used to initialize a [[BezierSegment]].
	 */
	export interface BezierDescription {
	    control?: PointDescription;
	    control2?: PointDescription;
	    to?: PointDescription;
	}
	/**
	 * Can be used to initialize a [[PolyBezierSegment]].
	 */
	export interface PolyBezierDescription {
	    points?: PointDescription[];
	}
	/**
	 * Can be used to initialize a [[QuadraticBezierSegment]].
	 */
	export interface QuadraticBezierDescription {
	    control?: PointDescription;
	    to?: PointDescription;
	}
	/**
	 * Can be used to initialize a [[PolyQuadraticBezierSegment]].
	 */
	export interface PolyQuadraticBezierDescription {
	    points?: PointDescription[];
	}
	/**
	 * Can be used to initialize a [[PathSegment]].
	 */
	export interface LineSegmentDescription extends LineDescription {
	    readonly type: "line";
	}
	/**
	 * Can be used to initialize a [[PathSegment]].
	 */
	export interface PolyLineSegmentDescription extends PolyLineDescription {
	    readonly type: "polyLine";
	}
	/**
	 * Can be used to initialize a [[PathSegment]].
	 */
	export interface ArcSegmentDescription extends ArcDescription {
	    readonly type: "arc";
	}
	/**
	 * Can be used to initialize a [[PathSegment]].
	 */
	export interface BezierSegmentDescription extends BezierDescription {
	    readonly type: "bezier";
	}
	/**
	 * Can be used to initialize a [[PathSegment]].
	 */
	export interface PolyBezierSegmentDescription extends PolyBezierDescription {
	    readonly type: "polyBezier";
	}
	/**
	 * Can be used to initialize a [[PathSegment]].
	 */
	export interface QuadraticBezierSegmentDescription extends QuadraticBezierDescription {
	    readonly type: "quadraticBezier";
	}
	/**
	 * Can be used to initialize a [[PathSegment]].
	 */
	export interface PolyQuadraticBezierSegmentDescription extends PolyQuadraticBezierDescription {
	    readonly type: "polyQuadraticBezier";
	}
	/**
	 * Can be used to initialize a [[PathSegment]].
	 */
	export type PathSegmentDescription = LineSegmentDescription | PolyLineSegmentDescription | ArcSegmentDescription | BezierSegmentDescription | PolyBezierSegmentDescription | QuadraticBezierSegmentDescription | PolyQuadraticBezierSegmentDescription | PathSegment;
	/**
	 * Path segments define one or more points that describe a line or curve. One or more path segments are composed to a [[PathFigure]].
	 */
	export abstract class PathSegment implements Serializable {
	    /**
	     * @protected
	     */
	    constructor();
	    /**
	     * Returns the path segment that is defined by the specified description.
	     * @param description path segment description.
	     */
	    static create(description?: PathSegmentDescription): PathSegment;
	    /**
	     * @private
	     */
	    readonly abstract type: PathSegmentType;
	    /**
	     * @private
	     */
	    abstract serialize(target: BufferWriter): void;
	}
	/**
	 * Creates a line between two points in a [[PathFigure]]. In case you want to use multiple line segments consecutively, consider using the [[PolyLineSegment]].
	 */
	export class LineSegment extends PathSegment implements LineSegmentDescription {
	    /**
	     * Gets or sets the endpoint of the segment.
	     */
	    to: Point;
	    /**
	     * Initializes a new instance of the [[LineSegment]] class.
	     * @param to
	     */
	    constructor(to: Point);
	    /**
	     * @private
	     */
	    readonly type: "line";
	    /**
	     * Returns the line segment that is defined by the specified description.
	     * @param description Line segment description.
	     */
	    static createLineSegment(description?: LineDescription): LineSegment;
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	}
	/**
	 * Describes a line strip, including the last point of the previous segment.
	 */
	export class PolyLineSegment extends PathSegment implements PolyLineSegmentDescription {
	    /**
	     * Gets or sets the collection of points that define this segment.
	     */
	    points: Point[];
	    /**
	     * Initializes a new instance of the [[PolyLineSegment]] class.
	     * @param points The collection of points that define this segment.
	     */
	    constructor(points: Point[]);
	    /**
	     * @private
	     */
	    readonly type: "polyLine";
	    /**
	     * Returns the poly line segment that is defined by the specified description.
	     * @param description Poly line segment description.
	     */
	    static createPolyLineSegment(description?: PolyLineDescription): PolyLineSegment;
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	}
	/**
	 * Describes an elliptical arc between two points. To define an arc segment you have to specify two points and an ellipse. Usually, there are two possible ellipses of the same size through two points, and on these two ellipses, there are four different ellipse segments which go from the first to the second point. To define how the arc segment looks like, you have to specify additional parameters as shown in the following picture:
	 *
	 * <img class="framed"  style="width:256px; height:auto;" src="media://arcSegment.svg">
	 *
	 * | color | arcType | sweepDirection |
	 * |-------|---------|----------------|
	 * |<font color="#56abff">blue</font> | `small` | `counterclockwise`
	 * |<font color="#ffab56">orange</font> | `small` | `clockwise`
	 * |<font color="#67cc00">green</font> | `large` | `counterclockwise`
	 * |<font color="#b40000">red</font> | `large` | `clockwise`
	 */
	export class ArcSegment extends PathSegment implements ArcSegmentDescription {
	    /**
	     * Gets or sets the endpoint of the arc.
	     */
	    to: Point;
	    /**
	     * Gets or sets the x and y radius of the underlying ellipse on which the arc segment is based on. In case the ellipse is too small to span an arc between the start point
	     * and the end point, it will be scaled until it fits, preserving the aspect ratio of the ellipse.
	     */
	    size: Size;
	    /**
	     * Gets or sets the rotation angle of the ellipse in degrees.
	     */
	    angle: number;
	    /**
	     * Gets or sets the arc type. Since there are always two different arcs with the same radius and the same sweep direction between two points, this parameter can be used
	     * to determine which one is used. Valid values are `small` and `large`.
	     */
	    arcType: ArcType;
	    /**
	     * Gets or sets the sweep direction. Since there are always two different arcs with the same radius and the same arc size between two points, this parameter can be used
	     * to determine which one is used. Valid values are `clockwise` and `counterclockwise`.
	     */
	    sweepDirection: SweepDirection;
	    /**
	     * Initializes a new instance of the [[ArcSegment]] class.
	     * @param to The endpoint of the arc.
	     * @param size The arc size.
	     * @param angle The rotation angle.
	     * @param arcType The arc type.
	     * @param sweepDirection The sweep direction.
	     */
	    constructor(to: Point, size: Size, angle: number, arcType: ArcType, sweepDirection: SweepDirection);
	    /**
	     * Returns the arc segment that is defined by the specified description.
	     * @param description Arc segment description.
	     */
	    static createArcSegment(description?: ArcDescription): ArcSegment;
	    /**
	     * @private
	     */
	    readonly type: "arc";
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	}
	/**
	 * Describes a bezier segment, using the last point of the previous segment as start point. In case you want to use multiple bezier segments consecutively, consider using the [[PolyBezierSegment]].
	 */
	export class BezierSegment extends PathSegment implements BezierSegmentDescription {
	    /**
	     * Gets or sets the first control point of the bezier curve.
	     */
	    control: Point;
	    /**
	     * Gets or sets the second control point of the bezier curve.
	     */
	    control2: Point;
	    /**
	     * Gets or sets the end point of the bezier curve.
	     */
	    to: Point;
	    /**
	     * Initializes a new instance of the [[BezierSegment]] class.
	     * @param control The first control point of the bezier curve.
	     * @param control2 The second control point of the bezier curve.
	     * @param to The end point of the bezier curve.
	     */
	    constructor(control: Point, control2: Point, to: Point);
	    /**
	     * Returns the bezier segment that is defined by the specified description.
	     * @param description Bezier segment description.
	     */
	    static createBezierSegment(description?: BezierDescription): BezierSegment;
	    /**
	     * @private
	     */
	    readonly type: "bezier";
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	}
	/**
	 * Describes multiple bezier segments, including the last point of the previous segment. The number of points provided must be a multiple of two, since a single quadratic bezier segment is defined by two points.
	 */
	export class PolyBezierSegment extends PathSegment implements PolyBezierSegmentDescription {
	    /**
	     * Gets or sets the collection of points that define this segment.
	     */
	    points: Point[];
	    /**
	     * Initializes a new instance of the [[PolyBezierSegment]] class.
	     * @param points The collection of points that define this segment.
	     */
	    constructor(points: Point[]);
	    /**
	     * Returns the poly bezier segment that is defined by the specified description.
	     * @param description Poly bezier segment description.
	     */
	    static createPolyBezierSegment(description?: PolyBezierDescription): PolyBezierSegment;
	    /**
	     * @private
	     */
	    readonly type: "polyBezier";
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	}
	/**
	 * Describes a quadratic bezier segment, using the last point of the previous segment as start point. In case you want to use multiple
	 * quadratic bezier segments consecutively, consider using the [[PolyQuadraticBezierSegment]].
	 */
	export class QuadraticBezierSegment extends PathSegment implements QuadraticBezierSegmentDescription {
	    /**
	     * Gets or sets the control point of the bezier curve.
	     */
	    control: Point;
	    /**
	     * Gets or sets the endpoint of the bezier curve.
	     */
	    to: Point;
	    /**
	     * Initializes a new instance of the [[QuadraticBezierSegment]] class.
	     * @param control The control point of the bezier curve.
	     * @param to The endpoint of the bezier curve.
	     */
	    constructor(control: Point, to: Point);
	    /**
	     * Returns the quadratic bezier segment that is defined by the specified description.
	     * @param description Quadratic bezier segment description.
	     */
	    static createQuadraticBezierSegment(description?: QuadraticBezierDescription): QuadraticBezierSegment;
	    /**
	     * @private
	     */
	    readonly type: "quadraticBezier";
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	}
	/**
	 * Describes multiple bezier segments, including the last point of the previous segment. The number of points provided must be a
	 * multiple of two, since a single quadratic bezier segment is defined by two points.
	 */
	export class PolyQuadraticBezierSegment extends PathSegment implements PolyQuadraticBezierSegmentDescription {
	    /**
	     * Gets or sets the collection of points that define this segment.
	     */
	    points: Point[];
	    /**
	     * Initializes a new instance of the [[PolyQuadraticBezierSegment]] class.
	     * @param points The collection of points that define this segment.
	     */
	    constructor(points: Point[]);
	    /**
	     * Returns the poly quadratic bezier segment that is defined by the specified description.
	     * @param description Poly quadratic bezier segment description.
	     */
	    static createPolyQuadraticBezierSegment(description?: PolyQuadraticBezierDescription): PolyQuadraticBezierSegment;
	    /**
	     * @private
	     */
	    readonly type: "polyQuadraticBezier";
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	}
}


declare module "piweb/drawing/geometry/settings" {
	/**
	 * @module drawing
	 */
	/** file */
	import { Point, PointDescription } from 'piweb/drawing/geometry/basics';
	import { Serializable } from "internal/serializable";
	import { BufferWriter } from 'internal/buffer_writer';
	/**
	 * Determines how the geometry aligns to the position horizontally.
	 *
	 * <img style="float: left; height: 96px;margin-right:8px" src="media://anchorGeometryHorizontalOrigin.svg">
	 *
	 * **`origin` (default)**
	 *
	 * The image will be drawn with the position as its coordinate origin.
	 * <br><br><br>
	 *
	 * <img style="float: left; height: 96px;margin-right:8px" src="media://anchorGeometryLeft.svg">
	 *
	 * **`left`**
	 *
	 * The image will be drawn with the position on the left side.
	 * <br><br><br>
	 *
	 * <img style="float: left; height: 96px;margin-right:8px" src="media://anchorGeometryHorizontalCenter.svg">
	 *
	 * **`center`**
	 *
	 * The image will be drawn with the position at the center.
	 * <br><br><br>
	 *
	 * <img style="float: left; height: 96px;margin-right:8px" src="media://anchorGeometryRight.svg">
	 *
	 * **`right`**
	 *
	 * The geometry will be drawn with the position on the right side.
	 * <br><br><br>
	 */
	export type HorizontalAnchor = "origin" | "left" | "right" | "center";
	/**
	 * Determines how the geometry aligns to the position vertically.
	 *
	 * <img style="float: left; height: 96px;margin-right:8px" src="media://anchorGeometryVerticalOrigin.svg">
	 *
	 * **`origin` (default)**
	 *
	 * The image will be drawn with the position as its coordinate origin.
	 *
	 * <br><br><br>
	 *
	 * <img style="float: left; height: 96px;margin-right:8px" src="media://anchorGeometryTop.svg">
	 *
	 * **`top`**
	 *
	 * The image will be drawn with the position on the top.
	 *
	 * <br><br><br>
	 *
	 * <img style="float: left; height: 96px;margin-right:8px" src="media://anchorGeometryVerticalCenter.svg">
	 *
	 * **`center`**
	 *
	 * The image will be drawn with the position at the center.
	 *
	 * <br><br><br>
	 *
	 * <img style="float: left; height: 96px;margin-right:8px" src="media://anchorGeometryBottom.svg">
	 *
	 * **`bottom`**
	 *
	 * The geometry will be drawn with the position on the bottom.
	 *
	 * <br><br><br>
	 */
	export type VerticalAnchor = "origin" | "top" | "bottom" | "center";
	/**
	 * Can be used to initialize an instance of the [[GeometryDrawingSettings]] class.
	 */
	export interface GeometryDrawingSettingsDescription {
	    readonly position?: PointDescription;
	    readonly anchorX?: HorizontalAnchor;
	    readonly anchorY?: VerticalAnchor;
	}
	/**
	 * Describes how a geometry is arranged when it's drawn. When using anchors, PiWeb calculates a bounding box around the geometry and arranges it according to the anchors on the specified position.
	 */
	export class GeometryDrawingSettings implements Serializable, GeometryDrawingSettingsDescription {
	    /**
	     * Gets or sets the position to which the image aligns.
	     */
	    readonly position: Point;
	    /**
	     * Determines how the geometry aligns to the position horizontally.
	     */
	    readonly anchorX: HorizontalAnchor;
	    /**
	     * Determines how the geometry aligns to the position vertically.
	     */
	    readonly anchorY: VerticalAnchor;
	    /**
	     * Initializes a new instance of the [[GeometryDrawingSettings]] class.
	     * @param position The position.
	     * @param anchorX The horizontal anchor.
	     * @param anchorY The vertical anchor.
	     */
	    constructor(position: Point, anchorX: HorizontalAnchor, anchorY: VerticalAnchor);
	    /**
	     * Returns the geometry drawing settings that are defined by the specified description.
	     * @param description Geometry drawing setting description.
	     */
	    static create(description?: GeometryDrawingSettingsDescription): GeometryDrawingSettings;
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	}
}


declare module "piweb/drawing/highlight/highlight" {
	/**
	 * @module drawing
	 */
	/** file */
	import { Geometry, GeometryDescription } from "piweb/drawing/geometry/geometries";
	import { Brush, BrushDescription } from "piweb/drawing/material/brushes";
	import { Tooltip } from "piweb/tooltips";
	import { MeasurementValue } from "piweb/data/measurements";
	import { InspectionPlanItem } from "piweb/data/inspection";
	import { BufferWriter } from 'internal/buffer_writer';
	export interface HighlightDescription {
	    readonly geometry?: GeometryDescription | undefined;
	    readonly tooltip?: Tooltip | undefined;
	    readonly measurementValue?: MeasurementValue | undefined;
	    readonly activeBorderBrush?: BrushDescription | undefined;
	    readonly activeBackgroundBrush?: BrushDescription | undefined;
	}
	/**
	 * A highlight marks sections or points of a plot.
	 * Highlights associated with measurement values will be shown in a plot if the associated measurement is activated by interactive elements in a report.
	 * Highlights associated with tooltips can be selected by the user and will be displayed in PiWeb Monitor.
	 */
	export class Highlight implements HighlightDescription {
	    geometry: Geometry | undefined;
	    tooltip: Tooltip | undefined;
	    measurementValue: MeasurementValue | undefined;
	    activeBorderBrush: Brush | undefined;
	    activeBackgroundBrush: Brush | undefined;
	    constructor(tooltip?: Tooltip | undefined, measurementValue?: MeasurementValue | undefined, geometry?: Geometry | undefined, activeBorderBrush?: Brush | undefined, activeBackgroundBrush?: Brush);
	    /**
	     * Returns the highlight that is defined by the specified description.
	     * @param description A highlight description.
	     */
	    static create(description?: HighlightDescription): Highlight;
	    /**
	     * Returns a standard highlight which contains a standard tooltip wihtout geometry for a measurment value.
	     * @param value A measurement value.
	     */
	    static createFromMeasurementValue(value: MeasurementValue): Highlight;
	    /**
	     * Returns a standard highlight which contains a standard tooltip wihtout geometry for a characteristic.
	     * @param item A characteristic.
	     */
	    static createFromInspectionPlanItem(item: InspectionPlanItem): Highlight;
	    /**
	     * Returns a standard highlight which contains a standard tooltip wihtout geometry for a characteristic.
	     * @param item A characteristic.
	     */
	    static createFromText(content: string): Highlight;
	    /**
	     * @private
	     */
	    serialize(writer: BufferWriter): void;
	}
}


declare module "piweb/drawing/image/bitmap" {
	/**
	 * @module drawing
	 */
	/** file */
	import { BufferWriter } from 'internal/buffer_writer';
	import { HostBinary } from 'piweb/resources';
	import { Serializable } from "internal/serializable";
	/**
	 * Describes the size and resolution of a [[Bitmap]].
	 */
	export interface BitmapMeasurements {
	    /**
	     * The height of the image in millimeters.
	     */
	    height: number;
	    /**
	     * The width of the image in millimeters.
	     */
	    width: number;
	    /**
	     * The height of the image in pixels.
	     */
	    pixelHeight: number;
	    /**
	     * The width of the image in pixels.
	     */
	    pixelWidth: number;
	    /**
	     * The horizontal resolution of the image.
	     */
	    dpiX: number;
	    /**
	     * The vertical resolution of the image.
	     */
	    dpiY: number;
	}
	/**
	 * The list of known pixel formats of PiWeb
	 */
	export type PixelFormat = "rgb24" | "bgr24" | "bgra32" | "pbgra32" | "gray8";
	/**
	 * @private
	 */
	export const enum PixelFormatId {
	    RGB24 = 0,
	    BGR24 = 1,
	    BGRA32 = 2,
	    PBGRA32 = 3,
	    GRAY8 = 4,
	}
	/**
	 * Determines the type and format of data that is stored in the image buffer.
	 * @version 1.1
	 */
	export class BitmapDataLayout implements Serializable {
	    /**
	     * Gets or sets the pixel format.
	     */
	    readonly pixelFormat: PixelFormat;
	    /**
	     * Gets or sets the pixel width.
	     */
	    readonly pixelWidth: number;
	    /**
	     * Gets or sets the pixel height.
	     */
	    readonly pixelHeight: number;
	    /**
	     * Gets or sets the byte-length of an image line.
	     * This is usually equal to pixelWidth * bytesPerPixel.
	     */
	    readonly stride: number;
	    /**
	     * Gets or sets the dots per inch in x-direction.
	     */
	    readonly dpiX: number;
	    /**
	     * Gets or sets the dots per inch in Y-direction.
	     */
	    readonly dpiY: number;
	    /**
	     * Initializes a new instance of the [[BitmapDataLayout]] class.
	     * @param format The pixel format.
	     */
	    constructor(pixelFormat: PixelFormat, pixelWidth: number, pixelHeight: number, dpiX?: number, dpiY?: number, stride?: number);
	    /**
	     * @private
	     */
	    static getBytesPerPixel(format: PixelFormat): number;
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	}
	/**
	 * Describes an image that can be drawn to a [[DrawingContext]].
	 */
	export class Bitmap implements Serializable {
	    /**
	     * @private
	     */
	    private _data;
	    private _layout?;
	    /**
	     * Initializes a new instance of the [[Bitmap]] class with the specified data.
	     * @param data A buffer that contains binary image data. This can either be a binary png- or jpeg-image, or a raw pixel buffer.
	     * @param layout In case the data buffer contains raw pixel data, it's necessary to specify the data layout of the buffer.
	     */
	    constructor(data: Buffer | HostBinary, layout?: BitmapDataLayout);
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	    /**
	     * Loads a bitmap that is stored in the extension package. The specified path must be relative to the packages output directory, which has been specified with the `outDir` parameter in the `tsconfig.json` file.
	     * @param path The relative path to a bitmap file.
	     * @param layout In case the file contains raw pixel data, it's necessary to specify the data layout of the file.
	     */
	    static loadFromResource(path: string, layout?: BitmapDataLayout): Bitmap;
	    /**
	     * Loads the size and resolution of the image.
	     */
	    measure(): BitmapMeasurements;
	}
}


declare module "piweb/drawing/image/settings" {
	/**
	 * @module drawing
	 */
	/** file */
	import { Point, PointDescription } from 'piweb/drawing/geometry/basics';
	import { Serializable } from "internal/serializable";
	import { BufferWriter } from 'internal/buffer_writer';
	/**
	 * Determines how the image aligns to the position horizontally.
	 *
	 * **`left` (default)**
	 *
	 * <img style="float: left; height: 48px;margin-right:8px" src="media://imageAnchorLeft.svg">
	 *
	 * The image will be drawn with the position on the left side.
	 *
	 * <br>
	 *
	 * **`center`**
	 *
	 * <img style="float: left; height: 48px;margin-right:8px" src="media://imageAnchorHorizontalCenter.svg">
	 *
	 * The image will be drawn with the position at the center.
	 *
	 * <br>
	 *
	 * **`right`**
	 *
	 * <img style="float: left; height: 48px;margin-right:8px" src="media://imageAnchorRight.svg">
	 *
	 * The image will be drawn with the position on the right side.
	 *
	 * <br>
	 */
	export type HorizontalImageAnchor = "left" | "right" | "center";
	/**
	 * Determines how the image aligns to the position vertically.
	 *
	 * **`top` (default)**
	 *
	 * <img style="float: left; height: 48px;margin-right:8px" src="media://imageAnchorTop.svg">
	 *
	 * The image will be drawn with the position on the top.
	 *
	 * <br>
	 *
	 * **`center`**
	 *
	 * <img style="float: left; height: 48px;margin-right:8px" src="media://imageAnchorVerticalCenter.svg">
	 *
	 * The image will be drawn with the position at the center.
	 *
	 * <br>
	 *
	 * **`bottom`**
	 *
	 * <img style="float: left; height: 48px;margin-right:8px" src="media://imageAnchorBottom.svg">
	 *
	 * The image will be drawn with the position on the bottom.
	 *
	 * <br>
	 */
	export type VerticalImageAnchor = "top" | "bottom" | "center";
	/**
	 * Can be used to initialize an instance of the [[ImageDrawingSettings]] class.
	 */
	export interface ImageDrawingSettingsDescription {
	    readonly position?: PointDescription;
	    readonly width?: number;
	    readonly height?: number;
	    readonly anchorX?: HorizontalImageAnchor;
	    readonly anchorY?: VerticalImageAnchor;
	}
	/**
	 * Determines how an image is arranged. You can specify the stretch/aspect of the image with the `width` and `height` parameters like the following:
	 *
	 * | Result                                                                                            | Width | Height | Description |
	 * |------------------------------------|-|-|-|
	 * |<img style="height:64px;width:128px;" src="media://imageSizeByHeight.svg"> | `undefined` | `16`| The image will be drawn with a height of 16 millimeters and keep its aspect ratio.  |
	 * |<img style="height:64px;width:128px;" src="media://imageSizeByWidth.svg"> | `16` | `undefined`| The image will be drawn with a width of 16 millimeters and keep its aspect ratio. Since the width of the image is greater than its height, the result is smaller. |
	 * |<img style="height:64px;width:128px;" src="media://imageSizeByWidthAndHeight.svg"> | `16` | `16`| The image will be drawn with a width and height of 16 millimeters. Since this doesn't match the images original aspect ratio, it looks stretched. |
	 * |<img style="height:64px;width:128px;" src="media://imageNatural.svg"> | `undefined` | `undefined`| The image will be drawn in its original size. This will usually lead to the most appealing result, because the image doesn't need to be stretched. |
	 */
	export class ImageDrawingSettings implements Serializable, ImageDrawingSettingsDescription {
	    /**
	     * Gets or sets the position to which the image aligns.
	     */
	    readonly position: Point;
	    /**
	     * Gets or sets the desired image width.
	     */
	    readonly width?: number;
	    /**
	     * Gets or sets the desired image height.
	     */
	    readonly height?: number;
	    /**
	     * Determines how the image aligns to the position horizontally.
	     */
	    readonly anchorX: HorizontalImageAnchor;
	    /**
	     * Determines how the image aligns to the position vertically.
	     */
	    readonly anchorY: VerticalImageAnchor;
	    /**
	     * Initializes a new instance of the [[ImageDrawingSettings]] class.
	     * @param position The position.
	     * @param width The width.
	     * @param height The height.
	     * @param anchorX The horizontal anchor.
	     * @param anchorY The vertical anchor.
	     */
	    constructor(position: Point, width: number | undefined, height: number | undefined, anchorX: HorizontalImageAnchor, anchorY: VerticalImageAnchor);
	    /**
	     * Returns the image drawing settings that are defined by the specified description.
	     * @param description Image drawing settings description.
	     */
	    static create(description?: ImageDrawingSettingsDescription): ImageDrawingSettings;
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	}
}


declare module "piweb/drawing/material/brushes" {
	import { BufferWriter } from "internal/buffer_writer";
	import { Serializable } from "internal/serializable";
	import { Color, ColorDescription } from "piweb/drawing/material/color";
	import { Point, PointDescription } from "piweb/drawing/geometry/basics";
	/**
	 * An enumeration to determine the type of a brush.
	 */
	export type BrushType = "solid" | "linear" | "radial";
	/**
	 * Can be used to initialize an instance of the [[SolidColorBrush]] class.
	 */
	export interface SolidDescription {
	    readonly color?: ColorDescription;
	    readonly opacity?: number;
	}
	/**
	 * Can be used to initialize an instance of the [[LinearGradientBrush]] class.
	 */
	export interface LinearDescription {
	    readonly color?: ColorDescription;
	    readonly color2?: ColorDescription;
	    readonly angle?: number;
	    readonly opacity?: number;
	}
	/**
	 * Can be used to initialize an instance of the [[RadialGradientBrush]] class.
	 */
	export interface RadialDescription {
	    readonly color?: ColorDescription;
	    readonly color2?: ColorDescription;
	    readonly center?: PointDescription;
	    readonly opacity?: number;
	}
	/**
	 * Can be used to initialize an instance of the [[Brush]] class.
	 */
	export interface SolidBrushDescription extends SolidDescription {
	    readonly type: BrushType;
	}
	/**
	 * Can be used to initialize an instance of the [[Brush]] class.
	 */
	export interface LinearBrushDescription extends LinearDescription {
	    readonly type: BrushType;
	}
	/**
	 * Can be used to initialize an instance of the [[Brush]] class.
	 */
	export interface RadialBrushDescription extends RadialDescription {
	    readonly type: BrushType;
	}
	/**
	 * Can be used to initialize an instance of the [[Brush]] class.
	 */
	export type BrushDescription = SolidBrushDescription | LinearBrushDescription | RadialBrushDescription | Brush | Color | string;
	/**
	 * Describes how an arbitrary geometry is filled.
	 */
	export abstract class Brush implements Serializable {
	    /**
	     * Gets or sets the opacity of the brush.
	     * Valid values are in the range of `[0..1]`, where `0` is completely translucent and `1` is opaque.
	     */
	    opacity: number;
	    /**
	     * @protected
	     * @param opacity The opacity
	     */
	    constructor(opacity: number);
	    /**
	     * @private
	     */
	    readonly abstract type: BrushType;
	    static create(description?: BrushDescription): Brush;
	    /**
	     * @private
	     */
	    abstract serialize(target: BufferWriter): void;
	    static readonly aliceBlue: SolidColorBrush;
	    static readonly antiqueWhite: SolidColorBrush;
	    static readonly aqua: SolidColorBrush;
	    static readonly aquamarine: SolidColorBrush;
	    static readonly azure: SolidColorBrush;
	    static readonly beige: SolidColorBrush;
	    static readonly bisque: SolidColorBrush;
	    static readonly black: SolidColorBrush;
	    static readonly blanchedAlmond: SolidColorBrush;
	    static readonly blue: SolidColorBrush;
	    static readonly blueViolet: SolidColorBrush;
	    static readonly brown: SolidColorBrush;
	    static readonly burlyWood: SolidColorBrush;
	    static readonly cadetBlue: SolidColorBrush;
	    static readonly chartreuse: SolidColorBrush;
	    static readonly chocolate: SolidColorBrush;
	    static readonly coral: SolidColorBrush;
	    static readonly cornflowerBlue: SolidColorBrush;
	    static readonly cornsilk: SolidColorBrush;
	    static readonly crimson: SolidColorBrush;
	    static readonly cyan: SolidColorBrush;
	    static readonly darkBlue: SolidColorBrush;
	    static readonly darkCyan: SolidColorBrush;
	    static readonly darkGoldenRod: SolidColorBrush;
	    static readonly darkGray: SolidColorBrush;
	    static readonly darkGreen: SolidColorBrush;
	    static readonly darkKhaki: SolidColorBrush;
	    static readonly darkMagenta: SolidColorBrush;
	    static readonly darkOliveGreen: SolidColorBrush;
	    static readonly darkOrange: SolidColorBrush;
	    static readonly darkOrchid: SolidColorBrush;
	    static readonly darkRed: SolidColorBrush;
	    static readonly darkSalmon: SolidColorBrush;
	    static readonly darkSeaGreen: SolidColorBrush;
	    static readonly darkSlateBlue: SolidColorBrush;
	    static readonly darkSlateGray: SolidColorBrush;
	    static readonly darkTurquoise: SolidColorBrush;
	    static readonly darkViolet: SolidColorBrush;
	    static readonly deepPink: SolidColorBrush;
	    static readonly deepSkyBlue: SolidColorBrush;
	    static readonly dimGray: SolidColorBrush;
	    static readonly dodgerBlue: SolidColorBrush;
	    static readonly fireBrick: SolidColorBrush;
	    static readonly floralWhite: SolidColorBrush;
	    static readonly forestGreen: SolidColorBrush;
	    static readonly fuchsia: SolidColorBrush;
	    static readonly gainsboro: SolidColorBrush;
	    static readonly ghostWhite: SolidColorBrush;
	    static readonly gold: SolidColorBrush;
	    static readonly goldenRod: SolidColorBrush;
	    static readonly gray: SolidColorBrush;
	    static readonly green: SolidColorBrush;
	    static readonly greenYellow: SolidColorBrush;
	    static readonly honeyDew: SolidColorBrush;
	    static readonly hotPink: SolidColorBrush;
	    static readonly indianRed: SolidColorBrush;
	    static readonly indigo: SolidColorBrush;
	    static readonly ivory: SolidColorBrush;
	    static readonly khaki: SolidColorBrush;
	    static readonly lavender: SolidColorBrush;
	    static readonly lavenderBlush: SolidColorBrush;
	    static readonly lawnGreen: SolidColorBrush;
	    static readonly lemonChiffon: SolidColorBrush;
	    static readonly lightBlue: SolidColorBrush;
	    static readonly lightCoral: SolidColorBrush;
	    static readonly lightCyan: SolidColorBrush;
	    static readonly lightGoldenRodYellow: SolidColorBrush;
	    static readonly lightGray: SolidColorBrush;
	    static readonly lightGreen: SolidColorBrush;
	    static readonly lightPink: SolidColorBrush;
	    static readonly lightSalmon: SolidColorBrush;
	    static readonly lightSeaGreen: SolidColorBrush;
	    static readonly lightSkyBlue: SolidColorBrush;
	    static readonly lightSlateGray: SolidColorBrush;
	    static readonly lightSteelBlue: SolidColorBrush;
	    static readonly lightYellow: SolidColorBrush;
	    static readonly lime: SolidColorBrush;
	    static readonly limeGreen: SolidColorBrush;
	    static readonly linen: SolidColorBrush;
	    static readonly magenta: SolidColorBrush;
	    static readonly maroon: SolidColorBrush;
	    static readonly mediumAquamarine: SolidColorBrush;
	    static readonly mediumBlue: SolidColorBrush;
	    static readonly mediumOrchid: SolidColorBrush;
	    static readonly mediumPurple: SolidColorBrush;
	    static readonly mediumSeaGreen: SolidColorBrush;
	    static readonly mediumSlateBlue: SolidColorBrush;
	    static readonly mediumSpringGreen: SolidColorBrush;
	    static readonly mediumTurquoise: SolidColorBrush;
	    static readonly mediumVioletRed: SolidColorBrush;
	    static readonly midnightBlue: SolidColorBrush;
	    static readonly mintCream: SolidColorBrush;
	    static readonly mistyRose: SolidColorBrush;
	    static readonly moccasin: SolidColorBrush;
	    static readonly navajoWhite: SolidColorBrush;
	    static readonly navy: SolidColorBrush;
	    static readonly oldLace: SolidColorBrush;
	    static readonly olive: SolidColorBrush;
	    static readonly oliveDrab: SolidColorBrush;
	    static readonly orange: SolidColorBrush;
	    static readonly orangeRed: SolidColorBrush;
	    static readonly orchid: SolidColorBrush;
	    static readonly paleGoldenRod: SolidColorBrush;
	    static readonly paleGreen: SolidColorBrush;
	    static readonly paleTurquoise: SolidColorBrush;
	    static readonly paleVioletRed: SolidColorBrush;
	    static readonly papayaWhip: SolidColorBrush;
	    static readonly peachPuff: SolidColorBrush;
	    static readonly peru: SolidColorBrush;
	    static readonly pink: SolidColorBrush;
	    static readonly plum: SolidColorBrush;
	    static readonly powderBlue: SolidColorBrush;
	    static readonly purple: SolidColorBrush;
	    static readonly red: SolidColorBrush;
	    static readonly rosyBrown: SolidColorBrush;
	    static readonly royalBlue: SolidColorBrush;
	    static readonly saddleBrown: SolidColorBrush;
	    static readonly salmon: SolidColorBrush;
	    static readonly sandyBrown: SolidColorBrush;
	    static readonly seaGreen: SolidColorBrush;
	    static readonly seaShell: SolidColorBrush;
	    static readonly sienna: SolidColorBrush;
	    static readonly silver: SolidColorBrush;
	    static readonly skyBlue: SolidColorBrush;
	    static readonly slateBlue: SolidColorBrush;
	    static readonly slateGray: SolidColorBrush;
	    static readonly snow: SolidColorBrush;
	    static readonly springGreen: SolidColorBrush;
	    static readonly steelBlue: SolidColorBrush;
	    static readonly tan: SolidColorBrush;
	    static readonly teal: SolidColorBrush;
	    static readonly thistle: SolidColorBrush;
	    static readonly tomato: SolidColorBrush;
	    static readonly transparent: SolidColorBrush;
	    static readonly turquoise: SolidColorBrush;
	    static readonly violet: SolidColorBrush;
	    static readonly wheat: SolidColorBrush;
	    static readonly white: SolidColorBrush;
	    static readonly whiteSmoke: SolidColorBrush;
	    static readonly yellow: SolidColorBrush;
	    static readonly yellowGreen: SolidColorBrush;
	}
	/**
	 * Describes a brush that fills an area with a single color.
	 */
	export class SolidColorBrush extends Brush implements SolidBrushDescription {
	    color: Color;
	    /**
	     * @private
	     */
	    readonly type: "solid";
	    /**
	     * Initializes a new instance of the [[SolidColorBrush]] class.
	     * @param color
	     * @param opacity
	     */
	    constructor(color: Color, opacity: number);
	    /**
	     * Returns the solid color brush that is defined by the specified description.
	     * @param description Solid color brush description
	     */
	    static createSolidColorBrush(description?: SolidDescription | string): SolidColorBrush;
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	}
	/**
	 * Describes a brush that fills an area with a linear gradient.
	 */
	export class LinearGradientBrush extends Brush implements LinearBrushDescription {
	    /**
	     * Gets or sets the color at the start of the gradient.
	     */
	    color: Color;
	    /**
	     * Gets or sets the color at the end of the gradient.
	     */
	    color2: Color;
	    /**
	     * Gets or sets the angle in degrees about which the gradient is rotated around the center.
	     */
	    rotation: number;
	    /**
	     * @private
	     */
	    readonly type: "linear";
	    /**
	     * Initializes a new instance of the [[LinearGradientBrush]] class.
	     * @param color The color at the start of the gradient.
	     * @param color2 The color at the end of the gradient.
	     * @param rotation The angle in degrees about which the gradient is rotated around the center.
	     * @param opacity The opacity.
	     */
	    constructor(color: Color, color2: Color, rotation: number, opacity: number);
	    /**
	     * Returns the linear gradient brush that is defined by the specified description.
	     * @param description Linear gradient brush description
	     */
	    static createLinearGradientBrush(description?: LinearDescription): LinearGradientBrush;
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	}
	/**
	 * Describes a brush that fills an area with a radial gradient.
	 */
	export class RadialGradientBrush extends Brush implements RadialBrushDescription {
	    /**
	     * Gets or sets the color at the center of the gradient.
	     */
	    color: Color;
	    /**
	     * Gets or sets the color at the outer border of the gradient.
	     */
	    color2: Color;
	    /**
	     * Gets or sets the relative center in coordinates from `[0..1]`.
	     */
	    center: Point;
	    /**
	     * @private
	     */
	    readonly type: "radial";
	    /**
	     * Initializes a new instance of the [[RadialGradientBrush]] class.
	     * @param color1
	     * @param color2
	     * @param center
	     * @param opacity
	     */
	    constructor(color1: Color, color2: Color, center: Point, opacity: number);
	    /**
	     * Returns the radial gradient brush that is defined by the specified description.
	     * @param description Radial gradient brush description
	     */
	    static createRadialGradientBrush(description?: RadialDescription): RadialGradientBrush;
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	}
}


declare module "piweb/drawing/material/color" {
	/**
	 * @module drawing
	 */
	/** file */
	import { BufferWriter } from "internal/buffer_writer";
	import { Serializable } from "internal/serializable";
	/**
	 * Describes a color with red, green, blue and alpha channel
	 */
	export interface ColorObject {
	    r: number;
	    g: number;
	    b: number;
	    a?: number;
	}
	/**
	 * Can be used to initialize an instance of the [[Color]] class.
	 */
	export type ColorDescription = ColorObject | string;
	/**
	 * Describes a color with red, green, blue and alpha channel.
	 */
	export class Color implements Serializable, ColorObject {
	    /**
	     * Gets or sets the red channel in a range of `[0..255]`.
	     */
	    r: number;
	    /**
	     * Gets or sets the green channel in a range of `[0..255]`.
	     */
	    g: number;
	    /**
	     * Gets or sets the blue channel in a range of `[0..255]`.
	     */
	    b: number;
	    /**
	     * Gets or sets the alpha channel in a range of `[0..255]`, where `0` is completely translucent and `255` is opaque.
	     */
	    a: number;
	    /**
	     * Initializes a new instance of the [[Color]] class.
	     * @param r The red channel
	     * @param g The green channel
	     * @param b The blue channel
	     * @param a The alpha channel
	     */
	    constructor(r: number, g: number, b: number, a: number);
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	    /**
	     * Returns the color that is defined by the specified color description.
	     * @param description Color description.
	     */
	    static create(description?: ColorDescription): Color;
	    static readonly aliceBlue: Color;
	    static readonly antiqueWhite: Color;
	    static readonly aqua: Color;
	    static readonly aquamarine: Color;
	    static readonly azure: Color;
	    static readonly beige: Color;
	    static readonly bisque: Color;
	    static readonly black: Color;
	    static readonly blanchedAlmond: Color;
	    static readonly blue: Color;
	    static readonly blueViolet: Color;
	    static readonly brown: Color;
	    static readonly burlyWood: Color;
	    static readonly cadetBlue: Color;
	    static readonly chartreuse: Color;
	    static readonly chocolate: Color;
	    static readonly coral: Color;
	    static readonly cornflowerBlue: Color;
	    static readonly cornsilk: Color;
	    static readonly crimson: Color;
	    static readonly cyan: Color;
	    static readonly darkBlue: Color;
	    static readonly darkCyan: Color;
	    static readonly darkGoldenRod: Color;
	    static readonly darkGray: Color;
	    static readonly darkGreen: Color;
	    static readonly darkKhaki: Color;
	    static readonly darkMagenta: Color;
	    static readonly darkOliveGreen: Color;
	    static readonly darkOrange: Color;
	    static readonly darkOrchid: Color;
	    static readonly darkRed: Color;
	    static readonly darkSalmon: Color;
	    static readonly darkSeaGreen: Color;
	    static readonly darkSlateBlue: Color;
	    static readonly darkSlateGray: Color;
	    static readonly darkTurquoise: Color;
	    static readonly darkViolet: Color;
	    static readonly deepPink: Color;
	    static readonly deepSkyBlue: Color;
	    static readonly dimGray: Color;
	    static readonly dodgerBlue: Color;
	    static readonly fireBrick: Color;
	    static readonly floralWhite: Color;
	    static readonly forestGreen: Color;
	    static readonly fuchsia: Color;
	    static readonly gainsboro: Color;
	    static readonly ghostWhite: Color;
	    static readonly gold: Color;
	    static readonly goldenRod: Color;
	    static readonly gray: Color;
	    static readonly green: Color;
	    static readonly greenYellow: Color;
	    static readonly honeyDew: Color;
	    static readonly hotPink: Color;
	    static readonly indianRed: Color;
	    static readonly indigo: Color;
	    static readonly ivory: Color;
	    static readonly khaki: Color;
	    static readonly lavender: Color;
	    static readonly lavenderBlush: Color;
	    static readonly lawnGreen: Color;
	    static readonly lemonChiffon: Color;
	    static readonly lightBlue: Color;
	    static readonly lightCoral: Color;
	    static readonly lightCyan: Color;
	    static readonly lightGoldenRodYellow: Color;
	    static readonly lightGray: Color;
	    static readonly lightGreen: Color;
	    static readonly lightPink: Color;
	    static readonly lightSalmon: Color;
	    static readonly lightSeaGreen: Color;
	    static readonly lightSkyBlue: Color;
	    static readonly lightSlateGray: Color;
	    static readonly lightSteelBlue: Color;
	    static readonly lightYellow: Color;
	    static readonly lime: Color;
	    static readonly limeGreen: Color;
	    static readonly linen: Color;
	    static readonly magenta: Color;
	    static readonly maroon: Color;
	    static readonly mediumAquamarine: Color;
	    static readonly mediumBlue: Color;
	    static readonly mediumOrchid: Color;
	    static readonly mediumPurple: Color;
	    static readonly mediumSeaGreen: Color;
	    static readonly mediumSlateBlue: Color;
	    static readonly mediumSpringGreen: Color;
	    static readonly mediumTurquoise: Color;
	    static readonly mediumVioletRed: Color;
	    static readonly midnightBlue: Color;
	    static readonly mintCream: Color;
	    static readonly mistyRose: Color;
	    static readonly moccasin: Color;
	    static readonly navajoWhite: Color;
	    static readonly navy: Color;
	    static readonly oldLace: Color;
	    static readonly olive: Color;
	    static readonly oliveDrab: Color;
	    static readonly orange: Color;
	    static readonly orangeRed: Color;
	    static readonly orchid: Color;
	    static readonly paleGoldenRod: Color;
	    static readonly paleGreen: Color;
	    static readonly paleTurquoise: Color;
	    static readonly paleVioletRed: Color;
	    static readonly papayaWhip: Color;
	    static readonly peachPuff: Color;
	    static readonly peru: Color;
	    static readonly pink: Color;
	    static readonly plum: Color;
	    static readonly powderBlue: Color;
	    static readonly purple: Color;
	    static readonly red: Color;
	    static readonly rosyBrown: Color;
	    static readonly royalBlue: Color;
	    static readonly saddleBrown: Color;
	    static readonly salmon: Color;
	    static readonly sandyBrown: Color;
	    static readonly seaGreen: Color;
	    static readonly seaShell: Color;
	    static readonly sienna: Color;
	    static readonly silver: Color;
	    static readonly skyBlue: Color;
	    static readonly slateBlue: Color;
	    static readonly slateGray: Color;
	    static readonly snow: Color;
	    static readonly springGreen: Color;
	    static readonly steelBlue: Color;
	    static readonly tan: Color;
	    static readonly teal: Color;
	    static readonly thistle: Color;
	    static readonly tomato: Color;
	    static readonly transparent: Color;
	    static readonly turquoise: Color;
	    static readonly violet: Color;
	    static readonly wheat: Color;
	    static readonly white: Color;
	    static readonly whiteSmoke: Color;
	    static readonly yellow: Color;
	    static readonly yellowGreen: Color;
	}
}


declare module "piweb/drawing/material/pen" {
	import { BufferWriter } from "internal/buffer_writer";
	import { Serializable } from "internal/serializable";
	import { Brush, BrushDescription } from "piweb/drawing/material/brushes";
	/**
	 * Determines the geometry at the start and/or end of a line.
	 *
	 * **`flat`**
	 *
	 * <img style="float: left; width: 36px;margin-right:8px" src="media://penLineCapFlat.svg">
	 *
	 * No extra geometry is added.
	 * <br><br>
	 *
	 * **`round`**
	 *
	 * <img style="float: left; width: 36px;margin-right:8px" src="media://penLineCapRound.svg">
	 *
	 * Adds a half circle with a diameter that is equal to the pens thickness.
	 * <br><br>
	 *
	 * **`square`**
	 *
	 * <img style="float: left; width: 36px;margin-right:8px" src="media://penLineCapSquare.svg">
	 *
	 * Adds a half square with the side length of the pens thickness.
	 *
	 * <br>
	 */
	export type LineCap = "flat" | "round" | "square";
	/**
	 * Determines the geometry between two linear segments of a line.
	 *
	 * **`bevel`**
	 *
	 * <img style="float: left; width: 36px;margin-right:8px" src="media://penLineJoinBevel.svg">
	 *
	 * Adds a triangle that connects the two non-overlapping points of the lines.
	 * <br><br><br>
	 * **`miter`**
	 *
	 * <img style="float: left; width: 36px;margin-right:8px" src="media://penLineJoinMiter.svg">
	 *
	 * Extends the outlines of the two lines until they cut each other, and fills the enclosed area.
	 * <br><br><br>
	 * **`round`**
	 *
	 * <img style="float: left; width: 36px;margin-right:8px" src="media://penLineJoinRound.svg">
	 *
	 * Creates a circle around the cutting point with a diameter that is equal to the pens thickness.
	 *
	 * <br>
	 */
	export type LineJoin = "bevel" | "miter" | "round";
	/**
	 * Can be used to initialize an instance of the [[Pen]] class.
	 */
	export interface PenDescription {
	    readonly brush?: BrushDescription;
	    readonly thickness?: number;
	    readonly startCap?: LineCap;
	    readonly endCap?: LineCap;
	    readonly lineJoin?: LineJoin;
	    readonly dashStyle?: ArrayLike<number>;
	    readonly dashOffset?: number;
	    readonly dashCap?: LineCap;
	}
	/**
	 * Describes how lines are stroked.
	 */
	export class Pen implements Serializable, PenDescription {
	    /**
	     * Gets or sets the brush that is used to fill the outline procuded by the pen.
	     */
	    brush: Brush;
	    /**
	     * Gets or sets the thickness of stroke that is produced by the pen (in **millimeters**).
	     */
	    thickness: number;
	    /**
	     * Gets or sets the geometry added to the beginning of the stroke.
	     */
	    startCap: LineCap;
	    /**
	     * Gets or sets the geometry added to the end of the stroke.
	     */
	    endCap: LineCap;
	    /**
	     * Gets or sets the geometry added between to segments of the stroke.
	     */
	    lineJoin: LineJoin;
	    /**
	     * Gets or sets the definition of the dashes used to render the stroke. The default value is empty, which will render one solid line.
	     * The length of the dashes and gaps specified here are multiplied with the thickness of the pen when it is drawn. So in
	     * case you want dashes with a length of one millimeter on a pen with 0.1 mm thickness, you must specify a dash of length
	     * 10 here.
	     */
	    dashStyle: number[];
	    /**
	     * Gets or sets the offset of the first dash. The stroke is solid to the specified offset. The specified offset is multiplied with the
	     * pens thickness, just like the dash style. Be aware that a **positive** offset will move the dashes **against stroke direction**.
	     */
	    dashOffset: number;
	    /**
	     * Gets or sets the geometry added at the beginning and end of each dash.
	     */
	    dashCap: LineCap;
	    /**
	     * Initializes a new instance of the [[Pen]] class.
	     * @param brush The brush.
	     * @param thickness The thickness.
	     * @param startCap The start cap.
	     * @param endCap The end cap.
	     * @param lineJoin The line join.
	     * @param dashStyle The dash style.
	     * @param dashOffset The dash offset.
	     * @param dashCap The dash cap.
	     */
	    constructor(brush: Brush, thickness: number, startCap: LineCap, endCap: LineCap, lineJoin: LineJoin, dashStyle: number[], dashOffset: number, dashCap: LineCap);
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	    /**
	     * Returns the pen that is defined by the specified description.
	     * @param description A pen description.
	     */
	    static create(description?: PenDescription): Pen;
	}
}


declare module "piweb/drawing/text/font" {
	/**
	 * @module drawing
	 */
	/** file */
	import { Serializable } from "internal/serializable";
	import { BufferWriter } from "internal/buffer_writer";
	import { Brush, BrushDescription } from "piweb/drawing/material/brushes";
	/**
	 * The font weight is used to display letters bolder or thinner. Most fonts only support a subset of the following font weights.
	 *
	 * | Identifier | numeric value |
	 * |------------|--------------------|
	 * | **`thin`**|**100**|
	 * | **`extraLight`**|**200**|
	 * | **`light`**|**300**|
	 * | **`normal`**|**400**|
	 * | **`medium`**|**500**|
	 * | **`semiBold`**|**600**|
	 * | **`bold`**|**700**|
	 * | **`extraBold`**|**800**|
	 * | **`black`**|**900**|
	 * | **`extraBlack`**|**950**|
	 */
	export type FontWeight = "thin" | "extraLight" | "light" | "normal" | "medium" | "semiBold" | "bold" | "extraBold" | "black" | "extraBlack";
	/**
	 * The font style can be used to display letters in a cursive way.
	 *
	 * **`normal` (default)**
	 *
	 * The text will be displayed as usual.
	 *
	 * **`italic`**
	 *
	 * Some fonts have a built in italic letter set, which can be used by specifying the italic font style.
	 *
	 * **`oblique`**
	 *
	 * For fonts which have no built in italic letter set, the oblique font style allows to apply a [[ShearTransform]] to the normal font to make it look cursive. The italic style will usually look more pleasing though.
	 */
	export type FontStyle = "normal" | "oblique" | "italic";
	/**
	 * Used to condense or expand the font horizontally.
	 *
	 * | Identifier | Changed width/height ratio |
	 * |------------|--------------------|
	 * | **`ultraCondensed`**|**50%** of the default width/height ratio|
	 * | **`extraCondensed`**|**62.5%** of the default width/height ratio|
	 * | **`condensed`**|**75%** of the default width/height ratio|
	 * | **`semiCondensed`**|**87.5%** of the default width/height ratio|
	 * | **`normal`**|**100%** of the default width/height ratio|
	 * | **`semiExpanded`**|**112.5%** of the default width/height ratio|
	 * | **`expanded`**|**125%** of the default width/height ratio|
	 * | **`extraExpanded`**|**150%** of the default width/height ratio|
	 * | **`ultraExpanded`**|**200%** of the default width/height ratio|
	 */
	export type FontStretch = "ultraCondensed" | "extraCondensed" | "condensed" | "semiCondensed" | "normal" | "semiExpanded" | "expanded" | "extraExpanded" | "ultraExpanded";
	/**
	 * An enumeration for text rendering features.
	 *
	 * **`underline`**
	 *
	 * Renders a horizontal line at the bottom of the text.
	 *
	 * **`strikeThrough`**
	 *
	 * Renders a horizontal line at the vertical center of the text.
	 */
	export type TextDecoration = "underline" | "strikeThrough";
	/**
	 * Can be used to initialize an instance of the [[Font]] class.
	 */
	export interface FontDescription {
	    readonly fontFamily?: string;
	    readonly fontWeight?: FontWeight;
	    readonly fontStyle?: FontStyle;
	    readonly fontStretch?: FontStretch;
	    readonly size?: number;
	    readonly foreground?: BrushDescription;
	    readonly textDecorations?: ArrayLike<TextDecoration>;
	}
	/**
	 * Describes how text is displayed
	 */
	export class Font implements Serializable, FontDescription {
	    /**
	     * Gets or sets the which font family will be used to display the text. Be aware that some font families don't support all characters.
	     */
	    fontFamily: string;
	    /**
	     * Gets or sets the the font weight.
	     */
	    fontWeight: FontWeight;
	    /**
	     * Gets or sets the the font style.
	     */
	    fontStyle: FontStyle;
	    /**
	     * Can be used to render the text stretched or dense.
	     */
	    fontStretch: FontStretch;
	    /**
	     * Gets or sets the font size in **millimeters**. PiWeb will automatically calculate the appropriate font size from the specified height.
	     */
	    size: number;
	    /**
	     * Gets or sets the brush which is used to fill the text.
	     */
	    foreground: Brush;
	    /**
	     * Gets or sets the text decorations.
	     */
	    textDecorations: TextDecoration[];
	    /**
	     * Initializes a new instance of the [[Font]] class.
	     * @param fontFamily The font family.
	     * @param fontWeight The font weight.
	     * @param fontStyle The font style.
	     * @param fontStretch The font stretch.
	     * @param size The font size.
	     * @param foreground The foreground.
	     * @param textDecorations The text decorations.
	     */
	    constructor(fontFamily: string, fontWeight: FontWeight, fontStyle: FontStyle, fontStretch: FontStretch, size: number, foreground: Brush, textDecorations: ArrayLike<TextDecoration>);
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	    /**
	     * Returns the font that is defined by the specified description.
	     * @param description A font description.
	     */
	    static create(description?: FontDescription): Font;
	    /**
	     * Returns a list with the names of all available font families on the host system.
	     */
	    static getFontFamilies(): string[];
	}
}


declare module "piweb/drawing/text/formatted_text" {
	/**
	 * @module drawing
	 */
	/** file */
	import { BufferWriter } from "internal/buffer_writer";
	import { Serializable } from "internal/serializable";
	import { Font, FontDescription } from "piweb/drawing/text/font";
	/**
	 * Determines if the text is arranged from the left to the right or from the right to the left. While this seems to be redundant with the [[HorizontalTextAlignment]],
	 * the effect is clear when the text exceeds the size of the boundaries, and especially when ellipsis are used.
	 *
	 * **`leftToRight` (default)**
	 *
	 * <img style="float: left; height: 48px; margin-right:8px" src="media://leftToRight.svg">
	 *
	 * Layouting starts at the left boundary.
	 *
	 * <br>
	 *
	 * **`rightToLeft`**
	 *
	 * <img style="float: left; height: 48px; margin-right:8px" src="media://rightToLeft.svg">
	 *
	 * Layouting starts at the right boundary.
	 *
	 * <br>
	 */
	export type FlowDirection = "leftToRight" | "rightToLeft";
	/**
	 * Determines how text is arranged inside the bounding box that is defined by width and height. In case no bounding box is defined, the horizontal text
	 * alignment also determines the horizontal position of the text relative to the anchor.
	 *
	 * **`left` (default)**
	 *
	 * <img style="float: left; height: 48px; margin-right:8px" src="media://alignLeft.svg">
	 *
	 * Aligns text to the left boundary.
	 *
	 * <br>
	 *
	 * **`right`**
	 *
	 * <img style="float: left; height: 48px; margin-right:8px" src="media://alignRight.svg">
	 *
	 * Aligns text to the right boundary.
	 *
	 * <br>
	 *
	 * **`center`**
	 *
	 * <img style="float: left; height: 48px; margin-right:8px" src="media://alignCenter.svg">
	 *
	 * Aligns text centered between the left and the right boundaries.
	 *
	 * <br>
	 *
	 * **`justify`**
	 *
	 * <img style="float: left; height: 48px; margin-right:8px" src="media://alignJustify.svg">
	 *
	 * Increases the size of the whitespaces until the text fits between the left and right boundary.
	 *
	 * <br>
	 */
	export type HorizontalTextAlignment = "left" | "right" | "center" | "justify";
	/**
	 * Determines how text is arranged inside the bounding box that is defined by width and height. In case no bounding box is defined, the
	 * text vertical alignment also determines the vertical position of the text relative to the anchor.
	 *
	 * **`top` (default)**
	 *
	 * <img style="float: left; height: 72px; margin-right:8px" src="media://verticalAlignTop.svg">
	 *
	 * Aligns the text on the top of the bounding box.
	 *
	 * <br><br>
	 *
	 * **`bottom`**
	 *
	 * <img style="float: left; height: 72px; margin-right:8px" src="media://verticalAlignBottom.svg">
	 *
	 * Aligns the text on the bottom of the bounding box.
	 *
	 * <br><br>
	 *
	 * **`center`**
	 *
	 * <img style="float: left; height: 72px; margin-right:8px" src="media://verticalAlignCenter.svg">
	 *
	 * Aligns the text centered in the bounding box.
	 *
	 * <br><br>
	 */
	export type VerticalTextAlignment = "top" | "bottom" | "center";
	/**
	 * Determines what happens when the text exceeds the size of the boundaries. In case no boundaries are defined, the text trimming has no effect.
	 * When the length of a text reaches the `maxTextWidth`, a line break will be inserted in case the `maxTextHeight` allows another line of text.
	 * If this is not the case, the text will be cut of, in the way the text trimming describes. A text like **'lorem ipsum'** would be formatted
	 * like the following:
	 *
	 * **`none` (default)**
	 *
	 * <img style="float: left; height: 48px; margin-right:8px" src="media://textTrimmingNone.svg">
	 *
	 * The text will be trimmed at a whitespace if possible, otherwise in a word. No ellipsis are shown.
	 *
	 * <br>
	 *
	 * **`wordEllipsis`**
	 *
	 * <img style="float: left; height: 48px; margin-right:8px" src="media://textTrimmingWordEllipsis.svg">
	 *
	 * The text will be trimmed at a whitespace if possible, otherwise in a word, and ellipsis will be shown.
	 *
	 * <br>
	 *
	 * **`characterEllipsis`**
	 *
	 * <img style="float: left; height: 48px; margin-right:8px" src="media://textTrimmingCharacterEllipsis.svg">
	 *
	 * The text will be trimmed in a word, and ellipsis will be shown.
	 *
	 * <br>
	 */
	export type TextTrimming = "none" | "characterEllipsis" | "wordEllipses";
	/**
	 * Describes the final size and layout of a formatted text.
	 */
	export interface TextMeasurements {
	    /**
	     * The overall width, including the possible leading and trailing whitespace between the text and the boundaries.
	     */
	    width: number;
	    /**
	     * The overall height.
	     */
	    height: number;
	    /**
	     * The distance between the top of the first line and the baseline of the first line of text.
	     */
	    baseline: number;
	    /**
	     * The specified minimum width of the text.
	     */
	    minWidth: number;
	    /**
	     * The actual width of the text itself, excluding leading and trailing whitespace between the text and the boundaries.
	     */
	    textWidth: number;
	    /**
	     * The actual height of the text itself, excluding leading and trailing whitespace between the text and the boundaries.
	     */
	    textHeight: number;
	    /**
	     * The distance between the top of the bounding box and the baseline of the first line of text.
	     */
	    textBaseline: number;
	    /**
	     * The height of a single line of text.
	     */
	    textLineHeight: number;
	}
	/**
	 * Can be used to initialize an instance of the [[FormattedText]] class.
	 */
	export interface FormattedTextDescription {
	    readonly text?: string;
	    readonly font?: FontDescription;
	    readonly width?: number;
	    readonly height?: number;
	    readonly flowDirection?: FlowDirection;
	    readonly horizontalTextAlignment?: HorizontalTextAlignment;
	    readonly verticalTextAlignment?: VerticalTextAlignment;
	    readonly textTrimming?: TextTrimming;
	}
	/**
	 * Describes a text block with a certain style and size, in which the text can be arranged.
	 */
	export class FormattedText implements Serializable, FormattedTextDescription {
	    /**
	     * Gets or sets the text to be formatted. The text can include line breaks.
	     */
	    text: string;
	    /**
	     * Gets or sets the font that is used to render the text.
	     */
	    font: Font;
	    /**
	     * Gets or sets the width of the boundaries and therefore, after how many millimeters the text is supposed to wrap.
	     */
	    width?: number;
	    /**
	     * Gets or sets the height of the boundaries and therefore, how many lines of text can be rendered. The specified text
	     * will be wrapped until the specified `maxTextHeight` is reached. The last line will then either be cut off or rendered
	     * will ellipsis, depending on the specified `textTrimming`.
	     */
	    height?: number;
	    /**
	     * Gets or sets the text flow, which can be different among certain cultures.
	     */
	    flowDirection: FlowDirection;
	    /**
	     * Determines how text is arranged horizontally inside the boundaries.
	     */
	    horizontalTextAlignment: HorizontalTextAlignment;
	    /**
	     * Determines how text is arranged vertically inside the boundaries.
	     */
	    verticalTextAlignment: VerticalTextAlignment;
	    /**
	     * Determines how text is treated, that doesn't fit into the specified boundaries.
	     */
	    textTrimming: TextTrimming;
	    /**
	     * Initializes a new instance of the [[FormattedText]] class.
	     * @param text The text to be formatted.
	     * @param font The font.
	     * @param maxTextWidth The maximum text width.
	     * @param maxTextHeight The maximum text height.
	     * @param flowDirection The flow direction.
	     * @param horizontalTextAlignment The horizontal text alignment.
	     * @param verticalTextAlignment The vertical text alignment.
	     * @param textTrimming The text trimming.
	     */
	    constructor(text: string, font: Font, maxTextWidth: number | undefined, maxTextHeight: number | undefined, flowDirection: FlowDirection, horizontalTextAlignment: HorizontalTextAlignment, verticalTextAlignment: VerticalTextAlignment, textTrimming: TextTrimming);
	    /**
	     * Returns the formatted text that is defined by the specified description.
	     * @param description A formatted text description.
	     */
	    static create(description?: FormattedTextDescription | string): FormattedText;
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	    /**
	     * Measures the formatted text and returns a  [[TextMeasurements]] object that contains information about the final size and layout.
	     */
	    measure(): TextMeasurements;
	    /**
	     * Measures the specified formatted text and returns a  [[TextMeasurements]] object that contains information about the final size and layout.
	     */
	    static measure(formattedText: FormattedTextDescription): TextMeasurements;
	}
}


declare module "piweb/drawing/text/settings" {
	/**
	 * @module drawing
	 */
	/** file */
	import { Point, PointDescription } from 'piweb/drawing/geometry/basics';
	import { Serializable } from "internal/serializable";
	import { BufferWriter } from 'internal/buffer_writer';
	/**
	 * Determines how the whole text is arranged horizontally relative to the text position.
	 *
	 * **`default` (default)**
	 *
	 * Arranges the text according the [[HorizontalTextAlignment]] and the specified size of the bounding box.
	 *
	 * **`left`**
	 *
	 * <img style="float: left; height: 48px;margin-right:8px" src="media://anchorLeft.svg">
	 *
	 * Places the anchor point on the left side of the bounding box.
	 *
	 * <br>
	 *
	 * **`right`**
	 *
	 * <img style="float: left; height: 48px;margin-right:8px" src="media://anchorRight.svg">
	 *
	 * Places the anchor point on the right side of the bounding box.
	 *
	 * <br>
	 *
	 * **`center`**
	 *
	 * <img style="float: left; height: 48px;margin-right:8px" src="media://anchorCenter.svg">
	 *
	 * Places the anchor at the center of the bounding box.
	 *
	 * <br>
	 */
	export type HorizontalTextAnchor = "default" | "left" | "right" | "center";
	/**
	 * Determines how the whole text is arranged vertically relative to the text position.
	 *
	 * **`top` (default)**
	 *
	 * <img style="float: left; height: 48px;margin-right:8px" src="media://anchorTop.svg">
	 *
	 * Places the anchor point on the top of the bounding box.
	 *
	 * <br>
	 *
	 * **`bottom`**
	 *
	 * <img style="float: left; height: 48px;margin-right:8px" src="media://anchorBottom.svg">
	 *
	 * Places the anchor point on the bottom of the bounding box.
	 *
	 * <br>
	 *
	 * **`center`**
	 *
	 * <img style="float: left; height: 48px;margin-right:8px" src="media://anchorVerticalCenter.svg">
	 *
	 * Places the anchor at the center of the bounding box.
	 *
	 * <br>
	 *
	 * **`baseline`**
	 *
	 * <img style="float: left; height: 48px;margin-right:8px" src="media://anchorBaseline.svg">
	 *
	 * Places the anchor at the height of the baseline of the first line of text. The baseline anchor looks most natural when aligning text to certain positions, e.g. the lines of a scale.
	 *
	 * <br>
	 */
	export type VerticalTextAnchor = "default" | "top" | "bottom" | "center" | "baseline";
	/**
	 * Can be used to initialize an instance of the [[TextDrawingSettings]] class.
	 */
	export interface TextDrawingSettingsDescription {
	    readonly position?: PointDescription;
	    readonly anchorX?: HorizontalTextAnchor;
	    readonly anchorY?: VerticalTextAnchor;
	}
	/**
	 * Describes how text is aligned to a point.
	 */
	export class TextDrawingSettings implements Serializable, TextDrawingSettingsDescription {
	    /**
	     * Gets or sets the position at which the text should be placed.
	     */
	    position: Point;
	    /**
	     * Determines how the text is arranged horizontally relative to the position.
	     */
	    anchorX: HorizontalTextAnchor;
	    /**
	     * Determines how the text is arranged vertically relative to the position.
	     */
	    anchorY: VerticalTextAnchor;
	    /**
	     * Initializes a new instance of the [[TestDrawingSettings]] class.
	     * @param position The position.
	     * @param anchorX The horizontal anchor.
	     * @param anchorY The vertical anchor.
	     */
	    constructor(position: Point, anchorX: HorizontalTextAnchor, anchorY: VerticalTextAnchor);
	    /**
	     * Returns the text drawing settings that are defined by the specified description.
	     * @param description A text drawing settings description.
	     */
	    static create(description?: TextDrawingSettingsDescription): TextDrawingSettings;
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	}
}


declare module "piweb/drawing/transform/transforms" {
	/**
	 * @module drawing
	 */
	/** file */
	import { BufferWriter } from "internal/buffer_writer";
	import { Point, PointDescription } from "piweb/drawing/geometry/basics";
	/**
	 * Determines the type of a transform.
	 */
	export type TransformationType = "identity" | "translation" | "rotation" | "scaling" | "shear" | "group" | "matrix";
	/**
	 * Can be used to initialize an instance of the [[TranslationTransform]] class.
	 */
	export interface TranslationDescription {
	    x?: number;
	    y?: number;
	}
	/**
	 * Can be used to initialize an instance of the [[RotationTransform]] class.
	 */
	export interface RotationDescription {
	    angle?: number;
	    center?: PointDescription;
	}
	/**
	 * Can be used to initialize an instance of the [[ScalingTransform]] class.
	 */
	export interface ScalingDescription {
	    scaleX?: number;
	    scaleY?: number;
	    center?: PointDescription;
	}
	/**
	 * Can be used to initialize an instance of the [[ShearTransform]] class.
	 */
	export interface ShearDescription {
	    angleX?: number;
	    angleY?: number;
	    center?: PointDescription;
	}
	/**
	 * Can be used to initialize an instance of the [[MatrixTransform]] class.
	 */
	export interface MatrixDescription {
	    matrix?: ArrayLike<number>;
	}
	/**
	 * Can be used to initialize an instance of the [[TransformGroup]] class.
	 */
	export interface TransformGroupDescription {
	    children?: ArrayLike<TransformDescription>;
	}
	/**
	 * Can be used to initialize an instance of the [[IdentityTransform]] class.
	 */
	export interface IdentityTransformDescription {
	    type: "identity";
	}
	/**
	 * Can be used to initialize an instance of the [[Transform]] class.
	 */
	export interface TranslationTransformDescription extends TranslationDescription {
	    type: "translation";
	}
	/**
	 * Can be used to initialize an instance of the [[Transform]] class.
	 */
	export interface RotationTransformDescription extends RotationDescription {
	    type: "rotation";
	}
	/**
	 * Can be used to initialize an instance of the [[Transform]] class.
	 */
	export interface ScalingTransformDescription extends ScalingDescription {
	    type: "scaling";
	}
	/**
	 * Can be used to initialize an instance of the [[Transform]] class.
	 */
	export interface ShearTransformDescription extends ShearDescription {
	    type: "shear";
	}
	/**
	 * Can be used to initialize an instance of the [[Transform]] class.
	 */
	export interface MatrixTransformDescription extends MatrixDescription {
	    type: "matrix";
	}
	/**
	 * Can be used to initialize an instance of the [[Transform]] class.
	 */
	export interface TransformGroupTransformDescription extends TransformGroupDescription {
	    type: "group";
	}
	/**
	 * Can be used to initialize an instance of the [[Transform]] class.
	 */
	export type TransformDescription = IdentityTransformDescription | TranslationTransformDescription | RotationTransformDescription | ScalingTransformDescription | ShearTransformDescription | MatrixTransformDescription | TransformGroupTransformDescription | Transform;
	/**
	 * Describes a transformation matrix that can be used to change the position, rotation and size of geometries.
	 */
	export abstract class Transform {
	    /**
	     * @private
	     */
	    readonly abstract type: TransformationType;
	    /**
	     * Returns the transformation that is defined by the specified description.
	     * @param description A transformation description.
	     */
	    static create(description?: TransformDescription): Transform;
	    /**
	     * Returns the identity transform.
	     */
	    static readonly identity: IdentityTransform;
	    /**
	     * @private
	     */
	    abstract serialize(target: BufferWriter): void;
	}
	/**
	 * Describes the identity transform, which represents the identity matrix.
	 */
	export class IdentityTransform extends Transform implements IdentityTransformDescription {
	    /**
	     * Initializes a new instance of the [[IdentityTransform]] class.
	     */
	    constructor();
	    /**
	     * @private
	     */
	    readonly type: "identity";
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	}
	/**
	 * All transformation types are converted into a 3x3 matrix when they are applied. With the matrix transformation it's possible to define a transformation that is based on an arbitrary 3x3 matrix.
	 *
	 * | **m11**     | **m12**     | **0** |
	 * |-------------|-------------|-------|
	 * | **m21**     | **m22**     | **0** |
	 * | **offsetX** | **offsetY** | **1** |
	 */
	export class MatrixTransform extends Transform implements MatrixTransformDescription {
	    /**
	     * Gets or sets the M11 value of the matrix.
	     */
	    m11: number;
	    /**
	     * Gets or sets the M12 value of the matrix.
	     */
	    m12: number;
	    /**
	     * Gets or sets the M21 value of the matrix.
	     */
	    m21: number;
	    /**
	     * Gets or sets the M22 value of the matrix.
	     */
	    m22: number;
	    /**
	     * Gets or sets the M31 value of the matrix.
	     */
	    offsetX: number;
	    /**
	     * Gets or sets the M32 value of the matrix.
	     */
	    offsetY: number;
	    matrix: Float64Array;
	    /**
	     * Initializes a new instance of the [[MatrixTransform]] class.
	     * @param m11 M11 value of the matrix.
	     * @param m12 M12 value of the matrix.
	     * @param m21 M21 value of the matrix.
	     * @param m22 M22 value of the matrix.
	     * @param offsetX M31 value of the matrix.
	     * @param offsetY M32 value of the matrix.
	     */
	    constructor(m11: number, m12: number, m21: number, m22: number, offsetX: number, offsetY: number);
	    /**
	     * @private
	     */
	    readonly type: "matrix";
	    /**
	     * Returns the matrix transform that is defined by the specified description.
	     * @param description A matrix transform description.
	     */
	    static createMatrixTransform(description?: MatrixDescription): MatrixTransform;
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	}
	/**
	 * Rotates an object around a specific point.
	 *
	 * <img style="width:auto; height:128px;" src="media://rotateTransform.svg">
	 */
	export class RotationTransform extends Transform implements RotationTransformDescription {
	    /**
	     * Gets or sets the angle in degrees of clockwise rotation.
	     */
	    angle: number;
	    /**
	     * Gets or sets the rotation center.
	     */
	    center: Point;
	    /**
	     * Initializes a new instance of the [[RotationTransform]] class.
	     * @param angle The angle in degrees of clockwise rotation.
	     * @param center The rotation center.
	     */
	    constructor(angle: number, center: Point);
	    /**
	     * @private
	     */
	    readonly type: "rotation";
	    /**
	     * Returns the rotation transform that is defined by the specified description.
	     * @param description A rotation transform description.
	     */
	    static createRotationTransform(description?: RotationDescription): RotationTransform;
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	}
	/**
	 * Scales an object in horizontal and vertical direction.
	 *
	 * <img style="width:auto; height:128px;" src="media://scaleTransform.svg">
	 */
	export class ScalingTransform extends Transform implements ScalingTransformDescription {
	    /**
	     * Gets or sets the horizontal scaling factor.
	     */
	    scaleX: number;
	    /**
	     * Gets or sets the vertical scaling factor.
	     */
	    scaleY: number;
	    /**
	     * Gets or sets the center from which the scaling is calculated.
	     */
	    center: Point;
	    /**
	     * Initializes a new instance of the [[ScalingTransform]] class.
	     * @param scaleX The horizontal scaling factor.
	     * @param scaleY The vertical scaling factor.
	     * @param center The center from which the scaling is calculated.
	     */
	    constructor(scaleX: number, scaleY: number, center: Point);
	    /**
	     * Returns the scaling transform that is defined by the specified description.
	     * @param description A scaling transform description.
	     */
	    static createScalingTransform(description?: ScalingDescription): ScalingTransform;
	    /**
	     * @private
	     */
	    readonly type: "scaling";
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	}
	/**
	 * Describes a transformation that can be used to create the illusion of perspective.
	 *
	 * <img style="width:auto; height:128px;" src="media://skewTransform.svg">
	 */
	export class ShearTransform extends Transform implements ShearTransformDescription {
	    /**
	     * Gets or sets the rotation angle of the x coordinates.
	     */
	    angleX: number;
	    /**
	     * Gets or sets the rotation angle of the y coordinates.
	     */
	    angleY: number;
	    /**
	     * Gets or sets the rotation center.
	     */
	    center: Point;
	    /**
	     * Initializes a new instance of the [[ShearTransform]] class.
	     * @param angleX The rotation angle of the x coordinates.
	     * @param angleY The rotation angle of the y coordinates.
	     * @param center The rotation center.
	     */
	    constructor(angleX: number, angleY: number, center: Point);
	    /**
	     * Returns the shear transform that is defined by the specified description.
	     * @param description A shear transform description.
	     */
	    static createShearTransform(description?: ShearDescription): ShearTransform;
	    /**
	     * @private
	     */
	    readonly type: "shear";
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	}
	/**
	 * Describes an offset in horizontal and vertical direction.
	 *
	 * <img style="width:auto; height:128px;" src="media://translateTransform.svg">
	 */
	export class TranslationTransform extends Transform implements TranslationTransformDescription {
	    /**
	     * Gets or sets the horizontal offset.
	     */
	    x: number;
	    /**
	     * Gets or sets the vertical offset.
	     */
	    y: number;
	    /**
	     * Initializes a new instance of the [[TranslationTransform]] class.
	     * @param x The horizontal offset.
	     * @param y The vertical offset.
	     */
	    constructor(x: number, y: number);
	    /**
	     * Returns the translation transform that is defined by the specified description.
	     * @param description A translation transform description.
	     */
	    static createTranslationTransform(description?: TranslationDescription): TranslationTransform;
	    /**
	     * @private
	     */
	    readonly type: "translation";
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	}
	/**
	 * Combines multiple transformations into one by multiplying their matrices. As matrix multiplication is not commutative,
	 * the order of the child matrices is important.
	 */
	export class TransformGroup extends Transform implements TransformGroupTransformDescription {
	    /**
	     * Gets or sets the transformations of which the group is composed.
	     */
	    children: Transform[];
	    /**
	     * Initializes a new instance of the [[TransformGroup]] class.
	     * @param children The transformations of which the group is composed.
	     */
	    constructor(children: Transform[]);
	    /**
	     * returns the transform group that is defined by the specified description.
	     * @param description A transform group description.
	     */
	    static createTransformGroup(description?: TransformGroupTransformDescription): TransformGroup;
	    /**
	     * @private
	     */
	    readonly type: "group";
	    /**
	     * @private
	     */
	    serialize(target: BufferWriter): void;
	}
}


declare module "piweb/package" {
	
}


declare module "piweb/package/package" {
	
}


declare module "piweb/resources/host_binary" {
	/**
	 * @module resources
	 */ /** */
	/**
	 * Describes a binary object that lives in the context of the PiWeb host application.
	 */
	export interface HostBinary {
	    /**
	     * Returns a buffer with the same data as the binary.
	     */
	    makeBuffer(): Buffer;
	    /**
	     * Gets the size of the binary object in bytes.
	     */
	    readonly size: number;
	}
}


declare module "piweb/resources" {
	/**
	 * @module resources
	 * @preferred
	 *
	 * ## Introduction
	 *
	 * The `piweb.resources` module can be used to access files that are located in the extension package. The returned data can be used to initialize images,
	 * that can later be drawn to a drawing context, as shown in the example below:
	 *
	 * ```TypeScript
	 * import * as piweb from 'piweb'
	 *
	 * piweb.events.on("render", render);
	 *
	 * function render(context: piweb.drawing.DrawingContext) {
	 *
	 * 	const buffer = piweb.resources.readFileBufferSync("icon.png");
	 * 	const image = new piweb.drawing.Bitmap(buffer);
	 * 	context.drawImage(image);
	 * }
	 * ```
	 *
	 */
	/** file */
	import { HostBinary } from "piweb/resources/host_binary";
	export { HostBinary };
	import * as path from "piweb/resources/path";
	export { path };
	/**
	 * Returns a buffer that contains the data of the file at the specified path.
	 * @param path
	 */
	export function readFileBufferSync(path: string): Buffer;
	/**
	 * Returns a host binary that contains the data of the file at the specified path.
	 * @param path
	 */
	export function readFileSync(path: string): HostBinary;
}


declare module "piweb/resources/path" {
	export interface ParsedPath {
	    /**
	     * The root of the path such as '/' or 'c:\'
	     */
	    root: string;
	    /**
	     * The full directory path such as '/home/user/dir'
	     */
	    dir: string;
	    /**
	     * The file name including extension (if any) such as 'index.html'
	     */
	    base: string;
	    /**
	     * The file extension (if any) such as '.html'
	     */
	    ext: string;
	    /**
	     * The file name without extension (if any) such as 'index'
	     */
	    name: string;
	}
	/**
	 * The right-most parameter is considered {to}.  Other parameters are considered an array of {from}.
	 *
	 * Starting from leftmost {from} paramter, resolves {to} to an absolute path.
	 *
	 * If {to} isn't already absolute, {from} arguments are prepended in right to left order, until an absolute path is found. If after using all {from} paths still no absolute path is found, the current working directory is used as well. The resulting path is normalized, and trailing slashes are removed unless the path gets resolved to the root directory.
	 *
	 * @param pathSegments string paths to join.  Non-string arguments are ignored.
	 */
	export function resolve(...pathSegments: any[]): string;
	/**
	 * Normalize a string path, reducing '..' and '.' parts.
	 * When multiple slashes are found, they're replaced by a single one; when the path contains a trailing slash, it is preserved.
	 *
	 * @param p string path to normalize.
	 */
	export function normalize(p: string): string;
	/**
	 * Determines whether {path} is an absolute path. An absolute path will always resolve to the same location, regardless of the working directory.
	 *
	 * @param path path to test.
	 */
	export function isAbsolute(path: string): boolean;
	/**
	 * Join all arguments together and normalize the resulting path.
	 * Arguments must be strings.
	 *
	 * @param paths paths to join.
	 */
	export function join(...paths: string[]): string;
	/**
	 * Solve the relative path from {from} to {to}.
	 * At times we have two absolute paths, and we need to derive the relative path from one to the other. This is actually the reverse transform of path.resolve.
	 *
	 * @param from
	 * @param to
	 */
	export function relative(from: string, to: string): string;
	/**
	 * Return the directory name of a path. Similar to the Unix dirname command.
	 *
	 * @param p the path to evaluate.
	 */
	export function dirname(p: string): string;
	/**
	 * Return the last portion of a path. Similar to the Unix basename command.
	 * Often used to extract the file name from a fully qualified path.
	 *
	 * @param p the path to evaluate.
	 * @param ext optionally, an extension to remove from the result.
	 */
	export function basename(p: string, ext?: string): string;
	/**
	 * Return the extension of the path, from the last '.' to end of string in the last portion of the path.
	 * If there is no '.' in the last portion of the path or the first character of it is '.', then it returns an empty string
	 *
	 * @param p the path to evaluate.
	 */
	export function extname(p: string): string;
	/**
	 * Returns a path string from an object - the opposite of parse().
	 *
	 * @param pathString path to evaluate.
	 */
	export function format(pathObject: ParsedPath): string;
	/**
	 * Returns an object from a path string - the opposite of format().
	 *
	 * @param pathString path to evaluate.
	 */
	export function parse(pathString: string): ParsedPath;
	/**
	 * The path separator: '/'.
	 */
	export const sep: string;
	/**
	 * The path delimiter: ':'
	 */
	export const delimiter: string;
}




//declare var process: NodeJS.Process;
declare var global: NodeJS.Global;

declare var __filename: string;
declare var __dirname: string;

declare namespace NodeJS {
    export interface Global {
        global: Global;
        Buffer: typeof Buffer;
        console: typeof console;
    }
}

interface NodeRequireFunction {
    (id: string): any;
}

interface NodeRequire extends NodeRequireFunction {
    resolve(id: string): string;
    cache: any;
    extensions: any;
    main: any;
}

declare var require: NodeRequire;

interface NodeModule {
    exports: any;
    require: NodeRequireFunction;
    id: string;
    filename: string;
    loaded: boolean;
    parent: any;
    children: any[];
}

declare var module: NodeModule;
declare var exports: any;

// Buffer class
type BufferEncoding = "ascii" | "utf8" | "utf16le" | "ucs2" | "binary" | "hex";
interface Buffer extends NodeBuffer { }

/**
 * Raw data is stored in instances of the Buffer class.
 * A Buffer is similar to an array of integers but corresponds to a raw memory allocation outside the V8 heap.  A Buffer cannot be resized.
 * Valid string encodings: 'ascii'|'utf8'|'utf16le'|'ucs2'(alias of 'utf16le')|'base64'|'binary'(deprecated)|'hex'
 */
declare var Buffer: {
    /**
     * Allocates a new buffer containing the given {str}.
     *
     * @param str String to store in buffer.
     * @param encoding encoding to use, optional.  Default is 'utf8'
     */
    new (str: string, encoding?: string): Buffer;
    /**
     * Allocates a new buffer of {size} octets.
     *
     * @param size count of octets to allocate.
     */
    new (size: number): Buffer;
    /**
     * Allocates a new buffer containing the given {array} of octets.
     *
     * @param array The octets to store.
     */
    new (array: Uint8Array): Buffer;
    /**
     * Produces a Buffer backed by the same allocated memory as
     * the given {ArrayBuffer}.
     *
     *
     * @param arrayBuffer The ArrayBuffer with which to share memory.
     */
    new (arrayBuffer: ArrayBuffer): Buffer;
    /**
     * Allocates a new buffer containing the given {array} of octets.
     *
     * @param array The octets to store.
     */
    new (array: any[]): Buffer;
    /**
     * Copies the passed {buffer} data onto a new {Buffer} instance.
     *
     * @param buffer The buffer to copy.
     */
    new (buffer: Buffer): Buffer;
    prototype: Buffer;
    /**
     * Allocates a new Buffer using an {array} of octets.
     *
     * @param array
     */
    from(array: any[]): Buffer;
    /**
     * When passed a reference to the .buffer property of a TypedArray instance,
     * the newly created Buffer will share the same allocated memory as the TypedArray.
     * The optional {byteOffset} and {length} arguments specify a memory range
     * within the {arrayBuffer} that will be shared by the Buffer.
     *
     * @param arrayBuffer The .buffer property of a TypedArray or a new ArrayBuffer()
     * @param byteOffset
     * @param length
     */
    from(arrayBuffer: ArrayBuffer, byteOffset?: number, length?: number): Buffer;
    /**
     * Copies the passed {buffer} data onto a new Buffer instance.
     *
     * @param buffer
     */
    from(buffer: Buffer): Buffer;
    /**
     * Creates a new Buffer containing the given JavaScript string {str}.
     * If provided, the {encoding} parameter identifies the character encoding.
     * If not provided, {encoding} defaults to 'utf8'.
     *
     * @param str
     */
    from(str: string, encoding?: string): Buffer;
    /**
     * Returns true if {obj} is a Buffer
     *
     * @param obj object to test.
     */
    isBuffer(obj: any): obj is Buffer;
    /**
     * Returns true if {encoding} is a valid encoding argument.
     * Valid string encodings in Node 0.12: 'ascii'|'utf8'|'utf16le'|'ucs2'(alias of 'utf16le')|'base64'|'binary'(deprecated)|'hex'
     *
     * @param encoding string to test.
     */
    isEncoding(encoding: string): boolean;
    /**
     * Gives the actual byte length of a string. encoding defaults to 'utf8'.
     * This is not the same as String.prototype.length since that returns the number of characters in a string.
     *
     * @param string string to test.
     * @param encoding encoding used to evaluate (defaults to 'utf8')
     */
    byteLength(string: string, encoding?: string): number;
    /**
     * Returns a buffer which is the result of concatenating all the buffers in the list together.
     *
     * If the list has no items, or if the totalLength is 0, then it returns a zero-length buffer.
     * If the list has exactly one item, then the first item of the list is returned.
     * If the list has more than one item, then a new Buffer is created.
     *
     * @param list An array of Buffer objects to concatenate
     * @param totalLength Total length of the buffers when concatenated.
     *   If totalLength is not provided, it is read from the buffers in the list. However, this adds an additional loop to the function, so it is faster to provide the length explicitly.
     */
    concat(list: Buffer[], totalLength?: number): Buffer;
    /**
     * The same as buf1.compare(buf2).
     */
    compare(buf1: Buffer, buf2: Buffer): number;
    /**
     * Allocates a new buffer of {size} octets.
     *
     * @param size count of octets to allocate.
     * @param fill if specified, buffer will be initialized by calling buf.fill(fill).
     *    If parameter is omitted, buffer will be filled with zeros.
     * @param encoding encoding used for call to buf.fill while initalizing
     */
    alloc(size: number, fill?: string | Buffer | number, encoding?: string): Buffer;
    /**
     * Allocates a new buffer of {size} octets, leaving memory not initialized, so the contents
     * of the newly created Buffer are unknown and may contain sensitive data.
     *
     * @param size count of octets to allocate
     */
    allocUnsafe(size: number): Buffer;
    /**
     * Allocates a new non-pooled buffer of {size} octets, leaving memory not initialized, so the contents
     * of the newly created Buffer are unknown and may contain sensitive data.
     *
     * @param size count of octets to allocate
     */
    allocUnsafeSlow(size: number): Buffer;
};

/************************************************
*                                               *
*               GLOBAL INTERFACES               *
*                                               *
************************************************/

interface NodeBuffer extends Uint8Array {
    write(string: string, offset?: number, length?: number, encoding?: string): number;
    toString(encoding?: string, start?: number, end?: number): string;
    toJSON(): { type: 'Buffer', data: any[] };
    equals(otherBuffer: Buffer): boolean;
    compare(otherBuffer: Buffer, targetStart?: number, targetEnd?: number, sourceStart?: number, sourceEnd?: number): number;
    copy(targetBuffer: Buffer, targetStart?: number, sourceStart?: number, sourceEnd?: number): number;
    slice(start?: number, end?: number): Buffer;
    writeUIntLE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
    writeUIntBE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
    writeIntLE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
    writeIntBE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
    readUIntLE(offset: number, byteLength: number, noAssert?: boolean): number;
    readUIntBE(offset: number, byteLength: number, noAssert?: boolean): number;
    readIntLE(offset: number, byteLength: number, noAssert?: boolean): number;
    readIntBE(offset: number, byteLength: number, noAssert?: boolean): number;
    readUInt8(offset: number, noAssert?: boolean): number;
    readUInt16LE(offset: number, noAssert?: boolean): number;
    readUInt16BE(offset: number, noAssert?: boolean): number;
    readUInt32LE(offset: number, noAssert?: boolean): number;
    readUInt32BE(offset: number, noAssert?: boolean): number;
    readInt8(offset: number, noAssert?: boolean): number;
    readInt16LE(offset: number, noAssert?: boolean): number;
    readInt16BE(offset: number, noAssert?: boolean): number;
    readInt32LE(offset: number, noAssert?: boolean): number;
    readInt32BE(offset: number, noAssert?: boolean): number;
    readFloatLE(offset: number, noAssert?: boolean): number;
    readFloatBE(offset: number, noAssert?: boolean): number;
    readDoubleLE(offset: number, noAssert?: boolean): number;
    readDoubleBE(offset: number, noAssert?: boolean): number;
    swap16(): Buffer;
    swap32(): Buffer;
    swap64(): Buffer;
    writeUInt8(value: number, offset: number, noAssert?: boolean): number;
    writeUInt16LE(value: number, offset: number, noAssert?: boolean): number;
    writeUInt16BE(value: number, offset: number, noAssert?: boolean): number;
    writeUInt32LE(value: number, offset: number, noAssert?: boolean): number;
    writeUInt32BE(value: number, offset: number, noAssert?: boolean): number;
    writeInt8(value: number, offset: number, noAssert?: boolean): number;
    writeInt16LE(value: number, offset: number, noAssert?: boolean): number;
    writeInt16BE(value: number, offset: number, noAssert?: boolean): number;
    writeInt32LE(value: number, offset: number, noAssert?: boolean): number;
    writeInt32BE(value: number, offset: number, noAssert?: boolean): number;
    writeFloatLE(value: number, offset: number, noAssert?: boolean): number;
    writeFloatBE(value: number, offset: number, noAssert?: boolean): number;
    writeDoubleLE(value: number, offset: number, noAssert?: boolean): number;
    writeDoubleBE(value: number, offset: number, noAssert?: boolean): number;
    fill(value: any, offset?: number, end?: number): this;
    indexOf(value: string | number | Buffer, byteOffset?: number, encoding?: string): number;
    lastIndexOf(value: string | number | Buffer, byteOffset?: number, encoding?: string): number;
    entries(): IterableIterator<[number, number]>;
    includes(value: string | number | Buffer, byteOffset?: number, encoding?: string): boolean;
    keys(): IterableIterator<number>;
    values(): IterableIterator<number>;
}

/************************************************
*                                               *
*                   MODULES                     *
*                                               *
************************************************/

declare module "assert" {
    function internal(value: any, message?: string): void;
    namespace internal {
        export class AssertionError implements Error {
            name: string;
            message: string;
            actual: any;
            expected: any;
            operator: string;
            generatedMessage: boolean;

            constructor(options?: {
                message?: string; actual?: any; expected?: any;
                operator?: string; stackStartFunction?: Function
            });
        }

        export function fail(actual: any, expected: any, message: string, operator: string): void;
        export function ok(value: any, message?: string): void;
        export function equal(actual: any, expected: any, message?: string): void;
        export function notEqual(actual: any, expected: any, message?: string): void;
        export function deepEqual(actual: any, expected: any, message?: string): void;
        export function notDeepEqual(acutal: any, expected: any, message?: string): void;
        export function strictEqual(actual: any, expected: any, message?: string): void;
        export function notStrictEqual(actual: any, expected: any, message?: string): void;
        export function deepStrictEqual(actual: any, expected: any, message?: string): void;
        export function notDeepStrictEqual(actual: any, expected: any, message?: string): void;
        export var throws: {
            (block: Function, message?: string): void;
            (block: Function, error: Function, message?: string): void;
            (block: Function, error: RegExp, message?: string): void;
            (block: Function, error: (err: any) => boolean, message?: string): void;
        };

        export var doesNotThrow: {
            (block: Function, message?: string): void;
            (block: Function, error: Function, message?: string): void;
            (block: Function, error: RegExp, message?: string): void;
            (block: Function, error: (err: any) => boolean, message?: string): void;
        };

        export function ifError(value: any): void;
    }

    export = internal;
}

declare module "buffer" {
    export var INSPECT_MAX_BYTES: number;
    var BuffType: typeof Buffer;
    export { BuffType as Buffer };
}

declare module "util" {
    export interface InspectOptions {
        showHidden?: boolean;
        depth?: number;
        colors?: boolean;
        customInspect?: boolean;
    }

    export function format(format: any, ...param: any[]): string;
    // export function debug(string: string): void;
    // export function error(...param: any[]): void;
    // export function puts(...param: any[]): void;
    // export function print(...param: any[]): void;
    export function log(format: any, ...param: any[]): void;
    export function inspect(object: any, showHidden?: boolean, depth?: number, color?: boolean): string;
    export function inspect(object: any, options: InspectOptions): string;
    export function isArray(object: any): boolean;
    export function isRegExp(object: any): boolean;
    export function isDate(object: any): boolean;
    export function isError(object: any): boolean;
    export function inherits(constructor: any, superConstructor: any): void;
    export function debuglog(key: string): (msg: string, ...param: any[]) => void;
    export function isBoolean(object: any): boolean;
    export function isBuffer(object: any): boolean;
    export function isFunction(object: any): boolean;
    export function isNull(object: any): boolean;
    export function isNullOrUndefined(object: any): boolean;
    export function isNumber(object: any): boolean;
    export function isObject(object: any): boolean;
    export function isPrimitive(object: any): boolean;
    export function isString(object: any): boolean;
    export function isSymbol(object: any): boolean;
    export function isUndefined(object: any): boolean;
    //export function deprecate(fn: Function, message: string): Function;
}

declare module "iter" {
    export interface Comparer<T> {
        (a: T, b: T): number;
    }

    export interface Equals<T> {
        (a: T, b: T): boolean;
    }

    export interface Combine<T, U> {
        (a: T, b: U): U;
    }

    export interface Transform<T, U> {
        (a: T): U;
    }

    export interface Predicate<T> {
        (a: T): boolean;
    }

    export interface Process<T> {
        (a: T): void;
    }

    export interface Generator<T> {
        (): Iterator<T>;
    }

    export interface IndexValue<T> {
		index: number;
		value: T;
    }

    export interface MismatchResult<T> {
        lhsValue: T;
        rhsValue: T;
        index: number;
    }

    export interface MinmaxResult<T> {
        min: T;
        max: T;
    }

    export interface Iter<T> extends Iterable<T> {
		/**
		 * Applies a transformation function to each value in an iter. The returned iter contains the transformed values.
		 * @param {transform} transform The transformation function to apply.
		 * @example
		 * const it = iter([1, 2, 3, 4]).map(x => x * 2);
		 * // 'it' contains: 2, 4, 6, 8
		 * @returns {iter_type}
		 */
		map<U>(transform: Transform<T, U>): Iter<U>;
		/**
		 * Filters an iter based on a predicate function. The returned iter contains only values for which the predicate function returns true.
		 * @param {predicate} predicate The predicate function used to determine whether each value is in the returned iter.
		 * @example
		 * const it = iter([1, 2, 3, 4]).filter(x => x % 2 === 0);
		 * // 'it' contains: 2, 4
		 * @returns {iter_type}
		 */
        filter(predicate: Predicate<T>): Iter<T>;
		/**
		 * Takes a number of values from this iter, and discards all later values.
		 * @param {number|predicate} numberOrPredicate If a number, then this is the number of values to take from the iter. If a predicate, then values are taken from the iter as long as the predicate returns true. As soon as it returns false, the returned iter ends.
		 * @example
		 * const it = iter(['a', 'b', 'c', 'd', 'e']).take(3);
		 * // 'it' contains: 'a', 'b', 'c'
		 * @example
		 * const it = iter(1, 2, 3, 2, 4).take(x => x < 3);
		 * // 'it' contains: 1, 2
		 * @returns {iter_type}
		 */
		take(numberOrPredicate: (number | Predicate<T>)): Iter<T>;
        skip(numberOrPredicate: (number | Predicate<T>)): Iter<T>;
        do(process: Process<T>): Iter<T>;
        buffer(size: number): Iter<T[]>;
        window(size: number): Iter<T[]>;
        flatten<U>(transform?: Transform<T, Iterable<U>>): Iter<U>;
        filterConsecutiveDuplicates(equals?: Equals<T>): Iter<T>;
        scan(combine: Combine<T, T>, seed?: T): Iter<T>;
        scan<U>(combine: Combine<T, U>, seed: U): Iter<U>;
        concat(...others: Iterable<T>[]): Iter<T>;
        concat(...others: Iterable<any>[]): Iter<any>;
        repeat(count?: number): Iter<T>;
        zip(...others: Iterable<T>[]): Iter<T[]>;
        zip(...others: Iterable<any>[]): Iter<any[]>;
        merge(other: Iterable<T>, comparer?: Comparer<T>): Iter<T>;
        setUnion(other: Iterable<T>, comparer?: Comparer<T>): Iter<T>;
        setIntersection(other: Iterable<T>, comparer?: Comparer<T>): Iter<T>;
        setSymmetricDifference(other: Iterable<T>, comparer?: Comparer<T>): Iter<T>;
        setDifference(other: Iterable<T>, comparer?: Comparer<T>): Iter<T>;
		interleave<U>(other: Iterable<U>): Iter<(T | U)>;
		
		/**
		 * Returns an index-value-pair for each value in this iter.
		 * @example
		 * const it = iter(['a', 'b', 'c']).enumerate();
		 * // 'it' contains: {index: 0, value: 'a'}, {index: 1, value: 'b'}, {index: 2, value: 'c'}
		 */
		enumerate(): Iter<IndexValue<T>>;

		/**
		 * Iterates through the values of this iter, invoking a processing function for each value.
		 * @param {process} [process] The function to call for each value. If not specified, this function will still iterate through the values of this iter, causing any side effects.
		 * @example
		 * let result = 0;
		 * iter([1, 2, 3]).forEach(x => { result += x; });
		 * // result: 6
		 */
        forEach(process: Process<T>): void;
		/**
		 * Determines the number of values in this iter. This function will iterate through the entire iter.
		 * @example
		 * const result = iter([1, 2, 3]).count();
		 * // result: 3
		 * @returns {number}
		 */
		count(): number;
		/**
		 * Determines whether an iter is empty.
		 * @example
		 * const result = iter([1, 2, 3]).isEmpty();
		 * // result: false
		 * @example
		 * const result = iter().isEmpty();
		 * // result: true
		 * @returns {boolean}
		 */
        isEmpty(): boolean;
		/**
		 * Returns the first value in this iter. If this iter is empty, this function returns undefined.
		 * @example
		 * const result = iter(['bob', 'sue']).first();
		 * // result: 'bob'
		 * @example
		 * const result = iter().first();
		 * // result: undefined
		 */
		first(predicate?: Predicate<T> | undefined): T | undefined;
		/**
		 * Returns the last value in this iter. If this iter is empty, this function returns undefined.
		 * @example
		 * const result = iter(['bob', 'beth', 'sue']).last();
		 * // result: 'sue'
		 * @example
		 * const result = iter().last();
		 * // result: undefined
		 */
		last(): T | undefined;
		/**
		 * Returns a specified value from this iter. If this iter is empty, this function returns undefined.
		 * @param {number} index The index of the value to return.
		 * @example
		 * const result = iter(['bob', 'beth', 'sue']).at(1);
		 * // result: 'beth'
		 * @example
		 * const result = iter(['bob', 'beth', 'sue']).at(100);
		 * // result: undefined
		 */
		at(index: number): T | undefined;
		/**
		 * Returns the first value in this iter that satisfies a predicate. If this iter is empty, this function returns undefined.
		 * @param {predicate} predicate The function used to determine whether this is the value we're searching for.
		 * @example
		 * const result = iter(['bob', 'beth', 'sue']).find(x => x[0] === 's');
		 * // result: { value: 'sue', index: 2 }
		 * @example
		 * const result = iter(['bob', 'beth', 'sue']).find(x => x[0] === 'x');
		 * // result: undefined
		 */
		find(predicate: Predicate<T>): T | undefined;
		/**
		 * Determines whether the specified predicate returns true for every value in this iter.
		 * @param {predicate} predicate The predicate to evaluate for each value in this iter.
		 * @example
		 * const result = iter(['bob', 'beth', 'sue']).every(x => typeof x === 'string');
		 * // result: true
		 * @returns {boolean}
		 */
		every(predicate: Predicate<T>): boolean;
		/**
		 * Determines whether the specified predicate returns true for any value in this iter.
		 * @param {predicate} predicate The predicate to evaluate for each value in this iter.
		 * @example
		 * const result = iter(['bob', 'beth', 'sue']).some(x => x[0] === 's');
		 * // result: true
		 * @returns {boolean}
		 */
		some(predicate: Predicate<T>): boolean;
		/**
		 * Determines the minimum value in this iter. Returns the minimum value. If this iter is empty, this function returns undefined.
		 * @param {comparer} [comparer] A callback used to compare items. If not specified, this function uses the < and > operators to compare items.
		 * @example
		 * const result = iter(['bob', 'beth', 'sue']).min();
		 * // result: 'beth'
		 */
		min(comparer?: Comparer<T>): T | undefined;
		/**
		 * Determines the maximum value in this iter. Returns the maximum value. If this iter is empty, this function returns undefined.
		 * @param {comparer} [comparer] A callback used to compare items. If not specified, this function uses the < and > operators to compare items.
		 * @example
		 * const result = iter(['bob', 'beth', 'sue']).max();
		 * // result: 'sue'
		 */
		max(comparer?: Comparer<T>): T | undefined;
		/**
		 * Returns the minimum value and the maximum value. If this iter is empty, this function returns undefined.
		 * @param {comparer} [comparer] A callback used to compare items. If not specified, this function uses the < and > operators to compare items.
		 * @example
		 * const result = iter(['bob', 'beth', 'sue']).minmax();
		 * // result: { min: 'beth', max: 'sue' }
		 */
        minmax(comparer?: Comparer<T>): MinmaxResult<T> | undefined;
		/**
		 * Applies a combiner/accumulator function over this iter, and returns the final value of the combination.
		 * @param {combine} combine The callback used to combine values.
		 * @param {*} [seed] The initial value of the combination. If not specified, then the initial value of the combination is the first value of the iter.
		 * @example
		 * const result = iter([1, 2, 3, 4]).fold((x, y) => x + y);
		 * // result: 10
		 * @example
		 * const result = iter([1, 2, 3, 4]).fold((x, y) => x + y, 13);
		 * // result: 23
		 * @returns {*}
		 */
		fold(combine: Combine<T, T>, seed?: T): T;
		/**
		 * Applies a combiner/accumulator function over this iter, and returns the final value of the combination.
		 * @param {combine} combine The callback used to combine values.
		 * @param {*} [seed] The initial value of the combination. If not specified, then the initial value of the combination is the first value of the iter.
		 * @example
		 * const result = iter([1, 2, 3, 4]).fold((x, y) => x + y);
		 * // result: 10
		 * @example
		 * const result = iter([1, 2, 3, 4]).fold((x, y) => x + y, 13);
		 * // result: 23
		 * @returns {*}
		 */
		fold<U>(combine: Combine<T, U>, seed: U): U;
		/**
		 * Builds an array from the values in this iter.
		 * @example
		 * const result = iter.range(1).take(3).toArray();
		 * // result: [1, 2, 3]
		 * @returns {Array}
		 */
		toArray(): T[];
		/**
		 * Builds an object from the values in this iter.
		 * @param {transformString} nameSelector A function used to get the property name from a value in this iter.
		 * @param {transform} [valueSelector] A function used to get the property value from a value in this iter. If not specified, the iter values are used as the property values.
		 * @example
		 * const result = iter.range(1).take(3).toObject(x => 'val' + x);
		 * // result: { val1: 1, val2: 2, val3: 3 }
		 * @returns {object}
		 */
		toObject(nameSelector: Transform<T, string>): { [name: string]: T };
		/**
		 * Builds an object from the values in this iter.
		 * @param {transformString} nameSelector A function used to get the property name from a value in this iter.
		 * @param {transform} [valueSelector] A function used to get the property value from a value in this iter. If not specified, the iter values are used as the property values.
		 * @example
		 * const result = iter.range(1).take(3).toObject(x => 'val' + x);
		 * // result: { val1: 1, val2: 2, val3: 3 }
		 * @returns {object}
		 */
		toObject<U>(nameSelector: Transform<T, string>, valueSelector: Transform<T, U>): { [name: string]: U };
		/**
		 * Builds a map from the values in this iter.
		 * @param {transform} keySelector A function used to get the map key from a value in this iter.
		 * @param {transform} [valueSelector] A function used to get the map value from a value in this iter. If not specified, the iter values are used as the map values.
		 * @example
		 * const result = iter.range(1).take(3).toMap(x => 'val' + x);
		 * // result: new Map([[val1, 1], [val2, 2], [val3, 3]])
		 * @returns {Map}
		 */
		toMap<K>(keySelector: Transform<T, K>): Map<K, T>;
		/**
		 * Builds a map from the values in this iter.
		 * @param {transform} keySelector A function used to get the map key from a value in this iter.
		 * @param {transform} [valueSelector] A function used to get the map value from a value in this iter. If not specified, the iter values are used as the map values.
		 * @example
		 * const result = iter.range(1).take(3).toMap(x => 'val' + x);
		 * // result: new Map([[val1, 1], [val2, 2], [val3, 3]])
		 * @returns {Map}
		 */
		toMap<K, V>(keySelector: Transform<T, K>, valueSelector: Transform<T, V>): Map<K, V>;
		/**
		 * Builds a set from the values in this iter.
		 * @example
		 * const result = iter.range(1).take(3).toSet();
		 * // result: new Set([1, 2, 3])
		 * @returns {Set}
		 */
		toSet(): Set<T>;
		/**
		 * Determines whether this iter is equivalent to another iterable (that is, they are the same length and contain equivalent values in the same positions).
		 * @param {iterable} otherIterable The other iterable.
		 * @param {equals} [equals] A callback used to determine item equality. If not specified, this function uses "Object.is".
		 * @example
		 * const result = iter([1, 2]).equal([1, 2]);
		 * // result: true
		 * @example
		 * const result = iter([1, 2]).equal([2, 2]);
		 * // result: false
		 * @returns {boolean}
		 */
		equal(other: Iterable<T>, equals?: Equals<T>): boolean;
		/**
		 * Finds the first mismatch between this iter and another iterable. Returns an object containing the value from this iter, the value from the other iter, and the index of the values. If one iterable ends before the other, that iterable's value returned as "undefined". If no mismatch is found, then this function returns undefined.
		 * @param {iterable} otherIterable The other iterable.
		 * @param {equals} [equals] A callback used to determine item equality. If not specified, this function uses "Object.is".
		 * @example
		 * const result = iter([1, 2]).findMismatch([2, 2]);
		 * // result: { lhsValue: 1, rhsValue: 2, index: 0 }
		 * @example
		 * const result = iter([1, 2]).findMismatch([1, 2]);
		 * // result: undefined
		 * @returns {mismatch_result}
		 */
        findMismatch(other: Iterable<T>, equals?: Equals<T>): MismatchResult<T> | undefined;
    }

	/**
	 * Creates an iter from an iterable object or generator function. If no argument is passed, creates an empty iter.
	 * @param {(Object|GeneratorFunction)} [fnOrObject] If undefined, the returned iter is empty. If an iterable object, the returned iter is a wrapper around that iterable. If a generator function, the returned iter is a wrapper around that function.
	 * @example
	 * const it = iter([3, 5, 7]);
	 * // 'it' contains: 3, 5, 7
	 * @example
	 * const it = iter(function *() {
	 *   yield 13;
	 *   yield 17;
	 * });
	 * // 'it' contains: 13, 17
	 * @returns {iter_type}
	 */
    export function iter<T>(fnOrObject: (Iterable<T> | Generator<T>)): Iter<T>;
    export namespace iter {
        function values<T>(...items: T[]): Iter<T>;
        function range(start: number, end?: number): Iter<number>;
        function repeat<T>(value: T, count?: number): Iter<T>;
        function concat<T>(...iterables: Iterable<T>[]): Iter<T>;
        function concat(...iterables: Iterable<any>[]): Iter<any>;
        function zip<T>(...iterables: Iterable<T>[]): Iter<T[]>;
        function zip(...iterables: Iterable<any>[]): Iter<any[]>;
        function compare<T>(lhs: Iterable<T>, rhs: Iterable<T>, comparer?: Comparer<T>): number;
        function equal<T>(lhs: Iterable<T>, rhs: Iterable<T>, equals?: Equals<T>): boolean;
        function findMismatch<T>(lhs: Iterable<T>, rhs: Iterable<T>, equals?: Equals<T>): MismatchResult<T>;
        function merge<T>(lhs: Iterable<T>, rhs: Iterable<T>, comparer?: Comparer<T>): Iter<T>;
        function setUnion<T>(lhs: Iterable<T>, rhs: Iterable<T>, comparer?: Comparer<T>): Iter<T>;
        function setIntersection<T>(lhs: Iterable<T>, rhs: Iterable<T>, comparer?: Comparer<T>): Iter<T>;
        function setSymmetricDifference<T>(lhs: Iterable<T>, rhs: Iterable<T>, comparer?: Comparer<T>): Iter<T>;
        function setDifference<T>(lhs: Iterable<T>, rhs: Iterable<T>, comparer?: Comparer<T>): Iter<T>;
        function interleave<T, U>(lhs: Iterable<T>, rhs: Iterable<U>): Iter<(T | U)>;
	}
}
