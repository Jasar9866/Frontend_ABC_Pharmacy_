import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar" style={{ backgroundColor: "#0B2952" }}>
        <div className="container-fluid ">
          <h4 style={{ color: "whitesmoke" }}>
            <i style={{ fontSize: "30px" }}>ABC Pharmacy </i>
            <p></p>
          </h4>

          <div className="d-flex justify-content-center">
            <Link className="btn btn-outline-info mx-4" to="/Invoices">
              Create Invoice
            </Link>
            <Link className="btn btn-outline-info mx-4" to="/Items">
              Create Item
            </Link>
            <Link className="btn btn-outline-info mx-2" to="/SendEmail">
              Contact us
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
