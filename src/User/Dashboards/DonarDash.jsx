import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import DDonate from "./DonorTabs/DDonate";
import DonateItems from "./DonorTabs/DonateItems";

const DonarDash = () => {
  return (
    <Tabs
      defaultActiveKey="items"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="items" title="Request Items">
        <DonateItems />
      </Tab>
      <Tab eventKey="donate" title="Donate">
        <DDonate />
      </Tab>
    </Tabs>
  );
};

export default DonarDash;
