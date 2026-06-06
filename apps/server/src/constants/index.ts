import { AddressItem } from "../types/Address.types";
import { PromoDbItem } from "../types/Promo.types";

export function mapAddress(item: AddressItem) {
  return {
    _id: String(item._id || ""),
    fullName: item.fullName,
    address: item.address,
    state: item.state,
    postalCode: item.postalCode,
    isDefault: item.isDefault,
  };
}

export function mapPromo(item: PromoDbItem) {
  return {
    _id: String(item._id || ""),
    code: item.code,
    percentage: item.percentage,
    count: item.count,
    minimumOrderValue: item.minimumOrderValue,
    startsAt: item.startsAt,
    endsAt: item.endsAt,
    createdAt: item.createdAt,
  };
}
