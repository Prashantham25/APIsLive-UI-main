import { useDataController } from "../../modules/BrokerPortal/context";

export default function GetTranslate(children) {
  const [controller1] = useDataController();
  const { langVocab } = controller1;

  let Children = children;
  try {
    let obj = {};
    Object.keys(langVocab).forEach((x) => {
      obj = { ...obj, [x.toLowerCase()]: langVocab[x] };
    });

    if (obj[children]) Children = obj[children];
    else if (obj[children.toLowerCase()]) Children = obj[children.toLowerCase()];
    else if (typeof children === "string") {
      const arr = children.toString().split(" ");
      let lText = "";
      arr.forEach((x) => {
        if (obj[x.toLowerCase()]) {
          lText = `${lText} ${obj[x.toLowerCase()]}`;
        } else lText = `${lText} ${x}`;
      });
      Children = lText;
    }
  } catch {
    Children = children;
  }

  return Children;
}
