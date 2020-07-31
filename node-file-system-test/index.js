const fs = require('fs');

// const file = fs.readFileSync('./file.html');
// console.log(file);

// fs.copyFileSync('./file.html', './file-copy.html');
// fs.renameSync('./file-copy.html', './renamed-file.html');

// const html = `
//   <p>sup</p>
//   <span>bromingus u a bingus</span>
//   <div>
//     dingus dong
//   </div>
//   \n
// `.trim();

// fs.appendFileSync('./file.html', html);

const file = fs
  .readFileSync('./file.html')
  .toString();

console.log(file);

