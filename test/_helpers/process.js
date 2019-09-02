var fs = require("fs");
var path = require("path");

exports.chdirAndDo = function (target, cb) {
    var current = process.cwd();

    process.chdir(target);

    try {
        cb();
    } catch (error) {
        console.warn('[chdirAndDo] error', error)
    }

    return () => {
        process.chdir(current)
    }
}

exports.ensureDirectoryExisted = function (dirname) {
    if (!fs.exists(dirname)) {
        fs.mkdir(dirname)
        return 
    }

    var stat = fs.stat(dirname);
    if (stat.isDirectory())
        return ;

    throw new Error(`file '${dirname}' existed and is NOT directory`)
}

exports.readJson = function (filename) {
    const txt = fs.readTextFile(filename)

    return JSON.parse(txt)
}