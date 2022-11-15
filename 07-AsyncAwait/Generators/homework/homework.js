function* fizzBuzzGenerator(max) {
  // Tu código acá:
  let num = 0;

  while (true) {
    num++;
    if (num > max) return;
    else {
      if (num % 15 === 0) yield "Fizz Buzz";
      else if (num % 3 === 0) yield "Fizz";
      else if (num % 5 === 0) yield "Buzz";
      else yield num;
    }
  }
}

module.exports = fizzBuzzGenerator;
