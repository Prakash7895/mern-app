import ProductStat from '../models/ProductStat.js';
import Product from '../models/Products.js';
import Transaction from '../models/Transaction.js';
import User from '../models/User.js';
import getCountryIso3 from 'country-iso-2-to-3';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const productsWithStat = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id,
        });
        return {
          ...product._doc,
          stat,
        };
      })
    );

    res.status(200).json(productsWithStat);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({
      role: 'user',
    }).select('-password');

    res.status(200).json(customers);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, sort = null, search = '' } = req.query;

    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: sortParsed.sort === 'asc' ? 1 : -1,
      };

      return sortFormatted;
    };

    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, 'i') } },
        { userId: { $regex: new RegExp(search, 'i') } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      $or: [
        { cost: { $regex: new RegExp(search, 'i') } },
        { userId: { $regex: new RegExp(search, 'i') } },
      ],
    });

    res.status(200).json({
      transactions: transactions,
      total: total,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getGeography = async (req, res) => {
  try {
    const users = await User.find();

    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});

    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => ({ id: country, value: count })
    );

    res.status(200).json(formattedLocations);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
