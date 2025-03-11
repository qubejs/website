const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const paths = require('./paths');
function copyFileSync(source, target) {
  var targetFile = target;

  // If target is a directory, a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(
  source,
  target,
  excludeFolder = true,
  ignore = [
    'node_modules',
    'coverage',
    '.storybook',
    '.nyc_output',
    'package-lock.json',
  ]
) {
  var files = [];
  if (ignore.indexOf(path.basename(source)) > -1) {
    return;
  }
  // console.log('@@@@' + target);
  if (!excludeFolder) {
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target);
    }
  }
  var targetFolder;
  if (!excludeFolder) {
    // Check if folder needs to be created or integrated
    targetFolder = path.join(target, path.basename(source));
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder);
    }
  } else {
    targetFolder = target;
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder);
    }
  }
  // Copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function (file) {
      var curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder, false);
      } else {
        if (ignore.indexOf(path.basename(curSource)) === -1) {
          copyFileSync(curSource, targetFolder);
        }
      }
    });
  }
}

console.log(chalk.green('copy assets started'));
copyFolderRecursiveSync(
  `${paths.server}/src/dam`,
  `${paths.distWeb}`, false
);
copyFolderRecursiveSync(
  `${paths.docsDist}`,
  `${paths.distWeb}/docs`, true
);
copyFileSync(
  `${paths.distWeb}/index.html`,
  `${paths.distWeb}/404.html`, false
);

console.log(chalk.green('copy assets done'));
