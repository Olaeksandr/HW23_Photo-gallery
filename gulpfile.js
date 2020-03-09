const {series, src, dest} = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const sass = require('gulp-sass');

function defaultTask(cb) {
    console.log('Gulp is running');
    cb();
}

function html() {
    console.log('building html');
    return src('./src/index.html')
            .pipe(dest('./dist'));
}

function scripts() {
    console.log('building scripts');
    return src('./src/**/*.js')
            .pipe(babel())
            .pipe(concat('all.js'))
            .pipe(dest('./dist'));
}

function styles() {
    console.log('building styles');
    return src('./src/styles.sass')
            .pipe(sass())
            .pipe(dest('./dist'));
}

module.exports = {
    default: defaultTask,
    build: series(html, scripts, styles)
};

