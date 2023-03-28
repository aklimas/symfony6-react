import React, {useState, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import Layout from "../../../components/Layout"
import Swal from 'sweetalert2'
import axios from 'axios';
import Breadcrumb from "../../../components/Breadcrumb";
import Nav from "../../../components/breadcrumb/Nav";
import Buttons from "../../../components/breadcrumb/Buttons";
import Item from "../../../components/breadcrumb/Item";

function UserList() {
    return (
        <Layout>
            <Breadcrumb title="Użytkownicy">
                <Nav>
                    <Item title="Użytkownicy" path="/users"></Item>
                    <Item title="Lista" active="true"></Item>
                </Nav>
                <Buttons>
                    buttons
                </Buttons>
            </Breadcrumb>
        </Layout>
    );
}

export default UserList;
