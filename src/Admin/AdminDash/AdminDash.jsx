import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AComment from "./AdminTabs/AComment";
import APurchases from "./AdminTabs/APurchases";
import DonatedItems from "./AdminTabs/DonatedItems";
import DonationList from "./AdminTabs/DonationList";
import NeedyUsers from "./AdminTabs/NeedyUsers";
import UsersList from "./AdminTabs/UsersList";
import UsersPost from "./AdminTabs/UsersPost";

function NeedyDashbord() {
  return (
    <Tabs
      defaultActiveKey="users"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="users" title="Users">
        <UsersList />
      </Tab>
      <Tab eventKey="needy" title="Needy Users">
        <NeedyUsers />
      </Tab>
      <Tab eventKey="reqItem" title="Requested Items">
        <DonationList />
      </Tab>
      <Tab eventKey="donatedItem" title="Donated Items">
        <DonatedItems />
      </Tab>
      <Tab eventKey="posts" title="Posts">
        <UsersPost />
      </Tab>
      <Tab eventKey="adminComment" title="Comments">
        <AComment />
      </Tab>
      <Tab eventKey="purchase" title="Purchases">
        <APurchases />
      </Tab>
    </Tabs>
  );
}

export default NeedyDashbord;
