var fs = require('fs');

var request = require('request');

module.exports = {
    pwd: () => {
        process.stdout.write(process.env.PWD);
        process.stdout.write(`\nprompt > `);
    },
    date: () => {
        process.stdout.write(Date());  
        process.stdout.write(`\nprompt > `);
    },
    ls: () => {
        fs.readdir('.', function(err, files) {
            if (err) throw err;
            files.forEach(function(file) {
              process.stdout.write(file.toString() + "\n");
            })
            process.stdout.write("prompt > ");
          });
        
        process.stdout.write(`\nprompt > `);
    },
    echo: (options) => {
        console.log(options);
        process.stdout.write(`\nprompt > `);
    },
    cat: (options) => {
        const file = options;
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) throw err;
            console.log(`----------- COTENIDO DEL ARCHIVO -----------\n\n ${data}`);
            process.stdout.write(`\nprompt > `);
        });
    },
    // head: (options) => {
    //     const file = options;
    // }
    curl: (options) => {
        request(options, (error, response, body) =>  {
            console.error('error:', error); // Print the error if one occurred
            console.log('body:', body); // Print the HTML for the Google homepage.
          });
          process.stdout.write(`\nprompt > `);
    },
}