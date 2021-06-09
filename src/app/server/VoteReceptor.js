import pjson from '../../package.json';

class VoteReceptor {

    constructor(token) {
        this.token = token;
    }

    checkPlayername(playername) {
        const regex = /[A-zÀ-ÿ0-9-_]/g;
        if (! playername) return false;
        if (playername.length > 100) return false;
        return playername.match(regex);
    }

    checkIP(ip) {
        const regex = /[0-9.:]/g;
        if (! ip) return false;
        if (ip.length > 100) return false;
        return ip.match(regex);
    }

    checkVersion(version) {
        const regex = /[0-9.]/g;
        if (! version) return false;
        if (version.length > 10) return false;
        return version.match(regex);
    }

    checkDate(date) {
        const regex = /^(\d{4})\/(\d{2})\/(\d{2}) (\d{2}):(\d{2}):(\d{2})$/;
        if (! date) return false;
        if (date.length > 25) return false;
        return date.match(regex);
    }

    hasError({token, playername, ip, version, date}) {
        if (token !== this.token) {
            return "Wrong vote token";
        }
        if (! this.checkPlayername(playername)) {
            return "Invalid playername";
        }
        if (! this.checkIP(ip)) {
            return "Invalid IP address";
        }
        if (! this.checkVersion(version)) {
            return "Invalid version";
        }
        if (! this.checkDate(date)) {
            return "Invalid date";
        }
        return null;
    }

    handleVote(vote) {
        const error = this.hasError(vote);
        if (error) {
            return console.log(`ERROR: ${error}`);
        }
        const { playername, ip, date, version } = vote;
        emit("onPlayerVote", playername, ip, date);
        if (version !== pjson.version) {
            console.log('WARNING: a new update is available for the vote plugin. Please keep it up to date.')
        }
    }
}

export default VoteReceptor;