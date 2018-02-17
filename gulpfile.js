var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var del = require('del');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var sequence = require('run-sequence');
var tinify = require('gulp-tinify');

var path = {
	build: {
		html: 'build/',
		css: 'build/css/',
		img: 'build/img/',
		fonts: 'build/fonts/'
	},
	src: {
		html: 'src/*.html',
		scss: 'src/sass/style.scss',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	watch: {
		html: 'src/*.html',
		scss: 'src/sass/**/*.*',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	clean: './build',
	outputDir: './build'
};

gulp.task('css:build', function() {
  return gulp.src(path.src.scss)
    .pipe(sass())
    .pipe(autoprefixer({
    	  browsers: ['last 3 version', "ie 10"]
    	}))
    .pipe(csso())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path.build.css))
    .pipe(browserSync.stream());
	});

gulp.task('html:build', function() {
	gulp.src(path.src.html)
	  .pipe(gulp.dest(path.build.html))
	  .pipe(browserSync.stream());
});

gulp.task('images:build', function() {
	gulp.src(path.src.img)
	  .pipe(tinify('vPNr57H_sJJJ6aze14ZkmwB1anppPku7'))
	  .pipe(gulp.dest(path.build.img))
	  .pipe(browserSync.stream());
});

gulp.task('fonts:build', function() {
	gulp.src(path.src.fonts)
	  .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', gulp.parallel('html:build','css:build','images:build','fonts:build'));

gulp.task('clean', function() {
  del(path.clean);
});

gulp.task('server', function() {
	browserSync.init({
		  server: {
		  	baseDir: path.outputDir
		  }
		})
});

gulp.task('watch', function() {
	watch([path.watch.html], gulp.series('html:build'));

	watch([path.watch.scss], gulp.series('css:build'));

	watch([path.watch.img], gulp.series('images:build'));

	watch([path.watch.fonts], gulp.series('fonts:build'))
});



gulp.task('default', gulp.parallel('build','watch','server'));

function defaultTask(done) {
  // place code for your default task here
  done();
}