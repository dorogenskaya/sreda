import {database} from "../model/firebase";

const username = 'Lena Dorogenskaya';
export function getUsername() {
    return username;
}

export function getQuestions(themeKey) {
    database.ref('themes/' + themeKey).once('value', snapshot => {
        let theme = snapshot.val();
        let questions = [];

        for(let key in theme.questionsList){
            questions.push({
                name: theme.questionsList[key].question,
                id: key
            })
        }
        return questions;
    });
}


// function  getQuestions(themeKey, callBack) {
//     database.ref('themes/' + themeKey).once('value', snapshot => {
//         let theme = snapshot.val();
//         let questions = [];
//         for(let key in theme.questionsList){
//             questions.push({
//                 name: theme.questionsList[key].question,
//                 id: key
//             })
//         }
//         callBack(questions)
//     });
// }

export function getAnswersDynamic(themeKey) {
    database.ref('answers/' + themeKey).once('value', snapshot => {
        let data = snapshot.val();
        let answerList = [];

        for (let key in data){
            const answer = data[key] ;
            answerList.push({
                name: answer.title,
                tags: answer.questionsList,
                createDate: answer.createDate,
                description: answer.questionsList,
                creator: answer.creator,
                id: key,
                coinCount: !answer.coinCount ? 0 : answer.coinCount,
                likerList: !answer.likerList ? [] : answer.likerList,
                liked: !answer.liked ? false : answer.liked
            });
        }
        console.log(answerList);
        return answerList;
    });
}


const answerS = [
    {name: 'Pizzeria',
        createDate:'1-30-2018',
        description:"fdfsfdfsfdsfdsfdsfdssdffs",
        creator: 'Lena',
        coinCount: 0,
        id: 12,
        tags:[1],
        likerList:['Оля Петрова','Lena Dorogenskaya'],
        liked: true
    },

    {name: 'Otto Pizzeria',
        createDate:'1-16-2018',
        description:"fdfssdffs",
        creator: 'Lena',
        id: 13,
        coinCount: 1380,
        tags:[2],
        likerList:['Миранда Каримова', 'Илья Буяльский', 'Захар Шлимаков'],
        liked: false
    },

    {name: 'MarginOtto Pizzeria',
        createDate:'1-18-2018',
        tags:[3,2],
        description:"куцкупцапавпа",
        creator: 'Lena',
        id: 14,
        coinCount: 10,
        likerList:['Lena Dorogenskaya', 'Jkz Gtnhjdf'],
        liked: true
    }
];


export function getAnswers() {
    return answerS;
}
