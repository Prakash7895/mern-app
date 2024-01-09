import mongoose from 'mongoose';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

export const getAdmins = async (req, res) => {
  try {
    const user = await User.find({ role: 'admin' }).select('-password');
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;

    const userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'affiliatestats',
          localField: '_id',
          foreignField: 'userId',
          as: 'affiliateStats',
        },
      },
      {
        $unwind: '$affiliateStats',
      },
    ]);

    const salesTransactions = await Promise.all(
      userWithStats[0]?.affiliateStats.affiliateSales.map((id) => {
        return Transaction.findById(id);
      })
    );

    const filteredSalesTransactions = salesTransactions?.filter(
      (tr) => tr != null
    );

    res
      .status(200)
      .json({ user: userWithStats, sales: filteredSalesTransactions });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
