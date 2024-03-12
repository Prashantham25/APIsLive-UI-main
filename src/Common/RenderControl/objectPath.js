const get = (dto, path) => {
  // console.log(path, "path");
  let value = "";
  try {
    const path1 = path !== undefined ? path.replace("[", ".") : "";
    const path2 = path1.replace("].", ".");
    const a = path2.split(".");
    switch (a.length) {
      case 1:
        value = dto[a[0]];
        break;
      case 2:
        value = dto[a[0]][a[1]];
        break;
      case 3:
        value = dto[a[0]][a[1]][a[2]];
        break;
      case 4:
        value = dto[a[0]][a[1]][a[2]][a[3]];
        break;
      case 5:
        value = dto[a[0]][a[1]][a[2]][a[3]][a[4]];
        break;
      case 6:
        value = dto[a[0]][a[1]][a[2]][a[3]][a[4]][a[5]];
        break;
      case 7:
        value = dto[a[0]][a[1]][a[2]][a[3]][a[4]][a[5]][a[6]];
        break;
      case 8:
        value = dto[a[0]][a[1]][a[2]][a[3]][a[4]][a[5]][a[6]][a[7]];
        break;
      case 9:
        value = dto[a[0]][a[1]][a[2]][a[3]][a[4]][a[5]][a[6]][a[7]][a[8]];
        break;
      case 10:
        value = dto[a[0]][a[1]][a[2]][a[3]][a[4]][a[5]][a[6]][a[7]][a[8]][a[9]];
        break;
      case 11:
        value = dto[a[0]][a[1]][a[2]][a[3]][a[4]][a[5]][a[6]][a[7]][a[8]][a[9]][a[10]];
        break;
      case 12:
        value = dto[a[0]][a[1]][a[2]][a[3]][a[4]][a[5]][a[6]][a[7]][a[8]][a[9]][a[10]][a[11]];
        break;
      case 13:
        value =
          dto[a[0]][a[1]][a[2]][a[3]][a[4]][a[5]][a[6]][a[7]][a[8]][a[9]][a[10]][a[11]][a[12]];
        break;
      case 14:
        value =
          dto[a[0]][a[1]][a[2]][a[3]][a[4]][a[5]][a[6]][a[7]][a[8]][a[9]][a[10]][a[11]][a[12]][
            a[13]
          ];
        break;
      default:
        value = undefined;
        break;
    }
  } catch {
    return undefined;
  }
  return value;
};
const set = (dto, path, value, setDto) => {
  let dto1 = { ...dto };
  const path1 = path !== undefined ? path.replace("[", ".") : "";
  const path2 = path1.replace("].", ".");
  const a = path2.split(".");
  switch (a.length) {
    case 1:
      dto1[a[0]] = value;
      break;
    case 2:
      dto1[a[0]][a[1]] = value;
      break;
    case 3:
      dto1[a[0]][a[1]][a[2]] = value;
      break;
    case 4:
      dto1[a[0]][a[1]][a[2]][a[3]] = value;
      break;
    case 5:
      dto1[a[0]][a[1]][a[2]][a[3]][a[4]] = value;
      break;
    case 6:
      dto1[a[0]][a[1]][a[2]][a[3]][a[4]][a[5]] = value;
      break;
    case 7:
      dto1[a[0]][a[1]][a[2]][a[3]][a[4]][a[5]][a[6]] = value;
      break;
    case 8:
      dto1[a[0]][a[1]][a[2]][a[3]][a[4]][a[5]][a[6]][a[7]] = value;
      break;
    case 9:
      dto1[a[0]][a[1]][a[2]][a[3]][a[4]][a[5]][a[6]][a[7]][a[8]] = value;
      break;
    case 10:
      dto1[a[0]][a[1]][a[2]][a[3]][a[4]][a[5]][a[6]][a[7]][a[8]][a[9]] = value;
      break;
    case 11:
      dto1[a[0]][a[1]][a[2]][a[3]][a[4]][a[5]][a[6]][a[7]][a[8]][a[9]][a[10]] = value;
      break;
    case 12:
      dto1[a[0]][a[1]][a[2]][a[3]][a[4]][a[5]][a[6]][a[7]][a[8]][a[9]][a[10]][a[11]] = value;
      break;
    case 13:
      dto1[a[0]][a[1]][a[2]][a[3]][a[4]][a[5]][a[6]][a[7]][a[8]][a[9]][a[10]][a[11]][a[12]] = value;
      break;
    case 14:
      dto1[a[0]][a[1]][a[2]][a[3]][a[4]][a[5]][a[6]][a[7]][a[8]][a[9]][a[10]][a[11]][a[12]][a[13]] =
        value;
      break;

    default:
      dto1 = dto;
      break;
  }
  if (setDto !== undefined) setDto({ ...dto1 });
  return { ...dto1 };
};

export { get, set };
