import React from 'react';
import Paper from "@material-ui/core/Paper";
import {useIsVisible} from "./providers/VisibilityProvider";
import Button from "@material-ui/core/Button";
import TopBar from "./components/TopBar";
import {makeStyles} from "@material-ui/core";
import List from "./components/List";

const useStyles = makeStyles(theme => ({
	root: {
		width: 300,
		height: 500,
		bottom: 50,
		right: 50,
		position: 'absolute'
	}
}));

const App = () => {
	const classes = useStyles();
    const { isVisible } = useIsVisible();
    return isVisible && (
        <Paper className={classes.root} elevation={3}>
			<TopBar/>
            <List />
            <Button>Voter</Button>
        </Paper>
    );
};
export default App;
