/**
 * voltmx-spa-filestorage version 9.5.31
 * This file is intended for desktopWeb/SPA only.
 */
 
if(typeof(voltmx) === "undefined"){
    voltmx = {};
}
if(typeof(voltmx.sdk) === "undefined"){
    voltmx.sdk = {};
}
if(typeof(voltmx.sdk.FileStorageClasses) === "undefined"){
    voltmx.sdk.FileStorageClasses = {};
}
/**
 * Callbacks for Binary SPA.
 * Created by Rakesh Gyanchandani on 28-12-2018.
 * Copyright © 2018 Kony. All rights reserved.
 */
define("KBCallbacks", ["exports"], function (exports) {

    "use strict";
    var LOG_PREFIX = "KBCallbacks : ";
    exports._esModule = true;

    /**
     * Binary Callbacks.
     * @param successCallback  Callback to be called on succcess.
     * @param failureCallback  Callback to be called on failure.
     * @constructor
     */
    function KBCallbacks(successCallback, failureCallback) {

        this.successCallback = function (res) {
            if(successCallback && typeof(successCallback) === "function") {
                successCallback(res);
            }
        };

        this.failureCallback = function (err) {
            if(failureCallback && typeof(failureCallback) === "function") {
                failureCallback(err);
            }
        };
    }

    exports.KBCallbacks = KBCallbacks;
});

/**
 * Object defining the constants for internal use.
 * Created by Rakesh Gyanchandani on 27-12-2018.
 * Copyright © 2018 Kony. All rights reserved.
 */
voltmx.sdk.binary.KBConstants = Object.freeze({
    //FileStorageManagerConstants
    URL: "url",
    CALLBACK: "Callback",
    CRITERIA: "criteria",
    ERROR: "Error",
    RECORDS: "records",
    OP_STATUS: "opstatus",
    FILTER: "filter",
    DOLLAR_FILTER: "$filter",
    SERVICES: "services",
    METADATA_URL_SUFFIX: "/objects/File",
    BLOB: "blob",
    DATA:"data",
    RAW_RESPONSE: "rawResponse",
    TYPE: "type",
    BYTES: "bytes",
    FILE:"file",
    COMMIT_URL: "commitUrl",
    CHUNK_SEQUENCE: "chunk_sequence",
    PATCH: "PATCH",
    COMMIT_PROPERTIES: "commit_properties",
    RESPONSE_TYPE: "responseType",
    TAGS: "tags",
    DESCRIPTION: "description",
    REQUEST_CONTEXT: "requestContext",
    USER_INFO: "userInfo",
    BINARY : "binary",

    // Metadata Constants
    FILE_ID: "file_id",
    HEADERS: "headers",
    METADATA: "metadata",
    FILE_NAMESPACE: "file_namespace",
    SECURITY_KEY: "security_key",
    FILE_NAME: "file_name",
    FILE_OBJECT: "fileObject",
    UPLOAD_PARAMS: "uploadParams",
    UPDATE_PARAMS: "updateParams",
    DOWNLOAD_PARAMS: "downloadParams",
    DELETE_PARAMS: "deleteParams",
    OPTIONS: "options",

    // Template Constants
    UPLOAD_TEMPLATE: "upload_template",
    DOWNLOAD_TEMPLATE: "download_template",
    UPLOAD_MODE : "uploadMode",
    UPLOAD_MODE_MULTI_PART : "multipart",
    UPLOAD_MODE_BINARY: "binary",
    METHOD : "method",
    DOMAIN : "domain",
    MIDDLEWARE_DOMAIN : "#middlewaredomain",
    RELATIVE_PATH: "relativepath",

    // Constants for polling
    POLLING_RETRY_INTERVAL_MILLISECONDS: 1000,
    POLLING_RETRY_ATTEMPTS: 5,
    POLLING_STATUS: "pollingStatus",
    POLLING_SUCCESS_INDICATORS: "pollingSuccessIndicators",
    CURRENT_ITERATION: "currentIteration",
    POLLING_URL : "pollingUrl",
    POLL_API: "poll_api",
    POLL_STATUS: "poll_status",
    HTTP_POLLING_CODE: 202,
    POLLING_TIMEOUT_ERROR_MESSAGE: "Exceeded number of retries, the current operation is taking longer time, status is not available yet",

    //Network constants.
    BODY: "body",
    HTTP_RESPONSE: "httpresponse",
    HTTP_STATUS_CODE: "httpStatusCode",
    HTTP_METHOD_GET: "GET",
    HTTP_METHOD_POST: "POST",
    HTTP_METHOD_PUT: "PUT",
    QUERY_PARAMS: "queryParams",
    CONTENT_TYPE: "Content-Type",
    X_KONY_SERVICE_VERSION_VALUE: "2.0",
    APPLICATION_JSON: "application/json",
    X_KONY_API_VERSION: "X-Voltmx-API-Version",
    X_KONY_AUTHORIZATION: "X-Voltmx-Authorization",
    X_KONY_REPORTINGPARAMS: "X-Voltmx-ReportingParams",
    X_HTTP_METHOD_OVERRIDE: "X-Http-Method-Override",
    X_KONY_SERVICE_VERSION: "X-Voltmx-Service-Version",
    X_FABRIC_IGNORE_MAPPER_RESPONSE_FILTERING: "X-Fabric-Ignore-Mapper-Response-Filtering",
    APPLICATION_OCTET: "application/octet-stream",
    MULTIPART: "multipart/form-data",
    PARTCONTENT: "partContent",
    PARTNAME: "name",
    FORMDATA : "formdata",
    RESPONSE_HEADERS:"response_headers",
    PASSTHROUGH_HEADER : "x-voltmx-passthrough",
    REQUESTID_HEADER : "x-voltmx-requestid",
    ACCESS_CONTROL_ALLOW_METHODS : "access-control-allow-methods",
    ACCESS_CONTROL_ALLOW_ORIGIN : "access-control-allow-origin",
    ACCESS_CONTROL_EXPOSE_HEADERS : "access-control-expose-headers",
    CONNECTION_HEADER : "connection"
});
/**
 * Object defining Error constants for file storage.
 * Created by Rakesh Gyanchandani on 27-12-2018.
 * Copyright © 2018 Kony. All rights reserved.
 */
voltmx.sdk.binary.KBErrorConstants = function () {

    function Error(code, message) {
        this.code = code;
        this.message = message;
        this.domain = "FileStorageError";
    }

    var KBErrorConstants = {};

    //------------------------------------------------
    // Error codes for Binary Errors
    //------------------------------------------------
    KBErrorConstants.CODE_INVALID_STATE_FOR_BINARY_OPERATION = new Error("5001", "Binary record is in invalid state to perform the operation.");
    KBErrorConstants.CODE_BINARY_RECORD_DOES_NOT_EXIST = new Error("5004","Binary record doesn't exist for the given primary keys ");
    KBErrorConstants.CODE_MISSING_SERVER_URL = new Error("6005", "Missing server Url.");
    KBErrorConstants.CODE_HTTP_REQUEST_FAILED = new Error("6003", "Network operation failed. ");
    KBErrorConstants.CODE_UPLOAD_FAILURE = new Error("6006", "Upload error");
    KBErrorConstants.CODE_UPLOAD_MISSING_PARAMETER = new Error("6010", "Unable to upload file - Missing parameter");
    KBErrorConstants.CODE_UPLOAD_INVALID_PARAMETER_DATA_TYPE = new Error("6011", "Unable to upload file - Invalid data type of parameter");
    KBErrorConstants.CODE_UPLOAD_INVALID_PARAMETER_VALUE = new Error("6012", "Unable to upload file - Invalid parameter value");
    KBErrorConstants.CODE_DOWNLOAD_MISSING_PARAMETER = new Error("6015", "Unable to download file - Missing parameter");
    KBErrorConstants.CODE_DOWNLOAD_INVALID_PARAMETER_TYPE = new Error("6016", "Unable to download file - Invalid data type of parameter");
    KBErrorConstants.CODE_DOWNLOAD_INVALID_PARAMETER_VALUE = new Error("6017", "Unable to download file - Invalid parameter value");
    KBErrorConstants.CODE_MALFORMED_URL = new Error("6018", "URL is not in proper format");
    KBErrorConstants.CODE_UNEXPECTED_HTTP_RESPONSE_CODE = new Error("6019", "Unexpected HTTP response code during template parsing");
    KBErrorConstants.CODE_DOWNLOAD_FAILURE = new Error("6020", "Unable to download file, please refer exception details");
    KBErrorConstants.CODE_UPDATE_MISSING_PARAMETER = new Error("6021", "Unable to perform update - missing parameter");
    KBErrorConstants.CODE_UPDATE_INVALID_PARAMETER_DATA_TYPE = new Error("6022", "Unable to perform update - Invalid data type of parameter");
    KBErrorConstants.CODE_UPDATE_INVALID_PARAMETER_VALUE = new Error("6023", "Unable to perform update - Invalid parameter value");
    KBErrorConstants.CODE_DELETE_INVALID_PARAMETER = new Error("6027", "Unable to perform Delete - unexpected parameter found");
    KBErrorConstants.CODE_DOWNLOAD_NOT_STARTED_ALREADY_EXISTS_IN_QUEUE = new Error("10002", "File download already in progress");
    KBErrorConstants.CODE_TEMPLATE_PARSING = new Error("10003", "Template Parsing error");


    //------------------------------------------------
    // Error codes for Network Errors - (2030 to 2099)
    //------------------------------------------------
    KBErrorConstants.GENERIC_NETWORK_ERROR = new Error(2030, "An error occurred in the Network Layer.");
    KBErrorConstants.NW_CONNECTION_TIMEOUT_ERROR = new Error(2031, "Unable to connect to host.");
    KBErrorConstants.NW_INVALID_RESPONSE_OBJECT = new Error(2037, "Network response is either null or invalid JSON.");
    KBErrorConstants.NW_INVALID_OPSTATUS_FROM_SERVER = new Error(2038, "Server responded with error opstatus.");
    KBErrorConstants.NW_MESSAGE_INTEGRITY_FAILURE = new Error(2043, "HTTP message integrity check failed.");
    KBErrorConstants.NW_REQUEST_ALREADY_IN_PROGRESS = new Error(2044, "The upload request is already in progress.");


    return KBErrorConstants;
}();

/**
 * Object defining the constants for Binary upload type
 * Created by Rakesh Gyanchandani on 27-12-2018.
 * Copyright © 2018 Kony. All rights reserved.
 */
voltmx.sdk.binary.FileUploadType = Object.freeze({
    UploadInputTypeLocalFilePath : 0,
    UploadInputTypeRawBytes : 1
});
/**
 * Error object for error handling in Binary.
 * Created by Rakesh Gyanchandani on 27-12-2018.
 * Copyright © 2018 Kony. All rights reserved.
 */
define("KBError", ["exports"], function (exports) {
    "use strict";
    exports._esModule = true;
    exports.KBError = (function () {

        function KBError(errObj, userInfo) {

            if(errObj) {
                this.code = errObj.code;
                this.message = errObj.message;
            }

            this.userInfo = userInfo;
        }

        return KBError;
    }());
});
/**
 * KBFileStorageManager APIs.
 * Created by Rakesh Gyanchandani on 27-12-2018.
 * Copyright © 2018 Kony. All rights reserved.
 */
define("KBFileStorageManager", ["exports", "BinaryListTask", "BinaryUploaderTask", "BinaryDownloaderTask", "BinaryUpdaterTask", "BinaryDeleteTask", "BinaryAbortTask", "KBValidationUtils", "KBError", "KBCommonUtils"],
    function (exports, _BinaryListTask, _BinaryUploaderTask, _BinaryDownloaderTask, _BinaryUpdaterTask, _BinaryDeleteTask, _BinaryAbortTask, ValidationUtils, _KBError, KBCommonUtils) {

    "use strict";
    exports._esModule = true;
    var LOG_PREFIX = "KBFileStorageManager : ";
    var BinaryConstants = voltmx.sdk.binary.KBConstants;
    var KBErrorConstants = voltmx.sdk.binary.KBErrorConstants;
    var BinaryListTask = _BinaryListTask.BinaryListTask;
    var BinaryDownloaderTask = _BinaryDownloaderTask.BinaryDownloaderTask;
    var BinaryUploaderTask = _BinaryUploaderTask.BinaryUploaderTask;
    var BinaryUpdaterTask = _BinaryUpdaterTask.BinaryUpdaterTask;
    var BinaryDeleteTask = _BinaryDeleteTask.BinaryDeleteTask;
    var binaryLogger = voltmx.sdk.logsdk;
    var KBError = _KBError.KBError;
    var sdkConstants = voltmx.sdk.constants;
    var downloadTaskMap = {};

    var instance = null;

    /**
     * returns instance of KBFileStorageManager.
     * @constructor
     */
    var KBFileStorageManager = function () {
    };

    /**
     * Internal call to force for single instance creation.
     * @returns {*}
     */
    KBFileStorageManager.getInstance = function() {
        if(instance == null) {
            instance = new KBFileStorageManager();
        }

        return instance;
    };

    /**
     * Returns List of files matching the specified parameters.
     * @param url               URL to be accessed for getting metadata of files
     * @param criteria          Filter string
     * @param headers           Map of headers
     * @param binaryCallback    Callback to be invoked at various stages of the operation being performed
     * @param options           Additional options
     * @returns {Error}
     */
    KBFileStorageManager.prototype.listFiles = function (url, criteria, headers, binaryCallback, options) {

        try {
            //Validating and creating callback.
            binaryCallback = ValidationUtils.validateAndCreateBinaryCallbackIfNotProvided(binaryCallback);
            ValidationUtils.validateUrl(url);

            //Generating input context..
            var inputContext = ValidationUtils.generateCommonInputContext(url, headers, options);

            //Validating criteria.
            if(!ValidationUtils.isNullOrEmptyObject(criteria)) {
                inputContext[BinaryConstants.FILTER] = criteria;
            } else {
                binaryLogger.warn("No criteria is defined..");
            }

            //Binary List task.
            var binaryListTask = new BinaryListTask();
            binaryListTask.setInputContext(inputContext);
            binaryListTask.execute().then(binaryCallback.successCallback).catch(errorObj => {
                binaryCallback.failureCallback(KBCommonUtils.getformattedResponseWithCommonParameters(errorObj, criteria));
            });

        } catch (e) {
            binaryLogger.error("Unexpected Exceptions", e);
            binaryCallback.failureCallback(KBCommonUtils.getformattedResponseWithCommonParameters(e, criteria));
        }
    };


    /**
     * Uploads raw data to backend
     * @param url                   URL for uploading file
     * @param uploadInputType       Type of upload operation - rawBytes or localFilePath
     * @param uploadParams          Parameters for performing upload.
     * @param binaryCallback        Callback to be invoked at various stages of the operation being performed.
     * @param options               Additional options
     * @returns {Error}
     */
    KBFileStorageManager.prototype.upload = function (url, uploadInputType, uploadParams, binaryCallback, options) {
        try {
            //Validating and creating callback.
            binaryCallback = ValidationUtils.validateAndCreateBinaryCallbackIfNotProvided(binaryCallback);
            ValidationUtils.validateUrl(url);
            ValidationUtils.validateUploadParams(uploadParams);

            //Generating input context..
            var inputContext = ValidationUtils.generateCommonInputContext(url, uploadParams[BinaryConstants.HEADERS], options);
            inputContext[BinaryConstants.UPLOAD_PARAMS] = uploadParams;
            inputContext[sdkConstants.IGNORE_MESSAGE_INTEGRITY] = ValidationUtils.disableIntegrityCheck(options);

            //BinaryUploaderTask call.
            var binaryUploaderTask = new BinaryUploaderTask();
            binaryUploaderTask.setInputContext(inputContext);
            binaryUploaderTask.execute().then(binaryCallback.successCallback).catch(errorObj => {
                binaryCallback.failureCallback(KBCommonUtils.getformattedResponseWithCommonParameters(errorObj, uploadParams[BinaryConstants.METADATA]));
            });

        } catch(e) {
            binaryLogger.error("Unexpected Exceptions in upload flow", e);
            binaryCallback.failureCallback(KBCommonUtils.getformattedResponseWithCommonParameters(e, uploadParams[BinaryConstants.METADATA]));
        }
    };

    /**
     * Downloads a file.
     * @param url                  URL for downloading file
     * @param downloadParams       Parameters for performing download.
     * @param binaryCallback       Callback to be invoked at various stages of the operation being performed.
     * @param options              Additional options.
     * @returns {Error}
     */
    KBFileStorageManager.prototype.download = function (url, downloadParams, binaryCallback, options) {
        try {
            //Validating and creating callback.
            binaryCallback = ValidationUtils.validateAndCreateBinaryCallbackIfNotProvided(binaryCallback);
            ValidationUtils.validateUrl(url);
            ValidationUtils.validateDownloadParams(downloadParams);

            var metadata = downloadParams[BinaryConstants.METADATA];
            var headers = downloadParams[BinaryConstants.HEADERS];
            var fileId = metadata[BinaryConstants.FILE_ID];

            if(!ValidationUtils.isNullOrEmptyObject(downloadTaskMap[fileId])) {
                binaryLogger.error(LOG_PREFIX + "Download for file " + fileId + " is already in progress");
                binaryCallback.failureCallback(new KBError(KBErrorConstants.CODE_DOWNLOAD_NOT_STARTED_ALREADY_EXISTS_IN_QUEUE,"Download for file with file id " + fileId + " is already in progress"));
            } else {
                var binaryDownloaderTask = new BinaryDownloaderTask();

                //Generating input context..
                var inputContext = ValidationUtils.generateCommonInputContext(url, headers, options);
                inputContext[BinaryConstants.DOWNLOAD_PARAMS] = downloadParams;
                inputContext[BinaryConstants.METADATA] = downloadParams[BinaryConstants.METADATA];
                inputContext[BinaryConstants.FILE_ID] = fileId;

                binaryDownloaderTask.setInputContext(inputContext);
                downloadTaskMap[fileId] = binaryDownloaderTask;

                function onDownloadSuccess(res) {
                    //deleting file id from download task map on success.
                    delete  downloadTaskMap[res.fileId];

                    //delete file id from response.
                    delete res.fileId;

                    //send blob object as response.
                    if(!((res[BinaryConstants.RAW_RESPONSE] instanceof File) || (res[BinaryConstants.RAW_RESPONSE] instanceof File))) {
                        res[BinaryConstants.RAW_RESPONSE] = new Blob([res[BinaryConstants.RAW_RESPONSE]]);
                    }
                    res[BinaryConstants.FILE_OBJECT] = res[BinaryConstants.RAW_RESPONSE];
                    delete res[BinaryConstants.RAW_RESPONSE];
                    binaryCallback.successCallback(res);
                }

                function onDownloadFailure(err) {
                    //deleting file id from download task map on failure.
                    delete  downloadTaskMap[err.fileId];
                    //delete file id from err obj.
                    delete err.fileId;
                    binaryCallback.failureCallback(KBCommonUtils.getformattedResponseWithCommonParameters(err, downloadParams[BinaryConstants.METADATA]));
                }

                binaryDownloaderTask.execute().then(onDownloadSuccess, onDownloadFailure);
            }

        } catch (e) {
            binaryLogger.error("Unexpected Exceptions in download flow", e);
            binaryCallback.failureCallback(KBCommonUtils.getformattedResponseWithCommonParameters(e, downloadParams[BinaryConstants.METADATA]));
        }
    };

    /**
     * Updates metadata of a file.
     * @param url                   URL for performing update
     * @param updateParams          Parameters for performing update.
     * @param binaryCallback        Callback to be invoked at various stages of the operation being performed.
     * @param options               Additional options.
     * @returns {Error}
     */
    KBFileStorageManager.prototype.update = function (url, updateParams, binaryCallback, options) {
        try {
            //Validating and creating callback.
            binaryCallback = ValidationUtils.validateAndCreateBinaryCallbackIfNotProvided(binaryCallback);
            ValidationUtils.validateUrl(url);
            ValidationUtils.validateUpdateParams(updateParams);

            //Generating input context..
            var inputContext = ValidationUtils.generateCommonInputContext(url, updateParams[BinaryConstants.HEADERS], options);
            inputContext[BinaryConstants.METADATA] = updateParams[BinaryConstants.METADATA];

            //Binary Updater Task
            var binaryUpdaterTask = new BinaryUpdaterTask();
            binaryUpdaterTask.setInputContext(inputContext);
            binaryUpdaterTask.execute().then(binaryCallback.successCallback).catch(errorObj => {
                binaryCallback.failureCallback(KBCommonUtils.getformattedResponseWithCommonParameters(errorObj, updateParams[BinaryConstants.METADATA]));
            });

        } catch(e) {
            binaryLogger.error("Unexpected Exceptions in update flow", e);
            e[BinaryConstants.REQUEST_CONTEXT] = updateParams[BinaryConstants.METADATA];
            binaryCallback.failureCallback(e);
        }
    };

    /**
     * Deletes a file by its ID.
     * @param url                    URL for deleting file
     * @param fileId                 ID of the file to be deleted
     * @param deleteParams           Parameters for performing deletion.
     * @param headers                heeders for delete call.
     * @param binaryCallback         Callback to be invoked at various stages of the operation being performed.
     * @param options                Additional options.
     * @returns {Error}
     */
    KBFileStorageManager.prototype.deleteById = function (url, fileId, deleteParams, headers, binaryCallback, options) {

        try {
            if(voltmx.sdk.isNullOrUndefined(deleteParams)) {
                deleteParams = {};
            }

            deleteParams[BinaryConstants.FILE_ID] = fileId;
            _delete(url, fileId, deleteParams, headers, binaryCallback, options, true);

        } catch (e) {
            binaryLogger.error("Unexpected Exceptions in deleteByID flow", e);
            binaryCallback.failureCallback(KBCommonUtils.getformattedResponseWithCommonParameters(e, deleteParams));
        }
    };

    /**
     * Deletes a set of files based on deletion parameters.
     * @param url                    URL for deleting file
     * @param deleteParams           Parameters for performing deletion.
     * @param headers                headers for delete call.
     * @param binaryCallback         Callback to be invoked at various stages of the operation being performed.
     * @param options                Additional options.
     * @returns {Error}
     */
    KBFileStorageManager.prototype.deleteByCriteria = function (url, deleteParams, headers, binaryCallback, options) {
        try {
            _delete(url, null, deleteParams, headers, binaryCallback, options, false);
        } catch (e) {
            binaryLogger.error("Unexpected Exceptions in deleteByCriteria flow", e);
            binaryCallback.failureCallback(KBCommonUtils.getformattedResponseWithCommonParameters(e, deleteParams));
        }
    };

    /**
     * Utility method for delete by ID and deleteByCriteria.
     * @param url                    URL for deleting file
     * @param fileId                 ID of the file to be deleted
     * @param deleteParams           Parameters for performing deletion.
     * @param headers                heeders for delete call.
     * @param binaryCallback         Callback to be invoked at various stages of the operation being performed.
     * @param options                Additional options.
     * @param isdeleteById           true for deleteByID and false for deleteByCriteria
     * @private
     */
    function _delete(url, fileId, deleteParams, headers, binaryCallback, options, isdeleteById) {
        //Validating and creating callback.
        binaryCallback = ValidationUtils.validateAndCreateBinaryCallbackIfNotProvided(binaryCallback);
        ValidationUtils.validateUrl(url);
        ValidationUtils.validateDeleteParams(deleteParams);
        if(isdeleteById) {
            ValidationUtils.validObjectForNullOREmptyValue(fileId, KBErrorConstants.CODE_DELETE_INVALID_PARAMETER, " Null or empty value found for fileId");
        }

        //Generating input context..
        var inputContext = ValidationUtils.generateCommonInputContext(url, headers, options);
        inputContext[BinaryConstants.DELETE_PARAMS] = deleteParams;
        inputContext[BinaryConstants.FILTER] = KBCommonUtils.createFilterString(deleteParams);

        //Binary Deletion task.
        var binaryDeleteTask = new BinaryDeleteTask();
        binaryDeleteTask.setInputContext(inputContext);
        binaryDeleteTask.execute().then(binaryCallback.successCallback).catch(errorObj => {
            binaryCallback.failureCallback(KBCommonUtils.getformattedResponseWithCommonParameters(errorObj, deleteParams));
        });
    }

    /**
     * Best effort to abort failed operation
     * @param attachmentId           ID of the file to be aborted.
     * @param binaryCallback         Callback to be invoked at various stages of the operation being performed.
     * @returns {Error}
     */
    KBFileStorageManager.prototype.abort = function (attachmentId, binaryCallback) {
        return new Error("Abort operation not implemented");
    };

    exports.getInstance = KBFileStorageManager.getInstance;
});
/**
 * Downloads file from server.
 * Created by Rakesh Gyanchandani on 27-12-2018.
 * Copyright © 2018 Kony. All rights reserved.
 */
define("ChunkFileDownloaderTask", ["exports", "KBValidationUtils", "KBError", "KBResponseParser", "KBNetworkUtils", "KBCommonUtils"],
    function (exports, ValidationUtils, _KBError, ResponseParser, KBNetworkUtils, KBCommonUtils) {
    "use strict";
    exports._esModule = true;

    var binaryLogger = voltmx.sdk.logsdk;
    var LOG_PREFIX = "ChunkFileDownloaderTask : ";
    var BinaryConstants = voltmx.sdk.binary.KBConstants;
    var KBError = _KBError.KBError;
    var KBErrorConstants = voltmx.sdk.binary.KBErrorConstants;

    /**
     *  Creates ChunkFileDownloaderTask Instance
     * @constructor
     */
    function ChunkFileDownloaderTask() {
        this.inputContext = {};
        this.url = null;
        this.fileName = null;
        this.filter = "";
        this.headers = null;
        this.fileId = null;
    };

    /**
     *
     */
    function unpackInputContext() {
        this.fileId = this.inputContext[BinaryConstants.FILE_ID];
        var records = this.inputContext[BinaryConstants.RECORDS];

        if(ValidationUtils.isNullOrEmptyObject(records)) {
            var errMsg = " File " + this.fileId + " doesn't exists";
            binaryLogger.error(LOG_PREFIX + errMsg);
            throw new KBError(KBErrorConstants.CODE_BINARY_RECORD_DOES_NOT_EXIST, errMsg);
        }

        if(records.length > 1) {
            var errMsg = " More than one file exists with file_id: " + this.fileId;
            binaryLogger.error(LOG_PREFIX + errMsg);
            throw new KBError(KBErrorConstants.CODE_INVALID_STATE_FOR_BINARY_OPERATION, errMsg);
        }

        var firstRecord = records[0];
        this.fileName = firstRecord[BinaryConstants.FILE_NAME];

        this.downloadTemplate = firstRecord[BinaryConstants.DOWNLOAD_TEMPLATE];
        this.url = ResponseParser.extractFileOperationUrl(this.downloadTemplate, this.inputContext[BinaryConstants.URL], this.fileId);

        if (this.inputContext[BinaryConstants.FILTER]) {
            this.filter = this.inputContext[BinaryConstants.FILTER];
        }

        if(this.inputContext[BinaryConstants.METADATA]) {
            if(!this.inputContext[BinaryConstants.METADATA][BinaryConstants.TYPE]) {
                this.inputContext[BinaryConstants.METADATA][BinaryConstants.TYPE] = BinaryConstants.BYTES;
            }
            this.filter += KBCommonUtils.createFilterStringFromMetadataAsQueryParams(this.inputContext[BinaryConstants.METADATA]);
            delete this.inputContext[BinaryConstants.METADATA][BinaryConstants.TYPE];
        }

        if (this.inputContext[BinaryConstants.HEADERS]) {
            this.headers = this.inputContext[BinaryConstants.HEADERS];
        }

    };

    /**
     * appends filter to url.
     */
    function appendFilterToUrl() {
        if (this.url.includes("?")) {
            this.url += "&" + this.filter;
        } else {
            this.url += "?" + this.filter;
        }
    }

    /**
     * sets the input context for BinaryDownloaderTask.
     * @param inputContext input context for BinaryDownloaderTask.
     */
    ChunkFileDownloaderTask.prototype.setInputContext = function(inputContext) {
        this.inputContext = inputContext;
    };

    /**
     *  Executes the ChunkFileDownloaderTask
     * @returns {Promise<void>}
     */
    ChunkFileDownloaderTask.prototype.execute = async function () {
        unpackInputContext.call(this);
        var download_template = JSON.parse(this.downloadTemplate);

        if(download_template[BinaryConstants.DOMAIN] === BinaryConstants.MIDDLEWARE_DOMAIN) {
            appendFilterToUrl.call(this);
        } else {
            delete this.headers[BinaryConstants.X_KONY_AUTHORIZATION];
        }

        var options = KBCommonUtils.getNetworkOptions(this.inputContext);
        options[BinaryConstants.RESPONSE_TYPE] = BinaryConstants.BLOB;
        var response = await KBNetworkUtils.get(this.url, null, this.headers, options);
        response.fileId = this.inputContext[BinaryConstants.FILE_ID];
        response[BinaryConstants.FILE_NAME] = this.fileName;
        return response;

    };

    exports.ChunkFileDownloaderTask = ChunkFileDownloaderTask;
});
/**
 * Task to upload file.
 * Created by Rakesh Gyanchandani on 27-12-2018.
 * Copyright © 2018 Kony. All rights reserved.
 */
define("ChunkedFileUploaderTask", ["exports", "KBNetworkUtils", "KBCommonUtils"], function (exports, KBNetworkUtils, KBCommonUtils) {
    "use strict";
    exports._esModule = true;

    var binaryLogger = voltmx.sdk.logsdk;
    var LOG_PREFIX = "ChunkedFileUploaderTask : ";
    var BinaryConstants = voltmx.sdk.binary.KBConstants;

    /**
     *  Creates ChunkedFileUploaderTask Instance
     * @constructor
     */
    function ChunkedFileUploaderTask() {
        this.inputContext = {};
        this.url = null;
        this.headers = null;
        this.fileId = null;
        this.fileObject = null;
        this.queryParams = {};
        this.chunkId = "1";
    }

    /**
     * unpacks input context..
     */
    function unpackInputContext() {
        this.url = this.inputContext[BinaryConstants.URL];
        this.headers = this.inputContext[BinaryConstants.HEADERS];
        delete this.headers[BinaryConstants.CONTENT_TYPE];

        this.metadata = this.inputContext[BinaryConstants.UPLOAD_PARAMS][BinaryConstants.METADATA];
        // TODO : need to confirm whether the fileID should be in inputContext or uploadtemplate.
        this.fileId = this.inputContext[BinaryConstants.FILE_ID];
        this.metadata[BinaryConstants.FILE_ID] = this.fileId;
        this.options = this.inputContext[BinaryConstants.OPTIONS];
        this.fileObject = this.inputContext[BinaryConstants.UPLOAD_PARAMS][BinaryConstants.FILE_OBJECT];
    }

    /**
     * Generates the query params for current chunk
     */
    function generateQueryParamsForCurrentChunk() {

        this.queryParams[BinaryConstants.CHUNK_SEQUENCE] = this.chunkId;
        if(this.metadata[BinaryConstants.FILE_NAMESPACE]) {
            this.queryParams[BinaryConstants.FILE_NAMESPACE] = this.metadata[BinaryConstants.FILE_NAMESPACE];
        }

        if(this.metadata[BinaryConstants.SECURITY_KEY]) {
            this.queryParams[BinaryConstants.SECURITY_KEY] = this.metadata[BinaryConstants.SECURITY_KEY];
        }

    }

    /**
     * sets the input context for ChunkedFileUploaderTask.
     * @param inputContext input context for ChunkedFileUploaderTask.
     */
    ChunkedFileUploaderTask.prototype.setInputContext = function(inputContext) {
        this.inputContext = inputContext;
    };

    /**
     *  Executes the ChunkedFileUploaderTask
     * @returns {Promise<void>}
     */
    ChunkedFileUploaderTask.prototype.execute = async function () {

        unpackInputContext.call(this);
        var headers = voltmx.sdk.cloneObject(this.headers);
        if(this.inputContext[BinaryConstants.UPLOAD_TEMPLATE][BinaryConstants.DOMAIN] === BinaryConstants.MIDDLEWARE_DOMAIN) {
            generateQueryParamsForCurrentChunk.call(this);
        } else {
            delete headers[BinaryConstants.X_KONY_AUTHORIZATION];
            delete headers[BinaryConstants.X_FABRIC_IGNORE_MAPPER_RESPONSE_FILTERING];
        }

        var body;
        var uploadMode = (this.inputContext[BinaryConstants.UPLOAD_TEMPLATE][BinaryConstants.UPLOAD_MODE]).toLowerCase();

        if(uploadMode === BinaryConstants.UPLOAD_MODE_MULTI_PART)
        {
            body = new voltmx.net.FormData({isMultiPart:true});
            body.append(BinaryConstants.DATA, this.fileObject);
        }
        else if(uploadMode === BinaryConstants.UPLOAD_MODE_BINARY)
        {
            headers[BinaryConstants.CONTENT_TYPE] = BinaryConstants.APPLICATION_OCTET;
            body = this.fileObject;
        }

        var content_type;
        var options = KBCommonUtils.getNetworkOptions(this.inputContext);
        var method = (this.inputContext[BinaryConstants.UPLOAD_TEMPLATE][BinaryConstants.METHOD]).toUpperCase();

        if(method === BinaryConstants.HTTP_METHOD_POST)
        {
            content_type = this.inputContext[BinaryConstants.UPLOAD_TEMPLATE][BinaryConstants.UPLOAD_MODE];
            return (await KBNetworkUtils.post(this.url, this.queryParams, headers, body, options, content_type));
        }
        else if(method === BinaryConstants.HTTP_METHOD_PUT)
        {
            content_type = BinaryConstants.FORMDATA;
            return (await KBNetworkUtils.put(this.url, this.queryParams, headers, body, options, content_type));
        }
    };

    exports.ChunkedFileUploaderTask = ChunkedFileUploaderTask;
});
/**
 * Task to create FileMetadataCreatorTaskmetadata for a  file.
 * Created by Rakesh Gyanchandani on 27-12-2018.
 * Copyright © 2018 Kony. All rights reserved.
 */
define("FileMetadataCreatorTask", ["exports", "KBNetworkUtils", "KBCommonUtils"], function (exports, KBNetworkUtils, KBCommonUtils) {
        "use strict";
        exports._esModule = true;

        var binaryLogger = voltmx.sdk.logsdk;
        var LOG_PREFIX = "FileMetadataCreatorTask : ";
        var BinaryConstants = voltmx.sdk.binary.KBConstants;

        /**
         *  Creates FileMetadataCreatorTask Instance
         * @constructor
         */
        function FileMetadataCreatorTask() {
            this.inputContext = {};
            this.url = null;
            this.metadata = null;
            this.headers = null;
            this.fileName = null;

        }

        /**
         * unpacks input context..
         */
        function unpackInputContext() {
            this.url = this.inputContext[BinaryConstants.URL] + BinaryConstants.METADATA_URL_SUFFIX;
            var uploadParams = this.inputContext[BinaryConstants.UPLOAD_PARAMS];
            this.headers = uploadParams[BinaryConstants.HEADERS];
            this.headers[BinaryConstants.CONTENT_TYPE] =  BinaryConstants.APPLICATION_JSON;
            this.headers[BinaryConstants.X_FABRIC_IGNORE_MAPPER_RESPONSE_FILTERING] = "true";
            this.metadata = uploadParams[BinaryConstants.METADATA];
            this.fileName =  this.metadata[BinaryConstants.FILE_NAME];
            this.options = this.inputContext[BinaryConstants.OPTIONS];
        }

        /**
         * sets the input context for FileMetadataCreatorTask.
         * @param inputContext input context for FileMetadataCreatorTask.
         */
        FileMetadataCreatorTask.prototype.setInputContext = function(inputContext) {
            this.inputContext = inputContext;
        };

        /**
         *  Executes the FileMetadataCreatorTask
         * @returns {Promise<void>}
         */
        FileMetadataCreatorTask.prototype.execute = async function () {
            unpackInputContext.call(this);
            return (await KBNetworkUtils.post(this.url, null, this.headers, this.metadata, KBCommonUtils.getNetworkOptions(this.inputContext)));

        };

        exports.FileMetadataCreatorTask = FileMetadataCreatorTask;
    });
/**
 * Task to perform polling and check the status of task
 * Uses exponential backoff mechanism
 * Created by ambuj.kumar@kony.com on 3/12/2019.
 * <p>
 * Design Idea : PollingTask is a looping task which loops multiple times with exponential backoff strategy
 * to poll a specific url and check if desired result is achieved or not.
 * <p>
 * Input context will have pollingUrl, queryParams (if any), headers (if any) and a HashMap<String, Object> pollingSuccessIndicators
 * pollingSuccessIndicators need to be constructed based on server side input.
 * which will have the set of key-vslue pairs to be checked for in the output obtained on doing a HTTP GET on
 * the pollingUrl.
 * <p>
 * ASSUMPTION : HTTP GET on pollingUrl will always return a valid JSON response.
 * The JSON response will be parsed to check whether ALL key-value pairs specified in pollingSuccessIndicators are present and exactly
 * matching or not in the received json response.
 * <p>
 * Keep retrying for a specified hardcoded number of times with exponential backoff intervals between 2 retries.
 * Classical definition of exponential backoff has been implemented.
 * <p>
 * If desired response not received even after timeout elapses, then simply error out with TimeoutException.
 * Created by Ambuj Kumar on 19-03-2019.
 * Copyright © 2019 Kony. All rights reserved.
 */

define("PollingTask", ["exports", "KBNetworkUtils", "KBCommonUtils"], function (exports, KBNetworkUtils, KBCommonUtils) {
    "use strict";
    exports._esModule = true;

    var binaryLogger = voltmx.sdk.logsdk;
    var LOG_PREFIX = "PollingTask : ";
    var BinaryConstants = voltmx.sdk.binary.KBConstants;
    var _statusCheckerTask = require("StatusCheckerTask");

    /**
     * Creates an instance of PollingTask
     * @constructor
     */
    function PollingTask() {
        this.inputContext = {};
        this.retryIndex = 1;
        this.statusChecker = new _statusCheckerTask.StatusCheckerTask();
    }

    /**
     * sets the input context for PollingTask.
     * @param inputContext input context for PollingTask.
     */
    PollingTask.prototype.setInputContext = function (inputContext) {
        this.inputContext = inputContext;
    }

    /**
     *  Executes the PollingTask
     * @returns {Promise<void>}
     */
    PollingTask.prototype.execute = async function () {
        try {
            this.statusChecker.setInputContext(this.inputContext);
            this.output = null;

            do {
                this.output = await this.statusChecker.execute();

                // polling is successful - stop looping
                if (this.output[BinaryConstants.POLLING_STATUS] === true) {
                    return this.output;
                }

                await exponentialBackoffDelay(this.retryIndex);
                ++this.retryIndex;
                this.inputContext[BinaryConstants.CURRENT_ITERATION] = this.retryIndex;
                this.statusChecker.setInputContext(this.inputContext);
            } while (this.retryIndex <= BinaryConstants.POLLING_RETRY_ATTEMPTS);
        } catch (err) {
            binaryLogger.error(LOG_PREFIX + "Unexpected error " + err);
            throw err;
        }
    }

    /**
     * Induce a delay for exponential backoff
     */
    function exponentialBackoffDelay(currentIndex) {
        // Classical definition of exponential backoff
        // For failed attempt number k, select a random integer M in the range
        // 0 to (2^k - 1)
        // Wait for M*T units of time
        // T = BinaryConstants.POLLING_RETRY_INTERVAL_MILLISECONDS

        var multiplier = Math.round((1 << currentIndex) * Math.random());
        return new Promise(resolve => setTimeout(resolve, multiplier * BinaryConstants.POLLING_RETRY_INTERVAL_MILLISECONDS));
    }

    exports.PollingTask = PollingTask;
});

/**
 * Task to hit the polling url and check the status
 * Created by Ambuj Kumar on 19-03-2019.
 * Copyright © 2019 Kony. All rights reserved.
 */

define("StatusCheckerTask", ["exports", "KBNetworkUtils", "KBCommonUtils"], function (exports, KBNetworkUtils, KBCommonUtils) {
    "use strict";
    exports._esModule = true;

    var binaryLogger = voltmx.sdk.logsdk;
    var LOG_PREFIX = "StatusCheckerTask : ";
    var BinaryConstants = voltmx.sdk.binary.KBConstants;

    /**
     *  Creates an instance of StatusCheckerTask
     * @constructor
     */
    function StatusCheckerTask() {
        this.inputContext = {};
        this.pollingUrl = null;
        this.headers = null;
        this.queryParams = null;
        this.pollingSuccessIndicators = null;
        this.currentIteration = -1;
    }

    /**
     * sets the input context for StatusCheckerTask.
     * @param inputContext input context for StatusCheckerTask.
     */
    StatusCheckerTask.prototype.setInputContext = function (inputContext) {
        this.inputContext = inputContext;
    };

    /**
     * unpacks input context..
     */
    function unpackInputContext() {
        this.pollingUrl = this.inputContext[BinaryConstants.POLLING_URL];

        this.headers = this.inputContext[BinaryConstants.HEADERS];
        if(this.headers == null){
            this.headers = {};
        }

        this.headers[BinaryConstants.CONTENT_TYPE] = BinaryConstants.APPLICATION_JSON;
        this.headers[BinaryConstants.X_FABRIC_IGNORE_MAPPER_RESPONSE_FILTERING] = true;

        this.queryParams = this.inputContext[BinaryConstants.QUERY_PARAMS];

        this.pollingSuccessIndicators = this.inputContext[BinaryConstants.POLLING_SUCCESS_INDICATORS];

        if (BinaryConstants.CURRENT_ITERATION in this.inputContext) {
            this.currentIteration = this.inputContext[BinaryConstants.CURRENT_ITERATION];
        } else {
            this.currentIteration = 1;
        }
    };

    /**
     *  Executes the StatusCheckerTask
     * @returns {Promise<void>}
     */
    StatusCheckerTask.prototype.execute = async function () {

        unpackInputContext.call(this);
        var response = await KBNetworkUtils.get(this.pollingUrl, this.queryParams, this.headers, KBCommonUtils.getNetworkOptions(this.inputContext));

        var successfulResponse = true;

        if (this.pollingSuccessIndicators !== null) {
            for (var key in this.pollingSuccessIndicators) {
                if (key in response) {
                    if (response[key] !== this.pollingSuccessIndicators[key]) {
                        successfulResponse = false;
                        break;
                    }
                } else {
                    successfulResponse = false;
                    break;
                }
            }
        }

        var output = {};
        output[BinaryConstants.POLLING_STATUS] = successfulResponse;

        for(var key in response){
            output[key] = response[key];
        }

        binaryLogger.debug(LOG_PREFIX + "Polling result computed " + successfulResponse);

        if (this.currentIteration === BinaryConstants.POLLING_RETRY_ATTEMPTS) {
            if (!successfulResponse) {
                // last polling and successful status still not seen - hence error
                binaryLogger.error(LOG_PREFIX + BinaryConstants.POLLING_TIMEOUT_ERROR_MESSAGE);
                throw BinaryConstants.POLLING_TIMEOUT_ERROR_MESSAGE;
            }
        }

        return output;
    };

    exports.StatusCheckerTask = StatusCheckerTask;
});

/**
 * Task to commit uploaded file.
 * Created by Rakesh Gyanchandani on 27-12-2018.
 * Copyright © 2018 Kony. All rights reserved.
 */
define("UploadCommitterTask", ["exports", "KBCommonUtils", "KBNetworkUtils"], function (exports, KBCommonUtils, KBNetworkUtils) {
    "use strict";
    exports._esModule = true;

    var binaryLogger = voltmx.sdk.logsdk;
    var LOG_PREFIX = "UploadCommitterTask : ";
    var BinaryConstants = voltmx.sdk.binary.KBConstants;

    /**
     *  Creates UploadCommitterTask Instance
     * @constructor
     */
    function UploadCommitterTask() {
        this.inputContext = {};
        this.url = null;
        this.headers = null;
        this.metadata = null;
        this.fileId = null;
    }

    /**
     * unpacks input context..
     */
    function unpackInputContext() {
        this.url = this.inputContext[BinaryConstants.COMMIT_URL] + BinaryConstants.METADATA_URL_SUFFIX;
        var uploadParams = this.inputContext[BinaryConstants.UPLOAD_PARAMS];
        this.headers = this.inputContext[BinaryConstants.HEADERS];
        this.headers[BinaryConstants.X_HTTP_METHOD_OVERRIDE] =  BinaryConstants.PATCH;
        this.headers[BinaryConstants.CONTENT_TYPE] =  BinaryConstants.APPLICATION_JSON;

        this.metadata = uploadParams[BinaryConstants.METADATA];
        delete this.metadata[BinaryConstants.FILE_NAME];

        if (!this.metadata[BinaryConstants.COMMIT_PROPERTIES]) {
            this.metadata[BinaryConstants.COMMIT_PROPERTIES] =  {};
        }
        var responseHeaders = this.inputContext[BinaryConstants.RESPONSE_HEADERS];
        if(!voltmx.sdk.isNullOrUndefined(responseHeaders)){
            var keysToDelete = [
                (voltmx.sdk.constants.INTEGRITY_HEADER).toLowerCase(),
                (voltmx.sdk.constants.PASSTHROUGH_RESPONSE_HEADER).toLowerCase(),
                BinaryConstants.REQUESTID_HEADER,
                BinaryConstants.ACCESS_CONTROL_ALLOW_METHODS,
                BinaryConstants.ACCESS_CONTROL_ALLOW_ORIGIN,
                BinaryConstants.ACCESS_CONTROL_EXPOSE_HEADERS,
                BinaryConstants.CONNECTION_HEADER
            ];
            for(var header in responseHeaders) {
                if(keysToDelete.includes(header.toLowerCase())) {
                    delete responseHeaders[header];
                }
            }
            Object.assign(this.metadata[BinaryConstants.COMMIT_PROPERTIES], responseHeaders);
        }
    }

    /**
     * sets the input context for UploadCommitterTask.
     * @param inputContext input context for UploadCommitterTask.
     */
    UploadCommitterTask.prototype.setInputContext = function(inputContext) {
        this.inputContext = inputContext;
    };

    /**
     *  Executes the UploadCommitterTask
     * @returns {Promise<void>}
     */
    UploadCommitterTask.prototype.execute = async function () {
        unpackInputContext.call(this);
        var commit_metadata = this.metadata;
        commit_metadata[BinaryConstants.COMMIT_PROPERTIES] = JSON.stringify(commit_metadata[BinaryConstants.COMMIT_PROPERTIES]);
        return await KBNetworkUtils.put(this.url, null, this.headers, commit_metadata,
            KBCommonUtils.getNetworkOptions(this.inputContext), BinaryConstants.APPLICATION_JSON);

    };

    exports.UploadCommitterTask = UploadCommitterTask;
});
/**
 * Module to Abort file operation.
 * Created by Rakesh Gyanchandani on 27-12-2018.
 * Copyright © 2018 Kony. All rights reserved.
 */
define("BinaryAbortTask", ["exports"], function (exports) {
    "use strict";
    exports._esModule = true;

    var logger = voltmx.sdk.logsdk;
    var LOG_PREFIX = "BinaryAbortTask : ";

    /**
     *  Creates BinaryAbortTask Instance
     * @constructor
     */
    function BinaryAbortTask() {

    }

    /**
     *  Executes the BinaryAbortTask
     * @returns {Promise<void>}
     */
    BinaryAbortTask.prototype.execute = async function () {
        //Abort file operation.
    };

    exports.BinaryAbortTask = BinaryAbortTask;
});
/**
 * Module to delete file on server.
 * Created by Rakesh Gyanchandani on 27-12-2018.
 * Copyright © 2018 Kony. All rights reserved.
 */
define("BinaryDeleteTask", ["exports", "KBValidationUtils", "KBCommonUtils", "KBNetworkUtils", "KBResponseParser"], function (exports, ValidationUtils, KBCommonUtils, KBNetworkUtils, KBResponseParser) {
    "use strict";
    exports._esModule = true;

    var logger = voltmx.sdk.logsdk;
    var LOG_PREFIX = "BinaryDeleteTask : ";
    var BinaryConstants = voltmx.sdk.binary.KBConstants;
    var _pollingTask = require("PollingTask");

    /**
     *  Creates BinaryDeleteTask Instance
     * @constructor
     */
    function BinaryDeleteTask() {
        this.inputContext = {};
        this.headers = null;
        this.url = null;
        this.filter = null;
        this.queryParams = {};
    }

    /**
     * sets the input context for BinaryDeleteTask.
     * @param inputContext input context for BinaryDeleteTask.
     */
    BinaryDeleteTask.prototype.setInputContext = function(inputContext) {
        this.inputContext = inputContext;
    };

    /**
     * unpacks input context..
     */
    function unpackInputContext() {
        this.url = this.inputContext[BinaryConstants.URL] + BinaryConstants.METADATA_URL_SUFFIX;
        this.headers = this.inputContext[BinaryConstants.HEADERS];
        if(this.headers == null){
            this.headers = {};
        }

        this.headers[BinaryConstants.X_FABRIC_IGNORE_MAPPER_RESPONSE_FILTERING] = true;
        if(!ValidationUtils.isNullOrEmptyObject(this.inputContext[BinaryConstants.FILTER])) {
            this.filter = this.inputContext[BinaryConstants.FILTER];
            this.queryParams[BinaryConstants.DOLLAR_FILTER] = this.filter;
        }
    }

    /**
     *  Executes the BinaryDeleteTask
     * @returns {Promise<void>}
     */
    BinaryDeleteTask.prototype.execute = async function () {
        unpackInputContext.call(this);
        var response = await KBNetworkUtils.invokeDeleteRequest(this.url, this.queryParams, this.headers, null, KBCommonUtils.getNetworkOptions(this.inputContext));

        if(response[BinaryConstants.HTTP_STATUS_CODE] == BinaryConstants.HTTP_POLLING_CODE){
            // Operation taking longer time on Foundry server, poll for the result
            var pollingUrl = this.url + "/" + response[BinaryConstants.POLL_API].split("?")[0];
            var queryParamsForPolling = KBResponseParser.extractQueryParams(response[BinaryConstants.POLL_API]);

            var successIndicator = {};
            successIndicator[BinaryConstants.POLL_STATUS] = "false";

            var pollingInputContext = {};
            pollingInputContext[BinaryConstants.POLLING_URL] = pollingUrl;
            pollingInputContext[BinaryConstants.QUERY_PARAMS] = queryParamsForPolling;
            pollingInputContext[BinaryConstants.POLLING_SUCCESS_INDICATORS] = successIndicator;
            pollingInputContext[BinaryConstants.HEADERS] = this.headers;

            var pollingTask = new _pollingTask.PollingTask();
            pollingTask.setInputContext(pollingInputContext);
            var pollingResult = await pollingTask.execute();

            for(var key in pollingResult){
                response[key] = pollingResult[key];
            }
        }

        return KBCommonUtils.getformattedResponseWithCommonParameters(response, this.inputContext[BinaryConstants.DELETE_PARAMS]);
    };

    exports.BinaryDeleteTask = BinaryDeleteTask;
});
/**
 * Module to download file from server.
 * Created by Rakesh Gyanchandani on 27-12-2018.
 * Copyright © 2018 Kony. All rights reserved.
 */
define("BinaryDownloaderTask", ["exports", "KBValidationUtils", "KBCommonUtils", "BinaryListTask", "ChunkFileDownloaderTask"], function (exports, ValidationUtils, KBCommonUtils, _BinaryListTask, _ChunkFileDownloaderTask) {
    "use strict";
    exports._esModule = true;

    var binaryLogger = voltmx.sdk.logsdk;
    var BinaryListTask = _BinaryListTask.BinaryListTask;
    var ChunkFileDownloaderTask = _ChunkFileDownloaderTask.ChunkFileDownloaderTask;
    var LOG_PREFIX = "BinaryDownloaderTask : ";
    var BinaryConstants = voltmx.sdk.binary.KBConstants;

    /**
     *  Creates BinaryDownloaderTask Instance
     * @constructor
     */
    function BinaryDownloaderTask() {
        this.inputContext = {};
        this.url = null;
        this.filter = "";
        this.headers = null;
    }

    /**
     * sets the input context for BinaryDownloaderTask.
     * @param inputContext input context for BinaryDownloaderTask.
     */
    BinaryDownloaderTask.prototype.setInputContext = function(inputContext) {
        this.inputContext = inputContext;
    };

    /**
     *  Executes the BinaryDownloaderTask
     * @returns {Promise<void>}
     */
    BinaryDownloaderTask.prototype.execute = async function () {
        try {
            //Fetch meta data for file.
            var fileMetadataDownloaderTask = new BinaryListTask();
            fileMetadataDownloaderTask.setInputContext(this.inputContext);
            var fileMetaData = await fileMetadataDownloaderTask.execute();

            //Fetches raw bytes for file.
            this.inputContext[BinaryConstants.RECORDS] = fileMetaData[BinaryConstants.RECORDS];
            var chunkFileDownloaderTask = new ChunkFileDownloaderTask();
            chunkFileDownloaderTask.setInputContext(this.inputContext);
            var response = await chunkFileDownloaderTask.execute();

            return KBCommonUtils.getformattedResponseWithCommonParameters(response,
                this.inputContext[BinaryConstants.DOWNLOAD_PARAMS][BinaryConstants.METADATA]);

        } catch (e) {
            e.fileId = this.inputContext[BinaryConstants.FILE_ID];
            binaryLogger.error("Unexpected Exception in BinaryDownloader Task " + e);
            throw e;
        }
    };

    exports.BinaryDownloaderTask = BinaryDownloaderTask;
});
/**
 * Module to List files uploaded on server.
 * Created by Rakesh Gyanchandani on 27-12-2018.
 * Copyright © 2018 Kony. All rights reserved.
 */
define("BinaryListTask", ["exports", "KBValidationUtils", "KBCommonUtils", "KBNetworkUtils"], function (exports, ValidationUtils, KBCommonUtils, KBNetworkUtils) {
    "use strict";
    exports._esModule = true;

    var binaryLogger = voltmx.sdk.logsdk;
    var LOG_PREFIX = "BinaryListTask : ";
    var BinaryConstants = voltmx.sdk.binary.KBConstants;

    /**
     *  Creates BinaryListTask Instance
     * @constructor
     */
    function BinaryListTask() {
        this.inputContext = {};
        this.url = null;
        this.headers = null;
        this.filter = "";
        this.queryParams = {};
    }

    /**
     * sets the input context for BinaryListTask.
     * @param inputContext input context for BinaryListTask.
     */
    BinaryListTask.prototype.setInputContext = function(inputContext) {
        this.inputContext = inputContext;
    };

    /**
     * Unpacks input context to BinaryListTask state.
     */
    function unpackInputContext() {
      this.url = this.inputContext[BinaryConstants.URL] + BinaryConstants.METADATA_URL_SUFFIX;
      if(this.inputContext[BinaryConstants.FILTER]) {
          this.filter = this.inputContext[BinaryConstants.FILTER];
      }

      if(this.inputContext[BinaryConstants.METADATA]) {
          this.filter += KBCommonUtils.createFilterString(this.inputContext[BinaryConstants.METADATA]);
      }

      if(this.inputContext[BinaryConstants.HEADERS]) {
          this.headers = this.inputContext[BinaryConstants.HEADERS];
      }

      this.headers[BinaryConstants.CONTENT_TYPE] = BinaryConstants.APPLICATION_JSON;
      this.queryParams[BinaryConstants.DOLLAR_FILTER] = this.filter;
    };

    /**
     *  Executes the BinaryListTask
     * @returns {Promise<void>}
     */
    BinaryListTask.prototype.execute = async function () {

        try {
            unpackInputContext.call(this);
            var response = await KBNetworkUtils.get(this.url, this.queryParams, this.headers, KBCommonUtils.getNetworkOptions(this.inputContext));

            return KBCommonUtils.getformattedResponseWithCommonParameters(response, this.inputContext[BinaryConstants.FILTER]);
        } catch (e) {
            binaryLogger.error("Unexpected Exception" + e);
            throw e;
        }
    };

    exports.BinaryListTask = BinaryListTask;
});
/**
 * Module to update file on server.
 * Created by Rakesh Gyanchandani on 27-12-2018.
 * Copyright © 2018 Kony. All rights reserved.
 */
define("BinaryUpdaterTask", ["exports", "KBNetworkUtils", "KBCommonUtils"], function (exports, KBNetworkUtils, KBCommonUtils) {
    "use strict";
    exports._esModule = true;

    var logger = voltmx.sdk.logsdk;
    var LOG_PREFIX = "BinaryUpdaterTask : ";
    var BinaryConstants = voltmx.sdk.binary.KBConstants;

    /**
     *  Creates BinaryUpdaterTask Instance
     * @constructor
     */
    function BinaryUpdaterTask() {
        this.inputContext = {};
        this.url = null;
        this.metadata = null;
        this.headers = null;
        this.fileId = null;
    }

    /**
     *  Creates BinaryUpdaterTask Instance
     * @constructor
     */
    function unpackInputContext() {
        this.url = this.inputContext[BinaryConstants.URL] + BinaryConstants.METADATA_URL_SUFFIX;
        this.headers = this.inputContext[BinaryConstants.HEADERS];
        this.headers[BinaryConstants.CONTENT_TYPE] = BinaryConstants.APPLICATION_JSON;
        this.metadata = this.inputContext[BinaryConstants.METADATA];
        this.fileId = this.metadata[BinaryConstants.FILE_ID];
    }

    /**
     * sets the input context for BinaryUpdaterTask.
     * @param inputContext input context for BinaryUpdaterTask.
     */
    BinaryUpdaterTask.prototype.setInputContext = function(inputContext) {
        this.inputContext = inputContext;
    };

    /**
     *  Executes the BinaryUpdaterTask
     * @returns {Promise<void>}
     */
    BinaryUpdaterTask.prototype.execute = async function () {
        unpackInputContext.call(this);
        var response =  await KBNetworkUtils.put(this.url, null, this.headers, this.metadata, KBCommonUtils.getNetworkOptions(this.inputContext));

        return KBCommonUtils.getformattedResponseWithCommonParameters(response, this.metadata);
    };

    exports.BinaryUpdaterTask = BinaryUpdaterTask;
});
/**
 * Module to upload file on server.
 * Created by Rakesh Gyanchandani on 27-12-2018.
 * Copyright © 2018 Kony. All rights reserved.
 */
define("BinaryUploaderTask", ["exports", "FileMetadataCreatorTask", "KBResponseParser", "ChunkedFileUploaderTask", "UploadCommitterTask", "KBCommonUtils"], function (exports, _FileMetadataCreatorTask, KBResponseParser, _ChunkedFileUploaderTask, _UploadCommitterTask, KBCommonUtils) {
    "use strict";
    exports._esModule = true;

    var logger = voltmx.sdk.logsdk;
    var LOG_PREFIX = "BinaryUploaderTask : ";
    var FileMetadataCreatorTask = _FileMetadataCreatorTask.FileMetadataCreatorTask;
    var ChunkedFileUploaderTask = _ChunkedFileUploaderTask.ChunkedFileUploaderTask;
    var UploadCommitterTask = _UploadCommitterTask.UploadCommitterTask;
    var BinaryConstants = voltmx.sdk.binary.KBConstants;

    /**
     *  Creates BinaryUploaderTask Instance
     * @constructor
     */
    function BinaryUploaderTask() {
        this.inputContext = {};
    }


    /**
     * sets the input context for BinaryUploaderTask.
     * @param inputContext input context for BinaryUploaderTask.
     */
    BinaryUploaderTask.prototype.setInputContext = function(inputContext) {
        this.inputContext = inputContext;
    };

    /**
     *  Executes the BinaryUploaderTask
     * @returns {Promise<void>}
     */
    BinaryUploaderTask.prototype.execute = async function () {

        //Creates metadata for file
        var fileMetadataCreatorTask = new FileMetadataCreatorTask();
        fileMetadataCreatorTask.setInputContext(this.inputContext);
        var fileMetaData = await fileMetadataCreatorTask.execute();

        //Preparing input context for ChunkUploader task..
        //Commit URL.
        this.inputContext[BinaryConstants.COMMIT_URL] = this.inputContext[BinaryConstants.URL];
        Object.assign(this.inputContext, fileMetaData);
        var uploadTemplate = fileMetaData[BinaryConstants.UPLOAD_TEMPLATE];
        this.inputContext[BinaryConstants.URL] = KBResponseParser.extractFileOperationUrl(uploadTemplate,
            this.inputContext[BinaryConstants.URL], fileMetaData[BinaryConstants.FILE_ID]);
        uploadTemplate = JSON.parse(uploadTemplate);
        this.inputContext[BinaryConstants.UPLOAD_TEMPLATE] = uploadTemplate;

        //Upload raw bytes to server.
        var fileUploader = new ChunkedFileUploaderTask();
        fileUploader.setInputContext(this.inputContext);
        var fileuploaded = await fileUploader.execute();

        // response_headers of upload need to be sent in the commit call.
        if(!voltmx.sdk.isNullOrUndefined(fileuploaded[BinaryConstants.HTTP_RESPONSE]) &&
            !voltmx.sdk.isNullOrUndefined(fileuploaded[BinaryConstants.HTTP_RESPONSE][BinaryConstants.HEADERS])) {
            this.inputContext[BinaryConstants.RESPONSE_HEADERS] = fileuploaded[BinaryConstants.HTTP_RESPONSE][BinaryConstants.HEADERS];
        }
        //Commit uploaded file.
        var fileCommitter= new UploadCommitterTask();
        fileCommitter.setInputContext(this.inputContext);
        var response = (await fileCommitter.execute());

        return KBCommonUtils.getformattedResponseWithCommonParameters(response,
            this.inputContext[BinaryConstants.UPLOAD_PARAMS][BinaryConstants.METADATA]);
    };

    exports.BinaryUploaderTask = BinaryUploaderTask;
});
/**
 * CommonUtils for Binary SPA.
 * Created by Rakesh Gyanchandani on 28-12-2018.
 * Copyright © 2018 Kony. All rights reserved.
 */
define("KBCommonUtils", ["exports"], function (exports) {

    "use strict";
    var LOG_PREFIX = "KBCommonUtils : ";
    var binaryConstants = voltmx.sdk.binary.KBConstants;
    var sdkConstants = voltmx.sdk.constants;

    /**
     * Get Network Options.
     * @param inputContext of type JSON
     * @returns object of type json
     */
    function getNetworkOptions(inputContext) {
        var options = {};
        options[sdkConstants.IGNORE_MESSAGE_INTEGRITY] = inputContext[sdkConstants.IGNORE_MESSAGE_INTEGRITY];
        if(inputContext["xmlHttpRequestOptions"]) {
            options["xmlHttpRequestOptions"] = inputContext["xmlHttpRequestOptions"];
        }
        return options;
    }

    /**
     * creates valid odata query string from json object.
     * @param metadata
     * @returns {string}
     */
    function createFilterString(map) {
        var filterString = "";

        for(var key in map) {

            if(filterString.length != 0) {
                filterString += " and ";
            }

            filterString += key + " eq '" + map[key] + "'";
        }

        return filterString;
    }

    /**
     *creates valid query string from metadata.
     * @param metadata
     * @returns {string}
     */
    function createFilterStringFromMetadataAsQueryParams(metadata) {
        var filterString = "";

        for(var key in metadata) {

            if(filterString.length != 0) {
                filterString += "&";
            }

            filterString += key + "=" + metadata[key];
        }

        return filterString;
    }

    /**
     * append suffix to url.
     * @param url       url for binary
     * @param suffix    url to suffix.
     * @returns {*}
     */
    function appendSuffixtoUrl(url, suffix) {
        var result = url;

        if(url.includes("?")) {
            result += "&" + suffix;
        } else {
            result += "?" + suffix;
        }

        return result;
    }

    /**
     * formatting response like deleting headers and appending common info to response
     * @param response        response from server
     * @param requestParams   request inputs
     * @returns {json}        response from server with request params
     */
    function getformattedResponseWithCommonParameters(response, requestParams) {
        //Using voltmx.net.HttpRequest also provides headers in httpresponse as header could contain sensitive information,
        // therefore removing headers from response
        if (response[binaryConstants.HTTP_RESPONSE]) {
            delete response[binaryConstants.HTTP_RESPONSE];
        }
        if (response[binaryConstants.USER_INFO] && response[binaryConstants.USER_INFO][binaryConstants.HTTP_RESPONSE]) {
            delete response[binaryConstants.USER_INFO][binaryConstants.HTTP_RESPONSE];
        }
        if(requestParams && requestParams[binaryConstants.COMMIT_PROPERTIES]){
            // response will be containing commit_properties already. Deleting it from requestParams.
            delete requestParams[binaryConstants.COMMIT_PROPERTIES];
        }
        response[binaryConstants.REQUEST_CONTEXT] = requestParams;
        return response;
    }

    exports.getNetworkOptions = getNetworkOptions;
    exports.createFilterString = createFilterString;
    exports.createFilterStringFromMetadataAsQueryParams = createFilterStringFromMetadataAsQueryParams;
    exports.appendSuffixtoUrl = appendSuffixtoUrl;
    exports.getformattedResponseWithCommonParameters = getformattedResponseWithCommonParameters;
});

/**
 * Network wrapper for Binary SPA.
 * Created by Rakesh Gyanchandani on 27-12-2018.
 * Copyright © 2018 Kony. All rights reserved.
 */
define("KBNetworkUtils", ["exports", "KBError", "KBValidationUtils"], function (exports, _KBError, ValidationUtils) {

    "use strict";
    exports._esModule = true;

    var binaryLogger = voltmx.sdk.logsdk;
    var KBError = _KBError.KBError;
    var LOG_PREFIX = "KSBNetworkUtils : ";
    var networkProvider = new voltmxNetworkProvider();
    var KSErrorConstants = voltmx.sdk.binary.KBErrorConstants;
    var BinaryConstants = voltmx.sdk.binary.KBConstants;

    /**
     * Method to make GET calls to the server.
     * @param {string} syncServerAddress URL from where the download should occur.
     * @param {Object} queryParams JSON object containing URL query parameters, if any.
     * @param {Object} headers JSON object containing the headers to be sent.
     * @param {Object} options JSON object containing options to make the call.
     */
    var get = function (syncServerAddress, queryParams, headers, options) {

        if(voltmx.sdk.isNullOrUndefined(options)) {
            options = {};
        }

        options[voltmx.sdk.constants.IGNORE_MESSAGE_INTEGRITY] = true;
        //Adding queryParams in options
        options[voltmx.sdk.constants.QUERY_PARAMS] = queryParams;

        var networkPromise = new Promise(function (resolve, reject) {

            var networkSuccessCallback = function (response) {
                binaryLogger.debug(LOG_PREFIX + "Response body of network call : " + JSON.stringify(response));

                if(ValidationUtils.isNullOrEmptyObject(response) ||
                    voltmx.sdk.isNullOrUndefined(response[BinaryConstants.OP_STATUS]) ||
                     !ValidationUtils.isValidOpStatus(response[BinaryConstants.OP_STATUS])) {
                    reject(KSErrorConstants.CODE_HTTP_REQUEST_FAILED);
                }

                resolve(response);
            };

            var networkFailureCallback = function (errorObj) {
                var error;
                if (errorObj.errcode === voltmx.sdk.errorcodes.invalid_json_code) {
                    error = new KBError(KSErrorConstants.NW_INVALID_RESPONSE_OBJECT, errorObj);
                } else if (errorObj.errcode === voltmx.sdk.errorcodes.connectivity_error_code) {
                    error = new KBError(KSErrorConstants.NW_CONNECTION_TIMEOUT_ERROR, errorObj);
                } else if (errorObj.errcode === voltmx.sdk.errorcodes.integrity_check_failed) {
                    error = new KBError(KSErrorConstants.NW_MESSAGE_INTEGRITY_FAILURE, errorObj);
                } else {
                    error = new KBError(KSErrorConstants.GENERIC_NETWORK_ERROR, errorObj);
                }

                reject(error);
            };

            binaryLogger.debug(LOG_PREFIX + "URL : " + syncServerAddress);
            //Sending null for params and voltmxContentType for the GET call..
            networkProvider.get(syncServerAddress, null, headers, networkSuccessCallback, networkFailureCallback, null, options);
        });

        return networkPromise;
    };


    /**
     * Method to make POST calls to the server.
     * @param {string} syncServerAddress URL from where the download should occur.
     * @param {Object} queryParams JSON object containing URL query parameters, if any.
     * @param {Object} headers JSON object containing the headers to be sent.
     * @param {Object} body JSON object containing the body to be posted to the server.
     * @param {Object} options JSON object containing options to make the call.
     */
    var post = function (syncServerAddress, queryParams, headers, body, options, voltmxContentType) {

        //Check and add empty object..
        if (voltmx.sdk.isNullOrUndefined(body)) {
            body = {};
        }

        if(voltmx.sdk.isNullOrUndefined(options)) {
            options = {};
        }

        options[voltmx.sdk.constants.IGNORE_MESSAGE_INTEGRITY] = true;
        //Adding queryParams in options
        options[voltmx.sdk.constants.QUERY_PARAMS] = queryParams;

        var networkPromise = new Promise(function (resolve, reject) {

            function networkSuccessCallback(response) {
                binaryLogger.debug(LOG_PREFIX + "Response body of network call : " + JSON.stringify(response));

                if(ValidationUtils.isNullOrEmptyObject(response)) {
                    reject(KSErrorConstants.CODE_HTTP_REQUEST_FAILED);
                } else if(typeof(response) === "string") {
                    response = JSON.parse(response);
                }

                if(voltmx.sdk.isNullOrUndefined(response[BinaryConstants.OP_STATUS]) ||
                    !ValidationUtils.isValidOpStatus(response[BinaryConstants.OP_STATUS])) {
                    reject(KSErrorConstants.CODE_HTTP_REQUEST_FAILED);
                }

                resolve(response);
            }

            function networkFailureCallback(errorObj) {
                var error;
                if (errorObj.errcode === voltmx.sdk.errorcodes.invalid_json_code) {
                    error = new KBError(KSErrorConstants.NW_INVALID_RESPONSE_OBJECT, errorObj);
                } else if (errorObj.errcode === voltmx.sdk.errorcodes.connectivity_error_code) {
                    error = new KBError(KSErrorConstants.NW_CONNECTION_TIMEOUT_ERROR, errorObj);
                } else if (errorObj.errcode === voltmx.sdk.errorcodes.integrity_check_failed) {
                    error = new KBError(KSErrorConstants.NW_MESSAGE_INTEGRITY_FAILURE, errorObj);
                } else {
                    error = new KBError(KSErrorConstants.GENERIC_NETWORK_ERROR, errorObj);
                }
                reject(error);
            }

            binaryLogger.debug(LOG_PREFIX + "URL : " + syncServerAddress);
            //Sending 'application/json' as voltmxContentType to the network layer by default..
            if(!voltmxContentType || voltmxContentType === BinaryConstants.APPLICATION_JSON) {
                voltmxContentType = BinaryConstants.APPLICATION_JSON;
            }

            networkProvider.post(syncServerAddress, body, headers, networkSuccessCallback, networkFailureCallback, voltmxContentType, options);
        });

        return networkPromise;
    };


    /**
     * Method to make PUT calls to the server.
     * @param {string} syncServerAddress URL from where the download should occur.
     * @param {Object} queryParams JSON object containing URL query parameters, if any.
     * @param {Object} headers JSON object containing the headers to be sent.
     * @param {Object} body JSON object containing the body to be posted to the server.
     * @param {Object} options JSON object containing options to make the call.
     * @param {string} voltmxContentType string content-type of the body
     */
    var put = function (syncServerAddress, queryParams, headers, body, options, voltmxContentType) {

        //Check and add empty object..
        if (voltmx.sdk.isNullOrUndefined(body)) {
            body = {};
        }

        if(voltmx.sdk.isNullOrUndefined(options)) {
            options = {};
        }

        options[voltmx.sdk.constants.IGNORE_MESSAGE_INTEGRITY] = true;
        var networkPromise = new Promise(function (resolve, reject) {

            function networkSuccessCallback(response) {
                binaryLogger.debug(LOG_PREFIX + "Response body of network call : " + JSON.stringify(response));

                if(ValidationUtils.isNullOrEmptyObject(response) ||
                    voltmx.sdk.isNullOrUndefined(response[BinaryConstants.OP_STATUS]) ||
                    !ValidationUtils.isValidOpStatus(response[BinaryConstants.OP_STATUS])) {
                    reject(KSErrorConstants.CODE_HTTP_REQUEST_FAILED);
                }

                resolve(response);
            }

            function networkFailureCallback(errorObj) {
                var error;
                if (errorObj.errcode === voltmx.sdk.errorcodes.invalid_json_code) {
                    error = new KBError(KSErrorConstants.NW_INVALID_RESPONSE_OBJECT, errorObj);
                } else if (errorObj.errcode === voltmx.sdk.errorcodes.connectivity_error_code) {
                    error = new KBError(KSErrorConstants.NW_CONNECTION_TIMEOUT_ERROR, errorObj);
                } else if (errorObj.errcode === voltmx.sdk.errorcodes.integrity_check_failed) {
                    error = new KBError(KSErrorConstants.NW_MESSAGE_INTEGRITY_FAILURE, errorObj);
                } else {
                    error = new KBError(KSErrorConstants.GENERIC_NETWORK_ERROR, errorObj);
                }
                reject(error);
            }

            binaryLogger.debug(LOG_PREFIX + "URL : " + syncServerAddress);
            if(voltmx.sdk.isNullOrUndefined(voltmxContentType)){
               voltmxContentType = BinaryConstants.APPLICATION_JSON;
            }

            networkProvider.put(syncServerAddress, body, headers, networkSuccessCallback, networkFailureCallback, voltmxContentType, options);
        });

        return networkPromise;
    };

    /**
     * Method to make Delete calls to the server.
     * @param {string} syncServerAddress URL from where the download should occur.
     * @param {Object} queryParams JSON object containing URL query parameters, if any.
     * @param {Object} headers JSON object containing the headers to be sent.
     * @param {Object} body JSON object containing the body to be posted to the server.
     * @param {Object} options JSON object containing options to make the call.
     */
    var invokeDeleteRequest = function (syncServerAddress, queryParams, headers, body, options) {

        //Check and add empty object..
        if (voltmx.sdk.isNullOrUndefined(body)) {
            body = {};
        }

        if(voltmx.sdk.isNullOrUndefined(options)) {
            options = {};
        }

        options[voltmx.sdk.constants.IGNORE_MESSAGE_INTEGRITY] = true;
        //Adding queryParams in options
        options[voltmx.sdk.constants.QUERY_PARAMS] = queryParams;

        var networkPromise = new Promise(function (resolve, reject) {

            function networkSuccessCallback(response) {
                binaryLogger.debug(LOG_PREFIX + "Response body of network call : " + JSON.stringify(response));

                if(ValidationUtils.isNullOrEmptyObject(response) ||
                    voltmx.sdk.isNullOrUndefined(response[BinaryConstants.OP_STATUS]) ||
                    !ValidationUtils.isValidOpStatus(response[BinaryConstants.OP_STATUS])) {
                    reject(KSErrorConstants.CODE_HTTP_REQUEST_FAILED);
                }

                resolve(response);
            }

            function networkFailureCallback(errorObj) {
                var error;
                if (errorObj.errcode === voltmx.sdk.errorcodes.invalid_json_code) {
                    error = new KBError(KSErrorConstants.NW_INVALID_RESPONSE_OBJECT, errorObj);
                } else if (errorObj.errcode === voltmx.sdk.errorcodes.connectivity_error_code) {
                    error = new KBError(KSErrorConstants.NW_CONNECTION_TIMEOUT_ERROR, errorObj);
                } else if (errorObj.errcode === voltmx.sdk.errorcodes.integrity_check_failed) {
                    error = new KBError(KSErrorConstants.NW_MESSAGE_INTEGRITY_FAILURE, errorObj);
                } else {
                    error = new KBError(KSErrorConstants.GENERIC_NETWORK_ERROR, errorObj);
                }
                reject(error);
            }

            binaryLogger.debug(LOG_PREFIX + "URL : " + syncServerAddress);
            //Sending 'application/json' as voltmxContentType to the network layer by default..
            networkProvider.invokeDeleteRequest(syncServerAddress, body, headers, networkSuccessCallback, networkFailureCallback, "application/json", options);
        });

        return networkPromise;
    };

    exports.get = get;
    exports.post = post;
    exports.put = put;
    exports.invokeDeleteRequest = invokeDeleteRequest;
});
/**
 * Response Parser for Binary SPA.
 * Created by Rakesh Gyanchandani on 28-12-2018.
 * Copyright © 2018 Kony. All rights reserved.
 */
define("KBResponseParser", ["exports", "KBValidationUtils", "KBError"], function (exports, ValidationUtils, _KBError) {

    "use strict";
    var LOG_PREFIX = "KBResponseParser : ";
    var BinaryConstants = voltmx.sdk.binary.KBConstants;
    var KBErrorConstants = voltmx.sdk.binary.KBErrorConstants;
    var KBError = _KBError.KBError;
    var binaryLogger = voltmx.sdk.logsdk;

    /**
     * extract url from template.
     * @param template               template map
     * @param currentServiceUrl      current url
     * @param fileId                 file id to be downloaded.
     * @returns {*}
     */
    function extractFileOperationUrl(template, currentServiceUrl, fileId) {
        if(ValidationUtils.isNullOrEmptyObject(template)) {
            var errMsg = "download/upload template is either null or empty";
            binaryLogger.error(errMsg);
            throw new KBError(KBErrorConstants.CODE_TEMPLATE_PARSING, errMsg);
        }

        var map = JSON.parse(template);
        var relativePath = map[BinaryConstants.RELATIVE_PATH];
        var domainUrl = map[BinaryConstants.DOMAIN];
        if(domainUrl !== BinaryConstants.MIDDLEWARE_DOMAIN){
            return domainUrl + relativePath;
        }

        var baseUrl = extractBaseServiceUrl(currentServiceUrl);
        if (ValidationUtils.isNullOrEmptyObject(baseUrl)) {
            var errMsg = "Malformed URL.";
            binaryLogger.error(errMsg);
            throw new KBError(KBErrorConstants.CODE_MALFORMED_URL, errMsg);
        }

        return (baseUrl + relativePath);
    }

    /**
     * extract base service url.
     * @param url        url of the file to be downloaded.
     * @returns {*}
     */
    function extractBaseServiceUrl(url) {
        var serviceIndex = url.indexOf(BinaryConstants.SERVICES);
        if (serviceIndex >= 0) {
            return url.substring(0, serviceIndex) + BinaryConstants.SERVICES;
        } else {
            return null;
        }
    }


    /**
     * Extracts the query Params from a url fragment string
     * @param url URL fragment to be parsed
     */
    function extractQueryParams(url){
        var queryParams = {};
        var fragment = url.split("?")[1];
        if(fragment){
            var parts = fragment.split("&");
            var arrayLength = parts.length;
            for (var i = 0; i < arrayLength; i++) {
                var splitParts = parts[i].split(/=(.+)/);
                queryParams[splitParts[0]] = splitParts[1];
            }
        }

        return queryParams;
    }

    exports.extractFileOperationUrl = extractFileOperationUrl;
    exports.extractBaseServiceUrl = extractBaseServiceUrl;
    exports.extractQueryParams = extractQueryParams;
});

/**
 * Validation Utils for Binary SPA.
 * Created by Rakesh Gyanchandani on 28-12-2018.
 * Copyright © 2018 Kony. All rights reserved.
 */
define("KBValidationUtils", ["exports", "KBError", "KBCallbacks"], function (exports, _KBError, _KBCallbacks) {

    var LOG_PREFIX = "KBValidationUtils : ";
    var KBError = _KBError.KBError;
    var KBErrorConstants = voltmx.sdk.binary.KBErrorConstants;
    var BinaryConstants = voltmx.sdk.binary.KBConstants;
    var BinaryCallbacks = _KBCallbacks.KBCallbacks;
    var binaryLogger = voltmx.sdk.logsdk;
    var fileUploadType = voltmx.sdk.binary.FileUploadType;
    var sdkConstants = voltmx.sdk.constants;

    /**
     * isNullOrEmptyObject - checks of the object is null/undefined or empty
     * @param object of type boolean/string/JSON
     * @returns {boolean}
     */
    function isNullOrEmptyObject(object) {
        return (voltmx.sdk.isNullOrUndefined(object) || voltmx.sdk.isEmptyObject(object));
    }

    /**
     * Validates URL.
     * @param url URL to be validated.
     * @returns {boolean}
     */
    function validateUrl(url) {
        var pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

        if(!pattern.test(url)) {
            var errorMsg = "Invalid url provided.";
            binaryLogger.error(LOG_PREFIX, errorMsg);
            throw new KBError(KBErrorConstants.CODE_MISSING_SERVER_URL, errorMsg);
        }

        return true;
    }

    /**
     * Returns the value for disable integrity key.
     * @param options option containing disable integrity key.
     * @returns {boolean}
     */
    function disableIntegrityCheck(options) {
        var result = true;

        if(options != null && options[sdkConstants.IGNORE_MESSAGE_INTEGRITY]) {

            if(options[sdkConstants.IGNORE_MESSAGE_INTEGRITY] instanceof Boolean) {
                result = options[sdkConstants.IGNORE_MESSAGE_INTEGRITY];
            } else if(options[sdkConstants.IGNORE_MESSAGE_INTEGRITY] instanceof String) {

                if(options[sdkConstants.IGNORE_MESSAGE_INTEGRITY].toLowerCase() == 'false') {
                    result = false;
                } else {
                    result = true;
                }
            }
        }

        return result;
    }

    /**
     * Validate and create binary callbacks.
     * @param binaryCallback
     * @returns {*}
     */
    function validateAndCreateBinaryCallbackIfNotProvided(binaryCallback) {

        if(binaryCallback == null) {
            binaryLogger.warn("Binary Callbacks are null.");
            binaryCallback = new BinaryCallbacks();
        } else if(!binaryCallback.successCallback || !binaryCallback.failureCallback) {
            binaryLogger.warn((binaryCallback.successCallback ? "failureCallback" : "successCallback") + " is null.");
            binaryCallback = new BinaryCallbacks(binaryCallback.successCallback, binaryCallback.failureCallback);
        }

        return binaryCallback;
    }

    /**
     * Validates opstatus
     * @param opstatus
     * @returns {boolean}
     */
    function isValidOpStatus(opstatus) {
        return (opstatus == 0);
    }
    
    function validateFileNamespaceAndSecurityKey(value, inputParamString) {

        if(value.hasOwnProperty(BinaryConstants.FILE_NAMESPACE) && voltmx.sdk.isNullOrUndefined(value[BinaryConstants.FILE_NAMESPACE])){
            var errMsg = " Null value found in " + inputParamString + " for input: " + BinaryConstants.FILE_NAMESPACE + " in " + BinaryConstants.METADATA;
            binaryLogger.error(LOG_PREFIX + errMsg);
            throw new KBError(KBErrorConstants.CODE_DOWNLOAD_MISSING_PARAMETER, errMsg);
        }

        if(value.hasOwnProperty(BinaryConstants.SECURITY_KEY) && voltmx.sdk.isNullOrUndefined(value[BinaryConstants.SECURITY_KEY])){
            var errMsg = " Null value found in " + inputParamString + " for input: " + BinaryConstants.SECURITY_KEY + " in " + BinaryConstants.METADATA;
            binaryLogger.error(LOG_PREFIX + errMsg);
            throw new KBError(KBErrorConstants.CODE_DOWNLOAD_MISSING_PARAMETER, errMsg);
        }
    }

    /**
     * Validates download parameters.
     * @param downloadParams
     */
    function validateDownloadParams(downloadParams) {

        if(isNullOrEmptyObject(downloadParams)) {
            var errMsg = " Null or empty value found for downloadParams";
            binaryLogger.error(LOG_PREFIX + errMsg);
            throw new KBError(KBErrorConstants.CODE_DOWNLOAD_INVALID_PARAMETER_VALUE, errMsg);
        }

        if(isNullOrEmptyObject(downloadParams[BinaryConstants.HEADERS])) {
            var errMsg = " Missing parameters " + BinaryConstants.HEADERS + " in downloadparams";
            binaryLogger.error(LOG_PREFIX + errMsg);
            throw new KBError(KBErrorConstants.CODE_DOWNLOAD_MISSING_PARAMETER, errMsg);
        }

        var value = downloadParams[BinaryConstants.HEADERS];
        if(typeof(value) !== "object") {
            var errMsg = " Datatype not of type JSON for " + BinaryConstants.HEADERS + " in downloadparams";
            binaryLogger.error(LOG_PREFIX + errMsg);
            throw new KBError(KBErrorConstants.CODE_DOWNLOAD_INVALID_PARAMETER_TYPE, errMsg);
        }

        if(isNullOrEmptyObject(downloadParams[BinaryConstants.METADATA])) {
            var errMsg = " Missing parameters " + BinaryConstants.METADATA + " in downloadparams";
            binaryLogger.error(LOG_PREFIX + errMsg);
            throw new KBError(KBErrorConstants.CODE_DOWNLOAD_MISSING_PARAMETER, errMsg);
        }

        value = downloadParams[BinaryConstants.METADATA];
        if(typeof(value) !== "object") {
            var errMsg = " Datatype not of type JSON for " + BinaryConstants.METADATA + " in downloadparams";
            binaryLogger.error(LOG_PREFIX + errMsg);
            throw new KBError(KBErrorConstants.CODE_DOWNLOAD_INVALID_PARAMETER_TYPE, errMsg);
        }

        if(isNullOrEmptyObject(value[BinaryConstants.FILE_ID])) {
            var errMsg = " Missing parameters " + BinaryConstants.FILE_ID + " in " + BinaryConstants.METADATA;
            binaryLogger.error(LOG_PREFIX + errMsg);
            throw new KBError(KBErrorConstants.CODE_DOWNLOAD_MISSING_PARAMETER, errMsg);
        }

        validateFileNamespaceAndSecurityKey(value, BinaryConstants.DOWNLOAD_PARAMS);
    }

    /**
     * Validates upload parameters.
     * @param uploadParams
     */
    function validateUploadParams(uploadParams) {

        if(isNullOrEmptyObject(uploadParams)) {
            var errMsg = " Null or empty value found for uploadParams";
            binaryLogger.error(LOG_PREFIX + errMsg);
            throw new KBError(KBErrorConstants.CODE_UPLOAD_INVALID_PARAMETER_VALUE, errMsg);
        }

        if(isNullOrEmptyObject(uploadParams[BinaryConstants.HEADERS])) {
            var errMsg = " Missing parameters " + BinaryConstants.HEADERS + " in uploadParams";
            binaryLogger.error(LOG_PREFIX + errMsg);
            throw new KBError(KBErrorConstants.CODE_UPLOAD_MISSING_PARAMETER, errMsg);
        }

        var value = uploadParams[BinaryConstants.HEADERS];
        if(typeof(value) !== "object") {
            var errMsg = " Datatype not of type JSON for " + BinaryConstants.HEADERS + " in uploadparams";
            binaryLogger.error(LOG_PREFIX + errMsg);
            throw new KBError(KBErrorConstants.CODE_UPLOAD_INVALID_PARAMETER_DATA_TYPE, errMsg);
        }

        if(isNullOrEmptyObject(uploadParams[BinaryConstants.METADATA])) {
            var errMsg = " Missing parameters " + BinaryConstants.METADATA + " in uploadParams";
            binaryLogger.error(LOG_PREFIX + errMsg);
            throw new KBError(KBErrorConstants.CODE_UPLOAD_MISSING_PARAMETER, errMsg);
        }

        value = uploadParams[BinaryConstants.METADATA];
        if(typeof(value) !== "object") {
            var errMsg = " Datatype not of type JSON for " + BinaryConstants.METADATA + " in uploadParams";
            binaryLogger.error(LOG_PREFIX + errMsg);
            throw new KBError(KBErrorConstants.CODE_UPLOAD_INVALID_PARAMETER_DATA_TYPE, errMsg);
        }

        if(isNullOrEmptyObject(value[BinaryConstants.FILE_NAME])) {
            var errMsg = " Missing parameters " + BinaryConstants.FILE_NAME + " in " + BinaryConstants.METADATA ;
            binaryLogger.error(LOG_PREFIX + errMsg);
            throw new KBError(KBErrorConstants.CODE_UPLOAD_MISSING_PARAMETER, errMsg);
        }

        validateFileNamespaceAndSecurityKey(value, BinaryConstants.UPLOAD_PARAMS);

        if(isNullOrEmptyObject(uploadParams[BinaryConstants.FILE_OBJECT])) {
            var errMsg = " Missing parameters " + BinaryConstants.FILE_OBJECT + " in uploadParams";
            binaryLogger.error(LOG_PREFIX + errMsg);
            throw new KBError(KBErrorConstants.CODE_UPLOAD_MISSING_PARAMETER, errMsg);
        }

        //Validation of whether fileObject is an instance of File/Blob.
        if(!((uploadParams[BinaryConstants.FILE_OBJECT] instanceof File) || (uploadParams[BinaryConstants.FILE_OBJECT] instanceof Blob))) {
            var errMsg = " Parameters " + BinaryConstants.FILE_OBJECT + " not of type file or blob in uploadParams";
            binaryLogger.error(LOG_PREFIX + errMsg);
            throw new KBError(KBErrorConstants.CODE_UPLOAD_MISSING_PARAMETER, errMsg);
        }

        if(uploadParams[BinaryConstants.FILE_OBJECT].size === 0) {
            var errMsg = " Null value found for " + BinaryConstants.FILE_OBJECT + " in uploadParams";
            binaryLogger.error(LOG_PREFIX + errMsg);
            throw new KBError(KBErrorConstants.CODE_UPLOAD_INVALID_PARAMETER_VALUE, errMsg);
        }
    }

    /**
     * Validates update parameters.
     * @param updateParams
     */
    function validateUpdateParams(updateParams) {

        if(isNullOrEmptyObject(updateParams)) {
            var errMsg = " Null or empty value found for updateParams";
            binaryLogger.error(LOG_PREFIX + errMsg);
            throw new KBError(KBErrorConstants.CODE_UPDATE_INVALID_PARAMETER_VALUE, errMsg);
        }

        if(isNullOrEmptyObject(updateParams[BinaryConstants.HEADERS])) {
            var errMsg = " Missing parameters " + BinaryConstants.HEADERS + " in updateParams";
            binaryLogger.error(LOG_PREFIX + errMsg);
            throw new KBError(KBErrorConstants.CODE_UPDATE_MISSING_PARAMETER, errMsg);
        }

        var value = updateParams[BinaryConstants.HEADERS];
        if(typeof(value) !== "object") {
            var errMsg = " Datatype not of type JSON for " + BinaryConstants.HEADERS + " in updateParams";
            binaryLogger.error(LOG_PREFIX + errMsg);
            throw new KBError(KBErrorConstants.CODE_UPLOAD_INVALID_PARAMETER_DATA_TYPE, errMsg);
        }

        if(isNullOrEmptyObject(updateParams[BinaryConstants.METADATA])) {
            var errMsg = " Missing parameters " + BinaryConstants.METADATA + " in updateParams";
            binaryLogger.error(LOG_PREFIX + errMsg);
            throw new KBError(KBErrorConstants.CODE_UPDATE_MISSING_PARAMETER, errMsg);
        }

        value = updateParams[BinaryConstants.METADATA];
        if(typeof(value) !== "object") {
            var errMsg = " Datatype not of type JSON for " + BinaryConstants.METADATA + " in updateParams";
            binaryLogger.error(LOG_PREFIX + errMsg);
            throw new KBError(KBErrorConstants.CODE_UPDATE_INVALID_PARAMETER_DATA_TYPE, errMsg);
        }

        if(isNullOrEmptyObject(value[BinaryConstants.FILE_ID])) {
            var errMsg = " Missing parameters " + BinaryConstants.FILE_ID + " in " + BinaryConstants.METADATA;
            binaryLogger.error(LOG_PREFIX + errMsg);
            throw new KBError(KBErrorConstants.CODE_UPLOAD_MISSING_PARAMETER, errMsg);
        }
    }

    /**
     * Validates delete parameters.
     * @param deleteParams
     */
    function validateDeleteParams(deleteParams) {
        if(isNullOrEmptyObject(deleteParams)) {
            var errMsg = " Null or empty value found for deleteParams";
            binaryLogger.error(LOG_PREFIX + errMsg);
            throw new KBError(KBErrorConstants.CODE_DELETE_INVALID_PARAMETER, errMsg);
        }
    }

    /**
     * validates object for null or empty value.
     * @param value         value to validate..
     * @param errObj        error object to throw in case of null or empty.
     * @param errMsg        error message to log if validation failed.
     */
    function validObjectForNullOREmptyValue(value, errObj, errMsg) {
        if(isNullOrEmptyObject(value)) {
            binaryLogger.error(LOG_PREFIX + errMsg);
            throw new KBError(errObj, errMsg);
        }
    }

    /**
     * generates common params for input context.
     * @param url          url for Binary APIs.
     * @param headers      header for Binary APIs.
     * @param options      options for Binary APIs
     */
    function generateCommonInputContext(url, headers, options) {
        var inputContext = {};
        inputContext[BinaryConstants.URL] = url;

        if(!isNullOrEmptyObject(options)) {
            inputContext[BinaryConstants.OPTIONS] = options;
        } else {
            binaryLogger.warn("No options are defined.");
        }

        if (!isNullOrEmptyObject(headers)) {
            inputContext[BinaryConstants.HEADERS] = headers;
        } else {
            binaryLogger.warn("Headers is not defined");
        }

        inputContext[sdkConstants.IGNORE_MESSAGE_INTEGRITY] = disableIntegrityCheck(options);

        return inputContext;
    }

    exports.isNullOrEmptyObject = isNullOrEmptyObject;
    exports.validateUrl = validateUrl;
    exports.disableIntegrityCheck = disableIntegrityCheck;
    exports.validateAndCreateBinaryCallbackIfNotProvided = validateAndCreateBinaryCallbackIfNotProvided;
    exports.isValidOpStatus = isValidOpStatus;
    exports.validateDownloadParams = validateDownloadParams;
    exports.validateUploadParams = validateUploadParams;
    exports.validateUpdateParams = validateUpdateParams;
    exports.validateDeleteParams = validateDeleteParams;
    exports.validObjectForNullOREmptyValue = validObjectForNullOREmptyValue;
    exports.generateCommonInputContext = generateCommonInputContext;
});

define("SPAFileStorage", ["KBFileStorageManager", "KBCallbacks"], function (_KBFileStorageManager, _KBCallbacks) {

    var BinaryCallbacks = _KBCallbacks.KBCallbacks;

    voltmx.sdk.FileStorageClasses.listFiles = function (url, criteria, headers, successCallback, failureCallback, options) {
        _KBFileStorageManager.getInstance().listFiles(url, criteria, headers, new BinaryCallbacks(successCallback, failureCallback), options);
    };

    voltmx.sdk.FileStorageClasses.upload = function (url, uploadInputType, uploadParams, successCallback, failureCallback, options) {
        _KBFileStorageManager.getInstance().upload(url, uploadInputType, uploadParams, new BinaryCallbacks(successCallback, failureCallback), options);
    };

    voltmx.sdk.FileStorageClasses.download = function (url, downloadParams,  successCallback, failureCallback, options) {
        _KBFileStorageManager.getInstance().download(url, downloadParams, new BinaryCallbacks(successCallback, failureCallback), options);
    };

    voltmx.sdk.FileStorageClasses.update = function (url, updateParams, successCallback, failureCallback, options) {
        _KBFileStorageManager.getInstance().update(url, updateParams, new BinaryCallbacks(successCallback, failureCallback), options);
    };

    voltmx.sdk.FileStorageClasses.deleteById = function (url, fileId, deleteParams, headers, successCallback, failureCallback, options) {
        _KBFileStorageManager.getInstance().deleteById(url, fileId, deleteParams, headers, new BinaryCallbacks(successCallback, failureCallback), options);
    };

    voltmx.sdk.FileStorageClasses.deleteByCriteria = function (url, deleteParams, headers, successCallback, failureCallback, options) {
        _KBFileStorageManager.getInstance().deleteByCriteria(url, deleteParams, headers, new BinaryCallbacks(successCallback, failureCallback), options);
    };

    voltmx.sdk.FileStorageClasses.abort = function (url, fileId, abortParams, headers, successCallback, failureCallback, options) {
        _KBFileStorageManager.getInstance().deleteById(url, fileId, abortParams, headers, new BinaryCallbacks(successCallback, failureCallback), options);
    };
});

require(["SPAFileStorage"]);
