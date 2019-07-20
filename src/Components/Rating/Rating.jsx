import React, {Component} from 'react';
import RatingWidget from "./RatingWidget";

class Rating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userProfile: {},
            answers: [],
            questions: [],
            currentPage: 1,
            pageSize: 10,
            activeTab: 'Мои'
        };
    }

    render() {
        return (
            <div className="Theme">
                <div className="Theme-content">
                    <h1>Ответы</h1>
                    <RatingWidget/>
                </div>

                <div className="Theme-questions">
                    <h1>Общий рейтинг</h1>
                    <RatingWidget/>

                </div>
            </div>
        );
    }
}

export default Rating;