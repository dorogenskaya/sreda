import {database} from "../model/firebase";


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
//
// function getAnswersById(themeKey) {
//     database.ref('themes/' + themeKey).once('value', snapshot => {
//         let data = snapshot.val();
//
//
//         // const answer = {
//         //     key: themeKey,
//         //     themeName: data.themeName,
//         //     questionsList: data.questionsList,
//         //
//         //     createDate: data.createDate,
//         //     tags:[3,2],
//         //     description:"куцкупцапавпа",
//         //     creator: 'Lena',
//         //     id: 14,
//         //     coinCount: 10,
//         //     likerList:['Lena Dorogenskaya', 'Jkz Gtnhjdf'],
//         //     liked: true
//         // };
//
//         let questionsList = themeActive.questionsList.map((item, i) => {
//             return {id: i, name: item.question}
//         });
//     });
// }

const username = 'Lena Dorogenskaya';

export function getAnswers() {
    return answerS;
}

export function getUsername() {
    return username;
}