var gulp = require('gulp');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
// var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');
// var livereload = require("gulp-livereload");
var sass = require('gulp-sass');
var refresh = require('gulp-refresh');

gulp.task('webserver', function () {
    gulp.src('./build/')
        .pipe(webserver({
            port: 8080,
            livereload: true,
            open: true,
            fallback: './build/index.html',
        }));
});

gulp.task('views', function () {
    return gulp.src('./app/index.html')
        .pipe(gulp.dest('./build'));
});
gulp.task('templatesDirect', function () {
    return gulp.src(['./app/shared/**/*.html',])
        .pipe(gulp.dest('./build/shared'))
        .pipe(refresh());
});
gulp.task('cssConcat', function () {
    return gulp.src(require('./stylesheets-dependencies.json').dependencies)
        .pipe(plumber())
        .pipe(autoprefixer())
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('./build/css'));
});
gulp.task('buildLib', function () {
    gulp.src(require('./dependencies.json').dependencies)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./build/js'));
});

gulp.task('jsUglify', function () {
    return gulp.src('./app/shared/**/*.js')
        .pipe(plumber())
        .pipe(concat('all.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('./build/js'))
        .pipe(refresh());
});
gulp.task('sass', function () {
    gulp.src('./app/styles/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./build/css'))
        .pipe(refresh());

});
gulp.task('watch', function () {
    refresh.listen()
    // livereload.listen();
    // gulp.watch("./app/styles/**/*.css", ["cssConcat", ]);
    gulp.watch('./app/styles/scss/**/*.scss', ['sass', ]);
    gulp.watch('./app/shared/**/*.js', ['jsUglify',]);
    gulp.watch('./app/shared/**/*.html', ['templatesDirect',]);
    gulp.watch('./app/index.html', ['views',]);
});

gulp.task('default', ['jsUglify', 'views', 'templatesDirect', 'webserver', 'sass', 'buildLib', 'cssConcat', 'watch', ]);

