import React from 'react';
import {Link} from "react-router-dom";

function Nav({children}) {
    return (
        <div className="col-12 col-lg ">
            <div className="row justify-content-between">
                <div className="col-12 col-lg-auto px-0 px-lg-4">
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/" className="me-2"><i
                                className="ri-home-2-fill"></i></Link></li>
                        {children}
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Nav;


