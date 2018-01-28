//Gulpfile
//include gulp module
const gulp = require('gulp');
//setup file paths
const paths = {
    jQuerySource: 'bower_components/jQuery/dist/jquery.js',
    materializeSASS:'bower_components/materialize/sass/**/*.scss',
    materializeJsSource: 'bower_components/materialize/dist/js/materialize.js',
    srcJS: 'src/js/*.js',
    srcSCSS: 'src/scss/*.scss',

    dist: 'public',
    distCSS: 'public/css/',
    distJS: 'public/js/'
};

gulp.task('copyjQuery', () => {
    return gulp.src(paths.jQuerySource).pipe(gulp.dest(paths.distJS));
});

gulp.task('copyMaterializeJs', () => {
    return gulp.src(paths.materializeJsSource).pipe(gulp.dest(paths.distJS));
});

gulp.task('copyAllCcustomJs', () => {
    return gulp.src(paths.srcJS).pipe(gulp.dest(paths.distJS));
});

gulp.task('default', ['copyjQuery', 'copyMaterializeJs', 'copyAllCcustomJs'], () => {
    console.log('Gulp tasks completed successfully!');
});
