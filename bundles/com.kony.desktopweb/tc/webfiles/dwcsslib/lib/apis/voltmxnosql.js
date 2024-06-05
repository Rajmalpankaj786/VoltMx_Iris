/* globals Promise */
Object.defineProperty(voltmx, 'nosql', {configurable:false, enumerable:false, writable:false, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$, _validTypes = null, _validOrders = null, _validOperators = null,
        _AND = '&&', _ASCENDING = 'ASC', _DESCENDING = 'DESC', _EQ = '=',
        _GT = '>', _GTE = '>=', _LT = '<', _LTE = '<=', _NEQ = '!=',
        _OR = '||', _READ = 'read', _READ_WRITE = 'readwrite', _REGEXP = null,
        _NOT_SUPPORTED_MSG = 'Your browser doesn\'t support a stable version of IndexedDB.',
        _ENDS_WITH = '', _CONTAINS = '', _NOT_CONTAINS = '', _NOT_ENDS_WITH = '',
        _NOT_STARTS_WITH = '', _STARTS_WITH = '',
        _iDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;


    var _deleteAllByIndex = function(objectStore, index, keyRangeValue) {
        return new Promise(function(resolve, reject) {
            var cursor, i, recordToDelete = [], recordCount = 0, record, successCallback;

            successCallback = function(/*event*/) {
                recordCount++;

                if(recordCount === recordToDelete.length) {
                    resolve();
                }
            };

            cursor = index.openCursor(keyRangeValue);
            cursor.onsuccess = function(event) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, cursor = event.target.result, request;

                if(cursor) {
                    if($KU.browser('name') === 'safari') {
                        record = cursor.primaryKey;
                        recordToDelete.push(record);
                    } else {
                        request = cursor.delete();

                        request.onsuccess = function(/*event*/) {
                            //Do nothing
                        };
                        request.onerror = function(event) {
                            reject(event);
                        };
                    }

                    cursor.continue();
                } else {
                    if(recordToDelete.length === 0) { //it gets executed for Safari and also in the case of records not found for applied filter
                        resolve();
                    } else {
                        for(i=0; i<recordToDelete.length; i++) {
                            request = objectStore.delete(recordToDelete[i]);
                            request.onsuccess = successCallback.bind(this, recordCount, recordToDelete);
                            request.onerror = function(event) {
                                reject(event);
                            };
                        }
                    }
                }
            };

            cursor.onerror = function(event) {
                reject(event);
            };
        });
    };


    var _evaluate = function(record, rule) {
        var result = false, col = record[rule.column], val = rule.value;

        switch(rule.operator) {
            case _ENDS_WITH:
                result = (col.indexOf(val) === (col.length - val.length)) ? true : false;
                break;
            case _EQ:
                result = (col === val);
                break;
            case _GT:
                result = (col > val);
                break;
            case _GTE:
                result = (col >= val);
                break;
            case _CONTAINS:
                result = (col.indexOf(val) >= 0) ? true : false;
                break;
            case _LT:
                result = (col < val);
                break;
            case _LTE:
                result = (col <= val);
                break;
            case _NEQ:
                result = (col !== val);
                break;
            case _NOT_CONTAINS:
                result = (col.indexOf(val) >= 0) ? false : true;
                break;
            case _NOT_ENDS_WITH:
                result = (col.indexOf(val) === (col.length - val.length)) ? false : true;
                break;
            case _NOT_STARTS_WITH:
                result = (col.indexOf(val) === 0) ? false : true;
                break;
            case _STARTS_WITH:
                result = (col.indexOf(val) === 0) ? true : false;
                break;
            case _REGEXP:
                val.lastIndex = 0;
                result = val.test(col);
                break;
            default:
                break;
        }

        return result;
    };


    var _expression = function(record, condition) {
        var str = '', c = 0, clen = condition.length;

        for(c=0; c<clen; c++) {
            if(condition[c] instanceof Array) {
                str += _expression(record, condition[c]);
            } else if(typeof condition[c] === 'string') {
                str += (' ' + condition[c] + ' ');
            } else if(typeof condition[c] === 'object' && condition[c]) {
                str += _evaluate(record, condition[c]);
            }
        }

        return ('(' + str + ')');
    }; //eval(_expression(record, condition))


    var _filterRecords = function(records, condition) {
        return records.filter(function(record) {
            return _isConditionMatched(record, condition);
        });
    };


    //This method is the polyfil of ObjectStore getAll API.
    //In Edge browser getAll API is not available on ObjectStore
    var _getAll = function(objectStore) {
        var records = [];

        return new Promise(function(resolve, reject) {
            var cursor = objectStore.openCursor();
            cursor.onsuccess = function(event) {
                var cursor = event.target.result, record;

                if(cursor) {
                    record = cursor.value;
                    records.push(record);
                    cursor.continue();
                } else {
                    resolve(records);
                }
            };

            cursor.onerror = function(event) {
                reject(event);
            };
        });
    };


    var _getAllByIndex = function(index, keyRangeValue) {
        var records = [];

        return new Promise(function(resolve, reject) {
            var cursor = index.openCursor(keyRangeValue);

            cursor.onsuccess = function(event) {
                var cursor = event.target.result, record;

                if(cursor) {
                    record = cursor.value;
                    records.push(record);
                    cursor.continue();
                } else {
                    resolve(records);
                }
            };

            cursor.onerror = function(event) {
                reject(event);
            };
        });
    };


    var _getDataBaseName = function(dbName) {
        var $K = voltmx.$kwebfw$, $KA = $K.app;

        return ($KA.id + '_' + dbName);
    };


    var _getKeyRangeValue = function(data) {
        var keyRangeValue;

        switch(data.operator) {
            case _EQ:
                keyRangeValue = IDBKeyRange.only(data.value);
                break;
            case _GT:
                keyRangeValue = IDBKeyRange.lowerBound(data.value, true);
                break;
            case _GTE:
                keyRangeValue = IDBKeyRange.lowerBound(data.value);
                break;
            case _LT:
                keyRangeValue = IDBKeyRange.upperBound(data.value, true);
                break;
            case _LTE:
                keyRangeValue = IDBKeyRange.upperBound(data.value);
                break;
            default:
                break;
            //need to find solution for mosule.NEQ
        }

        return keyRangeValue;
    };


    var _getObjectValues= function(obj) {
        var values = [], key;

        for(key in obj) {
            if(Object.prototype.hasOwnProperty.call(obj, key)) {
                values.push(obj[key]);
            }
        }

        return values;
    };


    var _isConditionOptimizable = function(condition, objectStore) {
        var canOperatorFitInKeyRange, column, isColumnIndexed, operator, isValueBoolean;

        if(!(condition instanceof voltmx.nosql.Condition)
        || condition.data.length !== 1) {
            return false;
        }

        column = condition.data[0].column;
        operator = condition.data[0].operator;
        isColumnIndexed = objectStore.indexNames.contains(column);
        canOperatorFitInKeyRange = (operator !== _NEQ && operator !== _REGEXP);
        isValueBoolean = (typeof condition.data[0].value === 'boolean');

        return (isColumnIndexed && canOperatorFitInKeyRange && !isValueBoolean);
    };


    var _isConditionMatched = function(record, condition) {
        return eval(_expression(record, condition)); // eslint-disable-line no-eval
    };


    var _replaceRecordValues = function(record, valueObject, includeKeys) {
        var key;

        for(key in valueObject) {
            if(includeKeys instanceof Array) {
                if(includeKeys.indexOf(key) !== -1) {
                    record[key] = valueObject[key];
                }
            } else {
                record[key] = valueObject[key];
            }
        }

        return record;
    };


    var _updateAllByIndex = function(objectStore, index, keyRangeValue, updateObject) {
        return new Promise(function(resolve, reject) {
            var cursor, i, recordCount = 0, recordsToAdd = [], successCallback;

            successCallback = function(/*event*/) {
                recordCount++;

                if(recordCount === recordsToAdd.length) {
                    resolve();
                }
            };

            cursor = index.openCursor(keyRangeValue);

            cursor.onsuccess = function(event) {
                var $K = voltmx.$kwebfw$, $KU = $K.utils, record,
                    cursor = event.target.result, request;

                if(cursor) {
                    record = cursor.value;
                    record = _replaceRecordValues(record, updateObject);

                    if($KU.browser('name') === 'safari') {
                        recordsToAdd.push(record);
                    } else {
                        request = cursor.update(record);

                        request.onsuccess = function(/*event*/) {
                            //Do nothing
                        };
                        request.onerror = function(/*event*/) {
                            reject();
                        };
                    }

                    cursor.continue();
                } else {
                    if(recordsToAdd.length === 0) {
                        resolve();
                    } else {
                        for(i=0; i<recordsToAdd.length; i++) {
                            request = objectStore.put(recordsToAdd[i]);
                            request.onsuccess = successCallback.bind(this, recordCount, recordsToAdd);

                            request.onerror = function(event) {
                                reject(event);
                            };
                        }
                    }
                }
            };

            cursor.onerror = function(event) {
                reject(event);
            };
        });
    };


    /***************************************************************************
    *                                                                          *
    *                                                                          *
    ****************************************************************************/
    var _addOrReplaceRecords = function $K_nosql_addOrReplaceRecords(transaction, tableName, records) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, promise = null;
        $KU.log({api:'voltmx.nosql.addOrReplaceRecords', enter:true});
        if(!_iDB) {
            $KU.log('error', _NOT_SUPPORTED_MSG);
        } else {
            promise = new Promise(function(resolve, reject) {
                var i = 0, storeReq = null, tx = null, store = null,
                    onerrorcb = function(event) {
                        reject(event.target.error);
                    },
                    replaceNext = function() {
                        if(i < records.length) {
                            storeReq = store.put(records[i]);
                            storeReq.onsuccess = replaceNext;
                            storeReq.onerror = onerrorcb;
                            ++i;
                        } else {
                            $KU.log({api:'voltmx.nosql.addOrReplaceRecords', exit:true});
                            resolve();
                        }
                    };

                if(!(transaction instanceof _Transaction)) {
                    $KU.log('error', 'Pass proper transaction object.');
                    reject({'errorMsg': 'Pass proper transaction object.'});
                }

                tx = transaction.tx;
                store = tx.objectStore(tableName);

                replaceNext();
            });

            return promise;
        }
    };


    var _addRecords = function $K_nosql_addRecords(transaction, tableName, data) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, promise = null;
        $KU.log({api:'voltmx.nosql.addRecords', enter:true});
        if(!_iDB) {
            $KU.log('error', _NOT_SUPPORTED_MSG);
        } else {
            promise = new Promise(function(resolve, reject) {
                var i = 0, storeReq = null, tx = null, store = null,
                    onerrorcb = function(event) {
                        $KU.log('error', 'unknown error' + event.target.error);
                        reject(event.target.error);
                    },
                    addNext = function() {
                        if(i < data.length) {
                            storeReq = store.add(data[i]);
                            storeReq.onsuccess = addNext;
                            storeReq.onerror = onerrorcb;
                            ++i;
                        } else {
                            $KU.log({api:'voltmx.nosql.addRecords', exit:true});
                            resolve();
                        }
                    };

                if(transaction instanceof _Transaction) {
                    tx = transaction.tx;
                    store = tx.objectStore(tableName);
                    addNext();
                } else {
                    $KU.log('error', 'Pass proper transaction object.');
                    reject({errorMsg: 'Pass proper transaction object.'});
                }
            });

            return promise;
        }
    };


    var _clearTable = function $K_nosql_clearTable(transaction, tableName) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, promise = null;
        $KU.log({api:'voltmx.nosql.clearTable', enter:true});
        if(!_iDB) {
            $KU.log('error', _NOT_SUPPORTED_MSG);
        } else {
            promise = new Promise(function(resolve, reject) {
                var objectStore, tx, request;

                if(transaction instanceof _Transaction) {
                    tx = transaction.tx;
                    objectStore = tx.objectStore(tableName);
                    request = objectStore.clear();

                    request.onsuccess = function(/*event*/) {
                        $KU.log({api:'voltmx.nosql.clearTable', exit:true});
                        resolve();
                    };
                    request.onerror = function(event) {
                        reject(event.target.error);
                    };
                } else {
                    $KU.log('error', 'Pass proper transaction object.');
                    reject({errorMsg: 'Pass proper transaction object.'});
                }
            });

            return promise;
        }
    };


    var _closeDatabase = function $K_nosql_closeDatabase(database) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, promise = null;

        $KU.log({api:'voltmx.nosql.closeDatabase', enter:true});
        if(!_iDB) {
            $KU.log('error', _NOT_SUPPORTED_MSG);
        } else {
            promise = new Promise(function(resolve, reject) {
                var db;

                if(database instanceof _DataBase) {
                    db = database.db;
                    try{
                        db.close();
                        delete database.dbOpenRequest;
                        $KU.log({api:'voltmx.nosql.closeDatabase', exit:true});
                        resolve();
                    } catch(error) {
                        $KU.log('error', 'unknown error' + error);
                        delete database.dbOpenRequest;
                        reject(error);
                    }
                } else {
                    $KU.log('error', 'Pass proper database object.');
                    reject({'errorMsg': 'Pass proper database object.'});
                }
            });

            return promise;
        }
    };


    var _createIndices = function $K_nosql_createIndices(database, tableName, indexes) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, promise = null;

        $KU.log({api:'voltmx.nosql.createIndices', enter:true});
        if(!_iDB) {
            $KU.log('error', _NOT_SUPPORTED_MSG);
        } else {
            promise = new Promise(function(resolve, reject) {
                var request, store, transaction, index;

                try{
                    request = database.dbOpenRequest;
                    transaction = request.transaction;
                    store = transaction.objectStore(tableName);

                    for(index in indexes) {
                        store.createIndex(index, index, indexes[index]);
                    }
                } catch(error) {
                    reject(error);
                }

                transaction.oncomplete = function(/*e*/) {
                    $KU.log({api:'voltmx.nosql.createIndices', exit:true});
                    resolve(true);
                };
            });

            return promise;
        }
    };


    var _createTable = function $K_nosql_createTable(transaction, tableName, config) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, index = '',
            primaryKey = config.primaryKey, objectStore = null,
            indexes = config.indexes || {}, db = transaction.db;
            /*autoIncrement = $KU.is(primaryKey, 'array') ? false : config.autoIncrement;*/

        $KU.log({api:'voltmx.nosql.createTable', enter:true});
        if(!_iDB) {
            $KU.log('error', _NOT_SUPPORTED_MSG);
        } else {
            objectStore = db.createObjectStore(tableName, {keyPath: primaryKey, autoIncrement: false});
            for(index in indexes) {
                objectStore.createIndex(index, index, indexes[index]);
            }
        }
        $KU.log({api:'voltmx.nosql.createTable', exit:true});
    };


    var _databaseExists = function $K_nosql_databaseExists(databaseName) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, promise = null;

        $KU.log({api:'voltmx.nosql.databaseExists', enter:true});
        if(!_iDB) {
            $KU.log('error', _NOT_SUPPORTED_MSG);
        } else {
            promise = new Promise(function(resolve, reject) {
                var request = _iDB.open(_getDataBaseName(databaseName));

                request.onupgradeneeded = function(event) {
                    event.target.transaction.abort();
                    $KU.log({api:'voltmx.nosql.databaseExists', exit:true});
                    resolve(false);
                };
                request.onsuccess = function(event) {
                    var database = event.target.result;
                    $KU.log({api:'voltmx.nosql.databaseExists', exit:true});
                    resolve(true);
                    database.close();
                };
                request.onerror = function(event) {
                    $KU.log('error', 'unknown error' + event.target.error);
                    reject(event.target.error);
                };
            });

            return promise;
        }
    };


    var _databaseVersion = function $K_nosql_databaseVersion(databaseName) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, promise = null;

        $KU.log({api:'voltmx.nosql.databaseVersion', enter:true});
        if(!_iDB) {
            $KU.log('error', _NOT_SUPPORTED_MSG);
        } else {
            promise = new Promise(function(resolve, reject) {
                var request = _iDB.open(_getDataBaseName(databaseName));

                request.onupgradeneeded = function(event) {
                    event.target.transaction.abort();
                    $KU.log({api:'voltmx.nosql.databaseVersion', exit:true});
                    resolve(0);
                };
                request.onsuccess = function(event) {
                    var database = event.target.result;
                    resolve(database.version);
                    $KU.log({api:'voltmx.nosql.databaseVersion', exit:true});
                    database.close();
                };
                request.onerror = function(event) {
                    $KU.log('error', 'unknown error' + event.target.error);
                    reject(event.target.error);
                };
            });

            return promise;
        }
    };


    var _deleteDatabase = function $K_nosql_deleteDatabase(databaseName) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, promise = null;

        $KU.log({api:'voltmx.nosql.deleteDatabase', enter:true});
        if(!_iDB) {
            $KU.log('error', _NOT_SUPPORTED_MSG);
        } else {
            promise = new Promise(function(resolve, reject) {
                var request = _iDB.deleteDatabase(_getDataBaseName(databaseName));

                request.onsuccess = function(/*event*/) {
                    $KU.log({api:'voltmx.nosql.deleteDatabase', exit:true});
                    resolve();
                };
                request.onerror = function(event) {
                    $KU.log('error', 'unknown error' + event.target.error);
                    reject(event.target.error);
                };
            });

            return promise;
        }
    };


    var _deleteIndices = function $K_nosql_deleteIndices(database, tableName, indexes) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, promise = null;

        $KU.log({api:'voltmx.nosql.deleteIndices', enter:true});
        if(!_iDB) {
            $KU.log('error', _NOT_SUPPORTED_MSG);
        } else {
            promise = new Promise(function(resolve, reject) {
                var request, store, transaction, index;

                try{
                    request = database.dbOpenRequest;
                    transaction = request.transaction;
                    store = transaction.objectStore(tableName);

                    for(index in indexes) {
                        store.deleteIndex(index);
                    }
                } catch(error) {
                    reject(error);
                }

                transaction.oncomplete = function(/*e*/) {
                    $KU.log({api:'voltmx.nosql.deleteIndices', exit:true});
                    resolve(true);
                };
            });

            return promise;
        }
    };


    var _deleteRecords = function $K_nosql_deleteRecords(transaction, tableName, condition) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, promise = null;

        $KU.log({api:'voltmx.nosql.deleteRecords', enter:true});
        if(!_iDB) {
            $KU.log('error', _NOT_SUPPORTED_MSG);
        } else {
            promise = new Promise(function(resolve, reject) {
                var tx, objectStore, data, keyRangeValue, index;

                if(!(transaction instanceof _Transaction)) {
                    $KU.log('error', 'Pass proper transaction object');
                    reject({'errorMsg': 'Pass proper transaction object'});
                }

                tx = transaction.tx;
                objectStore = tx.objectStore(tableName);

                if(_isConditionOptimizable(condition, objectStore)) {
                    data = condition.data[0];
                    keyRangeValue = _getKeyRangeValue(data);
                    index = objectStore.index(data.column);

                    if(keyRangeValue) {
                        _deleteAllByIndex(objectStore, index, keyRangeValue).then(function() {
                            $KU.log({api:'voltmx.nosql.deleteRecords', exit:true});
                            resolve();
                        }).catch(function(event) {
                            $KU.log('error', 'unknown error' + event.message);
                            reject({errorMsg: event.message});
                        });
                    }
                } else {
                    objectStore.openCursor().onsuccess = function(event) {
                        var cursor = event.target.result, request;

                        if(cursor) {
                            if(!condition || _isConditionMatched(cursor.value, condition.data)) {
                                request = cursor.delete();

                                request.onsuccess = function(/*event*/) {
                                    $KU.log('info', 'deleteRecords success');
                                };
                                request.onerror = function(event) {
                                    reject(event.target.error);
                                };
                            }

                            cursor.continue();
                        } else {
                            resolve();
                        }
                    };
                }
            });

            return promise;
        }
    };


    var _deleteTable = function $K_nosql_deleteTable(database, tableName) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, promise = null;

        $KU.log({api:'voltmx.nosql.deleteTable', enter:true});
        if(!_iDB) {
            $KU.log('error', _NOT_SUPPORTED_MSG);
        } else {
            promise = new Promise(function(resolve, reject) {
                var db;

                if(database instanceof _DataBase) {
                    db = database.db;
                    db.deleteObjectStore(tableName);
                    $KU.log({api:'voltmx.nosql.deleteTable', exit:true});
                    resolve();
                } else {
                    $KU.log('error', 'Pass proper database object.');
                    reject({errorMsg: 'Pass proper database object.'});
                }
            });

            return promise;
        }
    };


    var _fetchRecords = function $K_nosql_fetchRecords(transaction, tableName, condition) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, promise = null;

        $KU.log({api:'voltmx.nosql.fetchRecords', enter:true});
        if(!_iDB) {
            $KU.log('error', _NOT_SUPPORTED_MSG);
        } else {
            promise = new Promise(function(resolve, reject) {
                var resultSet = null, objectStore, tx, data, keyRangeValue, index;
                var successCallback = function(records) {
                    if(condition instanceof _Condition) {
                        records = _filterRecords(records, condition.data);
                    }

                    resultSet = new _Result(records);
                    $KU.log({api:'voltmx.nosql.fetchRecords', exit:true});
                    resolve(resultSet);
                };
                var errorCallback = function(event) {
                    $KU.log('error', 'unknown error' + event.target.error);
                    reject(event.target.error);
                };

                if(!(transaction instanceof _Transaction)) {
                    $KU.log('error', 'Pass proper transaction object');
                    reject({'errorMsg': 'Pass proper transaction object'});
                }

                tx = transaction.tx;
                objectStore = tx.objectStore(tableName);

                if(_isConditionOptimizable(condition, objectStore)) {
                    data = condition.data[0];
                    keyRangeValue = _getKeyRangeValue(data);
                    index = objectStore.index(data.column);

                    if(keyRangeValue) {
                        _getAllByIndex(index, keyRangeValue).then(function(records) {
                            resultSet = new _Result(records);
                            resolve(resultSet);
                        }).catch(function(event) {
                            reject(event.target.error);//todo
                        });
                    }
                } else {
                    if(objectStore.getAll) {
                        objectStore = objectStore.getAll();
                    } else {
                        _getAll(objectStore).then(function(records) {
                            successCallback(records);
                        }).catch(function(errorObj) {
                            errorCallback(errorObj);
                        });
                    }
                    objectStore.onsuccess = function(event) {
                        successCallback(event.target.result);
                    };
                    objectStore.onerror = errorCallback;
                }
            });

            return promise;
        }
    };


    var _getPrimaryKeys = function $K_nosql_getPrimaryKeys(database, tableName, transaction) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, promise = null;

        $KU.log({api:'voltmx.nosql.getPrimaryKeys', enter:true});
        if(!_iDB) {
            $KU.log('error', _NOT_SUPPORTED_MSG);
        } else {
            promise = new Promise(function(resolve, reject) {
                var primaryKeys, objectStore;
                var _getPrimaryKeys = function(transaction) {
                    var primaryKeys = [];

                    objectStore = transaction.tx.objectStore(tableName);
                    primaryKeys = (typeof objectStore.keyPath === 'string')
                        ? [objectStore.keyPath] : objectStore.keyPath;

                    return primaryKeys;
                };

                voltmx.nosql.tableExists(database, tableName).then(function(exists) {
                    if(exists) {
                        if(!transaction) {
                            voltmx.nosql.openTransaction(database, [tableName], voltmx.nosql.READ_WRITE, function(transaction) {
                                primaryKeys = _getPrimaryKeys(transaction);
                            }).then(function() {
                                $KU.log({api:'voltmx.nosql.getPrimaryKeys', exit:true});
                                resolve(primaryKeys);
                            }).catch(function(error) {
                                reject(error);
                            });
                        } else {
                            $KU.log({api:'voltmx.nosql.getPrimaryKeys', exit:true});
                            resolve(_getPrimaryKeys(transaction));
                        }
                    } else {
                        $KU.log('error', 'Table doesn\'t exists.');
                        reject({errorMsg: 'Table doesn\'t exists.'});
                    }
                }).catch(function(error) {
                    reject(error);
                });
            });

            return promise;
        }
    };


    var _getTables = function $K_nosql_getTables(database) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, promise = null;

        $KU.log({api:'voltmx.nosql.getTables', enter:true});
        if(!_iDB) {
            $KU.log('error', _NOT_SUPPORTED_MSG);
        } else {
            promise = new Promise(function(resolve, reject) {
                var db;

                if(database instanceof _DataBase) {
                    db = database.db;
                    $KU.log({api:'voltmx.nosql.getTables', exit:true});
                    resolve(_getObjectValues(db.objectStoreNames));
                } else {
                    $KU.log('error', 'Pass proper database object.');
                    reject({errorMsg: 'Pass proper database object.'});
                }
            });

            return promise;
        }
    };


    var _openDatabase = function $K_nosql_openDatabase(databaseName, version, upgradeCallback) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, promise = null;

        $KU.log({api:'voltmx.nosql.openDatabase', enter:true});
        if(!_iDB) {
            $KU.log('error', _NOT_SUPPORTED_MSG);
        } else {
            promise = new Promise(function(resolve, reject) {
                var request, kdb;

                if(version) {
                    request = _iDB.open(_getDataBaseName(databaseName), version);
                } else {
                    request = _iDB.open(_getDataBaseName(databaseName));
                }

                request.onerror = function(event) {
                    reject(event.target.error);
                };
                request.onsuccess = function(/*event*/) {
                    var db = request.result;

                    kdb = kdb || new _DataBase(db, 'indexedDB', request);
                    $KU.log({api:'voltmx.nosql.openDatabase', exit:true});
                    resolve(kdb);
                };
                request.onupgradeneeded = function(event) {
                    var db = event.target.result;

                    kdb = new _DataBase(db, 'indexedDB', request);
                    upgradeCallback && upgradeCallback(kdb);
                };
            });

            return promise;
        }
    };


    var _openTransaction = function $K_nosql_openTransaction(database, tableNames, accessType, callback) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, promise = null;

        $KU.log({api:'voltmx.nosql.openTransaction', enter:true});
        if(!_iDB) {
            $KU.log('error', _NOT_SUPPORTED_MSG);
        } else {
            promise = new Promise(function(resolve, reject) {
                var db = database.db, tx = db.transaction(tableNames, accessType),
                    transaction = new _Transaction(tx);

                callback(transaction);

                tx.oncomplete = function(/*e*/) {
                    $KU.log({api:'voltmx.nosql.openTransaction', exit:true});
                    resolve(transaction);
                };
                tx.onerror = function(e) {
                    $KU.log('error', 'unknown error' + e);
                    reject(e.target.error);
                };
                tx.onabort = function(e) {
                    $KU.log('error', 'unknown error' + e);
                    reject(e.target.error);
                };
            });

            return promise;
        }
    };


    var _replaceRecords = function $K_nosql_replaceRecords(transaction, tableName, replaceObject, condition) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, promise = null;

        $KU.log({api:'voltmx.nosql.replaceRecords', enter:true});
        if(!_iDB) {
            $KU.log('error', _NOT_SUPPORTED_MSG);
        } else {
            promise = new Promise(function(resolve, reject) {
                voltmx.nosql.fetchRecords(transaction, tableName, condition).then(function(resultSet) {
                    var i = 0, storeReq = null, store, records = resultSet.data,
                        onerrorcb = function(event) {
                            reject(event.target.error);
                        },
                        replaceNext = function() {
                            var record, primaryKeys;

                            if(i < records.length) {
                                record = records[i];
                                primaryKeys = (typeof store.keyPath === 'string') ? [store.keyPath] : store.keyPath;

                                record = _replaceRecordValues(replaceObject, record, primaryKeys);

                                storeReq = store.put(record);
                                storeReq.onsuccess = replaceNext;
                                storeReq.onerror = onerrorcb;
                                ++i;
                            } else {
                                $KU.log({api:'voltmx.nosql.replaceRecords', exit:true});
                                resolve();
                            }
                        };

                    if(!(transaction instanceof _Transaction)) {
                        $KU.log('error', 'Pass proper transaction object.');
                        reject({'errorMsg': 'Pass proper transaction object.'});
                    }

                    store = transaction.tx.objectStore(tableName);

                    replaceNext();
                }).catch(function(error) {
                    $KU.log('error', 'unknown error' + error);
                    reject(error);
                });
            });

            return promise;
        }
    };


    var _tableExists = function $K_nosql_tableExists(database, tableName) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, promise = null;

        $KU.log({api:'voltmx.nosql.tableExists', enter:true});
        if(!_iDB) {
            $KU.log('error', _NOT_SUPPORTED_MSG);
        } else {
            promise = new Promise(function(resolve, reject) {
                var tableExists;

                if(database instanceof _DataBase) {
                    voltmx.nosql.getTables(database).then(function(tables) {
                        if(tables.indexOf(tableName) !== -1) {
                            tableExists = true;
                        } else {
                            tableExists = false;
                        }
                        $KU.log({api:'voltmx.nosql.tableExists', exit:true});
                        resolve(tableExists);
                    }).catch(function(error) {
                        reject(error);
                    });
                } else {
                    $KU.log('error', 'Pass proper database object.');
                    reject({errorMsg: 'Pass proper database object.'});
                }
            });

            return promise;
        }
    };


    var _updateRecords = function $K_nosql_updateRecords(transaction, tableName, updateObject, condition) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, promise = null;

        $KU.log({api:'voltmx.nosql.updateRecords', enter:true});
        if(!_iDB) {
            $KU.log('error', _NOT_SUPPORTED_MSG);
        } else {
            promise = new Promise(function(resolve, reject) {
                var index, objectStore, data, keyRangeValue;


                if(!(transaction instanceof _Transaction)) {
                    $KU.log('error', 'Pass proper transaction object.');
                    reject({'errorMsg': 'Pass proper transaction object'});
                }

                objectStore = transaction.tx.objectStore(tableName);

                if(_isConditionOptimizable(condition, objectStore)) {
                    data = condition.data[0];
                    index = objectStore.index(data.column);
                    keyRangeValue = _getKeyRangeValue(data);

                    if(keyRangeValue) {
                        _updateAllByIndex(objectStore, index, keyRangeValue, updateObject).then(function() {
                            $KU.log({api:'voltmx.nosql.updateRecords', exit:true});
                            resolve();
                        }).catch(function(event) {
                            $KU.log('error', 'unknown' + event.message);
                            reject({errorMsg: event.message});
                        });
                    }
                } else {
                    objectStore.openCursor().onsuccess = function(event) {
                        var cursor = event.target.result, record, request;

                        if(cursor) {
                            record = cursor.value;
                            if(!condition || _isConditionMatched(record, condition.data)) {
                                record = _replaceRecordValues(record, updateObject);
                                request = cursor.update(record);
                                request.onsuccess = function(/*event*/) {
                                    $KU.log('info', 'Successfully deleting record.');
                                };
                                request.onerror = function(/*event*/) {
                                    reject();
                                };
                            }

                            cursor.continue();
                        } else {
                            resolve();
                        }
                    };
                }
            });

            return promise;
        }
    };


    /***************************************************************************
    *                                                                          *
    ****************************************************************************/
    var _Condition = function Condition(ruleOrCondition) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, data = null;

        if(!_iDB) {
            $KU.log('error', _NOT_SUPPORTED_MSG);
        } else if(!(this instanceof _Condition)) {
            //Throw Error:: Must be called with new operator.
        } else {
            data = [];

            Object.defineProperty(this, 'data', {
                configurable: true,
                enumerable: false,
                get: function() {
                    return (this.passReference) ? data : data.slice(0);
                }
            });
            Object.defineProperty(this, 'data', {
                configurable: false,
                enumerable: false,
                set: function(/*value*/) {}
            });

            if(ruleOrCondition instanceof _Rule) {
                data.push({
                    'column':   ruleOrCondition.column,
                    'operator': ruleOrCondition.operator,
                    'value':    ruleOrCondition.value
                });
            } else if(ruleOrCondition instanceof _Condition) {
                data.push(ruleOrCondition.data);
            } else {
                //Throw Error:: Invalid Argument
            }
        }
    };

    Object.defineProperty(_Condition.prototype, 'addCondition', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function(type, condition) {
            if(_validTypes.indexOf(type) >= 0 && condition instanceof _Condition) {
                this.passReference = true;
                this.data.push(type);
                this.data.push(condition.data);
                delete this.passReference;
            } else {
                //TODO:: Throw Error
            }

            return this;
        }
    });

    Object.defineProperty(_Condition.prototype, 'addRule', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function(type, rule) {
            if(_validTypes.indexOf(type) >= 0 && rule instanceof _Rule) {
                this.passReference = true;
                this.data.push(type);
                this.data.push({
                    'column':   rule.column,
                    'operator': rule.operator,
                    'value':    rule.value
                });
                delete this.passReference;
            } else {
                //TODO:: Throw Error:: Invalid Arguments
            }

            return this;
        }
    });

    //Any record cannot contain an object as any of its column value
    Object.defineProperty(_Condition.prototype, 'toString', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function() {
            var stringifyCondition = function(condition) {
                var str = '', c = 0, clen = condition.length;

                for(c=0; c<clen; c++) {
                    if(condition[c] instanceof Array) {
                        str += stringifyCondition(condition[c]);
                    } else if(typeof condition[c] === 'string') {
                        str += (' ' + condition[c] + ' ');
                    } else if(typeof condition[c] === 'object' && condition[c]) {
                        str += stringifyRule(condition[c]);
                    }
                }

                return ('(' + str + ')');
            };

            var stringifyRule = function(rule) {
                var str = rule.column + ' ' + rule.operator + ' ';

                if(typeof rule.value === 'string') {
                    //TODO:: Escape all 'backslash', 'doublequote'
                    str += ('\'' + rule.value + '\'');
                } else {
                    str += rule.value;
                }

                return str;
            };

            return stringifyCondition(this.data);
        }
    });


    /***************************************************************************
    *                                                                          *
    ****************************************************************************/
    var _DataBase = function DataBase(db, dbType, dbOpenRequest) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        if(!_iDB) {
            $KU.log('error', _NOT_SUPPORTED_MSG);
        } else {
            Object.defineProperty(this, 'db', {
                configurable: false,
                enumerable: false,
                writable: false,
                value: db
            });
            Object.defineProperty(this, 'dbType', {
                configurable: false,
                enumerable: false,
                writable: false,
                value: dbType
            });
            Object.defineProperty(this, 'dbOpenRequest', {
                configurable: true,
                enumerable: false,
                writable: false,
                value: dbOpenRequest
            });
        }
    };


    /***************************************************************************
    *                                                                          *
    ****************************************************************************/
    var _Result = function Result(data) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, index = -1, length = -1;

        if(!_iDB) {
            $KU.log('error', _NOT_SUPPORTED_MSG);
        } else {
            data = (data instanceof Array) ? data : [];

            Object.defineProperty(this, 'data', {
                configurable: true,
                enumerable: false,
                get: function() {
                    return (this.passReference) ? data : data.slice(0);
                }
            });
            Object.defineProperty(this, 'data', {
                configurable: false,
                enumerable: false,
                set: function(/*value*/) {}
            });


            Object.defineProperty(this, 'length', {
                configurable: true,
                enumerable: false,
                get: function() {
                    if(length === -1) {
                        length = data.length;
                    }

                    return length;
                }
            });
            Object.defineProperty(this, 'length', {
                configurable: false,
                enumerable: false,
                set: function(/*value*/) {}
            });


            Object.defineProperty(this, 'next', {
                configurable: true,
                enumerable: false,
                get: function() {
                    ++index;
                    return (index >= 0 && index < data.length) ? true : false;
                }
            });
            Object.defineProperty(this, 'next', {
                configurable: false,
                enumerable: false,
                set: function(/*value*/) {}
            });


            Object.defineProperty(this, 'record', {
                configurable: true,
                enumerable: false,
                get: function() {
                    return (index >= 0 && index < data.length) ? data[index] : null;
                }
            });
            Object.defineProperty(this, 'record', {
                configurable: false,
                enumerable: false,
                set: function(/*value*/) {}
            });
        }
    };

    Object.defineProperty(_Result.prototype, 'groupBy', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function(columnNames, index) {
            var data = null;

            this.passReference = true;
            data = this.data;
            delete this.passReference;
            var result = {};

            function __prepareMap() {
                var row, name, i, j;
                for(i = 0; i < data.length; i++) {
                    row = data[i];
                    name = '';
                    for(j = 0; j < columnNames.length; j++) {
                        name += row[columnNames[j]];
                        if(j < columnNames.length -1) {
                            name += '&_';
                        }
                    }

                    if(name in result) {
                        result[name].push(row);
                    } else {
                        result[name] = [row];
                    }
                }
                //console.log(result);
            }

            function __prepareResults() {
                var resultSet = [], i, key, finalResult = [];
                for(key in result) {
                    resultSet.push(result[key]);
                }

                if(typeof index === 'number') {
                    for(i = 0; i < resultSet.length; i++) {
                        if(index >= 0) {
                            finalResult.push(resultSet[i][index]);
                        } else {
                            key = resultSet[i].length + index;
                            finalResult.push(resultSet[i][key]);
                        }
                    }
                    return finalResult;
                }
                return resultSet;
            }

            if(columnNames instanceof Array) {
                /* eslint-disable no-useless-catch */
                try{
                    __prepareMap();
                    return __prepareResults();
                } catch(e) {
                    throw e;
                }
                /* eslint-enable no-useless-catch */
            }
        }
    });

    Object.defineProperty(_Result.prototype, 'limit', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function(startIndex, recordCount) {
            var data = null, copy = null, c = 0, clen = 0;

            if(typeof startIndex === 'number'
            && typeof recordCount === 'number'
            && startIndex >= 0 && recordCount >= 0) {
                this.passReference = true;
                data = this.data;
                delete this.passReference;

                copy = data.splice(0);
                clen = copy.length;

                for(c=startIndex; c<=recordCount; c++) {
                    if(c < clen) {
                        data.push(copy[c]);
                    } else {
                        break;
                    }
                }
            } else {
                //Throw Error:: Invalid Arguments
            }

            return this;
        }
    });

    Object.defineProperty(_Result.prototype, 'sort', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: function(columnName, order) {
            var data = null;

            function __localsort(data, name, order) {
                data.sort(function(a, b) {
                    a = a[name];
                    b = b[name];
                    if(order === voltmx.nosql.ASCENDING) {
                        return (a > b) ? 1 : (a < b) ? -1 : 0;
                    }
                    return (a > b) ? -1 : (a < b) ? 1 : 0;
                });
            }

            function __groupByName(data, name) {
                var i, result = [], temp = [], value;

                temp.push(data[0]);
                value = data[0][name];

                for(i = 1; i < data.length; i++) {
                    if(data[i][name] === value) {
                        temp.push(data[i]);
                    } else {
                        if(temp.length === 1) {
                            result.push(temp[0]);
                        } else {
                            result.push(temp);
                        }

                        temp = [];
                        value = data[i][name];
                        temp.push(data[i]);
                    }
                }

                result.push(temp);
                return result;
            }

            function __createFlatArray(result) {
                var i, len, temp = [];

                for(i = 0; i < result.length; i++) {
                    if(result[i] instanceof Array) {
                        for(len = 0; len < result[i].length; len++) {
                            temp.push(result[i][len]);
                        }
                    } else {
                        temp.push(result[i]);
                    }
                }

                return temp;
            }

            function __orderBY(data, index, order) {
                var i, result = [], result1 = [];

                if(index >= columnName.length) {
                    return data;
                }

                __localsort(data, columnName[index], order);
                result = __groupByName(data, columnName[index]);

                for(i = 0; i < result.length; i++) {
                    if(result[i] instanceof Array) {
                        result1 = __orderBY(result[i], index+1, order);
                        result[i] = result1;
                    }
                }

                result = __createFlatArray(result);
                return result;
            }

            this.passReference = true;
            data = this.data;
            delete this.passReference;

            if(typeof columnName === 'function') {
                data.sort(columnName);
            } else if(typeof columnName === 'string'
            && _validOrders.indexOf(order) >= 0) {
                data.sort(function(a, b) {
                    a = a[columnName];
                    b = b[columnName];

                    if(order === voltmx.nosql.ASCENDING) {
                        return (a > b) ? 1 : (a < b) ? -1 : 0;
                    }
                    return (a > b) ? -1 : (a < b) ? 1 : 0;
                });
            } else if(columnName instanceof Array
            && _validOrders.indexOf(order) >= 0) {
                var i, sortedData = [];

                sortedData = this.data;
                sortedData = __orderBY(sortedData, 0, order);
                data.splice(0, data.length);

                for(i =0; i < sortedData.length; i++) {
                    data.push(sortedData[i]);
                }
            } else {
                //Throw Error:: Invalid Arguments
            }

            return this;
        }
    });


    /*
    var r1 = new _Rule('col_01', '===', 'A');
    var r2 = new _Rule('col_01', '===', 'B');
    var r3 = new _Rule('col_01', '===', 'C');
    var r4 = new _Rule('col_01', '===', 'D');
    var r5 = new _Rule('col_01', '===', 'E');
    var r6 = new _Rule('col_01', '===', 'F');
    var r7 = new _Rule('col_01', '===', 'G');

    var c1 = new _Condition(r1);
    var c2 = new _Condition(r3);
    var c3 = new _Condition(r4);
    var c4 = new _Condition(r6);

    c1.addRule('&&', r2);
    c3.addRule('||', r5);
    c4.addRule('||', r7);

    c3.addCondition('&&', c4);
    c1.addCondition('||', c2);
    c1.addCondition('||', c3);
    //*/
    /***************************************************************************
    *                                                                          *
    ****************************************************************************/
    var _Rule = function Rule(column, operator, value) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        if(!_iDB) {
            $KU.log('error', _NOT_SUPPORTED_MSG);
        } else if(!(this instanceof _Rule)) {
            //Throw Error:: Must be called with new operator.
        } else if(operator === _REGEXP && !(value instanceof RegExp)) {
            throw Error('Invalid arguments.');
        } else if(!(arguments.length === 3
        && typeof column === 'string' && column
        && _validOperators.indexOf(operator) >= 0)) {
            //Throw Error:: Invalid Arguments
        } else {
            Object.defineProperty(this, 'column', {
                configurable: true,
                enumerable: true,
                get: function() {
                    return column;
                }
            });
            Object.defineProperty(this, 'column', {
                configurable: false,
                enumerable: true,
                set: function(val) {
                    column = val;
                }
            });


            Object.defineProperty(this, 'operator', {
                configurable: true,
                enumerable: true,
                get: function() {
                    return operator;
                }
            });
            Object.defineProperty(this, 'operator', {
                configurable: false,
                enumerable: true,
                set: function(val) {
                    operator = val;
                }
            });


            Object.defineProperty(this, 'value', {
                configurable: true,
                enumerable: true,
                get: function() {
                    return value;
                }
            });
            Object.defineProperty(this, 'value', {
                configurable: false,
                enumerable: true,
                set: function(val) {
                    value = val;
                }
            });
        }
    };


    /***************************************************************************
    *                                                                          *
    ****************************************************************************/
    var _Transaction = function Transaction(tx) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        if(!_iDB) {
            $KU.log('error', _NOT_SUPPORTED_MSG);
        } else {
            Object.defineProperty(this, 'tx', {
                configurable: false,
                enumerable: false,
                writable: false,
                value: tx
            });
        }
    };


    if(_iDB) {
        _validTypes = [_AND, _OR];
        _validOrders = [_ASCENDING, _DESCENDING];
        _validOperators = [_EQ, _GT, _GTE, _LT, _LTE, _NEQ, _REGEXP];
    }


    $K.defVoltmxProp(_ns, [
        {keey:'addOrReplaceRecords', value:_addOrReplaceRecords},
        {keey:'addRecords', value:_addRecords},
        {keey:'clearTable', value:_clearTable},
        {keey:'closeDatabase', value:_closeDatabase},
        {keey:'Condition', value:_Condition},
        {keey:'createIndices', value:_createIndices},
        {keey:'createTable', value:_createTable},
        {keey:'databaseExists', value:_databaseExists},
        {keey:'databaseVersion', value:_databaseVersion},
        {keey:'deleteDatabase', value:_deleteDatabase},
        {keey:'deleteIndices', value:_deleteIndices},
        {keey:'deleteRecords', value:_deleteRecords},
        {keey:'deleteTable', value:_deleteTable},
        {keey:'fetchRecords', value:_fetchRecords},
        {keey:'getPrimaryKeys', value:_getPrimaryKeys},
        {keey:'getTables', value:_getTables},
        {keey:'openDatabase', value:_openDatabase},
        {keey:'openTransaction', value:_openTransaction},
        {keey:'replaceRecords', value:_replaceRecords},
        {keey:'Rule', value:_Rule},
        {keey:'tableExists', value:_tableExists},
        {keey:'updateRecords', value:_updateRecords},
        //Constants starts from here...
        {keey:'AND', value:_AND},
        {keey:'ASCENDING', value:_ASCENDING},
        {keey:'DESCENDING', value:_DESCENDING},
        {keey:'EQ', value:_EQ},
        {keey:'GT', value:_GT},
        {keey:'GTE', value:_GTE},
        {keey:'LT', value:_LT},
        {keey:'LTE', value:_LTE},
        {keey:'NEQ', value:_NEQ},
        {keey:'OR', value:_OR},
        {keey:'READ', value:_READ},
        {keey:'READ_WRITE', value:_READ_WRITE},
        {keey:'REGEXP', value:_REGEXP}
    ]);


    return _ns;
}())});
