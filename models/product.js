const fs = require("fs");
const path = require("path");

const rootPath = require("../utils/path");
const pathToProductsFile = path.join(rootPath, "data", "products.json");

const Cart = require("./cart");

const getProductsFromFile = (callback) => {
	fs.readFile(pathToProductsFile, (err, fileContent) => {
		if (err) {
			return callback([]);
		}
		callback(JSON.parse(fileContent));
	});
};

module.exports = class Product {
	constructor(id, title, imageUrl, description, price) {
		this.id = id;
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}

	save() {
		getProductsFromFile((products) => {
			if (this.id) {
				const existingProductIndex = products.findIndex((x) => x.id === this.id);
				const updatedProducts = [...products];
				updatedProducts[existingProductIndex] = this;
				fs.writeFile(pathToProductsFile, JSON.stringify(updatedProducts), (err) => {
					console.log(err);
				});
			} else {
				this.id = Math.random().toString();
				products.push(this);
				fs.writeFile(pathToProductsFile, JSON.stringify(products), (err) => {
					console.log(err);
				});
			}
		});
	}

	static deleteById(id) {
		getProductsFromFile((products) => {
			const product = products.find((x) => x.id === id);
			const updatedProducts = products.filter((x) => x.id !== id);
			fs.writeFile(pathToProductsFile, JSON.stringify(updatedProducts), (err) => {
				console.log(err);

				if (!err) {
					Cart.deleteProduct(id, product.price);
				}
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
