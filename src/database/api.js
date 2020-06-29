import firebase from '../database/firebase'

// export const getTaskByGroupId = (id) => {
//     return firebase
//         .firestore()
//         .collection('tasks')
//         .where('userid', '==', id + '')
//         .get()
//         .then((querySnapshot) => {
//             return querySnapshot.docs.map((i) => ({
//                 key: i.id,
//                 ...i.data(),
//             }))
//         })
//         .catch((error) => {
//             console.log(error)
//             return []
//         })
// }

// export const getTask = (id, datebegin, dateend, session) => {
//     firebase
//         .firestore()
//         .collection('tasks')
//         .where('userid', '==', id + '')
//         .where('time', '>=', new Date(datebegin))
//         .where('time', '<', new Date(dateend))
//         .where('session', '==', session)
//         .onSnapshot((querySnapshot) => {
//             let todoList = []
//             querySnapshot.forEach(function (doc) {
//                 todoList.push({ key: doc.id, ...doc.data() })
//             })
//             console.log(todoList)
//         })
// }

export const getTask = (id, datebegin, dateend, time) => {
    firebase
        .firestore()
        .collection('tasks')
        .where('userid', '==', id + '')
        .where('time', '>=', new Date(datebegin))
        .where('time', '<', new Date(dateend))
        .where('session', '==', time)
        .onSnapshot((querySnapshot) => {
            let todo = []
            querySnapshot.forEach(function (doc) {
                todo.push({
                    key: doc.id,
                    data: doc.data(),
                    ...doc.data(),
                })
            })
            return todo
        })
}
