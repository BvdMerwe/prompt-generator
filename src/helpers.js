// import react from 'react';
/**
 * Return a random number between 2 integers.
 * 
 * @param {int} mn Minimum value
 * @param {int} mx maximum value
 */
export function random(mn, mx) {
  return Math.random() * (mx - mn) + mn;
}

/**
 * Return a random word from the array.
 * 
 * @param {String} array Array of words
 */
export function getRandomElementFromArray(array) {
  if (!array) {
    throw new Error("Not a valid array");
  }
  let rand = random(0, array.length-1).toFixed();

  return array[rand];
}

/**
 * Fetch the Json data synchronously.
 * 
 * @param {String} url the URL to the data
 */
export async function fetchData(url) {
  let call =
    await fetch(url, { 
      headers: { 'Content-Type': 'application/json' } 
    });
    
    return await call.json();
}

/**
 * Fetch the Json data asynchronously.
 * 
 * @param {String} url the URL to the data
 */
export function fetchDataAsync(url) {
  let call =
    fetch(url, { 
      headers: { 'Content-Type': 'application/json' } 
    })
    .then(res => res.json())

    return call;
}

/**
 * Fixes the syntax of the generated sentence
 * 
 * @param {String} array 
 */
Object.defineProperty(Array.prototype, 'fixSyntax', { 
  value: function() {
    /**
     * Fix "a" vs "an"
     */
    for (let i = 0; i < this.length-1; i++) {
      let t = this[i];
      let tp1 = this[i+1]; 
      
      if ((typeof(t) === "string" && typeof(tp1) === 'object') &&
        t.endsWith("a ") && tp1.getFirstLetter().match(/[aeiouAEIOU]/)) {
        this[i].replace("a ", "an ");
      }
    }
    return [].concat(this);
  }
});