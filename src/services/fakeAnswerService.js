import {database} from "../model/firebase";

const username = 'Lena Dorogenskaya';
export function getUsername() {
    return username;
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

//
// export function getAnswers() {
//     return answerS;
// }
