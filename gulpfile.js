const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();

const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');

/*
const cssFiles = [
    './src/css/main.css',
    './src/css/media.css'
]
*/

const styleFiles = [
    './src/sass/main.sass',
    './src/sass/_interface.sass',
    './src/sass/_grid.sass',
    './src/sass/_media.sass',
    './src/sass/fonts/_fonts.scss',
    './src/sass/_colors.sass',
    './src/sass/blocks/_navbar.sass',
    './src/sass/blocks/_about.sass',
    './src/sass/blocks/_pages.sass',
    './src/sass/blocks/_gallery.sass',
    './src/sass/blocks/_blog.sass',
    './src/sass/blocks/_footer.sass'
]

const scriptFiles = [
    './src/js/jquery-1.7.2.min.js',
    './src/js/pixelSscreen.js'
]

gulp.task('styles', () => {
    return gulp.src(styleFiles)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(cleanCSS({
        level: 2
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream())
});

gulp.task('scripts', () => {
    return gulp.src(scriptFiles)
    .pipe(concat('script.js'))
    .pipe(uglify({
        toplevel: true
    }))
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream())
});

gulp.task('del', () => {
    return del(['build/*'])
});

gulp.task('img-compress', () => {
    return gulp.src('./src/img/**')
    .pipe(imagemin({
        progressive: true
    }))
    .pipe(gulp.dest('./build/img/'))
});

gulp.task('watch', () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./src/img/**', gulp.series('img-compress'))
    gulp.watch('./src/sass/**/*.sass', gulp.series ('styles'))
    gulp.watch('./src/js/**/*.js', gulp.series ('scripts'))
    gulp.watch('./*.html').on('change',browserSync.reload);
});

gulp.task('default', gulp.series('del', gulp.parallel('styles', 'scripts', 'img-compress'), 'watch'));