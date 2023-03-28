import React from 'react';
import {Link} from "react-router-dom";

function Item(props) {
    let classActive;
    let path;

    console.log(props.active);

    if(props.active === "true"){
        classActive = " active";
    }

    if(props.path){
        path = <Link to={props.path}>{props.title}</Link>;
    }else{
        path = props.title;
    }



    return (
        <li className={'breadcrumb-item' + ( classActive ? classActive : "")}>{path}</li>
    );
}

export default Item;


