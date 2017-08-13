/* global process */
const fs = require("fs");
const { exec } = require("child_process");
const target = process.argv[2];
const matchImport = /import\s/;

// Delete line in file command
// sed -i.bak -e '5,10d;12d' file

fs.readFile(target, "utf8", function (err, data) {
	if (err) throw err;
	const entries = JSON.parse(data);
	entries.forEach(entry => {
		let deleteLinesString = "";
		const { filePath, messages } = entry;
		// Cycle through entry's messages
		messages.forEach(message => {
			const { ruleId, source, line } = message;
			// Check if unused variable declaration @ import
			if(ruleId === "no-unused-vars" && source.match(matchImport)){
				// Build `sed` line delete command
				deleteLinesString +=
					`${deleteLinesString.length ? ";" : ""}${line}d`;
			}
		});
		// If there are lines to delete, execute sed command
		if(deleteLinesString){
			exec(`sed -i -e '${deleteLinesString}' ${filePath}`, (err, stdout, stderr) => {
				if (err) {
					// node couldn't execute the command
					console.log(err);
					return;
				}
			});
		}
	});
});
