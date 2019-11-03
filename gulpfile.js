/*
	Основные команды:
		gulp - делает сборку проекта, запускает веб-сервер и watch
		gulp prod - очищает папку build и делает сборку проекта
*/

const gulp = require("gulp");
const sass = require("gulp-sass");
const del = require("del");
const rigger = require("gulp-rigger");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync");
const uglify = require("gulp-uglify");
const watch = require("gulp-watch");
const prefixer = require("gulp-autoprefixer");
const cssmin = require("gulp-minify-css");
const imagemin = require("gulp-imagemin");
const pngquant = require("imagemin-pngquant");
const rimraf = require("rimraf");
const reload = browserSync.reload;

var path = {
  build: {
    //Тут мы укажем куда складывать готовые после сборки файлы
    html: "build/",
    js: "build/js/",
    css: "build/css/",
    img: "build/img/",
    fonts: "build/fonts/"
  },
  src: {
    //Пути откуда брать исходники
    html: "src/*.html", //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
    js: "src/js/main.js", //В стилях и скриптах нам понадобятся только main файлы
    style: "src/style/main.*",
    img: "src/img/**/*.*", //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
    fonts: "src/fonts/**/*.*",
    template: "src/template/**/*.html"
  },
  watch: {
    //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
    html: "src/**/*.html",
    js: "src/js/**/*.js",
    style: "src/style/**/*.sass",
    img: "src/img/**/*.*",
    fonts: "src/fonts/**/*.*"
  },
  clean: "./build"
};

// таск для сборки html
gulp.task("html:build", function() {
  return gulp
    .src(path.src.html) //Выберем файлы по нужному пути
    .pipe(rigger()) //Прогоним через rigger
    .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
    .pipe(reload({ stream: true })); //И перезагрузим наш сервер для обновлений
});

//Таск по сборке скриптов
gulp.task("js:build", function() {
  return gulp
    .src(path.src.js) //Найдем наш main файл
    .pipe(rigger()) //Прогоним через rigger
    .pipe(sourcemaps.init()) //Инициализируем sourcemap
    .pipe(uglify()) //Сожмем наш js
    .pipe(sourcemaps.write()) //Пропишем карты
    .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
    .pipe(reload({ stream: true })); //И перезагрузим наш сервер для обновлений
});

// таск для преобразования sass -> css
gulp.task("style:build", function() {
  return gulp
    .src(path.src.style) //Выберем наш main.sass
    .pipe(sourcemaps.init()) //Инициализируем sourcemap
    .pipe(sass()) //Скомпилируем
    .pipe(prefixer()) //Добавим вендорные префиксы
    .pipe(cssmin()) //Сожмем
    .pipe(sourcemaps.write()) //Пропишем карты
    .pipe(gulp.dest(path.build.css)) //Сохраним в build
    .pipe(reload({ stream: true })); //И перезагрузим наш сервер для обновлений
});

// таск по сборке картинок
gulp.task("image:build", function() {
  return gulp
    .src(path.src.img) //Выберем наши картинки
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        use: [pngquant()],
        interlaced: true
      })
    )
    .pipe(gulp.dest(path.build.img)) //Сохраняем в build
    .pipe(reload({ stream: true })); //И перезагрузим сервер
});

// таск по сборке шрифтов
gulp.task("fonts:build", function() {
  return gulp
    .src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
    .pipe(reload({ stream: true })); //И перезагрузим сервер
});

// таск по очистки папки build
gulp.task("clean", function(cb) {
  rimraf(path.clean, cb);
});

// Web сервер
gulp.task("webserver", function() {
  browserSync(config);
});
// переменная с настройками нашего Web сервера
var config = {
  server: {
    baseDir: "./build"
  },
  tunnel: false,
  host: "localhost",
  port: 8000,
  logPrefix: "Marat"
};

// таск по сборке всего проекта
gulp.task(
  "build",
  gulp.parallel(
    gulp.series(
      "html:build",
      "style:build",
      "js:build",
      "image:build",
      "fonts:build"
    )
  )
);

// таск для слежения изменяющихся файлов
gulp.task("watch", function() {
  gulp.watch(path.watch.html, gulp.series("html:build"));
  gulp.watch(path.watch.style, gulp.series("style:build"));
  gulp.watch(path.watch.js, gulp.series("js:build"));
  gulp.watch(path.watch.img, gulp.series("image:build"));
  gulp.watch(path.watch.fonts, gulp.series("fonts:build"));
});

// Дефолтный таск
gulp.task("default", gulp.series("build", gulp.parallel("watch", "webserver")));

gulp.task("prod", gulp.series("clean", "build"));
