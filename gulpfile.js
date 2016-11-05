var gulp = require('gulp'),
  babel = require('gulp-babel'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  // notify = require('gulp-notify'),
  mqpacker = require('css-mqpacker'),
  cssnano = require('gulp-cssnano'),
  postcss = require('gulp-postcss'),
  // critical = require('critical'),
  autoprefixer = require('autoprefixer'),
  browserSync = require('browser-sync').create(),
  // responsive = require('gulp-responsive-images'),
  // svgmin = require('gulp-svgmin'),
  // nodemon = require('gulp-nodemon'),
  sass = require('gulp-sass'),
  csswring = require('csswring'),
  sourcemaps = require('gulp-sourcemaps');
// faviconConfig = [{
//   width: 310,
//   rename: {
//     suffix: '-310'
//   }
// }, {
//   width: 192,
//   rename: {
//     suffix: '-192'
//   }
// }, {
//   width: 180,
//   rename: {
//     suffix: '-180'
//   }
// }, {
//   width: 160,
//   rename: {
//     suffix: '-160'
//   }
// }, {
//   width: 152,
//   rename: {
//     suffix: '-152'
//   }
// }, {
//   width: 150,
//   rename: {
//     suffix: '-150'
//   }
// }, {
//   width: 144,
//   rename: {
//     suffix: '-144'
//   }
// }, {
//   width: 120,
//   rename: {
//     suffix: '-120'
//   }
// }, {
//   width: 114,
//   rename: {
//     suffix: '-114'
//   }
// }, {
//   width: 96,
//   rename: {
//     suffix: '-96'
//   }
// }, {
//   width: 76,
//   rename: {
//     suffix: '-76'
//   }
// }, {
//   width: 72,
//   rename: {
//     suffix: '-72'
//   }
// }, {
//   width: 70,
//   rename: {
//     suffix: '-70'
//   }
// }, {
//   width: 64,
//   rename: {
//     suffix: '-64'
//   }
// }, {
//   width: 60,
//   rename: {
//     suffix: '-60'
//   }
// }, {
//   width: 57,
//   rename: {
//     suffix: '-57'
//   }
// }, {
//   width: 32,
//   rename: {
//     suffix: '-32'
//   }
// }, {
//   width: 16,
//   rename: {
//     suffix: '-16'
//   }
// }];

gulp.task('build', function () {
  gulp.start('styles', 'scripts');
});

// gulp.task('favicons', function() {
//     return gulp.src(['./images/src/favicon.jpg'])
//         .pipe(responsive({
//             '*': faviconConfig
//         }, {
//             quality: 95,
//             progressive: true,
//             compressionLevel: 6,
//             withMetadata: false
//         }))
//         .pipe(gulp.dest('./public/dist/'));
// });


// Styles
gulp.task('styles', function () {
  console.log('styles');
  var processors = [
    autoprefixer({
      browsers: ['> 0.3%', 'last 2 versions', 'IE > 6', 'iOS > 5', 'safari > 5'],
      flexbox: true
    }),
    mqpacker,
    csswring
  ];
  return gulp.src([
      './public/src/style/style.scss',
      './public/src/style/fonts.scss',
      './public/src/style/landingpage.scss',
      './public/src/style/loading.scss',
      './public/src/style/video.scss',
      './public/src/style/timeline.scss'
    ])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(postcss(processors))
    .pipe(cssnano())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/dist/style/'));
});

// Scripts app
gulp.task('scripts', function () {
  return gulp.src([
      './public/src/js/VRstart.js',
      './public/src/js/VRhelper.js',
      './public/src/js/VRdate.js',
      './public/src/js/VRrouter.js',
      './public/src/js/VRlanding.js',
      './public/src/js/VRtimeline.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/dist/js/'));
});

gulp.task('browser-sync', ['watch'], function () {
  browserSync.init({
    proxy: 'http://localhost:3010',
    files: ['**/*.*'],
    port: 7000
  });
});

// Default task
gulp.task('default', function () {
  gulp.start('styles', 'scripts');
});

// Watch
gulp.task('watch', function () {
  browserSync.init({
    port: 8000,
    server: {
      baseDir: './'
    }
  });

  gulp.watch('./public/src/style/*.scss', ['styles']);
  // Watch .js files
  gulp.watch('./public/src/js/*.js', ['scripts']);
  // Create LiveReload server
  gulp.watch('./public/src/**', [browserSync.reload]);
});
