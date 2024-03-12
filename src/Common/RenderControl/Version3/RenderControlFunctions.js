// import objectPath from "object-path";
import { get } from "../objectPath";

const CompareValuesByLogicalOperators = (value1, value2, operator) => {
  switch (operator) {
    case "&&":
      return value1 && value2;
    case "||":
      return value1 || value2;

    default:
      return false;
  }
};

const CheckValueInsidePath = (dto, details) => {
  const getValueType = {
    undefined,
    null: null,
  };

  if (get(dto, details.path) === undefined) return false;
  if (details.operator)
    switch (details.operator) {
      case "<":
        return get(dto, details.path) < details.value;
      case ">":
        return get(dto, details.path) > details.value;
      case "<=":
        return get(dto, details.path) <= details.value;
      case ">=":
        return get(dto, details.path) >= details.value;
      case "!==":
        return (
          get(dto, details.path) !==
          (details.value === "undefined" || details.value === "null"
            ? getValueType[details.value]
            : details.value)
        );
      default:
        return (
          get(dto, details.path) ===
          (details.value === "undefined" || details.value === "null"
            ? getValueType[details.value]
            : details.value)
        );
    }
  else
    return (
      get(dto, details.path) ===
      (details.value === "undefined" || details.value === "null"
        ? getValueType[details.value]
        : details.value)
    );
};

const ConditionLogicalValidation = ({ dto, details }) => {
  let conditionsResult = []; // A1
  let lLogics = details?.logics ? [...details.logics] : []; // A2
  const lLogicsPrecedence = details?.logicsPrecedence ? [...details.logicsPrecedence] : []; // A3

  if (Array.isArray(details?.conditions)) {
    details.conditions.forEach((x1) => {
      conditionsResult.push(CheckValueInsidePath(dto, x1));
    });
  }
  if (Array.isArray(lLogicsPrecedence) && lLogicsPrecedence.length > 0) {
    lLogicsPrecedence.forEach((x1, i1) => {
      console.log("nnn Iteration ", i1);
      console.log("nnn logic order ", x1);
      console.log("nnn A1 ", conditionsResult);
      console.log("nnn A2 ", lLogics);
      console.log("nnn A3 ", lLogicsPrecedence);

      const op = lLogics[x1];
      const c1 = conditionsResult[x1];
      const c2 = conditionsResult[x1 + 1];
      const result = CompareValuesByLogicalOperators(c1, c2, op);
      conditionsResult[x1] = result;
      conditionsResult = conditionsResult.filter((x2, i2) => i2 !== x1 + 1);
      lLogics = lLogics.filter((x2, i2) => i2 !== x1);

      lLogicsPrecedence.forEach((x2, i2) => {
        if (x2 > x1) lLogicsPrecedence[i2] = x2 - 1;
        else lLogicsPrecedence[i2] = x2;
      });
    });
  }
  return conditionsResult?.[0];
};

const generateFile = ({ content, fileName }) => {
  console.log("content", content);
  const src = `data:application/pdf;base64,${content}`;
  const link = document.createElement("a");
  link.href = src;
  link.download = fileName;
  console.log("FilenameQuote", link.download);
  link.click();
};

// const objToPaths = (obj, root) => {
//   let arr = [];
//   Object.keys(obj).forEach((x1) => {
//     if (typeof obj[x1] !== "object") {
//       if (root) arr.push(`${root}.${x1}`);
//       else arr.push(x1);
//     } else if (Array.isArray(obj[x1])) {
//       //
//     } else {
//       arr = [...objToPaths(obj[x1], x1)];
//     }
//   });
//   return arr;
// };

function jsonToPaths(obj, parentKey = "") {
  const paths = [];
  if (obj !== undefined && obj !== null)
    Object.keys(obj).forEach((key) => {
      // if (obj.hasOwnProperty(key)) {
      const currentPath = parentKey ? `${parentKey}.${key}` : key;
      if (typeof obj[key] === "object") {
        paths.push(...jsonToPaths(obj[key], currentPath));
      } else {
        paths.push({ path: currentPath, parameter: key });
      }
      // }
    });

  return paths;
}

function getChildren(parentId, idToObject) {
  const children = [];
  Object.keys(idToObject).forEach((key) => {
    if (idToObject[key].QParentId === parentId) {
      children.push({
        ...idToObject[key],
        children: getChildren(idToObject[key].QId, idToObject),
      });
    }
  });
  return children.length ? children : null;
}

function ParentChildNodeOrder(data) {
  const arr = [];
  const parentChildren = {};
  const idToObject = {};
  data.forEach((obj, i) => {
    idToObject[i] = obj;
  });

  data.forEach((obj) => {
    if (!obj.QParentId) {
      if (!parentChildren[obj.QId]) {
        parentChildren[obj.QId] = {};
      }
      parentChildren[obj.QId] = { ...obj, children: [...getChildren(obj.QId, idToObject)] };
      arr.push(parentChildren[obj.QId]);
    }
  });

  return arr;
}

function getChildrenNode(parentId, idToObject) {
  let children = [];
  try {
    Object.keys(idToObject).forEach((key) => {
      if (idToObject[key].QParentId === parentId) {
        children.push(idToObject[key]);
        children.push(...getChildrenNode(idToObject[key].QId, idToObject));
      }
    });
  } catch {
    children = [];
  }
  return children;
}

function OrderingArrayElementsByIds(data) {
  const idToObject = {};
  const questionnaire = [];

  if (Array.isArray(data) && data.length > 0) {
    data.forEach((obj, i) => {
      idToObject[i] = obj;
    });

    data.forEach((obj) => {
      if (!obj.QParentId) {
        questionnaire.push(obj);
        questionnaire.push(...getChildrenNode(obj.QId, idToObject));
      }
    });
  }

  return questionnaire;
}

export {
  CheckValueInsidePath,
  ConditionLogicalValidation,
  generateFile,
  jsonToPaths,
  ParentChildNodeOrder,
  OrderingArrayElementsByIds,
};
