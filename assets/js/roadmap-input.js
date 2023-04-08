// const apiKey = "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";
const apiKey = "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";
const model = "text-davinci-003";
const temperature = 0;
const maxTokens = 4060;

function getResponse() {
	var input = "Create a career path planand mention how to start, time to reach the goal, books, certificates & courses that can help for" + document.getElementById("input").value;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "https://api.openai.com/v1/completions");

	// Show the loading message
	document.getElementById("response").innerHTML = "Browse the website, as this may take up to 30 seconds loading...";
	document.getElementById("response").style.color = "#ffffffc2";

	// Set up the request body with the given parameters
	var requestBody = {
		"model": model,
		"prompt": input,
		"temperature": temperature,
		"max_tokens": maxTokens,
	};

	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("Authorization", "Bearer " + apiKey);
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			var intro = "Assalamu Alaikum, Hope you have a wonderful day. \n \n Thanks for trusting our services, and we hope to help to reach your goals.\n \n AI engine answer based on your data: ";
			var ending = "For detailed career path plan from an expert or senior in your field or meeting a coach just SUBSCRIBE her https://icancoachyou.online/#pricing. ";
			var response = JSON.parse(xhr.responseText);
			var formattedText = intro;
			var lines = response.choices[0].text.split("\n");
			for (var i = 0; i < lines.length; i++) {
				var line = lines[i];
				if (line.startsWith("# ")) {
					// This line is a heading, bold it
					line = "<strong>" + line.substring(2) + "</strong>";
				} else if (line.startsWith("1. ")) {
					// This line is a numbered item, add a bullet point
					line = "• " + line.substring(3);
				}
				formattedText += line + "<br>";
			}
			formattedText += ending;
			document.getElementById("modal-body").innerHTML = formattedText;
			$("#responseModal").modal("show");
		}
	};
	xhr.send(JSON.stringify(requestBody));
}
function copyToClipboard() {
	var copyText = document.getElementById("modal-body");
	navigator.clipboard.writeText(copyText.innerText);
}


document.querySelector('#get-career-path').addEventListener('click', getResponse);