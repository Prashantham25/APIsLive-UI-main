import { Grid, Skeleton, Stack } from "@mui/material";
import MDBox from "../../../../components/MDBox";

function SkeltonLoader() {
  return (
    <MDBox>
      <Grid container spacing={2} p={3}>
        {/* <Grid item xs={2.4} sm={2.4} md={2.4} lg={2.4} xl={2.4} xxl={2.4}>
          <Skeleton variant="circular" width={60} height={60} />
        </Grid>
        <Grid item xs={2.4} sm={2.4} md={2.4} lg={2.4} xl={2.4} xxl={2.4}>
          <Skeleton variant="circular" width={60} height={60} />
        </Grid>
        <Grid item xs={2.4} sm={2.4} md={2.4} lg={2.4} xl={2.4} xxl={2.4}>
          <Skeleton variant="circular" width={60} height={60} />
        </Grid>
        <Grid item xs={2.4} sm={2.4} md={2.4} lg={2.4} xl={2.4} xxl={2.4}>
          <Skeleton variant="circular" width={60} height={60} />
        </Grid>
        <Grid item xs={2.4} sm={2.4} md={2.4} lg={2.4} xl={2.4} xxl={2.4}>
          <Skeleton variant="circular" width={60} height={60} />
        </Grid> */}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={240} />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Skeleton variant="rounded" width="100%" height={60} />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Skeleton variant="rounded" width="100%" height={60} />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Skeleton variant="rounded" width="100%" height={60} />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Skeleton variant="rounded" width="100%" height={60} />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Skeleton variant="rounded" width="100%" height={60} />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Skeleton variant="rounded" width="100%" height={60} />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Skeleton variant="rounded" width="100%" height={60} />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Skeleton variant="rounded" width="100%" height={60} />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Skeleton variant="rounded" width="100%" height={60} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={240} />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Skeleton variant="rounded" width="100%" height={60} />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Skeleton variant="rounded" width="100%" height={60} />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Skeleton variant="rounded" width="100%" height={60} />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Skeleton variant="rounded" width="100%" height={60} />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Skeleton variant="rounded" width="100%" height={60} />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Skeleton variant="rounded" width="100%" height={60} />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Skeleton variant="rounded" width="100%" height={60} />
        </Grid>
      </Grid>
      <MDBox sx={{ display: "flex", justifyContent: "space-between" }} p={1}>
        <MDBox>
          <Skeleton variant="rounded" width={120} height={50} />
        </MDBox>
        <Stack direction="row" spacing={2}>
          <Skeleton variant="rounded" width={120} height={50} />
          <Skeleton variant="rounded" width={120} height={50} />
        </Stack>
      </MDBox>
    </MDBox>
  );
}
export default SkeltonLoader;
