import errorCode from "../lib/ErrorCodes.js";
import ProductModel from "../Models/Product.js";
import { v4 as uuidv4 } from "uuid";

const handleGetAllProducts = async (req, res) => {
  let { page, limit, vendorName, productName, productType } = req.query;

  page = page ? parseInt(page) : 1;
  limit = limit ? parseInt(limit) : 10;
  const skip = Math.max((page - 1) * limit, 0);

  try {
    const query = {};
    if (vendorName) query["productVendor.vendorName"] = vendorName;
    if (productName) query.productName = { $regex: productName, $options: "i" };
    if (productType&&productType!='general') query.productType = productType;

    const productList = await ProductModel.find(query, { __v: 0 })
      .skip(skip)
      .limit(limit)
      .exec();

    const totalDocCount = await ProductModel.countDocuments(query);

    return res.status(errorCode.OK).json({
      page,
      limit,
      totalPages: Math.ceil(totalDocCount / limit),
      totalProducts: totalDocCount,
      data: productList,
    });
  } catch (error) {
    console.error(`Error while fetching products \n${error}`);
    return res.status(errorCode.InternalServerError).json({
      message: "Internal Server Error",
    });
  }
};

const handleAddNewProduct = async (req, res) => {
  let {
    productName,
    productPrice,
    productQuantity,
    productVendorName,
    productVendorEmail,
    productImage,
    productType,
    productDescription,
  } = req.body;

  if (
    !productName ||
    !productPrice ||
    !productQuantity ||
    !productVendorName ||
    !productVendorEmail ||
    !productType ||
    !productDescription
  ) {
    return res.status(errorCode.BadRequest).json({
      message: "Bad request body",
    });
  }

  if (
    req.userData.userName !== productVendorName &&
    req.userData.role !== "admin"
  ) {
    return res.status(errorCode.Forbidden).json({
      message: "Cannot add product under other vendor's name",
    });
  }

  try {
    const productID = uuidv4();
    const newProductEntry = new ProductModel({
      productID,
      productName,
      productPrice,
      productQuantity,
      productImage,
      productType,
      productDescription,
      productVendor: {
        vendorName: productVendorName,
        vendorEmail: productVendorEmail,
      },
    });

    await newProductEntry.save();
    return res.status(errorCode.Created).json({
      message: "Product Successfully Added",
    });
  } catch (error) {
    console.error(`Error while adding new product \n${error}`);
    return res.status(errorCode.InternalServerError).json({
      message: "Internal Server Error",
    });
  }
};

const handleBulkAddProducts = async (req, res) => {
  const { products } = req.body;

  if (!products || !Array.isArray(products) || products.length === 0) {
    return res.status(errorCode.BadRequest).json({
      message: "Request body must contain a non-empty 'products' array",
    });
  }

  try {
    for (const product of products) {
      const {
        productName,
        productPrice,
        productQuantity,
        productVendorName,
        productVendorEmail,
        productType,
        productDescription,
      } = product;

      if (
        !productName ||
        !productPrice ||
        !productQuantity ||
        !productVendorName ||
        !productVendorEmail ||
        !productType ||
        !productDescription
      ) {
        return res.status(errorCode.BadRequest).json({
          message: "Each product must have all required fields",
        });
      }

      if (
        req.userData.role !== "admin" &&
        req.userData.userName !== productVendorName
      ) {
        return res.status(errorCode.Forbidden).json({
          message: `Cannot add product under other vendor's name: ${productVendorName}`,
        });
      }
    }

    const productsToInsert = products.map((product) => ({
      productID: uuidv4(),
      productName: product.productName,
      productPrice: product.productPrice,
      productQuantity: product.productQuantity,
      productImage: product.productImage || "",
      productType: product.productType,
      productDescription: product.productDescription,
      productVendor: {
        vendorName: product.productVendorName,
        vendorEmail: product.productVendorEmail,
      },
    }));

    await ProductModel.insertMany(productsToInsert);

    return res.status(errorCode.Created).json({
      message: "Products successfully added",
      count: productsToInsert.length,
    });
  } catch (error) {
    console.error(`Error while bulk adding products \n${error}`);
    return res.status(errorCode.InternalServerError).json({
      message: "Internal Server Error",
    });
  }
};

const handleUpdateExistingProduct = async (req, res) => {
  let {
    productName,
    productPrice,
    productQuantity,
    productImage,
    productType,
    productDescription,
  } = req.body;
  const { productID } = req.params;

  if (!productID) {
    return res.status(errorCode.BadRequest).json({
      message: "Bad request body",
    });
  }

  try {
    const existanceCheck = await ProductModel.findOne({ productID });
    if (!existanceCheck) {
      return res.status(errorCode.NotFound).json({
        message: "Product Does Not Exist",
      });
    }

    if (
      req.userData.role !== "admin" &&
      req.userData.userName !== existanceCheck.productVendor.vendorName
    ) {
      return res.status(errorCode.Forbidden).json({
        message: "Cannot update product under other vendor's name",
      });
    }

    if (productName !== undefined) existanceCheck.productName = productName;
    if (productPrice !== undefined) existanceCheck.productPrice = productPrice;
    if (productQuantity !== undefined)
      existanceCheck.productQuantity = productQuantity;
    if (productImage !== undefined) existanceCheck.productImage = productImage;
    if (productType !== undefined) existanceCheck.productType = productType;
    if (productDescription !== undefined)
      existanceCheck.productDescription = productDescription;

    await existanceCheck.save();

    return res.status(errorCode.OK).json({
      message: "Product Successfully Updated",
    });
  } catch (error) {
    console.error(`Error while updating product \n${error}`);
    return res.status(errorCode.InternalServerError).json({
      message: "Internal Server Error",
    });
  }
};

const handleDeleteProduct = async (req, res) => {
  const { productID } = req.params;
  if (!productID) {
    return res.status(errorCode.BadRequest).json({
      message: "Bad request body",
    });
  }

  try {
    const existanceCheck = await ProductModel.findOne({ productID });
    if (!existanceCheck) {
      return res.status(errorCode.NotFound).json({
        message: "Product Does Not Exist",
      });
    }

    if (
      req.userData.role !== "admin" &&
      req.userData.userName !== existanceCheck.productVendor.vendorName
    ) {
      return res.status(errorCode.Forbidden).json({
        message: "Cannot delete product under other vendor's name",
      });
    }

    await ProductModel.findByIdAndDelete(existanceCheck._id);

    return res.status(errorCode.OK).json({
      message: "Product Successfully Deleted",
    });
  } catch (error) {
    console.error(`Error while deleting product \n${error}`);
    return res.status(errorCode.InternalServerError).json({
      message: "Internal Server Error",
    });
  }
};

export {
  handleGetAllProducts,
  handleAddNewProduct,
  handleUpdateExistingProduct,
  handleDeleteProduct,
  handleBulkAddProducts,
};
