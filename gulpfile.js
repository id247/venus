'use strict';

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
var modifyCssUrls = require("gulp-modify-css-urls");

var server = require('gulp-server-livereload');
var watch = require('gulp-watch');

var fileinclude = require('gulp-file-include');
var htmlmin = require('gulp-htmlmin');

var gutil = require("gulp-util");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");


var isDevelopment = process.env.NODE_ENV !== 'production' ? true : false;

gulp.task('clean', function() {
	return del('public');
});


// STYLES
gulp.task('sass', function () {

	const date = new Date().getTime();

	return gulp.src('src/sass/style.scss')
		.pipe(gulpIf(isDevelopment, sourcemaps.init())) 
		.pipe(sass({outputStyle: 'expanded'})) 
		.on('error', console.log)
		.pipe(autoprefixer({
			browsers: ['> 1%'],
			cascade: false
		}))
		.pipe(cssImageDimensions())
		.pipe(gulpIf(isDevelopment, sourcemaps.write())) 
		.pipe(gulp.dest('public/assets/css'));  
});

// image urls
gulp.task('modifyCssUrls', function () {
	const date = Math.round(new Date().getTime()/1000.0);

	return gulp.src('public/assets/css/style.css')
		.pipe(modifyCssUrls({
			append: '?_v=' + date
		}))		
		.pipe(minifyCss({compatibility: 'ie8'}))
    	.pipe(gulp.dest('public/assets/css'));

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

gulp.task('sprite', function(callback) {
	var spriteData = 
		gulp.src('src/assets/sprite/*.png', {since: gulp.lastRun('sprite')}) // путь, откуда берем картинки для спрайта
		.pipe(spritesmith({
			imgName: 'sprite.png',
			cssName: '_sprites.scss',
			imgPath: '../images/sprite.png' 
		}));

	spriteData.img.pipe(gulp.dest('public/assets/images/')); // путь, куда сохраняем картинку
	spriteData.css.pipe(gulp.dest('src/sass/'));

	callback();
});


gulp.task('assets', gulp.parallel('assets-images', 'assets-fonts', 'assets-favicon', 'sprite'));



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
    
    var myConfig = Object.create(webpackConfig);

    if (isDevelopment){

	    myConfig.devtool = 'eval';
	    
	    myConfig.plugins = [      
	        new webpack.DefinePlugin({
	            "process.env": { 
	                NODE_ENV : JSON.stringify("development") 
	            }
	        })
	    ];

    }else{

	    myConfig.plugins = [      
	        new webpack.DefinePlugin({
	            "process.env": { 
	                NODE_ENV : JSON.stringify("production") 
	            }
	        }),
	        new webpack.optimize.UglifyJsPlugin({
	            minimize: true,
	            compress: {
	                warnings: false
	            }
	        })
	    ];

    }

    webpack(myConfig, 
    function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});



// BUILD


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
	gulp.watch('src/assets/**/*.*', gulp.series('assets'));
	//gulp.watch('src/assets/sprite/*.png', gulp.series('sprite'));
	gulp.watch('src/js/**/*.js', gulp.series('webpack'));
	gulp.watch('src/html/**/*.html', gulp.series('html'));
});

gulp.task('build', 
	gulp.series(
		'clean', 
		gulp.parallel('assets', 'sass', 'html', 'webpack')
	)
);

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'server')));


gulp.task('prod',
	gulp.series(
		'build',
		'modifyCssUrls',
		'vers'
	)
);



