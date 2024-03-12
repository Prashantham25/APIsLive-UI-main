export default function FundOptionContent(productDetailsContent, ProductId) {
  const data = {
    52: [
      {
        FundType: "Bond Fund",
        InvestmentInGovt: "Not less than 60%",
        ShortTermInvestments: "Not more than 40%",
        InvestmentInListedEquity: "Nil",
        Objective:
          "To provide relatively safe and less volatile investment option mainly through accumulation of income through investments in fixed income securities.",
        RiskProfile: "Low Risk",
        SFIN: "ULIF00124/12/18LICULIPBND512",
      },
      {
        FundType: "Secured Fund",
        InvestmentInGovt: "Not less than 45% and Not more than 85%",
        ShortTermInvestments: "Not more than 40%",
        InvestmentInListedEquity: "Not less than 15% and Not more than 55%",
        Objective:
          "To provide steady income through investment in both equities and fixed income securities.",
        RiskProfile: "Lower to Medium Risk",
        SFIN: "ULIF00224/12/18LICULIPSEC512",
      },
      {
        FundType: "Balanced Fund",
        InvestmentInGovt: "Not less than 30% and Not more than 70%",
        ShortTermInvestments: "Not more than 40%",
        InvestmentInListedEquity: "Not less than 30% and Not more than 70%",
        Objective:
          "To provide balanced income and growth through similar proportion investment in both equities and fixed income securities.",
        RiskProfile: "Medium Risk",
        SFIN: "ULIF00324/12/18LICULIPBAL512",
      },
      {
        FundType: "Growth Fund",
        InvestmentInGovt: "Not less than 20% and Not more than 60%",
        ShortTermInvestments: "Not more than 40%",
        InvestmentInListedEquity: "Not less than 40% and Not more than 80%",
        Objective: "To provide long term capital growth through investment primarily in equities.",
        RiskProfile: "High Risk",
        SFIN: "ULIF00424/12/18LICULIPGRW512",
      },
    ],

    59: [
      {
        FundType: "Pension Bond Fund",
        InvestmentInGovt: "60% to 100%",
        ShortTermInvestments: "0% to 40%",
        InvestmentInListedEquity: "Nil",
        Objective:
          "To provide relatively safe and less volatile investment option mainly through accumulation of income through investments in fixed income securities.",
        RiskProfile: "Low Risk",
        SFIN: "ULIF00101/02/22LICPENFBND512",
      },
      {
        FundType: "Pension Secured Fund",
        InvestmentInGovt: "50% to 90%",
        ShortTermInvestments: "0% to 40%",
        InvestmentInListedEquity: "10% to 50%",
        Objective:
          "To provide steady income through investment in both equities and fixed income securities.",
        RiskProfile: "Lower to Medium Risk",
        SFIN: "ULIF00201/02/22LICPENFSEC512",
      },
      {
        FundType: "Pension Balanced Fund",
        InvestmentInGovt: "30% to 70%",
        ShortTermInvestments: "0% to 40%",
        InvestmentInListedEquity: "30% to 70%",
        Objective:
          "To provide balanced income and growth through similar proportion investment in both equities and fixed income securities.",
        RiskProfile: "Medium Risk",
        SFIN: "ULIF00301/02/22LICPENFBAL512",
      },
      {
        FundType: "Pension Growth Fund",
        InvestmentInGovt: "0% to 60%",
        ShortTermInvestments: "0% to 40%",
        InvestmentInListedEquity: "40% to 100%",
        Objective: "To provide long term capital growth through investment primarily in equities.",
        RiskProfile: "High Risk",
        SFIN: "ULIF00401/02/22LICPENFGRW512",
      },
    ],
    51: [
      {
        FundType: "Bond Fund",
        InvestmentInGovt: "Not less than 60%",
        ShortTermInvestments: "Not more than 40%",
        InvestmentInListedEquity: "Nil",
        Objective:
          "To provide relatively safe and less volatile investment option mainly through accumulation of income through investments in fixed income securities.",
        RiskProfile: "Low Risk",
        SFIN: "ULIF00124/12/18LICULIPBND512",
      },
      {
        FundType: "Secured Fund",
        InvestmentInGovt: "Not less than 45% and Not more than 85%",
        ShortTermInvestments: "Not more than 40%",
        InvestmentInListedEquity: "Not less than 15% and Not more than 55%",
        Objective:
          "To provide steady income through investment in both equities and fixed income securities.",
        RiskProfile: "Lower to Medium Risk",
        SFIN: "ULIF00224/12/18LICULIPSEC512",
      },
      {
        FundType: "Balanced Fund",
        InvestmentInGovt: "Not less than 30% and Not more than 70%",
        ShortTermInvestments: "Not more than 40%",
        InvestmentInListedEquity: "Not less than 30% and Not more than 70%",
        Objective:
          "To provide balanced income and growth through similar proportion investment in both equities and fixed income securities.",
        RiskProfile: "Medium Risk",
        SFIN: "ULIF00324/12/18LICULIPBAL512",
      },
      {
        FundType: "Growth Fund",
        InvestmentInGovt: "Not less than 20% and Not more than 60%",
        ShortTermInvestments: "Not more than 40%",
        InvestmentInListedEquity: "Not less than 40% and Not more than 80%",
        Objective: "To provide long term capital growth through investment primarily in equities.",
        RiskProfile: "High Risk",
        SFIN: "ULIF00424/12/18LICULIPGRW512",
      },
    ],
    73: [
      {
        FundType: "Bond Fund",
        InvestmentInGovt: "Not less than 60%",
        ShortTermInvestments: "Not more than 40%",
        InvestmentInListedEquity: "Nil",
        Objective:
          "To provide relatively safe and less volatile investment option mainly through accumulation of income through investments in fixed income securities.",
        RiskProfile: "Low Risk",
        SFIN: "ULIF001201114LICNED+BND512",
      },
      {
        FundType: "Secured Fund",
        InvestmentInGovt: "Not less than 45%",
        ShortTermInvestments: "Not more than 40%",
        InvestmentInListedEquity: "Not less than 15% and Not more than 55%",
        Objective:
          "To provide steady income through investment in both equities and fixed income securities.",
        RiskProfile: "Lower to Medium Risk",
        SFIN: "ULIF002201114LICNED+SEC512",
      },
      {
        FundType: "Balanced Fund",
        InvestmentInGovt: "Not less than 30%",
        ShortTermInvestments: "Not more than 40%",
        InvestmentInListedEquity: "Not less than 30% and Not more than 70%",
        Objective:
          "To provide balanced income and growth through similar proportion investment in both equities and fixed income securities.",
        RiskProfile: "Medium Risk",
        SFIN: "ULIF003201114LICNED+BAL512",
      },
      {
        FundType: "Growth Fund",
        InvestmentInGovt: "Not less than 20%",
        ShortTermInvestments: "Not more than 40%",
        InvestmentInListedEquity: "Not less than 40% and Not more than 80%",
        Objective: "To provide long term capital growth through investment primarily in equities.",
        RiskProfile: "High Risk",
        SFIN: "ULIF004201114LICNED+GRW512",
      },
    ],
  };

  return {
    type: "DataGrid",
    spacing: 12,
    getRowHeight: "auto",
    getRowId: (row) => row.FundType,
    hideFooterPagination: true,
    rowId: "FundType",
    visible: productDetailsContent.some((x) => x?.label === "Fund Option"),
    accordionId: 1,
    sx: {
      "& .MuiDataGrid-columnHeaderTitle": {
        overflow: "visible",
        lineHeight: "0.9rem",
        whiteSpace: "normal",
        color: "#1a237e",
      },
      boxShadow: 2,
      fontSize: "0.8rem",
    },
    columns: [
      {
        field: "FundType",
        headerName: "Fund Type",
        width: 70,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "InvestmentInGovt",
        headerName: "Investment in Government/Government Guaranteed Securities/Corporate Debt",
        width: 240,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "ShortTermInvestments",
        headerName: "Short-term investments such as money market instruments",
        width: 160,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "InvestmentInListedEquity",
        headerName: "Investment in Listed Equity Shares",
        width: 100,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "Objective",
        headerName: "Objective",
        width: 130,
        headerAlign: "center",
        align: "center",
        whiteSpace: "normal",
      },
      {
        field: "RiskProfile",
        headerName: "Risk Profile",
        width: 60,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "SFIN",
        headerName: "SFIN",
        width: 40,
        headerAlign: "center",
        align: "center",
      },
    ],
    value: data[ProductId] || [],
  };
}
