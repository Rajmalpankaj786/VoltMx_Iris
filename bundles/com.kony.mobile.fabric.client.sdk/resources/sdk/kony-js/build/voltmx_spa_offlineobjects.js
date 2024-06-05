/**
 * voltmx-spa-offlineobjects version 9.5.31
 * This file is intended for desktopWeb/SPA only.
 */
 
if(typeof(voltmx) === "undefined"){
	voltmx = {};
}
if(typeof(voltmx.sdk) === "undefined"){
	voltmx.sdk = {};
}
if(typeof(voltmx.sdk.OfflineObjects) === "undefined"){
    voltmx.sdk.OfflineObjects = {};
}
if(typeof(voltmx.sdk.VMXObj) === "undefined"){
    voltmx.sdk.KNYObj = voltmx.sdk.VMXObj = {};
}
if(typeof(voltmx.sdk.VMXObjSvc) === "undefined"){
    voltmx.sdk.KNYObjSvc = voltmx.sdk.VMXObjSvc = {};
}
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({__proto__: []} instanceof Array && function (d, b) {
            d.__proto__ = b;
        }) ||
        function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/**
 * Object defining the constants for CRUD operations.
 * Created by Prasanthi Bonam on 29-05-2018.
 * Copyright © 2017 Kony. All rights reserved.
 */
voltmx.sdk.OfflineObjects.KSCriteria = Object.freeze({
    PRIMARY_KEYS: 0,
    WHERE_CONDITION_AS_A_MAP: 1,
    WHERE_CONDITION_AS_A_STRING: 2,
    NONE: 3
});

voltmx.sdk.OfflineObjects.KSCRUDConstants = {

    CRUD_OPTION_CRITERIA : "criteria",
    CRUD_OPTION_IS_UPDATE_BY_PK : "isUpdateByPK",
    CRUD_OPTION_IS_DELETE_BY_PK : "isDeleteByPK",
    CRUD_OPTION_SKIP_VALIDATION : "skipValidation",
    COLLATE_NOCASE : "COLLATE NOCASE",

    DEFAULT_VALUE_FOR_TRACK_CHANGES : true,
    DEFAULT_VALUE_FOR_TRACK_INTERMEDIATE_UPDATES : true
};
voltmx.sdk.OfflineObjects.KSDBSchemaVersion = Object.freeze({
    Version_None : 0,
    Version_Default : 1,
    Version_2 : 2,  /* 8.4 release */
});


voltmx.sdk.OfflineObjects.KSDatabaseConstants = Object.freeze({

    //----------------------------------------------
    // DataTypes
    //----------------------------------------------
    KSDataTypes: {
        "NUMBER": 'number',
        "STRING": 'string',
        "BOOLEAN": 'boolean',
        "DATE": 'date',
        "BINARY": 'binary'
    },

    //----------------------------------------------
    // DatabaseOperations Code
    //----------------------------------------------
    KSDatabaseOperations: {
        "INSERT": 1,
        "INSERT_OR_REPLACE": 2,
        "UPDATE": 3,
        "SELECT": 4,
        "DELETE": 5
    },

    KSAction: {
        "CREATE": 'CREATE',
        "UPDATE": 'UPDATE',
        "DELETE": 'DELETE'
    },

    KSQueryTypes: {
        "CREATE": 1,
        "DELETE": 2,
        "UPDATE": 3
    },

    //----------------------------------------------
    // Volt MX fields
    //----------------------------------------------
    KONY_SYNC_HASH_SUM : "konysynchashsum",
    KONY_SYNC_CHANGE_TYPE : "konysyncchangetype",
    KONY_SYNC_CHANGE_TIME : "konysyncchangetime",

    //----------------------------------------------
    // metaInfo fields
    //----------------------------------------------
    UPLOAD_SESSION_NO : "uploadsessionno",
    FILTER_VALUE : "filtervalue",
    REPLAY_SEQUENCE_NUMBER : "replaysequencenumber",
    LAST_GENERATED_ID : "lastgeneratedid",

    //----------------------------------------------
    // properties table fields
    //----------------------------------------------
    PROPERTIES_TABLE_KEY_COLUMN : "key",
    PROPERTIES_TABLE_VALUE_COLUMN : "value",
    DB_SCHEMA_VERSION : "dbschemaversion",

    //----------------------------------------------
    // Table names
    //----------------------------------------------
    SQL_TABLE_KONY_PROPERTIES : "konysyncPROPERTIES",
    SQL_TABLE_KONY_SYNC_METADATA : "konysyncMETADATA",
    SQL_TABLE_KONY_SYNC_META_INFO : "konysyncMETAINFO",
    SQL_TABLE_KONY_SYNC_UPLOAD_CACHE : "konysyncUPLOADCACHE",
    SQL_TABLE_KONY_SYNC_OBJECT_DELTA_CONTEXT : "konysyncOBJECTDELTACONTEXT",

    //----------------------------------------------
    // Database name generator
    //----------------------------------------------
    NAMESPACE_SUFFIX_CHARACTER : ".",
    TABLE_TYPE_CONNECTOR_CHARACTER : '_',
    TABLE_COMPOSITE_PRIMARY_KEY_CONNECTOR : '+',
    TABLE_TYPE_HISTORY : "HISTORY",
    TABLE_TYPE_ORIGINAL : "ORIGINAL",

    //----------------------------------------------
    // Metadata Table constants
    //----------------------------------------------
    METADATA_TABLE_VERSION : "version",
    METADATA_TABLE_METADATA_JSON : "metadataJSON",
    METADATA_TABLE_DELTA_CONTEXT : "deltaContext",
    METADATA_TABLE_OBJECT_SERVICE_NAME : "objectServiceName",

    //----------------------------------------------
    // Prepared statements constants
    //----------------------------------------------
    OPERATION_TYPE : "operationtype",
    TABLE_NAME : "tablename",
    COLUMN : "column",
    ORDER : "order",

    //----------------------------------------------
    // Logical operation constants
    //----------------------------------------------

    LOGICAL_AND : "AND",
    LOGICAL_OR : "OR",

    //----------------------------------------------
    // Table Queries
    //----------------------------------------------
    QUERY_KONY_SYNC_UPLOAD_CACHE_TABLE :  "&object_name,object_type,request_body,request_id,request_context,no_of_reattempts,last_attempted",

    //----------------------------------------------
    // Upload cache field names
    //----------------------------------------------
    UPLOAD_CACHE_OBJECT_NAME : "object_name",
    UPLOAD_CACHE_OBJECT_TYPE : "object_type",
    UPLOAD_CACHE_REQUEST_BODY : "request_body",
    UPLOAD_CACHE_REQUEST_ID : "request_id",
    UPLOAD_CACHE_REQUEST_CONTEXT : "request_context",
    UPLOAD_CACHE_NO_OF_REATTEMPTS : "no_of_reattempts",
    UPLOAD_CACHE_LAST_ATTEMPTED : "last_attempted",

    //Incremental Setup Constants
    INDEXED_DB_VERSION : "version",
    OBJECT_STORE_NAMES : "objectStoreNames"
});

voltmx.sdk.OfflineObjects.KSDatabaseSchemaVersion = Object.freeze({
    Version_None : 0,
    Version_Default : 1, /* 8.0 Release */
    Version_2 : 2,       /* 8.1 Release */
    Version_3 : 3,       /* 8.2 release */
    Version_4 : 4,       /* 8.3 release */
    Version_5 : 5,       /* 8.4 release */

    getLatestVersion : function () {
        return (Object.keys(this).length -2);
    }
});
voltmx.sdk.OfflineObjects.KSErrorConstants = function () {

    function Error(code, message) {
        this.code = code;
        this.message = message;
        this.domain = "OfflineObjectsError";
    }

    var KSErrorConstants = {};

    //--------------------------------
    // Generic success & failure codes
    //--------------------------------
    KSErrorConstants.STATUS_SUCCESS = 0;
    KSErrorConstants.STATUS_FAILURE = -1;

    //------------------------------------------------
    // Error codes for Database Errors - (2000 - 2029)
    //------------------------------------------------
    KSErrorConstants.DB_GENERIC_ERROR = new Error(2000, "An error occurred in the Database Layer.");
    KSErrorConstants.DB_INSTANCE_NOT_INITIALIZED = new Error(2011, "Database instance is not initialized.");
    KSErrorConstants.DB_EXECUTE_QUERY_FAILED = new Error(2012, "Mandatory fields to execute a query are missing.");

    //------------------------------------------------
    // Error codes for Network Errors - (2030 to 2099)
    //------------------------------------------------
    KSErrorConstants.GENERIC_NETWORK_ERROR = new Error(2030, "An error occurred in the Network Layer.");
    KSErrorConstants.NW_CONNECTION_TIMEOUT_ERROR = new Error(2031, "Unable to connect to host.");
    KSErrorConstants.NW_SOCKET_TIMEOUT = new Error(2032, "Network call failed due to socket connection timeout");
    KSErrorConstants.NW_INVALID_RESPONSE_OBJECT = new Error(2037, "Network response is either null or invalid JSON.");
    KSErrorConstants.NW_INVALID_OPSTATUS_FROM_SERVER = new Error(2038, "Server responded with error opstatus.");
    KSErrorConstants.NW_MESSAGE_INTEGRITY_FAILURE = new Error(2043, "HTTP message integrity check failed.");
    KSErrorConstants.NW_REQUEST_ALREADY_IN_PROGRESS = new Error(2044, "The upload request is already in progress.");

    //------------------------------------
    //Error codes for KSErrorConstants.CRUD Errors- (2300 - 2329)
    //------------------------------------
    KSErrorConstants.CRUD_GENERIC_ERROR = new Error(2300, "An error occurred in the ORM operation");
    KSErrorConstants.CRUD_RECORD_NOT_IN_MAIN_TABLE = new Error(2301, "No record found in the database for given column values or where condition");
    KSErrorConstants.CRUD_REFERENTIAL_INTEGRITY_VIOLATION = new Error(2302, "Foreign key constraint violation error");
    KSErrorConstants.CRUD_PRIMARY_KEYS_UPDATE_NOT_ALLOWED = new Error(2303, "Updating primary key(s) of a record is not allowed");
    KSErrorConstants.CRUD_INVALID_OPTIONS = new Error(2304, "Supplied options are invalid, common causes are incorrect property name or value or data types");
    KSErrorConstants.CRUD_NULL_OR_EMPTY_PRIMARY_KEY_VALUE = new Error(2305, "Primary key values cannot be null or empty");
    KSErrorConstants.CRUD_NULL_OR_EMPTY_COLUMN_NAME_IN_ORDERBY_MAP = new Error(2306, "Property or column names cannot be null or empty in orderByMap option");
    KSErrorConstants.CRUD_NULL_SDKRECORD = new Error(2307, "Cannot perform ORM operations on null or empty record");
    KSErrorConstants.CRUD_MANDATORY_COLUMNS_MISSING = new Error(2308, "Mandatory field or property missing in the ORM input");
    KSErrorConstants.CRUD_VALUE_SENT_FOR_AUTOGENERATED_COLUMN = new Error(2309, "Value should not be sent for auto generated columns");
    KSErrorConstants.CRUD_INVALID_ATTRIBUTE = new Error(2310, "Invalid field or property found in the ORM input");
    KSErrorConstants.CRUD_DATATYPE_OR_LENGTH_MISMATCH = new Error(2311, "ORM input is of invalid data type or length");
    KSErrorConstants.CRUD_NULL_OR_EMPTY_OPTIONS = new Error(2312, "Supplied options are either null or empty");
    KSErrorConstants.CRUD_MUTUALLY_EXCLUSIVE_OPTIONS_USED = new Error(2313,"Supplied options cannot be used together, they are mutually exclusive");
    KSErrorConstants.CRUD_INVALID_RECORD_OPERATION = new Error(2314, "Non deferred operation is not allowed on this record as previous changes are in deferred and sync pending state");
    KSErrorConstants.CRUD_RECORD_NOT_IN_MAIN_OR_ORIGINAL_TABLE = new Error(2316, "No records found for given primary key values.");

    //----------------------------------------------
    // Error codes for Setup Errors - (2330 - 2399)
    //----------------------------------------------
    KSErrorConstants.SETUP_GENERIC_ERROR = new Error(2330, "Setup failed with an error");
    KSErrorConstants.SETUP_METADATA_REFRESH_ERROR = new Error(2332, "Metadata refresh failed with an error");
    KSErrorConstants.SETUP_OBJECT_METADATA_NOT_FOUND = new Error(2333, "Object metadata not found for the given offline object");
    KSErrorConstants.SETUP_NAMESPACE_METADATA_NOT_FOUND = new Error(2334, "Namespace metadata not found for the given offline object");
    KSErrorConstants.SETUP_UNABLE_TO_PARSE_METADATA_JSON_RELATIONSHIP = new Error(2338, "Error parsing relationships");
    KSErrorConstants.SETUP_EMPTY_METADATA_DELTA_CONTEXT = new Error(2341, "Metadata JSON from server does not contain TIMESTAMP key");
    KSErrorConstants.INVALID_METADATA_JSON = new Error(2342, "Metadata JSON is invalid.");
    KSErrorConstants.SETUP_METADATA_NAMESPACES_NIL = new Error(2344, "Namespaces cannot be null or empty in the metadata");
    KSErrorConstants.SETUP_METADATA_OBJECTS_NIL = new Error(2345, "Objects cannot be null or empty in the metadata");
    KSErrorConstants.SETUP_INVALID_RELATIONSHIP_TYPE = new Error(2346, "Invalid relationship type found. Supported types are 'One To Many', 'Many To One' and 'One To One'");
    KSErrorConstants.SETUP_METADATA_ATTRIBUTES_NIL = new Error(2349, "Metadata attributes cannot be nil/empty");
    KSErrorConstants.APPLICATIONTASKS_IN_PROGRESS = new Error(2353, "One or more Sync tasks (i.e. Setup/Drop/Reset) is currently in progress for the application");
    KSErrorConstants.SETUP_METADATA_OBJECTS_PRIMARY_KEY_NIL = new Error(2356, "Keys cannot be null or empty in the object metadata");

    //------------------------------------------------
    // Error codes for Metadata Errors - (2400 - 2429)
    //------------------------------------------------
    KSErrorConstants.METADATA_SDKOBJECT_SYNC_NAME_NULL_OR_EMPTY = new Error(2400, "Cannot create Offline Object with name as null or empty string");
    KSErrorConstants.METADATA_SDKOBJECTSERVICE_NAME_NULL_OR_EMPTY = new Error(2401, "Cannot create Offline Object Service with name as null or empty string");
    KSErrorConstants.METADATA_INVALID_OBJECT_SERVICE_NAME = new Error(2405, "Invalid object service name");
    KSErrorConstants.METADATA_OBJECT_NAME_EMPTY = new Error(2406, "SDK Object name cannot be nil/empty.");
    KSErrorConstants.METADATA_ATTRIBUTE_NAME_NULL_OR_EMPTY = new Error(2409, "Attribute name cannot be null/empty.");

    //------------------------------------------------
    // Error codes for Sync Errors - (2460 - 2559)
    //------------------------------------------------
    KSErrorConstants.SYNC_GENERIC_ERROR = new Error(2460, "Sync Failed due to unexpected error");
    KSErrorConstants.SYNC_IN_PROGRESS = new Error(2461, "Sync cannot be performed as other Offline Object operations are in progress");
    KSErrorConstants.SYNC_NO_RELATIONSHIP_FOUND_BETWEEN_OBJECTS_KEY = 2466;
    KSErrorConstants.SYNC_NO_RELATIONSHIP_FOUND_BETWEEN_OBJECTS_VALUE = 'No relationship between the given Offline Objects';
    KSErrorConstants.SYNC_SOURCE_AND_TARGET_COUNT_FOR_RELATED_OBJECTS_NOT_SAME_KEY = 2467;
    KSErrorConstants.SYNC_SOURCE_AND_TARGET_COUNT_FOR_RELATED_OBJECTS_NOT_SAME_VALUE = 'The number of source attributes and target attributes are not same in the given relationship';
    KSErrorConstants.SYNC_SOURCE_AND_TARGET_COUNT_FOR_RELATED_OBJECTS_NOT_SAME_OBJECT = new Error(
        KSErrorConstants.SYNC_SOURCE_AND_TARGET_COUNT_FOR_RELATED_OBJECTS_NOT_SAME_KEY,
        KSErrorConstants.SYNC_SOURCE_AND_TARGET_COUNT_FOR_RELATED_OBJECTS_NOT_SAME_VALUE);
    KSErrorConstants.SYNC_HIERARCHICAL_UPLOAD_BUILDER_MAX_PASS_COUNT_REACHED =
    new Error(2469, "Unable to build hierarchical upload payload for the given set of records even after maximum iterations 10");
    KSErrorConstants.SYNC_GENERIC_ROLLBACK_ERROR = new Error(2471, "An error occurred while trying to perform rollback");
    KSErrorConstants.SYNC_INVALID_FILTERS = new Error(2472, "Invalid Filters");
    KSErrorConstants.SYNC_UPLOAD_ERROR = new Error(2473, "Sync upload failed with an error");
    KSErrorConstants.SYNC_INVALID_REMOVEAFTERUPLOAD_LIST = new Error(2478, "Invalid removeAfterUpload list. It contains one or more objects that do not exist");
    KSErrorConstants.SYNC_INVALID_REMOVEAFTERUPLOAD_ERR_MSG = "The following object(s) configured as part of removeAfterUpload list do not exist in sync queue";
    KSErrorConstants.SYNC_DOWNLOAD_ERROR = new Error(2474, "Sync download failed with an error");
    KSErrorConstants.SYNC_INVALID_SYNC_TYPE = new Error(2477, "Invalid value found for syncType option. It's either empty or null or not among valid options");
    KSErrorConstants.APPLICATION_SYNC_INVALID_OPTIONS = new Error(2482, "Application sync options provided are invalid.");
    KSErrorConstants.APPLICATION_SYNC_OBJECTSERVICES_NOT_FOUND = new Error(2483, "Setup is not performed. There are no object services to sync.");
    KSErrorConstants.SYNC_EMPTY_PRIMARYKEY_VALUE = new Error(2484, "Primary key %s not found for record.");
    KSErrorConstants.SYNC_OBJECTSERVICE_CLEAR_DATA_ERROR = new Error(2480, "An error occurred while trying to clear offline data on object service");
    KSErrorConstants.SYNC_OBJECT_CLEAR_DATA = new Error(2485, "An error occurred while trying to clear offline data on object");
    KSErrorConstants.SYNC_GENERIC_JSON_PARSING_ERROR_KEY = 2470;

    KSErrorConstants.SYNC_MORE_THAN_ONE_PARENT_FOUND_FOR_A_CHILD_RECORD_KEY = 2468;
    KSErrorConstants.SYNC_GENERIC_JSON_PARSING_ERROR_VALUE = "An error occurred while parsing json";
    KSErrorConstants.SYNC_MORE_THAN_ONE_PARENT_FOUND_FOR_A_CHILD_RECORD_VALUE = "More than one parent was found for a given child record";
    //------------------------------------------------
    // Error codes for Internal Errors - (2900 - 2999)
    //------------------------------------------------
    KSErrorConstants.INTERNAL_INVALID_SYNC_MODE = new Error(2905, "Mode Should be OFFLINE");


    //-----------------------------------------------
    //Error codes for Internal Errors - (2900 - 2999)
    //-----------------------------------------------
    KSErrorConstants.INTERNAL_INVALID_ACTION_TYPE_SENT_TO_ORMFACTORY = new Error(2903, "Invalid action type is sent to ORMManagerFactory");
    KSErrorConstants.INTERAL_GENERIC_ERROR = new Error(2912, "An internal error occurred");

    //------------------------------------------
    // Error codes for Drop Errors - (2430 - 2459)
    //--------------------------------------------
    KSErrorConstants.DROP_DB_FAILED = new Error(2430, "An error occurred while dropping the database");

    //------------------------------------------
    //  Error codes for Upload Cache Errors
    // --------------------------------------------
    KSErrorConstants.INTERNAL_UPLOAD_CACHE_DUPLICATE_ENTRY_FOR_SAME_OBJECT = new Error(2913, "Upload cache has duplicate cache entry for same sync object");
    KSErrorConstants.SYNC_CACHE_UPLOAD_ERROR = new Error(2476,"Pending sync requests failed with an error");

    return KSErrorConstants;
}();

/**
 * Object defining the constants for internal use.
 */
voltmx.sdk.OfflineObjects.KSInternalConstants = Object.freeze({
    //Network constants
    BODY: "body",
    HEADERS: "headers",
    HTTP_METHOD_GET: "GET",
    QUERY_PARAMS: "queryParams",
    CONTENT_TYPE: "Content-Type",
    TIMESTAMP_EQ: "timestamp eq ",
    X_KONY_SERVICE_VERSION_VALUE: "2.0",
    APPLICATION_JSON: "application/json",
    X_KONY_API_VERSION: "X-Voltmx-API-Version",
    X_KONY_AUTHORIZATION: "X-Voltmx-Authorization",
    X_KONY_REPORTINGPARAMS: "X-Voltmx-ReportingParams",
    X_HTTP_METHOD_OVERRIDE: "X-Http-Method-Override",
    X_KONY_SERVICE_VERSION: "X-Voltmx-Service-Version",
    X_KONY_REQUEST_CACHE_ID: "X-Voltmx-RequestCacheId",

    URL: "url",
    NAME: "name",
    VERSION: "version",
    ENDPOINT_URL: "endpointURL",
    OBJECTSERVICE_METADATA_URL: "metadata_url",
    OBJECT_METADATA: "metadata",
    OBJECT_SERVICE_METADATA_CONTEXT: "objectServiceMetadataContext",

    OFFLINE: "offline",
    SYNC_EMPTY_NAMESPACE_NAME: "",
    UNNAMED_NAMESPACE: "kony_unnamed",
    SYNC_EMPTY_OBJECT_SERVICE_NAME: "",
    FULLY_QUALIFIED_NAME: "fullyQualifiedName",
    UNNAMED_NAMESPACE_WITH_DOT: "kony_unnamed.",

    //Metadata constants
    TIMESTAMP: "timestamp",
    UPLOAD_CACHE: "uploadCache",
    HTTP_RESPONSE: "httpresponse",
    CONFLICT_POLICY: "conflict_policy",
    OBJECT_SERVICE_NAME: "objectServiceName",
    IS_CHANGE_AFTER_LAST_FETCH_TIME: "isChangeAfterLastFetchTime",

    NAMESPACE_NAME: "name",
    NAMESPACES: "namespaces",
    NAMESPACE: "namespace",
    NAMESPACE_ACTION: "action",
    PARENT_ROOT_METADATA: "parentRootMetadata",
    NAMESPACE_METADATA_DICTIONARY: "namespaceMetadataDictionary",

    OBJECT: "object",
    OBJECTS: "objects",
    OBJECTS_NAME: "name",
    OBJECTS_KEYS: "key",
    OBJECTS_ACTION: "action",
    OPERATIONS_ACTIONS: "actions",
    OPERATIONS: "operations",
    OBJECTS_FIELDS: "fields",
    OBJECTS_OPERATIONS: "operations",
    OBJECTS_PRIMARY_KEYS: "primaryKey",
    OBJECTS_CACHE_TIMEOUT: "cache_timeout",
    OBJECTS_RELATIONSHIPS: "relationships",
    OBJECTS_SOFT_DELETE_FIELD: "softdelete_field",
    OBJECTS_CHILD_RELATIONSHIPS: "childRelationships",
    OBJECTS_DELTA_CONTEXT_FIELD: "delta_context_field",
    OBJECTS_PARENT_RELATIONSHIPS: "parentRelationships",
    PARENT_NAMESPACE_METADATA: "parentNamespaceMetadata",
    OBJECT_METADATA_DICTIONARY: "objectMetadataDictionary",
    OBJECTS_NON_NULLABLE_ATTRIBUTES: "nonNullableAttributes",

    ATTRIBUTES_NAME: "name",
    ATTRIBUTES: "attributes",
    BINARY_ATTRIBUTES: "binaryAttributes",
    ATTRIBUTES_ACTION: "action",
    ATTRIBUTES_LENGTH: "length",
    ATTRIBUTES_NULLABLE: "nullable",
    ATTRIBUTES_DATATYPE: "datatype",
    ATTRIBUTES_CREATABLE: "creatable",
    ATTRIBUTES_UPDATABLE: "updatable",
    ATTRIBUTES_SOFT_DELETABLE: "softDeletable",
    ATTRIBUTES_AUTO_GENERATED: "auto_generated",
    ATTRIBUTES_SOURCE_DATATYPE: "source_datatype",
    PARENT_OBJECT_METADATA: "parentObjectMetadata",

    RELATIONSHIP_NAME: "name",
    RELATIONSHIP_TYPE: "type",
    RELATIONSHIP_ACTION: "action",
    SUPPORTED_OBJECTS :"supportedObjects",
    RELATIONSHIP_CASCADE: "cascade",
    RELATIONSHIP_TARGET_OBJECT: "target_object",
    RELATIONSHIP_SOURCE_OBJECT: "source_object",
    RELATIONSHIP_TARGET_ATTRIBUTES: "target_fields",
    RELATIONSHIP_SOURCE_ATTRIBUTES: "source_fields",
    RELATIONSHIP_BACKEND_CASCADE_SUPPORT: "backend_cascade_support",

    KSRelationshipTypes:
        {
            ONE_TO_ONE: "OneToOne",
            ONE_TO_MANY: "OneToMany",
            MANY_TO_ONE: "ManyToOne"
        },

    KSObjectOperationType:
        {
            get: "get",
            create: "create",
            update: "update",
            partialupdate: "partialupdate",
            delete: "delete"
        },

    EM_GENERIC_DATA_FETCHER: "Failed to retrieve network response for Object Service: ",
    EM_SETUP_VERSION_MISMATCH: "Offline setup failed due to version mismatch.",
    EM_FIRST_TIME_OFFLINE_SETUP: "Could not refresh metadata due to network error, object service metadata is not available offline for app version:",

    //SyncLevel Constants
    SYNCLEVEL_OBJECT: "Object",
    SYNCLEVEL_OBJECTSERVICE: "ObjectService",
    SYNCLEVEL_APPLICATION: "Application",

    // Task Constants
    SYNC_OBJECT: "syncObject",

    //Offline Constants
    OFFLINE_FLAG: "offline",
    OFFLINE_FLAG_VALUE: "true",

    //Sync Download Request Constants
    FILTER: "filter",
    DOLLAR_EXPAND: "$expand",
    DOLLAR_FILTER: "$filter",
    OBJECT_NAME: "objectname",
    ROOT_OBJECT_NAME: "rootObjectName",
    ODATASTRING: "odatastring",
    QUERYPARAMS: "queryParams",
    REQUEST_BODY: "requestBody",
    SYNC_OPTIONS: "syncOptions",
    REQUEST_HEADERS: "requestHeader",
    DOLLAR_FILTER_EQUALS_TO: "$filter=",
    DOLLAR_EXPAND_EQUALS_TO: "$expand=",

    //Database Constants
    OBJS: "objs",
    DELTA: "delta",
    DELTACONTEXT: "deltacontext",
    DELTA_CONTEXT: "delta_context",
    BATCH_CONTEXT: "bc",

    //Database upgrade constants
    QUERIES: "queries",
    DB_UPGRADE_CONTEXT: "dbUpgradeContext",
    NEXT_INDEXEDDB_VERSION: "nextIndexedDBVersion",
    CURRENT_INDEXEDDB_VERSION: "currentIndexedDBVersion",
    SHOULD_UPGRADE_PROPERTIES_TABLE_VERSION: "shouldUpgradePropertiesTableDBSchemaVersionValue",

    //Download Response Constants
    ACTION: "action",
    RECORDS: "records",
    CHECKSUM: "checksum",
    TRUE_STRING : "true",
    METADATA: "metadata",
    OP_STATUS: "opstatus",
    _METADATA: "_metadata",
    HTTP_STATUS_CODE: "httpStatusCode",
    DOWNLOAD_RESPONSE_METADATA: "downloadResponseMetadata",

    //Upload Response Constants
    UPLOAD_RESPONSE_METADATA: "uploadResponseMetadata",
    INTERMEDIATE_ERR_MSG : "intermediateErrors",
    ERR_MSG: "errmsg",
    ERR_CODE: "errcode",
    NETWORK_EXCEPTION : "networkException",

    //Upload Payload builder constants
    ARE_THERE_CHANGES_TO_UPLOAD: "areThereChangesToUpload",
    SESSION_ID: "sessionID",
    ECHO: "echo",
    DATA: "data",
    HAS_MORE_RECORDS: "hasMoreRecords",
    ABORT_ON_ERROR: "abortonError",
    TOTAL_NAMESPACES: "totalNamespaces",
    TOTAL_RECORDS: "totalRecords",
    TOTAL_OBJECTS: "totalObjects",
    RECORD_COUNT: "recordCount",
    IGNORE_DUPLICATES: "ignore_duplicate",
    ROW_ID: "rowId",
    HTTP_OVERRIDE_UPLOAD: "UPLOAD",
    REQUEST_QUERY_PARAMS: "queryParams",
    OPERATION_MAP: "operationMap",
    MAX_PASS_COUNT_FOR_HIERARCHICAL_UPLOADS: 10,
    FORWARD_HIERARCHICAL_DEPENDENCY_MAP: 'forwardHierarchicalDependencyMap',
    REVERSE_HIERARCHICAL_DEPENDENCY_MAP: 'reverseHierarchicalDependencyMap',
    ORDERED_HIERARCHICAL_OBJECT_NAME_LIST: 'orderedHierarchicalObjectNameList',

    //Generic constants
    MODE: "OFFLINE",
    SCOPE_NAME: "scopename",

    //Download Response Body Parsing Constants
    DATA_OBJECTS: "dataObjects",
    OBJECTS_IN_RESPONSE: "Objects",
    METADATA_OBJECT: "metadataObject",
    RECORD_MATADATA :"recordMetadata",

    //String
    DOT: ".",
    EQUALS: "=",
    EMPTY_STRING: "",
    COMMA_SEPARATOR : ",",
    LESS_THAN_EQUALS_TO : "<=",
    GREATER_THAN_EQUALS_TO : ">=",

    //Network Constants
    OPSTATUS_SUCCESS: 0,

    //Sync Errors
    UPLOAD_SYNC_ERRORS : "uploadSyncErrors",
    DOWNLOAD_SYNC_ERRORS: "downloadSyncErrors",

    //Constants inside Error Object
    ERROR_DOMAIN: "domain",

    //Sync Stats Constants
    TYPE : "type",
    SYNC_OBJECT_NAME  : "name",
    SUCCESS_COUNT : "successCount",
    TOTAL_UPLOADED_RECORDS : "totalUploadedRecords",
    TOTAL_DOWNLOADED_RECORDS : "totalDownloadedRecords",
    NUMBER_OF_RECORDS_SYNCED : "numberOfRecordsSynced",
    NUMBER_OF_RECORDS : "numberOfRecords",

    //Batching constants
    BATCH_SIZE_FILTER : "$batchsize",
    DEFAULT_BATCH_NUMBER : 1,
    DEFAULT_DOWNLOAD_BATCH_SIZE : 500,

    //Data type Constants
    DATA_TYPE_BOOLEAN : "boolean",
    DATA_TYPE_STRING : "string",

    //Boolean Values Constants
    BOOLEAN_VALUE_TRUE : "true",
    BOOLEAN_VALUE_FALSE : "false",

    //Upload batching constants
    DEFAULT_UPLOAD_BATCH_SIZE : 50,
    DEFAULT_RSN_OF_PREVIOUS_BATCH : -1,

    //String Constants
    INTERNAL_USER_INFO : "internalUserInfo",
    
    //Upload cache constants
    HTTP_STATUS : "httpStatus",
    HTTP_TOO_MANY_REQUESTS : 429,
    UPLOAD_BATCH_ERRORS : "uploadBatchErrors",
    CACHE_UPLOAD_ERRORS : "cacheUploadErrors",
    INVALID_OPSTATUS_FROM_SERVER :2038,
    PARTIAL_SUCCESS_OPSTATUS_MIN_VALUE : 500100,
    PARTIAL_SUCCESS_OPSTATUS_MAX_VALUE : 500200,
    OPSTATUS_REQUEST_ALREADY_IN_PROGRESS : 500210,

    //incremental Setup Constants.
    INCREMENTAL_SETUP : "incrementalSetup",
    OBJECT_SERVICE_METADATA_CONTEXT : "objectServiceMetadataContext"
});
/**
 * Defines constants that are exposed to end user through offline objects API input and response objects.
 * Created by Prasanthi Bonam on 30-05-2018.
 * Copyright © 2017 Kony. All rights reserved.
 */
voltmx.sdk.OfflineObjects.KSPublicConstants = Object.freeze({
    STATUS : "status",


    // Constants for Config Policies
    DOWNLOAD_ONLY : "downloadOnly",
    UPLOAD_ONLY : "uploadOnly",
    FULL_SYNC : "fullSync",
    SYNC_TYPE : "syncType",
    UPLOAD_TAG : "upload",
    DOWNLOAD_TAG : "download",
    SYNC_STATS : "syncStats",
    UPLOAD_STATS : "uploadStats",
    DOWNLOAD_STATS : "downloadStats",
    GET_SYNC_STATS : "getSyncStats",
    SYNC_UPLOAD_QUERY_PARAMS : "uploadRequestQueryParams",
    SYNC_DOWNLOAD_QUERY_PARAMS : "downloadRequestQueryParams",
    SYNC_PENDING_RECORDS: "pendingSyncRecords",
    QUERY_PARAMS: "queryParams",

    //CRUD Constants
    ORDER_BY_DEFAULT : "ASC",
    ORDER_BY_ASCENDING : "ASC",
    ORDER_BY_DESCENDING : "DESC",
    ORDER_BY_ASCENDING_IGNORECASE : "ASC_IGNORECASE",
    ORDER_BY_DESCENDING_IGNORECASE : "DESC_IGNORECASE",
    CRUD_OPTION_ORDERBY_MAP : "orderByMap",
    CRUD_OPTION_PRIMARY_KEYS : "primaryKeys",
    CRUD_OPTION_WHERE_CONDITION : "whereCondition",
    CRUD_OPTION_WHERE_CONDITION_AS_A_STRING : "whereConditionAsAString",
    CRUD_OPTION_PROJECTION_COLUMNS : "projectionColumns",
    TRACK_CHANGES : "trackChanges",
    MARK_FOR_UPLOAD : "markForUpload",
    TRACK_INTERMEDIATE_UPDATES : "trackIntermediateUpdates",

    // Constants for SYNC ERROR propagation
    ERRMSG : "errmsg",
    OBJECT : "object",
    OPSTATUS : "opstatus",
    SYNC_ERRORS : "syncErrors",
    PRIMARY_KEYS : "primaryKeys",
    OBJECT_SERVICE : "objectService",

    //Batching constants
    DOWNLOAD_BATCH_SIZE : "downloadBatchSize",
    UPLOAD_BATCH_SIZE : "uploadBatchSize",
    UPLOAD_BATCH_NUMBER : "uploadBatchNumber",
    UPLOAD_BATCH_PARAMS : "uploadBatchParams",
    REMOVE_AFTER_UPLOAD : "removeAfterUpload",

    // Application Sync Constants
    APPLICATION_SYNC_MODE : "syncMode",
    APPLICATION_SYNC_PARALLEL : "parallel",
    APPLICATION_SYNC_SEQUENTIAL : "sequential",
    APPLICATION_SYNC_OBJECT_SERVICES_OPTIONS : "objectServicesOptions",
    APPLICATION_SYNC_SUCCESS_RESPONSE : "successResponse",
    APPLICATION_SYNC_FAILURE_RESPONSE : "failureResponse",

    // Running Tasks Context Constant
    RUNNING_TASKS_CONTEXT : "KSRunningTasksContext",
    APP_LAUNCH : "appLaunch",

    //sync Download Constants
    DOWNLOAD_RECONCILIATION_REQUIRED : "downloadReconciliationRequired",
    // optimise records for create and update
    SYNC_LATEST_OBJECT_SNAPSHOT: "syncLatestObjectSnapshot"
});
voltmx.sdk.OfflineObjects.KSTableType = Object.freeze({
    "MAIN": 0,
    "ORIGINAL": 1,
    "HISTORY": 2
});
/**
 * Object defining the enumeration for each running tasks.
 * Created by Archana Narahari on 08-08-2018.
 * Copyright © 2017 Kony. All rights reserved.
 */

//-------------------------------------
// ENUM ASSOCIATED WITH EVERY SYNC TASK
//-------------------------------------
voltmx.sdk.OfflineObjects.KSTaskID = {
    SETUP : 1,
    DROP : 2,
    RESET : 4,
    ROLLBACK : 8,
    SYNC : 16
};

var KSTaskID = voltmx.sdk.OfflineObjects.KSTaskID;


//----------------------------------------------------------------------------------
// OBJECT STATING THE ENUM ASSOCIATED WITH EACH TASK AND THE TASKS THAT CAN BLOCK IT
//----------------------------------------------------------------------------------
voltmx.sdk.OfflineObjects.KSTasks = {
    SETUP : {
        ID : KSTaskID.SETUP,
        BLOCKINGTASKS : KSTaskID.SETUP | KSTaskID.DROP | KSTaskID.RESET | KSTaskID.SYNC | KSTaskID.ROLLBACK
    },

    DROP : {
        ID : KSTaskID.DROP,
        BLOCKINGTASKS : KSTaskID.SETUP | KSTaskID.DROP | KSTaskID.RESET | KSTaskID.SYNC | KSTaskID.ROLLBACK
    },

    RESET : {
        ID : KSTaskID.RESET,
        BLOCKINGTASKS : KSTaskID.SETUP | KSTaskID.DROP | KSTaskID.RESET | KSTaskID.SYNC | KSTaskID.ROLLBACK
    },

    ROLLBACK : {
        ID : KSTaskID.ROLLBACK,
        BLOCKINGTASKS : KSTaskID.SETUP | KSTaskID.DROP | KSTaskID.RESET | KSTaskID.ROLLBACK | KSTaskID.SYNC
    },

    SYNC : {
        ID : KSTaskID.SYNC,
        BLOCKINGTASKS : KSTaskID.SETUP | KSTaskID.DROP | KSTaskID.RESET | KSTaskID.ROLLBACK | KSTaskID.SYNC
    }
};
// ************************************* Start of KSDatabaseAPI.js ************************************* 

define("KSDatabaseAPI", ["require", "exports", "VoltmxNoSQLDatabaseHelper", "KSCommonUtils", "KSExceptionWrapperUtils"], function (require, exports, _VoltmxNoSQLDatabaseHelper, KSCommonUtils, KSExceptionWrapperUtils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    var KSDatabaseAPI = /** @class */ (function () {
            var dbInstance = null;
            var VMXNoSQLDatabaseHelper = _VoltmxNoSQLDatabaseHelper.VoltmxNoSQLDatabaseHelper;

            function KSDatabaseAPI() {
            }

            KSDatabaseAPI.initializeDatabase = async function (dbname, nextIndexedDBVersion, dbInfo) {
                try {
                    if (voltmx.sdk.isNullOrUndefined(dbInfo)) {
                        dbInfo = {};
                    }
                    dbInstance = await VMXNoSQLDatabaseHelper.getDBInstance(dbname, nextIndexedDBVersion, dbInfo);
                } catch (DBException) {
                    throw KSExceptionWrapperUtils.wrapDBException(DBException);
                }
            };

            KSDatabaseAPI.closeDBConnection = async function () {
                try {
                    if (!voltmx.sdk.isNullOrUndefined(dbInstance)) {
                        return (await dbInstance.closeConnection());
                    }
                } catch (DBException) {
                    throw KSExceptionWrapperUtils.wrapDBException(DBException);
                }
            };

            KSDatabaseAPI.resetDatabase = async function () {
                try {
                    return (await dbInstance.resetDatabase());
                } catch (DBException) {
                    throw KSExceptionWrapperUtils.wrapDBException(DBException);
                }

            };

            KSDatabaseAPI.dropDatabase = async function (dbName) {
                try {
                    if (dbInstance == null && dbName) {
                        if (await KSDatabaseAPI.databaseExists(dbName)) {
                            await KSDatabaseAPI.initializeDatabase(dbName);
                        } else {
                            return;
                        }
                    }
                    await dbInstance.dropDatabase(dbName);
                    dbInstance = null;
                } catch (DBException) {
                    throw KSExceptionWrapperUtils.wrapDBException(DBException);
                }
            };

            KSDatabaseAPI.executeQuery = async function (query) {
                try {
                    return (await dbInstance.executeQuery(query));
                } catch (DBException) {
                    throw KSExceptionWrapperUtils.wrapDBException(DBException);
                }
            };

            KSDatabaseAPI.executeQueriesAsTransaction = async function (queries, tableListAsStringArray) {
                if (KSCommonUtils.isNullOrEmptyObject(tableListAsStringArray)) {
                    tableListAsStringArray = await dbInstance.getAllTablesList();
                }

                return dbInstance.transaction(voltmx.nosql.READ_WRITE, tableListAsStringArray, async function (transaction) {
                    for (var i = 0; i < queries.length; i++) {
                        try {
                            await dbInstance.executeQuery(queries[i], transaction);
                        } catch (ex) {
                            voltmx.sdk.logsdk.error("KSDatabaseAPI :executeQueriesAsTransaction aborting transaction due to ", ex);
                            transaction.tx.abort();
                            return ;
                        }
                    }
                });
            };

            KSDatabaseAPI.executeQueries = async function (queries, rollbackOnError) {
                if (rollbackOnError) {
                    return await KSDatabaseAPI.executeQueriesAsTransaction(queries);
                }
                else {
                    var results = [];
                    for (var i = 0; i < queries.length; i++) {
                        try {
                            var query = queries[i];
                            var result = await dbInstance.executeQuery(query);
                            results.push({"query": query, "status": "Success", "queryResult": result});
                        } catch (error) {
                            results.push({"query": query, "status": "Failure", "queryResult": error});
                        }
                    }
                    return results;
                }
            };

            KSDatabaseAPI.tableExists = async function (tableName) {
                try {
                    return (await dbInstance.isTableFound(tableName));
                } catch (DBException) {
                    throw KSExceptionWrapperUtils.wrapDBException(DBException);
                }
            };

            KSDatabaseAPI.databaseExists = async function (databaseName) {
                try {
                    return await VMXNoSQLDatabaseHelper.doesDatabaseExists(databaseName);
                } catch (DBException) {
                    throw KSExceptionWrapperUtils.wrapDBException(DBException);
                }
            };

            KSDatabaseAPI.getCurrentDBVersion = async function (databaseName) {
                return await VMXNoSQLDatabaseHelper.getCurrentDBVersion(databaseName);
            };

            return KSDatabaseAPI;
        }()
    );
    exports.KSDatabaseAPI = KSDatabaseAPI;
});
// ************************************* End of KSDatabaseAPI.js ************************************* 

/**
 * KSDatabaseUpgradeManager
 * Created by Nikhil Kolhe on 01-05-2019.
 * Copyright © 2019 Kony. All rights reserved.
 */

/* In KSDatabaseUpgradeManager unlike native platforms (android, iOS and windows) dbSchema version is not stored in voltmxSyncPROPERTIES table
    where as it is stored in local storage with the key "dbSchemaVersion".

    Reason : For knowing the current db version we have to open the database with a specific version and that version with which
    the db is to be opened is not known.

    Example : If the DB version needs to be upgraded from version 2 to version 4. The db needs to be opened with version 2
    but if the current version is also stored in voltmxSyncPROPERTIES table, we still are unaware with which version to open the db.
    Hence local storage is used to store the current db version.

    As the db version is stored in local storage during upgrade scenarios, db version from local storage is fetched and upgrade is performed.
     1) After successful setup the dbSchemaVersion key in local storage is updated/created(in case key is not present) with latest version.
     2) After each drop success the dbSchemaVersion key is also removed from local storage.
 */

define("KSDatabaseUpgradeManager",

    ["exports", "KSDatabaseAPI", "KSCommonUtils", "KSQueryObjectBuilder"],

    function (exports, _KSDatabaseAPI, KSCommonUtils, KSQueryObjectBuilder) {

        "use strict";
        exports._esModule = true;

        var logger = voltmx.sdk.logsdk;
        var LOG_PREFIX = "KSDatabaseUpgradeManager : ";
        var KSDatabaseAPI = _KSDatabaseAPI.KSDatabaseAPI;
        var KSDatabaseConstants = voltmx.sdk.OfflineObjects.KSDatabaseConstants;
        var KSDatabaseOperation = KSDatabaseConstants.KSDatabaseOperations;
        var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;
        var KSDatabaseSchemaVersion = voltmx.sdk.OfflineObjects.KSDatabaseSchemaVersion;

        var nextIndexedDBVersion = 0;
        var shouldUpdatePropertiesTable = false;
        var DB_SCHEMA_VERSION = "dbSchemaVersion";

        /**
         * This function returns queries to upgrade konysync tables.
         * If there is DB does not exist: DB upgrade is skipped, as setup will take care of table creation
         * If DB exists in version 1: Implies current user is in 8.3
         * If DB exists in version 2: Implies current user is in 8.4
         * @return context of db upgrade
         */
        async function getContextToPerformDBUpgrade() {
            logger.trace(LOG_PREFIX, "Began to perform DB upgrade");

            var dbUpgradeQueries = {};
            var dbName = KSCommonUtils.getOfflineObjectsDatabaseName();
            var dbVersion = await KSDatabaseAPI.getCurrentDBVersion(dbName);
            var latestDBSchemaVersion = KSDatabaseSchemaVersion.getLatestVersion();

            var existingDBSchemaVersion = (dbVersion !== KSDatabaseSchemaVersion.Version_None) ?
                await getExistingDBSchemaVersion() : KSDatabaseSchemaVersion.Version_None;

            if (dbVersion === KSDatabaseSchemaVersion.Version_None
                || existingDBSchemaVersion === latestDBSchemaVersion) {

                logger.debug(LOG_PREFIX, "DB schema upgrade is not required as DB schema version is same as " +
                    "current DB version or db doesn't exist.");
                if (dbVersion === KSDatabaseSchemaVersion.Version_None) {
                    nextIndexedDBVersion = KSDatabaseSchemaVersion.Version_2;
                } else {
                    nextIndexedDBVersion = dbVersion + 1;
                }

            } else if (dbVersion === KSDatabaseSchemaVersion.Version_Default) {

                dbUpgradeQueries = await getQueriesToPerformDBUpgradeFromV03ToV04();
                getQueriesToPerformDBUpgradeFromV04ToV05();

            } else if (dbVersion === KSDatabaseSchemaVersion.Version_2) {
                getQueriesToPerformDBUpgradeFromV04ToV05();

            } else {
                // From the next version Database upgrade:
                //   - we have to check the dbschemaversion key value.
                nextIndexedDBVersion = dbVersion + 1;
            }

            return getUpgradeContext(dbUpgradeQueries, dbVersion);
        }

        function getUpgradeContext(dbUpgradeQueries, dbVersion) {
            return {
                [KSInternalConstants.QUERIES] : dbUpgradeQueries,
                [KSInternalConstants.CURRENT_INDEXEDDB_VERSION] : dbVersion,
                [KSInternalConstants.NEXT_INDEXEDDB_VERSION] : nextIndexedDBVersion,
                [KSInternalConstants.SHOULD_UPGRADE_PROPERTIES_TABLE_VERSION] : shouldUpdatePropertiesTable
            };
        }

        /**
         * Method performs DB schema upgrade from version 3 to version 4
         */
        async function getQueriesToPerformDBUpgradeFromV03ToV04() {
            logger.debug(LOG_PREFIX, "Began to get queries to perform DB upgrade from version 3 to 4.");

            var createTableQuery = {};
            shouldUpdatePropertiesTable = true;

            nextIndexedDBVersion = KSDatabaseSchemaVersion.Version_2;
            createTableQuery[KSDatabaseConstants.SQL_TABLE_KONY_SYNC_UPLOAD_CACHE] = KSDatabaseConstants
                .QUERY_KONY_SYNC_UPLOAD_CACHE_TABLE;

            return {[KSDatabaseConstants.KSQueryTypes.CREATE] : createTableQuery};
        }

        /**
         * Method performs DB schema upgrade from version 4 to version 5
         */
        function getQueriesToPerformDBUpgradeFromV04ToV05() {
            logger.debug(LOG_PREFIX, "Began to get queries to perform DB upgrade from version 4 to 5.");

            shouldUpdatePropertiesTable = true;
            voltmx.store.removeItem(DB_SCHEMA_VERSION);

            nextIndexedDBVersion = KSDatabaseSchemaVersion.Version_2;
        }

        /**
         * Method to fetch current DB Schema version from voltmxSyncProperties Table
         *
         * @return dbSchemaVersion
         */
        async function getExistingDBSchemaVersion() {
            logger.trace(LOG_PREFIX, "Fetching existing DB schema version from voltmxSyncPROPERTIES table.");

            var dbName = KSCommonUtils.getOfflineObjectsDatabaseName();
            await KSDatabaseAPI.initializeDatabase(dbName);

            var whereClause = {
                [KSDatabaseConstants.PROPERTIES_TABLE_KEY_COLUMN] : KSDatabaseConstants.DB_SCHEMA_VERSION
            };

            var query = KSQueryObjectBuilder.getQueryObjectForTableName(KSDatabaseConstants.SQL_TABLE_KONY_PROPERTIES,
                KSDatabaseOperation.SELECT)
                .setWhereClause(whereClause)
                .build();

            var dbSchemaVersion = await KSDatabaseAPI.executeQuery(query);
            await KSDatabaseAPI.closeDBConnection();

            logger.info(LOG_PREFIX, "Successfully fetched existing db schema version: " + dbSchemaVersion);
            return dbSchemaVersion[0][KSDatabaseConstants.PROPERTIES_TABLE_VALUE_COLUMN];
        }

        exports.getContextToPerformDBUpgrade = getContextToPerformDBUpgrade;
    });

define("KSQueryObjectBuilder", ["require", "exports", "KSCommonUtils"], function (require, exports, KSCommonUtils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });

    var KSDbConstants = voltmx.sdk.OfflineObjects.KSDatabaseConstants;
    var KSDatabaseOperation = KSDbConstants.KSDatabaseOperations;

    //Given WhereClauseAsString Of the Form col1 == val1 OR col2 > val2
    //It converts into array of arrays such as [["col1","==","val1"],["OR"],["col2",">","val2"]]
    //Will not support columns with spaces inside them
    var convertWhereClauseAsStringToWhereClauseArray = function(where_clause){
        function convertRhsValueAsPerDataType(value){
            if(value === "false") {
                return false;
            }else if (value === "true") {
                return true;
            } else if(isNaN(value)){
                if(value.startsWith("'") && value.endsWith("'")
                  || value.startsWith('"') && value.endsWith('"')){
                    value = value.slice(1, (value.length)-1);
                }
                return value;
            } else {
                return Number(value);
            }
        }
        var delimiter = " ";
        var splittedArray = where_clause.split(delimiter);
        var resultArray = [];
        var tempArray =[];
        for(var index = 0;index<splittedArray.length;){
            for(var operatorArrayIndex=0;operatorArrayIndex<3;operatorArrayIndex++,index++){
                // get proper RHS value, in accordance with datatype, e.g.
                // "Age = 25" : in this case RHS should be a number 25, and result array should be ["Age", "=", 25]
                // "Age = '25'" :  in this case RHS should be a string "25", and result array should be ["Age", "=", "25"]
                // "isdeleted = true" : in this case RHS should be a boolean true, and result array should be ["isdeleted", "=", true]
                // "isdeleted = 'true'" : in this case RHS should be a string "true", and result array should be ["isdeleted", "=", "true"]
                if(operatorArrayIndex ==2) {
                    tempArray.push(convertRhsValueAsPerDataType(splittedArray[index]));
                } else {
                    tempArray.push(splittedArray[index]);
                }
            }
            resultArray.push(tempArray);
            tempArray = [];
            // This case is for checking End of the String parsing and also
            // Pushing the operand in the middle OR , AND
            if(index < splittedArray.length)
            {
                tempArray.push(splittedArray[index++]);
                resultArray.push(tempArray);
                tempArray =[];
            }
        }
        return resultArray;
    };

    var KSBaseQueryObjectBuilder = /** @class */ (function () {
        function KSBaseQueryObjectBuilder() {
            this.query = {};
            this.setWhereClause = function (_whereClause) { return this; };
            this.setWhereClauseAsString = function(_whereClauseAsString) {return this;};
            this.addInsertValues = function (_value) { return this; };
            this.setProjectionColumns = function (_projectionColumns) { return this; };
            this.addOrderByMap = function (_orderbyclause) { return this; };
            this.setUpdatedData = function (_updatedData) { return this; };
            this.setCallback = function (_calllback) { return this; };
            this.setLimit = function (_calllback) { return this; };
            this.addGroupByList = function (_groupbyclause) { return this; };
            this.addGroupByIndex = function(_groupbyindex) { return this; };
            this.build = function () {
                return this.query;
            };
            this.query = {
                [KSDbConstants.OPERATION_TYPE]: null,
                [KSDbConstants.TABLE_NAME]: null,
                "whereClause": null,
                "insertValues": null,
                "whereClauseAsString": null,
                "projectionColumn": null,
                "groupBy":null,
                "groupByIndex":null,
                "orderBy": null,
                "updateData": null,
                "limit": null,
                "callback":null
            };
        }
        return KSBaseQueryObjectBuilder;
    }()); // End of class file KSBaseQueryObjectBuilder

    var KSCreateQueryObjectBuilder = /** @class */ (function (_super) {
        function KSCreateQueryObjectBuilder(table_name, isReplace) {
            var _this = _super.call(this) || this;
            _this.addInsertValues = function (_value) {
                if (!KSCommonUtils.isNullOrEmptyObject(_value)) {
                    this.query.insertValues.push(_value);
                }
                return this;
            };
            _this.query[KSDbConstants.TABLE_NAME] = table_name;
            if (isReplace === true) {
                _this.query[KSDbConstants.OPERATION_TYPE] = KSDatabaseOperation.INSERT_OR_REPLACE;
            }
            else {
                _this.query[KSDbConstants.OPERATION_TYPE] = KSDatabaseOperation.INSERT;
            }
            _this.query["insertValues"] = [];
            return _this;
        }
        __extends(KSCreateQueryObjectBuilder, _super);
        return KSCreateQueryObjectBuilder;
    }(KSBaseQueryObjectBuilder)); //End of class KSCreateQueryObjectBuilder

    var KSDeleteQueryObjectBuilder = /** @class */ (function (_super) {
        function KSDeleteQueryObjectBuilder(table_name) {
            var _this = _super.call(this) || this;
            _this.setWhereClause = function (_whereClause) {
                if (!KSCommonUtils.isNullOrEmptyObject(_whereClause)) {
                    this.query.whereClause = _whereClause;
                }
                return this;
            };
            _this.setWhereClauseAsString = function(_whereClauseAsString) {
                if (!KSCommonUtils.isNullOrEmptyObject(_whereClauseAsString)) {
                    this.query.whereClause = convertWhereClauseAsStringToWhereClauseArray(_whereClauseAsString);
                }
                return this;
            };
            _this.query[KSDbConstants.OPERATION_TYPE] = KSDatabaseOperation.DELETE;
            _this.query[KSDbConstants.TABLE_NAME] = table_name;
            return _this;
        }
        __extends(KSDeleteQueryObjectBuilder, _super);
        return KSDeleteQueryObjectBuilder;
    }(KSBaseQueryObjectBuilder)); //End of class KSDeleteQueryObjectBuilder

    var KSReadQueryObjectBuilder = /** @class */ (function (_super) {
        function KSReadQueryObjectBuilder(table_name) {
            var _this = _super.call(this) || this;
            _this.setWhereClause = function (_whereClause) {
                if (!KSCommonUtils.isNullOrEmptyObject(_whereClause)) {
                    this.query.whereClause = _whereClause;
                }
                return this;
            };
            _this.setWhereClauseAsString = function(_whereClauseAsString) {
                if (!KSCommonUtils.isNullOrEmptyObject(_whereClauseAsString)) {
                    this.query.whereClause = convertWhereClauseAsStringToWhereClauseArray(_whereClauseAsString);
                }
                return this;
            };
            _this.setProjectionColumns = function (_projectionColumns) {
                if (!KSCommonUtils.isNullOrEmptyObject(_projectionColumns)) {
                    this.query.projectionColumn = _projectionColumns;
                }
                return this;
            };
            _this.addGroupByList = function (_groupbyclause) {
                if (!KSCommonUtils.isNullOrEmptyObject(_groupbyclause)) {
                    this.query.groupBy = _groupbyclause;
                    //By default, giving groupByIndex as 0 as SPA layer groupby implementation will return
                    //an array of 0th index based unique records from each group.
                    //Refer, SPA group by implementation in below link
                    //https://konysolutions.atlassian.net/wiki/spaces/MADP/pages/609779761/MADPSPA-655+Storage+Indexdb+requirements+for+Offline+Objects+in+SPA
                    this.query.groupByIndex = 0;
                }
                return this;
            };
            _this.addGroupByIndex = function(_groupbyindex) {
                if(_groupbyindex === null || KSCommonUtils.isInstanceOfNumber(_groupbyindex)) {
                    this.query.groupByIndex = _groupbyindex;
                }
                return this;
            };
            _this.addOrderByMap = function (_orderbyclause) {
                if (!KSCommonUtils.isNullOrEmptyObject(_orderbyclause)) {
                    this.query.orderBy = _orderbyclause;
                }
                return this;
            };
            _this.setCallback = function (_calllback) {
                this.query.callback = _calllback;
                return this;
            };
            _this.setLimit = function (_limit) {
                if (!KSCommonUtils.isNullOrEmptyObject(_limit)) {
                    this.query.limit = _limit;
                }
                return this;
            };
            _this.query[KSDbConstants.OPERATION_TYPE] = KSDatabaseOperation.SELECT;
            _this.query[KSDbConstants.TABLE_NAME] = table_name;
            return _this;
        }
        __extends(KSReadQueryObjectBuilder, _super);
        return KSReadQueryObjectBuilder;
    }(KSBaseQueryObjectBuilder)); //End of class KSReadQueryObjectBuilder

    var KSUpdateQueryObjectBuilder = /** @class */ (function (_super) {
        function KSUpdateQueryObjectBuilder(table_name) {
            var _this = _super.call(this) || this;
            _this.setWhereClause = function (_whereClause) {
                if (!KSCommonUtils.isNullOrEmptyObject(_whereClause)) {
                    this.query.whereClause = _whereClause;
                }
                return this;
            };
            _this.setWhereClauseAsString = function(_whereClauseAsString) {
                if (!KSCommonUtils.isNullOrEmptyObject(_whereClauseAsString)) {
                    this.query.whereClause = convertWhereClauseAsStringToWhereClauseArray(_whereClauseAsString);
                }
                return this;
            };
            _this.setUpdatedData = function (_updatedData) {
                if (!KSCommonUtils.isNullOrEmptyObject(_updatedData)) {
                    this.query.updateData = _updatedData;
                }
                return this;
            };
            _this.query[KSDbConstants.OPERATION_TYPE] = KSDatabaseOperation.UPDATE;
            _this.query[KSDbConstants.TABLE_NAME] = table_name;
            return _this;
        }
        __extends(KSUpdateQueryObjectBuilder, _super);
        return KSUpdateQueryObjectBuilder;
    }(KSBaseQueryObjectBuilder)); //End of class KSUpdateQueryObjectBuilder

    var KSQueryObjectBuilderFactory = /** @class */ (function () {
        function KSQueryObjectBuilderFactory() {
        }
        KSQueryObjectBuilderFactory.getQueryObjectForTableName = function (tablename, builderType) {
            switch (builderType) {
                case KSDatabaseOperation.INSERT:
                    return new KSCreateQueryObjectBuilder(tablename, false);
                case KSDatabaseOperation.INSERT_OR_REPLACE:
                    return new KSCreateQueryObjectBuilder(tablename, true);
                case KSDatabaseOperation.UPDATE:
                    return new KSUpdateQueryObjectBuilder(tablename);
                case KSDatabaseOperation.SELECT:
                    return new KSReadQueryObjectBuilder(tablename);
                case KSDatabaseOperation.DELETE:
                    return new KSDeleteQueryObjectBuilder(tablename);
                default:

            }
        };
        return KSQueryObjectBuilderFactory;
    }()); // End of class KSQueryObjectBuilderFactory

    exports.KSDatabaseOperation = KSDatabaseOperation;
    exports.KSBaseQueryObjectBuilder = KSBaseQueryObjectBuilder;
    exports.getQueryObjectForTableName = KSQueryObjectBuilderFactory.getQueryObjectForTableName;
});
/**
 * Wrapper methods over database.
 */

define("KSSyncDatabaseHelper", ["exports", "KSDatabaseAPI", "KSSQLQueryGenerator", "KSCommonUtils", "KSSDKObjectRecord",
        "KSError", "KSSetupManager", "KSSDKObjectService", "KSMarkForUploadUtils", "KSQueryObjectBuilder","KSDeltaContextUtils",
         "KSUploadCacheSQLQueryGenerator", "KSMetadataUtils"],
    function (exports, _KSDatabaseAPI, KSSQLQueryGenerator, KSCommonUtils, _KSSDKObjectRecord,
              _KSError, KSSetupManager, KSSDKObjectService, KSMarkForUploadUtils, KSQueryObjectBuilder, KSDeltaContextUtils,
              KSUploadCacheSQLQueryGenerator, KSMetadataUtils) {

        var logger = voltmx.sdk.logsdk;
        var KSError = _KSError.KSError;
        var LOG_PREFIX = "KSSyncDatabaseHelper : ";
        var MatchType = voltmx.sdk.constants.MatchType;
        var KSDatabaseAPI = _KSDatabaseAPI.KSDatabaseAPI;
        var KSTableType = voltmx.sdk.OfflineObjects.KSTableType;
        var KSSDKObjectRecord = _KSSDKObjectRecord.KSSDKObjectRecord;
        var KSErrorConstants = voltmx.sdk.OfflineObjects.KSErrorConstants;
        var KSPublicConstants = voltmx.sdk.OfflineObjects.KSPublicConstants;
        var KSPublicConstants = voltmx.sdk.OfflineObjects.KSPublicConstants;
        var KSDatabaseConstants = voltmx.sdk.OfflineObjects.KSDatabaseConstants;
        var KSDatabaseOperation = KSDatabaseConstants.KSDatabaseOperations;
        var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;
        var KSSDKObjectRecordAction = voltmx.sdk.OfflineObjects.KSSDKObjectRecordAction;
        var KSRelationshipTypes = voltmx.sdk.OfflineObjects.KSInternalConstants.KSRelationshipTypes;
        var removeAfterUpload = [];

        async function setRemoveAfterUploadParam(removeAfterUploadParam){
            removeAfterUpload = removeAfterUploadParam;
        }

        /**
         * Executes PreparedStatements in transaction
         * @param preparedStatements statements to execute
         */
        async function executePreparedStatementsAsTransaction(preparedStatements) {
            await KSDatabaseAPI.executeQueriesAsTransaction(preparedStatements);
        }

        /**
         * Method to build queries for the changes present in an array of objects.
         * @param sdkObjectArray Array of objects for which the queries need to be generated.
         * @returns {Array} Array of query objects built.
         */
        async function buildQueriesToPersistChangesForObjects(sdkObjectArray) {
            logger.trace(LOG_PREFIX, "Building query objects to persist changes.");
            var queryObjects = [];

            if (!voltmx.sdk.isNullOrUndefined(sdkObjectArray)) {
                for (var i = 0; i < sdkObjectArray.length; i++) {
                    var queriesGenerated = await buildQueryObjectsForData(sdkObjectArray[i]);
                    Array.prototype.push.apply(queryObjects, queriesGenerated);
                }
            }

            logger.info(LOG_PREFIX, "Queries successfully built for persisting response.");
            return queryObjects;
        }

        /**
         * Save the records data to original table if there are any pending edit's in history.
         * Updates the new checksum received into Main and History table.
         * Return the list of records which do not have pending edits.
         *
         * @param sdkObjectRecords list of records received in the download.
         * @return list of records  List of records without pending edits.
         * @throws OfflineObjectsException Parameter to return a exception, if any.
         */
        async function handleRecordsWithPendingEditsFromDownloadResponseAndReturnRemainingRecords(sdkObjectRecords){
            logger.debug(LOG_PREFIX, "Remove the records to persist in download response if there is any edit in history table for that edit");
            var orderByMap = {};
            orderByMap[KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER] = KSPublicConstants.ORDER_BY_ASCENDING;
            var recordsToParse = sdkObjectRecords;

            try {
                for ( var i in sdkObjectRecords) {
                    var parentObj = sdkObjectRecords[i].getParentObject();
                    var primaryKeyValuePair = sdkObjectRecords[i].getPrimaryKeyValueMapOfRecord(parentObj.getPrimaryKeys());
                    var selectedRecords = await buildAndExecutePreparedStatementsOfTypeRead(parentObj.getMetadata().name,
                        KSTableType.HISTORY, primaryKeyValuePair, orderByMap);

                    // If no records are found in history for a PK, we should still update the original table for records added with changeTracking = OFF
                    if (selectedRecords.length === 0) {
                        selectedRecords = await buildAndExecutePreparedStatementsOfTypeRead(parentObj.getMetadata().name,
                            KSTableType.ORIGINAL, primaryKeyValuePair, orderByMap);

                    }
                    if (selectedRecords.length > 0) {
                        handleRecordWithPendingEdit(sdkObjectRecords[i]);
                        KSCommonUtils.removeElementByName(recordsToParse, sdkObjectRecords[i]);
                    }
                }
            } catch (err) {
                var errorMessage = "Failed to read records from either HISTORY or ORIGINAL tables.";
                logger.error(LOG_PREFIX, errorMessage);
                throw new KSError(KSErrorConstants.DB_EXECUTE_QUERY_FAILED, err);

            }
            return recordsToParse;
        }

        async function handleRecordWithPendingEdit(sdkObjectRecords){
            var queryObjs =  getQueryObjsForRecordsWithPendingEdits(sdkObjectRecords);
            await KSDatabaseAPI.executeQueriesAsTransaction(queryObjs);
        }
        /**
         * Method to build queries for the changes present in an object.
         * The queries generated take into consideration the pending edits.
         * @param sdkObject Object for which the queries need to be generated.
         * @returns {Array} Array of query objects built.
         */
        async function buildQueryObjectsForData(sdkObject) {

            var classifiedRecords = sdkObject.recordsClassifedWithRecordAction;
            var queryObjects = [];
            for(var action  in classifiedRecords) {
                if (classifiedRecords[action].length > 0) {
                    var recordsWithoutPendingEdits;
                    if (sdkObject.isDownloadReconciliationRequired()) {
                        recordsWithoutPendingEdits = await handleRecordsWithPendingEditsFromDownloadResponseAndReturnRemainingRecords(classifiedRecords[action]);
                    } else {
                        recordsWithoutPendingEdits = classifiedRecords[action];
                    }
                    var queryObjsForRecordsWithoutPendingEdits = getQueryObjsForRecordsWithoutPendingEdits(recordsWithoutPendingEdits);
                    Array.prototype.push.apply(queryObjects, queryObjsForRecordsWithoutPendingEdits);
                }
            }
            return queryObjects;
        }

        /**
         * Method to build query objects for records with pending edits in the original table.
         * @param recordsWithPendingEdits Array of records with pending edits.
         * @returns {Array} Array of query objects to be inserted into the original table.
         */
        function getOriginalTableQueriesForPendingEdits(recordsWithPendingEdits) {

            var queryObjects = [];

            var recordAction = recordsWithPendingEdits[KSInternalConstants.RECORD_MATADATA].action;
            var action = (recordAction === KSSDKObjectRecordAction.DELETE) ? KSSDKObjectRecordAction.CREATE : KSSDKObjectRecordAction.UPDATE;
            queryObjects.push(KSSQLQueryGenerator.getInsertQueryObjectForOriginalTable(recordsWithPendingEdits, action));

            return queryObjects;
        }

        /**
         * Method to build query objects for records with pending edits in the history table.
         * @param recordsWithPendingEdits Array of records with pending edits.
         * @returns {Array} Array of query objects to be inserted into the history table.
         */
        function getHistoryTableQueriesForPendingEdits(recordsWithPendingEdits) {

            var queryObjects = [];

            Array.prototype.push.apply(queryObjects, KSSQLQueryGenerator.getUpdateChecksumQueryObject(recordsWithPendingEdits, KSTableType.HISTORY));

            return queryObjects;
        }

        /**
         * Method to build query objects for records with pending edits in the main table.
         * @param recordsWithPendingEdits Array of records with pending edits.
         * @returns {Array} Array of query objects to be inserted into the main table.
         */
        function getMainTableQueriesForPendingEdits(recordsWithPendingEdits) {

            var queryObjects = [];

            Array.prototype.push.apply(queryObjects, KSSQLQueryGenerator.getUpdateChecksumQueryObject(recordsWithPendingEdits, KSTableType.MAIN));

            return queryObjects;
        }

        /**
         * Method to fetch the query objects for records with pending edits.
         * @param recordsWithPendingEdits Array of records which have pending edits.
         * @returns {Array}  Array of query objects generated to handle pending edits.
         */
         function getQueryObjsForRecordsWithPendingEdits(recordsWithPendingEdits) {

            var queryObjs = [];

            if (!KSCommonUtils.isNullOrEmptyObject(recordsWithPendingEdits)) {
                Array.prototype.push.apply(queryObjs, getMainTableQueriesForPendingEdits(recordsWithPendingEdits));
                Array.prototype.push.apply(queryObjs, getHistoryTableQueriesForPendingEdits(recordsWithPendingEdits));
                Array.prototype.push.apply(queryObjs, getOriginalTableQueriesForPendingEdits(recordsWithPendingEdits));
            }

            return queryObjs;
        }

        /**
         * Method to generate queries for records without pending edits.
         * @param records Records for which query needs to be generated.
         * @returns {*|Array} Array of query object.
         */
        function getQueryObjsForRecordsWithoutPendingEdits(records) {
            return KSSQLQueryGenerator.getSQLDataQueries(records, false);
        }

        /**
         * Method for build and executes statements for type select.
         * @param tableName Name of the table.
         * @param tableType Type of table on which READ needs to be performed.
         * @param whereClause Map containing where clause
         * @param orderBy OrderBy map.
         * @returns Object Selected records.
         */
        async function buildAndExecutePreparedStatementsOfTypeRead(tableName, tableType, whereClause, orderBy) {
            var queryObj = KSSQLQueryGenerator.buildPreparedStatementsOfTypeRead(tableName, tableType, whereClause, orderBy);

            return await KSDatabaseAPI.executeQuery(queryObj);
        }

        /**
         * Method for build and executes statements for type select.
         * @return {Promise}
         */
        async function dropDatabase() {
            return await KSDatabaseAPI.dropDatabase(KSCommonUtils.getOfflineObjectsDatabaseName());
        }

        /**
         * Gets the list of edits in history as records and adds them to objects, and return the list.
         * @param sdkObjects list of objects under a object service or an object
         * @param context Contains the options for sync like filter, query params, batchSize etc.
         * @param uploadBatchParams Contains the batch related info like batchNumber, lastRSNOfUploadPayload etc.
         * @return {Promise<Array>} Array of objects to upload
         */
        async function getDeltaChangesToUpload(sdkObjects, uploadBatchParams) {
            var objectsToUpload = [];
            var sdkObjectsLength = sdkObjects.length;

            for (var index = 0; index < sdkObjectsLength; index++) {
                var sdkObject = sdkObjects[index];

                sdkObject.removeAllRecords();

                var batchSize = uploadBatchParams.getUploadBatchSize();
                var lastRSNOfUploadPayload = uploadBatchParams.getLastRSNOfUploadPayload();
                var lastUploadedRSN = uploadBatchParams.getLastRSNOfPreviousBatch();

                var whereClause = KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER + " > " + lastUploadedRSN + " AND "
                    + KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER + " <= " + lastRSNOfUploadPayload
                    + " AND " + KSMarkForUploadUtils.getDeferredActionCodesAsString();

                var query = KSSQLQueryGenerator
                    .buildStatementOfTypeReadWithWhereConditionAsString(sdkObject.getFullyQualifiedName(),
                        KSTableType.HISTORY, whereClause, null, batchSize);

                var records = await KSDatabaseAPI.executeQuery(query);
                if (records.length > 0) {
                    sdkObject.setRecords(populateSdkRecordsFromRecordsDicToUpload(records, sdkObject));
                    objectsToUpload.push(sdkObject);
                }
            }
            return objectsToUpload;
        }

        /**
         * Constructs the SDKObjectRecords from the list of records from database.
         * @param recordsFromDB list of edited records form database
         * @param sdkobject the object under which edits are performed
         * @return {Array} Array of SDKObjectRecords.
         */
        function populateSdkRecordsFromRecordsDicToUpload(recordsFromDB, sdkobject) {
            var records = [];
            var recordsFromDBLength = recordsFromDB.length;
            for (var index = 0; index < recordsFromDBLength; index++) {
                var action;
                var record = recordsFromDB[index];
                if (record[KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE] === KSSDKObjectRecordAction.DO_NOT_TRACK_INTERMEDIATE_UPDATES) {
                    action = voltmx.sdk.OfflineObjects.getValueOfRecordActionAsString[KSSDKObjectRecordAction.UPDATE];
                } else {
                    action = voltmx.sdk.OfflineObjects.getValueOfRecordActionAsString[record[KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE]];
                }
                var checksum = record[KSDatabaseConstants.KONY_SYNC_HASH_SUM];
                var rowId = record[KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER];
                KSCommonUtils.removeUnwantedColumns(sdkobject.getMetadata(), record);
                KSCommonUtils.removeColumnsWithNullValues(record);
                var sdkObjectRecord = new KSSDKObjectRecord(record, sdkobject);
                sdkObjectRecord.setAction(action);
                sdkObjectRecord.setCheckSum(!KSCommonUtils.isNullOrEmptyObject(checksum) ? checksum : "");
                sdkObjectRecord.setRowid(rowId);
                records.push(sdkObjectRecord);
            }
            return records;
        }

        /**
         * Method to check the relationships and accordingly sorting the list of SDK Objects.
         *
         * @param sdkObjectMetadata Metadata of the SDK Object which needs to be topologically sorted.
         * @param visitedSDKObjects Dictionary keeping track of the SDK Objects already topologically sorted.
         * @param responseSDKObjects Dictionary containing the name and SDK Object received in the response.
         * @param sortedSDKObjects Topologically sorted list of SDK Objects received in the response.
         */
        function topologicalSortUtil(sdkObjectMetadata, visitedSDKObjects, responseSDKObjects, sortedSDKObjects) {
            visitedSDKObjects[sdkObjectMetadata.fullyQualifiedName] = true;

            var relationships = sdkObjectMetadata.childRelationships;

            var lengthOfRelationships = relationships.length;
            for (var i = 0; i < lengthOfRelationships; i++) {
                var relationship = relationships[i];
                var childObjectMetadata;

                if (relationship.type === KSRelationshipTypes.ONE_TO_MANY) {
                    childObjectMetadata = relationship.target_object;
                } else if (relationship.type === KSRelationshipTypes.MANY_TO_ONE) {
                    childObjectMetadata = relationship.source_object;
                }

                var isVisited = visitedSDKObjects[childObjectMetadata.fullyQualifiedName];
                if (isVisited === false) {
                    topologicalSortUtil(childObjectMetadata, visitedSDKObjects, responseSDKObjects, sortedSDKObjects);
                }

            }

            var sdkObject = responseSDKObjects[sdkObjectMetadata.fullyQualifiedName];
            if (!voltmx.sdk.isNullOrUndefined(sdkObject)) {
                sortedSDKObjects.push(sdkObject);
            }
        }

        /**
         *  Method to topologically sort the list of SDK Objects.
         *
         * @param listOfSDKObjects List of SDK Objects to be topologically sorted.
         */
        function topologicalSort(listOfSDKObjects) {
            var sortedSDKObjects = [];
            var visitedSDKObjects = {};
            var responseSDKObjects = {};

            var lengthOfSDKObjectsList = listOfSDKObjects.length;
            for (var i = 0; i < lengthOfSDKObjectsList; i++) {
                var sdkObject = listOfSDKObjects[i];
                visitedSDKObjects[sdkObject.metadata.fullyQualifiedName] = false;
                responseSDKObjects[sdkObject.metadata.fullyQualifiedName] = sdkObject;
            }

            for (var objectName in responseSDKObjects) {
                var isVisited = visitedSDKObjects[objectName];
                if (isVisited === false) {
                    topologicalSortUtil(responseSDKObjects[objectName].metadata, visitedSDKObjects, responseSDKObjects, sortedSDKObjects);
                }
            }

            return sortedSDKObjects;
        }

        /**
         * Method to persist the upload response for given list of SDK objects.
         *
         * @param sdkObjects list of objects to be persisted.
         */
        async function persistUploadResponseForObjects(sdkObjects) {

            sdkObjects = topologicalSort(sdkObjects);

            voltmx.sdk.logsdk.debug("persistUploadResponseForObjects has been started");
            var sdkObjectsLen = sdkObjects.length;
            for (var index = 0; index < sdkObjectsLen; index++) {
                var uploadResponseFilterMap = sdkObjects[index].getUploadResponseFilterMap();
                var sdkObject = sdkObjects[index];
                for (var primaryKeyValueMap in uploadResponseFilterMap) {
                    var statementsToExecuteInTransaction = [];
                    var uploadRecordFilter = uploadResponseFilterMap[primaryKeyValueMap];
                    var updatedPrimaryKeyValueMap = JSON.parse(primaryKeyValueMap);
                    var tableName = sdkObject.getFullyQualifiedName();
                    var latestSuccessRecord = uploadRecordFilter.getLatestSuccessRecord();
                    var latestSuccessRecordRowId = uploadRecordFilter.getLatestSuccessRecordRowId();
                    if (!voltmx.sdk.isNullOrUndefined(latestSuccessRecord) && latestSuccessRecordRowId !== -1) {
                        voltmx.sdk.logsdk.debug("Filtered the records with given primary-key value " + primaryKeyValueMap +
                            " has latestSuccessRecord  with rowId is " + latestSuccessRecordRowId);
                        //Gets the list of records in history with given latest success rowid and primary key value pair
                        // If the list of pending edits not considered in the current upload in history is 0 , we will delete the records in history and original with given primary key value pair
                        // and update the main table with autogen and checksum based on action
                        // else if they are pending edits then we update the original table with latest success record data , autogenkey, checksum, then we update history table pending
                        // edits for auto-gen pks and checksum  and update main table for autogen key value and checksum
                        //Update the Pk's with given value's from server

                        if (uploadRecordFilter.areAnyPKAutoGenerated()) {
                            Array.prototype.push.apply(statementsToExecuteInTransaction, updateTheAutoGenPkInGivenObject(tableName, uploadRecordFilter.getPrimaryKeyValuePair(), updatedPrimaryKeyValueMap));
                        }

                        if (removeAfterUpload.includes(tableName)){
                             latestSuccessRecord.setAction(KSSDKObjectRecordAction.DELETE);
                        }

                        //Get the records in history for last edit greater than the rowId of success record
                        var lastRecordsEditedInHistory = await getPendingRecordsFromHistoryForGivenPK(uploadRecordFilter.getPrimaryKeyValuePair(), latestSuccessRecordRowId, sdkObject.getFullyQualifiedName());
                        //Form the delete queries for history table to delete

                        var ruleForReplaySequenceNumber = [];
                        ruleForReplaySequenceNumber.push(KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER);
                        ruleForReplaySequenceNumber.push(KSInternalConstants.LESS_THAN_EQUALS_TO);
                        ruleForReplaySequenceNumber.push(latestSuccessRecordRowId);

                        var whereCondition = buildWhereConditionAsString(updatedPrimaryKeyValueMap);
                        whereCondition.push([KSDatabaseConstants.LOGICAL_AND]);
                        whereCondition.push(ruleForReplaySequenceNumber);

                        statementsToExecuteInTransaction.push(getDeletePreparedStatement(tableName, KSTableType.HISTORY, whereCondition));

                        if (lastRecordsEditedInHistory.length === 0) {
                            voltmx.sdk.logsdk.debug("No pending edits in history table for the given record with primary-key value pair " + primaryKeyValueMap);
                            //delete query in original table for give primary key value pair
                            statementsToExecuteInTransaction.push(getDeletePreparedStatement(tableName, KSTableType.ORIGINAL, updatedPrimaryKeyValueMap));
                            //insert queries to main table
                            statementsToExecuteInTransaction.push(KSSQLQueryGenerator.getPreparedStatementToPerformActionOnMainTable(latestSuccessRecord, updatedPrimaryKeyValueMap));
                        } else {
                            voltmx.sdk.logsdk.debug("there are pending edits or failed records in history table for the record with primary-key value pair " + primaryKeyValueMap);
                            //insert query in original
                            statementsToExecuteInTransaction.push(getUpdatePreparedStatementForOriginal(latestSuccessRecord, updatedPrimaryKeyValueMap, voltmx.sdk.OfflineObjects.getReverseActionType(latestSuccessRecord.getAction())));
                            var updateMap = {};
                            updateMap[KSDatabaseConstants.KONY_SYNC_HASH_SUM] = latestSuccessRecord.getCheckSum();
                            //Update query in History table
                            statementsToExecuteInTransaction.push(getUpdatePreparedStatementForHistory(tableName, updatedPrimaryKeyValueMap, updateMap));
                            //update query in Main table
                            statementsToExecuteInTransaction.push(KSSQLQueryGenerator.buildPreparedStatementsOfTypeUpdate(tableName, KSTableType.MAIN, updatedPrimaryKeyValueMap, updateMap));
                        }
                        if (uploadRecordFilter.areAnyPKAutoGenerated()) {
                            voltmx.sdk.logsdk.debug("there is an auto-generated pk value pair, so child tables needs to be updated with auto-gen key value from server");
                            Array.prototype.push.apply(statementsToExecuteInTransaction, getQueryStatementsForUpdatingFKsInChildTablesForAutoGeneratedPKsInParent(sdkObject.getMetadata(), uploadRecordFilter.getPrimaryKeyValuePair(), updatedPrimaryKeyValueMap));
                        }
                        await KSDatabaseAPI.executeQueries(statementsToExecuteInTransaction, true);
                    }
                }
            }
        }

        /**
         * Forms the query statements to update the auto-gen pk in history,main and original table of related children.
         * @param parentObjectMetadata metadata of object to update auto-gen in all relations
         * @param autoGenKeyValuePair  map of primary-keys to its value's of a record from the server.
         * @param updatedKeyValue
         * @return {Array}  list of query statements to update the child tables auto-gen pk.
         */
        function getQueryStatementsForUpdatingFKsInChildTablesForAutoGeneratedPKsInParent(parentObjectMetadata, autoGenKeyValuePair, updatedKeyValue) {
            var statementsToExecuteInChild = [];
            var relationships = parentObjectMetadata[KSInternalConstants.OBJECTS_CHILD_RELATIONSHIPS];

            var parentObjectAttributes = [];
            var childObjectAttributes = [];

            //Checking for child relationships
            var relationsLength = relationships.length;
            for (var index = 0; index < relationsLength; index++) {
                var relationship = relationships[index];
                var childObjectMetaData = null;
                if (relationship[KSInternalConstants.RELATIONSHIP_TYPE] === KSRelationshipTypes.ONE_TO_MANY) {
                    childObjectMetaData = relationship[KSInternalConstants.RELATIONSHIP_TARGET_OBJECT];
                    parentObjectAttributes = relationship[KSInternalConstants.RELATIONSHIP_SOURCE_ATTRIBUTES];
                    childObjectAttributes = relationship[KSInternalConstants.RELATIONSHIP_TARGET_ATTRIBUTES];
                } else if (relationship[KSInternalConstants.RELATIONSHIP_TYPE] === KSRelationshipTypes.MANY_TO_ONE) {
                    childObjectMetaData = relationship[KSInternalConstants.RELATIONSHIP_SOURCE_OBJECT];
                    parentObjectAttributes = relationship[KSInternalConstants.RELATIONSHIP_TARGET_ATTRIBUTES];
                    childObjectAttributes = relationship[KSInternalConstants.RELATIONSHIP_SOURCE_ATTRIBUTES];
                }

                if (childObjectMetaData != null) {
                    var autoGenForeignKeyValueMap = KSCommonUtils.getForeignKeyValueMap(autoGenKeyValuePair, childObjectAttributes, parentObjectAttributes);
                    var updatedAutoGenKeyValueMapFromServer = KSCommonUtils.getForeignKeyValueMap(updatedKeyValue, childObjectAttributes, parentObjectAttributes);
                    var fullyQualifiedName = childObjectMetaData[KSInternalConstants.FULLY_QUALIFIED_NAME];
                    if (Object.keys(autoGenForeignKeyValueMap).length > 0 && Object.keys(updatedAutoGenKeyValueMapFromServer).length > 0) {
                        statementsToExecuteInChild.push(KSSQLQueryGenerator.buildPreparedStatementsOfTypeUpdate(fullyQualifiedName, KSTableType.MAIN, autoGenForeignKeyValueMap, updatedAutoGenKeyValueMapFromServer));
                        statementsToExecuteInChild.push(KSSQLQueryGenerator.buildPreparedStatementsOfTypeUpdate(fullyQualifiedName, KSTableType.HISTORY, autoGenForeignKeyValueMap, updatedAutoGenKeyValueMapFromServer));
                        statementsToExecuteInChild.push(KSSQLQueryGenerator.buildPreparedStatementsOfTypeUpdate(fullyQualifiedName, KSTableType.ORIGINAL, autoGenForeignKeyValueMap, updatedAutoGenKeyValueMapFromServer));
                        if (parentObjectMetadata !== childObjectMetaData) {
                            Array.prototype.push.apply(statementsToExecuteInChild, getQueryStatementsForUpdatingFKsInChildTablesForAutoGeneratedPKsInParent(childObjectMetaData, autoGenForeignKeyValueMap, updatedAutoGenKeyValueMapFromServer));
                        }
                    }
                }
            }
            return statementsToExecuteInChild;
        }

        /**
         * Forms a list of statements to update the pk in history, main and original
         * @param tableName            tableName to update its auto-gen
         * @param whereMapForAutoGen   where condition to check the auto-gen value's
         * @param updateMapForAutoGen  update map which contains the updated auto-gen value from server
         * @return {Array}  list of query statements
         */
        function updateTheAutoGenPkInGivenObject(tableName, whereMapForAutoGen, updateMapForAutoGen) {
            var statementsToExecute = [];
            statementsToExecute.push(KSSQLQueryGenerator.buildPreparedStatementsOfTypeUpdate(tableName, KSTableType.MAIN, whereMapForAutoGen, updateMapForAutoGen));
            statementsToExecute.push(KSSQLQueryGenerator.buildPreparedStatementsOfTypeUpdate(tableName, KSTableType.HISTORY, whereMapForAutoGen, updateMapForAutoGen));
            statementsToExecute.push(KSSQLQueryGenerator.buildPreparedStatementsOfTypeUpdate(tableName, KSTableType.ORIGINAL, whereMapForAutoGen, updateMapForAutoGen));
            return statementsToExecute;
        }

        /**
         * Returns the list of edits after a latestSuccessRecordRowId.
         * @param primaryKeyValuePair       to form the where condition.
         * @param latestSuccessRecordRowId  used in where condition, > the given rowId.
         * @param tableName                 the tableName on which query to execute.
         * @return {Promise<Array>} list of records > given rowId in history.
         */
        async function getPendingRecordsFromHistoryForGivenPK(primaryKeyValuePair, latestSuccessRecordRowId, tableName) {
            var whereCondition = buildWhereConditionAsString(primaryKeyValuePair);
            var ruleForReplaySequenceNumber = [];
            ruleForReplaySequenceNumber.push(KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER);
            ruleForReplaySequenceNumber.push(">");
            ruleForReplaySequenceNumber.push(latestSuccessRecordRowId);
            whereCondition.push(["AND"]);
            whereCondition.push(ruleForReplaySequenceNumber);
            var queryObj = KSSQLQueryGenerator.buildPreparedStatementsOfTypeRead(tableName,
                KSTableType.HISTORY,
                whereCondition);
            return await KSDatabaseAPI.executeQuery(queryObj);
        }

        /**
         * Forms Query Statement to delete the entry in table
         * @param tableName  the tableName on which query to execute.
         * @param tableType  the type of the table in DB, e.g history,orignal,main. If nothing is given , we will construct the query for main type.
         * @param whereCondition condition to execute delete query
         * @return Delete Query statement.
         */
        function getDeletePreparedStatement(tableName, tableType, whereCondition) {
            return KSSQLQueryGenerator.buildPreparedStatementsOfTypeDelete(tableName, tableType, whereCondition);
        }

        /**
         *  This API clears all offline data from database for given object list
         * @param objectsList an array containing names of objects
         * @param objectservice name
         * @return promise
         */
        function clearDataForGivenObjectList(objectsList, objectServiceName, options) {
            var deleteQueries = [];

            for (var i = 0; i < objectsList.length; i++) {
                deleteQueries.push(KSDeltaContextUtils.queryToDeleteARowByObjectName(objectsList[i]));
                deleteQueries.push(getDeletePreparedStatement(objectsList[i], KSTableType.MAIN, null));
                deleteQueries.push(getDeletePreparedStatement(objectsList[i], KSTableType.HISTORY, null));
                deleteQueries.push(getDeletePreparedStatement(objectsList[i], KSTableType.ORIGINAL, null));
                deleteQueries.push(KSUploadCacheSQLQueryGenerator.getPreparedStatementForDelete(objectsList[i]));
            }

            deleteQueries.push(KSUploadCacheSQLQueryGenerator.getPreparedStatementForDelete(objectServiceName));
            return KSDatabaseAPI.executeQueriesAsTransaction(deleteQueries);
        }

        /**
         *  This API clears all offline data from database for given object
         * @param object is the names of object
         * @param object name
         * @return promise
         */
        function clearDataForGivenObject(object, options) {
            var deleteQueries = [];

            if (!(KSCommonUtils.isNullOrEmptyObject(options))){
                var whereCondition = buildWhereConditionAsString(options[KSPublicConstants.CRUD_OPTION_PRIMARY_KEYS]);
                deleteQueries.push(getDeletePreparedStatement(object, KSTableType.MAIN, whereCondition));
                deleteQueries.push(getDeletePreparedStatement(object, KSTableType.HISTORY, whereCondition));
                deleteQueries.push(getDeletePreparedStatement(object, KSTableType.ORIGINAL, whereCondition));
            } else {
                deleteQueries.push(KSDeltaContextUtils.queryToDeleteARowByObjectName(object));
                deleteQueries.push(getDeletePreparedStatement(object, KSTableType.MAIN, null));
                deleteQueries.push(getDeletePreparedStatement(object, KSTableType.HISTORY, null));
                deleteQueries.push(getDeletePreparedStatement(object, KSTableType.ORIGINAL, null));
                deleteQueries.push(KSUploadCacheSQLQueryGenerator.getPreparedStatementForDelete(object));
            }

            return KSDatabaseAPI.executeQueriesAsTransaction(deleteQueries);
        }

        /**
         * Gets the record from the database for a given primaryKey
         *
         * @param primaryKeyValueMap contains primary keys
         * @param tableName          from which record is to be fetched
         * @returns {Promise<void>}  list of records fetched for the given primaryKey
         */
         async function getRecordByPK (primaryKeyValueMap, tableName) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "getRecordByPK : ", "Start");

            var query = KSQueryObjectBuilder.getQueryObjectForTableName(tableName, KSDatabaseOperation.SELECT)
                .setWhereClause(primaryKeyValueMap)
                .build();
            var records =  await KSDatabaseAPI.executeQuery(query);
            return records.length === 0 ? null : records[0];
        };


        /**
         *  It converts into array of arrays such as [["col1","==","val1"],["AND"],["col2","=","val2"]]
         * @param primaryKeyValuePair
         * @return []  clause formed by appending AND to given primary key value pair as array.
         */
        function buildWhereConditionAsString(primaryKeyValuePair) {
            var whereConditionArray = [];
            for (var primaryKey in primaryKeyValuePair) {
                var rule = [];
                rule.push(primaryKey);
                rule.push("=");
                rule.push(primaryKeyValuePair[primaryKey]);
                whereConditionArray.push(rule);
                whereConditionArray.push(["AND"]);
            }
            whereConditionArray = whereConditionArray.slice(0, -1);
            return whereConditionArray;
        }

        /**
         * Forms Query Statement to update the entry in original table for given pk-value pair.
         * @param sdkObjectRecord      Data to be updated
         * @param primaryKeyValuePair  data to updated for given pk-value pair.
         * @param actionType           reverse action type of last successful sync at server end.
         * @return Update query statement for original table.
         */
        function getUpdatePreparedStatementForOriginal(sdkObjectRecord, primaryKeyValuePair, actionType) {
            var whereCondition = buildWhereConditionAsString(primaryKeyValuePair);

            var updateData = {};
            KSCommonUtils.mergeTwoJSONMaps(updateData, sdkObjectRecord.getData());
            //We get the latest action type from the record after first edit
            updateData[KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE] = actionType;
            updateData[KSDatabaseConstants.KONY_SYNC_HASH_SUM] = sdkObjectRecord.getCheckSum();
            return KSSQLQueryGenerator.buildPreparedStatementsOfTypeUpdate(sdkObjectRecord.getParentObject().getFullyQualifiedName(),
                KSTableType.ORIGINAL, whereCondition, updateData);
        }

        /**
         * Forms Query Statement to update the entries in history table for given pk-value pair.
         * @param tableName            the tableName on which query to execute.
         * @param primaryKeyValuePair  data to updated for given pk-value pair.
         * @param updateMap            Data to be updated
         * @return Update query statement for history table.
         */
        function getUpdatePreparedStatementForHistory(tableName, primaryKeyValuePair, updateMap) {
            var whereCondition = buildWhereConditionAsString(primaryKeyValuePair);
            return KSSQLQueryGenerator.buildPreparedStatementsOfTypeUpdate(tableName, KSTableType.HISTORY, whereCondition, updateMap);
        }

        /**
         * Method to fetch the last ReplaySequenceNumber for the given objectService
         *
         * @param objectServiceName the name of the object service
         * @return LastReplaySequenceNumber the last RSN for an object service
         */
        async function getLastReplaySequenceNumberOfObjectService(objectServiceName) {
            var objectService = KSSDKObjectService.getInstanceByName(objectServiceName);
            var syncMetaInfo = await objectService.getSyncMetaInfo();
            return syncMetaInfo.getLastReplaySequenceNumber();
        }

        /**
         * Builds PreparedStatements for Rollback for an Object
         *
         * @param sdkObject          for which PreparedStatements have to be built
         * @param primaryKeyValueMap of record only for which rollback should happen
         * @return list of preparedStatements for rollback
         */
        async function buildPreparedStatementsForObjectRollback(sdkObject, primaryKeyValueMap) {
            voltmx.sdk.logsdk.debug("Building Prepared Statements to rollback on object : " + sdkObject.name);
            var preparedStatementsToRollback = [];
            var metadata = sdkObject.getMetadata();
            var fullyQualifiedName = metadata.fullyQualifiedName;
            var readPreparedStatementForOriginalTable;
            if (KSCommonUtils.isNullOrEmptyObject(primaryKeyValueMap)) {
                readPreparedStatementForOriginalTable = KSSQLQueryGenerator.buildPreparedStatementsOfTypeRead(fullyQualifiedName, KSTableType.ORIGINAL);
            } else {
                readPreparedStatementForOriginalTable = KSSQLQueryGenerator.buildPreparedStatementsOfTypeRead(fullyQualifiedName, KSTableType.ORIGINAL, primaryKeyValueMap);
            }
            var recordsInOriginalTable = await KSDatabaseAPI.executeQuery(readPreparedStatementForOriginalTable);
            var recordsInOriginalTableLength = recordsInOriginalTable.length;

            if(recordsInOriginalTableLength === 0 && !KSCommonUtils.isNullOrEmptyObject(primaryKeyValueMap)) {
                var errorMessage = "Rollback cannot be performed on the object " + sdkObject.name + " as the primary key value does not exist";
                logger.error(LOG_PREFIX, errorMessage);
                throw new KSError(KSErrorConstants.SYNC_GENERIC_ROLLBACK_ERROR, errorMessage);
            }

            for (var index = 0; index < recordsInOriginalTableLength; index++) {
                Array.prototype.push.apply(preparedStatementsToRollback, buildPreparedStatementsToRollbackForARecordInObject(recordsInOriginalTable[index], sdkObject));
            }
            return preparedStatementsToRollback;
        }

        /**
         * Builds Prepared Statements to Rollback all tables of given object of given record
         *
         * @param sdkObject             on which rollback should happen
         * @param recordInOriginalTable for which rollback should happen
         * @return {Array} Prepared Statements to Rollback Main Table of given object
         **/
        function buildPreparedStatementsToRollbackForARecordInObject(recordInOriginalTable, sdkObject) {
            voltmx.sdk.logsdk.debug("Building Prepared Statements to rollback for a record in object : " + sdkObject.name);
            var statements = [];
            var metadata = sdkObject.getMetadata();
            var fullyQualifiedName = metadata.fullyQualifiedName;

            var primaryKeyValueMap = getPrimaryKeyValueMapForGivenRecord(sdkObject, recordInOriginalTable);
            //Building Prepared Statements for Original Table
            statements.push(KSSQLQueryGenerator.buildPreparedStatementsOfTypeDelete(fullyQualifiedName, KSTableType.ORIGINAL, primaryKeyValueMap));
            //Building Prepared Statements for History Table
            statements.push(KSSQLQueryGenerator.buildPreparedStatementsOfTypeDelete(fullyQualifiedName, KSTableType.HISTORY, primaryKeyValueMap));

            //Building PreparedStatements for MainTable
            var actionType = recordInOriginalTable[KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE];
            delete recordInOriginalTable[KSDatabaseConstants.UPLOAD_SESSION_NO];
            delete recordInOriginalTable[KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE];
            statements.push(buildPreparedStatementFromActionTypeForRollback(recordInOriginalTable, actionType, fullyQualifiedName, primaryKeyValueMap));
            return statements;
        }

        function getPrimaryKeyValueMapForGivenRecord(sdkObject, record) {
            voltmx.sdk.logsdk.debug("Getting primary key value map for given Object : " + sdkObject.name);
            var primaryKeyAttributes = sdkObject.getPrimaryKeys();
            var primaryKeyValueMap = {};

            var primaryKeyAttributesLength = primaryKeyAttributes.length;
            for (var index = 0; index < primaryKeyAttributesLength; index++) {
                primaryKeyValueMap[primaryKeyAttributes[index]] = record[primaryKeyAttributes[index]];
            }
            return primaryKeyValueMap;
        }

        /**
         * Builds Prepared Statements to Rollback MainTable from the given action type
         *
         * @param record     data from original table
         * @param actionType depending on which prepared statement has to be built
         * @param tableName  on which rollback should happen
         * @param primaryKeyValueMap primary-key value pair JSON
         * @return Prepared Statements to Rollback MainTable from the given action type
         * */
        function buildPreparedStatementFromActionTypeForRollback(record, actionType, tableName, primaryKeyValueMap) {
            voltmx.sdk.logsdk.debug("Building Prepared Statement for ActionType :  " + actionType + "for table : " + tableName);
            switch (actionType) {
                case KSSDKObjectRecordAction.CREATE:
                case KSSDKObjectRecordAction.DEFERRED_CREATE:
                    return KSSQLQueryGenerator.buildPreparedStatementsOfTypeDelete(tableName, KSTableType.MAIN, primaryKeyValueMap);
                case KSSDKObjectRecordAction.UPDATE:
                case KSSDKObjectRecordAction.DELETE:
                case KSSDKObjectRecordAction.PARTIAL_UPDATE:
                case KSSDKObjectRecordAction.DEFERRED_UPDATE:
                case KSSDKObjectRecordAction.DEFERRED_AND_DO_NOT_TRACK_INTERMEDIATE_UPDATES:
                case KSSDKObjectRecordAction.DEFERRED_DELETE:
                    return KSSQLQueryGenerator.buildQueryObjectsOfTypeInsertOrReplace(tableName, KSTableType.MAIN, record);

                default:
                    var errorMessage = "Invalid ActionType received" + actionType;
                    voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                    throw new KSError(KSErrorConstants.SYNC_GENERIC_ROLLBACK_ERROR, errorMessage);
            }
        }

        /**
         * Builds PreparedStatements for Rollback for an Application
         * @return list of preparedStatements for rollback
         */
        async function buildPreparedStatementsForApplicationRollback() {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "Building PreparedStatements For Rollback on Application Start.");
            var preparedStatementsForRollback = [];
            var setupManager = KSSetupManager.getInstance();
            var objectServiceListContext = setupManager.getSetupContext();
            for (var objectServiceName in objectServiceListContext) {
                var sdkObjectService = KSSDKObjectService.getInstanceByName(objectServiceName);
                Array.prototype.push.apply(preparedStatementsForRollback, await sdkObjectService.buildPreparedStatementsForObjectServiceRollback());
            }
            return preparedStatementsForRollback;
        }

        /**
         * Method to build whereClause for deferred records and track intermediate updates set to false
         *
         * @param options options containing primary key value pairs
         * @return {Array} Array of whereCondition
         */
        function buildWhereConditionToFetchRecordsWithDeferredAndTrackIntermediateUpdateSetToFalse(options) {

            var primaryKeyValuePair = options[KSPublicConstants.CRUD_OPTION_PRIMARY_KEYS];

            var whereCondition = buildWhereConditionAsString(primaryKeyValuePair);
            var ruleForDoNotTrackIntermediateUpdates = [];
            var ruleForDeferredAndDoNotTrackIntermediateUpdates = [];

            ruleForDeferredAndDoNotTrackIntermediateUpdates.push(KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE);
            ruleForDeferredAndDoNotTrackIntermediateUpdates.push(KSInternalConstants.GREATER_THAN_EQUALS_TO);
            ruleForDeferredAndDoNotTrackIntermediateUpdates.push(KSSDKObjectRecordAction.DEFERRED_AND_DO_NOT_TRACK_INTERMEDIATE_UPDATES);

            ruleForDoNotTrackIntermediateUpdates.push(KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE);
            ruleForDoNotTrackIntermediateUpdates.push(KSInternalConstants.LESS_THAN_EQUALS_TO);
            ruleForDoNotTrackIntermediateUpdates.push(KSSDKObjectRecordAction.DO_NOT_TRACK_INTERMEDIATE_UPDATES);

            whereCondition.push([KSDatabaseConstants.LOGICAL_AND]);

            whereCondition.push(ruleForDeferredAndDoNotTrackIntermediateUpdates);
            whereCondition.push([KSDatabaseConstants.LOGICAL_AND]);
            whereCondition.push(ruleForDoNotTrackIntermediateUpdates);

            // Query for ex : UserID = 91 AND konysyncchangetype >= 70 AND konysyncchangetype <= 80
            return whereCondition;
        }

        /**
         * Method to fetch number of records deferred and track intermediate updates set to off
         *
         * options options containing primary key value pair
         * tableName tableName from which the records are needed
         */
        async function getNumberOfRecordsDeferredAndTrackIntermediateUpdateSetToFalse(options, tableName) {
            var whereClause = buildWhereConditionToFetchRecordsWithDeferredAndTrackIntermediateUpdateSetToFalse(options);
            var queryObj = KSSQLQueryGenerator.buildPreparedStatementsOfTypeRead(tableName, KSTableType.HISTORY, whereClause);
            var records = await KSDatabaseAPI.executeQuery(queryObj);
            return records.length;
        }

        /**
         * Builds update prepared statements for track intermediate upates
         *
         * sdkRecord sdkRecord on which update should be done
         * options options containing primary key value pair
         * tableName table on which update needs to be performed
         * @return update query
         */
        function buildUpdatePreparedStatementForTrackIntermediateUpdatesRecord(sdkRecord, options, tableName) {
            var whereClause = buildWhereConditionToFetchRecordsWithDeferredAndTrackIntermediateUpdateSetToFalse(options);
            var queryObj = KSSQLQueryGenerator.buildPreparedStatementsOfTypeUpdate(tableName, KSTableType.HISTORY,
                whereClause, sdkRecord.getData());
            return queryObj;
        }

        /**
         * Get rule for max replay sequence number
         * @param Number - last replay sequence number of upload payload.
         * @return Array
         */
        function getRuleForMaxReplaySequenceNumber(lastRSNOfUploadPayload) {
            var ruleForMaxReplaySequenceNumber = [];
            ruleForMaxReplaySequenceNumber.push(KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER);
            ruleForMaxReplaySequenceNumber.push(KSInternalConstants.LESS_THAN_EQUALS_TO);
            ruleForMaxReplaySequenceNumber.push(lastRSNOfUploadPayload);

            return ruleForMaxReplaySequenceNumber;
        }

        /**
         *
         * This function gives where-clauses for not including replay sequences in lookup map.
         * @param replaySequenceNumberLookUpMap - map contains already picked up RSNs
         * @return Array
         */
        function getRulesForNotIncludingReplaySequenceNumbers(replaySequenceNumberLookUpMap) {
            var whereConditionForNotIncludingRSNs = [];

            var replaySequenceNumberLookUp = Object.keys(replaySequenceNumberLookUpMap);

            //since nosql doesn't have support of includes/not includes , so keeping every rsn in wcs
            for (var rsnKeyIndex = 0, rSNLookUplength = replaySequenceNumberLookUp.length;
                 rsnKeyIndex < rSNLookUplength; rsnKeyIndex++) {

                var ruleForReplaySequenceNumberLookUpMap = [];
                ruleForReplaySequenceNumberLookUpMap.push(KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER);
                ruleForReplaySequenceNumberLookUpMap.push(MatchType.NOTEQUAL.value);
                ruleForReplaySequenceNumberLookUpMap.push(Number(replaySequenceNumberLookUp[rsnKeyIndex]));

                whereConditionForNotIncludingRSNs.push([KSDatabaseConstants.LOGICAL_AND]);
                whereConditionForNotIncludingRSNs.push(ruleForReplaySequenceNumberLookUpMap);
            }

            return whereConditionForNotIncludingRSNs;
        }

        /**
         * In hierarchy flow, this method is used to get legal parent records for particular action (Volt MX sync change type)
         * @param sdkObject the object for which records are to be fetched
         * @param action the action type of objects to be fetched<KSSDKObjectRecordAction>
         * @param uploadBatchParams batchParams required for that specific batch
         * @param shouldGetPendingRecords return the records which are pending
         * @return List of records from db
         */
        async function readRecordsFromHistoryTableOfRootParentObject(
            sdkObject, action, uploadBatchParams, shouldGetPendingRecords) {

            var FUNCTION_LOG_PREFIX = LOG_PREFIX + ' readRecordsFromHistoryTableOfRootParentObject :';
            var numberOfFreeSlotsInCurrentBatch = uploadBatchParams.getNumberOfFreeSlotsInCurrentBatch();
            var lastRSNOfUploadPayload = uploadBatchParams.getLastRSNOfUploadPayload();
            var tableName = sdkObject.getFullyQualifiedName();

            var ruleForMaxReplaySequenceNumber = getRuleForMaxReplaySequenceNumber(lastRSNOfUploadPayload);
            var whereConditionForNotIncludingRsns = getRulesForNotIncludingReplaySequenceNumbers(
                uploadBatchParams.getHierarchyContext().getReplaySequenceNumberLookUpMap());

            var wcToSelectRecordsForAGivenChangeType = [];
            wcToSelectRecordsForAGivenChangeType.push(getRuleForSyncChangeTypeForOuterQuery(action));
            wcToSelectRecordsForAGivenChangeType.push([KSDatabaseConstants.LOGICAL_AND]);
            wcToSelectRecordsForAGivenChangeType.push(ruleForMaxReplaySequenceNumber);
            wcToSelectRecordsForAGivenChangeType = wcToSelectRecordsForAGivenChangeType.concat(whereConditionForNotIncludingRsns);

            var orderByClause = {};
            orderByClause[KSDatabaseConstants.COLUMN] = KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER;
            orderByClause[KSDatabaseConstants.ORDER] = KSPublicConstants.ORDER_BY_ASCENDING;

            var queryObjForGettingRecordsForGivenChangeType = KSSQLQueryGenerator.buildPreparedStatementsOfTypeRead(
                tableName, KSTableType.HISTORY, wcToSelectRecordsForAGivenChangeType, orderByClause);
            var recordsForGivenChangeType = await KSDatabaseAPI.executeQuery(queryObjForGettingRecordsForGivenChangeType);
            logger.trace(FUNCTION_LOG_PREFIX,
                'data from outer query is' + JSON.stringify(recordsForGivenChangeType));

            var wcToSelectMinRSNOfRecordsOfOtherChangeType = [];
            wcToSelectMinRSNOfRecordsOfOtherChangeType.push(getRuleForSyncChangeTypeForInnerQuery(action));
            wcToSelectMinRSNOfRecordsOfOtherChangeType.push([KSDatabaseConstants.LOGICAL_AND]);
            wcToSelectMinRSNOfRecordsOfOtherChangeType.push(ruleForMaxReplaySequenceNumber);
            wcToSelectMinRSNOfRecordsOfOtherChangeType = wcToSelectMinRSNOfRecordsOfOtherChangeType.concat(whereConditionForNotIncludingRsns);

            var queryObjForGettingGroupedRecordsForInvertedChangeType = KSSQLQueryGenerator.buildPreparedStatementsOfTypeRead(
                tableName, KSTableType.HISTORY, wcToSelectMinRSNOfRecordsOfOtherChangeType, null, null, sdkObject.getPrimaryKeys(), null, null);
            var groupedRecordsForInvertedChangeType = await KSDatabaseAPI.executeQuery(
                queryObjForGettingGroupedRecordsForInvertedChangeType);  //note that result is a 2d list due to group by index to be null
            logger.trace(FUNCTION_LOG_PREFIX,
                'grouped data from inner query is ' + JSON.stringify(groupedRecordsForInvertedChangeType));

            var minRSN_RecordsForInvertedChangeTypeArray = getMinReplaySequencesFromGroupedData(groupedRecordsForInvertedChangeType,
                sdkObject.getPrimaryKeys()); // to apply aggregate function on grouped data
            logger.trace(FUNCTION_LOG_PREFIX,
                'after applying aggregate function minimum on inner query upon replaysequencenumber\'s result, data is ' +
                JSON.stringify(minRSN_RecordsForInvertedChangeTypeArray));

            const operator = shouldGetPendingRecords ? voltmx.nosql.GTE : voltmx.nosql.LT;
            var filteredRecords = getCoRelatedDataAccordingToOperatorOnRelatedList(recordsForGivenChangeType,
                minRSN_RecordsForInvertedChangeTypeArray, operator, sdkObject.getPrimaryKeys());

            var finalData = filteredRecords;

            if (getParentRelationshipsCount(sdkObject) > 0) {
                logger.trace(FUNCTION_LOG_PREFIX,
                    'Relationshhip found for sdkObject - ' + sdkObject.getFullyQualifiedName());
                finalData= await getFilteredDataAssociatedWithAllParents(shouldGetPendingRecords, sdkObject,
                    uploadBatchParams, filteredRecords, tableName);
            }

            logger.trace(FUNCTION_LOG_PREFIX, 'finalData is ' + JSON.stringify(finalData));

            finalData.sort(replaySequenceComparer); //mimicking sql's ORDER BY replaysequencenumber
            finalData.splice(numberOfFreeSlotsInCurrentBatch); //mimicking sql's LIMIT

            return finalData;
        }

        /**
         * This function returns rule to have related child records w.r.t its parent relation
         * @param sourceAttributes
         * @param targetAttributes
         * @param attributesLength
         * @param parentRecord
         * @return {Array}
         */
        function getRuleForRelatingChildRecordsForGivenParentRecord(sourceAttributes, targetAttributes, attributesLength, parentRecord) {
            var ruleForRelatingChildAndParent = [];

            for (var attributeIndex = 0; attributeIndex < attributesLength; attributeIndex++) {
                var ruleForParentRecordMap = [];
                ruleForParentRecordMap.push(targetAttributes[attributeIndex][KSInternalConstants.NAME]);
                ruleForParentRecordMap.push(KSInternalConstants.EQUALS);
                ruleForParentRecordMap.push(
                    parentRecord.objectForKey(sourceAttributes[attributeIndex][KSInternalConstants.NAME]));

                ruleForRelatingChildAndParent.push(ruleForParentRecordMap);
                if (attributeIndex !== (attributesLength - 1)) {
                    ruleForRelatingChildAndParent.push([KSDatabaseConstants.LOGICAL_AND]);
                }

            }

            return ruleForRelatingChildAndParent;
        }

        /**
         * This method returns Array of filtered records with respect to parents.
         * @param shouldGetPendingRecords a boolen value indicating whether to process for pending records.
         * @param sdkObject <KSSDKObject>.
         * @param uploadBatchParams batchParams required for specific batch.
         * @param filteredRecords already processed records without consideration of its parents.
         * @param childTableName table name of child for which all parent processing logic has to be performed.
         * @return <Array> of filtered records with respect to parents.
         */
        async function getFilteredDataAssociatedWithAllParents(
            shouldGetPendingRecords, sdkObject, uploadBatchParams, filteredRecords, childTableName) {
            var subData, finalData;
            if (shouldGetPendingRecords !== true) {
                subData = await getMinReplaySequenceNumbersOfParentRecords(sdkObject,
                    uploadBatchParams, shouldGetPendingRecords, filteredRecords);
                finalData = getIntersectionOfHistoryRecordsGiven2Lists(filteredRecords, subData); //mimicking sql's AND
            } else {
                var selectAllQueryObj = KSSQLQueryGenerator.buildPreparedStatementsOfTypeRead(
                    childTableName, KSTableType.HISTORY);
                var allRecordsInHistoryTable = await KSDatabaseAPI.executeQuery(selectAllQueryObj);

                subData = await getMinReplaySequenceNumbersOfParentRecords(sdkObject,
                    uploadBatchParams, shouldGetPendingRecords, allRecordsInHistoryTable);
                finalData = getUnionOfHistoryRecordsGiven2Lists(filteredRecords, subData); //mimicking sql's OR
            }

            return finalData;
        }

        /**
         * In hierarchy flow, this method is used to get non-pending child records for particular action (Volt MX sync change type)
         * @param sdkObject the object for which records are to be fetched
         * @param action the action type of objects to be fetched<KSSDKObjectRecordAction>
         * @param parentRecord <KSSDKObjectRecord> parent record
         * @param uploadBatchParams batchParams required for specific batch
         * @param shouldGetPendingRecords return the records which are pending
         * @return List of records from db
         * @throws exception in case where no relationship is found between parent & child
         */
        async function readRelatedChildRecordsFromHistoryTable(
            sdkObject, action, parentRecord, uploadBatchParams, shouldGetPendingRecords) {

            var FUNCTION_LOG_PREFIX = LOG_PREFIX + ' readRelatedChildRecordsFromHistoryTable :';
            var childTableName = sdkObject.getFullyQualifiedName();
            var parentObject = parentRecord.getParentObject();
            var parentTableName = parentObject.getFullyQualifiedName();
            var lastRSNOfUploadPayload = uploadBatchParams.getLastRSNOfUploadPayload();
            var relationships = sdkObject.getMetadata()[KSInternalConstants.OBJECTS_PARENT_RELATIONSHIPS];
            var parentChildRelationShip = KSMetadataUtils.getRelationshipObjectBetweenObjectsByName(relationships,
                parentTableName, childTableName);

            if (!KSCommonUtils.isNullOrEmptyObject(parentChildRelationShip)) {
                var sourceAttributes = parentChildRelationShip[KSInternalConstants.RELATIONSHIP_SOURCE_ATTRIBUTES];
                var targetAttributes = parentChildRelationShip[KSInternalConstants.RELATIONSHIP_TARGET_ATTRIBUTES];
                var sourceAttributesLength = sourceAttributes.length;
                var targetAttributesLength = targetAttributes.length;
                if (sourceAttributesLength === targetAttributesLength) {

                    var ruleForMaxReplaySequenceNumber = getRuleForMaxReplaySequenceNumber(lastRSNOfUploadPayload);
                    var whereConditionForNotIncludingRsns = getRulesForNotIncludingReplaySequenceNumbers(
                        uploadBatchParams.getHierarchyContext().getReplaySequenceNumberLookUpMap());
                    var ruleForRelatingChildRecordsForGivenParentRecord = getRuleForRelatingChildRecordsForGivenParentRecord(
                        sourceAttributes, targetAttributes, sourceAttributesLength, parentRecord);

                    var wcToSelectRecordsForAGivenChangeType = [];
                    wcToSelectRecordsForAGivenChangeType.push(getRuleForSyncChangeTypeForOuterQuery(action));
                    wcToSelectRecordsForAGivenChangeType.push([KSDatabaseConstants.LOGICAL_AND]);
                    wcToSelectRecordsForAGivenChangeType = wcToSelectRecordsForAGivenChangeType.concat(
                        ruleForRelatingChildRecordsForGivenParentRecord);
                    wcToSelectRecordsForAGivenChangeType.push([KSDatabaseConstants.LOGICAL_AND]);
                    wcToSelectRecordsForAGivenChangeType.push(ruleForMaxReplaySequenceNumber);
                    wcToSelectRecordsForAGivenChangeType = wcToSelectRecordsForAGivenChangeType.concat(
                        whereConditionForNotIncludingRsns);

                    var orderByClause = {};
                    orderByClause[KSDatabaseConstants.COLUMN] = KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER;
                    orderByClause[KSDatabaseConstants.ORDER] = KSPublicConstants.ORDER_BY_ASCENDING;

                    var queryObjForGettingChildRecordsForGivenChangeType = KSSQLQueryGenerator.buildPreparedStatementsOfTypeRead(
                        childTableName, KSTableType.HISTORY, wcToSelectRecordsForAGivenChangeType, orderByClause);
                    var childRecordsForGivenChangeType = await KSDatabaseAPI.executeQuery(
                        queryObjForGettingChildRecordsForGivenChangeType);
                    logger.trace(FUNCTION_LOG_PREFIX,
                        'the outer query data is ' + JSON.stringify(childRecordsForGivenChangeType));

                    var wcToSelectMinRSNOfRecordsOfOtherChangeType = [];
                    wcToSelectMinRSNOfRecordsOfOtherChangeType.push(getRuleForSyncChangeTypeForInnerQuery(action));
                    wcToSelectMinRSNOfRecordsOfOtherChangeType.push([KSDatabaseConstants.LOGICAL_AND]);
                    wcToSelectMinRSNOfRecordsOfOtherChangeType = wcToSelectMinRSNOfRecordsOfOtherChangeType.concat(
                        ruleForRelatingChildRecordsForGivenParentRecord);
                    wcToSelectMinRSNOfRecordsOfOtherChangeType.push([KSDatabaseConstants.LOGICAL_AND]);
                    wcToSelectMinRSNOfRecordsOfOtherChangeType.push(ruleForMaxReplaySequenceNumber);
                    wcToSelectMinRSNOfRecordsOfOtherChangeType = wcToSelectMinRSNOfRecordsOfOtherChangeType.concat(whereConditionForNotIncludingRsns);

                    var queryObjForGettingGroupedChildRecordsForInvertedChangeType = KSSQLQueryGenerator.buildPreparedStatementsOfTypeRead(
                        childTableName, KSTableType.HISTORY,
                        wcToSelectMinRSNOfRecordsOfOtherChangeType, null, null, sdkObject.getPrimaryKeys(), null, null);
                    var groupedChildRecordsForInvertedChangeType = await KSDatabaseAPI.executeQuery(
                        queryObjForGettingGroupedChildRecordsForInvertedChangeType);
                    logger.trace(FUNCTION_LOG_PREFIX,
                        'the inner query grouped data is ' + JSON.stringify(groupedChildRecordsForInvertedChangeType));

                    var relatedGroupedChildData = getRelatedGroupedRecordFromConcreteDataList(
                        groupedChildRecordsForInvertedChangeType, childRecordsForGivenChangeType, sdkObject.getPrimaryKeys());
                    logger.trace(FUNCTION_LOG_PREFIX,
                        'the related grouped data is ' + JSON.stringify(relatedGroupedChildData));

                    var minRSN_ChildRecordsForInvertedChangeTypeArray = getMinReplaySequencesFromGroupedData(
                        relatedGroupedChildData, sdkObject.getPrimaryKeys());
                    logger.trace(FUNCTION_LOG_PREFIX,
                        'the inner query grouped data after applying aggregate(MIN) function is ' +
                        JSON.stringify(minRSN_ChildRecordsForInvertedChangeTypeArray));

                    const operator = shouldGetPendingRecords ? voltmx.nosql.GTE : voltmx.nosql.LT;
                    var filteredRecords = getCoRelatedDataAccordingToOperatorOnRelatedList(childRecordsForGivenChangeType,
                        minRSN_ChildRecordsForInvertedChangeTypeArray, operator, sdkObject.getPrimaryKeys());
                    logger.trace(FUNCTION_LOG_PREFIX, 'filtered Data is ' + JSON.stringify(filteredRecords));

                    filteredRecords = getIntersectionOfHistoryRecordsGiven2Lists(
                        childRecordsForGivenChangeType, filteredRecords);

                    var finalData= await getFilteredDataAssociatedWithAllParents(shouldGetPendingRecords, sdkObject,
                        uploadBatchParams, filteredRecords, childTableName);

                    finalData.sort(replaySequenceComparer); //mimicking sql's ORDER BY replaysequencenumber
                    logger.trace(FUNCTION_LOG_PREFIX, 'finalData is ' + JSON.stringify(finalData));

                    return finalData;
                } else {
                    throw new KSError(
                        KSErrorConstants.SYNC_SOURCE_AND_TARGET_COUNT_FOR_RELATED_OBJECTS_NOT_SAME_OBJECT);
                }
            } else {
                throw new KSError(new Error(KSErrorConstants.SYNC_NO_RELATIONSHIP_FOUND_BETWEEN_OBJECTS_KEY,
                    `${KSErrorConstants.SYNC_NO_RELATIONSHIP_FOUND_BETWEEN_OBJECTS_VALUE} : ${parentTableName +
                    'and' + childTableName}`));

            }
        }

        /**This function works analogous to other sub-platform's getSubQueryForGettingMinReplaySequenceNumbersOfParentRecords.
         The difference can be recognized where inspite of query it returns aggregated data
         @param sdkObject - to find all relation to its parents
         @param uploadBatchParams - to get rsnLookUpMap
         @param shouldGetPendingRecords - to decide operator for record relation & set relation
         @param recordsInHistoryTable - <optional> ,a list of records read from HISTORY table without any criteria
         if provided this will increase perf
         */
        async function getMinReplaySequenceNumbersOfParentRecords(
            sdkObject, uploadBatchParams, shouldGetPendingRecords, recordsInHistoryTable) {

            var FUNCTION_LOG_PREFIX = LOG_PREFIX + ' getMinReplaySequenceNumbersOfParentRecords :';
            var lastRSNOfUploadPayload = uploadBatchParams.getLastRSNOfUploadPayload();
            var ruleForMaxReplaySequenceNumber = getRuleForMaxReplaySequenceNumber(lastRSNOfUploadPayload);
            var whereConditionForNotIncludingRsns = getRulesForNotIncludingReplaySequenceNumbers(
                uploadBatchParams.getHierarchyContext().getReplaySequenceNumberLookUpMap());

            var whereConditionTemplate = [];
            whereConditionTemplate.push(ruleForMaxReplaySequenceNumber);
            whereConditionTemplate = whereConditionTemplate.concat(whereConditionForNotIncludingRsns);

            if (KSCommonUtils.isNullOrEmptyObject(recordsInHistoryTable)) {
                var selectAllQueryObj = KSSQLQueryGenerator.buildPreparedStatementsOfTypeRead(
                    sdkObject.getFullyQualifiedName(),
                    KSTableType.HISTORY);
                recordsInHistoryTable = await KSDatabaseAPI.executeQuery(selectAllQueryObj);
            }

            var operator = shouldGetPendingRecords ? voltmx.nosql.GTE : voltmx.nosql.LT;
            var parentRelationships = getParentRelationships(sdkObject);
            var coRelatedDataForAllRelationship = [];

            for (var relationIndex = 0, relationshipsLength = parentRelationships.length;
                 relationIndex < relationshipsLength; relationIndex++) {
                var parentRelation = parentRelationships[relationIndex];
                var sourceObject = parentRelation[KSInternalConstants.RELATIONSHIP_SOURCE_OBJECT];
                var parentTableName = sourceObject[KSInternalConstants.NAME];
                var relatedListData;
                if (sdkObject.getFullyQualifiedName().toLowerCase() === parentTableName.toLowerCase()) {
                    /*now rule out selfReferencingPkCondition where those rsn which are present in parent query records
                     must not be present here,simple make data empty*/
                    relatedListData = [];
                } else {

                    var groupByParentPks = Object.keys(sourceObject[KSInternalConstants.OBJECTS_PRIMARY_KEYS]);
                    var sourceAttributes = parentRelation[KSInternalConstants.RELATIONSHIP_SOURCE_ATTRIBUTES];
                    var targetAttributes = parentRelation[KSInternalConstants.RELATIONSHIP_TARGET_ATTRIBUTES];

                    var parentAttributes = [];
                    var childAttributes = [];

                    if (parentRelation[KSInternalConstants.TYPE] ===
                        KSInternalConstants.KSRelationshipTypes.ONE_TO_MANY) {
                        parentAttributes = sourceAttributes;
                        childAttributes = targetAttributes;
                    } else if (parentRelation[KSInternalConstants.TYPE] ===
                        KSInternalConstants.KSRelationshipTypes.MANY_TO_ONE) {
                        parentAttributes = targetAttributes;
                        childAttributes = sourceAttributes;
                    }

                    //var ruleForJoiningCondition;
                    var parentRelatedFieldNames = [];
                    var childRelatedFieldNames = [];

                    for (var attributeIndex = 0, attributesLength = parentAttributes.length;
                         attributeIndex < attributesLength; attributeIndex++) {
                        var parentAttribute = parentAttributes[attributeIndex];
                        var childAttribute = childAttributes[attributeIndex];
                        childRelatedFieldNames.push(childAttribute[KSInternalConstants.NAME]);
                        parentRelatedFieldNames.push(parentAttribute[KSInternalConstants.NAME]);
                    }

                    var queryObjForParent = KSSQLQueryGenerator.buildPreparedStatementsOfTypeRead(parentTableName,
                        KSTableType.HISTORY,
                        whereConditionTemplate, null, null, groupByParentPks, null, null);
                    var groupedParentData = await KSDatabaseAPI.executeQuery(queryObjForParent);
                    logger.trace(FUNCTION_LOG_PREFIX +
                        'grouped data from inner query is ' + JSON.stringify(groupedParentData));

                    var relatedGroupedParentData = getRelatedGroupedRecordFromConcreteDataList(groupedParentData,
                        recordsInHistoryTable, childRelatedFieldNames, parentRelatedFieldNames);
                    logger.trace(FUNCTION_LOG_PREFIX + 'related grouped data from inner query is ' +
                        JSON.stringify(relatedGroupedParentData));

                    relatedListData = getMinReplaySequencesFromGroupedData(relatedGroupedParentData, groupByParentPks);
                    logger.trace(FUNCTION_LOG_PREFIX + 'after applying minimum aggregate on inner query ,data is ' +
                        JSON.stringify(relatedListData));

                }

                var coRelatedDataForIndividualRelationship = getCoRelatedDataAccordingToOperatorOnRelatedList(
                    recordsInHistoryTable, relatedListData, operator, childRelatedFieldNames, parentRelatedFieldNames);
                coRelatedDataForAllRelationship.push(coRelatedDataForIndividualRelationship);
            } //end of loop

            var dataResult = []; //no relationship
            var lengthOfCoRelatedDataForAllRelationship = coRelatedDataForAllRelationship.length;
            if (lengthOfCoRelatedDataForAllRelationship === 1) { // for one relationship only
                dataResult = coRelatedDataForAllRelationship[0];
            } else if (lengthOfCoRelatedDataForAllRelationship > 1) { // for more than one relationship
                dataResult = coRelatedDataForAllRelationship[0];

                var index = 1;
                do {
                    if (shouldGetPendingRecords) {
                        dataResult = getUnionOfHistoryRecordsGiven2Lists(dataResult,
                            coRelatedDataForAllRelationship[index]);
                    } else {
                        dataResult = getIntersectionOfHistoryRecordsGiven2Lists(dataResult,
                            coRelatedDataForAllRelationship[index]);
                    }
                    index++;
                } while (index < lengthOfCoRelatedDataForAllRelationship);

            }
            logger.trace(FUNCTION_LOG_PREFIX, 'the data to be returned is ' + JSON.stringify(dataResult));
            return dataResult;
        }

        /**
         * Returns number of parent relationships for an sdkObject
         * @param sdkObject KSSDKObject
         * @return Number
         */
        function getParentRelationshipsCount(sdkObject) {
            return getParentRelationships(sdkObject).length;
        }

        /**
         * Returns all parent relationships in a list for an sdkObject
         * @param sdkObject KSSDKObject
         * @return Array
         */
        function getParentRelationships(sdkObject) {
            var objectMetadata = sdkObject.getMetadata();
            var parentRelationships = objectMetadata[KSInternalConstants.OBJECTS_PARENT_RELATIONSHIPS];
            return parentRelationships;
        }

        /**
         * The method take list of sourceAttributes and targetAttributes to create the where condition for the query
         *
         * @param sourceAttributes The source attributes
         * @param targetAttributes The target attributes
         * @param record           The record from which source attribute value can be fetched
         * @return The where condition as a map
         */
        function getWhereMapForSourceAttributeEqualsTargetAttributeCondition(sourceAttributes, targetAttributes, record) {
            var whereConditionMap = {};
            for (var index = 0, sourceAttributesLength = sourceAttributes.length; index < sourceAttributesLength; index++) {
                var parentAttributeValue = record.objectForKey(sourceAttributes[index][KSInternalConstants.NAME]);
                whereConditionMap[targetAttributes[index][KSInternalConstants.NAME]] = parentAttributeValue;
            }
            return whereConditionMap;
        }

        /**
         This function results in outer whereConditions for fetching records for given changeType/action
         @param action - KSSDKObjectRecordAction
         @return Array
         */
        function getRuleForSyncChangeTypeForOuterQuery(action) {

            var ruleForOuterQuery = [];
            if (action === KSSDKObjectRecordAction.UPDATE) {
                //for action type update
                var outerNestedRule = [];

                var ruleForChangeTypeUpdate = [];

                ruleForChangeTypeUpdate.push(KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE);
                ruleForChangeTypeUpdate.push(MatchType.EQUALS.value);
                ruleForChangeTypeUpdate.push(KSSDKObjectRecordAction.UPDATE);

                var ruleForChangeTypePartialUpdate = [];
                ruleForChangeTypePartialUpdate.push(KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE);
                ruleForChangeTypePartialUpdate.push(MatchType.EQUALS.value);
                ruleForChangeTypePartialUpdate.push(KSSDKObjectRecordAction.DO_NOT_TRACK_INTERMEDIATE_UPDATES);

                outerNestedRule.push(ruleForChangeTypeUpdate);
                outerNestedRule.push([KSDatabaseConstants.LOGICAL_OR]);
                outerNestedRule.push(ruleForChangeTypePartialUpdate);

                ruleForOuterQuery = outerNestedRule;
            } else {
                //for action type other than update

                var ruleForChangeType = [];
                ruleForChangeType.push(KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE);
                ruleForChangeType.push(MatchType.EQUALS.value);
                ruleForChangeType.push(action);

                ruleForOuterQuery = ruleForChangeType;
            }

            return ruleForOuterQuery;
        }

        /**
         This function results in inner whereConditions for fetching records for given changeType/action
         @param action - KSSDKObjectRecordAction
         @return wcs array
         */
        function getRuleForSyncChangeTypeForInnerQuery(action) {
            var ruleForInnerQuery = [];
            if (action === KSSDKObjectRecordAction.UPDATE) {
                //for action type update

                var innerNestedRule = [];

                var ruleForChangeTypeOtherThanUpdate = [];

                ruleForChangeTypeOtherThanUpdate.push(KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE);
                ruleForChangeTypeOtherThanUpdate.push(MatchType.NOTEQUAL.value);
                ruleForChangeTypeOtherThanUpdate.push(KSSDKObjectRecordAction.UPDATE);

                var ruleForChangeTypeOtherThanPartialUpdate = [];
                ruleForChangeTypeOtherThanPartialUpdate.push(KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE);
                ruleForChangeTypeOtherThanPartialUpdate.push(MatchType.NOTEQUAL.value);
                ruleForChangeTypeOtherThanPartialUpdate.push(
                    KSSDKObjectRecordAction.DO_NOT_TRACK_INTERMEDIATE_UPDATES);

                innerNestedRule.push(ruleForChangeTypeOtherThanUpdate);
                innerNestedRule.push([KSDatabaseConstants.LOGICAL_AND]);
                innerNestedRule.push(ruleForChangeTypeOtherThanPartialUpdate);

                ruleForInnerQuery = innerNestedRule;
            } else {
                //for action type other than update

                var ruleForReverseChangeType = [];
                ruleForReverseChangeType.push(KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE);
                ruleForReverseChangeType.push(MatchType.NOTEQUAL.value);
                ruleForReverseChangeType.push(action);

                ruleForInnerQuery = ruleForReverseChangeType;
            }

            return ruleForInnerQuery;
        }

        /**
         compare function given as argument to sort API with respect to RSN
         @param record1
         @param record2
         */
        function replaySequenceComparer(record1, record2) {
            return record1[KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER] -
                record2[KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER];
        }

        /**
         This API is used to find set intersection of 2 sets of data for history records
         @param dataList1
         @param dataList2
         */
        function getIntersectionOfHistoryRecordsGiven2Lists(dataList1, dataList2) {
            var combinedDataList = [];
            combinedDataList = combinedDataList.concat(dataList1, dataList2);
            combinedDataList = combinedDataList.sort(replaySequenceComparer);
            var intersectionDataList = [];
            var combinedlistLength = combinedDataList.length;
            if (combinedlistLength >= 2) {
                for (var index = 0; index < combinedlistLength - 1; index++) {
                    if (combinedDataList[index][KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER] ===
                        combinedDataList[index + 1][KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER]) {
                        intersectionDataList.push(combinedDataList[index]);
                        index++;
                    }
                }
            }
            return intersectionDataList;
        }

        /**
         This API is used to find set union of 2 sets of data for history records
         @param dataList1
         @param dataList2
         */
        function getUnionOfHistoryRecordsGiven2Lists(dataList1, dataList2) {
            var combinedDataList = [];
            combinedDataList = combinedDataList.concat(dataList1, dataList2);

            combinedDataList = combinedDataList.sort(replaySequenceComparer);
            var combinedlistLength = combinedDataList.length;

            var unionDataList = [];
            if (combinedlistLength > 0) {
                unionDataList.push(combinedDataList[0]);
                var unionDataListLength = 1;
                for (var index = 1; index < combinedlistLength; index++) {
                    if (combinedDataList[index][KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER] !==
                        unionDataList[unionDataListLength - 1][KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER]) {
                        unionDataList.push(combinedDataList[index]);
                        unionDataListLength++;
                    }
                }
            }

            return unionDataList;
        }

        /**
         This function plays role to get the concrete data after checking relation with provided relation data list
         where concrete data and relation data are related w.r.t concrete filed set & relation data field set & relation operator
         @param recordsInHistoryTable - this is usually select query data with no where condition
         @param relatedListData -  this is related list data , generally the inner data from co-related sql query.
         the records should be checked from co-related data upon operator.
         @param comparisonOperator - operator(< or >= based upon passing flag-'shouldGetPendingRecords').
         @param concreteDataRelatedPkSet - list of fields.
         @param innerQueryRelatedPkSet - list of fields.
         */
        function getCoRelatedDataAccordingToOperatorOnRelatedList(
            recordsInHistoryTable, relatedListData, comparisonOperator, concreteDataRelatedPkSet, innerQueryRelatedPkSet) {
            if (KSCommonUtils.isNullOrEmptyObject(innerQueryRelatedPkSet)) {
                innerQueryRelatedPkSet = concreteDataRelatedPkSet;
            }
            var correlatedData = [];
            for (var index = 0, limit = recordsInHistoryTable.length; index < limit; index++) {
                var outerRecordObject = recordsInHistoryTable[index];
                if (isRecordCoRelated(outerRecordObject, relatedListData, comparisonOperator,
                    concreteDataRelatedPkSet,
                    innerQueryRelatedPkSet)) {
                    correlatedData.push(outerRecordObject);
                }
            }
            return correlatedData;
        }

        /**
         Check whether a record can be picked up from hierarchy satisfying relation
         @param record - record to be checked against relatedListData
         @param relatedDataList -  this is related list data , generally the inner data from co-related sql query.
         the records should be checked from co-related data upon operator.
         @param comparisonOperator - operator(< or >= based upon passing flag-'shouldGetPendingRecords').
         @param recordRelatedPkSet - list of fields related in relatedDataList.
         @param pkSetOfRelatedDataList - list of fields related in relatedDataList.
         */
        function isRecordCoRelated(
            record, relatedDataList, comparisonOperator, recordRelatedPkSet, pkSetOfRelatedDataList) {
            var KSDatabaseConstants = voltmx.sdk.OfflineObjects.KSDatabaseConstants;
            var canPick = comparisonOperator === voltmx.nosql.LT;

            for (var relatedDataListIndex = 0, relatedDataListLength = relatedDataList.length;
                 relatedDataListIndex < relatedDataListLength; relatedDataListIndex++) {
                var matchedAttributes = 0;
                var pkSetLength = recordRelatedPkSet.length;
                for (var pkIndex = 0; pkIndex < pkSetLength; pkIndex++) {
                    if (record[recordRelatedPkSet[pkIndex]] ===
                        relatedDataList[relatedDataListIndex][pkSetOfRelatedDataList[pkIndex]]) {
                        matchedAttributes++;
                    }
                }
                if (matchedAttributes === pkSetLength) {
                    var booleanResult = eval(
                        record[KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER] + comparisonOperator +
                        relatedDataList[relatedDataListIndex][KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER]);
                    canPick = booleanResult === true;
                    break;
                }
            }

            return canPick;
        }

        /**
         * This function performs aggregate function(MIN) on grouped records upon replaysequencenumber
         * @param groupedDataList
         * @param pks primaryKeys
         * @retuns list of data containing min replaysequencenumber corresponding to pks*/
        function getMinReplaySequencesFromGroupedData(groupedData, pks) {
            var KSDatabaseConstants = voltmx.sdk.OfflineObjects.KSDatabaseConstants;
            var newDataList = [];
            for (var groupIndex = 0, groupedDatalength = groupedData.length; groupIndex <
            groupedDatalength; groupIndex++) {
                var min = Number.MAX_SAFE_INTEGER;
                var dataList = groupedData[groupIndex];
                var dataLength = dataList.length;
                if (dataLength > 0) {
                    for (var dataListIndex = 0; dataListIndex < dataLength; dataListIndex++) {
                        min = min > dataList[dataListIndex][KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER] ?
                            dataList[dataListIndex][KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER] :
                            min;
                    }
                    var recordObject = {};
                    for (var pkIndex = 0, pksLength = pks.length; pkIndex < pksLength; pkIndex++) {
                        recordObject[pks[pkIndex]] = dataList[0][pks[pkIndex]];
                    }
                    recordObject[KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER] = min;
                    newDataList.push(recordObject);
                }
            }
            return newDataList;
        }

        /**This function helps in getting related records between outer and inner query
         * We are trying here to mimic the sql behaviour for nested or co-related queries.
         * E.g Lets say we have a table 'team' and table 'emp' , there can exist select on 'emp' where some field value
         * is related to aggregated result of field in table 'team' via select on condition where emp.empPk = team.teamPk
         * @param groupedDataFromInnerQuery - 2d list of grouped records
         * @param dataListFromOuterQuery - list of records
         * @param dataListFieldSet - related fields in dataList
         * @param groupedDataFieldSet - related fields in groupedDataFromInnerQuery
         * @returns related grouped records
         */
        function getRelatedGroupedRecordFromConcreteDataList(
            groupedDataFromInnerQuery, dataListFromOuterQuery, dataListFieldSet, groupedDataFieldSet) {

            if (KSCommonUtils.isUndefined(groupedDataFieldSet)) {
                groupedDataFieldSet = dataListFieldSet;
            }
            var groupedResult = [];
            if (!KSCommonUtils.isNullOrEmptyObject(groupedDataFromInnerQuery)) {
                var lengthOfgroupedData = groupedDataFromInnerQuery.length;
                for (var groupIndex = 0; groupIndex < lengthOfgroupedData; groupIndex++) {
                    var lengthOfGroup = groupedDataFromInnerQuery[groupIndex].length;
                    var result = [];
                    for (var dataIndex = 0; dataIndex < lengthOfGroup; dataIndex++) {
                        var record = groupedDataFromInnerQuery[groupIndex][dataIndex];
                        if (isRecordPresentIn(record, dataListFromOuterQuery, dataListFieldSet,
                            groupedDataFieldSet) === true) {
                            result.push(record);
                        }
                    }
                    if (result.length > 0) {
                        groupedResult.push(result);
                    }
                }
            }
            return groupedResult;
        }

        /**This function acts as helper for getRelatedGroupedRecordFromConcreteDataList()
         * Function checks whether its first argumented record is present in dataListProvided
         * @param recordToBeSearched a json records
         * @param dataList - a list of records in which recordToBeSearched to be found
         * @param dataListFieldSet - related fields in dataList
         * @param recordToBeSearchedFieldSet - related fields in recordToBeSearched*/
        function isRecordPresentIn(recordToBeSearched, dataList, dataListFieldSet, recordToBeSearchedFieldSet) {
            var isRecordPresent = false;
            var lengthOfData = dataList.length;
            var lengthOfPk = dataListFieldSet.length;
            for (var index = 0; index < lengthOfData; index++) {
                var dataFromList = dataList[index];
                var matchedAttributes = 0;
                for (var pkIndex = 0; pkIndex < lengthOfPk; pkIndex++) {
                    if (recordToBeSearched[recordToBeSearchedFieldSet[pkIndex]] ===
                        dataFromList[dataListFieldSet[pkIndex]]) {
                        matchedAttributes++;
                    }
                }

                if (matchedAttributes === lengthOfPk) {
                    isRecordPresent = true;
                    break;
                }
            }
            return isRecordPresent;
        }

        /**
         * The method returns the query for fetching the parent records for a given child record
         *
         * @param record       < KSSDKObjectRecord > the record for which parent record needs to be fetched
         * @param childObject  <KSSDKObject> The child object
         * @param parentObject <KSSDKObject> The parent object
         * @param tableType    The Table type for which query is created
         * @return list of <KSSDKObjectRecord>
         * @throws OfflineObjectsException
         */
        async function readRelatedParentRecordsFromMainTable(
            record, childObject, parentObject, tableType) {
            var relationshipsArray = childObject.getMetadata()[KSInternalConstants.OBJECTS_PARENT_RELATIONSHIPS];
            var parentChildRelationShip = KSMetadataUtils.getRelationshipObjectBetweenObjectsByName(
                relationshipsArray,
                parentObject[KSInternalConstants.NAME], childObject[KSInternalConstants.NAME]);
            if (!KSCommonUtils.isNullOrEmptyObject(parentChildRelationShip)) {
                var sourceAttributes = parentChildRelationShip[KSInternalConstants.RELATIONSHIP_SOURCE_ATTRIBUTES];
                var targetAttributes = parentChildRelationShip[KSInternalConstants.RELATIONSHIP_TARGET_ATTRIBUTES];
                if (sourceAttributes.length === targetAttributes.length) {
                    var whereConditionMap = getWhereMapForSourceAttributeEqualsTargetAttributeCondition(
                        sourceAttributes,
                        targetAttributes,
                        record);
                    var queryObj = KSSQLQueryGenerator.buildPreparedStatementsOfTypeRead(parentObject.getFullyQualifiedName(),
                                                                                         tableType,
                                                                                         whereConditionMap);
                    var recordsFromDB = await KSDatabaseAPI.executeQuery(queryObj);
                    return recordsFromRecordsDictToUpload(recordsFromDB);
                } else {
                    throw new KSError(
                        KSErrorConstants.SYNC_SOURCE_AND_TARGET_COUNT_FOR_RELATED_OBJECTS_NOT_SAME_OBJECT);
                }
            } else {
                throw new KSError(new Error(KSErrorConstants.SYNC_NO_RELATIONSHIP_FOUND_BETWEEN_OBJECTS_KEY,
                                            `${KSErrorConstants.SYNC_NO_RELATIONSHIP_FOUND_BETWEEN_OBJECTS_VALUE} : ${parentObject[KSInternalConstants.NAME] +
                                            'and' + childObject[KSInternalConstants.NAME]}`));
            }
        }

        /**
         * The method returns the query to get the history table records for a given action
         *
         * @param sdkObject The sdkObject for which recors need to be retrieved
         * @param actionList The action type of the
         * @param uploadBatchParams which contains UploadBatchSize, BatchNumber, lastRSNOfPreviousBatch,
         *                    lastRSNToUploadInTheCurrentSession and hierarchyContext
         * @return The query for the above operation
         */
        async function readRecordsFromHistoryTableForFlatObject(
            sdkObject, actionList, uploadBatchParams) {
            var numberOfFreeSlotsInCurrentBatch = uploadBatchParams.getNumberOfFreeSlotsInCurrentBatch();
            var lastRSNOfPreviousBatch = uploadBatchParams.getLastRSNOfPreviousBatch();
            var ruleArrayForIncludingActionList = [];
            // to mimic includes as in sql
            for (var index = 0, actionListLength = actionList.length; index < actionListLength; index++) {
                var ruleForIncludingActionList = [
                    KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE,
                    MatchType.EQUALS.value,
                    actionList[index]];
                ruleArrayForIncludingActionList.push(ruleForIncludingActionList);
                if (index + 1 !== actionList.length) {
                    ruleArrayForIncludingActionList.push([KSDatabaseConstants.LOGICAL_OR]);
                }
            }

            var whereCondition = [];
            whereCondition.push(ruleArrayForIncludingActionList);
            whereCondition.push([KSDatabaseConstants.LOGICAL_AND]);

            var ruleForGreaterThanReplaySequence = [
                KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER,
                MatchType.GREATER.value,
                lastRSNOfPreviousBatch];

            whereCondition.push(ruleForGreaterThanReplaySequence);
            whereCondition.push([KSDatabaseConstants.LOGICAL_AND]);

            whereCondition.push(getRuleForMaxReplaySequenceNumber(uploadBatchParams.getLastRSNOfUploadPayload()));

            var orderByMap = {};
            orderByMap[KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER] = KSPublicConstants.ORDER_BY_ASCENDING;

            var queryObj = KSSQLQueryGenerator.buildPreparedStatementsOfTypeRead(sdkObject.getFullyQualifiedName(),
                KSTableType.HISTORY, whereCondition, orderByMap, numberOfFreeSlotsInCurrentBatch);

            var recordsFromDB = await KSDatabaseAPI.executeQuery(queryObj);
            return recordsFromRecordsDictToUpload(recordsFromDB);
        }

        /**
         * Extracts the list of KSSDKObjectRecord from the results obtained from database
         * It converts the record extracted from db given in the args, to object of type KSSDKObjectRecord containing appropriate action type
         * Also sets checksum and rowid
         * @param recordsFromDB List of dictionaries obtained from database query
         * @return List of KSSDKObjectRecord
         */
        function recordsFromRecordsDictToUpload(recordsFromDB) {
            var records = [];

            for (var recordDictIndex in recordsFromDB) {
                var recordFromDB = recordsFromDB[recordDictIndex];

                for (var key in recordFromDB) {
                    if (KSCommonUtils.isUndefined(recordFromDB[key]) || KSCommonUtils.isNull(recordFromDB[key])) {
                        delete recordFromDB[key];
                    }
                }

                var record = new KSSDKObjectRecord(recordFromDB);

                /* Modify the action code to "update" if action code of the record is "dontTrackIntermediateUpdates" while
                 building upload payload*/
                if (!KSCommonUtils.isNullOrEmptyObject(
                    record.objectForKey(KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE)) &&
                    record.objectForKey(KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE) ===
                    KSSDKObjectRecordAction.DO_NOT_TRACK_INTERMEDIATE_UPDATES) {
                    record.setObjectForKey(KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE,
                        KSSDKObjectRecordAction.UPDATE);
                }

                configureActionAndCheckSumForDatabaseRecord(record);

                if (!KSCommonUtils.isNullOrEmptyObject(record)) {
                    records.push(record);
                }
            }

            return records;
        }

        function configureActionAndCheckSumForDatabaseRecord(record) {
            var actionCode = record.objectForKey(KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE);
            if (!KSCommonUtils.isNullOrEmptyObject(actionCode)) {
                var actionString = voltmx.sdk.OfflineObjects.getValueOfRecordActionAsString[actionCode];
                record.setAction(actionString);
            }
            var checksum = !KSCommonUtils.isNullOrEmptyObject(
                record.objectForKey(KSDatabaseConstants.KONY_SYNC_HASH_SUM)) ?
                record.objectForKey(KSDatabaseConstants.KONY_SYNC_HASH_SUM).toString() : '';
            record.setCheckSum(checksum);
            var rowId = !KSCommonUtils.isNullOrEmptyObject(
                record.objectForKey(KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER)) ?
                record.objectForKey(KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER) : Number.MAX_VALUE;
            record.setRowid(rowId);
            return record;
        }


        exports.dropDatabase = dropDatabase;
        exports.getRecordByPK = getRecordByPK;
        exports.getParentRelationships = getParentRelationships;
        exports.clearDataForGivenObject = clearDataForGivenObject;
        exports.getDeltaChangesToUpload = getDeltaChangesToUpload;
        exports.getDeletePreparedStatement = getDeletePreparedStatement;
        exports.buildWhereConditionAsString = buildWhereConditionAsString;
        exports.clearDataForGivenObjectList = clearDataForGivenObjectList;
        exports.recordsFromRecordsDictToUpload = recordsFromRecordsDictToUpload;
        exports.persistUploadResponseForObjects = persistUploadResponseForObjects;
        exports.readRelatedParentRecordsFromMainTable = readRelatedParentRecordsFromMainTable;
        exports.getParentRelationshipsCount = getParentRelationshipsCount;
        exports.persistUploadResponseForObjects = persistUploadResponseForObjects;
        exports.getUnionOfHistoryRecordsGiven2Lists = getUnionOfHistoryRecordsGiven2Lists;
        exports.buildQueriesToPersistChangesForObjects = buildQueriesToPersistChangesForObjects;
        exports.executePreparedStatementsAsTransaction = executePreparedStatementsAsTransaction;
        exports.getIntersectionOfHistoryRecordsGiven2Lists = getIntersectionOfHistoryRecordsGiven2Lists;
        exports.readRelatedChildRecordsFromHistoryTable = readRelatedChildRecordsFromHistoryTable;
        exports.readRecordsFromHistoryTableForFlatObject = readRecordsFromHistoryTableForFlatObject;
        exports.getLastReplaySequenceNumberOfObjectService = getLastReplaySequenceNumberOfObjectService;
        exports.configureActionAndCheckSumForDatabaseRecord = configureActionAndCheckSumForDatabaseRecord;
        exports.buildAndExecutePreparedStatementsOfTypeRead = buildAndExecutePreparedStatementsOfTypeRead;
        exports.buildPreparedStatementsForObjectRollback = buildPreparedStatementsForObjectRollback;
        exports.buildPreparedStatementsForApplicationRollback = buildPreparedStatementsForApplicationRollback;
        exports.readRecordsFromHistoryTableOfRootParentObject = readRecordsFromHistoryTableOfRootParentObject;
        exports.setRemoveAfterUploadParam = setRemoveAfterUploadParam;
        exports.buildUpdatePreparedStatementForTrackIntermediateUpdatesRecord = buildUpdatePreparedStatementForTrackIntermediateUpdatesRecord;
        exports.getNumberOfRecordsDeferredAndTrackIntermediateUpdateSetToFalse = getNumberOfRecordsDeferredAndTrackIntermediateUpdateSetToFalse;

    });

// ************************************* Start of VoltmxNoSQLDatabaseHelper.js *************************************

define("VoltmxNoSQLDatabaseHelper", ["require", "exports", "KSCommonUtils", "KSError", "KSExceptionWrapperUtils"], function (require, exports, KSCommonUtils, _KSError, KSExceptionWrapperUtils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    var VoltmxNoSQLDatabaseHelper = /** @class */ (function () {
        var nosqlVersion = null;
        var nosqlDBInstance = null;
        var nosqlDatabaseName = null;

        var LOG_PREFIX = "VoltmxNoSQLDatabaseHelper : ";
        var log = voltmx.sdk.logsdk;

        var KSError = _KSError.KSError;
        var KSErrorConstants = voltmx.sdk.OfflineObjects.KSErrorConstants;
        var KSPublicConstants = voltmx.sdk.OfflineObjects.KSPublicConstants;
        var KSDatabaseConstants = voltmx.sdk.OfflineObjects.KSDatabaseConstants;
        var KSDataTypes = KSDatabaseConstants.KSDataTypes;
        var supportedRuleOperators = Object.freeze([
            '=',
            '==',
            voltmx.nosql.EQ,
            '<',
            voltmx.nosql.LT,
            '<=',
            voltmx.nosql.LTE,
            '>',
            voltmx.nosql.GT,
            '>=',
            voltmx.nosql.GTE,
            '<>',
            '!=',
            voltmx.nosql.NEQ]);

        /**
         * Constructor VoltmxNoSQLDatabaseHelper
         */
        function VoltmxNoSQLDatabaseHelper() {
            //Empty Constructor
        }

        function resetVoltmxNoSQLDatabaseHelperGlobals() {
            log.trace(LOG_PREFIX + "[resetVoltmxNoSQLDatabaseHelperGlobals] called...");
            nosqlVersion = null;
            nosqlDBInstance = null;
            nosqlDatabaseName = null;
            VoltmxNoSQLDatabaseHelper.db = null;
            VoltmxNoSQLDatabaseHelper.dbTablesList = null;
        }

        function deleteVoltmxNoSQLDatabase(dbname, fulfill, fail) {
            log.trace(LOG_PREFIX + "[deleteVoltmxNoSQLDatabase] called...");
            voltmx.nosql.deleteDatabase(dbname).then(res => {
                log.debug(LOG_PREFIX, "[deleteVoltmxNoSQLDatabase] successful.");
                fulfill(res);
            }).catch(deleteDBError => {
                log.error(LOG_PREFIX, "[deleteVoltmxNoSQLDatabase] failed with database error: " + JSON.stringify(deleteDBError));
                fail(KSExceptionWrapperUtils.wrapDBException(deleteDBError));
            });
        }

        function isDataReconciliation(pks, data) {
            log.trace(LOG_PREFIX + "[isDataReconciliation] Primary keys: " + pks);
            var isReconciliation = false;
            if ((typeof pks) === KSDataTypes.STRING) {
                if (data.hasOwnProperty(pks)) {
                    isReconciliation = true;
                }
            } else {
                var pksLength = pks.length;
                for (var index = 0; index < pksLength; index++) {
                    if (data.hasOwnProperty(pks[index])) {
                        isReconciliation = true;
                    }
                }
            }
            log.debug(LOG_PREFIX, "[isDataReconciliation] Primary keys: " + pks + " is " + isReconciliation);
            return isReconciliation;
        }

        function getVoltmxNoSqlConditionFromMap(whereClauseMap) {
            log.trace(LOG_PREFIX + "[getVoltmxNoSqlConditionFromMap] called...");
            var whereCondition = null;
            if (!voltmx.sdk.isNullOrUndefined(whereClauseMap)) {
                for (var key in whereClauseMap) {
                    var rule = null;
                    if (whereClauseMap.hasOwnProperty(key)) {
                        rule = getVoltmxNoSqlRule(key, voltmx.nosql.EQ, whereClauseMap[key]);
                        if (whereCondition == null) {
                            log.trace(LOG_PREFIX + "[getVoltmxNoSqlConditionFromMap] creating the first rule...");
                            whereCondition = new voltmx.nosql.Condition(rule);
                        } else {
                            log.trace(LOG_PREFIX + "[getVoltmxNoSqlConditionFromMap] adding nextRule to the exiting condition...");
                            whereCondition.addRule(voltmx.nosql.AND, rule);
                        }
                    }
                }
            }
            return whereCondition;
        }

        function isRuleArray(ruleArray) {
            var isRule = false;
            if (ruleArray.length == 3) {
                var lhsOperand = ruleArray[0];
                var operation = ruleArray[1];
                isRule = ((typeof (lhsOperand)).toLowerCase() === KSDatabaseConstants.KSDataTypes.STRING &&
                    (supportedRuleOperators.includes(operation) === true));
            }
            return isRule;

        }

        function getRuleFromRuleArray(ruleArray) {
            var lhsOperand = ruleArray[0];
            var operation = ruleArray[1];
            var rhsOperand = ruleArray[2];
            var rule = getVoltmxNoSqlRule(lhsOperand, operation, rhsOperand);
            log.trace(LOG_PREFIX + '[getVoltmxNoSqlConditionFromArray] formed a rule - lhs:' +
                rule.column + ' operator:' + rule.operator + ' value:' + rule.value);
            return rule;
        }

        function getVoltmxNoSqlConditionFromArray(whereClauseArray) {
            log.trace(
                LOG_PREFIX + '[getVoltmxNoSqlConditionFromArray] being called');
            var whereCondition = null;
            var conditionLength = whereClauseArray.length;

            if (conditionLength >= 1) {
                var firstRuleArray = whereClauseArray[0];
                log.trace(LOG_PREFIX + '[getVoltmxNoSqlConditionFromArray] processing first rule');
                if (isRuleArray(firstRuleArray)) {
                    log.trace(LOG_PREFIX
                              + '[getVoltmxNoSqlConditionFromArray] Creating a simple Condition with only one rule');
                    whereCondition = new voltmx.nosql.Condition(getRuleFromRuleArray(firstRuleArray));
                } else {
                    log.trace(LOG_PREFIX + '[getVoltmxNoSqlConditionFromArray] Found nested rule');
                    whereCondition = new voltmx.nosql.Condition(getVoltmxNoSqlConditionFromArray(firstRuleArray));
                }
            }

            for (var outerIndex = 1; outerIndex < conditionLength; outerIndex += 2) {
                var conjunctionOperation = whereClauseArray[outerIndex][0];
                var conjunctionOperator = getLogicalVoltmxOperation(conjunctionOperation);
                var nextRuleArray = whereClauseArray[outerIndex + 1];
                log.trace(LOG_PREFIX
                          + '[getVoltmxNoSqlConditionFromArray] Adding next Rule of the complex array to the'
                          + ' existing where condition' + whereCondition.toString());

                if (isRuleArray(nextRuleArray) === true) {
                    log.trace(LOG_PREFIX
                              + '[getVoltmxNoSqlConditionFromArray] Appending simple next Rule to existing condition');
                    whereCondition.addRule(conjunctionOperator, getRuleFromRuleArray(nextRuleArray));
                } else {
                    log.trace(LOG_PREFIX
                              + '[getVoltmxNoSqlConditionFromArray] Appending nested next Condition to existing'
                              + ' condition');
                    whereCondition.addCondition(conjunctionOperator,
                                                getVoltmxNoSqlConditionFromArray(nextRuleArray));
                }
            }

            var conditionString = null;
            if (!voltmx.sdk.isNullOrUndefined(whereCondition)) {
                conditionString = whereCondition.toString();
            }
            log.trace(LOG_PREFIX + '[getVoltmxNoSqlConditionFromArray] returning condition is' + conditionString);
            return whereCondition;
        }

        function getVoltmxNoSqlWhereCondition(whereClause) {
            log.trace(LOG_PREFIX + "[getVoltmxNoSqlWhereCondition] called... with whereClause: " + JSON.stringify(whereClause));
            var voltmxNosqlCondition = null;
            if (!voltmx.sdk.isNullOrUndefined(whereClause) && voltmx.sdk.isArray(whereClause)) {
                voltmxNosqlCondition = getVoltmxNoSqlConditionFromArray(whereClause);
            } else {
                voltmxNosqlCondition = getVoltmxNoSqlConditionFromMap(whereClause);
            }
            log.debug(LOG_PREFIX, "[getVoltmxNoSqlWhereCondition] generated condition: " + JSON.stringify(voltmxNosqlCondition));
            return voltmxNosqlCondition;
        }

        function getVoltmxNoSqlRule(leftHandSide, operator, rightHandSide) {
            log.trace(LOG_PREFIX + "[getVoltmxNoSqlRule] called... " + leftHandSide + " " + operator + " " + rightHandSide);
            switch (operator) {
                case "=":
                case "==":
                case voltmx.nosql.EQ:
                    return new voltmx.nosql.Rule(leftHandSide, voltmx.nosql.EQ, rightHandSide);
                case "<":
                case voltmx.nosql.LT:
                    return new voltmx.nosql.Rule(leftHandSide, voltmx.nosql.LT, rightHandSide);
                case "<=":
                case voltmx.nosql.LTE:
                    return new voltmx.nosql.Rule(leftHandSide, voltmx.nosql.LTE, rightHandSide);
                case ">":
                case voltmx.nosql.GT:
                    return new voltmx.nosql.Rule(leftHandSide, voltmx.nosql.GT, rightHandSide);
                case ">=":
                case voltmx.nosql.GTE:
                    return new voltmx.nosql.Rule(leftHandSide, voltmx.nosql.GTE, rightHandSide);
                case "<>":
                case "!=":
                case voltmx.nosql.NEQ:
                    return new voltmx.nosql.Rule(leftHandSide, voltmx.nosql.NEQ, rightHandSide);
                default:
                    log.warn(LOG_PREFIX + "[getVoltmxNoSqlRule] No proper operator passed...");
                    return null;
            }
        }

        function getLogicalVoltmxOperation(logicalOperator) {
            log.trace(LOG_PREFIX + "[getLogicalVoltmxOperation] called..." + logicalOperator);
            switch (logicalOperator.toUpperCase()) {
                case "AND":
                    return voltmx.nosql.AND;
                case "OR":
                    return voltmx.nosql.OR;
                default:
                    log.fatal(LOG_PREFIX + "[getLogicalVoltmxOperation] Can not execute query as logicalOperator can either have values AND or OR");
                    throw new KSError(KSErrorConstants.DB_EXECUTE_QUERY_FAILED);
            }
        }

        function updateRecordsInTable(txn, tableName, updatedData, condition, fulfill, fail) {
            log.trace(LOG_PREFIX + "[updateRecordsInTable] called...");
            voltmx.nosql.updateRecords(txn, tableName, updatedData, condition)
                .then(function (resultSet) {
                    log.trace(LOG_PREFIX, "[updateRecordsFromTable " + tableName + "] successful.");
                    fulfill(resultSet);
                })
                .catch(function (error) {
                    log.error(LOG_PREFIX, "[updateRecordsFromTable " + tableName + "] failed with error: " + JSON.stringify(error));
                    fail(KSExceptionWrapperUtils.wrapDBException(error));
                });
        }

        function reconcilePKsInTable(txn, tableName, updatedData, condition, fulfill, fail) {
            log.trace(LOG_PREFIX + "[reconcilePKsInTable] called...");
            var existingData = [];
            if (voltmx.sdk.isNullOrUndefined(updatedData)) {
                fulfill(0);
                return;
            }
            voltmx.nosql.fetchRecords(txn, tableName, condition)
                .then(resultSet => {
                    while (resultSet.next) {
                        existingData.push(resultSet.record);
                    }
                    var existingDataLength = existingData.length;
                    // Finish operation if there are no records after select operation
                    if (existingDataLength === 0) {
                        log.trace(LOG_PREFIX + "[reconcilePKsInTable] No records to reconcile.");
                        fulfill(0);
                    } else {
                        //reconcile the fetched result with the new data (updatedData with PK changes)
                        for (var index = 0; index < existingDataLength; index++) {
                            KSCommonUtils.mergeTwoJSONMaps(existingData[index], updatedData);
                        }
                        // delete older data
                        voltmx.nosql.deleteRecords(txn, tableName, condition)
                            .then(count => {
                                log.trace(LOG_PREFIX, "records to reconcile: " + count);
                                //insert the reconciled records(JSON) in database
                                voltmx.nosql.addRecords(txn, tableName, existingData)
                                    .then(res => {
                                        fulfill(existingDataLength);
                                    })
                                    .catch(insertException => {
                                        log.error(LOG_PREFIX, "reconcile failed: " + JSON.stringify(insertException));
                                        fail(KSExceptionWrapperUtils.wrapDBException(insertException));
                                    });
                            })
                            .catch(deleteException => {
                                log.error(LOG_PREFIX, "reconcile failed with error: " + JSON.stringify(deleteException));
                                fail(KSExceptionWrapperUtils.wrapDBException(selectException));
                            });
                    }
                }).catch(selectException => {
                log.error(LOG_PREFIX, "reconcile failed: " + JSON.stringify(selectException));
                fail(KSExceptionWrapperUtils.wrapDBException(selectException));
            });
        }

        function deleteRecordsFromTable(txn, tableName, condition, fulfill, fail) {
            log.trace(LOG_PREFIX + "[deleteRecordsFromTable] called...");
            voltmx.nosql.deleteRecords(txn, tableName, condition)
                .then(function (resultSet) {
                    log.trace(LOG_PREFIX, "[deleteRecordsFromTable " + tableName + "] successful.");
                    fulfill(resultSet);
                })
                .catch(function (error) {
                    log.error(LOG_PREFIX, "[deleteRecordsFromTable " + tableName + "] failed with error: " + JSON.stringify(error));
                    fail(KSExceptionWrapperUtils.wrapDBException(error));
                });
        }

        function insertRecordsInTable(txn, tableName, data, fulfill, fail) {
            log.trace(LOG_PREFIX + "[insertRecordsInTable '" + tableName + "'] called...");
            voltmx.nosql.addRecords(txn, tableName, data)
                .then(function (resultSet) {
                    log.trace(LOG_PREFIX, "[insertRecordsInTable] successful.");
                    fulfill(resultSet);
                })
                .catch(function (error) {
                    log.error("[insertRecordsInTable] Failed to insert record with error: " + JSON.stringify(error));
                    fail(KSExceptionWrapperUtils.wrapDBException(error));
                });
        }

        function insertOrReplaceRecordsInTable(txn, tableName, data, fulfill, fail) {
            log.trace(LOG_PREFIX + "[insertOrReplaceRecordsInTable '" + tableName + "'] called...");
            voltmx.nosql.addOrReplaceRecords(txn, tableName, data)
                .then(function (resultSet) {
                    log.trace(LOG_PREFIX, "[insertOrReplaceRecordsInTable] successful.");
                    fulfill(resultSet);
                })
                .catch(function (error) {
                    log.error(LOG_PREFIX, "[insertOrReplaceRecordsInTable] failed with error: " + JSON.stringify(error));
                    fail(KSExceptionWrapperUtils.wrapDBException(error));
                });
        }

        function fetchRecordsFromTable(txn, tableName, condition, projectionColumns, groupby, groupbyindex, orderby, limit, fulfill, fail) {
            log.trace(LOG_PREFIX + "[fetchRecordsFromTable] called...");
            var projectionRequired = false;
            var columnToSort, sortOrder;

            function orderByAsc(x, y) {
                log.trace(LOG_PREFIX + "[orderByAsc] called...");
                return ((x[columnToSort] == y[columnToSort]) ? 0 : ((x[columnToSort] > y[columnToSort]) ? 1 : -1));
            }

            function orderByDesc(x, y) {
                log.trace(LOG_PREFIX + "[orderByDesc] called...");
                return ((x[columnToSort] == y[columnToSort]) ? 0 : ((y[columnToSort] > x[columnToSort]) ? 1 : -1));
            }

            function filterProjectionColumns(record) {
                var columnsInRecordColumns = Object.keys(record);
                for (var index = 0; index < columnsInRecordColumns.length; index++) {
                    // delete unneccessary columns from results
                    if (projectionColumns.indexOf(columnsInRecordColumns[index]) === -1) {
                        delete record[columnsInRecordColumns[index]];
                    }
                }
                return record;
            }

            //check if projectionColumns is present
            if (!KSCommonUtils.isNullOrEmptyObject(projectionColumns)) {
                projectionRequired = true;
            }

            // get the orderbycolumn and sorting order(asc/desc)
            log.trace(LOG_PREFIX + "[fetchRecordsFromTable] orderby " + JSON.stringify(orderby));
            if (!voltmx.sdk.isNullOrUndefined(orderby)) {
                for (var key in orderby) {
                    if (orderby.hasOwnProperty(key)) {
                        // get the first key in map and use for sorting
                        columnToSort = key;
                        sortOrder = orderby[key] ? orderby[key].toUpperCase() : KSPublicConstants.ORDER_BY_DEFAULT;
                        break;
                    }
                }
            }
            //fetch records using voltmx.nosql.fetchRecords
            voltmx.nosql.fetchRecords(txn, tableName, condition)
                .then(function (resultSet) {
                    var resultArray = [];
                    var resultSetCount = 0;

                    //group by
                    if (!voltmx.sdk.isNullOrUndefined(groupby)) {
                        if(!voltmx.sdk.isNullOrUndefined(groupbyindex)) {
                            //If groupbyindex is defined, resultSet format is a simple array.
                            //Refer groupby indexdb documentation
                            resultSet = resultSet.groupBy(groupby, groupbyindex);
                            for(var i=0; i < resultSet.length; i++) {
                                resultSetCount++;
                                if(projectionRequired) {
                                    resultSet[i] = filterProjectionColumns(resultSet[i]);
                                }
                                resultArray.push(resultSet[i]);
                            }
                        } else {
                            //If groupbyindex is not defined, result set format is an array of arrays
                            //Refer groupby indexdb documentation
                            resultArray = resultSet.groupBy(groupby);

                            for (var groupIndex = 0, groupLength = resultArray.length; groupIndex < groupLength; groupIndex++) {
                                for (var dataListIndex = 0, dataListLength = resultArray[groupIndex].length;
                                     dataListIndex < dataListLength; dataListIndex++) {
                                    resultSetCount++;
                                    if (projectionRequired) {
                                        resultArray[groupIndex][dataListIndex] = filterProjectionColumns(
                                            resultArray[groupIndex][dataListIndex]);
                                    }
                                }
                            }
                        }
                    } else {
                        while (resultSet.next) {
                            var currentRecord = resultSet.record;
                            resultSetCount++;
                            if (projectionRequired) {
                                currentRecord = filterProjectionColumns(currentRecord);
                            }
                            resultArray.push(currentRecord);
                        }
                    }

                    log.trace(LOG_PREFIX + "[fetchRecordsFromTable] resultSetCount: " + resultSetCount);
                    log.trace(LOG_PREFIX + "[fetchRecordsFromTable] columnToSort: " + columnToSort);
                    log.trace(LOG_PREFIX + "[fetchRecordsFromTable] sortOrder: " + sortOrder);
                    /*
                        Sort results if they are in a 1D array
                        explaination of below conditions
                        without group by gives 1d array
                        group by with index gives 1d array
                        group by without index gives 2d array, cant apply limit over here
                    */
                    if (orderby && (KSCommonUtils.isNullOrEmptyObject(groupby) || !KSCommonUtils.isNull(groupbyindex))) {
                        if (sortOrder === KSPublicConstants.ORDER_BY_DESCENDING) {
                            resultArray.sort(orderByDesc);
                        } else {
                            resultArray.sort(orderByAsc);
                        }
                    }

                   /*
                        limits the resultArray according to the limit value
                        explaination of below conditions
                        without group by gives 1d array
                        group by with index gives 1d array
                        group by without index gives 2d array, cant apply limit over here
                    */
                    if ((typeof limit).toLowerCase() === KSDataTypes.NUMBER && limit < resultSetCount &&
                        (KSCommonUtils.isNullOrEmptyObject(groupby) || !KSCommonUtils.isNull(groupbyindex))) {
                            resultArray.splice(limit);
                    }
                    fulfill(resultArray);
                })
                .catch(function (error) {
                    log.error(LOG_PREFIX + "[fetchRecordsFromTable " + tableName +
                        "] Failed to fetch records with error: " + JSON.stringify(error));
                    fail(KSExceptionWrapperUtils.wrapDBException(error));
                });
        }

        function getDBNotInitializedError() {
            log.trace(LOG_PREFIX + "[getDBNotInitializedError] Database object is not initialized.");
            return new KSError(KSErrorConstants.DB_INSTANCE_NOT_INITIALIZED);
        }

        /**
         * Defining KSDatabaseOperation for CRUDS
         */
        VoltmxNoSQLDatabaseHelper.KSDatabaseOperation = voltmx.sdk.OfflineObjects.KSDatabaseConstants.KSDatabaseOperations;

        /**
         * Function to initialize indexeddb.
         * @param dbname Database name
         * @param nextIndexedDBVersion version to open the database
         * @param dbInfo queries to create/delete/update tables
         */
        VoltmxNoSQLDatabaseHelper.getDBInstance = function (dbname, nextIndexedDBVersion, dbInfo) {
            log.trace(LOG_PREFIX + "[getDBInstance '" + dbname + "'] called...");
            return new Promise(function (resolve, reject) {

                let dbInfoOfTablesToBeCreated;
                let dbInfoOfTablesToBeUpdated;
                let listOfTablesToBeDeleted;

                if (VoltmxNoSQLDatabaseHelper.db === null || nosqlDBInstance === null) {
                    nosqlDatabaseName = dbname;

                    if (!voltmx.sdk.isNullOrUndefined(dbInfo)) {
                        VoltmxNoSQLDatabaseHelper.db = new VoltmxNoSQLDatabaseHelper();

                        if (dbInfo.hasOwnProperty(KSDatabaseConstants.KSQueryTypes.CREATE)) {
                            VoltmxNoSQLDatabaseHelper.db.parseDatabaseSchema(dbInfo[KSDatabaseConstants.KSQueryTypes.CREATE]);
                            dbInfoOfTablesToBeCreated = dbInfo[KSDatabaseConstants.KSQueryTypes.CREATE];
                        }

                        if (dbInfo.hasOwnProperty('indicesUpdates')) {
                            dbInfoOfTablesToBeUpdated = dbInfo['indicesUpdates'];
                        }

                        if (dbInfo.hasOwnProperty(KSDatabaseConstants.KSQueryTypes.DELETE)) {
                            listOfTablesToBeDeleted = dbInfo[KSDatabaseConstants.KSQueryTypes.DELETE];
                        }
                    }

                    var upgradeCallback = function (kdb) {
                        if (dbInfoOfTablesToBeCreated) {
                            for (var tableName in dbInfoOfTablesToBeCreated) {
                                var config = VoltmxNoSQLDatabaseHelper.db.getTableConfig(dbInfoOfTablesToBeCreated[tableName]);
                                voltmx.nosql.createTable(kdb, tableName, config)
                            }
                        }

                        if (dbInfoOfTablesToBeUpdated) {
                            for (var tableInfo of dbInfoOfTablesToBeUpdated) {
                                // check table exists
                                if (!kdb.db.objectStoreNames.contains(tableInfo.name))  continue;

                                if (Object.keys(tableInfo.createdFields).length > 0) {
                                    try {
                                        // create new indexes
                                        voltmx.nosql.createIndices(kdb, tableInfo.name, tableInfo.createdFields);

                                        log.trace(`${LOG_PREFIX} Indices created successfully for ${tableInfo.name} `)
                                    } catch (error) {
                                        voltmx.sdk.logsdk.error(LOG_PREFIX, error.message);
                                    }
                                }

                                if (Object.keys(tableInfo.deletedFields).length > 0) {
                                    try {
                                        // delete existing indexes
                                        voltmx.nosql.deleteIndices(kdb, tableInfo.name, tableInfo.deletedFields);

                                        log.trace(`${LOG_PREFIX} Indices deleted successfully for ${tableInfo.name} `)
                                    } catch (error) {
                                        voltmx.sdk.logsdk.error(LOG_PREFIX, error.message);
                                    }
                                }
                            }
                        }

                        if (listOfTablesToBeDeleted) {
                            for (var index in listOfTablesToBeDeleted) {
                                voltmx.nosql.deleteTable(kdb, listOfTablesToBeDeleted[index]);
                            }
                        }
                    };

                    voltmx.nosql.openDatabase(dbname, nextIndexedDBVersion, upgradeCallback)
                        .then(dbInstance => {

                            //[...] is the syntax for converting DOMStringList into Array
                            VoltmxNoSQLDatabaseHelper.dbTablesList = Array.from(dbInstance.db[KSDatabaseConstants.OBJECT_STORE_NAMES]);

                            nosqlVersion = dbInstance.db[KSDatabaseConstants.INDEXED_DB_VERSION];
                            nosqlDBInstance = dbInstance;

                            log.trace(LOG_PREFIX + "[getDBInstance] Opened database '" + dbname + "' successfully.");
                            resolve(VoltmxNoSQLDatabaseHelper.db);
                        })
                        .catch(openDBError => {

                        log.error(LOG_PREFIX + "[getDBInstance] Error occurred while opening '" + dbname + "' database with error: "
                            + JSON.stringify(openDBError));
                        reject(KSExceptionWrapperUtils.wrapDBException(openDBError));
                    });
                } else {
                    resolve(VoltmxNoSQLDatabaseHelper.db);
                }
            });
        };

        /**
         *
         * @param {*} schema
         */
        VoltmxNoSQLDatabaseHelper.prototype.parseDatabaseSchema = function (schema) {
            log.trace(LOG_PREFIX + "[parseDatabaseSchema] called...");
            var key = '';
            for (key in schema) {
                (function (table, value) {
                    var columns = [];
                    schema[table] = [];
                    columns = value.split(',');
                    columns.forEach(function (name) {
                        var column = {};
                        if (name[0] === '&') {
                            name = name.substr(1, name.length - 1);
                            schema[table].push({name: name, primaryKey: true});
                        } else if (name[0] === '+' && name[1] === '+') {
                            name = name.substr(2, name.length - 1);
                            schema[table].push({name: name, primaryKey: true, autoIncrement: true});
                        } else if (name[0] === '[' && name[name.length - 1] === ']') {
                            name = name.substr(1, name.length - 2);
                            name = name.split('+');
                            name.forEach(function (col) {
                                schema[table].push({name: col, primaryKey: true});
                            });
                        } else {
                            schema[table].push({name: name});
                        }
                    });
                }(key, schema[key]));
            }
        };

        /**
         *
         * @param {*} tableObj
         */
        VoltmxNoSQLDatabaseHelper.prototype.getPrimaryKeysFromTableSchema = function (tableObj) {
            log.trace(LOG_PREFIX + "[getPrimaryKeysFromTableSchema] called...");
            var keys = [];
            tableObj.forEach(function (column) {
                if (column.primaryKey) {
                    keys.push(column.name);
                }
            });
            log.trace(LOG_PREFIX + "[getPrimaryKeysFromTableSchema] returns: " + JSON.stringify(keys));
            return keys;
        };

        /**
         *
         * @param {*} tableObj
         */
        VoltmxNoSQLDatabaseHelper.prototype.getColumnsObject = function (tableObj) {
            log.trace(LOG_PREFIX + "[getColumnsObject] called..");
            var columnsObj = {};
            tableObj.forEach(function (column) {
                columnsObj[column.name] = {};
            });
            log.trace(LOG_PREFIX + "[getColumnsObject] returns: " + JSON.stringify(columnsObj));
            return columnsObj;
        };

        /**
         *
         * @param {*} tableObj
         */
        VoltmxNoSQLDatabaseHelper.prototype.getTableConfig = function (tableObj) {
            log.trace(LOG_PREFIX + "[getTableConfig] called..");
            var primaryKeys, tableConfig = {};
            primaryKeys = this.getPrimaryKeysFromTableSchema(tableObj);
            if (primaryKeys.length === 1) {
                primaryKeys = primaryKeys[0];
            }

            var columns = this.getColumnsObject(tableObj);
            tableConfig.primaryKey = primaryKeys;
            tableConfig.indexes = columns;
            log.trace(LOG_PREFIX + "[getTableConfig] returning: " + JSON.stringify(tableConfig));
            return tableConfig;
        };

        /**
         *
         */
        VoltmxNoSQLDatabaseHelper.prototype.getAllTablesList = function () {
            return new Promise(function (resolve, reject) {
                if (voltmx.sdk.isNullOrUndefined(nosqlDBInstance)) {
                    reject(getDBNotInitializedError());
                } else {
                    voltmx.nosql.getTables(nosqlDBInstance)
                        .then(tables => {
                            log.trace(LOG_PREFIX + "[getAllTablesList]  returns: " + JSON.stringify(tables));
                            resolve(tables);
                        })
                        .catch(getTablesError => {
                            log.error(LOG_PREFIX + "[getAllTablesList]  failed: " + JSON.stringify(getTablesError));
                            reject(KSExceptionWrapperUtils.wrapDBException(getTablesError));
                        });
                }
            }); // End of custom Promise
        };

        /**
         *
         */
        VoltmxNoSQLDatabaseHelper.prototype.resetDatabaseConnection = function () {
            log.trace(LOG_PREFIX + "[resetDatabaseConnection] called...");
            //TODO: db.close();
        };
        /**
         *
         */
        VoltmxNoSQLDatabaseHelper.prototype.closeConnection = function () {
            log.trace(LOG_PREFIX + "[closeConnection] called...");
            return new Promise(function (resolve, reject) {
                voltmx.nosql.closeDatabase(nosqlDBInstance)
                    .then(res => {
                        log.info(LOG_PREFIX + "[closeConnection] successful.");
                        resetVoltmxNoSQLDatabaseHelperGlobals();
                        resolve(res);
                    })
                    .catch(closeException => {
                        log.error(LOG_PREFIX + "[closeConnection] failed " + JSON.stringify(closeException));
                        reject(KSExceptionWrapperUtils.wrapDBException(closeException));
                    })
            }); // End of Custom Promise
        };

        /**
         *
         */
        VoltmxNoSQLDatabaseHelper.prototype.resetDatabase = async function () {
            log.trace(LOG_PREFIX + "[resetDatabase] called...");
            var self = this;
            return new Promise(function (resolve, reject) {
                self.getAllTablesList()
                    .then(dbTablesList => {
                        if (!KSCommonUtils.isNullOrEmptyObject(dbTablesList)) {
                            self.transaction(mode, tablesList, function (txn) {
                                self.deleteDataFromTable(txn, dbTablesList[i], null);
                            })
                                .then(res => {
                                    log.trace(LOG_PREFIX + "[resetDatabase] successful");
                                    resolve(res);
                                })
                                .catch(transactionError => {
                                    log.error(LOG_PREFIX + "[resetDatabase] failed with error: " + JSON.stringify(transactionError));
                                    reject(transactionError);
                                });
                        }
                    })
                    .catch(gettablesError => {
                        log.error(LOG_PREFIX + "[resetDatabase]  failed..");
                        reject(gettablesError);
                    });
            });
        };

        /**
         *
         * @param {*} dbName
         */
        VoltmxNoSQLDatabaseHelper.prototype.dropDatabase = async function (dbName) {
            log.trace(LOG_PREFIX + "[dropDatabase '" + dbName + "'] called...");
            return new Promise(function (resolve, reject) {
                if (voltmx.sdk.isNullOrUndefined(nosqlDBInstance)) {
                    reject(getDBNotInitializedError());
                } else {
                    voltmx.nosql.closeDatabase(nosqlDBInstance)
                        .then(res => {
                            resetVoltmxNoSQLDatabaseHelperGlobals();
                            deleteVoltmxNoSQLDatabase(dbName, resolve, reject);
                        })
                        .catch(closeException => {
                            log.error(LOG_PREFIX + "[dropDatabase] failed..." + JSON.stringify(closeException));
                            reject(KSExceptionWrapperUtils.wrapDBException(closeException));
                        });
                }
            });
        };

        /**
         *
         * @param {*} query
         * @param {*} tx
         */
        VoltmxNoSQLDatabaseHelper.prototype.executeQuery = function (query, tx) {
            log.trace(LOG_PREFIX + "[executeQuery] called...");
            return VoltmxNoSQLDatabaseHelper.db.execute(query, tx);
        };

        /**
         *
         * @param {*} queryObj
         * @param {*} transaction
         */
        VoltmxNoSQLDatabaseHelper.prototype.execute = function (queryObj, transaction) {
            if (queryObj && queryObj.tablename && queryObj.operationtype) {
                log.trace(LOG_PREFIX + "[execute '" + queryObj.tablename + "'  - '" + queryObj.operationtype + "'] called...");
                var executePromise;
                switch (queryObj.operationtype) {
                    case VoltmxNoSQLDatabaseHelper.KSDatabaseOperation.INSERT:
                        executePromise = this.insertDataIntoTable(transaction, queryObj.tablename, queryObj.insertValues);
                        break;
                    case VoltmxNoSQLDatabaseHelper.KSDatabaseOperation.INSERT_OR_REPLACE:
                        executePromise = this.insertOrReplaceDataIntoTable(transaction, queryObj.tablename, queryObj.insertValues);
                        break;
                    case VoltmxNoSQLDatabaseHelper.KSDatabaseOperation.UPDATE:
                        if (queryObj.tablename && queryObj.updateData) {
                            executePromise = this.updateTableWithData(transaction, queryObj.tablename, queryObj.updateData, queryObj.whereClause);
                        }
                        break;
                    case VoltmxNoSQLDatabaseHelper.KSDatabaseOperation.SELECT:
                        if (queryObj.tablename) {
                            executePromise = this.selectDataFromTable(transaction, queryObj.tablename, queryObj.whereClause, queryObj.projectionColumn, queryObj.groupBy, queryObj.groupByIndex, queryObj.orderBy, queryObj.limit);
                        }
                        break;
                    case VoltmxNoSQLDatabaseHelper.KSDatabaseOperation.DELETE:
                        if (queryObj.tablename) {
                            executePromise = this.deleteDataFromTable(transaction, queryObj.tablename, queryObj.whereClause);
                        }
                        break;
                    default:
                        // code...
                        break;
                }
                return executePromise;
            } else {
                log.error(LOG_PREFIX + "[execute] Can not execute query as mandatory fields 'tablename' and 'operationtype' are missing.");
                return new KSError(KSErrorConstants.DB_EXECUTE_QUERY_FAILED);
            }
        };

        /**
         *
         * @param {*} tx
         * @param {*} tableName
         * @param {*} data
         */
        VoltmxNoSQLDatabaseHelper.prototype.insertDataIntoTable = function (tx, tableName, data) {
            log.trace(LOG_PREFIX + "[insertDataIntoTable '" + tableName + "'] called...");
            self = this;
            return new Promise(function (resolve, reject) {
                var queryResult;
                var insertSuccess = function (res) {
                    queryResult = res;
                };
                var insertFailure = function (insertError) {
                    queryResult = insertError;
                };
                if (voltmx.sdk.isNullOrUndefined(tx)) {
                    self.transaction(voltmx.nosql.READ_WRITE, [tableName], function (tx) {
                        insertRecordsInTable(tx, tableName, data, insertSuccess, insertFailure);
                    }).then(function (transactionResult) {
                        log.trace(LOG_PREFIX + "[insertDataIntoTable] Transaction successful.");
                        resolve(queryResult);
                    }).catch(function (transactionError) {
                        log.error(LOG_PREFIX + "[insertDataIntoTable] Transaction Failed: " + JSON.stringify(transactionError));
                        reject(queryResult);
                    }); //End of transcation catch
                } else {
                    insertRecordsInTable(tx, tableName, data, resolve, reject);
                }
            }); //End of custom Promise
        };
        /**
         *
         * @param {*} tx
         * @param {*} tableName
         * @param {*} data
         */
        VoltmxNoSQLDatabaseHelper.prototype.insertOrReplaceDataIntoTable = function (tx, tableName, data) {
            log.trace(LOG_PREFIX + "[insertDataIntoTable '" + tableName + "'] called...");
            var self = this;
            return new Promise(function (resolve, reject) {
                var queryResult;
                var insertSuccess = function (res) {
                    queryResult = res;
                };
                var insertFailure = function (insertError) {
                    queryResult = insertError;
                };
                if (voltmx.sdk.isNullOrUndefined(tx)) {
                    self.transaction(voltmx.nosql.READ_WRITE, [tableName], function (tx) {
                        insertOrReplaceRecordsInTable(tx, tableName, data, insertSuccess, insertFailure);
                    }).then(function (transactionResult) {
                        log.trace(LOG_PREFIX + "[insertDataIntoTable ]  Transaction successful.");
                        resolve(queryResult);
                    }).catch(function (transactionError) {
                        log.error(LOG_PREFIX + "[insertDataIntoTable]  Transaction failed with error" + JSON.stringify(transactionError));
                        reject(queryResult);
                    }); //End of transcation catch
                } else {
                    insertOrReplaceRecordsInTable(tx, tableName, data, resolve, reject);
                }
            }); //End of custom Promise
        };
        //addOrReplaceRecords

        /**
         *
         * @param {*} tx
         * @param {*} tableName
         * @param {*} selectWhereClause
         * @param {*} projection_col_list
         * @param {*} orderBy
         * @param {*} limit
         */
        VoltmxNoSQLDatabaseHelper.prototype.selectDataFromTable = function (tx, tableName, selectWhereClause, projection_col_list, groupBy, groupByIndex, orderBy, limit) {
            log.trace(LOG_PREFIX + "[selectDataFromTable '" + tableName + "'] called with");
            log.trace(LOG_PREFIX + "[selectDataFromTable '" + tableName + "'] projection_col_list:  " + JSON.stringify(projection_col_list));
            log.trace(LOG_PREFIX + "[selectDataFromTable '" + tableName + "'] orderBy:  " + JSON.stringify(orderBy));
            log.trace(LOG_PREFIX + "[selectDataFromTable '" + tableName + "'] limit:  " + JSON.stringify(limit));
            var self = this;
            return new Promise(function (resolve, reject) {
                var queryResult;
                var selectSuccess = function (res) {
                    queryResult = res;
                };
                var selectFailure = function (selectError) {
                    queryResult = selectError;
                };
                var whereCondition = getVoltmxNoSqlWhereCondition(selectWhereClause);
                var finalOrderBy = null;
                var finalGroupBy = null;
                if (!voltmx.sdk.isNullOrUndefined(orderBy)
                    && orderBy.hasOwnProperty("column") && !voltmx.sdk.isNullOrUndefined(orderBy.column)) {
                    // e.g. orderBy ={"column": "col_name", "order": "asc/desc"}
                    var orderbyColumnkey = orderBy.column;
                    if (!voltmx.sdk.util.isNullOrEmptyString(orderbyColumnkey)) {
                        var value = orderBy.order;
                        finalOrderBy = {};
                        finalOrderBy[orderbyColumnkey] = value;
                    }
                } else if (!voltmx.sdk.isNullOrUndefined(orderBy)
                    && (KSCommonUtils.isInstanceOfMap(orderBy))) {  // e.g. orderBy ={"col_name": "asc/desc"}
                    finalOrderBy = orderBy;
                }

                if(!voltmx.sdk.isNullOrUndefined(groupBy)
                    && (KSCommonUtils.isInstanceOfArray(groupBy))) // e.g. groupBy = ["column1", "column2"];
                {
                    finalGroupBy = groupBy;
                }

                if (voltmx.sdk.isNullOrUndefined(tx)) {
                    self.transaction(voltmx.nosql.READ_WRITE, [tableName], function (tx) {
                        fetchRecordsFromTable(tx, tableName, whereCondition, projection_col_list, finalGroupBy, groupByIndex, finalOrderBy, limit, selectSuccess, selectFailure);
                    }).then(function (transactionResult) {
                        log.trace(LOG_PREFIX + "[selectDataFromTable] Transaction successful.");
                        resolve(queryResult);
                    }).catch(function (transactionError) {
                        log.error(LOG_PREFIX + "[selectDataFromTable] Transaction failed: " + JSON.stringify(transactionError));
                        reject(queryResult);
                    }); //End of transcation catch
                } else {
                    fetchRecordsFromTable(tx, tableName, whereCondition, projection_col_list, finalGroupBy, groupByIndex, finalOrderBy, limit, resolve, reject);
                }
            }); // End of custom Promise
        };

        /**
         *
         * @param {*} tx
         * @param {*} tableName
         * @param {*} whereClause
         * @param {*} newVal
         */
        VoltmxNoSQLDatabaseHelper.prototype.reconcilePKs = function (tx, tableName, whereClause, newVal) {
            log.trace(LOG_PREFIX + "[reconcilePKs '" + tableName + "'] called...");
            var self = this;
            return new Promise(function (resolve, reject) {
                var queryResult;
                var reconcileSuccess = function (res) {
                    queryResult = res;
                };
                var reconcileFailure = function (reconcileError) {
                    queryResult = reconcileError;
                };
                var whereCondition = getVoltmxNoSqlWhereCondition(whereClause);
                if (voltmx.sdk.isNullOrUndefined(tx)) {
                    self.transaction(voltmx.nosql.READ_WRITE, [tableName], function (tx) {
                        reconcilePKsInTable(tx, tableName, newVal, whereCondition, reconcileSuccess, reconcileFailure);
                    }).then(function (transactionResult) {
                        log.trace(LOG_PREFIX + "[reconcilePKs] Transaction successful.");
                        resolve(queryResult);
                    }).catch(function (transactionError) {
                        log.error(LOG_PREFIX + "[reconcilePKs] Transaction failed: " + JSON.stringify(transactionError));
                        reject(queryResult);
                    }); //End of transcation catch
                } else {
                    reconcilePKsInTable(tx, tableName, newVal, whereCondition, resolve, reject);
                }
            });  //End of custom Promise
        };

        /**
         *
         * @param {*} tx
         * @param {*} tableName
         * @param {*} newData
         * @param {*} updateWhereClause
         */
        VoltmxNoSQLDatabaseHelper.prototype.updateTableWithData = async function (tx, tableName, newData, updateWhereClause) {
            log.trace(LOG_PREFIX + "[updateTableWithData '" + tableName + "'] called...");
            var self = this;
            var updatePromise;
            var pks = await self.getPkSet(tableName, tx);
            if (isDataReconciliation(pks, newData)) {
                log.trace(LOG_PREFIX, "[updateTableWithData] this is a reconcile operation.");
                updatePromise = self.reconcilePKs(tx, tableName, updateWhereClause, newData);
            } else {
                updatePromise = new Promise(function (resolve, reject) {
                    if (voltmx.sdk.isNullOrUndefined(newData)) {
                        resolve(0);
                        return;
                    }
                    var queryResult;
                    var updateSuccess = function (res) {
                        queryResult = res;
                    };
                    var updateFailure = function (updateError) {
                        queryResult = updateError;
                    };
                    var whereCondition = getVoltmxNoSqlWhereCondition(updateWhereClause);
                    if (voltmx.sdk.isNullOrUndefined(tx)) {
                        self.transaction(voltmx.nosql.READ_WRITE, [tableName], function (tx) {
                            updateRecordsInTable(tx, tableName, newData, whereCondition, updateSuccess, updateFailure);
                        }).then(function (transactionResult) {
                            log.trace(LOG_PREFIX + "[updateTableWithData] Transaction successful.");
                            resolve(queryResult);
                        }).catch(function (transactionError) {
                            log.error(LOG_PREFIX + "[updateTableWithData] Transaction failed: " + JSON.stringify(transactionError));
                            reject(queryResult);
                        }); //End of transcation catch;
                    } else {
                        updateRecordsInTable(tx, tableName, newData, whereCondition, resolve, reject);
                    }
                }); // End of custom Promise
            }
            return updatePromise;
        };

        /**
         *
         * @param {*} tx
         * @param {*} tableName
         * @param {*} deleteWhereClause
         */
        VoltmxNoSQLDatabaseHelper.prototype.deleteDataFromTable = function (tx, tableName, deleteWhereClause) {
            log.trace(LOG_PREFIX + "[deleteDataFromTable '" + tableName + "']  called..");
            var self = this;
            return new Promise(function (resolve, reject) {
                var queryResult;
                var deleteSuccess = function (res) {
                    queryResult = res;
                };
                var deleteFailure = function (deleteError) {
                    queryResult = deleteError;
                };
                var whereCondition = getVoltmxNoSqlWhereCondition(deleteWhereClause);
                if (voltmx.sdk.isNullOrUndefined(tx)) {
                    self.transaction(voltmx.nosql.READ_WRITE, [tableName], function (tx) {
                        deleteRecordsFromTable(tx, tableName, whereCondition, deleteSuccess, deleteFailure);
                    }).then(function (transactionResult) {
                        log.trace(LOG_PREFIX + "[deleteDataFromTable]  Transaction successful.");
                        resolve(queryResult);
                    }).catch(function (transactionError) {
                        log.error(LOG_PREFIX + "[deleteDataFromTable]  Transaction failed: " + JSON.stringify(transactionError));
                        reject(queryResult);
                    }); //End of transaction catch
                } else {
                    deleteRecordsFromTable(tx, tableName, whereCondition, resolve, reject);
                }
            }); // End of custom Promise
        };

        /**
         * Function to check and open database connection.
         */
        VoltmxNoSQLDatabaseHelper.prototype.checkAndOpenConnection = async function () {
            log.trace(LOG_PREFIX + "[checkAndOpenConnection] called...");
            if (!VoltmxNoSQLDatabaseHelper.db.isOpen()) {
                log.warn(LOG_PREFIX, "[checkAndOpenConnection] Database is closed, reopening the connection.");
                VoltmxNoSQLDatabaseHelper.db = await VoltmxNoSQLDatabaseHelper.db.open();
            } else {
                log.trace(LOG_PREFIX, "[checkAndOpenConnection] Database is open.");
            }
        };

        /**
         *
         * @param {*} dbName
         * @returns  Promise <boolean>
         */
        VoltmxNoSQLDatabaseHelper.doesDatabaseExists = function (dbName) {
            log.trace(LOG_PREFIX + "[doesDatabaseExists  '" + dbName + "'] called");

            if(voltmx.sdk.isNullOrUndefined(nosqlDBInstance)) {
                return voltmx.nosql.databaseExists(dbName);
            } else {
                return true;
            }
        };

        /**
         * Function to retrieve current indexded DB version.
         * @param {*} dbName
         * @returns  Promise <integer> version of the current DBObject
         */
        VoltmxNoSQLDatabaseHelper.getCurrentDBVersion = function (dbName) {

            if (voltmx.sdk.isNullOrUndefined(nosqlVersion)) {
                return new Promise(function (resolve, reject) {

                    voltmx.nosql.databaseVersion(dbName)
                        .then(version => {

                            log.trace(LOG_PREFIX + "[getCurrentDBVersion  '" + dbName + "'] got: " + version);
                            resolve(version);
                        })
                        .catch(getVersionError => {
                            log.error(LOG_PREFIX + "[getCurrentDBVersion] failed: " + getVersionError.message);
                            reject(voltmx.sdk.OfflineObjects.KSDatabaseSchemaVersion.Version_None);
                        });
                });
            } else {
                return nosqlVersion;
            }
        };

        /**
         *
         * @param {*} tablename
         */
        VoltmxNoSQLDatabaseHelper.prototype.isTableFound = function (tablename) {
            return new Promise(function (resolve, reject) {
                if (voltmx.sdk.isNullOrUndefined(nosqlDBInstance)) {
                    reject(getDBNotInitializedError());
                } else {
                    voltmx.nosql.tableExists(nosqlDBInstance, tablename)
                        .then(tablexists => {
                            log.trace(LOG_PREFIX + "[isTableFound " + tablename + "] got: " + tablexists);
                            resolve(tablexists);
                        })
                        .catch(getTableError => {
                            log.error(LOG_PREFIX + "[isTableFound] failed: " + JSON.stringify(getTableError));
                            reject(KSExceptionWrapperUtils.wrapDBException(getTableError));
                        });
                }
            }); // End of custom Promise
        };

        /**
         *
         * @param {*} dbname
         */
        VoltmxNoSQLDatabaseHelper.getConnectionForExistingDB = async function (dbname) {
            log.trace(LOG_PREFIX + "[getConnectionForExistingDB " + dbname + "] called...");
            if (voltmx.sdk.isNullOrUndefined(VoltmxNoSQLDatabaseHelper.db)) {
                VoltmxNoSQLDatabaseHelper.getDBInstance(dbname);
            }
            await VoltmxNoSQLDatabaseHelper.db.checkAndOpenConnection();
            return VoltmxNoSQLDatabaseHelper.db;
        };

        /**
         * @param {*} tableName
         * @param {*} txn
         * @returns {Promise<Array>} List of PK of a table
         */
        VoltmxNoSQLDatabaseHelper.prototype.getPkSet = function (tableName, txn) {
            log.trace(LOG_PREFIX + "[getPkSet  " + tableName + "] called...");
            return new Promise(function (resolve, reject) {
                if (voltmx.sdk.isNullOrUndefined(nosqlDBInstance)) {
                    reject(getDBNotInitializedError());
                } else {
                    voltmx.nosql.getPrimaryKeys(nosqlDBInstance, tableName, txn).then(pkset => {
                        resolve(pkset);
                    }).catch(getPKError => {
                        log.trace(LOG_PREFIX + "[getPkSet] failed with error: " + JSON.stringify(getPKError));
                        reject(KSExceptionWrapperUtils.wrapDBException(getPKError));
                    });
                }
            }); // End of custom Promise
        };

        /**
         * @param {*} mode
         * @param {*} tablesList
         * @param {*} txCallback
         */
        VoltmxNoSQLDatabaseHelper.prototype.transaction = function (mode, tablesList, txCallback) {
            log.trace(LOG_PREFIX + "[transaction]  in " + mode + " called: " + JSON.stringify(tablesList));
            var voltmxNosqlTransaction = new Promise(function (resolve, reject) {
                voltmx.nosql.openTransaction(nosqlDBInstance, tablesList, mode, txCallback)
                    .then(voltmxTransactionResult => {
                        log.trace(LOG_PREFIX + "[transaction] successful.");
                        resolve(voltmxTransactionResult);
                    }).catch(voltmxTransactionerror => {
                    log.error(LOG_PREFIX + "[transaction] failed: " + JSON.stringify(voltmxTransactionerror));
                    reject(KSExceptionWrapperUtils.wrapDBException(voltmxTransactionerror));
                });
            });
            return voltmxNosqlTransaction;
        };

        VoltmxNoSQLDatabaseHelper.db = null;
        VoltmxNoSQLDatabaseHelper.dbTablesList = null;
        return VoltmxNoSQLDatabaseHelper;
    }());
    exports.VoltmxNoSQLDatabaseHelper = VoltmxNoSQLDatabaseHelper;
});

// ************************************* End of VoltmxNoSQLDatabaseHelper.js *************************************
/**
 * Error object for error handling in Offline objects.
 */
define("KSError", ["exports"], function (exports) {
    "use strict";
    exports._esModule = true;
    exports.KSError = (function () {

        function KSError(errObj, userInfo) {

            if(errObj) {
                this.code = errObj.code;
                this.message = errObj.message;
                this.domain = errObj.domain;
            }

            this.userInfo = userInfo;
        }

        return KSError;
    }());
});
define("KSSDKObject",

    ["exports", "SyncEngine", "KSSetupManager", "KSBaseORMManager", "KSORMManagerFactory", "KSSDKObjectRecord",
        "KSSyncDatabaseHelper", "KSDeltaContextUtils", "KSDatabaseAPI", "KSError", "KSOptionsHelper", "KSCommonUtils",
        "KSUploadRequestBuilderFactory", "KSRequestResponseUtils", "KSNetworkUtils","KSQueryObjectBuilder", "KSSQLQueryGenerator",
        "KSMarkForUploadUtils", "KSUploadCacheManager"],

    function (exports, SyncEngine, KSSetupManager, KSBaseORMManager, KSORMManagerFactory, KSSDKObjectRecord,
              KSSyncDatabaseHelper, KSDeltaContextUtils, _KSDatabaseAPI, _KSError, KSOptionsHelper, KSCommonUtils,
              KSUploadRequestBuilderFactory, KSRequestResponseUtils, KSNetworkUtils, KSQueryObjectBuilder, KSSQLQueryGenerator,
              KSMarkForUploadUtils, KSUploadCacheManager) {

        "use strict";
        exports._esModule = true;

        var sdk = voltmx.sdk;
        var logger = sdk.logsdk;
        var LOG_PREFIX = "KSSDKObject : ";
        var KSError = _KSError.KSError;
        var KSDatabaseAPI = _KSDatabaseAPI.KSDatabaseAPI;
        var KSTableType = voltmx.sdk.OfflineObjects.KSTableType;
        var SDKObjectRecord = KSSDKObjectRecord.KSSDKObjectRecord;
        var KSErrorConstants = sdk.OfflineObjects.KSErrorConstants;
        var KSPublicConstants = voltmx.sdk.OfflineObjects.KSPublicConstants;
        var KSInternalConstants = sdk.OfflineObjects.KSInternalConstants;
        var KSDatabaseConstants = sdk.OfflineObjects.KSDatabaseConstants;
        var KSSDKObjectRecordAction = voltmx.sdk.OfflineObjects.KSSDKObjectRecordAction;

        var isDownloadReconciliationRequired = true;
        /**
         * Constructor for KSSDKObject.
         * @param sdkObjectName Name of the SDKObject.
         * @param namespace Namespace of the SDKObject.
         * @param objectServiceName Name of the object service.
         * @constructor Return the SDKObject.
         */

        function KSSDKObject(sdkObjectName, namespace, objectServiceName) {
            if (sdk.isNullOrUndefined(sdkObjectName)) {
                var errorMessage = "SDK Object name cannot be null/empty.";
                logger.error(LOG_PREFIX, errorMessage);
                throw new KSError(KSErrorConstants.METADATA_SDKOBJECT_SYNC_NAME_NULL_OR_EMPTY, errorMessage);
            }
            this.filter = "";
            this.records = [];
            this.name = sdkObjectName;
            this.namespace = namespace;
            this.uploadResponseFilterMap = {};
            this.mode = KSInternalConstants.MODE;
            this.sdkObjectsForUploadAndDownload = [];
            this.recordsClassifedWithRecordAction = {};

            if (sdk.isNullOrUndefined(objectServiceName)) {
                this.metadata = KSSetupManager.getInstance().getObjectMetadataForNamespaceNameAndObjectName(this.namespace, this.name);
                this.objectServiceName = this.metadata[KSInternalConstants.OBJECT_SERVICE_NAME];
            } else {
                this.objectServiceName = objectServiceName;
                this.metadata = KSSetupManager.getInstance().getObjectMetadataInObjectServiceWithNamespaceNameAndObjectName(this.objectServiceName, this.namespace, this.name);
            }
            logger.trace(LOG_PREFIX, "Initialized an instance of SDKObject with name " + this.name);
        }

        //------------------------------------
        // PROTOTYPE GETTER AND SETTER METHODS
        //------------------------------------

        /**
         * Setter for setting the recordsClassifedWithRecordAction.
         * @param classifiedRecords Dictionary of classified records according to the record action.
         */
        KSSDKObject.prototype.setClassfiedRecordsWithAction = function (classifiedRecords) {
            this.recordsClassifedWithRecordAction = classifiedRecords;
        };

        /**
         * Adds the given primaryKeyValue as key to uploadRecordFilter to uploadResponseFilterMap JSON
         * @param primaryKeyValueMap
         * @param uploadRecordFilter
         */
        KSSDKObject.prototype.addUploadFilterToPrimaryKeyValue = function (primaryKeyValueMap, uploadRecordFilter) {
            this.uploadResponseFilterMap[primaryKeyValueMap] = uploadRecordFilter;
        };

        /**
         * Setter to set the records.
         * @param records Array of records in a SDKObject.
         */
        KSSDKObject.prototype.setRecords = function (records) {
            this.records = records;
        };

        /**
         * Getter to get the records.
         * @return records Array of records in a SDKObject.
         */
        KSSDKObject.prototype.getRecords = function () {
            return this.records;
        };

        /**
         * Getter to upload response filter map
         * @return Dictionary which has primaryKeyValue as key and uploadRecordFilter as value.
         */
        KSSDKObject.prototype.getUploadResponseFilterMap = function () {
            return this.uploadResponseFilterMap;
        };

        /**
         * Setter to add records to the SDKObjects.
         * @param record Array of records.
         */
        KSSDKObject.prototype.addRecord = function (record) {
            if (!sdk.isNullOrUndefined(record)) {
                this.records.push(record);
                classifyRecordAndUpdateWithParent.call(this, record, this);
            }
        };

        /**
         * Getter to fetch the primary key attributes of the SDKObject.
         * @returns {Array} Array of Primary Keys.
         */
        KSSDKObject.prototype.getPrimaryKeys = function () {
            return Object.keys(this.metadata[KSInternalConstants.OBJECTS_PRIMARY_KEYS]);
        };

        /**
         * Method to fetch the fully qualified name.
         * @returns {*} Fully qualified name of the SDKObject.
         */
        KSSDKObject.prototype.getFullyQualifiedName = function () {
            return this.metadata[KSInternalConstants.FULLY_QUALIFIED_NAME];
        };

        /**
         * Getter to fetch the metadata associated with the SDKObject.
         * @returns Metadata associated with the SDKObject.
         */
        KSSDKObject.prototype.getMetadata = function () {
            return this.metadata;
        };

        /**
         * Method to return ObjectServiceName
         * @returns objectServiceName Returns objectService name.
         **/
        KSSDKObject.prototype.getObjectServiceName = function () {
            return this.objectServiceName;
        };

        /**
         * Method to return syncLevel
         **/
        KSSDKObject.prototype.getSyncLevel = function () {
            return KSInternalConstants.SYNCLEVEL_OBJECT;
        };

        //-------------------------------
        // PROTOTYPE METHODS FOR DOWNLOAD
        //-------------------------------

        /**
         * Gets the flag downloadReconciliationRequired
         *
         * @return isDownloadReconciliationRequired
         */
        KSSDKObject.prototype.isDownloadReconciliationRequired = function(){
            return isDownloadReconciliationRequired;
        }

        /**
         *Sets the flag downloadReconciliationRequired
         *
         * @param downloadReconciliationRequired
         */
        function setDownloadReconciliationRequired(downloadReconciliationRequired) {
            isDownloadReconciliationRequired = downloadReconciliationRequired;
        }
        KSSDKObject.prototype.setDownloadReconciliationRequired = setDownloadReconciliationRequired;

        /**
         *Method to check the options and set the flag isDownloadReconciliationRequired accordingly.
         *
         * @param options Options Map for the syncOptions
         */
        function checkAndSetIfDownloadReconciliationRequired(options) {
            var downloadReconciliationRequired = (options[KSPublicConstants.DOWNLOAD_RECONCILIATION_REQUIRED]);
            if (!voltmx.sdk.isNullOrUndefined(downloadReconciliationRequired)) {
                setDownloadReconciliationRequired(downloadReconciliationRequired);
            }
        }

        /**
         * Method to invoke for preparing an object for sync session.
         **/
        KSSDKObject.prototype.prepareForSession = function () {
            // Unclassifying the records with action and clearing all the records
            KSCommonUtils.clearArrayObject(this.records);
            KSCommonUtils.clearJSONObject(this.recordsClassifedWithRecordAction);
        };

        /**
         * Method to invoke sync on a SDKObject.
         * @param syncConfig Options for sync.
         */
        KSSDKObject.prototype.startSync = async function (syncConfig) {           
            if (!voltmx.sdk.isNullOrUndefined(syncConfig.removeAfterUpload) && !voltmx.sdk.isEmptyObject(syncConfig.removeAfterUpload)) {
                if (!syncConfig.removeAfterUpload.includes(this.getFullyQualifiedName())) {
                    var errorMessage = KSErrorConstants.SYNC_INVALID_REMOVEAFTERUPLOAD_ERR_MSG + " : " + syncConfig.removeAfterUpload;
                    logger.error(LOG_PREFIX, errorMessage);
                    throw new KSError(KSErrorConstants.SYNC_INVALID_REMOVEAFTERUPLOAD_LIST, errorMessage);
                }
            }        
            logger.trace(LOG_PREFIX, "Invoked startSync in SDKObject.");
            assertMode(this.mode);
            validateOptions(syncConfig);
            checkAndSetIfDownloadReconciliationRequired(syncConfig)
            logger.info(LOG_PREFIX, "Starting Sync Operation for Object:" + this.name);
            var syncEngineInstance = SyncEngine.getInstance();
            return (await syncEngineInstance.startSyncSessionForObject(syncConfig, this));
        };

        /**
         * Method to build the download request.
         * @param context Contains the options for sync like filter, query params etc.
         * @returns {{}} JSON object containing values to build a request in network layer.
         */
        KSSDKObject.prototype.createDownloadRequest = async function (context) {

            logger.trace(LOG_PREFIX, "Creating download request for object : " + this.name);

            setFilter.call(this, context[KSInternalConstants.SYNC_OPTIONS]);

            var requestParams = {};
            requestParams[KSInternalConstants.URL] = getEndpointURLString.call(this);
            requestParams[KSInternalConstants.QUERY_PARAMS] = buildDownloadRequestQueryParams.call(this, context);
            requestParams[KSInternalConstants.HEADERS] = getDownloadRequestHeaders.call(this);
            requestParams[KSInternalConstants.BODY] = await buildDownloadRequestBodyParam.call(this, context);

            logger.debug(LOG_PREFIX, "Successfully created parameters for object download request.");
            return requestParams;
        };

        /**
         * Method to parse the download response received from the network.
         * @param response Response JSON.
         * @returns {*} Returns a parsed response dictionary.
         */
        KSSDKObject.prototype.parseDownloadResponse = function (response) {
            logger.trace(LOG_PREFIX, "Parsing response for object : " + this.name);

            //Using require to avoid circular dependencies..
            var responseDictionary = require("KSRequestResponseUtils").getObjectDownloadResponseDictionaryFromNetworkResponse(response, this.name, this.objectServiceName);
            if (!sdk.isNullOrUndefined(responseDictionary) && responseDictionary.hasOwnProperty(KSInternalConstants.DATA_OBJECTS)) {
                this.sdkObjectsForUploadAndDownload = responseDictionary[KSInternalConstants.DATA_OBJECTS];
                if (!this.isDownloadReconciliationRequired()) {
                    for (var sdkObject of this.sdkObjectsForUploadAndDownload) {
                        sdkObject.setDownloadReconciliationRequired(false);
                    }
                }
                responseDictionary[KSInternalConstants.HAS_MORE_RECORDS] = response[KSInternalConstants.HAS_MORE_RECORDS];
            }
            return responseDictionary;
        };

        /**
         * Method to persist the changes after parsing the response received from the network.
         * @param deltaContext Deltacontext received for the sync session.
         */
        KSSDKObject.prototype.persistDownloadChanges = async function (deltaContext) {

            logger.trace(LOG_PREFIX, "Persisting download for object : " + this.name);
            var queryObjectsForData = await KSSyncDatabaseHelper.buildQueriesToPersistChangesForObjects(this.sdkObjectsForUploadAndDownload);

            var filter = {};
            filter[this.name] = this.filter;

            var deltaContextQueryObj = KSDeltaContextUtils.buildDeltaContextQuery(deltaContext, filter);

            var queryObjects = [];

            Array.prototype.push.apply(queryObjects, queryObjectsForData);
            Array.prototype.push.apply(queryObjects, deltaContextQueryObj);

            logger.info(LOG_PREFIX, "Executing queries in transaction for persisting download response for object : " + this.name);
            await KSDatabaseAPI.executeQueries(queryObjects, true);
            logger.debug(LOG_PREFIX, "Successfully executed queries for persisting download response for object : " + this.name);
        };

        /**
         * Method to clear the objects and properties used for sync.
         */
        KSSDKObject.prototype.clearObjectsToPersist = function () {
            this.filter = "";
            setDownloadReconciliationRequired(true);
            KSCommonUtils.clearArrayObject(this.records);
            KSCommonUtils.clearArrayObject(this.sdkObjectsForUploadAndDownload);
            KSCommonUtils.clearJSONObject(this.recordsClassifedWithRecordAction);
        };

        /**
         * Method to clear data for an object.
         * @param options, may be null or empty or contain praimaryKey.
         */
        KSSDKObject.prototype.clearData = async function (options) {
            if (!KSCommonUtils.isNullOrEmptyObject(options)) {
                options[KSInternalConstants.OBJECT_METADATA] = this.metadata;
                if (KSOptionsHelper.arePrimaryKeysSentInOptionsValid(options)) {
                    var tableNameOriginal = KSSQLQueryGenerator.getTableNameWithType(this.getFullyQualifiedName(),
                        KSTableType.ORIGINAL);
                    var tableNameMain = KSSQLQueryGenerator.getTableNameWithType(this.getFullyQualifiedName(), KSTableType.MAIN);
                    var recordsInMainTable = await KSSyncDatabaseHelper.getRecordByPK(options[KSPublicConstants.CRUD_OPTION_PRIMARY_KEYS],
                        tableNameMain);
                    var recordsInOriginalTable = await KSSyncDatabaseHelper.getRecordByPK(options[KSPublicConstants.CRUD_OPTION_PRIMARY_KEYS],
                        tableNameOriginal);

                    if (recordsInMainTable === null && recordsInOriginalTable === null){
                        var errorMessage = "No records found for given primary key values.";
                        logger.error(LOG_PREFIX, errorMessage);
                        throw new KSError(KSErrorConstants.CRUD_RECORD_NOT_IN_MAIN_OR_ORIGINAL_TABLE, errorMessage);
                    }
                }
            }

            return KSSyncDatabaseHelper.clearDataForGivenObject(this.getFullyQualifiedName(), options);
        };

        /**
         * Rollback an Object to it's previous Sync State
         *
         * @param primaryKeyValueMap of record only for which rollback should happen
         */
        KSSDKObject.prototype.rollback = async function (primaryKeyValueMap) {
            var syncEngineInstance = SyncEngine.getInstance();
            if (syncEngineInstance.isRollbackOperationAllowed(KSInternalConstants.SYNCLEVEL_OBJECT, this)) {
                syncEngineInstance.updateRunningTaskContextWithRollbackTasks(KSInternalConstants.SYNCLEVEL_OBJECT, this);
                logger.info(LOG_PREFIX, "Rollback on Object : " + this.name + " Start.");
                var rollbackOptions = {};

                if(primaryKeyValueMap !== null) {
                    rollbackOptions[KSPublicConstants.CRUD_OPTION_PRIMARY_KEYS] = primaryKeyValueMap;
                }

                rollbackOptions[KSInternalConstants.OBJECT_METADATA] = this.metadata;

                if(KSOptionsHelper.arePrimaryKeysValid(rollbackOptions)) {
                    var preparedStatementsForRollback = await KSSyncDatabaseHelper.buildPreparedStatementsForObjectRollback(this, primaryKeyValueMap);
                    await KSDatabaseAPI.executeQueries(preparedStatementsForRollback, true);

                    await KSUploadCacheManager.getInstance().removeRecord(this.getFullyQualifiedName());
                }
            } else {
                var errorMessage = "Rollback cannot be performed as other Offline Object operations are in progress.";
                logger.error(LOG_PREFIX, errorMessage);
                throw new KSError(KSErrorConstants.APPLICATIONTASKS_IN_PROGRESS, errorMessage);
            }
        };

        /**
         * Fetch primary keys which are deferred from Upload
         *
         * @returns primaryKeys of record deferred from upload
         */
        KSSDKObject.prototype.getDeferredRecordsFromDatabase = async function () {
            logger.info(LOG_PREFIX, "getDeferredRecordsFromDatabase :" + "Start");
            logger.info(LOG_PREFIX, "getDeferredRecordsFromDatabase :" + "Reading records from db");
            var records;
            var options = {};

            options[KSInternalConstants.METADATA] = this.metadata;
            var queryObject = KSMarkForUploadUtils.getSelectPreparedStatementForDeferredRecords(options, this.getPrimaryKeys());
            records = await KSDatabaseAPI.executeQuery(queryObject);

            if (!KSCommonUtils.isNullOrEmptyObject(records)) {
                logger.info(LOG_PREFIX, "getDeferredRecordsFromDatabase :" + "Number of records fetched: " + records.length);

            } else {
                logger.info(LOG_PREFIX , "getDeferredRecordsFromDatabase: " + "No records returned,either there are no records in local database for Object or some error occurred");

            }
            logger.info(LOG_PREFIX , "getDeferredRecordsFromDatabase: " + "Fetching records Succeeded");
            return records;
        };

        /**
         * Method to enable a record for upload
         *
         * @param options Contains the options for markForUpload
         * @return {boolean} returns true if the record marked for upload else false
         */
        KSSDKObject.prototype.markForUploadInDatabase = async function (options) {
            logger.info(LOG_PREFIX, "markForUploadInDatabase :" + "Start");
            logger.info(LOG_PREFIX, "markForUploadInDatabase :" + "markForUpload records for object " + this.name);
            var preparedStatements;

            if (KSCommonUtils.isNullOrEmptyObject(options)) {
                logger.error(LOG_PREFIX, "markForUploadInDatabase: " + "Invalid options passed in markForUpload");
                throw new KSError(KSErrorConstants.CRUD_NULL_OR_EMPTY_OPTIONS);
            }
            options[KSInternalConstants.METADATA] = this.metadata;
            if (KSOptionsHelper.skipValidation(options) || KSOptionsHelper.arePrimaryKeysSentInOptionsValid(options)) {
                preparedStatements = KSMarkForUploadUtils.getPreparedStatementForMarkForUpload(options, KSTableType.HISTORY);
                await KSSyncDatabaseHelper.executePreparedStatementsAsTransaction(preparedStatements);
            }
            logger.info(LOG_PREFIX, "markForUpload :" + "markForUpload on record with PK : " + JSON.stringify(options[KSPublicConstants.CRUD_OPTION_PRIMARY_KEYS]) + " is successful.");
            return true;
        };


        //----------------------------
        // PROTOTYPE METHODS FOR UPLOAD
        //----------------------------

        /**
         * Method to fetch the headers for a upload request.
         * @returns {{}} JSON object for headers.
         */
        function getUploadRequestHeaders() {
            var headers = {};
            headers[KSInternalConstants.X_HTTP_METHOD_OVERRIDE] = KSInternalConstants.HTTP_OVERRIDE_UPLOAD;

            var version = this.metadata[KSInternalConstants.VERSION];
            if (!voltmx.sdk.isNullOrUndefined(version)) {
                headers[KSInternalConstants.X_KONY_API_VERSION] = version;
            }

            return headers;
        }

        /**
         * Object to upload.
         * @param context Contains options for sync like filter, query params, batchSize etc.
         * @param uploadBatchParams Contains the batch related info like batchNumber, lastRSNOfUploadPayload etc.
         * @returns {Promise<Array>} object to upload.
         */
        KSSDKObject.prototype.objectsToUpload = async function (uploadBatchParams) {
            return await KSSyncDatabaseHelper.getDeltaChangesToUpload([this], uploadBatchParams);
        };

        /**
         * Creates upload request params and returns the json { payload, headers, url}
         * @param inputContext Contains the options for sync like filter, query params, batchSize etc.
         * @param uploadBatchParams Contains the batch related info like batchNumber, lastRSNOfUploadPayload etc.
         * @returns {Promise<void>} requests parameters needed.
         */
        KSSDKObject.prototype.createUploadRequest = async function (inputContext, uploadBatchParams) {
            voltmx.sdk.logsdk.info(LOG_PREFIX, "CreateUploadRequest is called in SDKObject");
            uploadBatchParams.setUploadBatchSize(inputContext[KSPublicConstants.UPLOAD_BATCH_SIZE]);
            var uploadRequestParams = {};

            var uploadRequestBuilder = await KSUploadRequestBuilderFactory.getUploadRequestFactory(this, uploadBatchParams);
            var areThereRecordsToUpload = await uploadRequestBuilder.areThereRecordsToUpload();

            //If it is the first batch we have to check whether there are any records to upload. For the remaining batches we will get the info from inputContext.
            if (!areThereRecordsToUpload) {
                logger.info(LOG_PREFIX, "No pending changes found to upload in object");
                uploadRequestParams[KSInternalConstants.ARE_THERE_CHANGES_TO_UPLOAD] = false;
                return uploadRequestParams;
            }

            uploadRequestParams[KSInternalConstants.URL] = getEndpointURLString.call(this);
            uploadRequestParams[KSInternalConstants.REQUEST_HEADERS] = getUploadRequestHeaders.call(this);
            uploadRequestParams[KSInternalConstants.REQUEST_BODY] = uploadRequestBuilder.getUploadRequestJson();
            uploadRequestParams[KSInternalConstants.REQUEST_QUERY_PARAMS] = KSOptionsHelper.validateAndGetQueryParams(inputContext, KSPublicConstants.SYNC_UPLOAD_QUERY_PARAMS);
            uploadRequestParams[KSInternalConstants.ARE_THERE_CHANGES_TO_UPLOAD] = true;
            return uploadRequestParams;
        };

        /**
         * This will Parse the upload response and forms the JSON which has DATA_OBJECTS and SYNC_ERRORS.
         * @param response network response
         * @return Returns the JSON which has DATA_OBJECTS and SYNC_ERRORS.
         */
        KSSDKObject.prototype.parseUploadResponse = function (response) {
            return KSRequestResponseUtils.uploadResponseObjectsDictionaryFromJSONString(response);
        };

        /**
         * Persists the upload response in given object
         * @param sdkObject object to persist.
         */
        KSSDKObject.prototype.persistUploadChanges = async function (sdkObject) {
            await KSSyncDatabaseHelper.persistUploadResponseForObjects(sdkObject);
        };

        KSSDKObject.prototype.setRemoveAfterUploadParam = async function (removeAfterUpload) {
            await KSSyncDatabaseHelper.setRemoveAfterUploadParam(removeAfterUpload);
        };

        /**
         * Clears the records array and uploadResponseFilterMap.
         */
        KSSDKObject.prototype.removeAllRecords = function () {
            KSCommonUtils.clearArrayObject(this.records);
            KSCommonUtils.clearJSONObject(this.uploadResponseFilterMap);
        };

        //----------------------------
        // PROTOTYPE METHODS FOR CRUD
        //----------------------------

        /**
         * Method to create a record in the database
         * @param record Map containing the record data to be persisted.
         * @param options Map containing list of options.
         */
        KSSDKObject.prototype.createRecordsInDatabase = async function (record, options) {
            logger.trace(LOG_PREFIX, "createRecordsInDatabase : ", "Start.");
            logger.debug(LOG_PREFIX, "Creating records for object " + this.name + " with values " + JSON.stringify(record.getData()) + " and options " + JSON.stringify(options));

            record.setAction(KSSDKObjectRecordAction.CREATE);
            var ORMManager = KSORMManagerFactory.getORMManager(KSSDKObjectRecordAction.CREATE);
            return (await ORMManager.perform(record, options));
        };

        /**
         * Method to fetch records from the database
         * @param options Map containing primaryKeys of the record.
         */
        KSSDKObject.prototype.readRecordsFromDatabase = async function (options) {
            logger.trace(LOG_PREFIX, "readRecordsFromDatabase : ", "Start.");
            logger.debug(LOG_PREFIX, "Reading records of object " + this.name + " with options " + JSON.stringify(options));

            var ORMManager = KSORMManagerFactory.getORMManager(KSSDKObjectRecordAction.READ);

            var optionsForRead = voltmx.sdk.cloneObject(options);
            if (voltmx.sdk.isNullOrUndefined(optionsForRead)) {
                optionsForRead = {};
            }
            optionsForRead[KSInternalConstants.OBJECT_METADATA] = this.metadata;
            var records = await ORMManager.perform(null, optionsForRead);

            if (records) {
                logger.info(LOG_PREFIX, "Number of records fetched: " + records.length);
            } else {
                logger.info(LOG_PREFIX, "No records returned... either there are no records in local database for Object or some error occurred");
                records = null;
            }
            return records;
        };

        /**
         * Method to update a record in the database
         * @param record Map containing record data to be updated.
         * @param options Map containing primaryKeys if the record to be updated.
         */
        KSSDKObject.prototype.updateRecordsInDatabase = async function (record, options) {
            logger.trace(LOG_PREFIX, "updateRecordsInDatabase : ", "Start.");
            logger.debug(LOG_PREFIX, "Updating records for object " + this.name + " with values " + JSON.stringify(record.getData()) + " and options " + JSON.stringify(options));

            options[KSInternalConstants.OBJECT_METADATA] = this.metadata;
            record.setAction(KSSDKObjectRecordAction.UPDATE);

            var ORMManager = KSORMManagerFactory.getORMManager(KSSDKObjectRecordAction.UPDATE);

            return (await ORMManager.perform(record, options));
        };

        /**
         * Method to delete a record from database
         * @param options Map containing primaryKeys of the record to be deleted.
         */
        KSSDKObject.prototype.deleteRecordsInDatabase = async function (options) {
            logger.trace(LOG_PREFIX, "deleteRecordsInDatabase : ", "Start.");
            logger.debug(LOG_PREFIX, "Deleting records for object " + this.name + " with options " + JSON.stringify(options));

            var sdkRecord = new SDKObjectRecord({}, this);
            sdkRecord.setAction(KSSDKObjectRecordAction.DELETE);
            options[KSInternalConstants.OBJECT_METADATA] = this.metadata;

            var ORMManager = KSORMManagerFactory.getORMManager(KSSDKObjectRecordAction.DELETE);

            return (await ORMManager.perform(sdkRecord, options));
        };

        /**
         * Method to fetch pending sync records for the object
         * @param options Contains user defined options
         */
        KSSDKObject.prototype.getPendingRecordsForUpload = function (options) {
            //the method is not async as it is returning promise from KSDatabaseAPI.executeQuery which will be resolved/rejected at SDKObjectSync.js level
            logger.trace(LOG_PREFIX, " getPendingRecordsForUpload : ", "Enter.");

            var tableName = KSSQLQueryGenerator.getTableNameWithType(this.getFullyQualifiedName(), KSTableType.HISTORY);
            var primaryKeyNameList = this.getPrimaryKeys();

            var statementBuilder = KSQueryObjectBuilder.getQueryObjectForTableName(tableName, KSDatabaseConstants.KSDatabaseOperations.SELECT);
            var statement = statementBuilder.setProjectionColumns(primaryKeyNameList).addGroupByList(primaryKeyNameList).build();
            return KSDatabaseAPI.executeQuery(statement);
        };

        //-----------------------------------
        // PRIVATE GETTER AND SETTER METHODS
        //-----------------------------------

        /**
         * Getter to fetch the endpoint URL from metadata.
         * @returns Endpoint URL string.
         */
        function getEndpointURLString() {
            return this.metadata[KSInternalConstants.ENDPOINT_URL];
        }

        /**
         * Method to set the ODATA filter for the SDKObject.
         * @param syncOptions JSON containing the options sent for sync.
         */
        function setFilter(syncOptions) {
            logger.trace(LOG_PREFIX, "Setting filter for object : " + this.name);
            if (!sdk.isNullOrUndefined(syncOptions)) {
                this.filter = !sdk.isNullOrUndefined(syncOptions[KSInternalConstants.FILTER]) ? syncOptions[KSInternalConstants.FILTER] : this.filter;
                logger.info(LOG_PREFIX, "Setting Filter : " + this.filter);
            }
        }

        /**
         * Method to add the record to appropriate record action type in recordsClassifedWithRecordAction.
         * @param record Record to be classified and added.
         */
        function setClassifiedRecordWithAction(record) {
            if (this.recordsClassifedWithRecordAction.hasOwnProperty(record.getAction())) {
                this.recordsClassifedWithRecordAction[record.getAction()].push(record);
            } else {
                this.recordsClassifedWithRecordAction[record.getAction()] = [record];
            }
        }

        /**
         * Method to classify the record and add the reference of the parent object.
         * @param record Record to be added to recordsClassifedWithRecordAction.
         * @param parent Reference of the parent object to be added.
         */
        function classifyRecordAndUpdateWithParent(record, parent) {
            record.setParentObject(parent);
            setClassifiedRecordWithAction.call(this, record);
        }

        //-------------------------------
        // PRIVATE METHODS FOR VALIDATION
        //-------------------------------

        /**
         * Method to validate the sync options.
         * @param syncConfig Options sent for object sync.
         */
        function validateOptions(syncConfig) {
            logger.trace(LOG_PREFIX, "Validating the options sent for sync.");

            validateFilter(syncConfig);
            KSOptionsHelper.validateSyncConfigPolicy(syncConfig);
            KSOptionsHelper.isValidBoolTypeOption(syncConfig, KSPublicConstants.DOWNLOAD_RECONCILIATION_REQUIRED);
        }

        /**
         * Method to validate filter.
         * @param syncConfig Options sent for object sync.
         */
        function validateFilter(syncConfig) {
            var genericErrorMessage = "Filters applied to the current sync operation are invalid:";
            if (!sdk.isNullOrUndefined(syncConfig) && syncConfig.hasOwnProperty(KSInternalConstants.FILTER)) {
                var filter = syncConfig[KSInternalConstants.FILTER];
                if (KSCommonUtils.isNullOrEmptyObject(filter)) {
                    var errorMessage = "Filters sent are null/empty.";
                    logger.error(LOG_PREFIX, genericErrorMessage + errorMessage);
                    throw new KSError(KSErrorConstants.SYNC_INVALID_FILTERS, genericErrorMessage + errorMessage);
                } else if (typeof filter !== "string") {
                    var errorMessage = "Filters sent are not of type String.";
                    logger.error(LOG_PREFIX, genericErrorMessage + errorMessage);
                    throw new KSError(KSErrorConstants.SYNC_INVALID_FILTERS, genericErrorMessage + errorMessage);
                }

                logger.debug(LOG_PREFIX, "Validation of filters successful.");
            }
        }

        //------------------------------------
        // PRIVATE HELPER METHODS FOR DOWNLOAD
        //------------------------------------

        /**
         * Method to assert the mode of the object.
         * @param mode
         */
        function assertMode(mode) {
            if (mode !== KSInternalConstants.MODE) {
                var errorMessage = "Sync Mode error";
                logger.error(LOG_PREFIX, errorMessage);
                throw new KSError(KSErrorConstants.INTERNAL_INVALID_SYNC_MODE, errorMessage);
            }
        }

        /**
         * Method to fetch the headers for a download request.
         * @returns {{}} JSON object for headers.
         */
        function getDownloadRequestHeaders() {
            var headers = {};
            var version = this.metadata[KSInternalConstants.VERSION];

            if (!voltmx.sdk.isNullOrUndefined(version)) {
                headers[KSInternalConstants.X_KONY_API_VERSION] = version;
            }

            return headers;
        }

        /**
         * Method to fetch the delta context stored in the DB.
         * @returns DeltaContext JSON.
         */
        async function getDeltaContext() {

            var mapOfNameAndFilter = {};
            mapOfNameAndFilter[KSInternalConstants.OBJECT_NAME] = this.getFullyQualifiedName();
            mapOfNameAndFilter[KSInternalConstants.FILTER] = this.filter;

            return await KSDeltaContextUtils.getDeltaContextForGivenObjectNamesAndFilters([mapOfNameAndFilter]);
        }

        /**
         * Building queryParams to be sent during download request.
         * @param context options sent during sync.
         * @returns Object JSONObject containing the query params.
         */
        function buildDownloadRequestQueryParams(context) {
            var options = context[KSInternalConstants.SYNC_OPTIONS];
            var queryParams = KSOptionsHelper.validateAndGetQueryParams(options, KSPublicConstants.SYNC_DOWNLOAD_QUERY_PARAMS);

            if (!KSCommonUtils.isNullOrEmptyObject(this.filter)) {
                queryParams[KSInternalConstants.DOLLAR_FILTER] = this.filter;
            }

            //Check if exists and add $expand
            var dollarExpandValueOfObject = require("KSRequestResponseUtils").getDollarExpandValueFromObjectOperations(this.metadata);

            if (dollarExpandValueOfObject.length > 0) {
                queryParams[KSInternalConstants.DOLLAR_EXPAND] = dollarExpandValueOfObject;
            }
            queryParams[KSInternalConstants.BATCH_SIZE_FILTER] = context[KSInternalConstants.SYNC_OPTIONS][KSPublicConstants.DOWNLOAD_BATCH_SIZE];
            return queryParams;
        }

        /**
         * Method to build the body for download request.
         * @returns Object jsonObject to be sent as a part of the body.
         */
        async function buildDownloadRequestBodyParam(batchContext) {
            var jsonObject = {};
            if (!KSCommonUtils.isNullOrEmptyObject(batchContext[KSInternalConstants.BATCH_CONTEXT])) {
                jsonObject[KSInternalConstants.DELTA_CONTEXT] = batchContext[KSInternalConstants.BATCH_CONTEXT];
            } else {
                var deltaContextList = await getDeltaContext.call(this);

                if (!KSCommonUtils.isNullOrEmptyObject(deltaContextList)) {
                    var objsDictionary = {};

                    for (var i = 0; i < deltaContextList.length; i++) {
                        var deltaContextDictionary = {};
                        deltaContextDictionary[KSInternalConstants.DELTA] = deltaContextList[i][KSInternalConstants.DELTACONTEXT];
                        objsDictionary[deltaContextList[i][KSInternalConstants.OBJECT_NAME]] = deltaContextDictionary;
                    }

                    var objectLevelDictionary = {};
                    objectLevelDictionary[KSInternalConstants.OBJS] = objsDictionary;
                    jsonObject[KSInternalConstants.DELTA_CONTEXT] = objectLevelDictionary;
                }
            }
            return jsonObject;
        }
        
        exports.KSSDKObject = KSSDKObject;
    });

/**
 * KSSDKObjectRecord
 * Created by Haritha Kintali on 30-05-2018.
 * Copyright © 2017 Kony. All rights reserved.
 */
define("KSSDKObjectRecord", ["exports", "KSSDKObjectRecordMetadata", "KSError"], function(exports, KSSDKObjectRecordMetadata, _KSError) {

    "use strict";
    exports._esModule = true;
    var KSErrorConstants = voltmx.sdk.OfflineObjects.KSErrorConstants;

    var KSError = _KSError.KSError;

    function KSSDKObjectRecord(record, parentObject) {
        this.data = record ? voltmx.sdk.cloneObject(record) : {};
        this.parentObject = parentObject ? parentObject : {};
        this.recordMetadata = new KSSDKObjectRecordMetadata.KSSDKObjectRecordMetadata();
    }

    KSSDKObjectRecord.prototype.getData = function() {
        return this.data;
    };

    KSSDKObjectRecord.prototype.getParentObject = function() {
        return this.parentObject;
    };

    KSSDKObjectRecord.prototype.setParentObject = function(parentObject) {
        this.parentObject = parentObject;
    };

    KSSDKObjectRecord.prototype.getRecordMetadata = function() {
        return this.recordMetadata;
    };

    KSSDKObjectRecord.prototype.setRecordMetadata = function(recordMetadata) {
        this.recordMetadata = recordMetadata;
    };

    KSSDKObjectRecord.prototype.objectForKey = function(key) {
        return this.data[key];
    };

    KSSDKObjectRecord.prototype.setObjectForKey = function(key, value) {
        this.data[key] = value;
    };

    KSSDKObjectRecord.prototype.getAction = function() {
        return this.recordMetadata.action;
    };

    KSSDKObjectRecord.prototype.setAction = function(action) {
        this.recordMetadata.action = action;
    };

    KSSDKObjectRecord.prototype.getCheckSum = function() {
        return this.recordMetadata.checkSum;
    };

    KSSDKObjectRecord.prototype.setCheckSum = function(checkSum) {
        this.recordMetadata.checkSum = checkSum;
    };

    KSSDKObjectRecord.prototype.getOpStatus = function() {
        return this.recordMetadata.opStatus;
    };

    KSSDKObjectRecord.prototype.setOpStatus = function(opStatus) {
        this.recordMetadata.opStatus = opStatus;
    };

    KSSDKObjectRecord.prototype.setRowid = function(rowid) {
        this.recordMetadata.rowId = rowid;
    };

    KSSDKObjectRecord.prototype.getRowId = function() {
        return this.recordMetadata.rowId;
    };

    KSSDKObjectRecord.prototype.getErrorMessage = function() {
        return this.recordMetadata.errorMessage;
    };

    KSSDKObjectRecord.prototype.setErrorMessage = function(errorMessage) {
        this.recordMetadata.errorMessage = errorMessage;
    };

    KSSDKObjectRecord.prototype.getIntermediateErrors = function() {
        return this.recordMetadata.intermediateErrors;
    };

    KSSDKObjectRecord.prototype.setIntermediateErrors = function(intermediateErrors) {
        this.recordMetadata.intermediateErrors = intermediateErrors;
    };

    KSSDKObjectRecord.prototype.getPrimaryKeyValueMapOfRecord = function(primaryKeys) {
        var primaryKeyValueMap = {};
        if (primaryKeys) {
            for (var i = 0; i < primaryKeys.length; i++) {
                    var key = primaryKeys[i];
                    primaryKeyValueMap[key] = this.data[key];
            }
        }
        return primaryKeyValueMap;
    };

    /**
     * Get primary key value map of the upload record
     * @param primaryKeys - primary key attributes of the record
     * @return primaryKeyValueMap - JSON of the primary key(s) values of the record
     */
    KSSDKObjectRecord.prototype.getPrimaryKeyValueMapOfUploadRecord = function (primaryKeys) {
        var primaryKeyValueMap = {};

        if (primaryKeys) {
            for (var i = 0; i < primaryKeys.length; i++) {
                var key = primaryKeys[i];
                if (this.data.hasOwnProperty(key)) {
                    primaryKeyValueMap[key] = this.data[key];
                } else {
                    var error = new KSError(KSErrorConstants.SYNC_EMPTY_PRIMARYKEY_VALUE, "In upload response, primary keys are mandatory");
                    error.message = (error.message).replace('%s', key);
                    throw  error;
                }
            }
        }

        return primaryKeyValueMap;
    };

    KSSDKObjectRecord.prototype.isGivenPKValuePairPresentInRecord = function(primaryKeyValuePair) {
        for (var key in primaryKeyValuePair) {
            if (!this.data[key] || this.data[key] != primaryKeyValuePair[key]) {
                return false;
            }
        }
        return true;
    };

    exports.KSSDKObjectRecord = KSSDKObjectRecord;
});
voltmx.sdk.OfflineObjects.KSSDKObjectRecordAction = Object.freeze({
    UPDATE: 0,
    CREATE: 1,
    PARTIAL_UPDATE: 2,
    DELETE: 3,
    READ: 4,
    NONE: 5,
    DEFERRED_AND_DO_NOT_TRACK_INTERMEDIATE_UPDATES: 70,
    DO_NOT_TRACK_INTERMEDIATE_UPDATES: 80,
    DEFERRED_UPDATE: 90,
    DEFERRED_CREATE: 91,
    DEFERRED_DELETE: 93
});

/**
 * Returns the action as string for its enum type
 * @type {Readonly<string>} action type as string
 */
voltmx.sdk.OfflineObjects.getValueOfRecordActionAsString = Object.freeze({
    0: "update",
    1: "create",
    2: "partialupdate",
    3: "delete",
    4: "read",
    5: "none",
    70: "deferedAndDontTrackIntermediateUpdates",
    80: "dontTrackIntermediateUpdates",
    90: "deferredupdate",
    91: "deferredcreate",
    93: "deferreddelete"
});

/**
 * Method to map KSSDKObjectRecordAction to downloaded action type of record.
 * @param recordAction Record action type received in download response.
 * @returns {number} Corresponding KSSDKObjectRecordAction for record action type
 * received in download response.
 */
voltmx.sdk.OfflineObjects.getKSSDKObjectRecordAction = function (recordAction) {
    var KSSDKObjectRecordAction = voltmx.sdk.OfflineObjects.KSSDKObjectRecordAction;
    switch (recordAction) {
        case "update" :
            return KSSDKObjectRecordAction.UPDATE;
        case "partialupdate" :
            return KSSDKObjectRecordAction.PARTIAL_UPDATE;
        case "create" :
            return KSSDKObjectRecordAction.CREATE;
        case "delete" :
            return KSSDKObjectRecordAction.DELETE;
        default:
            return KSSDKObjectRecordAction.NONE;
    }
};

/**
 * Gives the counter action type for given action type.
 * @param recordAction Record action type received from database.
 * @return {number} Counter KSSDKObjectRecordAction for given record action type.
 */
voltmx.sdk.OfflineObjects.getReverseActionType = function (recordAction) {
    var KSSDKObjectRecordAction = voltmx.sdk.OfflineObjects.KSSDKObjectRecordAction;
    switch (recordAction) {
        case  KSSDKObjectRecordAction.UPDATE:
        case  KSSDKObjectRecordAction.PARTIAL_UPDATE :
            return KSSDKObjectRecordAction.UPDATE;
        case KSSDKObjectRecordAction.CREATE:
            return KSSDKObjectRecordAction.DELETE;
        case  KSSDKObjectRecordAction.DELETE:
            return KSSDKObjectRecordAction.CREATE;
        default:
            return KSSDKObjectRecordAction.NONE;
    }
};


/**
 * KSSDKObjectRecordMetadata
 * Created by Haritha Kintali on 30-05-2018.
 * Copyright © 2017 Kony. All rights reserved.
 */
define("KSSDKObjectRecordMetadata", ["exports"], function (exports) {

    var KSSDKObjectRecordAction = voltmx.sdk.OfflineObjects.KSSDKObjectRecordAction;

    function KSSDKObjectRecordMetadata() {
        this.action = KSSDKObjectRecordAction.UPDATE;
        this.ignoreOfflineDuplicates = false;
        this.opStatus = 0;
        this.checkSum = null;
        this.rowId = null;
        this.errorMessage = null;
        this.intermediateErrors = null;
    }

    exports.KSSDKObjectRecordMetadata = KSSDKObjectRecordMetadata;
});
define("KSSDKObjectService",

    ["exports", "KSSetupManager", "KSSyncMetaInfo", "KSError", "KSDeltaContextUtils", "KSDatabaseAPI", "KSSyncDatabaseHelper",
        "KSOptionsHelper", "KSCommonUtils", "SyncEngine", "KSMetadataUtils", "KSUploadRequestBuilderFactory", "KSUploadCacheManager"],

    function (exports, KSSetupManager, KSSyncMetaInfo, _KSError, KSDeltaContextUtils, _KSDatabaseAPI, KSSyncDatabaseHelper,
              KSOptionsHelper, KSCommonUtils, SyncEngine, KSMetadataUtils, KSUploadRequestBuilderFactory, KSUploadCacheManager) {

        "use strict";
        exports._esModule = true;

        var sdk = voltmx.sdk;
        var logger = sdk.logsdk;
        var sdkObjectServicesMap = {};
        var KSError = _KSError.KSError;
        var LOG_PREFIX = "KSSDKObjectService : ";
        var _KSSDKObject = require("KSSDKObject");
        var KSDatabaseAPI = _KSDatabaseAPI.KSDatabaseAPI;
        var KSTableType = voltmx.sdk.OfflineObjects.KSTableType;
        var KSErrorConstants = sdk.OfflineObjects.KSErrorConstants;
        var KSPublicConstants = sdk.OfflineObjects.KSPublicConstants;
        var KSInternalConstants = sdk.OfflineObjects.KSInternalConstants;
        var KSDatabaseConstants = voltmx.sdk.OfflineObjects.KSDatabaseConstants;
        var isDownloadReconciliationRequired = true;

        /**
         *  This creates the object of KSSDKObjectService.
         * @param objectServiceName object Service Name.
         * @constructor
         */
        function KSSDKObjectService(objectServiceName) {
            if (KSCommonUtils.isNullOrEmptyObject(objectServiceName)) {
                var errorMessage = "Cannot create Offline Object Service with name as null or empty string.";
                logger.error(LOG_PREFIX, errorMessage);
                throw new KSError(KSErrorConstants.METADATA_SDKOBJECTSERVICE_NAME_NULL_OR_EMPTY, errorMessage);
            }

            this.filter = {};
            this.objectNames = [];
            this.name = objectServiceName;
            this.mode = KSInternalConstants.MODE;
            this.fullyQualifiedNamesForObjects = [];
            this.sdkObjectsForUploadAndDownload = [];
            this.metadata = KSSetupManager.getInstance().getSetupContext()[objectServiceName];

            populateObjectNames.call(this);
        }

        //------------------------------------
        // PROTOTYPE GETTER AND SETTER METHODS
        //------------------------------------

        /**
         * Method to fetch the fullyQualifiedNames for objects in the object service.
         * @returns {Array} FullyQualifiedNames for objects in the object service.
         */
        KSSDKObjectService.prototype.getObjectNames = function () {
            return this.fullyQualifiedNamesForObjects;
        };


        /**
         *  Method to fetch fully qualified name of the object service.
         * @returns {*} Fully qualified name of the object service.
         */
        KSSDKObjectService.prototype.getFullyQualifiedName = function () {
            return this.name;
        };

        /**
         *  Method to fetch name of the object service .
         * @returns {*} Name of the object service.
         */
        KSSDKObjectService.prototype.getObjectServiceName = function () {
            return this.name;
        };

        /**
         * Method to fetch the sync level.
         * @returns {string} Sync level.
         */
        KSSDKObjectService.prototype.getSyncLevel = function () {
            return KSInternalConstants.SYNCLEVEL_OBJECTSERVICE;
        };

        /**
         * Method to fetch the Sync MetaInfo associated to the object service.
         * @returns {*} MetaInfo dictionary.
         */
        KSSDKObjectService.prototype.getSyncMetaInfo = async function () {
            if (sdk.isNullOrUndefined(this.metainfo)) {
                this.metainfo = await KSSyncMetaInfo.getInstance(this.name);
            }
            return this.metainfo;
        };

        /**
         * Getter to fetch the metadata associated with the object service.
         * @returns Metadata associated with the object servic.
         */
        KSSDKObjectService.prototype.getMetadata = function () {
            return this.metadata;
        };

        //-------------------------------
        // PROTOTYPE METHODS FOR DOWNLOAD
        //-------------------------------

        /**
         * Gets the flag downloadReconciliationRequired.
         *
         * @return isDownloadReconciliationRequired
         */
        KSSDKObjectService.prototype.isDownloadReconciliationRequired = function(){
            return isDownloadReconciliationRequired;
        }

        /**
         * Sets the flag downloadReconciliationRequired
         *
         * @param downloadReconciliationRequired
         */
        function setDownloadReconciliationRequired(downloadReconciliationRequired) {
            isDownloadReconciliationRequired = downloadReconciliationRequired;
        }

        /**
         * Method to check the options and set the flag isDownloadReconciliationRequired accordingly.
         *
         * @param options Options Map for the syncOptions
         */
        function checkAndSetIfDownloadReconciliationRequired(options) {
            var downloadReconciliationRequired = (options[KSPublicConstants.DOWNLOAD_RECONCILIATION_REQUIRED]);
            if (!voltmx.sdk.isNullOrUndefined(downloadReconciliationRequired)) {
                setDownloadReconciliationRequired(downloadReconciliationRequired);
            }
        }

        /**
         * Method to fetch the headers for a upload request.
         * @returns {{}} JSON object for headers.
         */
        function getUploadRequestHeaders() {
            var headers = {};
            headers[KSInternalConstants.X_HTTP_METHOD_OVERRIDE] = KSInternalConstants.HTTP_OVERRIDE_UPLOAD;

            var version = this.metadata[KSInternalConstants.VERSION];
            if (!voltmx.sdk.isNullOrUndefined(version)) {
                headers[KSInternalConstants.X_KONY_API_VERSION] = version;
            }

            return headers;
        }

        /**
         * Method to start sync on the given object service.
         *
         * @param options syncConfig Options passed for sync.
         */
        KSSDKObjectService.prototype.startSync = async function (options) {
            logger.trace(LOG_PREFIX, "Starting Sync Session for Object Service : " + this.name);
            assertMode(this.mode);
            validateOptions.call(this, options);
            checkAndSetIfDownloadReconciliationRequired(options);
            logger.info(LOG_PREFIX, "Starting Sync Operation for ObjectService : " + this.name);
            var syncEngineInstance = SyncEngine.getInstance();
            return (await syncEngineInstance.startSyncSessionForObject(options, this));
        };

        /**
         * Method to clear the objects and properties used for sync.
         */
        KSSDKObjectService.prototype.clearObjectsToPersist = function () {
            this.filter = {};
            KSCommonUtils.clearArrayObject(this.sdkObjectsForUploadAndDownload);
        };

        /**
         * Method to clear data for an objectService.
         */
        KSSDKObjectService.prototype.clearData = function (options) {
            return KSSyncDatabaseHelper.clearDataForGivenObjectList(this.getObjectNames(), this.getFullyQualifiedName(), options);
        };
    
        /**
         * Forms a list of objects for object service.
         * @return {Array} list of objects under object service.
         */
        KSSDKObjectService.prototype.getAllObjects = function () {
            var sdkObjects = [];
            var objectNamesLen = this.objectNames.length;
            for (var index = objectNamesLen - 1; index >= 0; index--) {
                sdkObjects.push(new _KSSDKObject.KSSDKObject(this.objectNames[index], null, this.name));
            }
            return sdkObjects;
        };

        /**
         * Object to upload.
         * @param context Contains options for sync like filter, query params, batchSize etc.
         * @param uploadBatchParams Contains the batch related info like batchNumber, lastRSNOfUploadPayload etc.
         * @returns {Promise<Array>} object to upload.
         */
        KSSDKObjectService.prototype.objectsToUpload = async function (uploadBatchParams) {
            var sdkObjects = this.getAllObjects();
            return await KSSyncDatabaseHelper.getDeltaChangesToUpload(sdkObjects, uploadBatchParams);
        };

        /**
         * Creates upload request params and returns the json { payload, headers, url}
         * @param inputContext Contains the options for sync like filter, query params, batchSize etc.
         * @param uploadBatchParams Contains the batch related info like batchNumber, lastRSNOfUploadPayload etc.
         * @returns {Promise<void>} requests parameters needed.
         */
        KSSDKObjectService.prototype.createUploadRequest = async function (inputContext, uploadBatchParams) {
            logger.info(LOG_PREFIX, "CreateUploadRequest is called in SDKObject");
            uploadBatchParams.setUploadBatchSize(inputContext[KSPublicConstants.UPLOAD_BATCH_SIZE]);
            var uploadRequestParams = {};

            var uploadRequestBuilder = await KSUploadRequestBuilderFactory.getUploadRequestFactory(this, uploadBatchParams);
            var areThereRecordsToUpload = await uploadRequestBuilder.areThereRecordsToUpload();
            
            if (!areThereRecordsToUpload) {
                logger.info(LOG_PREFIX, "No pending changes found to upload in object");
                uploadRequestParams[KSInternalConstants.ARE_THERE_CHANGES_TO_UPLOAD] = false;
                return uploadRequestParams;
            }
            uploadRequestParams[KSInternalConstants.URL] = getEndPointURLString.call(this);
            uploadRequestParams[KSInternalConstants.REQUEST_HEADERS] = getUploadRequestHeaders.call(this);
            uploadRequestParams[KSInternalConstants.REQUEST_BODY] = await uploadRequestBuilder.getUploadRequestJson();
            uploadRequestParams[KSInternalConstants.REQUEST_QUERY_PARAMS] = KSOptionsHelper.validateAndGetQueryParams(inputContext, KSPublicConstants.SYNC_UPLOAD_QUERY_PARAMS);
            uploadRequestParams[KSInternalConstants.ARE_THERE_CHANGES_TO_UPLOAD] = true;
            return uploadRequestParams;
        };

        /**
         * This will Parse the upload response and forms the JSON which has DATA_OBJECTS and SYNC_ERRORS.
         * @param response  given network response.
         * @return {JSON} Returns the JSON which has DATA_OBJECTS and SYNC_ERRORS.
         */
        KSSDKObjectService.prototype.parseUploadResponse = function (response) {
            return require("KSRequestResponseUtils").uploadResponseObjectsDictionaryFromJSONString(response);
        };

        /**
         * Persists the upload response in given object
         * @param sdkObjects    objects to persist.
         */
        KSSDKObjectService.prototype.persistUploadChanges = async function (sdkObjects) {
            await KSSyncDatabaseHelper.persistUploadResponseForObjects(sdkObjects);
        };

        KSSDKObjectService.prototype.setRemoveAfterUploadParam = async function (removeAfterUpload) {
            await KSSyncDatabaseHelper.setRemoveAfterUploadParam(removeAfterUpload);
        };

        /**
         *  Method to creates the download request parameters for sync.
         * @param context context passed to create download request.
         * @returns requestBodyParams The download request parameters.
         */
        KSSDKObjectService.prototype.createDownloadRequest = async function (context) {
            logger.trace(LOG_PREFIX, "Starting CreateDownloadRequest for Object Service.");
            var requestParams = {};

            try {
                setFilter.call(this, context);
                var queryParams = buildDownloadRequestQueryParams(context);
                var deltaContext;
                if (KSCommonUtils.isNullOrEmptyObject(context[KSInternalConstants.BATCH_CONTEXT])) {
                    deltaContext = await getDeltaContext.call(this);
                } else {
                    deltaContext = context;
                }
                var requestBodyParam = buildDownloadRequestBodyParam.call(this, deltaContext);
                requestParams[KSInternalConstants.URL] = getEndPointURLString.call(this);
                requestParams[KSInternalConstants.BODY] = requestBodyParam;
                requestParams[KSInternalConstants.QUERY_PARAMS] = queryParams;
                requestParams[KSInternalConstants.HEADERS] = getDownloadRequestHeaders.call(this);

                logger.debug(LOG_PREFIX, "Successfully created parameters for object service download request.");
                return requestParams;
            } catch (exception) {
                var errorMessage = "Error in  building download request " + exception;
                logger.error(LOG_PREFIX, errorMessage);
                throw new KSError(KSErrorConstants.SYNC_GENERIC_ERROR, errorMessage);
            }
        };

        /**
         *  Method to prepare the object service instance for sync session.
         */
        KSSDKObjectService.prototype.prepareForSession = function () {

        };


        /**
         * Method to parse the download response received from the network.
         * @param downloadResponse Response JSON.
         * @returns {*|{}} Returns a parsed response dictionary.
         */
        KSSDKObjectService.prototype.parseDownloadResponse = function (downloadResponse) {
            logger.trace(LOG_PREFIX, "Parsing response for object service : " + this.name);

            //Using require to avoid circular dependencies..
            var responseDictionary = require("KSRequestResponseUtils").getObjectServiceDownloadResponseDictionaryFromNetworkResponse(downloadResponse, this.name);
            if (!sdk.isNullOrUndefined(responseDictionary) && responseDictionary.hasOwnProperty(KSInternalConstants.DATA_OBJECTS)) {
                this.sdkObjectsForUploadAndDownload = responseDictionary[KSInternalConstants.DATA_OBJECTS];
                if (!this.isDownloadReconciliationRequired()) {
                    for(var sdkObject of this.sdkObjectsForUploadAndDownload) {
                        sdkObject.setDownloadReconciliationRequired(false);
                    }
                }
                responseDictionary[KSInternalConstants.HAS_MORE_RECORDS] = downloadResponse[KSInternalConstants.HAS_MORE_RECORDS];
            }
            return responseDictionary;
        };

        /**
         * Method to persist the changes after parsing the response received from the network.
         * @param deltaContext Delta context received for the sync session.
         */
        KSSDKObjectService.prototype.persistDownloadChanges = async function (deltaContext) {
            logger.trace(LOG_PREFIX, "Persisting download for object service : " + this.name);

            var queryObjectsForData = await KSSyncDatabaseHelper.buildQueriesToPersistChangesForObjects(this.sdkObjectsForUploadAndDownload);
            var deltaContextQueryObj = KSDeltaContextUtils.buildDeltaContextQuery(deltaContext, this.filter);

            var queryObjects = [];
            Array.prototype.push.apply(queryObjects, queryObjectsForData);
            Array.prototype.push.apply(queryObjects, deltaContextQueryObj);

            logger.info(LOG_PREFIX, "Executing queries in transaction for persisting download response for object service : " + this.name);
            await KSDatabaseAPI.executeQueries(queryObjects, true);
            logger.debug(LOG_PREFIX, "Successfully executed queries for persisting download response for object service : " + this.name);
        };

        /**
         * Rollback an ObjectService to it's previous Sync State
         */
        KSSDKObjectService.prototype.rollback = async function () {
            var syncEngineInstance = SyncEngine.getInstance();
            if (syncEngineInstance.isRollbackOperationAllowed(KSInternalConstants.SYNCLEVEL_OBJECTSERVICE, this)) {

                syncEngineInstance.updateRunningTaskContextWithRollbackTasks(KSInternalConstants.SYNCLEVEL_OBJECTSERVICE, this);
                logger.info(LOG_PREFIX, "Rollback on Object service : " + this.name + " Start.");

                var preparedStatementsForRollback = await this.buildPreparedStatementsForObjectServiceRollback();
                await KSDatabaseAPI.executeQueries(preparedStatementsForRollback, true);

                await clearUploadCacheOnRollback(this.getFullyQualifiedName(), this.fullyQualifiedNamesForObjects);
            } else {
                var errorMessage = "Rollback cannot be performed as other Offline Object operations are in progress.";
                logger.error(LOG_PREFIX, errorMessage);
                throw new KSError(KSErrorConstants.APPLICATIONTASKS_IN_PROGRESS, errorMessage);
            }
        };

        async function clearUploadCacheOnRollback(objectServiceName, objectNames) {
            var cacheManagerInstance = KSUploadCacheManager.getInstance();
            await cacheManagerInstance.removeRecord(objectServiceName);

            var objectsCount = objectNames.length;
            for(var index = 0; index < objectsCount; index ++) {
                await cacheManagerInstance.removeRecord(objectNames[index]);
            }
        }

        /**
         * Method to build the prepared statements for rollback.
         * @returns {Promise<Array>} Array of prepared statements.
         */
        KSSDKObjectService.prototype.buildPreparedStatementsForObjectServiceRollback = async function () {
            logger.debug(LOG_PREFIX, "Building PreparedStatements For Rollback on ObjectService : " + this.name);
            var preparedStatementsForRollback = [];
            var sdkObjects = this.getAllObjects();
            var sdkObjectsLength = sdkObjects.length;
            for (var index = 0; index < sdkObjectsLength; index++) {
                Array.prototype.push.apply(preparedStatementsForRollback, await KSSyncDatabaseHelper.buildPreparedStatementsForObjectRollback(sdkObjects[index], null));
            }
            return preparedStatementsForRollback;
        };

        //-----------------------------------
        // PRIVATE GETTER AND SETTER METHODS
        //-----------------------------------

        /**
         * Method to populate objectNames and fullyQualifiedNamesForObjects from namespacemetadata.
         */
        function populateObjectNames() {
            logger.trace(LOG_PREFIX, "Populating fully qualified names of SDK Objects.");

            if (sdk.isNullOrUndefined(this.metadata)) {
                var errorMessage = "Metadata not found for object service : " + this.name;
                logger.error(LOG_PREFIX, errorMessage);
                throw new KSError(KSErrorConstants.METADATA_INVALID_OBJECT_SERVICE_NAME, errorMessage);
            }
            var namespaceMetadataList = this.metadata[KSInternalConstants.NAMESPACE_METADATA_DICTIONARY];
            for (var namespace in namespaceMetadataList) {
                var objectMetadataList = namespaceMetadataList[namespace][KSInternalConstants.OBJECT_METADATA_DICTIONARY];
                for (var objectName in objectMetadataList) {
                    this.objectNames.push(objectName);
                    this.fullyQualifiedNamesForObjects.push(objectMetadataList[objectName][KSInternalConstants.FULLY_QUALIFIED_NAME]);
                }
            }
            logger.debug(LOG_PREFIX, JSON.stringify(this.objectNames));
        }

        /**
         *  Method to return the endpoint url for sync.
         * @returns {string} URL string.
         */
        function getEndPointURLString() {
            return this.metadata[KSInternalConstants.ENDPOINT_URL];
        }

        /**
         * Method to fetch instance of object service.
         * @param objectServiceName Name of the object service.
         * @returns {*} The object service instance.
         */
        function getInstanceByName(objectServiceName) {
            logger.trace(LOG_PREFIX, "Fetching instance of KSSDKObjectService with name : " + objectServiceName);
            if (!sdkObjectServicesMap.hasOwnProperty(objectServiceName)) {
                sdkObjectServicesMap[objectServiceName] = new KSSDKObjectService(objectServiceName);
            }
            return sdkObjectServicesMap[objectServiceName];
        }

        /**
         * Clears the sdkObjectServicesMap.
         */
        function clearObjectServiceMap() {
            KSCommonUtils.clearJSONObject(sdkObjectServicesMap);
        }

        //-----------------------------------
        // PRIVATE HELPER METHODS FOR DOWNLOAD
        //-----------------------------------


        /**
         * Method to assert the mode of the object.
         * @param mode Mode of the sync object.
         */
        function assertMode(mode) {
            if (mode != KSInternalConstants.MODE) {
                var errorMessage = "Mode should be OFFLINE.";
                logger.error(LOG_PREFIX, errorMessage);
                throw new KSError(KSErrorConstants.INTERNAL_INVALID_SYNC_MODE, errorMessage);
            }
        }


        /**
         * This function creates request Body for create Download Request
         * @param deltaContext deltaContext List
         * @returns jsonString JSON string to be sent in the body.
         */
        function buildDownloadRequestBodyParam(deltaContext) {
            logger.trace(LOG_PREFIX, "Building body params of download request.");
            var deltaContextObject = {};
            var objsDictionary = {};
            var objectNameAndDollarExpandValueMap = getDollarExpandValueForAllObjectsInObjectService.call(this);
            if (!KSCommonUtils.isNullOrEmptyObject(deltaContext[KSInternalConstants.BATCH_CONTEXT])) {
                deltaContextObject[KSInternalConstants.DELTA_CONTEXT] = deltaContext[KSInternalConstants.BATCH_CONTEXT];
            } else {
                if (!KSCommonUtils.isNullOrEmptyObject(deltaContext)) {
                    logger.info(LOG_PREFIX, "Adding deltaContext values in the download request body.");
                    // Adding deltaContext key in the request Body for each object
                    var deltaContextLength = deltaContext.length;
                    for (var name = 0; name < deltaContextLength; name++) {
                        var fullyQualifiedObjectName = deltaContext[name][KSInternalConstants.OBJECT_NAME];
                        var objectName = KSMetadataUtils.objectNameFromFullyQualifiedName(fullyQualifiedObjectName);

                        var contextDictionary = {};

                        contextDictionary[KSInternalConstants.DELTA] = deltaContext[name][KSInternalConstants.DELTACONTEXT];
                        objsDictionary[objectName] = contextDictionary;
                    }
                }

                //loop to add filter data and $expand odata query options to the object
                //Works even if delta context is not available only for some objects in the object service
                var fullyQualifiedObjectLength = this.fullyQualifiedNamesForObjects.length;
                for (var name = 0; name < fullyQualifiedObjectLength; name++) {
                    var fullyQualifiedName = this.fullyQualifiedNamesForObjects[name];
                    var objectName = KSMetadataUtils.objectNameFromFullyQualifiedName(fullyQualifiedName);

                    var odataStringValue = "";
                    var filterForObject = this.filter[objectName];

                    if (!KSCommonUtils.isNullOrEmptyObject(filterForObject)) {
                        odataStringValue += KSInternalConstants.DOLLAR_FILTER_EQUALS_TO + filterForObject;
                    }

                    if (objectNameAndDollarExpandValueMap.hasOwnProperty(fullyQualifiedName)) {
                        var dollarExpandString = KSInternalConstants.DOLLAR_EXPAND_EQUALS_TO + objectNameAndDollarExpandValueMap[fullyQualifiedName];

                        if (odataStringValue.length > 0) {
                            dollarExpandString = '&' + dollarExpandString;
                        }
                        odataStringValue += dollarExpandString;
                    }

                    if (!KSCommonUtils.isNullOrEmptyObject(odataStringValue)) {
                        if (objsDictionary.hasOwnProperty(objectName)) {
                            objsDictionary[objectName][KSInternalConstants.ODATASTRING] = odataStringValue;
                        } else {
                            var contextDictionary = {};
                            contextDictionary[KSInternalConstants.ODATASTRING] = odataStringValue;
                            objsDictionary[objectName] = contextDictionary;
                        }
                    }
                }
            }
            if (!KSCommonUtils.isNullOrEmptyObject(objsDictionary)) {
                var objectLevelDictionary = {};
                objectLevelDictionary[KSInternalConstants.OBJS] = objsDictionary;
                deltaContextObject[KSInternalConstants.DELTA_CONTEXT] = objectLevelDictionary;
            }
            logger.debug(LOG_PREFIX, "Successfully built request body.");
            return deltaContextObject;
        }

        /**
         * This function gets records from indexedDB matching deltContext
         * @returns {*}
         */
        async function getDeltaContext() {
            logger.trace(LOG_PREFIX, "Starting to fetch delta context.");
            var listOfObjectNamesAndFilters = getListOfObjectNameAndFilters.call(this);
            return await KSDeltaContextUtils.getDeltaContextForGivenObjectNamesAndFilters(listOfObjectNamesAndFilters);
        }


        /**
         * Method to fetch the headers for a download request.
         * @returns {{}} JSON object for headers.
         */
        function getDownloadRequestHeaders() {
            logger.trace(LOG_PREFIX, "Starting to build request headers.");
            var headers = {};
            var version = this.metadata[KSInternalConstants.VERSION];

            if (!voltmx.sdk.isNullOrUndefined(version)) {
                headers[KSInternalConstants.X_KONY_API_VERSION] = version;
            }

            logger.debug(LOG_PREFIX, "Request Headers : " + JSON.stringify(headers));
            return headers;
        }


        /**
         * Fetches the listOfObjectNameAndFilters to be passed for fetching DeltaContext
         * @returns {Array}
         */
        function getListOfObjectNameAndFilters() {
            logger.trace(LOG_PREFIX, "Preparing list of object names and their respective filters.");
            var listOfObjectNameAndFilters = [];
            var lengthOfFullyQualifiedNamesForObjects = this.fullyQualifiedNamesForObjects.length;
            for (var i = 0; i < lengthOfFullyQualifiedNamesForObjects; i++) {
                var objectNameAndFilterMap = {};
                var objectName = this.fullyQualifiedNamesForObjects[i];
                var filter = voltmx.sdk.isNullOrUndefined(this.filter[KSMetadataUtils.objectNameFromFullyQualifiedName(objectName)]) ? KSInternalConstants.EMPTY_STRING :
                    this.filter[KSMetadataUtils.objectNameFromFullyQualifiedName(objectName)];
                objectNameAndFilterMap[KSInternalConstants.OBJECT_NAME] = objectName;
                objectNameAndFilterMap[KSInternalConstants.FILTER] = filter;
                listOfObjectNameAndFilters.push(objectNameAndFilterMap);
            }
            logger.debug(LOG_PREFIX, "List Of ObjectName and Filters are : " + JSON.stringify(listOfObjectNameAndFilters));
            return listOfObjectNameAndFilters;
        }


        /**
         *  Sets filter
         * @param context context
         */
        function setFilter(context) {
            logger.trace(LOG_PREFIX, "Starting to set filter.");
            var options = context[KSInternalConstants.SYNC_OPTIONS];
            if (!voltmx.sdk.isNullOrUndefined(options) && options.hasOwnProperty(KSInternalConstants.FILTER)) {
                var filterMap = options[KSInternalConstants.FILTER];
                logger.debug(LOG_PREFIX, "Setting Filter: " + JSON.stringify(filterMap));
                this.filter = filterMap;
            }

            var lengthOfFullyQualifiedObjects = this.fullyQualifiedNamesForObjects.length;
            for (var i = 0; i < lengthOfFullyQualifiedObjects; i++) {
                if (!this.filter.hasOwnProperty(this.fullyQualifiedNamesForObjects[i])) {
                    this.filter[this.fullyQualifiedNamesForObjects[i]] = "";
                }
            }
            logger.debug(LOG_PREFIX, "Filters object is as follows : " + JSON.stringify(this.filter));
        }

        /**
         * This builds the Download Request Query Params for create Download request
         * @param context context
         * @returns queryParams
         */
        function buildDownloadRequestQueryParams(context) {
            logger.trace(LOG_PREFIX, "Starting to build query params for download request.");
            var options = context[KSInternalConstants.SYNC_OPTIONS];
            var queryParams = KSOptionsHelper.validateAndGetQueryParams(options, KSPublicConstants.SYNC_DOWNLOAD_QUERY_PARAMS);

            queryParams[KSInternalConstants.OFFLINE_FLAG] = KSInternalConstants.OFFLINE_FLAG_VALUE;
            queryParams[KSInternalConstants.BATCH_SIZE_FILTER] = context[KSInternalConstants.SYNC_OPTIONS][KSPublicConstants.DOWNLOAD_BATCH_SIZE];
            logger.debug(LOG_PREFIX, "QueryParams are as follows : " + JSON.stringify(queryParams));
            return queryParams;
        }

        //-----------------------------------
        // PRIVATE METHODS FOR OPTIONS VALIDATIONS
        //-----------------------------------

        /**
         * This util validates the options passed to startSync
         * @param options SyncConfig
         */
        function validateOptions(options) {
            logger.trace(LOG_PREFIX, "Validating the options sent for sync.");

            validateFilters.call(this, options);
            KSOptionsHelper.validateSyncConfigPolicy(options);
            KSOptionsHelper.isValidBoolTypeOption(options, KSPublicConstants.DOWNLOAD_RECONCILIATION_REQUIRED);
        }

        /**
         * This util validates the filters passed in options of startSync
         * @param options SyncConfig
         */
        function validateFilters(options) {
            logger.trace(LOG_PREFIX, "Starting to validate the filters.");
            if (!voltmx.sdk.isNullOrUndefined(options) && options.hasOwnProperty(KSInternalConstants.FILTER)) {
                var filterObject = options[KSInternalConstants.FILTER];

                //Validate if the filter object is not null, instance of Map and not empty..
                if ((!(typeof filterObject == "object")) || (KSCommonUtils.isNullOrEmptyObject(filterObject))) {
                    var errorMessage = "Filters sent are either null/empty or of a unexpected datatype.";
                    logger.error(LOG_PREFIX, errorMessage);
                    throw new KSError(KSErrorConstants.SYNC_INVALID_FILTERS, errorMessage);
                }

                //Validate that all the objects in the filter map sent belong to the ObjectService
                //and the filter associated with it is not null
                var filterMap = filterObject;

                for (var objectName in filterMap) {
                    if (this.objectNames.indexOf(objectName) != -1 || this.fullyQualifiedNamesForObjects.indexOf(objectName) != -1) {
                        var filterObjectSentForObject = filterMap[objectName];

                        if ((typeof filterObjectSentForObject != "string") || (KSCommonUtils.isNullOrEmptyObject(filterObjectSentForObject))) {
                            var errorMessage = "Filter sent for object " + objectName + " is either null/empty string or not a string.";
                            logger.error(LOG_PREFIX, errorMessage);
                            throw new KSError(KSErrorConstants.SYNC_INVALID_FILTERS, errorMessage);
                        }
                    } else {
                        var errorMessage = objectName + " sent in filter options doesn't belong to ObjectService " + this.name;
                        logger.error(LOG_PREFIX, errorMessage);
                        throw new KSError(KSErrorConstants.SYNC_INVALID_FILTERS, errorMessage);
                    }
                }
            }
            logger.info(LOG_PREFIX, "Filters sent in the options are valid.");
        }

        /**
         * Method to get $expand query option value for all the objects in the object service
         * @return Map having Object Name as key and $expand as value.
         */
        function getDollarExpandValueForAllObjectsInObjectService() {

            var objectNameAndDollarExpandValueMap = {};
            var objectsLength = this.fullyQualifiedNamesForObjects.length;

            for(var index = 0; index < objectsLength; index++) {
                var fullyQualifiedObjectName = this.fullyQualifiedNamesForObjects[index];

                var objectMetadata = KSSetupManager.getInstance().getObjectMetadataForFullyQualifiedObjectName(fullyQualifiedObjectName);
                var dollarExpandValueOfObject = require("KSRequestResponseUtils").getDollarExpandValueFromObjectOperations(objectMetadata);

                if (dollarExpandValueOfObject.length > 0) {
                    objectNameAndDollarExpandValueMap[fullyQualifiedObjectName] = dollarExpandValueOfObject;
                }
            }

            return objectNameAndDollarExpandValueMap;
        }

        exports.getInstanceByName = getInstanceByName;
        exports.clearObjectServiceMap = clearObjectServiceMap;
    });

define("KSSyncMetaInfo", ["exports", "KSSQLQueryGenerator", "KSDatabaseAPI"], function(exports, KSSQLQueryGenerator, _KSDatabaseAPI) {

    var TAG = "KSSyncMetaInfo : ";
    var KSDatabaseConstants = voltmx.sdk.OfflineObjects.KSDatabaseConstants;
    var KSDatabaseAPI = _KSDatabaseAPI.KSDatabaseAPI;

    function KSSyncMetaInfo(objectServiceName) {
        this.objectServiceName = objectServiceName;
        this.uploadSyncSessionNumber = 1;
        this.replaySequenceNumber = 1;
        this.lastGeneratedId = -1;
    }

    async function init(objectServiceName) {
        var _this = new KSSyncMetaInfo(objectServiceName);
        var result = await getMetaInfoForObjectServiceName(_this.objectServiceName);

        if (result) {
            for (var key in result) {
                if(result.hasOwnProperty(key)) {
                    switch (key.toLocaleLowerCase()) {
                        case (KSDatabaseConstants.UPLOAD_SESSION_NO).toLocaleLowerCase():
                            _this.uploadSyncSessionNumber = result[key];
                            break;
                        case (KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER).toLocaleLowerCase():
                            _this.replaySequenceNumber = result[key];
                            break;
                        case (KSDatabaseConstants.LAST_GENERATED_ID).toLocaleLowerCase():
                            _this.lastGeneratedId = result[key];
                            _this.lastGeneratedId = _this.lastGeneratedId > -1 ? -1 : _this.lastGeneratedId;
                            break;
                    }
                }
            }
        }
        return _this;
    }

    KSSyncMetaInfo.prototype.getLastGeneratedId = async function() {
        var currentId = this.lastGeneratedId;
        this.lastGeneratedId--;
        var metaInfoMap = {};
        metaInfoMap[KSDatabaseConstants.LAST_GENERATED_ID] = this.lastGeneratedId;
        await updateMetaInfoForObjectServiceName(this.objectServiceName, metaInfoMap);
        return currentId;
    };

    KSSyncMetaInfo.prototype.getReplaySequenceNumber = async function() {
        var currentReplaySequence = this.replaySequenceNumber;
        this.replaySequenceNumber++;
        var metaInfoMap = {};
        metaInfoMap[KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER] = this.replaySequenceNumber;
        await updateMetaInfoForObjectServiceName(this.objectServiceName, metaInfoMap);
        return currentReplaySequence;
    };

    KSSyncMetaInfo.prototype.getLastReplaySequenceNumber = function() {
        return this.replaySequenceNumber - 1;
    };

    KSSyncMetaInfo.prototype.getUploadSyncVersionNumber = function() {
        return this.uploadSyncSessionNumber;
    };

    async function getMetaInfoForObjectServiceName(objectServiceName) {
        var query = KSSQLQueryGenerator.getSelectQueryForMetaInfoTable(objectServiceName);
        var metaInfo = await KSDatabaseAPI.executeQuery(query);
        if (voltmx.sdk.isEmptyObject(metaInfo)) {
            voltmx.sdk.logsdk.warn(TAG,
                "MetaInfo not found for the object service : " + objectServiceName);
            return null;
        } else {
            voltmx.sdk.logsdk.debug(TAG,
                "Successfully fetched the metainfo for the object service : " + objectServiceName);
            return metaInfo[0];
        }
    }

    async function updateMetaInfoForObjectServiceName(objectServiceName, metaInfo) {
        var query = KSSQLQueryGenerator.getUpdateQueryForMetaInfoTable(objectServiceName, metaInfo);
        await KSDatabaseAPI.executeQuery(query);
    }

    exports.getInstance = init;
});
/**
 * Base ORMManager
 * Created by Haritha Kintali on 30-05-2018.
 * Copyright © 2017 Kony. All rights reserved.
 */
define("KSBaseORMManager", ["exports", "KSCommonUtils", "KSSDKObjectRecord", "KSSDKObjectService", "KSDatabaseAPI", "KSQueryObjectBuilder", "KSSQLQueryGenerator", "KSError", "KSOptionsHelper", "KSSyncDatabaseHelper", "KSMarkForUploadUtils"],
    function (exports, KSCommonUtils, _KSSDKObjectRecord, KSSDKObjectService, _KSDatabaseAPI, KSQueryObjectBuilder, KSSQLQueryGenerator, _KSError, KSOptionsHelper, KSSyncDatabaseHelper, KSMarkForUploadUtils) {

        "use strict";

        function KSBaseORMManager() {
        }

        var KSError = _KSError.KSError;
        var LOG_PREFIX = "KSBaseORMManager : ";
        var KSDatabaseAPI = _KSDatabaseAPI.KSDatabaseAPI;
        var KSCriteria = voltmx.sdk.OfflineObjects.KSCriteria;
        var KSTableType = voltmx.sdk.OfflineObjects.KSTableType;
        var KSSDKObjectRecord = _KSSDKObjectRecord.KSSDKObjectRecord;
        var KSCRUDConstants = voltmx.sdk.OfflineObjects.KSCRUDConstants;
        var KSErrorConstants = voltmx.sdk.OfflineObjects.KSErrorConstants;
        var KSPublicConstants = voltmx.sdk.OfflineObjects.KSPublicConstants;
        var KSDatabaseConstants = voltmx.sdk.OfflineObjects.KSDatabaseConstants;
        var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;
        var KSRelationshipTypes = KSInternalConstants.KSRelationshipTypes;
        var KSDatabaseOperation = KSDatabaseConstants.KSDatabaseOperations;
        var KSSDKObjectRecordAction = voltmx.sdk.OfflineObjects.KSSDKObjectRecordAction;

        /**
         * Method to build an insert prepared statement for Original table.
         *
         * @param sdkRecord Record containing the data to be persisted.
         * @param options   Map containing the primaryKeysMap
         * @returns {Promise<*>} Insert prepared statement
         */
        KSBaseORMManager.prototype.buildPreparedStatementForOriginalTable = async function (sdkRecord, options) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "buildPreparedStatementForOriginalTable : ", "Start");

            var tableName = KSSQLQueryGenerator.getTableNameWithType(sdkRecord.getParentObject().getFullyQualifiedName(), KSTableType.ORIGINAL);
            var record = await this.getRecordByPK(options[KSPublicConstants.CRUD_OPTION_PRIMARY_KEYS], tableName);

            if (voltmx.sdk.isEmptyObject(record)) {
                voltmx.sdk.logsdk.debug(LOG_PREFIX, "Record not present in original table, creating insert prepared statement.");
                return this.getInsertPreparedStatement(sdkRecord, tableName);
            }
            else {
                voltmx.sdk.logsdk.debug(LOG_PREFIX, "Record already present in original table.");
                return null;
            }
        };

        /**
         * Method to build an insert prepared statement for History table.
         *
         * @param sdkRecord SDKRecord containing the data to be inserted
         * @returns {*} Insert prepared statement.
         */
        KSBaseORMManager.prototype.buildPreparedStatementForHistoryTable = function (sdkRecord) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "buildPreparedStatementForHistoryTable : ", "Start");

            var tableName = KSSQLQueryGenerator.getTableNameWithType(sdkRecord.getParentObject().getFullyQualifiedName(), KSTableType.HISTORY);

            return this.getInsertPreparedStatement(sdkRecord, tableName);
        };

        /**
         * Method to add primary keys and update columns.
         *
         * @param sdkRecord KSSDKObjectRecord containing the updateColumns key values
         * @param options   Map containing primaryKeys map
         * @returns {KSSDKObjectRecord.KSSDKObjectRecord}
         */
        KSBaseORMManager.prototype.addPrimaryKeysToSDKRecord = function (sdkRecord, options) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "addPrimaryKeysToSDKRecord : ", "Start");

            var data = {};
            KSCommonUtils.mergeTwoJSONMaps(data, sdkRecord.getData());
            KSCommonUtils.mergeTwoJSONMaps(data, options[KSPublicConstants.CRUD_OPTION_PRIMARY_KEYS]);

            return new KSSDKObjectRecord(data, sdkRecord.getParentObject());
        };

        /**
         * Method to fetch the lastGeneratedID in an objectService
         *
         * @param objectServiceName Name of the objectService
         * @returns {Promise<*>} Last generated ID
         */
        KSBaseORMManager.prototype.getLastGeneratedIDForObjectService = async function (objectServiceName) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "getLastGeneratedIDForObjectService : ", "Start");

            var objectService = KSSDKObjectService.getInstanceByName(objectServiceName);
            var syncMetaInfo = await objectService.getSyncMetaInfo();

            return syncMetaInfo.getLastGeneratedId();
        };

        /**
         * Gets the record from the database for a given primaryKey
         *
         * @param primaryKeyValueMap contains primary keys
         * @param tableName          from which record is to be fetched
         * @returns {Promise<void>}  list of records fetched for the given primaryKey
         */
        KSBaseORMManager.prototype.getRecordByPK = async function (primaryKeyValueMap, tableName) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "getRecordByPK : ", "Start");

            var query = KSQueryObjectBuilder.getQueryObjectForTableName(tableName, KSDatabaseOperation.SELECT)
                .setWhereClause(primaryKeyValueMap)
                .build();
            var records = await KSDatabaseAPI.executeQuery(query);
            return records[0];
        };

        /**
         * Method to fetch records from the table for the given criteria
         *
         * @param options            contains criteria like primary key(s), whereConditionAsAMap
         *                           and whereConditionAsAString.
         * @param tableName          from which records are to be fetched
         * @returns {Promise<void>}  list of records fetched for the given criteria
         */
        KSBaseORMManager.prototype.getRecordsByCriteria = async function (options, tableName) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "getRecordsByCriteria : ", "Start");

            var statementBuilder = KSQueryObjectBuilder.getQueryObjectForTableName(tableName, KSDatabaseOperation.SELECT);
            var query = this.buildPreparedStatementForGivenCriteria(statementBuilder, options);
            var records = await KSDatabaseAPI.executeQuery(query);
            if (voltmx.sdk.isEmptyObject(records)) {
                voltmx.sdk.logsdk.debug(LOG_PREFIX + " : getRecordsByCriteria", "No records present with the given criteria.");
            }

            return records;
        };

        /**
         * Method to build a prepared statement based on the given criteria
         * @param statementBuilder a query builder object
         * @param options user given options
         * @returns {*} a prepared statement
         */
        KSBaseORMManager.prototype.buildPreparedStatementForGivenCriteria = function (statementBuilder, options) {
            var statement = null;
            var criteria = null;

            switch (options[KSCRUDConstants.CRUD_OPTION_CRITERIA]) {
                case KSCriteria.PRIMARY_KEYS :
                    criteria = options[KSPublicConstants.CRUD_OPTION_PRIMARY_KEYS];
                    statement = statementBuilder.setWhereClause(criteria).build();
                    break;
                case KSCriteria.WHERE_CONDITION_AS_A_MAP :
                    criteria = options[KSPublicConstants.CRUD_OPTION_WHERE_CONDITION];
                    statement = statementBuilder.setWhereClause(criteria).build();
                    break;
                case KSCriteria.WHERE_CONDITION_AS_A_STRING :
                    criteria = options[KSPublicConstants.CRUD_OPTION_WHERE_CONDITION_AS_A_STRING];
                    statement = statementBuilder.setWhereClauseAsString(criteria).build();
                    break;
                case KSCriteria.NONE :
                    statement = statementBuilder.build();
                    break;
                default:
                    voltmx.sdk.logsdk.error(LOG_PREFIX + " : buildPreparedStatementForGivenCriteria",
                        "Failed to build prepared statement due to invalid input for criteria type");
            }

            return statement;
        };

        /**
         * Method to validate the options
         *
         * @param options contains primary key(s), whereConditionAsAMap and whereConditionAsAString
         * @return true, if validations are successful
         */
        KSBaseORMManager.prototype.areOptionsValid = function (options) {
            //Validating whereCondition
            if (this.isWhereConditionValid(options)) {
                voltmx.sdk.logsdk.info(LOG_PREFIX + " : areOptionsValid", "WhereCondition validation is successful");
            }

            //Check for primaryKeys key in Options Map
            var primaryKeys = options[KSPublicConstants.CRUD_OPTION_PRIMARY_KEYS];
            if (voltmx.sdk.isNullOrUndefined(primaryKeys)) {
                voltmx.sdk.logsdk.warn(LOG_PREFIX + " : areOptionsValid", "Primary keys supplied through options are null.");
            } else {
                //Validate the size of the primaryKeys Map
                if (Object.keys(primaryKeys).length === 0) {
                    voltmx.sdk.logsdk.error(LOG_PREFIX + " : areOptionsValid", "Primary keys supplied through options are empty.");
                    throw new KSError(KSErrorConstants.CRUD_NULL_OR_EMPTY_PRIMARY_KEY_VALUE);
                }

                //Validating primaryKeys
                if (KSOptionsHelper.arePrimaryKeysValid(options)) {
                    voltmx.sdk.logsdk.info(LOG_PREFIX + " : areOptionsValid", "PrimaryKeys validation is successful");
                }
            }

            return true;
        };

        /**
         * Method to set criteria from primary key(s), whereConditionAsAMap, whereConditionAsAString
         * in the given priority.
         *
         * @param options contain primary key(s) and criteria
         */
        KSBaseORMManager.prototype.setCriteriaInOptions = function (options) {
            if (options.hasOwnProperty(KSPublicConstants.CRUD_OPTION_PRIMARY_KEYS)) {
                options[KSCRUDConstants.CRUD_OPTION_CRITERIA] = KSCriteria.PRIMARY_KEYS;
                voltmx.sdk.logsdk.debug(LOG_PREFIX + " : setCriteriaInOptions",
                    "Considering CRUD_OPTION_PRIMARY_KEYS as criteria to update. " +
                    "Ignoring the whereCondition and whereConditionAsAString (if provided any).");

            } else if (options.hasOwnProperty(KSPublicConstants.CRUD_OPTION_WHERE_CONDITION)) {
                options[KSCRUDConstants.CRUD_OPTION_CRITERIA] = KSCriteria.WHERE_CONDITION_AS_A_MAP;
                voltmx.sdk.logsdk.debug(LOG_PREFIX + " : setCriteriaInOptions",
                    "Considering CRUD_OPTION_WHERE_CONDITION as criteria to update. " +
                    "Ignoring the whereConditionAsAString (if provided any).");

            } else if (options.hasOwnProperty(KSPublicConstants.CRUD_OPTION_WHERE_CONDITION_AS_A_STRING)) {
                options[KSCRUDConstants.CRUD_OPTION_CRITERIA] = KSCriteria.WHERE_CONDITION_AS_A_STRING;
                voltmx.sdk.logsdk.debug(LOG_PREFIX + " : setCriteriaInOptions",
                    "Considering CRUD_OPTION_WHERE_CONDITION_AS_A_STRING as criteria to update.");

            } else {
                options[KSCRUDConstants.CRUD_OPTION_CRITERIA] = KSCriteria.NONE;
                voltmx.sdk.logsdk.debug(LOG_PREFIX + " : setCriteriaInOptions",
                    "No criteria provided to update record(s).");
            }
        };

        /**
         * Helper method to clone options which handles the cloning of metadata that contains cyclic dependencies.
         *
         * @param options object to be cloned
         * @returns {*} a cloned object
         */
        KSBaseORMManager.prototype.cloneOptions = function (options) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + " : cloneOptions", "Start.");

            var metadata = options[KSInternalConstants.OBJECT_METADATA];
            delete options[KSInternalConstants.OBJECT_METADATA];

            var clonedObject = voltmx.sdk.cloneObject(options);
            clonedObject[KSInternalConstants.OBJECT_METADATA] = metadata;

            options[KSInternalConstants.OBJECT_METADATA] = metadata;

            return clonedObject;
        };

        /**
         * Method to fetch PKs for a given record from its metadata
         *
         * @param metadata the metadata of the object
         * @param recordInMainTable an record in the table
         */
        KSBaseORMManager.prototype.getPrimaryKeyValuesFromDBRecord = function (metadata, recordInMainTable) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + " : getPrimaryKeyValuesFromDBRecord", "Start.");

            var primaryKeys = metadata[KSInternalConstants.OBJECTS_PRIMARY_KEYS];
            var primaryKeyValueMap = {};
            for (var key in primaryKeys) {
                primaryKeyValueMap[key] = recordInMainTable[key];
            }

            return primaryKeyValueMap;
        }

        /**
         * Method to fetch existing records from Main table
         *
         * @param sdkRecord sdkRecord
         * @param options   contains the criteria to fetch the records
         * @returns {Promise<void>} List of existing records
         */
        KSBaseORMManager.prototype.getExistingRecordsFromMainTable = async function (sdkRecord, options) {
            var fullyQualifiedName = sdkRecord.getParentObject().getFullyQualifiedName();
            var recordsFromMainTable = await this.getRecordsByCriteria(options, fullyQualifiedName);

            if (KSCommonUtils.isNullOrEmptyObject(recordsFromMainTable)) {
                var errorMessage = "There is no record in the database with the given criteria.";
                voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                throw new KSError(KSErrorConstants.CRUD_RECORD_NOT_IN_MAIN_TABLE);
            }

            return recordsFromMainTable;
        }

        /**
         * Method to fetch columns names given metadata.
         * @param metadata the object metadata
         * @returns {string[]} An array of column names
         */
        KSBaseORMManager.prototype.getColumnNamesFromMetadata = function (metadata) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "getColumnNamesFromMetadata : ", "Start");

            return Object.keys(metadata[KSInternalConstants.ATTRIBUTES]);
        };

        /**
         * Method to create KSSDKObjectRecord out of a list of data maps.
         *
         * @param listOfDataMaps List of maps containing data
         * @param parentObject   sdkObject to which the record is associated with
         * @returns {KSSDKObjectRecord.KSSDKObjectRecord}
         */
        KSBaseORMManager.prototype.createSDKRecordFromDataMaps = function (listOfDataMaps, parentObject) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "createSDKRecordFromDataMaps : ", "Start");

            if (!voltmx.sdk.isEmptyObject(listOfDataMaps)) {
                var mapOfKeyValues = {};
                var dataMapsCount = listOfDataMaps.length;
                for (var index = 0; index < dataMapsCount; index++) {
                    var map = listOfDataMaps[index];
                    KSCommonUtils.mergeTwoJSONMaps(mapOfKeyValues, map);
                }

                return new KSSDKObjectRecord(mapOfKeyValues, parentObject);
            }
        };

        /**
         * Method to retrieve VoltmxSyncChangeType, LastReplaySequenceNumber and UploadSessionNumber
         *
         * @param sdkRecord KSSDKObjectRecord for which the metainfo is to be retrieved
         * @returns {Promise<void>} Map containing VoltmxSyncChangeType, LastReplaySequenceNumber and UploadSessionNumber
         */
        KSBaseORMManager.prototype.getCommonMetaInfo = async function (sdkRecord) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "getCommonMetaInfo : ", "Start");

            var metaInfo = {};
            metaInfo[KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE] = sdkRecord.getAction();

            var objectService = KSSDKObjectService.getInstanceByName(sdkRecord.getParentObject().getObjectServiceName());
            var syncMetaInfo = await objectService.getSyncMetaInfo();

            var replaySequenceNumber = await syncMetaInfo.getReplaySequenceNumber();
            metaInfo[KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER] = replaySequenceNumber;

            var uploadSessionNumber = syncMetaInfo.getUploadSyncVersionNumber();
            metaInfo[KSDatabaseConstants.UPLOAD_SESSION_NO] = uploadSessionNumber;

            return metaInfo;
        };

        /**
         * Method to create an insert prepared statement given a KSSDKObjectRecord and tableName
         *
         * @param sdkRecord KSSDKObjectRecord containing data to the persisted
         * @param tableName Name of the table
         * @returns {*} Insert prepared statement
         */
        KSBaseORMManager.prototype.getInsertPreparedStatement = function (sdkRecord, tableName) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "getInsertPreparedStatement : ", "Start");

            return KSQueryObjectBuilder.getQueryObjectForTableName(tableName, KSDatabaseOperation.INSERT)
                .addInsertValues(sdkRecord.getData())
                .build();
        };

        /**
         * Validates whether the data in the record is valid or not according to metadata
         *
         * @param sdkRecord in which data has to be validated
         * @return true if data is valid else false
         * @throws OfflineObjectsException
         */
        KSBaseORMManager.prototype.isRecordDataValid = function (sdkRecord) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "isRecordDataValid : ", "Start");
            var data = sdkRecord.getData();
            var metadata = sdkRecord.getParentObject().getMetadata();
            var errorMessage;

            for (var key in data) {
                if (!metadata[KSInternalConstants.ATTRIBUTES].hasOwnProperty(key)) {
                    errorMessage = "There is no attribute with name " + key;
                    voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                    throw new KSError(KSErrorConstants.CRUD_INVALID_ATTRIBUTE, errorMessage);
                }

                var objectAttribute = metadata[KSInternalConstants.ATTRIBUTES][key];
                var value = sdkRecord.objectForKey(key);

                if (voltmx.sdk.isNullOrUndefined(value)) {

                    if (!objectAttribute[KSInternalConstants.ATTRIBUTES_NULLABLE]) {
                        errorMessage = "Mandatory field " + key + " cannot have an empty or null value.";
                        voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                        throw new KSError(KSErrorConstants.CRUD_MANDATORY_COLUMNS_MISSING, errorMessage);
                    }
                    continue;
                }

                KSOptionsHelper.isValidAttribute(objectAttribute, value);
            }

            return true;
        }

        /**
         * Validates referential integrity of sdk object
         *
         * @param sdkObjectRecord record for which referential integrity constraint has to be validated
         * @param existingRecord  record in local database, in case of update operation
         * @return {boolean} true on validation success else false
         */
        KSBaseORMManager.prototype.isReferentialIntegrityValid = async function (sdkObjectRecord, existingRecord) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "isReferentialIntegrityValid : ", "Start");

            var metadata = sdkObjectRecord.getParentObject().getMetadata();
            voltmx.sdk.logsdk.debug(LOG_PREFIX, "Validating SDK object record " + JSON.stringify(sdkObjectRecord.getData()));

            var relationships = metadata[KSInternalConstants.OBJECTS_PARENT_RELATIONSHIPS];
            voltmx.sdk.logsdk.debug(LOG_PREFIX, "Parent relationships count " + Object.keys(relationships).length);

            var parentObjectAttributes = [];
            var childObjectAttributes = [];

            //Checking for parent relationships
            for (var index = 0; index < relationships.length; index++) {
                var relationship = relationships[index];
                var parentObjectMetadata = null;
                if (relationship[KSInternalConstants.RELATIONSHIP_TYPE] === KSRelationshipTypes.ONE_TO_MANY) {
                    parentObjectMetadata = relationship[KSInternalConstants.RELATIONSHIP_SOURCE_OBJECT];
                    parentObjectAttributes = relationship[KSInternalConstants.RELATIONSHIP_SOURCE_ATTRIBUTES];
                    childObjectAttributes = relationship[KSInternalConstants.RELATIONSHIP_TARGET_ATTRIBUTES];
                } else if (relationship[KSInternalConstants.RELATIONSHIP_TYPE] === KSRelationshipTypes.MANY_TO_ONE) {
                    parentObjectMetadata = relationship[KSInternalConstants.RELATIONSHIP_TARGET_OBJECT];
                    parentObjectAttributes = relationship[KSInternalConstants.RELATIONSHIP_TARGET_ATTRIBUTES];
                    childObjectAttributes = relationship[KSInternalConstants.RELATIONSHIP_SOURCE_ATTRIBUTES];
                }

                if (areAllNullableForeignKeyValuesAreNull(childObjectAttributes, sdkObjectRecord)) {
                    var columnNames = '';
                    Object.keys(childObjectAttributes).forEach(function (index) {
                        columnNames += childObjectAttributes[index][KSInternalConstants.ATTRIBUTES_NAME] + ", ";
                    });

                    voltmx.sdk.logsdk.warn(LOG_PREFIX, "All the child object attributes " + columnNames +
                        " are nullable and their respective values are null in the record " + JSON.stringify(sdkObjectRecord.getData()));
                    continue;
                }

                var sdkRecordToValidate = sdkObjectRecord;

                if (sdkObjectRecord.getAction() === KSSDKObjectRecordAction.UPDATE || sdkObjectRecord.getAction() === KSSDKObjectRecordAction.PARTIAL_UPDATE) {
                    if (!(await this.areForeignKeyValuesUpdated(sdkObjectRecord, childObjectAttributes))) {
                        continue;
                    }
                    if (!areAllForeignKeyValuesSentForUpdate(sdkObjectRecord, childObjectAttributes)) {
                        sdkRecordToValidate = addForeignKeysToSDKRecord(sdkObjectRecord, existingRecord);
                    }
                }

                var results = await this.getRelatedRecordsForGivenRecord(sdkRecordToValidate, parentObjectMetadata, parentObjectAttributes, childObjectAttributes);

                if (KSCommonUtils.isNullOrEmptyObject(results)) {
                    var keys = '';
                    Object.keys(childObjectAttributes).forEach(function (index) {
                        var columnName = childObjectAttributes[index][KSInternalConstants.ATTRIBUTES_NAME];
                        keys += (columnName + " = " + sdkObjectRecord.getData()[columnName] + ", ");
                    });

                    var errorMessage = "There are no records in parent table " + parentObjectMetadata[KSInternalConstants.OBJECTS_NAME] +
                        " with key(s) " + keys;
                    voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                    throw new KSError(KSErrorConstants.CRUD_REFERENTIAL_INTEGRITY_VIOLATION, errorMessage);
                }

            }

            voltmx.sdk.logsdk.debug(LOG_PREFIX, "The referential integrity for object record " + JSON.stringify(sdkObjectRecord.getData()) + " is valid.");
            return true;
        };

        /**
         * validates whereCondition in the given options
         * @param options JSON containing the primaryKeysMap, whereConditionMap etc
         * @returns {boolean} true on validation successful else false
         */
        KSBaseORMManager.prototype.isWhereConditionValid = function(options) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "Start.");

            var errorMessage;
            if (options.hasOwnProperty(KSPublicConstants.CRUD_OPTION_WHERE_CONDITION)) {
                var whereConditionMap = options[KSPublicConstants.CRUD_OPTION_WHERE_CONDITION];

                //Check if whereCondition is passed as null
                if (voltmx.sdk.isNullOrUndefined(whereConditionMap)) {
                    errorMessage = "The given input for where clause is either null or undefined.";
                    voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                    throw new KSError(KSErrorConstants.CRUD_INVALID_OPTIONS, errorMessage);
                }

                if (KSCommonUtils.isInstanceOfMap(whereConditionMap)) {
                    var metadata = options[KSInternalConstants.OBJECT_METADATA];
                    for (var key in whereConditionMap) {
                        if (whereConditionMap.hasOwnProperty(key)) {
                            var attribute = metadata[KSInternalConstants.ATTRIBUTES][key];
                            if (voltmx.sdk.isNullOrUndefined(attribute)) {
                                errorMessage =  "The given column name " + key + " in the where clause is invalid";
                                voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                                throw new KSError(KSErrorConstants.CRUD_INVALID_OPTIONS, errorMessage);
                            }
                            KSOptionsHelper.isValidAttribute(attribute, whereConditionMap[key]);
                        }
                    }
                } else {
                    errorMessage = "whereCondition should be of type map";
                    voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                    throw new KSError(KSErrorConstants.CRUD_INVALID_OPTIONS, errorMessage);
                }
            }

            if (options.hasOwnProperty(KSPublicConstants.CRUD_OPTION_WHERE_CONDITION_AS_A_STRING)) {
                var whereConditionAsAString = options[KSPublicConstants.CRUD_OPTION_WHERE_CONDITION_AS_A_STRING];

                if (typeof whereConditionAsAString !== KSDatabaseConstants.KSDataTypes.STRING) {
                    errorMessage = "The given input for WhereConditionAsAString is not of type string";
                    voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                    throw new KSError(KSErrorConstants.CRUD_INVALID_OPTIONS, errorMessage);
                }
            }

            return true;
        };

        KSBaseORMManager.prototype.getRelatedRecordsForGivenRecord = async function (sdkRecord, targetObjectMetadata, targetObjectAttributes, sourceObjectAttributes) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "getRelatedRecordsForGivenRecord : ", "Start");
            var foreignKeyValueMap = {};
            var length = sourceObjectAttributes.length;

            for (var index = 0; index < length; index++) {
                var sourceAttributeName = sourceObjectAttributes[index][KSInternalConstants.ATTRIBUTES_NAME];
                if (sdkRecord.getData().hasOwnProperty(sourceAttributeName)) {
                    var attributeValue = sdkRecord.objectForKey(sourceAttributeName);
                    var targetAttributeName = targetObjectAttributes[index][KSInternalConstants.ATTRIBUTES_NAME];
                    foreignKeyValueMap[targetAttributeName] = attributeValue;
                }
            }

            var records = await KSSyncDatabaseHelper.buildAndExecutePreparedStatementsOfTypeRead(targetObjectMetadata[KSInternalConstants.OBJECTS_NAME],
                KSTableType.MAIN, foreignKeyValueMap);
            return records;
        }

        /**
         * Validates if Change Tracking Options are valid
         * Also, checks for the mutually exclusive set of options.
         *
         * @param options the options
         * @return boolean true, if the options are valid
         */
        KSBaseORMManager.prototype.areChangeTrackingOptionsValid = function (options) {
            if (!KSCommonUtils.isNullOrEmptyObject(options)) {

                areProvidedOptionsMutuallyExclusive(options);

                if (KSOptionsHelper.isValidBoolTypeOption(options, KSPublicConstants.TRACK_CHANGES)) {
                    voltmx.sdk.logsdk.info(LOG_PREFIX + " areChangeTrackingOptionsValid: ", "The flag " + KSPublicConstants.TRACK_CHANGES
                        + "is set for the record");
                }

                if (KSOptionsHelper.isValidBoolTypeOption(options, KSPublicConstants.TRACK_INTERMEDIATE_UPDATES)) {
                    voltmx.sdk.logsdk.info(LOG_PREFIX + " areChangeTrackingOptionsValid: ", "The flag " + KSPublicConstants.TRACK_INTERMEDIATE_UPDATES
                        + "is set for the record");
                }

                if (KSOptionsHelper.isValidBoolTypeOption(options, KSPublicConstants.MARK_FOR_UPLOAD)) {
                    voltmx.sdk.logsdk.info(LOG_PREFIX + " areChangeTrackingOptionsValid: ", "The flag " + KSPublicConstants.MARK_FOR_UPLOAD
                        + "is set for the record");
                }
            }
            return true;
        }

        /**
         * Validate if the given change tracking options are mutually exclusive
         *
         * @param options the change tracking options
         */
        function areProvidedOptionsMutuallyExclusive(options) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "areProvidedOptionsMutuallyExclusive : ", "Start");
            var isValid = true;
            var errorMsg = "";

            if (options.hasOwnProperty(KSPublicConstants.TRACK_CHANGES)) {
                if (options.hasOwnProperty(KSPublicConstants.TRACK_INTERMEDIATE_UPDATES)) {
                    errorMsg = "Provide either \"trackChanges\" or \"trackIntermediateChanges\" in options. ";
                    voltmx.sdk.logsdk.error(LOG_PREFIX + " areProvidedOptionsMutuallyExclusive: ", errorMsg);
                    isValid = false;
                }

                if (options.hasOwnProperty(KSPublicConstants.MARK_FOR_UPLOAD)) {
                    errorMsg = errorMsg.concat("Provide either \"trackChanges\" or \"markForUpload\" in options. ");
                    voltmx.sdk.logsdk.error(LOG_PREFIX + " areProvidedOptionsMutuallyExclusive: ", errorMsg);
                    isValid = false;
                }

                if (!isValid) {
                    throw new KSError(KSErrorConstants.CRUD_MUTUALLY_EXCLUSIVE_OPTIONS_USED, errorMsg);
                }
            }
        }

        /**
         * Checks whether foreignKeys in the given record are updated or not
         *
         * @param record                 which is to be verified
         * @param foreignKeyAttributes foreign key attributes
         * @return true/false (true if foreign keys are updated else false)
         */
        KSBaseORMManager.prototype.areForeignKeyValuesUpdated = async function (record, foreignKeyAttributes) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "areForeignKeyValuesUpdated : ", "Checking if the foreign keys are updated.");
            var whereConditionMap = {};
            var sdkObject = record.getParentObject();
            var length = foreignKeyAttributes.length;

            for (var index = 0; index < length; index++) {
                var attributeName = foreignKeyAttributes[index][KSInternalConstants.ATTRIBUTES_NAME];
                if (record.getData().hasOwnProperty(attributeName)) {
                    //Adding FK Column to whereCondition
                    whereConditionMap[attributeName] = record.objectForKey(attributeName);
                }
            }

            if (KSCommonUtils.isNullOrEmptyObject(whereConditionMap)) {
                return false;
            }

            var primaryKeyValueMap = record.getPrimaryKeyValueMapOfRecord(sdkObject.getPrimaryKeys());
            KSCommonUtils.mergeTwoJSONMaps(whereConditionMap, primaryKeyValueMap);

            var records = await KSSyncDatabaseHelper.buildAndExecutePreparedStatementsOfTypeRead(sdkObject.getFullyQualifiedName(),
                KSTableType.MAIN, whereConditionMap, null);

            return KSCommonUtils.isNullOrEmptyObject(records);
        }

        /**
         * Checks the markForUpload flag from options and tells whether
         * the sdk record to be deferred for upload or not
         *
         * @param options containing markForUpload flag
         * @return boolean true if the record is to be deferred else false
         */
        KSBaseORMManager.prototype.isSDKRecordToBeDeferredFromUpload = function (options) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "isSDKRecordToBeDeferredFromUpload : ", "with options " + options);
            var deferFromUpload = false;
            if (!KSCommonUtils.isNullOrEmptyObject(options)) {
                if (options.hasOwnProperty(KSPublicConstants.MARK_FOR_UPLOAD)) {
                    var markForUpload = options[KSPublicConstants.MARK_FOR_UPLOAD];
                    if (!voltmx.sdk.isNullOrUndefined(markForUpload) && typeof markForUpload === KSInternalConstants.DATA_TYPE_BOOLEAN) {
                        deferFromUpload = !markForUpload;
                    }
                }
                voltmx.sdk.logsdk.trace(LOG_PREFIX + "isSDKRecordToBeDeferredFromUpload : ", deferFromUpload.toString());
            }
            return deferFromUpload;
        }

        /**
         * Check if previous record bearing the primary keys is not deferred
         *
         * @param sdkRecord record which is to be verified if deferred
         * @return true if record already deferred from upload else false
         */
        KSBaseORMManager.prototype.checkIfRecordIsAlreadyDeferredFromUpload = async function (sdkRecord) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "checkIfRecordIsAlreadyDeferredFromUpload for sdk record : ", "Start");
            var isValid = false;
            var query;
            var primaryKeyValueMapOfRecord = sdkRecord.getPrimaryKeyValueMapOfRecord(sdkRecord.getParentObject().getPrimaryKeys());

            if (Object.keys(primaryKeyValueMapOfRecord).length > 0) {

                var whereConditionForDeferredRecords = KSMarkForUploadUtils.buildWhereConditionForDeferredRecords(primaryKeyValueMapOfRecord);

                var tableName = KSSQLQueryGenerator.getTableNameWithType(sdkRecord.getParentObject().getFullyQualifiedName(), KSTableType.HISTORY);
                var statementBuilder = KSQueryObjectBuilder.getQueryObjectForTableName(tableName, KSDatabaseConstants.KSDatabaseOperations.SELECT);

                query = statementBuilder
                    .setWhereClause(whereConditionForDeferredRecords)
                    .build();

                var records = await KSDatabaseAPI.executeQuery(query);
                if (!KSCommonUtils.isNullOrEmptyObject(records)) {
                    isValid = true;
                    var errorMessage = "Non deferred operation is not allowed on this record";
                    voltmx.sdk.logsdk.error(LOG_PREFIX, "checkIfRecordIsAlreadyDeferredFromUpload" + errorMessage);
                    throw new KSError(KSErrorConstants.CRUD_INVALID_RECORD_OPERATION, errorMessage);
                }
            }

            return isValid;
        };

        /**
         * Marks the sdk record as deferred for upload
         *
         * @param sdkObjectRecord to be marked as deferred for upload
         */
        KSBaseORMManager.prototype.markSDKRecordAsDeferredFromUpload = function (sdkObjectRecord) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "markSDKRecordAsDeferredFromUpload for sdk record : ", "Start");
            switch (sdkObjectRecord.getAction()) {
                case KSSDKObjectRecordAction.CREATE :
                    voltmx.sdk.logsdk.trace(LOG_PREFIX, "Changing the sdk record create action to deferred create");
                    sdkObjectRecord.setAction(KSSDKObjectRecordAction.DEFERRED_CREATE);
                    break;
                case KSSDKObjectRecordAction.UPDATE :
                    voltmx.sdk.logsdk.trace(LOG_PREFIX, "Changing the sdk record update action to deferred update");
                    sdkObjectRecord.setAction(KSSDKObjectRecordAction.DEFERRED_UPDATE);
                    break;
                case KSSDKObjectRecordAction.DELETE :
                    voltmx.sdk.logsdk.trace(LOG_PREFIX, "Changing the sdk record delete action to deferred delete");
                    sdkObjectRecord.setAction(KSSDKObjectRecordAction.DEFERRED_DELETE);
                    break;
                default :
                    voltmx.sdk.logsdk.trace(LOG_PREFIX, "Sdk record action not supported for deferring");
                    break;
            }
        }


        /**
         * Checks whether all the source object attribute values are null
         *
         * @param foreignKeyAttributes source object attributes
         * @param sourceRecord           in which nullable types and values are validated
         * @return true/false (true if all types are nullable and values are null else false)
         */
        function areAllNullableForeignKeyValuesAreNull(foreignKeyAttributes, sourceRecord) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "areAllNullableForeignKeyValuesAreNull : ", "Checking if all the foreign key attributes are nullable and their values are null.");
            var allTypesAndValuesNullable = true;
            for (var index = 0; index < foreignKeyAttributes.length; index++) {
                var objectAttribute = foreignKeyAttributes[index];
                var columnName = objectAttribute[KSInternalConstants.ATTRIBUTES_NAME];
                if (!objectAttribute[KSInternalConstants.ATTRIBUTES_NULLABLE] || !voltmx.sdk.isNullOrUndefined(sourceRecord.objectForKey(columnName))) {
                    allTypesAndValuesNullable = false;
                    break;
                }
            }

            voltmx.sdk.logsdk.debug(LOG_PREFIX, "Are all foreign keys are nullable and their values null: " + allTypesAndValuesNullable);
            return allTypesAndValuesNullable;
        }

        /**
         * Checks whether all foreignKeys are sent for update
         *
         * @param record                 which has to be validated
         * @param foreignKeyAttributes foreign key attributes
         * @return true/false(true if all foreign keys are sent for update else false)
         */
        function areAllForeignKeyValuesSentForUpdate(record, foreignKeyAttributes) {
            var recordData = record.getData();
            for (var index = 0; index < foreignKeyAttributes.length; index++) {
                var attributeName = foreignKeyAttributes[index][KSInternalConstants.ATTRIBUTES_NAME];
                if (!recordData.hasOwnProperty(attributeName)) {
                    return false;
                }
            }

            return true;
        }

        /**
         * Adds ForeignKey Value pairs to given record from existing record
         *
         * @param sdkRecord      to which foreign Keys have to be added
         * @param existingRecord from which foreign keys have to be added
         * @return sdkRecord which contains all foreignKey value pairs
         */
        function addForeignKeysToSDKRecord(sdkRecord, existingRecord) {
            var data = {};
            KSCommonUtils.mergeTwoJSONMaps(data, existingRecord.getData());
            KSCommonUtils.mergeTwoJSONMaps(data, sdkRecord.getData());

            return new KSSDKObjectRecord(data, sdkRecord.getParentObject());
        }

        exports.KSBaseORMManager = KSBaseORMManager;
    });
/**
 * Create ORMManager
 * Created by Haritha Kintali on 30-05-2018.
 * Copyright © 2017 Kony. All rights reserved.
 */
define("KSCreateORMManager", ["exports", "KSBaseORMManager", "KSDatabaseAPI", "KSCommonUtils", "KSSQLQueryGenerator", "KSOptionsHelper", "KSError"],
    function (exports, KSBaseORMManager, _KSDatabaseAPI, KSCommonUtils, KSSQLQueryGenerator, KSOptionsHelper, _KSError) {

        "use strict";

        function KSCreateORMManager() {
        }

        __extends(KSCreateORMManager, KSBaseORMManager.KSBaseORMManager);

        var instance = null;
        var KSError = _KSError.KSError;
        var LOG_PREFIX = "KSCreateORMManager : ";
        var KSDatabaseAPI = _KSDatabaseAPI.KSDatabaseAPI;
        var KSCRUDConstants = voltmx.sdk.OfflineObjects.KSCRUDConstants;
        var KSErrorConstants = voltmx.sdk.OfflineObjects.KSErrorConstants;
        var KSPublicConstants = voltmx.sdk.OfflineObjects.KSPublicConstants;
        var KSDatabaseConstants = voltmx.sdk.OfflineObjects.KSDatabaseConstants;
        var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;

        /**
         * Gets an instance of KSCreateORMManager
         * @returns {*}
         */
        KSCreateORMManager.getInstance = function () {
            if (instance == null) {
                instance = new KSCreateORMManager();
            }
            return instance;
        };

        KSCreateORMManager.prototype.perform = async function (sdkRecord, options) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "perform : ", "Start.");

            if (instance.areChangeTrackingOptionsValid(options)) {
                voltmx.sdk.logsdk.info(LOG_PREFIX + "perform : ", "Change Tracking options validation is successful");
            }

            var isRecordToBeDeferred = instance.isSDKRecordToBeDeferredFromUpload(options);

            if (!KSOptionsHelper.skipValidation(options)) {
                if (await isSDKRecordValid(sdkRecord, isRecordToBeDeferred, options)) {
                    voltmx.sdk.logsdk.info(LOG_PREFIX, "Record validation is successful.");
                }
            }

            //if the record is not marked for upload, mark it as deferred
            if (isRecordToBeDeferred) {
                instance.markSDKRecordAsDeferredFromUpload(sdkRecord);
            }

            return (await performDBOperation(sdkRecord, options));
        };

        /**
         * Method to build and execute queries on the DB
         *
         * @param sdkRecord SDKObjectRecord containing insertColumns
         * @param options   The crud options
         * @returns {Promise<*>} Created record
         */
        async function performDBOperation(sdkRecord, options) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "performDBOperation : ", "Start.");

            var sdkObject = sdkRecord.getParentObject();
            var metadata = sdkObject.getMetadata();
            var primaryKeys = metadata[KSInternalConstants.OBJECTS_PRIMARY_KEYS];
            var trackChanges = KSOptionsHelper.getOptionValueOrDefaultForGivenKey(options, KSPublicConstants.TRACK_CHANGES,
                KSCRUDConstants.DEFAULT_VALUE_FOR_TRACK_CHANGES);
            for (var primaryKey in primaryKeys) {
                if (primaryKeys[primaryKey][KSInternalConstants.ATTRIBUTES_AUTO_GENERATED] &&
                    (trackChanges || voltmx.sdk.isNullOrUndefined(sdkRecord.objectForKey(primaryKey)))) {
                    var lastGeneratedId = await instance.getLastGeneratedIDForObjectService(metadata[KSInternalConstants.OBJECT_SERVICE_NAME]);
                    if (primaryKeys[primaryKey][KSInternalConstants.ATTRIBUTES_DATATYPE] == "string") {
                        lastGeneratedId = lastGeneratedId.toString();
                    }
                    sdkRecord.setObjectForKey(primaryKey, lastGeneratedId);
                }
            }

            var statements = await buildPreparedStatements(sdkRecord, options, null);
            var tables = KSSQLQueryGenerator.getAllTableNames(sdkObject.getFullyQualifiedName());
            await KSDatabaseAPI.executeQueriesAsTransaction(statements, tables);

            var primaryKeyValueMap = sdkRecord.getPrimaryKeyValueMapOfRecord(sdkObject.getPrimaryKeys());
            var recordCreated = await instance.getRecordByPK(primaryKeyValueMap, sdkObject.getFullyQualifiedName());

            KSCommonUtils.removeUnwantedColumns(metadata, recordCreated);

            return recordCreated;
        }

        /**
         * Method to build prepared statements for Main, Original and History table
         *
         * @param sdkRecord         SDKObjectRecord containing insertColumns
         * @param options           The crud options
         * @param recordInMainTable Map depicting the record fetched from Main table
         * @returns {Promise<Array>} An array of prepared statements for Main, Original and History table
         */
        async function buildPreparedStatements(sdkRecord, options, recordInMainTable) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "buildPreparedStatements : ", "Start.");

            var changeTypeMap = {};
            changeTypeMap[KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE] = KSCommonUtils.getBaseORMActionFromRecordActionCode(sdkRecord.getAction());

            var listOfDataMaps = [];
            listOfDataMaps.push(sdkRecord.getData());
            listOfDataMaps.push(changeTypeMap);

            var sdkObject = sdkRecord.getParentObject();
            var sdkRecordForBuilder = instance.createSDKRecordFromDataMaps(listOfDataMaps, sdkObject);
            var primaryKeyValueMap = sdkRecordForBuilder.getPrimaryKeyValueMapOfRecord(sdkObject.getPrimaryKeys());

            var optionsForOriginalTable = {};
            optionsForOriginalTable[KSPublicConstants.CRUD_OPTION_PRIMARY_KEYS] = primaryKeyValueMap;

            //Build prepared statement for Original table
            var statement = await instance.buildPreparedStatementForOriginalTable(sdkRecordForBuilder, optionsForOriginalTable);

            var statements = [];
            if (!voltmx.sdk.isNullOrUndefined(statement)) {
                statements.push(statement);
            }

            //Build prepared statement for Main table
            statements.push(buildPreparedStatementForMainTable(sdkRecord, options));

            var isTrackChangesEnabled = KSOptionsHelper.getOptionValueOrDefaultForGivenKey(options, KSPublicConstants.TRACK_CHANGES,
                KSCRUDConstants.DEFAULT_VALUE_FOR_TRACK_CHANGES);

            if (isTrackChangesEnabled) {
                var metaInfo = await instance.getCommonMetaInfo(sdkRecord);

                KSCommonUtils.clearJSONObject(listOfDataMaps);
                listOfDataMaps.push(sdkRecord.getData());
                listOfDataMaps.push(metaInfo);

                sdkRecordForBuilder = instance.createSDKRecordFromDataMaps(listOfDataMaps, sdkObject);

                //Build prepared statement for History table
                statements.push(instance.buildPreparedStatementForHistoryTable(sdkRecordForBuilder));
            }

            return statements;
        }

        /**
         * Method to build an insert prepared statement for Main table
         *
         * @param sdkRecord SDKObjectRecord containing insertColumns
         * @return Create prepared statement
         */
        function buildPreparedStatementForMainTable(sdkRecord) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "buildPreparedStatementForMainTable : ", "Start.");

            var tableName = sdkRecord.getParentObject().getFullyQualifiedName();
            return instance.getInsertPreparedStatement(sdkRecord, tableName);
        }


        /**
         * Method to validate the given sdkRecord
         *
         * @param sdkRecord SDKObjectRecord containing data to the persisted
         * @param isRecordToBeDeferred flag for sdk record to be deferred
         * @param options The crud options
         * @returns {boolean} true if valid, false otherwise
         */
        async function isSDKRecordValid(sdkRecord, isRecordToBeDeferred, options) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "isSDKRecordValid : ", "Start.");
            var data = sdkRecord.getData();
            var metadata = sdkRecord.getParentObject().getMetadata();

            //Check if record is empty
            if (KSCommonUtils.isNullOrEmptyObject(data)) {
                var errorMessage = "SDK object record is either null or empty";
                voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                throw new KSError(KSErrorConstants.CRUD_NULL_SDKRECORD, errorMessage);
            }

            //Validating sdk object record mandatory fields
            if (validateNonNullableAndAutogeneratedAttributesInRecord(sdkRecord, options)) {
                voltmx.sdk.logsdk.info(LOG_PREFIX, "The validation for non nullable and autogenerated attributes is successful");
            }

            //Validating sdk record object datatypes
            if (instance.isRecordDataValid(sdkRecord)) {
                voltmx.sdk.logsdk.info(LOG_PREFIX, "The data validation for the given record is successful");
            }

            //Check for integrity constraint violation in relationships
            if (!KSCommonUtils.isNullOrEmptyObject(metadata[KSInternalConstants.OBJECTS_PARENT_RELATIONSHIPS])) {
                if (await instance.isReferentialIntegrityValid(sdkRecord, null)) {
                    voltmx.sdk.logsdk.info(LOG_PREFIX, "The foreignKey constraints are satisfied");
                }
            }

            if (!isRecordToBeDeferred &&  !(await instance.checkIfRecordIsAlreadyDeferredFromUpload(sdkRecord))) {
                voltmx.sdk.logsdk.info(LOG_PREFIX, "isSDKRecordValid :" + "Record does not have any previous deferred action history. Hence valid");
            }

            return true;
        }

        /**
         * @param sdkRecord in which whether all nonNullable Attributes are present has to be checked
         * @return true if all nonNullable Attributes are present else false
         * @throws OfflineObjectsException
         */
        function validateNonNullableAndAutogeneratedAttributesInRecord(sdkRecord, options) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "validateNonNullableAndAutogeneratedAttributesInRecord : ", "Start.");
            var metadata = sdkRecord.getParentObject().getMetadata();
            var nonNullableAttributes = metadata[KSInternalConstants.OBJECTS_NON_NULLABLE_ATTRIBUTES];
            var trackChanges = KSOptionsHelper.getOptionValueOrDefaultForGivenKey(options, KSPublicConstants.TRACK_CHANGES,
                KSCRUDConstants.DEFAULT_VALUE_FOR_TRACK_CHANGES);
            for (var key in nonNullableAttributes) {
                var objectAttribute = nonNullableAttributes[key];
                var name = objectAttribute[KSInternalConstants.OBJECTS_NAME];
                var errorMessage;
                if (KSCommonUtils.isNullOrEmptyObject(sdkRecord.objectForKey(name))) {
                    if (!objectAttribute[KSInternalConstants.ATTRIBUTES_AUTO_GENERATED]) {
                        errorMessage = "Value should not be null for a non-nullable attribute " + name;
                        voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                        throw new KSError(KSErrorConstants.CRUD_MANDATORY_COLUMNS_MISSING, errorMessage);
                    }
                } else if (objectAttribute[KSInternalConstants.ATTRIBUTES_AUTO_GENERATED] && trackChanges) {
                    errorMessage = "Value should not be provided for an auto-generated column " + name;
                    voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                    throw new KSError(KSErrorConstants.CRUD_VALUE_SENT_FOR_AUTOGENERATED_COLUMN, errorMessage);
                }
            }

            return true;
        }

        exports.getInstance = KSCreateORMManager.getInstance;
    });



/**
 * Delete ORMManager
 * Created by Haritha Kintali on 30-05-2018.
 * Copyright © 2018 Kony. All rights reserved.
 */
define("KSDeleteORMManager", ["exports", "KSBaseORMManager", "KSCommonUtils", "KSQueryObjectBuilder", "KSDatabaseAPI", "KSError", "KSSQLQueryGenerator", "KSOptionsHelper", "KSSDKObjectRecord"],
    function (exports, KSBaseORMManager, KSCommonUtils, KSQueryObjectBuilder, _KSDatabaseAPI, _KSError, KSSQLQueryGenerator, KSOptionsHelper, _KSSDKObjectRecord) {

        "use strict";
        var KSSDKObject = require("KSSDKObject");

        function KSDeleteORMManager() {
        }

        __extends(KSDeleteORMManager, KSBaseORMManager.KSBaseORMManager);

        var sdk = voltmx.sdk;
        var instance = null;
        var logger = sdk.logsdk;
        var KSError = _KSError.KSError;
        var LOG_PREFIX = "KSDeleteORMManager : ";
        var KSDatabaseAPI = _KSDatabaseAPI.KSDatabaseAPI;
        var KSCriteria = voltmx.sdk.OfflineObjects.KSCriteria;
        var KSSDKObjectRecord = _KSSDKObjectRecord.KSSDKObjectRecord;
        var KSCRUDConstants = voltmx.sdk.OfflineObjects.KSCRUDConstants;
        var KSErrorConstants = voltmx.sdk.OfflineObjects.KSErrorConstants;
        var KSPublicConstants = voltmx.sdk.OfflineObjects.KSPublicConstants;
        var KSDatabaseConstants = voltmx.sdk.OfflineObjects.KSDatabaseConstants;
        var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;
        var KSRelationshipTypes = KSInternalConstants.KSRelationshipTypes;
        var KSDatabaseOperation = KSDatabaseConstants.KSDatabaseOperations;

        /**
         * Gets an instance KSDeleteORMManager
         * @returns {*} An instance of the Delete ORM Manager.
         */
        KSDeleteORMManager.getInstance = function () {
            if (instance == null) {
                instance = new KSDeleteORMManager();
            }
            return instance;
        };

        KSDeleteORMManager.prototype.perform = async function (sdkRecord, options) {
            logger.trace(LOG_PREFIX + "perform : ", "Start.");

            if (instance.areChangeTrackingOptionsValid(options)) {
                voltmx.sdk.logsdk.info(LOG_PREFIX + "perform : ", "Change Tracking options validation is successful");
            }

            instance.setCriteriaInOptions(options);

            if (!KSOptionsHelper.skipValidation(options)) {
                var isDeleteByPK = options[KSCRUDConstants.CRUD_OPTION_IS_DELETE_BY_PK];
                var isRecordToBeDeferred = instance.isSDKRecordToBeDeferredFromUpload(options);

                if (isDeleteByPK) {
                    // Validates PK(s) and throws an exception if not provided, in case of deleteByPK
                    if (KSOptionsHelper.arePrimaryKeysSentInOptionsValid(options)) {
                        logger.info(LOG_PREFIX, "Options validation for deleteByPK is successful");
                    }
                } else {
                    // Validates PK(s), if any, in case of delete
                    if (instance.areOptionsValid(options)) {
                        logger.info(LOG_PREFIX + ":perform", "Options validation for delete is successful");
                    }
                }

                var optionsForValidation = instance.cloneOptions(options);
                if (await isSDKRecordValid(sdkRecord, isRecordToBeDeferred, optionsForValidation)) {
                    logger.info(LOG_PREFIX, "Record validation is successful");
                }

                // If the record is not marked for upload, mark it as deferred
                if (isRecordToBeDeferred) {
                    instance.markSDKRecordAsDeferredFromUpload(sdkRecord);
                }
            }

            return (await performDBOperation(sdkRecord, options));
        };

        /**
         * Performs DB related operations for Delete operation
         *
         * @param sdkRecord which contains parentObject
         * @param options contains primaryKeyValueMap of the record to be deleted
         * @returns {Promise<boolean>} returns true if delete is success else throws Exception
         */
        async function performDBOperation(sdkRecord, options) {
            logger.trace(LOG_PREFIX, "Start.");

            var fullyQualifiedName = sdkRecord.getParentObject().getFullyQualifiedName();

            var recordsInMainTable = await instance.getRecordsByCriteria(options, fullyQualifiedName);

            if (!voltmx.sdk.isEmptyObject(recordsInMainTable)) {
                var statements = await buildPreparedStatements(sdkRecord, options, recordsInMainTable);
                await KSDatabaseAPI.executeQueriesAsTransaction(statements);
                return true;
            } else {
                var errorMessage = "Error in fetching record(s) from main table.";
                logger.error(LOG_PREFIX, errorMessage);
                throw new KSError(KSErrorConstants.CRUD_RECORD_NOT_IN_MAIN_TABLE, errorMessage);
            }
        }

        async function buildStatementsForChildEntity(sdkRecord, childRelations, statements, options) {
            logger.trace(LOG_PREFIX, "Start.");

            var childRelationshipsCount = childRelations.length;
            for (var index = 0; index < childRelationshipsCount; index++) {
                var childRelation = childRelations[index];
                if (childRelation[KSInternalConstants.RELATIONSHIP_CASCADE]) {
                    var childObjectName = null;
                    if (childRelation[KSInternalConstants.RELATIONSHIP_TYPE] === KSRelationshipTypes.ONE_TO_MANY) {
                        childObjectName = childRelation[KSInternalConstants.RELATIONSHIP_TARGET_OBJECT][KSInternalConstants.NAME];

                    } else if (childRelation[KSInternalConstants.RELATIONSHIP_TYPE] === KSRelationshipTypes.MANY_TO_ONE) {
                        childObjectName = childRelation[KSInternalConstants.RELATIONSHIP_SOURCE_OBJECT][KSInternalConstants.NAME];
                    }

                    var sdkObject = new KSSDKObject.KSSDKObject(childObjectName);
                    var foreignKeyMap = getForeignKeyValueMapFromRelation(childRelation, sdkRecord);
                    await buildStatementsForCascadeDeleteOfChildRecords(sdkObject, foreignKeyMap, statements, options);
                } else {
                    var records = await fetchChildRecordsForRelationship(childRelation, sdkRecord);
                    if (records.length > 0) {
                        var errorMessage = "Cascade delete is false in the relation hierarchy." +
                            " Delete operation can't be performed on the object: " + sdkRecord.getMetadata().getFullyQualifiedName();
                        logger.error(LOG_PREFIX + errorMessage);
                        throw new KSError(KSErrorConstants.CRUD_REFERENTIAL_INTEGRITY_VIOLATION, errorMessage);
                    }
                }
            }
        }

        async function buildStatementsForCascadeDeleteOfChildRecords(sdkObject, fkMap, statements, crudOptions) {
            logger.trace(LOG_PREFIX, "Start.");

            var childRelationshipsList = sdkObject.getMetadata()[KSInternalConstants.OBJECTS_CHILD_RELATIONSHIPS];
            var queryObj = KSSQLQueryGenerator.buildPreparedStatementsOfTypeRead(sdkObject.name,
                voltmx.sdk.OfflineObjects.KSTableType.MAIN,
                fkMap);
            var childRecords = await KSDatabaseAPI.executeQuery(queryObj);
            if (childRecords !== null && childRecords.length > 0) {
                var childRecordsSize = childRecords.length;
                for (var index = 0; index < childRecordsSize; index++) {
                    var childRecord = childRecords[index];
                    var sdkRecord = new KSSDKObjectRecord(childRecord, sdkObject);
                    sdkRecord.setAction(voltmx.sdk.OfflineObjects.KSSDKObjectRecordAction.DELETE);
                    if (childRelationshipsList !== null && childRelationshipsList.length > 0) {
                        await buildStatementsForChildEntity(sdkRecord, childRelationshipsList, statements, crudOptions);
                    }

                    //Build sdkRecord for Original table
                    var changeTypeMap = {};
                    changeTypeMap[KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE] = sdkRecord.getAction();
                    var listOfDataMaps = {};
                    KSCommonUtils.mergeTwoJSONMaps(listOfDataMaps, childRecord);
                    KSCommonUtils.mergeTwoJSONMaps(listOfDataMaps, changeTypeMap);

                    var primaryKeysMap = sdkRecord.getPrimaryKeyValueMapOfRecord(sdkRecord.getParentObject().getPrimaryKeys());
                    var options = {};
                    options[KSPublicConstants.CRUD_OPTION_PRIMARY_KEYS] = primaryKeysMap;

                    var sdkRecordForBuilder = createSDKRecordFromDataMaps(listOfDataMaps, sdkRecord.getParentObject());
                    //Build statement for Original table
                    var statement = await instance.buildPreparedStatementForOriginalTable(sdkRecordForBuilder, options);
                    if (statement != null) {
                        statements.push(statement);
                    }

                    var isTrackChangesEnabled = KSOptionsHelper.getOptionValueOrDefaultForGivenKey(options, KSPublicConstants.TRACK_CHANGES,
                        KSCRUDConstants.DEFAULT_VALUE_FOR_TRACK_CHANGES);

                    if (isTrackChangesEnabled) {
                        //Build sdkRecord for History table
                        var metaInfo = await instance.getCommonMetaInfo(sdkRecord);
                        listOfDataMaps = {};
                        KSCommonUtils.mergeTwoJSONMaps(listOfDataMaps, childRecord);
                        KSCommonUtils.mergeTwoJSONMaps(listOfDataMaps, metaInfo);
                        var sdkRecordForBuilderForHistory = createSDKRecordFromDataMaps(listOfDataMaps, sdkRecord.getParentObject());
                        //Build statement for History table
                        statements.push(instance.buildPreparedStatementForHistoryTable(sdkRecordForBuilderForHistory));
                    }
                }

                var recordForDeletion = new KSSDKObjectRecord({}, sdkObject);
                var options = {};
                options[KSPublicConstants.CRUD_OPTION_WHERE_CONDITION] = fkMap;
                options[KSCRUDConstants.CRUD_OPTION_CRITERIA] = KSCriteria.WHERE_CONDITION_AS_A_MAP;
                statements.push(buildPreparedStatementForMainTable(recordForDeletion, options));
            }
        }

        function createSDKRecordFromDataMaps(listOfDataMaps, parentObject) {
            if (listOfDataMaps) {
                return new KSSDKObjectRecord(listOfDataMaps, parentObject);
            }
        }

        function getForeignKeyValueMapFromRelation(relationship, sdkRecord) {
            logger.trace(LOG_PREFIX, "Start.");

            var parentObjectAttributes = [];
            var childObjectAttributes = [];

            //Checking for child relationships
            if (relationship[KSInternalConstants.RELATIONSHIP_TYPE] === KSRelationshipTypes.ONE_TO_MANY) {
                parentObjectAttributes = relationship[KSInternalConstants.RELATIONSHIP_SOURCE_ATTRIBUTES];
                childObjectAttributes = relationship[KSInternalConstants.RELATIONSHIP_TARGET_ATTRIBUTES];
            } else if (relationship[KSInternalConstants.RELATIONSHIP_TYPE] === KSRelationshipTypes.MANY_TO_ONE) {
                parentObjectAttributes = relationship[KSInternalConstants.RELATIONSHIP_TARGET_ATTRIBUTES];
                childObjectAttributes = relationship[KSInternalConstants.RELATIONSHIP_SOURCE_ATTRIBUTES];
            }

            var foreignKeyValueMap = {};
            if (parentObjectAttributes != null && childObjectAttributes != null) {
                var parentObjectAttributesLength = parentObjectAttributes.length;
                for (var index = 0; index < parentObjectAttributesLength; index++) {
                    var parentObjectAttribute = parentObjectAttributes[index];
                    var columnValue = sdkRecord.getData()[parentObjectAttribute[KSInternalConstants.NAME]];
                    if (columnValue) {
                        var targetObjectAttribute = childObjectAttributes[index];
                        foreignKeyValueMap[targetObjectAttribute[KSInternalConstants.NAME]] = columnValue;
                    }
                }
            }
            return foreignKeyValueMap;
        }

        /**
         * Builds prepared statements for Delete ORM action
         *
         * @param sdkRecord which contains parentObject
         * @param options contains primaryKeyValueMap of the record to be deleted
         * @param recordsInMainTable of the given primaryKeyValueMap
         * @returns {Promise<Array>} returns an array of preparedStatements for
         *                           Main, Original and History tables for Delete ORM action
         */
        async function buildPreparedStatements(sdkRecord, options, recordsInMainTable) {
            logger.trace(LOG_PREFIX, "Start.");

            var statements = [];
            var objectMetadata = sdkRecord.getParentObject().getMetadata();
            var optionsForBuilder = instance.cloneOptions(options);
            var isDeleteByPK = options[KSCRUDConstants.CRUD_OPTION_IS_DELETE_BY_PK];

            //Build prepared statement for Main table
            statements.push(buildPreparedStatementForMainTable(sdkRecord, optionsForBuilder));

            var arrayLength = recordsInMainTable.length;
            for(var index = 0; index < arrayLength; index++) {
                if(!isDeleteByPK) {
                    // Fetch the primary key values from existing record in case of delete by criteria
                    var primaryKeyValueMap = instance.getPrimaryKeyValuesFromDBRecord(objectMetadata, recordsInMainTable[index]);
                    optionsForBuilder[KSPublicConstants.CRUD_OPTION_PRIMARY_KEYS] = primaryKeyValueMap;
                }

                //Build prepared statements for children if cascade is enabled..
                if (isCascadeDeleteEnabled(objectMetadata)) {
                    var recordToBeDeleted = new KSSDKObjectRecord(recordsInMainTable[index], sdkRecord.getParentObject());
                    recordToBeDeleted.setAction(voltmx.sdk.OfflineObjects.KSSDKObjectRecordAction.DELETE);
                    await buildStatementsForChildEntity(recordToBeDeleted, recordToBeDeleted.getParentObject().getMetadata()[KSInternalConstants.OBJECTS_CHILD_RELATIONSHIPS], statements, optionsForBuilder);
                }

                // Build prepared statements for Original and History Tables
                await buildPreparedStatementsForOriginalAndHistory(sdkRecord, optionsForBuilder, recordsInMainTable[index], statements);
            }

            return statements;
        }

        /**
         * Builds prepared statements for Original and History tables
         *
         * @param sdkRecord to be deleted
         * @param options contains PK(s) and criteria
         * @param record existing record to be deleted
         * @param statements holds a list of prepared statements
         * @returns {Promise<Array>} an array of preparedStatements for Original and History tables
         */
        async function buildPreparedStatementsForOriginalAndHistory(sdkRecord, options, record, statements) {
            logger.trace(LOG_PREFIX + "buildPreparedStatementsForOriginalAndHistory : ", "Start.");
            var metadata = options[KSInternalConstants.OBJECT_METADATA];
            var isDeleteByPK = options[KSCRUDConstants.CRUD_OPTION_IS_DELETE_BY_PK];

            if (!isDeleteByPK) {
                // Fetch the primary key values from existing record in case of delete by criteria
                var primaryKeyValueMap = instance.getPrimaryKeyValuesFromDBRecord(metadata, record);
                options[KSPublicConstants.CRUD_OPTION_PRIMARY_KEYS] = primaryKeyValueMap;
            }

            //Build SDKRecord for Original table
            var changeTypeMap = {};
            changeTypeMap[KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE] = KSCommonUtils.getBaseORMActionFromRecordActionCode(sdkRecord.getAction());

            var listOfDataMaps = [];
            listOfDataMaps.push(record);
            listOfDataMaps.push(changeTypeMap);

            var sdkRecordForBuilder = instance.createSDKRecordFromDataMaps(listOfDataMaps, sdkRecord.getParentObject());

            //Build prepared statement for Original table
            var statement = await instance.buildPreparedStatementForOriginalTable(sdkRecordForBuilder, options);

            if (!voltmx.sdk.isNullOrUndefined(statement)) {
                statements.push(statement);
            }

            var isTrackChangesEnabled = KSOptionsHelper.getOptionValueOrDefaultForGivenKey(options, KSPublicConstants.TRACK_CHANGES,
                KSCRUDConstants.DEFAULT_VALUE_FOR_TRACK_CHANGES);

            if (isTrackChangesEnabled) {

                //Build SDKRecord for History table
                var metaInfo = await instance.getCommonMetaInfo(sdkRecord);

                KSCommonUtils.clearJSONObject(listOfDataMaps);
                listOfDataMaps.push(record);
                listOfDataMaps.push(metaInfo);

                var sdkRecordForHistory = instance.createSDKRecordFromDataMaps(listOfDataMaps, sdkRecord.getParentObject());

                //Build prepared statement for History table
                statements.push(instance.buildPreparedStatementForHistoryTable(sdkRecordForHistory));
            }
        }

        /**
         * Generates prepared statement for Main table for Delete operation
         *
         * @param sdkRecord which contains parentObject
         * @param options contains primaryKeyValueMap of the record to be deleted
         * @returns {*} prepared statement for Main table for Delete operation
         */
        function buildPreparedStatementForMainTable(sdkRecord, options) {
            logger.trace(LOG_PREFIX, "Start.");
            var tableName = sdkRecord.getParentObject().getFullyQualifiedName();
            var statementBuilder = KSQueryObjectBuilder.getQueryObjectForTableName(tableName, KSDatabaseOperation.DELETE);
            return instance.buildPreparedStatementForGivenCriteria(statementBuilder, options);
        }

        /**
         * Method to validate the SDK record
         *
         * @param sdkRecord SDKObjectRecord to be validated
         * @param isRecordToBeDeferred is record to be deferred
         * @param options contains PK(s), criteria and other options
         * @return {boolean} true if validation is success, else false
         */
        async function isSDKRecordValid(sdkRecord, isRecordToBeDeferred, options) {
            logger.trace(LOG_PREFIX + "isSDKRecordValid : ", "Start.");

            var sdkObject = sdkRecord.getParentObject();
            var metadata = sdkObject.getMetadata();

            //Checks whether the given record has an entry in main table or not
            var recordsFromMainTable = await instance.getExistingRecordsFromMainTable(sdkRecord, options);
            var isDeleteByPK = options[KSCRUDConstants.CRUD_OPTION_IS_DELETE_BY_PK];

            for (var index in recordsFromMainTable) {
                var existingRecord = new KSSDKObjectRecord(recordsFromMainTable[index], sdkObject);

                if(!isDeleteByPK) {
                    // Fetch the primary key values from existing record in case of delete by criteria
                    var primaryKeyValueMap = instance.getPrimaryKeyValuesFromDBRecord(metadata, recordsFromMainTable[index]);
                    options[KSPublicConstants.CRUD_OPTION_PRIMARY_KEYS] = primaryKeyValueMap;
                }

                var recordForValidation = instance.addPrimaryKeysToSDKRecord(sdkRecord, options);

                //Check for integrity constraint violation in relationships if cascade delete is not enabled..
                if (!KSCommonUtils.isNullOrEmptyObject(metadata[KSInternalConstants.OBJECTS_CHILD_RELATIONSHIPS])) {
                    if (!isCascadeDeleteEnabled(metadata)) {
                        var parentHaveChildren = await doParentRecordHaveAssociatedChildRecords(existingRecord);
                        if (!parentHaveChildren) {
                            logger.info(LOG_PREFIX, "There are no child records associated with the given record");
                        }
                    }
                }

                if (!isRecordToBeDeferred &&  !(await instance.checkIfRecordIsAlreadyDeferredFromUpload(recordForValidation))) {
                    voltmx.sdk.logsdk.info(LOG_PREFIX, "isSDKRecordValid :" + "Record does not have any previous deferred action history. Hence valid");
                }
            }

            return true;
        }

        function isCascadeDeleteEnabled(objectMetadata) {
            var childRelationshipsList = objectMetadata[KSInternalConstants.OBJECTS_CHILD_RELATIONSHIPS];
            var childRelationshipsCount = childRelationshipsList.length;
            for (var index = 0; index < childRelationshipsCount; index++) {
                if (childRelationshipsList[index][KSInternalConstants.RELATIONSHIP_CASCADE]) {
                    return true;
                }
            }
            return false;
        }

        /**
         * Validates sdk object's referential integrity
         *
         * @param sdkRecord record for which referential integrity constraint has to be validated
         * @return true/false (true on validation successful else false)
         */
        async function doParentRecordHaveAssociatedChildRecords(sdkRecord) {
            logger.trace(LOG_PREFIX + " : doParentRecordHaveAssociatedChildRecords", "Start.");

            var metadata = sdkRecord.getParentObject().getMetadata();
            logger.debug(LOG_PREFIX, "Validating SDK object record " + JSON.stringify(sdkRecord.getData()));

            var relationships = metadata[KSInternalConstants.OBJECTS_CHILD_RELATIONSHIPS];
            logger.info(LOG_PREFIX, "The child relationships count " + Object.keys(relationships).length);

            //Checking for child relationships
            for (var index = 0; index < relationships.length; index++) {
                var results = await fetchChildRecordsForRelationship(relationships[index], sdkRecord);

                if (!KSCommonUtils.isNullOrEmptyObject(results)) {
                    var errorMessage = "Cannot delete the record as it has associated child records.";
                    logger.error(LOG_PREFIX, errorMessage);
                    throw new KSError(KSErrorConstants.CRUD_REFERENTIAL_INTEGRITY_VIOLATION, errorMessage);
                }
            }
            return false;
        }

        /**
         * Method to fetch child records for a given relationship
         * @param relationship defines the relationship type, can be OneToMany or ManyToOne
         * @param sdkRecord record for which child records need to be fetched
         * @returns {*} list of child records, if any.
         */
        async function fetchChildRecordsForRelationship(relationship, sdkRecord) {

            var parentObjectAttributes = [];
            var childObjectAttributes = [];
            var childObjectMetadata = null;

            if (relationship[KSInternalConstants.RELATIONSHIP_TYPE] === KSRelationshipTypes.ONE_TO_MANY) {
                childObjectMetadata = relationship[KSInternalConstants.RELATIONSHIP_TARGET_OBJECT];
                childObjectAttributes = relationship[KSInternalConstants.RELATIONSHIP_TARGET_ATTRIBUTES];
                parentObjectAttributes = relationship[KSInternalConstants.RELATIONSHIP_SOURCE_ATTRIBUTES];
            } else if (relationship[KSInternalConstants.RELATIONSHIP_TYPE] === KSRelationshipTypes.MANY_TO_ONE) {
                childObjectMetadata = relationship[KSInternalConstants.RELATIONSHIP_SOURCE_OBJECT];
                childObjectAttributes = relationship[KSInternalConstants.RELATIONSHIP_SOURCE_ATTRIBUTES];
                parentObjectAttributes = relationship[KSInternalConstants.RELATIONSHIP_TARGET_ATTRIBUTES];
            }

            return (await instance.getRelatedRecordsForGivenRecord(sdkRecord, childObjectMetadata, childObjectAttributes, parentObjectAttributes));
        }

        exports.getInstance = KSDeleteORMManager.getInstance;
    });
define("KSORMManagerFactory", ["exports", "KSCreateORMManager", "KSReadORMManager", "KSUpdateORMManager", "KSDeleteORMManager", "KSError"],
    function(exports, KSCreateORMManager, KSReadORMManager, KSUpdateORMManager, KSDeleteORMManager, _KSError) {
    
        var KSError = _KSError.KSError;
        var LOG_PREFIX = "KSORMManagerFactory";
        var KSErrorConstants = voltmx.sdk.OfflineObjects.KSErrorConstants;
        var KSSDKObjectRecordAction = voltmx.sdk.OfflineObjects.KSSDKObjectRecordAction;

        function getORMManager(actionType) {
            switch (actionType) {
                case KSSDKObjectRecordAction.CREATE:
                    return KSCreateORMManager.getInstance();
                case KSSDKObjectRecordAction.READ:
                    return KSReadORMManager.getInstance();
                case KSSDKObjectRecordAction.UPDATE:
                    return KSUpdateORMManager.getInstance();
                case KSSDKObjectRecordAction.DELETE:
                    return KSDeleteORMManager.getInstance();
                default:
                    var errorMessage = "Invalid action type is sent to ORMManagerFactory";
                    voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                    throw new KSError(KSErrorConstants.INTERNAL_INVALID_ACTION_TYPE_SENT_TO_ORMFACTORY, errorMessage);
            }
        }
        exports.getORMManager = getORMManager;
    });
/**
 * Read ORMManager
 * Created by Prasanthi Bonam on 30-05-2018.
 * Copyright © 2017 Kony. All rights reserved.
 */
define("KSReadORMManager", ["exports", "KSBaseORMManager", "KSDatabaseAPI", "KSQueryObjectBuilder", "KSOptionsHelper", "KSCommonUtils", "KSError"],
    function (exports, KSBaseORMManager, _KSDatabaseAPI, KSQueryObjectBuilder, KSOptionsHelper, KSCommonUtils, _KSError) {

        function KSReadORMManager() {
        }

        __extends(KSReadORMManager, KSBaseORMManager.KSBaseORMManager);

        var instance = null;
        var LOG_PREFIX = "KSReadORMManager : ";
        var KSError = _KSError.KSError;
        var KSDatabaseAPI = _KSDatabaseAPI.KSDatabaseAPI;
        var KSErrorConstants = voltmx.sdk.OfflineObjects.KSErrorConstants;
        var KSPublicConstants = voltmx.sdk.OfflineObjects.KSPublicConstants;
        var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;
        var KSDatabaseConstants = voltmx.sdk.OfflineObjects.KSDatabaseConstants;
        var KSDatabaseOperation = KSDatabaseConstants.KSDatabaseOperations;

        /**
         * Gets an instance of KSReadORMManager
         * @returns {*}
         */
        KSReadORMManager.getInstance = function () {
            if (instance == null) {
                instance = new KSReadORMManager();
            }
            return instance;
        };

        KSReadORMManager.prototype.perform = async function (sdkRecord, options) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX, "Start.");

            if (!KSOptionsHelper.skipValidation(options)) {
                if (areOptionsValid(options)) {
                    voltmx.sdk.logsdk.info(LOG_PREFIX + "Options validation is successful.");
                }
            }

            return await performDBOperation(sdkRecord, options);
        };

        /**
         * Method to build and execute queries on the DB
         *
         * @param sdkRecord SDKObjectRecord containing updateColumns
         * @param options   Map containing primaryKeys
         * @returns {Promise<void>} Number of records updated
         */
        async function performDBOperation(sdkRecord, options) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX, "Start.");

            var metadata = options[KSInternalConstants.OBJECT_METADATA];
            var tableName = metadata[KSInternalConstants.FULLY_QUALIFIED_NAME];

            var statementBuilder = KSQueryObjectBuilder.getQueryObjectForTableName(tableName, KSDatabaseOperation.SELECT);

            var projectionColumns = options[KSPublicConstants.CRUD_OPTION_PROJECTION_COLUMNS];

            if (KSCommonUtils.isNullOrEmptyObject(projectionColumns)) {
                projectionColumns = instance.getColumnNamesFromMetadata(metadata);
            }

            var statement = statementBuilder.setProjectionColumns(projectionColumns);

            var primaryKeysList = options[KSPublicConstants.CRUD_OPTION_PRIMARY_KEYS];
            var whereConditionMap = options[KSPublicConstants.CRUD_OPTION_WHERE_CONDITION];
            var whereConditionAsAString = options[KSPublicConstants.CRUD_OPTION_WHERE_CONDITION_AS_A_STRING];
            if (!KSCommonUtils.isNullOrEmptyObject(primaryKeysList)) {
                statement.setWhereClause(primaryKeysList);
            } else if (!KSCommonUtils.isNullOrEmptyObject(whereConditionMap)) {
                statement.setWhereClause(whereConditionMap);
            } else if (!KSCommonUtils.isNullOrEmptyObject(whereConditionAsAString)) {
                statement.setWhereClauseAsString(whereConditionAsAString);
            }

            var orderByMap = options[KSPublicConstants.CRUD_OPTION_ORDERBY_MAP];
            if (!KSCommonUtils.isNullOrEmptyObject(orderByMap)) {
                var order = {};
                for (var key in orderByMap[0]) {
                    if (orderByMap[0].hasOwnProperty(key)) {
                        order[KSDatabaseConstants.COLUMN] = key;
                        order[KSDatabaseConstants.ORDER] = orderByMap[0][key];
                    }
                }
                
                statement.addOrderByMap(order);
            }

            return await KSDatabaseAPI.executeQuery(statement.build());
        }

        /**
         * Validates options parameter
         * @param options to be validated
         * @returns {boolean} returns true if validation is successful else false
         */
        function areOptionsValid(options) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "Start.");

            //Validating primaryKeys
            if (KSOptionsHelper.arePrimaryKeysValid(options)) {
                voltmx.sdk.logsdk.info(LOG_PREFIX + "PrimaryKeys validation is successful");
            }

            //Validating whereCondition
            if (instance.isWhereConditionValid(options)) {
                voltmx.sdk.logsdk.info(LOG_PREFIX + "WhereCondition validation is successful");
            }

            //validating OrderByMap
            if (isOrderByMapValid(options)) {
                voltmx.sdk.logsdk.info(LOG_PREFIX + "orderByMap validation is successful");
            }

            //validating projectionColumns
            if (areProjectionColumnsValid(options)) {
                voltmx.sdk.logsdk.info(LOG_PREFIX + "projectionColumns validation is successful");
            }

            return true;
        }

        function isOrderByMapValid(options) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "Start.");

            if (options.hasOwnProperty(KSPublicConstants.CRUD_OPTION_ORDERBY_MAP)) {
                var errorMessage;
                var orderByMap = options[KSPublicConstants.CRUD_OPTION_ORDERBY_MAP];

                if (voltmx.sdk.isNullOrUndefined(orderByMap)) {
                    errorMessage = "The given value for orderByMap is either null or undefined";
                    voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                    throw new KSError(KSErrorConstants.CRUD_INVALID_OPTIONS, errorMessage);
                }

                if (Array.isArray(orderByMap)) {
                    voltmx.sdk.logsdk.info(LOG_PREFIX + "Validating orderByMap " + JSON.stringify(orderByMap));

                    if (orderByMap.length > 1) {
                        errorMessage = "orderByMap should contain only one entry";
                        voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                        throw new KSError(KSErrorConstants.CRUD_INVALID_OPTIONS, errorMessage);            
                    }

                    var metadata = options[KSInternalConstants.OBJECT_METADATA];
                    var orderBy = orderByMap[0];
                    if (KSCommonUtils.isInstanceOfMap(orderBy)) {
                        for (var key in orderBy) {
                            if (orderBy.hasOwnProperty(key)) {
                                var attribute = metadata[KSInternalConstants.ATTRIBUTES][key];
                                if (voltmx.sdk.isNullOrUndefined(attribute)) {
                                    errorMessage = "The given column name " + key + " in the orderByMap is invalid";
                                    voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                                    throw new KSError(KSErrorConstants.CRUD_INVALID_OPTIONS, errorMessage);
                                }

                                if (typeof orderBy[key] !== "string") {
                                    errorMessage = "The given input for orderByMap is not of type string";
                                    voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                                    throw new KSError(KSErrorConstants.CRUD_INVALID_OPTIONS, errorMessage);                                    
                                }
                            }
                        }
                    } else {
                        errorMessage = "orderByMap should be of type Map";
                        voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                        throw new KSError(KSErrorConstants.CRUD_INVALID_OPTIONS, errorMessage);
                    }
                    
                } else {
                    errorMessage = "The given input for orderByMap should be of type array";
                    voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                    throw new KSError(KSErrorConstants.CRUD_INVALID_OPTIONS, errorMessage);
                }
            }

            return true;
        }

        function areProjectionColumnsValid(options) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "Start.");

            if (options.hasOwnProperty(KSPublicConstants.CRUD_OPTION_PROJECTION_COLUMNS)) {
                var errorMessage;
                var projectionColumns = options[KSPublicConstants.CRUD_OPTION_PROJECTION_COLUMNS];

                if (voltmx.sdk.isNullOrUndefined(projectionColumns)) {
                    errorMessage = "The given input for projectionColumns is either null or undefined";
                    voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                    throw new KSError(KSErrorConstants.CRUD_INVALID_OPTIONS, errorMessage);
                }

                if (Array.isArray(projectionColumns)) {
                    voltmx.sdk.logsdk.info(LOG_PREFIX + "Validating Projection Columns " + JSON.stringify(projectionColumns));

                    var metadata = options[KSInternalConstants.OBJECT_METADATA];
                    for (var index = projectionColumns.length - 1; index >= 0; index--) {
                        var attribute = metadata[KSInternalConstants.ATTRIBUTES][projectionColumns[index]];

                        if (voltmx.sdk.isNullOrUndefined(attribute)) {
                            errorMessage = "The given column name " + projectionColumns[index]+ " in the projectionColumns is invalid";
                            voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                            throw new KSError(KSErrorConstants.CRUD_INVALID_OPTIONS, errorMessage);
                        }
                    }
                } else {
                    errorMessage = "The given input for projectionColumns should be of type array";
                    voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                    throw new KSError(KSErrorConstants.CRUD_INVALID_OPTIONS, errorMessage);
                }
            }

            return true;
        }

        exports.getInstance = KSReadORMManager.getInstance;
    });
/**
 * Update ORMManager
 * Created by Prasanthi Bonam on 29-05-2018.
 * Copyright © 2018 Kony. All rights reserved.
 */
define("KSUpdateORMManager", ["exports", "KSBaseORMManager", "KSDatabaseAPI", "KSCommonUtils", "KSOptionsHelper", "KSQueryObjectBuilder", "KSError", "KSSQLQueryGenerator", "KSSDKObjectRecord", "KSSyncDatabaseHelper"],
    function (exports, KSBaseORMManager, _KSDatabaseAPI, KSCommonUtils, KSOptionsHelper, KSQueryObjectBuilder, _KSError, KSSQLQueryGenerator, _KSSDKObjectRecord, KSSyncDatabaseHelper) {

        "use strict";

        function KSUpdateORMManager() {
        }

        __extends(KSUpdateORMManager, KSBaseORMManager.KSBaseORMManager);

        var instance = null;
        var KSError = _KSError.KSError;
        var LOG_PREFIX = "KSUpdateORMManager : ";
        var OfflineObjects = voltmx.sdk.OfflineObjects;
        var KSDatabaseAPI = _KSDatabaseAPI.KSDatabaseAPI;
        var KSErrorConstants = OfflineObjects.KSErrorConstants;
        var KSPublicConstants = OfflineObjects.KSPublicConstants;
        var KSSDKObjectRecord = _KSSDKObjectRecord.KSSDKObjectRecord;
        var KSDatabaseConstants = OfflineObjects.KSDatabaseConstants;
        var KSCRUDConstants = OfflineObjects.KSCRUDConstants;
        var KSDatabaseOperation = KSDatabaseConstants.KSDatabaseOperations;
        var KSSDKObjectRecordAction = OfflineObjects.KSSDKObjectRecordAction;
        var KSInternalConstants = OfflineObjects.KSInternalConstants;
        var KSRelationshipTypes = KSInternalConstants.KSRelationshipTypes;
        var KSTableType = OfflineObjects.KSTableType;

        /**
         * Gets an instance of KSUpdateORMManager
         * @returns {*}
         */
        KSUpdateORMManager.getInstance = function () {
            if (instance == null) {
                instance = new KSUpdateORMManager();
            }
            return instance;
        };

        KSUpdateORMManager.prototype.perform = async function (sdkRecord, options) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "performDBOperation : ", "Start.");

            if (instance.areChangeTrackingOptionsValid(options)) {
                voltmx.sdk.logsdk.info(LOG_PREFIX + "perform : ", "Change Tracking options validation is successful");
            }

            instance.setCriteriaInOptions(options);

            if (!KSOptionsHelper.skipValidation(options)) {
                var isUpdateByPK = options[KSCRUDConstants.CRUD_OPTION_IS_UPDATE_BY_PK];
                var isRecordToBeDeferred = instance.isSDKRecordToBeDeferredFromUpload(options);

                if (isUpdateByPK) {
                    // Validates PK(s) and throws an exception if not provided, in case of updateByPK
                    if (KSOptionsHelper.arePrimaryKeysSentInOptionsValid(options)) {
                        voltmx.sdk.logsdk.info(LOG_PREFIX + ":perform", "Options validation for updateByPK is successful");
                    }
                } else {
                    // Validates PK(s), if any, in case of update
                    if (instance.areOptionsValid(options)) {
                        voltmx.sdk.logsdk.info(LOG_PREFIX + ":perform", "Options validation for update is successful");
                    }
                }

                var recordsFromMainTable = await instance.getExistingRecordsFromMainTable(sdkRecord, options);
                checkAndRejectUpdateToPrimaryKeys(sdkRecord, recordsFromMainTable);

                var optionsForValidation = instance.cloneOptions(options);
                if (await isSDKRecordValid(sdkRecord, optionsForValidation, recordsFromMainTable, isRecordToBeDeferred, isUpdateByPK)) {
                    voltmx.sdk.logsdk.info(LOG_PREFIX, "Record validation is successful");
                }

                // If the record is not marked for upload, mark it as deferred
                if (isRecordToBeDeferred) {
                    instance.markSDKRecordAsDeferredFromUpload(sdkRecord);
                }
            }

            return (await performDBOperation(sdkRecord, options));
        };

        /**
         * Performs DB related operations for Update operation
         *
         * @param sdkRecord contains updated data
         * @param options contains primaryKeyValueMap of the record to be updated
         * @returns {Promise<boolean>} returns true if update is success else throws Exception
         */
        async function performDBOperation(sdkRecord, options) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "performDBOperation : ", "Start.");

            var fullyQualifiedName = sdkRecord.getParentObject().getFullyQualifiedName();
            var recordsInMainTable = await instance.getRecordsByCriteria(options, fullyQualifiedName);

            if (!voltmx.sdk.isEmptyObject(recordsInMainTable)) {
                var statements = await buildPreparedStatements(sdkRecord, options, recordsInMainTable);
                var tables = KSSQLQueryGenerator.getAllTableNames(fullyQualifiedName);
                await KSDatabaseAPI.executeQueriesAsTransaction(statements, tables);
                return true;
            } else {
                var errorMessage = "Error in fetching record(s) from main table.";
                voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                throw new KSError(KSErrorConstants.CRUD_RECORD_NOT_IN_MAIN_TABLE, errorMessage);
            }
        }

        /**
         * Builds prepared statements for Original and History tables
         *
         * @param sdkRecord contains data to be updated
         * @param options contains PK(s) and criteria
         * @param records existing records to be updated
         * @param statements holds a list of prepared statements
         * @returns {Promise<Array>} an array of preparedStatements for Original and History tables
         */
        async function buildPreparedStatementsForOriginalAndHistory(sdkRecord, options, records, statements) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "buildPreparedStatementsForOriginalAndHistory : ", "Start.");
            var metadata = options[KSInternalConstants.OBJECT_METADATA];
            var isUpdateByPK = options[KSCRUDConstants.CRUD_OPTION_IS_UPDATE_BY_PK];

            for (var index in records) {
                if (!isUpdateByPK) {
                    // Fetch the primary key values from existing record in case of update by criteria
                    var primaryKeyValueMap = instance.getPrimaryKeyValuesFromDBRecord(metadata, records[index]);
                    options[KSPublicConstants.CRUD_OPTION_PRIMARY_KEYS] = primaryKeyValueMap;
                }

                //Build SDKRecord for Original table
                var changeTypeMap = {};
                changeTypeMap[KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE] =  KSCommonUtils.getBaseORMActionFromRecordActionCode(sdkRecord.getAction());

                var listOfDataMaps = [];
                listOfDataMaps.push(records[index]);
                listOfDataMaps.push(changeTypeMap);

                var sdkRecordForOriginal = instance.createSDKRecordFromDataMaps(listOfDataMaps, sdkRecord.getParentObject());

                //Build prepared statement for Original table
                var statement = await instance.buildPreparedStatementForOriginalTable(sdkRecordForOriginal, options);
                if (!voltmx.sdk.isNullOrUndefined(statement)) {
                    statements.push(statement);
                }

                var isTrackChangesEnabled = KSOptionsHelper.getOptionValueOrDefaultForGivenKey(options, KSPublicConstants.TRACK_CHANGES,
                    KSCRUDConstants.DEFAULT_VALUE_FOR_TRACK_CHANGES);

                if (isTrackChangesEnabled) {
                    //Build SDKRecord for History table
                    var metaInfo = await instance.getCommonMetaInfo(sdkRecord);

                    KSCommonUtils.clearJSONObject(listOfDataMaps);
                    listOfDataMaps.push(records[index]);
                    listOfDataMaps.push(sdkRecord.getData());
                    listOfDataMaps.push(metaInfo);

                    var sdkRecordForBuilderForHistory = instance.createSDKRecordFromDataMaps(listOfDataMaps, sdkRecord.getParentObject());
                    sdkRecordForBuilderForHistory.setAction(sdkRecord.getAction());

                    //Build prepared statement for History table
                    await buildPreparedStatementForHistoryTable(sdkRecordForBuilderForHistory, options, statements);
                }
            }
        }

        /**
         * Method to build insert or update prepared statement for History table.
         *
         * @param sdkRecord contains data to be updated
         * @param options   Map containing primaryKeys and change tracking options
         * @returns {Promise<Array>} Insert or Update prepared statements based on the Track Intermediate Updates flag
         */
        async function buildPreparedStatementForHistoryTable(sdkRecord, options, statements) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "buildPreparedStatementForHistoryTable : ", "Start");
            var sdkRecordForHistory = sdkRecord;

            var tableName = KSSQLQueryGenerator.getTableNameWithType(sdkRecord.getParentObject().getFullyQualifiedName(), KSTableType.HISTORY);

            // If there is an update with Track Intermediate Updates = OFF,
            // replace an existing record(if any) with action type = 80, else insert a new entry.
            var isTrackIntermediateUpdatesEnabled = KSOptionsHelper.getOptionValueOrDefaultForGivenKey(options,
                KSPublicConstants.TRACK_INTERMEDIATE_UPDATES, KSCRUDConstants.DEFAULT_VALUE_FOR_TRACK_INTERMEDIATE_UPDATES);

            if (!isTrackIntermediateUpdatesEnabled) {
                // if the record is already deferred
                if (sdkRecord.getAction() === KSSDKObjectRecordAction.DEFERRED_UPDATE) {
                    sdkRecord.setAction(KSSDKObjectRecordAction.DEFERRED_AND_DO_NOT_TRACK_INTERMEDIATE_UPDATES);
                } else {
                    sdkRecord.setAction(KSSDKObjectRecordAction.DO_NOT_TRACK_INTERMEDIATE_UPDATES);
                }

                //Build SDKRecord for History table
                var changeTypeMap = {};
                changeTypeMap[KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE] = sdkRecord.getAction();

                var listOfDataMaps = [];
                listOfDataMaps.push(sdkRecord.getData());
                listOfDataMaps.push(changeTypeMap);

                sdkRecordForHistory = instance.createSDKRecordFromDataMaps(listOfDataMaps, sdkRecord.getParentObject());
            }

            var recordsInHistoryTable = await KSSyncDatabaseHelper.getNumberOfRecordsDeferredAndTrackIntermediateUpdateSetToFalse(options,
                sdkRecord.getParentObject().getFullyQualifiedName());

            if (recordsInHistoryTable === 0) {
                // Check if the custom option 'SYNC_LATEST_OBJECT_SNAPSHOT' is enabled
                if (options.hasOwnProperty(KSPublicConstants.SYNC_LATEST_OBJECT_SNAPSHOT)) {
                    if (options[KSPublicConstants.SYNC_LATEST_OBJECT_SNAPSHOT]) {
                        // Change the action type to create instead of update
                        sdkRecordForHistory.getData()[KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE] = KSSDKObjectRecordAction.CREATE;
                        // Add an update prepared statement to the 'statements' array
                        statements.push(buildUpdatePreparedStatementForUpdatesRecord(sdkRecordForHistory,options,sdkRecord.getParentObject().getFullyQualifiedName()));
                    } else {
                        statements.push(instance.getInsertPreparedStatement(sdkRecordForHistory, tableName));
                    }
                } else {
                    statements.push(instance.getInsertPreparedStatement(sdkRecordForHistory, tableName));
                }
            } else if (recordsInHistoryTable === 1) {
                statements.push(await KSSyncDatabaseHelper.buildUpdatePreparedStatementForTrackIntermediateUpdatesRecord(sdkRecordForHistory,
                    options, sdkRecord.getParentObject().getFullyQualifiedName()));
            } else {
                var errMsg = "Expected to have only one record with action type = 80 in history table.";
                voltmx.sdk.logsdk.trace(LOG_PREFIX + " : buildPreparedStatementForHistoryTable", errMsg);
                throw new KSError(KSErrorConstants.CRUD_GENERIC_ERROR, errMsg);
            }
        }

        /**
         * Builds an update prepared statement for updating records in the history table.
         *
         * @param sdkRecord - The SDK record to update.
         * @param options - Additional options for generating the statement.
         * @param tableName - The name of the target table.
         * @returns preparedStatement - The update prepared statement.
         */
        function buildUpdatePreparedStatementForUpdatesRecord(sdkRecord, options, tableName) {
            // Build the WHERE clause for updating records in the history table
            const whereClause = buildWhereConditionToUpdateRecordsInHistory(options);
            // Generate the update prepared statement using the SQL query generator
            return KSSQLQueryGenerator.buildPreparedStatementsOfTypeUpdate(tableName, KSTableType.HISTORY,
                whereClause, sdkRecord.getData());
        }

        /**
         * Builds a WHERE condition to update records in the history table.
         *
         * @param options - Options containing primary key-value pairs.
         * @returns wherecondition - An array representing the WHERE condition.
         */
        function buildWhereConditionToUpdateRecordsInHistory(options) {
            // Extract primary key-value pairs from options
            const primaryKeyValuePair = options[KSPublicConstants.CRUD_OPTION_PRIMARY_KEYS];

            // Initialize an array to hold the WHERE condition rules
            const rule = [];

            // Add the column name (KONY_SYNC_CHANGE_TYPE) to the rule
            rule.push(KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE);

            // Add the comparison operator (EQUALS) to the rule
            rule.push(KSInternalConstants.EQUALS);

            // Add the value (1) to the rule
            rule.push(KSSDKObjectRecordAction.CREATE);

            // Build the WHERE condition as an array
            const whereCondition = KSSyncDatabaseHelper.buildWhereConditionAsString(primaryKeyValuePair);

            // Add a logical AND operator to the WHERE condition
            whereCondition.push([KSDatabaseConstants.LOGICAL_AND]);

            // Add the previously constructed rule to the WHERE condition
            whereCondition.push(rule);

            return whereCondition;
        }

        /**
         * Generates prepared statement for Main table for Update operation
         *
         * @param sdkRecord contains updated data
         * @param options contains PK(s) and criteria
         * @returns {*} prepared statement for Main table for Update operation
         */
        function buildPreparedStatementForMainTable(sdkRecord, options) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "buildPreparedStatementForMainTable : ", "Start.");
            var tableName = sdkRecord.getParentObject().getFullyQualifiedName();
            var statementBuilder = KSQueryObjectBuilder.getQueryObjectForTableName(tableName, KSDatabaseOperation.UPDATE);
            return instance.buildPreparedStatementForGivenCriteria(statementBuilder.setUpdatedData(sdkRecord.getData()), options);
        }

        /**
         * Builds prepared statements for Update ORM action
         *
         * @param sdkRecord contains updated data
         * @param options contains PK(s) and criteria
         * @param records existing records to be updated
         * @returns {Promise<Array>} an array of preparedStatements for
         *                           Main, Original and History tables for Update ORM action
         */
        async function buildPreparedStatements(sdkRecord, options, records) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "buildPreparedStatements : ", "Start.");
            var statements = [];
            var optionsForBuilder = instance.cloneOptions(options);

            //Build prepared statement for Main table
            statements.push(buildPreparedStatementForMainTable(sdkRecord, optionsForBuilder));

            // Build prepared statements for Original and History Tables
            await buildPreparedStatementsForOriginalAndHistory(sdkRecord, optionsForBuilder, records, statements);

            return statements;
        }

        /**
         * Checks whether primaryKeys are sent for update
         *
         * @param sdkRecord          which has to be checked
         * @param recordsFromMainTable list of existing records to be updated
         */
        function checkAndRejectUpdateToPrimaryKeys(sdkRecord, recordsFromMainTable) {
            var errorMessage;
            var data = sdkRecord.getData();
            var noOfRecords = recordsFromMainTable.length;

            if (noOfRecords > 1) {
                var primaryKeys = sdkRecord.getParentObject().getPrimaryKeys();
                for (var index in primaryKeys) {
                    if (data.hasOwnProperty(primaryKeys[index])) {
                        errorMessage = "Primary Key " + primaryKeys[index] + "=" + data[primaryKeys[index]] + " is sent for update. Updating primary keys is not allowed";
                        voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                        throw new KSError(KSErrorConstants.CRUD_PRIMARY_KEYS_UPDATE_NOT_ALLOWED, errorMessage);
                    }
                }
            } else {
                var metadata = sdkRecord.getParentObject().getMetadata();
                var primaryKeyValueMap = instance.getPrimaryKeyValuesFromDBRecord(metadata, recordsFromMainTable[0]);
                for (var key in primaryKeyValueMap) {
                    if (data.hasOwnProperty(key) && (data[key] !== primaryKeyValueMap[key])) {
                        errorMessage = "Primary Key " + key + "=" + data[key] + " is sent for update. Updating primary keys is not allowed";
                        voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                        throw new KSError(KSErrorConstants.CRUD_PRIMARY_KEYS_UPDATE_NOT_ALLOWED, errorMessage);
                    }
                }
            }
        }

        /**
         * Method to validate updateColumns given by the user
         *
         * @param sdkRecord SDKObjectRecord to be validated
         * @param options contains PK(s), criteria and other options
         * @param isRecordToBeDeferred true if the record is to be deferred
         * @param recordsFromMainTable list of existing records from the main table
         * @param isUpdateByPK true, if the calling api is updateByPK otherwise it is update
         * @return {boolean} true if validation is success, else false
         */
        async function isSDKRecordValid(sdkRecord, options, recordsFromMainTable, isRecordToBeDeferred, isUpdateByPK) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "isSDKRecordValid : ", "Start.");

            var data = sdkRecord.getData();
            var sdkObject = sdkRecord.getParentObject();
            var metadata = sdkObject.getMetadata();
            var errorMessage;

            //Check if record is empty
            if (KSCommonUtils.isNullOrEmptyObject(data)) {
                errorMessage = "SDK object record is null or empty";
                voltmx.sdk.logsdk.error(LOG_PREFIX + " : isSDKRecordValid", errorMessage);
                throw new KSError(KSErrorConstants.CRUD_NULL_SDKRECORD, errorMessage);
            }

            //Validating sdk record object datatypes
            if (instance.isRecordDataValid(sdkRecord)) {
                voltmx.sdk.logsdk.info(LOG_PREFIX, "The validation of record data is successful");
            }

            for (var index in recordsFromMainTable) {
                if (!isUpdateByPK) {
                    // Fetch the primary key values from existing record in case of update by criteria
                    var primaryKeyValueMap = instance.getPrimaryKeyValuesFromDBRecord(metadata, recordsFromMainTable[index]);
                    options[KSPublicConstants.CRUD_OPTION_PRIMARY_KEYS] = primaryKeyValueMap;
                }

                var recordForValidation = instance.addPrimaryKeysToSDKRecord(sdkRecord, options);
                var existingRecord = new KSSDKObjectRecord(recordsFromMainTable[index], sdkRecord);

                //Check for integrity constraint violation in relationships
                if (!KSCommonUtils.isNullOrEmptyObject(metadata[KSInternalConstants.OBJECTS_PARENT_RELATIONSHIPS])) {
                    if (await instance.isReferentialIntegrityValid(recordForValidation, existingRecord)) {
                        voltmx.sdk.logsdk.info(LOG_PREFIX, "The foreignKey constraints are satisfied");
                    }
                }

                if (!KSCommonUtils.isNullOrEmptyObject(metadata[KSInternalConstants.OBJECTS_CHILD_RELATIONSHIPS])) {
                    var existingParentHaveChildren = await doExistingParentRecordHaveAssociatedChildRecords(recordForValidation, existingRecord);
                    if (!existingParentHaveChildren) {
                        voltmx.sdk.logsdk.info(LOG_PREFIX, "There are no child records associated with the given record");
                    }
                }

                if (!isRecordToBeDeferred &&  !(await instance.checkIfRecordIsAlreadyDeferredFromUpload(recordForValidation))) {
                    voltmx.sdk.logsdk.info(LOG_PREFIX, "isSDKRecordValid :" + "Record does not have any previous deferred action history. Hence valid");
                }
            }

            return true;
        }

        /**
         * Method to verify if the existing record that is to be updated do have any child records
         * @param newRecord SDKObjectRecord to be validated
         * @param existingRecord SDKObjectRecord that is to be updated
         */
        async function doExistingParentRecordHaveAssociatedChildRecords(newRecord, existingRecord) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "doExistingParentRecordHaveAssociatedChildRecords : ", "Start.");

            var metadata = newRecord.getParentObject().getMetadata();
            voltmx.sdk.logsdk.debug(LOG_PREFIX, "Validating SDK object record " + JSON.stringify(newRecord.getData()));

            var relationships = metadata[KSInternalConstants.OBJECTS_CHILD_RELATIONSHIPS];
            voltmx.sdk.logsdk.info(LOG_PREFIX, "The child relationships count " + Object.keys(relationships).length);

            var parentObjectAttributes = [];
            var childObjectAttributes = [];

            //Checking for child relationships
            for (var index = 0; index < relationships.length; index++) {
                var relationship = relationships[index];
                var childObjectMetadata = null;
                if (relationship[KSInternalConstants.RELATIONSHIP_TYPE] === KSRelationshipTypes.ONE_TO_MANY) {
                    childObjectMetadata = relationship[KSInternalConstants.RELATIONSHIP_TARGET_OBJECT];
                    childObjectAttributes = relationship[KSInternalConstants.RELATIONSHIP_TARGET_ATTRIBUTES];
                    parentObjectAttributes = relationship[KSInternalConstants.RELATIONSHIP_SOURCE_ATTRIBUTES];
                } else if (relationship[KSInternalConstants.RELATIONSHIP_TYPE] === KSRelationshipTypes.MANY_TO_ONE) {
                    childObjectMetadata = relationship[KSInternalConstants.RELATIONSHIP_SOURCE_OBJECT];
                    childObjectAttributes = relationship[KSInternalConstants.RELATIONSHIP_SOURCE_ATTRIBUTES];
                    parentObjectAttributes = relationship[KSInternalConstants.RELATIONSHIP_TARGET_ATTRIBUTES];
                }

                if (await instance.areForeignKeyValuesUpdated(newRecord, parentObjectAttributes)) {

                    // If there are any associated child records with the previous FK value, then we do not allow the user to update its foreign keys
                    var results = await instance.getRelatedRecordsForGivenRecord(existingRecord, childObjectMetadata, childObjectAttributes, parentObjectAttributes);

                    if (!KSCommonUtils.isNullOrEmptyObject(results)) {
                        var errorMessage = "The record has associated child records of object " + childObjectMetadata[KSInternalConstants.OBJECTS_NAME]
                            + ", updating the foreign key is not allowed.";
                        voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                        throw new KSError(KSErrorConstants.CRUD_REFERENTIAL_INTEGRITY_VIOLATION, errorMessage);
                    }
                }
            }

            return false;
        }

        exports.getInstance = KSUpdateORMManager.getInstance;
    });
/**
 * Created by Mohnish Bhamra-KH2321 on 31/07/19.
 * Copyright © 2018 Kony. All rights reserved.
 * HierarchyContext which contains information regarding uploadPayload for the hierarchicalObjectService
 */

define('HierarchyContext',

    ['exports'],

    function(exports) {

        'use strict';
        exports._esModule = true;

        function HierarchyContext() {
            /**
             * The boolean map which maintains the replaysequencenumber of records which are already added to the payload
             */
            this.replaySequenceNumberLookUpMap = {};

            /**
             *  The list of records skipped after building the payload
             */
            this.pendingRecords = {};

            /**
             * The Hierarchical payload building pass count
             */
            this.passCount = 0;
        }

        function init() {
            return new HierarchyContext();
        }

        HierarchyContext.prototype.getReplaySequenceNumberLookUpMap = function() {
            return this.replaySequenceNumberLookUpMap;
        };

        HierarchyContext.prototype.setReplaySequenceNumberLookUpMap = function(map) {
            this.replaySequenceNumberLookUpMap = map;
        };

        HierarchyContext.prototype.getPassCount = function() {
            return this.passCount;
        };

        HierarchyContext.prototype.setPassCount = function(count) {
            this.passCount = count;
        };

        HierarchyContext.prototype.getPendingRecords = function() {
            return this.pendingRecords;
        };

        HierarchyContext.prototype.setPendingRecords = function(records) {
            this.pendingRecords = records;
        };
        exports.getInstance = init;

    });

/**
 * Module to help parse the download response.
 */
define("KSDownloadResponseParser", ["exports", "KSSDKObjectRecord", "KSCommonUtils", "KSSyncErrorUtils"],
    function (exports, _KSSDKObjectRecord, KSCommonUtils, KSSyncErrorUtils) {
        "use strict";
        exports._esModule = true;

        var logger = voltmx.sdk.logsdk;
        var _KSSDKObject = require("KSSDKObject");
        var LOG_PREFIX = "KSDownloadResponseParser : ";
        var KSSDKObjectRecord = _KSSDKObjectRecord.KSSDKObjectRecord;
        var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;
        var KSSDKObjectRecordAction = voltmx.sdk.OfflineObjects.KSSDKObjectRecordAction;


        /**
         * Constructor for DownloadResponseParser.
         * @constructor Initialised the sdkObjectMapFromDownloadResponse.
         */
        function KSDownloadResponseParser() {
            this.errorMessages = [];
            this.sdkObjectMapFromDownloadResponse = {};
        }

        /**
         * Method to retrieve a list of SDKObjects containing parsed records from download response.
         * @param downloadResponse JSON object from download network call.
         * @param objectName Name of the object downloaded.
         * @param objectServiceName Name of the object service downloaded.
         * @returns {Object} Array of SDKObjects containing parsed records from download response.
         */
        KSDownloadResponseParser.prototype.getSDKObjectsListFromObjectDownloadResponse = function (downloadResponse, objectName, objectServiceName) {
            logger.trace(LOG_PREFIX, "Starting the download response parsing for object : " + objectName);

            var records = downloadResponse[KSInternalConstants.RECORDS];
            var opstatus = downloadResponse[KSInternalConstants.OP_STATUS];

            if (opstatus === KSInternalConstants.OPSTATUS_SUCCESS) {
                if (!KSCommonUtils.isNullOrEmptyObject(records)) {

                    logger.trace(LOG_PREFIX, "Began to parse record data in object: " + objectName
                        + " in object service: " + objectServiceName);
                    this.parseRecordDataInObject(records, objectName, objectServiceName);
                    logger.debug(LOG_PREFIX, "Successfully parsed the download response for object : " + objectName
                        + " in object service: " + objectServiceName);

                } else {
                    logger.info(LOG_PREFIX, "Download of object is successful with no records for the object: " + objectName
                        + " in object service: " + objectServiceName);
                }
            } else {
                logger.error(LOG_PREFIX, "Error in parsing the download response for object : " + objectName
                    + " in object service: " + objectServiceName);

                Array.prototype.push
                    .apply(this.errorMessages, KSSyncErrorUtils
                        .formatSyncErrors(objectServiceName, [downloadResponse[KSInternalConstants.ERR_MSG]], null, opstatus, objectName));
            }

            return Object.values(this.sdkObjectMapFromDownloadResponse);
        };

        /**
         * Method to retrieve a list of SDKObjects containing parsed records from download response.
         * @param downloadResponse JSON object from download network call.
         * @param objectServiceName Name of the object service downloaded.
         * @returns {Object} Array of SDKObjects containing parsed records from download response.
         */
        KSDownloadResponseParser.prototype.getSDKObjectsListFromObjectServiceDownloadResponse = function (downloadResponse, objectServiceName) {
            logger.trace(LOG_PREFIX, "Starting the download response parsing for object service : " + objectServiceName);

            var objects = downloadResponse[KSInternalConstants.OBJECTS_IN_RESPONSE];

            if (!voltmx.sdk.isNullOrUndefined(objects)) {
                var objectsLength = objects.length;
                for (var index = 0; index < objectsLength; index++) {
                    this.getSDKObjectsListFromObjectDownloadResponse(objects[index], objects[index].name, objectServiceName);
                }
            }

            logger.debug(LOG_PREFIX, "Successfully parsed the download response for object service : " + objectServiceName);
            return Object.values(this.sdkObjectMapFromDownloadResponse);
        };

        /**
         * Method to parse the records within an object.
         * @param records Records received from the download response.
         * @param objectName Name of the object downloaded.
         * @param objectServiceName Name of the object service downloaded.
         */
        KSDownloadResponseParser.prototype.parseRecordDataInObject = function (records, objectName, objectServiceName) {

            var recordsLength = records.length;
            var sdkObject = getSDKObjectByObjectName.call(this, objectName, objectServiceName);

            //Get Child Object Names and column Names
            var childObjectNames = getChildObjectNames(sdkObject);
            var columnNames = Object.keys(sdkObject.getMetadata()[KSInternalConstants.ATTRIBUTES]);

            for (var recordIndex = 0; recordIndex < recordsLength; recordIndex++) {
                var sdkObjectRecord = getSDKObjectRecordFromRecordInResponse(records[recordIndex], columnNames);

                sdkObject.addRecord(sdkObjectRecord);
                var childObjectNamesLength = childObjectNames.length;

                for (var childObjectIndex = 0; childObjectIndex < childObjectNamesLength; childObjectIndex++) {
                    var childObjectName = childObjectNames[childObjectIndex];

                    var childRecords = records[recordIndex][childObjectName];
                    if(!KSCommonUtils.isNullOrEmptyObject(childRecords) &&
                        voltmx.sdk.isArray(childRecords)) {

                        logger.trace(LOG_PREFIX, "Started parsing for related object : " + childObjectName
                            + " in object: " + objectName + " in object service: " + objectServiceName);
                        this.parseRecordDataInObject(childRecords, childObjectName, objectServiceName);
                    }
                }
            }
        };

        /**
         *  Returns the errorMessages
         * @returns {Array}
         */
        KSDownloadResponseParser.prototype.getDownloadSyncErrors = function () {
            return this.errorMessages;
        };

        /**
         * Method to build KSSDKObjectRecord from record in download response.
         * @param record Record receieved in download response.
         * @param columnNames Name of the columns in metadata for the object downloaded.
         * @returns {*|KSSDKObjectRecord} KSSDKObjectRecord built from record in download response.
         */
        function getSDKObjectRecordFromRecordInResponse(record, columnNames) {

            var columnNameAndValuesMap = {};
            for (var i = 0; i < columnNames.length; i++) {
                var recordValue = record[columnNames[i]];

                //This check is to avoid the case where child table name
                // is same as one of the column in the parent table.
                if(!voltmx.sdk.isArray(recordValue)) {
                    columnNameAndValuesMap[columnNames[i]] = recordValue;
                }
            }

            var sdkObjectRecordInstance = new KSSDKObjectRecord(columnNameAndValuesMap);
            var recordAction = voltmx.sdk.OfflineObjects.getKSSDKObjectRecordAction(record[KSInternalConstants._METADATA][KSInternalConstants.ACTION]);

            if (recordAction !== KSSDKObjectRecordAction.DELETE) {
                recordAction = KSSDKObjectRecordAction.UPDATE;
            }

            sdkObjectRecordInstance.setAction(recordAction);
            sdkObjectRecordInstance.setCheckSum(record[KSInternalConstants._METADATA][KSInternalConstants.CHECKSUM]);

            return sdkObjectRecordInstance;
        }

        /**
         * Method to create KSSDKObject.
         * @param objectName Name of the object downloaded.
         * @param objectServiceName Name of the object service downloaded.
         * @returns {*} KSSDKObject created using objectName, namespace and objectServiceName.
         */
        function getSDKObjectByObjectName(objectName, objectServiceName) {
            var sdkObject = this.sdkObjectMapFromDownloadResponse[objectName];

            if (voltmx.sdk.isNullOrUndefined(sdkObject)) {
                // This object here is taking objectName, empty namespace and objectServiceName..
                sdkObject = new _KSSDKObject.KSSDKObject(objectName, "", objectServiceName);
                this.sdkObjectMapFromDownloadResponse[objectName] = sdkObject;
            }

            return sdkObject;
        }

        /**
         * The method returns a list of object names to which are the child of the current object
         *
         * @param sdkObject The object for which child names list is required
         * @return The list of child object names
         * @throws KSError
         */
         function getChildObjectNames(sdkObject) {
            var relatedRelationshipList = sdkObject.getMetadata()[KSInternalConstants.OBJECTS_RELATIONSHIPS];
            var relatedRelationshipListLength = relatedRelationshipList.length;
            var childObjectNames = [];

            for (var i = 0; i < relatedRelationshipListLength; i++) {
                var relationshipMetadata = relatedRelationshipList[i];
                childObjectNames[i] = relationshipMetadata[KSInternalConstants.RELATIONSHIP_TARGET_OBJECT];

            }

            return childObjectNames;
        }

        exports.KSDownloadResponseParser = KSDownloadResponseParser;
    });
/**
 * KSFlatUploadPayloadBuilder.js
 * This file helps us to build upload records in flat way.
 * Created by Mohnish Bhamra (KH2321) on 25/08/19.
 * © Copyright 2019 Kony, Inc. All rights reserved.
 */
define('KSFlatUploadPayloadBuilder', [
        'exports', 'KSSyncDatabaseHelper', 'KSCommonUtils', 'KSRequestResponseUtils'],
    function(
        exports, KSSyncDatabaseHelper, KSCommonUtils, KSRequestResponseUtils) {

        var logger = voltmx.sdk.logsdk;
        var LOG_PREFIX = 'KSFlatUploadPayloadBuilder : ';
        var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;
        var KSDatabaseConstants = voltmx.sdk.OfflineObjects.KSDatabaseConstants;
        var getKSSDKObjectRecordAction = voltmx.sdk.OfflineObjects.getKSSDKObjectRecordAction;

        function KSFlatUploadPayloadBuilder(uploadBatchParams) {
            this.uploadBatchParams = uploadBatchParams;
            this.numberOfRecordsToUpload = 0;
        }

        function init(uploadBatchParams) {
            var flatUploadPayloadBuilder = new KSFlatUploadPayloadBuilder(uploadBatchParams);
            return flatUploadPayloadBuilder;
        }

        KSFlatUploadPayloadBuilder.prototype.getNumberOfRecordsToUpload = function() {
            return this.numberOfRecordsToUpload;
        };

        KSFlatUploadPayloadBuilder.prototype.setNumberOfRecordsToUpload = function(value) {
            this.numberOfRecordsToUpload = value;
        };

        /**
         * The method returns flat records to upload as JSON Array
         *
         * @param KSSDKObject, The object for which records as required
         * @return The JSON array of records
         * @throws OfflineObjectsException
         */
        KSFlatUploadPayloadBuilder.prototype.getFlatPayloadToUploadForObject = async function(sdkObject) {

            var recordsArray = [];
            var operations = sdkObject.getMetadata()[KSInternalConstants.OPERATIONS];
            if (!KSCommonUtils.isNullOrEmptyObject(operations)) {
                var operationsAllowedValueArray = Object.keys(operations);
                var operationsList = [];
                for (var operationTypeIndex in operationsAllowedValueArray) {
                    var operationType = operationsAllowedValueArray[operationTypeIndex];
                    if (operationType !== KSInternalConstants.KSObjectOperationType.get) {
                        operationsList.push(getKSSDKObjectRecordAction(operationType));
                    }
                }

                // Adding the action type 80 for "trackIntermediateUpdates" to the operation list
                operationsList.push(voltmx.sdk.OfflineObjects.KSSDKObjectRecordAction.DO_NOT_TRACK_INTERMEDIATE_UPDATES);

                var records = await KSSyncDatabaseHelper.readRecordsFromHistoryTableForFlatObject(
                    sdkObject, operationsList, this.uploadBatchParams);

                for (var recordIndex in records) {
                    var record = records[recordIndex];
                    var replaySequenceNumber = record.objectForKey(KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER);
                    var replaySequenceNumberLookUpMap = this.uploadBatchParams.getHierarchyContext().
                        getReplaySequenceNumberLookUpMap();
                    if (replaySequenceNumberLookUpMap[replaySequenceNumber] === true) {
                        logger.debug(LOG_PREFIX +
                            'This record was already added in the payload so skipping the processing of such records');
                    } else {
                        record.setParentObject(sdkObject);
                        var supportedRecordJson = KSRequestResponseUtils.convertSDKObjectRecordToJson(record);
                        recordsArray.push(supportedRecordJson);
                    }
                }

            } else {
                logger.warn(LOG_PREFIX + 'No operations are defined for this object : ' +
                    sdkObject.getFullyQualifiedName());
            }
            //This method is called for each object in an hierarchy, so we need to sum each time to the previous value
            this.setNumberOfRecordsToUpload(this.getNumberOfRecordsToUpload() + recordsArray.length);
            return recordsArray;

        };
        exports.getInstance = init;
    });
define("KSFlatUploadRequestBuilder", ["exports", "KSRequestResponseUtils"], function (exports, KSRequestResponseUtils) {

    var LOG_PREFIX = "KSFlatUploadRequestBuilder : ";

    /**
     * Class to construct upload payload
     * @constructor
     */
    function KSFlatUploadRequestBuilder() {
        this.objectsToUpload = [];
        this.recordsToUpload = [];
    }

    /**
     * Instantiates KSFlatUploadRequestBuilder
     * @param syncObject object to build payload for.
     * @param uploadBatchParams contains batch related info
     * @returns {Promise<KSFlatUploadRequestBuilder>}
     */
    async function init(syncObject, uploadBatchParams) {
        var uploadPayloadBuilder = new KSFlatUploadRequestBuilder();
        await uploadPayloadBuilder.populateObjectsAndRecordsToUploadFromSyncableObject(syncObject, uploadBatchParams);
        return uploadPayloadBuilder;
    }

    /**
     * Populates and Sort the records to upload according to rowId.
     * @param syncObject object to build payload for.
     * @param uploadBatchParams
     * @returns {Promise<void>}
     */
    KSFlatUploadRequestBuilder.prototype.populateObjectsAndRecordsToUploadFromSyncableObject = async function (syncObject, uploadBatchParams) {
        this.objectsToUpload = await syncObject.objectsToUpload(uploadBatchParams);
        var objectsToUploadLength = this.objectsToUpload.length;
        for (var index = 0; index < objectsToUploadLength; index++) {
            Array.prototype.push.apply(this.recordsToUpload, this.objectsToUpload[index].getRecords());
        }

        if (this.recordsToUpload.length === 0) {
            voltmx.sdk.logsdk.info(LOG_PREFIX + "No pending changes found to upload in object: " + syncObject.getFullyQualifiedName());
            return;
        }

        this.recordsToUpload.sort(function (a, b) {
            return a.getRowId() - b.getRowId()
        });
    };

    /**
     * Conditional check for length of records to upload.
     * @return {boolean} true or false based on the length of records to upload
     */
    KSFlatUploadRequestBuilder.prototype.areThereRecordsToUpload = function () {
        return this.recordsToUpload.length > 0;
    };

    /**
     * Forms the upload payload constructed from the records to upload.
     * @return {JSON} Upload payload constructed from the records to upload.
     */
    KSFlatUploadRequestBuilder.prototype.getUploadRequestJson = function () {
        return KSRequestResponseUtils.buildUploadPayloadFromObjects(this.recordsToUpload);
    };

    exports.getInstance = init;
});
/*
* KSHierarchicalRequestBuilder
* This file enables the offline object to detect & upload records in hierarchy.
* Created by Mohnish Bhamra (KH2321) on 30/07/19.
* © Copyright 2019 Kony, Inc. All rights reserved.
* */

define('KSHierarchicalRequestBuilder', [
           'exports', 'KSSetupManager', 'KSSQLQueryGenerator', 'KSDatabaseAPI', 'KSError',
           'KSHierarchicalUploadPayloadBuilder', 'KSFlatUploadPayloadBuilder', 'KSCommonUtils',
           'KSRequestResponseUtils'],
       function(
           exports, KSSetupManager, KSSQLQueryGenerator, _KSDatabaseAPI, _KSError,
           KSHierarchicalUploadPayloadBuilder, KSFlatUploadPayloadBuilder, KSCommonUtils,
           KSRequestResponseUtils,
       ) {

           'use strict';
           exports._esModule = true;

           var logger = voltmx.sdk.logsdk;
           var KSError = _KSError.KSError;
           var _KSSDKObject = require('KSSDKObject');
           var KSDatabaseAPI = _KSDatabaseAPI.KSDatabaseAPI;
           var LOG_PREFIX = 'KSHierarchicalRequestBuilder : ';
           var LOG_PERF_TAG = 'HierarchicalUploadPerformance : ';
           var KSTableType = voltmx.sdk.OfflineObjects.KSTableType;
           var KSErrorConstants = voltmx.sdk.OfflineObjects.KSErrorConstants;
           var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;

           function KSHierarchicalRequestBuilder(syncableObject, uploadBatchParams) {
               this.syncableObject = syncableObject;
               this.uploadBatchParams = uploadBatchParams;
           }

           function init(syncableObject, uploadBatchParams) {
               var uploadPayloadRequestBuilder = new KSHierarchicalRequestBuilder(syncableObject,
                                                                                  uploadBatchParams);
               return uploadPayloadRequestBuilder;
           }

           KSHierarchicalRequestBuilder.prototype.areThereRecordsToUpload = async function() {
               var setupContext = KSSetupManager.getInstance().getSetupContext();
               var namespaceMetadataMap = setupContext[this.syncableObject.getFullyQualifiedName()]
                   [KSInternalConstants.NAMESPACE_METADATA_DICTIONARY];
               var areThereRecordsInHistoryTable = false;

               if (!KSCommonUtils.isNullOrEmptyObject(namespaceMetadataMap)) {
                   for (var namespace in namespaceMetadataMap) {
                       var namespaceMetadata = namespaceMetadataMap[namespace];
                       logger.debug(
                           LOG_PREFIX + 'Started building the upload payload for the namespace: ' + namespace);
                       var objectMetadataDictionary = namespaceMetadata[KSInternalConstants.OBJECT_METADATA_DICTIONARY];
                       for (var objectMetadataEntry in  objectMetadataDictionary) {
                           var selectQueryFromHistoryTable = KSSQLQueryGenerator.buildPreparedStatementsOfTypeRead(
                               objectMetadataDictionary[objectMetadataEntry][KSInternalConstants.NAME],
                               KSTableType.HISTORY);
                           var dataFromInnerQuery = await KSDatabaseAPI.executeQuery(selectQueryFromHistoryTable);
                           var historyTableRecordCount = dataFromInnerQuery.length;
                           if (historyTableRecordCount > 0) {
                               areThereRecordsInHistoryTable = true;
                               break;
                           }
                       }
                   }
               } else {
                   throw new KSError(KSErrorConstants.SETUP_NAMESPACE_METADATA_NOT_FOUND);
               }
               return areThereRecordsInHistoryTable;
           };

           /**
            * The method which returns JSON array of records to be uploaded by parsing through all the object metadata
            * for a given object service
            *
            * @return JSON array of records to be uploaded
            * @throws OfflineObjectsException
            */
           KSHierarchicalRequestBuilder.prototype.getRecordsToUploadAsJsonArray = async function() {
               var payloadRecordsJson = [];
               logger.perf(LOG_PERF_TAG + 'Started building the records json to upload for the object service: ' +
                               this.syncableObject.getFullyQualifiedName());
               var startTime = new Date().getTime();
               logger.debug(LOG_PREFIX, 'Starting to build hierarchical upload. Start time: ' + startTime);
               var hierarchicalUploadPayloadBuilder = KSHierarchicalUploadPayloadBuilder.getInstance(
                   this.uploadBatchParams);
               var flatUploadPayloadBuilder = KSFlatUploadPayloadBuilder.getInstance(this.uploadBatchParams);
               var setupContext = KSSetupManager.getInstance().getSetupContext();
               var namespaceMetadataMap = setupContext[this.syncableObject.getFullyQualifiedName()][KSInternalConstants.NAMESPACE_METADATA_DICTIONARY];
               if (!KSCommonUtils.isNullOrEmptyObject(namespaceMetadataMap)) {
                   for (var namespaceMetadataName in namespaceMetadataMap) {
                       var namespaceMetadata = namespaceMetadataMap[namespaceMetadataName];
                       logger.info(LOG_PREFIX,
                                   'Started building the upload payload for the namespace: ' +
                                       namespaceMetadataName);
                       await this.buildRecordsPayload(namespaceMetadata, namespaceMetadataName,
                                                      hierarchicalUploadPayloadBuilder,
                                                      flatUploadPayloadBuilder, payloadRecordsJson);
                   }
               } else {
                   throw new KSError(KSErrorConstants.SETUP_NAMESPACE_METADATA_NOT_FOUND);
               }
               var endTime = new Date().getTime();
               logger.perf(LOG_PERF_TAG,
                           'Finished building hierarchical upload. End time: ' + endTime + ' ms');
               logger.perf(LOG_PERF_TAG,
                           'Total time to build hierarchical upload : ' + (endTime - startTime) + ' ms');
               return payloadRecordsJson;
           };

           /**
            * The method builds a Json record list
            *
            * @param objectName The object name to which hierarchy needs to be buildRecordsPayload
            * @param namespace The namespace of current object
            * @param hierarchicalUploadPayloadBuilder The builder
            * @param flatUploadPayloadBuilder The builder
            * @param byHierarchy
            * @throws OfflineObjectsException
            */
           KSHierarchicalRequestBuilder.prototype.buildJsonRecordsToUploadForAnObject = async function(
               objectName,
               namespace,
               hierarchicalUploadPayloadBuilder,
               flatUploadPayloadBuilder,
               byHierarchy,
           ) {
               logger.info(LOG_PREFIX, 'Started building the upload payload for the object: ' + objectName);
               var sdkObject = new _KSSDKObject.KSSDKObject(objectName, namespace);
               var result;
               if (byHierarchy === true) {
                   result = await hierarchicalUploadPayloadBuilder.populateGivenHierarchyWithRecords(sdkObject);
               } else {
                   result = await flatUploadPayloadBuilder.getFlatPayloadToUploadForObject(sdkObject);
               }
               return result;
           };

           /**
            * The method builds hierarchical payload of records for hierarchical Objects
            *
            * @param namespaceMetadata The namespace metadata for which we are building this
            * @param namespace The namespace
            * @param hierarchicalUploadPayloadBuilder Hierarchical Payload Builder
            * @param flatUploadPayloadBuilder Flat Payload Builder
            * @param payloadRecordsJson The payload to be build
            * @param isObjectHierarchyUsed map of os vs flag to check if that Object is already processed
            * @throws OfflineObjectsException
            */
           KSHierarchicalRequestBuilder.prototype.buildRecordsPayloadForHierarchicalObjects = async function(
               namespaceMetadata,
               namespaceName,
               hierarchicalUploadPayloadBuilder,
               flatUploadPayloadBuilder,
               payloadRecordsJson,
               isObjectHierarchyUsed,
           ) {
               var hierarchicalObjectList = namespaceMetadata[KSInternalConstants.ORDERED_HIERARCHICAL_OBJECT_NAME_LIST];
               var hierarchicalPayload = [];
               for (var hierarchicalObjectIndex in hierarchicalObjectList) {
                   var hierarchicalObjectName = hierarchicalObjectList[hierarchicalObjectIndex];
                   isObjectHierarchyUsed[hierarchicalObjectName] = true;
                   var objectMetadata = namespaceMetadata[KSInternalConstants.OBJECT_METADATA_DICTIONARY][hierarchicalObjectName];
                   hierarchicalPayload = await this.buildJsonRecordsToUploadForAnObject(
                       objectMetadata[KSInternalConstants.FULLY_QUALIFIED_NAME],
                       namespaceName, hierarchicalUploadPayloadBuilder, flatUploadPayloadBuilder, true);

                   payloadRecordsJson.push(...hierarchicalPayload);

                   if (this.uploadBatchParams.getNumberOfFreeSlotsInCurrentBatch() === 0) {
                       return;
                   }
               }
           };

           /**
            * The method builds hierarchical payload of records
            *
            * @param namespaceMetadata The namespace metadata for which we are building this
            * @param namespace The namespace
            * @param hierarchicalUploadPayloadBuilder Hierarchical Payload Builder
            * @param flatUploadPayloadBuilder Flat Payload Builder
            * @param payloadRecordsJson The payload to be build
            * @throws OfflineObjectsException
            */
           KSHierarchicalRequestBuilder.prototype.buildRecordsPayload = async function(namespaceMetadata,
                                                                                       namespaceName,
                                                                                       hierarchicalUploadPayloadBuilder,
                                                                                       flatUploadPayloadBuilder,
                                                                                       payloadRecordsJsonArray,
           ) {

               var isObjectHierarchyUsed = {};

               await this.buildRecordsPayloadForHierarchicalObjects(namespaceMetadata,
                                                                    namespaceName,
                                                                    hierarchicalUploadPayloadBuilder,
                                                                    flatUploadPayloadBuilder,
                                                                    payloadRecordsJsonArray,
                                                                    isObjectHierarchyUsed);

               if (this.uploadBatchParams.getNumberOfFreeSlotsInCurrentBatch() === 0) {
                   return;
               }

               await this.buildRecordsPayloadForFlatObjects(namespaceMetadata,
                                                            namespaceName,
                                                            hierarchicalUploadPayloadBuilder,
                                                            flatUploadPayloadBuilder,
                                                            payloadRecordsJsonArray,
                                                            isObjectHierarchyUsed);

               if (this.uploadBatchParams.getNumberOfFreeSlotsInCurrentBatch() === 0) {
                   return;
               }

               this.buildJsonRecordsToUploadForPendingRecords();
           };

           /**
            * The method builds hierarchical payload of records which are still pending after the entire payload is constructed
            *
            * @throws OfflineObjectsException
            */
           KSHierarchicalRequestBuilder.prototype.buildJsonRecordsToUploadForPendingRecords = function() {
               var passCount = this.uploadBatchParams.getHierarchyContext().getPassCount();
               var skippedRecords = this.uploadBatchParams.getHierarchyContext().getPendingRecords();
               logger.debug(LOG_PREFIX + 'Records skipped in run ' + passCount + ': ' + skippedRecords.length);
               if (skippedRecords.length > 0) {
                   if (passCount <= KSInternalConstants.MAX_PASS_COUNT_FOR_HIERARCHICAL_UPLOADS) {
                       logger.debug(LOG_PREFIX, 'Starting pass : ' + passCount);
                       this.uploadBatchParams.getHierarchyContext().setPassCount(passCount + 1);
                   } else {
                       throw new KSError(KSErrorConstants.SYNC_HIERARCHICAL_UPLOAD_BUILDER_MAX_PASS_COUNT_REACHED);
                   }
               }
           };

           /**
            * Forms the upload payload constructed from the records to upload.
            * @return {JSON} Upload payload constructed from the records to upload.
            */
           KSHierarchicalRequestBuilder.prototype.getUploadRequestJson = async function() {
               var payload = {};
               payload[KSInternalConstants.CHECKSUM] = '';
               payload[KSInternalConstants.SESSION_ID] = '';
               payload[KSInternalConstants.HAS_MORE_RECORDS] = 'false';
               payload[KSInternalConstants.ABORT_ON_ERROR] = 'false';
               payload[KSInternalConstants._METADATA] = {
                   [KSInternalConstants.TOTAL_NAMESPACES]: '0',
                   [KSInternalConstants.TOTAL_RECORDS]: '0',
                   [KSInternalConstants.TOTAL_OBJECTS]: '0',
                   [KSInternalConstants.RECORD_COUNT]: '0',
               };
               payload[KSInternalConstants.RECORDS] = await this.getRecordsToUploadAsJsonArray();
               return payload;
           };

           /**
            * The method builds hierarchical payload of records for flat Objects
            *
            * @param namespaceMetadata The namespace metadata for which we are building this
            * @param namespace The namespace
            * @param hierarchicalUploadPayloadBuilder Hierarchical Payload Builder
            * @param flatUploadPayloadBuilder Flat Payload Builder
            * @param payloadRecordsJson The payload to be build
            * @param isObjectHierarchyUsed map of os vs flag to check if that Object is already processed
            * @throws OfflineObjectsException
            */
           KSHierarchicalRequestBuilder.prototype.buildRecordsPayloadForFlatObjects = async function(
               namespaceMetadata,
               namespace,
               hierarchicalUploadPayloadBuilder,
               flatUploadPayloadBuilder,
               payloadRecordsJson,
               isObjectHierarchyUsed,
           ) {
               var objectMetadataDictionary = namespaceMetadata[KSInternalConstants.OBJECT_METADATA_DICTIONARY];
               var flatPayload = [];
               var flatJsonRecords = [];
               for (var objectMetadataIndex in objectMetadataDictionary) {
                   var objectMetadata = objectMetadataDictionary[objectMetadataIndex];
                   var objectMetadataName = objectMetadata[KSInternalConstants.NAME];
                   if (KSCommonUtils.isNullOrEmptyObject(isObjectHierarchyUsed[objectMetadataName]) ||
                       isObjectHierarchyUsed[objectMetadataName] !== true) {
                       flatPayload = await this.buildJsonRecordsToUploadForAnObject(objectMetadataName,
                                                                                    namespace,
                                                                                    hierarchicalUploadPayloadBuilder,
                                                                                    flatUploadPayloadBuilder,
                                                                                    false);
                       flatJsonRecords = flatJsonRecords.concat(flatPayload);
                       isObjectHierarchyUsed[objectMetadataName] = true;
                   }
               }

               this.chunkFlatRecords(flatJsonRecords, payloadRecordsJson);
           };

           /**
            * The method chunks the given flat records to particular batchSize
            *
            * @param flatJsonRecords The records which are to be chunked
            * @param payloadRecordsJson The chunked records will be added to this
            * @throws OfflineObjectsException
            */
           KSHierarchicalRequestBuilder.prototype.chunkFlatRecords = function(flatJsonRecords,
                                                                              payloadRecordsJson,
           ) {
               try {
                   flatJsonRecords = KSRequestResponseUtils.mergeArraysAndSortRecordsByReplaySequenceNumber(
                       flatJsonRecords, []);
                   var numberOfFreeSlotsInCurrentBatch = this.uploadBatchParams.getNumberOfFreeSlotsInCurrentBatch();
                   var chunkedPayload = [];
                   var rowId = -1;
                   for (var index = 0, flatJsonRecordsLength = flatJsonRecords.length; index <
                   flatJsonRecordsLength && index < numberOfFreeSlotsInCurrentBatch; index++) {
                       var record = flatJsonRecords[index];
                       rowId = record[KSInternalConstants._METADATA][KSInternalConstants.ROW_ID];
                       this.uploadBatchParams.getHierarchyContext().
                           getReplaySequenceNumberLookUpMap()[rowId] = true;
                       delete this.uploadBatchParams.getHierarchyContext().getPendingRecords()[rowId];
                       chunkedPayload[index] = record;
                   }
                   payloadRecordsJson.push(...chunkedPayload);
                   this.uploadBatchParams.setLastRSNOfPreviousBatch(rowId);
                   this.uploadBatchParams.setNumberOfFreeSlotsInCurrentBatch(
                       this.uploadBatchParams.getUploadBatchSize() - payloadRecordsJson.length);
               } catch (exception) {
                   throw new KSError(new Error(KSErrorConstants.SYNC_GENERIC_JSON_PARSING_ERROR_KEY,
                                               `${KSErrorConstants.SYNC_GENERIC_JSON_PARSING_ERROR_VALUE} : ${exception.message}`),
                                     exception);
               }
           };

           exports.getInstance = init;
       });
/**
 * KSHierarchicalUploadPayloadBuilder.js
 * This file helps us to build upload records in hierarchy
 * Created by Mohnish Bhamra (KH2321) on 25/08/19.
 * © Copyright 2019 Kony, Inc. All rights reserved.
 */
define('KSHierarchicalUploadPayloadBuilder', [
        'exports', 'KSSetupManager', 'KSDatabaseAPI', 'KSError',
        'KSCommonUtils', 'KSMetadataUtils', 'KSSyncDatabaseHelper',
        'KSRequestResponseUtils', 'KSSDKObjectRecord'],
    function(
        exports, KSSetupManager, _KSDatabaseAPI, _KSError,
        KSCommonUtils, KSMetadataUtils, KSSyncDatabaseHelper,
        KSRequestResponseUtils, _KSSDKObjectRecord) {

        "use strict";
        exports._esModule = true;

        var logger = voltmx.sdk.logsdk;
        var LOG_PREFIX = 'KSHierarchicalUploadPayloadBuilder : ';
        var KSError = _KSError.KSError;
        var _KSSDKObject = require('KSSDKObject');
        var KSSDKObjectRecord = _KSSDKObjectRecord.KSSDKObjectRecord;
        var KSDatabaseAPI = _KSDatabaseAPI.KSDatabaseAPI;
        var KSTableType = voltmx.sdk.OfflineObjects.KSTableType;
        var KSErrorConstants = voltmx.sdk.OfflineObjects.KSErrorConstants;
        var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;
        var KSDatabaseConstants = voltmx.sdk.OfflineObjects.KSDatabaseConstants;
        var getKSSDKObjectRecordAction = voltmx.sdk.OfflineObjects.getKSSDKObjectRecordAction;

        function KSHierarchicalUploadPayloadBuilder(uploadBatchParams) {
            this.numberOfRecordsToUpload = 0;
            this.uploadBatchParams = uploadBatchParams;
            this.pendingRecords = uploadBatchParams.getHierarchyContext().getPendingRecords();
            this.replaySequenceNumberLookUpMap = uploadBatchParams.getHierarchyContext().
                getReplaySequenceNumberLookUpMap();
        }

        function init(uploadBatchParams) {
            var uploadPayloadBuilder = new KSHierarchicalUploadPayloadBuilder(uploadBatchParams);
            return uploadPayloadBuilder;
        }

        KSHierarchicalUploadPayloadBuilder.prototype.populateGivenHierarchyWithRecords = async function(rootObject) {
            var recordsArray = [];
            var objectMetadata = rootObject[KSInternalConstants.METADATA];
            var operations = objectMetadata[KSInternalConstants.OPERATIONS];
            if (!KSCommonUtils.isNullOrEmptyObject(operations)) {
                var numberOfFreeSlotsInCurrentBatch = this.uploadBatchParams.getNumberOfFreeSlotsInCurrentBatch();
                var operationTypeArray = Object.values(KSInternalConstants.KSObjectOperationType);
                for (var ksObjectOperationTypeIndex in operationTypeArray) {
                    var ksObjectOperationType = operationTypeArray[ksObjectOperationTypeIndex];
                    if (ksObjectOperationType !== KSInternalConstants.KSObjectOperationType.get &&
                        ksObjectOperationType !== KSInternalConstants.KSObjectOperationType.delete) {
                        var operationObject = operations[ksObjectOperationType];
                        if (!KSCommonUtils.isNullOrEmptyObject(operationObject)) {
                            this.createdRecordsWithAutoGeneratedPKMap = {};
                            // check whether the current operation object is in the update
                            try {
                                await this.populateJsonWithSupportedObjectRecords(recordsArray, rootObject,
                                    operationObject, ksObjectOperationType, null);
                            } catch (exception) {
                                throw new KSError(new Error(KSErrorConstants.SYNC_GENERIC_JSON_PARSING_ERROR_KEY,
                                    `${KSErrorConstants.SYNC_GENERIC_JSON_PARSING_ERROR_VALUE} : ${exception.message}`),
                                    exception);
                            }
                        } else {
                            logger.warn(LOG_PREFIX,
                                'The operation: ' + ksObjectOperationType + ' not defined for the object: '
                                + rootObject.getFullyQualifiedName() +
                                ' .So skipping this action hierarchy for the same object');
                        }
                    }
                    var tempBatchLimit = numberOfFreeSlotsInCurrentBatch - recordsArray.length;
                    this.uploadBatchParams.setNumberOfFreeSlotsInCurrentBatch(tempBatchLimit);
                    if (tempBatchLimit === 0) {
                        return recordsArray;
                    }
                }

                // Reverse mapping before deleting
                var operationObjectForUpdate = operations[KSInternalConstants.KSObjectOperationType.update];

                if (!KSCommonUtils.isNullOrEmptyObject(operationObjectForUpdate)) {
                    try {
                        await this.reverseMapRecordsAndAddThemToRecordsArray(recordsArray, rootObject,
                            operationObjectForUpdate);
                        var tempBatchLimit = numberOfFreeSlotsInCurrentBatch - recordsArray.length;
                        this.uploadBatchParams.setNumberOfFreeSlotsInCurrentBatch(tempBatchLimit);
                        if (tempBatchLimit === 0) {
                            return recordsArray;
                        }
                    } catch (e) {
                        throw new KSError(new Error(KSErrorConstants.SYNC_GENERIC_JSON_PARSING_ERROR_KEY,
                            `${KSErrorConstants.SYNC_GENERIC_JSON_PARSING_ERROR_VALUE} :` +
                            e.message));
                    }
                }

                var operationObjectForDelete = operations[KSInternalConstants.KSObjectOperationType.delete];
                if (!KSCommonUtils.isNullOrEmptyObject(operationObjectForDelete)) {
                    // check whether the current operation object is in the update
                    try {
                        await this.populateJsonWithSupportedObjectRecords(recordsArray, rootObject,
                            operationObjectForDelete,
                            KSInternalConstants.KSObjectOperationType.delete, null);
                        var tempBatchLimit = numberOfFreeSlotsInCurrentBatch - recordsArray.length;
                        this.uploadBatchParams.setNumberOfFreeSlotsInCurrentBatch(tempBatchLimit);
                    } catch (e) {
                        throw new KSError(new Error(KSErrorConstants.SYNC_GENERIC_JSON_PARSING_ERROR_KEY,
                            `${KSErrorConstants.SYNC_GENERIC_JSON_PARSING_ERROR_VALUE} :` +
                            e.message));
                    }
                } else {
                    logger.warn(LOG_PREFIX + 'The operation: ' + KSInternalConstants.KSObjectOperationType.delete +
                        ' not defined for the object: '
                        + rootObject.getFullyQualifiedName() +
                        ' .So skipping this forward hierarchy for the same object');
                }

            } else {
                logger.warn(LOG_PREFIX + 'The object: ' + rootObject.getFullyQualifiedName() +
                    ' doesn\'t have any operations defined for it. So skipping the payload building activity');
            }
            return recordsArray;
        };

        /**
         * The records that needs to be put in pending records
         *
         * @param records The records that needs to be put in pending records
         */
        KSHierarchicalUploadPayloadBuilder.prototype.populatePendingRecordsList = function(records) {
            for (var recordIndex in records) {
                var record = records[recordIndex];
                var replaySequenceNumber = record[KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER];
                this.pendingRecords[replaySequenceNumber] = record;
            }
        };

        /**
         * The method helps populate payload json with supported objects
         *
         * @param recordsArray The array that should be populated
         * @param parentObject The parent object
         * @param operationObject The operation object for which the mapping needs to be created
         * @param operationType The operation type like create, update ..
         * @param parentRecord The parent record for the supported objects need to be populated
         * @throws OfflineObjectsException
         */
        KSHierarchicalUploadPayloadBuilder.prototype.populateJsonWithSupportedObjectRecords =
            async function(recordsArray, parentObject, operationObject, operationType, parentRecord) {

                var childObject = new _KSSDKObject.KSSDKObject(operationObject[KSInternalConstants.NAME],
                    parentObject[KSInternalConstants.NAMESPACE], parentObject.getObjectServiceName());

                var recordsInHistoryTable = await
                    this.getRelatedChildRecordsGivenParentRecordFromHistoryTableByActionTypeAndOrderedByRsn(
                        childObject,
                        getKSSDKObjectRecordAction(operationType), parentRecord, false);

                // The records that where skipped as there where multi edits for it with lower rsn with some other action
                var pendingMultiEditedRecords = await
                    this.getRelatedChildRecordsGivenParentRecordFromHistoryTableByActionTypeAndOrderedByRsn(
                        childObject,
                        getKSSDKObjectRecordAction(operationType), parentRecord, true);
                this.populatePendingRecordsList(pendingMultiEditedRecords);
                if (recordsInHistoryTable.length > 0) {
                    var isObjectWithAutoGeneratedPK = KSMetadataUtils.doesObjectHaveAutoGeneratedPrimaryKey(
                        childObject);
                    for (var recordIndex in recordsInHistoryTable) {
                        var record = recordsInHistoryTable[recordIndex];
                        if (KSCommonUtils.isNullOrEmptyObject(parentRecord)) {
                            // parent is null if this is a new hierarchy being build
                            this.createdRecordsWithAutoGeneratedPKMap = {};
                        }
                        record.setParentObject(childObject);
                        var pkHash = KSCommonUtils.getPrimaryKeyConcatenatedWithCommas(record);
                        var replaySequenceNumber = record.objectForKey(KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER);
                        // check for records with auto generated pk which should not be packed if create of this same record is in the current hierarchy
                        if (!KSCommonUtils.isNullOrEmptyObject(
                            this.createdRecordsWithAutoGeneratedPKMap[childObject.getFullyQualifiedName()]) &&
                            !KSCommonUtils.isNullOrEmptyObject(
                                this.createdRecordsWithAutoGeneratedPKMap[childObject.getFullyQualifiedName()][pkHash]) &&
                            this.createdRecordsWithAutoGeneratedPKMap[childObject.getFullyQualifiedName()][pkHash] &&
                            operationType !== KSInternalConstants.KSObjectOperationType.create &&
                            isObjectWithAutoGeneratedPK) {
                            logger.debug(LOG_PREFIX + '[Auto Generated Record Create] ' +
                                'Record skipped from being placed in the current hierarchy as this record was added as a newly created record');
                            this.pendingRecords[replaySequenceNumber] = record;
                        } else {
                            if (this.replaySequenceNumberLookUpMap[replaySequenceNumber] === true) {
                                logger.debug(LOG_PREFIX +
                                    'This record was already added in the payload so skipping the processing of such records');
                            } else {
                                this.replaySequenceNumberLookUpMap[replaySequenceNumber] = true;
                                delete this.pendingRecords[replaySequenceNumber];
                                if (operationType === KSInternalConstants.KSObjectOperationType.create &&
                                    isObjectWithAutoGeneratedPK === true) {
                                    // populating the map in case of auto generated pk and is newly created record
                                    var createdRecordsMap = this.createdRecordsWithAutoGeneratedPKMap[childObject.getFullyQualifiedName()];
                                    if (KSCommonUtils.isNullOrEmptyObject(createdRecordsMap)) {
                                        createdRecordsMap = {};
                                    }
                                    createdRecordsMap[pkHash] = true;
                                    this.createdRecordsWithAutoGeneratedPKMap[childObject.getFullyQualifiedName()] = createdRecordsMap;
                                }
                                var supportedRecordJson = KSRequestResponseUtils.convertSDKObjectRecordToJson(
                                    record);
                                // forward mapping the current hierarchy with its supported objects
                                await this.forwardMapSupportedObjectsWithChildRecords(operationObject, childObject,
                                    record, supportedRecordJson, false);
                                recordsArray.push(supportedRecordJson);
                                this.numberOfRecordsToUpload++;
                            }
                        }
                    }
                } else {
                    logger.debug(LOG_PREFIX + 'The object : ' + operationObject[KSInternalConstants.NAME] +
                        ' doesn\'t not have any records with change type: '
                        + operationType +
                        ' in the history table. So reverse mapping this action hierarchy for the same object from' +
                        ' its supported objects');
                }
            };

        /**
         * The method to get all child records for a given parent record or
         * get all the records if no parent record given
         *
         * @param sdkObject The sdk object for which records needs to be pulled
         * @param action The action type for which records are needed
         * @param parentRecord The parent record
         * @return records fetched
         * @throws OfflineObjectsException
         */
        KSHierarchicalUploadPayloadBuilder.prototype.getRelatedChildRecordsGivenParentRecordFromHistoryTableByActionTypeAndOrderedByRsn =
            async function(sdkObject, action, parentRecord, shouldGetPendingRecords) {
                var recordsFromDB;
                if (parentRecord == null) {
                    recordsFromDB = await KSSyncDatabaseHelper.readRecordsFromHistoryTableOfRootParentObject(
                        sdkObject,
                        action,
                        this.uploadBatchParams, shouldGetPendingRecords);
                } else {
                    recordsFromDB = await KSSyncDatabaseHelper.readRelatedChildRecordsFromHistoryTable(
                        sdkObject, action,
                        parentRecord, this.uploadBatchParams, shouldGetPendingRecords);
                }
                var recordsSDKObject = KSSyncDatabaseHelper.recordsFromRecordsDictToUpload(recordsFromDB);
                return recordsSDKObject;
            };

        /**
         * The function does the reverse mapping given the operation object
         *
         * @param recordsArray The array to add reverse mapped records
         * @param parentObject The parent object
         * @param operationObject The operation object to reverse map
         */
        KSHierarchicalUploadPayloadBuilder.prototype.reverseMapRecordsAndAddThemToRecordsArray = async function(
            recordsArray, parentObject, operationObject) {
            var childObject = new _KSSDKObject.KSSDKObject(operationObject[KSInternalConstants.NAME],
                parentObject[KSInternalConstants.NAMESPACE], parentObject.getObjectServiceName());

            var reverseMappedArray = await this.reverseMapSupportedObjectsWithParentRecords(operationObject,
                childObject);
            //This method is called for each object in hierarchical manner , we need to sum up the each instance value
            this.numberOfRecordsToUpload = this.numberOfRecordsToUpload + reverseMappedArray.length;
            for (var i = 0; i < reverseMappedArray.length; i++) {
                recordsArray.push(reverseMappedArray[i]);
            }
        };

        /**
         * This method helps forward map records from history table of a parent object to history table of child object
         *
         * @param operationObject The operation object for which the mapping needs to be created
         * @param parentObject The parent object
         * @param parentRecord The parent record for which forward mapping needs to be done
         * @param parentRecordJson The record Json which should be filled up
         * @return The JSONArray of records
         * @throws OfflineObjectsException
         */
        KSHierarchicalUploadPayloadBuilder.prototype.forwardMapSupportedObjectsWithChildRecords = async function(
            operationObject, parentObject, parentRecord, parentRecordJson, isReverseMappingCall)
        {
            var whereThereRecordToMap = false;
            var supportedObjectsJsonArray = [];

            function populateSupportedRecordAndUpdateWhereRecordToMap(supportedObjectName) {

                if (supportedObjectsJsonArray.length > 0) {
                    whereThereRecordToMap = true;
                }
                // Adding theses supported objects records to parents
                if (!KSCommonUtils.isNullOrEmptyObject(parentRecordJson[supportedObjectName])) {
                    var records;
                    if (Array.isArray(parentRecordJson[supportedObjectName]) === true) {
                        records = parentRecordJson[supportedObjectName];
                    } else {
                        throw new KSError(new Error(KSErrorConstants.SYNC_GENERIC_JSON_PARSING_ERROR_KEY,
                                                    `${KSErrorConstants.SYNC_GENERIC_JSON_PARSING_ERROR_VALUE} :` +
                                                        'unable to get json array from parentRecordJson'));
                    }
                    try {
                        supportedObjectsJsonArray = KSRequestResponseUtils.mergeArraysAndSortRecordsByReplaySequenceNumber(
                            records,
                            supportedObjectsJsonArray);
                    } catch (e) {
                        throw new KSError(new Error(KSErrorConstants.SYNC_GENERIC_JSON_PARSING_ERROR_KEY,
                                                    `${KSErrorConstants.SYNC_GENERIC_JSON_PARSING_ERROR_VALUE} :` +
                                                        'unable to sort merged array of records & supportedObjectsJsonArray due to ' +
                                                        e.toString()));
                    }
                }
                if (supportedObjectsJsonArray.length > 0) {
                    parentRecordJson[supportedObjectName] = supportedObjectsJsonArray;
                }
                supportedObjectsJsonArray = [];
            }

            var supportedObjects = getSupportedObjects(operationObject);
            var operationTypeArray = Object.values(KSInternalConstants.KSObjectOperationType);
            for (var ksObjectOperationTypeIndex in operationTypeArray) {
                var ksObjectOperationType = operationTypeArray[ksObjectOperationTypeIndex];
                if (ksObjectOperationType !== KSInternalConstants.KSObjectOperationType.get &&
                    ksObjectOperationType !== KSInternalConstants.KSObjectOperationType.delete ||
                    isReverseMappingCall) {
                    var supportedObjectsForActionArray = supportedObjects[KSInternalConstants.OPERATION_MAP][ksObjectOperationType];
                    if (!KSCommonUtils.isNullOrEmptyObject(supportedObjectsForActionArray)) {
                        for (var supportedObjectsForActionArrayIndex in supportedObjectsForActionArray) {
                            var supportedObject = supportedObjectsForActionArray[supportedObjectsForActionArrayIndex];
                            var supportedObjectName = supportedObject[KSInternalConstants.NAME];
                            // populating the supported objects by recursion
                            // check whether supported object for action is updatable.
                            await this.populateJsonWithSupportedObjectRecords(supportedObjectsJsonArray,
                                                                              parentObject,
                                                                              supportedObject,
                                                                              ksObjectOperationType,
                                                                              parentRecord);
                            populateSupportedRecordAndUpdateWhereRecordToMap(supportedObjectName);
                        }
                    } else {
                        logger.warn(LOG_PREFIX + 'The operation: ' + ksObjectOperationType +
                        ' not defined for the object: '
                        + operationObject[KSInternalConstants.NAME] +
                        ' .So skipping this action hierarchy for the same object');
                    }
                }
            }

            var supportedObjectsForActionUpdate = supportedObjects[KSInternalConstants.OPERATION_MAP]
                [KSInternalConstants.KSObjectOperationType.update];
            if (!KSCommonUtils.isNullOrEmptyObject(supportedObjectsForActionUpdate)) {
                for (var supportedObjectForActionUpdateIndex in supportedObjectsForActionUpdate) {
                    var supportedObjectForActionUpdate = supportedObjectsForActionUpdate[supportedObjectForActionUpdateIndex];
                    await this.reverseMapRecordsAndAddThemToRecordsArray(supportedObjectsJsonArray,
                                                                         parentObject,
                                                                         supportedObjectForActionUpdate);
                    populateSupportedRecordAndUpdateWhereRecordToMap(supportedObjectForActionUpdate[KSInternalConstants.NAME]);
                }
            }

            var supportedObjectsForActionDelete = supportedObjects[KSInternalConstants.OPERATION_MAP]
                [KSInternalConstants.KSObjectOperationType.delete];
            if (!KSCommonUtils.isNullOrEmptyObject(supportedObjectsForActionDelete)) {
                for (var supportedObjectForActionDeleteIndex in supportedObjectsForActionDelete) {
                    var supportedObjectForActionDelete = supportedObjectsForActionDelete[supportedObjectForActionDeleteIndex];
                    await this.populateJsonWithSupportedObjectRecords(supportedObjectsJsonArray,
                                                                      parentObject,
                                                                      supportedObjectForActionDelete,
                                                                      KSInternalConstants.KSObjectOperationType.delete,
                                                                      parentRecord);
                    populateSupportedRecordAndUpdateWhereRecordToMap(supportedObjectForActionDelete[KSInternalConstants.NAME]);
                }
            }
            
            return whereThereRecordToMap;
        };

        function getSupportedObjects(operationObject) {
            var supportedObject = {};
            supportedObject[KSInternalConstants.ROOT_OBJECT_NAME] = operationObject[KSInternalConstants.NAME];
            supportedObject[KSInternalConstants.OPERATION_MAP] = {};
            var typeArray = Object.values(KSInternalConstants.KSObjectOperationType);
            var typeArrayLength = typeArray.length;
            for (var typeArrayIndex = 0; typeArrayIndex < typeArrayLength; typeArrayIndex++) {
                supportedObject[KSInternalConstants.OPERATION_MAP][typeArray[typeArrayIndex]] = [];
            }
            var actionArray = operationObject.actions;
            for (var actionArrayIndex = 0; actionArrayIndex < actionArray.length; actionArrayIndex++) {
                var actionObject = actionArray[actionArrayIndex];
                var actionObjectSupportedTypeArray = actionObject[KSInternalConstants.TYPE];
                for (var typeIndex = 0; typeIndex < actionObjectSupportedTypeArray.length; typeIndex++) {
                    var supportedObjectsInOperationForType = supportedObject[KSInternalConstants.OPERATION_MAP][actionObjectSupportedTypeArray[typeIndex]];
                    supportedObject[KSInternalConstants.OPERATION_MAP][actionObjectSupportedTypeArray[typeIndex]] = supportedObjectsInOperationForType.concat(
                        actionObject[KSInternalConstants.SUPPORTED_OBJECTS]);
                }
            }
            return supportedObject;
        }

        /**
         * The method prepares parent object from list of reverseParentRecordList
         *
         * @param reverseParentRecordList The reverse parent object list
         * @param childObject The child object
         * @return JSON object of parent record
         * @throws OfflineObjectsException
         */
        KSHierarchicalUploadPayloadBuilder.prototype.convertParentRecordToJson = function(
            reverseParentRecordList, childObject) {
            if (reverseParentRecordList.length > 1) {
                throw new KSError(
                    new Error(KSErrorConstants.SYNC_MORE_THAN_ONE_PARENT_FOUND_FOR_A_CHILD_RECORD_KEY,
                        `${KSErrorConstants.SYNC_MORE_THAN_ONE_PARENT_FOUND_FOR_A_CHILD_RECORD_VALUE} :` +
                        reverseParentRecordList.length));
            }
            var reverseParentRecord = reverseParentRecordList[0];
            reverseParentRecord.setParentObject(childObject);
            // Since the parent record will always have update action
            reverseParentRecord.setAction(KSInternalConstants.KSObjectOperationType.update);
            return KSRequestResponseUtils.convertSDKObjectRecordToJson(reverseParentRecord);
        };

        /**
         * Gets parent record for a given child record
         *
         * @param record The record for which parent record is needed
         * @param parentObject The parent record for the given child
         * @return The list of parent records
         * @throws OfflineObjectsException
         */
        KSHierarchicalUploadPayloadBuilder.prototype.getRelatedParentRecordFromMainTableForGivenChildObjectRecord = async function(
            record,
            childObject,
            parentObject) {
            var parentRecord = await KSSyncDatabaseHelper.readRelatedParentRecordsFromMainTable(record,
                childObject, parentObject, KSTableType.MAIN);

            if (parentRecord.length === 0) {
                // In case parent record is deleted, we should read it from the original table
                logger.info(LOG_PREFIX + 'No parent record found for the given child record inside MAIN table.');
                parentRecord = await KSSyncDatabaseHelper.readRelatedParentRecordsFromMainTable(record,
                    childObject, parentObject, KSTableType.ORIGINAL);
            }

            if (parentRecord.length === 0) {
                logger.warn(LOG_PREFIX + 'No parent record found for the given child record.');
            }

            return parentRecord;
        };

        /**
         * This method helps reverse map records from main table of a parent object to history table of child object
         *
         * @param operationObject The operation object for which the mapping needs to be created
         * @param childObject The child object for which reverse mapping needs to be done
         * @throws OfflineObjectsException
         */
        KSHierarchicalUploadPayloadBuilder.prototype.reverseMapSupportedObjectsWithParentRecords = async function(
            operationObject, childObject) {
            var reverseArray = [];
            var childSupportedObjects = getSupportedObjects(operationObject);
            var operationTypeArray = Object.values(KSInternalConstants.KSObjectOperationType);
            for (var ksObjectOperationTypeIndex in operationTypeArray) {
                var ksObjectOperationType = operationTypeArray[ksObjectOperationTypeIndex];
                if (ksObjectOperationType !== KSInternalConstants.KSObjectOperationType.get) {
                    var childSupportedObjectsForActionArray = childSupportedObjects[KSInternalConstants.OPERATION_MAP][ksObjectOperationType];

                    if (!KSCommonUtils.isNullOrEmptyObject(childSupportedObjectsForActionArray)) {
                        for (var childSupportedObjectForActionIndex in childSupportedObjectsForActionArray) {
                            var childSupportedObjectForAction = childSupportedObjectsForActionArray[childSupportedObjectForActionIndex];
                            var childOfChildObject = new _KSSDKObject.KSSDKObject(
                                childSupportedObjectForAction[KSInternalConstants.NAME],
                                childObject[KSInternalConstants.NAMESPACE], childObject.getObjectServiceName());
                            var recordsOfSupportedObjects = await this.getRelatedChildRecordsGivenParentRecordFromHistoryTableByActionTypeAndOrderedByRsn(
                                childOfChildObject,
                                getKSSDKObjectRecordAction(ksObjectOperationType), null, false);

                            var pendingMultiEditedRecords = await this.getRelatedChildRecordsGivenParentRecordFromHistoryTableByActionTypeAndOrderedByRsn(
                                childOfChildObject,
                                getKSSDKObjectRecordAction(ksObjectOperationType), null, true);
                            this.populatePendingRecordsList(pendingMultiEditedRecords);
                            // If there are no records found for this supported object, then reverse map again
                            if (recordsOfSupportedObjects.length === 0) {
                                logger.debug(
                                    LOG_PREFIX + 'The object : ' + childSupportedObjectForAction[KSInternalConstants.OPERATIONS_ACTIONS] +
                                    ' doesn\'t not have any records with change type: '
                                    + ksObjectOperationType +
                                    ' in the history table. So reverse mapping this action hierarchy for the same object from' +
                                    ' its supported objects');
                                // reverse mapping again
                                var reverseMappedArray = [];
                                if (ksObjectOperationType === KSInternalConstants.KSObjectOperationType.update) {
                                    reverseMappedArray = await this.reverseMapSupportedObjectsWithParentRecords(
                                        childSupportedObjectForAction,
                                        childOfChildObject);
                                }
                                if (reverseMappedArray.length > 0) {
                                    var parentRecord = new KSSDKObjectRecord(reverseMappedArray[0]);
                                    var reverseParentRecordList = await this.getRelatedParentRecordFromMainTableForGivenChildObjectRecord(
                                        parentRecord,
                                        childOfChildObject, childObject); //HERE
                                    if (!KSCommonUtils.isNullOrEmptyObject(reverseParentRecordList) &&
                                        reverseParentRecordList.length > 0) {
                                        var recordJson = this.convertParentRecordToJson(reverseParentRecordList,
                                            childObject);
                                        if (!KSCommonUtils.isNullOrEmptyObject(
                                            recordJson[childSupportedObjectForAction[KSInternalConstants.NAME]])) {
                                            var recordsArray = recordJson[childSupportedObjectForAction[KSInternalConstants.NAME]];
                                            reverseMappedArray = KSRequestResponseUtils.mergeArraysAndSortRecordsByReplaySequenceNumber(
                                                recordsArray, reverseMappedArray);
                                        }
                                        if (reverseMappedArray.length > 0) {
                                            recordJson[childSupportedObjectForAction[KSInternalConstants.NAME]] = reverseMappedArray;
                                        }
                                        reverseArray.push(recordJson);
                                    }
                                }
                            } else {
                                // for each record get its parent and then forward map from the parent.
                                for (var recordIndex in recordsOfSupportedObjects) {
                                    var record = recordsOfSupportedObjects[recordIndex];
                                    var replaySequenceNumber = record.objectForKey(
                                        KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER);
                                    record.setParentObject(childOfChildObject);
                                    if (this.replaySequenceNumberLookUpMap[replaySequenceNumber] === true) {
                                        logger.debug(LOG_PREFIX +
                                            'This record was already added in the payload so skipping the processing of such records ' +
                                            replaySequenceNumber);
                                    } else {
                                        var reverseParentRecordList = await this.getRelatedParentRecordFromMainTableForGivenChildObjectRecord(
                                            record,
                                            childOfChildObject, childObject);
                                        if (!KSCommonUtils.isNullOrEmptyObject(reverseParentRecordList) &&
                                            reverseParentRecordList.length > 0) {
                                            var recordJson = this.convertParentRecordToJson(reverseParentRecordList,
                                                childObject);
                                            var reverseParentRecord = reverseParentRecordList[0];
                                            var whereThereRecordToMap = await this.forwardMapSupportedObjectsWithChildRecords(
                                                operationObject,
                                                childObject, reverseParentRecord, recordJson, true);
                                            if (whereThereRecordToMap) {
                                                reverseArray.push(recordJson);
                                            }
                                        }
                                    }
                                }
                            }
                        }

                    } else {
                        logger.warn(LOG_PREFIX, 'The object: ' + operationObject[KSInternalConstants.NAME] +
                            ' doesn\'t not have any supported objects to map to for action: ' +
                            ksObjectOperationType);
                    }
                }
            }

            return reverseArray;
        };

        exports.getInstance = init;
    });
/**
 * Created by KH9400.
 * UploadBatchParams which contains information regarding upload for the particular batch
 */
define("KSUploadBatchParams",

    ["exports", "KSError", "KSSyncDatabaseHelper", "HierarchyContext"],

    function (exports, _KSError, KSSyncDatabaseHelper, HierarchyContext) {

        "use strict";
        exports._esModule = true;
        var logger = voltmx.sdk.logsdk;
        var LOG_PREFIX = "KSUploadBatchParams : ";
        var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;

        function KSUploadBatchParams() {
            //Last ReplaySequenceNumber of the records uploaded in the previous batch
            this.lastRSNOfPreviousBatch = KSInternalConstants.DEFAULT_RSN_OF_PREVIOUS_BATCH;

            //Batch Number of the particular batch
            this.uploadBatchNumber = KSInternalConstants.DEFAULT_BATCH_NUMBER;

            //Upload BatchSize provided by the user
            this.uploadBatchSize = null;

            // Last ReplaySequenceNumber for the entire Payload
            this.lastRSNOfUploadPayload = null;

            this.hierarchyContext = HierarchyContext.getInstance();

            //Number of records that can be added to the current batch to reach batchSize
            this.numberOfFreeSlotsInCurrentBatch;
        }

        async function init(objectServiceName) {
            var _this = new KSUploadBatchParams();

            _this.lastRSNOfUploadPayload = await KSSyncDatabaseHelper
                .getLastReplaySequenceNumberOfObjectService(objectServiceName);

            return _this;
        }

        KSUploadBatchParams.prototype.getHierarchyContext = function() {
            return this.hierarchyContext;
        };

        KSUploadBatchParams.prototype.getLastRSNOfUploadPayload = function() {
            return this.lastRSNOfUploadPayload;
        };

        KSUploadBatchParams.prototype.setLastRSNOfUploadPayload = function(lastRSNOfUploadPayload) {
            this.lastRSNOfUploadPayload = lastRSNOfUploadPayload;
        };

        KSUploadBatchParams.prototype.getLastRSNOfPreviousBatch = function() {
            return this.lastRSNOfPreviousBatch;
        };

        KSUploadBatchParams.prototype.setLastRSNOfPreviousBatch = function(lastRSNOfPreviousBatch) {
            this.lastRSNOfPreviousBatch = lastRSNOfPreviousBatch;
        };

        KSUploadBatchParams.prototype.getUploadBatchNumber = function() {
            return this.uploadBatchNumber;
        };

        KSUploadBatchParams.prototype.setUploadBatchNumber = function(uploadBatchNumber) {
            this.uploadBatchNumber = uploadBatchNumber;
        };

        KSUploadBatchParams.prototype.setUploadBatchSize = function(uploadBatchSize){
            this.uploadBatchSize = uploadBatchSize;
        };

        KSUploadBatchParams.prototype.getUploadBatchSize = function(){
            return this.uploadBatchSize ;
        };

        KSUploadBatchParams.prototype.setNumberOfFreeSlotsInCurrentBatch = function(numberOfFreeSlots) {
            this.numberOfFreeSlotsInCurrentBatch = numberOfFreeSlots;
        };

        KSUploadBatchParams.prototype.getNumberOfFreeSlotsInCurrentBatch = function() {
            return this.numberOfFreeSlotsInCurrentBatch;
        };

        exports.getInstance = init;
    });
define("KSUploadRecordsFilter", ["exports", "KSCommonUtils"], function (exports, KSCommonUtils) {

    var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;

    /**
     * Filters the given list of records and populates auto-gen , latestSuccessRecord, latestSuccessRecordRowId.
     * @param successRecords   array of sdkObjectRecords for given pk-value pair.
     * @param primaryKeyValue  map of primary-key values.
     * @constructor
     */
    function KSUploadRecordsFilter(successRecords, primaryKeyValue) {
        this.autoGenPKValuePairSentInRequest = {};
        this.pkValuePairSentInResponse = primaryKeyValue;
        this.isAutoGeneratedPKValueAvailable = false;
        var successRecordsLen = successRecords.length;
        if (successRecordsLen > 0) {
            for (var index = 0; index < successRecordsLen; index++) {
                if (!this.isAutoGeneratedPKValueAvailable) {
                    updateAutoGenPKInRecordIfExists.call(this, successRecords[index]);
                } else {
                    break;
                }
            }
        }

        this.latestSuccessRecord = successRecords.reduce(function (a, b) {
            if (a.getRowId() > b.getRowId()) {
                return a;
            }
            return b;
        });

        this.latestSuccessRecordRowId = this.latestSuccessRecord.getRowId();
        KSCommonUtils.removeUnwantedColumns(this.latestSuccessRecord.getParentObject().getMetadata(), this.latestSuccessRecord.getData());
    }

    /**
     * Checks for _primarykey in the given record and populates the auto-gen if any.
     * @param sdkObjectRecord  record to populate auto-gen key if any.
     */
    function updateAutoGenPKInRecordIfExists(sdkObjectRecord) {
        for (var primaryKey in this.pkValuePairSentInResponse) {
            var sdkObjectRecordData = sdkObjectRecord[KSInternalConstants.DATA];
            var autoGenKey = "_" + primaryKey;
            if (sdkObjectRecordData.hasOwnProperty(autoGenKey)) {
                this.autoGenPKValuePairSentInRequest[primaryKey] = sdkObjectRecordData[autoGenKey];
                this.isAutoGeneratedPKValueAvailable = true;
                delete sdkObjectRecordData[autoGenKey];
            } else {
                this.autoGenPKValuePairSentInRequest[primaryKey] = sdkObjectRecordData[primaryKey];
            }
        }
    }

    /**
     * Returns the auto-gen key value pair if any or non-auto gen.
     * @return JSON for primary-key value pair.
     */
    KSUploadRecordsFilter.prototype.getPrimaryKeyValuePair = function () {
        return this.isAutoGeneratedPKValueAvailable ? this.autoGenPKValuePairSentInRequest : this.pkValuePairSentInResponse;
    };

    /**
     * Returns true in case of any autogenerated key found in record.
     * @return {boolean} true if any auto-generated
     */
    KSUploadRecordsFilter.prototype.areAnyPKAutoGenerated = function () {
        return this.isAutoGeneratedPKValueAvailable;
    };

    /**
     * @return the latestSuccessRecord
     */
    KSUploadRecordsFilter.prototype.getLatestSuccessRecord = function () {
        return this.latestSuccessRecord;
    };

    /**
     * @return the latestSuccessRecordRowId
     */
    KSUploadRecordsFilter.prototype.getLatestSuccessRecordRowId = function () {
        return this.latestSuccessRecordRowId;
    };

    exports.KSUploadRecordsFilter = KSUploadRecordsFilter;
});
/*
* KSUploadRequestBuilderFactory
* This file enables the offline object to detect hierarchy. The file sends may send flat builder or hierarchy builder based on presence of hierarchy.
* Created by Mohnish Bhamra (KH2321) on 30/07/19.
* © Copyright 2019 Kony, Inc. All rights reserved.
* */

define('KSUploadRequestBuilderFactory',
    ['exports', 'KSFlatUploadRequestBuilder', 'KSHierarchicalRequestBuilder', 'KSMetadataUtils'],
    function(exports, KSFlatUploadRequestBuilder, KSHierarchicalRequestBuilder, KSMetadataUtils) {

        var LOG_PREFIX = 'KSUploadRequestBuilderFactory : ';
        var logger = voltmx.sdk.logsdk;

        /**
         * The factory which will return the right payload builder as per PERFORM_HIERARCHICAL_UPLOAD flag.
         *
         * @param syncableObject Syncable object for which upload needs to be performed.
         * @param batchParams    UploadBatchParams which contains UploadBatchSize, BatchNumber, lastRSNOfPreviousBatch, lastRSNToUploadInTheCurrentSession and hierarchyContext
         * @return The IUploadRequestBuilder
         * @throws OfflineObjectsException
         */
        async function getUploadRequestFactory(syncableObject, batchParams) {
            var requestBuilder;
            if (KSMetadataUtils.doesHierarchyExistInSyncableObject(syncableObject)) {
                requestBuilder = KSHierarchicalRequestBuilder.getInstance(syncableObject, batchParams);
            } else {
                logger.debug(LOG_PREFIX,
                    'Following flat upload strategy for sync object: ' + syncableObject.getFullyQualifiedName());
                requestBuilder = await KSFlatUploadRequestBuilder.getInstance(syncableObject, batchParams);
            }

            return requestBuilder;
        }

        exports.getUploadRequestFactory = getUploadRequestFactory;
    });
define('KSUploadResponseParser',
    ['exports', 'KSError', 'KSUploadRecordsFilter', 'KSSyncErrorUtils', 'KSCommonUtils','KSMetadataUtils'],
    function(exports, _KSError, _UploadRecordsFilter, KSSyncErrorUtils, KSCommonUtils, KSMetadataUtils) {

    var KSError = _KSError.KSError;
    var KSSDKObject = require("KSSDKObject");
    var _KSSDKObjectRecord = require("KSSDKObjectRecord");
    var KSErrorConstants = voltmx.sdk.OfflineObjects.KSErrorConstants;
    var UploadRecordsFilter = _UploadRecordsFilter.KSUploadRecordsFilter;
    var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;
    var KSSDKObjectRecordAction = voltmx.sdk.OfflineObjects.KSSDKObjectRecordAction;

    /**
     * Forms the dict after parsing the response of objects.
     * @param sdkObjects array of json objects from upload response.
     * @constructor
     */
    function KSUploadResponseParser(sdkObjects) {
        this.objects = sdkObjects;
        this.successObjectsMap = {};
        this.uploadResponseObjectsDict = {};
        this.syncErrors = [];
        parseResponse.call(this);
        filterRecords.call(this);
    }

    /**
     * Segregates the response over each object and filters the records.
     */
    function parseResponse() {
        var objectsLength = this.objects.length;
        for (var index = 0; index < objectsLength; index++) {
            var recordJson = this.objects[index][KSInternalConstants.RECORDS];
            var objectName = this.objects[index][KSInternalConstants.NAME];
            parseRecords.call(this, recordJson, objectName);
        }
    }

    /**
     * Parse the records for given object.
     * @param records    json array of records.
     * @param objectName name of the object for given records.
     */
    function parseRecords(records, objectName) {
        var uploadObject = getSDKObjectByObjectName.call(this, objectName);
        var primaryKeys = uploadObject.getPrimaryKeys();
        var recordsLength = records.length;
        for (var index = 0; index < recordsLength; index++) {
            var record = records[index];
            var recordMetadata = record[KSInternalConstants._METADATA];
            delete record[KSInternalConstants._METADATA];
            var sdkObjectRecord = new _KSSDKObjectRecord.KSSDKObjectRecord(record, uploadObject);
            populateSDKRecordMetadataInRecord(sdkObjectRecord, recordMetadata);
            var errorMessage = recordMetadata[KSInternalConstants.ERR_MSG];
            var primaryKeyValueMap = sdkObjectRecord.getPrimaryKeyValueMapOfUploadRecord(primaryKeys);
            var primaryKeyValues = JSON.stringify(primaryKeyValueMap);
            if (errorMessage) {
                Array.prototype.push.apply(this.syncErrors, KSSyncErrorUtils.formatSyncErrors(uploadObject.getObjectServiceName(),
                    [errorMessage],
                    primaryKeyValueMap,
                    sdkObjectRecord.getOpStatus(),
                    objectName));
                continue;
            }
            var rowid = recordMetadata[KSInternalConstants.ROW_ID];
            if (voltmx.sdk.isNullOrUndefined(rowid)) {
                throw new KSError(KSErrorConstants.SYNC_UPLOAD_ERROR, "rowId key missing for a record of object -" + objectName);
            }
            populateIntermediateErrorsInSyncErrors.call(this, recordMetadata[KSInternalConstants.INTERMEDIATE_ERR_MSG], uploadObject,
                primaryKeyValueMap,
                sdkObjectRecord.getOpStatus());
            sdkObjectRecord.setRowid(rowid);
            var relatedObjectNamesArray = KSMetadataUtils.getRelatedObjectNameList(uploadObject);
            for (var relatedObjectNameIndex in relatedObjectNamesArray) {
                var relatedObjectName = relatedObjectNamesArray[relatedObjectNameIndex];
                var childRecordsArray = sdkObjectRecord.objectForKey(relatedObjectName);
                if (!KSCommonUtils.isNullOrEmptyObject(childRecordsArray)) {
                    parseRecords.call(this, childRecordsArray, relatedObjectName);
                }
                delete sdkObjectRecord.getData()[relatedObjectName];
            }
            addUploadResponseObjectsDict.call(this, uploadObject.name, primaryKeyValues, sdkObjectRecord);
        }
    }

    /**
     * Forms the map which has object name as key and value as another map  { <object name> : { <PK value pair> : [list fo records] } }
     * @param objectName          key of the uploadResponseObjectsDict
     * @param primaryKeyValueMap  a key under given objectName
     * @param sdkobjectRecord     records to be populated in array of records under primaryKeyValueMap for given object name.
     */
    function addUploadResponseObjectsDict(objectName, primaryKeyValueMap, sdkobjectRecord) {
        if (!this.uploadResponseObjectsDict.hasOwnProperty(objectName)) {
            this.uploadResponseObjectsDict[objectName] = {};
        }
        if (!this.uploadResponseObjectsDict[objectName].hasOwnProperty(primaryKeyValueMap)) {
            this.uploadResponseObjectsDict[objectName][primaryKeyValueMap] = [];
        }
        this.uploadResponseObjectsDict[objectName][primaryKeyValueMap].push(sdkobjectRecord);
    }

    /**
     * Filters the records by UploadRecordsFilter which takes list of records under a given pk-value pair.
     */
    function filterRecords() {
        for (var objectName in this.uploadResponseObjectsDict) {
            var primaryKeyValueMapToRecords = this.uploadResponseObjectsDict[objectName];
            for (var primaryKeyValueMap in primaryKeyValueMapToRecords) {
                var uploadRecordsFilter = new UploadRecordsFilter(primaryKeyValueMapToRecords[primaryKeyValueMap], JSON.parse(primaryKeyValueMap));
                var sdkObject = this.successObjectsMap[objectName];
                sdkObject.addUploadFilterToPrimaryKeyValue(primaryKeyValueMap, uploadRecordsFilter);
            }
        }
    }

    /**
     * Populates the RecordMetadata in given SDKObjectRecord.
     * @param sdkObjectRecord recordMetadata to be added to the given record.
     * @param recordMetadata  to be populated in given sdkObjectRecord
     */
    function populateSDKRecordMetadataInRecord(sdkObjectRecord, recordMetadata) {
        var recordAction = voltmx.sdk.OfflineObjects.getKSSDKObjectRecordAction(recordMetadata[KSInternalConstants.ACTION]);
        if (recordAction !== KSSDKObjectRecordAction.DELETE) {
            recordAction = KSSDKObjectRecordAction.UPDATE;
        }
        sdkObjectRecord.setAction(recordAction);
        var checksum = recordMetadata[KSInternalConstants.CHECKSUM];
        sdkObjectRecord.setCheckSum(!voltmx.sdk.isNullOrUndefined(checksum) ? checksum : null);
        var opStatus = recordMetadata[KSInternalConstants.OP_STATUS];
        sdkObjectRecord.setOpStatus(!voltmx.sdk.isNullOrUndefined(opStatus) ? opStatus : sdkObjectRecord.recordMetadata.opStatus);
    }

    /**
     * Returns SDKObject instance if present in map , or creates and adds to map, returns it.
     * @param objectName instance to be created for.
     * @return KSSDKObject instance
     */
    function getSDKObjectByObjectName(objectName) {
        if (!this.successObjectsMap.hasOwnProperty(objectName)) {
            this.successObjectsMap[objectName] = new KSSDKObject.KSSDKObject(objectName);
        }
        return this.successObjectsMap[objectName];
    }

    /**
     * Populates intermediateErrors in syncErrors.
     * @param intermediateErrors errors got for a record
     * @param uploadObject       object got in upload response
     * @param primaryKeyValues   primary keys got for a record
     * @param opStatus           opstatus for a record
     */
    function populateIntermediateErrorsInSyncErrors(intermediateErrors, uploadObject, primaryKeyValues, opStatus) {
        if (!KSCommonUtils.isNullOrEmptyObject(intermediateErrors)) {
            var errors = [];
            for (var key in intermediateErrors) {
                errors.push(intermediateErrors[key]);
            }
            Array.prototype.push.apply(this.syncErrors, KSSyncErrorUtils.formatSyncErrors(uploadObject.getObjectServiceName(),
                errors,
                primaryKeyValues,
                opStatus,
                uploadObject.name));
        }
    }

    /**
     * @return the map of DATA_OBJECTS and SYNC_ERRORS.
     */
    KSUploadResponseParser.prototype.getRecordsToPersist = function () {
        var successObjects = [];
        for (var key in this.successObjectsMap) {
            successObjects.push(this.successObjectsMap[key]);
        }
        return {
            [KSInternalConstants.DATA_OBJECTS]: successObjects,
            [KSInternalConstants.UPLOAD_SYNC_ERRORS]: this.syncErrors
        };
    };

    exports.KSUploadResponseParser = KSUploadResponseParser;
});
/**
 * KSApplicationSync
 * Created by Harshini Bonam on 24/05/18.
 * Copyright © 2018 Kony. All rights reserved.
 */
define("KSApplicationSync", ["exports", "SyncEngine", "KSSyncMFUtils", "KSError", "KSApplicationSyncHelper"], function (exports, SyncEngine, KSSyncMFUtils, _KSError, KSApplicationSyncHelper) {

    "use strict";
    exports._esModule = true;
    var LOG_PREFIX = "KSApplicationSync : ";

    var syncEngineInstance = SyncEngine.getInstance();
    var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;
    var KSErrorConstants = voltmx.sdk.OfflineObjects.KSErrorConstants;
    var KSError = _KSError.KSError;

    /**
     * Method to perform Offline Application Sync Setup.
     *
     * @param objServiceList Object services with metadata URLs and other information
     * @param options required to setup the database connection
     * @param successCallback will be invoked on the success of setup.
     * @param failureCallback will be invoked at the time of any error.
     */
    exports.setup = function (objServiceList, options, successCallback, failureCallback) {
        try {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "Offline objects setup has begun.");
            syncEngineInstance.setup(objServiceList, options, successCallback, failureCallback);
        } catch (error) {
            voltmx.sdk.logsdk.error(LOG_PREFIX + "Offline objects setup has failed.");
            voltmx.sdk.verifyAndCallClosure(failureCallback, error);
        }
    };

    /**
     * Method to drop all tables in an Offline Application
     *
     * @param options required to setup the database connection
     * @param successCallback will be invoked on the successful drop of all tables of an Application.
     * @param failureCallback will be invoked if all tables are not dropped.
     */
    exports.drop = function (options, successCallback, failureCallback) {
        voltmx.sdk.logsdk.trace(LOG_PREFIX + "Offline objects drop called.");
        syncEngineInstance.drop(options, successCallback, failureCallback);
    };

    /**
     * Funtion to reset application's sync database.
     * This is done by dropping all tables followed by offline setup at application level.
     *
     * @param objectServiceList Objects with metadata URLs in a Dictionary
     * @param resetOptions are required to setup the database connection
     * @param successCallback will be invoked on the Success of Reset.
     * @param failureCallback will be invoked at the time of any error.
     */
    exports.reset = function (objServiceList, options, successCallback, failureCallback) {
        voltmx.sdk.logsdk.trace(LOG_PREFIX + "Offline objects reset called.");
        syncEngineInstance.reset(objServiceList, options, successCallback, failureCallback);
    };

    /**
     * Rollback Application to it's previous Sync State
     * @param successCallback will be invoked on the Success of rollback.
     * @param failureCallback will be invoked at the time of any error.
     */
    exports.rollback = function (successCallback, failureCallback) {
        voltmx.sdk.logsdk.trace(LOG_PREFIX + "Offline objects rollback called.");

        function onSuccess() {
            syncEngineInstance.rollbackTaskCompleted(KSInternalConstants.SYNCLEVEL_APPLICATION);
            voltmx.sdk.logsdk.info(LOG_PREFIX + "Offline objects rollback is successful.");
            voltmx.sdk.verifyAndCallClosure(successCallback, true);
        }

        function onFailure(error) {
            voltmx.sdk.logsdk.error(LOG_PREFIX + "Offline objects rollback has failed.");
            syncEngineInstance.rollbackTaskCompleted(KSInternalConstants.SYNCLEVEL_APPLICATION);
            if (!error.hasOwnProperty(KSInternalConstants.ERROR_DOMAIN)) {
                error = new KSError(KSErrorConstants.SYNC_GENERIC_ROLLBACK_ERROR, error.stack);
            }
            voltmx.sdk.verifyAndCallClosure(failureCallback, error);
        }

        syncEngineInstance.rollback().then(onSuccess, onFailure);
    };

    /**
     * Gets the token from MF-SDK
     * @param token set to Utils.
     */
    exports.setToken = function (token) {
        voltmx.sdk.logsdk.trace(LOG_PREFIX, "Began to set Token.");
        KSSyncMFUtils.setToken(token);
        voltmx.sdk.logsdk.debug(LOG_PREFIX, "Token set for Offline Objects.");
    };

    /**
     * Gets the reportingParams from MF-SDK
     * @param reportingParams sets to Utils.
     */
    exports.setReportingParams = function (reportingParams) {
        voltmx.sdk.logsdk.trace(LOG_PREFIX, "Began to set reportingParams.");
        KSSyncMFUtils.setReportingParams(reportingParams);
        voltmx.sdk.logsdk.debug(LOG_PREFIX, "reportingParams set for Offline Objects.");
    };

    /**
     * Method to perform Offline Application Sync.
     * @param options options required for Application Sync
     * @param successCallback will be invoked on the success of Application Sync.
     * @param failureCallback will be invoked on the failure of Application Sync.
     */
    exports.startSync = function (options, successCallback, failureCallback) {
        voltmx.sdk.logsdk.trace(LOG_PREFIX, "Application Sync Called.");
        try {
            KSApplicationSyncHelper.startSync(options, successCallback, failureCallback);
        } catch(error) {
            voltmx.sdk.logsdk.error(LOG_PREFIX + "Application Sync failed with error " + error.message);
            voltmx.sdk.verifyAndCallClosure(failureCallback, error);
        }
    }

});
/**
 * KSIncrementalRootMetaDataObject
 * Created by KH9363 on 4/07/19.
 * Copyright © 2019 Kony. All rights reserved.
 */

define("KSIncrementalRootMetadataObject",

    ["exports", "KSCommonUtils", "KSSQLQueryGenerator", "KSError", "KSMetadataUtils"],

    function (exports, KSCommonUtils, KSSQLQueryGenerator, _KSError, KSMetadataUtils) {

        "use strict";
        exports._esModule = true;

        var logger = voltmx.sdk.logsdk;
        var KSError = _KSError.KSError;

        var LOG_PREFIX = "KSIncrementalRootMetadataObject : ";
        var KSErrorConstants = voltmx.sdk.OfflineObjects.KSErrorConstants;
        var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;
        var KSDatabaseConstants = voltmx.sdk.OfflineObjects.KSDatabaseConstants;

        function KSIncrementalRootMetadataObject(rootMetadataObject, incrementalSchemaJSONArray) {
            this.createTables = {};
            this.dropTables = [];
            this.rootMetadataObject = rootMetadataObject;
            populatePropertiesFromIncrementalJSON.call(this, incrementalSchemaJSONArray);
        }

        /**
         * Populates the namespace metadata dictionary
         * @param jsonDictionary
         */
        function populatePropertiesFromIncrementalJSON(jsonDictionary) {
            logger.trace(LOG_PREFIX + "[populatePropertiesFromIncrementalJSON] called");
            var namespacesArray = jsonDictionary[KSInternalConstants.NAMESPACES];

            if (!voltmx.sdk.isArray(namespacesArray)) {
                throw new KSError(KSErrorConstants.SETUP_METADATA_NAMESPACES_NIL);
            }

            for (var nameSpaceIndex = 0; nameSpaceIndex < namespacesArray.length; nameSpaceIndex++) {
                var namespaceDictionary = namespacesArray[nameSpaceIndex];

                if(voltmx.sdk.isNullOrUndefined(namespaceDictionary) || !voltmx.sdk.util.isJsonObject(namespaceDictionary)) {
                    throw new KSError(KSErrorConstants.SETUP_METADATA_NAMESPACES_NIL);
                }

                var normalizedNamespace = KSMetadataUtils.normalizedNamespaceName(namespaceDictionary[KSInternalConstants.NAMESPACE_NAME]);
                var objectsArray = namespaceDictionary[KSInternalConstants.OBJECTS];
                if (!KSCommonUtils.isNullOrEmptyObject(objectsArray) && objectsArray.length > 0) {

                    var objectsArrayLength = objectsArray.length;
                    var nameSpaceAction = KSMetadataUtils.getActionFromIncrementalJSONNode(namespaceDictionary);

                    if (nameSpaceAction === KSDatabaseConstants.KSAction.CREATE) {
                        KSCommonUtils.mergeTwoJSONMaps(this.createTables,
                            retrieveMetadataForGivenObjectsFromRmo.call(this, normalizedNamespace, objectsArray));

                    } else if (nameSpaceAction === KSDatabaseConstants.KSAction.DELETE) {
                        this.dropTables = this.dropTables.concat(retrieveObjectNamesFromGivenObjects(normalizedNamespace, objectsArray));

                    } else if (nameSpaceAction === KSDatabaseConstants.KSAction.UPDATE) {
                        for (var objectsIndex = 0; objectsIndex < objectsArrayLength; objectsIndex++) {

                            var objectMetadataJsonDictionary = objectsArray[objectsIndex];
                            var objectName = objectMetadataJsonDictionary[KSInternalConstants.OBJECTS_NAME];

                            var objectAction = KSMetadataUtils.getActionFromIncrementalJSONNode(objectMetadataJsonDictionary);
                            if (objectAction === KSDatabaseConstants.KSAction.CREATE) {
                                this.createTables[objectName] = getObjectMetadataFromRootMetadataObject.call(this, normalizedNamespace, objectName);

                            } else if (objectAction === KSDatabaseConstants.KSAction.DELETE) {
                                this.dropTables.push(objectName);

                            } else if (objectAction === KSDatabaseConstants.KSAction.UPDATE) {
                                this.indicesUpdates = retrieveIndicesUpdates(objectsArray);
                            } else {
                                logger.warn(LOG_PREFIX + "Invalid action received from server for objectservice "
                                    + this.rootMetadataObject[KSInternalConstants.OBJECT_SERVICE_NAME]);
                            }
                        }
                    }
                }
            }
        }

        /**
         * Return tables with schema updates
         * @param {*} objectArray retrieved from incremental setup API response
         * @returns {*[]} list of all objects which contains indices updates
         */
        function retrieveIndicesUpdates(objectArray) {
            const indicesUpdates = []

            if (Array.isArray(objectArray) && objectArray.length > 0) {
                objectArray.forEach(object => {
                    if (
                        object
                        && 'action' in object
                        && ![KSDatabaseConstants.KSAction.CREATE, KSDatabaseConstants.KSAction.DELETE].includes(object.action)
                        && Array.isArray(object.fields)
                        && object.fields.length > 0
                    ){
                        const reflectedTables = KSSQLQueryGenerator.getAllTableNames(object.name)

                        reflectedTables.forEach((tableName) => {
                            const tableInfo = {
                                name: tableName,
                                createdFields: {},
                                deletedFields: {}
                            }

                            object.fields.forEach(field => {
                                if (field.action === KSDatabaseConstants.KSAction.CREATE) tableInfo.createdFields[field.name] = {}
                                if (field.action === KSDatabaseConstants.KSAction.DELETE) tableInfo.deletedFields[field.name] = {}
                            });

                            if (
                                Object.keys(tableInfo.createdFields).length > 0
                                || Object.keys(tableInfo.deletedFields).length > 0
                            ) indicesUpdates.push(tableInfo)
                        })
                    }
                })
            }

            return indicesUpdates
        }

        /**
         * Returns the MetadataObject from RootMetadataObject
         * @param namespaceName
         * @param objectsArray
         */
        function retrieveMetadataForGivenObjectsFromRmo(namespaceName, objectsArray) {
            logger.trace(LOG_PREFIX + "[retrieveMetadataForGivenObjectsFromRmo] called");
            var jsonOfMetadata = {};
            var objectsArrayLength = objectsArray.length;

            for (var i = 0; i < objectsArrayLength; i++) {
                var objectMetadataJsonDictionary;

                objectMetadataJsonDictionary = objectsArray[i];
                if (KSCommonUtils.isNullOrEmptyObject(objectMetadataJsonDictionary)) {
                    var errorMessage = "Metadata JSON from server does not contain OBJECTS key";
                    throw new KSError(KSErrorConstants.SETUP_METADATA_OBJECTS_NIL, errorMessage);
                }

                var objectName = objectMetadataJsonDictionary[KSInternalConstants.OBJECTS_NAME];
                var metadataObject = getObjectMetadataFromRootMetadataObject.call(this, namespaceName, objectName);
                jsonOfMetadata[objectName] = metadataObject;
            }
            return jsonOfMetadata;
        }

        function getObjectMetadataFromRootMetadataObject(namespaceName, objectName) {
            return this.rootMetadataObject[KSInternalConstants.NAMESPACE_METADATA_DICTIONARY][namespaceName]
                [KSInternalConstants.OBJECT_METADATA_DICTIONARY][objectName];
        }

        function retrieveObjectNamesFromGivenObjects(namespaceName, objectsArray) {
            logger.trace(LOG_PREFIX + "[retrieveObjectNamesFromGivenObjects] called");
            var objectNames = [];
            var objectsArrayLength = objectsArray.length;
            for (var i = 0; i < objectsArrayLength; i++)  {
                var objectName = objectsArray[i][KSInternalConstants.OBJECTS_NAME];
                var fullyQualifiedName = KSMetadataUtils.normalizedFullyQualifiedNameForNamespaceNameAndObjectName(namespaceName, objectName);
                objectNames.push(fullyQualifiedName);
            }

            return objectNames;
        }

        /** Populates the create and delete queries
         * @return incrementalQueries with create and delete queries
         */
        KSIncrementalRootMetadataObject.prototype.getIncrementalQueries = function() {
            logger.trace(LOG_PREFIX + "[getIncrementalQueries] called");
            var incrementalQueries = {};

            var incrementalCreateQueries = getAllCreateTableQueries.call(this);
            var incrementalDropQueries = getAllDropTableQueries.call(this);

            if(!KSCommonUtils.isNullOrEmptyObject(incrementalCreateQueries)) {
                incrementalQueries[KSDatabaseConstants.KSQueryTypes.CREATE] = incrementalCreateQueries;
            }

            if(!KSCommonUtils.isNullOrEmptyObject(incrementalDropQueries)) {
                incrementalQueries[KSDatabaseConstants.KSQueryTypes.DELETE] = incrementalDropQueries;
            }

            return incrementalQueries;
        };

        /** Returns create queries
         * @return queries
         */
        function getAllCreateTableQueries() {
            var queries = {};
            for (var objectName in this.createTables) {
                var tableQueries = KSSQLQueryGenerator.getQueriesToCreateTableForObject(this.createTables[objectName]);
                KSCommonUtils.mergeTwoJSONMaps(queries, tableQueries);
            }

            logger.trace(LOG_PREFIX, "Returning create queries for objectservice: "
                + this.rootMetadataObject[KSInternalConstants.OBJECT_SERVICE_NAME] + ": " + JSON.stringify(queries));
            return queries;
        }

        /**
         * Returns Table names to be deleted
         * @return {Array}
         */
        function getAllDropTableQueries() {
            var tableNames = [];
            for(var tableNameIndex in this.dropTables) {
                tableNames = tableNames.concat(KSSQLQueryGenerator.getAllTableNames(this.dropTables[tableNameIndex]));
            }

            logger.trace(LOG_PREFIX, "Returning delete queries for objectservice: "
                + this.rootMetadataObject[KSInternalConstants.OBJECT_SERVICE_NAME] + ": " + tableNames);
            return tableNames;
        }

        exports.KSIncrementalRootMetadataObject = KSIncrementalRootMetadataObject;
    });
/**
 * KSMetadataJSONParser
 * Created by Harshini Bonam on 24/05/18.
 * Copyright © 2018 Kony. All rights reserved.
 */

define("KSMetadataJSONParser", ["exports", "KSMetadataUtils", "KSCommonUtils", "KSError"],
    function(exports, KSMetadataUtils, KSCommonUtils, _KSError) {

        "use strict";
        exports._esModule = true;
        var KSError = _KSError.KSError;
        var LOG_PREFIX = "KSMetadataJSONParser : ";
        var KSErrorConstants = voltmx.sdk.OfflineObjects.KSErrorConstants;
        var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;

        /**
         * Gets the namespaces populated with information of all offline objects and their attributes
         * @param objectServiceContext object service metadata context
         * @param metadataResponse network JSON to be parsed
         * @return RootMetadataObject fully populated with the data from JSONObject
         * @throws Exception in case of errors
         */
        function parse (objectServiceContext, metadataResponse){
            var objectServiceName = objectServiceContext.name;

            runPass1(objectServiceContext, metadataResponse);
            voltmx.sdk.logsdk.trace(LOG_PREFIX, "Run pass 1 complete for " + objectServiceName);

            runPass2(objectServiceName, metadataResponse);
            voltmx.sdk.logsdk.trace(LOG_PREFIX, "Run pass 2 complete for " + objectServiceName);

            runPass3(metadataResponse.namespaceMetadataDictionary);
            voltmx.sdk.logsdk.trace(LOG_PREFIX, "Run pass 3 complete for " + objectServiceName);

            return metadataResponse;
        }

        /**
         * Method pushes dependents & parents objects to forward and reverse dependency maps
         * @param forwardHierarchicalDependencyMap - The forward dependency map to be filled
         * @param reverseHierarchicalDependencyMap - The reverse dependency map to be filled
         * @param rootObjectName The root object name
         * @param childObjectName The child object name
         */
        function pushObjectDependenciesToDependencyMaps(forwardHierarchicalDependencyMap,
                                                        reverseHierarchicalDependencyMap,
                                                        rootObjectName,
                                                        childObjectName) {
            function addObjectDependenciesToDependencyMap(dependencyMap, key, value) {
                if (KSCommonUtils.isNullOrEmptyObject(dependencyMap[key])) {
                    dependencyMap[key] = [];
                }

                if (!dependencyMap[key].includes(value)) {
                    dependencyMap[key].push(value);
                }
            }

            addObjectDependenciesToDependencyMap(forwardHierarchicalDependencyMap, rootObjectName,
                childObjectName);
            addObjectDependenciesToDependencyMap(reverseHierarchicalDependencyMap, childObjectName,
                rootObjectName);
        }

        /**
         * This function fills forward & reverse dependency map.
         * @param actionArray contains supported actions objects from network response.
         * @param forwardHierarchicalDependencyMap - this map gets updated as a result of execution of this function
         * @param reverseHierarchicalDependencyMap - this map gets updated as a result of execution of this function
         * @param rootObjectName
         */
        function getSupportedObjectDependency(actionArray, forwardHierarchicalDependencyMap,
                                              reverseHierarchicalDependencyMap, rootObjectName) {
            for (var actionsIndex = 0, actionArrayLength = actionArray.length;
                 actionsIndex < actionArrayLength; actionsIndex++) {
                var action = actionArray[actionsIndex];
                var supportedObjectsJsonArray = action[KSInternalConstants.SUPPORTED_OBJECTS];

                for (var supportedObjectsIndex = 0, supportedObjectsJsonArrayLength = supportedObjectsJsonArray.length;
                     supportedObjectsIndex < supportedObjectsJsonArrayLength; supportedObjectsIndex++) {
                    var supportedOperationObject = supportedObjectsJsonArray[supportedObjectsIndex];

                    getSupportedObjectDependency(supportedOperationObject[KSInternalConstants.OPERATIONS_ACTIONS],
                        forwardHierarchicalDependencyMap, reverseHierarchicalDependencyMap, rootObjectName);

                    pushObjectDependenciesToDependencyMaps(forwardHierarchicalDependencyMap,
                        reverseHierarchicalDependencyMap,
                        rootObjectName, supportedOperationObject[KSInternalConstants.NAME]);
                }
            }
        }

        /**
         * This function fetches forward & reverse dependency for an object.
         * @param object from network response
         * @param forwardHierarchicalDependencyMap - this map gets updated as a result of execution of this function
         * @param reverseHierarchicalDependencyMap - this map gets updated as a result of execution of this function
         */
        function fetchDependency(object, forwardHierarchicalDependencyMap, reverseHierarchicalDependencyMap) {
            var operationsMap = object[KSInternalConstants.OBJECTS_OPERATIONS];

            for (var operationType in operationsMap) {
                var operation = operationsMap[operationType];
                if (operationType !== KSInternalConstants.KSObjectOperationType.get) {
                    var actionArray = operation[KSInternalConstants.OPERATIONS_ACTIONS];
                    if (!KSCommonUtils.isNullOrEmptyObject(actionArray)) {
                        getSupportedObjectDependency(actionArray, forwardHierarchicalDependencyMap,
                            reverseHierarchicalDependencyMap, operation[KSInternalConstants.NAME]);
                    }
                }
            }
        }

        function populateForwardAndReverseDependencyMapUsingOperations(namespace) {
            var namespaceName = namespace[KSInternalConstants.NAMESPACE_NAME];
            var objectsArray = namespace[KSInternalConstants.OBJECTS];
            var objectsArrayLength = objectsArray.length;
            namespace[KSInternalConstants.FORWARD_HIERARCHICAL_DEPENDENCY_MAP] = {};
            namespace[KSInternalConstants.REVERSE_HIERARCHICAL_DEPENDENCY_MAP] = {};
            for (var objectIndex = 0; objectIndex < objectsArrayLength; objectIndex++) {
                var object = objectsArray[objectIndex];

                fetchDependency(object, namespace[KSInternalConstants.FORWARD_HIERARCHICAL_DEPENDENCY_MAP],
                    namespace[KSInternalConstants.REVERSE_HIERARCHICAL_DEPENDENCY_MAP]);

                voltmx.sdk.logsdk.trace(LOG_PREFIX,
                    'Dependency parsing completed for object ' + object[KSInternalConstants.NAME] +
                    ' in Namespace ' + namespaceName);
            }
        }

        /**
         * First pass of JSON parser.
         * Adds new key-value pairs at namespace, object and attribute level
         * @param objectServiceContext object service metadata context
         * @param metadataResponse network JSON to be parsed
         * @throws Exception in case of errors
         */
        function runPass1(objectServiceContext, metadataResponse) {
            var objectServiceName = objectServiceContext.name;
            var namespaceArray = metadataResponse[KSInternalConstants.NAMESPACES];

            if(KSCommonUtils.isNullOrEmptyObject(namespaceArray)) {
                var errorMessage = "Invalid namespaces in object service " + objectServiceName;

                voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                throw new KSError(KSErrorConstants.SETUP_METADATA_NAMESPACES_NIL, errorMessage);
            }
            metadataResponse[KSInternalConstants.NAMESPACE_METADATA_DICTIONARY] = {};

            var namespaceLength = namespaceArray.length;
            for(var namespaceIndex = 0; namespaceIndex < namespaceLength; namespaceIndex++) {
                var namespace = namespaceArray[namespaceIndex];
                var namespaceName = namespace[KSInternalConstants.NAMESPACE_NAME];

                voltmx.sdk.logsdk.trace(LOG_PREFIX, "Normalizing namespace name.");
                namespaceName = KSMetadataUtils.normalizedNamespaceName(namespaceName);
                namespace[KSInternalConstants.NAMESPACE_NAME] = namespaceName;

                voltmx.sdk.logsdk.trace(LOG_PREFIX, "began to parse Namespace " + namespaceName + " for " + objectServiceName);
                namespace[KSInternalConstants.PARENT_ROOT_METADATA] = metadataResponse;
                populateObjectMetadataProperties(objectServiceContext, namespace);

                voltmx.sdk.logsdk.trace(LOG_PREFIX, "began to add dependencies inside namespace " + namespaceName);
                populateForwardAndReverseDependencyMapUsingOperations(namespace);
                metadataResponse[KSInternalConstants.NAMESPACE_METADATA_DICTIONARY][namespaceName] = namespace;
                voltmx.sdk.logsdk.trace(LOG_PREFIX, "Parsing complete for Namespace " + namespaceName + " in " + objectServiceName);
            }
        }

        /**
         * Method to populate ObjectMetadata from namespace object
         * @param objectServiceContext object service metadata context
         * @param namespace metadata JSON
         * @throws Exception in case of errors
         */
        function populateObjectMetadataProperties(objectServiceContext, namespace) {
            var objectServiceName = objectServiceContext.name;
            var namespaceName =  namespace[KSInternalConstants.NAMESPACE_NAME];
            var objectsArray = namespace[KSInternalConstants.OBJECTS];

            if(KSCommonUtils.isNullOrEmptyObject(objectsArray)) {
                var errorMessage = "Invalid objects in object service "
                    + objectServiceName + " in namespace " + namespace[KSInternalConstants.NAMESPACE_NAME];

                voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                throw new KSError(KSErrorConstants.SETUP_METADATA_OBJECTS_NIL, errorMessage);
            }
            namespace[KSInternalConstants.OBJECT_METADATA_DICTIONARY]= {};

            var objectMetadataLength = objectsArray.length;
            for(var objectIndex = 0; objectIndex < objectMetadataLength; objectIndex++) {
                var object = objectsArray[objectIndex];
                var objectName = object[KSInternalConstants.OBJECTS_NAME];

                if(KSCommonUtils.isNullOrEmptyObject(objectName)) {
                    var errorMessage = "Invalid object name "
                        + object[KSInternalConstants.OBJECTS_NAME] + " in object service " + objectServiceName
                        + " in namespace " + namespaceName;

                    voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                    throw new KSError(KSErrorConstants.METADATA_OBJECT_NAME_EMPTY, errorMessage);
                }
                voltmx.sdk.logsdk.trace(LOG_PREFIX, "began to parse object " + objectName + " in Namespace " + namespaceName
                    + " for " + objectServiceName);

                object[KSInternalConstants.PARENT_NAMESPACE_METADATA] = namespace;
                object[KSInternalConstants.OBJECT_SERVICE_NAME] = objectServiceContext.name;
                object[KSInternalConstants.VERSION] = objectServiceContext.objectServiceVersion;
                object[KSInternalConstants.FULLY_QUALIFIED_NAME] = getFullQualifiedObjectName(namespaceName, objectName);
                object[KSInternalConstants.ENDPOINT_URL] = objectServiceContext.url + "/objects/" + object[KSInternalConstants.FULLY_QUALIFIED_NAME];
                object[KSInternalConstants.OBJECTS_PARENT_RELATIONSHIPS] = [];
                object[KSInternalConstants.OBJECTS_CHILD_RELATIONSHIPS] = [];

                //populating attributes
                populateObjectAttributesProperties(objectServiceName, namespaceName, object);

                //Since now we have all the attributes,
                //populating attribute level soft deletable flag.
                populateSoftDeletableAttribute(object);

                //populating primary key dictionary
                populatePrimaryKeyAttributes(object);

                namespace[KSInternalConstants.OBJECT_METADATA_DICTIONARY][objectName] = object;
                voltmx.sdk.logsdk.trace(LOG_PREFIX, "Parsing completed for object " + objectName + " in Namespace " + namespaceName
                    + " for " + objectServiceName);
            }
        }

        /**
         * Method to set soft-delete property between object and attribute
         * @param object metadata for which the softdelete has to be populated
         */
        function populateSoftDeletableAttribute(object) {
            var softDeleteAttributeName = object[KSInternalConstants.OBJECTS_SOFT_DELETE_FIELD];

            if(! voltmx.sdk.util.isNullOrEmptyString(softDeleteAttributeName)) {
                voltmx.sdk.logsdk.trace(LOG_PREFIX, "began to parse soft delete field in " + object[KSInternalConstants.OBJECTS_NAME]
                    + " in Namespace " + object[KSInternalConstants.PARENT_NAMESPACE_METADATA][KSInternalConstants.NAMESPACE_NAME]
                    + " for " + object[KSInternalConstants.OBJECT_SERVICE_NAME]);

                //object -> attribute -> isSoftDeletable = true;
                object[KSInternalConstants.ATTRIBUTES][softDeleteAttributeName]
                    [KSInternalConstants.ATTRIBUTES_SOFT_DELETABLE] = true;

                //object -> softdelete_field = attribute
                object[KSInternalConstants.OBJECTS_SOFT_DELETE_FIELD] = object[KSInternalConstants.ATTRIBUTES]
                    [softDeleteAttributeName];

                voltmx.sdk.logsdk.trace(LOG_PREFIX, "Parsing completed for soft delete field in " + object[KSInternalConstants.OBJECTS_NAME]
                    + " in Namespace " + object[KSInternalConstants.PARENT_NAMESPACE_METADATA][KSInternalConstants.NAMESPACE_NAME]
                    + " for " + object[KSInternalConstants.OBJECT_SERVICE_NAME]);
            }
        }

        /**
         * Method to populate primary keys for objectMetadata as JSON Dictionary
         * @param object metadata for which the primary keys have to be populated
         */
        function populatePrimaryKeyAttributes(object) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX, "began to parse primary keys in " + object[KSInternalConstants.OBJECTS_NAME]
                + " in Namespace " + object[KSInternalConstants.PARENT_NAMESPACE_METADATA][KSInternalConstants.NAMESPACE_NAME]
                + " for " + object[KSInternalConstants.OBJECT_SERVICE_NAME]);

            var keys = object[KSInternalConstants.OBJECTS_KEYS];
            if(KSCommonUtils.isNullOrEmptyObject(keys)) {
                var errorMessage = "Invalid object keys in " + object[KSInternalConstants.OBJECTS_NAME] + " in "
                    + object[KSInternalConstants.PARENT_NAMESPACE_METADATA][KSInternalConstants.NAMESPACE_NAME]
                    + " for " + object[KSInternalConstants.OBJECT_SERVICE_NAME];

                voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                throw new KSError(KSErrorConstants.SETUP_METADATA_OBJECTS_PRIMARY_KEY_NIL, errorMessage);
            }
            object[KSInternalConstants.OBJECTS_PRIMARY_KEYS] = {};

            var keysLength = keys.length;
            for(var keyIndex = 0; keyIndex < keysLength; keyIndex++) {
                var keyName = keys[keyIndex];
                object[KSInternalConstants.OBJECTS_PRIMARY_KEYS][keyName] = object
                    [KSInternalConstants.ATTRIBUTES][keyName];
            }
            voltmx.sdk.logsdk.trace(LOG_PREFIX, "Parsing completed for primary keys in " + object[KSInternalConstants.OBJECTS_NAME]
                + " in Namespace " + object[KSInternalConstants.PARENT_NAMESPACE_METADATA][KSInternalConstants.NAMESPACE_NAME]
                + " for " + object[KSInternalConstants.OBJECT_SERVICE_NAME]);
        }

        /**
         * Method to populate attribute metadata from object metadata
         * @param objectServiceName object service name
         * @param namespaceName namespace name
         * @param object object metadata for which the attributes have to be populated
         * @throws Exception in case of errors
         */
        //NOTE: default value and auto-increment are not yet supported from Volt MX Foundry app schema for Objects
        function populateObjectAttributesProperties(objectServiceName, namespaceName, object) {
            var objectName = object[KSInternalConstants.OBJECTS_NAME];

            voltmx.sdk.logsdk.trace(LOG_PREFIX, "began to parse attributes in " + objectName
                + " in Namespace " + namespaceName + " for " + objectServiceName);

            var attributeArray = object[KSInternalConstants.OBJECTS_FIELDS];
            if(KSCommonUtils.isNullOrEmptyObject(attributeArray)) {
                var errorMessage = "Invalid attributes in " + objectServiceName + " object service " + namespaceName
                    + " namespace " + objectName + "object name.";

                voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                throw new KSError(KSErrorConstants.SETUP_METADATA_ATTRIBUTES_NIL, errorMessage);
            }
            object[KSInternalConstants.ATTRIBUTES]= {};
            object[KSInternalConstants.OBJECTS_NON_NULLABLE_ATTRIBUTES] = {};

            var attributesLength = attributeArray.length;
            for(var attributeIndex = 0; attributeIndex < attributesLength; attributeIndex++) {
                var attribute = attributeArray[attributeIndex];
                var attributeName = attribute[KSInternalConstants.ATTRIBUTES_NAME];

                if(KSCommonUtils.isNullOrEmptyObject(attributeName)) {
                    var errorMessage = "Invalid attribute name" + attributeName +" in " + objectServiceName + " object service "
                        + namespaceName + " namespace " + objectName + "object name.";

                    voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                    throw new KSError(KSErrorConstants.METADATA_ATTRIBUTE_NAME_NULL_OR_EMPTY, errorMessage);
                }
                attribute[KSInternalConstants.PARENT_OBJECT_METADATA] = object;

                //populating non-nullable fields at object level.
                populateNonNullableFields(object, attribute);

                object[KSInternalConstants.ATTRIBUTES][attributeName] = attribute;
            }
            voltmx.sdk.logsdk.trace(LOG_PREFIX, "Parsing completed for attributes in " + objectName
                + " in Namespace " + namespaceName + " for " + objectServiceName);
        }

        /**
         * Method to populate non nullable attributes for objectMetadata
         * @param object metadata for which the primary keys have to be populated
         * @param attribute which has to classified as nullable or non-nullable
         */
        function populateNonNullableFields(object, attribute) {
            if(! attribute[KSInternalConstants.ATTRIBUTES_NULLABLE]) {
                object[KSInternalConstants.OBJECTS_NON_NULLABLE_ATTRIBUTES][attribute[KSInternalConstants.ATTRIBUTES_NAME]] = attribute;

                voltmx.sdk.logsdk.trace(LOG_PREFIX, "Parsing completed for non-nullable attribute in " + object[KSInternalConstants.OBJECTS_NAME]
                    + " in Namespace " + object[KSInternalConstants.PARENT_NAMESPACE_METADATA][KSInternalConstants.NAMESPACE_NAME]
                    + " for " + object[KSInternalConstants.OBJECT_SERVICE_NAME]);
            }
        }

        function sortHierarchicalDependencyMapsByParentHierarchyFirst(namespace) {
            var forwardDependencyMap = namespace[KSInternalConstants.FORWARD_HIERARCHICAL_DEPENDENCY_MAP];
            var orderedHierarchicalObjectNameList = Object.keys(forwardDependencyMap);

            var sortedSet = [];
            var visitedNode = [];

            function addVisitedNode(listElement) {
                /*This function is adding listElement in visited nodes and exploring other dependents.
                  The intention is to perform topological sort*/
                if (!visitedNode.includes(listElement)) {
                    visitedNode.push(listElement);
                    var dependencyMap = forwardDependencyMap[listElement];
                    var dependencyList = [];
                    if (!KSCommonUtils.isNullOrEmptyObject(dependencyMap)) {
                        dependencyList = Object.values(dependencyMap);
                    }

                    for (var i = 0; i < dependencyList.length; i++) {
                        addVisitedNode(dependencyList[i]);
                    }

                    sortedSet.push(listElement);
                }
            }

            function sortHierarchicalObjectNameList(list) {
                for (var i = 0; i < list.length; i++) {
                    addVisitedNode(list[i]);
                }
            }

            function forwardDependencyListComparer(object1, object2) {
                return forwardDependencyMap[object1].length - forwardDependencyMap[object2].length;

            }

            orderedHierarchicalObjectNameList.sort(forwardDependencyListComparer);

            sortHierarchicalObjectNameList(orderedHierarchicalObjectNameList);
            namespace[KSInternalConstants.ORDERED_HIERARCHICAL_OBJECT_NAME_LIST] = sortedSet.reverse();
        }

        function sortUploadHierarchies(namespaceMetadataDictionary) {
            for (var namespaceName in namespaceMetadataDictionary) {
                var namespace = namespaceMetadataDictionary[namespaceName];
                sortHierarchicalDependencyMapsByParentHierarchyFirst(namespace);
            }
        }

        /**
         * Second pass of JSON parser.
         * Adds relationships between objects.
         * @param objectServiceName object service metadata context
         * @param metadataResponse network JSON to be parsed
         * @throws Exception in case of errors
         */
        function runPass2(objectServiceName, metadataResponse) {
            var namespaceMetadataDictionary = metadataResponse[KSInternalConstants.NAMESPACE_METADATA_DICTIONARY];
            for(var namespaceName in namespaceMetadataDictionary) {
                if(namespaceMetadataDictionary.hasOwnProperty(namespaceName)) {
                    var namespace = namespaceMetadataDictionary[namespaceName];
                    var objectMetadataDictionary = namespace[KSInternalConstants.OBJECT_METADATA_DICTIONARY];

                    for(var objectName in objectMetadataDictionary) {
                        if(objectMetadataDictionary.hasOwnProperty(objectName)) {
                            var object = objectMetadataDictionary[objectName];
                            var objectRelationships = object[KSInternalConstants.OBJECTS_RELATIONSHIPS];

                            var relationshipLength = objectRelationships.length;
                            for(var relationshipIndex = 0; relationshipIndex < relationshipLength; relationshipIndex++) {
                                var relationship = objectRelationships[relationshipIndex];
                                var clonedRelationship = voltmx.sdk.cloneObject(relationship);
                                var relationshipType = clonedRelationship[KSInternalConstants.RELATIONSHIP_TYPE];

                                if(relationshipType === KSInternalConstants.KSRelationshipTypes.ONE_TO_MANY
                                    || relationshipType === KSInternalConstants.KSRelationshipTypes.MANY_TO_ONE
                                    || relationshipType === KSInternalConstants.KSRelationshipTypes.ONE_TO_ONE) {

                                    voltmx.sdk.logsdk.trace(LOG_PREFIX, "Populating relationships in object "
                                        + objectName + " for object service " + objectServiceName);

                                    populateRelationship(metadataResponse, object, clonedRelationship);
                                    addParentAndChildRelationship(clonedRelationship);
                                } else {
                                    var errorMessage = "Invalid relationship type " + relationshipType + " in object service "
                                        + objectServiceName + " namespace " + namespaceName
                                        + " object name " + objectName;

                                    voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                                    throw new KSError(KSErrorConstants.SETUP_INVALID_RELATIONSHIP_TYPE, errorMessage);
                                }
                            }
                            deleteExtraKeysInObject(object);
                        }
                    }
                    deleteExtraKeysInNamespace(namespace);
                }
            }
            deleteExtraKeysInMetadataResponse(metadataResponse);
        }

        /**
         * Third pass of JSON parser.
         * Adds forward and reverse hierarchy mapping to get ordered list to follow while processing upload.
         * @param namespaceMetadataDictionary namespaceMetadataDictionary
         * @throws Exception in case of errors
         */
        function runPass3(namespaceMetadataDictionary) {
            sortUploadHierarchies(namespaceMetadataDictionary);
        }

        /**
         * Method to delete keys that are irrelevant or redundant in the metadata response level.
         * @param metadataResponse JSON to be parsed
         */
        function deleteExtraKeysInMetadataResponse(metadataResponse){
            delete metadataResponse[KSInternalConstants.OFFLINE];
            delete metadataResponse[KSInternalConstants.NAMESPACES];
            delete metadataResponse[KSInternalConstants.HTTP_RESPONSE];
            delete metadataResponse[KSInternalConstants.CONFLICT_POLICY];
            delete metadataResponse[KSInternalConstants.IS_CHANGE_AFTER_LAST_FETCH_TIME];

            voltmx.sdk.logsdk.trace(LOG_PREFIX, "Deleted keys " + KSInternalConstants.NAMESPACES + ", "
                + KSInternalConstants.HTTP_RESPONSE + ", " + KSInternalConstants.CONFLICT_POLICY + ", "
                + KSInternalConstants.IS_CHANGE_AFTER_LAST_FETCH_TIME + KSInternalConstants.OFFLINE);
        }

        /**
         * Method to delete keys that are irrelevant or redundant in the namespace level.
         * @param namespaceMetadata JSON to be parsed
         */
        function deleteExtraKeysInNamespace(namespaceMetadata) {
            delete namespaceMetadata[KSInternalConstants.OBJECTS];
            delete namespaceMetadata[KSInternalConstants.NAMESPACE_ACTION];

            voltmx.sdk.logsdk.trace(LOG_PREFIX, "Deleted keys " + KSInternalConstants.OBJECTS + ", "
                + KSInternalConstants.NAMESPACE_ACTION + " in namespace "
                + namespaceMetadata[KSInternalConstants.NAMESPACE_NAME]);
        }

        /**
         * Method to delete keys that are irrelevant or redundant in the object level.
         * @param objectMetadata JSON to be parsed
         */
        function deleteExtraKeysInObject(objectMetadata) {
            delete objectMetadata[KSInternalConstants.OBJECTS_KEYS];
            delete objectMetadata[KSInternalConstants.OBJECTS_FIELDS];
            delete objectMetadata[KSInternalConstants.CONFLICT_POLICY];
            delete objectMetadata[KSInternalConstants.OBJECTS_CACHE_TIMEOUT];
            delete objectMetadata[KSInternalConstants.OBJECTS_DELTA_CONTEXT_FIELD];

            voltmx.sdk.logsdk.trace(LOG_PREFIX, "Deleted keys " + KSInternalConstants.OBJECTS_KEYS + ", "
                + KSInternalConstants.OBJECTS_FIELDS + ", " + KSInternalConstants.CONFLICT_POLICY + ", "
                + KSInternalConstants.OBJECTS_DELTA_CONTEXT_FIELD + ", " + KSInternalConstants.OBJECTS_CACHE_TIMEOUT
                + " in object " + objectMetadata[KSInternalConstants.OBJECTS_NAME]);
        }

        /**
         * Method to setup relationships among objects across all namespaces
         * @param metadataResponse network JSON to be parsed
         * @param object metadata for the relationship has to be parsed
         * @param relationship raw relationship which is sent in network response
         * @throws OfflineObjectsException In case of errors
         */
        function populateRelationship(metadataResponse, object, relationship) {

            var relationshipType = relationship[KSInternalConstants.RELATIONSHIP_TYPE];
            if(relationshipType === relationship[KSInternalConstants.KSRelationshipTypes.ONE_TO_ONE]) {
                relationship[KSInternalConstants.RELATIONSHIP_TYPE] = KSInternalConstants.KSRelationshipTypes.ONE_TO_MANY;
                voltmx.sdk.logsdk.trace(LOG_PREFIX, "Converted one to one relationship to one to many in object "
                    + object[KSInternalConstants.OBJECTS_NAME] + "for object service " + object[KSInternalConstants.OBJECT_SERVICE_NAME]);
            }
            relationship[KSInternalConstants.RELATIONSHIP_SOURCE_OBJECT] = object;

            var fullyQualifiedTargetObjectName =  KSMetadataUtils.normalizedFullyQualifiedName
                                                    (relationship[KSInternalConstants.RELATIONSHIP_TARGET_OBJECT]);

            var targetObject = getObjectMetadataFromRootMetadata(metadataResponse, fullyQualifiedTargetObjectName);
            if (KSCommonUtils.isNullOrEmptyObject(fullyQualifiedTargetObjectName)
                || KSCommonUtils.isNullOrEmptyObject(targetObject)) {

                var errorMessage = "Incorrect target object name found in relationship of object" + object.name +
                    " in namespace " + object[KSInternalConstants.PARENT_NAMESPACE_METADATA][KSInternalConstants.NAMESPACE_NAME]
                    + "in object service " + object[KSInternalConstants.OBJECT_SERVICE_NAME];

                voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                throw new KSError(KSErrorConstants.SETUP_UNABLE_TO_PARSE_METADATA_JSON_RELATIONSHIP, errorMessage);
            }

            relationship[KSInternalConstants.RELATIONSHIP_TARGET_OBJECT] = targetObject;

            var sourceAttributes = object[KSInternalConstants.ATTRIBUTES];
            populateSourceAttributes(object, relationship, sourceAttributes);

            var targetAttributes = targetObject[KSInternalConstants.ATTRIBUTES];
            populateTargetAttributes(targetObject, relationship, targetAttributes);
        }

        /**
         * Method to set source attributes for a relationship object
         * @param object metadata in which the relation is defined in the network response
         * @param relationship relationship object to which the source attributes have to be populated
         * @param attributes all the attributes of the source object.
         */
        function populateSourceAttributes(object, relationship, attributes) {
            var sourceAttributes = voltmx.sdk.cloneObject(relationship[KSInternalConstants.RELATIONSHIP_SOURCE_ATTRIBUTES]);
            relationship[KSInternalConstants.RELATIONSHIP_SOURCE_ATTRIBUTES] = [];

            var attributesLength = sourceAttributes.length;
            for(var attributeIndex = 0; attributeIndex < attributesLength; attributeIndex++) {

                var attributeName = sourceAttributes[attributeIndex];
                if(voltmx.sdk.isNullOrUndefined(attributes[attributeName])) {

                    var errorMessage = "Incorrect source attribute name '"+ attributeName +"' found in relationship of object" + object.name +
                        " in namespace " + object[KSInternalConstants.PARENT_NAMESPACE_METADATA][KSInternalConstants.NAMESPACE_NAME]
                        + "in object service " + object[KSInternalConstants.OBJECT_SERVICE_NAME];

                    voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                    throw new KSError(KSErrorConstants.SETUP_UNABLE_TO_PARSE_METADATA_JSON_RELATIONSHIP, errorMessage);
                }
                relationship[KSInternalConstants.RELATIONSHIP_SOURCE_ATTRIBUTES].push(attributes[attributeName]);
            }
        }

        /**
         * Method to set target attributes for a relationship object
         * @param object metadata in which the relation is defined in the network response
         * @param relationship relationship object to which the source attributes have to be populated
         * @param attributes all the attributes of the target object.
         */
        function populateTargetAttributes(object, relationship, attributes) {
            var targetAttributes = voltmx.sdk.cloneObject(relationship[KSInternalConstants.RELATIONSHIP_TARGET_ATTRIBUTES]);
            relationship[KSInternalConstants.RELATIONSHIP_TARGET_ATTRIBUTES] = [];

            var attributesLength = targetAttributes.length;
            for(var attributeIndex = 0; attributeIndex < attributesLength; attributeIndex++) {

                var attributeName = targetAttributes[attributeIndex];
                if(voltmx.sdk.isNullOrUndefined(attributes[attributeName])) {

                    var errorMessage = "Incorrect target attribute name '"+ attributeName +"' found in relationship of object" + object.name +
                        " in namespace " + object[KSInternalConstants.PARENT_NAMESPACE_METADATA][KSInternalConstants.NAMESPACE_NAME]
                        + "in object service " + object[KSInternalConstants.OBJECT_SERVICE_NAME];

                    voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                    throw new KSError(KSErrorConstants.SETUP_UNABLE_TO_PARSE_METADATA_JSON_RELATIONSHIP, errorMessage);
                }
                relationship[KSInternalConstants.RELATIONSHIP_TARGET_ATTRIBUTES].push(attributes[attributeName]);
            }
        }

        /**
         * Adds parent and child relationships
         * @param relationship Relationship object to be parsed for adding relationships
         */
        function addParentAndChildRelationship(relationship) {
            if(relationship[KSInternalConstants.RELATIONSHIP_TYPE] === KSInternalConstants.KSRelationshipTypes.ONE_TO_MANY) {
                addRelationshipToParent(relationship, relationship[KSInternalConstants.RELATIONSHIP_SOURCE_OBJECT]);
                addRelationshipToChild(relationship, relationship[KSInternalConstants.RELATIONSHIP_TARGET_OBJECT]);
            }
            else {
                addRelationshipToParent(relationship, relationship[KSInternalConstants.RELATIONSHIP_TARGET_OBJECT]);
                addRelationshipToChild(relationship, relationship[KSInternalConstants.RELATIONSHIP_SOURCE_OBJECT]);
            }
        }

        /**
         * Add a relationship to parent object
         * @param relationship Relationship object
         * @param parent Parent object
         */
        function addRelationshipToParent(relationship, parent) {
            parent[KSInternalConstants.OBJECTS_CHILD_RELATIONSHIPS].push(relationship);
        }

        /**
         * Add a relationship to child object
         * @param relationship Relationship object
         * @param child Child object
         */
        function addRelationshipToChild(relationship, child) {
            child[KSInternalConstants.OBJECTS_PARENT_RELATIONSHIPS].push(relationship);
        }

        /**
         * getter Method to retrieve objectMetadata from rootMetadataObject
         * @param metadataResponse the rootMetadataObject
         * @param fullyQualifiedName of the object
         * @returns objectMetadata
         */
        function getObjectMetadataFromRootMetadata(metadataResponse, fullyQualifiedName) {
            var objectName = KSMetadataUtils.objectNameFromFullyQualifiedName(fullyQualifiedName);
            var namespaceName = KSMetadataUtils.normalizedNamespaceName
                                (KSMetadataUtils.namespaceNameFromFullyQualifiedName(fullyQualifiedName));
            return metadataResponse[KSInternalConstants.NAMESPACE_METADATA_DICTIONARY][namespaceName]
                [KSInternalConstants.OBJECT_METADATA_DICTIONARY][objectName];
        }

        /**
         * Method to get fully qualified name of an object
         * @param namespaceName if empty/undefined namespaceName is normalized to kony_unnamed
         * @param objectName
         * @returns fullyQualifiedName
         */
        function getFullQualifiedObjectName(namespaceName, objectName) {
            return KSMetadataUtils.normalizedFullyQualifiedNameForNamespaceNameAndObjectName(namespaceName, objectName);
        }

        exports.parse = parse;
    });

/**
 * KSObjectServiceMetadataContext
 * Created by Harshini Bonam on 24/05/18.
 * Copyright © 2018 Kony. All rights reserved.
 */

define("KSObjectServiceMetadataContext", ["exports", "KSSQLQueryGenerator", "KSDatabaseAPI", "KSCommonUtils", "KSError"],
    function(exports, KSSQLQueryGenerator, _KSDatabaseAPI, KSCommonUtils, _KSError) {

        "use strict";
        exports._esModule = true;
        var LOG_PREFIX = "KSObjectServiceMetadataContext : ";

        var logger = voltmx.sdk.logsdk;
        var KSError = _KSError.KSError;
        var KSDatabaseAPI = _KSDatabaseAPI.KSDatabaseAPI;
        var KSErrorConstants = voltmx.sdk.OfflineObjects.KSErrorConstants;
        var KSDatabaseConstants = voltmx.sdk.OfflineObjects.KSDatabaseConstants;
        var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;

        /**
         * Instantiates an instance of ObjectServiceMetadataContext class.
         * populates objectServiceName, metadata URL, sync URL and object service version to itself.
         * @param objectServiceName
         * @param objectServiceContext
         * @constructor
         */
        function KSObjectServiceMetadataContext(objectServiceName, objectServiceContext) {
            this.name = objectServiceName;
            this.url = objectServiceContext[KSInternalConstants.URL];
            this.metadataURL = objectServiceContext[KSInternalConstants.OBJECTSERVICE_METADATA_URL];
            this.objectServiceVersion = objectServiceContext[KSInternalConstants.VERSION];

            this.deltaContext = null;
            this.rootMetadataObject = null;
            this.offlineObjectServiceVersion = null;
        }

        /**
         * Overloaded constructor that tries populate offline metadata, deltacontext and version
         * from the konysyncMetadata table if a record exists with given object service name.
         * Otherwise, the mentioned params are null by default.
         * @param objectServiceName
         * @param objectServiceContext
         * @returns {Promise<KSObjectServiceMetadataContext>}
         * @throws setupException
         */
        async function init(objectServiceName, objectServiceContext) {
            var _this = new KSObjectServiceMetadataContext(objectServiceName, objectServiceContext);
            try {
                var record = await getMetadataJSONAndDeltaContextFromMetadataTable.call(_this);
                if(record) {
                    if (! KSCommonUtils.isNullOrEmptyObject(record[KSDatabaseConstants.METADATA_TABLE_METADATA_JSON])) {
                        _this.rootMetadataObject = record[KSDatabaseConstants.METADATA_TABLE_METADATA_JSON];
                        logger.trace(LOG_PREFIX, "Retrieved metadataJSON:" + _this.rootMetadataObject + " from client DB.");
                    }
                    if (! KSCommonUtils.isNullOrEmptyObject(record[KSDatabaseConstants.METADATA_TABLE_DELTA_CONTEXT])) {
                        _this.deltaContext = record[KSDatabaseConstants.METADATA_TABLE_DELTA_CONTEXT];
                        logger.trace(LOG_PREFIX, "Retrieved deltaContext: " + _this.deltaContext + " from client DB.");
                    }

                    if (! KSCommonUtils.isNullOrEmptyObject(record[KSDatabaseConstants.METADATA_TABLE_VERSION])) {
                        _this.offlineObjectServiceVersion = record[KSDatabaseConstants.METADATA_TABLE_VERSION];
                        logger.trace(LOG_PREFIX, "Retrieved version: " + _this.offlineObjectServiceVersion + " from client DB.");
                    }
                }
                return _this;
            } catch (setupException) {
                setupException[KSInternalConstants.OBJECT_SERVICE_NAME] = objectServiceName;
                throw setupException;
            }
        }

        /**
         * Method to fetch offline saved data from konysyncMetadata table, if database and the table exist.
         * @returns {Promise<konysyncMetadata table record>}
         * @throws DatabaseException
         */
        async function getMetadataJSONAndDeltaContextFromMetadataTable() {
            var query = KSSQLQueryGenerator.getSelectQueryForMetadataTableProperties(this.name);
            var dbName = KSCommonUtils.getOfflineObjectsDatabaseName();

            var dbExists = await KSDatabaseAPI.databaseExists(dbName);
            if(dbExists) {
                try {
                    await KSDatabaseAPI.initializeDatabase(dbName);
                    var tableExists = await KSDatabaseAPI.tableExists(KSDatabaseConstants.SQL_TABLE_KONY_SYNC_METADATA);
                    if(tableExists) {
                        var result = await KSDatabaseAPI.executeQuery(query);
                        if (KSCommonUtils.isNullOrEmptyObject(result)) {
                            logger.warn(LOG_PREFIX, "Metadata record not found for the object service : " + this.name);
                            return null;
                        } else {
                            logger.debug(LOG_PREFIX, "Successfully fetched the metadata record for the object service : " + this.name);
                            return result[0];
                        }
                    } else {
                        logger.warn(LOG_PREFIX, "Metadata record not found for the object service : " + this.name);
                        return null;
                    }
                } catch (dbException) {
                    logger.error(LOG_PREFIX, "An exception occurred while trying to get connection for existing db : object service "
                        + this.name + "Exception : " + dbException);
                    throw dbException;
                }
            }
        }

        /**
         * Method to determine if the konysyncMetadata table contains offline metadata
         * for the object service in this instance.
         * @returns {boolean}
         */
        KSObjectServiceMetadataContext.prototype.doesMetadataTableContainObjectService = function () {
            return !(voltmx.sdk.isNullOrUndefined(this.deltaContext));
        };

        /**
         * Compares whether deltaContext in server response to existed deltaContext in metadata table
         * @param updatedDeltaContext
         * @returns {boolean} true if deltaContext is changed else false
         */
        KSObjectServiceMetadataContext.prototype.isDeltaContextChanged = function (updatedDeltaContext) {
            if (voltmx.sdk.isNullOrUndefined(updatedDeltaContext)) {
                logger.error(LOG_PREFIX, "Metadata JSON from server does not contain TIMESTAMP key");
                throw new KSError(KSErrorConstants.SETUP_EMPTY_METADATA_DELTA_CONTEXT);
            }
            return !(updatedDeltaContext === this.deltaContext);
        };

        exports.getInstance = init;
    });

/**
 * KSObjectServiceSetup
 * Created by Harshini Bonam on 24/05/18.
 * Copyright © 2018 Kony. All rights reserved.
 */

define("KSObjectServiceSetup",

    ["exports", "KSMetadataUtils", "KSNetworkUtils", "KSError", "KSIncrementalRootMetadataObject", "KSCommonUtils"],

    function(exports, KSMetadataUtils, KSNetworkUtils, _KSError, _KSIncrementalRootMetadataObject, KSCommonUtils) {

        "use strict";
        exports._esModule = true;
        var KSError = _KSError.KSError;
        var LOG_PREFIX = "KSObjectServiceSetup : ";

        var KSErrorConstants = voltmx.sdk.OfflineObjects.KSErrorConstants;
        var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;
        var KSDatabaseConstants = voltmx.sdk.OfflineObjects.KSDatabaseConstants;
        var KSIncrementalRootMetadataObject = _KSIncrementalRootMetadataObject.KSIncrementalRootMetadataObject;

        /**
         * Instantiates an instance of KSObjectServiceSetup
         * If the input _objectServiceMetadataContext already contains offline metadata, then this
         * initialisation would skip network data fetching, rootmetadata parsing and create table query generation.
         * @param _objectServiceMetadataContext
         * @param _successCallback
         * @param _failureCallback
         * @constructor
         */
        function KSObjectServiceSetup(inputContext, _successCallback, _failureCallback) {
            this.successCallback = _successCallback;
            this.failureCallback = _failureCallback;

            this.isOffline = false;
            this.fullMetadataJSON = null;
            this.rawNetworkResponse = null;
            this.isIncrementalSetupEnabled = inputContext[KSInternalConstants.INCREMENTAL_SETUP];

            this.objectServiceMetadataContext = inputContext[KSInternalConstants.OBJECT_SERVICE_METADATA_CONTEXT];
            this.shouldCreateObjectTables = !(this.objectServiceMetadataContext.doesMetadataTableContainObjectService());

            initializeLocalVariables.call(this);

            if (this.shouldCreateObjectTables || this.isIncrementalSetupEnabled) {
                startMetadataCall.call(this);
                //WARN: Don't add code after this startMetadataDownload as it is asynchronous.
            } else {
                this.rootMetadataObject = this.objectServiceMetadataContext.rootMetadataObject;
                invokeSuccessCallback.call(this);
                //WARN: Don't add code after.
            }
        }

        /**
         * Method to populate private instance variables.
         */
        function initializeLocalVariables() {
            this.objectServiceName = this.objectServiceMetadataContext.name;
            this.currentVersion = this.objectServiceMetadataContext.objectServiceVersion;
            this.tableQueries = {};
            this.shouldDoIncrementalSetup = false;
        }

        var onNetworkResponseSuccess = function (response) {
            if (this.shouldDoIncrementalSetup) {
                handleIncrementalDownloaderTask.call(this, response);
            } else {
                handleDownloaderTask.call(this, response);
            }
        };

        var onNetworkError = function (errorObj) {
            if (this.shouldDoIncrementalSetup) {
                //Executes when incremental metadata call in Incremental Setup is failed
                voltmx.sdk.logsdk.error(LOG_PREFIX, KSInternalConstants.EM_GENERIC_DATA_FETCHER + " " + this.objectServiceName
                    + ". " + errorObj.message);

                invokeFailureCallback.call(this, errorObj);
            } else if (this.isIncrementalSetupEnabled) {

                //Executes when full metadata call in Incremental Setup is failed
                var metadataJSON = this.objectServiceMetadataContext.rootMetadataObject;

                this.rootMetadataObject = metadataJSON;
                this.isOffline = true;

                if (!voltmx.sdk.isNullOrUndefined(metadataJSON)) {
                    voltmx.sdk.logsdk.warn(LOG_PREFIX, KSInternalConstants.EM_GENERIC_DATA_FETCHER + " " + this.objectServiceName
                        + ". " + errorObj.message + "\n Picking metadata from Offline DB");

                    invokeSuccessCallback.call(this);
                } else {
                    var errorDescription = KSInternalConstants.EM_FIRST_TIME_OFFLINE_SETUP + " "
                        + this.objectServiceName
                        + " version: " + this.currentVersion;

                    voltmx.sdk.logsdk.error(LOG_PREFIX + errorDescription);
                    invokeFailureCallback.call(this, errorObj);
                }
            } else {
                //Executes when setup call in setup API is failed
                voltmx.sdk.logsdk.error(LOG_PREFIX, errorObj.message);
                invokeFailureCallback.call(this, errorObj);
            }
        };

        /**
         * Method to start object service metadata download.
         * On success, this method invokes rootMetadata parser and create table query generation.
         * On failure, this method invokes failureCallback with the appropriate error percolated from network failureCallback.
         */
        function startMetadataCall(queryParams) {
            var headers = {};

            headers[KSInternalConstants.X_KONY_SERVICE_VERSION] = KSInternalConstants.X_KONY_SERVICE_VERSION_VALUE;
            headers[KSInternalConstants.X_KONY_API_VERSION] = this.currentVersion;

            KSNetworkUtils.get(this.objectServiceMetadataContext.metadataURL,
                queryParams,
                headers,
                {},
                onNetworkResponseSuccess.bind(this),
                onNetworkError.bind(this));
        }

        function handleDownloaderTask(response) {

            this.rawNetworkResponse = voltmx.sdk.cloneObject(response);
            processJSONAndRootMetadataObject.call(this, this.rawNetworkResponse);

            if (this.shouldDoIncrementalSetup) {
                var queryParams = {};

                queryParams[KSInternalConstants.DOLLAR_FILTER] = KSInternalConstants.TIMESTAMP_EQ
                    + this.objectServiceMetadataContext.deltaContext;

                startMetadataCall.call(this, queryParams);
            } else if (this.shouldCreateObjectTables) {
                getCreateTablesQueries.call(this, this.rawNetworkResponse);
            } else {
                invokeSuccessCallback.call(this);
            }
        }

        function handleIncrementalDownloaderTask(response) {
            this.rawNetworkResponse = voltmx.sdk.cloneObject(response);
            processIncrementalJSONAndUpdateTables.call(this, this.rawNetworkResponse);
        }

        function processIncrementalJSONAndUpdateTables(incrementalJSON) {
            try {
                var incrementalRootMetadata = new KSIncrementalRootMetadataObject(this.rootMetadataObject, incrementalJSON);
                this.indicesUpdates = incrementalRootMetadata.indicesUpdates
                this.tableQueries = incrementalRootMetadata.getIncrementalQueries();
                invokeSuccessCallback.call(this);
            } catch (incrementalRootMetadataException) {
                voltmx.sdk.logsdk.error(LOG_PREFIX, incrementalRootMetadataException.message);
                invokeFailureCallback.call(this, incrementalRootMetadataException);
            }
        }

        function processJSONAndRootMetadataObject(metadataJSON) {
            if (this.isOffline) {
                var offlineObjectServiceVersion = this.objectServiceMetadataContext.offlineObjectServiceVersion;
                var currentObjectServiceVersion = this.objectServiceMetadataContext.objectServiceVersion;
                if (!KSCommonUtils.isNullOrEmptyObject(offlineObjectServiceVersion)
                    && !(offlineObjectServiceVersion.toUpperCase() === currentObjectServiceVersion.toUpperCase())) {
                    var errorMessage = "offline setup failed due to version mismatch. existing version =" +
                        offlineObjectServiceVersion + " and new version =" + this.currentVersion;
                    voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                    var errorObj = new KSError(KSErrorConstants.SETUP_METADATA_REFRESH_ERROR, errorMessage);
                    invokeFailureCallback.call(errorObj);
                }
            }
            try {
                this.rootMetadataObject = KSMetadataUtils.parseSetupMetadataJSON.call(this, this.objectServiceMetadataContext, metadataJSON);
                populateObjectServiceMetadataContextInRootMetadataObject.call(this);
                populateConditionalProperties.call(this);
            } catch (metadataParseException) {
                voltmx.sdk.logsdk.error(LOG_PREFIX + metadataParseException.message);
                invokeFailureCallback(metadataParseException);
            }
        }

        /**
         * Method to parse metadata from network response and generate create table queries.
         * @param metadataJSON
         */
        function getCreateTablesQueries(metadataJSON) {
            this.tableQueries = {
                [KSDatabaseConstants.KSQueryTypes.CREATE]: KSMetadataUtils
                    .getQueriesToCreateTablesForObjectService(this.objectServiceName, this.rootMetadataObject)
            };
            invokeSuccessCallback.call(this);
        }

        /**
         * Method to populate endpoint URL and object service version from service doc,
         * into rootMetadataObject.
         */
        function populateObjectServiceMetadataContextInRootMetadataObject() {
            this.rootMetadataObject[KSInternalConstants.ENDPOINT_URL] = this.objectServiceMetadataContext.url;
            this.rootMetadataObject[KSInternalConstants.VERSION] = this.objectServiceMetadataContext.objectServiceVersion;
        }

        /**
         * Method to populate objectServiceMetadataContext with rootMetadataObject, latest deltaContext,
         * and then invokes successCallback to notify the SetupManager for completion.
         */
        function invokeSuccessCallback() {
            this.objectServiceMetadataContext.rootMetadataObject = this.rootMetadataObject;
            this.objectServiceMetadataContext.deltaContext = this.rootMetadataObject[KSInternalConstants.TIMESTAMP];
            this.successCallback.call(this, this.objectServiceName, this.rootMetadataObject, this.tableQueries);
        }

        /**
         * Method to invoke failureCallback to notify the SetupManager for error
         * in corresponding object service.
         * @param errorObj
         */
        function invokeFailureCallback(errorObj) {
            this.failureCallback(this.objectServiceName, errorObj);
        }

        function populateConditionalProperties() {
            if (this.isOffline) {
                this.shouldDoIncrementalSetup = false;
            } else {
                if (this.shouldCreateObjectTables) {
                    this.shouldDoIncrementalSetup = false;
                } else {
                    if (this.isIncrementalSetupEnabled) {
                        this.shouldDoIncrementalSetup = this.objectServiceMetadataContext.isDeltaContextChanged(this.rootMetadataObject[KSInternalConstants.TIMESTAMP]);
                    } else {
                        this.shouldDoIncrementalSetup = false;
                    }
                }
            }
        }

        exports.KSObjectServiceSetup = KSObjectServiceSetup;
    });

/**
 * KSSetupManager
 * Created by Harshini Bonam on 24/05/18.
 * Copyright © 2018 Kony. All rights reserved.
 */

define("KSSetupManager",

    ["exports", "KSMetadataUtils", "KSCommonUtils", "KSObjectServiceSetup", "KSObjectServiceMetadataContext", "KSError",
    "KSOptionsHelper"],

    function (exports, KSMetadataUtils, KSCommonUtils, KSObjectServiceSetupClass, KSObjectServiceMetadataContextClass,
              _KSError, KSOptionsHelper) {

        "use strict";
        exports._esModule = true;
        var KSError = _KSError.KSError;
        var logger = voltmx.sdk.logsdk;
        var LOG_PREFIX = "KSSetupManager : ";
        var KSErrorConstants = voltmx.sdk.OfflineObjects.KSErrorConstants;
        var KSPublicConstants = voltmx.sdk.OfflineObjects.KSPublicConstants;
        var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;
        var KSDatabaseConstants = voltmx.sdk.OfflineObjects.KSDatabaseConstants;

        var setupStatus;
        var setupContext;
        var setupOptions;
        var newSetupContext;

        var refreshCounter;
        var successCallback;
        var failureCallback;

        var objectServiceListContext;
        var objectServiceMetadataContexts;
        var objectServiceObjectsDDLQueries;

        var instance = null;

        /**
         * Instantiates an instance of KSSetupManager class.
         * @constructor
         */
        function KSSetupManager() {
            setupStatus = {};
            setupContext = {};
            refreshCounter = 0;
            newSetupContext = {};
            objectServiceMetadataContexts = {};
            objectServiceObjectsDDLQueries = {
                [KSDatabaseConstants.KSQueryTypes.CREATE]:{},
                [KSDatabaseConstants.KSQueryTypes.DELETE]:[],
                indicesUpdates: []
            };
        }

        /**
         * Method to return the successfully setup object services list
         * @returns Returns the list of Successfully setup Object Services
         */
        KSSetupManager.prototype.getSetupStatus = function() {
            return setupStatus;
        };

        /**
         * Method to enforce singleton instance of SetupManager.
         * @returns {singleton instance of SetupManager}
         */
        KSSetupManager.getInstance = function () {
            if (instance == null) {
                instance = new KSSetupManager();
            }
            return instance;
        };

        /**
         * Method to check if upload cache is enabled for the object service.
         * @param syncObject
         * @return {true/false}
         */
        KSSetupManager.prototype.isUploadCacheEnabledForObject = function (syncObject) {
            var objectServiceName = syncObject.getObjectServiceName();

            var rootMetadataObject = setupContext[objectServiceName];
            return rootMetadataObject[KSInternalConstants.UPLOAD_CACHE];
        };

        /**
         * Method to initialize values for setup and instantiates objectServiceMetadataContext and
         * objectServiceSetup classes for each object service provided in offline objectServiceList.
         * @param objectServiceList
         * @param options
         * @param _successCallback
         * @param _failureCallback
         */
        KSSetupManager.prototype.setup = function (objectServiceList, options, _successCallback, _failureCallback) {
            logger.debug(LOG_PREFIX + "Setup is in progress");
            initializeValuesForSetup.call(this, objectServiceList, options, _successCallback, _failureCallback);

            for(var objectServiceName in objectServiceList) {
                if(objectServiceList.hasOwnProperty(objectServiceName)) {

                    (KSObjectServiceMetadataContextClass.getInstance(objectServiceName, objectServiceList[objectServiceName]))
                        .then (objectServiceMetadataContext => {

                            objectServiceMetadataContexts[objectServiceMetadataContext.name] = objectServiceMetadataContext;

                            var inputContext = {
                                [KSInternalConstants.INCREMENTAL_SETUP] : KSOptionsHelper.isIncrementalSetupEnabled(options),
                                [KSInternalConstants.OBJECT_SERVICE_METADATA_CONTEXT] : objectServiceMetadataContext
                            };

                            new KSObjectServiceSetupClass
                                .KSObjectServiceSetup(inputContext, objectServiceSetupSuccessCallback, objectServiceSetupFailureCallback);

                        }).catch (exception => {
                            logger.error(LOG_PREFIX, "Failed to fetch offline metadata.");

                            objectServiceSetupFailureCallback(exception[KSInternalConstants.OBJECT_SERVICE_NAME], exception);
                        });
                }
            }
        };

        /**
         * Method to reset all the private instance variables of SetupManager.
         */
        KSSetupManager.prototype.reset = function () {
            setupOptions = null;
            refreshCounter = 0;
            successCallback = null;
            failureCallback = null;
            KSCommonUtils.clearJSONObject(setupStatus);
            KSCommonUtils.clearJSONObject(setupContext);
            KSCommonUtils.clearJSONObject(newSetupContext);
            KSCommonUtils.clearJSONObject(objectServiceMetadataContexts);
            objectServiceObjectsDDLQueries[KSDatabaseConstants.KSQueryTypes.DELETE] = [];
            objectServiceObjectsDDLQueries['indicesUpdates'] = [];
            KSCommonUtils.clearJSONObject(objectServiceObjectsDDLQueries[KSDatabaseConstants.KSQueryTypes.CREATE]);
        };

        /**
         * Getter method for setupContext JSON that contains rootMetadataObjects for each objectServiceName key.
         * @returns {setupContext}
         */
        KSSetupManager.prototype.getSetupContext = function () {
            return setupContext;
        };

        /**
         * Listener method of objectServiceSetup instances on successful completion initialisation.
         * This method increments the refreshCounter by 1, adds the object service name into setupStatus's
         * successfulObjectServiceList and depending on the queries that are generated, the root metadata object is assigned to
         * either setupContext or newSetupContext. In the end, it invokes verifyAndCreateTables.
         * @param objectServiceName
         * @param rootMetadataObject
         * @param queries
         * @returns {Promise<void>}
         */
        async function objectServiceSetupSuccessCallback(objectServiceName, rootMetadataObject, queries) {
            refreshCounter ++;
            if(voltmx.sdk.isNullOrUndefined(setupStatus.successfulObjectServices)) {
                setupStatus.successfulObjectServices = [];
            }
            setupStatus.successfulObjectServices.push(objectServiceName);

            if (KSCommonUtils.isNullOrEmptyObject(queries) && !(Array.isArray(this.indicesUpdates) && this.indicesUpdates.length > 0)) {
                delete objectServiceMetadataContexts[objectServiceName];
                setupContext[objectServiceName] = rootMetadataObject;
            } else {
                newSetupContext[objectServiceName] = rootMetadataObject;
                mergeSetupQueries(queries);
            }

            if (Array.isArray(this.indicesUpdates) && this.indicesUpdates.length > 0)
                objectServiceObjectsDDLQueries["indicesUpdates"].push(...this.indicesUpdates);

            await verifyAndCreateTables();
        }

        /**
         * Listener method of objectServiceSetup instances on failure to initialise.
         * This method increments the refreshCounter by 1, adds the object service name into setupStatus's
         * failedObjectServices JSON object, and corresponding error (depending on the error enumerability) is set as value.
         * @param objectServiceName
         * @param error
         * @returns {Promise<void>}
         */
        async function objectServiceSetupFailureCallback(objectServiceName, error) {
            refreshCounter ++;
            delete objectServiceMetadataContexts[objectServiceName];

            if(voltmx.sdk.isNullOrUndefined(setupStatus.failedObjectServices)) {
                setupStatus.failedObjectServices = {};
            }

            if(! KSCommonUtils.isExceptionObjectEnumerable(error)) {
                error = error.toString();
            }
            setupStatus.failedObjectServices[objectServiceName] = error;
            await verifyAndCreateTables();
        }

        /**
         * Method to verify if the refresh counter reached end value, create tables if setupContext is empty.
         * Meaning, setupContext is empty only for first time setup, and newSetupContext has the required rootMetadataObjects.
         * Upon successful creation of tables and insertion into meta tables, the newSetupContext is merged into setupContext
         * and successCallback is invoked to notify SyncEngine for completion.
         * In case of any error, we clone the setupStatus, clear all the necessary setupManager instance variables and
         * then invoke failureCallback with the cloned setupStatus/setupError to notify SyncEngine for completion.
         * @returns {Promise<void>}
         */
        async function verifyAndCreateTables() {
            if(refreshCounter === Object.keys(objectServiceListContext).length) {
                var failureCount = voltmx.sdk.isNullOrUndefined(setupStatus.failedObjectServices) ? 0 : Object.keys(setupStatus.failedObjectServices).length;

                if(failureCount === refreshCounter) {
                    allObjectServicesSetupFailed();
                } else {
                    try {
                        await createAndUpdateTables();
                        if (failureCount === 0) {

                            var successObj = {};
                            successObj[KSPublicConstants.STATUS] = KSErrorConstants.STATUS_SUCCESS;

                            logger.debug(LOG_PREFIX, "Volt MX Offline Objects Setup successful.");
                            successCallback(successObj);
                        } else {
                            var clonedSetupStatus = voltmx.sdk.cloneObject(setupStatus);
                            logger.error(LOG_PREFIX, "Volt MX Offline Objects Setup failed : "
                                + JSON.stringify(clonedSetupStatus));

                            clearProperties();
                            failureCallback(new KSError(KSErrorConstants.SETUP_METADATA_REFRESH_ERROR, clonedSetupStatus));
                        }
                    } catch (exception) {
                        logger.error(LOG_PREFIX, exception);

                        clearProperties();
                        failureCallback(new KSError(KSErrorConstants.SETUP_GENERIC_ERROR, exception));
                    }
                }
            }
        }

        async function createAndUpdateTables() {
            var nextIndexedDBVersion = 2;
            var currentIndexedDBVersion = 0;
            var shouldUpgradePropertiesTableVersion = false;

            var isDbUpgradeRequired = isDBUpgradeRequired();
            var areThereChangesInObjectServiceTableSchema =
                !KSCommonUtils.isNullOrEmptyObject(objectServiceObjectsDDLQueries[KSDatabaseConstants.KSQueryTypes.CREATE])
                || !KSCommonUtils.isNullOrEmptyObject(objectServiceObjectsDDLQueries[KSDatabaseConstants.KSQueryTypes.DELETE])
                || Array.isArray(objectServiceObjectsDDLQueries['indicesUpdates']) && objectServiceObjectsDDLQueries['indicesUpdates'].length > 0

            if(areThereChangesInObjectServiceTableSchema || isDbUpgradeRequired) {
                var dbUpgradeQueries = null;
                if(!voltmx.sdk.isNullOrUndefined(setupOptions)
                    && setupOptions.hasOwnProperty(KSInternalConstants.DB_UPGRADE_CONTEXT)){

                    var dbUpgradeContext = setupOptions[KSInternalConstants.DB_UPGRADE_CONTEXT];
                    dbUpgradeQueries = dbUpgradeContext[KSInternalConstants.QUERIES];

                    mergeSetupQueries(dbUpgradeQueries);
                    nextIndexedDBVersion = dbUpgradeContext[KSInternalConstants.NEXT_INDEXEDDB_VERSION];

                    currentIndexedDBVersion = dbUpgradeContext[KSInternalConstants.CURRENT_INDEXEDDB_VERSION];
                    shouldUpgradePropertiesTableVersion = dbUpgradeContext[KSInternalConstants.SHOULD_UPGRADE_PROPERTIES_TABLE_VERSION];
                }

                if(!currentIndexedDBVersion) {
                    await createAndUpdateTablesForFirstTimeUser(nextIndexedDBVersion);
                } else {
                    await createUpdateDeleteTablesForIncrementalChanges(nextIndexedDBVersion);
                }

                dbUpgradeQueries = null;
                KSMetadataUtils.mergeJSONObjects(newSetupContext, setupContext);
            }

            if(!voltmx.sdk.isNullOrUndefined(dbUpgradeQueries) || shouldUpgradePropertiesTableVersion) {
                logger.trace(LOG_PREFIX, "Updating only properties tables values for dbSchemaVersion.");
                await KSMetadataUtils.updatingPropertiesTableDBSchemaVersion(dbUpgradeQueries, nextIndexedDBVersion);
            }
        }

        async function createAndUpdateTablesForFirstTimeUser(nextIndexedDBVersion) {
            logger.trace(LOG_PREFIX, "Creating tables for first time setup of offline db.");
            var metaTableQueries = KSMetadataUtils.getMetaTableCreateQueries();
            KSMetadataUtils.mergeJSONObjects(metaTableQueries, objectServiceObjectsDDLQueries[KSDatabaseConstants.KSQueryTypes.CREATE]);

            delete objectServiceObjectsDDLQueries[KSDatabaseConstants.KSQueryTypes.DELETE];

            await KSMetadataUtils.createUpdateDeleteTablesForAllObjectServices(objectServiceObjectsDDLQueries, nextIndexedDBVersion);
            await KSMetadataUtils.insertIntoMetadataAndMetaInfoTables(objectServiceMetadataContexts);
        }

        async function createUpdateDeleteTablesForIncrementalChanges(nextIndexedDBVersion) {
            logger.trace(LOG_PREFIX, "Creating, updating, and/or deleting tables for incremental changes.");

            await KSMetadataUtils.createUpdateDeleteTablesForAllObjectServices(objectServiceObjectsDDLQueries, nextIndexedDBVersion);
            await  KSMetadataUtils.insertOrReplaceIntoMetadataAndMetaInfoTable(objectServiceMetadataContexts);
        }

        function mergeSetupQueries(queries) {

            if (!KSCommonUtils.isNullOrEmptyObject(queries[KSDatabaseConstants.KSQueryTypes.CREATE])) {
                logger.trace(LOG_PREFIX, "Merging queries for action create.");
                KSMetadataUtils.mergeJSONObjects(queries[KSDatabaseConstants.KSQueryTypes.CREATE],
                    objectServiceObjectsDDLQueries[KSDatabaseConstants.KSQueryTypes.CREATE]);
            }

            if (!KSCommonUtils.isNullOrEmptyObject(queries[KSDatabaseConstants.KSQueryTypes.DELETE])) {
                logger.trace(LOG_PREFIX, "Merging queries for action delete.");

                objectServiceObjectsDDLQueries[KSDatabaseConstants.KSQueryTypes.DELETE] =
                    objectServiceObjectsDDLQueries[KSDatabaseConstants.KSQueryTypes.DELETE].concat(
                        queries[KSDatabaseConstants.KSQueryTypes.DELETE]);
            }
        }

        function allObjectServicesSetupFailed() {
            var clonedSetupStatus = voltmx.sdk.cloneObject(setupStatus);
            logger.error(LOG_PREFIX, "Volt MX Offline Objects Setup failed : " + JSON.stringify(clonedSetupStatus));

            clearProperties();
            failureCallback(new KSError(KSErrorConstants.SETUP_METADATA_REFRESH_ERROR, clonedSetupStatus));
        }

        function isDBUpgradeRequired() {
            var isDbUpgradeRequired = false;

            if(!voltmx.sdk.isNullOrUndefined(setupOptions)
                && setupOptions.hasOwnProperty(KSInternalConstants.DB_UPGRADE_CONTEXT)
                && !KSCommonUtils.isNullOrEmptyObject(setupOptions[KSInternalConstants.DB_UPGRADE_CONTEXT]
                    [KSInternalConstants.QUERIES])) {
                isDbUpgradeRequired = true;
            }

            return isDbUpgradeRequired;
        }

        /**
         * Method to clear Setup Manager properties other than callbacks and setupContext.
         * Since setupContext still should help initializing SDKObjects/SDKObjectServices which were setup successfully.
         */
        function clearProperties() {
            refreshCounter = 0;
            KSCommonUtils.clearJSONObject(setupStatus);
            KSCommonUtils.clearJSONObject(newSetupContext);
            KSCommonUtils.clearJSONObject(objectServiceMetadataContexts);
            objectServiceObjectsDDLQueries[KSDatabaseConstants.KSQueryTypes.DELETE] = [];
            objectServiceObjectsDDLQueries['indicesUpdates'] = [];
            KSCommonUtils.clearJSONObject(objectServiceObjectsDDLQueries[KSDatabaseConstants.KSQueryTypes.CREATE]);
        }

        /**
         * Method to initialize private instance variables for Setup Manager along with callbacks and objectServiceList.
         * @param objectServiceList
         * @param options
         * @param _successCallback
         * @param _failureCallback
         */
        function initializeValuesForSetup(objectServiceList, options, _successCallback, _failureCallback) {
            this.reset();
            setupOptions = options;
            successCallback = _successCallback;
            failureCallback = _failureCallback;
            objectServiceListContext = objectServiceList;
        }

        //---------------------------------
        // Utils
        //---------------------------------

        /**
         * Getter method to retrieve objectMetadata for given fullyQualifiedName.
         * @param fullyQualifiedObjectName
         * @returns {objectMetadata}
         * @throws {KSError} if objectMetadata for given fullyQualifiedName is not found in the setupContext.
         */
        KSSetupManager.prototype.getObjectMetadataForFullyQualifiedObjectName = function (fullyQualifiedObjectName) {
            for (var objectServiceName in setupContext) {
                if(setupContext.hasOwnProperty(objectServiceName)) {
                    var objectMetadata = instance.getObjectMetadataInObjectServiceWithFullyQualifiedObjectName(objectServiceName, fullyQualifiedObjectName);
                    if(objectMetadata) {
                        logger.debug(LOG_PREFIX, "Found SDKObject " + fullyQualifiedObjectName
                            + " in object service " + objectServiceName);
                        return objectMetadata;
                    }
                }
            }
            var errorMessage = "No object metadata available for the given SDKObject " + fullyQualifiedObjectName;
            logger.error(LOG_PREFIX, errorMessage);
            throw new KSError(KSErrorConstants.SETUP_OBJECT_METADATA_NOT_FOUND, errorMessage);
        };

        /**
         * Getter method to retrieve objectMetadata for given namespaceName and objectName.
         * @param namespaceName
         * @param objectName
         * @returns {objectMetadata}
         * @throws {KSError} if objectMetadata for given namespaceName and objectName, is not found in the setupContext.
         */
        KSSetupManager.prototype.getObjectMetadataForNamespaceNameAndObjectName = function (namespaceName, objectName) {
            for (var objectServiceName in setupContext) {
                if(setupContext.hasOwnProperty(objectServiceName)) {
                    var objectMetadata = instance.getObjectMetadataInObjectServiceWithNamespaceNameAndObjectName(objectServiceName, namespaceName, objectName);
                    if(objectMetadata) {
                        logger.debug(LOG_PREFIX, "Found SDKObject " + objectName + " of namespace " +
                            namespaceName + " in object service " + objectServiceName);
                        return objectMetadata;
                    }
                }
            }
            var errorMessage = "No object metadata available for the given SDKObject " + objectName + " in "
                + namespaceName + " namespace.";
            logger.error(LOG_PREFIX, errorMessage);
            throw new KSError(KSErrorConstants.SETUP_OBJECT_METADATA_NOT_FOUND, errorMessage);
        };

        /**
         * Getter method to retrieve objectMetadata for given objectServiceName and fullyQualifiedName.
         * @param objectServiceName
         * @param fullyQualifiedObjectName
         * @returns {objectMetadata}/null if objectMetadata for given objectServiceName and fullyQualifiedName,
         * is not found in the setupContext.
         */
        KSSetupManager.prototype.getObjectMetadataInObjectServiceWithFullyQualifiedObjectName = function (objectServiceName, fullyQualifiedObjectName) {
            var namespaceName = KSMetadataUtils.namespaceNameFromFullyQualifiedName(fullyQualifiedObjectName);
            var objectName = KSMetadataUtils.objectNameFromFullyQualifiedName(fullyQualifiedObjectName);
            var objectMetadata = instance.getObjectMetadataInObjectServiceWithNamespaceNameAndObjectName(objectServiceName, namespaceName, objectName);

            if(objectMetadata) {
                logger.debug(LOG_PREFIX, "Found SDKObject " + fullyQualifiedObjectName
                    + " in object service " + objectServiceName);
                return objectMetadata;
            }
        };

        /**
         * Getter method to retrieve objectMetadata for given objectServiceName, namespaceName and objectName.
         * @param objectServiceName
         * @param namespaceName
         * @param objectName
         * @returns {objectMetadata}/null if objectMetadata for given objectServiceName, namespaceName and objectName,
         * is not found in the setupContext.
         */
        KSSetupManager.prototype.getObjectMetadataInObjectServiceWithNamespaceNameAndObjectName = function (objectServiceName, namespaceName, objectName) {
            var objectService = setupContext[objectServiceName];
            if(objectService) {
                var normalizedNamespaceName = KSMetadataUtils.normalizedNamespaceName(namespaceName);
                var namespace = objectService[KSInternalConstants.NAMESPACE_METADATA_DICTIONARY][normalizedNamespaceName];
                if(namespace) {
                    var objectMetadata = namespace[KSInternalConstants.OBJECT_METADATA_DICTIONARY][objectName];
                    if(objectMetadata) {
                        return objectMetadata;
                    }
                }
            }
            return null;
        };

        exports.getInstance = KSSetupManager.getInstance;
    });
/**
 * KSApplicationSync
 * Created by KH9363 on 18/02/2019.
 * Copyright © 2018 Kony. All rights reserved.
 */
define("KSApplicationSyncHelper", ["exports", "SyncEngine", "KSSyncMFUtils", "KSError",
        "KSSetupManager", "KSOptionsHelper", "SDKObjectServiceSync"],
    function (exports, SyncEngine, KSSyncMFUtils, _KSError, KSSetupManager, KSOptionsHelper, _SDKObjectServiceSync) {

        "use strict";
        exports._esModule = true;
        var LOG_PREFIX = "KSApplicationSyncHelper : ";
        var logger = voltmx.sdk.logsdk;
        var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;
        var KSErrorConstants = voltmx.sdk.OfflineObjects.KSErrorConstants;
        var KSPublicConstants = voltmx.sdk.OfflineObjects.KSPublicConstants;

        var KSError = _KSError.KSError;
        var syncEngineInstance = SyncEngine.getInstance();
        var setupInstance = KSSetupManager.getInstance();
        var objectServicesOptions = {};
        var sdkObjectServiceInstancesMap = {};
        var syncSuccessResponse = {};
        var syncErrorResponse = {};
        var objectServiceNamesList = {};
        var syncCounter = 0;
        var removeAfterUpload = [];
        var listOfObjects;

        /**
         * Creates instances for object Services
         */
        function populateObjectServicesInstances() {
            listOfObjects = [];
            var objectServicesListContext = setupInstance.getSetupContext();
            var sdkObjectServiceSync = _SDKObjectServiceSync.SDKObjectServiceSync;

            for (var objectServiceName in objectServicesListContext) {
                try {
                    var syncObjectService = new sdkObjectServiceSync(objectServiceName);

                    logger.debug(LOG_PREFIX, "SDKObjectService instance created successfully for objectservice " + objectServiceName);
                    sdkObjectServiceInstancesMap[objectServiceName] = syncObjectService;
                    listOfObjects=listOfObjects.concat(Object.values(syncObjectService)[0].getObjectNames());
                } catch (error) {
                    logger.error(LOG_PREFIX, "SDKObjectService creation failed " + error.message);
                    syncErrorResponse[objectServiceName] = error;
                }
            }

            if (Object.keys(sdkObjectServiceInstancesMap).length === 0) {
                var errorMessage = "Application Sync failed. SDKObjectService instance creation failed for all Object Services";
                logger.error(LOG_PREFIX, errorMessage);
                var error = new KSError(KSErrorConstants.SYNC_GENERIC_ERROR, errorMessage);
                error.userInfo = syncErrorResponse;
                return error;
            }
        }

        /**
         * Method to Sync all object Services in an application
         *
         * @param options                  options for each object service provided by user
         * @param successCallback          Success Callback provided by user to be called after sync
         * @param failureCallback          Failure Callback provided by user to be called after sync
         * @param progressCallback         Progress callback to be called for each object service
         */
        async function startSync (options, successCallback, failureCallback, progressCallback) {
            logger.trace(LOG_PREFIX, "Application Sync Called.");
            try {
                isSetupSuccessful();

                if(voltmx.sdk.isNullOrUndefined(options)) {
                    options = {};
                }

                var objectServiceNamesList = Object.keys(setupInstance.getSetupContext());
                KSOptionsHelper.areApplicationSyncOptionsValid(options, objectServiceNamesList);
                logger.trace(LOG_PREFIX, "Application sync options are valid.");
                syncEngineInstance.checkAndSetFlagForApplicationSync();
                await applicationSyncInit(options, objectServiceNamesList, successCallback, failureCallback);
            } catch (error) {
                logger.error(LOG_PREFIX + "Application Sync failed with error " + error.message);
                voltmx.sdk.verifyAndCallClosure(failureCallback, error);
            }
        }

        /**
         * Method to check whether setup is successful or not
         *
         * @return boolean true if setup is successful else false
         */
        function isSetupSuccessful() {
            var isSetupSuccessful = false;
            var setupStatus = setupInstance.getSetupStatus();
            if (!voltmx.sdk.isNullOrUndefined(setupStatus.successfulObjectServices) && (setupStatus.successfulObjectServices).length !== 0) {
                isSetupSuccessful = true;
                logger.trace(LOG_PREFIX, "Setup is successful.");
            } else {
                logger.error(LOG_PREFIX + "Setup is not performed. There are no object services to sync.");
                throw new KSError(KSErrorConstants.APPLICATION_SYNC_OBJECTSERVICES_NOT_FOUND, "Setup is not performed. There are no object services to sync.")
            }

            return isSetupSuccessful;
        }

        /**
         * Method to initialize application sync helper class variables
         * and starts application sync in parallel or sequential
         * @param options                   options for each object service provided by user
         * @param objectServiceNameList    List of Object Services present in the Application
         * @param successCallback           Success Callback provided by user to be called after sync
         * @param failureCallback           Failure Callback provided by user to be called after sync
         */
        async function applicationSyncInit(options, objectServiceNameList, successCallback, failureCallback) {
            try {
                clear();
                var invalidObjNames = [];
                objectServiceNamesList = objectServiceNameList;
                var objSvcsOptions = options[KSPublicConstants.APPLICATION_SYNC_OBJECT_SERVICES_OPTIONS];
                objectServicesOptions = (voltmx.sdk.util.isJsonObject(objSvcsOptions)) ? objSvcsOptions : {};
                if(options.hasOwnProperty(KSPublicConstants.REMOVE_AFTER_UPLOAD)) {
                    removeAfterUpload = options["removeAfterUpload"];
                }
                populateObjectServicesInstances();
                if (!voltmx.sdk.isNullOrUndefined(options.removeAfterUpload) && !voltmx.sdk.isEmptyObject(options.removeAfterUpload)) {
                    for (var obj in options.removeAfterUpload) {
                        if (!listOfObjects.includes(options.removeAfterUpload[obj])) {
                            invalidObjNames.push(removeAfterUpload[obj]);
                        }
                    }
                    if (!voltmx.sdk.isEmptyObject(invalidObjNames)) {
                        var errorMessage = KSErrorConstants.SYNC_INVALID_REMOVEAFTERUPLOAD_ERR_MSG + " : " + invalidObjNames;
                        logger.error(LOG_PREFIX, errorMessage);
                        throw new KSError(KSErrorConstants.SYNC_INVALID_REMOVEAFTERUPLOAD_LIST, errorMessage);
                    }
                }
                if (options[KSPublicConstants.APPLICATION_SYNC_MODE] === KSPublicConstants.APPLICATION_SYNC_SEQUENTIAL) {
                    logger.debug(LOG_PREFIX, "Starting Application Sync in sequence");
                    await startObjectServicesSyncInSequence(successCallback, failureCallback);
                } else {
                    logger.debug(LOG_PREFIX, "Starting Application Sync in parallel");
                    await startObjectServicesSyncInParallel(successCallback, failureCallback);
                }

            } catch (error) {
                syncEngineInstance.applicationSyncCompleted();
                logger.error(LOG_PREFIX + error.message);
                voltmx.sdk.verifyAndCallClosure(failureCallback, error);
            }
        }

        /**
         * This method initiates sync for object service
         *
         * @param objectServiceName                Name of object service
         * @param onSuccess                        Success Callback provided by user to be called after sync
         * @param onFailure                        Failure Callback provided by user to be called after sync
         */
        function objectServiceStartSync(objectServiceName, onSuccess, onFailure) {
            var syncObjectService = sdkObjectServiceInstancesMap[objectServiceName];
            var objectServiceOptions;

            if(!voltmx.sdk.isNullOrUndefined(objectServicesOptions) && objectServicesOptions.hasOwnProperty(objectServiceName)) {
                objectServiceOptions = objectServicesOptions[objectServiceName];
            } else {
                objectServiceOptions = {};
            }
            objectServiceOptions["removeAfterUpload"] = removeAfterUpload;
            syncObjectService.startSync(objectServiceOptions, onSuccess, onFailure);
        }

        /**
         * Method to populate objectServiceResponse with keys syncSuccessResponse and syncErrorResponse
         *
         * @param objectServiceResponse JSON which will contain syncSuccessResponse and syncErrorResponse
         */
        function setObjectServiceResponse(objectServiceResponse) {
            if ((Object.keys(syncSuccessResponse)).length > 0) {
                objectServiceResponse[KSPublicConstants.APPLICATION_SYNC_SUCCESS_RESPONSE] = syncSuccessResponse;
            }

            if ((Object.keys(syncErrorResponse)).length > 0) {
                objectServiceResponse[KSPublicConstants.APPLICATION_SYNC_FAILURE_RESPONSE] = syncErrorResponse;
            }
        }

        /**
         * Asynchronous Sync flow, Sync happens parallel for object services
         * @param successCallback  Success Callback provided by user to be called after sync
         * @param failureCallback  Failure Callback provided by user to be called after sync
         */
        async function startObjectServicesSyncInParallel(successCallback, failureCallback) {
            logger.debug(LOG_PREFIX, "startObjectServicesSyncInParallel called");
            var objectServiceName = Object.keys(sdkObjectServiceInstancesMap)[syncCounter];
            logger.debug(LOG_PREFIX, "Starting sync for object service " + objectServiceName);

            function onSuccess(syncResponse) {
                logger.debug(LOG_PREFIX, "Sync successful for object service " + syncResponse[KSInternalConstants.OBJECT_SERVICE_NAME]);
                syncSuccessResponse[syncResponse[KSInternalConstants.OBJECT_SERVICE_NAME]] = syncResponse;
                syncCounter++;

                if (syncCounter === Object.keys(sdkObjectServiceInstancesMap).length) {
                    setResponseAndInvokeCallback(successCallback, failureCallback);
                }
            }

            function onFailure(error) {
                var objectServiceName = error.userInfo[KSInternalConstants.OBJECT_SERVICE_NAME];
                logger.debug(LOG_PREFIX, "Sync failed for object service " + objectServiceName);
                syncErrorResponse[objectServiceName] = error;
                syncCounter++;

                if (syncCounter === Object.keys(sdkObjectServiceInstancesMap).length) {
                    setResponseAndInvokeCallback(successCallback, failureCallback);
                }
            }

            for (var objectServiceName in sdkObjectServiceInstancesMap) {
                objectServiceStartSync(objectServiceName, onSuccess, onFailure);
            }
        }

        /**
         * Synchronous Sync flow, Sync happens sequentially for object services
         * @param successCallback  Success Callback provided by user to be called after sync
         * @param failureCallback  Failure Callback provided by user to be called after sync
         */
        async function startObjectServicesSyncInSequence(successCallback, failureCallback) {
            logger.debug(LOG_PREFIX, "startObjectServicesSyncInSequence called");
            var objectServiceName = Object.keys(sdkObjectServiceInstancesMap)[syncCounter];
            logger.debug(LOG_PREFIX, "Starting sync for object service " + objectServiceName);

            function onSuccess(syncResponse) {
                logger.debug(LOG_PREFIX, "Sync successful for object service " + JSON.stringify(syncResponse));
                syncSuccessResponse[syncResponse[KSInternalConstants.OBJECT_SERVICE_NAME]] = syncResponse;
                syncCounter++;

                if (syncCounter < Object.keys(sdkObjectServiceInstancesMap).length) {
                    var objectServiceName = Object.keys(sdkObjectServiceInstancesMap)[syncCounter];
                    objectServiceStartSync(objectServiceName, onSuccess, onFailure);
                } else {
                    setResponseAndInvokeCallback(successCallback, failureCallback);
                }
            }

            function onFailure(error) {
                logger.debug(LOG_PREFIX, "Sync failed for object service ");
                var objectServiceName = error.userInfo[KSInternalConstants.OBJECT_SERVICE_NAME];
                syncErrorResponse[objectServiceName] = error;
                syncCounter++;

                if (syncCounter < Object.keys(sdkObjectServiceInstancesMap).length) {
                    objectServiceStartSync(Object.keys(sdkObjectServiceInstancesMap)[syncCounter], onSuccess, onFailure);
                } else {
                    setResponseAndInvokeCallback(successCallback, failureCallback);
                }
            }

            objectServiceStartSync(objectServiceName, onSuccess, onFailure);
        }

        /**
         * Clears the global variables
         */
        function clear() {
            objectServicesOptions = {};
            removeAfterUpload = [];
            sdkObjectServiceInstancesMap = {};
            syncSuccessResponse = {};
            syncErrorResponse = {};
            objectServiceNamesList = {};
            syncCounter = 0;
            logger.trace(LOG_PREFIX, "Cleared all global variables.");

        }

        /**
         * Method to be called after all the syncing tasks are done
         * @param objectServiceResponse  JSON which will contain syncSuccessResponse and syncErrorResponse
         * @param successCallback        Success Callback provided by user to be called after sync
         * @param failureCallback        Failure Callback provided by user to be called after sync
         */
        function applicationSyncCompletionHandler(applicationSyncResponse, successCallback, failureCallback) {
            syncEngineInstance.applicationSyncCompleted();

            if (Object.keys(syncErrorResponse).length === 0) {
                logger.debug(LOG_PREFIX, "Application sync success. Calling success callback ");

                voltmx.sdk.verifyAndCallClosure(successCallback, applicationSyncResponse);
            } else {
                var errorMessage = "Application sync failed. Calling failure callback";
                logger.error(LOG_PREFIX, errorMessage);
                var error = new KSError(KSErrorConstants.SYNC_GENERIC_ERROR, errorMessage);
                error.userInfo = applicationSyncResponse;
                voltmx.sdk.verifyAndCallClosure(failureCallback, error);
            }
        }

        /**
         * Decides whether to invoke success or failure callback of Application Sync
         */
        function setResponseAndInvokeCallback(successCallback, failureCallback) {
            var objectServiceResponse = {};
            setObjectServiceResponse(objectServiceResponse);

            if ((Object.keys(syncErrorResponse)).length === 0) {
                logger.trace(LOG_PREFIX, "Completed Application sync for " + Object.keys(sdkObjectServiceInstancesMap) + ".");
            } else {
                var errorMessage = "Application Sync failed due to failure in sync of one or more object services,[ "
                    + Object.keys(syncErrorResponse) + "]. Calling Failure Callback.";
                logger.error(LOG_PREFIX, errorMessage);
            }

            applicationSyncCompletionHandler(objectServiceResponse, successCallback, failureCallback);
        }

        exports.startSync = startSync;

    });

/**
 * Module to manage the running tasks in offline objects.
 */

define("KSRunningTasksManager", ["exports", "KSCommonUtils"], function(exports, KSCommonUtils) {

    var instance = null;
    var KSTasks = voltmx.sdk.OfflineObjects.KSTasks;
    var KSTaskID = voltmx.sdk.OfflineObjects.KSTaskID;
    var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;
    var trackActiveSyncTasks;

    /**
     * Method to initialise the KSRunningTasksContext in the local store, if not present already.
     * @constructor Constructor for KSRunningTasksManager.
     */
    function KSRunningTasksManager() {
        var runningTasksContext = KSCommonUtils.getRunningTasksContext();
        trackActiveSyncTasks = [];

        if(KSCommonUtils.isNullOrEmptyObject(runningTasksContext)) {
            var runningTasksContext = {
                APPLICATION_LEVEL : 0
            };

            KSCommonUtils.setRunningTasksContext(runningTasksContext);
        }
    }

    /**
     * Method to make KSRunningTasksManager a singleton.
     * @returns {*} Instance of KSRunningTasksManager.
     */
    KSRunningTasksManager.getInstance = function () {
        if (instance == null) {
            instance = new KSRunningTasksManager();
        }
        return instance;
    };

    //-------------------------------------
    // METHODS FOR APPLICATION LEVEL TASKS
    //-------------------------------------

    /**
     * Method to check if the application level API is allowed to execute.
     * @param taskToBeChecked Application level task which needs to be checked.
     * @returns {boolean} Boolean stating if the application level API is allowed to execute.
     */
    KSRunningTasksManager.prototype.isApplicationLevelOperationAllowed = function(taskToBeChecked) {
        var runningTasksContext = KSCommonUtils.getRunningTasksContext();
        return ((runningTasksContext.APPLICATION_LEVEL & taskToBeChecked.BLOCKINGTASKS) === 0);
    };

    /**
     * Method to update the KSRunningTasksContext in local storage with Application level API task.
     * @param taskToBeAdded Application level API task which needs to be added to the KSRunningTasksContext.
     */
    KSRunningTasksManager.prototype.updateRunningTaskContextWithApplicationTasks = function(taskToBeAdded) {
        var runningTasksContext = KSCommonUtils.getRunningTasksContext();

        runningTasksContext.APPLICATION_LEVEL = runningTasksContext.APPLICATION_LEVEL | taskToBeAdded.ID;

        KSCommonUtils.setRunningTasksContext(runningTasksContext);
    };

    /**
     * Method to remove Application level API task from KSRunningTasksContext in local storage.
     * @param taskToBeRemoved Application level API task which needs to be removed from the KSRunningTasksContext.
     */
    KSRunningTasksManager.prototype.removeApplicationTaskFromRunningTaskContext = function(taskToBeRemoved) {
        var runningTasksContext = KSCommonUtils.getRunningTasksContext();

        // The bitwise Negation operation is succeeded by Zero fill right shift operation
        // to give a unsigned integer as result.
        // Bitwise And operation is followed by a bitwise Negation operation to flip the corresponding bit.
        runningTasksContext.APPLICATION_LEVEL = runningTasksContext.APPLICATION_LEVEL & (~(taskToBeRemoved.ID) >>> 0);

        KSCommonUtils.setRunningTasksContext(runningTasksContext);
    };

    //---------------------------
    // METHODS FOR SYNCING TASKS
    //---------------------------

    /**
     * Method to check if the sync on syncable object is allowed to execute.
     * @param syncableObject syncableObject which needs to be checked.
     * @returns {boolean} Boolean stating if the sync on syncableObject is allowed to execute.
     */
    KSRunningTasksManager.prototype.isSyncOperationAllowed = function (syncableObject) {

        var runningTasksContext = KSCommonUtils.getRunningTasksContext();

        // The bitwise Negation operation is succeeded by Zero fill right shift operation
        // to give a unsigned integer as result.
        // Bitwise And operation is followed by a bitwise Negation operation to flip the corresponding bit.
        if ((runningTasksContext.APPLICATION_LEVEL & (KSTasks.SYNC.BLOCKINGTASKS & (~(KSTaskID.SYNC) >>> 0))) > 0) {
            return false;
        }

        var name = getKeyForSyncableObject.call(this, syncableObject.name, syncableObject.getSyncLevel(), syncableObject);

        if (runningTasksContext.hasOwnProperty(name) &&
            ((runningTasksContext[name] & KSTasks.SYNC.BLOCKINGTASKS) > 0)) {
            return false;
        }

        if (syncableObject.getSyncLevel() == KSInternalConstants.SYNCLEVEL_OBJECT) {

            var objectServiceName = getKeyForSyncableObject(syncableObject.objectServiceName);

            if (runningTasksContext.hasOwnProperty(objectServiceName) &&
                ((runningTasksContext[objectServiceName] & KSTasks.SYNC.BLOCKINGTASKS) > 0)) {
                return false;
            }

        } else if (syncableObject.getSyncLevel() == KSInternalConstants.SYNCLEVEL_OBJECTSERVICE) {

            var objectNamesArray = syncableObject.getObjectNames();

            for (var i = objectNamesArray.length - 1; i >= 0; i--) {

                var objectName = getKeyForSyncableObject.call(this,
                    objectNamesArray[i],
                    KSInternalConstants.SYNCLEVEL_OBJECT,
                    syncableObject);

                if (runningTasksContext.hasOwnProperty(objectName)) {
                    if ((runningTasksContext[objectName] & KSTasks.SYNC.BLOCKINGTASKS) > 0) {
                        return false;
                    }
                }
            }
        }

        return true;
    };

    /**
     * Method to update the KSRunningTasksContext in local storage with sync on syncable task.
     * @param syncableObject SyncableObject which needs to be added to the KSRunningTasksContext.
     */
    KSRunningTasksManager.prototype.updateRunningTaskContextWithSyncableTasks = function(syncableObject) {

        var name = getKeyForSyncableObject.call(this, syncableObject.name, syncableObject.getSyncLevel(), syncableObject);

        var runningTasksContext = KSCommonUtils.getRunningTasksContext();

        runningTasksContext.APPLICATION_LEVEL = runningTasksContext.APPLICATION_LEVEL | KSTasks.SYNC.ID;

        if(runningTasksContext.hasOwnProperty(name)) {
            runningTasksContext[name] = runningTasksContext[name] | KSTasks.SYNC.ID;
        } else {
            runningTasksContext[name] = KSTasks.SYNC.ID;
        }

        trackActiveSyncTasks.push(name);

        KSCommonUtils.setRunningTasksContext(runningTasksContext);
    };

    /**
     * Method to remove sync task on SyncableObject from KSRunningTasksContext in local storage.
     * @param syncableObject Syncable object whose sync operation needs to be removed from the KSRunningTasksContext.
     */
    KSRunningTasksManager.prototype.removeSyncableTasksFromRunningTaskContext = function(syncableObject) {

        var name = getKeyForSyncableObject.call(this, syncableObject.name, syncableObject.getSyncLevel(), syncableObject);

        var runningTasksContext = KSCommonUtils.getRunningTasksContext();

        // The bitwise Negation operation is succeeded by Zero fill right shift operation
        // to give a unsigned integer as result.
        // Bitwise And operation is followed by a bitwise Negation operation to flip the corresponding bit.
        runningTasksContext[name] = runningTasksContext[name] & (~(KSTasks.SYNC.ID) >>> 0);
        KSCommonUtils.removeElementByName(trackActiveSyncTasks, name);

        if(trackActiveSyncTasks.length === 0) {
            runningTasksContext.APPLICATION_LEVEL = runningTasksContext.APPLICATION_LEVEL & (~(KSTasks.SYNC.ID) >>> 0);
        }

        KSCommonUtils.setRunningTasksContext(runningTasksContext);
    };

    /**
     * Method to check if the rollback on syncable object is allowed to execute.
     * @param rollbackLevel the level at which rollback is performed.
     * @param rollbackObject rollbackObject which needs to be checked.
     * @returns {boolean} Boolean stating if the rollback on rollbackObject is allowed to execute.
     */
    KSRunningTasksManager.prototype.isRollbackOperationAllowed = function (rollbackLevel, rollbackObject) {
        var runningTasksContext = KSCommonUtils.getRunningTasksContext();

        if((runningTasksContext.APPLICATION_LEVEL & KSTasks.ROLLBACK.BLOCKINGTASKS) > 0) {
            return false;
        }

        if(rollbackLevel !== KSInternalConstants.SYNCLEVEL_APPLICATION) {
            var name = getKeyForSyncableObject.call(this, rollbackObject.name, rollbackObject.getSyncLevel(), rollbackObject);

            if (runningTasksContext.hasOwnProperty(name) &&
                ((runningTasksContext[name] & KSTasks.ROLLBACK.BLOCKINGTASKS) > 0)) {
                return false;
            }

            if (rollbackObject.getSyncLevel() == KSInternalConstants.SYNCLEVEL_OBJECT) {
                var objectServiceName = getKeyForSyncableObject(rollbackObject.objectServiceName);

                if (runningTasksContext.hasOwnProperty(objectServiceName) &&
                    ((runningTasksContext[objectServiceName] & KSTasks.ROLLBACK.BLOCKINGTASKS) > 0)) {
                    return false;
                }

            } else if (rollbackObject.getSyncLevel() == KSInternalConstants.SYNCLEVEL_OBJECTSERVICE) {

                var objectNamesArray = rollbackObject.getObjectNames();

                for (var i = objectNamesArray.length - 1; i >= 0; i--) {

                    var objectName = getKeyForSyncableObject.call(this,
                        objectNamesArray[i],
                        KSInternalConstants.SYNCLEVEL_OBJECT,
                        rollbackObject);

                    if (runningTasksContext.hasOwnProperty(objectName)) {
                        if ((runningTasksContext[objectName] & KSTasks.ROLLBACK.BLOCKINGTASKS) > 0) {
                            return false;
                        }
                    }
                }
            }
        } else {
            for(var runningTask in runningTasksContext) {
                if((runningTasksContext[runningTask] & KSTasks.ROLLBACK.BLOCKINGTASKS) > 0) {
                    return false;
                }
            }
        }

        return true;
    };

    /**
     * Method to update the KSRunningTasksContext in local storage with rollback on syncable task.
     * @param rollbackLevel the level at which rollback is performed.
     * @param rollbackObject SyncableObject which needs to be added to the KSRunningTasksContext.
     */
    KSRunningTasksManager.prototype.updateRunningTaskContextWithRollbackTasks = function(rollbackLevel, rollbackObject) {
        var runningTasksContext = KSCommonUtils.getRunningTasksContext();

        if(rollbackLevel !== KSInternalConstants.SYNCLEVEL_APPLICATION) {
            var name = getKeyForSyncableObject.call(this, rollbackObject.name, rollbackObject.getSyncLevel(), rollbackObject);
            if (runningTasksContext.hasOwnProperty(name)) {
                runningTasksContext[name] = runningTasksContext[name] | KSTasks.ROLLBACK.ID;
            } else {
                runningTasksContext[name] = KSTasks.ROLLBACK.ID;
            }
        } else {
            runningTasksContext.APPLICATION_LEVEL = runningTasksContext.APPLICATION_LEVEL | KSTasks.ROLLBACK.ID;
        }

        KSCommonUtils.setRunningTasksContext(runningTasksContext);
    };

    /**
     * Method to remove rollback task on SyncableObject from KSRunningTasksContext in local storage.
     * @param rollbackLevel the level at which rollback is performed.
     * @param rollbackObject Syncable object whose rollback operation needs to be removed from the KSRunningTasksContext.
     */
    KSRunningTasksManager.prototype.removeRollbackTasksFromRunningTaskContext = function(rollbackLevel, rollbackObject) {
        var runningTasksContext = KSCommonUtils.getRunningTasksContext();

        if(rollbackLevel !== KSInternalConstants.SYNCLEVEL_APPLICATION) {
            // The bitwise Negation operation is succeeded by Zero fill right shift operation
            // to give a unsigned integer as result.
            // Bitwise And operation is followed by a bitwise Negation operation to flip the corresponding bit.
            var name = getKeyForSyncableObject.call(this, rollbackObject.name, rollbackObject.getSyncLevel(), rollbackObject);
            runningTasksContext[name] = runningTasksContext[name] & (~(KSTasks.ROLLBACK.ID) >>> 0);
        } else {
            runningTasksContext.APPLICATION_LEVEL = runningTasksContext.APPLICATION_LEVEL & (~(KSTasks.ROLLBACK.ID) >>> 0);
        }
        KSCommonUtils.setRunningTasksContext(runningTasksContext);
    };

    //------------------
    // HELPER METHODS
    //------------------

    /**
     * Method to build the key for the syncable object.
     * @param name Name of the syncable object.
     * @param syncLevel Level of the object for which the key needs to be created.
     * @param syncableObject Syncable object upon which the sync is invoked.
     * @returns {string} Key constructed to be stored in the local storage.
     */
    function getKeyForSyncableObject(name, syncLevel, syncableObject) {
        var constructedName = name;

        if(syncLevel === KSInternalConstants.SYNCLEVEL_OBJECT) {
            var objectServiceName = (syncableObject.getSyncLevel() === KSInternalConstants.SYNCLEVEL_OBJECT)
                ? syncableObject.objectServiceName
                : syncableObject.name;
            constructedName = objectServiceName + KSInternalConstants.DOT + name;
        }

        return constructedName.toUpperCase();
    }

    exports.getInstance = KSRunningTasksManager.getInstance;
});
define("SyncEngine",

    ["exports", "KSSetupManager", "KSError", "KSSyncingTask", "KSSyncDatabaseHelper", "KSSDKObjectService",
        "KSRunningTasksManager", "KSCommonUtils", "KSDatabaseUpgradeManager", "KSUploadCacheManager"],

    function (exports, KSSetupManager, _KSError, _KSSyncingTask, KSSyncDatabaseHelper, KSSDKObjectService,
              KSRunningTasksManager, KSCommonUtils, KSDatabaseUpgradeManager, KSUploadCacheManager) {

        "use strict";
        exports._esModule = true;
        var logger = voltmx.sdk.logsdk;
        var KSError = _KSError.KSError;
        var LOG_PREFIX = "SyncEngine : ";
        var KSTasks = voltmx.sdk.OfflineObjects.KSTasks;
        var KSSyncingTask = _KSSyncingTask.KSSyncingTask;
        var KSErrorConstants = voltmx.sdk.OfflineObjects.KSErrorConstants;
        var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;

        var instance = null;

        function SyncEngine() {
        }

        SyncEngine.getInstance = function () {
            if (instance == null) {
                instance = new SyncEngine();
            }
            return instance;
        };

        SyncEngine.prototype.setup = function (objServiceList, options, successCallback, failureCallback) {
            logger.trace(LOG_PREFIX + "Setup invoked.");

            try {
                KSCommonUtils.resetLocksOnPageReload();
                if (KSRunningTasksManager.getInstance().isApplicationLevelOperationAllowed(KSTasks.SETUP)) {
                    KSRunningTasksManager.getInstance().updateRunningTaskContextWithApplicationTasks(KSTasks.SETUP);

                    KSDatabaseUpgradeManager.getContextToPerformDBUpgrade()
                        .then(dbUpgradeContext => {

                            if(voltmx.sdk.isNullOrUndefined(options)) {
                                options = {};
                            }
                            options[KSInternalConstants.DB_UPGRADE_CONTEXT] = dbUpgradeContext;
                            setupOfflineObjectServices(objServiceList, options, successCallback, failureCallback);
                        })
                        .catch(exception => {
                            logger.error(LOG_PREFIX, "Setup failed with error: " + exception);
                            voltmx.sdk.verifyAndCallClosure(failureCallback, exception);
                        });
                } else {
                    var errorMessage = "Setup cannot be performed as other Offline Object operations are in progress.";
                    logger.warn(LOG_PREFIX, errorMessage);
                    voltmx.sdk.verifyAndCallClosure(failureCallback, new KSError(KSErrorConstants.APPLICATIONTASKS_IN_PROGRESS, errorMessage));
                }
            } catch (setupException) {
                logger.error(LOG_PREFIX, "Setup failed with error: " + setupException);
                voltmx.sdk.verifyAndCallClosure(failureCallback, setupException);
            }
        };

        function setupOfflineObjectServices(objServiceList, options, successCallback, failureCallback) {
            var localSuccessCallback = function (response) {
                logger.debug(LOG_PREFIX + "Setup successful ");
                setupTaskCompleted();
                voltmx.sdk.verifyAndCallClosure(successCallback, response);
            };

            var localFailureCallback = function (error) {
                logger.error(LOG_PREFIX, "Setup failed with error: " + error);
                setupTaskCompleted();
                voltmx.sdk.verifyAndCallClosure(failureCallback, error);
            };

            var setupManagerInstance = KSSetupManager.getInstance();
            setupManagerInstance.setup(objServiceList, options, localSuccessCallback, localFailureCallback);
        }

        SyncEngine.prototype.drop = function (options, successCallback, failureCallback) {
            logger.trace(LOG_PREFIX + "Drop invoked.");
            if (KSRunningTasksManager.getInstance().isApplicationLevelOperationAllowed(KSTasks.DROP)) {
                KSRunningTasksManager.getInstance().updateRunningTaskContextWithApplicationTasks(KSTasks.DROP);
                dropOfflineDatabase(successCallback, failureCallback);
            } else {
                var errorMessage = "Drop cannot be performed as other Offline Object operations are in progress.";
                logger.error(LOG_PREFIX, errorMessage);
                voltmx.sdk.verifyAndCallClosure(failureCallback, new KSError(KSErrorConstants.APPLICATIONTASKS_IN_PROGRESS, errorMessage));
            }
        };

        SyncEngine.prototype.rollback = async function () {
            if (this.isRollbackOperationAllowed(KSInternalConstants.SYNCLEVEL_APPLICATION)) {
                this.updateRunningTaskContextWithRollbackTasks(KSInternalConstants.SYNCLEVEL_APPLICATION);

                var preparedStatementsForRollback = await KSSyncDatabaseHelper.buildPreparedStatementsForApplicationRollback();
                await KSSyncDatabaseHelper.executePreparedStatementsAsTransaction(preparedStatementsForRollback);

                await KSUploadCacheManager.getInstance().clearAll();
            } else {
                var errorMessage = "Rollback cannot be performed as other Offline Object operations are in progress.";
                logger.error(LOG_PREFIX, errorMessage);
                throw new KSError(KSErrorConstants.APPLICATIONTASKS_IN_PROGRESS, errorMessage);
            }
        };

        function dropOfflineDatabase(successCallback, failureCallback) {
            function dropSuccess(result) {
                logger.debug(LOG_PREFIX + "Drop successful ");
                dropTaskCompleted();
                voltmx.sdk.verifyAndCallClosure(successCallback, result);
            }

            function dropFailure(dropException) {
                logger.error(LOG_PREFIX, "Drop failed with error: " + dropException);
                dropTaskCompleted();
                if (!voltmx.sdk.isNullOrUndefined(dropException) && (dropException.name === "NoSuchDatabaseError")) {
                    voltmx.sdk.verifyAndCallClosure(successCallback, {});
                } else {
                    if (!dropException.hasOwnProperty(KSInternalConstants.ERROR_DOMAIN)) {
                        dropException = new KSError(KSErrorConstants.DROP_DB_FAILED, dropException.stack);
                    }
                    voltmx.sdk.verifyAndCallClosure(failureCallback, dropException);
                }
            }

            KSSyncDatabaseHelper.dropDatabase().then(dropSuccess, dropFailure);
        }

        SyncEngine.prototype.reset = function (objServiceList, options, successCallback, failureCallback) {
            logger.trace(LOG_PREFIX + "Reset invoked.");

            function localSuccessCallback(response) {
                logger.debug(LOG_PREFIX + "Reset successful ");
                resetTaskCompleted();
                voltmx.sdk.verifyAndCallClosure(successCallback, response);
            }

            function localFailureCallback(error) {
                logger.error(LOG_PREFIX, "Reset failed with error: " + error);
                resetTaskCompleted();
                voltmx.sdk.verifyAndCallClosure(failureCallback, error);
            }

            function dropSucessCallback() {
                setupOfflineObjectServices(objServiceList, options, localSuccessCallback, localFailureCallback);
            }

            if (KSRunningTasksManager.getInstance().isApplicationLevelOperationAllowed(KSTasks.RESET)) {
                KSRunningTasksManager.getInstance().updateRunningTaskContextWithApplicationTasks(KSTasks.RESET);
                dropOfflineDatabase(dropSucessCallback, localFailureCallback);
            } else {
                var errorMessage = "Reset cannot be performed as other Offline Object operations are in progress.";
                logger.error(LOG_PREFIX, errorMessage);
                voltmx.sdk.verifyAndCallClosure(failureCallback, new KSError(KSErrorConstants.APPLICATIONTASKS_IN_PROGRESS, errorMessage));
            }
        };

        SyncEngine.prototype.startSyncSessionForObject = async function (options, object) {
            if (!voltmx.sdk.isNullOrUndefined(object)) {
                var response = await this.startSyncingTaskForObject(options, object);
                return (response);
            }
        };

        SyncEngine.prototype.startSyncingTaskForObject = async function (options, syncableObject) {
            if (KSRunningTasksManager.getInstance().isSyncOperationAllowed(syncableObject)) {

                KSRunningTasksManager.getInstance().updateRunningTaskContextWithSyncableTasks(syncableObject);
                syncableObject.prepareForSession();
                var syncingTaskInstance = new KSSyncingTask(syncableObject, options);

                try {
                    var responseToBeSent = await syncingTaskInstance.execute();
                    syncableObject.clearObjectsToPersist();
                    KSRunningTasksManager.getInstance().removeSyncableTasksFromRunningTaskContext(syncableObject);
                    return responseToBeSent;
                } catch (exception) {
                    syncableObject.clearObjectsToPersist();
                    KSRunningTasksManager.getInstance().removeSyncableTasksFromRunningTaskContext(syncableObject);
                    throw exception;
                }
            } else {
                var errorMessage = "Sync cannot be performed as other Offline Object operations are in progress.";
                logger.error(LOG_PREFIX, syncableObject.getFullyQualifiedName() + " : " + errorMessage);
                throw new KSError(KSErrorConstants.SYNC_IN_PROGRESS, errorMessage);
            }
        };

        function dropTaskCompleted() {
            KSSetupManager.getInstance().reset();
            KSSDKObjectService.clearObjectServiceMap();
            KSRunningTasksManager.getInstance().removeApplicationTaskFromRunningTaskContext(KSTasks.DROP);
        }

        function resetTaskCompleted() {
            KSRunningTasksManager.getInstance().removeApplicationTaskFromRunningTaskContext(KSTasks.RESET);
        }

        function setupTaskCompleted() {
            KSRunningTasksManager.getInstance().removeApplicationTaskFromRunningTaskContext(KSTasks.SETUP);
        }

        SyncEngine.prototype.isRollbackOperationAllowed = function(rollbackLevel, rollbackObject) {
            return KSRunningTasksManager.getInstance().isRollbackOperationAllowed(rollbackLevel, rollbackObject);
        };

        SyncEngine.prototype.updateRunningTaskContextWithRollbackTasks = function(rollbackLevel, rollbackObject) {
            KSRunningTasksManager.getInstance().updateRunningTaskContextWithRollbackTasks(rollbackLevel, rollbackObject);
        };

        SyncEngine.prototype.rollbackTaskCompleted = function(rollbackLevel, rollbackObject) {
            KSRunningTasksManager.getInstance().removeRollbackTasksFromRunningTaskContext(rollbackLevel, rollbackObject);
        };

        /**
         * This method returns false if any blocking task to Application Sync is running
         * If empty, it adds Sync key to runningTaskContext
         *
         * @return boolean returns true if blocking tasks are none
         */
        SyncEngine.prototype.checkAndSetFlagForApplicationSync = function() {
            var isApplicationSyncAllowed =  false;

            if (KSRunningTasksManager.getInstance().isApplicationLevelOperationAllowed(KSTasks.SYNC)) {
                isApplicationSyncAllowed = true;
                KSRunningTasksManager.getInstance().updateRunningTaskContextWithApplicationTasks(KSTasks.SYNC);
                logger.debug(LOG_PREFIX, "runningTaskKeyForApplicationSync is successfully put in runningTaskContext");
            } else {
                var errorMessage = "Could not start Application Sync, as another Offline objects operation is already in progress";
                logger.warn(LOG_PREFIX, errorMessage);
                throw new KSError(KSErrorConstants.SYNC_IN_PROGRESS, errorMessage);
            }

            return isApplicationSyncAllowed;
        };

        /**
         * Removes Sync key from runningTaskContext
         */
        SyncEngine.prototype.applicationSyncCompleted = function() {
            logger.debug(LOG_PREFIX, "runningTaskKeyForApplicationSync removed from runningTaskContext");
            KSRunningTasksManager.getInstance().removeApplicationTaskFromRunningTaskContext(KSTasks.SYNC);
        };

        exports.getInstance = SyncEngine.getInstance;
    });
define("SDKObjectServiceSync", ["exports", "KSSDKObjectService", "KSError", "SyncEngine", "KSCommonUtils"], function (exports, KSSDKObjectService, _KSError, SyncEngine, KSCommonUtils) {
    "use strict";
    exports._esModule = true;

    var LOG_PREFIX = "SDKObjectServiceSync:";
    var logger = voltmx.sdk.logsdk;
    var KSError = _KSError.KSError;
    var KSErrorConstants = voltmx.sdk.OfflineObjects.KSErrorConstants;
    var KSPublicConstants = voltmx.sdk.OfflineObjects.KSPublicConstants;
    var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;
    var syncEngineInstance = SyncEngine.getInstance();
    var syncObjectService;

    var SDKObjectServiceSync = function (name) {
        this.syncObjectService = KSSDKObjectService.getInstanceByName(name);
    };

    SDKObjectServiceSync.prototype.startSync = function (syncConfig, successCallback, failureCallback, progressCallback) {
        logger.trace(LOG_PREFIX, "startSync is called in SDKObjectServiceSync.");

        var objSvcName = this.syncObjectService.getFullyQualifiedName();
        this.syncObjectService.startSync(syncConfig).then(onSuccess, onFailure);

        function onSuccess(result) {
            var message = "Sync successful on object service.";
            result[KSPublicConstants.STATUS] = KSErrorConstants.STATUS_SUCCESS;
            result[KSInternalConstants.OBJECT_SERVICE_NAME] = objSvcName;
            logger.info(LOG_PREFIX, message);
            if (successCallback) {
                successCallback(result);
            } else {
                logger.info(LOG_PREFIX, "Callbacks are not provided. " + message);
            }
        }

        function onFailure(error) {
            logger.error(LOG_PREFIX, "Sync on object service failed with error " + error.message);

            if (!error.hasOwnProperty(KSInternalConstants.ERROR_DOMAIN)) {
                error = new KSError(KSErrorConstants.SYNC_GENERIC_ERROR, error.stack);
            }
            error[KSPublicConstants.STATUS] = KSErrorConstants.STATUS_FAILURE;
            error.userInfo = KSCommonUtils.getUserInfo(objSvcName, error);

            if (failureCallback) {
                failureCallback(error);
            } else {
                logger.info(LOG_PREFIX, "Callbacks are not provided. Sync failed on object with error " + error.message);
            }
        }
    };

    SDKObjectServiceSync.prototype.cancelSync = function (options, successCallback, failureCallback) {

    };

    /**
     * Rollback an ObjectService to it's previous Sync State
     *
     * @param successCallback will be invoked on the Success of rollback.
     * @param failureCallback will be invoked at the time of any error.
     */
    SDKObjectServiceSync.prototype.rollback = function (successCallback, failureCallback) {
        logger.trace(LOG_PREFIX + "Offline objects rollback called.");

        this.syncObjectService.rollback().then(onSuccess, onFailure);
        var self = this;
        function onSuccess() {
            logger.info(LOG_PREFIX + "Offline objects rollback is success full.");
            syncEngineInstance.rollbackTaskCompleted(KSInternalConstants.SYNCLEVEL_OBJECTSERVICE, self.syncObjectService);
            voltmx.sdk.verifyAndCallClosure(successCallback, true);
        }

        function onFailure(error) {
            logger.error(LOG_PREFIX + "Offline objects rollback has failed.");
            syncEngineInstance.rollbackTaskCompleted(KSInternalConstants.SYNCLEVEL_OBJECTSERVICE, self.syncObjectService);
            if (!error.hasOwnProperty(KSInternalConstants.ERROR_DOMAIN)) {
                error = new KSError(KSErrorConstants.SYNC_GENERIC_ROLLBACK_ERROR, error.stack);
            }
            voltmx.sdk.verifyAndCallClosure(failureCallback, error);
        }
    };

    SDKObjectServiceSync.prototype.clearData = function (options, successCallback, failureCallback) {
        logger.trace(LOG_PREFIX + "Offline objects clearData is being called");
        this.syncObjectService.clearData(options).then(onSuccess, onFailure);
        var objectServiceName = this.syncObjectService.getFullyQualifiedName();
        function onSuccess() {
            logger.info(LOG_PREFIX + "Offline objects clear data operation was success.");
            var response = {};
            response[KSInternalConstants.OBJECT_SERVICE_NAME] = objectServiceName;
            response[KSPublicConstants.STATUS] = 0;
            voltmx.sdk.verifyAndCallClosure(successCallback, response);
        }

        function onFailure(error) {
            logger.error(LOG_PREFIX + "Offline objects clear data operation got failed -" + JSON.stringify(error));
            if (!error.hasOwnProperty(KSInternalConstants.ERROR_DOMAIN)) {
                error = new KSError(KSErrorConstants.SYNC_OBJECTSERVICE_CLEAR_DATA_ERROR, objectServiceName);
            }
            voltmx.sdk.verifyAndCallClosure(failureCallback, error);
        }
    };

    exports.SDKObjectServiceSync = SDKObjectServiceSync;
});
define("SDKObjectSync", ["exports", "KSSDKObject", "KSSDKObjectRecord", "KSCommonUtils", "KSError", "SyncEngine"], function (exports, _KSSDKObject, KSSDKObjectRecord, KSCommonUtils, _KSError, SyncEngine) {

    "use strict";
    exports._esModule = true;

    var logger = voltmx.sdk.logsdk;
    var LOG_PREFIX = "SDKObjectSync : ";
    var KSError = _KSError.KSError;
    var KSCRUDConstants = voltmx.sdk.OfflineObjects.KSCRUDConstants;
    var KSErrorConstants = voltmx.sdk.OfflineObjects.KSErrorConstants;
    var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;
    var KSPublicConstants = voltmx.sdk.OfflineObjects.KSPublicConstants;
    var SDKObjectRecord = KSSDKObjectRecord.KSSDKObjectRecord;
    var syncEngineInstance = SyncEngine.getInstance();

    var SDKObjectSync = function (sdkObjectName) {
        //validating the sdkObjectName i.e passed is not null or empty
        if (KSCommonUtils.isNullOrEmptyObject(sdkObjectName)) {
            var errorMessage = "Cannot create Offline Object with name as null or empty string";
            logger.error(LOG_PREFIX + errorMessage);
            throw new KSError(KSErrorConstants.METADATA_SDKOBJECT_SYNC_NAME_NULL_OR_EMPTY, errorMessage);
        }
        this.syncObject = new _KSSDKObject.KSSDKObject(sdkObjectName);
        logger.trace(LOG_PREFIX, "Initialized an instance of SDKObjectSync.");
    };

    SDKObjectSync.prototype.startSync = function (syncConfig, successCallback, failureCallback) {
        logger.trace(LOG_PREFIX, "Invoked startSync in SDKObjectSync.");

        var objName = this.syncObject.getFullyQualifiedName();
        this.syncObject.startSync(syncConfig).then(onSuccess, onFailure);

        function onSuccess(result) {
            var message = "The object sync is successful.";
            result[KSPublicConstants.STATUS] = KSErrorConstants.STATUS_SUCCESS;
            logger.info(LOG_PREFIX, message);
            if (successCallback) {
                successCallback(result);
            } else {
                logger.info(LOG_PREFIX, "Callbacks are not provided. " + message);
            }
        }

        function onFailure(error) {
            logger.error(LOG_PREFIX, "Failed to sync object with error " + error.message);

            if (!error.hasOwnProperty(KSInternalConstants.ERROR_DOMAIN)) {
                error = new KSError(KSErrorConstants.SYNC_GENERIC_ERROR, error.stack);
            }
            error[KSPublicConstants.STATUS] = KSErrorConstants.STATUS_FAILURE;
            error.userInfo = KSCommonUtils.getUserInfo(objName, error, true);

            if (failureCallback) {
                failureCallback(error);
            } else {
                logger.info(LOG_PREFIX, "Callbacks are not provided. Failed to sync object with error " + error.message);
            }
        }
    };

    SDKObjectSync.prototype.create = function (record, options, successCallback, failureCallback) {
        logger.trace(LOG_PREFIX, "Invoked create record operation.");
        var sdkRecord = new SDKObjectRecord(record, this.syncObject);

        var objName = this.syncObject.getFullyQualifiedName();
        this.syncObject.createRecordsInDatabase(sdkRecord, options).then(onSuccess, onFailure);

        function onSuccess(result) {
            logger.info(LOG_PREFIX, "The record is created successfully with result: " + JSON.stringify(result));
            if (successCallback) {
                successCallback(result);
            } else {
                logger.info(LOG_PREFIX, "Success callback for create API is not provided.");
            }
        }

        function onFailure(error) {
            logger.error(LOG_PREFIX, "Failed to create record with error " + error.message);

            if (!error.hasOwnProperty(KSInternalConstants.ERROR_DOMAIN)) {
                error = new KSError(KSErrorConstants.CRUD_GENERIC_ERROR, error.stack);
            }

            error.userInfo = KSCommonUtils.getUserInfo(objName, error, true);

            if (failureCallback) {
                failureCallback(error);
            } else {
                logger.info(LOG_PREFIX, "Failure callback for create API is not provided.");
            }
        }
    };

    SDKObjectSync.prototype.update = function (record, options, successCallback, failureCallback) {
        logger.trace(LOG_PREFIX, "Invoked update record operation.");

        var sdkRecord = new SDKObjectRecord(record, this.syncObject);
        var objName = this.syncObject.getFullyQualifiedName();
        var optionsForUpdate = {};
        if (!voltmx.sdk.isNullOrUndefined(options)) {
            optionsForUpdate = voltmx.sdk.cloneObject(options);
        }

        optionsForUpdate[KSCRUDConstants.CRUD_OPTION_IS_UPDATE_BY_PK] = false;

        this.syncObject.updateRecordsInDatabase(sdkRecord, optionsForUpdate).then(onSuccess, onFailure);

        function onSuccess(result) {
            logger.debug(LOG_PREFIX, "The record was updated successfully with result: " + JSON.stringify(result));
            if (successCallback) {
                successCallback(result);
            } else {
                logger.info(LOG_PREFIX, "Success callback for update API is not provided.");
            }
        }

        function onFailure(error) {
            logger.error(LOG_PREFIX, "Failed to update record with error " + error.message);

            if (!error.hasOwnProperty(KSInternalConstants.ERROR_DOMAIN)) {
                error = new KSError(KSErrorConstants.CRUD_GENERIC_ERROR, error.stack);
            }

            error.userInfo = KSCommonUtils.getUserInfo(objName, error, true);

            if (failureCallback) {
                failureCallback(error);
            } else {
                logger.info(LOG_PREFIX, "Failure callback for update API is not provided.");
            }
        }
    };

    SDKObjectSync.prototype.updateByPK = function (record, options, successCallback, failureCallback) {
        logger.trace(LOG_PREFIX, "Invoked update record operation.");
        var sdkRecord = new SDKObjectRecord(record, this.syncObject);

        var objName = this.syncObject.getFullyQualifiedName();
        var optionsForUpdate = voltmx.sdk.cloneObject(options);
        if (voltmx.sdk.isNullOrUndefined(optionsForUpdate)) {
            optionsForUpdate = {};
        }

        optionsForUpdate[KSCRUDConstants.CRUD_OPTION_IS_UPDATE_BY_PK] = true;

        this.syncObject.updateRecordsInDatabase(sdkRecord, optionsForUpdate).then(onSuccess, onFailure);

        function onSuccess(result) {
            logger.debug(LOG_PREFIX, "The record was updated successfully with result: " + JSON.stringify(result));
            if (successCallback) {
                successCallback(result);
            } else {
                logger.info(LOG_PREFIX, "Success callback for updateByPK API is not provided.");
            }
        }

        function onFailure(error) {
            logger.error(LOG_PREFIX, "Failed to update record with error " + error.message);

            if (!error.hasOwnProperty(KSInternalConstants.ERROR_DOMAIN)) {
                error = new KSError(KSErrorConstants.CRUD_GENERIC_ERROR, error.stack);
            }

            error.userInfo = KSCommonUtils.getUserInfo(objName, error, true);

            if (failureCallback) {
                failureCallback(error);
            } else {
                logger.info(LOG_PREFIX, "Failure callback for updateByPK API is not provided.");
            }
        }
    };

    SDKObjectSync.prototype.delete = function (options, successCallback, failureCallback) {
        logger.trace(LOG_PREFIX, "Invoked delete record operation.");

        var objName = this.syncObject.getFullyQualifiedName();
        var optionsForDelete = voltmx.sdk.cloneObject(options);
        if (voltmx.sdk.isNullOrUndefined(optionsForDelete)) {
            optionsForDelete = {};
        }

        optionsForDelete[KSCRUDConstants.CRUD_OPTION_IS_DELETE_BY_PK] = false;

        this.syncObject.deleteRecordsInDatabase(optionsForDelete).then(onSuccess, onFailure);

        function onSuccess(result) {
            logger.info(LOG_PREFIX, "The record is deleted successfully with result: " + JSON.stringify(result));
            if (successCallback) {
                successCallback(result);
            } else {
                logger.info(LOG_PREFIX, "Success callback for delete API is not provided.");
            }
        }

        function onFailure(error) {
            logger.error(LOG_PREFIX, "Failed to delete record with error " + error.message);

            if (!error.hasOwnProperty(KSInternalConstants.ERROR_DOMAIN)) {
                error = new KSError(KSErrorConstants.CRUD_GENERIC_ERROR, error.stack);
            }

            error.userInfo = KSCommonUtils.getUserInfo(objName, error, true);

            if (failureCallback) {
                failureCallback(error);
            } else {
                logger.info(LOG_PREFIX, "Failure callback for delete API is not provided.");
            }
        }
    };

    SDKObjectSync.prototype.deleteByPK = function (options, successCallback, failureCallback) {
        logger.trace(LOG_PREFIX, "Invoked delete record operation.");

        var objName = this.syncObject.getFullyQualifiedName();
        var optionsForDelete = voltmx.sdk.cloneObject(options);
        if (voltmx.sdk.isNullOrUndefined(optionsForDelete)) {
            optionsForDelete = {};
        }

        optionsForDelete[KSCRUDConstants.CRUD_OPTION_IS_DELETE_BY_PK] = true;

        this.syncObject.deleteRecordsInDatabase(optionsForDelete).then(onSuccess, onFailure);

        function onSuccess(result) {
            logger.info(LOG_PREFIX, "The record is deleted successfully with result: " + JSON.stringify(result));
            if (successCallback) {
                successCallback(result);
            } else {
                logger.info(LOG_PREFIX, "Success callback for delete API is not provided.");
            }
        }

        function onFailure(error) {
            logger.error(LOG_PREFIX, "Failed to delete record with error " + error.message);

            if (!error.hasOwnProperty(KSInternalConstants.ERROR_DOMAIN)) {
                error = new KSError(KSErrorConstants.CRUD_GENERIC_ERROR, error.stack);
            }

            error.userInfo = KSCommonUtils.getUserInfo(objName, error, true);

            if (failureCallback) {
                failureCallback(error);
            } else {
                logger.info(LOG_PREFIX, "Failure callback for delete API is not provided.");
            }
        }
    };

    SDKObjectSync.prototype.get = function (options, successCallback, failureCallback) {
        logger.trace(LOG_PREFIX, "Invoked get record operation.");

        var objName = this.syncObject.getFullyQualifiedName();
        this.syncObject.readRecordsFromDatabase(options).then(onSuccess, onFailure);

        function onSuccess(recordsList) {
            logger.info(LOG_PREFIX, "The number of successfully fetched records are " + recordsList.length);
            if (successCallback) {
                successCallback(recordsList);
            } else {
                logger.info(LOG_PREFIX, "Success callback for get API is not provided.");
            }
        }

        function onFailure(error) {
            logger.error(LOG_PREFIX, "Failed to read record with error " + error.message);

            if (!error.hasOwnProperty(KSInternalConstants.ERROR_DOMAIN)) {
                error = new KSError(KSErrorConstants.CRUD_GENERIC_ERROR, error.stack);
            }

            error.userInfo = KSCommonUtils.getUserInfo(objName, error, true);

            if (failureCallback) {
                failureCallback(error);
            } else {
                logger.info(LOG_PREFIX, "Failure callback for get API is not provided.");
            }
        }
    };

    /**
     * Rollback an Object to it's previous Sync State
     *
     * @param primaryKeyValueMap of record only for which rollback should happen
     * @param successCallback will be invoked on the Success of rollback.
     * @param failureCallback will be invoked at the time of any error.
     */
    SDKObjectSync.prototype.rollback = function (primaryKeyValueMap, successCallback, failureCallback) {
        voltmx.sdk.logsdk.trace(LOG_PREFIX + "Offline objects rollback called.");

        this.syncObject.rollback(primaryKeyValueMap).then(onSuccess, onFailure);
        var self = this;
        function onSuccess() {
            voltmx.sdk.logsdk.info(LOG_PREFIX + "Offline objects rollback is successfull.");
            syncEngineInstance.rollbackTaskCompleted(KSInternalConstants.SYNCLEVEL_OBJECT, self.syncObject);
            voltmx.sdk.verifyAndCallClosure(successCallback, true);
        }

        function onFailure(error) {
            voltmx.sdk.logsdk.error(LOG_PREFIX + "Offline objects rollback has failed.");
            syncEngineInstance.rollbackTaskCompleted(KSInternalConstants.SYNCLEVEL_OBJECT, self.syncObject);
            if (!error.hasOwnProperty(KSInternalConstants.ERROR_DOMAIN)) {
                error = new KSError(KSErrorConstants.SYNC_GENERIC_ROLLBACK_ERROR, error.stack);
            }
            voltmx.sdk.verifyAndCallClosure(failureCallback, error);
        }
    };

    /**
     * Fetches the list of records yet to be uploaded in the object
     *
     * @param options - user defined options reserved for future use
     * @param successCallback will be invoked on the success of getPendingRecordsForUpload
     * @param failureCallback will be invoked on the failure of getPendingRecordsForUpload
     */
    SDKObjectSync.prototype.getPendingRecordsForUpload = function (options, successCallback, failureCallback) {
        voltmx.sdk.logsdk.trace(LOG_PREFIX, " getPendingRecordsForUpload : ", "Enter.");

        this.syncObject.getPendingRecordsForUpload(options).then(onResolve, onReject);

        function onResolve(recordsList) {
            voltmx.sdk.logsdk.info(LOG_PREFIX, "Offline objects getPendingRecordsForUpload is successful.");
            voltmx.sdk.logsdk.info(LOG_PREFIX, "The number of pending records are " + recordsList.length);
            var records = {};
            records[KSPublicConstants.SYNC_PENDING_RECORDS] = recordsList;
            voltmx.sdk.verifyAndCallClosure(successCallback, records);
        }

        function onReject(error) {
            voltmx.sdk.logsdk.error(LOG_PREFIX, "Failed to get pending records with error " + error.message);
            voltmx.sdk.verifyAndCallClosure(failureCallback, error);
        }
    };

    /**
     * Mark for upload method provides ability to mark a record for upload from local Database
     *
     * @param options  Primary key of record, markForUpload
     * @param successCallback  will be invoked on the Success of markForUpload.
     * @param failureCallback will be invoked at the time of any error.
     */
    SDKObjectSync.prototype.markForUpload = function(options, successCallback, failureCallback) {
        voltmx.sdk.logsdk.trace(LOG_PREFIX + "Offline objects markForUpload called.");

        this.syncObject.markForUploadInDatabase(options).then(onSuccess, onFailure);

        function onSuccess(result) {
            logger.info(LOG_PREFIX, "Record marked for upload successfully :" + result);
            voltmx.sdk.verifyAndCallClosure(successCallback, true);
        }

        function onFailure(error) {
            logger.error(LOG_PREFIX, "Record markForUpload failed with error " + error.message);
            voltmx.sdk.verifyAndCallClosure(failureCallback, error);
        }
    };


    /**
     * Get primary keys deferred from upload
     *
     * @param successCallback will be invoked on the Success of getUploadDeferredRecordKeys.
     * @param failureCallback will be invoked at the time of any error.
     */
    SDKObjectSync.prototype.getUploadDeferredRecordKeys = function(successCallback, failureCallback) {
        voltmx.sdk.logsdk.trace(LOG_PREFIX + "Offline objects getUploadDeferredRecordKeys called.");

        this.syncObject.getDeferredRecordsFromDatabase().then(onSuccess, onFailure);

        function onSuccess(primaryKeysList) {
            logger.info(LOG_PREFIX, "The number of successfully fetched upload deferred primary keys are " + primaryKeysList.length);
            voltmx.sdk.verifyAndCallClosure(successCallback, primaryKeysList);
        }

        function onFailure(error) {
            logger.error(LOG_PREFIX, "Failed to fetch primary keys with error " + error.message);
            voltmx.sdk.verifyAndCallClosure(failureCallback, error);
        }
    };

    /**
     * clearData on Object.
     * @param options
     * @param successCallback will be invoked on the Success of clearOfflineData.
     * @param failureCallback will be invoked at the time of any error.
     */
    SDKObjectSync.prototype.clearData = function (options, successCallback, failureCallback) {
        logger.trace(LOG_PREFIX + "Offline objects clearData is being called");

        this.syncObject.clearData(options).then(onSuccess, onFailure);

        var objectName = this.syncObject.getFullyQualifiedName();
        function onSuccess() {
            logger.info(LOG_PREFIX + "Offline objects clear data operation was success.");
            voltmx.sdk.verifyAndCallClosure(successCallback, true);
        }

        function onFailure(error) {
            logger.error(LOG_PREFIX + "Failed to clear offline data for object " + objectName);
            if (!error.hasOwnProperty(KSInternalConstants.ERROR_DOMAIN)) {
                error = new KSError(KSErrorConstants.SYNC_OBJECT_CLEAR_DATA, objectName);
            }
            voltmx.sdk.verifyAndCallClosure(failureCallback, error);
        }
    };

    exports.SDKObjectSync = SDKObjectSync;
});
/**
 * Module to perform the download operation in Offline Objects.
 */
define("KSBatchDownloadTask", ["exports", "KSError", "KSCommonUtils"], function (exports, _KSError, KSCommonUtils) {
    "use strict";
    exports._esModule = true;

    var logger = voltmx.sdk.logsdk;
    var KSError = _KSError.KSError;
    var LOG_PREFIX = "KSBatchDownloadTask : ";
    var KSErrorConstants = voltmx.sdk.OfflineObjects.KSErrorConstants;
    var KSPublicConstants = voltmx.sdk.OfflineObjects.KSPublicConstants;
    var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;

    /**
     *  Creates a KSBatchDownloadTask
     * @param downloadTaskInstance KSSyncDownloadTask Object passed
     * @param isStatsEnabled boolean value to determine if stats are enabled
     * @param syncObject contains syncObject
     * @constructor
     */
    function KSBatchDownloadTask(downloadTaskInstance, isStatsEnabled, syncObject) {
        logger.trace(LOG_PREFIX + "Creating KSBatchDownloadTask.");
        this.downloadTaskInstance = downloadTaskInstance;
        this.syncObject = syncObject;
        this.response = {};
        this.response[KSPublicConstants.SYNC_ERRORS] = {};
        this.isStatsEnabled = isStatsEnabled;
        if (this.isStatsEnabled === true) {
            logger.debug(LOG_PREFIX + "stats are enabled");
            this.totalDownloadedRecords = 0;
            this.response[KSPublicConstants.SYNC_STATS] = {};
            this.response[KSPublicConstants.SYNC_STATS][KSPublicConstants.DOWNLOAD_STATS] = [];
            this.response[KSPublicConstants.SYNC_STATS][KSInternalConstants.TOTAL_DOWNLOADED_RECORDS] = 0;
        }
    }

    /**
     *  Executes the KSBatchDownloadTask
     * @returns {Promise<Array> an array containing stats}
     */
    KSBatchDownloadTask.prototype.execute = async function () {
        logger.debug(LOG_PREFIX + "Starting batch download task for batch number " + this.downloadTaskInstance.downloadBatchNumber);
        var downloadResponseReceived;
        do {
            downloadResponseReceived = {};
            downloadResponseReceived = await this.downloadTaskInstance.execute();
            KSCommonUtils.mergeTwoJSONMaps(this.downloadTaskInstance.inputContext, this.downloadTaskInstance.outputContext);
            var downloadSyncErrors = downloadResponseReceived[KSInternalConstants.DOWNLOAD_SYNC_ERRORS];
            if (!KSCommonUtils.isNullOrEmptyObject(downloadSyncErrors)) {
                this.response[KSPublicConstants.SYNC_ERRORS][KSPublicConstants.DOWNLOAD_TAG] = downloadSyncErrors;
            }
            delete downloadResponseReceived[KSInternalConstants.DOWNLOAD_SYNC_ERRORS];
            if (this.isStatsEnabled) {
                logger.debug(LOG_PREFIX + "stats are enabled");
                var downloadBatchStats = {};
                downloadBatchStats.totalDownloadedRecords = 0;
                var downloadResponseMetaData = downloadResponseReceived[KSInternalConstants.DOWNLOAD_RESPONSE_METADATA];

                if (!KSCommonUtils.isNullOrEmptyObject(downloadResponseMetaData)) {
                    if (this.syncObject.getSyncLevel() === KSInternalConstants.SYNCLEVEL_OBJECT) {
                        this.totalDownloadedRecords += downloadResponseMetaData[KSInternalConstants.RECORD_COUNT];
                        downloadBatchStats.totalDownloadedRecords = downloadResponseMetaData[KSInternalConstants.RECORD_COUNT];
                        downloadBatchStats.batchNumber = this.downloadTaskInstance.downloadBatchNumber;
                    } else {
                        for (var key in downloadResponseMetaData) {
                            if (downloadResponseMetaData[key].hasOwnProperty(KSInternalConstants.METADATA)) {
                                this.totalDownloadedRecords += downloadResponseMetaData[key][KSInternalConstants.METADATA][KSInternalConstants.RECORD_COUNT];
                                downloadBatchStats.totalDownloadedRecords += downloadResponseMetaData[key][KSInternalConstants.METADATA][KSInternalConstants.RECORD_COUNT];
                                downloadBatchStats.batchNumber = this.downloadTaskInstance.downloadBatchNumber;
                            }
                        }
                    }
                } else {
                    var errorMessage = "downloadResponseMetaData found to be null from server response";
                    logger.warn(LOG_PREFIX + errorMessage);
                }
                this.response[KSPublicConstants.SYNC_STATS][KSInternalConstants.TOTAL_DOWNLOADED_RECORDS] = this.totalDownloadedRecords;
                this.response[KSPublicConstants.SYNC_STATS][KSPublicConstants.DOWNLOAD_STATS].push(downloadBatchStats);
            }
            this.downloadTaskInstance.downloadBatchNumber++;
        } while (downloadResponseReceived[KSInternalConstants.HAS_MORE_RECORDS] === KSInternalConstants.TRUE_STRING);
        return this.response;
    };

    exports.KSBatchDownloadTask = KSBatchDownloadTask;
});
/**
 * Module to perform the upload operation in Offline Objects.
 */
define("KSBatchUploadTask", ["exports", "KSError", "KSCommonUtils", "KSMetadataUtils"],
    function (exports, _KSError, KSCommonUtils, KSMetadataUtils) {
    "use strict";
    exports._esModule = true;

    var logger = voltmx.sdk.logsdk;
    var KSError = _KSError.KSError;
    var LOG_PREFIX = "KSBatchUploadTask : ";
    var KSPublicConstants = voltmx.sdk.OfflineObjects.KSPublicConstants;
    var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;
    var KSErrorConstants = voltmx.sdk.OfflineObjects.KSErrorConstants;

    /**
     *  Creates a KSBatchUploadTask
     * @param uploadTaskInstance
     * @param isStatsEnabled boolean value to determine if stats are enabled
     * @param syncObject contains syncObject
     * @constructor
     */
    function KSBatchUploadTask(uploadTaskInstance, isStatsEnabled, syncObject) {
        logger.trace(LOG_PREFIX + "Creating KSBatchUploadTask.");

        this.syncObject = syncObject;
        this.isStatsEnabled = isStatsEnabled;
        this.uploadTaskInstance = uploadTaskInstance;

        this.response = {};
        this.response[KSPublicConstants.SYNC_ERRORS] = {};
        this.response[KSPublicConstants.SYNC_ERRORS][KSPublicConstants.UPLOAD_TAG] = [];

        this.syncError = {};
        this.isCompleteFailure = null;

        if (this.isStatsEnabled === true) {
            logger.debug(LOG_PREFIX + "stats are enabled");
            this.totalUploadedRecords = 0;
            this.response[KSPublicConstants.SYNC_STATS] = {};
            this.response[KSPublicConstants.SYNC_STATS][KSPublicConstants.UPLOAD_STATS] = [];
            this.response[KSPublicConstants.SYNC_STATS][KSInternalConstants.TOTAL_UPLOADED_RECORDS] = 0;
        }
    }

    /**
     *  Executes the KSBatchUploadTask
     * @returns {Promise<Array> an array containing stats}
     */
    KSBatchUploadTask.prototype.execute = async function () {
        var uploadBatchParams =  this.uploadTaskInstance.outputContext[KSPublicConstants.UPLOAD_BATCH_PARAMS];

        //Adding hierarchyContext to batchParams if there exists hierarchy in the given objectService
        var doesHierarchyExistInSyncableObject = KSMetadataUtils.doesHierarchyExistInSyncableObject(this.syncObject);
        if (doesHierarchyExistInSyncableObject) {
            var uploadBatchSize = this.uploadTaskInstance.inputContext[KSPublicConstants.UPLOAD_BATCH_SIZE];
            uploadBatchParams.setNumberOfFreeSlotsInCurrentBatch(uploadBatchSize);
        }

        logger.debug(LOG_PREFIX + "Starting batched upload task for batch number " + uploadBatchParams.getUploadBatchNumber());
        var uploadResponseReceived;
        this.isCompleteFailure = true;
        do {

            var numberOfRecords = 0;
            uploadResponseReceived = {};
            var uploadSyncErrors = null;
            try {
                uploadResponseReceived = await this.uploadTaskInstance.execute();
                this.isCompleteFailure = false;
            }catch(networkException){
                if(networkException.code === KSErrorConstants.NW_INVALID_OPSTATUS_FROM_SERVER.code) {
                    uploadResponseReceived = networkException.userInfo;
                    this.syncError[KSInternalConstants.NETWORK_EXCEPTION] = networkException;
                } else{
                    throw networkException
                }

            }
            var uploadSyncErrors = uploadResponseReceived[KSInternalConstants.UPLOAD_SYNC_ERRORS];
            if (!KSCommonUtils.isNullOrEmptyObject(uploadSyncErrors)) {
                this.response[KSPublicConstants.SYNC_ERRORS][KSPublicConstants.UPLOAD_TAG].push(uploadSyncErrors);
            }

            delete uploadResponseReceived[KSInternalConstants.UPLOAD_SYNC_ERRORS];
            if (this.isStatsEnabled) {
                logger.debug(LOG_PREFIX + "stats are enabled");
                var uploadBatchStats = {};
                uploadBatchStats.totalUploadedRecords = 0;
                var uploadResponseMetaData = uploadResponseReceived[KSInternalConstants.UPLOAD_RESPONSE_METADATA];
                if (!KSCommonUtils.isNullOrEmptyObject(uploadResponseMetaData)) {
                    this.totalUploadedRecords += uploadResponseMetaData[KSInternalConstants.SUCCESS_COUNT];
                    uploadBatchStats.totalUploadedRecords += uploadResponseMetaData[KSInternalConstants.SUCCESS_COUNT];
                    numberOfRecords += uploadResponseMetaData[KSInternalConstants.RECORD_COUNT];
                    uploadBatchStats.batchNumber = uploadBatchParams.getUploadBatchNumber();
                    uploadBatchStats.numberOfRecords = numberOfRecords;

                } else {
                    this.response[KSPublicConstants.SYNC_STATS][KSInternalConstants.TOTAL_UPLOADED_RECORDS] = this.totalUploadedRecords;
                    this.response[KSPublicConstants.SYNC_STATS][KSPublicConstants.UPLOAD_STATS].push(uploadBatchStats);
                }

                this.response[KSPublicConstants.SYNC_STATS][KSInternalConstants.TOTAL_UPLOADED_RECORDS] = this.totalUploadedRecords;
                this.response[KSPublicConstants.SYNC_STATS][KSPublicConstants.UPLOAD_STATS].push(uploadBatchStats);

            }

            var batchnumber = uploadBatchParams.getUploadBatchNumber() + 1;
            uploadBatchParams.setUploadBatchNumber(batchnumber);
            this.uploadTaskInstance.outputContext[KSInternalConstants.UPLOAD_BATCH_PARAMS] = uploadBatchParams;
        } while (this.uploadTaskInstance.outputContext[KSInternalConstants.HAS_MORE_RECORDS] === true);

        var completeResponse =  {
            response: this.response,
            syncError: this.syncError,
            isCompleteFailure: this.isCompleteFailure
        };
        return completeResponse;
    };

    exports.KSBatchUploadTask = KSBatchUploadTask;
});
/**
 * Module to perform the download operation in Offline Objects.
 */
define("KSSyncDownloadTask", ["exports", "KSNetworkUtils", "KSCommonUtils"], function (exports, KSNetworkUtils, KSCommonUtils) {
    "use strict";
    exports._esModule = true;

    var logger = voltmx.sdk.logsdk;
    var LOG_PREFIX = "KSSyncDownloadTask : ";
    var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;
    var KSPublicConstants = voltmx.sdk.OfflineObjects.KSPublicConstants;


    /**
     *  Creates a KSSyncDownloadTask
     * @param syncableObject syncable Object passed
     * @param options options config
     * @constructor
     */
    function KSSyncDownloadTask(syncableObject, options) {
        logger.trace(LOG_PREFIX + "Creating KSSyncDownloadTask.");
        this.inputContext = options;
        this.outputContext = {};
        this.syncableObject = syncableObject;
        this.downloadBatchNumber = KSInternalConstants.DEFAULT_BATCH_NUMBER;
    }

    /**
     *  Executes the KSSyncDownloadTask
     * @returns {Promise<void>}
     */
    KSSyncDownloadTask.prototype.execute = async function () {
        logger.trace(LOG_PREFIX + "Starting download task.");
        var request = await this.syncableObject.createDownloadRequest(this.inputContext);

        //Make a network request..
        var networkResponse = await KSNetworkUtils.post(request[KSInternalConstants.URL],
            request[KSInternalConstants.QUERY_PARAMS],
            request[KSInternalConstants.HEADERS],
            request[KSInternalConstants.BODY], {});

        //Contains DATA_OBJECTS, METADATA_OBJECT, DOWNLOAD_BATCH_ERRORS
        var downloadResponseMetadata = await this.syncableObject.parseDownloadResponse(networkResponse);
        var responseToBeSent = {};
        responseToBeSent[KSInternalConstants.DOWNLOAD_RESPONSE_METADATA] = downloadResponseMetadata[KSInternalConstants.METADATA_OBJECT][KSInternalConstants.METADATA];
        responseToBeSent[KSInternalConstants.DOWNLOAD_SYNC_ERRORS] = downloadResponseMetadata[KSInternalConstants.DOWNLOAD_SYNC_ERRORS];
        var deltaContextInformation;
        if (networkResponse[KSInternalConstants.HAS_MORE_RECORDS] !== KSInternalConstants.TRUE_STRING) {
            deltaContextInformation = downloadResponseMetadata[KSInternalConstants.METADATA_OBJECT][KSInternalConstants.DELTA_CONTEXT];
        } else {
            this.outputContext[KSInternalConstants.BATCH_CONTEXT] = downloadResponseMetadata[KSInternalConstants.METADATA_OBJECT][KSInternalConstants.DELTA_CONTEXT];
        }
        await this.syncableObject.persistDownloadChanges(deltaContextInformation);
        responseToBeSent[KSInternalConstants.HAS_MORE_RECORDS] = networkResponse[KSInternalConstants.HAS_MORE_RECORDS];
        logger.info(LOG_PREFIX + "Successfully completed the batch " + this.downloadBatchNumber + "download task with the following status : " + JSON.stringify(responseToBeSent));
        return responseToBeSent;
    };

    exports.KSSyncDownloadTask = KSSyncDownloadTask;
});
/**
 * Module to perform the upload operation in Offline Objects.
 */
define("KSSyncUploadTask",

    ["exports", "KSNetworkUtils", "KSSetupManager", "KSCommonUtils", "KSUploadCacheManager", "KSUploadCacheObject",
        "KSUploadBatchParams", "KSBatchingUtils", "KSMetadataUtils"],

    function (exports, KSNetworkUtils, KSSetupManager,  KSCommonUtils, KSUploadCacheManager, _KSUploadCacheObject,
              KSUploadBatchParams, KSBatchingUtils, KSMetadataUtils) {

        "use strict";
        exports._esModule = true;

        var logger = voltmx.sdk.logsdk;
        var isUploadCacheEnabled = false;
        var LOG_PREFIX = "KSSyncUploadTask : ";

        var KSUploadCacheObject = _KSUploadCacheObject.KSUploadCacheObject;
        var KSErrorConstants = voltmx.sdk.OfflineObjects.KSErrorConstants;
        var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;
        var KSPublicConstants = voltmx.sdk.OfflineObjects.KSPublicConstants;

        /**
         * Creates a KSSyncUploadTask
         * @param syncableObject syncable Object passed
         * @param options options config
         * @constructor
         */
        function KSSyncUploadTask(syncableObject, options) {
            logger.trace(LOG_PREFIX + "Creating KSSyncUploadTask");
            this.inputContext = options;
            this.syncableObject = syncableObject;
            this.outputContext = {};
            this.removeAfterUpload = [];
            if(options.hasOwnProperty(KSPublicConstants.REMOVE_AFTER_UPLOAD)) {
                this.removeAfterUpload = options["removeAfterUpload"];
            }
        }

        async function init(syncableObject, options) {
            var _this = new KSSyncUploadTask(syncableObject, options);
            _this.uploadBatchParams = await KSUploadBatchParams.getInstance(syncableObject.getObjectServiceName());

            _this.outputContext[KSPublicConstants.UPLOAD_BATCH_PARAMS] = _this.uploadBatchParams;
            return _this;
        }

        /**
         *  Executes the KSSyncUploadTask
         * @returns {Promise<void>}
         */
        KSSyncUploadTask.prototype.execute = async function () {
            logger.trace(LOG_PREFIX + "Starting upload task.");
            this.uploadBatchParams = this.outputContext[KSPublicConstants.UPLOAD_BATCH_PARAMS];

            var doesHierarchyExistInSyncableObject = KSMetadataUtils.doesHierarchyExistInSyncableObject(this.syncableObject);
            if (doesHierarchyExistInSyncableObject) {
                this.uploadBatchParams.setNumberOfFreeSlotsInCurrentBatch(this.inputContext[KSPublicConstants.UPLOAD_BATCH_SIZE]);
            }
            var request = await this.syncableObject.createUploadRequest(this.inputContext, this.uploadBatchParams);
            var responseToBeSent = {};

            //Make a network request..
            if (request[KSInternalConstants.ARE_THERE_CHANGES_TO_UPLOAD]) {

                var uploadParams = request[KSInternalConstants.REQUEST_BODY];
                var listOfRecords = uploadParams[KSInternalConstants.RECORDS];

                if(doesHierarchyExistInSyncableObject){
                    if (listOfRecords.length === 0 && this.uploadBatchParams.getHierarchyContext().getPassCount() === 0) {
                        this.outputContext[KSInternalConstants.HAS_MORE_RECORDS] = false;
                        request[KSInternalConstants.ARE_THERE_CHANGES_TO_UPLOAD]= false;
                    } else {
                        if (listOfRecords.length < this.uploadBatchParams.getUploadBatchSize()
                            && this.uploadBatchParams.getHierarchyContext().getPassCount() === 0)
                        {
                            this.outputContext[KSInternalConstants.HAS_MORE_RECORDS] = false;
                        } else {
                            this.outputContext[KSInternalConstants.HAS_MORE_RECORDS] = true;
                        }
                    }
                } else {

                        var chunkedListOfRecords = KSBatchingUtils.chunkUploadPayloadToBatchSize(listOfRecords,
                            this.inputContext[KSPublicConstants.UPLOAD_BATCH_SIZE]);
                        uploadParams[KSInternalConstants.RECORDS] = chunkedListOfRecords;

                        var lastRecordInChunkedPayload = chunkedListOfRecords[(chunkedListOfRecords.length - 1)];
                        var metadataForLastRecordInChunkedPayload = lastRecordInChunkedPayload[KSInternalConstants._METADATA];

                        this.uploadBatchParams
                            .setLastRSNOfPreviousBatch(parseInt(metadataForLastRecordInChunkedPayload[KSInternalConstants.ROW_ID]));

                        if ((chunkedListOfRecords.length === parseInt(this.inputContext[KSPublicConstants.UPLOAD_BATCH_SIZE])) &&
                            (this.uploadBatchParams.getLastRSNOfPreviousBatch() !== this.uploadBatchParams.getLastRSNOfUploadPayload())) {

                            this.outputContext[KSInternalConstants.HAS_MORE_RECORDS] = true;
                        } else {
                            this.outputContext[KSInternalConstants.HAS_MORE_RECORDS] = false;
                        }
                }
                this.outputContext[KSPublicConstants.UPLOAD_BATCH_PARAMS] = this.uploadBatchParams;
                request[KSInternalConstants.REQUEST_BODY] = uploadParams;

                if(request[KSInternalConstants.ARE_THERE_CHANGES_TO_UPLOAD]){
                    responseToBeSent = await uploadDataForObject.call(this, this.syncableObject,
                        request[KSInternalConstants.REQUEST_HEADERS],
                        request[KSInternalConstants.REQUEST_BODY],
                        request[KSInternalConstants.QUERY_PARAMS],
                        request[KSInternalConstants.URL]);
                } else {
                    if (this.uploadBatchParams.getUploadBatchNumber() === KSInternalConstants.DEFAULT_BATCH_NUMBER) {
                        responseToBeSent[KSInternalConstants.UPLOAD_RESPONSE_METADATA] = getNoChangeResponseTemplate();
                    } else {
                        throw KSErrorConstants.INTERAL_GENERIC_ERROR;
                    }
                }
            }
            else {
                responseToBeSent[KSInternalConstants.UPLOAD_RESPONSE_METADATA] = getNoChangeResponseTemplate();
                this.outputContext[KSInternalConstants.HAS_MORE_RECORDS] = false;
            }
            return responseToBeSent;
        };

        function getNoChangeResponseTemplate(){
            var response = {};
            response[KSInternalConstants.RECORD_COUNT] = 0;
            response[KSInternalConstants.SUCCESS_COUNT] = 0;
            return response;
        }
        async function uploadDataForObject(syncObject, headers, body, queryParams, url) {
            var uploadResponse = null;
            var syncableObjectName = syncObject.getFullyQualifiedName();

            //Persist upload request in UploadCache
            await checkAndPersistUploadRequest(syncObject, headers, queryParams, body);

            //post network request
            try {
                uploadResponse = await KSNetworkUtils.post(url, queryParams, headers, body, {});

            } catch (networkException) {
                logger.error(LOG_PREFIX, "Upload failed for object/objectService: " + syncableObjectName
                    + " due to exception: " + networkException.message);

                if(networkException.code === KSInternalConstants.INVALID_OPSTATUS_FROM_SERVER){

                   uploadResponse = await syncObject.parseUploadResponse(networkException.userInfo);
                   var uploadMetadata = networkException.userInfo[KSInternalConstants._METADATA];
                   uploadResponse[KSInternalConstants.UPLOAD_RESPONSE_METADATA] = uploadMetadata;
                   networkException.userInfo = uploadResponse;
                }

                // Remove the current request from upload cache if the current upload fails
                // with a complete (sync) failure error code.
                if (isUploadCacheEnabled) {

                    // clear the cache if there is a network exception other than timeouts
                    if (!(networkException.code === KSErrorConstants.NW_CONNECTION_TIMEOUT_ERROR.code
                        || networkException.code === KSErrorConstants.NW_SOCKET_TIMEOUT.code)) {
                        await KSUploadCacheManager.getInstance().removeRecord(syncableObjectName);
                    }
                }
                throw networkException;
            }

            var uploadMetadata = uploadResponse[KSInternalConstants._METADATA];
            var uploadResponse = await syncObject.parseUploadResponse(uploadResponse);

            await syncObject.setRemoveAfterUploadParam(this.removeAfterUpload);

            await syncObject.persistUploadChanges(uploadResponse[KSInternalConstants.DATA_OBJECTS]);

            //Remove upload request from UploadCache
            await KSUploadCacheManager.getInstance().removeRecord(syncableObjectName);

            delete uploadResponse[KSInternalConstants.DATA_OBJECTS];
            var responseToBeSent = uploadResponse;

            logger.info(LOG_PREFIX + "Successfully completed the batch "
                + this.uploadBatchParams.getUploadBatchNumber() + "upload task with the following status : "
                + JSON.stringify(responseToBeSent));

            responseToBeSent[KSInternalConstants.UPLOAD_RESPONSE_METADATA] = uploadMetadata;

            return responseToBeSent;
        }

        async function checkAndPersistUploadRequest(syncObject, headers, queryParams, body) {
            isUploadCacheEnabled = KSSetupManager.getInstance().isUploadCacheEnabledForObject(syncObject);

            if (isUploadCacheEnabled) {
                var requestId = KSCommonUtils.generateUniqueUUIDString();

                headers[KSInternalConstants.X_KONY_REQUEST_CACHE_ID] = requestId;

                var requestContextJson = {
                    [KSInternalConstants.REQUEST_HEADERS] : headers,
                    [KSInternalConstants.REQUEST_QUERY_PARAMS] : queryParams
                };

                var uploadCacheSyncObjectContext = syncObject;
                var uploadCacheObject = new KSUploadCacheObject(uploadCacheSyncObjectContext, body, requestId, requestContextJson);
                await KSUploadCacheManager.getInstance().persist(uploadCacheObject);
            }
        }

        exports.getInstance = init;
    });
/**
 * Module encapsulating the upload and the download tasks.
 */
define("KSSyncingTask",

    ["exports", "KSSyncDownloadTask", "KSCommonUtils", "KSSyncUploadTask", "KSBatchDownloadTask", "KSSetupManager",
        "KSUploadCacheProcessingTask", "KSBatchUploadTask"],

    function (exports, _KSSyncDownloadTask, KSCommonUtils, KSSyncUploadTask, _KSBatchDownloadTask, KSSetupManager,
              _KSUploadCacheProcessingTask, _KSBatchUploadTask) {

        var logger = voltmx.sdk.logsdk;
        var LOG_PREFIX = "KSSyncingTask : ";
        var KSBatchUploadTask = _KSBatchUploadTask.KSBatchUploadTask;
        var KSSyncDownloadTask = _KSSyncDownloadTask.KSSyncDownloadTask;
        var KSPublicConstants = voltmx.sdk.OfflineObjects.KSPublicConstants;
        var KSBatchDownloadTask = _KSBatchDownloadTask.KSBatchDownloadTask;
        var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;
        var KSUploadCacheProcessingTask = _KSUploadCacheProcessingTask.KSUploadCacheProcessingTask;

        /**
         * Constructor for KSSyncingTask.
         * @param object Synable object.
         * @param options Options for sync.
         * @constructor Returns a KSSyncingTask.
         */
        function KSSyncingTask(object, options) {
            logger.trace(LOG_PREFIX + "Creating Syncing Task for " + object.name);

            this.syncObject = object;
            this.isStatsEnabled = false;
            this.isUploadEnabled = true;
            this.isDownloadEnabled = true;
            this.isUploadCacheEnabled = false;
            this.inputContext = {};
            this.cacheProcessingTask = null;
            this.options = options;
            if (!KSCommonUtils.isNullOrEmptyObject(options)) {
                this.inputContext[KSInternalConstants.SYNC_OPTIONS] = options;
            }

            this.populateTaskStructureFlags(options);
        }
        /**
         * Method to populate task structure flags depending in the options sent by user.
         * @param options Options sent for sync.
         */
        KSSyncingTask.prototype.populateTaskStructureFlags = function (options) {
            if (options.hasOwnProperty(KSPublicConstants.SYNC_TYPE)) {
                var syncType = options[KSPublicConstants.SYNC_TYPE];
                if (syncType === KSPublicConstants.DOWNLOAD_ONLY) {
                    this.isUploadEnabled = false;
                }
                else if (syncType === KSPublicConstants.UPLOAD_ONLY) {
                    this.isDownloadEnabled = false;
                }
            }
            if(options.hasOwnProperty(KSPublicConstants.GET_SYNC_STATS)) {
                this.isStatsEnabled = true;
            }

            this.isUploadCacheEnabled = KSSetupManager.getInstance().isUploadCacheEnabledForObject(this.syncObject);
        };

        /**
         * Method for setting up subtasks within syncing task.
         */
        KSSyncingTask.prototype.setupSubTasks = async function () {
            if (this.isUploadCacheEnabled) {
                this.cacheProcessingTask = new KSUploadCacheProcessingTask(this.syncObject);
            }

            if (this.isUploadEnabled) {
                var uploadTaskInstance = await KSSyncUploadTask.getInstance(this.syncObject, this.options);
                this.syncUploadTaskInstance =  new KSBatchUploadTask(uploadTaskInstance , this.isStatsEnabled , this.syncObject);
            }

            if (this.isDownloadEnabled) {
                var downloadTaskInstance = new KSSyncDownloadTask(this.syncObject, this.inputContext);
                this.syncDownloadTaskInstance = new KSBatchDownloadTask(downloadTaskInstance , this.isStatsEnabled , this.syncObject);
            }
        };

        /**
         * Method to start execution of the syncing task.
         */
        KSSyncingTask.prototype.execute = async function () {
            var responseToBeSent = {};
            this.totalUploadedRecords = 0;

            await this.setupSubTasks();

            if (this.isStatsEnabled) {
                responseToBeSent[KSPublicConstants.SYNC_STATS] = {};
                responseToBeSent[KSPublicConstants.SYNC_STATS][KSInternalConstants.TOTAL_UPLOADED_RECORDS] = 0;
                responseToBeSent[KSPublicConstants.SYNC_STATS][KSInternalConstants.TOTAL_DOWNLOADED_RECORDS] = 0;
            }
            responseToBeSent[KSPublicConstants.SYNC_ERRORS] = {};

            if (this.isUploadCacheEnabled) {
                logger.trace(LOG_PREFIX, "Starting UploadCacheProcessingTask.");
                var uploadResponseReceived = await this.cacheProcessingTask.execute();

                if (!KSCommonUtils.isNullOrEmptyObject(uploadResponseReceived)) {

                    var uploadSyncErrors = uploadResponseReceived[KSInternalConstants.UPLOAD_SYNC_ERRORS];
                    if (!KSCommonUtils.isNullOrEmptyObject(uploadSyncErrors)) {
                        responseToBeSent[KSPublicConstants.SYNC_ERRORS][KSPublicConstants.UPLOAD_TAG] = uploadSyncErrors;
                    }
                    delete uploadResponseReceived[KSInternalConstants.UPLOAD_SYNC_ERRORS];
                }
            }
            if (this.isUploadEnabled) {
                logger.debug(LOG_PREFIX + "Starting Upload task.");
                var uploadResponseReceived = await this.syncUploadTaskInstance.execute();
                if(uploadResponseReceived.isCompleteFailure){
                    var syncErrorObj = uploadResponseReceived.syncError[KSInternalConstants.NETWORK_EXCEPTION];
                    var errorObject = {};
                    errorObject.code = syncErrorObj.code;
                    errorObject.message = syncErrorObj.message ;
                    errorObject.domain = syncErrorObj.domain ;
                    errorObject.syncErrors = uploadResponseReceived.response[KSPublicConstants.SYNC_ERRORS];
                    throw errorObject;
                }
                if(this.isStatsEnabled) {
                    this.totalUploadedRecords =
                        KSCommonUtils.mergeTwoJSONMaps(responseToBeSent[KSPublicConstants.SYNC_STATS], uploadResponseReceived.response[KSPublicConstants.SYNC_STATS]);
                }

                if(!KSCommonUtils.isNullOrEmptyObject(uploadResponseReceived.response[KSPublicConstants.SYNC_ERRORS][KSPublicConstants.UPLOAD_TAG])){
                    KSCommonUtils.mergeTwoJSONMaps(responseToBeSent[KSPublicConstants.SYNC_ERRORS], uploadResponseReceived.response[KSPublicConstants.SYNC_ERRORS]);
                }
            }

            if (this.isDownloadEnabled) {
                logger.debug(LOG_PREFIX + "Starting Download task.");
                var downloadResponse = await this.syncDownloadTaskInstance.execute();
                if(this.isStatsEnabled) {
                    KSCommonUtils.mergeTwoJSONMaps(responseToBeSent[KSPublicConstants.SYNC_STATS], downloadResponse[KSPublicConstants.SYNC_STATS]);
                }
                KSCommonUtils.mergeTwoJSONMaps(responseToBeSent[KSPublicConstants.SYNC_ERRORS], downloadResponse[KSPublicConstants.SYNC_ERRORS]);
            }

            if (this.isStatsEnabled) {
                responseToBeSent[KSPublicConstants.SYNC_STATS][KSInternalConstants.NUMBER_OF_RECORDS_SYNCED] = ( responseToBeSent[KSPublicConstants.SYNC_STATS][KSInternalConstants.TOTAL_UPLOADED_RECORDS] +
                    responseToBeSent[KSPublicConstants.SYNC_STATS][KSInternalConstants.TOTAL_DOWNLOADED_RECORDS]);
                responseToBeSent[KSPublicConstants.SYNC_STATS][KSInternalConstants.SYNC_OBJECT_NAME] = this.syncObject.getFullyQualifiedName();
                if (this.syncObject.getSyncLevel() === KSInternalConstants.SYNCLEVEL_OBJECT) {
                    responseToBeSent[KSInternalConstants.NAME] = this.syncObject.getFullyQualifiedName();
                } else {
                    responseToBeSent[KSInternalConstants.OBJECT_SERVICE_NAME] = this.syncObject.getFullyQualifiedName();
                }
            }

            if (voltmx.sdk.isEmptyObject(responseToBeSent[KSPublicConstants.SYNC_ERRORS])) {
                delete responseToBeSent[KSPublicConstants.SYNC_ERRORS];
            }

            if (voltmx.sdk.isEmptyObject(responseToBeSent[KSPublicConstants.SYNC_STATS])) {
                delete responseToBeSent[KSPublicConstants.SYNC_STATS];
            }

            logger.info(LOG_PREFIX + "Successfully executed Syncing Task on Syncable object named : " + this.syncObject.name);
            /**
             * JSON format received at interface level for sync call.
             *  {
             *    "syncStats" : {
             *                       "uploadStats" : { upload stats},
             *                       "downloadStats" : { download stats}
             *                    },
             *    "syncErrors" : {
             *                      "upload" : [],
             *                      "download" : []
             *                    }
             *   }
             */
            return responseToBeSent;
        };

        exports.KSSyncingTask = KSSyncingTask;
    });
/**
 * KSUploadCacheProcessingTask
 * Created by Harshini Bonam on 18/04/19.
 * Copyright © 2019 Kony. All rights reserved.
 */
define("KSUploadCacheProcessingTask",

    ["exports", "KSUploadCacheSQLQueryGenerator", "KSDatabaseAPI", "KSUploadCacheManager", "KSCommonUtils",
        "KSSDKObjectService", "KSSDKObject"],

    function (exports, KSUploadCacheSQLQueryGenerator, _KSDatabaseAPI, KSUploadCacheManager, KSCommonUtils,
              KSSDKObjectService, _KSSDKObject) {

        "use strict";
        exports._esModule = true;
        var logger = voltmx.sdk.logsdk;
        var LOG_PREFIX = "KSUploadCacheProcessingTask : ";
        var KSDatabaseAPI = _KSDatabaseAPI.KSDatabaseAPI;
        var KSDatabaseConstants = voltmx.sdk.OfflineObjects.KSDatabaseConstants;
        var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;

        /**
         * Constructor for KSUploadCacheProcessingTask.
         * @param sdkobject Syncable sdkobject.
         * @constructor Returns a KSUploadCacheProcessingTask.
         */
        function KSUploadCacheProcessingTask(sdkobject) {
            logger.trace(LOG_PREFIX + "Creating Upload Cache Processing Task for " + sdkobject.name);
            this.syncableObjectsToRetry = [];

            this.inputContext = {};
            this.outputContext = {};
            this.inputContext[KSInternalConstants.SYNC_OBJECT] = sdkobject;
        }

        function unpackInputs() {
            this.syncObject = this.inputContext[KSInternalConstants.SYNC_OBJECT];
        }

        function populateOutputContext(syncErrors) {
            if (!voltmx.sdk.isNullOrUndefined(syncErrors)) {
                var syncErrorsInOutputContext = this.outputContext[KSInternalConstants.CACHE_UPLOAD_ERRORS];
                if (!voltmx.sdk.isNullOrUndefined(syncErrorsInOutputContext)) {
                    this.outputContext[KSInternalConstants.CACHE_UPLOAD_ERRORS] = syncErrorsInOutputContext.concat(syncErrors);
                } else {
                    this.outputContext[KSInternalConstants.CACHE_UPLOAD_ERRORS] = syncErrors;
                }
            }
        }

        async function getSyncObjectForRelatedCacheEntries(syncObject) {
            var syncableObjects =  [];
            var objectNames = syncObject.getObjectNames();

            var preparedStatementToGetRelatedCacheEntries = KSUploadCacheSQLQueryGenerator.getQueryForGettingUploadCacheEntriesInOrder(objectNames);
            var objectNamesWithTypeInCache = await KSDatabaseAPI.executeQuery(preparedStatementToGetRelatedCacheEntries);

            var objectsCount = objectNamesWithTypeInCache.length;
            for (var recordIndex = 0; recordIndex < objectsCount; recordIndex++) {
                var record = objectNamesWithTypeInCache[recordIndex];

                var objectName = record[KSDatabaseConstants.UPLOAD_CACHE_OBJECT_NAME];
                var objectType = record[KSDatabaseConstants.UPLOAD_CACHE_OBJECT_TYPE];

                if (objectType === KSInternalConstants.SYNCLEVEL_OBJECT) {
                    syncableObjects.push(new _KSSDKObject.KSSDKObject(objectName));
                }
            }
            return syncableObjects;
        }

        async function retryCacheInOrder(indexToBeProcessed) {
            if (indexToBeProcessed < this.syncableObjectsToRetry.length) {
                var syncableObject = this.syncableObjectsToRetry[indexToBeProcessed];

                try {
                    var result = await KSUploadCacheManager.getInstance().retryCachedRequests(syncableObject);
                    var syncErrors = result[KSInternalConstants.CACHE_UPLOAD_ERRORS];

                    populateOutputContext.call(this, syncErrors);
                    await retryCacheInOrder.call(this, indexToBeProcessed + 1);

                } catch (retryException) {
                    logger.error(LOG_PREFIX, "Error in upload cache processing task: " + retryException.message);
                    throw retryException;
                }
            } else {
                logger.debug(LOG_PREFIX, "Successfully completed the upload cache processing task");
                KSCommonUtils.mergeTwoJSONMaps(this.outputContext, this.inputContext);
            }
        }

        KSUploadCacheProcessingTask.prototype.execute = async function () {
            unpackInputs.call(this);
            try {
                if (this.syncObject.getSyncLevel() === KSInternalConstants.SYNCLEVEL_OBJECTSERVICE) {
                    this.syncableObjectsToRetry = this.syncableObjectsToRetry
                        .concat(await getSyncObjectForRelatedCacheEntries(this.syncObject));

                } else if (this.syncObject.getSyncLevel() === KSInternalConstants.SYNCLEVEL_OBJECT) {
                    this.syncableObjectsToRetry.push(KSSDKObjectService.getInstanceByName(this.syncObject.getObjectServiceName()))
                }

                this.syncableObjectsToRetry.push(this.syncObject);
                await retryCacheInOrder.call(this, 0);

                return this.outputContext;
            } catch (cacheProcessingException) {
                logger.error(LOG_PREFIX, "Error in upload cache processing task: " + cacheProcessingException.message);
                throw cacheProcessingException;
            }
        };

        exports.KSUploadCacheProcessingTask = KSUploadCacheProcessingTask;
    });

/**
 * KSUploadCacheManager
 * Created by Harshini Bonam on 18/04/19.
 * Copyright © 2019 Kony. All rights reserved.
 */
define("KSUploadCacheManager",

    ["exports", "KSUploadCacheSQLQueryGenerator", "KSUploadCacheObject", "KSDatabaseAPI", "KSNetworkUtils", "KSCommonUtils",
        "KSError"],

    function (exports, KSUploadCacheSQLQueryGenerator, _KSUploadCacheObject, _KSDatabaseAPI, KSNetworkUtils, KSCommonUtils,
              _KSError) {

        "use strict";
        var sdk = voltmx.sdk;
        var logger = sdk.logsdk;
        exports._esModule = true;
        var KSError = _KSError.KSError;
        var LOG_PREFIX = "KSUploadCacheManager : ";
        var KSDatabaseAPI = _KSDatabaseAPI.KSDatabaseAPI;
        var KSErrorConstants = sdk.OfflineObjects.KSErrorConstants;
        var KSInternalConstants = sdk.OfflineObjects.KSInternalConstants;
        var KSDatabaseConstants = sdk.OfflineObjects.KSDatabaseConstants;
        var KSUploadCacheObject = _KSUploadCacheObject.KSUploadCacheObject;

        var instance = null;
        /**
         * Instantiates an instance of KSUploadCacheManager class.
         * @constructor
         */
        function KSUploadCacheManager() {}

        /**
         * Method to enforce singleton instance of KSUploadCacheManager.
         * @returns {singleton instance of KSUploadCacheManager}
         */
        KSUploadCacheManager.getInstance = function () {
            if (instance == null) {
                instance = new KSUploadCacheManager();
            }
            return instance;
        };

        /**
         * The method can be used to create cache entry against a sync object
         *
         * @param uploadCacheObject The sync object against which cache entry should be done
         */
        KSUploadCacheManager.prototype.persist = async function (uploadCacheObject) {
            logger.trace(LOG_PREFIX + "Persisting into upload cache manager.");
            var query = KSUploadCacheSQLQueryGenerator.getPreparedStatementForCreate(uploadCacheObject.getUploadCacheObjectAsKeyValuePairs());

            await KSDatabaseAPI.executeQuery(query);
        };

        /**
         * The method used for getting a cached request
         *
         * @param syncableObjectName The object for which cache entry is to be returned
         * @return the upload cache object
         */
        KSUploadCacheManager.prototype.getRecord = async function (syncableObjectName) {
            var result = await KSDatabaseAPI.executeQuery(KSUploadCacheSQLQueryGenerator.getPreparedStatementForSelect(syncableObjectName));

            if (result.length === 0) {

                logger.debug(LOG_PREFIX, "No cache entry for given object/objectService: " + syncableObjectName + " in upload cache.");
                return null;
            }

            if (result.length > 1) {
                logger.fatal(LOG_PREFIX, "Duplicate entry for object/objectService name: " + syncableObjectName + " in upload cache.");

                throw new KSError(KSErrorConstants.INTERNAL_UPLOAD_CACHE_DUPLICATE_ENTRY_FOR_SAME_OBJECT);
            }

            var record = result[0];

            var uploadCacheSyncObjectContext = {
                [KSInternalConstants.OBJECT_NAME]:record[KSDatabaseConstants.UPLOAD_CACHE_OBJECT_NAME],
                [KSInternalConstants.TYPE]: record[KSDatabaseConstants.UPLOAD_CACHE_OBJECT_TYPE]
            };

            return new KSUploadCacheObject(
                uploadCacheSyncObjectContext,
                record[KSDatabaseConstants.UPLOAD_CACHE_REQUEST_BODY],
                record[KSDatabaseConstants.UPLOAD_CACHE_REQUEST_ID],
                record[KSDatabaseConstants.UPLOAD_CACHE_REQUEST_CONTEXT]);

        };

        /**
         * The method can perform retry on cache objects
         *
         * @param syncableObject The object for which cache retry is to be done
         */
        KSUploadCacheManager.prototype.retryCachedRequests = async function(syncableObject) {

            try {
                var result;
                var objectName = syncableObject.getFullyQualifiedName();
                var cachedObject = await this.getRecord(objectName);

                if (cachedObject === null) {
                    logger.debug(LOG_PREFIX, "No cached requests found for object: " + objectName);
                    return {};
                } else {
                    await this.updateDateAndReAttemptCountForCacheObject(cachedObject);

                    result = await retryUploadWithUploadCacheObject(syncableObject, cachedObject);
                    await this.removeRecord(objectName);

                    return result;
                }
            } catch (retryException) {
                logger.error(LOG_PREFIX, "Error while updating cache entry for: " + objectName + " with error : " + retryException.message);

                var httpStatus;
                if(retryException.hasOwnProperty("userInfo")) {
                    httpStatus = retryException.userInfo[KSInternalConstants.HTTP_STATUS];
                }
                if(! voltmx.sdk.isNullOrUndefined(retryException.code)) {
                    // not clearing cache for timeouts or if their is a throttling error thrown from the server
                    if (!( retryException.code === KSErrorConstants.NW_CONNECTION_TIMEOUT_ERROR.code
                        || retryException.code === KSErrorConstants.NW_SOCKET_TIMEOUT.code
                        || retryException.code === KSErrorConstants.NW_REQUEST_ALREADY_IN_PROGRESS.code
                        || httpStatus === KSInternalConstants.HTTP_TOO_MANY_REQUESTS)) {

                        await this.removeRecord(objectName);
                    }
                }

                throw retryException;
            }

        };

        /**
         * Method can remove a cache entry
         *
         * @param syncableObjectName The key for object to be removed
         */
        KSUploadCacheManager.prototype.removeRecord = async function (syncableObjectName) {
            var query = KSUploadCacheSQLQueryGenerator.getPreparedStatementForDelete(syncableObjectName);
            await KSDatabaseAPI.executeQuery(query);
            logger.debug(LOG_PREFIX, "Successfully cleared upload cache entry for the sync object: " + syncableObjectName);
        };

        /**
         * Clearing all the entries in cache
         */
        KSUploadCacheManager.prototype.clearAll = async function (){
            var query = KSUploadCacheSQLQueryGenerator.getPreparedStatementForDelete();
            await KSDatabaseAPI.executeQuery(query);
        };

        /**
         * Method updates the reattempt date and no of retries
         *
         * @param uploadCacheObject The cache object for which it should be updated
         */
        KSUploadCacheManager.prototype.updateDateAndReAttemptCountForCacheObject= async function (uploadCacheObject) {
            var cacheRequestId = uploadCacheObject.getRequestCacheId();
            var queryToGetExistingNumberOfReattempts = KSUploadCacheSQLQueryGenerator.getQueryForGettingExistingNumberOfReattempts(cacheRequestId);

            var result = await KSDatabaseAPI.executeQuery(queryToGetExistingNumberOfReattempts);
            var existingNumberOfReattempts = result[0][KSDatabaseConstants.UPLOAD_CACHE_NO_OF_REATTEMPTS];

            var query = KSUploadCacheSQLQueryGenerator.getQueryForUpdatingLastAttemptDetails(cacheRequestId, existingNumberOfReattempts);
            await KSDatabaseAPI.executeQuery(query);

            logger.debug(LOG_PREFIX, "Successfully updated date and number of reattempts count cache." + uploadCacheObject.getObjectName());
        };

        /**
         * The method retries a request from upload cache and calls the processParsedUploadResponse method
         *
         * @param syncableObject The sync object for which cache retry needs to be done
         * @param uploadCacheObject The upload cache object
         */
        async function retryUploadWithUploadCacheObject(syncableObject, uploadCacheObject) {
            //URL
            var url = syncableObject.getMetadata()[KSInternalConstants.ENDPOINT_URL];

            //Request headers
            var requestHeaders = {
                [KSInternalConstants.X_HTTP_METHOD_OVERRIDE] : KSInternalConstants.HTTP_OVERRIDE_UPLOAD,
                [KSInternalConstants.X_KONY_REQUEST_CACHE_ID] :uploadCacheObject.getRequestCacheId(),
            };

            var version = syncableObject.metadata[KSInternalConstants.VERSION];
            if (!voltmx.sdk.isNullOrUndefined(version)) {
                requestHeaders[KSInternalConstants.X_KONY_API_VERSION] = version;
            }

            //Request body
            var requestBody = uploadCacheObject.getRequestBody();
            var requestContext = uploadCacheObject.getRequestContext();
            var queryParams = requestContext[KSInternalConstants.REQUEST_QUERY_PARAMS];

            var networkResponse = await KSNetworkUtils.post(url, queryParams, requestHeaders, requestBody, {});
            if(voltmx.sdk.util.isNullOrEmptyString(networkResponse)){

                logger.error(LOG_PREFIX, "Empty response received for cached upload request." + syncableObject.getFullyQualifiedName());
                throw new KSError(KSErrorConstants.SYNC_CACHE_UPLOAD_ERROR);
            } else {
                var response = await processParsedUploadResponse(syncableObject, networkResponse);

                var uploadResponseErrorList = response[KSInternalConstants.UPLOAD_SYNC_ERRORS];
                return {
                    [KSInternalConstants.CACHE_UPLOAD_ERRORS]: uploadResponseErrorList
                };
            }
        }

        /**
         * The method processes parsed upload response and persists them to db
         *
         * @param syncableObject The sync object
         * @param response parsed upload response
         */
        async function processParsedUploadResponse(syncableObject, response) {
            if (response.hasOwnProperty(KSInternalConstants._METADATA)) {

                var uploadMetadata = response[KSInternalConstants._METADATA];
                var uploadResponse = await syncableObject.parseUploadResponse(response);

                await syncableObject.persistUploadChanges(uploadResponse[KSInternalConstants.DATA_OBJECTS]);

                delete uploadResponse[KSInternalConstants.DATA_OBJECTS];
                logger.debug(LOG_PREFIX + "Successfully completed the cached upload processing task.");

                var responseToSent = uploadResponse;
                responseToSent[KSInternalConstants.UPLOAD_RESPONSE_METADATA] = uploadMetadata;

                return responseToSent;
            } else {
                logger.error(LOG_PREFIX, "Invalid response received from cached upload request.");
                throw new KSError(KSErrorConstants.SYNC_UPLOAD_ERROR, {
                    [KSInternalConstants.INTERNAL_USER_INFO] : "Error while retrieving objects from parsed cached upload response."
                });
            }
        }

        exports.getInstance = KSUploadCacheManager.getInstance;
    });

/**
 * KSUploadCacheObject
 * Created by Harshini Bonam on 18/04/19.
 * Copyright © 2019 Kony. All rights reserved.
 */
define("KSUploadCacheObject", ["exports", "KSCommonUtils"], function (exports, KSCommonUtils) {

    "use strict";
    exports._esModule = true;

    var sdk = voltmx.sdk;
    var logger = sdk.logsdk;
    var LOG_PREFIX = "KSUploadCacheObject : ";
    var KSInternalConstants = sdk.OfflineObjects.KSInternalConstants;
    var KSDatabaseConstants = sdk.OfflineObjects.KSDatabaseConstants;

    /**
     * Constructor for KSUploadCacheObject.
     * @param sdkObjectContext JSON object containing:
     *      objectName The object for which cache retry has to be done.
     *      objectType Type of object for which upload cache entry is needed.
     *      or,
     *      syncableObject The object for which cache retry has to be done.
     * @param requestBody Request body of upload cache.
     * @param requestCacheId Request Id of upload cache.
     * @param requestContext Request Context of upload cache.
     * @constructor Return the SDKObject.
     */

    function KSUploadCacheObject(sdkObjectContext, requestBody, requestCacheId, requestContext) {
        if(sdkObjectContext.hasOwnProperty(KSInternalConstants.OBJECT_NAME)
            && sdkObjectContext.hasOwnProperty(KSInternalConstants.TYPE)) {
            this.objectName = sdkObjectContext[KSInternalConstants.OBJECT_NAME];
            this.objectType = sdkObjectContext[KSInternalConstants.TYPE];
        } else {
            var sdkObject = sdkObjectContext;
            this.objectName = sdkObject.getFullyQualifiedName();
            this.objectType = sdkObject.getSyncLevel();
        }

        this.requestBody = requestBody;
        this.requestCacheId = requestCacheId;
        this.requestContext = requestContext;

        logger.trace(LOG_PREFIX, "Initialized an instance of KSUploadCacheObject with name: " + this.objectName
            + " and type: " + this.objectType);
    }

    //------------------------------------
    // PROTOTYPE GETTER AND SETTER METHODS
    //------------------------------------

    KSUploadCacheObject.prototype.getObjectName = function () {
        return this.objectName;
    };

    KSUploadCacheObject.prototype.setObjectName = function (objectName) {
        this.objectName = objectName;
    };

    KSUploadCacheObject.prototype.getObjectType = function () {
        return this.objectType;
    };

    KSUploadCacheObject.prototype.setObjectType = function (objectType) {
        this.objectType = objectType;
    };

    KSUploadCacheObject.prototype.getRequestBody = function () {
        return this.requestBody;
    };

    KSUploadCacheObject.prototype.setRequestBody = function (requestBody) {
        this.requestBody = requestBody;
    };

    KSUploadCacheObject.prototype.getRequestCacheId = function () {
        return this.requestCacheId;
    };

    KSUploadCacheObject.prototype.setRequestCacheId = function (requestCacheId) {
        this.requestCacheId = requestCacheId;
    };

    KSUploadCacheObject.prototype.getRequestContext = function () {
        return this.requestContext;
    };

    KSUploadCacheObject.prototype.setRequestContext = function (requestContext) {
        this.requestContext = requestContext;
    };

    KSUploadCacheObject.prototype.getUploadCacheObjectAsKeyValuePairs = function () {
        return {
            [KSDatabaseConstants.UPLOAD_CACHE_OBJECT_NAME] : this.objectName,
            [KSDatabaseConstants.UPLOAD_CACHE_OBJECT_TYPE] : this.objectType,
            [KSDatabaseConstants.UPLOAD_CACHE_REQUEST_BODY] : this.requestBody,
            [KSDatabaseConstants.UPLOAD_CACHE_REQUEST_ID] : this.requestCacheId,
            [KSDatabaseConstants.UPLOAD_CACHE_REQUEST_CONTEXT] : this.requestContext,
            [KSDatabaseConstants.UPLOAD_CACHE_NO_OF_REATTEMPTS] : 0,
            [KSDatabaseConstants.UPLOAD_CACHE_LAST_ATTEMPTED] : KSCommonUtils.getCurrentDateTime()
        };
    };

    exports.KSUploadCacheObject = KSUploadCacheObject;
});
/**
 * KSUploadCacheSQLQueryGenerator
 * Created by Harshini Bonam on 18/04/19.
 * Copyright © 2019 Kony. All rights reserved.
 */
define("KSUploadCacheSQLQueryGenerator", ["exports", "KSQueryObjectBuilder", "KSCommonUtils"], function (exports, KSQueryObjectBuilder, KSCommonUtils) {

    "use strict";
    exports._esModule = true;

    var sdk = voltmx.sdk;
    var logger = sdk.logsdk;
    var LOG_PREFIX = "KSUploadCacheSQLQueryGenerator : ";
    var KSPublicConstants = sdk.OfflineObjects.KSPublicConstants;
    var KSInternalConstants = sdk.OfflineObjects.KSInternalConstants;
    var KSDatabaseConstants = sdk.OfflineObjects.KSDatabaseConstants;
    var KSDatabaseOperation = KSDatabaseConstants.KSDatabaseOperations;

    /**
     * The method prepares the prepared statement for creating entry in konysyncUPLOADCACHE table
     * @param record to be inserted
     * @returns {queryBuilderObject}
     */
    function getPreparedStatementForCreate(record) {
        return KSQueryObjectBuilder.getQueryObjectForTableName(KSDatabaseConstants.SQL_TABLE_KONY_SYNC_UPLOAD_CACHE,
            KSDatabaseOperation.INSERT_OR_REPLACE)
            .addInsertValues(record)
            .build();
    }

    /**
     * The method returns the required prepared statement for selecting cached requests
     *
     * @param syncableObjectName The object name for which we require cached requests
     * @return {queryBuilderObject}
     */
    function getPreparedStatementForSelect(syncableObjectName) {
        var whereClause = {
            [KSDatabaseConstants.UPLOAD_CACHE_OBJECT_NAME] : syncableObjectName
        };
        return KSQueryObjectBuilder.getQueryObjectForTableName(KSDatabaseConstants.SQL_TABLE_KONY_SYNC_UPLOAD_CACHE,
            KSDatabaseOperation.SELECT)
            .setWhereClause(whereClause)
            .build();
    }

    /**
     * This method returns the query to delete records from konysyncUPLOADCACHE table
     * @param syncableObjectName the object/objectservice name
     * @return {queryBuilderObject}
     */
    function getPreparedStatementForDelete(syncableObjectName) {
        var query = KSQueryObjectBuilder.getQueryObjectForTableName(KSDatabaseConstants.SQL_TABLE_KONY_SYNC_UPLOAD_CACHE,
            KSDatabaseOperation.DELETE);

        if(!voltmx.sdk.util.isNullOrEmptyString(syncableObjectName)) {
            var whereClause = {
                [KSDatabaseConstants.UPLOAD_CACHE_OBJECT_NAME] : syncableObjectName
            };
            query.setWhereClause(whereClause);
        }

        return query.build();
    }

    /**
     * Method to create query for updating last attempted date time and number of reattempts
     *
     * @param requestCacheId the generated Unique UUID String
     * @param existingNumberOfReattempts the number of times retry was attempted on the object
     * @return {queryBuilderObject}
     */
    function getQueryForUpdatingLastAttemptDetails(requestCacheId, existingNumberOfReattempts) {
        var updateMap = {
            [KSDatabaseConstants.UPLOAD_CACHE_LAST_ATTEMPTED] : KSCommonUtils.getCurrentDateTime(),
            [KSDatabaseConstants.UPLOAD_CACHE_NO_OF_REATTEMPTS] : existingNumberOfReattempts + 1
        };

        var whereClause = {
            [KSDatabaseConstants.UPLOAD_CACHE_REQUEST_ID] : requestCacheId
        };

        return KSQueryObjectBuilder.getQueryObjectForTableName(KSDatabaseConstants.SQL_TABLE_KONY_SYNC_UPLOAD_CACHE,
            KSDatabaseOperation.UPDATE)
            .setUpdatedData(updateMap)
            .setWhereClause(whereClause)
            .build()

    }

    /**
     * Query to get entries in cache with order by object name
     *
     * @param syncableObjectNames The list of object names
     * @return {queryBuilderObject}
     */
    function getQueryForGettingUploadCacheEntriesInOrder(syncableObjectNames) {

        var whereClauseAsString = "";
        var objectNamesLength = syncableObjectNames.length;

        for (var index = 0; index < objectNamesLength; index++) {
            whereClauseAsString += KSDatabaseConstants.UPLOAD_CACHE_OBJECT_NAME + " "
                + KSInternalConstants.EQUALS + " " + syncableObjectNames[index];

            if(index + 1 !== objectNamesLength) {
                whereClauseAsString += " " + KSDatabaseConstants.LOGICAL_OR + " ";
            }
        }

        var orderBy = {
            [KSDatabaseConstants.UPLOAD_CACHE_LAST_ATTEMPTED] : KSPublicConstants.ORDER_BY_ASCENDING
        };

        var projectionColumns = [KSDatabaseConstants.UPLOAD_CACHE_OBJECT_NAME, KSDatabaseConstants.UPLOAD_CACHE_OBJECT_TYPE];

        return KSQueryObjectBuilder.getQueryObjectForTableName(KSDatabaseConstants.SQL_TABLE_KONY_SYNC_UPLOAD_CACHE,
            KSDatabaseOperation.SELECT)
            .setProjectionColumns(projectionColumns)
            .setWhereClauseAsString(whereClauseAsString)
            .addOrderByMap(orderBy)
            .build();
    }

    /**
     * Method creates the query for updating last attempted date time and number of reattempts
     * @param cacheRequestId the generated Unique UUID String
     * @return {queryBuilderObject}
     */
    function getQueryForGettingExistingNumberOfReattempts(cacheRequestId) {
        var whereClause = {
            [KSDatabaseConstants.UPLOAD_CACHE_REQUEST_ID] : cacheRequestId
        };

        var projectionColumns = [KSDatabaseConstants.UPLOAD_CACHE_NO_OF_REATTEMPTS];
        return KSQueryObjectBuilder.getQueryObjectForTableName(KSDatabaseConstants.SQL_TABLE_KONY_SYNC_UPLOAD_CACHE,
            KSDatabaseOperation.SELECT)
            .setWhereClause(whereClause)
            .setProjectionColumns(projectionColumns)
            .build();
    }

    exports.getPreparedStatementForCreate = getPreparedStatementForCreate;
    exports.getPreparedStatementForSelect = getPreparedStatementForSelect;
    exports.getPreparedStatementForDelete = getPreparedStatementForDelete;
    exports.getQueryForUpdatingLastAttemptDetails = getQueryForUpdatingLastAttemptDetails;
    exports.getQueryForGettingExistingNumberOfReattempts = getQueryForGettingExistingNumberOfReattempts;
    exports.getQueryForGettingUploadCacheEntriesInOrder = getQueryForGettingUploadCacheEntriesInOrder;
});
/**
 * Created by KH9400 .
 */

define("KSBatchingUtils", ["exports"], function (exports) {

    function chunkUploadPayloadToBatchSize(records, batchSize){
        length = records.length < batchSize ? records.length : batchSize;
        return records.slice(0,length);
     }

    exports.chunkUploadPayloadToBatchSize = chunkUploadPayloadToBatchSize;

});

define("KSCommonUtils", ["exports", "KSError", "KSRunningTasksManager"], function (exports, _KSError, KSRunningTasksManager) {

    var LOG_PREFIX = "KSCommonUtils : ";
    var KSError = _KSError.KSError;
    var KSErrorConstants = voltmx.sdk.OfflineObjects.KSErrorConstants;
    var KSDBSchemaVersion = voltmx.sdk.OfflineObjects.KSDBSchemaVersion;
    var KSPublicConstants = voltmx.sdk.OfflineObjects.KSPublicConstants;
    var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;
    var KSSDKObjectRecordAction = voltmx.sdk.OfflineObjects.KSSDKObjectRecordAction;

    /**
     * isNullOrEmptyObject - checks of the object is null/undefined or empty
     * @param object of type boolean/string/JSON
     * @returns {boolean}
     */
    function isNullOrEmptyObject(object) {
        return (voltmx.sdk.isNullOrUndefined(object) || voltmx.sdk.isEmptyObject(object));
    }

    /**
     * clearObject - deletes all key value pairs inside a JSON object
     * @param object of type JSON
     */
    function clearJSONObject(object) {
        for (var prop in object) {
            if (object.hasOwnProperty(prop)) {
                delete object[prop];
            }
        }
    }

    /**
     * Method to clear the objects inside an array.
     * @param array Array to be cleared.
     */
    function clearArrayObject(array) {
        array.length = 0;
    }

    /**
     * Merge two json objects
     *
     * @param Obj1
     * @param Obj2 which is added to Obj1
     */
    function mergeTwoJSONMaps(Obj1, Obj2) {
        for (var key in Obj2) {
            if (Obj2.hasOwnProperty(key)) {
                Obj1[key] = Obj2[key];
            }
        }
    }

    //Setup constants
    function getOfflineObjectsDatabaseName() {
        //AppID is prefixed by konynosql API.
        return "OfflineObjects";
    }

    /**
     * Function to check if an EXCEPTION object is enumerable or not
     * Usage: We cannot stringify native JS exception objects, as the [[Enumerable]] is set false.
     *        And, JSON.stringify(exception) would give "{}" empty, and exception.toString() gives respective string.
     *        Hence, before trying to stringify any exception, it is better to check this property and do corresponding action.
     * Caveats: This function may return false for array objects, as "length" is not enumerable.
     * @param exception
     * @returns {boolean}
     */
    function isExceptionObjectEnumerable(exception) {
        var exceptionPropertyDescriptors = Object.getOwnPropertyDescriptors(exception);
        for (var property in exceptionPropertyDescriptors) {
            if (exceptionPropertyDescriptors.hasOwnProperty(property)) {
                var propertyValue = exceptionPropertyDescriptors[property];
                if (propertyValue["enumerable"] === false) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Validates whether the object passed is an instance of map or not
     * @param map
     * @returns {boolean}
     */
    function isInstanceOfMap(map) {
        if (voltmx.sdk.isNullOrUndefined(map)) {
            return false;
        }

        return map.constructor === {}.constructor;
    }

    /**
     * Validates whether all primaryKeys present in the options
     * @param primaryKeyValueMap key value pair of primaryKeys and values
     * @param metadata of the sdkObject which needs for validation
     */
    function arePrimaryKeyAttributeValuesPresent(primaryKeyValueMap, metadata) {
        var primaryKeys = Object.keys(metadata[KSInternalConstants.OBJECTS_PRIMARY_KEYS]);
        for (var index = primaryKeys.length - 1; index >= 0; index--) {
            if (!primaryKeyValueMap.hasOwnProperty(primaryKeys[index])) {
                var errorMessage = "Primary key " + primaryKeys[index] + " value is not provided in options.";
                voltmx.sdk.logsdk.error(LOG_PREFIX, errorMessage);
                throw new KSError(KSErrorConstants.CRUD_NULL_OR_EMPTY_PRIMARY_KEY_VALUE, errorMessage);
            }
        }
        return true;
    }

    /**
     * Method to remove columns not in metadata.
     *
     * @param metadata the object metada
     * @param recordCreated from which unwanted columns are removed
     */
    function removeUnwantedColumns(metadata, recordCreated) {
        var projectionColumns = Object.keys(metadata[KSInternalConstants.ATTRIBUTES]);
        for (var column in recordCreated) {
            if (projectionColumns.indexOf(column) === -1) {
                delete recordCreated[column];
            }
        }
    }

    /**
     * Method to remove columns with null values.
     *
     * @param record from which null value columns are removed
     */
    function removeColumnsWithNullValues(record) {
        for (var column in record) {
            if (voltmx.sdk.isNullOrUndefined(record[column])) {
                delete record[column];
            }
        }
    }

    /**
     * It gives the map of ForeignKey Pk name as key  with its value from autoGenKeyValuePair
     * @param autoGenKeyValuePair    is list of pk's and value's from source object
     * @param targetObjectAttributes attributes which are related to targetObject
     * @param sourceObjectAttributes attributes which are related to sourceObject
     * @return the map of primary-key value pairs.
     */
    function getForeignKeyValueMap(autoGenKeyValuePair, targetObjectAttributes, sourceObjectAttributes) {
        var foreignKeyValueMap = {};
        var sourceObjectAttributesLen = sourceObjectAttributes.length;
        for (var index = 0; index < sourceObjectAttributesLen; index++) {
            var sourceObjectAttribute = sourceObjectAttributes[index];
            var sourceAttributeValue = autoGenKeyValuePair[sourceObjectAttribute.name];
            var targetObjectAttribute = targetObjectAttributes[index];
            if (sourceAttributeValue != null) {
                foreignKeyValueMap[targetObjectAttribute.name] = sourceAttributeValue;
            }
        }
        return foreignKeyValueMap;
    }

    /**
     * It gives the base ORM action from sdk record action
     *
     * @param recordActionType sdk record action
     * @returns {Number} base ORM action
     */
    function getBaseORMActionFromRecordActionCode(recordActionType) {
        var toBeUpdatedActionType;

        switch (recordActionType) {
            case KSSDKObjectRecordAction.DO_NOT_TRACK_INTERMEDIATE_UPDATES:
            case KSSDKObjectRecordAction.DEFERRED_UPDATE:
                toBeUpdatedActionType = KSSDKObjectRecordAction.UPDATE;
                break;
            case KSSDKObjectRecordAction.DEFERRED_CREATE:
                toBeUpdatedActionType = KSSDKObjectRecordAction.CREATE;
                break;
            case KSSDKObjectRecordAction.DEFERRED_DELETE:
                toBeUpdatedActionType = KSSDKObjectRecordAction.DELETE;
                break;
            default:
                toBeUpdatedActionType = recordActionType;
                break;
        }

        return toBeUpdatedActionType;
    }


    /** An utility to build userInfo object that is provided to an error
     *
     * @param name Name of the object service or object
     * @param error error from which the existing userInfo is retrieved
     * @param isObject true for object and false or undefined for objectservice.
     * @return A JSON containing userInfo details
     */
    function getUserInfo(name, error, isObject) {
        var userInfo = {};
        if(!voltmx.sdk.isNullOrUndefined(error.userInfo)) {
            if(voltmx.sdk.util.isJsonObject(error.userInfo)) {
                userInfo = error.userInfo;
            } else {
                userInfo[KSInternalConstants.INTERNAL_USER_INFO] = error.userInfo;
            }
        }

        if(isObject) {
            userInfo[KSInternalConstants.OBJECT_NAME] = name;
        } else {
            userInfo[KSInternalConstants.OBJECT_SERVICE_NAME] = name;
        }

        return userInfo;
    }

    /**
     * This method fetches the latest DB version
     * @return db Version
     */
    function getLatestDBVersion() {
        return (Object.keys(KSDBSchemaVersion).length - 1);
    }

    /**
     * Method to fetch the KSRunningTasksContext from the local storage.
     * @returns KSRunningTasksContext which is stored in the local storage.
     */
    function getRunningTasksContext() {
        return voltmx.store.getItem(KSPublicConstants.RUNNING_TASKS_CONTEXT);
    }

    /**
     * Method to set the KSRunningTasksContext in the local storage.
     * @param runningTasksContext KSRunningTasksContext which needs to be stored in the local storage.
     */
    function setRunningTasksContext(runningTasksContext) {
        voltmx.store.setItem(KSPublicConstants.RUNNING_TASKS_CONTEXT, runningTasksContext);
    }

    /**
     * A utility method to reset the running tasks context upon page refresh/reload
     */
    function resetLocksOnPageReload() {
        KSRunningTasksManager.getInstance();
        var appLaunchParams = voltmx.ds.read(KSPublicConstants.APP_LAUNCH);
        var appLaunch = (!isNullOrEmptyObject(appLaunchParams)) ? appLaunchParams[0] : appLaunchParams;
        var currentRunningTasksContext = getRunningTasksContext();
        if(!isNullOrEmptyObject(currentRunningTasksContext) && currentRunningTasksContext.APPLICATION_LEVEL != 0) {
            if(!isNullOrEmptyObject(appLaunch) && appLaunch === true) {
                var runningTasksContext = {
                    APPLICATION_LEVEL : 0
                };
                setRunningTasksContext(runningTasksContext);
            }
        }
        voltmx.ds.save([false], KSPublicConstants.APP_LAUNCH);
    }

    function generateUniqueUUIDString() {
        var uuid = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };

        return (new Date().getTime() + '-' + uuid() + '-' + uuid() + '-' + uuid());
    }

    function getCurrentDateTime() {
        var nowDate, month, formatDate;
        nowDate = new Date();
        month = nowDate.getUTCMonth() + 1;
        formatDate = (("00" + nowDate.getUTCFullYear()).slice(-4)) + "-" +
            (("00" + month).slice(-2)) + "-" +
            (("00" + nowDate.getUTCDate()).slice(-2)) + " " +
            (("00" + nowDate.getUTCHours()).slice(-2)) + ":" +
            (("00" + nowDate.getUTCMinutes()).slice(-2)) + ":" +
            (("00" + nowDate.getUTCSeconds()).slice(-2));

        return formatDate;
    }

    /**
     * Validates whether the object passed is an instance of array or not
     * @param array
     * @returns {boolean}
     */
    function isInstanceOfArray(arr) {
        if (voltmx.sdk.isNullOrUndefined(arr)) {
            return false;
        }

        return arr.constructor === Array;
    }

    /**
     * Validates whether the object passed is an instance of number
     * @param num
     * @returns {boolean}
     */
    function isInstanceOfNumber(num) {
        if(typeof num === 'number') {
            return true;
        }

        return false;
    }

    /**
     * isNull - checks whether given value is null
     * @param value - any value
     * @returns {boolean}
     */
    function isNull(value) {
        return value === null;
    }

    /**
     * isUndefined - checks whether given value is undefined
     * @param value - any value
     * @returns {boolean}
     */
    function isUndefined(value) {
        return typeof value === 'undefined';
    }

    /**
     * The method returns comma seperated concatenated value for pk
     *
     * @param record <KSSDKObjectRecord>The record for which pk is needed
     * @return The concatenated string
     */
    function getPrimaryKeyConcatenatedWithCommas(record) {
        var primaryKeyAttributeSet = record.getParentObject().
            getMetadata()[KSInternalConstants.OBJECTS_PRIMARY_KEYS];
        var commaSeparatedPK = '';
        for (var primaryKeyAttributeIndex in primaryKeyAttributeSet) {
            var primaryKeyAttribute = primaryKeyAttributeSet[primaryKeyAttributeIndex];
            commaSeparatedPK = commaSeparatedPK.concat(commaSeparatedPK).concat(
                record.objectForKey(primaryKeyAttribute[KSInternalConstants.NAME])).concat(',');
        }

        return commaSeparatedPK;
    }

    /**
     * The method is used to remove a element from an array.
     *
     * @param array object which needs to be modified.
     * @param val The value to be deleted.
     */
    function removeElementByName(array, val){
        if(voltmx.sdk.isArray(array)) {
            var len = array.length;
            for (var i = 0; i < len; i++) {
                if (array[i] === val) {
                    array.splice(i, 1);
                    return;
                }
            }
        }
    }

    exports.isNull = isNull;
    exports.isUndefined = isUndefined;
    exports.getUserInfo = getUserInfo;
    exports.clearJSONObject = clearJSONObject;
    exports.isInstanceOfMap = isInstanceOfMap;
    exports.clearArrayObject = clearArrayObject;
    exports.mergeTwoJSONMaps = mergeTwoJSONMaps;
    exports.isInstanceOfArray = isInstanceOfArray;
    exports.isInstanceOfNumber = isInstanceOfNumber;
    exports.getLatestDBVersion = getLatestDBVersion;
    exports.getCurrentDateTime = getCurrentDateTime;
    exports.isNullOrEmptyObject = isNullOrEmptyObject;
    exports.removeElementByName = removeElementByName;
    exports.removeUnwantedColumns = removeUnwantedColumns;
    exports.getForeignKeyValueMap = getForeignKeyValueMap;
    exports.getRunningTasksContext = getRunningTasksContext;
    exports.setRunningTasksContext = setRunningTasksContext;
    exports.resetLocksOnPageReload = resetLocksOnPageReload;
    exports.generateUniqueUUIDString = generateUniqueUUIDString;
    exports.isExceptionObjectEnumerable = isExceptionObjectEnumerable;
    exports.removeColumnsWithNullValues = removeColumnsWithNullValues;
    exports.getOfflineObjectsDatabaseName = getOfflineObjectsDatabaseName;
    exports.arePrimaryKeyAttributeValuesPresent = arePrimaryKeyAttributeValuesPresent;
    exports.getPrimaryKeyConcatenatedWithCommas = getPrimaryKeyConcatenatedWithCommas;
    exports.getBaseORMActionFromRecordActionCode = getBaseORMActionFromRecordActionCode;
});

/**
 * Module to help build and retrieve delta context.
 */
define("KSDeltaContextUtils", ["exports", "KSDatabaseAPI", "KSQueryObjectBuilder"],
    function (exports, _KSDatabaseAPI, KSQueryObjectBuilder) {

        var logger = voltmx.sdk.logsdk;
        var LOG_PREFIX = "KSDeltaContextUtils : ";
        var KSDbConstants = voltmx.sdk.OfflineObjects.KSDatabaseConstants;
        var KSDatabaseOperation = KSDbConstants.KSDatabaseOperations;
        var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;
        var deltaContextTableName = KSDbConstants.SQL_TABLE_KONY_SYNC_OBJECT_DELTA_CONTEXT;

        /**
         * Method to build insert query object for delta context.
         * @param deltaContext Delta context string.
         * @param filter Filter string.
         * @returns {Array} Array of query objects.
         */
        function buildDeltaContextQuery(deltaContext, filter) {
            logger.trace(LOG_PREFIX, "Building query object for inserting delta context into table.");
            var queryObj = [];

            if (!voltmx.sdk.isNullOrUndefined(deltaContext) && deltaContext.hasOwnProperty(KSInternalConstants.OBJS)) {
                var objects = deltaContext[KSInternalConstants.OBJS];

                var builder = KSQueryObjectBuilder.getQueryObjectForTableName(deltaContextTableName, KSDatabaseOperation.INSERT_OR_REPLACE);

                for (var objectName in objects) {
                    if(objects.hasOwnProperty(objectName)) {
                        var object = objects[objectName];
                        var insertValueMap = {};
                        insertValueMap[KSInternalConstants.OBJECT_NAME] = objectName;
                        insertValueMap[KSInternalConstants.FILTER] = filter[objectName];
                        insertValueMap[KSInternalConstants.DELTACONTEXT] = object[KSInternalConstants.DELTA];
                        builder.addInsertValues(insertValueMap);
                    }
                }

                queryObj.push(builder.build());
            }

            return queryObj;
        }

        /**
         * Method to fetch the delta context associated with given objects and their respective filters.
         * @param listOfObjectNamesAndFilters List of object names and their respective filters.
         * @returns {*} Array of delta context.
         */
        async function getDeltaContextForGivenObjectNamesAndFilters(listOfObjectNamesAndFilters) {
            logger.trace(LOG_PREFIX, "Building delta context query for download request.");
            var selectedRecords = [];
            if (!voltmx.sdk.isNullOrUndefined(listOfObjectNamesAndFilters)) {
                var statementBuilder = KSQueryObjectBuilder.getQueryObjectForTableName(deltaContextTableName, KSDatabaseOperation.SELECT);

                for (var i = 0; i < listOfObjectNamesAndFilters.length; i++) {
                    //Add object name..
                    var whereConditionMap = listOfObjectNamesAndFilters[i];
                     var queryObj = statementBuilder.setWhereClause(whereConditionMap).build();
                    var result = await _KSDatabaseAPI.KSDatabaseAPI.executeQuery(queryObj);
                    Array.prototype.push.apply(selectedRecords, result);
                }
            }
            return selectedRecords;
        }

        /*Method to get queryObject for deleting a object data inside deltaContext table
        * @param objectName (string)
        * @returns queryObject*/
        function queryToDeleteARowByObjectName(objectName) {
          var whereClause = {};
          whereClause[KSInternalConstants.OBJECT_NAME] = objectName;
          return KSQueryObjectBuilder.getQueryObjectForTableName(
              KSDbConstants.SQL_TABLE_KONY_SYNC_OBJECT_DELTA_CONTEXT,
              KSQueryObjectBuilder.KSDatabaseOperation.DELETE).setWhereClause(whereClause).build();
        }

        exports.buildDeltaContextQuery = buildDeltaContextQuery;
        exports.getDeltaContextForGivenObjectNamesAndFilters = getDeltaContextForGivenObjectNamesAndFilters;
        exports.queryToDeleteARowByObjectName = queryToDeleteARowByObjectName;
    });
/**
 * Exception Wrapper Utils in Offline objects.
 */
define("KSExceptionWrapperUtils", ["exports", "KSError", "KSCommonUtils"], function (exports, _KSError, KSCommonUtils) {
    "use strict";
    exports._esModule = true;
    var LOG_PREFIX = "KSExceptionWrapperUtils : ";
    var KSError = _KSError.KSError;
    var KSErrorConstants = voltmx.sdk.OfflineObjects.KSErrorConstants;
    var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;


    /**
     * Method to get a KSError object wrapping the native uncaught exception
     * @param DBException is the native error object
     * @returns {_KSError.KSError} DB error object
     */
    exports.wrapDBException = function (DBException) {
        if (KSCommonUtils.isNullOrEmptyObject(DBException)) {
            return new KSError(KSErrorConstants.DB_GENERIC_ERROR);
        }
        if (!DBException.hasOwnProperty(KSInternalConstants.ERROR_DOMAIN)) {
            var userInfo = "";

            if (DBException.hasOwnProperty("message") ||
                !KSCommonUtils.isNullOrEmptyObject(DBException.message)) {
                userInfo += DBException.message;
            }

            if (DBException.hasOwnProperty("stack") ||
                !KSCommonUtils.isNullOrEmptyObject(DBException.stack)) {
                userInfo += DBException.stack;
            }

            voltmx.sdk.logsdk.error(LOG_PREFIX, userInfo);
            return new KSError(KSErrorConstants.DB_GENERIC_ERROR, userInfo);
        }
        return DBException;
    }
});
/**
 * KSMarkForUploadUtils
 * Created by Nikhil Kolhe on 04/03/2019.
 * Copyright © 2019 Kony. All rights reserved.
 */

define("KSMarkForUploadUtils", ["exports", "KSError", "KSQueryObjectBuilder", "KSSQLQueryGenerator", "KSCommonUtils"],
    function (exports, _KSError, KSQueryObjectBuilder, KSSQLQueryGenerator, KSCommonUtils) {

        var LOG_PREFIX = "KSMarkForUploadUtils : ";
        var KSSyncDatabaseHelper = require("KSSyncDatabaseHelper");
        var logger = voltmx.sdk.logsdk;
        var KSTableType = voltmx.sdk.OfflineObjects.KSTableType;
        var KSPublicConstants = voltmx.sdk.OfflineObjects.KSPublicConstants;
        var KSDatabaseConstants = voltmx.sdk.OfflineObjects.KSDatabaseConstants;
        var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;
        var KSSDKObjectRecordAction = voltmx.sdk.OfflineObjects.KSSDKObjectRecordAction;

        var deferredActionCodes = [];
        deferredActionCodes.push(KSSDKObjectRecordAction.DEFERRED_CREATE);
        deferredActionCodes.push(KSSDKObjectRecordAction.DEFERRED_UPDATE);
        deferredActionCodes.push(KSSDKObjectRecordAction.DEFERRED_DELETE);
        deferredActionCodes.push(KSSDKObjectRecordAction.DEFERRED_AND_DO_NOT_TRACK_INTERMEDIATE_UPDATES);

        /**
         * Gets prepared statements to mark upload true for the user specified records in history table
         *
         * @param options containing criteria, metadata.
         * @param tableType tableType to execute queries
         * @returns {Array} returns prepared statements for markForUpload
         */
        function getPreparedStatementForMarkForUpload(options, tableType) {
            var queries = [];
            var criteria = {};
            var metadata = options[KSInternalConstants.METADATA];

            if (options.hasOwnProperty(KSPublicConstants.CRUD_OPTION_PRIMARY_KEYS)) {
                criteria = options[KSPublicConstants.CRUD_OPTION_PRIMARY_KEYS];
            }

            var fullyQualifiedName = metadata[KSInternalConstants.FULLY_QUALIFIED_NAME];
            var tableName = KSSQLQueryGenerator.getTableNameWithType(fullyQualifiedName, tableType);

            for (var recordActionType in deferredActionCodes) {

                var actionTypeToBeUpdated;
                if(deferredActionCodes[recordActionType] === KSSDKObjectRecordAction.DEFERRED_AND_DO_NOT_TRACK_INTERMEDIATE_UPDATES) {
                    actionTypeToBeUpdated = KSSDKObjectRecordAction.DO_NOT_TRACK_INTERMEDIATE_UPDATES;
                } else {
                    actionTypeToBeUpdated = KSCommonUtils.getBaseORMActionFromRecordActionCode(deferredActionCodes[recordActionType]);
                }

                var updatePreparedStatementBuilder = KSQueryObjectBuilder.getQueryObjectForTableName(tableName, KSDatabaseConstants.KSDatabaseOperations.UPDATE);

                var updateColumnMaps = {};
                updateColumnMaps[KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE] = actionTypeToBeUpdated;

                var clause = {};
                clause[KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE] = deferredActionCodes[recordActionType];

                KSCommonUtils.mergeTwoJSONMaps(criteria, clause);

                var whereClause = voltmx.sdk.cloneObject(criteria);
                updatePreparedStatementBuilder.setWhereClause(whereClause)
                    .setUpdatedData(updateColumnMaps);

                var preparedStatements = updatePreparedStatementBuilder.build();

                queries.push(preparedStatements);

                delete criteria[KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE];
            }
            return queries;
        }

        /**
         * Gives prepared statements for fetching records deferred for upload
         *
         * @param options options containing metadata
         * @param primaryKeyList primary keys deferred from upload
         */
        function getSelectPreparedStatementForDeferredRecords(options, primaryKeyList) {
            logger.trace(LOG_PREFIX, "getSelectPreparedStatementForDeferredRecords" + "Start:");

            var metadata = options[KSInternalConstants.METADATA];
            var whereCondition = whereClauseForDeferredRecords();
            var tableName = KSSQLQueryGenerator.getTableNameWithType(metadata[KSInternalConstants.FULLY_QUALIFIED_NAME], KSTableType.HISTORY);
            var statementBuilder = KSQueryObjectBuilder.getQueryObjectForTableName(tableName, KSDatabaseConstants.KSDatabaseOperations.SELECT);

            return statementBuilder.setProjectionColumns(primaryKeyList)
                .setWhereClause(whereCondition)
                .addGroupByList(primaryKeyList)
                .build();
        }

        /**
         * Builds where condition for deferred records
         *
         * @param primaryKeyValues primary key value pairs
         * @returns {Array} whereClause for deferred records
         */
        function buildWhereConditionForDeferredRecords(primaryKeyValues) {
            var whereClause = KSSyncDatabaseHelper.buildWhereConditionAsString(primaryKeyValues);
            whereClause.push([KSDatabaseConstants.LOGICAL_AND]);
            return whereClause.concat(whereClauseForDeferredRecords(primaryKeyValues));
        }

        function whereClauseForDeferredRecords(primaryKeyValues) {

            var whereCondition = [];
            var ruleForDeferredUpdate = [];
            var ruleForDeferredDelete = [];
            var ruleForDeferredAndTrackUpdates = [];

            ruleForDeferredUpdate.push(KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE);
            ruleForDeferredUpdate.push(KSInternalConstants.GREATER_THAN_EQUALS_TO);
            ruleForDeferredUpdate.push(KSSDKObjectRecordAction.DEFERRED_UPDATE);

            whereCondition.push(ruleForDeferredUpdate);
            whereCondition.push([KSDatabaseConstants.LOGICAL_AND]);

            ruleForDeferredDelete.push(KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE);
            ruleForDeferredDelete.push(KSInternalConstants.LESS_THAN_EQUALS_TO);
            ruleForDeferredDelete.push(KSSDKObjectRecordAction.DEFERRED_DELETE);

            whereCondition.push(ruleForDeferredDelete);
            whereCondition.push([KSDatabaseConstants.LOGICAL_OR]);

            if (!KSCommonUtils.isNullOrEmptyObject(primaryKeyValues)) {
                var ruleForPrimaryKeyValues = KSSyncDatabaseHelper.buildWhereConditionAsString(primaryKeyValues);
                for (var index = 0; index < ruleForPrimaryKeyValues.length; index++) {
                    whereCondition.push(ruleForPrimaryKeyValues[index]);
                }
                whereCondition.push([KSDatabaseConstants.LOGICAL_AND]);
            }

            ruleForDeferredAndTrackUpdates.push(KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE);
            ruleForDeferredAndTrackUpdates.push(KSInternalConstants.EQUALS);
            ruleForDeferredAndTrackUpdates.push(KSSDKObjectRecordAction.DEFERRED_AND_DO_NOT_TRACK_INTERMEDIATE_UPDATES);

            whereCondition.push(ruleForDeferredAndTrackUpdates);

            /* Query :  konysyncchangetype >= 90 AND konysyncchangetype <= 93 OR userID = -1 AND konysyncchangetype = 70 */
            return whereCondition;
        }

        /**
         * Gives deferred action codes as String
         *
         * @return {string} of deferred actions codes
         */

        function getDeferredActionCodesAsString() {

            var deferredActionCodeString = KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE + ' ' + "!=" + ' ' + KSSDKObjectRecordAction.DEFERRED_UPDATE
                + ' ' + KSDatabaseConstants.LOGICAL_AND + ' ' + KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE + ' ' + "!=" + ' ' +
                KSSDKObjectRecordAction.DEFERRED_CREATE + ' ' + KSDatabaseConstants.LOGICAL_AND + ' ' + KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE +
                ' ' + "!=" + ' ' + KSSDKObjectRecordAction.DEFERRED_DELETE + ' ' + KSDatabaseConstants.LOGICAL_AND + ' ' + KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE +
                ' ' + "!=" + ' ' + KSSDKObjectRecordAction.DEFERRED_AND_DO_NOT_TRACK_INTERMEDIATE_UPDATES;

            /* Query : konysyncchangetype != 90 AND konysyncchangetype != 91 AND konysyncchangetype != 93 AND konysyncchangetype != 70 */
            return deferredActionCodeString;
        }

        exports.getDeferredActionCodesAsString = getDeferredActionCodesAsString;
        exports.getPreparedStatementForMarkForUpload = getPreparedStatementForMarkForUpload;
        exports.buildWhereConditionForDeferredRecords = buildWhereConditionForDeferredRecords;
        exports.getSelectPreparedStatementForDeferredRecords = getSelectPreparedStatementForDeferredRecords;
    });

/**
 * KSMetadataUtils
 * Created by Harshini Bonam on 24/05/18.
 * Copyright © 2018 Kony. All rights reserved.
 */

define("KSMetadataUtils",

    ["exports", "VoltmxNoSQLDatabaseHelper", "KSCommonUtils", "KSSQLQueryGenerator", "KSDatabaseAPI", "KSError", "KSSDKObject"],

    function(exports, _VoltmxNoSQLDatabaseHelper, KSCommonUtils, KSSQLQueryGenerator, _KSDatabaseAPI, _KSError, _KSSDKObject) {

        "use strict";
        exports._esModule = true;

        var logger = voltmx.sdk.logsdk;
        var KSError = _KSError.KSError;
        var LOG_PREFIX = "KSMetadataUtils : ";
        var KSSDKObject = _KSSDKObject.KSSDKObject;
        var KSDatabaseAPI = _KSDatabaseAPI.KSDatabaseAPI;
        var KSErrorConstants = voltmx.sdk.OfflineObjects.KSErrorConstants;
        var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;
        var KSDatabaseConstants = voltmx.sdk.OfflineObjects.KSDatabaseConstants;

        /**
         * Method to parse metadata network response and generate rootMetadataObject
         * @param objectServiceMetadataContext
         * @param metadataJSON
         * @return {rootMetadataObject}
         */
        function parseSetupMetadataJSON(objectServiceMetadataContext, metadataJSON) {
            //local require is implemented as KSMetadataJSONParser depends on KSMetadataUtils.
            var KSMetadataJSONParser = require("KSMetadataJSONParser");
            if(validateMetadataJSON(objectServiceMetadataContext, metadataJSON)) {
                logger.trace(LOG_PREFIX, "Began to parse metadata JSON for object service " + objectServiceMetadataContext.name);
                var rootMetadataObject = KSMetadataJSONParser.parse(objectServiceMetadataContext, metadataJSON);

                logger.debug(LOG_PREFIX, "Successfully parsed metadata JSON for object service " + objectServiceMetadataContext.name);
                return rootMetadataObject;
            }
        }

        /**
         * Method to get create table queries for voltmxSyncProperties, konysyncMetadata, konysyncObjectDeltaContext
         * and konysyncMetaInfo.
         * @returns {tableName: createQueryString, *}
         */
        function getMetaTableCreateQueries() {

            var createTableQueries = {};
            logger.trace(LOG_PREFIX, "Began to generate create queries for meta tables.");

            createTableQueries[KSDatabaseConstants.SQL_TABLE_KONY_PROPERTIES] = "&"+ KSDatabaseConstants.PROPERTIES_TABLE_KEY_COLUMN +
                "," + KSDatabaseConstants.PROPERTIES_TABLE_VALUE_COLUMN;

            createTableQueries[KSDatabaseConstants.SQL_TABLE_KONY_SYNC_OBJECT_DELTA_CONTEXT] = "[objectname+filter],objectname,filter,deltacontext";

            //NOTE: Made scopename as primary key as it will always be unique.
            createTableQueries[KSDatabaseConstants.SQL_TABLE_KONY_SYNC_META_INFO] = "&scopename,uploadsessionno,filtervalue,replaysequencenumber,lastgeneratedid";

            createTableQueries[KSDatabaseConstants.SQL_TABLE_KONY_SYNC_METADATA] = "&" + KSDatabaseConstants.METADATA_TABLE_OBJECT_SERVICE_NAME +
                "," + KSDatabaseConstants.METADATA_TABLE_METADATA_JSON + "," + KSDatabaseConstants.METADATA_TABLE_DELTA_CONTEXT +
                "," + KSDatabaseConstants.METADATA_TABLE_VERSION;

            createTableQueries[KSDatabaseConstants.SQL_TABLE_KONY_SYNC_UPLOAD_CACHE] = KSDatabaseConstants.QUERY_KONY_SYNC_UPLOAD_CACHE_TABLE;

            logger.trace(LOG_PREFIX, "Successfully generated create queries for meta tables.");
            return createTableQueries;
        }

        /**
         * Method to get create table queries for all objects in given object service rootMetadata.
         * @param objectServiceName
         * @param rootMetadataObject
         * @returns {tableName: createQueryString, *}
         */
        function getQueriesToCreateTablesForObjectService(objectServiceName, rootMetadataObject) {
            var queries = {};
            var namespaces = rootMetadataObject[KSInternalConstants.NAMESPACE_METADATA_DICTIONARY];

            logger.debug(LOG_PREFIX, "Began to generate create table queries for object service: " + objectServiceName);
            for(var namespaceName in namespaces) {

                if(namespaces.hasOwnProperty(namespaceName)) {
                    var objectsMetadataDict = namespaces[namespaceName][KSInternalConstants.OBJECT_METADATA_DICTIONARY];

                    for(var objectName in objectsMetadataDict) {
                        if(objectsMetadataDict.hasOwnProperty(objectName)) {

                            var tableQueries = KSSQLQueryGenerator.getQueriesToCreateTableForObject(objectsMetadataDict[objectName]);
                            mergeJSONObjects(tableQueries, queries);
                        }
                    }
                }
            }
            logger.debug(LOG_PREFIX, "Successfully generated create table queries for object service: " + objectServiceName);
            return queries;
        }

        /**
         * Method to create/update/delete tables for all object services in SetupManager's newSetupContext
         * @param objectServiceObjectsDDLQueries
         * @param nextIndexedDBVersion
         * @return {Promise<void>}
         * @throws DatabaseException
         */
        async function createUpdateDeleteTablesForAllObjectServices(objectServiceObjectsDDLQueries, nextIndexedDBVersion) {
            var dbName = KSCommonUtils.getOfflineObjectsDatabaseName();

            try {
                logger.trace(LOG_PREFIX, "Entered createUpdateDeleteTablesForAllObjectServices...");

                await KSDatabaseAPI.closeDBConnection();
                logger.trace(LOG_PREFIX, "Closed db connection if it exists. Initializing db with new db schema changes.");

                await KSDatabaseAPI.initializeDatabase(dbName, nextIndexedDBVersion, objectServiceObjectsDDLQueries);
                logger.trace(LOG_PREFIX, "Completed initializing db schema for given objectservices.");

                // migrate existing records
                await migrateExistingRecords(objectServiceObjectsDDLQueries);

                return Promise.resolve()
            } catch (dbException) {
                logger.error(LOG_PREFIX, "Failed to initialize DB Connection.");
                throw dbException;
            }
        }

        /**
         * Migrate existing records of table on update action received in
         * the incremental setup
         * @param objectServiceObjectsDDLQueries contains indices updates
         * @returns {Promise<void>}
         */
        async function migrateExistingRecords(objectServiceObjectsDDLQueries) {
            var VMXNoSQLDatabaseHelper = _VoltmxNoSQLDatabaseHelper.VoltmxNoSQLDatabaseHelper;
            const promises = [];

            try {
                // migrate existing records
                if (objectServiceObjectsDDLQueries['indicesUpdates']) {
                    for (let tableInfo of objectServiceObjectsDDLQueries['indicesUpdates']) {
                        if (Object.keys(tableInfo.deletedFields).length > 0) {
                            const transaction = VMXNoSQLDatabaseHelper.db.transaction(voltmx.nosql.READ_WRITE, [tableInfo.name], async function (transaction) {
                                // fetch records
                                const records = await voltmx.nosql.fetchRecords(transaction, tableInfo.name);

                                // remove deleted fields from the records
                                Object.keys(tableInfo.deletedFields).forEach(field => {
                                    records.data.forEach(record => delete record[field]);
                                })

                                // replace records into the database
                                await voltmx.nosql.addOrReplaceRecords(transaction, tableInfo.name, records.data);

                                logger.trace(`${LOG_PREFIX} fields removed successfully from the table ${tableInfo.name}`);
                            });

                            promises.push(transaction);
                        }
                    }
                }

                await Promise.all(promises);

                return Promise.resolve();
            } catch (error) {
                logger.error(LOG_PREFIX, "Failed to migrate records.");

                throw error;
            }
        }

        /**
         * Method to upgrade konysync meta tables
         * @param dbInfo
         * @param nextIndexedDBVersion
         * @return {Promise<void>}
         * @throws DatabaseException
         */
        async function updatingPropertiesTableDBSchemaVersion(dbInfo, nextIndexedDBVersion) {
            var dbName = KSCommonUtils.getOfflineObjectsDatabaseName();
            var query = KSSQLQueryGenerator.getPropertiesTableUpdateQueryForDBSchemaVersion();
            try {
                if(!voltmx.sdk.isNullOrUndefined(dbInfo)) {
                    logger.trace(LOG_PREFIX, "Entered updatingPropertiesTableDBSchemaVersion...");
                    await KSDatabaseAPI.closeDBConnection();
                    logger.trace(LOG_PREFIX, "Closed db connection if it exists. Initializing db with new db schema changes for konysyncTables.");
                    await KSDatabaseAPI.initializeDatabase(dbName, nextIndexedDBVersion, dbInfo);
                    logger.trace(LOG_PREFIX, "Completed upgrading db schema for konysyncTables");
                }
                await KSDatabaseAPI.executeQueriesAsTransaction(query, [KSDatabaseConstants.SQL_TABLE_KONY_PROPERTIES]);
                logger.info(LOG_PREFIX, "Completed updating dbSchemaVersion value in voltmxSyncPROPERTIES table.")
            } catch (dbException) {
                logger.error(LOG_PREFIX, "Failed to initialize DB Connection.");
                throw dbException;
            }
        }

        /**
         * Method to insert initial values into meta tables (voltmxSyncProperties, konysyncMetadata and konysyncMetaInfo)
         * @param objectServiceMetadataContext
         * @return {Promise<void>}
         * @throws DatabaseException
         */
        async function insertIntoMetadataAndMetaInfoTables(objectServiceMetadataContext) {
            var queries = [];
            queries.push(KSSQLQueryGenerator.getPropertiesTableInsertQuery());

            for (var objectServiceName in objectServiceMetadataContext) {
                if(objectServiceMetadataContext.hasOwnProperty(objectServiceName)) {
                    queries.push(KSSQLQueryGenerator.getMetaInfoTableInsertQueryForObjectService(objectServiceName));
                    queries.push(KSSQLQueryGenerator.getMetaDataTableInsertQuery(objectServiceMetadataContext[objectServiceName]));
                }
            }
            await KSDatabaseAPI.executeQueriesAsTransaction(queries,
                [KSDatabaseConstants.SQL_TABLE_KONY_PROPERTIES, KSDatabaseConstants.SQL_TABLE_KONY_SYNC_META_INFO, KSDatabaseConstants.SQL_TABLE_KONY_SYNC_METADATA]);
        }

        /**
         * Forms queries for insertOrReplace into metadata and metainfo tables and executes
         * @param objectServiceMetadataContexts
         * @return {Promise<void>}
         */
        async function insertOrReplaceIntoMetadataAndMetaInfoTable(objectServiceMetadataContexts) {
            var queries = [];
            var objectServiceNames = Object.keys(objectServiceMetadataContexts);

            for(var index in objectServiceNames) {
                var objectServiceName = objectServiceNames[index];
                var objectServiceMetadataContext = objectServiceMetadataContexts[objectServiceName];

                var query = KSSQLQueryGenerator.getSelectQueryForMetaInfoTable(objectServiceName);
                var metaInfoRecord = await KSDatabaseAPI.executeQuery(query);

                if(KSCommonUtils.isNullOrEmptyObject(metaInfoRecord)) {
                    queries.push(KSSQLQueryGenerator.getMetaInfoTableInsertQueryForObjectService(objectServiceName));
                }
                queries.push(KSSQLQueryGenerator.getMetadataTableInsertOrUpdateQuery(objectServiceMetadataContext));
            }
            await KSDatabaseAPI.executeQueriesAsTransaction(queries);
        }

        /**
         * Normalizes the namespace name to kony_unnamed if it is null or empty
         *
         * @param namespaceName Namespace name
         * @return Normalized namespace name
         */
        function normalizedNamespaceName(namespaceName) {
            return KSCommonUtils.isNullOrEmptyObject(namespaceName) ? KSInternalConstants.UNNAMED_NAMESPACE : namespaceName;
        }

        /**
         * Removes kony_unnamed from the fullyQualifiedName if it exists,
         * if the input fullyQualifiedName has no namespaceName
         * @param fullyQualifiedName
         * @return Normalized fully qualified name
         */
        function normalizedFullyQualifiedName(fullyQualifiedName) {
            var namespaceName = namespaceNameFromFullyQualifiedName(fullyQualifiedName);
            var objectName = objectNameFromFullyQualifiedName(fullyQualifiedName);
            return normalizedFullyQualifiedNameForNamespaceNameAndObjectName(namespaceName, objectName);
        }

        /**
         * Removes kony_unnamed from the fullyQualifiedName if it exists,
         *
         * @param namespaceName
         * @param objectName
         * @return Normalized fully qualified name
         */
        function normalizedFullyQualifiedNameForNamespaceNameAndObjectName(namespaceName,  objectName) {
            var fullyQualifiedName;

            if (! KSCommonUtils.isNullOrEmptyObject(objectName)) {
                if (KSCommonUtils.isNullOrEmptyObject(namespaceName)
                    || namespaceName === KSInternalConstants.UNNAMED_NAMESPACE) {
                    fullyQualifiedName = objectName;
                } else {
                    fullyQualifiedName = namespaceName + KSDatabaseConstants.NAMESPACE_SUFFIX_CHARACTER + objectName;
                }
            }

            return fullyQualifiedName;
        }

        /**
         * returns namespaceName, given a fully qualified name
         *
         * @param fullyQualifiedName
         * @return namespaceName
         */
        function namespaceNameFromFullyQualifiedName(fullyQualifiedName) {
            return componentAtIndex(0, fullyQualifiedName);
        }

        /**
         * returns objectName, given a fully qualified name
         *
         * @param fullyQualifiedName
         * @return objectName
         */
        function objectNameFromFullyQualifiedName(fullyQualifiedName) {
            return componentAtIndex(1, fullyQualifiedName);
        }

        /**
         * Test cases:
         * <p>
         * index  = 0 fqn = a.b ==> a
         * index  = 1 fqn = a.b ==> b
         * index >= 2 fqn = a.b ==> nil
         * <p>
         * index  = 0 fqn = a ==> unnamed
         * index  = 1 fqn = a ==> a
         * index >= 2 fqn = a ==> nil
         * <p>
         * index  = 0 fqn = nil ==> nil
         * index  = 1 fqn = nil ==> nil
         * index >= 2 fqn = nil ==> nil
         * <p>
         * index  = 0 fqn = emptystring ==> nil
         * index  = 1 fqn = emptystring ==> nil
         * index >= 2 fqn = emptystring ==> nil
         * <p>
         * index  = 0 fqn = a.b.c ==> nil
         * index  = 1 fqn = a.b.c ==> nil
         * index >= 2 fqn = a.b.c ==> nil
         */
        function componentAtIndex (index, fullyQualifiedName) {
            var component = "";

            if (index < 2) {
                if (! KSCommonUtils.isNullOrEmptyObject(fullyQualifiedName)) {
                    var components = componentsOfFullyQualifiedName(fullyQualifiedName);
                    var componentCount = components.length;

                    //Assuming fullyQualifiedName will not contain more than one dot...
                    if (componentCount <= 2) {
                        if (componentCount === 2) {
                            component = components[index];
                        } else if (componentCount === 1) {
                            if (index === 1) {
                                component = components[0];
                            }
                        }
                    }
                }
            }

            return component;
        }

        /**
         * returns the components seperated by "." in a fully qualified name
         *
         * @param fullyQualifiedName
         * @return components of fully qualified name
         */
        function componentsOfFullyQualifiedName(fullyQualifiedName) {
            return fullyQualifiedName.split(".");
        }

        /**
         * Method to validate network metadata JSON object.
         * @param objectServiceMetadataContext
         * @param metadataJSON
         * @return {boolean}
         */
        function validateMetadataJSON(objectServiceMetadataContext, metadataJSON) {
            if(KSCommonUtils.isNullOrEmptyObject(metadataJSON)) {
                var errorMessage = "Invalid metadata JSON received for object service " + objectServiceMetadataContext.name;

                logger.error(LOG_PREFIX, errorMessage);
                throw new KSError(KSErrorConstants.INVALID_METADATA_JSON, errorMessage);
            }
            return true;
        }

        /**
         * Method to merge fromJSON object key-value pairs into toObject
         * NOTE: this is a redundant method from KSCommonUtils, and would be removed.
         * @param fromObject
         * @param toObject
         */
        function mergeJSONObjects(fromObject, toObject) {
            for (var key in fromObject) {
                if(fromObject.hasOwnProperty(key)) {
                    toObject[key] = fromObject[key];
                }
            }
        }

        /**
         * Method to get attribute metadata from objectMetadata.
         * @param objectMetadata
         * @param attributeName
         * @return {attributeMetadata}/null if not found.
         */
        function getAttributeMetadataForObjectAndAttributeName(objectMetadata, attributeName) {
            return objectMetadata[KSInternalConstants.ATTRIBUTES][attributeName];
        }

        /**
         * Method to check whether hierarchy present in syncable object
         * @param syncableObject
         * @return {boolean}
         */
        function doesHierarchyExistInSyncableObject(syncableObject) {
            var doesHierarchyExist = false;
            if (syncableObject instanceof KSSDKObject !== true) {
                var namespaceMetadataMap = getNamespaceMetadataMap(syncableObject);
                if (!voltmx.sdk.isNullOrUndefined(namespaceMetadataMap)) {
                    for (var namespaceName in namespaceMetadataMap) {
                        var namespaceMetadata = namespaceMetadataMap[namespaceName];
                        var forwardDependencyMap = namespaceMetadata[KSInternalConstants.FORWARD_HIERARCHICAL_DEPENDENCY_MAP];
                        if (!KSCommonUtils.isNullOrEmptyObject(forwardDependencyMap)) {
                            logger.debug(LOG_PREFIX, 'Hierarchy found in the namespace: ' + namespaceName +
                                '. So following hierarchical upload strategy.');
                            doesHierarchyExist = true;
                            break;
                        }
                    }
                }
            }

            return doesHierarchyExist;
        }

        /**
         * The method returns whether the object has an auto generated primary key
         *
         * @param sdkObject The sdk object
         * @return boolean indicating auto generated pk
         */
        function doesObjectHaveAutoGeneratedPrimaryKey(sdkObject) {
            var haveAutoGeneratedPrimaryKey = false;
            var primaryKeyAttributeSet = sdkObject.getMetadata()[KSInternalConstants.OBJECTS_PRIMARY_KEYS];
            for (var primaryKeyAttributeIndex in primaryKeyAttributeSet) {
                var primaryKeyAttribute = primaryKeyAttributeSet[primaryKeyAttributeIndex];
                if (primaryKeyAttribute[KSInternalConstants.ATTRIBUTES_AUTO_GENERATED] === true) {
                    haveAutoGeneratedPrimaryKey = true;
                    break;
                }
            }
            return haveAutoGeneratedPrimaryKey;
        }

        /**
         * The method returns a list of object names to which are the child of the current object
         *
         * @param object The object for which child names list is required
         * @return Array list of child object names
         * @throws JSONException
         */
        function getRelatedObjectNameList(object) {
            var relatedChildList = object.getMetadata()[KSInternalConstants.OBJECTS_RELATIONSHIPS];
            var objectNamesArray = [];
            for (var index = 0; index < relatedChildList.length; index++) {
                objectNamesArray[index] = relatedChildList[index][KSInternalConstants.RELATIONSHIP_TARGET_OBJECT];
            }
            return objectNamesArray;
        }


        /**
         * This method returns namespaceMetadataDictionary for an syncable object
         * @param syncableObject
         * @return {namespaceMetadataDictionary/null}
         */
        function getNamespaceMetadataMap(syncableObject) {
          var rootMetadata = syncableObject.getMetadata();
          var result = KSCommonUtils.isNullOrEmptyObject(rootMetadata) ? null :
              rootMetadata[KSInternalConstants.NAMESPACE_METADATA_DICTIONARY];
          return result;
        }

        /** Returns the action create, update or delete associated with namespaceDictionary
         * @param namespaceDictionary
         * @return action
         */
        function getActionFromIncrementalJSONNode(namespaceDictionary) {
            voltmx.sdk.logsdk.trace(LOG_PREFIX + "[getActionFromIncrementalJSONNode] called...");
            var action = namespaceDictionary[KSInternalConstants.ACTION];

            if (KSCommonUtils.isNullOrEmptyObject(action)) {
                action = KSDatabaseConstants.KSAction.UPDATE;
            }

            return action;
        }

        /**
         * The method returns a relationship object from a list of relationships by object names
         *
         * @param relationships The list of relationships
         * @param parentName    The parent object anme
         * @param childName     The child object name
         * @return The relationship
         */
        function getRelationshipObjectBetweenObjectsByName(relationships, parentName, childName) {
            var relationshipObject = null;
            for (var relationshipIndex in  relationships) {
                var relationship = relationships[relationshipIndex];
                if (relationship[KSInternalConstants.RELATIONSHIP_SOURCE_OBJECT][KSInternalConstants.NAME].toLowerCase() ===
                    parentName.toLowerCase() &&
                    relationship[KSInternalConstants.RELATIONSHIP_TARGET_OBJECT][KSInternalConstants.NAME].toLowerCase() ===
                    childName.toLowerCase()) {
                    relationshipObject = relationship;
                    break;
                }
            }

            return relationshipObject;
        }

        exports.mergeJSONObjects = mergeJSONObjects;
        exports.parseSetupMetadataJSON = parseSetupMetadataJSON;
        exports.getNamespaceMetadataMap = getNamespaceMetadataMap;
        exports.normalizedNamespaceName = normalizedNamespaceName;
        exports.getRelatedObjectNameList = getRelatedObjectNameList;
        exports.getMetaTableCreateQueries = getMetaTableCreateQueries;
        exports.normalizedFullyQualifiedName = normalizedFullyQualifiedName;
        exports.objectNameFromFullyQualifiedName = objectNameFromFullyQualifiedName;
        exports.getActionFromIncrementalJSONNode = getActionFromIncrementalJSONNode;
        exports.doesHierarchyExistInSyncableObject = doesHierarchyExistInSyncableObject;
        exports.insertIntoMetadataAndMetaInfoTables = insertIntoMetadataAndMetaInfoTables;
        exports.namespaceNameFromFullyQualifiedName = namespaceNameFromFullyQualifiedName;
        exports.doesObjectHaveAutoGeneratedPrimaryKey = doesObjectHaveAutoGeneratedPrimaryKey;
        exports.createUpdateDeleteTablesForAllObjectServices = createUpdateDeleteTablesForAllObjectServices;
        exports.updatingPropertiesTableDBSchemaVersion = updatingPropertiesTableDBSchemaVersion;
        exports.getQueriesToCreateTablesForObjectService = getQueriesToCreateTablesForObjectService;
        exports.getRelationshipObjectBetweenObjectsByName = getRelationshipObjectBetweenObjectsByName;
        exports.insertOrReplaceIntoMetadataAndMetaInfoTable = insertOrReplaceIntoMetadataAndMetaInfoTable;
        exports.getAttributeMetadataForObjectAndAttributeName = getAttributeMetadataForObjectAndAttributeName;
        exports.normalizedFullyQualifiedNameForNamespaceNameAndObjectName = normalizedFullyQualifiedNameForNamespaceNameAndObjectName;
    });

/**
 * Network wrapper for Offline objects.
 */
define("KSNetworkUtils", ["exports", "KSSyncMFUtils", "KSCommonUtils", "KSError"], function (exports, KSSyncMFUtils, KSCommonUtils, _KSError) {

    "use strict";
    exports._esModule = true;

    var logger = voltmx.sdk.logsdk;
    var KSError = _KSError.KSError;
    var LOG_PREFIX = "KSNetworkUtils : ";
    var networkProvider = new voltmxNetworkProvider();
    var KSErrorConstants = voltmx.sdk.OfflineObjects.KSErrorConstants;
    var KSPublicConstants = voltmx.sdk.OfflineObjects.KSPublicConstants;
    var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;

    /**
     * Method to make GET calls to the server.
     * @param {string} syncServerAddress URL from where the download should occur.
     * @param {Object} queryParams JSON object containing URL query parameters, if any.
     * @param {Object} headers JSON object containing the headers to be sent.
     * @param {Object} options JSON object containing options to make the call.
     * @param {function} successCallback Function for success scenario.
     * @param {function} failureCallback Function for error scenario.
     */
    var get = function (syncServerAddress, queryParams, headers, options, successCallback, failureCallback) {
        var consolidatedHeaders = getConsolidatedHeaders(headers);
        var url = syncServerAddress;

        if(!voltmx.sdk.isNullOrUndefined(queryParams)) {
            validateParamKeysAndValues(queryParams);
            options[KSPublicConstants.QUERY_PARAMS] = queryParams;
        }

        var networkSuccessCallback = function (response) {
            logger.debug(LOG_PREFIX + "Response body of network call : " + JSON.stringify(response));
            successCallback(response);
        };

        var networkFailureCallback = function (errorObj) {
            var error;
            if (errorObj.errcode === voltmx.sdk.errorcodes.invalid_json_code) {
                error = new KSError(KSErrorConstants.NW_INVALID_RESPONSE_OBJECT, errorObj);
            } else if (errorObj.errcode === voltmx.sdk.errorcodes.connectivity_error_code) {
                error = new KSError(KSErrorConstants.NW_CONNECTION_TIMEOUT_ERROR, errorObj);
            } else if (errorObj.errcode === voltmx.sdk.errorcodes.integrity_check_failed) {
                error = new KSError(KSErrorConstants.NW_MESSAGE_INTEGRITY_FAILURE, errorObj);
            } else {
                error = new KSError(KSErrorConstants.GENERIC_NETWORK_ERROR, errorObj);
            }

            failureCallback(error);
        };

        logger.debug(LOG_PREFIX + "URL : " + url);
        //Sending null for params and voltmxContentType for the GET call..
        networkProvider.get(url, null, consolidatedHeaders, networkSuccessCallback, networkFailureCallback, null, options);
    };

    /**
     * Method to make POST calls to the server.
     * @param {string} syncServerAddress URL from where the download should occur.
     * @param {Object} queryParams JSON object containing URL query parameters, if any.
     * @param {Object} headers JSON object containing the headers to be sent.
     * @param {Object} body JSON object containing the body to be posted to the server.
     * @param {Object} options JSON object containing options to make the call.
     */
    var post = function (syncServerAddress, queryParams, headers, body, options) {

        var consolidatedHeaders = getConsolidatedHeaders(headers);
        var url = syncServerAddress;

        if(!voltmx.sdk.isNullOrUndefined(queryParams)) {
            validateParamKeysAndValues(queryParams);
            options[KSPublicConstants.QUERY_PARAMS] = queryParams;
        }

        //Check and add empty object..
        if (voltmx.sdk.isNullOrUndefined(body)) {
            body = {};
        }

        var networkPromise = new Promise(function (resolve, reject) {

            function networkSuccessCallback(response) {
                logger.debug(LOG_PREFIX + "Response body of network call : " + JSON.stringify(response));
                resolve(response);
            }

            function networkFailureCallback(errorObj) {
                var error;
                if (errorObj.errcode === voltmx.sdk.errorcodes.invalid_json_code) {
                    error = new KSError(KSErrorConstants.NW_INVALID_RESPONSE_OBJECT, errorObj);
                } else if (errorObj.errcode === voltmx.sdk.errorcodes.connectivity_error_code) {
                    error = new KSError(KSErrorConstants.NW_CONNECTION_TIMEOUT_ERROR, errorObj);
                } else if (errorObj.errcode === voltmx.sdk.errorcodes.integrity_check_failed) {
                    error = new KSError(KSErrorConstants.NW_MESSAGE_INTEGRITY_FAILURE, errorObj);
                } else if (errorObj.errcode === voltmx.sdk.errorcodes.connection_timeout) {
                    error = new KSError(KSErrorConstants.NW_CONNECTION_TIMEOUT_ERROR, errorObj);
                } else if (errorObj.errcode === voltmx.sdk.errorcodes.request_timed_out_code) {
                    error = new KSError(KSErrorConstants.NW_SOCKET_TIMEOUT, errorObj);
                } else if(errorObj.opstatus > KSInternalConstants.PARTIAL_SUCCESS_OPSTATUS_MAX_VALUE || errorObj.opstatus < KSInternalConstants.PARTIAL_SUCCESS_OPSTATUS_MIN_VALUE){
                    error = new KSError(KSErrorConstants.NW_INVALID_OPSTATUS_FROM_SERVER,errorObj);
                } else {
                    error = new KSError(KSErrorConstants.GENERIC_NETWORK_ERROR, errorObj);
                }
                reject(error);
            }

            logger.debug(LOG_PREFIX + "URL : " + url);
            //Sending 'application/json' as voltmxContentType to the network layer by default..
            networkProvider.post(url, body, consolidatedHeaders, networkSuccessCallback, networkFailureCallback, "application/json", options);
        });

        return networkPromise;
    };

    /**
     * Method to combine the default and user sent headers.
     * @param {Object} headers JSON object containing user sent headers.
     */
    function getConsolidatedHeaders(headers) {
        var consolidatedHeaders = {};

        //Adding the default headers..
        consolidatedHeaders[KSInternalConstants.CONTENT_TYPE] = KSInternalConstants.APPLICATION_JSON;
        consolidatedHeaders[KSInternalConstants.X_HTTP_METHOD_OVERRIDE] = KSInternalConstants.HTTP_METHOD_GET;

        //Set the reporting params..
        var reportingParams = KSSyncMFUtils.getReportingParams();
        if (KSCommonUtils.isNullOrEmptyObject(reportingParams)) {
            voltmx.sdk.logsdk.warn(LOG_PREFIX + "ReportingParams are either null or empty.");
        } else {
            consolidatedHeaders[KSInternalConstants.X_KONY_REPORTINGPARAMS] = reportingParams;
        }

        //Add the claims token..
        var token = KSSyncMFUtils.getToken();
        if (KSCommonUtils.isNullOrEmptyObject(token)) {
            voltmx.sdk.logsdk.warn(LOG_PREFIX + "Token sent is either null or empty.");
        } else {
            consolidatedHeaders[KSInternalConstants.X_KONY_AUTHORIZATION] = token;
        }
        //Merge the user sent headers..
        for (var key in headers) {
            consolidatedHeaders[key] = headers[key];
        }

        return consolidatedHeaders;
    }

    /**
     * Method to validate the queryParam key and value
     * @param key queryParam key
     * @param value value for the queryParamkey
     * @returns boolean returns true if valid else invalid
     */
    function isQueryParamKeyAndValueValid(key, value) {
        return voltmx.sdk.util.isValidString(key) && (voltmx.sdk.util.isValidString(value) || voltmx.sdk.util.isValidNumberType(value));
    }

    /**
     * Method to validate the query parameters to send them to the sdk network layer.
     * @param {Object} queryParams JSON object containing the query parameters.
     */
    function validateParamKeysAndValues(queryParams) {

        if (queryParams && Object.keys(queryParams).length > 0) {

            for (var key in queryParams) {
                if (!isQueryParamKeyAndValueValid(key, queryParams[key])) {
                    throw new KSError(KSErrorConstants.GENERIC_NETWORK_ERROR, "Null or empty string value found for query param : " + key);
                }
            }
        }
    }

    exports.get = get;
    exports.post = post;
});
/**
 * KSOptionsHelper
 * Created by Prasanthi Bonam on 29-05-2018.
 * Copyright © 2017 Kony. All rights reserved.
 */
define("KSOptionsHelper", ["exports", "KSError", "KSCommonUtils"], function (exports, _KSError, KSCommonUtils) {

    "use strict";
    exports._esModules = true;

    var logger = voltmx.sdk.logsdk;
    var KSError = _KSError.KSError;
    var LOG_PREFIX = "KSOptionsHelper : ";
    var KSErrorConstants = voltmx.sdk.OfflineObjects.KSErrorConstants;
    var KSPublicConstants = voltmx.sdk.OfflineObjects.KSPublicConstants;
    var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;
    var KSDataTypes = voltmx.sdk.OfflineObjects.KSDatabaseConstants.KSDataTypes;

    function validateSyncConfigPolicy(options) {
        var errorMessage;
        if (!options.hasOwnProperty(KSPublicConstants.SYNC_TYPE) ||
            options[KSPublicConstants.SYNC_TYPE] == KSPublicConstants.FULL_SYNC) {
            // If SyncType key is absent or the value for Sync Type is FullSync
            logger.info(LOG_PREFIX + "Enabling upload and Download for current Sync session.");
            validateSyncUploadOptions(options);
            validateSyncDownloadOptions(options);

        } else if (voltmx.sdk.isNullOrUndefined(options[KSPublicConstants.SYNC_TYPE])) {

            errorMessage = "Invalid value found for syncType option. It's either empty or null.";
            logger.error(LOG_PREFIX + errorMessage);
            throw new KSError(KSErrorConstants.SYNC_INVALID_SYNC_TYPE, errorMessage);

        } else if (options[KSPublicConstants.SYNC_TYPE] == KSPublicConstants.DOWNLOAD_ONLY) {
            logger.info(LOG_PREFIX + "Enabling Download only for current Sync session.");
            validateSyncDownloadOptions(options);

        } else if (options[KSPublicConstants.SYNC_TYPE] == KSPublicConstants.UPLOAD_ONLY) {

            logger.info(LOG_PREFIX + "Enabling Upload only for current Sync session.");
            validateSyncUploadOptions(options);

        } else {

            errorMessage = "Invalid value found for syncType option " + options[KSPublicConstants.SYNC_TYPE];
            logger.error(LOG_PREFIX + errorMessage);
            throw new KSError(KSErrorConstants.SYNC_INVALID_SYNC_TYPE, errorMessage);

        }

        logger.info(LOG_PREFIX, "Sync config policy validated.");
    }

    /**
     * Method to validate the user given options
     *
     * @param options Map containing primaryKeys map
     * @return {boolean} True if validation is successful, else false.
     */
    function arePrimaryKeysSentInOptionsValid(options) {
        logger.trace(LOG_PREFIX + "arePrimaryKeysSentInOptionsValid : ", "Start.");

        if (KSCommonUtils.isNullOrEmptyObject(options)) {
            logger.error(LOG_PREFIX, "Options cannot be null/empty. It must contain the primary key(s) of the record.");
            throw new KSError(KSErrorConstants.CRUD_NULL_OR_EMPTY_OPTIONS);
        }

        if (KSCommonUtils.isNullOrEmptyObject(options[KSPublicConstants.CRUD_OPTION_PRIMARY_KEYS])) {
            logger.error(LOG_PREFIX, "Primary keys supplied through options are either null or empty.");
            throw new KSError(KSErrorConstants.CRUD_NULL_OR_EMPTY_PRIMARY_KEY_VALUE);
        }

        //Validating primaryKeys
        if (arePrimaryKeysValid(options)) {
            logger.info(LOG_PREFIX, "PrimaryKeys validation is successful");
        }
        return true;
    }

    /**
     * Checks whether the validations have to be skipped or not
     *
     * @param options which contains skipValidation flag
     * @return true/false (true if flag is true else false)
     */
    function skipValidation(options) {
        var isSkipped = options && options[voltmx.sdk.OfflineObjects.KSCRUDConstants.CRUD_OPTION_SKIP_VALIDATION];
        if (isSkipped) {
            logger.info(LOG_PREFIX, "Validations are skipped.");
        }

        return isSkipped;
    }

    /**
     * Validates sdk object record attribute
     *
     * @param objectAttribute attribute object
     * @param value           sdk object record attribute value
     */
    function isValidAttribute(objectAttribute, value) {
        logger.trace(LOG_PREFIX + "isValidAttribute : ", "Start");
        logger.debug(LOG_PREFIX, "Validating SDK object record attribute " + objectAttribute[KSInternalConstants.ATTRIBUTES_NAME] +
            " with value " + value);

        var dataType = objectAttribute[KSInternalConstants.ATTRIBUTES_DATATYPE];
        var errorMessage;
        switch (dataType) {
            case KSDataTypes.NUMBER: {
                if (typeof value !== KSDataTypes.NUMBER) {
                    errorMessage = "Expected dataType for attribute " + objectAttribute[KSInternalConstants.ATTRIBUTES_NAME] +
                        " is " + objectAttribute[KSInternalConstants.ATTRIBUTES_DATATYPE] + " but actual dataType sent is " + typeof value;
                    logger.error(LOG_PREFIX, errorMessage);
                    throw new KSError(KSErrorConstants.CRUD_DATATYPE_OR_LENGTH_MISMATCH, errorMessage);
                }
                break;
            }
            case KSDataTypes.BOOLEAN: {
                if (typeof value !== KSDataTypes.BOOLEAN) {
                    errorMessage = "Expected dataType for attribute " + objectAttribute[KSInternalConstants.ATTRIBUTES_NAME] +
                        " is " + objectAttribute[KSInternalConstants.ATTRIBUTES_DATATYPE] + " but actual dataType sent is " + typeof value;
                    logger.error(LOG_PREFIX, errorMessage);
                    throw new KSError(KSErrorConstants.CRUD_DATATYPE_OR_LENGTH_MISMATCH, errorMessage);
                }
                break;
            }
            case KSDataTypes.STRING: {
                if (typeof value !== KSDataTypes.STRING) {
                    errorMessage = "Expected dataType for attribute " + objectAttribute[KSInternalConstants.ATTRIBUTES_NAME] +
                        " is " + objectAttribute[KSInternalConstants.ATTRIBUTES_DATATYPE] + " but actual dataType sent is " + typeof value;
                    logger.error(LOG_PREFIX, errorMessage);
                    throw new KSError(KSErrorConstants.CRUD_DATATYPE_OR_LENGTH_MISMATCH, errorMessage);
                }
                if (!objectAttribute[KSInternalConstants.ATTRIBUTES_AUTO_GENERATED]) {
                    var length = value.length;
                    var objectAttributeLength = objectAttribute[KSInternalConstants.ATTRIBUTES_LENGTH];
                    if ((objectAttributeLength > 0) && (length > objectAttributeLength)) {
                        errorMessage = "The validation for length failed for attribute with key " + objectAttribute[KSInternalConstants.ATTRIBUTES_NAME] +
                            " expected length " + objectAttributeLength + " actual length " + length;
                        logger.error(LOG_PREFIX, errorMessage);
                        throw new KSError(KSErrorConstants.CRUD_DATATYPE_OR_LENGTH_MISMATCH, errorMessage);
                    }
                }
                break;
            }
            case KSDataTypes.DATE:
                break;
            case KSDataTypes.BINARY:
                break;
        }

        logger.debug(LOG_PREFIX, "Attribute " + objectAttribute[KSInternalConstants.ATTRIBUTES_NAME] + " of type " + dataType + " is valid.");
    }

    /**
     * Validates primaryKeys
     * @param options Map containing the primaryKeysMap
     */
    function arePrimaryKeysValid(options) {
        logger.trace(LOG_PREFIX, "Start");

        if (options.hasOwnProperty(KSPublicConstants.CRUD_OPTION_PRIMARY_KEYS)) {
            var errorMessage;
            var primaryKeyValueMap = options[KSPublicConstants.CRUD_OPTION_PRIMARY_KEYS];

            //Check if primaryKeys is passed as null
            if (voltmx.sdk.isNullOrUndefined(primaryKeyValueMap)) {
                errorMessage = "primaryKeys is passed as null or undefined";
                logger.error(LOG_PREFIX, errorMessage);
                throw new KSError(KSErrorConstants.CRUD_NULL_OR_EMPTY_PRIMARY_KEY_VALUE, errorMessage);
            }

            if (KSCommonUtils.isInstanceOfMap(primaryKeyValueMap)) {
                logger.debug("Validating primary keys " + JSON.stringify(primaryKeyValueMap));
                if (Object.keys(primaryKeyValueMap).length > 0) {
                    var metadata = options[KSInternalConstants.OBJECT_METADATA];
                    KSCommonUtils.arePrimaryKeyAttributeValuesPresent(primaryKeyValueMap, metadata);

                    var primaryKeyAttributes = metadata[KSInternalConstants.OBJECTS_PRIMARY_KEYS];
                    for (var key in primaryKeyValueMap) {
                        if (primaryKeyValueMap.hasOwnProperty(key)) {
                            if (primaryKeyAttributes.hasOwnProperty(key)) {
                                var value = primaryKeyValueMap[key];
                                var attribute = metadata[KSInternalConstants.ATTRIBUTES][key];
                                isValidAttribute(attribute, value);
                            } else {
                                errorMessage = "primary key with name " + key + " is not a valid primary key";
                                logger.error(LOG_PREFIX, errorMessage);
                                throw new KSError(KSErrorConstants.CRUD_INVALID_OPTIONS, errorMessage);
                            }
                        }
                    }
                }
            } else {
                errorMessage = "primaryKeys should be of type map";
                logger.error(LOG_PREFIX, errorMessage);
                throw new KSError(KSErrorConstants.CRUD_INVALID_OPTIONS, errorMessage);
            }
        }

        return true;
    }

    /**
     * Check if the value for given key is valid
     * which accepts boolean true/false and String "true"/"false"
     *
     * @param options the crud options
     * @param key     to get the value for the given key
     * @return {boolean} In case of valid options return true, else false
     */
    function isValidBoolTypeOption(options, key) {
        logger.trace(LOG_PREFIX, "isValidBoolTypeOption: " + "Start");

        var isValid = false;
        var errorMessage = "";

        if (!KSCommonUtils.isNullOrEmptyObject(options) && options.hasOwnProperty(key)) {
            var value = options[key];

            if (typeof value === KSInternalConstants.DATA_TYPE_BOOLEAN || (typeof value === KSInternalConstants.DATA_TYPE_STRING &&
                (value === KSInternalConstants.BOOLEAN_VALUE_TRUE || value === KSInternalConstants.BOOLEAN_VALUE_FALSE))) {
                isValid = true;
                logger.debug(LOG_PREFIX + " : isValidBoolTypeOption", "The option " + key + " is set to " + value);
            } else {
                errorMessage = " The value for key " + key + " is invalid";
                logger.error(LOG_PREFIX + " : isValidBoolTypeOption", errorMessage);
                throw new KSError(KSErrorConstants.CRUD_INVALID_OPTIONS, errorMessage);
            }
        }
        return isValid;
    }

    /**
     * Gets the boolean value for the given key
     *
     * @param options      the crud options
     * @param key          to get the value for the given key
     * @param defaultValue is the default value of the key
     * @return the value for key if found, else the default value
     */
    function getOptionValueOrDefaultForGivenKey(options, key, defaultValue) {
        var valueForKey = defaultValue;

        if (!KSCommonUtils.isNullOrEmptyObject(options) && options.hasOwnProperty(key)) {
            valueForKey = (options[key].toString() === KSInternalConstants.BOOLEAN_VALUE_TRUE);
        }

        return valueForKey;
    }

    /**
     * Building queryParams to be sent during request.
     * @param options options sent during sync.
     * @param queryParamsKey key which can be "uploadQueryParams" or "downloadQueryParams"
     */
    function validateAndGetQueryParams(options, queryParamsKey){
        var queryParams = {};

        if (!KSCommonUtils.isNullOrEmptyObject(options)
            && !KSCommonUtils.isNullOrEmptyObject(options[queryParamsKey])
            && voltmx.sdk.util.isJsonObject(options[queryParamsKey])) {
            KSCommonUtils.mergeTwoJSONMaps(queryParams, options[queryParamsKey]);
        }

        return queryParams;
    }

    /**
     * Method to validate download options
     * @param syncConfig configuration passed while performing download sync operation
     */
    function validateSyncDownloadOptions(syncConfig) {
        validateDownloadBatchSize(syncConfig);
    }

    /**
     * Method to validate download batch size
     * @param syncConfig configuration passed while performing download sync operation
     */
    function validateDownloadBatchSize(syncConfig) {
        logger.debug(LOG_PREFIX, "validating download batchSize");
        var downloadBatchSize = syncConfig[KSPublicConstants.DOWNLOAD_BATCH_SIZE];
        switch (typeof downloadBatchSize) {
            case "string" :
            case  "number" :
                downloadBatchSize = parseInt(downloadBatchSize);
                downloadBatchSize = isNaN(downloadBatchSize) ? KSInternalConstants.DEFAULT_DOWNLOAD_BATCH_SIZE : downloadBatchSize;
                downloadBatchSize = (downloadBatchSize < 0) ? KSInternalConstants.DEFAULT_DOWNLOAD_BATCH_SIZE : downloadBatchSize;
                break;
            default :
                logger.debug(LOG_PREFIX + "resetting to default batchSize");
                downloadBatchSize = KSInternalConstants.DEFAULT_DOWNLOAD_BATCH_SIZE;
        }
        syncConfig[KSPublicConstants.DOWNLOAD_BATCH_SIZE] = downloadBatchSize;
    }

    /**
     * Method to validate upload options
     * @param syncConfig configuration passed while performing upload sync operation
     */
    function validateSyncUploadOptions(syncConfig) {
        validateUploadBatchSize(syncConfig);
    }

    /**
     * Method to validate upload batch size
     * @param syncConfig configuration passed while performing upload sync operation
     */
    function validateUploadBatchSize(syncConfig) {
        logger.trace(LOG_PREFIX, "Validating upload batchSize");
        var uploadBatchSize = syncConfig[KSPublicConstants.UPLOAD_BATCH_SIZE];
        switch (typeof uploadBatchSize) {
            case "string" :
            case  "number" :
                uploadBatchSize = parseInt(uploadBatchSize);
                uploadBatchSize = isNaN(uploadBatchSize) ? KSInternalConstants.DEFAULT_UPLOAD_BATCH_SIZE : uploadBatchSize;
                uploadBatchSize = (uploadBatchSize <= 0) ? KSInternalConstants.DEFAULT_UPLOAD_BATCH_SIZE : uploadBatchSize;
                break;
            default :
                logger.trace(LOG_PREFIX + "Resetting to default batchSize");
                uploadBatchSize = KSInternalConstants.DEFAULT_UPLOAD_BATCH_SIZE;
        }
        syncConfig[KSPublicConstants.UPLOAD_BATCH_SIZE] = uploadBatchSize;
    }

    /* Method to validate the options provided to Application level sync API
    * @param options                   Options provided to Application level sync API
    * @param objectServiceNamesList    List of ObjectService names from KSSetupManager
    * @return areOptionsValid          True if options are valid
    * @throws error                    error thrown if options are invalid
    */
    function areApplicationSyncOptionsValid(options, objectServiceNamesList) {
        var areOptionsValid = true;
        var errorMessage = null;

        checkAndSetApplicationSyncMode(options);
        var objectServicesOptionsKey = KSPublicConstants.APPLICATION_SYNC_OBJECT_SERVICES_OPTIONS;
        var value = (options.hasOwnProperty(objectServicesOptionsKey)) ? options[objectServicesOptionsKey] : null;

        if(voltmx.sdk.util.isJsonObject(value)) {
            var objectServicesOptions = value;
            for(var objectServiceName in objectServicesOptions) {

                if(!objectServiceNamesList.includes(objectServiceName)) {
                    errorMessage = "Invalid SDKObjectServiceName " + objectServiceName;
                    areOptionsValid = false;
                    break;
                }

                var objectServiceOption = objectServicesOptions[objectServiceName];
                if(!voltmx.sdk.util.isJsonObject(objectServiceOption)) {
                    errorMessage = "Options provided for Object Service :" + objectServiceName
                        + ". Expected JSON, found " + typeof(objectServiceOption);

                    areOptionsValid = false;
                    break;
                }
            }
        } else if(!voltmx.sdk.isNullOrUndefined(value)) {
            errorMessage = "Invalid data type sent for objectServicesOptions. Expected JSON, found " + typeof(value);
            areOptionsValid = false;
        }

        if(!areOptionsValid) {
            logger.error(LOG_PREFIX + "Application sync options provided are invalid." + errorMessage);
            throw new KSError(KSErrorConstants.APPLICATION_SYNC_INVALID_OPTIONS, errorMessage);
        }

        return areOptionsValid;
    }

    /**
     * Method to validate the application sync mode in the options
     * and set it to default option if invalid.
     *
     * @param options Options Provided to Application Sync API
     */
    function checkAndSetApplicationSyncMode(options) {
        var isValid = false;
        var syncModeKey = KSPublicConstants.APPLICATION_SYNC_MODE;
        var value = options.hasOwnProperty(syncModeKey) ? options[syncModeKey] : null;

        if(voltmx.sdk.util.isValidString(value)) {
            var syncMode = value.toLowerCase();

            if(syncMode === KSPublicConstants.APPLICATION_SYNC_PARALLEL || syncMode === KSPublicConstants.APPLICATION_SYNC_SEQUENTIAL) {
                options[syncModeKey] = syncMode;
                isValid = true;
                logger.debug(LOG_PREFIX, " : isSyncModeValid",
                    "The option " + syncModeKey + " is valid and is set to " + syncMode);
            }
        }

        if(!isValid) {
            options[syncModeKey] = KSPublicConstants.APPLICATION_SYNC_PARALLEL;
            logger.warn(LOG_PREFIX, "Empty or invalid value sent for "
                + syncModeKey + " option. Falling back to default value as " + KSPublicConstants.APPLICATION_SYNC_PARALLEL);
        }
    }

    /**
     * Checks whether incremental Setup is enabled
     * @param options
     * @return {boolean} true if enabled else false
     */
    function isIncrementalSetupEnabled(options) {
        var isIncrementalSetupEnabled = false;

        if(!voltmx.sdk.isNullOrUndefined(options)
        && options.hasOwnProperty(KSInternalConstants.INCREMENTAL_SETUP)
        && (options[KSInternalConstants.INCREMENTAL_SETUP] == true)) {
            isIncrementalSetupEnabled = true;
        }

        return isIncrementalSetupEnabled;
    }

    exports.skipValidation = skipValidation;
    exports.isValidAttribute = isValidAttribute;
    exports.arePrimaryKeysValid = arePrimaryKeysValid;
    exports.isValidBoolTypeOption = isValidBoolTypeOption;
    exports.validateSyncConfigPolicy = validateSyncConfigPolicy;
    exports.validateAndGetQueryParams = validateAndGetQueryParams;
    exports.validateSyncUploadOptions = validateSyncUploadOptions;
    exports.isIncrementalSetupEnabled = isIncrementalSetupEnabled;
    exports.areApplicationSyncOptionsValid = areApplicationSyncOptionsValid;
    exports.checkAndSetApplicationSyncMode = checkAndSetApplicationSyncMode;
    exports.arePrimaryKeysSentInOptionsValid = arePrimaryKeysSentInOptionsValid;
    exports.getOptionValueOrDefaultForGivenKey = getOptionValueOrDefaultForGivenKey;
});

/**
 * Module to help build request and process response.
 */
define("KSRequestResponseUtils", ["exports", "KSDownloadResponseParser", "KSCommonUtils", "KSUploadResponseParser", "KSMetadataUtils"],
    function (exports, _KSDownloadResponseParser, KSCommonUtils, _KSUploadResponseParser, KSMetadataUtils) {

        "use strict";
        exports._esModule = true;

        var logger = voltmx.sdk.logsdk;
        var LOG_PREFIX = "KSRequestResponseUtils : ";
        var KSDatabaseConstants = voltmx.sdk.OfflineObjects.KSDatabaseConstants;
        var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;
        var KSUploadResponseParser = _KSUploadResponseParser.KSUploadResponseParser;
        var KSDownloadResponseParser = _KSDownloadResponseParser.KSDownloadResponseParser;

        //------------------------------
        // OBJECT DOWNLOAD UTIL METHODS
        //------------------------------

        /**
         * Method to build the response object dictionary for object download response.
         * @param downloadResponse Response received from the network.
         * @param objectName Name of the object.
         * @param objectServiceName Name of the object service.
         * @returns {{}} Dictionary of objects containing parsed data, metadata.
         */
        function getObjectDownloadResponseDictionaryFromNetworkResponse(downloadResponse, objectName, objectServiceName) {
            logger.trace(LOG_PREFIX, "Building the object download response dictionary for object : " + objectName);
            var downloadResponseParser = new KSDownloadResponseParser();
            var sdkObjects = downloadResponseParser.getSDKObjectsListFromObjectDownloadResponse(downloadResponse, objectName, objectServiceName);
            var downloadSyncErrors = downloadResponseParser.getDownloadSyncErrors();

            //This gives ERR_MSG, ERR_CODE , OPSTATUS, HTTPSTATUS CODE, DELTACONTEXT
            var metadata = downloadResponseMetadataFromDownloadResponseObject(downloadResponse);

            var objectsDictionary = {};
            objectsDictionary[KSInternalConstants.DATA_OBJECTS] = sdkObjects;
            objectsDictionary[KSInternalConstants.METADATA_OBJECT] = metadata;

            if (!KSCommonUtils.isNullOrEmptyObject(downloadSyncErrors)) {
                objectsDictionary[KSInternalConstants.DOWNLOAD_SYNC_ERRORS] = downloadSyncErrors;
            }

            logger.debug(LOG_PREFIX, "Successfully built the object download response dictionary for object : "
                + objectName + " in object service: " + objectServiceName);
            return objectsDictionary;
        }

        /**
         * Method to build the metadata dictionary from download response.
         * @param downloadResponse Response obtained from network.
         * @returns {{}} Dictionary containing download metadata.
         */
        function downloadResponseMetadataFromDownloadResponseObject(downloadResponse) {
            logger.trace(LOG_PREFIX, "Building the response metadata dictionary for object download response.");

            var downloadResponseMetadata = {};
            downloadResponseMetadata[KSInternalConstants.METADATA] = downloadResponse[KSInternalConstants._METADATA];
            downloadResponseMetadata[KSInternalConstants.DELTA_CONTEXT] = downloadResponse[KSInternalConstants.DELTA_CONTEXT];
            downloadResponseMetadata[KSInternalConstants.OP_STATUS] = downloadResponse[KSInternalConstants.OP_STATUS];
            downloadResponseMetadata[KSInternalConstants.HTTP_STATUS_CODE] = downloadResponse[KSInternalConstants.HTTP_STATUS_CODE];
            if (!KSCommonUtils.isNullOrEmptyObject(downloadResponse[KSInternalConstants.ERR_CODE])) {
                downloadResponseMetadata[KSInternalConstants.ERR_CODE] = downloadResponse[KSInternalConstants.ERR_CODE];
            }
            if (!KSCommonUtils.isNullOrEmptyObject(downloadResponse[KSInternalConstants.ERR_MSG])) {
                downloadResponseMetadata[KSInternalConstants.ERR_MSG] = downloadResponse[KSInternalConstants.ERR_MSG];
            }
            return downloadResponseMetadata;
        }

        //--------------------------------------
        // OBJECT SERVICE DOWNLOAD UTIL METHODS
        //--------------------------------------

        /**
         * Method to build the response object dictionary for object service download response.
         * @param downloadResponse Response received from the network.
         * @param objectServiceName Name of the object service.
         * @returns {{}} Dictionary of objects containing parsed data, metadata.
         */
        function getObjectServiceDownloadResponseDictionaryFromNetworkResponse(downloadResponse, objectServiceName) {

            var downloadResponseParser = new KSDownloadResponseParser();
            var sdkObjects = downloadResponseParser.getSDKObjectsListFromObjectServiceDownloadResponse(downloadResponse, objectServiceName);

            var metadata = getDownloadResponseMetadataFromObjectServiceDownloadResponse(downloadResponse);

            var objectsDictionary = {};
            objectsDictionary[KSInternalConstants.DATA_OBJECTS] = sdkObjects;
            objectsDictionary[KSInternalConstants.METADATA_OBJECT] = metadata;

            var syncErrors = downloadResponseParser.getDownloadSyncErrors();
            if (!KSCommonUtils.isNullOrEmptyObject(syncErrors)) {
                objectsDictionary[KSInternalConstants.DOWNLOAD_SYNC_ERRORS] = syncErrors;
            }

            return objectsDictionary;
        }

        /**
         * Method to build the metadata dictionary from download response.
         * @param downloadResponse Response obtained from network.
         * @returns {{}} Dictionary containing download metadata.
         */
        function getDownloadResponseMetadataFromObjectServiceDownloadResponse(downloadResponse) {
            logger.trace(LOG_PREFIX, "Building the response metadata dictionary for object service download response.");

            var downloadResponseMetadata = {};
            downloadResponseMetadata[KSInternalConstants.METADATA] = getMetadataForObjectsFromDownloadResponse(downloadResponse);
            downloadResponseMetadata[KSInternalConstants.DELTA_CONTEXT] = downloadResponse[KSInternalConstants.DELTA_CONTEXT];
            downloadResponseMetadata[KSInternalConstants.OP_STATUS] = downloadResponse[KSInternalConstants.OP_STATUS];
            downloadResponseMetadata[KSInternalConstants.HTTP_STATUS_CODE] = downloadResponse[KSInternalConstants.HTTP_STATUS_CODE];
            return downloadResponseMetadata;
        }

        /**
         * Method to parse through the object metadata received in the object service download response.
         * @param downloadResponse Response obtained from network.
         * @returns {{}} Dictionary containing download metadata of each object.
         */
        function getMetadataForObjectsFromDownloadResponse(downloadResponse) {
            logger.trace(LOG_PREFIX, "Building the object metadata dictionary for object service download response.");

            var objectMetadataDictionary = {};
            var objects = downloadResponse[KSInternalConstants.OBJECTS_IN_RESPONSE];

            if (!voltmx.sdk.isNullOrUndefined(objects)) {
                for (var i = 0; i < objects.length; i++) {
                    var object = objects[i];
                    var objectDictionary = {};
                    var metadata = object[KSInternalConstants._METADATA];
                    if(!voltmx.sdk.isNullOrUndefined(metadata)) {
                        objectDictionary[KSInternalConstants.METADATA] = metadata;
                    }
                    objectDictionary[KSInternalConstants.OP_STATUS] = object[KSInternalConstants.OP_STATUS];
                    objectDictionary[KSInternalConstants.HTTP_STATUS_CODE] = object[KSInternalConstants.HTTP_STATUS_CODE];
                    if (!KSCommonUtils.isNullOrEmptyObject(object[KSInternalConstants.ERR_CODE])) {
                        objectDictionary[KSInternalConstants.ERR_CODE] = object[KSInternalConstants.ERR_CODE];
                    }
                    if (!KSCommonUtils.isNullOrEmptyObject(object[KSInternalConstants.ERR_MSG])) {
                        objectDictionary[KSInternalConstants.ERR_MSG] = object[KSInternalConstants.ERR_MSG];
                    }
                    objectMetadataDictionary[object[KSInternalConstants.NAME]] = objectDictionary;
                }
            }

            return objectMetadataDictionary;
        }

        /**
         * Constructs the upload payload from given SDKObjectRecords.
         * @param SDKObjectRecords  values to be populated in upload payload.
         * @return JSON of upload payload.
         */
        function buildUploadPayloadFromObjects(SDKObjectRecords) {
            var uploadRequestPayload = {};
            uploadRequestPayload[KSInternalConstants.CHECKSUM] = "";
            uploadRequestPayload[KSInternalConstants.SESSION_ID] = "";
            uploadRequestPayload[KSInternalConstants.ECHO] = [];
            uploadRequestPayload[KSInternalConstants.HAS_MORE_RECORDS] = "false";
            uploadRequestPayload[KSInternalConstants.ABORT_ON_ERROR] = "false";
            uploadRequestPayload[KSInternalConstants._METADATA] = {
                [KSInternalConstants.TOTAL_NAMESPACES]: "0",
                [KSInternalConstants.TOTAL_RECORDS]: "0",
                [KSInternalConstants.TOTAL_OBJECTS]: "0",
                [KSInternalConstants.RECORD_COUNT]: "0"
            };
            uploadRequestPayload[KSInternalConstants.RECORDS] = getRecordsJsonFromSDKObjectRecords(SDKObjectRecords);
            return uploadRequestPayload;
        }

        /**
         * Constructs a JSON array with element as record to upload.
         * @param SDKObjectRecords values to be populated in JSON array.
         * @return {Array} returns the JSON array
         */
        function getRecordsJsonFromSDKObjectRecords(SDKObjectRecords) {
            var jsonarray = [];
            var sdkRecordsLength = SDKObjectRecords.length;
            for (var index = 0; index < sdkRecordsLength; index++) {
                jsonarray.push(buildSDKObjectRecordJson(SDKObjectRecords[index]));
            }
            return jsonarray;
        }

        /**
         * Constructs a JSON from given SDKObjectRecord data.
         * @param SDKObjectRecord
         * @return {*} JSON of SDKObjectRecord data.
         */
        function buildSDKObjectRecordJson(SDKObjectRecord) {
            var dataJson = {};
            KSCommonUtils.mergeTwoJSONMaps(dataJson, SDKObjectRecord.getData());

            dataJson[KSInternalConstants._METADATA] = {
                [KSInternalConstants.OBJECT]: SDKObjectRecord.getParentObject().name,
                [KSInternalConstants.CHECKSUM]: SDKObjectRecord.getCheckSum(),
                [KSInternalConstants.ACTION]: SDKObjectRecord.getAction(),
                [KSInternalConstants.ROW_ID]: SDKObjectRecord.getRowId(),
                [KSInternalConstants.IGNORE_DUPLICATES]: "false",
            };
            return dataJson;
        }

        /**
         * This will parse the upload response and return the JSON which has DATA_OBJECTS and SYNC_ERRORS.
         * @param response  upload network response.
         * @return {*} JSON which has DATA_OBJECTS and SYNC_ERRORS.
         */
        function uploadResponseObjectsDictionaryFromJSONString(response) {
            var responseObjects = response[KSInternalConstants.OBJECTS];
            var uploadResponseParser = new KSUploadResponseParser(responseObjects);
            return uploadResponseParser.getRecordsToPersist();
        }

        /**
         * Returns $expand value available in the operation
         * $expand value will be available in only GET operation of the object
         * @param objectMetadata is metadata object containing operations defined on that KSSDKObject
         * @returns $expand string if defined in "get" operation, empty string otherwise
         */
        function getDollarExpandValueFromObjectOperations(objectMetadata) {

            var objectOperations = objectMetadata[KSInternalConstants.OBJECTS_OPERATIONS];
            if (!KSCommonUtils.isNullOrEmptyObject(objectOperations)) {

                var getOperationObject = objectOperations[KSInternalConstants.KSObjectOperationType.get];
                if (!KSCommonUtils.isNullOrEmptyObject(getOperationObject) &&
                    !KSCommonUtils.isNullOrEmptyObject(getOperationObject[KSInternalConstants.DOLLAR_EXPAND])) {

                    return getOperationObject[KSInternalConstants.DOLLAR_EXPAND];
                }
            }
            return KSInternalConstants.EMPTY_STRING;
        }

        /**
         * The method sorts the records Json with respect to replay sequence number
         *
         * @param arrayOne First array
         * @param arrayTwo Second array
         * @throws JSONException
         */
        function mergeArraysAndSortRecordsByReplaySequenceNumber(arrayOne, arrayTwo) {
            var records = arrayOne.concat(arrayTwo);

            function lowestReplaySequenceNumberOfHierarchy(hierarchicalRecordJson) {
                var rowId = hierarchicalRecordJson[KSInternalConstants._METADATA][KSInternalConstants.ROW_ID];
                if (rowId === KSInternalConstants.DEFAULT_RSN_OF_PREVIOUS_BATCH) {
                    var currentSDKObject = new KSSDKObject(
                        hierarchicalRecordJson[KSInternalConstants._METADATA][KSInternalConstants.OBJECT]);
                    var relatedObjectNamesArray = KSMetadataUtils.getRelatedObjectNameList(currentSDKObject);
                    var lowest = Number.MAX_SAFE_INTEGER;
                    for (var relatedObjectNameIndex in relatedObjectNamesArray) {
                        var relatedObjectName = relatedObjectNamesArray[relatedObjectNameIndex];
                        var relatedRecordsArray = hierarchicalRecordJson[relatedObjectName];
                        var currentRSN = Number.MAX_SAFE_INTEGER;
                        if (relatedRecordsArray.length > 0) {
                            for (var relatedRecordsArrayIndex = 0; relatedRecordsArrayIndex <
                            relatedRecordsArray.length; relatedRecordsArrayIndex++) {
                                var m = lowestReplaySequenceNumberOfHierarchy(
                                    relatedRecordsArray[relatedRecordsArrayIndex]);
                                if (m < currentRSN) {
                                    currentRSN = m;
                                }
                            }
                        }

                        if (currentRSN < lowest) {
                            lowest = currentRSN;
                        }

                    }
                    return lowest;
                } else {
                    return rowId;
                }
            }

            function compareFn(recordOne, recordTwo) {
                var rsnTwo = 0;
                try {
                    rsnTwo = lowestReplaySequenceNumberOfHierarchy(recordTwo);
                } catch (e) {
                    logger.debug(LOG_PREFIX + e.toString());
                }
                var rsnOne = 0;
                try {
                    rsnOne = lowestReplaySequenceNumberOfHierarchy(recordOne);
                } catch (e) {
                    logger.debug(LOG_PREFIX + e.toString());
                }
                //noinspection SubtractionInCompareTo
                return rsnOne - rsnTwo;
            }

            records.sort(compareFn);
            return records;
        }

        /**
         * Convert SDKObjectRecord to JSONObject
         *
         * @param record The SDKObject from which payload should be build
         * @return JSON of records
         */
        function convertSDKObjectRecordToJson(record) {
            var objectMetadata = record.getParentObject().getMetadata();
            var columnNames = Object.keys(objectMetadata[KSInternalConstants.ATTRIBUTES]);
            return buildRecordJsonUsingColumnNames(record, columnNames);
        }

        /**
         * Method builds payload from column names and record
         *
         * @param record Record for which Json needs to be build
         * @param columnNames Column names of the record
         * @return result json of record
         */
        function buildRecordJsonUsingColumnNames(record, columnNames) {
            var dataJson = {};
            for (var columnNameIndex in columnNames) {
                var columnName = columnNames[columnNameIndex];
                dataJson[columnName] = record.objectForKey(columnName);
            }

            //Remove binary columns from json
            var binaryAttributes = record.getParentObject().getMetadata()[KSInternalConstants.BINARY_ATTRIBUTES];
            if (!KSCommonUtils.isNullOrEmptyObject(binaryAttributes)) {
                var binaryAttributesKeySet = Object.keys(binaryAttributes);
                for (var binaryColumnName in binaryAttributesKeySet) {
                    delete dataJson[binaryColumnName];
                }
            }

            // Metadata
            var recordMetadataJson = {};

            recordMetadataJson[KSInternalConstants.OBJECT] = record.getParentObject().getFullyQualifiedName();
            recordMetadataJson[KSInternalConstants.CHECKSUM] = record.getCheckSum();
            recordMetadataJson[KSInternalConstants.ACTION] = record.getAction();
            recordMetadataJson[KSInternalConstants.IGNORE_DUPLICATES] = record.getRecordMetadata()[KSInternalConstants.IGNORE_DUPLICATES] ===
            'true' ? 'true' : 'false';
            recordMetadataJson[KSInternalConstants.ROW_ID] = !KSCommonUtils.isNullOrEmptyObject(
                record.objectForKey(KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER)) ?
                record.objectForKey(KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER) :
                KSInternalConstants.DEFAULT_RSN_OF_PREVIOUS_BATCH;

            dataJson[KSInternalConstants._METADATA] = recordMetadataJson;

            return dataJson;
        }

        exports.convertSDKObjectRecordToJson = convertSDKObjectRecordToJson;
        exports.buildUploadPayloadFromObjects = buildUploadPayloadFromObjects;
        exports.buildRecordJsonUsingColumnNames = buildRecordJsonUsingColumnNames;
        exports.getDollarExpandValueFromObjectOperations = getDollarExpandValueFromObjectOperations;
        exports.uploadResponseObjectsDictionaryFromJSONString = uploadResponseObjectsDictionaryFromJSONString;
        exports.mergeArraysAndSortRecordsByReplaySequenceNumber = mergeArraysAndSortRecordsByReplaySequenceNumber;
        exports.getObjectDownloadResponseDictionaryFromNetworkResponse = getObjectDownloadResponseDictionaryFromNetworkResponse;
        exports.getObjectServiceDownloadResponseDictionaryFromNetworkResponse = getObjectServiceDownloadResponseDictionaryFromNetworkResponse;
    });
/**
 * Module to create query objects to perform operations on the indexed DB.
 */
define("KSSQLQueryGenerator", ["exports", "KSQueryObjectBuilder", "KSCommonUtils"], function (exports, KSQueryObjectBuilder, KSCommonUtils) {

    "use strict";
    var LOG_PREFIX = "KSSQLQueryGenerator : ";

    var logger = voltmx.sdk.logsdk;
    var KSTableType = voltmx.sdk.OfflineObjects.KSTableType;
    var KSDatabaseConstants = voltmx.sdk.OfflineObjects.KSDatabaseConstants;
    var KSDatabaseOperation = KSDatabaseConstants.KSDatabaseOperations;
    var KSInternalConstants = voltmx.sdk.OfflineObjects.KSInternalConstants;
    var KSSDKObjectRecordAction = voltmx.sdk.OfflineObjects.KSSDKObjectRecordAction;
    var KSDatabaseSchemaVersion = voltmx.sdk.OfflineObjects.KSDatabaseSchemaVersion;

    /**
     * Method to fetch a record from konysyncMetadataTable with PK objectServiceName.
     * @param objectServiceName
     * @returns {queryBuilderObject}
     */
    function getSelectQueryForMetadataTableProperties(objectServiceName) {
        var whereClause = {};
        whereClause[KSDatabaseConstants.METADATA_TABLE_OBJECT_SERVICE_NAME] = objectServiceName;

        return KSQueryObjectBuilder.getQueryObjectForTableName(KSDatabaseConstants.SQL_TABLE_KONY_SYNC_METADATA, KSDatabaseOperation.SELECT)
            .setWhereClause(whereClause)
            .build();
    }

    /**
     * Method to insert into konysyncMetadataTable.
     * @param objectServiceContext
     * @returns {queryBuilderObject}
     */
    function getMetaDataTableInsertQuery(objectServiceContext) {
        var info = {
            [KSDatabaseConstants.METADATA_TABLE_OBJECT_SERVICE_NAME]: objectServiceContext.name,
            [KSDatabaseConstants.METADATA_TABLE_DELTA_CONTEXT]: objectServiceContext.deltaContext,
            [KSDatabaseConstants.METADATA_TABLE_METADATA_JSON]: objectServiceContext.rootMetadataObject,
            [KSDatabaseConstants.METADATA_TABLE_VERSION]: objectServiceContext.objectServiceVersion
        };

        return KSQueryObjectBuilder.getQueryObjectForTableName(KSDatabaseConstants.SQL_TABLE_KONY_SYNC_METADATA, KSDatabaseOperation.INSERT)
            .addInsertValues(info)
            .build();
    }

    /**
     * Method to form MetadataTable insertorUpdate query
     * @param objectServiceContext
     * @return insertOrUpdateQuery for Metadata Table
     */
    function getMetadataTableInsertOrUpdateQuery(objectServiceContext) {
        var info = {
            [KSDatabaseConstants.METADATA_TABLE_OBJECT_SERVICE_NAME]: objectServiceContext.name,
            [KSDatabaseConstants.METADATA_TABLE_DELTA_CONTEXT]: objectServiceContext.deltaContext,
            [KSDatabaseConstants.METADATA_TABLE_METADATA_JSON]: objectServiceContext.rootMetadataObject,
            [KSDatabaseConstants.METADATA_TABLE_VERSION]: objectServiceContext.objectServiceVersion
        };

        return KSQueryObjectBuilder.getQueryObjectForTableName(KSDatabaseConstants.SQL_TABLE_KONY_SYNC_METADATA,
            KSDatabaseOperation.INSERT_OR_REPLACE)
            .addInsertValues(info)
            .build();
    }

    /**
     * Method to insert DBSchemaVersion with latest version number into voltmxSyncProperties table.
     * @returns {queryBuilderObject}
     */
    function getPropertiesTableInsertQuery() {
        var info = {
            [KSDatabaseConstants.PROPERTIES_TABLE_KEY_COLUMN]: KSDatabaseConstants.DB_SCHEMA_VERSION,
            [KSDatabaseConstants.PROPERTIES_TABLE_VALUE_COLUMN]: KSDatabaseSchemaVersion.getLatestVersion()
        };
        return KSQueryObjectBuilder.getQueryObjectForTableName(KSDatabaseConstants.SQL_TABLE_KONY_PROPERTIES, KSDatabaseOperation.INSERT)
            .addInsertValues(info)
            .build();
    }

    /**
     * Method to update DBSchemaVersion with latest version number into voltmxSyncProperties table.
     * @returns {queryBuilderObject}
     */
    function getPropertiesTableUpdateQueryForDBSchemaVersion() {
        var whereClause = {
            [KSDatabaseConstants.PROPERTIES_TABLE_KEY_COLUMN] : KSDatabaseConstants.DB_SCHEMA_VERSION
        };

        var updateMap = {
            [KSDatabaseConstants.PROPERTIES_TABLE_VALUE_COLUMN] : KSDatabaseSchemaVersion.getLatestVersion()
        };

        return KSQueryObjectBuilder.getQueryObjectForTableName(KSDatabaseConstants.SQL_TABLE_KONY_PROPERTIES,
            KSDatabaseOperation.UPDATE)
            .setUpdatedData(updateMap)
            .setWhereClause(whereClause)
            .build();
    }

    /**
     * Method to generate create 3 table queries(main, history and original) for an object metadata.
     * @param objectMetadata
     * @return {objectTableName: createQueryString,*}
     */
    function getQueriesToCreateTableForObject(objectMetadata) {
        var queries = {};

        var tableName = objectMetadata[KSInternalConstants.FULLY_QUALIFIED_NAME];
        var historyTableName = getTableNameWithType(tableName, KSTableType.HISTORY);
        var originalTableName = getTableNameWithType(tableName, KSTableType.ORIGINAL);

        logger.trace(LOG_PREFIX, "Began to generate create queries for object: " + tableName);

        queries[tableName] = getQueryToCreateTableForMainTable(objectMetadata);
        queries[historyTableName] = getQueryToCreateTableForHistoryTable(objectMetadata);

        //Since, original table contains same schema as main table.
        queries[originalTableName] = queries[tableName];

        logger.debug(LOG_PREFIX, "Successfully generated create queries for object: " + tableName);
        return queries;
    }

    /**
     * Method to create main table query for given objectMetadata
     * @param objectMetadata
     * @returns {string}
     */
    function getQueryToCreateTableForMainTable(objectMetadata) {
        var query = "" + getPrimaryKeyClauseForCreateQueryMainTable(objectMetadata);
        query += "," + getNonPrimaryKeyAttributes(objectMetadata) +
            "," + getAttributeFragmentForMainTable();
        return query;
    }

    /**
     * Method to create history table query for given objectMetadata
     * @param objectMetadata
     * @returns {string}
     */
    function getQueryToCreateTableForHistoryTable(objectMetadata) {
        var query = "" + getPrimaryKeyClauseForCreateQueryHistoryTable();
        var attributes = Object.keys(objectMetadata[KSInternalConstants.ATTRIBUTES]);
        query += "," + attributes +
            "," + getAttributeFragmentForHistoryTable();
        return query;
    }

    /**
     * Method to get primary key clause for create main table query for given objectMetadata
     * @param objectMetadata
     * @returns {string}
     */
    function getPrimaryKeyClauseForCreateQueryMainTable(objectMetadata) {
        var primaryKeyClause = "";
        var primaryKeys = objectMetadata[KSInternalConstants.OBJECTS_PRIMARY_KEYS];

        var keyNames = Object.keys(primaryKeys);
        if (keyNames.length > 1) {
            //For compound primary keys, the first param in [] is the honoured as PK,
            //and the repeated key names get indexed.
            primaryKeyClause += "[" + keyNames.join(KSDatabaseConstants.TABLE_COMPOSITE_PRIMARY_KEY_CONNECTOR) + "]";
            primaryKeyClause += "," + keyNames;
        } else {
            primaryKeyClause += "&" + keyNames;
        }

        return primaryKeyClause;
    }

    /**
     * Method to get primary key clause for create history table query for given objectMetadata
     * @returns {string}
     */
    function getPrimaryKeyClauseForCreateQueryHistoryTable() {
        return "&" + KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER;
    }

    /**
     * Method to get non primary key attributes for create table query for given objectMetadata
     * @param objectMetadata
     * @returns {string[]}
     */
    function getNonPrimaryKeyAttributes(objectMetadata) {
        var attributes = Object.keys(objectMetadata[KSInternalConstants.ATTRIBUTES]);
        var primaryKeyAttributes = Object.keys(objectMetadata[KSInternalConstants.OBJECTS_PRIMARY_KEYS]);

        var nonPrimaryKeyAttributes = attributes;
        for (var primaryKeyIndex in primaryKeyAttributes) {
            var index = nonPrimaryKeyAttributes.indexOf(primaryKeyAttributes[primaryKeyIndex]);

            if (index !== -1) {
                nonPrimaryKeyAttributes.splice(index, 1);
            }
        }
        return nonPrimaryKeyAttributes;
    }

    //----------------------------------------------
    // Attribute fragments
    //----------------------------------------------
    function getAttributeFragmentForMainTable() {
        return [KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE, KSDatabaseConstants.UPLOAD_SESSION_NO, KSDatabaseConstants.KONY_SYNC_HASH_SUM];
    }

    function getAttributeFragmentForHistoryTable() {
        return [KSDatabaseConstants.UPLOAD_SESSION_NO, KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE,
            KSDatabaseConstants.KONY_SYNC_CHANGE_TIME, KSDatabaseConstants.KONY_SYNC_HASH_SUM];
    }

    function getSelectQueryForMetaInfoTable(objectServiceName) {
        var whereClause = {};
        whereClause[KSInternalConstants.SCOPE_NAME] = objectServiceName;

        return KSQueryObjectBuilder.getQueryObjectForTableName(KSDatabaseConstants.SQL_TABLE_KONY_SYNC_META_INFO, KSDatabaseOperation.SELECT)
            .setWhereClause(whereClause)
            .build();
    }

    function getUpdateQueryForMetaInfoTable(objectServiceName, metaInfo) {
        var whereClause = {};
        whereClause[KSInternalConstants.SCOPE_NAME] = objectServiceName;

        return KSQueryObjectBuilder.getQueryObjectForTableName(KSDatabaseConstants.SQL_TABLE_KONY_SYNC_META_INFO, KSDatabaseOperation.UPDATE)
            .setUpdatedData(metaInfo)
            .setWhereClause(whereClause)
            .build();
    }

    function getUpdateQueryForMetadataTable(objectServiceName, metaInfo) {
        var whereClause = {};
        whereClause[KSInternalConstants.OBJECT_SERVICE_NAME] = objectServiceName;

        return KSQueryObjectBuilder.getQueryObjectForTableName(KSDatabaseConstants.SQL_TABLE_KONY_SYNC_METADATA, KSDatabaseOperation.UPDATE)
            .setUpdatedData(metaInfo)
            .setWhereClause(whereClause)
            .build();
    }

    function getInsertQueryForMetaInfoTable(metaInfo) {
        return KSQueryObjectBuilder.getQueryObjectForTableName(KSDatabaseConstants.SQL_TABLE_KONY_SYNC_META_INFO, KSDatabaseOperation.INSERT)
            .addInsertValues(metaInfo)
            .build();
    }

    function getMetaInfoTableInsertQueryForObjectService(objectServiceName) {
        var metaInfo = {};
        metaInfo[KSDatabaseConstants.UPLOAD_SESSION_NO] = 0;
        metaInfo[KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER] = 0;
        metaInfo[KSDatabaseConstants.LAST_GENERATED_ID] = -1;
        metaInfo[KSInternalConstants.SCOPE_NAME] = objectServiceName;

        return getInsertQueryForMetaInfoTable(metaInfo);
    }


    /**
     * Method to build queryObjects for the classified records for upload/download flow.
     * @param classifiedRecords Dictionary of records classified according to record action type.
     * @param forUploadSuccess Boolean which states if the query if for upload/download.
     * @returns {Array} Array of query objects to be persisted.
     */
    function getSQLDataQueries(classifiedRecords, forUploadSuccess) {

        var queryObjects = [];

            if (!KSCommonUtils.isNullOrEmptyObject(classifiedRecords)) {
                Array.prototype.push.apply(queryObjects, getSQLDataBulkQueriesForRecords(classifiedRecords, KSTableType.MAIN, forUploadSuccess));
            }

        return queryObjects;
    }

    /**
     * Method to build the insert query object on original table.
     * @param record Record to be inserted.
     * @param actionType Record action type.
     */
    function getInsertQueryObjectForOriginalTable(record, actionType) {

        var insertData = {};
        KSCommonUtils.mergeTwoJSONMaps(insertData, record.getData());
        insertData[KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE] = actionType;
        insertData[KSDatabaseConstants.KONY_SYNC_HASH_SUM] = record.getCheckSum();

        var tableName = getTableNameWithType(record.parentObject.metadata.name, KSTableType.ORIGINAL);
        var builder = KSQueryObjectBuilder.getQueryObjectForTableName(tableName, KSDatabaseOperation.INSERT_OR_REPLACE);

        return builder.addInsertValues(insertData).build();

    }

    /**
     * Method to get the update queries for checksum during download flow.
     * @param records Records for which the checksum needs to be updated.
     * @param tableType Type of the table in which the updation should occur.
     * @returns {Array} Array of update query objects.
     */
    function getUpdateChecksumQueryObject(records, tableType) {

        var queryObjects = [];

        if (!KSCommonUtils.isNullOrEmptyObject(records)) {

            var tableName = getTableNameWithType(records.parentObject.metadata.name, tableType);
            var builder = KSQueryObjectBuilder.getQueryObjectForTableName(tableName, KSDatabaseOperation.UPDATE);

                var updateMap = {};
                updateMap[KSDatabaseConstants.KONY_SYNC_HASH_SUM] = records.getCheckSum();
                var primaryKeys = records.getPrimaryKeyValueMapOfRecord(records.getParentObject().getPrimaryKeys());
                queryObjects.push(builder.setUpdatedData(updateMap)
                    .setWhereClause(primaryKeys)
                    .build());
        }

        return queryObjects;
    }

    /**
     * Method to build select queryObjects.
     * @param tableName Name of the table from which a record needs to be READ.
     * @param tableType Type of the table to be READ from.
     * @param whereClause Dictionary containing the where clause.
     * @param orderBy Dictionary for reading in a order.
     * @param limit to limit the result data
     * @param groupByMap list of fields upon which group by has to be performed
     * @param projectionColoumn lits of fields on which view has to be made
     * @param groupIndex give this value as null for a 2d list of records which is analogous to sql's grouped result
     */
    function buildPreparedStatementsOfTypeRead(tableName, tableType, whereClause, orderBy
        , limit, groupByMap, projectionColoumn, groupIndex) {
        tableName = getTableNameWithType(tableName, tableType);
        var builder = KSQueryObjectBuilder.getQueryObjectForTableName(tableName, KSDatabaseOperation.SELECT);

        return builder.setProjectionColumns(projectionColoumn)
        .setWhereClause(whereClause)
        .addOrderByMap(orderBy)
        .setLimit(limit)
        .addGroupByList(groupByMap)
        .addGroupByIndex(groupIndex)
        .build();
    }

    /**
     * Method to build select queryObjects.
     * @param tableName Name of the table from which a record needs to be READ.
     * @param tableType Type of the table to be READ from.
     * @param whereClause String containing the where clause.
     * @param orderBy Dictionary for reading in a order.
     */
    function buildStatementOfTypeReadWithWhereConditionAsString(tableName, tableType, whereClause, orderBy, limit) {
        tableName = getTableNameWithType(tableName, tableType);
        var builder = KSQueryObjectBuilder.getQueryObjectForTableName(tableName, KSDatabaseOperation.SELECT);

        return builder.setWhereClauseAsString(whereClause)
            .addOrderByMap(orderBy)
            .setLimit(limit)
            .build();
    }

    /**
     * Method to build delete queryObjects.
     * @param tableName Name of the table from which a record needs to be Deleted.
     * @param tableType Type of the table to be Deleted.
     * @param whereClause Dictionary containing the where clause.
     */
    function buildPreparedStatementsOfTypeDelete(tableName, tableType, whereClause) {
        tableName = getTableNameWithType(tableName, tableType);
        var builder = KSQueryObjectBuilder.getQueryObjectForTableName(tableName, KSDatabaseOperation.DELETE);

        return builder.setWhereClause(whereClause)
            .build();
    }

    /**
     * Method to build delete queryObjects.
     * @param tableName Name of the table from which a record needs to be Deleted.
     * @param tableType Type of the table to be Deleted.
     * @param whereClause String containing the where clause.
     */
    function buildStatementsOfTypeDeleteWithWhereConditionAsString(tableName, tableType, whereClause) {
        tableName = getTableNameWithType(tableName, tableType);
        var builder = KSQueryObjectBuilder.getQueryObjectForTableName(tableName, KSDatabaseOperation.DELETE);

        return builder.setWhereClauseAsString(whereClause)
            .build();
    }

    /**
     * Method to build update queryObjects.
     * @param tableName Name of the table from which a record needs to be Updated.
     * @param tableType Type of the table to be Updated.
     * @param whereMap Dictionary containing the where clause.
     * @param updateMap Dictionary containing the update clause.
     */
    function buildPreparedStatementsOfTypeUpdate(tableName, tableType, whereMap, updateMap) {
        tableName = getTableNameWithType(tableName, tableType);
        var builder = KSQueryObjectBuilder.getQueryObjectForTableName(tableName, KSDatabaseOperation.UPDATE);

        return builder.setUpdatedData(updateMap)
            .setWhereClause(whereMap)
            .build();
    }

    /**
     * Method to build update queryObjects.
     * @param tableName Name of the table from which a record needs to be Updated.
     * @param tableType Type of the table to be Updated.
     * @param whereMap String containing the where clause.
     * @param updateMap Dictionary containing the update clause.
     */
    function buildStatementsOfTypeUpdateWithWhereConditionAsString(tableName, tableType, whereMap, updateMap) {
        tableName = getTableNameWithType(tableName, tableType);
        var builder = KSQueryObjectBuilder.getQueryObjectForTableName(tableName, KSDatabaseOperation.UPDATE);

        return builder.setUpdatedData(updateMap)
            .setWhereClauseAsString(whereMap)
            .build();
    }

    /**
     * Method to build insert queryObjects.
     * @param tableName Name of the table from which a record needs to be Inserted.
     * @param tableType Type of the table to be Inserted.
     * @param insertValueMap Dictionary containing the insert map.
     */
    function buildPreparedStatementsOfTypeCreate(tableName, tableType, insertValueMap) {
        tableName = getTableNameWithType(tableName, tableType);
        var builder = KSQueryObjectBuilder.getQueryObjectForTableName(tableName, KSDatabaseOperation.INSERT);

        return builder.addInsertValues(insertValueMap)
            .build();
    }

    /**
     * Method to build insert or replace queryObjects.
     * @param tableName Name of the table from which a record needs to be Inserted or Replaced.
     * @param tableType Type of the table to be Inserted or Replace.
     * @param insertValueMap Dictionary containing the insert map.
     */
    function buildQueryObjectsOfTypeInsertOrReplace(tableName, tableType, insertValueMap) {
        tableName = getTableNameWithType(tableName, tableType);
        var builder = KSQueryObjectBuilder.getQueryObjectForTableName(tableName, KSDatabaseOperation.INSERT_OR_REPLACE);

        return builder.addInsertValues(insertValueMap)
            .build();
    }


    /**
     * Method which generates queryObjects for records to be persisted.
     * @param {Array} recordsToPersist Array of records to be persisted.
     * @param {KSTableType} tableType Type of table in which the persistence should take place.
     * @param {Boolean} forUploadSuccess Boolean which states if this if the queries are for upload or download flow.
     * @returns {Array} Array of query objects generated.
     */
    function getSQLDataBulkQueriesForRecords(recordsToPersist, tableType, forUploadSuccess) {
        var queryObjects = [];

        if (!KSCommonUtils.isNullOrEmptyObject(recordsToPersist)) {
            var recordAction = recordsToPersist[0].getAction();

            switch (recordAction) {
                case KSSDKObjectRecordAction.CREATE :
                    queryObjects = getBulkCreateQueryForRecords(recordsToPersist, tableType);
                    break;
                case KSSDKObjectRecordAction.UPDATE :
                    queryObjects = getBulkUpdateQueryForRecords(recordsToPersist, tableType, forUploadSuccess);
                    break;
                case KSSDKObjectRecordAction.PARTIAL_UPDATE :
                    queryObjects = getPartialUpdateQueriesForRecords(recordsToPersist, tableType);
                    break;
                case KSSDKObjectRecordAction.DELETE :
                    queryObjects = getDeleteQueriesForRecords(recordsToPersist, tableType);
                    break;
                default :
                    logger.debug(LOG_PREFIX, "No queryObjects can be created for given record action.");
            }
        }

        return queryObjects;
    }

    /**
     * Method to create queryObject for bulk create operation.
     * @param recordsToPersist Array of records to be created.
     * @param tableType Type of table in which the creation should occur.
     */
    function getBulkCreateQueryForRecords(recordsToPersist, tableType) {

        var tableName = getTableNameWithType(recordsToPersist[0].getParentObject().name, tableType);
        var builder = KSQueryObjectBuilder.getQueryObjectForTableName(tableName, KSDatabaseOperation.INSERT);

        for (var i = 0; i < recordsToPersist.length; i++) {
            var dataForInsertion = getDataForInsertion(recordsToPersist[i], tableType);
            builder.addInsertValues(dataForInsertion);
        }

        return [builder.build()];
    }

    /**
     * Method to create queryObject for bulk UPDATE operation.
     * @param recordsToPersist Array of records to be updated.
     * @param tableType Type of table in which the updation should occur.
     * @param forUploadSuccess Boolean depicting upload or download flow.
     * @returns [] object with bulk UPDATE values.
     */
    function getBulkUpdateQueryForRecords(recordsToPersist, tableType, forUploadSuccess) {

        var tableName = getTableNameWithType(recordsToPersist[0].getParentObject().name, tableType);

        if (forUploadSuccess) {
            //Reconcile auto gen PKs for upload..
        } else {
            var builder = KSQueryObjectBuilder.getQueryObjectForTableName(tableName, KSDatabaseOperation.INSERT_OR_REPLACE);

            for (var i = 0; i < recordsToPersist.length; i++) {
                var dataForInsertion = getDataForInsertion(recordsToPersist[i], tableType);
                builder.addInsertValues(dataForInsertion);
            }

            return [builder.build()];
        }
    }

    /**
     * Method to build the query objects for DELETE.
     * @param recordsToPersist Array of records to be deleted.
     * @param tableType Type of the table on which DELETE should happen.
     * @returns {Array} Array of query objects.
     */
    function getDeleteQueriesForRecords(recordsToPersist, tableType) {

        var queryObjects = [];
        var tableName = getTableNameWithType(recordsToPersist[0].getParentObject().name, tableType);

        for (var i = 0; i < recordsToPersist.length; i++) {
            var builder = KSQueryObjectBuilder.getQueryObjectForTableName(tableName, KSDatabaseOperation.DELETE);
            var primaryKeyValueMap = recordsToPersist[i].getPrimaryKeyValueMapOfRecord(recordsToPersist[i].getParentObject().getPrimaryKeys());
            queryObjects.push(builder.setWhereClause(primaryKeyValueMap).build());
        }

        return queryObjects;
    }

    /**
     * Method to build query objects for partial updates.
     * @param recordsToPersist Array of records to be partially updated.
     * @param tableType Type of the table on which partial UPDATE should happen.
     * @returns {Array} Array of query objects.
     */
    function getPartialUpdateQueriesForRecords(recordsToPersist, tableType) {

        var queryObjects = [];
        var tableName = getTableNameWithType(recordsToPersist[0].getParentObject().name, tableType);

        for (var i = 0; i < recordsToPersist.length; i++) {
            var builder = KSQueryObjectBuilder.getQueryObjectForTableName(tableName, KSDatabaseOperation.UPDATE);
            var primaryKeyValueMap = recordsToPersist[i].getPrimaryKeyValueMapOfRecord(recordsToPersist[i].getParentObject().getPrimaryKeys());
            queryObjects.push(builder.setUpdatedData(recordsToPersist.getData())
                .setWhereClause(primaryKeyValueMap)
                .build());
        }

        return queryObjects;
    }

    /**
     * Method to fetch the table name with the type.
     * @param {String} tableName Name of the table.
     * @param {KSTableType} tableType Type of the table.
     */
    function getTableNameWithType(tableName, tableType) {

        if (tableType === KSTableType.HISTORY) {
            return tableName + KSDatabaseConstants.TABLE_TYPE_CONNECTOR_CHARACTER + KSDatabaseConstants.TABLE_TYPE_HISTORY;
        } else if (tableType === KSTableType.ORIGINAL) {
            return tableName + KSDatabaseConstants.TABLE_TYPE_CONNECTOR_CHARACTER + KSDatabaseConstants.TABLE_TYPE_ORIGINAL;
        } else {
            return tableName;
        }
    }

    /**
     * Gives list of table names of main, history and original tables of given table
     * @param tableName
     * @returns {*[]} list of table names of main, history and original tables of given table
     */
    function getAllTableNames(tableName) {
        return [tableName,
            getTableNameWithType(tableName, KSTableType.HISTORY),
            getTableNameWithType(tableName, KSTableType.ORIGINAL)];
    }

    function getPreparedStatementToPerformActionOnMainTable(sdkObjectRecord, primaryKeyValue) {
        var action = sdkObjectRecord.getAction();
        var tableName = sdkObjectRecord.getParentObject().getFullyQualifiedName();
        switch (action) {
            case KSSDKObjectRecordAction.CREATE:
                return buildQueryObjectsOfTypeInsertOrReplace(tableName, KSTableType.MAIN, sdkObjectRecord.getData());
            case KSSDKObjectRecordAction.DELETE:
                return buildPreparedStatementsOfTypeDelete(tableName, KSTableType.MAIN, primaryKeyValue);
            case KSSDKObjectRecordAction.PARTIAL_UPDATE:
            case KSSDKObjectRecordAction.UPDATE:
                var dataToUpdate = {};
                KSCommonUtils.mergeTwoJSONMaps(dataToUpdate, sdkObjectRecord.getData());
                dataToUpdate[KSDatabaseConstants.KONY_SYNC_HASH_SUM] = sdkObjectRecord.getCheckSum();
                return buildPreparedStatementsOfTypeUpdate(tableName, KSTableType.MAIN, primaryKeyValue, dataToUpdate);
            default:
                break;
        }
    }

    /**
     * Method to fetch the meta columns according to the table type.
     * @param tableType Type of the table.
     * @returns {Array} Array of meta columns.
     */
    function getMetaColumnNames(tableType) {
        var metaColumnNames = [];

        //Adding konysynchashsum for all the tables..
        metaColumnNames.push(KSDatabaseConstants.KONY_SYNC_HASH_SUM);

        //Adding uploadsessionno and konysyncchangetype for original table..
        if (tableType !== KSTableType.MAIN) {
            metaColumnNames.push(KSDatabaseConstants.UPLOAD_SESSION_NO);
            metaColumnNames.push(KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE);
        }

        //Adding konysyncchangetime and replaysequencenumber for history table..
        if (tableType === KSTableType.HISTORY) {
            metaColumnNames.push(KSDatabaseConstants.KONY_SYNC_CHANGE_TIME);
            metaColumnNames.push(KSDatabaseConstants.REPLAY_SEQUENCE_NUMBER);
        }

        return metaColumnNames;
    }

    /**
     * Method to build the data for insertion.
     * @param record KSSDKRecord object.
     * @param tableType Type of the table on which the insertion data needs to me built.
     */
    function getDataForInsertion(record, tableType) {

        var metadata = record.getParentObject().getMetadata();
        var columnNames = Object.keys(metadata[KSInternalConstants.ATTRIBUTES]);
        Array.prototype.push.apply(columnNames, getMetaColumnNames(tableType));

        var dataForInsertion = {};

        for (var index = columnNames.length - 1; index >= 0; index--) {
            if (columnNames[index] === KSDatabaseConstants.KONY_SYNC_HASH_SUM) {
                dataForInsertion[columnNames[index]] = record.getCheckSum();
            } else if (columnNames[index] === KSDatabaseConstants.KONY_SYNC_CHANGE_TYPE) {
                dataForInsertion[columnNames[index]] = record.getAction();
            } else if (columnNames[index] === KSDatabaseConstants.UPLOAD_SESSION_NO) {
                dataForInsertion[columnNames[index]] = 0;
            } else {
                var data = record.getData()[columnNames[index]];

                if (typeof data !== 'undefined') {
                    dataForInsertion[columnNames[index]] = data;
                }
            }
        }

        return dataForInsertion;
    }

    exports.getAllTableNames = getAllTableNames;
    exports.getSQLDataQueries = getSQLDataQueries;
    exports.getTableNameWithType = getTableNameWithType;
    exports.getMetaDataTableInsertQuery = getMetaDataTableInsertQuery;
    exports.getUpdateChecksumQueryObject = getUpdateChecksumQueryObject;
    exports.getPropertiesTableInsertQuery = getPropertiesTableInsertQuery;
    exports.getSelectQueryForMetaInfoTable = getSelectQueryForMetaInfoTable;
    exports.getUpdateQueryForMetaInfoTable = getUpdateQueryForMetaInfoTable;
    exports.getUpdateQueryForMetadataTable = getUpdateQueryForMetadataTable;
    exports.getInsertQueryForMetaInfoTable = getInsertQueryForMetaInfoTable;
    exports.getQueriesToCreateTableForObject = getQueriesToCreateTableForObject;
    exports.buildPreparedStatementsOfTypeRead = buildPreparedStatementsOfTypeRead;
    exports.buildPreparedStatementsOfTypeDelete = buildPreparedStatementsOfTypeDelete;
    exports.buildPreparedStatementsOfTypeUpdate = buildPreparedStatementsOfTypeUpdate;
    exports.buildPreparedStatementsOfTypeCreate = buildPreparedStatementsOfTypeCreate;
    exports.getMetadataTableInsertOrUpdateQuery = getMetadataTableInsertOrUpdateQuery;
    exports.getInsertQueryObjectForOriginalTable = getInsertQueryObjectForOriginalTable;
    exports.buildQueryObjectsOfTypeInsertOrReplace = buildQueryObjectsOfTypeInsertOrReplace;
    exports.getSelectQueryForMetadataTableProperties = getSelectQueryForMetadataTableProperties;
    exports.getMetaInfoTableInsertQueryForObjectService = getMetaInfoTableInsertQueryForObjectService;
    exports.getPreparedStatementToPerformActionOnMainTable = getPreparedStatementToPerformActionOnMainTable;
    exports.getPropertiesTableUpdateQueryForDBSchemaVersion = getPropertiesTableUpdateQueryForDBSchemaVersion;
    exports.buildStatementOfTypeReadWithWhereConditionAsString = buildStatementOfTypeReadWithWhereConditionAsString;
    exports.buildStatementsOfTypeDeleteWithWhereConditionAsString = buildStatementsOfTypeDeleteWithWhereConditionAsString;
    exports.buildStatementsOfTypeUpdateWithWhereConditionAsString = buildStatementsOfTypeUpdateWithWhereConditionAsString;
});
define("KSSyncErrorUtils", ["exports", "KSCommonUtils"], function (exports, KSCommonUtils) {
    exports._esModule = true;
    "use strict";

    var KSPublicConstants = voltmx.sdk.OfflineObjects.KSPublicConstants;

    /**
     * Returns the list of error messages in given format ObjectService:<>#Object:<>#Keys: PK1~ PK2#Error: error message
     * @param objectServiceName The Object Service Name
     * @param objectName  The Object Name
     * @param primaryKeyValueMap  Primary Key Value in a map
     * @param opstatus  opstatus from the request
     * @param errorMessages  ErrorMessages List
     * @returns {Array}
     */
    function getSyncErrorsForObject(objectServiceName, objectName, primaryKeyValueMap, opstatus, errorMessages) {
        var syncErrors = {};
        if (!KSCommonUtils.isNullOrEmptyObject(objectServiceName)) {
            syncErrors[KSPublicConstants.OBJECT_SERVICE] = objectServiceName;
        }
        if (!KSCommonUtils.isNullOrEmptyObject(objectName)) {
            syncErrors[KSPublicConstants.OBJECT] = objectName;
        }
        if (!KSCommonUtils.isNullOrEmptyObject(primaryKeyValueMap)) {
            syncErrors[KSPublicConstants.PRIMARY_KEYS] = primaryKeyValueMap;
        }
        if (!KSCommonUtils.isNullOrEmptyObject(opstatus)) {
            syncErrors[KSPublicConstants.OPSTATUS] = opstatus;
        }

        var errorList = [];

        if (!KSCommonUtils.isNullOrEmptyObject(errorMessages)) {
            for (var index = errorMessages.length - 1; index >= 0; index--) {
                syncErrors[KSPublicConstants.ERRMSG] = errorMessages[index];
                errorList.push(syncErrors);
            }
        }
        return errorList;
    }

    /**
     * Returns the list of strings in a format
     *
     * @param objectServiceName The Object Service Name
     * @param errorMessageForGivenObject The errorMessage for the given Object
     * @param primaryKeyValuePair   The Primary Key Value Pair
     * @param opStatus  The opStatus
     * @param objectName  The ObjectName
     * @returns {Array}
     */
    function formatSyncErrors(objectServiceName, errorMessageForGivenObject, primaryKeyValuePair, opStatus, objectName) {

        if (!KSCommonUtils.isNullOrEmptyObject(errorMessageForGivenObject)) {
            return getSyncErrorsForObject(objectServiceName, objectName, primaryKeyValuePair, opStatus, errorMessageForGivenObject);
        }
        return [];
    }

    exports.formatSyncErrors = formatSyncErrors;

});
/**
 * Class to set the MF token and reporting parameters.
 */
define("KSSyncMFUtils", ["exports"], function(exports) {

    "use strict";
    var _token;
    var _reportingParams;

    //TODO: should we clone these properties?
    var setToken = function(token) {
        _token = token;
    };

    var getToken = function() {
        return _token;
    };

    var setReportingParams = function(reportingParams) {
        _reportingParams = reportingParams;
    };

    var getReportingParams = function() {
        return _reportingParams;
    };

    exports.setToken = setToken;
    exports.getToken = getToken;
    exports.setReportingParams = setReportingParams;
    exports.getReportingParams = getReportingParams;
});
define("OfflineObjectsSPA", ["KSApplicationSync", "KSError", "SDKObjectSync", "SDKObjectServiceSync"],
    function (KSApplicationSync, _KSError, _SDKObjectSync, _SDKObjectServiceSync) {

	var LOG_PREFIX = "OfflineObjectsSPA:";
	var logger = voltmx.sdk.logsdk;
	var KSError = _KSError.KSError;
	var KSErrorConstants = voltmx.sdk.OfflineObjects.KSErrorConstants;
	
        voltmx.sdk.OfflineObjects.setup = KSApplicationSync.setup;

        voltmx.sdk.OfflineObjects.drop = KSApplicationSync.drop;

        voltmx.sdk.OfflineObjects.reset = KSApplicationSync.reset;

        voltmx.sdk.OfflineObjects.setToken = KSApplicationSync.setToken;

        voltmx.sdk.OfflineObjects.setReportingParams = KSApplicationSync.setReportingParams;

        voltmx.sdk.OfflineObjects.rollback = KSApplicationSync.rollback;
		
		voltmx.sdk.OfflineObjects.startSync = KSApplicationSync.startSync;

        voltmx.sdk.VMXObj.startSync = function (vmxObj, syncConfig, successCallback, failureCallback, progressCallback) {
            var LOG_PREFIX = "voltmx.sdk.VMXObj.startSync";
            voltmx.sdk.logsdk.trace(" Entering " + LOG_PREFIX);
            var sdkObjectSync = vmxObj.getSdkObjectSync();
            sdkObjectSync.startSync(syncConfig, successCallback, failureCallback);
        };

        voltmx.sdk.VMXObj.createSDKObjectSync = function (name) {
            var LOG_PREFIX = "voltmx.sdk.VMXObj.createSDKObjectSync";
            voltmx.sdk.logsdk.trace(" Entering " + LOG_PREFIX);
            var sdkObjectSyncInstance = _SDKObjectSync.SDKObjectSync;
            var sdkObjectSync = new sdkObjectSyncInstance(name);
            return sdkObjectSync;
        };

        voltmx.sdk.VMXObj.create = function (vmxObj, record, options, successCallback, failureCallback) {
            var LOG_PREFIX = "voltmx.sdk.VMXObj.create";
            voltmx.sdk.logsdk.trace(" Entering " + LOG_PREFIX);
            var sdkObjectSync = vmxObj.getSdkObjectSync();
            sdkObjectSync.create(record, options, successCallback, failureCallback);
        };

        voltmx.sdk.VMXObj.update = function (vmxObj, record, options, successCallback, failureCallback) {
            var LOG_PREFIX = "voltmx.sdk.VMXObj.update";
            voltmx.sdk.logsdk.trace(" Entering " + LOG_PREFIX);
            var sdkObjectSync = vmxObj.getSdkObjectSync();
            sdkObjectSync.update(record, options, successCallback, failureCallback);
        };

        voltmx.sdk.VMXObj.updateByPK = function (vmxObj, record, options, successCallback, failureCallback) {
            var LOG_PREFIX = "voltmx.sdk.VMXObj.updateByPK";
            voltmx.sdk.logsdk.trace(" Entering " + LOG_PREFIX);
            var sdkObjectSync = vmxObj.getSdkObjectSync();
            sdkObjectSync.updateByPK(record, options, successCallback, failureCallback);
        };

        voltmx.sdk.VMXObj.deleteByPK = function (vmxObj, options, successCallback, failureCallback) {
            var LOG_PREFIX = "voltmx.sdk.VMXObj.deleteByPK";
            voltmx.sdk.logsdk.trace(" Entering " + LOG_PREFIX);
            var sdkObjectSync = vmxObj.getSdkObjectSync();
            sdkObjectSync.deleteByPK(options, successCallback, failureCallback);
        };

        voltmx.sdk.VMXObj.delete = function (vmxObj, options, successCallback, failureCallback) {
            var LOG_PREFIX = "voltmx.sdk.VMXObj.delete";
            voltmx.sdk.logsdk.trace(" Entering " + LOG_PREFIX);
            var sdkObjectSync = vmxObj.getSdkObjectSync();
            sdkObjectSync.delete(options, successCallback, failureCallback);
        };

        voltmx.sdk.VMXObj.get = function (vmxObj, options, successCallback, failureCallback) {
            var LOG_PREFIX = "voltmx.sdk.VMXObj.get";
            voltmx.sdk.logsdk.trace(" Entering " + LOG_PREFIX);
            var sdkObjectSync = vmxObj.getSdkObjectSync();
            sdkObjectSync.get(options, successCallback, failureCallback);
        };

        voltmx.sdk.VMXObj.getBinary = function (vmxObj, options, fileDownloadStartedCallback, chunkDownloadCompletedCallback,
                                              streamDownloadCompletedCallback, fileDownloadCompletedCallback, downloadFailureCallback) {

        };

        voltmx.sdk.VMXObj.rollback = function (vmxObj, primaryKeyValueMap, successCallback, failureCallback) {
            var LOG_PREFIX = "voltmx.sdk.VMXObj.rollback";
            voltmx.sdk.logsdk.trace(" Entering " + LOG_PREFIX);
            var sdkObjectSync = vmxObj.getSdkObjectSync();
            sdkObjectSync.rollback(primaryKeyValueMap, successCallback, failureCallback);
        };

        voltmx.sdk.VMXObj.markForUpload = function (vmxObj, options, successCallback, failureCallback) {
            var LOG_PREFIX = "voltmx.sdk.VMXObj.markForUpload";
            voltmx.sdk.logsdk.trace(" Entering " + LOG_PREFIX);
            var sdkObjectSync = vmxObj.getSdkObjectSync();
            sdkObjectSync.markForUpload(options, successCallback, failureCallback);
        };

        voltmx.sdk.VMXObj.getUploadDeferredRecordKeys = function(vmxObj, successCallback, failureCallback) {
            var LOG_PREFIX = "voltmx.sdk.VMXObj.getUploadDeferredRecordKeys";
            voltmx.sdk.logsdk.trace(" Entering " + LOG_PREFIX);
            var sdkObjectSync = vmxObj.getSdkObjectSync();
            sdkObjectSync.getUploadDeferredRecordKeys(successCallback, failureCallback);
        };

        voltmx.sdk.VMXObj.getPendingRecordsForUpload = function (vmxObj, options, successCallback, failureCallback) {
            voltmx.sdk.logsdk.trace(" Entering voltmx.sdk.VMXObj.getPendingRecordsForUpload");
            var sdkObjectSync = vmxObj.getSdkObjectSync();
            sdkObjectSync.getPendingRecordsForUpload(options, successCallback, failureCallback);
        };

        voltmx.sdk.VMXObj.cancelSync = function (vmxObj, options, successCallback, failureCallback) {

        };
		
		voltmx.sdk.VMXObj.clearOfflineData = function (vmxObj, options, successCallback, failureCallback) {
            var LOG_PREFIX = "voltmx.sdk.VMXObj.clearOfflineData";
            voltmx.sdk.logsdk.trace(" Entering " + LOG_PREFIX);
            var sdkObjectSync = vmxObj.getSdkObjectSync();
            sdkObjectSync.clearData(options, successCallback, failureCallback);
        };

        voltmx.sdk.VMXObjSvc.createSDKObjectServiceSync = function (name) {
            var LOG_PREFIX = "voltmx.sdk.VMXObjSvc.createSDKObjectServiceSync";
            voltmx.sdk.logsdk.trace(" Entering " + LOG_PREFIX);
            var sdkObjectServiceSyncInstance = _SDKObjectServiceSync.SDKObjectServiceSync;
            var sdkObjectServiceSync = new sdkObjectServiceSyncInstance(name);
            return sdkObjectServiceSync;
        };

        voltmx.sdk.VMXObjSvc.startSync = function(vmxObjSvc, syncConfig, successCallback, failureCallback, progressCallback) {
            var LOG_PREFIX = "voltmx.sdk.VMXObjSvc.startSync";
            var invalidObjNames = [];
            voltmx.sdk.logsdk.trace(" Entering " + LOG_PREFIX);
            var sdkObjectServiceSync = vmxObjSvc.getSdkObjectServiceSync();
            try {
                if (!voltmx.sdk.isNullOrUndefined(syncConfig.removeAfterUpload) && !voltmx.sdk.isEmptyObject(syncConfig.removeAfterUpload)) {
                    var listOfObjects = Object.values(sdkObjectServiceSync)[0].objectNames;
                    for (var obj in syncConfig.removeAfterUpload) {
                        if (!listOfObjects.includes(syncConfig.removeAfterUpload[obj])) {
                            invalidObjNames.push(syncConfig.removeAfterUpload[obj]);
                        }
                    }
                    if (!voltmx.sdk.isEmptyObject(invalidObjNames)) {
                        var errorMessage = KSErrorConstants.SYNC_INVALID_REMOVEAFTERUPLOAD_ERR_MSG + " : " + invalidObjNames;
                        voltmx.sdk.logsdk.error(LOG_PREFIX + errorMessage);
                        throw new KSError(KSErrorConstants.SYNC_INVALID_REMOVEAFTERUPLOAD_LIST, errorMessage);
                    }
                }
                sdkObjectServiceSync.startSync(syncConfig, successCallback, failureCallback, progressCallback);
            } catch (error) {
                voltmx.sdk.verifyAndCallClosure(failureCallback, error);
            }
        };

        voltmx.sdk.VMXObjSvc.cancelSync = function (vmxObjSvc, options, successCallback, failureCallback) {
            var LOG_PREFIX = "voltmx.sdk.VMXObjSvc.cancelSync";
            voltmx.sdk.logsdk.trace(" Entering " + LOG_PREFIX);
            var sdkObjectServiceSync = vmxObjSvc.getSdkObjectServiceSync();
            sdkObjectServiceSync.cancelSync(options, successCallback, failureCallback);
        };

        /**
         * Clears all data for an ObjectService on client device.
         * @param options - options for clearOfflineData api
         * @param successCallback will be invoked on the success of clearOfflineData.
         * @param failureCallback will be invoked at the time of any error.
         */
        voltmx.sdk.VMXObjSvc.clearOfflineData = function (vmxObjSvc, options, successCallback, failureCallback) {
            voltmx.sdk.logsdk.trace(" Entering voltmx.sdk.VMXObjSvc.clearOfflineData");
            var sdkObjectServiceSync = vmxObjSvc.getSdkObjectServiceSync();
            sdkObjectServiceSync.clearData(options, successCallback, failureCallback);
        };
		
		voltmx.sdk.VMXObjSvc.rollback = function (vmxObjSvc, successCallback, failureCallback) {
            var LOG_PREFIX = "voltmx.sdk.VMXObjSvc.rollback";
            voltmx.sdk.logsdk.trace(" Entering " + LOG_PREFIX);
            var sdkObjectServiceSync = vmxObjSvc.getSdkObjectServiceSync();
            sdkObjectServiceSync.rollback(successCallback, failureCallback);
        };
    });

require(["OfflineObjectsSPA"]);

