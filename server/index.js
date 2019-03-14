const fs = require('fs');

fs.read('./test.txt', (content) =>
    {
      console.log(content);
    })
