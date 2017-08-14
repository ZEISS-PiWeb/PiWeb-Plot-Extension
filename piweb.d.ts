declare module "databinding_index" {
	export { IAttributeItem, AttributeItem, AttributeDefinition, Attribute, AttributeType, EntityType, InspectionPlanItem, InspectionPlanItemType, InspectionPlanPath, PathElement, Measurement, MeasurementValue, Catalog, CatalogEntry, Configuration, WellKnownKeys } from "databinding/databinding";
	export { MeasurementMode, SystemVariableType, ImageProvider, provider } from "databinding/image_provider";
}


declare module "drawing_index" {
	export { Point, Rect, Size } from "piweb_drawing/geometry/basics";
	export { GeometryType, Geometry, GeometryDescription, LineGeometry, LineGeometryDescription, RectangleGeometry, RectangleGeometryDescription, EllipseGeometry, EllipseGeometryDescription, PathGeometry, CombinedGeometry, GeometryGroup } from "piweb_drawing/geometry/geometries";
	export { PathFigure } from "piweb_drawing/geometry/path_figure";
	export { PathSegmentType, PathSegment, LineSegment, PolyLineSegment, ArcSegment, BezierSegment, PolyBezierSegment, QuadraticBezierSegment, PolyQuadraticBezierSegment } from "piweb_drawing/geometry/path_segments";
	export { FillRule, GeometryCombineMode } from "piweb_drawing/geometry/geometries";
	export { SweepDirection } from "piweb_drawing/geometry/path_segments";
	export { GeometryDrawingSettings, GeometryDrawingSettingsDescription, HorizontalAnchor, VerticalAnchor } from "piweb_drawing/geometry/settings";
	export { BrushType, Brush, SolidColorBrush, LinearGradientBrush, RadialGradientBrush, brushes } from "piweb_drawing/material/brushes";
	export { Color } from "piweb_drawing/material/color";
	export { colors } from "piweb_drawing/material/colors";
	export { Pen, LineCap, LineJoin } from "piweb_drawing/material/pen";
	export { FormattedText, FormattedTextDescription, FlowDirection, HorizontalTextAlignment, VerticalTextAlignment, TextTrimming, TextMeasurements } from "piweb_drawing/text/formatted_text";
	export { Font, FontDescription, FontStretch, FontStyle, FontWeight, TextDecoration } from "piweb_drawing/text/font";
	export { TextDrawingSettings, TextDrawingSettingsDescription, HorizontalTextAnchor, VerticalTextAnchor } from "piweb_drawing/text/settings";
	export { Bitmap, BitmapMeasurements } from "piweb_drawing/image/bitmap";
	export { ImageDrawingSettings, ImageDrawingSettingsDescription, HorizontalImageAnchor, VerticalImageAnchor } from "piweb_drawing/image/settings";
	export { TransformationType, Transform, TransformDescription, IdentityTransform, IdentityTransformDescription, MatrixTransform, MatrixTransformDescription, RotationTransform, RotationTransformDescription, ScalingTransform, ScalingTransformDescription, ShearTransform, ShearTransformDescription, TranslationTransform, TranslationTransformDescription, TransformGroup } from "piweb_drawing/transform/transforms";
	export { Drawing, DrawingContext, DrawingMeasurements } from "piweb_drawing/drawing";
}


declare module "piweb" {
	import * as drawing from "drawing_index";
	import * as data from "databinding_index";
	import * as log from 'piweb_log';
	import * as tooltips from 'tooltips/tooltip_shape_provider';
	import * as vfs from 'vfs';
	export { log };
	export { drawing };
	export { data };
	export { properties } from "piweb_host";
	export { environment } from "piweb_host";
	export { tooltips };
	export { vfs };
}


declare module "databinding/databinding" {
	import { BufferWriter } from 'shared/buffer_writer';
	import { Serializable } from 'shared/serializable';
	export interface IAttributeItem {
	    attributes: Map<number, Attribute>;
	    getValue(key: number): string | number | Date | undefined;
	}
	export class AttributeItem implements IAttributeItem {
	    attributes: Map<number, Attribute>;
	    constructor(attributes: Map<number, Attribute>);
	    getValue(key: number): string | number | Date | undefined;
	}
	export enum EntityType {
	    Characteristic = 0,
	    Part = 1,
	    Measurement = 2,
	    Value = 3,
	    Catalog = 4,
	}
	export class Configuration {
	    partAttributes: Map<number, AttributeDefinition>;
	    characteristicAttributes: Map<number, AttributeDefinition>;
	    measurementAttributes: Map<number, AttributeDefinition>;
	    valueAttributes: Map<number, AttributeDefinition>;
	    catalogAttributes: Map<number, AttributeDefinition>;
	    constructor(partAttributes: Map<number, AttributeDefinition>, characteristicAttributes: Map<number, AttributeDefinition>, measurementAttributes: Map<number, AttributeDefinition>, valueAttributes: Map<number, AttributeDefinition>, catalogAttributes: Map<number, AttributeDefinition>);
	}
	export enum InspectionPlanItemType {
	    Characteristic = 0,
	    Part = 1,
	}
	export class MeasurementValue extends AttributeItem {
	    characteristic: string;
	    constructor(characteristic: string, attributes: Map<number, Attribute>);
	}
	export class Measurement extends AttributeItem {
	    uuid: string;
	    part: string;
	    values: Map<string, MeasurementValue>;
	    constructor(uuid: string, part: string, attributes: Map<number, Attribute>, values: Map<string, MeasurementValue>);
	}
	export class InspectionPlanItem extends AttributeItem {
	    uuid: string;
	    type: InspectionPlanItemType;
	    path: InspectionPlanPath;
	    constructor(uuid: string, type: InspectionPlanItemType, path: InspectionPlanPath, attributes: Map<number, Attribute>);
	}
	export class InspectionPlanPath implements Serializable {
	    pathElements: PathElement[];
	    constructor(pathElements: PathElement[]);
	    toString(): string;
	    serialize(target: BufferWriter): void;
	}
	export class PathElement implements Serializable {
	    type: InspectionPlanItemType;
	    name: string;
	    constructor(type: InspectionPlanItemType, name: string);
	    serialize(target: BufferWriter): void;
	}
	export class AttributeDefinition {
	    key: number;
	    description: string;
	    dataType: AttributeType;
	    entityType: EntityType;
	    catalog: string | undefined;
	    constructor(key: number, description: string, dataType: AttributeType, entityType: EntityType, catalog: string | undefined);
	}
	export class Catalog {
	    guid: string;
	    name: string;
	    validAttributes: number[];
	    entries: Map<number, CatalogEntry>;
	    constructor(guid: string, name: string, validAttributes: number[], entries: Map<number, CatalogEntry>);
	}
	export class CatalogEntry extends AttributeItem {
	    key: number;
	    constructor(key: number, attributes: Map<number, Attribute>);
	}
	export enum AttributeType {
	    String = 0,
	    Integer = 1,
	    Double = 2,
	    Date = 3,
	    Catalog = 4,
	}
	export class Attribute {
	    constructor(key: number, type: AttributeType, value: number | string | Date | undefined);
	    key: number;
	    type: AttributeType;
	    value: number | string | Date | undefined;
	}
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


declare module "databinding/databinding_reader" {
	import * as databinding from 'databinding/databinding';
	import { BufferReader } from 'shared/buffer_reader';
	export class DataBindingReader {
	    readInspectionPlanItem(source: BufferReader): databinding.InspectionPlanItem;
	    readPathInformation(source: BufferReader): databinding.InspectionPlanPath;
	    readPathElement(source: BufferReader): databinding.PathElement;
	    readAttributeDefinition(source: BufferReader, entityType: databinding.EntityType): databinding.AttributeDefinition;
	    readAttributeDefinitions(source: BufferReader, entityType: databinding.EntityType): Map<number, databinding.AttributeDefinition>;
	    readCatalog(source: BufferReader): databinding.Catalog;
	    readCatalogEntry(source: BufferReader): databinding.CatalogEntry;
	    readCatalogEntries(source: BufferReader): Map<number, databinding.CatalogEntry>;
	    readAttribute(source: BufferReader): databinding.Attribute;
	    readAttributes(source: BufferReader): Map<number, databinding.Attribute>;
	    readMeasurementValue(source: BufferReader): databinding.MeasurementValue;
	    readMeasurement(source: BufferReader): databinding.Measurement;
	}
}


declare module "databinding/image_provider" {
	import * as databinding from 'databinding/databinding';
	import * as host from 'piweb_host';
	export enum SystemVariableType {
	    None = 0,
	    String = 1,
	    Number = 2,
	    Date = 3,
	    Array = 4,
	}
	export enum MeasurementMode {
	    WithoutValues = 0,
	    WithValues = 1,
	}
	export interface ImageProvider {
	    getInspectionPlan(): Map<string, databinding.InspectionPlanItem>;
	    getConfiguration(): databinding.Configuration;
	    getCatalogs(): Map<string, databinding.Catalog>;
	    getMeasurements(mode: MeasurementMode): Map<string, databinding.Measurement>;
	    getSystemVariable(expression: string): string | Array<any> | number | Date | undefined;
	    rawDataSources: host.RawDataSource;
	    getRawData(): host.databinding.RawDataItem[];
	}
	export const provider: ImageProvider;
}


declare module "internal/drawing_broker" {
	import { Drawing } from "piweb_drawing/drawing";
	export function execOnRender(plotContext: any): Drawing;
}


declare module "internal/tooltip_broker" {
	export function getTooltipShapes(): Buffer;
}


declare module "piweb_drawing/drawing" {
	import { BufferWriter } from 'shared/buffer_writer';
	import { PointDescription } from 'piweb_drawing/geometry/basics';
	import { BrushDescription } from 'piweb_drawing/material/brushes';
	import { PenDescription } from 'piweb_drawing/material/pen';
	import { FormattedTextDescription } from "piweb_drawing/text/formatted_text";
	import { GeometryDescription } from "piweb_drawing/geometry/geometries";
	import { TransformDescription } from "piweb_drawing/transform/transforms";
	import { Serializable } from "shared/serializable";
	import { TextDrawingSettingsDescription } from "piweb_drawing/text/settings";
	import { ImageDrawingSettingsDescription } from "piweb_drawing/image/settings";
	import { GeometryDrawingSettingsDescription } from "piweb_drawing/geometry/settings";
	import { Bitmap } from "piweb_drawing/image/bitmap";
	export interface DrawingContext {
	    drawLine(start: PointDescription, end: PointDescription): void;
	    drawLines(lines: PointDescription[]): void;
	    drawRectangle(x: number, y: number, w: number, h: number): void;
	    drawEllipse(center: PointDescription, radiusX: number, radiusY: number): void;
	    drawGeometry(geometry: GeometryDescription, settings?: GeometryDrawingSettingsDescription): void;
	    drawText(text: FormattedTextDescription, settings: TextDrawingSettingsDescription): void;
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


declare module "piweb_drawing/drawing_ids" {
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


declare module "piweb_drawing/geometry/basics" {
	import { BufferWriter } from "shared/buffer_writer";
	import { Serializable } from "shared/serializable";
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


declare module "piweb_drawing/geometry/geometries" {
	import { Transform, TransformDescription } from 'piweb_drawing/transform/transforms';
	import { BufferWriter } from "shared/buffer_writer";
	import { Serializable } from "shared/serializable";
	import { Point, PointDescription } from "piweb_drawing/geometry/basics";
	import { PathFigure, PathFigureDescription } from "piweb_drawing/geometry/path_figure";
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


declare module "piweb_drawing/geometry/path_figure" {
	import { Point, PointDescription } from "piweb_drawing/geometry/basics";
	import { PathSegment, PathSegmentDescription } from "piweb_drawing/geometry/path_segments";
	import { BufferWriter } from "shared/buffer_writer";
	import { Serializable } from "shared/serializable";
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


declare module "piweb_drawing/geometry/path_segments" {
	import { BufferWriter } from "shared/buffer_writer";
	import { Serializable } from "shared/serializable";
	import { Point, PointDescription, Size, SizeDescription } from "piweb_drawing/geometry/basics";
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


declare module "piweb_drawing/geometry/settings" {
	import { Point, PointDescription } from 'piweb_drawing/geometry/basics';
	import { Serializable } from "shared/serializable";
	import { BufferWriter } from 'shared/buffer_writer';
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


declare module "piweb_drawing/image/bitmap" {
	import { BufferWriter } from 'shared/buffer_writer';
	import { HostBinary } from 'internal/host_binary';
	import { Serializable } from "shared/serializable";
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
	    static loadFromVfs(path: string): Bitmap;
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


declare module "piweb_drawing/image/settings" {
	import { Point, PointDescription } from 'piweb_drawing/geometry/basics';
	import { Serializable } from "shared/serializable";
	import { BufferWriter } from 'shared/buffer_writer';
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


declare module "piweb_drawing/material/brushes" {
	import { BufferWriter } from "shared/buffer_writer";
	import { Serializable } from "shared/serializable";
	import { Color, ColorDescription } from "piweb_drawing/material/color";
	import { Point, PointDescription } from "piweb_drawing/geometry/basics";
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
	export namespace brushes {
	    const aliceBlue: SolidColorBrush;
	    const antiqueWhite: SolidColorBrush;
	    const aqua: SolidColorBrush;
	    const aquamarine: SolidColorBrush;
	    const azure: SolidColorBrush;
	    const beige: SolidColorBrush;
	    const bisque: SolidColorBrush;
	    const black: SolidColorBrush;
	    const blanchedAlmond: SolidColorBrush;
	    const blue: SolidColorBrush;
	    const blueViolet: SolidColorBrush;
	    const brown: SolidColorBrush;
	    const burlyWood: SolidColorBrush;
	    const cadetBlue: SolidColorBrush;
	    const chartreuse: SolidColorBrush;
	    const chocolate: SolidColorBrush;
	    const coral: SolidColorBrush;
	    const cornflowerBlue: SolidColorBrush;
	    const cornsilk: SolidColorBrush;
	    const crimson: SolidColorBrush;
	    const cyan: SolidColorBrush;
	    const darkBlue: SolidColorBrush;
	    const darkCyan: SolidColorBrush;
	    const darkGoldenRod: SolidColorBrush;
	    const darkGray: SolidColorBrush;
	    const darkGreen: SolidColorBrush;
	    const darkKhaki: SolidColorBrush;
	    const darkMagenta: SolidColorBrush;
	    const darkOliveGreen: SolidColorBrush;
	    const darkOrange: SolidColorBrush;
	    const darkOrchid: SolidColorBrush;
	    const darkRed: SolidColorBrush;
	    const darkSalmon: SolidColorBrush;
	    const darkSeaGreen: SolidColorBrush;
	    const darkSlateBlue: SolidColorBrush;
	    const darkSlateGray: SolidColorBrush;
	    const darkTurquoise: SolidColorBrush;
	    const darkViolet: SolidColorBrush;
	    const deepPink: SolidColorBrush;
	    const deepSkyBlue: SolidColorBrush;
	    const dimGray: SolidColorBrush;
	    const dodgerBlue: SolidColorBrush;
	    const fireBrick: SolidColorBrush;
	    const floralWhite: SolidColorBrush;
	    const forestGreen: SolidColorBrush;
	    const fuchsia: SolidColorBrush;
	    const gainsboro: SolidColorBrush;
	    const ghostWhite: SolidColorBrush;
	    const gold: SolidColorBrush;
	    const goldenRod: SolidColorBrush;
	    const gray: SolidColorBrush;
	    const green: SolidColorBrush;
	    const greenYellow: SolidColorBrush;
	    const honeyDew: SolidColorBrush;
	    const hotPink: SolidColorBrush;
	    const indianRed: SolidColorBrush;
	    const indigo: SolidColorBrush;
	    const ivory: SolidColorBrush;
	    const khaki: SolidColorBrush;
	    const lavender: SolidColorBrush;
	    const lavenderBlush: SolidColorBrush;
	    const lawnGreen: SolidColorBrush;
	    const lemonChiffon: SolidColorBrush;
	    const lightBlue: SolidColorBrush;
	    const lightCoral: SolidColorBrush;
	    const lightCyan: SolidColorBrush;
	    const lightGoldenRodYellow: SolidColorBrush;
	    const lightGray: SolidColorBrush;
	    const lightGreen: SolidColorBrush;
	    const lightPink: SolidColorBrush;
	    const lightSalmon: SolidColorBrush;
	    const lightSeaGreen: SolidColorBrush;
	    const lightSkyBlue: SolidColorBrush;
	    const lightSlateGray: SolidColorBrush;
	    const lightSteelBlue: SolidColorBrush;
	    const lightYellow: SolidColorBrush;
	    const lime: SolidColorBrush;
	    const limeGreen: SolidColorBrush;
	    const linen: SolidColorBrush;
	    const magenta: SolidColorBrush;
	    const maroon: SolidColorBrush;
	    const mediumAquamarine: SolidColorBrush;
	    const mediumBlue: SolidColorBrush;
	    const mediumOrchid: SolidColorBrush;
	    const mediumPurple: SolidColorBrush;
	    const mediumSeaGreen: SolidColorBrush;
	    const mediumSlateBlue: SolidColorBrush;
	    const mediumSpringGreen: SolidColorBrush;
	    const mediumTurquoise: SolidColorBrush;
	    const mediumVioletRed: SolidColorBrush;
	    const midnightBlue: SolidColorBrush;
	    const mintCream: SolidColorBrush;
	    const mistyRose: SolidColorBrush;
	    const moccasin: SolidColorBrush;
	    const navajoWhite: SolidColorBrush;
	    const navy: SolidColorBrush;
	    const oldLace: SolidColorBrush;
	    const olive: SolidColorBrush;
	    const oliveDrab: SolidColorBrush;
	    const orange: SolidColorBrush;
	    const orangeRed: SolidColorBrush;
	    const orchid: SolidColorBrush;
	    const paleGoldenRod: SolidColorBrush;
	    const paleGreen: SolidColorBrush;
	    const paleTurquoise: SolidColorBrush;
	    const paleVioletRed: SolidColorBrush;
	    const papayaWhip: SolidColorBrush;
	    const peachPuff: SolidColorBrush;
	    const peru: SolidColorBrush;
	    const pink: SolidColorBrush;
	    const plum: SolidColorBrush;
	    const powderBlue: SolidColorBrush;
	    const purple: SolidColorBrush;
	    const red: SolidColorBrush;
	    const rosyBrown: SolidColorBrush;
	    const royalBlue: SolidColorBrush;
	    const saddleBrown: SolidColorBrush;
	    const salmon: SolidColorBrush;
	    const sandyBrown: SolidColorBrush;
	    const seaGreen: SolidColorBrush;
	    const seaShell: SolidColorBrush;
	    const sienna: SolidColorBrush;
	    const silver: SolidColorBrush;
	    const skyBlue: SolidColorBrush;
	    const slateBlue: SolidColorBrush;
	    const slateGray: SolidColorBrush;
	    const snow: SolidColorBrush;
	    const springGreen: SolidColorBrush;
	    const steelBlue: SolidColorBrush;
	    const tan: SolidColorBrush;
	    const teal: SolidColorBrush;
	    const thistle: SolidColorBrush;
	    const tomato: SolidColorBrush;
	    const transparent: SolidColorBrush;
	    const turquoise: SolidColorBrush;
	    const violet: SolidColorBrush;
	    const wheat: SolidColorBrush;
	    const white: SolidColorBrush;
	    const whiteSmoke: SolidColorBrush;
	    const yellow: SolidColorBrush;
	    const yellowGreen: SolidColorBrush;
	}
}


declare module "piweb_drawing/material/color" {
	import { BufferWriter } from "shared/buffer_writer";
	import { Serializable } from "shared/serializable";
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
	}
}


declare module "piweb_drawing/material/colors" {
	import { Color } from 'piweb_drawing/material/color';
	export namespace colors {
	    const aliceBlue: Color;
	    const antiqueWhite: Color;
	    const aqua: Color;
	    const aquamarine: Color;
	    const azure: Color;
	    const beige: Color;
	    const bisque: Color;
	    const black: Color;
	    const blanchedAlmond: Color;
	    const blue: Color;
	    const blueViolet: Color;
	    const brown: Color;
	    const burlyWood: Color;
	    const cadetBlue: Color;
	    const chartreuse: Color;
	    const chocolate: Color;
	    const coral: Color;
	    const cornflowerBlue: Color;
	    const cornsilk: Color;
	    const crimson: Color;
	    const cyan: Color;
	    const darkBlue: Color;
	    const darkCyan: Color;
	    const darkGoldenRod: Color;
	    const darkGray: Color;
	    const darkGreen: Color;
	    const darkKhaki: Color;
	    const darkMagenta: Color;
	    const darkOliveGreen: Color;
	    const darkOrange: Color;
	    const darkOrchid: Color;
	    const darkRed: Color;
	    const darkSalmon: Color;
	    const darkSeaGreen: Color;
	    const darkSlateBlue: Color;
	    const darkSlateGray: Color;
	    const darkTurquoise: Color;
	    const darkViolet: Color;
	    const deepPink: Color;
	    const deepSkyBlue: Color;
	    const dimGray: Color;
	    const dodgerBlue: Color;
	    const fireBrick: Color;
	    const floralWhite: Color;
	    const forestGreen: Color;
	    const fuchsia: Color;
	    const gainsboro: Color;
	    const ghostWhite: Color;
	    const gold: Color;
	    const goldenRod: Color;
	    const gray: Color;
	    const green: Color;
	    const greenYellow: Color;
	    const honeyDew: Color;
	    const hotPink: Color;
	    const indianRed: Color;
	    const indigo: Color;
	    const ivory: Color;
	    const khaki: Color;
	    const lavender: Color;
	    const lavenderBlush: Color;
	    const lawnGreen: Color;
	    const lemonChiffon: Color;
	    const lightBlue: Color;
	    const lightCoral: Color;
	    const lightCyan: Color;
	    const lightGoldenRodYellow: Color;
	    const lightGray: Color;
	    const lightGreen: Color;
	    const lightPink: Color;
	    const lightSalmon: Color;
	    const lightSeaGreen: Color;
	    const lightSkyBlue: Color;
	    const lightSlateGray: Color;
	    const lightSteelBlue: Color;
	    const lightYellow: Color;
	    const lime: Color;
	    const limeGreen: Color;
	    const linen: Color;
	    const magenta: Color;
	    const maroon: Color;
	    const mediumAquamarine: Color;
	    const mediumBlue: Color;
	    const mediumOrchid: Color;
	    const mediumPurple: Color;
	    const mediumSeaGreen: Color;
	    const mediumSlateBlue: Color;
	    const mediumSpringGreen: Color;
	    const mediumTurquoise: Color;
	    const mediumVioletRed: Color;
	    const midnightBlue: Color;
	    const mintCream: Color;
	    const mistyRose: Color;
	    const moccasin: Color;
	    const navajoWhite: Color;
	    const navy: Color;
	    const oldLace: Color;
	    const olive: Color;
	    const oliveDrab: Color;
	    const orange: Color;
	    const orangeRed: Color;
	    const orchid: Color;
	    const paleGoldenRod: Color;
	    const paleGreen: Color;
	    const paleTurquoise: Color;
	    const paleVioletRed: Color;
	    const papayaWhip: Color;
	    const peachPuff: Color;
	    const peru: Color;
	    const pink: Color;
	    const plum: Color;
	    const powderBlue: Color;
	    const purple: Color;
	    const red: Color;
	    const rosyBrown: Color;
	    const royalBlue: Color;
	    const saddleBrown: Color;
	    const salmon: Color;
	    const sandyBrown: Color;
	    const seaGreen: Color;
	    const seaShell: Color;
	    const sienna: Color;
	    const silver: Color;
	    const skyBlue: Color;
	    const slateBlue: Color;
	    const slateGray: Color;
	    const snow: Color;
	    const springGreen: Color;
	    const steelBlue: Color;
	    const tan: Color;
	    const teal: Color;
	    const thistle: Color;
	    const tomato: Color;
	    const transparent: Color;
	    const turquoise: Color;
	    const violet: Color;
	    const wheat: Color;
	    const white: Color;
	    const whiteSmoke: Color;
	    const yellow: Color;
	    const yellowGreen: Color;
	}
}


declare module "piweb_drawing/material/pen" {
	import { BufferWriter } from "shared/buffer_writer";
	import { Serializable } from "shared/serializable";
	import { Brush, BrushDescription } from "piweb_drawing/material/brushes";
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


declare module "piweb_drawing/text/font" {
	import { Serializable } from "shared/serializable";
	import { BufferWriter } from "shared/buffer_writer";
	import { Brush, BrushDescription } from "piweb_drawing/material/brushes";
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


declare module "piweb_drawing/text/formatted_text" {
	import { BufferWriter } from "shared/buffer_writer";
	import { Serializable } from "shared/serializable";
	import { Font, FontDescription } from "piweb_drawing/text/font";
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
	    static create(description?: FormattedTextDescription): FormattedText;
	    serialize(target: BufferWriter): void;
	    measure(): TextMeasurements;
	    static measure(formattedText: FormattedTextDescription): TextMeasurements;
	}
}


declare module "piweb_drawing/text/settings" {
	import { Point, PointDescription } from 'piweb_drawing/geometry/basics';
	import { Serializable } from "shared/serializable";
	import { BufferWriter } from 'shared/buffer_writer';
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


declare module "piweb_drawing/transform/transforms" {
	import { BufferWriter } from "shared/buffer_writer";
	import { Point, PointDescription } from "piweb_drawing/geometry/basics";
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


declare module "shared/buffer_reader" {
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
	}
}


declare module "shared/buffer_writer" {
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


declare module "shared/serializable" {
	import { BufferWriter } from 'shared/buffer_writer';
	export interface Serializable {
	    serialize(target: BufferWriter): void;
	}
}


declare module "tooltips/tooltip_shape_provider" {
	import * as drawing from 'drawing_index';
	import { BufferWriter } from 'shared/buffer_writer';
	import { Serializable } from 'shared/serializable';
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
	    shape: drawing.Geometry;
	    constructor(shape: drawing.Geometry, text: string, characteristic: string | undefined, measurement: string | undefined);
	    serialize(target: BufferWriter): void;
	}
	export class TooltipPointShape extends TooltipShape {
	    point: drawing.Point;
	    constructor(point: drawing.Point, text: string, characteristic: string | undefined, measurement: string | undefined);
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




declare module "piweb_log" {
    function debug(format: any, ...param: any[]): void;
    function info(format: any, ...param: any[]): void;
    function warn(format: any, ...param: any[]): void;
    function error(format: any, ...param: any[]): void;
}

declare module "vfs_path"
{
    export interface ParsedPath {
        /**
         * The root of the path such as '/' or 'c:\'
         */
        root: string;
        /**
         * The full directory path such as '/home/user/dir' or 'c:\path\dir'
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
    function resolve(...pathSegments: any[]): string;

    /**
     * Normalize a string path, reducing '..' and '.' parts.
     * When multiple slashes are found, they're replaced by a single one; when the path contains a trailing slash, it is preserved. On Windows backslashes are used.
     *
     * @param p string path to normalize.
     */
    function normalize(p: string): string;

    /**
     * Determines whether {path} is an absolute path. An absolute path will always resolve to the same location, regardless of the working directory.
     *
     * @param path path to test.
     */
    function isAbsolute(path: string): boolean;

    /**
     * Join all arguments together and normalize the resulting path.
     * Arguments must be strings. In v0.8, non-string arguments were silently ignored. In v0.10 and up, an exception is thrown.
     *
     * @param paths paths to join.
     */
    function join(...paths: string[]): string;

    /**
     * Solve the relative path from {from} to {to}.
     * At times we have two absolute paths, and we need to derive the relative path from one to the other. This is actually the reverse transform of path.resolve.
     *
     * @param from
     * @param to
     */
    function relative(from: string, to: string): string;

    /**
     * Return the directory name of a path. Similar to the Unix dirname command.
     *
     * @param p the path to evaluate.
     */
    function dirname(p: string): string;

    /**
     * Return the last portion of a path. Similar to the Unix basename command.
     * Often used to extract the file name from a fully qualified path.
     *
     * @param p the path to evaluate.
     * @param ext optionally, an extension to remove from the result.
     */
    function basename(p: string, ext?: string): string;

    /**
     * Return the extension of the path, from the last '.' to end of string in the last portion of the path.
     * If there is no '.' in the last portion of the path or the first character of it is '.', then it returns an empty string
     *
     * @param p the path to evaluate.
     */
    function extname(p: string): string;

    /**
     * Returns a path string from an object - the opposite of parse().
     *
     * @param pathString path to evaluate.
     */
    function format(pathObject: ParsedPath): string;

    /**
     * Returns an object from a path string - the opposite of format().
     *
     * @param pathString path to evaluate.
     */
    function parse(pathString: string): ParsedPath;

    /**
     * The platform-specific file separator. '\\' or '/'.
     */
    export var sep: string;

    /**
     * The platform-specific file delimiter. ';' or ':'.
     */
    export var delimiter: string;
}

declare module "internal/host_binary"
{
	export interface HostBinary
	{
		makeBuffer(): Buffer
		readonly size: number;
	}
}

declare module "vfs"
{
    import {HostBinary} from "internal/host_binary";

    function readFileSync(path: string): HostBinary;
    function readFileBufferSync(path: string): Buffer;
}

declare module "piweb_local"
{
    enum DateKind {
        AssumeLocal,
        AssumeUTC
    }

    class CultureInfo {
        constructor(name: string);

        twoLetterISOLanguageName: string;
        threeLetterISOLanguageName: string;
        name: string;
    }

    class RegionInfo {
        constructor(name: string);

        twoLetterISORegionName: string;
        threeLetterISORegionName: string;
        name: string;
    }

    function formatNumber(value: number, formatString?: string | null, culture?: CultureInfo | null): string;
    function parseNumber(str: string, culture?: CultureInfo | null): number | null;

    function formatDate(date: Date, offset?: number | null, format?: string | null, culture?: CultureInfo | null): string;
    function parseDate(str: String, culture?: CultureInfo | null, dateKind?: DateKind | null): Date | null;
    function parseDateExact(str: String, format: string, culture?: CultureInfo | null, dateKind?: DateKind | null): Date | null;
}

declare module "piweb_host"
{
    import { CultureInfo, RegionInfo } from "piweb_local";
    import { HostBinary } from "internal/host_binary";
    
    interface Position {
        x: number;
        y: number;
    }

    interface Size {
        width: number;
        height: number;
    }

    interface PointDescription {
        x: number;
        y: number;
    }

    interface ColorDescription {
        r: number;
        g: number;
        b: number;
        a?: number;
    }

	export type BrushType = "solid" | "linear" | "radial"; 
    interface BrushDescription {
        type: BrushType;
        opacity?: number;
        color?: ColorDescription;
        color2?: ColorDescription;
        angle?: number;
        center?: PointDescription;
    }

    interface PenDescription {
        brush?: BrushDescription;
        thickness?: number;
        dashStyle?: ArrayLike<number>;
        dashOffset?: number;
	}
	
	export type FontWeight = "normal" | "bold";
	export type FontStyle = "normal" | "italic";
	export type FontStretch = "normal";
	export type TextDecoration = "underline" | "strikeThrough";
	interface FontDescription
	{
		fontFamily?: string;
		fontWeight?: FontWeight;
		fontStyle?: FontStyle;
		fontStretch?: FontStretch;
		size?: number;
		foreground?: BrushDescription;
		textDecorations?: ArrayLike<TextDecoration>;
	}

	enum EntityType {
        Unknown,
        Part,
        Characteristic,
        Measurement,
        MeasurementValue
    }

    enum RawDataSource {
        None = 0,
        Part = 1,
        Characteristic = 2,
        Measurement = 4,
        MeasurementValue = 8
    }

    namespace databinding {
        namespace rawDataOptions {
            var sources: RawDataSource;
        }

        interface RawDataItem {
            readDataSync(): HostBinary;
            entityType: EntityType;
            name: string;
            size: number;
            mimeType: string;
            md5Bytes: Buffer;
            created: Date;
            lastModified: Date;
        }

        namespace data {
        }

        function listRawData(): RawDataItem[];
    }

    namespace environment {
        var isDesignMode: boolean;
        var toolboxItemName: string;
        var currentCulture: CultureInfo;
        var currentRegion: RegionInfo;
        var currentTimeZoneName: string;
    }

    namespace properties {
		function getBooleanProperty(id: string): boolean;
        function getIntegerProperty(id: string): number;
        function getDoubleProperty(id: string): number;
        function getStringProperty(id: string): string;
        function getColorProperty(id: string): ColorDescription;
        function getBrushProperty(id: string): BrushDescription;
        function getPenProperty(id: string): PenDescription;
        function getFontProperty(id: string): FontDescription;
        function getEnumProperty(id: string): string;
    }

    function getSize(): Size;
    function getPosition(): Position;

    var experimental: any;
}

declare module "piweb_host"
{
    import * as own from "piweb_host";

	type HostEvents = "load" | "render" | "dataBindingChanged" | "dataChanged" | "prepare_render";
	function on(event: HostEvents, listener: Function): typeof own;
    function emit(event: HostEvents, ...args: any[]): boolean;
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
