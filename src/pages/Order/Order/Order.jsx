import { useState } from "react";
import shopImg from "../../../assets/shop/banner2.jpg";
import Cover from "../../Shared/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMenu from "../../../hooks/useMenu";
import OrderTab from "./OrderTab/OrderTab";
import { useParams } from "react-router-dom";

const Order = () => {
    const {category} = useParams()
    const categories = ['salad', 'pizza', 'dessert', 'soup', 'drinks']
    const  initialIndex = categories.indexOf(category)
    const [tabIndex, setTabIndex] = useState(initialIndex)
    
    console.log(category);
    const [menu] = useMenu()
    const salad = menu.filter((item) => item.category === 'salad')
    const desserts = menu.filter((item) => item.category === 'dessert')
    const pizza = menu.filter((item) => item.category === 'pizza')
    const drinks = menu.filter((item) => item.category === 'drinks')
    const soup = menu.filter((item) => item.category === 'soup')
  return (
    <div>
      <Cover img={shopImg} title={"Order Food"}></Cover>
      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Salad</Tab>
          <Tab>Pizza</Tab>
          <Tab>Dessert</Tab>
          <Tab>Soap</Tab>
          <Tab>Drinks</Tab>
        </TabList>
        <TabPanel>
            <OrderTab items={salad}></OrderTab>
        </TabPanel>
        <TabPanel>
            <OrderTab items={pizza}></OrderTab>
        </TabPanel>
        <TabPanel>
            <OrderTab items={desserts}></OrderTab>
        </TabPanel>
        <TabPanel>
            <OrderTab items={soup}></OrderTab>
        </TabPanel>
        <TabPanel>
            <OrderTab items={drinks}></OrderTab>
        </TabPanel>

        
      </Tabs>
    </div>
  );
};

export default Order;
