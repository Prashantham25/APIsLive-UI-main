const handleCustomInput = (e, obj, setObj) => {
  const objL = obj;
  objL[e.target.name] = e.target.value;
  setObj((prev) => ({ ...prev, ...objL }));
};
export default handleCustomInput;
