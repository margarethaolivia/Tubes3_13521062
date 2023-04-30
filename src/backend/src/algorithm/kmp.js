/* ------------------------------- File : kmp.js ------------------------------- */
/*         Do the pattern-matching using Knuth-Morris-Pratt algorithm            */

// findBorder function
// Return the biggest size of prefix from pattern[0..k] that is also a suffix of pattern[1..k]
function findBorder(pattern, k) {
    // Declare and initialize needed variable
    var result = 0                          // The biggest size
    var prefix = pattern.slice(0, k+1)      // The pattern[0..k]
    var suffix = pattern.slice(1, k+1)      // The pattern[1..k]
    
    // Begin searching for the biggest size
    var found = false                       // Boolean flag
    var i = k-1                             // Looping variable

    while (i >= 0 && !found) {
        if (prefix.slice(0, i+1) == suffix.slice(suffix.length-(i+1), suffix.length)) {
            result = i+1
            found = true
        }
        else {
            i--
        }
    }

    // Return the result size
    return result
}

// createBorderList function
// Return the list of all possible border value for the pattern
function createBorderList(pattern) {
    // Declare and initialize needed variable
    var resultList = []                     // Border value list

    // Fill the result list for all possible k value beside 0
    for (var k = 1; k < pattern.length-1; k++) {
        resultList.push(findBorder(pattern, k))
    }

    // Return the result list
    return resultList
}

// matchKMP function
// Return the index where the pattern starts in the text, return -1 if pattern does not exist in text
export function matchKMP(text, pattern) {
    // Declare and initialize needed variable
    var index = -1                                  // The index where the pattern starts
    var borderList = createBorderList(pattern)      // The border list for all possible mismatch 

    // Begin searching for the index where pattern starts
    var found = false                               // Boolean flag
    var i = 0                                       // Index pointing at character in text
    var j = 0                                       // Index pointing at character in pattern

    while (i < text.length && !found) {
        if (text[i] == pattern[j]) {               
            if (j == pattern.length-1) {           
                index = i - pattern.length + 1
                found = true
            }
            else {
                i++
                j++
            }
        }
        else if (j > 0) {
            j = borderList[j-1]
        }
        else {
            i++
        }
    }

    // Return the index
    return index
}