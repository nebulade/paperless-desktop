var cachedRequire;

console.log('Using Electron Shim');

cachedRequire = window.require;

var shim = {
    remote: {
        require: function (module) {
            console.log('shim: remote.require %s', module);

            try {
                return window.require(module);
            } catch (e) {
                console.log('shim: cannot require %s', module);
                return {};
            }
        },
        dialog: {
            showErrorBox: function (title, message) {
                console.log('shim: dialog.showErrorBox', arguments);
                window.alert(title + ' - ' + message);
            }
        }
    },
    ipcRenderer: {
        send: function(type, message) {
            console.log('shim: ipcrenderer send', arguments);

            if (type === 'modal') {
                location.href = '/#' + message.route;
            } else if (type === 'closeModal') {
                history.back();
            } else {
                console.log('shim: ipcrenderer send type %s not supported', type);
            }
        },
        on: function() {
            console.log('shim: ipcrenderer on', arguments);
        }
    }
};

window.require = function () {
    if (arguments[0] === 'electron') return shim;
    return cachedRequire.apply(this, arguments);
}

export default {};
