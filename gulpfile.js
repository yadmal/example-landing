const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const gcmq = require('gulp-group-css-media-queries');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');


var cssFiles = {
    src: './src/precss/**/*.less',
    dest: './build/css'
}

function styles() {
    return gulp.src(cssFiles.src)
        .pipe(less())
        .pipe(concat('style.css'))
        .pipe(gcmq())
        .pipe(autoprefixer({
            overrideBrowserslist: ['>0.1%'],
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(gulp.dest(cssFiles.dest));
}

function scripts() {

}

gulp.task('style', styles);
