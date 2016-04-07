module.exports = function(grunt) {
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    outputStyle: "compressed"
                },
                files: {
                    'example/progressbar.min.css': 'src/scss/progressbar.scss'
                }
            }
        },
        uglify: {
            js: {
                files: {
                    'example/progressbar.min.js': 'src/js/**/*.js'
                }
            }
        }
    });

    grunt.registerTask('default', ['sass', 'uglify']);
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
};