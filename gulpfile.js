/*global require*/

let gulp = require("gulp"),
    obfuscator = require("gulp-javascript-obfuscator"),
    cleanCSS = require("gulp-clean-css"),
    htmlmin = require("gulp-htmlmin"),
    pack = require("gulp-crx-pack"),
    del = require("del"),
    fs = require("fs");

gulp.task("clean", function () {
    return del(["dist"]);
});

gulp.task("html", function() {
    return gulp.src("./*.html")
        .pipe(htmlmin({collapseWhitespace: false}))
        .pipe(gulp.dest("dist"));
});

gulp.task("libs", function () {
    return gulp.src(["./jquery*", "./manifest.*", "./*.png"])
        .pipe(gulp.dest("dist"));
});

gulp.task("js", function () {
    return gulp.src(["./bg.js", "./content.js", "./popup.js"])
        .pipe(obfuscator({
            compact: true
        }))
        .pipe(gulp.dest("dist"));
});

gulp.task("css", function () {
    return gulp.src("./*.css")
        .pipe(cleanCSS({}))
        .pipe(gulp.dest("dist"));
});

gulp.task("pack", ["clean", "js", "html", "libs", "css"], function () {
    return gulp.src("./dist")
        .pipe(pack({
            privateKey: fs.readFileSync("./mykey.pem", "utf8"),
            filename: "egghead.crx"
        }))
        .pipe(gulp.dest("./"));
});