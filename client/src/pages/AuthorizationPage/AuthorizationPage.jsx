import { Grid } from "@material-ui/core";
import React from "react";

export default function AuthorizationPage() {
  return (
    <Grid container>
      <div className="flex h-screen">
        <a href="https://auth.lazada.com/oauth/authorize?response_type=code&force_auth=true&redirect_uri=${app call back url}&client_id=122973">
          Laz Authorization
        </a>
      </div>
    </Grid>
  );
}