declare module "Base/Decorator" {
    export const exclude: (target: Record<string, any>, propertyKey: string) => void;
    export const include: (target: Record<string, any>, propertyKey: string) => void;
    export const getExcludedList: (constructor: Function) => string[];
    export const getIncludedList: (constructor: Function) => string[];
    export const excludeOAPI: (target: Record<string, any>, propertyKey: string) => void;
    export const includeOAPI: (target: Record<string, any>, propertyKey: string) => void;
    export const getOAPIExcludedList: (constructor: Function) => string[];
    export const getOAPIIncludedList: (constructor: Function) => string[];
}
declare module "Base/Manager" {
    export default class Manager<T> {
        readonly list: Array<T>;
        add(item: T): void;
        remove(item: T): void;
        clear(): void;
        moveUp(item: T): void;
        moveDown(item: T): void;
        swap(left: number, right: number): void;
    }
}
declare module "Base/Newable" {
    export default interface Newable<T> {
        new (...args: any[]): T;
    }
}
declare module "Base/ItemManager" {
    import Item from "Base/Item";
    import Manager from "Base/Manager";
    import Newable from "Base/Newable";
    export default class ItemManager<T extends Item> extends Manager<T> {
        protected readonly type: Newable<T>;
        constructor(type: Newable<T>);
        load(manager: ItemManager<T>): void;
        loadList(list: T[]): void;
        make(...args: any[]): T;
        toJSON(): {
            list: T[];
        };
        toOAPI(): any;
        toOAPIArray(): any[];
    }
}
declare module "Base/KeyValue" {
    export default interface KeyValue {
        [key: string]: any;
    }
}
declare module "Base/Item" {
    import KeyValue from "Base/KeyValue";
    export default class Item {
        protected getDescriptor(name: string): PropertyDescriptor | null | undefined;
        protected getKeyList(): string[];
        protected getOAPIKeyList(): string[];
        load(source: Item): void;
        protected loadProperty(name: string, source: KeyValue): void;
        toJSON(): KeyValue;
        toOAPI(): any;
    }
}
declare module "Base/UniqueItem" {
    import Item from "Base/Item";
    export default class UniqueItem extends Item {
        protected _ui: string;
        constructor(name: string);
        get camelCase(): string;
        get snakeCase(): string;
        get wavelCase(): string;
        get ui(): string;
        set ui(name: string);
    }
}
declare module "Base/SideBarItem" {
    import UniqueItem from "Base/UniqueItem";
    export default class SideBarItem extends UniqueItem {
        description: string;
    }
}
declare module "Base/UniqueItemManager" {
    import ItemManager from "Base/ItemManager";
    import UniqueItem from "Base/UniqueItem";
    import Newable from "Base/Newable";
    import KeyValue from "Base/KeyValue";
    export default class UniqueItemManager<T extends UniqueItem> extends ItemManager<T> {
        constructor(type: Newable<T>);
        throwIfExist(ui: string): void;
        add(item: T): void;
        find(ui: string): T | undefined;
        findOrMake(ui: string): T;
        loadList(list: T[]): void;
        make(ui: string): T;
        sort(asc?: boolean): void;
        toOAPI(): KeyValue;
    }
}
declare module "OAPI/CallBack" {
    import SideBarItem from "Base/SideBarItem";
    import UniqueItemManager from "Base/UniqueItemManager";
    export default class CallBack extends SideBarItem {
    }
    export class CallBackManager extends UniqueItemManager<CallBack> {
        constructor();
    }
}
declare module "OAPI/Example" {
    import SideBarItem from "Base/SideBarItem";
    import UniqueItemManager from "Base/UniqueItemManager";
    export default class Example extends SideBarItem {
        description: string;
        externalValue: string;
        summary: string;
        value: string;
    }
    export class ExampleManager extends UniqueItemManager<Example> {
        constructor();
    }
}
declare module "OAPI/Link" {
    import SideBarItem from "Base/SideBarItem";
    import UniqueItemManager from "Base/UniqueItemManager";
    export default class Link extends SideBarItem {
    }
    export class LinkManager extends UniqueItemManager<Link> {
        constructor();
    }
}
declare module "OAPI/DataType" {
    export enum CompositionType {
        allOf = "allOf",
        anyOf = "anyOf",
        multipleOf = "multipleOf",
        oneOf = "oneOf"
    }
    export enum SimpleType {
        boolean = "boolean",
        integer = "integer",
        number = "number",
        reference = "reference",
        string = "string",
        template = "template"
    }
    export const DataType: {
        boolean: SimpleType.boolean;
        integer: SimpleType.integer;
        number: SimpleType.number;
        reference: SimpleType.reference;
        string: SimpleType.string;
        template: SimpleType.template;
        object: string;
        allOf: CompositionType.allOf;
        anyOf: CompositionType.anyOf;
        multipleOf: CompositionType.multipleOf;
        oneOf: CompositionType.oneOf;
    };
    export const compositionTypeList: CompositionType[];
    export const dataTypeList: string[];
    export const simpleTypeList: SimpleType[];
}
declare module "OAPI/Reference" {
    import UniqueItem from "Base/UniqueItem";
    import UniqueItemManager from "Base/UniqueItemManager";
    export enum ReferenceType {
        examples = "examples",
        headers = "headers",
        links = " links",
        parameters = "parameters",
        requestBodies = "requestBodies",
        responses = "responses",
        schemas = "schemas",
        security = "security"
    }
    export default class Reference extends UniqueItem {
        type: ReferenceType;
        constructor(name: string, type?: ReferenceType);
        get text(): string;
        toOAPI(): {
            $ref: string;
        };
    }
    export class ReferenceManager extends UniqueItemManager<Reference> {
        readonly referenceType: ReferenceType;
        constructor(type: ReferenceType);
        make(name: string, type?: ReferenceType): Reference;
    }
}
declare module "OAPI/Schema" {
    import SideBarItem from "Base/SideBarItem";
    export default abstract class Schema extends SideBarItem {
        text: string;
    }
}
declare module "OAPI/SchemaSimple" {
    import KeyValue from "Base/KeyValue";
    import UniqueItemManager from "Base/UniqueItemManager";
    import { SimpleType } from "OAPI/DataType";
    import Reference, { ReferenceType } from "OAPI/Reference";
    import Schema from "OAPI/Schema";
    export default class SchemaSimple extends Schema {
        example: string;
        format: string;
        isArray: boolean;
        required: boolean;
        type: SimpleType;
        readonly reference: Reference;
        refer(ui: string, type?: ReferenceType): void;
        makeArray(): {
            type: string;
            items: KeyValue;
        };
        makeData(): KeyValue;
        toOAPI(): any;
    }
    export class SchemaSimpleManager extends UniqueItemManager<SchemaSimple> {
        constructor();
    }
}
declare module "OAPI/Parameter" {
    import KeyValue from "Base/KeyValue";
    import SideBarItem from "Base/SideBarItem";
    import UniqueItemManager from "Base/UniqueItemManager";
    import SchemaSimple from "OAPI/SchemaSimple";
    export enum Location {
        cookie = "cookie",
        header = "header",
        path = "path",
        query = "query"
    }
    export default class Parameter extends SideBarItem {
        allowEmptyValue: boolean;
        deprecated: boolean;
        description: string;
        example: string;
        location: Location;
        name: string;
        required: boolean;
        readonly schema: SchemaSimple;
        constructor(name: string, location?: Location);
        toOAPI(): KeyValue;
    }
    export class ParameterManager extends UniqueItemManager<Parameter> {
        readonly location: Location;
        constructor(location: Location);
        make(name: string, location?: Location): Parameter;
    }
}
declare module "OAPI/Encoding" {
    import KeyValue from "Base/KeyValue";
    import UniqueItem from "Base/UniqueItem";
    import UniqueItemManager from "Base/UniqueItemManager";
    import { ReferenceManager } from "OAPI/Reference";
    export default class Encoding extends UniqueItem {
        allowReserved: boolean;
        contentType: string;
        explode: boolean;
        readonly headerManager: ReferenceManager;
        style: string;
        toOAPI(): KeyValue;
    }
    export class EncodingManager extends UniqueItemManager<Encoding> {
        constructor();
    }
}
declare module "OAPI/MediaType" {
    import KeyValue from "Base/KeyValue";
    import UniqueItem from "Base/UniqueItem";
    import UniqueItemManager from "Base/UniqueItemManager";
    import { EncodingManager } from "OAPI/Encoding";
    import { ReferenceManager } from "OAPI/Reference";
    import SchemaSimple from "OAPI/SchemaSimple";
    export enum MediaTypeEnum {
        form = "multipart/form-data",
        json = "application/json",
        xml = "application/xml"
    }
    export default class MediaType extends UniqueItem {
        readonly schema: SchemaSimple;
        readonly encodingManager: EncodingManager;
        readonly exampleManager: ReferenceManager;
        toOAPI(): KeyValue;
    }
    export class MediaTypeManager extends UniqueItemManager<MediaType> {
        constructor();
    }
}
declare module "OAPI/RequestBody" {
    import SideBarItem from "Base/SideBarItem";
    import UniqueItemManager from "Base/UniqueItemManager";
    import { MediaTypeManager } from "OAPI/MediaType";
    export default class RequestBody extends SideBarItem {
        required: boolean;
        description: string;
        readonly mediaTypeManager: MediaTypeManager;
        toOAPI(): {
            content: import("Base/KeyValue").default;
            description: string;
        };
    }
    export class RequestBodyManager extends UniqueItemManager<RequestBody> {
        constructor();
    }
}
declare module "OAPI/Response" {
    import SideBarItem from "Base/SideBarItem";
    import UniqueItemManager from "Base/UniqueItemManager";
    import { MediaTypeManager } from "OAPI/MediaType";
    import { ReferenceManager } from "OAPI/Reference";
    export default class Response extends SideBarItem {
        description: string;
        readonly headerManager: ReferenceManager;
        readonly linkManager: ReferenceManager;
        readonly mediaTypeManager: MediaTypeManager;
        toOAPI(): {
            content: import("Base/KeyValue").default;
            description: string;
            headers: import("Base/KeyValue").default;
        };
    }
    export class ResponseManager extends UniqueItemManager<Response> {
        constructor();
    }
}
declare module "Base/ValueItem" {
    import UniqueItem from "Base/UniqueItem";
    import UniqueItemManager from "Base/UniqueItemManager";
    export default class ValueItem extends UniqueItem {
        value: string;
        toOAPI(): string;
    }
    export class ValueItemManager extends UniqueItemManager<ValueItem> {
        constructor();
    }
}
declare module "OAPI/Discriminator" {
    import Item from "Base/Item";
    import KeyValue from "Base/KeyValue";
    import { ValueItemManager } from "Base/ValueItem";
    export default class Discriminator extends Item {
        propertyName: string;
        readonly manager: ValueItemManager;
        toOAPI(): KeyValue;
    }
}
declare module "OAPI/SchemaComposition" {
    import Discriminator from "OAPI/Discriminator";
    import KeyValue from "Base/KeyValue";
    import Item from "Base/Item";
    import { ReferenceManager } from "OAPI/Reference";
    import { CompositionType } from "OAPI/DataType";
    export default class SchemaComposition extends Item {
        readonly discriminator: Discriminator;
        readonly schemaManager: ReferenceManager;
        type: CompositionType;
        toOAPI(): KeyValue;
    }
}
declare module "OAPI/SchemaObject" {
    import KeyValue from "Base/KeyValue";
    import Item from "Base/Item";
    import { SchemaSimpleManager } from "OAPI/SchemaSimple";
    export default class SchemaObject extends Item {
        example: string;
        readonly schemaManager: SchemaSimpleManager;
        readonly type: string;
        toOAPI(): KeyValue;
    }
}
declare module "OAPI/SchemaComplex" {
    import Schema from "OAPI/Schema";
    import UniqueItemManager from "Base/UniqueItemManager";
    import SchemaComposition from "OAPI/SchemaComposition";
    import SchemaObject from "OAPI/SchemaObject";
    export enum SchemaType {
        composition = "composition",
        object = "object",
        template = "template"
    }
    export const schemaTypeList: string[];
    export default class SchemaComplex extends Schema {
        type: SchemaType;
        readonly composition: SchemaComposition;
        readonly object: SchemaObject;
        get empty(): boolean;
        get isComposition(): boolean;
        get isObject(): boolean;
        get isTemplate(): boolean;
        toOAPI(): any;
    }
    export class SchemaManager extends UniqueItemManager<SchemaComplex> {
        constructor();
    }
}
declare module "OAPI/OAuthFlow" {
    import KeyValue from "Base/KeyValue";
    import { ValueItemManager } from "Base/ValueItem";
    import UniqueItemManager from "Base/UniqueItemManager";
    import UniqueItem from "Base/UniqueItem";
    class ScopeManager extends ValueItemManager {
    }
    export default class OAuthFlow extends UniqueItem {
        authorizationUrl: string;
        refreshUrl: string;
        tokenUrl: string;
        readonly scopeManager: ScopeManager;
        toOAPI(): KeyValue;
    }
    export class OAuthFlowManager extends UniqueItemManager<OAuthFlow> {
        constructor();
    }
}
declare module "OAPI/SecurityScheme" {
    import KeyValue from "Base/KeyValue";
    import SideBarItem from "Base/SideBarItem";
    import UniqueItemManager from "Base/UniqueItemManager";
    import { OAuthFlowManager } from "OAPI/OAuthFlow";
    import { Location } from "OAPI/Parameter";
    export enum SecurityType {
        apiKey = "apiKey",
        http = "http",
        oauth2 = "oauth2",
        openIdConnect = "openIdConnect"
    }
    export default class SecurityScheme extends SideBarItem {
        type: SecurityType;
        name: string;
        location: Location;
        scheme: string;
        bearerFormat: string;
        openIdConnectUrl: string;
        readonly oAuthFlowManager: OAuthFlowManager;
        constructor(name: string, location?: Location);
        toOAPI(): KeyValue;
    }
    export class SecuritySchemeManager extends UniqueItemManager<SecurityScheme> {
        constructor();
    }
}
declare module "OAPI/Component" {
    import Item from "Base/Item";
    import { ExampleManager } from "OAPI/Example";
    import { ParameterManager } from "OAPI/Parameter";
    import { RequestBodyManager } from "OAPI/RequestBody";
    import { ResponseManager } from "OAPI/Response";
    import { SchemaManager } from "OAPI/SchemaComplex";
    import { SecuritySchemeManager } from "OAPI/SecurityScheme";
    export default class Component extends Item {
        readonly exampleManager: ExampleManager;
        readonly headerManager: ParameterManager;
        readonly parameterManager: ParameterManager;
        readonly requestBodyManager: RequestBodyManager;
        readonly responseManager: ResponseManager;
        readonly schemaManager: SchemaManager;
        readonly securitySchemeManager: SecuritySchemeManager;
        toOAPI(): {
            examples: import("Base/KeyValue").default;
            headers: import("Base/KeyValue").default;
            parameters: import("Base/KeyValue").default;
            requestBodies: import("Base/KeyValue").default;
            responses: import("Base/KeyValue").default;
            schemas: import("Base/KeyValue").default;
            securitySchemes: import("Base/KeyValue").default;
        };
    }
}
declare module "OAPI/External" {
    import Item from "Base/Item";
    export default class External extends Item {
        description: string;
        url: string;
    }
}
declare module "OAPI/Contact" {
    import Item from "Base/Item";
    export default class Contact extends Item {
        name: string;
        url: string;
        email: string;
        toOAPI(): any;
    }
}
declare module "OAPI/License" {
    import Item from "Base/Item";
    export default class License extends Item {
        name: string;
        url: string;
    }
}
declare module "OAPI/Info" {
    import Item from "Base/Item";
    import Contact from "OAPI/Contact";
    import License from "OAPI/License";
    export default class Info extends Item {
        contact: Contact;
        description: string;
        license: License;
        termsOfService: string;
        title: string;
        version: string;
    }
}
declare module "OAPI/Status" {
    import UniqueItem from "Base/UniqueItem";
    import UniqueItemManager from "Base/UniqueItemManager";
    import Reference from "OAPI/Reference";
    export default class Status extends UniqueItem {
        readonly response: Reference;
        toOAPI(): {
            $ref: string;
        };
    }
    export class StatusManager extends UniqueItemManager<Status> {
        constructor();
    }
}
declare module "OAPI/Operation" {
    import KeyValue from "Base/KeyValue";
    import Reference, { ReferenceManager } from "OAPI/Reference";
    import { StatusManager } from "OAPI/Status";
    import UniqueItem from "Base/UniqueItem";
    import UniqueItemManager from "Base/UniqueItemManager";
    import Path from "OAPI/Path";
    export enum OperationType {
        get = "get",
        delete = "delete",
        options = "options",
        patch = "patch",
        post = "post",
        put = "put"
    }
    export default class Operation extends UniqueItem {
        private readonly path;
        summary: string;
        deprecated: boolean;
        description: string;
        readonly parameterManager: ReferenceManager;
        readonly requestBody: Reference;
        readonly statusManager: StatusManager;
        readonly tagManager: UniqueItemManager<UniqueItem>;
        constructor(name: string, path: Path);
        get type(): string;
        toOAPI(): KeyValue;
    }
    export class OperationManager extends UniqueItemManager<Operation> {
        readonly path: Path;
        constructor(path: Path);
        make(name: string): Operation;
    }
}
declare module "OAPI/Path" {
    import KeyValue from "Base/KeyValue";
    import SideBarItem from "Base/SideBarItem";
    import UniqueItemManager from "Base/UniqueItemManager";
    import { OperationManager } from "OAPI/Operation";
    import { ParameterManager } from "OAPI/Parameter";
    export default class Path extends SideBarItem {
        description: string;
        summary: string;
        readonly operationManager: OperationManager;
        readonly parameterManager: ParameterManager;
        toOAPI(): KeyValue;
    }
    export class PathManager extends UniqueItemManager<Path> {
        constructor();
    }
}
declare module "OAPI/ServerVariable" {
    import KeyValue from "Base/KeyValue";
    import UniqueItem from "Base/UniqueItem";
    import UniqueItemManager from "Base/UniqueItemManager";
    export default class ServerVariable extends UniqueItem {
        default: string;
        description: string;
        readonly valueManager: UniqueItemManager<UniqueItem>;
        toOAPI(): KeyValue;
    }
    export class ServerVariableManager extends UniqueItemManager<ServerVariable> {
        constructor();
    }
}
declare module "OAPI/Server" {
    import KeyValue from "Base/KeyValue";
    import SideBarItem from "Base/SideBarItem";
    import UniqueItemManager from "Base/UniqueItemManager";
    import { ServerVariableManager } from "OAPI/ServerVariable";
    export default class Server extends SideBarItem {
        description: string;
        readonly variableManager: ServerVariableManager;
        get url(): string;
        set url(name: string);
        toOAPI(): KeyValue;
    }
    export class ServerManager extends UniqueItemManager<Server> {
        constructor();
    }
}
declare module "OAPI/Security" {
    import SideBarItem from "Base/SideBarItem";
    import UniqueItemManager from "Base/UniqueItemManager";
    export default class Security extends SideBarItem {
        toOAPI(): {
            [x: string]: never[];
        };
    }
    export class SecurityManager extends UniqueItemManager<Security> {
        constructor();
    }
}
declare module "OAPI/Tag" {
    import KeyValue from "Base/KeyValue";
    import SideBarItem from "Base/SideBarItem";
    import UniqueItemManager from "Base/UniqueItemManager";
    export default class Tag extends SideBarItem {
        description: string;
        toOAPI(): KeyValue;
    }
    export class TagManager extends UniqueItemManager<Tag> {
        constructor();
    }
}
declare module "OAPI/Document" {
    import Component from "OAPI/Component";
    import External from "OAPI/External";
    import Info from "OAPI/Info";
    import { PathManager } from "OAPI/Path";
    import { ReferenceType } from "OAPI/Reference";
    import { ServerManager } from "OAPI/Server";
    import { SecurityManager } from "OAPI/Security";
    import { TagManager } from "OAPI/Tag";
    import Item from "Base/Item";
    export default class Document extends Item {
        readonly info: Info;
        readonly component: Component;
        readonly externalDocs: External;
        readonly pathManager: PathManager;
        readonly securityManager: SecurityManager;
        readonly serverManager: ServerManager;
        readonly tagManager: TagManager;
        get compositionTypeList(): import("OAPI/DataType").CompositionType[];
        get simpleTypeList(): import("OAPI/DataType").SimpleType[];
        getManager(type: ReferenceType): import("OAPI/Example").ExampleManager | import("OAPI/Parameter").ParameterManager | import("OAPI/RequestBody").RequestBodyManager | import("OAPI/Response").ResponseManager | import("OAPI/SchemaComplex").SchemaManager | import("OAPI/SecurityScheme").SecuritySchemeManager;
        toOAPI(): {
            openapi: string;
            info: any;
            components: {
                examples: import("Base/KeyValue").default;
                headers: import("Base/KeyValue").default;
                parameters: import("Base/KeyValue").default;
                requestBodies: import("Base/KeyValue").default;
                responses: import("Base/KeyValue").default;
                schemas: import("Base/KeyValue").default;
                securitySchemes: import("Base/KeyValue").default;
            };
            paths: import("Base/KeyValue").default;
            security: any[];
            servers: any[];
            tags: any[];
            externalDocs: any;
        };
    }
}
declare module "Data/Property" {
    import UniqueItem from "Base/UniqueItem";
    import UniqueItemManager from "Base/UniqueItemManager";
    export default class Property extends UniqueItem {
        data: {};
        tag: string;
        value: string;
    }
    export class PropertyManager extends UniqueItemManager<Property> {
        readonly list: Array<Property>;
        constructor();
    }
}
declare module "Data/Preset" {
    import SideBarItem from "Base/SideBarItem";
    import UniqueItemManager from "Base/UniqueItemManager";
    import { PropertyManager } from "Data/Property";
    export default class Preset extends SideBarItem {
        required: boolean;
        description: string;
        version: number;
        readonly propertyManager: PropertyManager;
    }
    export class PresetManager extends UniqueItemManager<Preset> {
        readonly list: Array<Preset>;
        constructor();
    }
}
declare module "Data/Script" {
    import SideBarItem from "Base/SideBarItem";
    import UniqueItemManager from "Base/UniqueItemManager";
    export default class Script extends SideBarItem {
        code: string;
        description: string;
        global: boolean;
        single: boolean;
    }
    export class ScriptManager extends UniqueItemManager<Script> {
        readonly list: Array<Script>;
        constructor();
    }
}
declare module "Data/Project" {
    import Item from "Base/Item";
    import Document from "OAPI/Document";
    import { PresetManager } from "Data/Preset";
    import { ScriptManager } from "Data/Script";
    export default class Project extends Item {
        version: number;
        readonly presetManager: PresetManager;
        readonly scriptManager: ScriptManager;
        readonly oapi: Document;
        getPreset(name: string): import("Data/Preset").default | undefined;
    }
}
declare module "Service/Generator" {
    import Project from "Data/Project";
    import { CompositionType } from "OAPI/DataType";
    import { MediaTypeEnum, MediaTypeManager } from "OAPI/MediaType";
    export default class Generator {
        readonly project: Project;
        constructor(project: Project);
        get exampleManager(): import("OAPI/Example").ExampleManager;
        get headerManager(): import("OAPI/Parameter").ParameterManager;
        get parameterManager(): import("OAPI/Parameter").ParameterManager;
        get pathManager(): import("OAPI/Path").PathManager;
        get requestBodyManager(): import("OAPI/RequestBody").RequestBodyManager;
        get responseManager(): import("OAPI/Response").ResponseManager;
        get schemaManager(): import("OAPI/SchemaComplex").SchemaManager;
        get securityRequirement(): import("OAPI/Security").SecurityManager;
        get securityScheme(): import("OAPI/SecurityScheme").SecuritySchemeManager;
        get serverManager(): import("OAPI/Server").ServerManager;
        get tagManager(): import("OAPI/Tag").TagManager;
        makeMediaType(type: MediaTypeEnum, manager: MediaTypeManager): import("OAPI/MediaType").default;
        makeMediaTypeForm(manager: MediaTypeManager): import("OAPI/MediaType").default;
        makeMediaTypeJSON(manager: MediaTypeManager): import("OAPI/MediaType").default;
        makeMediaTypeXML(manager: MediaTypeManager): import("OAPI/MediaType").default;
        makeSchemaComposition(ui: string, list?: string[], type?: CompositionType): import("OAPI/SchemaComplex").default;
        makeSchemaObject(ui: string, list?: string[]): import("OAPI/SchemaComplex").default;
    }
}
declare module "DataForScript" {
    import { LoDashStatic } from 'lodash';
    import Project from "Data/Project";
    import Schema from "OAPI/Schema";
    import Generator from "Service/Generator";
    export default interface DataForScript {
        generator: Generator;
        lodash: LoDashStatic;
        project: Project;
        schema: Schema;
    }
}
declare module "Bridge/FromJava/ActionEnum" {
    export enum ActionEnum {
        edit = "edit",
        error = "error",
        get = "get",
        load = "load",
        move = "move",
        open = "open",
        post = "post",
        read = "read",
        refresh = "refresh",
        save = "save",
        write = "write"
    }
}
declare module "Bridge/FromJava/Response" {
    import { ActionEnum } from "Bridge/FromJava/ActionEnum";
    export default class Response {
        action: ActionEnum;
        key: string;
        data: string;
        message: string;
        status: number;
        constructor(action: ActionEnum, key: string, data: string, message: string, status: number);
    }
}
declare module "Bridge/FromJava/Handler" {
    import Response from "Bridge/FromJava/Response";
    export default interface Handler {
        (data: Response): void;
    }
}
declare module "Bridge/FromJava/HandlerManager" {
    import { ActionEnum } from "Bridge/FromJava/ActionEnum";
    import Handler from "Bridge/FromJava/Handler";
    export default class HandlerManager {
        readonly map: Map<ActionEnum, Map<string, Handler>>;
        constructor();
        make(action: ActionEnum): void;
        add(action: ActionEnum, key: string, handler?: Handler): void;
        find(action: ActionEnum, key: string): Handler | undefined;
    }
}
declare module "Bridge/ToJava/Payload" {
    import { ActionEnum } from "Bridge/FromJava/ActionEnum";
    export default class Payload {
        action: ActionEnum;
        key: string;
        data: string;
        constructor(action: ActionEnum, key: string, data: string);
        static make(action: ActionEnum, key: string, data: string): Payload;
    }
}
declare module "Bridge/FromJava/Bridge" {
    import { ActionEnum } from "Bridge/FromJava/ActionEnum";
    import HandlerManager from "Bridge/FromJava/HandlerManager";
    import Response from "Bridge/FromJava/Response";
    export default class Bridge {
        readonly manager: HandlerManager;
        constructor(manager: HandlerManager);
        call(response: Response): void;
        isHTTP(action: ActionEnum): boolean;
        error(code: number, message: string): void;
    }
}
declare module "Bridge/ToJava/JavaBridge" {
    export default interface JavaBridge {
        call(json: string): void;
    }
}
declare module "Bridge/ToJava/CEFW" {
    import Bridge from "Bridge/FromJava/Bridge";
    import JavaBridge from "Bridge/ToJava/JavaBridge";
    export default interface CEFW extends Window {
        bridge: Bridge;
        JavaBridge: JavaBridge;
    }
}
declare module "Bridge/ToJava/Route" {
    import { ActionEnum } from "Bridge/FromJava/ActionEnum";
    import Handler from "Bridge/FromJava/Handler";
    import HandlerManager from "Bridge/FromJava/HandlerManager";
    import CEFW from "Bridge/ToJava/CEFW";
    export default class Route {
        readonly manager: HandlerManager;
        readonly window: CEFW;
        constructor(window: CEFW, manager: HandlerManager);
        call(action: ActionEnum, key: string, data: string, handler?: Handler): void;
        edit(file: string, data: string, handler?: Handler): void;
        get(route: string, data: string, handler?: Handler): void;
        move(file: string, destination: string, handler?: Handler): void;
        open(file: string, handler?: Handler): void;
        post(route: string, data: string, handler?: Handler): void;
        read(file: string, data: string, handler?: Handler): void;
        refresh(handler?: Handler): void;
        write(file: string, data: string, handler?: Handler): void;
    }
}
declare module "Service/Text" {
    import UniqueItem from "Base/UniqueItem";
    import Project from "Data/Project";
    export function filter(keyword: string, list: Array<UniqueItem>): UniqueItem[];
    export function run(code: string, project: Project, schema: UniqueItem): any;
    export function runText(text: string, data: object): string;
}
declare module "Data/SideBar" {
    import UniqueItem from "Base/UniqueItem";
    import UniqueItemManager from "Base/UniqueItemManager";
    import Project from "Data/Project";
    export default class SideBar {
        readonly manager: UniqueItemManager<UniqueItem>;
        item: UniqueItem | null;
        keyword: string;
        title: string;
        constructor(title: string, manager: UniqueItemManager<UniqueItem>);
        get list(): UniqueItem[];
    }
    export enum SideBarEnum {
        Example = "Example",
        Header = "Header",
        Parameter = "Parameter",
        Path = "Path",
        Preset = "Preset",
        Request = "Request",
        Response = "Response",
        Schema = "Schema",
        Security = "Security",
        SecurityScheme = "SecurityScheme",
        Script = "Script",
        Server = "Server",
        Tag = "Tag"
    }
    export class SideBarManager {
        readonly map: Map<SideBarEnum, SideBar>;
        bind(project: Project): void;
        get(name: SideBarEnum): SideBar;
    }
}
declare module "Dialogue/Dialogue" {
    export default class Dialogue {
        callback: CallableFunction | null;
        canClose: boolean;
        hasFooter: boolean;
        title: string;
        size: string;
        visible: boolean;
        show(title: string, callback?: CallableFunction | null): void;
    }
}
declare module "Dialogue/ListDialogue" {
    import Dialogue from "Dialogue/Dialogue";
    import UniqueItem from "Base/UniqueItem";
    export default class ListDialogue extends Dialogue {
        keyword: string;
        source: Array<UniqueItem>;
        showBlank: boolean;
        get list(): UniqueItem[];
        showList(list: Array<UniqueItem>, title: string, callback: CallableFunction, size?: string): void;
        showWithBlank(list: Array<UniqueItem>, title: string, callback: CallableFunction, size?: string): void;
        select(item: UniqueItem): void;
    }
}
declare module "Dialogue/UIDialogue" {
    import Dialogue from "Dialogue/Dialogue";
    export default class UIDialogue extends Dialogue {
        size: string;
        text: string;
        showInput(title: string, text?: string, callback?: CallableFunction | null): void;
    }
}
declare module "Event/ItemDelete" {
    import { EventEmitter } from 'events';
    import StrictEventEmitter from 'strict-event-emitter-types';
    enum EventEnum {
        BeforeFieldDelete = "BeforeFieldDelete",
        AfterFieldDelete = "AfterFieldDelete"
    }
    interface CallBack<T1, T2> {
        (sender: T1, item: T2): void;
    }
    interface Event<T1, T2> {
        [EventEnum.BeforeFieldDelete]: CallBack<T1, T2>;
        [EventEnum.AfterFieldDelete]: CallBack<T1, T2>;
    }
    export default class ItemDelete<T1, T2> {
        readonly ee: StrictEventEmitter<EventEmitter, Event<T1, T2>>;
        emitAfterFieldDelete(sender: T1, item: T2): void;
        emitBeforeFieldDelete(sender: T1, item: T2): void;
        onAfterFieldDelete(callback: CallBack<T1, T2>): void;
        onBeforeFieldDelete(callback: CallBack<T1, T2>): void;
    }
}
declare module "Event/StateEvent" {
    import { EventEmitter } from 'events';
    import StrictEventEmitter from 'strict-event-emitter-types';
    interface CallBack {
        (...args: any[]): void;
    }
    export enum EventEnum {
        AfterCodeRun = "AfterCodeRun",
        AfterProjectLoad = "AfterProjectLoad"
    }
    interface Event {
        [EventEnum.AfterCodeRun]: CallBack;
        [EventEnum.AfterProjectLoad]: CallBack;
    }
    export default class StateEvent {
        readonly ee: StrictEventEmitter<EventEmitter, Event, Event, "addEventListener" | "removeEventListener", "on" | "addListener" | "removeListener" | "once" | "emit">;
    }
}
declare module "Event/UIChange" {
    import { EventEmitter } from 'events';
    import StrictEventEmitter from 'strict-event-emitter-types';
    import UniqueItem from "Base/UniqueItem";
    enum EventEnum {
        BeforeUIChange = "BeforeUIChange",
        AfterUIChange = "AfterUIChange"
    }
    interface CallBack<T extends UniqueItem> {
        (sender: T, ui: string, old: string): void;
    }
    interface Event<T extends UniqueItem> {
        [EventEnum.BeforeUIChange]: CallBack<T>;
        [EventEnum.AfterUIChange]: CallBack<T>;
    }
    export default class UIChange<T extends UniqueItem> {
        readonly ee: StrictEventEmitter<EventEmitter, Event<T>>;
        emitAfterUIChange(sender: T, ui: string, old: string): void;
        emitBeforeUIChange(sender: T, ui: string, old: string): void;
        onAfterUIChange(callback: CallBack<T>): void;
        onBeforeUIChange(callback: CallBack<T>): void;
    }
}
declare module "Event/EventManager" {
    import UniqueItem from "Base/UniqueItem";
    import UniqueItemManager from "Base/UniqueItemManager";
    import ItemDelete from "Event/ItemDelete";
    import StateEvent from "Event/StateEvent";
    import UIChange from "Event/UIChange";
    export default class EventManager {
        static readonly manager: EventManager;
        readonly itemDelete: ItemDelete<UniqueItemManager<UniqueItem>, UniqueItem>;
        readonly state: StateEvent;
        readonly uiChange: UIChange<UniqueItem>;
        constructor();
    }
}
declare module "Service/File" {
    import Handler from "Bridge/FromJava/Handler";
    import Route from "Bridge/ToJava/Route";
    export const OAPIFolder = "open-api";
    export default class File {
        readonly route: Route;
        constructor(route: Route);
        static getOAPIPath(file: string): string;
        static getScriptPath(file: string): string;
        move(file: string, destination: string, handler?: Handler): void;
        read(file: string, data: string, handler?: Handler): void;
        readOAPI(file: string, data: string, handler?: Handler): void;
        write(file: string, data: string, handler?: Handler): void;
        writeOAPI(file: string, data: string, handler?: Handler): void;
        writeScript(file: string, data: string, handler?: Handler): void;
    }
}
declare module "Service/Export" {
    import Handler from "Bridge/FromJava/Handler";
    import Project from "Data/Project";
    import File from "Service/File";
    export default class Export {
        static run(file: File, project: Project, handler?: Handler): void;
    }
}
declare module "Bridge/FromJava/StatusEnum" {
    export enum StatusEnum {
        OK = 200,
        Error = 400
    }
}
declare module "Service/Save" {
    import Handler from "Bridge/FromJava/Handler";
    import Project from "Data/Project";
    import File from "Service/File";
    export default class Save {
        static last: string;
        private static readonly fake;
        static run(file: File, project: Project, handler?: Handler): void;
        private static makeName;
    }
}
declare module "Service/Manager" {
    import Handler from "Bridge/FromJava/Handler";
    import Project from "Data/Project";
    import File from "Service/File";
    export default class Manager {
        readonly file: File;
        constructor(file: File);
        export(project: Project, handler?: Handler): void;
        save(project: Project, handler?: Handler): void;
    }
}
declare module "Vendor" {
    import Route from "Bridge/ToJava/Route";
    import Project from "Data/Project";
    import SideBar, { SideBarEnum, SideBarManager } from "Data/SideBar";
    import ListDialogue from "Dialogue/ListDialogue";
    import UIDialogue from "Dialogue/UIDialogue";
    import EventManager from "Event/EventManager";
    import Manager from "Service/Manager";
    export default class Vendor {
        ide: string;
        readonly preset: Project;
        project: Project | null;
        readonly event: EventManager;
        readonly listDialogue: ListDialogue;
        readonly uiDialogue: UIDialogue;
        readonly route: Route;
        readonly service: Manager;
        sidebar: SideBar;
        readonly sbManager: SideBarManager;
        constructor(preset: Project, route: Route, service: Manager);
        get inBrowser(): boolean;
        get ready(): boolean;
        getProject(): Project;
        run(code: string): void;
        show(title: SideBarEnum): void;
    }
}
declare module "Data/Key" {
    import UniqueItem from "Base/UniqueItem";
    import UniqueItemManager from "Base/UniqueItemManager";
    export default class Key extends UniqueItem {
        value: string;
        required: boolean;
    }
    export class KeyManager extends UniqueItemManager<Key> {
        constructor();
    }
}
declare module "OAPI/XML" {
    import Item from "Base/Item";
    export default class XML extends Item {
        attribute: boolean;
        name: string;
        namespace: string;
        prefix: string;
        wrapped: boolean;
    }
}
declare module "Service/Constant" {
    const _default: {};
    export default _default;
}
declare module "Service/Load" {
    import Response from "Bridge/FromJava/Response";
    import Vendor from "Vendor";
    export default class Load {
        static run(response: Response, state: Vendor): void;
        private static make;
        private static load;
        private static loadPreset;
        private static addIfNotExist;
        private static isProject;
    }
}
declare module "Service/Start" {
    import CEFW from "Bridge/ToJava/CEFW";
    import Project from "Data/Project";
    import Vendor from "Vendor";
    export default class Start {
        static run(preset: Project, window: CEFW): Vendor;
    }
}
