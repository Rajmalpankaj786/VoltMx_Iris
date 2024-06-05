/**
 * Created by : Inderpreet kaur
 * Copyright : HCL America, Inc., 2021
 *
 **/

/*
    Utilities file for object model generation.
 */

/**
 * Check if object is null, undefined or empty.
 *
 * @param object        input object
 * @returns {boolean|*} true/false
 */
voltmxModelIsNullOrUndefinedOrEmptyObject = function (object) {
    return (voltmxModelIsNullOrUndefined(object) || voltmxModelIsEmptyObject(object));
};

voltmxModelIsEmptyObject = function (obj) {
    if (typeof (obj) === "boolean"
        || typeof (obj) === "number") {
        return false;
    } else if (typeof (obj) === "string") {
        return obj.trim().length === 0;
    }

    for (var prop in obj) {
        return false;
    }
    return true;
};

voltmxModelIsNullOrUndefined = function (val) {
    if (val === null || val === undefined) {
        return true;
    } else {
        return false;
    }
};

/**
 * Check if object is boolean.
 *
 * @param val input object
 * @returns {boolean}
 */
voltmxModelIsObjectBoolean = function (val) {
    if (typeof val === "boolean") {
        return true;
    } else {
        return false;
    }
};

/**
 * Return boolean value if value is passed as string.
 *
 * @param val input object
 * @returns {boolean}
 */
voltmxModelReturnBooleanValue = function (val) {
    if (val === "true" || val === true) {
        return true;
    } else {
        return false;
    }
};

module.exports = {
    voltmxModelIsNullOrUndefinedOrEmptyObject,
    voltmxModelReturnBooleanValue,
    voltmxModelIsObjectBoolean
}