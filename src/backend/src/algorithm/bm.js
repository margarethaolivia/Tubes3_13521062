/* ------------------------------- File : bm.js ------------------------------- */
/*            Do the pattern-matching using Boyer-Moore algorithm               */

function lastOccurBuilder(pattern) {
    /* Return array storing index of last
    occurrence of each ASCII char in pattern. */
    var last = new Array(256); // create an array with length 256
    for(let i=0; i < 256; i++) {
        last[i] = -1; // initialize array
    }
    for (let i = 0; i < pattern.length; i++) {
        last[pattern.charCodeAt(i)] = i; // use charCodeAt() to get ASCII value
    }
    return last;
}

function matchBM(text, pattern) {
    text = text.toLowerCase()                      // Convert text to lowercase
    pattern = pattern.toLowerCase()                   // Convert pattern to lowercase
    
    var lastOccur = lastOccurBuilder(pattern)
    var lengthText = text.length
    var lengthPattern = pattern.length
    var i = lengthPattern - 1

    // no match if pattern is longer than text
    if (i > lengthText - 1) {
        return -1
    }

    var j = lengthPattern - 1

    do {
        if (pattern[j] == text[i]) {
            if (j == 0) {
                // match
                return i
            }
            else {
                // looking-glass technique : find patttern in text by moving backward
                i--
                j--
            }
        }
        else {
            // character-jump technique
            var lo = lastOccur[text[i]]
            i = i + lengthPattern - Math.min(j, 1 + lo)
            j = lengthPattern - 1
        }
    } while (i <= lengthText - 1)

    // no match
    return -1
}


module.exports = {matchBM}
