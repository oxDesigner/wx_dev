const fs = require("fs");

const gulp = require("gulp");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const tap = require("gulp-tap");
const arg = require("minimist")(process.argv.slice(2));

const re = /\/\*no-compile-start\*\/([\D\d]*)\/\*no-compile-end\*\//g;

gulp.task('sass', () => gulp.src(['./src/**/*.scss', '!./src/base/**/*'])
  .pipe(tap(file => {
    let content = file.contents.toString();
    content = content.replace(re, ($0, $1) => {
      $1 = $1.trim();
      return `/*no-compile-start*//*${$1}*//*no-compile-end*/`;
    })
    file.contents = Buffer.from(content, 'utf-8');
  }))
  .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
  .pipe(rename({
    extname: '.wxss'
  }))
  .pipe(tap(file => {
    let content = file.contents.toString();
    content = content.replace(re, ($0, $1) => {
      return $1.replace(/\/\*|\*\//g, '');
    })
    file.contents = Buffer.from(content, 'utf-8');
  }))
  .pipe(gulp.dest('./dist'))
);

gulp.task('copy', () => gulp.src(
  [
    './src/**/*',
    '!./src/**/*.scss',
    '!./src/app.json',
    '!./src/vendor/host.js',
    '!./src/base'
  ]
).pipe(gulp.dest('./dist')));

gulp.task('app.json', () => gulp.src('./src/app.json')
  .pipe(tap(file => {
    const content = JSON.parse(file.contents.toString())
    const ROUTE = eval(fs.readFileSync('./src/vendor/routes.js', 'utf-8'));
    content.pages = Object.values(ROUTE);
    file.contents = Buffer.from(JSON.stringify(content), 'utf-8');
  }))
  .pipe(gulp.dest('./dist'))
)

gulp.task('host', () => gulp.src('./src/vendor/host.js')
  .pipe(tap(file => {
    let host;
    switch (arg.env) {
      case 'dev':
        host = '"https://www.aaa.com"';
        break;
      case 'beta':
        host = '"https://www.bbb.com"';
        break;
      case 'prod':
        host = '"https://www.ccc.com"';
        break;
    }
    file.contents = Buffer.from(`exports.host=${host};`, 'utf-8');
  }))
  .pipe(gulp.dest('./dist/vendor'))
)

gulp.task('watch', () => {
  gulp.watch('./src/**/*', ['copy', 'sass', 'app.json']);
});

gulp.task('default', ['watch', 'host']);

gulp.task('dist', ['copy', 'sass', 'app.json', 'host']);