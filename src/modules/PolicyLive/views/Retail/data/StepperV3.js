import getAmanaTakafulData from "../Products/RND/AmanaTakafulV3/DynamicPage";

const AllMethod = [{ prod: "AmanaTakaful", func: getAmanaTakafulData }];

const getDynamicPage = ({ prod }) => {
  let dynamicContent = { steps: [], accordions: [], components: [], buttonDetails: [] };
  try {
    dynamicContent = AllMethod.filter((x) => x.prod === prod)[0].func[0]();
  } catch (e) {
    dynamicContent = { steps: [], accordions: [], components: [], buttonDetails: [] };
  }
  return dynamicContent;
};

const getDynamicFunctionality = ({ prod }) => {
  let dynamicContent = { steps: [], accordions: [], components: [], buttonDetails: [] };
  try {
    dynamicContent = AllMethod.filter((x) => x.prod === prod)[0].func[1]();
  } catch (e) {
    dynamicContent = { steps: [], accordions: [], components: [], buttonDetails: [] };
  }
  return dynamicContent;
};

const getOnNextClick = ({
  prod,
  activeStep,
  dto,
  setDto,
  setBackDropFlag,
  masters,
  setMasters,
}) => {
  let fun = true;
  try {
    fun = AllMethod.filter((x) => x.prod === prod)[0].func[2]({
      activeStep,
      setBackDropFlag,
      dto,
      setDto,
      masters,
      setMasters,
    });
  } catch (e) {
    fun = true;
  }
  return fun;
};

const getUseEffect = async ({ prod, dto, setDto, masters, setMasters }) => {
  let mst = {};
  try {
    mst = AllMethod.filter((x) => x.prod === prod)[0].func[3]({ dto, setDto, masters, setMasters });
  } catch (e) {
    mst = {};
  }

  return mst;
};

const getEventData = ({ prod, dto, setDto, masters, setMasters }) => {
  let mst = [];
  try {
    mst = AllMethod.filter((x) => x.prod === prod)[0].func[4]({ dto, setDto, masters, setMasters });
  } catch (e) {
    mst = [];
  }
  return mst;
};

export { getDynamicPage, getDynamicFunctionality, getOnNextClick, getUseEffect, getEventData };
