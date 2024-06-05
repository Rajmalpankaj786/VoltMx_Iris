if (window && window.Windows && Windows && Windows.UI && Windows.UI.Popups) {
    voltmx.io.unzip = function () {

    }

    voltmx.io.FileSystem.copyBundledRawFileTo = function (rawFileName, destFilePath) {
        return PWAWrapper.IO.FileSystemAPIWrapper.copyBundledRawFileTo(getWinRTObjectArray([rawFileName, destFilePath]));
    }
    voltmx.io.FileSystem.getCacheDirectoryPath = function () {
        return PWAWrapper.IO.FileSystemAPIWrapper.getCacheDirectoryPath();
    }
    voltmx.io.FileSystem.getDatabaseDirectoryPath = function () {
        return PWAWrapper.IO.FileSystemAPIWrapper.getDatabaseDirectoryPath();
    }
    voltmx.io.FileSystem.getDataDirectoryPath = function (type) {
        return PWAWrapper.IO.FileSystemAPIWrapper.getDataDirectoryPath(getWinRTObjectArray([type]));
    }
    voltmx.io.FileSystem.getFile = function (path) {
        return voltmx.io.File(path);
    }
    voltmx.io.FileSystem.isExternalStorageAvailable = function () {
        return PWAWrapper.IO.FileSystemAPIWrapper.isExternalStorageAvailable();
    }

    voltmx.io.File = function (path) {
        let _file_ = {};

        let _fileObj_ = new PWAWrapper.IO.FileAPIWrapper();
        if (typeof (path) === 'string')
            _fileObj_.create(getWinRTObjectArray([path]));
        else if (typeof (path) === 'object')
            _fileObj_.create(getWinRTObjectArray([path], [path]));

        _file_.copyTo = function (path, newName) {
            var fileHandle = _fileObj_.copyTo(getWinRTObjectArray([path, newName]));
            if (null === fileHandle)
                return null;
            return voltmx.io.File(fileHandle);
        };
        _file_.createDirectory = function () {
            return _fileObj_.createDirectory();
        };
        _file_.createFile = function () {
            return _fileObj_.createFile();
        };
        _file_.exists = function () {
            return _fileObj_.exists();
        };
        _file_.getFilesList = function () {
            var filelist = _fileObj_.getFilesList();
            return new WinRTFilesList(filelist);
        };
        _file_.isDirectory = function () {
            return _fileObj_.isDirectory();
        };
        _file_.isFile = function () {
            return _fileObj_.isFile();
        };
        _file_.moveTo = function (path, newName) {
            var fileHandle = _fileObj_.moveTo(getWinRTObjectArray([path, newName]));
            if (null === fileHandle)
                return null;
            return voltmx.io.File(fileHandle);
        };
        _file_.read = function () {
            var proxy = _fileObj_.read();
            return new WinRTRawBytesObject(proxy);
        };
        _file_.remove = function (deleteRecursive) {
            return _fileObj_.remove(getWinRTObjectArray([deleteRecursive]));
        };
        _file_.rename = function (newName) {
            return _fileObj_.rename(getWinRTObjectArray([newName]));
        };
        _file_.write = function (content, append) {
            return _fileObj_.write(getWinRTObjectArray([content, append]));
        };

        defineProperty_RO(_file_, "name", _fileObj_);
        defineProperty_RO(_file_, "fullPath", _fileObj_);
        defineProperty_RO(_file_, "parent", _fileObj_);
        defineProperty_RO(_file_, "readable", _fileObj_);
        defineProperty_RO(_file_, "writable", _fileObj_);
        defineProperty_RO(_file_, "modificationTime", _fileObj_);
        defineProperty_RO(_file_, "size", _fileObj_);

        return _file_;
    };

    var WinRTFilesList = function (filelist) {
        let _filesList_ = {};
        let _filesListObj_ = new PWAWrapper.IO.FilesListWrapper();
        _filesListObj_.create(getWinRTObjectArray([filelist], [filelist]));

        _filesList_.item = function (index) {
            var fileHandle = _filesListObj_.item(getWinRTObjectArray([index]));
            if (fileHandle === null)
                return null;
            return voltmx.io.File(fileHandle);
        };
        defineProperty_RO(_filesList_, "length", _filesListObj_);

        return _filesList_;
    };

    var WinRTRawBytesObject = function (proxy) {
        let _rawBytes_ = {};
        let _rawBytesObj_ = new PWAWrapper.IO.RawBytesWrapper();
        _rawBytesObj_.create(getWinRTObjectArray([proxy], [proxy]));

        _rawBytes_.readAsText = function () {
            return _rawBytesObj_.readAsText();
        };
        defineProperty_RO(_rawBytes_, "text", _rawBytesObj_);

        return _rawBytes_;
    };
}
