import React from "react";
import Policies from "../page";
function page({ params }) {
  return <Policies policy={params.policy} />;
}

export default page;
