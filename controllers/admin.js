const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
	res.render("admin/edit-product", {
		pageTitle: "Add Product",
		path: "/admin/add-product",
		editing: false,
	});
};

exports.getAdminProducts = (req, res, next) => {
	Product.fetchAll((products) =>
		res.render("admin/products", {
			prods: products,
			pageTitle: "Admin Products",
			path: "/admin/products",
		})
	);
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit === "true";
	if (!editMode) return res.redirect("/");
	const prodId = req.params.productId;
	Product.findById(prodId, (product) => {
		if (!product) {
			return res.redirect("/");
		}
		res.render("admin/edit-product", {
			pageTitle: "Edit Product",
			path: "/admin/edit-product",
			editing: editMode,
			product,
		});
	});
};

exports.postEditProduct = (req, res, next) => {
	const prodId = req.body.productId;
	const updatedTitle = req.body.title;
	const updatedPrice = req.body.price;
	const updatedImage = req.body.imageUrl;
	const updatedDescription = req.body.description;
	const updatedProduct = new Product(prodId, updatedTitle, updatedImage, updatedDescription, updatedPrice);
	updatedProduct.save();
	res.redirect("/admin/products");
};

exports.postAddProduct = (req, res, next) => {
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;
	const product = new Product(null, title, imageUrl, description, price);
	product
		.save()
		.then(() => {
			res.redirect("/");
		})
		.catch((err) => console.error(err));
};

exports.postDeleteProduct = (req, res, next) => {
	const prodId = req.body.productId;
	Product.deleteById(prodId);
	res.redirect("/admin/products");
};
