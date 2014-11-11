Array.prototype.average = function(from, to, increment) {
    var total = 0;
    var items = 0;
    this.each(function(index, elem) {
        for(var i = args[1]; i < args[2]; i++) {
            if (typeof this[i] === "number") {
                total += this[i];
                items++;
            }
        }
    }, from, to, increment);
    return total / items;
}

Array.prototype.each = function(func, from, to, increment, environment) {
    func = func || function(index, element, env) {};
    from = from || 0;
    to = to || this.length;
    increment = increment || 1;
    for(var i = from; i < to; i += increment) {
        environment = func.apply(this, [i, this[i], environment]);
    }
    if (environment != undefined) {
        return environment;
    }
    return this;
}

Array.prototype.fromEnd = function(index) {
    if (typeof index !== "number" || index >= this.length || index < 0) {
        return undefined;
    } else {
        return this[this.length - 1 - index];
    }
}

Array.prototype.insert = function(index, newElement) {
    for(var i = 1; i < arguments.length; i++) {
        this.splice(index, 0, arguments[i]);
    }
}

Array.prototype.cloneElement = function(originalIndex, times, targetIndex, replace) {
    if(typeof replace !== "boolean") replace = false;
    if(typeof originalIndex !== "number") originalIndex = 0;
    if(typeof times !== "number") times = 0;
    if(typeof targetIndex !== "number") targetIndex = 0;
    if(Math.abs(originalIndex) >= this.length) { originalIndex = Math.abs(originalIndex) % this.length }
    if(Math.abs(targetIndex) >= this.length) { targetIndex = Math.abs(targetIndex) % this.length }
    if(replace == true) {
        this.each(function(index, element, environment) {
            this[index] = environment.elem;
        }, targetIndex, targetIndex + times, 1, { elem : this[originalIndex] });
    } else {
        for(var i = 0; i < times; i++) {
            this.insert(targetIndex + i, this[originalIndex]);
        }
    }
}

Array.prototype.indexOf = function(element, start) {
    if(typeof start == "number") {
        if (start < 0 || start >= this.length) {
            for(var x = start; x < this.length; x++) {
                if (this[x] === element) {
                    return x;
                }
            }
        }
    } else {
        for(var x in this) {
            if (this[x] === element) {
                return x;
            }
        }
    }
    return -1;
}

Array.prototype.replace = function(element, replaceWith, all) {
    var found = this.indexOf(element);
    this[found] = replaceWith;
    if (all == true) {
        var i = found;
        while(i < this.length && i != -1) {
            i = this.indexOf(element, i + 1);
            this[i] = replaceWith;
        }
    }
}

Array.prototype.get = function(from, to) {
    return this.each(function(index, elem, env) {env.push(elem);}, from, to, 1, []);
}

String.prototype.splitTokens = function(tokens) {
    if (tokens == undefined || tokens instanceof Array == false || tokens.length < 1) {
        tokens = [" "];
    }
    var pieces = [this.substring(0, this.length)];
    for(var t = 0; t < tokens.length; t++) {
        var newPieces = [];
        for(var p = 0; p < pieces.length; p++) {
            var result = pieces[p].split(tokens[t]);
            result.each(function(index, elem) { newPieces.concat(elem); }, 0, result.length);
        }
        pieces = newPieces;
    }
    return pieces;
}

/**
 *@description A special type of regex matching.
 *@param {Array} format An array of strings describing the format, the last one should be
 *the actual pattern. The format for the strings should be "symbol=range" where symbol is
 *a single character, followed by an equal sign. Range reprents either an inclusive number
 *range where two numbers are separated by an ampersand "&", or a negated list where two
 *numbers are separated by an exclamation point, or a conditional where a greater than ">"
 *or a less than "<" sign precedes a number, or a list of numbers separated by commas ",".
 *The list can contain a single number, since conditionals do not support the equal sign
 *"=", it would be redundant. Spaces will be trimmed, so whitespace does not matter.
 *
 *The pattern string contains your symbols as well as the buil-in ones. Here are the built-in
 *symbols:
 *  + matches positive numbers only("+ = > 0").
 *  - matches negative numbers only("- = < 0").
 *  # matches any digit from 0-9("# = 0 & 9").
 *  . matches a decimal(this is a literal token).
 *NOTE: if
 *If you precede any symbol, predefined or not, with a number x that is surrounded in
 *parenthesis then it has the meaning "Match the following symbol x times", if the last
 *symbol before the closing parenthesis is a backslash "\" then the parenthesis lose their
 *special meaning and will match literally. A plus has the meaning "Match at least x times"
 *and a minus means "Match at most x times".
 *Whitespace DOES matter in the pattern string, since any character not in the format array
 *will be matched literally. Regular expressions will NOT be evaluated except the parenthesis
 *mentioned above.
 *
 *@param {Array} numbers an array of strings that represent the digits. Their index represents
 *their numerical value. For example, hexadecimal would look like this:
 *["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]
*/
String.prototype.getNumbers = function(format, numbers) {
    
}

String.prototype.stripTags = function() {
    return this.split(/<[^<>]*?>/g);
}