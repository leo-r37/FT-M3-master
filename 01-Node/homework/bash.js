const commands = require('./commands');


//muestra un prompt
process.stdout.write('prompt > ');

//el evento stdin 'data' se dispara al escribir algo por teclado

process.stdin.on('data', (data) => {

    // var cmd = data.toString().trim();

    var input = data.toString().trim();
    var inputArray = input.split(' ');
    var cmd = inputArray[0];
    inputArray.shift();
    var options = inputArray.join(' ');
    
    // console.log(cmd);
    // console.log(inputArray);
    // console.log(options);

    if (options.length > 0) {
        commands[cmd](options);
    } else {
        commands[cmd]();
    }

});