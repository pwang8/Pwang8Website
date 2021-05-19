import React, { Component } from "react";

class Leaderboard extends Component {
    constructor(props){
        super(props);
        this.state = {leaderboardEntries:[]};
    }

    submitScore = (event) => {
        event.preventDefault();
        const API_URL = "https://nptgn9fou5.execute-api.us-east-1.amazonaws.com/postDBEntry"
        const bodyString = JSON.stringify({
            "name": event.target[0].value,
            "score": this.props.score
        });

        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: bodyString
        }).catch(err => {
            console.log(err);
        });
    }

    sortEntriesByScore = (entriesArray) => {
        for(let i=0; i<entriesArray.length; i++){
            let maxIndex = i;
            for(let j=i; j<entriesArray.length; j++){
                if(entriesArray[j].Score > entriesArray[maxIndex].Score){
                    maxIndex = j;
                }
            }
            let temp = entriesArray[maxIndex];
            entriesArray.splice(maxIndex,1);
            entriesArray.splice(i, 0, temp);
        }
        return entriesArray;
    }

    async componentDidMount() {
        const API_URL = 'https://nptgn9fou5.execute-api.us-east-1.amazonaws.com/getAllScores';

        fetch(API_URL, {method:'GET'})
        .then(res => {
            return res.json()
        })
        .then(data => {
            let sortedData = this.sortEntriesByScore(data);
            this.setState({leaderboardEntries:sortedData});
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
                <form onSubmit={this.submitScore} >
                    <input type="text" name="Name" placeholder="Name"/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default Leaderboard;
