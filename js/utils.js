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

Array.prototype.each = function(func, from, to, increment) {
    func = func || function(index, element) {};
    from = from || 0;
    to = to || this.length;
    increment = increment || 1;
    for(var i = from; i < to; i += increment) {
        func(i, this[i]);
    }
    return this;
}

Array.prototype.fromEnd = function(index) {
    if (typeof index !== "number" || index >= this.length || index < 0) {
        return undefined;
    } else {
        return this[this.length - 1 + index];
    }
}

String.prototype.splitTokens = function(tokens) {
    if (tokens == undefined || tokens.length < 1) {
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
 *range where two numbers are separated by an ampersand "&", or an exclusive list where two
 *numbers are separated by an exclamation point, or a conditional where a greater than ">"
 *or a less than "<" sign precedes a number, or a list of numbers separated by commas ",".
 *The list can contain a single number, since conditionals do not support the equal sign
 *"=", it would be redundant. Spaces will be trimmed, so whitespace does not matter.
 *
 *The pattern string contains your symbols as well as the buil-in ones. Here are the built-in
 *symbols:
 * + matches positive numbers only.
 * - matches negative numbers only.
 * # matches any digit from 0-9.("# = 0 & 9")
 * . matches a decimal 
 * Whitespace DOES matter in the pattern string, since any character not in the format array
 * will be matched literally. Regular expressions will not be evaluated.
 *
 * @param {Array} numbers an array of strings that represent the digits. Their index represents
 * their numerical value. For example, hexadecimal would look like this:
 * ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]
*/
String.prototype.getNumbers = function(format, numbers) {
    
}