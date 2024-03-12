import RayzorPay from "../../data/RayzorPay";
import NepalPrivateCar from "../../Products/NepalProds/PrivateCarV3";

const AddFunctions = ({ productCode, dto, setDto, ...rest }) => {
  const builtInFunctions = { RayzorPay };
  const arr = [
    { productCode: "AmanaTakaful02", functions: NepalPrivateCar({ dto, setDto, ...rest }) },
  ];
  const fun = arr.filter((x) => x.productCode === productCode);
  const fun1 =
    fun.length > 0
      ? { functions: { ...arr[0].functions, ...builtInFunctions } }
      : { functions: { ...builtInFunctions } };
  return fun1.functions;
};

export default AddFunctions;
