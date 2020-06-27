var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard");Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _inherits2=_interopRequireDefault(require("@babel/runtime/helpers/inherits"));var _possibleConstructorReturn2=_interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));var _getPrototypeOf2=_interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));var _react=_interopRequireWildcard(require("react"));var _reactNative=require("react-native");var _firebase=_interopRequireDefault(require("../database/firebase"));var _jsxFileName="/Users/tuyento/ReactNative/KhoaLuan/todoapp/src/components/rowtaskitem.js";function _createSuper(Derived){var hasNativeReflectConstruct=_isNativeReflectConstruct();return function _createSuperInternal(){var Super=(0,_getPrototypeOf2.default)(Derived),result;if(hasNativeReflectConstruct){var NewTarget=(0,_getPrototypeOf2.default)(this).constructor;result=Reflect.construct(Super,arguments,NewTarget);}else{result=Super.apply(this,arguments);}return(0,_possibleConstructorReturn2.default)(this,result);};}function _isNativeReflectConstruct(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Date.prototype.toString.call(Reflect.construct(Date,[],function(){}));return true;}catch(e){return false;}}var Rowtaskitem=function(_Component){(0,_inherits2.default)(Rowtaskitem,_Component);var _super=_createSuper(Rowtaskitem);function Rowtaskitem(props){var _this;(0,_classCallCheck2.default)(this,Rowtaskitem);_this=_super.call(this,props);_this.getColorBy_Id=function(id){return _firebase.default.firestore().collection('colors').doc(id+'').onSnapshot(function(doc){_this.setState({color:doc.data()});});};_this.state={color:{label:'di lam',color:'#FFF'}};console.log('constructor');return _this;}(0,_createClass2.default)(Rowtaskitem,[{key:"componentDidMount",value:function componentDidMount(){console.log('did_mount');this.getColorBy_Id(this.props.rowData.colorid);}},{key:"componentDidUpdate",value:function componentDidUpdate(prevProps,prevState){console.log(prevProps);if(prevProps.rowData.colorid!==this.props.rowData.colorid){this.getColorBy_Id(this.props.rowData.colorid);}}},{key:"render",value:function render(){var _this$props=this.props,rowData=_this$props.rowData,onPress=_this$props.onPress;console.log(rowData.colorid);var title=_react.default.createElement(_reactNative.Text,{style:[styles.title,{textDecorationLine:!rowData.isCompleted?'none':'line-through',color:!rowData.isCompleted?'black':'gray'}],__source:{fileName:_jsxFileName,lineNumber:54,columnNumber:13}},rowData.title);var desc=null;if(rowData.description)desc=_react.default.createElement(_reactNative.View,{style:styles.descriptionContainer,__source:{fileName:_jsxFileName,lineNumber:71,columnNumber:17}},_react.default.createElement(_reactNative.Text,{style:[styles.textDescription],__source:{fileName:_jsxFileName,lineNumber:76,columnNumber:21}},rowData.description));return _react.default.createElement(_reactNative.TouchableOpacity,{style:{flex:1,padding:10,borderRadius:10,backgroundColor:this.state.color.color},onPress:onPress,__source:{fileName:_jsxFileName,lineNumber:82,columnNumber:13}},title,desc);}}]);return Rowtaskitem;}(_react.Component);var _default=Rowtaskitem;exports.default=_default;var styles=_reactNative.StyleSheet.create({title:{fontSize:16,fontWeight:'bold'},descriptionContainer:{flexDirection:'row',paddingRight:50},textDescription:{marginLeft:10,color:'gray'}});