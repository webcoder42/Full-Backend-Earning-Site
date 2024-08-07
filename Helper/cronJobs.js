import PackagePurchaseModel from "../models/PackagePurchaseModel.js";

export const checkAndExpirePackages = async (userId) => {
  const currentDate = new Date();

  const packages = await PackagePurchaseModel.find({
    userId,
    packageStatus: { $in: ["Active", "pending", "Completed"] },
  });

  let expiredPackage = null;

  for (const pkg of packages) {
    if (pkg.expiryDate <= currentDate) {
      pkg.packageStatus = "Expired";
      await pkg.save();
      expiredPackage = pkg;
    }
  }

  return expiredPackage;
};
