const fs = require("fs");
const path = require("path");

const rootPath = require("../utils/path");

const pathToProductsFile = path.join(rootPath, "data", "products.json");

module.exports = class Product {
	constructor(title) {
		this.title = title;
	}

	save() {
		fs.readFile(pathToProductsFile, (err, fileContent) => {
			let products = [];
			if (!err) {
				products = JSON.parse(fileContent);
			}
			products.push(this);
			fs.writeFile(pathToProductsFile, JSON.stringify(products), (err) => {
				console.log(err);
			});
		});
	}

	static fetchAll(callback) {
		fs.readFile(pathToProductsFile, (err, fileContent) => {
			if (!err) {
				callback([]);
			}
			callback(JSON.parse(fileContent));
		});
	}
};
