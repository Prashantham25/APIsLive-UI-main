import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import swal from "sweetalert";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import { TransactionImport } from "../data";

function UploadReport() {
  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);
  };
  const handleSubmit = async (files) => {
    const data = new FormData();
    if (files.length > 0) {
      for (let i = 0; i < files.length; i += 1) {
        data.append(files[i].file.name, files[i].file);
      }
      console.log("data", data);
    }

    const resp = await TransactionImport(data);

    console.log("fields", resp);
    if (resp.status === 7) {
      swal({
        icon: "error",

        text: resp.responseMessage,
      });
    }
    if (resp.status === 1) {
      swal({
        icon: "success",

        text: resp.responseMessage,
      });
    }

    // if (
    //   fields.rateName === "" ||
    //   fields.rateObj === "" ||
    //   fields.startDate === "" ||
    //   fields.endDate === ""
    // ) {
    //   swal({
    //     icon: "error",

    //     text: "some fields are missing",
    //   });
    // } else {
    //   const UploadFile = await RateUpload(fields, data);
    //   console.log("upload", UploadFile);
    //   swal({
    //     icon: "success",

    //     text: "Rate table saved successfully",
    //   });
    // }
  };

  return (
    <MDBox>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary>
          <MDTypography>Upload Bank File</MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Dropzone
            maxFiles={1}
            onChangeStatus={handleChangeStatus}
            onSubmit={handleSubmit}
            inputContent="Drop A File"
            styles={{
              dropzone: { height: 300 },
              dropzoneActive: { borderColor: "green" },
            }}
            accept=""
            // sx={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
          />
        </AccordionDetails>
      </Accordion>
    </MDBox>
  );
}
export default UploadReport;
