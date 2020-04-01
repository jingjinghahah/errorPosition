var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+:\d+/;
var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+:\d+|\(native\))/m;
var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code])?$/;

class ErrorStackParser { 

}

function parse(error) { 
    var filtered = error.stack.split('\n').filter(function (line) {
        return !!line.match(CHROME_IE_STACK_REGEXP);
    });

    return filtered.map(function (line) {
        if (line.indexOf('(eval ') > -1) {
            line = line.replace(/eval code/g, 'eval').replace(/(\(eval at [^()]*)|(\),.*$)/g, '');
        }
        var sanitizedLine = line.replace(/^\s+/, '').replace(/\(eval code/g, '(');

        var location = sanitizedLine.match(/ (\((.+):(\d+):(\d+)\)$)/);

        // remove the parenthesized location from the line, if it was matched
        sanitizedLine = location ? sanitizedLine.replace(location[0], '') : sanitizedLine;

        var tokens = sanitizedLine.split(/\s+/).slice(1);
        // if a location was matched, pass it to extractLocation() otherwise pop the last token
        var locationParts = this.extractLocation(location ? location[1] : tokens.pop());
        var functionName = tokens.join(' ') || undefined;
        var fileName = ['eval', '<anonymous>'].indexOf(locationParts[0]) > -1 ? undefined : locationParts[0];

        return new StackFrame({
            functionName: functionName,
            fileName: fileName,
            lineNumber: locationParts[1],
            columnNumber: locationParts[2],
            source: line
        });
    });
}