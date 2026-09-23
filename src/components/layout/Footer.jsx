import React from "react";
import classes from './Footer.module.css';

const year = new Date().getFullYear();
function Footer() {
    return (
        <footer className={classes.footer}>
            <div className={classes.p}>
                <p>Copyright ⓒ {year}</p>
            </div>
        </footer>
    );
}

export default Footer;