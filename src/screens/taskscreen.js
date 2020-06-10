// components/dashboard.js

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Header from '../components/headercomponent.js';
import TaskItem from '../components/taskcomponent.js';
import Fontisto from 'react-native-vector-icons/Fontisto';
import firebase from '../database/firebase';
import ActionSheet from 'react-native-actionsheet';
import Dialog from 'react-native-dialog';

export default class TaskScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: '',
      title: '',
      dialogVisible: false,
      time: '',
      taskname: '',
      taskArr: [],
      keyTaskCurrent: '',
    };
  }

  showDialog = () => {
    this.setState({dialogVisible: true});
  };

  handleCancel = () => {
    this.setState({dialogVisible: false});
  };

  handleSave = () => {
    this.setState({dialogVisible: false});
    this.addTask();
  };

  getTaskByGroupId = id => {
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

  addTask() {
    if (this.state.taskname === '') {
      alert('Fill at least your name!');
    } else {
      this.setState({
        isLoading: true,
      });
      firebase
        .firestore()
        .collection('tasks')
        .add({
          userid: this.state.userid,
          iscompleted: false,
          taskname: this.state.taskname,
          time: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(res => {
          this.refreshTask();
        })
        .catch(err => {
          console.error('Error found: ', err);
        });
    }
  }

  updateStatusTask = item => {
    const updateDBRef = firebase
      .firestore()
      .collection('tasks')
      .doc(item.key);
    updateDBRef
      .set({
        userid: item.userid,
        iscompleted: !item.iscompleted,
        taskname: item.taskname,
        time: item.time,
        color: item.color,
      })
      .then(docRef => {
        this.refreshTask();
      })
      .catch(error => {
        console.error('Error: ', error);
        this.setState({
          isLoading: false,
        });
      });
  };

  updateTaskImportant = item => {
    const updateDBRef = firebase
      .firestore()
      .collection('tasks')
      .doc(item.key);
    updateDBRef
      .set({
        userid: item.userid,
        iscompleted: item.iscompleted,
        isimportant: !item.isimportant,
        taskname: item.taskname,
        time: item.time,
      })
      .then(docRef => {
        this.refreshTask();
      })
      .catch(error => {
        console.error('Error: ', error);
        this.setState({
          isLoading: false,
        });
      });
  };

  deleteTask = key => {
    const dbRef = firebase
      .firestore()
      .collection('tasks')
      .doc(key);
    dbRef.delete().then(res => {
      console.log('Item removed from database');
      this.refreshTask();
    });
  };

  refreshTask() {
    this.getTaskByGroupId(this.state.userid).then(tasks => {
      this.setState({taskArr: tasks});
    });
  }

  componentDidMount() {
    const userid = this.props.route.params.userid;
    this.setState(
      {
        userid,
      },
      () => {
        console.log('====================================');
        console.log(this.state.userid);
        console.log('====================================');
        this.refreshTask();
      },
    );
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <Header
          title=""
          iconLeft="arrow-left"
          iconRight="ellipsis1"
          onLeftPress={() => this.props.navigation.goBack()}
        />
        <Text style={styles.textStyle}>Danh sách công việc</Text>
        <ScrollView>
          <FlatList
            data={this.state.taskArr}
            renderItem={({item}) => (
              <TaskItem
                name={item.taskname}
                time={item.time}
                iscompleted={item.iscompleted}
                color={item.color}
                onRightPress={() => {
                  // this.deleteGroup(item.key);
                  this.setState({keyTaskCurrent: item.key});
                  this.ActionSheet.show();
                }}
                // onRightPress={() => this.ActionSheet.show()}
                onClick={() => {
                  this.props.navigation.navigate('DetailTask', {
                    item,
                  });
                }}
                onCheckStatus={() => this.updateStatusTask(item)}
              />
            )}
            keyExtractor={item => item.key}
          />
          <ActionSheet
            ref={o => (this.ActionSheet = o)}
            title={'Dữ liệu sẽ bị xoá vĩnh viễn!'}
            options={['Xoá công việc', 'Huỷ bỏ']}
            cancelButtonIndex={1}
            destructiveButtonIndex={0}
            onPress={index => {
              if (index == 0) {
                this.deleteTask(this.state.keyTaskCurrent);
              }
            }}
          />
        </ScrollView>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => {
            this.showDialog();
            console.log(this.state.dialogVisible);
          }}>
          <Fontisto name="plus-a" size={30} color="gray" />
          <Text style={[styles.itemText, {marginLeft: 20, color: 'gray'}]}>
            Thêm công việc mới
          </Text>
          {/* <FontAwesome name="angle-right" size={26} color="#1e1e1e" /> */}
        </TouchableOpacity>
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>Thêm công việc mới</Dialog.Title>
          <Dialog.Input
            placeholder="Nhập tên công việc"
            onChangeText={text => {
              console.log(text);
              this.setState({taskname: text});
            }}
          />
          <Dialog.Button label="Huỷ " onPress={this.handleCancel} />
          <Dialog.Button label="Lưu" onPress={this.handleSave} />
        </Dialog.Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#ededed',
  },
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff',
  },
  textStyle: {
    fontSize: 35,
    fontWeight: '500',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  itemContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  itemText: {
    flex: 1,
    color: '#1e1e1e',
    fontSize: 22,
  },
});
