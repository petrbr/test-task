var gulp = require('gulp');
var stylus = require('gulp-stylus');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sourcemaps = require('gulp-sourcemaps');
var gulp = require('gulp');
var reactEasy = require('gulp-react-easy');

var paths = {
	reactEntry: ["./app/index.jsx"],
	reactAll: ["./app/*.jsx"],
	stylusEntry: ["./assets/stylus/style.styl"],
	stylusAll: ["./assets/**/*.styl"]
};

gulp.task('react', function() {
	return reactEasy({
		file: paths.reactEntry
	})
	.to('bundle.js')
	.pipe(gulp.dest('.'))
	.pipe(reload({stream:true}));
});

gulp.task("stylus", function() {
	gulp.src(paths.stylusEntry)
		.pipe(sourcemaps.init())
		.pipe(stylus({
			compress: true
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./assets/css'))
		.pipe(reload({stream:true}));
});

gulp.task('watch', function() {
	gulp.watch(paths.stylusAll, ['stylus']);
	gulp.watch(paths.reactAll, ['react']);
});

gulp.task('browser-sync', function() {
	browserSync.init(null, {
		proxy: "tickets.dev"
	});
});


gulp.task("default", ["watch", "browser-sync"]);