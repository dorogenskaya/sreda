
const answerS = [
    {name: 'Pizzeria',
        description:"fdfsfdfsfdsfdsfdsfdssdffs",
        videoSrc: 'https://s3.amazonaws.com/codecademy-content/programs/react/ravenous/pizza.jpg',
        creator: 'Lena',
        rating: 4,
        coinCount: 0,
        id: 12,
        tags:['1'],
        likerList:['Оля Петрова','Lena Dorogenskaya'],
        liked: true
    },

    {name: 'Otto Pizzeria',
        description:"fdfssdffs",
        videoSrc: 'https://s3.amazonaws.com/codecademy-content/programs/react/ravenous/pizza.jpg',
        creator: 'Lena',
        rating: 4,
        id: 13,
        coinCount: 1380,
        tags:['2'],
        likerList:['Миранда Каримова', 'Илья Буяльский', 'Захар Шлимаков'],
        liked: false
    },

    {name: 'MarginOtto Pizzeria',
        tags:['3','2'],
        description:"куцкупцапавпа",
        videoSrc: 'https://s3.amazonaws.com/codecademy-content/programs/react/ravenous/pizza.jpg',
        creator: 'Lena',
        rating: 4,
        id: 14,
        coinCount: 10,
        likerList:['Lena Dorogenskaya', 'Jkz Gtnhjdf'],
        liked: true
    }
];


const username = 'Lena Dorogenskaya';

const questionS = [
    {name: 'Mafdf', id: '1'},
    {name: 'Margidfda', id: '2'},
    {name: 'to Pizzeria', id: '3'},
];


export function getAnswers() {
    return answerS;
}

export function getQuestions() {
    return questionS;
}
export function getUsername() {
    return username;
}