var fs = require('fs');
var gulp = require('gulp');
var gulpIf = require('gulp-if');
var md5File = require('md5-file');
var replace = require('gulp-replace');
var del = require('del');


var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');
var spritesmith = require('gulp.spritesmith');
var autoprefixer = require('gulp-autoprefixer');
var cssImageDimensions = require("gulp-css-image-dimensions");


var server = require('gulp-server-livereload');
var watch = require('gulp-watch');

var fileinclude = require('gulp-file-include');
var htmlmin = require('gulp-htmlmin');

var gutil = require("gulp-util");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");


const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';


gulp.task('clean', function() {
	return del('public');
});


// SASS
gulp.task('sass', function () {

	var cssVer = new Date().getTime();

	return gulp.src('src/sass/style.scss')
		.pipe(gulpIf(isDevelopment, sourcemaps.init())) 
		.pipe(sass({outputStyle: 'expanded'})) 
		.on('error', console.log)
		.pipe(autoprefixer({
			browsers: ['> 1%'],
			cascade: false
		}))
		.pipe(cssImageDimensions())
		.pipe(replace('.png', '.png?_v=' + cssVer ))
		.pipe(replace('.jpg', '.jpg?_v=' + cssVer ))
		.pipe(replace('.gif', '.gif?_v=' + cssVer ))
		.pipe(gulpIf(!isDevelopment, minifyCss({compatibility: 'ie8'})))
		.pipe(gulpIf(isDevelopment, sourcemaps.write())) 
		.pipe(gulp.dest('public/assets/css'));  
});



// SPRITES
gulp.task('sprite', function(callback) {
	var spriteData = 
		gulp.src('src/assets/sprite/*.png') // путь, откуда берем картинки для спрайта
		.pipe(spritesmith({
			imgName: 'sprite.png',
			cssName: '_sprites.scss',
			imgPath: '../images/sprite.png' 
		}));

	spriteData.img.pipe(gulp.dest('public/assets/images/')); // путь, куда сохраняем картинку
	spriteData.css.pipe(gulp.dest('src/sass/'));

	callback();
});

// ASSETS
gulp.task('assets-images', function(){
	return gulp.src('src/assets/images', {since: gulp.lastRun('assets-images')})
		.pipe(gulp.dest('public/assets'))
});

gulp.task('assets-fonts', function(){
	return gulp.src('src/assets/fonts', {since: gulp.lastRun('assets-fonts')})
		.pipe(gulp.dest('public/assets'))
});

gulp.task('assets-favicon', function(){
	return gulp.src('src/assets/favicon.ico', {since: gulp.lastRun('assets-favicon')})
		.pipe(gulp.dest('public/local'))
});



gulp.task('assets', gulp.parallel('assets-images', 'assets-fonts', 'assets-favicon'));



// HTML
gulp.task('html', function() {

	return gulp.src(['src/html/{local,dnevnik,mosreg}/*.html'])
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file',
			indent: true
		}))
		.on('error', console.log) 
		.pipe(gulpIf(function(file){ //if not local - htmlmin it
			return file.path.indexOf('/local/') === -1;
		}, htmlmin({collapseWhitespace: true})))
		.pipe(gulp.dest('public'));
});


// BUILD
gulp.task('build', 
	gulp.series(
		'clean', 
		gulp.parallel('sass', 'assets', 'html')
	)
);

gulp.task('server', function () {
	gulp.src('public/local')
	.pipe(server({
		livereload: true,
		directoryListing: false,
		open: false,
		port: 9000
	}));
})

gulp.task('watch', function(){
	gulp.watch('src/sass/**/*.scss', gulp.series('sass'));
	gulp.watch('src/assets/sprite/*.png', gulp.series('sprite'));
	//gulp.watch(['src/js/**/*.js', './my_modules/**/*.js', './js/**/*.hbs'], gulp.series('buildJs'));
	gulp.watch('src/html/**/*.html', gulp.series('html'));
});


gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'server')));





//set new css and js versions
gulp.task('vers', function(){

	var cssVer =  fs.existsSync('public/assets/css/style.css') && md5File('public/assets/css/style.css');
	var dnevnikVer =  fs.existsSync('public/assets/js/dnevnik.js') && md5File('public/assets/js/dnevnik.js');
	var mosregVer =  fs.existsSync('public/assets/js/mosreg.js') && md5File('public/assets/js/mosreg.js');

	return gulp.src(['public/{dnevnik,mosreg}/*.html'])
		.pipe(gulpIf(!!cssVer, replace( /style\.css(\S*)\"/g, 'style.css?_v=' + cssVer + '"' )))
		.pipe(gulpIf(!!dnevnikVer, replace( /dnevnik\.js(\S*)\"/g, 'dnevnik.js?_v=' + dnevnikVer + '"' )))
		.pipe(gulpIf(!!mosregVer, replace( /mosreg\.js(\S*)\"/g, 'mosreg.js?_v=' + mosregVer + '"' )))
		.pipe(gulpIf(!!cssVer, replace( /\.png(\S*)\"/g, '.png?_v=' + cssVer + '"')))
		.pipe(gulpIf(!!cssVer, replace( /\.jpg(\S*)\"/g, '.jpg?_v=' + cssVer + '"')))
		.pipe(gulpIf(!!cssVer, replace( /\.gif(\S*)\"/g, '.gif?_v=' + cssVer + '"')))
		.on('error', console.log)
		.pipe(gulp.dest('public'));

});


gulp.task("webpack", function(callback) {
	// run webpack
	var myConfig = Object.create(webpackConfig);
	myConfig.devtool = "eval";
	myConfig.debug = true;
	myConfig.devtool = 'source-map';

	webpack(myConfig, 
	function(err, stats) {
		if(err) throw new gutil.PluginError("webpack", err);
		gutil.log("[webpack]", stats.toString({
			// output options
		}));
		callback();
	});
});


