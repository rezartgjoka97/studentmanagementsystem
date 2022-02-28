import React, { useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    CssBaseline,
    Typography,
    makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import pic from "./../Images/LogoImage.webp";

const useStyles = makeStyles((theme) => ({
    navlinks: {
        marginLeft: theme.spacing(10),
        display: "flex",
    },
    logo: {
        flexGrow: "1",
        color: "black",
        paddingTop: "1%"
    },
    link: {
        textDecoration: "none",
        color: "black",
        fontSize: "15px",
        marginLeft: theme.spacing(5),
        "&:hover": {
            color: "#FF5821",
        },
    },
    navbar: {
        backgroundColor: "hsl(0, 0%, 90%)",
        position: "fixed",
        top: "0",
        width: "100%",
        height: "13%"
    },
    toolbar: {
        marginBottom: "10px",
        backgroundColor: "hsl(0, 0%, 90%)"
    },
    logoDesc: {
        fontSize: "20px",
        paddingTop: "8%"
    },
    logoDiv: {
        display: "flex"
    },
    shortDesc: {
        color: "#FF5821",
        fontSize: "13px",
        paddingTop: "4%"
    }
}));
function NavBarUI(props) {
    const classes = useStyles();
    return (
        <AppBar className={classes.navbar} position="static">
            <CssBaseline />
            <Toolbar className={classes.toolbar} >
                <Typography variant="h4" className={classes.logo}>
                    <div className={classes.logoDiv}>
                        <img src={pic} />
                        <div>
                            <div className={classes.logoDesc}>
                                Sistemi i menaxhimit te studenteve
                            </div>
                            <div className={classes.shortDesc}>
                                High School
                            </div>
                        </div>
                    </div>
                </Typography>
                <div className={classes.navlinks}>
                    <Link to="/" className={classes.link}>
                        Identifikohu
                    </Link>
                    <Link to="/register" className={classes.link}>
                        Regjistrohu
                    </Link>
                    <Link to="/students" className={classes.link}>
                        Studentet
                    </Link>
                    <Link to="/studentsDetail" className={classes.link}>
                        Detajet e studenteve
                    </Link>
                    < Link onClick={() => localStorage.setItem('isAuth', false)} to="/" className={classes.link}>
                        Log out
                    </Link>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default NavBarUI;
