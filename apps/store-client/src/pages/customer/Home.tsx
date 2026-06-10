import Loader from "@/components/common/Loader";
import { useCustomerHome } from "@/features/customer/home/api";
import CustomerHomeView from "@/components/customer/Home/CustomerHomeView";

function StoreHome() {
  const { data, isLoading } = useCustomerHome();

  if (isLoading || !data) {
    return <Loader />;
  }

  return <CustomerHomeView data={data} />;
}

export default StoreHome;
