const fs = require("fs");
const path = require("path");

const rootPath = require("../utils/path");
const pathToCartFile = path.join(rootPath, "data", "cart.json");

module.exports = class Cart {
	static addProduct(id, productPrice) {
		fs.readFile(pathToCartFile, (err, fileContent) => {
			let cart = { products: [], totalPrice: 0 };
			if (!err) {
				cart = JSON.parse(fileContent);
			}

			const existingProductIndex = cart.products.findIndex((prod) => prod.id === id);
			const existingProduct = cart.products[existingProductIndex];
			let updatedProduct;
			if (existingProduct) {
				updatedProduct = { ...existingProduct };
				updatedProduct.qty = updatedProduct.qty + 1;
				cart.products = [...cart.products];
				cart.products[existingProductIndex] = updatedProduct;
			} else {
				updatedProduct = { id, qty: 1 };
				cart.products = [...cart.products, updatedProduct];
			}
			cart.totalPrice = cart.totalPrice + +productPrice;
			fs.writeFile(pathToCartFile, JSON.stringify(cart), (err) => {
				console.log(err);
			});
		});
	}

	static deleteProduct(id, productPrice) {
		fs.readFile(pathToCartFile, (err, fileContent) => {
			if (err) {
				return;
			}
			const updatedCart = { ...JSON.parse(fileContent) };
			const product = updatedCart.products.find((prod) => prod.id === id);
			const productQty = product.qty;
			updatedCart.products = updatedCart.products.filter((prod) => prod.id !== id);
			updatedCart.totalPrice -= productPrice * productQty;
			fs.writeFile(pathToCartFile, JSON.stringify(updatedCart), (err) => {
				console.log(err);
			});
		});
	}

	static getCart(cb) {
		fs.readFile(pathToCartFile, (err, fileContent) => {
			const cart = JSON.parse(fileContent);
			console.log({ cart });
			if (err) {
				cb(null);
			} else {
				cb(cart);
			}
		});
	}
};
