const fs = require("fs");

let requestHandler = (req, res) => {
	let { url, method } = req || {};

	if (url === "/") {
		res.write("<html>");
		res.write("<head><title>Assignment 1</title></head>");
		res.write(
			'<body><form action="/create-user" method="POST"><input type="text" name="username" lpignore="true"><button type="submit">Send</button></form></body>'
		);
		res.write("</html>");
		return res.end();
	}

	if (url === "/create-user" && method === "POST") {
		const body = [];
		req.on("data", (chunk) => {
			console.log(chunk);
			body.push(chunk);
		});
		return req.on("end", () => {
			const parsedBody = Buffer.concat(body).toString();
			const newUser = parsedBody.split("=")[1];
			if (fs.existsSync("users.txt")) {
				fs.readFile("users.txt", (err, data) => {
					if (err) {
						console.log(err);
					}
					let users = data.toString().split(",");
					users.push(newUser);
					fs.writeFile("users.txt", users.join(","), (err) => {
						res.statusCode = 302;
						res.setHeader("Location", "/users");
						return res.end();
					});
				});
			} else {
				fs.writeFile("users.txt", newUser, (err) => {
					res.statusCode = 302;
					res.setHeader("Location", "/users");
					return res.end();
				});
			}
		});
	}

	if (url === "/users") {
		res.write("<html>");
		res.write("<head><title>Assignment 1</title></head>");
		res.write("<body>");
		fs.readFile("users.txt", (err, data) => {
			if (err) {
				console.log(err);
				return res.end();
			}
			let users = data.toString().split(",");
			users.forEach((user) => {
				res.write(`<p>${user}</p>`);
			});
			res.write("</body>");

			res.write("</html>");
			return res.end();
		});
	}
};

module.exports = requestHandler;
