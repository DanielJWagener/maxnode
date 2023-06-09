const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
	res.render("admin/edit-product", {
		pageTitle: "Add Product",
		path: "/admin/add-product",
		editing: false,
	});
};

exports.getAdminProducts = (req, res, next) => {
	req.user
		.getProducts()
		.then((products) => {
			res.render("admin/products", {
				prods: products,
				pageTitle: "Admin Products",
				path: "/admin/products",
			});
		})
		.catch((err) => console.error(err));
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit === "true";
	if (!editMode) return res.redirect("/");
	const prodId = req.params.productId;
	req.user
		.getProducts({ where: { id: prodId } })
		.then((products) => {
			const product = products[0];
			if (!product) {
				return res.redirect("/");
			}
			res.render("admin/edit-product", {
				pageTitle: "Edit Product",
				path: "/admin/edit-product",
				editing: editMode,
				product,
			});
		})
		.catch((err) => console.error(err));
};

exports.postEditProduct = (req, res, next) => {
	const prodId = req.body.productId;
	const updatedTitle = req.body.title;
	const updatedPrice = req.body.price;
	const updatedImage = req.body.imageUrl;
	const updatedDescription = req.body.description;
	Product.findByPk(prodId)
		.then((product) => {
			product.title = updatedTitle;
			product.price = updatedPrice;
			product.imageUrl = updatedImage;
			product.description = updatedDescription;
			return product.save();
		})
		.then((result) => {
			res.redirect("/admin/products");
		})
		.catch((err) => console.error(err));
};

exports.postAddProduct = (req, res, next) => {
	const {
		body: { title, price, imageUrl, description },
		user,
	} = req;
	req.user
		.createProduct({
			title,
			price,
			imageUrl,
			description,
			userId: user.id,
		})
		.then(() => res.redirect("/admin/products"))
		.catch((err) => console.error(err));
};

exports.postDeleteProduct = (req, res, next) => {
	const prodId = req.body.productId;
	Product.findByPk(prodId)
		.then((product) => {
			return product.destroy();
		})
		.then(() => {
			res.redirect("/admin/products");
		})
		.catch((err) => console.error(err));
};
