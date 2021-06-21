import React from 'react';
import Paper from "@material-ui/core/Paper";
import {useIsVisible} from "./providers/VisibilityProvider";
import Close from "./components/Close";
import Button from "@material-ui/core/Button";

const App = () => {
    const { isVisible } = useIsVisible();
    return isVisible && (
        <Paper elevation={3} style={{width: 300, height: 300, bottom: 50, right: 50, position: 'absolute'}}>
            <Close />
            <Button variant="contained" color="secondary">
                Secondary
            </Button>
            TEST
        </Paper>
    );
}
export default App;
