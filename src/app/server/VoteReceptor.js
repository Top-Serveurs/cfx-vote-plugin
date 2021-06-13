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
        const regex = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/;
        if (! date) return false;
        if (date.length > 25) return false;
        return date.match(regex);
    }

    hasError({Token, Playername, IP, Version, Date}) {
        if (Token !== this.token) {
            return "Wrong vote token";
        }
        if (! this.checkPlayername(Playername)) {
            return "Invalid playername";
        }
        if (! this.checkIP(IP)) {
            return "Invalid IP address";
        }
        if (! this.checkVersion(Version)) {
            return "Invalid version";
        }
        if (! this.checkDate(Date)) {
            return "Invalid date";
        }
        return null;
    }

    handleVote(vote) {
        const error = this.hasError(vote);
        if (error) {
            return console.log(`ERROR: ${error}`);
        }
        const { Playername, IP, Date, Version } = vote;
        emit("onPlayerVote", Playername, IP, Date);
        if (Version !== pjson.version) {
            console.log('WARNING: a new update is available for the vote plugin. Please keep it up to date.');
        }
    }
}

export default VoteReceptor;