const {series, src, dest} = require('gulp');

function defaultTask(cb) {
    console.log('Gulp is running');
    cb();
}

function html() {
    console.log('building html');
    return src('./src/index.html')
        .pipe(dest('./dist/index.html'));
    
}

function scripts(cb) {
    console.log('building scripts');
    cb();    
}

function styles(cb) {
    console.log('building styles');
    cb();    
}

module.exports = {
    default: defaultTask,
    build: series(html, scripts, styles)
}

