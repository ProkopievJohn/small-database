var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	wiredep = require('wiredep').stream,
	filesJS = [
			'js/insertAdjacentFF.js',
			'js/EventEmitter.js',
			'js/Helper.js',
			'js/App.js',
			'js/Database.js',
			'js/Countries.js',
			'js/Cities.js'
		];

// JavaScript
gulp.task('js', function () {
	return gulp.src(filesJS)
		.pipe(concat('script.min.js'))
		// .pipe(uglify())
		.pipe(gulp.dest('./'));
});

// Bower
gulp.task('bower', function () {
	gulp.src('./index.html')
		.pipe(wiredep({
			directory: "./bower_components",
			overrides: {
				bootstrap: {
					main: [
						"dist/css/bootstrap.min.css",
						"dist/js/bootstrap.min.js"
					]
				}
			}
		}))
		.pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
	gulp.watch(filesJS, ['js']);
	gulp.watch('bower.json', ['bower']);
});

gulp.task('default', ['watch', 'js', 'bower']);
