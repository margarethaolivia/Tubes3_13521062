/* --------------------------- Levenshtein Distance -------------------------- */
/*          Calculates the Levenshtein distance between two strings.          */

// source https://blog.paperspace.com/measuring-text-similarity-using-levenshtein-distance/ 
function levenshteinDistance(str1, str2) {
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

    // return Levenshtein distance (bottom-right corner of matrix)
    return matrix[str1.length][str2.length];
}