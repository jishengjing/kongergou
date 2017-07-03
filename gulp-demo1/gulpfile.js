'use strict';
var gulp=require('gulp');
var $=require('gulp-load-plugins')();
var browserSync=require('browser-sync').create();


var app={
	 srcPath:'src/',
	 devPath:"build/",
	 prdPath:'dist/'
}


gulp.task('html',function(){
	 gulp.src(app.srcPath+'**/*.html')
	.pipe(gulp.dest(app.devPath))
	.pipe($.htmlmin({
		collapseWhitespace:true,
		removeComments:true,
		removeEmptyAttributes:true
	}))
	.pipe(gulp.dest(app.prdPath))
});

gulp.task('less',function(){
	  gulp.src(app.srcPath+'style/demo1.less')
	  .pipe($.less())
	.pipe($.autoprefixer({
		  browsers: ['last 20 versions'],
          cascade: false
	}))
	.pipe(gulp.dest(app.devPath+'css'))
	.pipe($.cssmin())
	.pipe(gulp.dest(app.prdPath+'css'))
});


gulp.task('js',function(){
	gulp.src(app.srcPath+'script/*.js')
	.pipe($.concat('all.js'))
	.pipe(gulp.dest(app.devPath+'js'))
	.pipe($.uglify())
	.pipe(gulp.dest(app.prdPath+'js'))
	.pipe(browserSync.stream());
});

gulp.task('image',function(){
	gulp.src(app.srcPath+'images/*')
	.pipe($.imagemin())
	.pipe(gulp.dest(app.devPath+'images/'))
	.pipe(gulp.dest(app.prdPath+'images/'))
	.pipe(browserSync.stream());

});


gulp.task('clean',function(){
	gulp.src([app.devPath,app.prdPath])
	.pipe($.clean())
	.pipe(browserSync.stream());
});





gulp.task('watch',['html','less','js','image'],function(){
	gulp.watch(app.srcPath+'**/*.html',['html']);
	gulp.watch(app.srcPath+'style/*.less',['less']);
	gulp.watch(app.srcPath+'script/*.js',['js']);
	gulp.watch(app.srcPath+'images/*',['image']);
});



gulp.task('default',['watch'],function(){
	browserSync.init({
		server:{
			baseDir:app.devPath
		},
	});
});



