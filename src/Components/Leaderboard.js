import React, { Component } from "react";

class Leaderboard extends Component {
    constructor(props){
        super(props);
        this.state = {leaderboardEntries:[]};
    }



    async componentDidMount() {
        const API_URL = 'https://nptgn9fou5.execute-api.us-east-1.amazonaws.com/getAllScores';
        // const data = {
        //     name: "Paul-from-localhost",
        //     score: 69
        // }

        fetch(API_URL, {method:'GET'})
        .then(res => {
            return res.json()
        })
        .then(data => {
            this.setState({leaderboardEntries:data});
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div id="leaderboard-div"className="">
                <h1>Leaderboards</h1>
                <ul>
                    {this.state.leaderboardEntries.map((entry, index) => (
                        <li key={index}>
                            {entry.Score + " - " + entry.Name}
                        </li>
                    ))}
                </ul>
                <h1>Your score is: {this.props.score}</h1>
                {/* <form>
                    <input>Name</input>
                    <button>Submit</button>
                </form> */}
            </div>
        );
    }
}

export default Leaderboard;
