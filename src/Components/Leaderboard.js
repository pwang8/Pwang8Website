import React, { Component } from "react";

class Leaderboard extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    getLeaderboard = () => {
        //Temp code since backend not implemented.
        return([
            {name:"Paul",score:100},
            {name:"Ryan",score:80},
            {name:"Jordan",score:60},
        ]);
    }

    render() {
        const leaderboardEntries = this.getLeaderboard().map((leaderboardEntry, index)=>{
            return(
                <li key={index}>{leaderboardEntry.score + " - " + leaderboardEntry.name}</li>
            );
        });

        return (
            <div id="leaderboard-div"className="">
                <h1>Leaderboards</h1>
                <ul>
                    {leaderboardEntries}
                </ul>
                <h1>Your score is: {this.props.score}</h1>
                {/* <form><input>Name</input></form> */}
            </div>
        );
    }
}

export default Leaderboard;
