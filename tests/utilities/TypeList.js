var allTypes = [0, -1, 1, 0|0, -1|0, 1|0, 0.3482, -0.23479, 23479.47935, -34795.2349725, 23948723|0, 31593452|0, NaN, null, void 0, {}, [], '', 'hello', function(){}, true, false];

function TypeList(types) {
    this._types = types || allTypes.slice();
}

TypeList.prototype.filter = function () {
    return new TypeList(this._types.filter.apply(this._types, arguments));
};

TypeList.prototype.removeNumbers = function removeNumbers() {
    return this.filter(function(item) {
        return typeof item !== 'number';
    });
};

TypeList.prototype.removeFloats =  function removeFloats() {
    return this.filter(function(item) {
        return isNaN(item) || item === item|0;
    });
};

TypeList.prototype.removeFunctions = function removeFunctions() {
    return this.filter(function(item) {
        return typeof item !== 'function';
    });
};

TypeList.prototype.removeInts = function removeInts() {
    return this.filter(function(item) {
        return isNaN(item) || item !== item|0;
    });
};

TypeList.prototype.removeNegatives = function removeNegatives() {
    return this.filter(function(item) {
        return isNaN(item) || item >= 0;
    });
};

TypeList.prototype.removePositives = function removePositives() {
    return this.filter(function(item) {
        return isNaN(item) || item >= 0;
    });
};

TypeList.prototype.removeArrays = function removeArrays() {
    return this.filter(function(item) {
        return !(item instanceof Array);
    });
};

TypeList.prototype.removeObjects = function removeObjects() {
    return this.filter(function(item) {
        return !(item instanceof Object);
    });
};

TypeList.prototype.removeTruthy = function removeTruthy() {
    return this.filter(function(item) {
        return !!item;
    });
};

TypeList.prototype.removeFalsy = function removeFalsy() {
    return this.filter(function(item) {
        return !item;
    });
};

TypeList.prototype.removeStrings = function removeStrings() {
    return this.filter(function(item) {
        return typeof item !== 'string';
    });
};

TypeList.prototype.removeBools = function removeBools() {
    return this.filter(function(item) {
        return item !== true && item !== false;
    });
};

TypeList.prototype.removeUndefined = function removeUndefined() {
    return this.filter(function(item) {
        return item !== undefined;
    });
};

TypeList.prototype.removeNull = function removeNull() {
    return this.filter(function(item) {
        return item !== null;
    });
};

TypeList.prototype.strings = function strings() {
    return this.filter(function(item) {
        return typeof item === 'string';
    });
};

TypeList.prototype.numbers = function numbers() {
    return this.filter(function(item) {
        return typeof item === 'number';
    });
};

TypeList.prototype.objects = function objects() {
    return this.filter(function(item) {
        return item instanceof Object;
    });
};

TypeList.prototype.functions = function functions() {
    return this.filter(function(item) {
        return typeof item === 'function';
    });
};

TypeList.prototype.truthy = function truthy() {
    return this.filter(function (item) {
        return !!item;
    });
};

TypeList.prototype.falsy = function falsy() {
    return this.filter(function (item) {
        return !item;
    });
};

TypeList.prototype.forEach = function forEach(fn) {
    for (var i = 0 ; i < this._types.length ; i++) {
        fn(this._types[i], i, this._types);
    }
};

TypeList.prototype.value = function value() {
    return this._types;
};

module.exports = TypeList;