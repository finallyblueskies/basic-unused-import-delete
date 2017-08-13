# basic-unused-import-delete
Very basic script that evaluates a JSON ESLint report, generated like so:

```
eslint temp/js -o temp/eslint-report.json -f json
```
and deletes all of the lines that report a `no-unused-vars` violation and that match the /import\s/ pattern. Called like so:

```
node temp/delete-unused-vars.js temp/eslint-report.json
```

Dangerous - can delete complex import statements that import used variables. 
