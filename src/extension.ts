// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

let statusBarItem: vscode.StatusBarItem;
let interval: NodeJS.Timeout;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, 32-bit-unsigned-integer-clock is now active!');

	// Set up the status bar clock immediately on activation
	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	let binary: string;

	function delay(ms: number): Promise<void> {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	const rainbowColors: string[] = [
		"#ff0d0d", "#ff2b0d", "#ff480d", "#ff660d", "#ff830d",
		"#ffa10d", "#ffbe0d", "#ffdc0d", "#fff90d", "#e3ff0d",
		"#c6ff0d", "#a8ff0d", "#8bff0d", "#6dff0d", "#50ff0d",
		"#32ff0d", "#15ff0d", "#0dff28", "#0dff45", "#0dff63",
		"#0dff80", "#0dff9e", "#0dffbb", "#0dffd9", "#0dfff6",
		"#0de3ff", "#0dc6ff", "#0da8ff", "#0d8bff", "#0d6dff",

		"#8e0dffff",

		"#0d6dff",
		"#0d8bff", "#0da8ff", "#0dc6ff", "#0de3ff",
		"#0dfff6", "#0dffd9", "#0dffbb", "#0dff9e", "#0dff80",
		"#0dff63", "#0dff45", "#0dff28", "#15ff0d", "#32ff0d",
		"#50ff0d", "#6dff0d", "#8bff0d", "#a8ff0d", "#c6ff0d",
		"#e3ff0d", "#fff90d", "#ffdc0d", "#ffbe0d", "#ffa10d",
		"#ff830d", "#ff660d", "#ff480d", "#ff2b0d"
	];

	
	let i: number = 0;

	function updateClock() {
		let clock_num: number;

		if (is_stopWatch) {
			const now = Math.floor(Date.now() / 1000);
			const before = Math.floor(stopWatch_startDate.getTime() / 1000);
			clock_num = now - before;
			
			statusBarItem.color = rainbowColors[i % rainbowColors.length]
		} else {
			clock_num = Math.floor(Date.now() / 1000);
			statusBarItem.color = '#ffffff'
		}

		binary = (clock_num >>> 0).toString(2).padStart(32, '0');
		statusBarItem.text = `$(watch) ${binary}`;

		i++;
	}

	updateClock();
	statusBarItem.show();

	interval = setInterval(updateClock, 1000);

	context.subscriptions.push(statusBarItem);
	context.subscriptions.push({ dispose: () => clearInterval(interval) });

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const helloCommand = vscode.commands.registerCommand('32-bit-unsigned-integer-clock.hello', () => {
		// The code you place here will be executed every time your command is executed
		vscode.window.showInformationMessage('Hello World from 32 Bit Unsigned Integer Clock!');
	});

	var stopWatch_startDate: Date = new Date();
	var is_stopWatch: boolean = false;

	const startStopwatch = vscode.commands.registerCommand('32-bit-unsigned-integer-clock.start-stopwatch', () => {
		stopWatch_startDate.setTime(Date.now());
		is_stopWatch = true;
	});

	const endStopwatch = vscode.commands.registerCommand('32-bit-unsigned-integer-clock.stop-stopwatch', () => {
		is_stopWatch = false;
		vscode.window.showInformationMessage(`Stoped at: ${binary}`)
	});

	context.subscriptions.push(helloCommand, startStopwatch, endStopwatch);
}

// This method is called when your extension is deactivated
export function deactivate() {
	if (interval) {
		clearInterval(interval);
	}
}