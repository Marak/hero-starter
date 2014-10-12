/*

  gulpfile.js - gulp script for building hero.js bundle from ./big folder
  
  If this is your first time trying to build big, you will need to install gulp:

    [sudo] npm install gulp -g
    cd build/
    gulp

*/

var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('hero-bundle', function() {
  return gulp.src(['../big/header.js', '../big/index.js', '../big/directives/*.js', '../big/helpers.js', '../big/hero.js' ])
    .pipe(concat('hero.js'))
    .pipe(gulp.dest('../'))
});

gulp.task('default', ['hero-bundle']);