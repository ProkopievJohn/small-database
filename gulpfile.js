var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	filesJS = [
			'js/find.js',
			'js/findindex.js',
			'js/Test.js',
			'js/Tests.js',
			'js/App.js',
			'js/EventEmitter.js',
			'js/Database.js'
		];

// Javascript
gulp.task('js', function () {
	return gulp.src(filesJS)
		.pipe(concat('script.min.js'))
		// .pipe(uglify())
		.pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
	gulp.watch(filesJS, ['js']);
});

gulp.task('default', ['watch','js']);
