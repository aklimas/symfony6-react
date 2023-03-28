import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout"
import Swal from 'sweetalert2'
import axios from 'axios';

function Breadcrumb(props) {
    return (
        <Layout>
            <div className="pagetitle row ">
                <div className="col-12 col-lg-auto d-none d-lg-block">
                    <h1>{ props.title }</h1>
                </div>
                {props.children}
            </div>
        </Layout>
    );
}

export default Breadcrumb;


