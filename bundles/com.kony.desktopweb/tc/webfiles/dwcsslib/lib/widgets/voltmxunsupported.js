

(function() {
    var $K = voltmx.$kwebfw$;


    Object.defineProperty(voltmx.ui, 'ActionItem', {configurable:false, enumerable:false, writable:$K.defWritable(), value:(function() {
        var $K = voltmx.$kwebfw$;

        var ActionItem = function ActionItem() {};
        $K.utils.inherits(ActionItem, voltmx.ui.BasicWidget);

        var actionitem__render = function ActionItem$_render(tag) {
            var $super = voltmx.ui.FlexContainer.base.prototype,
                $K = voltmx.$kwebfw$, $KU = $K.utils, view = null;

            if(this.isVisible || $K.F.RIVW) {
                view = $super._render.call(this, tag);

                if(!this._kwebfw_.view && this._kwebfw_.ns === 'voltmx.ui.ActionItem') {
                    $KU.defineProperty(this._kwebfw_, 'view', view);
                }
            }

            return view;
        };

        var actionitem_addAction = function ActionItem$addAction() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.unsupportedAPI('new voltmx.ui.Toast().addAction');
        };

        var actionitem_setAnchorConfiguration = function ActionItem$setAnchorConfiguration() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.unsupportedAPI('new voltmx.ui.Toast().setAnchorConfiguration');
        };

        var actionitem_show = function ActionItem$show() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.unsupportedAPI('new voltmx.ui.Toast().show');
        };

        $K.defVoltmxProp(ActionItem.prototype, [
            {keey:'_render', value:actionitem__render},
            {keey:'addAction', value:actionitem_addAction},
            {keey:'setAnchorConfiguration', value:actionitem_setAnchorConfiguration},
            {keey:'show', value:actionitem_show}
        ]);

        return ActionItem;
    }())});


    Object.defineProperty(voltmx.ui, 'BottomSheet', {configurable:false, enumerable:false, writable:$K.defWritable(), value:(function() {
        var $K = voltmx.$kwebfw$;

        var BottomSheet = function BottomSheet() {};
        $K.utils.inherits(BottomSheet, voltmx.ui.BasicWidget);

        var bottomsheet__render = function BottomSheet$_render(tag) {
            var $super = voltmx.ui.FlexContainer.base.prototype,
                $K = voltmx.$kwebfw$, $KU = $K.utils, view = null;

            if(this.isVisible || $K.F.RIVW) {
                view = $super._render.call(this, tag);

                if(!this._kwebfw_.view && this._kwebfw_.ns === 'voltmx.ui.BottomSheet') {
                    $KU.defineProperty(this._kwebfw_, 'view', view);
                }
            }

            return view;
        };

        var bottomsheet_destroy = function BottomSheet$destroy() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.unsupportedAPI('new voltmx.ui.BottomSheet().destroy');
        };

        var bottomsheet_dismiss = function BottomSheet$dismiss() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.unsupportedAPI('new voltmx.ui.BottomSheet().dismiss');
        };

        var bottomsheet_show = function BottomSheet$show() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.unsupportedAPI('new voltmx.ui.BottomSheet().show');
        };

        var bottomsheet_setState = function BottomSheet$setState() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.unsupportedAPI('new voltmx.ui.BottomSheet().setState');
        };

        $K.defVoltmxProp(BottomSheet.prototype, [
            {keey:'_render', value:bottomsheet__render},
            {keey:'destroy', value:bottomsheet_destroy},
            {keey:'dismiss', value:bottomsheet_dismiss},
            {keey:'show', value:bottomsheet_show},
            {keey:'setState', value:bottomsheet_setState}
        ]);

        return BottomSheet;
    }())});


    Object.defineProperty(voltmx.ui, 'CordovaBrowser', {configurable:false, enumerable:false, writable:$K.defWritable(), value:(function() {
        var $K = voltmx.$kwebfw$;

        var CordovaBrowser = function CordovaBrowser() {};
        $K.utils.inherits(CordovaBrowser, voltmx.ui.BasicWidget);

        var cordovabrowser__render = function CordovaBrowser$_render(tag) {
            var $super = voltmx.ui.FlexContainer.base.prototype,
                $K = voltmx.$kwebfw$, $KU = $K.utils, view = null;

            if(this.isVisible || $K.F.RIVW) {
                view = $super._render.call(this, tag);

                if(!this._kwebfw_.view && this._kwebfw_.ns === 'voltmx.ui.CordovaBrowser') {
                    $KU.defineProperty(this._kwebfw_, 'view', view);
                }
            }

            return view;
        };

        var cordovabrowser_canGoBack = function CordovaBrowser$canGoBack() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.unsupportedAPI('new voltmx.ui.CordovaBrowser().canGoBack');
        };

        var cordovabrowser_canGoForward = function CordovaBrowser$canGoForward() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.unsupportedAPI('new voltmx.ui.CordovaBrowser().canGoForward');
        };

        var cordovabrowser_clearHistory = function CordovaBrowser$clearHistory() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.unsupportedAPI('new voltmx.ui.CordovaBrowser().clearHistory');
        };

        var cordovabrowser_evaluateJavaScript = function CordovaBrowser$evaluateJavaScript() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.unsupportedAPI('new voltmx.ui.CordovaBrowser().evaluateJavaScript');
        };

        var cordovabrowser_getHTMLFilesInWebFolder = function CordovaBrowser$getHTMLFilesInWebFolder() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.unsupportedAPI('new voltmx.ui.CordovaBrowser().getHTMLFilesInWebFolder');
        };

        var cordovabrowser_goBack = function CordovaBrowser$goBack() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.unsupportedAPI('new voltmx.ui.CordovaBrowser().goBack');
        };

        var cordovabrowser_goForward = function CordovaBrowser$goForward() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.unsupportedAPI('new voltmx.ui.CordovaBrowser().goForward');
        };

        var cordovabrowser_isCordovaAppsEnabled = function CordovaBrowser$isCordovaAppsEnabled() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.unsupportedAPI('new voltmx.ui.CordovaBrowser().isCordovaAppsEnabled');
        };

        var cordovabrowser_isHtmlPreviewEnabled = function CordovaBrowser$isHtmlPreviewEnabled() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.unsupportedAPI('new voltmx.ui.CordovaBrowser().isHtmlPreviewEnabled');
        };

        var cordovabrowser_isWebAppDevelopmentEnabled = function CordovaBrowser$isWebAppDevelopmentEnabled() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.unsupportedAPI('new voltmx.ui.CordovaBrowser().isWebAppDevelopmentEnabled');
        };

        var cordovabrowser_loadData = function CordovaBrowser$loadData() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.unsupportedAPI('new voltmx.ui.CordovaBrowser().loadData');
        };

        var cordovabrowser_registerForPeekandPop = function CordovaBrowser$registerForPeekandPop() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.unsupportedAPI('new voltmx.ui.CordovaBrowser().registerForPeekandPop');
        };

        var cordovabrowser_reload = function CordovaBrowser$reload() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.unsupportedAPI('new voltmx.ui.CordovaBrowser().reload');
        };

        var cordovabrowser_setOnPeek = function CordovaBrowser$setOnPeek() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.unsupportedAPI('new voltmx.ui.CordovaBrowser().setOnPeek');
        };

        var cordovabrowser_setOnPop = function CordovaBrowser$setOnPop() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.unsupportedAPI('new voltmx.ui.CordovaBrowser().setOnPop');
        };

        var cordovabrowser_unregisterForPeekandPop = function CordovaBrowser$unregisterForPeekandPop() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.unsupportedAPI('new voltmx.ui.CordovaBrowser().unregisterForPeekandPop');
        };

        $K.defVoltmxProp(CordovaBrowser.prototype, [
            {keey:'_render', value:cordovabrowser__render},
            {keey:'canGoBack', value:cordovabrowser_canGoBack},
            {keey:'canGoForward', value:cordovabrowser_canGoForward},
            {keey:'clearHistory', value:cordovabrowser_clearHistory},
            {keey:'evaluateJavaScript', value:cordovabrowser_evaluateJavaScript},
            {keey:'getHTMLFilesInWebFolder', value:cordovabrowser_getHTMLFilesInWebFolder},
            {keey:'goBack', value:cordovabrowser_goBack},
            {keey:'goForward', value:cordovabrowser_goForward},
            {keey:'isCordovaAppsEnabled', value:cordovabrowser_isCordovaAppsEnabled},
            {keey:'isHtmlPreviewEnabled', value:cordovabrowser_isHtmlPreviewEnabled},
            {keey:'isWebAppDevelopmentEnabled', value:cordovabrowser_isWebAppDevelopmentEnabled},
            {keey:'loadData', value:cordovabrowser_loadData},
            {keey:'registerForPeekandPop', value:cordovabrowser_registerForPeekandPop},
            {keey:'reload', value:cordovabrowser_reload},
            {keey:'setOnPeek', value:cordovabrowser_setOnPeek},
            {keey:'setOnPop', value:cordovabrowser_setOnPop},
            {keey:'unregisterForPeekandPop', value:cordovabrowser_unregisterForPeekandPop}
        ]);

        return CordovaBrowser;
    }())});


    Object.defineProperty(voltmx.ui, 'NativeContainer', {configurable:false, enumerable:false, writable:$K.defWritable(), value:(function() {
        var $K = voltmx.$kwebfw$;

        var NativeContainer = function NativeContainer() {};
        $K.utils.inherits(NativeContainer, voltmx.ui.BasicWidget);

        var nativecontainer__render = function NativeContainer$_render(tag) {
            var $super = voltmx.ui.FlexContainer.base.prototype,
                $K = voltmx.$kwebfw$, $KU = $K.utils, view = null;

            if(this.isVisible || $K.F.RIVW) {
                view = $super._render.call(this, tag);

                if(!this._kwebfw_.view && this._kwebfw_.ns === 'voltmx.ui.NativeContainer') {
                    $KU.defineProperty(this._kwebfw_, 'view', view);
                }
            }

            return view;
        };

        var nativecontainer_getContainerView = function NativeContainer$getContainerView() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.unsupportedAPI('new voltmx.ui.NativeContainer().getContainerView');
        };

        var nativecontainer_registerForPeekandPop = function NativeContainer$registerForPeekandPop() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.unsupportedAPI('new voltmx.ui.NativeContainer().registerForPeekandPop');
        };

        var nativecontainer_setOnPeek = function NativeContainer$setOnPeek() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.unsupportedAPI('new voltmx.ui.NativeContainer().setOnPeek');
        };

        var nativecontainer_setOnPop = function NativeContainer$setOnPop() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.unsupportedAPI('new voltmx.ui.NativeContainer().setOnPop');
        };

        var nativecontainer_unregisterForPeekandPop = function NativeContainer$unregisterForPeekandPop() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.unsupportedAPI('new voltmx.ui.NativeContainer().unregisterForPeekandPop');
        };

        $K.defVoltmxProp(NativeContainer.prototype, [
            {keey:'_render', value:nativecontainer__render},
            {keey:'getContainerView', value:nativecontainer_getContainerView},
            {keey:'registerForPeekandPop', value:nativecontainer_registerForPeekandPop},
            {keey:'setOnPeek', value:nativecontainer_setOnPeek},
            {keey:'setOnPop', value:nativecontainer_setOnPop},
            {keey:'unregisterForPeekandPop', value:nativecontainer_unregisterForPeekandPop}
        ]);

        return NativeContainer;
    }())});


    Object.defineProperty(voltmx.ui, 'ReactNativeContainer', {configurable:false, enumerable:false, writable:$K.defWritable(), value:(function() {
        var $K = voltmx.$kwebfw$;

        var ReactNativeContainer = function ReactNativeContainer() {};
        $K.utils.inherits(ReactNativeContainer, voltmx.ui.BasicWidget);

        var reactnativecontainer__render = function ReactNativeContainer$_render(tag) {
            var $super = voltmx.ui.FlexContainer.base.prototype,
                $K = voltmx.$kwebfw$, $KU = $K.utils, view = null;

            if(this.isVisible || $K.F.RIVW) {
                view = $super._render.call(this, tag);

                if(!this._kwebfw_.view && this._kwebfw_.ns === 'voltmx.ui.ReactNativeContainer') {
                    $KU.defineProperty(this._kwebfw_, 'view', view);
                }
            }

            return view;
        };

        $K.defVoltmxProp(ReactNativeContainer.prototype, [
            {keey:'_render', value:reactnativecontainer__render}
        ]);

        return ReactNativeContainer;
    }())});


    Object.defineProperty(voltmx.ui, 'Toast', {configurable:false, enumerable:false, writable:$K.defWritable(), value:(function() {
        var $K = voltmx.$kwebfw$;

        var Toast = function Toast() {};
        $K.utils.inherits(Toast, voltmx.ui.BasicWidget);

        var toast__render = function Toast$_render(tag) {
            var $super = voltmx.ui.FlexContainer.base.prototype,
                $K = voltmx.$kwebfw$, $KU = $K.utils, view = null;

            if(this.isVisible || $K.F.RIVW) {
                view = $super._render.call(this, tag);

                if(!this._kwebfw_.view && this._kwebfw_.ns === 'voltmx.ui.Toast') {
                    $KU.defineProperty(this._kwebfw_, 'view', view);
                }
            }

            return view;
        };

        var toast_show = function Toast$show() {
            var $K = voltmx.$kwebfw$, $KU = $K.utils;

            $KU.unsupportedAPI('new voltmx.ui.Toast().show');
        };

        $K.defVoltmxProp(Toast.prototype, [
            {keey:'_render', value:toast__render},
            {keey:'show', value:toast_show}
        ]);

        return Toast;
    }())});


    /*
    Object.defineProperty(voltmx.ui, 'UnsupportedWidget01', {configurable:false, enumerable:false, writable:$K.defWritable(), value:(function() {
        var $K = voltmx.$kwebfw$;

        var UnsupportedWidget01 = function UnsupportedWidget01() {};
        $K.utils.inherits(UnsupportedWidget01, voltmx.ui.BasicWidget);

        var unsupported01__render = function UnsupportedWidget01$_render(tag) {
            var $super = voltmx.ui.FlexContainer.base.prototype,
                $K = voltmx.$kwebfw$, $KU = $K.utils, view = null;

            if(this.isVisible || $K.F.RIVW) {
                view = $super._render.call(this, tag);

                if(!this._kwebfw_.view && this._kwebfw_.ns === 'voltmx.ui.UnsupportedWidget01') {
                    $KU.defineProperty(this._kwebfw_, 'view', view);
                }
            }

            return view;
        };

        $K.defVoltmxProp(UnsupportedWidget01.prototype, [
            {key:'_render', value:unsupported01__render}
        ]);

        return UnsupportedWidget01;
    }())});


    Object.defineProperty(voltmx.ui, 'UnsupportedWidget02', {configurable:false, enumerable:false, writable:false, value:(function() {
        var $K = voltmx.$kwebfw$;

        var UnsupportedWidget02 = function UnsupportedWidget02() {};
        $K.utils.inherits(UnsupportedWidget02, voltmx.ui.BasicWidget);

        var unsupported02__render = function UnsupportedWidget02$_render(tag) {
            var $super = voltmx.ui.FlexContainer.base.prototype,
                $K = voltmx.$kwebfw$, $KU = $K.utils, view = null;

            if(this.isVisible || $K.F.RIVW) {
                view = $super._render.call(this, tag);

                if(!this._kwebfw_.view && this._kwebfw_.ns === 'voltmx.ui.UnsupportedWidget02') {
                    $KU.defineProperty(this._kwebfw_, 'view', view);
                }
            }

            return view;
        };

        $K.defVoltmxProp(UnsupportedWidget02.prototype, [
            {key:'_render', value:unsupported02__render}
        ]);

        return UnsupportedWidget02;
    }())});
    //*/
}());
