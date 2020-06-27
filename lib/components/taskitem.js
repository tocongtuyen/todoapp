var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _inherits2=_interopRequireDefault(require("@babel/runtime/helpers/inherits"));var _possibleConstructorReturn2=_interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));var _getPrototypeOf2=_interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));var _react=_interopRequireDefault(require("react"));var _reactNative=require("react-native");var _moment=_interopRequireDefault(require("moment"));var _AntDesign=_interopRequireDefault(require("react-native-vector-icons/AntDesign"));var _Swipeable=_interopRequireDefault(require("react-native-gesture-handler/Swipeable"));var _firebase=_interopRequireDefault(require("../database/firebase"));var _jsxFileName="/Users/tuyento/ReactNative/KhoaLuan/todoapp/src/components/taskitem.js";function _createSuper(Derived){var hasNativeReflectConstruct=_isNativeReflectConstruct();return function _createSuperInternal(){var Super=(0,_getPrototypeOf2.default)(Derived),result;if(hasNativeReflectConstruct){var NewTarget=(0,_getPrototypeOf2.default)(this).constructor;result=Reflect.construct(Super,arguments,NewTarget);}else{result=Super.apply(this,arguments);}return(0,_possibleConstructorReturn2.default)(this,result);};}function _isNativeReflectConstruct(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Date.prototype.toString.call(Reflect.construct(Date,[],function(){}));return true;}catch(e){return false;}}var windowWidth=_reactNative.Dimensions.get('window').width/7;var RightActions=function RightActions(_ref){var progress=_ref.progress,dragX=_ref.dragX,onPress=_ref.onPress;var scale=dragX.interpolate({inputRange:[-100,0],outputRange:[1,0],extrapolate:'clamp'});return _react.default.createElement(_reactNative.TouchableOpacity,{onPress:onPress,__source:{fileName:_jsxFileName,lineNumber:24,columnNumber:9}},_react.default.createElement(_reactNative.View,{style:styles.rightAction,__source:{fileName:_jsxFileName,lineNumber:25,columnNumber:13}},_react.default.createElement(_reactNative.Animated.Text,{style:[styles.actionText,{transform:[{scale:scale}]}],__source:{fileName:_jsxFileName,lineNumber:26,columnNumber:17}},_react.default.createElement(_AntDesign.default,{name:"delete",size:26,color:"#fff",__source:{fileName:_jsxFileName,lineNumber:29,columnNumber:21}}))));};var row=[];var prevOpenedRow;function closeRow(index){if(prevOpenedRow&&prevOpenedRow!==row[index]){prevOpenedRow.close();}prevOpenedRow=row[index];}var taskitem=function(_React$Component){(0,_inherits2.default)(taskitem,_React$Component);var _super=_createSuper(taskitem);function taskitem(props){var _this;(0,_classCallCheck2.default)(this,taskitem);_this=_super.call(this,props);_this.getColorById=function(id){return _firebase.default.firestore().collection('colors').doc(id+'').get().then(function(docRef){console.log(docRef.data());return docRef.data();}).catch(function(error){});};_this.getColorBy_Id=function(id){return _firebase.default.firestore().collection('colors').doc(id+'').onSnapshot(function(doc){_this.setState({color:doc.data()});});};_this.state={color:{label:'di lam',color:'#FFF'}};return _this;}(0,_createClass2.default)(taskitem,[{key:"componentDidMount",value:function componentDidMount(){this.getColorBy_Id(this.props.colorid);console.log(this.state.currentDay);}},{key:"componentDidUpdate",value:function componentDidUpdate(prevProps,prevState){if(prevProps.colorid!==this.props.colorid){this.getColorBy_Id(this.props.colorid);}}},{key:"render",value:function render(){var _this$props=this.props,onRightPress=_this$props.onRightPress,index=_this$props.index,title=_this$props.title,time=_this$props.time,isCompleted=_this$props.isCompleted;return _react.default.createElement(_Swipeable.default,{ref:function ref(_ref2){return row[index]=_ref2;},renderRightActions:function renderRightActions(progress,dragX){return _react.default.createElement(RightActions,{progress:progress,dragX:dragX,onPress:onRightPress,__source:{fileName:_jsxFileName,lineNumber:95,columnNumber:21}});},onSwipeableOpen:closeRow(index),__source:{fileName:_jsxFileName,lineNumber:92,columnNumber:13}},_react.default.createElement(_reactNative.View,{style:[styles.taskListContent,{backgroundColor:""+this.state.color.color}],__source:{fileName:_jsxFileName,lineNumber:103,columnNumber:17}},_react.default.createElement(_reactNative.View,{style:{flexDirection:'row',alignItems:'center'},__source:{fileName:_jsxFileName,lineNumber:109,columnNumber:21}},_react.default.createElement(_reactNative.View,{style:{height:70,width:5,marginRight:2},__source:{fileName:_jsxFileName,lineNumber:115,columnNumber:25}}),_react.default.createElement(_reactNative.View,{style:{marginRight:0},__source:{fileName:_jsxFileName,lineNumber:124,columnNumber:25}},_react.default.createElement(_reactNative.Text,{style:[{marginRight:5,color:'#554A4C',fontSize:11,fontWeight:'500'},{textDecorationLine:!isCompleted?'none':'line-through',color:!isCompleted?'black':'gray'}],__source:{fileName:_jsxFileName,lineNumber:125,columnNumber:29}},title),_react.default.createElement(_reactNative.Text,{style:{color:'black',fontSize:11,marginRight:5},__source:{fileName:_jsxFileName,lineNumber:144,columnNumber:29}},""+(0,_moment.default)(time).format('HH:mm'))))));}}]);return taskitem;}(_react.default.Component);var _default=taskitem;exports.default=_default;var styles=_reactNative.StyleSheet.create({taskListContent:{height:57,flex:1,marginLeft:1,marginRight:1,width:windowWidth,alignSelf:'center',shadowColor:'#2E66E7',backgroundColor:'#ffffff',marginTop:1,marginBottom:1,shadowOffset:{width:3,height:3},shadowRadius:5,elevation:3,flexDirection:'row',justifyContent:'space-between',alignItems:'center'},rightAction:{backgroundColor:'#dd2c00',justifyContent:'center',flex:1,alignItems:'center',marginTop:1,marginBottom:1},actionText:{color:'#fff',fontWeight:'600',paddingLeft:10,paddingRight:10}});