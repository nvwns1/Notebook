import React from "react";
import Notes from "./Notes";

function HomeHome(props) {
  let {showAlert} = props;
  return (
    <div>
    <Notes showAlert={showAlert}/>
    </div>
  );
}

export default HomeHome;
