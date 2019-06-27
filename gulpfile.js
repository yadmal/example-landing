const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const gcmq = require('gulp-group-css-media-queries');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');

const isDev = false;
const isProd = !isDev;

var cssFiles = {
    src: './src/precss/styles.less',
    allPreFiles: './src/precss/**/*.less',
    dest: './build/css'
}

var jsFiles = {
    src: './src/prejs/scripts.js',
    allPreFiles: './src/prejs/**/*.js',
    dest: './build/js'
}

function styles() {
    return gulp.src(cssFiles.src)
        .pipe(gulpif(isDev, sourcemaps.init()))
        .pipe(less())
        .pipe(concat('style.css'))
        .pipe(gcmq())
        .pipe(autoprefixer({
            overrideBrowserslist: ['>0.1%'],
            cascade: false
        }))
        .pipe(gulpif(isProd, cleanCSS({
            level: 2
        })))
        .pipe(gulpif(isDev, sourcemaps.write()))
        .pipe(gulp.dest(cssFiles.dest));
}

function scripts() {
  return gulp.src(jsFiles.src)
      .pipe(gulpif(isDev, sourcemaps.init()))
      .pipe(concat('script.js'))
      .pipe(gulpif(isProd, uglify({toplevel: true})))
      .pipe(gulpif(isDev, sourcemaps.write()))
      .pipe(gulp.dest(jsFiles.dest));
}

function watch(){
  gulp.watch(cssFiles.allPreFiles, styles);
  gulp.watch(jsFiles.allPreFiles, scripts);
}

gulp.task('style', styles);
gulp.task('script', scripts);
gulp.task('watch', watch);
