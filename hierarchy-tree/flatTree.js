const fs = require("fs");
const path = require("path");

const walkSync = (dir, filelist = [], filter) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const dirFile = path.join(dir, file);
    const dirent = fs.statSync(dirFile);
    const name = path.basename(dirFile);
    if (dirent.isDirectory()) {
      walkSync(dirFile, filelist, filter);
    } else if (filter.test(dirFile)) {
      filelist.push({
        path: dirFile.substring(basePath.length - 1, dirFile.length),
        name: name.replace(/\.[^/.]+$/, ""),
        svg: fs.readFileSync(dirFile, "utf8"),
      });
    }
  }
  return filelist;
};

// /\.(jpe?g|png|gif|bmp)$/i
const allowed = /\.(svg)$/i;
//const allowed = /\.()$/i;
//const iconsFolder = "/Users/amitka/RESOURCES";
const basePath = "./Icons";
const tree = walkSync(basePath, [], allowed);
const json = JSON.stringify(tree);
fs.writeFile("icons.json", json, "utf8", function () {
  console.log("Icons file is ready...");
});
console.log("Reading files at " + basePath);
