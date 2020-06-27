var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard");Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _inherits2=_interopRequireDefault(require("@babel/runtime/helpers/inherits"));var _possibleConstructorReturn2=_interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));var _getPrototypeOf2=_interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));var _react=_interopRequireWildcard(require("react"));var _reactNative=require("react-native");var _firebase=_interopRequireDefault(require("../database/firebase"));var _jsxFileName="/Users/tuyento/ReactNative/KhoaLuan/todoapp/src/screens/signup.js";function _createSuper(Derived){var hasNativeReflectConstruct=_isNativeReflectConstruct();return function _createSuperInternal(){var Super=(0,_getPrototypeOf2.default)(Derived),result;if(hasNativeReflectConstruct){var NewTarget=(0,_getPrototypeOf2.default)(this).constructor;result=Reflect.construct(Super,arguments,NewTarget);}else{result=Super.apply(this,arguments);}return(0,_possibleConstructorReturn2.default)(this,result);};}function _isNativeReflectConstruct(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Date.prototype.toString.call(Reflect.construct(Date,[],function(){}));return true;}catch(e){return false;}}var Signup=function(_Component){(0,_inherits2.default)(Signup,_Component);var _super=_createSuper(Signup);function Signup(){var _this;(0,_classCallCheck2.default)(this,Signup);_this=_super.call(this);_this.updateInputVal=function(val,prop){var state=_this.state;state[prop]=val;_this.setState(state);};_this.registerUser=function(){if(_this.state.email===''&&_this.state.password===''){_reactNative.Alert.alert('Nhập thông tin email, password');}else{_this.setState({isLoading:true});_firebase.default.auth().createUserWithEmailAndPassword(_this.state.email,_this.state.password).then(function(res){res.user.updateProfile({displayName:_this.state.displayName});console.log('User registered successfully!');_this.setState({isLoading:false,displayName:'',email:'',password:''});_this.props.navigation.navigate('Login');}).catch(function(error){_this.setState({errorMessage:error.message});console.log(error);_reactNative.Alert.alert(""+error);});}};_this.state={displayName:'',email:'',password:'',isLoading:false};return _this;}(0,_createClass2.default)(Signup,[{key:"render",value:function render(){var _this2=this;if(this.state.isLoading){}return _react.default.createElement(_reactNative.View,{style:styles.container,__source:{fileName:_jsxFileName,lineNumber:75,columnNumber:13}},_react.default.createElement(_reactNative.View,{style:{justifyContent:'center',paddingBottom:60},__source:{fileName:_jsxFileName,lineNumber:76,columnNumber:17}},_react.default.createElement(_reactNative.Text,{style:{justifyContent:'center',textAlign:'center',fontSize:30,fontWeight:'bold'},__source:{fileName:_jsxFileName,lineNumber:82,columnNumber:21}},"\u0110\u0103ng k\xFD")),_react.default.createElement(_reactNative.TextInput,{style:styles.inputStyle,placeholder:"T\xEAn",value:this.state.displayName,onChangeText:function onChangeText(val){return _this2.updateInputVal(val,'displayName');},__source:{fileName:_jsxFileName,lineNumber:93,columnNumber:17}}),_react.default.createElement(_reactNative.TextInput,{style:styles.inputStyle,placeholder:"Email",value:this.state.email,onChangeText:function onChangeText(val){return _this2.updateInputVal(val,'email');},__source:{fileName:_jsxFileName,lineNumber:101,columnNumber:17}}),_react.default.createElement(_reactNative.TextInput,{style:styles.inputStyle,placeholder:"Password",value:this.state.password,onChangeText:function onChangeText(val){return _this2.updateInputVal(val,'password');},maxLength:15,secureTextEntry:true,__source:{fileName:_jsxFileName,lineNumber:107,columnNumber:17}}),_react.default.createElement(_reactNative.Button,{color:"#3740FE",title:"\u0110\u0103ng k\xFD",onPress:function onPress(){return _this2.registerUser();},__source:{fileName:_jsxFileName,lineNumber:115,columnNumber:17}}),_react.default.createElement(_reactNative.Text,{style:styles.loginText,onPress:function onPress(){return _this2.props.navigation.navigate('Login');},__source:{fileName:_jsxFileName,lineNumber:121,columnNumber:17}},"\u0110\xE3 \u0111\u0103ng k\xFD? Nh\u1EA5n v\xE0o \u0111\xE2y \u0111\u1EC3 \u0111\u0103ng nh\u1EADp"));}}]);return Signup;}(_react.Component);exports.default=Signup;var styles=_reactNative.StyleSheet.create({container:{flex:1,display:'flex',flexDirection:'column',justifyContent:'center',padding:35,backgroundColor:'#fff'},inputStyle:{width:'100%',marginBottom:15,paddingBottom:15,alignSelf:'center',borderColor:'#ccc',borderBottomWidth:1},loginText:{color:'#3740FE',marginTop:25,textAlign:'center'},preloader:{left:0,right:0,top:0,bottom:0,position:'absolute',alignItems:'center',justifyContent:'center',backgroundColor:'#fff'},loginViewTitle:{justifyContent:'center',paddingBottom:60},loginTextTitle:{justifyContent:'center',textAlign:'center',fontSize:30,fontWeight:'bold'}});