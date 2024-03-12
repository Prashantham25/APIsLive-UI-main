const ReportObj = {
  ReportConfigDto: {
    reportConfigName: "",
    dbschema: "",
    isActive: 1,
    createdDate: "",
    query: "",
    fileName: "",
    filePath: "",
    TblreportConfigParam: [],
  },
  ReportUpdate: {
    ReportName: "",
    reportConfigId: "",
    DBSchemaId: "",
    RangeTypeId: "",
    DataTypeId: "",
    ParameterName: "",
    isActive: 1,
    query: "",
    TblreportConfigParam: [],
  },
};

export default ReportObj;
