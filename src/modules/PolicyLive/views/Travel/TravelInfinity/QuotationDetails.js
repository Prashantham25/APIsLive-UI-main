import React, { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import { useDataController, setTravellerInfinityDetails } from "modules/BrokerPortal/context";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Autocomplete,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { subDays, addDays } from "date-fns";
import swal from "sweetalert";
import MDBox from "components/MDBox";
import MDDatePicker from "components/MDDatePicker";
import MDTypography from "components/MDTypography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDButton from "../../../../../components/MDButton/index";

import MDInput from "../../../../../components/MDInput";

import {
  getGroupPartnerList,
  getMasterData,
  getMasterPolicyOnPartnerID,
  getAssignProductOnPartnerID,
  getPartnerDetailsonpartnerId,
  getProductById,
  // getDestination,
  getPlanOnMasterPolicy,
  getPlanDetailsOnGroupId,
  GetPolicyTripTenureMaster,
  PartnerAccountSearchCd,
  calculatePremium,
  getGroupingDetails,
  getProductIdByProductcode,
} from "./data/index";

function QuotationDetails({ setPremiumData, PremiumData }) {
  const [controller, dispatch] = useDataController();
  const { TravellerInfinityDetails } = controller;
  console.log("TravellerInfinityDetails", TravellerInfinityDetails);
  const [TInfinityDto, setInfinityDto] = useState({ ...TravellerInfinityDetails });

  const [partnerData, setPartnerData] = useState([]);
  const [selectmaster, setselectmaster] = useState([]);
  const [partnername, setpartnername] = useState("");

  // const [ratingData, setRatingData] = useState("");
  const [grouptypeID, setGrouptypeID] = useState("");
  const [productid, setProductId] = useState("");
  const [productidpk, setProductidpk] = useState("");
  const [destinationdata, setdestinationdata] = useState([]);
  const [geographydata, setgeographydata] = useState("");
  const [suminsuredata, setsuminsuredata] = useState("");

  // const [agenow, setagenow] = useState("");
  const [triptenuredata, settriptenuredata] = useState([]);
  const [Policyid, setPolicyid] = useState("");
  const [planData, setplanData] = useState([]);
  const [groupID, setGroupID] = useState("");
  const [flags, setFlags] = useState(false);

  const [planflag, setplanflag] = useState(false);
  // const [tableflag, settableflag] = useState(false);

  const [gridflag, setgridflag] = useState(false);

  const [geography, setgeography] = useState([]);
  const [suminsure, setsuminsure] = useState([]);
  const [tripType, settripType] = useState([]);

  const [idflag, setidflag] = useState(false);
  const [poly, setpoly] = useState(false);

  const [tripTypedata, settripTypedata] = useState("");
  // const [yy1, setyy1] = useState("");

  const [benefitList1, setbenefitList1] = useState([]);
  const DestinationType = [];

  useEffect(() => {
    setTravellerInfinityDetails(dispatch, { ...TInfinityDto });
  }, [TInfinityDto]);

  useEffect(() => {
    if (TInfinityDto.TripType !== "") {
      setgridflag(true);
    }
  }, []);

  useEffect(() => {
    partnerData.forEach((item) => {
      if (TInfinityDto.PartnerDetails.partnerCode === item.mID) {
        setpartnername(item.mValue);
      }
    });
  }, [partnerData]);
  const callSearch = async () => {
    const Data = await PartnerAccountSearchCd(TInfinityDto.PartnerDetails);
    console.log("SearchData", Data);
  };

  const handleSetAutoComplete = async (e, type, value1) => {
    if (type === "partnerCode") {
      TInfinityDto.PartnerDetails[type] = value1.mID;

      TInfinityDto.PartnerDetails.masterPolicyNo = "";
      setpartnername(value1.mValue);
      TInfinityDto.PartnerDetails.partnerName = value1.mValue;
      console.log("partnernamesssss", partnername);
      setplanflag(true);
      const policyonpartnerid = await getMasterPolicyOnPartnerID(value1.mID);
      setplanflag(false);

      if (policyonpartnerid.status === 200) {
        if (policyonpartnerid.data[0].mValue > 0) {
          console.log("partneridd", policyonpartnerid);
          setselectmaster([...policyonpartnerid.data]);
          setplanflag(true);
          const Product = await getAssignProductOnPartnerID(value1.mID);
          setplanflag(false);

          if (Product.status === 200) {
            setPolicyid(Product.data[0].policyId);
            setProductidpk(Product.data[0].productIdPk);
            TInfinityDto.ProductId = TInfinityDto.PartnerDetails.productId;
            setplanflag(true);
            const partnerdetails = await getPartnerDetailsonpartnerId(value1.mID);
            setplanflag(false);

            if (partnerdetails.status === 200) {
              console.log("partnerdetails", partnerdetails);
              const sdate = Product.data[0].policyStartDate.split("T")[0];
              TInfinityDto.MasterPolicyStartDate = sdate;
              const edate = Product.data[0].policyEndDate.split("T")[0];
              TInfinityDto.MasterPolicyEndDate = edate;
              const numberofpolicy = Product.data[0].policyNo;
              TInfinityDto.PartnerDetails.accountNo = numberofpolicy;
              console.log("date1", TInfinityDto);
            }
          }

          callSearch();

          setInfinityDto((prevState) => ({
            ...prevState,
            ...TInfinityDto,
          }));
          console.log("fill", TInfinityDto);

          setpoly(true);
        }
      } else {
        swal({
          icon: "error",
          text: "CD-Account does not exist for this partner",
          buttons: {
            buttonTwo: {
              text: "OK",
              value: "Confirm",
              visible: true,
            },
          },
        }).then((value) => {
          if (value === "Confirm") {
            window.location.reload();
          }
        });
      }
    }
    if (type === "masterPolicyNo") {
      TInfinityDto.PartnerDetails[type] = value1.mValue;
      TInfinityDto.PartnerDetails.Plan = "";

      setInfinityDto((prevState) => ({
        ...prevState,
        ...TInfinityDto,
      }));

      setplanflag(true);

      if (productidpk !== "") {
        const productById = await getProductById(productidpk);

        const group = productById.groupDTO[0].groupTypeId;
        setGrouptypeID(group);
        console.log("groupDTO", grouptypeID, "group", group);
      }

      const planonmaster = await getPlanOnMasterPolicy(Policyid);

      console.log("PLANNDATA", planonmaster);

      if (planonmaster.length >= 0) {
        console.log("planonmaster", planonmaster);

        setplanData([...planonmaster]);
        setInfinityDto((prevState) => ({
          ...prevState,
          ...TInfinityDto,
        }));

        setplanflag(false);
      } else {
        swal({
          text: "Sorry No plan Found! Try again",
          icon: "error",
        });
      }
      // setplanData([...planonmaster]);
      // // setplanflag(false);
    }

    if (type === "ListOfDestination") {
      // debugger;
      value1.forEach((item) => {
        DestinationType.push(item.mValue);
        TInfinityDto[type] = [...DestinationType].join(",");
      });
      // if (value1 === null) {
      //   TInfinityDto[type] = [];
      // } else {
      //   DestinationType = value1;
      // }
      // if (DestinationType !== "")
      //   DestinationType.forEach((item) => {
      //     TInfinityDto[type].push(item.mValue);
      //     // TInfinityDto[type] = [...DestinationType].join(",");
      //   });
      console.log("date1", TInfinityDto);
      console.log("newaaaaaray", DestinationType);

      setInfinityDto((prevState) => ({
        ...prevState,
        ...TInfinityDto,
      }));
    }

    if (type === "Plan") {
      TInfinityDto[type] = value1.mValue;

      TInfinityDto.Geography = "";
      setGroupID(value1.mID);
      TInfinityDto.GroupId = value1.mID;
      console.log("groupid od plan", groupID);

      const Data = await getPlanDetailsOnGroupId(value1.mID);
      console.log("grouping dataaaaaa", Data);

      Data.forEach((item) => {
        if (item.mType === "Region") {
          setgeography(item.mdata);
        }
        if (item.mType === "SI") {
          setsuminsure(item.mdata);
        }
        if (item.mType === "Type") {
          settripType(item.mdata);
        }
      });

      console.log("gro", Data);

      setInfinityDto((prevState) => ({
        ...prevState,
        ...TInfinityDto,
      }));
    }
    if (type === "Geography") {
      TInfinityDto[type] = value1.mValue;
      TInfinityDto.SumInsured = "";

      TInfinityDto.FilterCriteria.Region = value1.mValue;

      if (TInfinityDto[type] === "DOM") {
        TInfinityDto.FilterCriteria.currency = "INR";
        TInfinityDto.Currency = "INR";

        await getMasterData("Domestic").then((result) => {
          result.data.forEach((x) => {
            x.mdata.sort((a, b) => {
              if (a.mValue < b.mValue) {
                return -1;
              }
              if (a.mValue > b.mValue) {
                return 1;
              }
              return 0;
            });
            setdestinationdata(x.mdata);
          });

          console.log("lod", destinationdata);
        });
      } else if (TInfinityDto[type] === "APAC") {
        TInfinityDto.FilterCriteria.currency = "USD";
        TInfinityDto.Currency = "USD";

        await getMasterData("APAC").then((result) => {
          result.data.forEach((x) => {
            x.mdata.sort((a, b) => {
              if (a.mValue < b.mValue) {
                return -1;
              }
              if (a.mValue > b.mValue) {
                return 1;
              }
              return 0;
            });
            setdestinationdata(x.mdata);
          });
        });
      } else if (TInfinityDto[type] === "WW" || TInfinityDto[type] === "WWIC") {
        TInfinityDto.FilterCriteria.currency = "USD";
        TInfinityDto.Currency = "USD";
        await getMasterData("Worldwide").then((result) => {
          result.data.forEach((x) => {
            x.mdata.sort((a, b) => {
              if (a.mValue < b.mValue) {
                return -1;
              }
              if (a.mValue > b.mValue) {
                return 1;
              }
              return 0;
            });
            setdestinationdata(x.mdata);
          });

          console.log("lod", destinationdata);
        });
      } else if (TInfinityDto[type] === "WWX" || TInfinityDto[type] === "WWEU") {
        TInfinityDto.FilterCriteria.currency = "USD";
        TInfinityDto.Currency = "USD";
        await getMasterData("Worldwide Excluding US/Canada").then((result) => {
          result.data.forEach((x) => {
            x.mdata.sort((a, b) => {
              if (a.mValue < b.mValue) {
                return -1;
              }
              if (a.mValue > b.mValue) {
                return 1;
              }
              return 0;
            });
            setdestinationdata(x.mdata);
          });
        });
      } else if (TInfinityDto[type] === "APAC_DOM") {
        TInfinityDto.FilterCriteria.currency = "USD";
        TInfinityDto.Currency = "USD";
        await getMasterData("APAC With Domestic").then((result) => {
          result.data.forEach((x) => {
            x.mdata.sort((a, b) => {
              if (a.mValue < b.mValue) {
                return -1;
              }
              if (a.mValue > b.mValue) {
                return 1;
              }
              return 0;
            });
            setdestinationdata(x.mdata);
          });
        });
        // await getMasterData().then((result) => {
        //   result.data.forEach((x) => {
        //     if (x.mType === "APAC With Domestic") setdestinationdata(x.mdata);
        //   });
        // });
      } else if (TInfinityDto[type] === "WW_DOM" || TInfinityDto[type] === "WWIC_DOM") {
        TInfinityDto.FilterCriteria.currency = "USD";
        TInfinityDto.Currency = "USD";
        await getMasterData("Worldwide incl USA/Canada With Domestic").then((result) => {
          result.data.forEach((x) => {
            x.mdata.sort((a, b) => {
              if (a.mValue < b.mValue) {
                return -1;
              }
              if (a.mValue > b.mValue) {
                return 1;
              }
              return 0;
            });
            setdestinationdata(x.mdata);
          });
        });
      } else if (TInfinityDto[type] === "WWX_DOM" || TInfinityDto[type] === "WWEU_DOM") {
        TInfinityDto.FilterCriteria.currency = "USD";
        TInfinityDto.Currency = "USD";
        await getMasterData("Worldwide excl USA/Canada With Domestic").then((result) => {
          result.data.forEach((x) => {
            x.mdata.sort((a, b) => {
              if (a.mValue < b.mValue) {
                return -1;
              }
              if (a.mValue > b.mValue) {
                return 1;
              }
              return 0;
            });
            setdestinationdata(x.mdata);
          });
        });
        // await getMasterData().then((result) => {
        //   result.data.forEach((x) => {
        //     if (x.mType === "Worldwide excl USA/Canada With Domesti") setdestinationdata(x.mdata);
        //   });
        // });
      }
      setgeographydata(value1.mValue);

      setInfinityDto((prevState) => ({
        ...prevState,
        ...TInfinityDto,
      }));
    }
    if (type === "NOOfDays") {
      TInfinityDto[type] = value1.mID;
      // const nooftraveldays = value1.mID;

      if (type === "NOOfDays" && TInfinityDto.TripType === "StudentTravel") {
        const currDup1 = TInfinityDto.TripStartDate;
        const currDup = new Date(currDup1);

        const tripend = new Date(currDup.setDate(currDup.getDate() + (TInfinityDto.NOOfDays - 1)));
        const format2 = tripend;
        const tripend2 = [format2.getFullYear(), format2.getMonth() + 1, format2.getDate()].join(
          "-"
        );
        console.log("dateofend", tripend2);
        let [yyyy1, mmm1, ddd1] = tripend2.split("-");
        if (mmm1 <= 9) {
          mmm1 = `0${mmm1}`;
        }
        if (ddd1 <= 9) {
          ddd1 = `0${ddd1}`;
        }
        yyyy1 = `${yyyy1}`;
        const tdate = `${yyyy1}-${mmm1}-${ddd1}`;
        TInfinityDto.TripEndDate = tdate;

        TInfinityDto.PolicyEndDate = TInfinityDto.TripEndDate;
      }
    }

    if (type === "SumInsured") {
      TInfinityDto[type] = value1.mValue;
      TInfinityDto.TripType = "";
      TInfinityDto.FilterCriteria.SI = value1.mValue;
      setsuminsuredata(value1.mValue);
      setInfinityDto((prevState) => ({
        ...prevState,
        ...TInfinityDto,
      }));
    }

    if (type === "TripType") {
      TInfinityDto[type] = value1.mValue;
      TInfinityDto.FilterCriteria.Type = value1.mValue;
      settripTypedata(value1.mValue);
      console.log("tripTypedata", tripTypedata);

      setgridflag(true);
      const plancovers = {
        productId: productidpk,
        groupId: groupID,
        filterCriteria: {
          SI: suminsuredata,
          Type: value1.mValue,
          Region: geographydata,
          currency: TInfinityDto.FilterCriteria.currency,
        },
      };

      const Data = await GetPolicyTripTenureMaster(productid, TInfinityDto.TripType);
      settriptenuredata([...Data.data]);
      // setplanflag(true);

      const benefitList = await getGroupingDetails(plancovers);
      // setplanflag(false);
      if (benefitList.data.sectionMappingDetails === null) {
        swal({
          icon: "error",
          text: "The selected combination for Plan, Geography, Sum Insured and Trip type does not exist/Delayed response, please try again",
          buttons: {
            buttonTwo: {
              text: "OK",
              value: "Confirm",
              visible: true,
            },
          },
        }).then((value) => {
          if (value === "Confirm") {
            window.location.reload();
          }
        });
      } else {
        setbenefitList1(benefitList.data.sectionMappingDetails.BenefitDetails);
        console.log("TInfinityDto", TInfinityDto);

        setInfinityDto((prevState) => ({
          ...prevState,
          ...TInfinityDto,
        }));

        // settableflag(true);
      }
    }
    setInfinityDto((prevState) => ({
      ...prevState,
      ...TInfinityDto,
    }));
  };

  // const handleOptionSelected = (e, value) => {
  //   // Concatenate and store the selected options as a single value
  //   debugger;

  //   // if (type === "ListOfDestination") {
  //   //   value1.forEach((item) => {
  //   //     DestinationType.push(item.mValue);
  //   //     TInfinityDto[type] = [...DestinationType].join(",");
  //   //   });
  //   //   console.log("date1", TInfinityDto);
  //   //   console.log("newaaaaaray", DestinationType);

  //   //   setInfinityDto((prevState) => ({
  //   //     ...prevState,
  //   //     ...TInfinityDto,
  //   //   }));

  //   TInfinityDto.ListOfDestination = value ? value.map((option) => option.mValue).join(", ") : "";

  //   setInfinityDto((prevState) => ({
  //     ...prevState,
  //     ...TInfinityDto,
  //   }));
  // };

  useEffect(async () => {
    const partnerlist = await getGroupPartnerList();
    const LoadID = localStorage.getItem("partnerId");

    console.log("loadingid", LoadID);
    if (LoadID > 0) {
      TInfinityDto.PartnerDetails.partnerCode = LoadID;
      partnerlist.data.forEach((x) => {
        if (x.mID.toString() === LoadID) setpartnername(x.mValue);
      });

      // TInfinityDto.PartnerDetails.partnerName = [...partnerlist.data].filter(
      //   (x) => x.mID === LoadID
      // );

      setInfinityDto({ ...TInfinityDto });

      console.log("itsmore");

      setidflag(true);
    }

    const prcode = await getProductIdByProductcode("GroupTravelV1");
    console.log("prcode", prcode.productId);
    setProductId(prcode.productId);

    console.log("loadingdata", LoadID);
    console.log("Partner Data", partnerlist);
    setPartnerData([...partnerlist.data]);
  }, []);

  // const getMasterData = async () => {
  //   const Data1 = await getMasterData();
  //   console.log("list", Data1);
  // };

  // useEffect(() => {
  //   ongetMasterData();
  // }, []);

  useEffect(async () => {
    const plancovers1 = {
      productId: TInfinityDto.ProductId,
      groupId: TInfinityDto.GroupId,
      filterCriteria: {
        SI: TInfinityDto.FilterCriteria.SI,
        Type: TInfinityDto.FilterCriteria.Type,
        Region: TInfinityDto.FilterCriteria.Region,
        currency: TInfinityDto.FilterCriteria.currency,
      },
    };
    await getGroupingDetails(plancovers1).then((result) => {
      setbenefitList1(result.data.sectionMappingDetails.BenefitDetails);

      setInfinityDto((prevState) => ({
        ...prevState,
        ...TInfinityDto,
      }));
    });
  }, []);

  // useEffect(async () => {
  //
  //   await getDestination().then((result) => {
  //     result.data[0].mdata.sort((a, b) => {
  //       if (a.mValue < b.mValue) {
  //         return -1;
  //       }
  //       if (a.mValue > b.mValue) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //     setdestinationdata([...result.data[0].mdata]);
  //     console.log("alphadata", destinationdata);
  //   });
  // }, []);

  const onDateChange = async (e, type, date) => {
    switch (TInfinityDto.TripType) {
      case "SingleTrip":
        if (type === "PolicyStartDate") {
          TInfinityDto.PolicyStartDate = date;
          TInfinityDto.TripStartDate = TInfinityDto.PolicyStartDate;

          TInfinityDto.PolicyEndDate = "";

          TInfinityDto.TripEndDate = "";
          TInfinityDto.NOOfDays = "";
        } else if (type === "PolicyEndDate") {
          if (TInfinityDto.PolicyStartDate <= date) {
            TInfinityDto.PolicyEndDate = date;

            TInfinityDto.TripEndDate = TInfinityDto.PolicyEndDate;
            const d1 = TInfinityDto.TripStartDate.split("-");
            const d2 = date.split("-");
            const date1 = new Date([d1[1], d1[2], d1[0]].join("-"));
            const date2 = new Date([d2[1], d2[2], d2[0]].join("-"));
            const difference = date2.getTime() - date1.getTime();
            const nodays = difference / (1000 * 3600 * 24);
            const days = nodays + 1;

            TInfinityDto.NOOfDays = days.toString();
            console.log("10101", days);

            setInfinityDto((prevState) => ({
              ...prevState,
              ...TInfinityDto,
            }));
          } else {
            TInfinityDto.TripEndDate = "";
            setInfinityDto((prevState) => ({
              ...prevState,
              ...TInfinityDto,
            }));

            swal({
              text: " Trip End Date is Invalid!",
              icon: "error",
            });
          }

          break;
        }

        break;

      case "MultiTrip": {
        const today = e[0];

        const date1 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const mm1 = date1.getMonth().toString();
        const dd1 = date1.getDate().toString();
        if (dd1 === 31 && mm1 === 0) {
          date1.setMonth(0);

          date1.setFullYear(date1.getFullYear() + 1);
        } else {
          date1.setFullYear(date1.getFullYear() + 1);
        }

        date1.setDate(date1.getDate() - 1);

        const format = date1;
        const finald = [format.getFullYear(), format.getMonth() + 1, format.getDate()].join("-");

        let [yyyy1, mmm1, ddd1] = finald.split("-");
        if (mmm1 <= 9) {
          // mm1 = "0" + mm1;
          mmm1 = `0${mmm1}`;
        }
        if (ddd1 <= 9) {
          // dd1 = "0" + dd1;
          ddd1 = `0${ddd1}`;
        }
        yyyy1 = `${yyyy1}`;
        const ddate = `${yyyy1}-${mmm1}-${ddd1}`;

        if (type === "PolicyStartDate") {
          TInfinityDto[type] = date;
          TInfinityDto.NOOfDays = "";
          TInfinityDto.TripEndDate = ddate;
          TInfinityDto.TripStartDate = date;
          TInfinityDto.PolicyEndDate = ddate;
        }

        break;
      }
      case "StudentTravel":
        if (type === "PolicyStartDate") {
          TInfinityDto[type] = date;
          TInfinityDto.TripEndDate = "";
          TInfinityDto.NOOfDays = "";

          TInfinityDto.TripStartDate = date;
          TInfinityDto.PolicyEndDate = "";
        }
        break;

      default: {
        console.log("wrong date");
      }
    }

    if (TInfinityDto.TripType === "SingleTrip" && TInfinityDto.Geography !== "DOM") {
      if (TInfinityDto.NOOfDays > 180) {
        TInfinityDto.NOOfDays = "";
        TInfinityDto.TripEndDate = "NA";
        setInfinityDto((prevState) => ({
          ...prevState,
          ...TInfinityDto,
        }));
        swal({
          text: "This policy does not cover Travel days beyond 180 days",
          icon: "error",
        });
      }
    } else if (
      TInfinityDto.TripType === "SingleTrip" &&
      TInfinityDto.Geography === "DOM" &&
      TInfinityDto.NOOfDays > 30
    ) {
      TInfinityDto.NOOfDays = "";
      TInfinityDto.TripEndDate = "NA";
      swal({
        text: "This policy does not cover Travel days beyond 30",
        icon: "error",
      });
      setInfinityDto((prevState) => ({
        ...prevState,
        ...TInfinityDto,
      }));
    }

    setInfinityDto((prevState) => ({
      ...prevState,
      ...TInfinityDto,
    }));
  };

  const callPremiumData = async () => {
    if (
      TInfinityDto.TripStartDate !== "" &&
      TInfinityDto.TripEndDate !== "" &&
      TInfinityDto.InsurableItem[0].RiskItems.length > 0 &&
      TInfinityDto.PolicyStartDate !== "" &&
      TInfinityDto.PolicyEndDate !== "" &&
      TInfinityDto.ProposerDetails.ContactNo !== "" &&
      TInfinityDto.ProposerDetails.EmailId !== "" &&
      TInfinityDto.ListOfDestination !== ""
    ) {
      setFlags(true);
      const Data = await calculatePremium(TInfinityDto);

      if (Data.data.premiumDetail.TotalPremium <= 0) {
        swal({
          icon: "error",
          text: "The Certificate of Issuance cannot be proceed, as premium amount is zero",
          buttons: {
            buttonTwo: {
              text: "OK",
              value: "Confirm",
              visible: true,
            },
          },
        }).then((value) => {
          if (value === "Confirm") {
            window.location.reload();
            console.log("p0");
          }
        });
      }

      setPremiumData(Data.data.premiumDetail);

      // setRatingData(Data.data.premiumDetail.TotalPremium);
      console.log("ppdata", PremiumData);
      setFlags(false);
    } else {
      swal({
        text: " Please Enter Required Fields to Calculate Premium",
        icon: "error",
      });

      setFlags(false);
    }
  };

  const handleChange1 = (e) => {
    if (e.target.name === "NOOfTravellers") {
      // const travelRegex = /^[1-6]*$/;
      // travelRegex.test(e.target.value)

      if (TInfinityDto.TripType === "StudentTravel") {
        if (e.target.value <= 1 && e.target.value > 0) {
          TInfinityDto[e.target.name] = e.target.value;
          setInfinityDto((prevState) => ({
            ...prevState,
            NoOfTravellers: e.target.value,
          }));
        } else if (e.target.value > 1) {
          swal({
            text: "You can Select Only One Student  ",
            icon: "error",
          });
        }

        // else {
        //   swal({
        //     text: "Plea ",
        //     icon: "error",
        //   });
        // }
      } else if (TInfinityDto.TripType !== "StudentTravel") {
        if (e.target.value <= 6 && e.target.value > 0) {
          TInfinityDto[e.target.name] = e.target.value;
          setInfinityDto((prevState) => ({
            ...prevState,
            NoOfTravellers: e.target.value,
          }));
        } else if (e.target.value > 6) {
          swal({
            text: " You can add upto 6 Travellers only",
            icon: "error",
          });
          TInfinityDto.NoOfTravellers = "";
        }
        // else {
        //   swal({
        //     text: "Please Choose Number Of Travellers",
        //     icon: "error",
        //   });
        // }
      }
    }

    setInfinityDto((prevState) => ({ ...prevState, ...TInfinityDto }));
    console.log("NOOfTravellers", TInfinityDto.NOOfTravellers);
    TInfinityDto.InsurableItem[0].RiskItems = [];
    for (let i = 0; i < TInfinityDto.NOOfTravellers; i += 1) {
      TInfinityDto.InsurableItem[0].RiskItems.push({
        Name: "",
        DOB: "",
        Gender: "",
        PassportNo: "",
        Nationality: "",
        VisaType: " ",
        MAge: " ",
        MobileNoMember: "",
        relationShipToProposer: "",
        RelationWithInsured: "",
        Questionaire: [
          {
            QId: "1",
            Question:
              "I hereby declare on behalf of all members proposed to be insured that I/we are in good health and not under any treatment or surgical problem or follow up for any medical condition. Neither have I/we ever been investigated for, diagnosed with or under treatment for any chronic health condition nor are any medical or surgical treatment or follow up planned for me/us in the near future.",
            Answer: "",
          },
        ],
      });
    }
    setInfinityDto((prevState) => ({ ...prevState, ...TInfinityDto }));
  };

  const handleCalculateAge = (date) => {
    const dob = new Date(date);
    const dobYear = dob.getYear();
    const dobMonth = dob.getMonth();
    const dobDate = dob.getDate();
    const now = new Date();
    // extract the year, month, and date from current date
    const currentYear = now.getYear();
    const currentMonth = now.getMonth();
    const currentDate = now.getDate();
    let yearAge = currentYear - dobYear;
    let monthAge;
    if (currentMonth >= dobMonth) {
      monthAge = currentMonth - dobMonth;
    }
    // get months when current month is greater
    else {
      yearAge -= 1;
      monthAge = 12 + currentMonth - dobMonth;
    }

    // get days
    // let dateAge;
    if (currentDate >= dobDate) {
      // dateAge = currentDate - dobDate;
    } else {
      monthAge -= 1;
      // dateAge = 31 + currentDate - dobDate;

      if (monthAge < 0) {
        monthAge = 11;
        yearAge -= 1;
      }
    }
    return yearAge;
  };
  const handleSetContact = (e) => {
    if (e.target.name === "ContactNo") {
      TInfinityDto.ProposerDetails[e.target.name] = e.target.value;
      if (TInfinityDto.ProposerDetails.ContactNo.length > 10) {
        swal({
          text: "Mobile Number should be of 10 digits",
          icon: "error",
        });
        TInfinityDto.ProposerDetails.ContactNo = "";
        setInfinityDto((prevState) => ({
          ...prevState,
          TInfinityDto: prevState.TInfinityDto,
        }));
      } else if (TInfinityDto.ProposerDetails.ContactNo.length === 10) {
        const re = /^[6-9]\d{1}[0-9]\d{7}$/;
        if (re.test(e.target.value) || e.target.value === "") {
          TInfinityDto.ProposerDetails.ContactNo = e.target.value;
          setInfinityDto((prevState) => ({
            ...prevState,
            TInfinityDto: prevState.TInfinityDto,
          }));
        } else {
          swal({
            text: "Mobile Number should begin from 6-9",
            icon: "error",
          });
          TInfinityDto.ProposerDetails.ContactNo = "";
          setInfinityDto((prevState) => ({
            ...prevState,
            TInfinityDto: prevState.TInfinityDto,
          }));
        }
      } else {
        TInfinityDto.ProposerDetails[e.target.name] = e.target.value;
        setInfinityDto((prevState) => ({
          ...prevState,
          TInfinityDto: prevState.TInfinityDto,
        }));
      }
    } else if (e.target.name === "EmailId") {
      TInfinityDto.ProposerDetails.EmailId = e.target.value;
      console.log("date1", TInfinityDto);

      setInfinityDto((prevState) => ({
        ...prevState,
        TInfinityDto: prevState.TInfinityDto,
      }));
    }

    console.log("date1", TInfinityDto);
  };

  const handleDateChangeone = (e, date, index) => {
    TInfinityDto.InsurableItem[0].RiskItems[index].DOB = date;

    const a = handleCalculateAge(TInfinityDto.InsurableItem[0].RiskItems[index].DOB);
    TInfinityDto.InsurableItem[0].RiskItems[index].MAge = a;

    setInfinityDto({ ...TInfinityDto });
    // useEffect(() => {
    //   TInfinityDto.InsurableItem[0].RiskItems.forEach((r, index) => {
    //     const a = handleCalculateAge(r.DOB);
    //     TInfinityDto.InsurableItem[0].RiskItems[index].MAge = a;

    //     if (
    //       TInfinityDto.TripType !== "StudentTravel" &&
    //       TInfinityDto.InsurableItem[0].RiskItems[index].MAge > 95
    //     ) {
    //       swal({
    //         text: "Member age cannot be greater than 95 years",
    //         icon: "error",
    //       });
    //       TInfinityDto.InsurableItem[0].RiskItems[index].MAge = "";
    //       setInfinityDto({ ...TInfinityDto });
    //     }
    //   });
    //   setInfinityDto({ ...TInfinityDto });
    // }, []);
    if (TInfinityDto.TripType === "StudentTravel") {
      const stuage = handleCalculateAge(date);
      if (stuage < 12 || stuage > 60) {
        TInfinityDto.InsurableItem[0].RiskItems[index].DOB = "";
        setInfinityDto((prevState) => ({
          ...prevState,
          TInfinityDto: prevState.TInfinityDto,
        }));
        swal({
          text: "Student Age should be between 12 To 60 years",
          icon: "error",
        });
      } else {
        TInfinityDto.InsurableItem[0].RiskItems[index].DOB = date;
        setInfinityDto((prevState) => ({
          ...prevState,
          TInfinityDto: prevState.TInfinityDto,
        }));
      }
    } else if (TInfinityDto.TripType !== "StudentTravel") {
      const memage = handleCalculateAge(date);
      if (memage > 95) {
        TInfinityDto.InsurableItem[0].RiskItems[index].DOB = "";
        setInfinityDto((prevState) => ({
          ...prevState,
          TInfinityDto: prevState.TInfinityDto,
        }));
        swal({
          text: "Traveller age should be less than  95 years",
          icon: "error",
        });
      }
    }
  };

  const handleDateChangefeild = (e, type, date) => {
    switch (type) {
      case "PROPOSERDOB": {
        // const userdate = new Date(date);
        // const todaytoday = new Date();
        // const yearnow = todaytoday.getFullYear() - userdate.getFullYear();
        // const monthnow = todaytoday.getMonth() - userdate.getMonth();

        // setagenow(yearnow);
        // if (monthnow < 0 || (monthnow === 0 && todaytoday.getDate() < userdate.getDate())) {
        //   setagenow(agenow - 1);
        // }
        // console.log(agenow);
        const age = handleCalculateAge(date);
        TInfinityDto.ProposerDetails.DOB = date;
        setInfinityDto((prevState) => ({
          ...prevState,
          TInfinityDto: prevState.TInfinityDto,
        }));
        if (age < 18) {
          swal({
            text: "Proposer Age should be greater than 18 years",
            icon: "error",
          });
          TInfinityDto.ProposerDetails.DOB = "";
          setInfinityDto((prevState) => ({
            ...prevState,
            TInfinityDto: prevState.TInfinityDto,
          }));
        } else {
          TInfinityDto.ProposerDetails.DOB = date;
          setInfinityDto((prevState) => ({
            ...prevState,
            TInfinityDto: prevState.TInfinityDto,
          }));
        }

        // if (TInfinityDto.ProposerDetails.EmailId !== "") {
        //   const reg = /^[a-zA-Z0-9-_.]+@[a-zA-Z0-9]+[.][A-Za-z]+$/;
        //   if (!reg.test(TInfinityDto.ProposerDetails.EmailId)) {
        //     swal({
        //       text: "Enter valid email id for Proposer",
        //       icon: "error",
        //     });
        //   }
        // }

        break;
      }
      default: {
        console.log("wrong date");
      }
    }
  };

  return (
    <MDBox pt={3}>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
            Partner Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={partnerData}
                value={{ mValue: partnername }}
                onChange={(e, value1) => handleSetAutoComplete(e, "partnerCode", value1)}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput {...params} label="Select Partner" required />}
                disabled={idflag}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                id="masterPolicyNo"
                options={selectmaster}
                value={{
                  mValue: TInfinityDto.PartnerDetails.masterPolicyNo,
                  // ? TInfinityDto.PartnerDetails.masterPolicyNo
                  // : undefined,
                }}
                onChange={(e, value1) => handleSetAutoComplete(e, "masterPolicyNo", value1)}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => (
                  <MDInput {...params} label="Select Master Policy" required />
                )}
              />
            </Grid>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={planflag}
            >
              <CircularProgress />
            </Backdrop>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                id="Plan"
                options={planData}
                // option={[]}
                value={{ mValue: TInfinityDto.Plan }}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value1) => handleSetAutoComplete(e, "Plan", value1)}
                renderInput={(params) => <MDInput {...params} label="Plan" required />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                id="Geography"
                options={geography}
                value={{ mValue: TInfinityDto.Geography }}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value1) => handleSetAutoComplete(e, "Geography", value1)}
                renderInput={(params) => <MDInput {...params} label="Geography" required />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                id="SumInsured"
                options={suminsure}
                value={{ mValue: TInfinityDto.SumInsured }}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value1) => handleSetAutoComplete(e, "SumInsured", value1)}
                renderInput={(params) => <MDInput {...params} label="Sum Insured" required />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                id="TripType"
                options={tripType}
                value={{ mValue: TInfinityDto.TripType }}
                groupBy={(option) => option.firstLetter}
                onChange={(e, value1) => handleSetAutoComplete(e, "TripType", value1)}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput {...params} label="Trip Type" required />}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      {/* {tableflag && ( */}

      {gridflag && (
        <Accordion
          defaultExpanded
          disableGutters
          sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
        >
          <Accordion
            defaultExpanded
            disableGutters
            sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
                Cover Details
              </MDTypography>
            </AccordionSummary>
            <AccordionDetails expandIcon={<ExpandMoreIcon />}>
              <br />
              {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mb={2} mt={-5}>
                <MDTypography variant="h6">Cover Details</MDTypography>
              </Grid> */}
              <Grid container spacing={2}>
                {/* <MDTypography label="Cover Details" /> */}

                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDTypography variant="h6" sx={{ fontSize: 18 }}>
                    Cover Name
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDTypography variant="h6" sx={{ fontSize: 18 }}>
                    Benefit Amount
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDTypography variant="h6" sx={{ fontSize: 18 }}>
                    Benefit Deductible Value
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDTypography variant="h6" sx={{ fontSize: 18 }}>
                    Deductible Type
                  </MDTypography>
                </Grid>
                <Divider sx={{ border: "1px", background: "#0071D9", width: "100%" }} />
                {TInfinityDto.Plan !== "" &&
                  benefitList1.map((row) => (
                    <>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDTypography sx={{ fontSize: 15 }}>{row.CoverName}</MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDTypography sx={{ fontSize: 15 }}>{row.Value}</MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDTypography sx={{ fontSize: 15 }}>{row.Deductible}</MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDTypography sx={{ fontSize: 15 }}>{row.DeductibleType}</MDTypography>
                      </Grid>

                      <Divider sx={{ border: "1px", background: "#0071D9", width: "100%" }} />
                    </>
                  ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion
            defaultExpanded
            disableGutters
            sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
                Policy Details
              </MDTypography>
            </AccordionSummary>
            <AccordionDetails expandIcon={<ExpandMoreIcon />}>
              <Grid container spacing={2}>
                {/* <MDInput value={start} disabled={poly} label="Policy Start Date" /> */}
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  {/* <MDInput label="Start Date" /> */}
                  <MDInput
                    disabled
                    fullWidth
                    label="Master Policy Start Date 
                    "
                    value={TInfinityDto.MasterPolicyStartDate}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  {/* <MDInput label="Start Date" /> */}
                  <MDInput
                    disabled
                    fullWidth
                    label="Master Policy End Date                    "
                    value={TInfinityDto.MasterPolicyEndDate}
                    required
                  />
                </Grid>
                {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDDatePicker
                    input={{ label: "Policy Start Date", value: TInfinityDto.PolicyStartDate }}
                    value={TInfinityDto.PolicyStartDate}
                    onChange={(e, date) => onDateChange(e, "PolicyStartDate", date)}
                    options={{
                      altInput: true,
                      dateFormat: "Y-m-d",
                      altFormat: "d/m/Y",
                      minDate: `${new Date().getFullYear()}-${
                        new Date().getMonth() + 1
                      }-${new Date().getDate()}`,
                    }}
                  />
                </Grid> */}
                {TInfinityDto.TripType === "SingleTrip" && TInfinityDto.Geography === "DOM" && (
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDDatePicker
                      // label="Instrument Date"
                      input={{
                        label: `Policy Start Date`,
                        value: TInfinityDto.PolicyStartDate,
                        sx: { width: "100%" },
                      }}
                      options={{
                        dateFormat: "Y-m-d",
                        altFormat: "d/m/Y",
                        altInput: true,
                        minDate: subDays(new Date(), 60),
                        maxDate: addDays(new Date(), 90),
                      }}
                      // value={ datetoShow.InstrumentDate}
                      //  id="InstrumentDate"
                      value={TInfinityDto.PolicyStartDate}
                      onChange={(e, date) => onDateChange(e, "PolicyStartDate", date)}
                    />
                  </Grid>
                )}
                {(TInfinityDto.TripType === "SingleTrip" ||
                  TInfinityDto.TripType === "StudentTravel" ||
                  TInfinityDto.TripType === "MultiTrip") &&
                  TInfinityDto.Geography !== "DOM" && (
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDDatePicker
                        fullWidth
                        input={{ label: " Policy Start Date", value: TInfinityDto.PolicyStartDate }}
                        value={TInfinityDto.PolicyStartDate}
                        onChange={(e, date) => onDateChange(e, "PolicyStartDate", date)}
                        options={{
                          dateFormat: "Y-m-d",
                          altFormat: "d/m/Y",
                          altInput: true,
                          minDate: `${new Date().getFullYear()}-${
                            new Date().getMonth() + 1
                          }-${new Date().getDate()}`,
                        }}
                      />
                    </Grid>
                  )}

                {TInfinityDto.TripType !== "SingleTrip" && (
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <Autocomplete
                      id="NOOfDays"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          padding: "4px!important",
                        },
                      }}
                      options={triptenuredata}
                      value={{ mValue: TInfinityDto.NOOfDays }}
                      getOptionLabel={(option) => option.mValue}
                      onChange={(e, value1) => handleSetAutoComplete(e, "NOOfDays", value1)}
                      renderInput={(params) => <MDInput {...params} label="Trip Tenure" />}
                    />
                  </Grid>
                )}
                {(TInfinityDto.TripType === "SingleTrip" ||
                  TInfinityDto.TripType === "StudentTravel" ||
                  TInfinityDto.TripType === "MultiTrip") &&
                  TInfinityDto.Geography !== "DOM" && (
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDDatePicker
                        fullWidth
                        input={{ label: "Policy End Date", value: TInfinityDto.PolicyEndDate }}
                        value={TInfinityDto.PolicyEndDate}
                        onChange={(e, date) => onDateChange(e, "PolicyEndDate", date)}
                        options={{
                          altInput: true,
                          dateFormat: "Y-m-d",
                          altFormat: "d/m/Y",
                          minDate: new Date(),
                        }}
                      />
                    </Grid>
                  )}
                {TInfinityDto.TripType === "SingleTrip" && TInfinityDto.Geography === "DOM" && (
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDDatePicker
                      fullWidth
                      input={{ label: "Policy End Date", value: TInfinityDto.PolicyEndDate }}
                      value={TInfinityDto.PolicyEndDate}
                      onChange={(e, date) => onDateChange(e, "PolicyEndDate", date)}
                      options={{
                        dateFormat: "Y-m-d",
                        altFormat: "d/m/Y",
                        altInput: true,
                        maxDate: addDays(TInfinityDto.PolicyStartDate, 30),
                        minDate: TInfinityDto.PolicyStartDate,
                      }}
                    />
                  </Grid>
                )}
                {TInfinityDto.TripType === "SingleTrip" && (
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    {/* <MDInput label="Start Date" /> */}
                    <MDInput
                      disabled
                      fullWidth
                      label="NO Of Days"
                      value={TInfinityDto.NOOfDays}
                      required
                    />
                  </Grid>
                )}

                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDDatePicker
                    fullWidth
                    input={{ label: "Trip Start Date", value: TInfinityDto.PolicyStartDate }}
                    inputProps={{ readOnly: true }}
                    disabled={poly}
                    value={TInfinityDto.PolicyStartDate}
                    options={{
                      altFormat: "d/m/Y",
                      altInput: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDDatePicker
                    fullWidth
                    input={{ label: "Trip End Date", value: TInfinityDto.PolicyEndDate }}
                    inputProps={{ readOnly: true }}
                    disabled={poly}
                    value={TInfinityDto.PolicyEndDate}
                    options={{
                      altFormat: "d/m/Y",
                      altInput: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <Autocomplete
                    id="ListOfDestination"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "4px!important",
                      },
                    }}
                    multiple
                    options={destinationdata}
                    // value={lMasters.dropdown.modeoftransitAuto.map((mValue) =>
                    //   lMasters.dropdown.ModeOfTransit.find((option) => option.mValue === mValue)
                    // )}
                    // value={TInfinityDto.ListOfDestination}
                    // value={(mValue  TInfinityDto.ListOfDestination)}
                    getOptionLabel={(option) => option.mValue}
                    onChange={(e, value1) => handleSetAutoComplete(e, "ListOfDestination", value1)}
                    renderInput={(params) => <MDInput {...params} label="Countries To visit" />}
                  />

                  {/* <Autocomplete
                    multiple
                    options={destinationdata}
                    getOptionLabel={(option) => option.mValue}
                    renderInput={(params) => <TextField {...params} label="List of Destination" />}
                    onChange={handleOptionSelected}
                    value={TInfinityDto.ListOfDestination} // Set the selected options
                  /> */}
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Accordion>
      )}
      {gridflag && (
        <Accordion
          defaultExpanded
          disableGutters
          sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
              Travellers
            </MDTypography>
          </AccordionSummary>
          <AccordionDetails expandIcon={<ExpandMoreIcon />}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  label="No of Travellers"
                  name="NOOfTravellers"
                  type="number"
                  InputProps={{
                    inputProps: { min: 0, max: 6 },
                  }}
                  value={TInfinityDto.NOOfTravellers}
                  onChange={handleChange1}
                  error={TInfinityDto.NOOfTravellers === 0}
                  required
                />
              </Grid>
            </Grid>

            {TInfinityDto.InsurableItem[0].RiskItems.map((x, index) => (
              <Grid container spacing={2} mt={1}>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDDatePicker
                    fullWidth
                    name="DOB"
                    options={{
                      dateFormat: "Y-m-d",
                      altFormat: "d/m/Y",
                      altInput: true,

                      maxDate: new Date(),
                    }}
                    input={{ label: `Date of Birth ${index + 1}`, value: x.DOB }}
                    value={TInfinityDto.InsurableItem[0].RiskItems[index].DOB}
                    onChange={(e, date) => handleDateChangeone(e, date, index)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    label="AGE"
                    value={TInfinityDto.InsurableItem[0].RiskItems[index].MAge}
                    defaultValue=" "
                    disabled
                  />
                </Grid>
                {/* //    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              //    <MDInput
              //      label="AGE"
              //      name="AGE"
              //     // value={TInfinityDto.InsurableItem[0].RiskItems[index].MAge}
              //      required
              //    />
              //  </Grid> */}
              </Grid>
            ))}
          </AccordionDetails>
        </Accordion>
      )}
      {gridflag && (
        <Accordion
          defaultExpanded
          disableGutters
          sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
              Proposer Details
            </MDTypography>
          </AccordionSummary>
          <AccordionDetails expandIcon={<ExpandMoreIcon />}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  label="Mobile Number"
                  name="ContactNo"
                  value={TInfinityDto.ProposerDetails.ContactNo}
                  onChange={handleSetContact}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  label="Email Id"
                  name="EmailId"
                  value={TInfinityDto.ProposerDetails.EmailId}
                  onChange={handleSetContact}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDDatePicker
                  fullWidth
                  name="DOB"
                  input={{ label: "Proposer DOB", value: TInfinityDto.ProposerDetails.DOB }}
                  value={TInfinityDto.ProposerDetails.DOB}
                  onChange={(e, type) => handleDateChangefeild(e, "PROPOSERDOB", type)}
                  options={{
                    dateFormat: "Y-m-d",
                    altFormat: "d/m/Y",
                    altInput: true,

                    maxDate: new Date(),
                  }}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}
      {gridflag && (
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={8} xxl={8}>
            <MDTypography sx={{ color: "#000000", fontWeight: "bold" }}>
              Total Premium:{PremiumData.TotalPremium}
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDBox sx={{ display: "flex", justifyContent: "right" }}>
              <MDButton
                size="medium"
                alignItems="right"
                onClick={callPremiumData}
                sx={{
                  textSize: "0.87rem",
                  borderRadius: "0.25rem",
                }}
              >
                Calculate Premium
              </MDButton>
              <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={flags}
              >
                <CircularProgress />
              </Backdrop>
            </MDBox>
          </Grid>
        </Grid>
      )}
    </MDBox>
  );
}

export default QuotationDetails;
