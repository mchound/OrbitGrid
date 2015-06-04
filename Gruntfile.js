module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            less: {
                files: 'styles/**/*.less',
                tasks: ['less:dev']
            }
        },

        less: {
            dev: {
                options: {
                    paths: ["styles"],
                    sourceMap: true,
                    sourceMapFilename: "client/build/site.css.map",
                    sourceMapBasepath: "client/build"
                },
                files: {
                    "client/build/site.css": "styles/import.less"
                }
            },
            build: {
                options: {
                    paths: ["styles"],
                    compress: true
                },
                files: {
                    "client/build/site.min.css": "styles/import.less"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('default', ['less:dev']);
    grunt.registerTask('auto', ['less:dev', 'watch']);
    grunt.registerTask('build', ['less:build']);
};