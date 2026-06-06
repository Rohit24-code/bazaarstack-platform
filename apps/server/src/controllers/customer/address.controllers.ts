import { mapAddress } from "../../constants";
import { getDbUserFromReq } from "../../middleware/auth";
import { User } from "../../models/User";
import { AddressItem } from "../../types/Address.types";
import { AppError } from "../../utils/AppError";
import { asyncHandler } from "../../utils/asyncHandler";
import { ok } from "../../utils/envelope";
import { requireFound, requireText } from "../../utils/helpers";

export const getAddressController = asyncHandler(async (req, res, next) => {
  const dbUser = await getDbUserFromReq(req);
  const user = await User.findById(dbUser._id);

  const foundUser = requireFound(user, "User not found");

  const addresses = (foundUser.addresses || []) as AddressItem[];

  const items = addresses
    ?.sort((a, b) => Number(b.isDefault) - Number(a.isDefault))
    .map(mapAddress);

  res.status(200).json(ok({ items }));
});

export const postAddressController = asyncHandler(async (req, res, next) => {
  const dbUser = await getDbUserFromReq(req);
  const fullName = String(req.body.fullName || "").trim();
  const state = String(req.body.state || "").trim();
  const postalCode = String(req.body.postalCode || "").trim();
  const address = String(req.body.address || "").trim();

  requireText(fullName, "Full name is required");
  requireText(state, "State is required");
  requireText(postalCode, "Postal code is required");
  requireText(address, "Address is required");

  const user = await User.findById(dbUser._id);

  const foundUser = requireFound(user, "User not found");

  const addresses = (foundUser.addresses || []) as AddressItem[];

  const shouldMarkDefault =
    req.body.isDefault === true || addresses.length === 0;

  if (shouldMarkDefault) {
    addresses.forEach((address) => (address.isDefault = false));
  }

  addresses.push({
    fullName,
    state,
    postalCode,
    address,
    isDefault: shouldMarkDefault,
  });

  foundUser.addresses = addresses;

  await foundUser.save();

  const items = addresses
    ?.sort((a, b) => Number(b.isDefault) - Number(a.isDefault))
    .map(mapAddress);

  res.status(200).json(ok({ items }));
});

export const updateAddressController = asyncHandler(async (req, res, next) => {
  // const address = await
  const dbUser = await getDbUserFromReq(req);
  const addressId = String(req.params.addressId || "").trim();
  const fullName = String(req.body.fullName || "").trim();
  const state = String(req.body.state || "").trim();
  const postalCode = String(req.body.postalCode || "").trim();
  const address = String(req.body.address || "").trim();

  requireText(fullName, "Full name is required");
  requireText(state, "State is required");
  requireText(postalCode, "Postal code is required");
  requireText(address, "Address is required");

  const user = await User.findById(dbUser._id);

  const foundUser = requireFound(user, "User not found");

  const addresses = (foundUser.addresses || []) as AddressItem[];

  const getAddressToEdit = addresses.find(
    (address) => String(address._id) === addressId,
  );

  if (!getAddressToEdit) {
    throw new AppError(404, "Address not found");
  }

  const shouldMarkDefault =
    req.body.isDefault === true || addresses.length === 0;

  if (shouldMarkDefault) {
    addresses.forEach((address) => (address.isDefault = false));
  }

  getAddressToEdit.fullName = fullName;
  getAddressToEdit.state = state;
  getAddressToEdit.postalCode = postalCode;
  getAddressToEdit.address = address;

  if (shouldMarkDefault) {
    getAddressToEdit.isDefault = true;
  }

  await foundUser.save();

  const items = [...(foundUser.addresses as AddressItem[])]
    ?.sort((a, b) => Number(b.isDefault) - Number(a.isDefault))
    .map(mapAddress);

  res.status(200).json(ok({ items }));
});

export const deleteAddressController = asyncHandler(async (req, res, next) => {
  // const address = await
  const dbUser = await getDbUserFromReq(req);
  const addressId = String(req.params.addressId || "").trim();

  const user = await User.findById(dbUser._id);
  const foundUser = requireFound(user, "User not found");

  const addresses = (foundUser.addresses || []) as AddressItem[];

  const addressToBeDeletedIndex = addresses.findIndex(
    (currentAddress) => String(currentAddress._id) === addressId,
  );

  if (addressToBeDeletedIndex < 0) {
    throw new AppError(404, "Address not found");
  }

  const wasDefault = addresses[addressToBeDeletedIndex].isDefault;

  addresses.splice(addressToBeDeletedIndex, 1);

  if (
    wasDefault &&
    addresses.length > 0 &&
    !addresses.some((address) => address.isDefault)
  ) {
    addresses[0].isDefault = true;
  }

  await foundUser.save();

  const items = [...(foundUser.addresses as AddressItem[])]
    .sort((a, b) => Number(b.isDefault) - Number(a.isDefault))
    .map(mapAddress);

  res.json(ok({ items }));
});
