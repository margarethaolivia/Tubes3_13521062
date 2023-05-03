/* --------------------------- Levenshtein Distance -------------------------- */
/*          Calculates the Levenshtein distance between two strings.          */

// source https://blog.paperspace.com/measuring-text-similarity-using-levenshtein-distance/ 
// Return the similarity between str1 and str2
function levenshteinDistance(str1, str2) {
    if (str1 == "" && str2 == "") {
        return 0.0
    }

    str1 = str1.toLowerCase()
    str2 = str2.toLowerCase()

    // initialize matriks 0
    const matrix = Array(str1.length + 1).fill().map(() => Array(str2.length + 1).fill(0));
    
    // initialize first matriks 
    for (let i = 0; i <= str1.length; i++) {
        matrix[i][0] = i;
    }
    for (let j = 0; j <= str2.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= str1.length; i++) {
        for (let j = 1; j <= str2.length; j++) {
            const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1, // deletion
                matrix[i][j - 1] + 1, // insertion
                matrix[i - 1][j - 1] + cost // substitution
            );
        }
    }

    // return similarity by Levenshtein distance (bottom-right corner of matrix)
    return (Math.max(str1.length, str2.length) - matrix[str1.length][str2.length]) / Math.max(str1.length, str2.length);
}

module.exports = {levenshteinDistance}