import React from 'react';
import {createRoot} from "react-dom/client";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import ProjectList from "../pages/ProjectList"
import ProjectCreate from "../pages/ProjectCreate"
import ProjectEdit from "../pages/ProjectEdit"
import ProjectShow from "../pages/ProjectShow"
import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard";
import UserList from "../pages/core/users/UserList";


if (document.getElementById('app')) {
    const rootElement = document.getElementById("app");
    const root = createRoot(rootElement);

    root.render(
        <Layout>
            <header id="header" className="header fixed-top d-flex align-items-center">
            </header>
            <Router>
                <aside id="sidebar" className="sidebar">
                    <ul className="sidebar-nav" id="sidebar-nav">
                        <li className="nav-item">
                            <Link to='/' className="nav-link collapsed">
                                <i className="bi bi-grid"></i>
                                <span>Dashboard</span>
                            </Link>
                            <Link to='/projects' className="nav-link collapsed">
                                <i className="bi bi-grid"></i>
                                <span>Projekty</span>
                            </Link>
                            <Link to='/users' className="nav-link collapsed">
                                <i className="bi bi-grid"></i>
                                <span>Użytkownicy</span>
                            </Link>
                        </li>
                    </ul>
                </aside>
                <main id="main" className="main">
                    <Routes>
                        <Route exact path="/" element={<Dashboard/>}/>
                        <Route path="/projects" element={<ProjectList/>}/>
                        <Route path="/users" element={<UserList/>}/>
                    </Routes>
                </main>
                <footer id="footer" className="footer">

                </footer>
            </Router>

        </Layout>
    );
}
