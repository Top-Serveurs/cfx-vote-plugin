import React from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import Close from "./Close";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root: {
		borderBottom: '1px solid grey'
	},
	logo: {
		height: 20
	}
}));

const TopBar = () => {
	const classes = useStyles();
	return (
		<Toolbar className={classes.root}>
			<img className={classes.logo} src="./logo-ts.svg" alt="Logo Top-Serveurs"/>
			<Close />
		</Toolbar>
	)
};
export default TopBar;
