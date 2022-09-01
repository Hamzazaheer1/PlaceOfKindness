import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import NeedyDash from "./NeedyTabs/NeedyDash";
import NeedyPosts from "./NeedyTabs/NeedyPosts";

function NeedyDashbord() {
  return (
    <Tabs
      defaultActiveKey="Donated"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="reqItem" title="Request Items">
        <NeedyDash />
      </Tab>
      <Tab eventKey="posts" title="Posts">
        <NeedyPosts />
      </Tab>
    </Tabs>
  );
}

export default NeedyDashbord;
