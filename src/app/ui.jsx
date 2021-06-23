import React from 'react';
import ReactDOM from 'react-dom';
import { NuiProvider } from "fivem-nui-react-lib";
import App from './ui/App';
import VisibilityProvider from "./ui/providers/VisibilityProvider";

ReactDOM.render(
    <VisibilityProvider>
        <NuiProvider resource="voteui">
            <App />
        </NuiProvider>
    </VisibilityProvider>,
  document.getElementById('app'),
);