function fibonacci(n) {
  let arr = [0, 1];
  for (let i = 2; i < n; i++) {
    arr.push(arr[i - 1] + arr[i - 2]);
  }
  return arr.slice(0, n);
}

function getPrimes(arr) {
  return arr.filter(n => {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  });
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function hcfArray(arr) {
  return arr.reduce((a, b) => gcd(a, b));
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

function lcmArray(arr) {
  return arr.reduce((a, b) => lcm(a, b));
}

module.exports = { fibonacci, getPrimes, hcfArray, lcmArray };