Object.defineProperty(voltmx, 'db', {configurable:false, enumerable:false, writable:false, value:(function() {
    var _ns = {}, $K = voltmx.$kwebfw$;


    var _changeVersion = function(db, oldver, newver, transcb, ecb, vcb) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.db.changeVersion', enter:true});

        if(window.openDatabase) {
            db && db.changeVersion(oldver, newver, transcb, ecb, vcb);
            $KU.log({api:'voltmx.db.changeVersion', exit:true});
        } else {
            voltmx.print('Web Databases not supported.');
        }
    };


    var _executeSql = function(transid, sqlstmt, args, scb, ecb) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.db.executeSql', enter:true});

        if(window.openDatabase) {
            if(transid) {
                if(args && args[0] === null) {
                    args = args.slice(1);
                }

                transid.executeSql(sqlstmt, args, scb, ecb);
            }

            $KU.log({api:'voltmx.db.executeSql', exit:true});
        } else {
            voltmx.print('Web Databases not supported.');
        }
    };


    var _openDatabase = function(name, version, dname, size, cb) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, db = this.db || null;

        $KU.log({api:'voltmx.db.openDatabase', enter:true});

        if(!$KU.is(cb, 'function')) {
            cb = function() {};
        }

        try{
            if(window.openDatabase) {
                if(!db) {
                    db = openDatabase(name, version, dname, size, cb);
                    this.db = db;
                }

                $KU.log({api:'voltmx.db.openDatabase', exit:true});
            } else {
                voltmx.print('Web Databases not supported.');
            }
        } catch(e) {
            if(e === 2) {
                // Version number mismatch.
                voltmx.print('opendatabase:Invalid database version.');
            } else {
                voltmx.print('opendatabase:Unknown error ' + e + '.');
            }

            return null;
        }

        return db;
    };


    var _readTransaction = function(db, transcb, ecb, vcb) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.db.readTransaction', enter:true});

        if(window.openDatabase) {
            db && db.readTransaction(transcb, ecb, vcb);
            $KU.log({api:'voltmx.db.readTransaction', exit:true});
        } else {
            voltmx.print('Web Databases not supported.');
        }
    };


    var _sqlResultsetRowItem = function(transid, sqlresultset, index) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils, item = null;

        $KU.log({api:'voltmx.db.sqlResultsetRowItem', enter:true});

        if(window.openDatabase) {
            if(index < sqlresultset.rows.length) {
                item = sqlresultset.rows.item(index);
            }
        } else {
            voltmx.print('Web Databases not supported.');
        }

        $KU.log({api:'voltmx.db.sqlResultsetRowItem', exit:true});
        return item;
    };


    var _transaction = function(db, transcb, ecb, vcb) {
        var $K = voltmx.$kwebfw$, $KU = $K.utils;

        $KU.log({api:'voltmx.db.transaction', enter:true});

        if(window.openDatabase) {
            db && db.transaction(transcb, ecb, vcb);
            $KU.log({api:'voltmx.db.transaction', exit:true});
        } else {
            voltmx.print('Web Databases not supported.');
        }
    };


    $K.defVoltmxProp(_ns, [
        {keey:'changeVersion', value:_changeVersion},
        {keey:'executeSql', value:_executeSql},
        {keey:'openDatabase', value:_openDatabase},
        {keey:'readTransaction', value:_readTransaction},
        {keey:'sqlResultsetRowItem', value:_sqlResultsetRowItem},
        {keey:'transaction', value:_transaction}
    ]);


    return _ns;
}())});
