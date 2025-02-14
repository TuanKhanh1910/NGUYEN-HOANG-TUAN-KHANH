// Method 1 : use for loop
const sum_to_n_a = function (n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

// Method 2 : Use mathematical formulas.
const sum_to_n_b = function (n) {
  return (n * (n + 1)) / 2;
};

// Method 3 : Use recursion
const sum_to_n_c = function (n) {
  if (n === 1) return 1;
  return n + sum_to_n_c(n - 1);
};

const result_a = sum_to_n_a(5);
const result_b = sum_to_n_b(5);
const result_c = sum_to_n_c(5);

console.log("result for method 1", result_a);
console.log("result for method 2", result_b);
console.log("result for method 3", result_c);
