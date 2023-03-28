/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/roadmap-input.js":
/*!************************************!*\
  !*** ./assets/js/roadmap-input.js ***!
  \************************************/
/***/ (() => {

eval("const apiKey = \"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\";\r\nconst model = \"text-davinci-003\";\r\nconst temperature = 0;\r\nconst maxTokens = 4060;\r\n\r\nfunction getResponse() {\r\n\tvar input = \"Create a career path planand mention how to start, time to reach the goal, books, certificates & courses that can help for\" + document.getElementById(\"input\").value;\r\n\tvar xhr = new XMLHttpRequest();\r\n\txhr.open(\"POST\", \"https://api.openai.com/v1/completions\");\r\n\r\n\t// Show the loading message\r\n\tdocument.getElementById(\"response\").innerHTML = \"Browse the website, as this may take up to 30 seconds loading...\";\r\n\tdocument.getElementById(\"response\").style.color = \"#ffffffc2\";\r\n\r\n\t// Set up the request body with the given parameters\r\n\tvar requestBody = {\r\n\t\t\"model\": model,\r\n\t\t\"prompt\": input,\r\n\t\t\"temperature\": temperature,\r\n\t\t\"max_tokens\": maxTokens,\r\n\t};\r\n\r\n\txhr.setRequestHeader(\"Content-Type\", \"application/json\");\r\n\txhr.setRequestHeader(\"Authorization\", \"Bearer \" + apiKey);\r\n\txhr.onreadystatechange = function () {\r\n\t\tif (xhr.readyState === 4 && xhr.status === 200) {\r\n\t\t\tvar intro = \"Assalamu Alaikum, Hope you have a wonderful day. \\n \\n Thanks for trusting our services, and we hope to help to reach your goals.\\n \\n AI engine answer based on your data: \";\r\n\t\t\tvar ending = \"For detailed career path plan from an expert or senior in your field or meeting a coach just SUBSCRIBE her https://icancoachyou.online/#pricing. \";\r\n\t\t\tvar response = JSON.parse(xhr.responseText);\r\n\t\t\tvar formattedText = intro;\r\n\t\t\tvar lines = response.choices[0].text.split(\"\\n\");\r\n\t\t\tfor (var i = 0; i < lines.length; i++) {\r\n\t\t\t\tvar line = lines[i];\r\n\t\t\t\tif (line.startsWith(\"# \")) {\r\n\t\t\t\t\t// This line is a heading, bold it\r\n\t\t\t\t\tline = \"<strong>\" + line.substring(2) + \"</strong>\";\r\n\t\t\t\t} else if (line.startsWith(\"1. \")) {\r\n\t\t\t\t\t// This line is a numbered item, add a bullet point\r\n\t\t\t\t\tline = \"• \" + line.substring(3);\r\n\t\t\t\t}\r\n\t\t\t\tformattedText += line + \"<br>\";\r\n\t\t\t}\r\n\t\t\tformattedText += ending;\r\n\t\t\tdocument.getElementById(\"modal-body\").innerHTML = formattedText;\r\n\t\t\t$(\"#responseModal\").modal(\"show\");\r\n\t\t}\r\n\t};\r\n\txhr.send(JSON.stringify(requestBody));\r\n}\r\nfunction copyToClipboard() {\r\n\tvar copyText = document.getElementById(\"modal-body\");\r\n\tnavigator.clipboard.writeText(copyText.innerText);\r\n}\r\n\r\n\r\ndocument.querySelector('#get-career-path').addEventListener('click', getResponse);\n\n//# sourceURL=webpack://i-can-coach-you/./assets/js/roadmap-input.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./assets/js/roadmap-input.js"]();
/******/ 	
/******/ })()
;