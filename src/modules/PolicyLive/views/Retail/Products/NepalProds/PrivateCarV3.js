function NepalPrivateCarFunctions() {
  const onSearchMake = ({ dto }) => {
    console.log(dto, "onSearchMake");
  };
  const onSearchModel = () => {};

  return { onSearchMake, onSearchModel };
}

export default NepalPrivateCarFunctions;
