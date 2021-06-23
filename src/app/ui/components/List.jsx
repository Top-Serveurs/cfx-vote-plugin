import React, {useEffect, useState} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

const List = () => {
	const  [players, setPlayers] = useState(null);
	useEffect(() => {
		axios.get("https://api.top-serveurs.net/v1/servers/XXXXXXXXXXXXXXXXXXXXXXXXXX/players-ranking")
			.then(response => {
				setPlayers(response.data.players);
			})
			.catch(e => {
				console.log("ERROR: Unable to get players list");
			});
	}, []);
	console.log(players);
	if (players === null) {
		return <CircularProgress />
	}
	return (
		<DataGrid
			columns={[{ field: 'playername' }, { field: 'votes' }]}
			rows={players.map(p => {
				p.id = p.playername;
				return p;
			})}
		/>
	)
};
export default List;
