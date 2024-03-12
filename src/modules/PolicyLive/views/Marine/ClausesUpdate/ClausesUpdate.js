import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { Card, Grid, Autocomplete, CircularProgress, Backdrop } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";

import swal from "sweetalert";
import { postRequest } from "core/clients/axiosclient";
import { ClausesJsonData, JsonMaster } from "./data/ClausesJsonData";
import { fetchMMVData, getMasterDatalist } from "./data/index";

function ClausesUpdate() {
  const [clausesJson, setClausesJson] = useState(ClausesJsonData);
  const [Masters, setMasters] = useState(JsonMaster);
  const [transitId, setTransitId] = useState();
  const [cargoId, setCargoId] = useState("");

  const [TypeOfPolicy, setTypeOfPolicy] = useState([]);
  const [CargoTypee, setCargoTypee] = useState([]);
  const [ModeOfTransitt, setModeOfTransitt] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(async () => {
    const mdatalist = await getMasterDatalist();

    console.log(mdatalist, "mdatalist");

    mdatalist.data.map((md, i) => {
      if (md.mType === "MarinePolicyType") {
        setTypeOfPolicy([...mdatalist.data[i].mdata]);
      }
      if (md.mType === "CargoType") {
        setCargoTypee([...mdatalist.data[i].mdata]);
      }
      if (md.mType === "ModeofTransit") {
        setModeOfTransitt([...mdatalist.data[i].mdata]);
      }

      return null;
    });

    console.log(ModeOfTransitt, "ModeOfTransitt");
    console.log(TypeOfPolicy, "TypeOfPolicy");
    console.log(CargoTypee, "CargoTypee");
  }, []);

  const handleSetAutoComplete = async (e, type, value) => {
    if (type === "Type of Policy") {
      clausesJson.Clause = "";
      clausesJson.SpecialConditions = "";
      clausesJson.Warranties = "";
      clausesJson.Exclusions = "";
      clausesJson.Excess = "";
      setClausesJson({ ...clausesJson });
      if (value === null) {
        clausesJson.policyType = "";
        Masters.ClausesWithCType = [];
        Masters.SpecialConditionsWithCType = [];
        Masters.WarrantyWithCType = [];
        Masters.ExclusionsWithCType = [];
        Masters.ExcessWithCType = [];
        setMasters({ ...Masters });
      } else {
        clausesJson.policyType = value.mValue;
        if (clausesJson.ModeOfTransit !== "") {
          let TransitID = 0;
          if (
            value.mValue === "Marine Specific Voyage Import" &&
            clausesJson.ModeOfTransit === "Sea"
          ) {
            TransitID = 2;
          } else if (
            value.mValue === "Marine Specific Voyage Import" &&
            clausesJson.ModeOfTransit === "Air"
          ) {
            TransitID = 3;
          } else if (
            value.mValue === "Marine Specific Voyage Import" &&
            clausesJson.ModeOfTransit === "Courier"
          ) {
            TransitID = 4;
          } else if (
            value.mValue === "Marine Specific Voyage Import" &&
            clausesJson.ModeOfTransit === "Rail / Road"
          ) {
            TransitID = 5;
          } else if (
            value.mValue === "Marine Specific Voyage Inland" &&
            clausesJson.ModeOfTransit === "Sea"
          ) {
            TransitID = 10;
          } else if (
            value.mValue === "Marine Specific Voyage Inland" &&
            clausesJson.ModeOfTransit === "Air"
          ) {
            TransitID = 12;
          } else if (
            value.mValue === "Marine Specific Voyage Inland" &&
            clausesJson.ModeOfTransit === "Courier"
          ) {
            TransitID = 11;
          } else if (
            value.mValue === "Marine Specific Voyage Inland" &&
            clausesJson.ModeOfTransit === "Rail / Road"
          ) {
            TransitID = 13;
          } else if (
            value.mValue === "Marine Specific Voyage Export" &&
            clausesJson.ModeOfTransit === "Sea"
          ) {
            TransitID = 8;
          } else if (
            value.mValue === "Marine Specific Voyage Export" &&
            clausesJson.ModeOfTransit === "Air"
          ) {
            TransitID = 6;
          } else if (
            value.mValue === "Marine Specific Voyage Export" &&
            clausesJson.ModeOfTransit === "Courier"
          ) {
            TransitID = 7;
          } else if (
            value.mValue === "Marine Specific Voyage Export" &&
            clausesJson.ModeOfTransit === "Rail / Road"
          ) {
            TransitID = 9;
          }
          setTransitId(TransitID);
          const jsonvalue = { TransitId: TransitID };
          const ClausesWarranty = await fetchMMVData(872, "Cargoclauses", jsonvalue);
          Masters.ClausesWarrantyExclusionsExcessWithoutCType = [...ClausesWarranty];
          setMasters({ ...Masters });
          console.log("ClausesWarranty1234", ClausesWarranty);
          if (clausesJson.CargoType !== "") {
            const mIDValues = ClausesWarranty.filter(
              (item) => item.CargoId === String(Masters.Cargo.mID)
            );
            console.log("mID values:", mIDValues);

            if (mIDValues.length > 0) {
              //   const splitClauses = mIDValues[0].Clauses.split(" &&");
              //   const splitSpecialConditions = mIDValues[0].SpecialConditions.split(" &&");
              //   const splitWarranty = mIDValues[0].Warranty.split(" &&");
              //   const splitExclusion = mIDValues[0].Exclusion.split(" &&");
              //   const splitExcess = mIDValues[0].Excess.split(" &&");
              const splitClauses =
                mIDValues[0].Clauses && mIDValues[0].Clauses.trim() !== ""
                  ? mIDValues[0].Clauses.split(" &&")
                  : [];
              const splitSpecialConditions =
                mIDValues[0].SpecialConditions && mIDValues[0].SpecialConditions.trim() !== ""
                  ? mIDValues[0].SpecialConditions.split(" &&")
                  : [];
              const splitWarranty =
                mIDValues[0].Warranty && mIDValues[0].Warranty.trim() !== ""
                  ? mIDValues[0].Warranty.split(" &&")
                  : [];
              const splitExclusion =
                mIDValues[0].Exclusion && mIDValues[0].Exclusion.trim() !== ""
                  ? mIDValues[0].Exclusion.split(" &&")
                  : [];
              const splitExcess =
                mIDValues[0].Excess && mIDValues[0].Excess.trim() !== ""
                  ? mIDValues[0].Excess.split(" &&")
                  : [];
              clausesJson.ClausesWarrantyExclusionsExcess = [...mIDValues];

              Masters.ClausesWithCType = [...splitClauses];
              Masters.SpecialConditionsWithCType = [...splitSpecialConditions];
              Masters.WarrantyWithCType = [...splitWarranty];
              Masters.ExclusionsWithCType = [...splitExclusion];
              Masters.ExcessWithCType = [...splitExcess];
              setClausesJson({ ...clausesJson });
              setMasters({ ...Masters });
            } else {
              clausesJson.ClausesWarrantyExclusionsExcess = [];
              setClausesJson({ ...clausesJson });

              Masters.ClausesWithCType = [];
              Masters.SpecialConditionsWithCType = [];
              Masters.WarrantyWithCType = [];
              Masters.ExclusionsWithCType = [];
              Masters.ExcessWithCType = [];
              setMasters({ ...Masters });
              console.log(ClausesWarranty.length, "ClausesWarranty");
            }
          }
        }
        setClausesJson({ ...clausesJson });
      }
      setClausesJson({ ...clausesJson });
    }
    if (type === "ModeOfTransit") {
      clausesJson.Clause = "";
      clausesJson.SpecialConditions = "";
      clausesJson.Warranties = "";
      clausesJson.Exclusions = "";
      clausesJson.Excess = "";
      setClausesJson({ ...clausesJson });
      if (value === null) {
        clausesJson.ModeOfTransit = "";
        Masters.ClausesWithCType = [];
        Masters.SpecialConditionsWithCType = [];
        Masters.WarrantyWithCType = [];
        Masters.ExclusionsWithCType = [];
        Masters.ExcessWithCType = [];
        setMasters({ ...Masters });
      } else {
        clausesJson.ModeOfTransit = value.mValue;
        if (clausesJson.policyType !== "") {
          let TransitID = 0;
          if (
            clausesJson.policyType === "Marine Specific Voyage Import" &&
            value.mValue === "Sea"
          ) {
            TransitID = 2;
          } else if (
            clausesJson.policyType === "Marine Specific Voyage Import" &&
            value.mValue === "Air"
          ) {
            TransitID = 3;
          } else if (
            clausesJson.policyType === "Marine Specific Voyage Import" &&
            value.mValue === "Courier"
          ) {
            TransitID = 4;
          } else if (
            clausesJson.policyType === "Marine Specific Voyage Import" &&
            value.mValue === "Rail / Road"
          ) {
            TransitID = 5;
          } else if (
            clausesJson.policyType === "Marine Specific Voyage Inland" &&
            value.mValue === "Sea"
          ) {
            TransitID = 10;
          } else if (
            clausesJson.policyType === "Marine Specific Voyage Inland" &&
            value.mValue === "Air"
          ) {
            TransitID = 12;
          } else if (
            clausesJson.policyType === "Marine Specific Voyage Inland" &&
            value.mValue === "Courier"
          ) {
            TransitID = 11;
          } else if (
            clausesJson.policyType === "Marine Specific Voyage Inland" &&
            value.mValue === "Rail / Road"
          ) {
            TransitID = 13;
          } else if (
            clausesJson.policyType === "Marine Specific Voyage Export" &&
            value.mValue === "Sea"
          ) {
            TransitID = 8;
          } else if (
            clausesJson.policyType === "Marine Specific Voyage Export" &&
            value.mValue === "Air"
          ) {
            TransitID = 6;
          } else if (
            clausesJson.policyType === "Marine Specific Voyage Export" &&
            value.mValue === "Courier"
          ) {
            TransitID = 7;
          } else if (
            clausesJson.policyType === "Marine Specific Voyage Export" &&
            value.mValue === "Rail / Road"
          ) {
            TransitID = 9;
          }
          setTransitId(TransitID);
          const jsonvalue = { TransitId: TransitID };
          const ClausesWarranty = await fetchMMVData(872, "Cargoclauses", jsonvalue);
          Masters.ClausesWarrantyExclusionsExcessWithoutCType = [...ClausesWarranty];
          setMasters({ ...Masters });
          console.log("ClausesWarranty1234", ClausesWarranty);
          if (clausesJson.CargoType !== "") {
            const mIDValues = ClausesWarranty.filter(
              (item) => item.CargoId === String(Masters.Cargo.mID)
            );
            console.log("mID values:", mIDValues);

            if (mIDValues.length > 0) {
              //   const splitClauses = mIDValues[0].Clauses.split(" &&");
              //   const splitSpecialConditions = mIDValues[0].SpecialConditions.split(" &&");
              //   const splitWarranty = mIDValues[0].Warranty.split(" &&");
              //   const splitExclusion = mIDValues[0].Exclusion.split(" &&");
              //   const splitExcess = mIDValues[0].Excess.split(" &&");
              const splitClauses =
                mIDValues[0].Clauses && mIDValues[0].Clauses.trim() !== ""
                  ? mIDValues[0].Clauses.split(" &&")
                  : [];
              const splitSpecialConditions =
                mIDValues[0].SpecialConditions && mIDValues[0].SpecialConditions.trim() !== ""
                  ? mIDValues[0].SpecialConditions.split(" &&")
                  : [];
              const splitWarranty =
                mIDValues[0].Warranty && mIDValues[0].Warranty.trim() !== ""
                  ? mIDValues[0].Warranty.split(" &&")
                  : [];
              const splitExclusion =
                mIDValues[0].Exclusion && mIDValues[0].Exclusion.trim() !== ""
                  ? mIDValues[0].Exclusion.split(" &&")
                  : [];
              const splitExcess =
                mIDValues[0].Excess && mIDValues[0].Excess.trim() !== ""
                  ? mIDValues[0].Excess.split(" &&")
                  : [];
              clausesJson.ClausesWarrantyExclusionsExcess = [...mIDValues];

              Masters.ClausesWithCType = [...splitClauses];
              Masters.SpecialConditionsWithCType = [...splitSpecialConditions];
              Masters.WarrantyWithCType = [...splitWarranty];
              Masters.ExclusionsWithCType = [...splitExclusion];
              Masters.ExcessWithCType = [...splitExcess];
              setClausesJson({ ...clausesJson });
              setMasters({ ...Masters });
            } else {
              clausesJson.ClausesWarrantyExclusionsExcess = [];
              setClausesJson({ ...clausesJson });

              Masters.ClausesWithCType = [];
              Masters.SpecialConditionsWithCType = [];
              Masters.WarrantyWithCType = [];
              Masters.ExclusionsWithCType = [];
              Masters.ExcessWithCType = [];
              setMasters({ ...Masters });
              console.log(ClausesWarranty.length, "ClausesWarranty");
            }
          }
        }
      }
      setClausesJson({ ...clausesJson });
    }
    if (type === "CargoType") {
      clausesJson.Clause = "";
      clausesJson.SpecialConditions = "";
      clausesJson.Warranties = "";
      clausesJson.Exclusions = "";
      clausesJson.Excess = "";
      setClausesJson({ ...clausesJson });
      if (value === null) {
        clausesJson.CargoType = "";
        Masters.ClausesWithCType = [];
        Masters.SpecialConditionsWithCType = [];
        Masters.WarrantyWithCType = [];
        Masters.ExclusionsWithCType = [];
        Masters.ExcessWithCType = [];
        setMasters({ ...Masters });
      } else {
        clausesJson.CargoType = value.mValue;
        setCargoId(value.mID);
        Masters.Cargo = value;
        setMasters({ ...Masters });
        setClausesJson({ ...clausesJson });
        if (clausesJson.policyType !== "" && clausesJson.ModeOfTransit !== "") {
          let TransitID = 0;
          if (
            clausesJson.policyType === "Marine Specific Voyage Import" &&
            clausesJson.ModeOfTransit === "Sea"
          ) {
            TransitID = 2;
          } else if (
            clausesJson.policyType === "Marine Specific Voyage Import" &&
            clausesJson.ModeOfTransit === "Air"
          ) {
            TransitID = 3;
          } else if (
            clausesJson.policyType === "Marine Specific Voyage Import" &&
            clausesJson.ModeOfTransit === "Courier"
          ) {
            TransitID = 4;
          } else if (
            clausesJson.policyType === "Marine Specific Voyage Import" &&
            clausesJson.ModeOfTransit === "Rail / Road"
          ) {
            TransitID = 5;
          } else if (
            clausesJson.policyType === "Marine Specific Voyage Inland" &&
            clausesJson.ModeOfTransit === "Sea"
          ) {
            TransitID = 10;
          } else if (
            clausesJson.policyType === "Marine Specific Voyage Inland" &&
            clausesJson.ModeOfTransit === "Air"
          ) {
            TransitID = 12;
          } else if (
            clausesJson.policyType === "Marine Specific Voyage Inland" &&
            clausesJson.ModeOfTransit === "Courier"
          ) {
            TransitID = 11;
          } else if (
            clausesJson.policyType === "Marine Specific Voyage Inland" &&
            clausesJson.ModeOfTransit === "Rail / Road"
          ) {
            TransitID = 13;
          } else if (
            clausesJson.policyType === "Marine Specific Voyage Export" &&
            clausesJson.ModeOfTransit === "Sea"
          ) {
            TransitID = 8;
          } else if (
            clausesJson.policyType === "Marine Specific Voyage Export" &&
            clausesJson.ModeOfTransit === "Air"
          ) {
            TransitID = 6;
          } else if (
            clausesJson.policyType === "Marine Specific Voyage Export" &&
            clausesJson.ModeOfTransit === "Courier"
          ) {
            TransitID = 7;
          } else if (
            clausesJson.policyType === "Marine Specific Voyage Export" &&
            clausesJson.ModeOfTransit === "Rail / Road"
          ) {
            TransitID = 9;
          }
          setTransitId(TransitID);
          const jsonvalue = { TransitId: TransitID };
          const ClausesWarranty = await fetchMMVData(872, "Cargoclauses", jsonvalue);
          console.log("ClausesWarranty1234", ClausesWarranty);
          const mIDValues = ClausesWarranty.filter((item) => item.CargoId === String(value.mID));
          console.log("mID values:", mIDValues);

          if (mIDValues.length > 0) {
            // const splitClauses = mIDValues[0].Clauses.split(" &&");
            // const splitSpecialConditions = mIDValues[0].SpecialConditions.split(" &&");
            // const splitWarranty = mIDValues[0].Warranty.split(" &&");
            // const splitExclusion = mIDValues[0].Exclusion.split(" &&");
            // const splitExcess = mIDValues[0].Excess.split(" &&");
            const splitClauses =
              mIDValues[0].Clauses && mIDValues[0].Clauses.trim() !== ""
                ? mIDValues[0].Clauses.split(" &&")
                : [];
            const splitSpecialConditions =
              mIDValues[0].SpecialConditions && mIDValues[0].SpecialConditions.trim() !== ""
                ? mIDValues[0].SpecialConditions.split(" &&")
                : [];
            const splitWarranty =
              mIDValues[0].Warranty && mIDValues[0].Warranty.trim() !== ""
                ? mIDValues[0].Warranty.split(" &&")
                : [];
            const splitExclusion =
              mIDValues[0].Exclusion && mIDValues[0].Exclusion.trim() !== ""
                ? mIDValues[0].Exclusion.split(" &&")
                : [];
            const splitExcess =
              mIDValues[0].Excess && mIDValues[0].Excess.trim() !== ""
                ? mIDValues[0].Excess.split(" &&")
                : [];
            clausesJson.ClausesWarrantyExclusionsExcess = [...mIDValues];
            Masters.ClausesWithCType = [...splitClauses];
            Masters.SpecialConditionsWithCType = [...splitSpecialConditions];
            Masters.WarrantyWithCType = [...splitWarranty];
            Masters.ExclusionsWithCType = [...splitExclusion];
            Masters.ExcessWithCType = [...splitExcess];
            setClausesJson({ ...clausesJson });
            setMasters({ ...Masters });
          } else {
            clausesJson.ClausesWarrantyExclusionsExcess = [];
            setClausesJson({ ...clausesJson });

            Masters.ClausesWithCType = [];
            Masters.SpecialConditionsWithCType = [];
            Masters.WarrantyWithCType = [];
            Masters.ExclusionsWithCType = [];
            Masters.ExcessWithCType = [];
            setMasters({ ...Masters });
            console.log(ClausesWarranty.length, "ClausesWarranty");
          }
        }
      }
    }
  };
  const handleAutoComplete = async (e, type, value) => {
    if (type === "Clauses") {
      clausesJson.Clause = value;
    }
    if (type === "SpecialConditions") {
      clausesJson.SpecialConditions = value;
    }
    if (type === "Warranties") {
      clausesJson.Warranties = value;
    }
    if (type === "Exclusions") {
      clausesJson.Exclusions = value;
    }
    if (type === "Excess") {
      clausesJson.Excess = value;
    }
    setClausesJson({ ...clausesJson });
  };
  const handleUpdateData = async () => {
    setloading(true);
    const mdatalist = await getMasterDatalist();

    console.log(mdatalist, "mdatalist");

    mdatalist.data.map((md, i) => {
      if (md.mType === "MarinePolicyType") {
        setTypeOfPolicy([...mdatalist.data[i].mdata]);
      }
      if (md.mType === "CargoType") {
        setCargoTypee([...mdatalist.data[i].mdata]);
      }
      if (md.mType === "ModeofTransit") {
        setModeOfTransitt([...mdatalist.data[i].mdata]);
      }

      return null;
    });
    const jsonvalue = { TransitId: transitId };
    const ClausesWarranty = await fetchMMVData(872, "Cargoclauses", jsonvalue);
    Masters.ClausesWarrantyExclusionsExcessWithoutCType = [...ClausesWarranty];
    setMasters({ ...Masters });
    console.log("ClausesWarranty1234", ClausesWarranty);
    if (clausesJson.CargoType !== "") {
      const mIDValues = ClausesWarranty.filter(
        (item) => item.CargoId === String(Masters.Cargo.mID)
      );
      console.log("mID values:", mIDValues);

      if (mIDValues.length > 0) {
        // const splitClauses = mIDValues[0].Clauses.split(" &&");
        // const splitSpecialConditions = mIDValues[0].SpecialConditions.split(" &&");
        // const splitWarranty = mIDValues[0].Warranty.split(" &&");
        // const splitExclusion = mIDValues[0].Exclusion.split(" &&");
        // const splitExcess = mIDValues[0].Excess.split(" &&");
        const splitClauses =
          mIDValues[0].Clauses && mIDValues[0].Clauses.trim() !== ""
            ? mIDValues[0].Clauses.split(" &&")
            : [];
        const splitSpecialConditions =
          mIDValues[0].SpecialConditions && mIDValues[0].SpecialConditions.trim() !== ""
            ? mIDValues[0].SpecialConditions.split(" &&")
            : [];
        const splitWarranty =
          mIDValues[0].Warranty && mIDValues[0].Warranty.trim() !== ""
            ? mIDValues[0].Warranty.split(" &&")
            : [];
        const splitExclusion =
          mIDValues[0].Exclusion && mIDValues[0].Exclusion.trim() !== ""
            ? mIDValues[0].Exclusion.split(" &&")
            : [];
        const splitExcess =
          mIDValues[0].Excess && mIDValues[0].Excess.trim() !== ""
            ? mIDValues[0].Excess.split(" &&")
            : [];
        clausesJson.ClausesWarrantyExclusionsExcess = [...mIDValues];

        Masters.ClausesWithCType = [...splitClauses];
        Masters.SpecialConditionsWithCType = [...splitSpecialConditions];
        Masters.WarrantyWithCType = [...splitWarranty];
        Masters.ExclusionsWithCType = [...splitExclusion];
        Masters.ExcessWithCType = [...splitExcess];
        setClausesJson({ ...clausesJson });
        setMasters({ ...Masters });
        setloading(false);
      } else {
        clausesJson.ClausesWarrantyExclusionsExcess = [];
        setClausesJson({ ...clausesJson });

        Masters.ClausesWithCType = [];
        Masters.SpecialConditionsWithCType = [];
        Masters.WarrantyWithCType = [];
        Masters.ExclusionsWithCType = [];
        Masters.ExcessWithCType = [];
        setMasters({ ...Masters });
        setloading(false);
        console.log(ClausesWarranty.length, "ClausesWarranty");
      }
    }
  };

  const handleInput = (e) => {
    if (e.target.name === "Cargo") {
      clausesJson.NewCargo = e.target.value;
    } else if (e.target.name === "Clause") {
      clausesJson.NewClause = e.target.value;
    } else if (e.target.name === "SpecialConditions") {
      clausesJson.NewSpecialConditions = e.target.value;
    } else if (e.target.name === "Warranty") {
      clausesJson.NewWarranty = e.target.value;
    } else if (e.target.name === "Exclusion") {
      clausesJson.NewExclusion = e.target.value;
    } else if (e.target.name === "Excess") {
      clausesJson.NewExcess = e.target.value;
    }
    setClausesJson({ ...clausesJson });
  };

  const handleDeleteClick = async (selectedOption, type) => {
    swal({
      title: "Are you sure to delete?",
      text: "This action cannot be undone!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (confirmed) => {
      if (confirmed) {
        setloading(true);
        let deleteclause = [];

        if (type === "Cargo") {
          deleteclause = [
            {
              mID: selectedOption.mID,
              CargoId: "",
              PropertyToDelete: type,
            },
          ];
        } else {
          deleteclause = [
            {
              mID: transitId,

              DeleteData: selectedOption,
              CargoId: cargoId,
              PropertyToDelete: type,
            },
          ];
        }

        const response = await postRequest("Policy/DeleteClauses", deleteclause);

        if (response.data.status === 2) {
          swal("Success", "The item has been successfully deleted.", "success");
          if (type === "Cargo") {
            clausesJson.CargoType = "";
          } else if (type === "Clauses") {
            clausesJson.Clause = "";
          } else if (type === "SpecialConditions") {
            clausesJson.SpecialConditions = "";
          } else if (type === "Warranties") {
            clausesJson.Warranties = "";
          } else if (type === "Exclusions") {
            clausesJson.Exclusions = "";
          } else if (type === "Excess") {
            clausesJson.Excess = "";
          }
          setClausesJson({ ...clausesJson });
        } else {
          swal("Error", "An error occurred while deleting the item.", "error");
          setloading(false);
        }

        handleUpdateData();
      }
    });
  };

  const handleUpdate = async () => {
    if (
      clausesJson.NewCargo !== "" &&
      (clausesJson.policyType === "" || clausesJson.ModeOfTransit === "")
    ) {
      swal({
        icon: "error",

        text: "Please Enter the required fields",
      });
      Masters.Flags.errorFlag = true;
      setMasters({ ...Masters });
    } else if (
      clausesJson.NewCargo === "" &&
      (clausesJson.policyType === "" ||
        clausesJson.ModeOfTransit === "" ||
        clausesJson.CargoType === "")
    ) {
      swal({
        icon: "error",

        text: "Please Enter the required fields",
      });
      Masters.Flags.errorFlag = true;
      setMasters({ ...Masters });
    } else if (
      clausesJson.NewCargo !== "" &&
      (clausesJson.NewClause !== "" ||
        clausesJson.NewSpecialConditions !== "" ||
        clausesJson.NewWarranty !== "" ||
        clausesJson.NewExclusion !== "" ||
        clausesJson.NewExcess !== "")
    ) {
      swal({
        icon: "error",

        text: "Please Update CargoType First",
      });
      clausesJson.NewClause = "";
      clausesJson.NewSpecialConditions = "";
      clausesJson.NewWarranty = "";
      clausesJson.NewExclusion = "";
      clausesJson.NewExcess = "";
      setClausesJson({ ...clausesJson });
      Masters.showInputClauseBox = false;
      Masters.showInputSpecialConditionsBox = false;
      Masters.showInputWarrantyBox = false;
      Masters.showInputExclusionBox = false;
      Masters.showInputExcessBox = false;
      setMasters({ ...Masters });
    } else {
      let addclause;
      if (clausesJson.NewCargo !== "") {
        addclause = {
          cargoDescription: clausesJson.NewCargo,
          specialConditions: clausesJson.NewSpecialConditions,
          clauses: clausesJson.NewClause,
          warranties: clausesJson.NewWarranty,
          exclusions: clausesJson.NewExclusion,
          excess: clausesJson.NewExcess,
          cargoId: "",
        };
      } else {
        addclause = {
          cargoDescription: clausesJson.CargoType,
          specialConditions: clausesJson.NewSpecialConditions,
          clauses: clausesJson.NewClause,
          warranties: clausesJson.NewWarranty,
          exclusions: clausesJson.NewExclusion,
          excess: clausesJson.NewExcess,
          cargoId: `${cargoId}`,
        };
      }
      setloading(true);
      const response = await postRequest(`Policy/UpdateClauses?TransitID=${transitId}`, addclause);
      if (response.data.status === 2) {
        swal("Success", "The item has been successfully updated.", "success");
        Masters.showInputCargoBox = false;
        Masters.showInputClauseBox = false;
        Masters.showInputSpecialConditionsBox = false;
        Masters.showInputWarrantyBox = false;
        Masters.showInputExclusionBox = false;
        Masters.showInputExcessBox = false;
      } else {
        swal("Error", "An error occurred while updating the item.", "error");
        setloading(false);
      }
      clausesJson.NewCargo = "";
      clausesJson.NewClause = "";
      clausesJson.NewSpecialConditions = "";
      clausesJson.NewWarranty = "";
      clausesJson.NewExclusion = "";
      clausesJson.NewExcess = "";
      setClausesJson({ ...clausesJson });
      handleUpdateData();
    }
  };

  const handleClear = () => {
    clausesJson.policyType = "";
    clausesJson.ModeOfTransit = "";
    clausesJson.CargoType = "";
    clausesJson.NewClause = "";
    clausesJson.NewSpecialConditions = "";
    clausesJson.NewWarranty = "";
    clausesJson.NewExclusion = "";
    clausesJson.NewExcess = "";
    Masters.ClausesWithCType = [];
    Masters.SpecialConditionsWithCType = [];
    Masters.WarrantyWithCType = [];
    Masters.ExclusionsWithCType = [];
    Masters.ExcessWithCType = [];
    setMasters({ ...Masters });
    setClausesJson({ ...clausesJson });
  };

  const handleAddClick = (type) => {
    if (type === "Cargo") {
      Masters.showInputCargoBox = true;
    } else if (type === "Clause") {
      Masters.showInputClauseBox = true;
    } else if (type === "SpecialConditions") {
      Masters.showInputSpecialConditionsBox = true;
    } else if (type === "Warranty") {
      Masters.showInputWarrantyBox = true;
    } else if (type === "Exclusion") {
      Masters.showInputExclusionBox = true;
    } else if (type === "Excess") {
      Masters.showInputExcessBox = true;
    }
    setMasters({ ...Masters });
    setClausesJson({ ...clausesJson });
  };
  const handleDeleteInputBox = (type) => {
    if (type === "Cargo") {
      Masters.showInputCargoBox = false;
      clausesJson.NewCargo = "";
    } else if (type === "Clause") {
      Masters.showInputClauseBox = false;
      clausesJson.NewClause = "";
    } else if (type === "SpecialConditions") {
      Masters.showInputSpecialConditionsBox = false;
      clausesJson.NewSpecialConditions = "";
    } else if (type === "Warranty") {
      Masters.showInputWarrantyBox = false;

      clausesJson.NewWarranty = "";
    } else if (type === "Exclusion") {
      Masters.showInputExclusionBox = false;
      clausesJson.NewExclusion = "";
    } else if (type === "Excess") {
      Masters.showInputExcessBox = false;
      clausesJson.NewExcess = "";
    }
    setMasters({ ...Masters });
    setClausesJson({ ...clausesJson });
  };
  return (
    <MDBox pt={2}>
      <Backdrop
        sx={{ color: "primary", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress />
      </Backdrop>
      <Card sx={{ borderRadius: "1px", padding: "16px" }}>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDTypography variant="h6" color="primary" sx={{ fontSize: "16px", mb: "15px" }}>
              Type of Policy
            </MDTypography>
            <Autocomplete
              id="Type of Policy"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              options={
                TypeOfPolicy.filter((option) => option.mValue !== "Marine Specifc Voyage Duty") ||
                []
              }
              value={{ mValue: clausesJson.policyType }}
              getOptionLabel={(option) => option.mValue}
              onChange={(e, value) => handleSetAutoComplete(e, "Type of Policy", value)}
              renderInput={(params) => <MDInput {...params} label="Type of Policy" required />}
            />
            {Masters.Flags.errorFlag && clausesJson.policyType === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                Please fill this Field
              </MDTypography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDTypography variant="h6" color="primary" sx={{ fontSize: "16px", mb: "15px" }}>
              Mode of Transit
            </MDTypography>
            <Autocomplete
              id="Mode of Transit"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              options={
                ModeOfTransitt.filter(
                  (option) =>
                    option.mValue !== "Others" &&
                    option.mValue !== "Parcel Post" &&
                    option.mValue !== "Registered POST"
                ) || []
              }
              value={{ mValue: clausesJson.ModeOfTransit }}
              getOptionLabel={(option) => option.mValue}
              onChange={(e, value) => handleSetAutoComplete(e, "ModeOfTransit", value)}
              renderInput={(params) => <MDInput {...params} label="Mode of Transit" required />}
            />
            {Masters.Flags.errorFlag && clausesJson.ModeOfTransit === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                Please fill this Field
              </MDTypography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDTypography variant="h6" color="primary" sx={{ fontSize: "16px", mb: "15px" }}>
              Cargo Type
            </MDTypography>
            <Autocomplete
              id="Cargo Type"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              options={CargoTypee || []}
              value={{ mValue: clausesJson.CargoType }}
              getOptionLabel={(option) => option.mValue}
              onChange={(e, value) => handleSetAutoComplete(e, "CargoType", value)}
              renderOption={(props, option) => (
                <li {...props}>
                  {option.mValue}

                  <div style={{ marginLeft: "auto" }}>
                    <IconButton onClick={() => handleDeleteClick(option, "Cargo")}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </li>
              )}
              renderInput={(params) => <MDInput {...params} label="Cargo Type" required />}
            />
            {Masters.Flags.errorFlag && clausesJson.CargoType === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                Please fill this Field
              </MDTypography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
            <MDTypography variant="h6" sx={{ color: "Black", fontSize: "16px", mb: "15px" }}>
              &nbsp;
            </MDTypography>
            <IconButton onClick={() => handleAddClick("Cargo")} style={{ marginLeft: "auto" }}>
              <AddIcon />
            </IconButton>
          </Grid>
          {Masters.showInputCargoBox && (
            <>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDTypography variant="h6" sx={{ color: "Black", fontSize: "16px", mb: "15px" }}>
                  {" "}
                </MDTypography>
                <MDInput
                  label="New Cargo"
                  name="Cargo"
                  fullWidth
                  required
                  value={clausesJson.NewCargo}
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                <MDTypography variant="h6" sx={{ color: "Black", fontSize: "16px", mb: "15px" }}>
                  {" "}
                </MDTypography>
                <IconButton onClick={() => handleDeleteInputBox("Cargo")}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              </Grid>
            </>
          )}
        </Grid>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
            <MDTypography variant="h6" sx={{ color: "Black", fontSize: "16px", mb: "15px" }}>
              Clauses
            </MDTypography>
            <Autocomplete
              id="Clauses"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              options={(Masters.ClausesWithCType || []).filter(
                (option) => option && option.trim() !== ""
              )}
              getOptionLabel={(option) => option}
              value={clausesJson.Clause}
              onChange={(e, value) => handleAutoComplete(e, "Clauses", value)}
              renderOption={(props, option) => (
                <li {...props}>
                  {option}
                  <div style={{ marginLeft: "auto" }}>
                    <IconButton onClick={() => handleDeleteClick(option, "Clauses")}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </li>
              )}
              renderInput={(params) => <MDInput {...params} label="Clauses" required />}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
            <MDTypography variant="h6" sx={{ color: "Black", fontSize: "16px", mb: "15px" }}>
              &nbsp;
            </MDTypography>
            <IconButton onClick={() => handleAddClick("Clause")}>
              <AddIcon />
            </IconButton>
          </Grid>
          {Masters.showInputClauseBox && (
            <>
              <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                <MDTypography variant="h6" sx={{ color: "Black", fontSize: "16px", mb: "15px" }}>
                  &nbsp;
                </MDTypography>
                <MDInput
                  label="New Clauses"
                  name="Clause"
                  fullWidth
                  required
                  value={clausesJson.NewClause}
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                <MDTypography variant="h6" sx={{ color: "Black", fontSize: "16px", mb: "15px" }}>
                  &nbsp;
                </MDTypography>
                <IconButton onClick={() => handleDeleteInputBox("Clause")}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              </Grid>
            </>
          )}
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
            <MDTypography
              variant="h6"
              color="primary"
              sx={{ color: "Black", fontSize: "16px", mb: "15px" }}
            >
              Special Conditions
            </MDTypography>
            <Autocomplete
              id="Special Conditions"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              options={(Masters.SpecialConditionsWithCType || []).filter(
                (option) => option && option.trim() !== ""
              )}
              getOptionLabel={(option) => option}
              value={clausesJson.SpecialConditions}
              onChange={(e, value) => handleAutoComplete(e, "SpecialConditions", value)}
              renderOption={(props, option) => (
                <li {...props}>
                  {option}
                  <div style={{ marginLeft: "auto" }}>
                    <IconButton onClick={() => handleDeleteClick(option, "SpecialConditions")}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </li>
              )}
              renderInput={(params) => <MDInput {...params} label="Special Conditions" required />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
            <MDTypography variant="h6" sx={{ color: "Black", fontSize: "16px", mb: "15px" }}>
              &nbsp;
            </MDTypography>
            <IconButton onClick={() => handleAddClick("SpecialConditions")}>
              <AddIcon />
            </IconButton>
          </Grid>
          {Masters.showInputSpecialConditionsBox && (
            <>
              <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                <MDTypography variant="h6" sx={{ color: "Black", fontSize: "16px", mb: "15px" }}>
                  &nbsp;
                </MDTypography>
                <MDInput
                  label="New SpecialConditions"
                  name="SpecialConditions"
                  fullWidth
                  required
                  value={clausesJson.NewSpecialConditions}
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                <MDTypography variant="h6" sx={{ color: "Black", fontSize: "16px", mb: "15px" }}>
                  &nbsp;
                </MDTypography>
                <IconButton onClick={() => handleDeleteInputBox("SpecialConditions")}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              </Grid>
            </>
          )}
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
            <MDTypography
              variant="h6"
              color="primary"
              sx={{ color: "Black", fontSize: "16px", mb: "15px" }}
            >
              Warranties
            </MDTypography>
            <Autocomplete
              id="Warranties"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              options={(Masters.WarrantyWithCType || []).filter(
                (option) => option && option.trim() !== ""
              )}
              getOptionLabel={(option) => option}
              value={clausesJson.Warranties}
              onChange={(e, value) => handleAutoComplete(e, "Warranties", value)}
              renderOption={(props, option) => (
                <li {...props}>
                  {option}
                  <div style={{ marginLeft: "auto" }}>
                    <IconButton onClick={() => handleDeleteClick(option, "Warranties")}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </li>
              )}
              renderInput={(params) => <MDInput {...params} label="Warranties" required />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
            <MDTypography variant="h6" sx={{ color: "Black", fontSize: "16px", mb: "15px" }}>
              &nbsp;
            </MDTypography>
            <IconButton onClick={() => handleAddClick("Warranty")}>
              <AddIcon />
            </IconButton>
          </Grid>
          {Masters.showInputWarrantyBox && (
            <>
              <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                <MDTypography variant="h6" sx={{ color: "Black", fontSize: "16px", mb: "15px" }}>
                  &nbsp;
                </MDTypography>
                <MDInput
                  label="New Warranty"
                  name="Warranty"
                  fullWidth
                  required
                  value={clausesJson.NewWarranty}
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                <MDTypography variant="h6" sx={{ color: "Black", fontSize: "16px", mb: "15px" }}>
                  &nbsp;
                </MDTypography>
                <IconButton onClick={() => handleDeleteInputBox("Warranty")}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              </Grid>
            </>
          )}
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
            <MDTypography
              variant="h6"
              color="primary"
              sx={{ color: "Black", fontSize: "16px", mb: "15px" }}
            >
              Exclusions
            </MDTypography>
            <Autocomplete
              id="Exclusions"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              options={(Masters.ExclusionsWithCType || []).filter(
                (option) => option && option.trim() !== ""
              )}
              getOptionLabel={(option) => option}
              value={clausesJson.Exclusions}
              onChange={(e, value) => handleAutoComplete(e, "Exclusions", value)}
              renderOption={(props, option) => (
                <li {...props}>
                  {option}
                  <div style={{ marginLeft: "auto" }}>
                    <IconButton onClick={() => handleDeleteClick(option, "Exclusions")}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </li>
              )}
              renderInput={(params) => <MDInput {...params} label="Exclusions" required />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
            <MDTypography variant="h6" sx={{ color: "Black", fontSize: "16px", mb: "15px" }}>
              &nbsp;
            </MDTypography>
            <IconButton onClick={() => handleAddClick("Exclusion")}>
              <AddIcon />
            </IconButton>
          </Grid>
          {Masters.showInputExclusionBox && (
            <>
              <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                <MDTypography variant="h6" sx={{ color: "Black", fontSize: "16px", mb: "15px" }}>
                  &nbsp;
                </MDTypography>
                <MDInput
                  label="New Exclusion"
                  name="Exclusion"
                  fullWidth
                  required
                  value={clausesJson.NewExclusion}
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                <MDTypography variant="h6" sx={{ color: "Black", fontSize: "16px", mb: "15px" }}>
                  &nbsp;
                </MDTypography>
                <IconButton onClick={() => handleDeleteInputBox("Exclusion")}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              </Grid>
            </>
          )}
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
            <MDTypography
              variant="h6"
              color="primary"
              sx={{ color: "Black", fontSize: "16px", mb: "15px" }}
            >
              Excess
            </MDTypography>
            <Autocomplete
              id="Excess"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              options={(Masters.ExcessWithCType || []).filter(
                (option) => option && option.trim() !== ""
              )}
              getOptionLabel={(option) => option}
              value={clausesJson.Excess}
              onChange={(e, value) => handleAutoComplete(e, "Excess", value)}
              renderOption={(props, option) => (
                <li {...props}>
                  {option}
                  <div style={{ marginLeft: "auto" }}>
                    <IconButton onClick={() => handleDeleteClick(option, "Excess")}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </li>
              )}
              renderInput={(params) => <MDInput {...params} label="Excess" required />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
            <MDTypography variant="h6" sx={{ color: "Black", fontSize: "16px", mb: "15px" }}>
              &nbsp;
            </MDTypography>
            <IconButton onClick={() => handleAddClick("Excess")}>
              <AddIcon />
            </IconButton>
          </Grid>
          {Masters.showInputExcessBox && (
            <>
              <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                <MDTypography variant="h6" sx={{ color: "Black", fontSize: "16px", mb: "15px" }}>
                  &nbsp;
                </MDTypography>
                <MDInput
                  label="New Excess"
                  name="Excess"
                  fullWidth
                  required
                  value={clausesJson.NewExcess}
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                <MDTypography variant="h6" sx={{ color: "Black", fontSize: "16px", mb: "15px" }}>
                  &nbsp;
                </MDTypography>
                <IconButton onClick={() => handleDeleteInputBox("Excess")}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              </Grid>
            </>
          )}
        </Grid>
        <Grid container justifyContent="center" p={2}>
          <MDBox sx={{ margin: "0 1px" }}>
            <MDButton variant="contained" sx={{ borderRadius: "1px" }} onClick={handleClear}>
              Clear
            </MDButton>
          </MDBox>
          <MDBox sx={{ margin: "0 8px" }}>
            <MDButton variant="contained" onClick={handleUpdate} sx={{ borderRadius: "1px" }}>
              Update
            </MDButton>
          </MDBox>
        </Grid>
      </Card>
    </MDBox>
  );
}
export default ClausesUpdate;
