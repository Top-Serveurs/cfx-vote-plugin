RegisterCommand('vote', function() {
    SendNuiMessage(JSON.stringify({
        app: "voteui",
        method: "toggleIsVisible"
    }));
    SetNuiFocus(true, true);
}, false);

RegisterNuiCallbackType(`close`);
on(`__cfx_nui:close`, (data, cb) => {
    SendNuiMessage(JSON.stringify({
        app: "voteui",
        method: "toggleIsVisible"
    }));
    SetNuiFocus(false, false);
    cb();
});

