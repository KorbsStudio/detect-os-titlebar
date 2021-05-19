const remote = require('electron').remote;

const win = remote.getCurrentWindow(); 

document.onreadystatechange = (event) => {
    if (document.readyState == "complete") {
        handleWindowControls();
    }
};

window.onbeforeunload = (event) => {
    win.removeAllListeners();
}

function handleWindowControls() {
    document.getElementById('min-button').addEventListener("click", event => {
        win.minimize();
    });

    document.getElementById('max-button').addEventListener("click", event => {
        win.maximize();
        document.body.classList.add('maximized');
    });

    document.getElementById('restore-button').addEventListener("click", event => {
        win.unmaximize();
        document.body.classList.remove('maximized');
    });

    document.getElementById('close-button').addEventListener("click", event => {
        win.close();
    });
}