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
	import { Drawing } from "piweb/drawing";
	export function execOnRender(plotContext: any): Drawing;
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


declare module "internal/tooltip_broker" {
	export function getTooltipShapes(): Buffer;
}


declare module "piweb/environment" {
	import { Point, Size } from "piweb/drawing/geometry/basics";
	export type LengthUnit = "mm" | "inch";
	export type AngleUnit = "degreeDecimal" | "degreeMinuteSecond" | "radian";
	export interface RegionInfoDescription {
	    readonly name: string;
	}
	export interface IRegionInfo extends RegionInfoDescription {
	    readonly twoLetterISORegionName: string;
	    readonly threeLetterISORegionName: string;
	}
	export interface CultureInfoDescription {
	    readonly name: string;
	}
	export interface ICultureInfo extends CultureInfoDescription {
	    readonly twoLetterISOLanguageName: string;
	    readonly threeLetterISOLanguageName: string;
	}
	export interface ITimeZoneInfo {
	    readonly name: string;
	    readonly baseUtcOffset: number;
	    getUtcOffset(time: Date): number;
	}
	export class CultureInfo implements ICultureInfo {
	    static readonly currentCulture: ICultureInfo;
	    static readonly invariantCulture: ICultureInfo;
	    readonly name: string;
	    readonly twoLetterISOLanguageName: string;
	    readonly threeLetterISOLanguageName: string;
	    constructor(name: string);
	}
	export class RegionInfo implements IRegionInfo {
	    static readonly currentRegion: IRegionInfo;
	    readonly name: string;
	    readonly twoLetterISORegionName: string;
	    readonly threeLetterISORegionName: string;
	    constructor(name: string);
	}
	export class TimeZoneInfo implements ITimeZoneInfo {
	    static readonly LocalTimeZone: ITimeZoneInfo;
	    readonly name: string;
	    readonly baseUtcOffset: number;
	    constructor(name: string);
	    getUtcOffset(date: Date): any;
	}
	export function isDesignMode(): boolean;
	export function getSize(): Size;
	export function getLocation(): Point;
	export const toolboxItemName: string;
	export const clientString: string;
	export const clientVersion: string;
	export const apiVersion: string;
	export function getLengthUnit(): LengthUnit;
	export function getAngleUnit(): AngleUnit;
}


declare module "piweb/events" {
	export type PiWebEvents = "load" | "render" | "dataBindingChanged" | "dataChanged" | "prepare_render";
	export function on(name: PiWebEvents, callback: Function): any;
	export function emit(name: PiWebEvents): boolean;
}


declare module "piweb/expressions" {
	export type SimpleExtensionDataType = string | number | Date | undefined;
	export interface ExtensionDataTypeArray extends Array<SimpleExtensionDataType | ExtensionDataTypeArray> {
	}
	export type ExpressionDataType = SimpleExtensionDataType | ExtensionDataTypeArray;
	export function evaluate(expression: string): ExpressionDataType;
}


declare module "piweb/format" {
	import { CultureInfoDescription } from "piweb/environment";
	export type DateKind = "assumeUtc" | "assumeLocal";
	export function formatNumber(value: number, formatString: string, culture?: CultureInfoDescription): string;
	export function parseNumber(str: string, culture?: CultureInfoDescription): number;
	export function formatDate(date: Date, offsetHours?: number, format?: string, culture?: CultureInfoDescription): string;
	export function parseDate(str: string, culture?: CultureInfoDescription, dateKind?: DateKind): Date;
	export function parseDateExact(str: string, format?: string, culture?: CultureInfoDescription, dateKind?: DateKind): Date;
}


declare module "piweb" {
	import * as drawing from "piweb/drawing";
	export { drawing };
	import * as data from "piweb/data";
	export { data };
	import * as logger from 'piweb/logger';
	export { logger };
	import * as tooltips from 'piweb/tooltips/tooltip_shape_provider';
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
	export function debug(format: any, ...param: any[]): void;
	export function info(format: any, ...param: any[]): void;
	export function warn(format: any, ...param: any[]): void;
	export function error(format: any, ...param: any[]): void;
}


declare module "piweb/properties" {
	import { Color, Brush, Pen, Font } from "piweb/drawing";
	export function getBooleanProperty(id: string): boolean;
	export function getStringProperty(id: string): string;
	export function getIntegerProperty(id: string): number;
	export function getDoubleProperty(id: string): number;
	export function getColorProperty(id: string): Color;
	export function getBrushProperty(id: string): Brush;
	export function getPenProperty(id: string): Pen;
	export function getFontProperty(id: string): Font;
	export function getEnumProperty(id: string): string;
}


declare module "piweb/data/attributes" {
	import { BufferReader } from 'internal/buffer_reader';
	export type AttributeType = "string" | "integer" | "float" | "date" | "catalog";
	export const enum AttributeTypeId {
	    String = 0,
	    Integer = 1,
	    Float = 2,
	    Date = 3,
	    Catalog = 4,
	}
	export function mapAttributeType(attributeType: AttributeTypeId): AttributeType;
	export type AttributeValue = string | number | Date;
	export class Attribute {
	    constructor(key: number, type: AttributeType, value: AttributeValue);
	    key: number;
	    type: AttributeType;
	    value: AttributeValue;
	}
	export interface IAttributeItem {
	    attributeCount: number;
	    getAttribute(key: number): Attribute | undefined;
	    getAttributeKeys(): number[];
	    allAttributes(): Attribute[];
	}
	export class AttributeItem implements IAttributeItem {
	    readonly _attributes: Map<number, Attribute>;
	    constructor(attributes: ArrayLike<Attribute>);
	    readonly attributeCount: number;
	    getAttributeKeys(): number[];
	    getAttribute(key: number): Attribute | undefined;
	    allAttributes(): Attribute[];
	}
	export function readAttributes(source: BufferReader): Attribute[];
}


declare module "piweb/data/configuration" {
	import { AttributeItem, Attribute, AttributeType } from "piweb/data/attributes";
	export function getConfiguration(): Configuration;
	export type ConfigurationEntity = "characteristic" | "part" | "measurement" | "measurementValue" | "catalog";
	export class AttributeDefinition {
	    key: number;
	    description: string;
	    dataType: AttributeType;
	    entityType: ConfigurationEntity;
	    catalogRef: string | undefined;
	    constructor(key: number, description: string, dataType: AttributeType, entityType: ConfigurationEntity, catalogRef: string | undefined);
	}
	export class Configuration {
	    partAttributes: Map<number, AttributeDefinition>;
	    characteristicAttributes: Map<number, AttributeDefinition>;
	    measurementAttributes: Map<number, AttributeDefinition>;
	    measurementValueAttributes: Map<number, AttributeDefinition>;
	    catalogAttributes: Map<number, AttributeDefinition>;
	    allAttributes: Map<number, AttributeDefinition>;
	    catalogs: CatalogCollection;
	    constructor(definitions: ArrayLike<AttributeDefinition>, catalogs: ArrayLike<Catalog>);
	    resolveCatalogEntry(attribute: Attribute): CatalogEntry | undefined;
	}
	export class CatalogCollection {
	    private readonly _idMap;
	    constructor(catalogs: ArrayLike<Catalog>);
	    readonly length: number;
	    all(): Catalog[];
	    findByReference(ref: string): Catalog | undefined;
	}
	export class Catalog {
	    catalogRef: string;
	    name: string;
	    validAttributes: number[];
	    entries: Map<number, CatalogEntry>;
	    constructor(reference: string, name: string, validAttributes: ArrayLike<number>, entries: ArrayLike<CatalogEntry>);
	    getCatalogGuid(): string;
	}
	export class CatalogEntry extends AttributeItem {
	    key: number;
	    constructor(key: number, attributes: ArrayLike<Attribute>);
	    toString(): string;
	    getInspectionString(): string;
	}
}


declare module "piweb/data" {
	export { DataReference, BasicDataReference } from "piweb/data/references";
	export { AttributeItem, Attribute, AttributeType, AttributeValue } from "piweb/data/attributes";
	export { getRawDataCollection, RawDataCollection, RawDataItem, getRawDataSources, setRawDataSources, RawDataSource } from "piweb/data/raw_data";
	export { getInspectionPlanCollection, InspectionPlanCollection, InspectionPlanItem, InspectionPlanItemType } from "piweb/data/inspection";
	export { getMeasurementCollection, MeasurementCollection, Measurement, MeasurementValue } from "piweb/data/measurements";
	export { getConfiguration, Configuration, AttributeDefinition, ConfigurationEntity, CatalogCollection, Catalog, CatalogEntry } from "piweb/data/configuration";
	export { WellKnownKeys } from "piweb/data/wellknown_keys";
	import * as path from "piweb/data/path";
	export { path };
}


declare module "piweb/data/inspection" {
	import { Attribute, AttributeItem } from "piweb/data/attributes";
	import { DataReference } from "piweb/data/references";
	export type InspectionPlanItemType = "characteristic" | "part";
	export class InspectionPlanItem extends AttributeItem implements DataReference {
	    readonly inspectionRef: string;
	    readonly parentRef?: string;
	    readonly type: InspectionPlanItemType;
	    readonly path: string;
	    readonly name: string;
	    constructor(reference: string, parentReference: string | undefined, type: InspectionPlanItemType, path: string, attributes: ArrayLike<Attribute>);
	    getInspectionGuid(): string;
	}
	export class InspectionPlanCollection {
	    private readonly _idMap;
	    private readonly _pathMap;
	    constructor(items: ArrayLike<InspectionPlanItem>);
	    readonly length: number;
	    all(): InspectionPlanItem[];
	    findByReference(reference: DataReference): InspectionPlanItem | undefined;
	    findByPath(path: string): InspectionPlanItem | undefined;
	    findParent(item: InspectionPlanItem): InspectionPlanItem | undefined;
	    findChildren(item: InspectionPlanItem): InspectionPlanItem[];
	}
	export function getInspectionPlanCollection(): InspectionPlanCollection;
}


declare module "piweb/data/measurements" {
	import { Attribute, AttributeItem } from "piweb/data/attributes";
	import { DataReference } from "piweb/data/references";
	export class MeasurementCollection {
	    private readonly _idMap;
	    constructor(measurements: ArrayLike<Measurement>);
	    readonly length: number;
	    all(): Measurement[];
	    findMeasurementByReference(reference: DataReference): Measurement | undefined;
	    findValueByReference(reference: DataReference): MeasurementValue | undefined;
	}
	export class Measurement extends AttributeItem implements DataReference {
	    readonly measurementRef: string;
	    readonly _partRef: string;
	    readonly _values: Map<string, MeasurementValue>;
	    constructor(reference: string, partReference: string, attributes: ArrayLike<Attribute>, values: ArrayLike<MeasurementValue>);
	    getMeasurementGuid(): string;
	    findValueByReference(reference: DataReference): MeasurementValue | undefined;
	    readonly valueCount: number;
	    allValues(): MeasurementValue[];
	}
	export class MeasurementValue extends AttributeItem implements DataReference {
	    inspectionRef: string;
	    _measurement: Measurement;
	    readonly measurementRef: string;
	    constructor(characteristicReference: string, attributes: ArrayLike<Attribute>);
	    getMeasurementGuid(): string;
	    getInspectionGuid(): string;
	}
	export function getMeasurementCollection(): MeasurementCollection;
}


declare module "piweb/data/path" {
	export { dirname, basename, extname, isAbsolute, join, parse, relative, format, normalize, sep } from "piweb/resources/path";
	/**
	 * Resolves {pathSegments} to an absolute path.
	 *
	 * If the right most argument isn't already absolute, arguments are prepended in right to left order, until an absolute path is found. If after using all paths still no absolute path is found, the path is considered relative to the root.
	 * The resulting path is normalized, and trailing slashes are removed unless the path gets resolved to the root directory.
	 *
	 * @param pathSegments string paths to join.  Non-string arguments are ignored.
	 */
	export function resolve(...pathSegments: any[]): string;
}


declare module "piweb/data/raw_data" {
	import { HostBinary } from 'piweb/resources/host_binary';
	import { DataReference } from 'piweb/data/references';
	export type EntityType = "part" | "characteristic" | "measurement" | "measurementValue";
	export class RawDataItem implements DataReference {
	    inspectionRef?: string;
	    measurementRef?: string;
	    _checkSumBytes: Buffer;
	    entityType: EntityType;
	    key: number;
	    name: string;
	    size: number;
	    mimeType?: string;
	    created: Date;
	    lastModified: Date;
	    getCheckSum(): string;
	    getInspectionGuid(): string | undefined;
	    getMeasurementGuid(): string | undefined;
	    getDataBuffer(): Buffer | undefined;
	    getData(): HostBinary | undefined;
	}
	export class RawDataCollection {
	    private readonly _items;
	    constructor(items: RawDataItem[]);
	    readonly length: number;
	    all(): RawDataItem[];
	    findByName(...wildcards: string[]): RawDataItem[];
	    findByReference(reference: DataReference): RawDataItem[];
	}
	export function getRawDataCollection(): RawDataCollection;
	export type RawDataSource = "parts" | "characteristics" | "measurements" | "measurementValues";
	export function setRawDataSources(sources: ArrayLike<RawDataSource>): void;
	export function getRawDataSources(): void;
}


declare module "piweb/data/references" {
	export interface DataReference {
	    inspectionRef?: string;
	    measurementRef?: string;
	}
	export class BasicDataReference implements DataReference {
	    constructor(inspectionReference: DataReference | string | undefined, measurementReference: DataReference | string | undefined);
	    inspectionRef?: string;
	    measurementRef?: string;
	}
}


declare module "piweb/data/wellknown_keys" {
	export namespace WellKnownKeys {
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
	        const LowerNaturallyBoundary: number;
	        const UpperNaturallyBoundary: number;
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
	export interface DrawingContext {
	    drawLine(start: PointDescription, end: PointDescription): void;
	    drawLines(lines: PointDescription[]): void;
	    drawRectangle(x: number, y: number, w: number, h: number): void;
	    drawEllipse(center: PointDescription, radiusX: number, radiusY: number): void;
	    drawGeometry(geometry: GeometryDescription, settings?: GeometryDrawingSettingsDescription): void;
	    drawText(text: FormattedTextDescription | string, settings?: TextDrawingSettingsDescription): void;
	    drawImage(image: Bitmap, settings?: ImageDrawingSettingsDescription): void;
	    drawDrawing(drawing: Drawing, settings?: GeometryDrawingSettingsDescription): void;
	    setPen(pen: PenDescription): void;
	    noPen(): void;
	    setBrush(brush: BrushDescription): void;
	    noBrush(): void;
	    pushTransform(transformation: TransformDescription): void;
	    pushClip(geometry: GeometryDescription): void;
	    pushOpacity(opacity: number): void;
	    pop(): void;
	    close(): void;
	}
	export interface DrawingMeasurements {
	    x: number;
	    y: number;
	    width: number;
	    height: number;
	}
	export class Drawing implements Serializable {
	    private _internals;
	    constructor();
	    open(): DrawingContext;
	    serialize(writer: BufferWriter): void;
	    measure(): DrawingMeasurements;
	    private getBytes();
	    private getLength();
	}
}


declare module "piweb/drawing/drawing_ids" {
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
	export const enum GeometryId {
	    Line = 1,
	    Rectangle = 2,
	    Ellipse = 3,
	    Path = 4,
	    Combined = 5,
	    Group = 6,
	    Custom = 7,
	}
	export const enum BrushId {
	    None = 0,
	    SolidColor = 1,
	    LinearGradient = 2,
	    RadialGradient = 3,
	}
	export const enum PenId {
	    None = 0,
	    Direct = 1,
	}
	export const enum LineJoinId {
	    Bevel = 0,
	    Miter = 1,
	    Round = 2,
	}
	export const enum LineCapId {
	    Flat = 0,
	    Round = 1,
	    Square = 2,
	}
	export const enum GeometryCombineModeId {
	    Union = 0,
	    Intersect = 1,
	    Xor = 2,
	    Exclude = 3,
	}
	export const enum FillRuleId {
	    EvenOdd = 0,
	    Nonzero = 1,
	}
	export const enum TransformationId {
	    Identity = 0,
	    Translation = 1,
	    Rotation = 2,
	    Scaling = 3,
	    Shear = 4,
	    Matrix = 5,
	    Group = 6,
	}
	export const enum PathSegmentId {
	    Arc = 1,
	    Bezier = 2,
	    Line = 3,
	    QuadraticBezier = 4,
	    PolyBezier = 5,
	    PolyLine = 6,
	    PolyQuadraticBezier = 7,
	}
	export const enum SweepDirectionId {
	    Clockwise = 0,
	    Counterclockwise = 1,
	}
	export const enum ArcTypeId {
	    Small = 0,
	    Large = 1,
	}
	export const enum FlowDirectionId {
	    LeftToRight = 0,
	    RightToLeft = 1,
	}
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
	export const enum FontStyleId {
	    Normal = 0,
	    Oblique = 1,
	    Italic = 2,
	}
	export const enum HorizontalTextAlignmentId {
	    Left = 0,
	    Right = 1,
	    Center = 2,
	    Justify = 3,
	}
	export const enum VerticalTextAlignmentId {
	    Top = 0,
	    Bottom = 1,
	    Center = 2,
	}
	export const enum VerticalTextAnchorId {
	    Default = 0,
	    Top = 1,
	    Bottom = 2,
	    Center = 3,
	    BaseLine = 4,
	}
	export const enum HorizontalTextAnchorId {
	    Default = 0,
	    Left = 1,
	    Right = 2,
	    Center = 3,
	}
	export const enum VerticalImageAnchorId {
	    Top = 0,
	    Bottom = 1,
	    Center = 2,
	}
	export const enum HorizontalImageAnchorId {
	    Left = 0,
	    Right = 1,
	    Center = 2,
	}
	export const enum VerticalAnchorId {
	    Origin = 0,
	    Top = 1,
	    Bottom = 2,
	    Center = 3,
	}
	export const enum HorizontalAnchorId {
	    Origin = 0,
	    Left = 1,
	    Right = 2,
	    Center = 3,
	}
	export const enum TextDecorationId {
	    None = 0,
	    Underline = 1,
	    StrikeThrough = 2,
	}
	export const enum TextTrimmingId {
	    None = 0,
	    CharacterEllipsis = 1,
	    WordEllipsis = 2,
	}
}


declare module "piweb/drawing" {
	export { Point, Rect, Size } from "piweb/drawing/geometry/basics";
	export { GeometryType, Geometry, GeometryDescription, LineGeometry, LineGeometryDescription, RectangleGeometry, RectangleGeometryDescription, EllipseGeometry, EllipseGeometryDescription, PathGeometry, CombinedGeometry, GeometryGroup } from "piweb/drawing/geometry/geometries";
	export { PathFigure } from "piweb/drawing/geometry/path_figure";
	export { PathSegmentType, PathSegment, LineSegment, PolyLineSegment, ArcSegment, BezierSegment, PolyBezierSegment, QuadraticBezierSegment, PolyQuadraticBezierSegment } from "piweb/drawing/geometry/path_segments";
	export { FillRule, GeometryCombineMode } from "piweb/drawing/geometry/geometries";
	export { SweepDirection } from "piweb/drawing/geometry/path_segments";
	export { GeometryDrawingSettings, GeometryDrawingSettingsDescription, HorizontalAnchor, VerticalAnchor } from "piweb/drawing/geometry/settings";
	export { BrushType, Brush, SolidColorBrush, LinearGradientBrush, RadialGradientBrush } from "piweb/drawing/material/brushes";
	export { Color } from "piweb/drawing/material/color";
	export { Pen, LineCap, LineJoin } from "piweb/drawing/material/pen";
	export { FormattedText, FormattedTextDescription, FlowDirection, HorizontalTextAlignment, VerticalTextAlignment, TextTrimming, TextMeasurements } from "piweb/drawing/text/formatted_text";
	export { Font, FontDescription, FontStretch, FontStyle, FontWeight, TextDecoration } from "piweb/drawing/text/font";
	export { TextDrawingSettings, TextDrawingSettingsDescription, HorizontalTextAnchor, VerticalTextAnchor } from "piweb/drawing/text/settings";
	export { Bitmap, BitmapMeasurements } from "piweb/drawing/image/bitmap";
	export { ImageDrawingSettings, ImageDrawingSettingsDescription, HorizontalImageAnchor, VerticalImageAnchor } from "piweb/drawing/image/settings";
	export { TransformationType, Transform, TransformDescription, IdentityTransform, IdentityTransformDescription, MatrixTransform, MatrixTransformDescription, RotationTransform, RotationTransformDescription, ScalingTransform, ScalingTransformDescription, ShearTransform, ShearTransformDescription, TranslationTransform, TranslationTransformDescription, TransformGroup } from "piweb/drawing/transform/transforms";
	export { Drawing, DrawingContext, DrawingMeasurements } from "piweb/drawing/drawing";
}


declare module "piweb/drawing/geometry/basics" {
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
	export class Point implements Serializable {
	    x: number;
	    y: number;
	    constructor(x: number, y: number);
	    static create(description?: PointDescription): Point;
	    static readonly origin: Point;
	    serialize(target: BufferWriter): void;
	}
	export class Rect implements Serializable {
	    x: number;
	    y: number;
	    width: number;
	    height: number;
	    constructor(x: number, y: number, width: number, height: number);
	    serialize(target: BufferWriter): void;
	}
	export class Size implements Serializable {
	    width: number;
	    height: number;
	    constructor(width: number, height: number);
	    static create(description?: SizeDescription): Size;
	    serialize(target: BufferWriter): void;
	}
}


declare module "piweb/drawing/geometry/geometries" {
	import { Transform, TransformDescription } from 'piweb/drawing/transform/transforms';
	import { BufferWriter } from "internal/buffer_writer";
	import { Serializable } from "internal/serializable";
	import { Point, PointDescription } from "piweb/drawing/geometry/basics";
	import { PathFigure, PathFigureDescription } from "piweb/drawing/geometry/path_figure";
	export type GeometryCombineMode = "union" | "intersect" | "xor" | "exclude";
	export type FillRule = "evenOdd" | "nonzero";
	export type GeometryType = "line" | "rectangle" | "ellipse" | "path" | "custom" | "combined" | "group";
	export interface LineDescription {
	    readonly start?: PointDescription;
	    readonly end?: PointDescription;
	    readonly transform?: TransformDescription;
	}
	export interface RectangleDescription {
	    readonly position?: PointDescription;
	    readonly width?: number;
	    readonly height?: number;
	    readonly transform?: TransformDescription;
	}
	export interface EllipseDescription {
	    readonly position?: PointDescription;
	    readonly radiusX?: number;
	    readonly radiusY?: number;
	    readonly transform?: TransformDescription;
	}
	export interface PathDescription {
	    readonly fillRule?: FillRule;
	    readonly figures?: ArrayLike<PathFigureDescription>;
	    readonly transform?: TransformDescription;
	}
	export interface CustomDescription {
	    readonly pathString?: string;
	    readonly transform?: TransformDescription;
	}
	export interface GeometryGroupDescription {
	    readonly children?: ArrayLike<GeometryDescription>;
	    readonly fillRule?: FillRule;
	    readonly transform?: TransformDescription;
	}
	export interface CombinedDescription {
	    readonly geometry1?: GeometryDescription;
	    readonly geometry2?: GeometryDescription;
	    readonly combineMode?: GeometryCombineMode;
	    readonly transform?: TransformDescription;
	}
	export interface LineGeometryDescription extends LineDescription {
	    readonly type: "line";
	}
	export interface RectangleGeometryDescription extends RectangleDescription {
	    readonly type: "rectangle";
	}
	export interface EllipseGeometryDescription extends EllipseDescription {
	    readonly type: "ellipse";
	}
	export interface PathGeometryDescription extends PathDescription {
	    readonly type: "path";
	}
	export interface CustomGeometryDescription extends CustomDescription {
	    readonly type: "custom";
	}
	export interface GeometryGroupGeometryDescription extends GeometryGroupDescription {
	    readonly type: "group";
	}
	export interface CombinedGeometryDescription extends CombinedDescription {
	    readonly type: "combined";
	}
	export type PureGeometryDescription = RectangleGeometryDescription | EllipseGeometryDescription | LineGeometryDescription | GeometryGroupGeometryDescription | PathGeometryDescription | CombinedGeometryDescription | CustomGeometryDescription;
	export type GeometryDescription = PureGeometryDescription | string | Geometry;
	export interface GeometryMeasurements {
	    x: number;
	    y: number;
	    width: number;
	    height: number;
	}
	export abstract class Geometry implements Serializable {
	    transform: Transform;
	    readonly abstract type: GeometryType;
	    constructor(transform?: Transform);
	    static create(description?: GeometryDescription): Geometry;
	    measure(): GeometryMeasurements;
	    static measure(geometryDescription: GeometryDescription): GeometryMeasurements;
	    abstract serialize(target: BufferWriter): void;
	}
	export class LineGeometry extends Geometry implements LineGeometryDescription {
	    start: Point;
	    end: Point;
	    readonly type: "line";
	    constructor(start: Point, end: Point, transform?: Transform);
	    static createLineGeometry(description?: LineDescription): LineGeometry;
	    serialize(target: BufferWriter): void;
	}
	export class RectangleGeometry extends Geometry implements RectangleGeometryDescription {
	    position: Point;
	    width: number;
	    height: number;
	    readonly type: "rectangle";
	    constructor(position: Point, width: number, height: number, transform?: Transform);
	    static createRectangleGeometry(description?: RectangleDescription): RectangleGeometry;
	    serialize(target: BufferWriter): void;
	}
	export class EllipseGeometry extends Geometry implements EllipseGeometryDescription {
	    position: Point;
	    radiusX: number;
	    radiusY: number;
	    readonly type: "ellipse";
	    constructor(center: Point, radiusX: number, radiusY: number, transform?: Transform);
	    static createEllipseGeometry(description?: EllipseDescription): EllipseGeometry;
	    serialize(target: BufferWriter): void;
	}
	export class PathGeometry extends Geometry implements PathGeometryDescription {
	    fillRule: FillRule;
	    figures: PathFigure[];
	    readonly type: "path";
	    constructor(fillRule: FillRule, figures: PathFigure[], transform?: Transform);
	    static createPathGeometry(description?: PathDescription): PathGeometry;
	    serialize(target: BufferWriter): void;
	}
	export class CustomGeometry extends Geometry implements CustomDescription {
	    pathString: string;
	    readonly type: "custom";
	    constructor(pathString: string, transform?: Transform);
	    static createCustomGeometry(description?: CustomDescription | string): CustomGeometry;
	    serialize(target: BufferWriter): void;
	}
	export class GeometryGroup extends Geometry implements GeometryGroupGeometryDescription {
	    children: Geometry[];
	    fillRule: FillRule;
	    readonly type: "group";
	    constructor(children: Geometry[], fillRule: FillRule, transform?: Transform);
	    static createGeometryGroup(description?: GeometryGroupDescription): GeometryGroup;
	    serialize(target: BufferWriter): void;
	}
	export class CombinedGeometry extends Geometry implements CombinedGeometryDescription {
	    geometry1: Geometry;
	    geometry2: Geometry;
	    combineMode: GeometryCombineMode;
	    readonly type: "combined";
	    constructor(geometry1: Geometry, geometry2: Geometry, combineMode: GeometryCombineMode, transform?: Transform);
	    static createCombinedGeometry(description?: CombinedDescription): CombinedGeometry;
	    serialize(target: BufferWriter): void;
	}
}


declare module "piweb/drawing/geometry/path_figure" {
	import { Point, PointDescription } from "piweb/drawing/geometry/basics";
	import { PathSegment, PathSegmentDescription } from "piweb/drawing/geometry/path_segments";
	import { BufferWriter } from "internal/buffer_writer";
	import { Serializable } from "internal/serializable";
	export interface PathFigureDescription {
	    readonly startPoint?: PointDescription;
	    readonly segments?: ArrayLike<PathSegmentDescription>;
	    readonly isClosed?: boolean;
	}
	export class PathFigure implements Serializable, PathFigureDescription {
	    startPoint: Point;
	    segments: PathSegment[];
	    isClosed: boolean;
	    constructor(startPoint: Point, segments: PathSegment[], isClosed: boolean);
	    static create(description: PathFigureDescription): PathFigure;
	    serialize(target: BufferWriter): void;
	}
}


declare module "piweb/drawing/geometry/path_segments" {
	import { BufferWriter } from "internal/buffer_writer";
	import { Serializable } from "internal/serializable";
	import { Point, PointDescription, Size, SizeDescription } from "piweb/drawing/geometry/basics";
	export type PathSegmentType = "arc" | "bezier" | "line" | "quadraticBezier" | "polyBezier" | "polyLine" | "polyQuadraticBezier";
	export type SweepDirection = "clockwise" | "counterclockwise";
	export type ArcType = "small" | "large";
	export interface LineDescription {
	    to?: PointDescription;
	}
	export interface PolyLineDescription {
	    points?: PointDescription[];
	}
	export interface ArcDescription {
	    to?: PointDescription;
	    size?: SizeDescription;
	    angle?: number;
	    arcType?: ArcType;
	    sweepDirection?: SweepDirection;
	}
	export interface BezierDescription {
	    control?: PointDescription;
	    control2?: PointDescription;
	    to?: PointDescription;
	}
	export interface PolyBezierDescription {
	    points?: PointDescription[];
	}
	export interface QuadraticBezierDescription {
	    control?: PointDescription;
	    to?: PointDescription;
	}
	export interface PolyQuadraticBezierDescription {
	    points?: PointDescription[];
	}
	export interface LineSegmentDescription extends LineDescription {
	    readonly type: "line";
	}
	export interface PolyLineSegmentDescription extends PolyLineDescription {
	    readonly type: "polyLine";
	}
	export interface ArcSegmentDescription extends ArcDescription {
	    readonly type: "arc";
	}
	export interface BezierSegmentDescription extends BezierDescription {
	    readonly type: "bezier";
	}
	export interface PolyBezierSegmentDescription extends PolyBezierDescription {
	    readonly type: "polyBezier";
	}
	export interface QuadraticBezierSegmentDescription extends QuadraticBezierDescription {
	    readonly type: "quadraticBezier";
	}
	export interface PolyQuadraticBezierSegmentDescription extends PolyQuadraticBezierDescription {
	    readonly type: "polyQuadraticBezier";
	}
	export type PathSegmentDescription = LineSegmentDescription | PolyLineSegmentDescription | ArcSegmentDescription | BezierSegmentDescription | PolyBezierSegmentDescription | QuadraticBezierSegmentDescription | PolyQuadraticBezierSegmentDescription | PathSegment;
	export abstract class PathSegment implements Serializable {
	    constructor();
	    static create(description?: PathSegmentDescription): PathSegment;
	    readonly abstract type: PathSegmentType;
	    abstract serialize(target: BufferWriter): void;
	}
	export class LineSegment extends PathSegment implements LineSegmentDescription {
	    to: Point;
	    constructor(to: Point);
	    readonly type: "line";
	    static createLineSegment(description?: LineDescription): LineSegment;
	    serialize(target: BufferWriter): void;
	}
	export class PolyLineSegment extends PathSegment implements PolyLineSegmentDescription {
	    points: Point[];
	    constructor(points: Point[]);
	    readonly type: "polyLine";
	    static createPolyLineSegment(description?: PolyLineDescription): PolyLineSegment;
	    serialize(target: BufferWriter): void;
	}
	export class ArcSegment extends PathSegment implements ArcSegmentDescription {
	    to: Point;
	    size: Size;
	    angle: number;
	    arcType: ArcType;
	    sweepDirection: SweepDirection;
	    constructor(to: Point, size: Size, angle: number, arcType: ArcType, sweepDirection: SweepDirection);
	    static createArcSegment(description?: ArcDescription): ArcSegment;
	    readonly type: "arc";
	    serialize(target: BufferWriter): void;
	}
	export class BezierSegment extends PathSegment implements BezierSegmentDescription {
	    control: Point;
	    control2: Point;
	    to: Point;
	    constructor(control: Point, control2: Point, to: Point);
	    static createBezierSegment(description?: BezierDescription): BezierSegment;
	    readonly type: "bezier";
	    serialize(target: BufferWriter): void;
	}
	export class PolyBezierSegment extends PathSegment implements PolyBezierSegmentDescription {
	    points: Point[];
	    constructor(points: Point[]);
	    static createPolyBezierSegment(description?: PolyBezierDescription): PolyBezierSegment;
	    readonly type: "polyBezier";
	    serialize(target: BufferWriter): void;
	}
	export class QuadraticBezierSegment extends PathSegment implements QuadraticBezierSegmentDescription {
	    control: Point;
	    to: Point;
	    constructor(control: Point, to: Point);
	    static createQuadraticBezierSegment(description?: QuadraticBezierDescription): QuadraticBezierSegment;
	    readonly type: "quadraticBezier";
	    serialize(target: BufferWriter): void;
	}
	export class PolyQuadraticBezierSegment extends PathSegment implements PolyQuadraticBezierSegmentDescription {
	    points: Point[];
	    constructor(points: Point[]);
	    static createPolyQuadraticBezierSegment(description?: PolyQuadraticBezierDescription): PolyQuadraticBezierSegment;
	    readonly type: "polyQuadraticBezier";
	    serialize(target: BufferWriter): void;
	}
}


declare module "piweb/drawing/geometry/settings" {
	import { Point, PointDescription } from 'piweb/drawing/geometry/basics';
	import { Serializable } from "internal/serializable";
	import { BufferWriter } from 'internal/buffer_writer';
	export type HorizontalAnchor = "origin" | "left" | "right" | "center";
	export type VerticalAnchor = "origin" | "top" | "bottom" | "center";
	export interface GeometryDrawingSettingsDescription {
	    readonly position?: PointDescription;
	    readonly anchorX?: HorizontalAnchor;
	    readonly anchorY?: VerticalAnchor;
	}
	export class GeometryDrawingSettings implements Serializable, GeometryDrawingSettingsDescription {
	    readonly position: Point;
	    readonly anchorX: HorizontalAnchor;
	    readonly anchorY: VerticalAnchor;
	    constructor(position: Point, anchorX: HorizontalAnchor, anchorY: VerticalAnchor);
	    static create(description?: GeometryDrawingSettingsDescription): GeometryDrawingSettings;
	    serialize(target: BufferWriter): void;
	}
}


declare module "piweb/drawing/image/bitmap" {
	import { BufferWriter } from 'internal/buffer_writer';
	import { HostBinary } from 'piweb/resources';
	import { Serializable } from "internal/serializable";
	export interface BitmapMeasurements {
	    height: number;
	    width: number;
	    pixelHeight: number;
	    pixelWidth: number;
	    dpiX: number;
	    dpiY: number;
	}
	export class Bitmap implements Serializable {
	    private _data;
	    constructor(data: Buffer | HostBinary);
	    serialize(target: BufferWriter): void;
	    static loadFromResource(path: string): Bitmap;
	    measure(): {
	        height: any;
	        width: any;
	        pixelHeight: any;
	        pixelWidth: any;
	        dpiX: any;
	        dpiY: any;
	    };
	}
}


declare module "piweb/drawing/image/settings" {
	import { Point, PointDescription } from 'piweb/drawing/geometry/basics';
	import { Serializable } from "internal/serializable";
	import { BufferWriter } from 'internal/buffer_writer';
	export type HorizontalImageAnchor = "left" | "right" | "center";
	export type VerticalImageAnchor = "top" | "bottom" | "center";
	export interface ImageDrawingSettingsDescription {
	    readonly position?: PointDescription;
	    readonly width?: number;
	    readonly height?: number;
	    readonly anchorX?: HorizontalImageAnchor;
	    readonly anchorY?: VerticalImageAnchor;
	}
	export class ImageDrawingSettings implements Serializable, ImageDrawingSettingsDescription {
	    readonly position: Point;
	    readonly width?: number;
	    readonly height?: number;
	    readonly anchorX: HorizontalImageAnchor;
	    readonly anchorY: VerticalImageAnchor;
	    constructor(position: Point, width: number | undefined, height: number | undefined, anchorX: HorizontalImageAnchor, anchorY: VerticalImageAnchor);
	    static create(description?: ImageDrawingSettingsDescription): ImageDrawingSettings;
	    serialize(target: BufferWriter): void;
	}
}


declare module "piweb/drawing/material/brushes" {
	import { BufferWriter } from "internal/buffer_writer";
	import { Serializable } from "internal/serializable";
	import { Color, ColorDescription } from "piweb/drawing/material/color";
	import { Point, PointDescription } from "piweb/drawing/geometry/basics";
	export type BrushType = "solid" | "linear" | "radial";
	export interface SolidDescription {
	    readonly color?: ColorDescription;
	    readonly opacity?: number;
	}
	export interface LinearDescription {
	    readonly color?: ColorDescription;
	    readonly color2?: ColorDescription;
	    readonly angle?: number;
	    readonly opacity?: number;
	}
	export interface RadialDescription {
	    readonly color?: ColorDescription;
	    readonly color2?: ColorDescription;
	    readonly center?: PointDescription;
	    readonly opacity?: number;
	}
	export interface SolidBrushDescription extends SolidDescription {
	    readonly type: BrushType;
	}
	export interface LinearBrushDescription extends LinearDescription {
	    readonly type: BrushType;
	}
	export interface RadialBrushDescription extends RadialDescription {
	    readonly type: BrushType;
	}
	export type BrushDescription = SolidBrushDescription | LinearBrushDescription | RadialBrushDescription | Brush | Color | string;
	export abstract class Brush implements Serializable {
	    opacity: number;
	    constructor(opacity: number);
	    readonly abstract type: BrushType;
	    static create(description?: BrushDescription): Brush;
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
	export class SolidColorBrush extends Brush implements SolidBrushDescription {
	    color: Color;
	    readonly type: "solid";
	    constructor(color: Color, opacity: number);
	    static createSolidColorBrush(description?: SolidDescription | string): SolidColorBrush;
	    serialize(target: BufferWriter): void;
	}
	export class LinearGradientBrush extends Brush implements LinearBrushDescription {
	    color: Color;
	    color2: Color;
	    rotation: number;
	    readonly type: "linear";
	    constructor(color: Color, color2: Color, rotation: number, opacity: number);
	    static createLinearGradientBrush(description?: LinearDescription): LinearGradientBrush;
	    serialize(target: BufferWriter): void;
	}
	export class RadialGradientBrush extends Brush implements RadialBrushDescription {
	    color: Color;
	    color2: Color;
	    center: Point;
	    readonly type: "radial";
	    constructor(color1: Color, color2: Color, center: Point, opacity: number);
	    static createRadialGradientBrush(description?: RadialDescription): RadialGradientBrush;
	    serialize(target: BufferWriter): void;
	}
}


declare module "piweb/drawing/material/color" {
	import { BufferWriter } from "internal/buffer_writer";
	import { Serializable } from "internal/serializable";
	export interface ColorObject {
	    r: number;
	    g: number;
	    b: number;
	    a?: number;
	}
	export type ColorDescription = ColorObject | string;
	export class Color implements Serializable, ColorObject {
	    r: number;
	    g: number;
	    b: number;
	    a: number;
	    constructor(r: number, g: number, b: number, a: number);
	    serialize(target: BufferWriter): void;
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
	export type LineCap = "flat" | "round" | "square";
	export type LineJoin = "bevel" | "miter" | "round";
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
	export class Pen implements Serializable, PenDescription {
	    brush: Brush;
	    thickness: number;
	    startCap: LineCap;
	    endCap: LineCap;
	    lineJoin: LineJoin;
	    dashStyle: number[];
	    dashOffset: number;
	    dashCap: LineCap;
	    constructor(brush: Brush, thickness: number, startCap: LineCap, endCap: LineCap, lineJoin: LineJoin, dashStyle: number[], dashOffset: number, dashCap: LineCap);
	    serialize(target: BufferWriter): void;
	    static create(description?: PenDescription): Pen;
	}
}


declare module "piweb/drawing/text/font" {
	import { Serializable } from "internal/serializable";
	import { BufferWriter } from "internal/buffer_writer";
	import { Brush, BrushDescription } from "piweb/drawing/material/brushes";
	export type FontWeight = "thin" | "extraLight" | "light" | "normal" | "medium" | "semiBold" | "bold" | "extraBold" | "black" | "extraBlack";
	export type FontStyle = "normal" | "oblique" | "italic";
	export type FontStretch = "ultraCondensed" | "extraCondensed" | "condensed" | "semiCondensed" | "normal" | "semiExpanded" | "expanded" | "extraExpanded" | "ultraExpanded";
	export type TextDecoration = "underline" | "strikeThrough";
	export interface FontDescription {
	    readonly fontFamily?: string;
	    readonly fontWeight?: FontWeight;
	    readonly fontStyle?: FontStyle;
	    readonly fontStretch?: FontStretch;
	    readonly size?: number;
	    readonly foreground?: BrushDescription;
	    readonly textDecorations?: ArrayLike<TextDecoration>;
	}
	export class Font implements Serializable, FontDescription {
	    fontFamily: string;
	    fontWeight: FontWeight;
	    fontStyle: FontStyle;
	    fontStretch: FontStretch;
	    size: number;
	    foreground: Brush;
	    textDecorations: TextDecoration[];
	    constructor(fontFamily: string, fontWeight: FontWeight, fontStyle: FontStyle, fontStretch: FontStretch, size: number, foreground: Brush, textDecorations: ArrayLike<TextDecoration>);
	    serialize(target: BufferWriter): void;
	    static create(description?: FontDescription): Font;
	    static getFontFamilies(): string[];
	}
}


declare module "piweb/drawing/text/formatted_text" {
	import { BufferWriter } from "internal/buffer_writer";
	import { Serializable } from "internal/serializable";
	import { Font, FontDescription } from "piweb/drawing/text/font";
	export type FlowDirection = "leftToRight" | "rightToLeft";
	export type HorizontalTextAlignment = "left" | "right" | "center" | "justify";
	export type VerticalTextAlignment = "top" | "bottom" | "center";
	export type TextTrimming = "none" | "characterEllipsis" | "wordEllipses";
	export interface TextMeasurements {
	    width: number;
	    height: number;
	    baseline: number;
	    minWidth: number;
	    textWidth: number;
	    textHeight: number;
	    textBaseline: number;
	    textLineHeight: number;
	}
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
	export class FormattedText implements Serializable, FormattedTextDescription {
	    text: string;
	    font: Font;
	    width?: number;
	    height?: number;
	    flowDirection: FlowDirection;
	    horizontalTextAlignment: HorizontalTextAlignment;
	    verticalTextAlignment: VerticalTextAlignment;
	    textTrimming: TextTrimming;
	    constructor(text: string, font: Font, maxTextWidth: number | undefined, maxTextHeight: number | undefined, flowDirection: FlowDirection, horizontalTextAlignment: HorizontalTextAlignment, verticalTextAlignment: VerticalTextAlignment, textTrimming: TextTrimming);
	    static create(description?: FormattedTextDescription | string): FormattedText;
	    serialize(target: BufferWriter): void;
	    measure(): TextMeasurements;
	    static measure(formattedText: FormattedTextDescription): TextMeasurements;
	}
}


declare module "piweb/drawing/text/settings" {
	import { Point, PointDescription } from 'piweb/drawing/geometry/basics';
	import { Serializable } from "internal/serializable";
	import { BufferWriter } from 'internal/buffer_writer';
	export type HorizontalTextAnchor = "default" | "left" | "right" | "center";
	export type VerticalTextAnchor = "default" | "top" | "bottom" | "center" | "baseline";
	export interface TextDrawingSettingsDescription {
	    readonly position?: PointDescription;
	    readonly anchorX?: HorizontalTextAnchor;
	    readonly anchorY?: VerticalTextAnchor;
	}
	export class TextDrawingSettings implements Serializable, TextDrawingSettingsDescription {
	    position: Point;
	    anchorX: HorizontalTextAnchor;
	    anchorY: VerticalTextAnchor;
	    constructor(position: Point, anchorX: HorizontalTextAnchor, anchorY: VerticalTextAnchor);
	    static create(description?: TextDrawingSettingsDescription): TextDrawingSettings;
	    serialize(target: BufferWriter): void;
	}
}


declare module "piweb/drawing/transform/transforms" {
	import { BufferWriter } from "internal/buffer_writer";
	import { Point, PointDescription } from "piweb/drawing/geometry/basics";
	export type TransformationType = "identity" | "translation" | "rotation" | "scaling" | "shear" | "group" | "matrix";
	export interface TranslationDescription {
	    x?: number;
	    y?: number;
	}
	export interface RotationDescription {
	    angle?: number;
	    center?: PointDescription;
	}
	export interface ScalingDescription {
	    scaleX?: number;
	    scaleY?: number;
	    center?: PointDescription;
	}
	export interface ShearDescription {
	    angleX?: number;
	    angleY?: number;
	    center?: PointDescription;
	}
	export interface MatrixDescription {
	    matrix?: ArrayLike<number>;
	}
	export interface TransformGroupDescription {
	    children?: ArrayLike<TransformDescription>;
	}
	export interface IdentityTransformDescription {
	    type: "identity";
	}
	export interface TranslationTransformDescription extends TranslationDescription {
	    type: "translation";
	}
	export interface RotationTransformDescription extends RotationDescription {
	    type: "rotation";
	}
	export interface ScalingTransformDescription extends ScalingDescription {
	    type: "scaling";
	}
	export interface ShearTransformDescription extends ShearDescription {
	    type: "shear";
	}
	export interface MatrixTransformDescription extends MatrixDescription {
	    type: "matrix";
	}
	export interface TransformGroupTransformDescription extends TransformGroupDescription {
	    type: "group";
	}
	export type TransformDescription = IdentityTransformDescription | TranslationTransformDescription | RotationTransformDescription | ScalingTransformDescription | ShearTransformDescription | MatrixTransformDescription | TransformGroupTransformDescription | Transform;
	export abstract class Transform {
	    readonly abstract type: TransformationType;
	    static create(description?: TransformDescription): Transform;
	    static readonly identity: IdentityTransform;
	    abstract serialize(target: BufferWriter): void;
	}
	export class IdentityTransform extends Transform implements IdentityTransformDescription {
	    constructor();
	    readonly type: "identity";
	    serialize(target: BufferWriter): void;
	}
	export class MatrixTransform extends Transform implements MatrixTransformDescription {
	    m11: number;
	    m12: number;
	    m21: number;
	    m22: number;
	    offsetX: number;
	    offsetY: number;
	    matrix: Float64Array;
	    constructor(m11: number, m12: number, m21: number, m22: number, offsetX: number, offsetY: number);
	    readonly type: "matrix";
	    static createMatrixTransform(description?: MatrixDescription): MatrixTransform;
	    serialize(target: BufferWriter): void;
	}
	export class RotationTransform extends Transform implements RotationTransformDescription {
	    angle: number;
	    center: Point;
	    constructor(angle: number, center: Point);
	    readonly type: "rotation";
	    static createRotationTransform(description?: RotationDescription): RotationTransform;
	    serialize(target: BufferWriter): void;
	}
	export class ScalingTransform extends Transform implements ScalingTransformDescription {
	    scaleX: number;
	    scaleY: number;
	    center: Point;
	    constructor(scaleX: number, scaleY: number, center: Point);
	    static createScalingTransform(description?: ScalingDescription): ScalingTransform;
	    readonly type: "scaling";
	    serialize(target: BufferWriter): void;
	}
	export class ShearTransform extends Transform implements ShearTransformDescription {
	    angleX: number;
	    angleY: number;
	    center: Point;
	    constructor(angleX: number, angleY: number, center: Point);
	    static createShearTransform(description?: ShearDescription): ShearTransform;
	    readonly type: "shear";
	    serialize(target: BufferWriter): void;
	}
	export class TranslationTransform extends Transform implements TranslationTransformDescription {
	    x: number;
	    y: number;
	    constructor(x: number, y: number);
	    static createTranslationTransform(description?: TranslationDescription): TranslationTransform;
	    readonly type: "translation";
	    serialize(target: BufferWriter): void;
	}
	export class TransformGroup extends Transform implements TransformGroupTransformDescription {
	    children: Transform[];
	    constructor(children: Transform[]);
	    static createTransformGroup(description?: TransformGroupTransformDescription): TransformGroup;
	    readonly type: "group";
	    serialize(target: BufferWriter): void;
	}
}


declare module "piweb/resources/host_binary" {
	export interface HostBinary {
	    makeBuffer(): Buffer;
	    readonly size: number;
	}
}


declare module "piweb/resources" {
	import { HostBinary } from "piweb/resources/host_binary";
	export { HostBinary };
	import * as path from "piweb/resources/path";
	export { path };
	export function readFileBufferSync(path: string): Buffer;
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
	 * Arguments must be strings. In v0.8, non-string arguments were silently ignored. In v0.10 and up, an exception is thrown.
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
	 * The platform-specific file separator. '\\' or '/'.
	 */
	export const sep: string;
	/**
	 * The platform-specific file delimiter. ';' or ':'.
	 */
	export const delimiter: string;
}


declare module "piweb/tooltips/tooltip_shape_provider" {
	import { Geometry, Point } from 'piweb/drawing';
	import { BufferWriter } from 'internal/buffer_writer';
	import { Serializable } from 'internal/serializable';
	export enum TooltipShapeType {
	    None = 0,
	    Point = 1,
	    Geometry = 2,
	}
	export class TooltipShapeCollection implements Serializable {
	    shapes: TooltipShape[];
	    constructor(shapes: TooltipShape[]);
	    serialize(target: BufferWriter): void;
	}
	export abstract class TooltipShape implements Serializable {
	    text: string;
	    characteristic: string | undefined;
	    measurement: string | undefined;
	    constructor(text: string, characteristic: string | undefined, measurement: string | undefined);
	    serialize(target: BufferWriter): void;
	}
	export class TooltipGeometryShape extends TooltipShape {
	    shape: Geometry;
	    constructor(shape: Geometry, text: string, characteristic: string | undefined, measurement: string | undefined);
	    serialize(target: BufferWriter): void;
	}
	export class TooltipPointShape extends TooltipShape {
	    point: Point;
	    constructor(point: Point, text: string, characteristic: string | undefined, measurement: string | undefined);
	    serialize(target: BufferWriter): void;
	}
	export type TooltipCallback = () => TooltipShapeCollection;
	export interface ITooltipShapeProvider {
	    onCreateTooltips: TooltipCallback | undefined;
	}
	export class TooltipShapeProvider {
	    onCreateTooltips: TooltipCallback | undefined;
	}
	export const provider: ITooltipShapeProvider;
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
