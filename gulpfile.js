const gulp = require('gulp')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()

// Styles
function style() {
    return gulp.src('./public/sass/**/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer(['last 4 versions']))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/css'))

        .pipe(browserSync.stream())
}

// Watch
function watch() {
    browserSync.init({
        server: {
            baseDir: './public'
        }
    })

    gulp.watch('./node_modules/bootstrap/scss/bootstrap.scss', browserSync.reload)
    gulp.watch('./public/sass/**/*.sass', style)
    gulp.watch('./public/*.html').on('change', browserSync.reload)
    // gulp.watch('./public/js/**/*.js').on('change', browserSync.reload)
}

exports.style = style
exports.watch = watch


