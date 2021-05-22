import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Modal} from 'react-native';
import db from '../config'
import firebase from 'firebase'

export default class SignUpLoginScreen extends React.Component{
    constructor(){
        super()
        this.state={
            username:'',
            password:''
        }
    }
userLogin = (username, password)=>{
    firebase.auth().signInWithEmailAndPassword(username,password)
    .then(()=>{
        return Alert.alert("Successfully Login")
    })
    .catch((error)=>{
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage)
    })
}
userSignUp = (emailId, password,confirmPassword) =>{
  if(password !== confirmPassword){
      return Alert.alert("password doesn't match Check your password.")
  }else{
    firebase.auth().createUserWithEmailAndPassword(emailId, password)
    .then(()=>{
      db.collection('users').add({
        first_name:this.state.firstName,
        last_name:this.state.lastName,
        contact:this.state.contact,
        email_id:this.state.emailId,
        address:this.state.address
      })
      return  Alert.alert(
           'User Added Successfully',
           '',
           [
             {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
           ]
       )
    })
    .catch((error)=> {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    })
  }
}
  render(){
    return (
        showModal = ()=>(
            <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.isModalVisible}
            >
                <TextInput
                style={styles.formTextInput}
                placeholder={"First Name"}
                maxLength = {8}
                onChangeText={(text)=>{
                  this.setState({
                    firstName:text
                  })
                }}
                />
                <TextInput
                style={styles.formTextInput}
                placeholder={"Last Name"}
                maxLength = {8}
                onChangeText={(text)=>{
                  this.setState({
                    lastName:text
                  })
                }}
                />
                <TextInput
                style={styles.formTextInput}
                placeholder={"Phone Number"}
                maxLength = {8}
                onChangeText={(text)=>{
                  this.setState({
                    phoneNumber:text
                  })
                }}
                />
                <TextInput
                style={styles.formTextInput}
                placeholder={"Address"}
                maxLength = {8}
                onChangeText={(text)=>{
                  this.setState({
                    address:text
                  })
                }}
                />
                <TextInput
                style={styles.formTextInput}
                placeholder={"Email ID"}
                maxLength = {8}
                onChangeText={(text)=>{
                  this.setState({
                    emailId:text
                  })
                }}
                />
                <TextInput
                style={styles.formTextInput}
                placeholder={"Password"}
                maxLength = {8}
                secureTextEntry = {true}
                onChangeText={(text)=>{
                  this.setState({
                    password:text
                  })
                }}
                />
                <TextInput
                style={styles.formTextInput}
                placeholder={"Confirm Password"}
                maxLength = {8}
                secureTextEntry = {true}
                onChangeText={(text)=>{
                  this.setState({
                    confirmPassword:text
                  })
                }}
                />
                
        )
        <View style = {styles.container}>
        <View style = {styles.subcontainer}>
      <View>
        <Text style={{color:'ff5722', fontSize:18, fontWeight:'bold', marginLeft:55,}}>USERNAME</Text>
        <View style = {{alignItems:'center'}}>
          <TextInput
          style={styles.loginBox}
          keyboardType = 'email-address'
          onChangeText={(text)=>{
            this.setState({
              username: text
            })
          }}
          />
          
      </View>
        <Text style={{color:'ff5722', fontSize:18, fontWeight:'bold', marginLeft:55,}}>PASSWORD</Text>
        <View style = {{alignItems:'center'}}>
          <TextInput
          style={styles.loginBox}
          secureTextEntry = 'true'
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
          />
        </View>
        </View>
        <View style={{alignItems:'center'}}>
          <TouchableOpacity
          style={[styles.button,{marginBottom:10}]}
          onPress = {()=>{this.userLogin(this.state.username, this.state.password)}}
          >
            <Text style = {{color:'ff5722', fontSize:18, fontWeight: 'bold'}}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
          style={[styles.button,{marginBottom:10}]}
          onPress = {()=>{this.userSignUp(this.state.username, this.state.password)}}
          >
            <Text style = {{color:'ff5722', fontSize:18, fontWeight: 'bold'}}>SignUp</Text>
            </TouchableOpacity> 

            <TouchableOpacity
            style={styles.registerButton}
            onPress={()=>
              this.userSignUp(this.state.firstName,this.state.lastName,this.state.phoneNumber,this.state.address,this.state.emailId, this.state.password, this.state.confirmPassword)
            }
          >
          <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={()=>this.setState({isModalVisible:false})}
          >
          <Text style={{color:'#ff5722'}}>Cancel</Text>
          </TouchableOpacity>
          </View>
      </View>
  </View>
</Modal>
        )
    )
  }
}

const styles = StyleSheet.create({
    loginBox:{
        width:300,
        height:35,
        fontSize:20,
        borderColor:'black',
        borderRadius:10
    },
    button:{
        width:300,
        height:35,
        backgroundColor:'orange',
        borderColor:'black',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    },
    container:{
        flex:1,
        backgroundColor:'peachpuff'
    },
    subcontainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
