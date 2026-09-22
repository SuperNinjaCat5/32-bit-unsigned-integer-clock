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

	function updateClock() {
		let clock_num: number;

		if (is_stopWatch) {
			const now = Math.floor(Date.now() / 1000);
			const before = Math.floor(stopWatch_startDate.getTime() / 1000);
			clock_num = now - before;
		} else {
			clock_num = Math.floor(Date.now() / 1000);
		}

		binary = (clock_num >>> 0).toString(2).padStart(32, '0');
		statusBarItem.text = `$(watch) ${binary}`;
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