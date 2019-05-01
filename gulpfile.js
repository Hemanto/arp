const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const imageminMozjpeg = require('imagemin-mozjpeg');

gulp.task("default", () =>
  gulp
    .src("public/content/**")
    .pipe(imagemin([
        imageminMozjpeg({
            quality: 90
        })
    ]))
    .pipe(gulp.dest("public/content/"))
);
