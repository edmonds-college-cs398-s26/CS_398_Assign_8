// Michael Walker
// CS 398, Algorithms, Spring 2026
//
// Weighted interval scheduling (intervals sorted by end time)
// -------------------------------------------------------------

function compare_end(a, b)
    {
    return a.end - b.end;
    }

// computes weighted interval scheduling
function weighted(data)
    {
    const n = data.length;

    const p = new Array(n + 1).fill(0);
    const dp = new Array(n + 1).fill(0);

    // compute p[j]: largest i < j such that interval i does not overlap j
    for(let j = 1; j <= n; j++) 
        {
        p[j] = 0;

        for(let i = j - 1; i >= 1; i--)
            {
            if(data[i - 1].end <= data[j - 1].start)
                {
                p[j] = i;
                break;
                }
            }
        }

    dp[0] = 0;

    for(let j = 1; j <= n; j++)
        {
        const include = data[j - 1].amount + dp[p[j]];
        const exclude = dp[j - 1];

        dp[j] = Math.max(include, exclude);
        }

    return dp[n];
    }

// ---------------- TEST CASES ----------------

// normal case, mixed overlaps - result 17
const data = 
    [
    { start: 1, end: 3, amount: 5 },
    { start: 2, end: 5, amount: 6 },
    { start: 4, end: 6, amount: 5 },
    { start: 6, end: 7, amount: 4 },
    { start: 5, end: 8, amount: 11 },
    { start: 7, end: 9, amount: 2 }
    ];

/*
// greedy fails case - result 14
const data = 
    [
    { start: 1, end: 3, amount: 5 },
    { start: 2, end: 5, amount: 6 },
    { start: 4, end: 6, amount: 5 },
    { start: 6, end: 7, amount: 4 }
    ];
*/

/*
// all compatible case - result 14
const data =  
    [
    { start: 1, end: 2, amount: 3 },
    { start: 3, end: 4, amount: 5 },
    { start: 5, end: 6, amount: 2 },
    { start: 7, end: 8, amount: 4 }
    ];
*/

/*
// no two compatible case - result 9
const data =
    [
    { start: 1, end: 4, amount: 5 },
    { start: 2, end: 5, amount: 6 },
    { start: 3, end: 6, amount: 5 },
    { start: 4, end: 7, amount: 4 }
    ];
*/

/*
// edge case, only 1 interval - result 42
const data =
    [
    { start: 10, end: 20, amount: 42 }
    ];
*/

data.sort(compare_end);  // sort by end time

const result = weighted(data);

console.log("Maximum total amount:", result);