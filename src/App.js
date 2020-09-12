import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import InputBox from './components/InputBox/InputBox';
import Rank from './components/Rank/Rank';
import SigninForm from './components/SigninForm/SigninForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import FaceDetectionField from './components/FaceDetectionField/FaceDetectionField';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
 apiKey: '42c3390fd05a4037bd6d0727dbfe5e2b'
});
const particleParameter = {
                particles: {
                  line_linked: {
                    shadow: {
                      enable: true,
                      color: "#3CA9D1",
                      blur: 5
                    }
                  }
                }
              }
 const initialState = {
      input : ' ',
      imageUrl:' ',
      box :{ },
      route:'signin',
      isSignedIn:false,
      user:{
        name:'',
        email:'',
        id:'',
        entries:0,
        joined:''
      }
 }             
class App extends Component  {
  constructor (){
    super();
    this.state = initialState;
  }

  loadUser =(data)=>{
    this.setState({user:{
        name:data.name,
        email:data.email,
        id:data.id,
        entries:data.entries,
        joined:data.joined
    }
    })
  }

  calculateFaceLocation =(data) =>{
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputimage'); 
      const width = Number(image.width);
      const height = Number(image.height);
      return{
        leftCol : clarifaiFace.left_col * width,
        topRow : clarifaiFace.top_row * height,
        rightCol  : width -(clarifaiFace.right_col * width),
        bottomRow  : width -(clarifaiFace.bottom_row * height),
      }
  }

  displayFaceBox = (box)=>{
    this.setState ({box : box})
  }
  onInputChange=(event)=>{
    this.setState({ input : event.target.value });
  }
  onButtonClick=()=>{
       this.setState({imageUrl: this.state.input});
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
          .then(response => {
             if(response){
            fetch('http://localhost:3000/image',{
              method:'put',
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify({
                id: this.state.user.id
              })
            }).then(response=> response.json()
              .then(count =>{
                this.setState(Object.assign(this.state.user,{entries: count}))
              })).catch(console.log)
          }    
            this.displayFaceBox(this.calculateFaceLocation(response))
        })
        .catch(err => console.log(err));
  }
  onRouteChange = (route)=>{
    if(route === 'signout'){
      this.setState({isSignedIn : initialState})
    }else if (route === 'home'){
      this.setState({isSignedIn : true})
    }
    this.setState({route :route})
  }
  render(){
    const  {isSignedIn, imageUrl, route, box} = this.state;
    return (
                <div className="App">
                  <Particles className='particles'
                          params={particleParameter}
                        />
                    <Navigation isSignedIn = {isSignedIn}onRouteChange = {this.onRouteChange}/>
                    {
                      route === 'home' 
                      ?    <div>
                                  <Logo/>
                                  <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                                  <InputBox onInputChange={this.onInputChange} onButtonClick ={this.onButtonClick}/>
                                  <FaceDetectionField box ={box}imageUrl={imageUrl}/>
                              </div>
                       : (
                        route === 'register'
                               ? <RegisterForm loadUser ={this.loadUser} onRouteChange = {this.onRouteChange}/>
                               : <SigninForm loadUser ={this.loadUser} onRouteChange =  {this.onRouteChange}/> 
                        )
                    }  
                </div>
              );
          }
  }
  
export default App;
