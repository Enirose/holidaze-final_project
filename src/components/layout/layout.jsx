import React from "react";
import Footer from "../footer/footer";
import NavContainer from "../nav/navbar";
import "../../styles/custom.scss"
import { Outlet } from "react-router-dom";


export default function Layout () {
    return (
        <div>
            <NavContainer/>
            <Outlet/>
            <Footer/>
        </div>
    )
}