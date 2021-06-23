import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";
import {useNuiRequest} from 'fivem-nui-react-lib';

const Close = () => {
    const { send } = useNuiRequest();
    const handleClick = () => {
        fetch('http://vote/close', {
            method: 'post'
        });
    };
    return (
        <IconButton onClick={handleClick} aria-label="close">
            <CloseIcon />
        </IconButton>
    )
};
export default Close;
