var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var autoprefixer = require("gulp-autoprefixer");
var webserver = require("gulp-webserver");
var sass = require("gulp-sass");

// webserver
gulp.task("webserver", function () {
    gulp.src("./build/")
        .pipe(webserver({
            port: 8080,
            livereload: true,
            open: true,
            fallback: "./build/index.html",
        }));
});

gulp.task("templates", function () {
    return gulp.src("./app/index.html")
        .pipe(gulp.dest("./build"));
});

gulp.task("templatesDirect", function () {
    return gulp.src(["./app/view/**/*.html",])
        .pipe(gulp.dest("./build/view"));
});

gulp.task("buildLib", function () {
    gulp.src(require("./dependencies.json").dependencies)
        .pipe(concat("vendor.js"))
        .pipe(gulp.dest("./build/js"));
});

gulp.task("cssConcat", function () {
    return gulp.src(require("./stylesheets-dependencies.json").dependencies)
        .pipe(autoprefixer())
        .pipe(concat("vendor.css"))
        .pipe(gulp.dest("./build/css"));
});

gulp.task("jsUglify", function () {
    return gulp.src("./app/js/**/*.js")
        .pipe(concat("all.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./build/js"));
});

gulp.task("sass", function () {
    gulp.src("./app/styles/scss/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer({
            browsers: ["last 5 versions",],
            cascade: false,
        }))
        .pipe(concat("all.css"))
        .pipe(gulp.dest("./build/css"));

});
gulp.task("watch", function () {
    gulp.watch("./app/styles/scss/**/*.scss", ["sass",]);
    gulp.watch("./app/js/**/*.js", ["jsUglify",]);
    gulp.watch("./app/templates/**/*.html", ["templatesDirect",]);
    gulp.watch("./app/index.html", ["templates",]);
});

gulp.task("default", ["jsUglify", "webserver", "templates", "templatesDirect", "sass", "cssConcat", "buildLib", "watch",]);

