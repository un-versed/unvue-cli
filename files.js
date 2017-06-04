var fs = require('fs');
var path = require('path');

module.exports = {
    getCurrentDirectoryBase: function() {
        return path.basename(process.cwd());
    },

    directoryExists: function(filePath) {
        try {
            return fs.statSync(filePath).isDirectory();
        } catch (err) {
            return false;
        }
    },

    createDirectory: function(dir) {
        fs.mkdirSync(dir);
    },

    createFile: function(dir, filename, data) {
        fs.writeFileSync(dir + '/' + filename, data, function(err) {
            if (err) {
                throw err;
            }
        });
    },

    createVue: function(dir, filename) {
        fs.writeFileSync(dir + '/' + filename + '.vue',
            '<template src="./' + filename + '/' + filename + '.html"></template>\r\n\
            <style src="./' + filename + '/' + filename + '.css"></style>\r\n\
            <script src="./' + filename + '/' + filename + '.js" scoped></script>',
            function(err) {
                if (err) {
                    throw err;
                }
            });
    },

    validateDirectory: function(dir) {
        if (this.directoryExists(dir)) {
            return true;
        } else {
            this.createDirectory(dir);
            return true;
        }
    },

    generateComponent: function(argv) {
        var dir = './components';
        if (this.validateDirectory(dir)) {
            if (!this.directoryExists(dir + '/' + argv.c)) {
                // Create The Component Directory
                this.createDirectory(dir + '/' + argv.c);
                // Create The .vue
                this.createVue(dir, argv.c);
                // Create The .html
                this.createFile(dir + '/' + argv.c, argv.c + '.html', '');
                // Create The .css
                this.createFile(dir + '/' + argv.c, argv.c + '.css', '');
                // Create The .js
                this.createFile(dir + '/' + argv.c, argv.c + '.js', '');
            } else {
                console.error('Directory Already Exists.');
                process.exit(1);
            }
        }
    }


};