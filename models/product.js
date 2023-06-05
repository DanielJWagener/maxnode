const fs = require("fs");
const path = require("path");

const rootPath = require("../utils/path");
const pathToProductsFile = path.join(rootPath, "data", "products.json");

const getProductsFromFile = (callback) => {
	fs.readFile(pathToProductsFile, (err, fileContent) => {
		if (err) {
			return callback([]);
		}
		callback(JSON.parse(fileContent));
	});
};

module.exports = class Product {
	constructor(title, imageUrl, description, price) {
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}

	save() {
		this.id = Math.random().toString();
		getProductsFromFile((products) => {
			products.push(this);
			fs.writeFile(pathToProductsFile, JSON.stringify(products), (err) => {
				console.log(err);
			});
		});
	}

	static fetchAll(callback) {
		getProductsFromFile(callback);
	}

	static findById(id, callback) {
		getProductsFromFile((products) => {
			const product = products.find((x) => x.id === id);
			callback(product);
		});
	}
};
