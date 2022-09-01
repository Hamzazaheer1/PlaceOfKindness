import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Donated from "../ReqComponents/Donated";
import RequestDona from "../ReqComponents/RequestDona";

function ReqDash() {
  return (
    <Tabs
      defaultActiveKey="Donated"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="Donated" title="Donated Items">
        <Donated />
      </Tab>
      <Tab eventKey="Request" title="Requested Donations">
        <RequestDona />
      </Tab>
    </Tabs>
  );
}

export default ReqDash;
