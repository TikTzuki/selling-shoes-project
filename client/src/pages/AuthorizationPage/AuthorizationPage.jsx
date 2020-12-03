import { Button, Grid } from "@material-ui/core";
import React, { useState } from "react";

export default function AuthorizationPage() {
  const [appkey, setAppkey] = useState(122973);
  return (
    <Grid container>
      <div className="flex h-screen">
        <Button component={`a`} variant="contained" color="primary" target="_blank" href={`https://auth.lazada.com/oauth/authorize?response_type=code&force_auth=true&redirect_uri=${`https://restful-api-spring-laz.herokuapp.com/auth/code`}&client_id=${appkey}`} >
          Ủy quyền tài khoản laz seller
        </Button>
      </div>
    </Grid>
  );
}