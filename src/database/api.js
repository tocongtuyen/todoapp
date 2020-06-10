import firebase from '../database/firebase';

export const getTaskByGroupId = id => {
  return firebase
    .firestore()
    .collection('tasks')
    .where('userid', '==', id + '')
    .get()
    .then(querySnapshot => {
      return querySnapshot.docs.map(i => ({
        key: i.id,
        ...i.data(),
      }));
    })
    .catch(error => {
      console.log(error);
      return [];
    });
};
