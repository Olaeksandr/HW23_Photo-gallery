const {series, src, dest, watch} = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const inject = require('gulp-inject');

function defaultTask(cb) {
    console.log('Gulp is running');
    cb();
}
function html() {
    console.log('building html');
    return src('./src/index.html')
    .pipe(dest('./dist'));
}

function vendorsJS() {
    return src(['./node_modules/jquery/dist/jquery.js' 
    //jqueryUI    
])
.pipe(concat('vendors.js'))
.pipe(dest('./dist'))    ; 
}

function scripts() {
    console.log('building scripts');
    return src('./src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write())
    .pipe(dest('./dist'));
}

function styles() {
    console.log('building styles');
    return src('./src/styles.sass')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(dest('./dist'));
}

function preparationHTML() {
    console.log('preparation html');
    return src('./dist/index.html')
    .pipe(inject(src('./dist/vendors.js', {read: false}), {starttag: '<!-- inject:head:{{ext}} -->', relative: true}))
    .pipe(inject(src(['./dist/**/*.js', '!./dist/vendors.js', './dist/**/*.css'], {read: false}), {relative: true}))
    .pipe(dest('./dist'));
}

function watchFiles() {
    watch('./src/**/*.js', scripts);
    watch('./src/**/*.sass', styles);
}

function serve() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    watch('./src/**/*.js', series(scripts, browserSync.reload));
    watch('./src/**/*.sass', series(styles, browserSync.reload));
}

const build = series(html, scripts, styles, vendorsJS, preparationHTML);

module.exports = {
    default: defaultTask,
    build: build,
    dev: series(build, watchFiles),
    serve: series(build, serve)
};

