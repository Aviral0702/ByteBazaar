import React from "react";
import { useEffect,useState } from "react";
import { MarketPlaceProducts } from "../components/MarketplaceProducts";
import SidebarMarketplace from "../components/SidebarForMarketplace";

const categories = [
    "Accounting",
    "Business Intelligence (BI)",
    "Collaboration",
    "Communication",
    "Content Management System (CMS)",
    "CRM (Customer Relationship Management)",
    "Customer Support",
    "Cybersecurity",
    "Design",
    "Dev Tools (Development Tools)",
    "eCommerce",
    "Enterprise Resource Planning (ERP)",
    "Finance",
    "HR, Recruiting (Human Resources, Recruiting)",
    "Help Desk / Ticketing",
    "Inventory Management",
    "Legal, Compliance",
    "Marketing",
    "Admin (Administrative Tools)",
    "Partner Management",
    "Photo, Video",
    "Point of Sale (POS)",
    "Productivity",
    "Project Management",
    "Sales, Lead Generation",
    "SCM (Supply Chain Management)",
    "Social Media",
    "Software Testing",
    "Task Management",
    "Time Tracking / Timesheet",
    "Website Builders"
];

export const Marketplace = () => {
    const [category, setCategories] = useState([]);
    setCategories(categories);
    return (
        <div>
            <SidebarMarketplace categories={category} />
            <MarketPlaceProducts />
        </div>
    );
}