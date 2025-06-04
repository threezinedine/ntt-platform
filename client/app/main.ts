const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
	});

	mainWindow.loadFile(path.join(app.getAppPath(), "public/index.html"));
}

app.whenReady().then(() => {
	createWindow();
});
