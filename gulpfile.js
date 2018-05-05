const gulp = require('gulp'),
      browserSync = require('browser-sync'),
      useref = require('gulp-useref')
      gulpIf = require('gulp-if'),
      uglify = require('gulp-uglify'),
      cleanCSS = require('gulp-clean-css');
      concat = require('gulp-concat'),
      rename = require('gulp-rename');
      critical = require('critical').stream;
// const imagemin = require('gulp-imagemin');
// const cache = require('gulp-cache');
// const del = require('del');
// const runSequence = require('run-sequence');



// basic test
gulp.task('default', function (done) {
  console.log('Gulp js is running')
  done()
});

// Development Tasks
// -----------------

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'src'
    }
  })
});

// Watchers
gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/js/**/*.js', browserSync.reload);
});


// Optimizing  JavaScript
gulp.task('useref', function() {
  return gulp.src('src/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('public'));
});


gulp.task('js', function() {
   return gulp.src('public/js/dbhelper.js')
              .pipe(rename({
                suffix: '.min'
              }))
              .pipe(uglify())
              .pipe(gulp.dest('public/js'));
});

// minifying css
gulp.task('css', function () {
  return gulp.src('src/**/*.css')
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('public/css'))

});



// Optimizing critical path
gulp.task('critical', function () {
  return gulp.src('src/index.html')
    .pipe(critical({
      base: 'src',
      inline: true,
      dimensions: [{
        width: 320,
        height: 480
      }, {
        width: 900,
        height: 1200
      }],
      minify: true
    }))
    .pipe(gulp.dest('src'));
});



