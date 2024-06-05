$KI.db = {
    changeversion: function(db, oldver, newver, transcb, ecb, vcb) {
        $KU.logExecuting('voltmx.db.changeVersion');
        $KU.logExecutingWithParams('voltmx.db.changeVersion', db, oldver, newver, transcb, ecb, vcb);
        if(window.openDatabase) {
            if(db) {
                db.changeVersion(oldver, newver, transcb, ecb, vcb);
            }
        } else {
            $KU.logWarnMessage('Web Databases not supported');
            voltmx.print("Web Databases not supported");
        }
        $KU.logExecutingFinished('voltmx.db.changeVersion');
    },

    executesql: function(transid, sqlstmt, args, scb, ecb) {
        $KU.logExecuting('voltmx.db.executeSql');
        $KU.logExecutingWithParams('voltmx.db.executeSql', transid, sqlstmt, args, scb, ecb);
        if(window.openDatabase) {
            if(transid) {
                if(args && args[0] === null) {
                    args = args.slice(1);
                }
                transid.executeSql(sqlstmt, args, scb, ecb);
            }
        } else {
            $KU.logWarnMessage('Web Databases not supported');
            voltmx.print("Web Databases not supported");
        }
        $KU.logExecutingFinished('voltmx.db.executeSql');
    },

    opendatabase: function(name, version, dname, size, cb) {
        var db = this.db || null;
        cb = cb || voltmx_dummyForDBCallback;
        $KU.logExecuting('voltmx.db.openDatabase');
        $KU.logExecutingWithParams('voltmx.db.openDatabase', name, version, dname, size, cb);
        try {
            if(window.openDatabase) {
                if(!db) {
                    db = openDatabase(name, version, dname, size, cb);
                    this.db = db;
                }
            } else {
                $KU.logWarnMessage('Web Databases not supported');
                voltmx.print("Web Databases not supported");
            }
        } catch(e) {
            if(e == 2) {
                
                $KU.logErrorMessage('opendatabase:Invalid database version.');
                voltmx.print("opendatabase:Invalid database version.");
            } else {
                $KU.logErrorMessage('opendatabase:Unknown error ' + e + '.');
                voltmx.print("opendatabase:Unknown error " + e + ".");
            }
            $KU.logErrorMessage('Invalid database version or Unknown error');
            return null;
        }
        $KU.logExecutingFinished('voltmx.db.openDatabase');
        return db;
    },

    readtransaction: function(db, transcb, ecb, vcb) {
        $KU.logExecuting('voltmx.db.readTransaction');
        $KU.logExecutingWithParams('voltmx.db.readTransaction', db, transcb, ecb, vcb);
        if(window.openDatabase) {
            if(db) {
                db.readTransaction(transcb, ecb, vcb);
            }
        } else {
            $KU.logWarnMessage('Web Databases not supported');
            voltmx.print("Web Databases not supported");
        }
        $KU.logExecutingFinished('voltmx.db.readTransaction');
    },

    sqlresultsetrowitem: function(transid, sqlresultset, index) {
        $KU.logExecuting('voltmx.db.sqlResultsetRowItem');
        $KU.logExecutingWithParams('voltmx.db.sqlResultsetRowItem', transid, sqlresultset, index);
        if(window.openDatabase) {
            
            if(index < sqlresultset.rows.length) {
                $KU.logExecutingFinished('voltmx.db.sqlResultsetRowItem VIA if index < sqlresultset.rows.length');
                return sqlresultset.rows.item(index);
            } else {
                $KU.logErrorMessage('Index position exceeds row length');
                return null;
            }
        } else {
            $KU.logWarnMessage('Web Databases not supported');
            voltmx.print("Web Databases not supported");
        }
        $KU.logExecutingFinished('voltmx.db.sqlResultsetRowItem VIA end of the function');
    },

    transaction: function(db, transcb, ecb, vcb) {
        $KU.logExecuting('voltmx.db.transaction');

        if(window.openDatabase) {
            if(db) {
                $KU.logExecutingWithParams('voltmx.db.transaction', db, transcb, ecb, vcb);
                db.transaction(transcb, ecb, vcb);
            }
        } else {
            $KU.logWarnMessage('Web Databases not supported');
            voltmx.print("Web Databases not supported");
        }
        $KU.logExecutingFinished('voltmx.db.transaction');
    }
};

function voltmx_dummyForDBCallback() {}
