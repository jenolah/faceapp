import { Component, ChangeEvent } from 'react'
import './App.css'
import Navigation from './components/Navigation/Navigation'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import Profile from './components/Profile/Profile'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Rank from './components/Rank/Rank'
import Particles from 'react-tsparticles'
import particlesOptions from './particlesjs-config'

export interface State {
  input: string
  imageUrl: string
  box: {
    topRow?: number
    rightCol?: number
    bottomRow?: number
    leftCol?: number
  }
  route: string
  isSignedIn: boolean
  user: {
    id: string | number
    name: string
    email: string
    entries: number
    joined: string
    rank: number
  }
  faceErrorMessage: string
  isLoadingErrorMessage: boolean
}

const initialState: State = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    rank: 0,
  },
  faceErrorMessage: '',
  isLoadingErrorMessage: false,
}

class App extends Component<any, any> {
  constructor(props: any) {
    super(props)
    //Particles
    this.particlesInit = this.particlesInit.bind(this)
    this.particlesLoaded = this.particlesLoaded.bind(this)

    //Linkform
    this.state = initialState
  }

  loadUser = (data: State['user']) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
        rank: data.rank,
      },
    })
  }

  calculateFaceLocation = (data: any) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box
    const image: any = document.getElementById('inputimage')
    const width = Number(image.width)
    const height = Number(image.height)
    console.log(data)
    console.log(image)
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    }
  }

  displayFaceBox = (box: any) => {
    this.setState({ box: box })
  }

  //Linkform
  onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: event.target.value })
    this.setState({ faceErrorMessage: '' })
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    this.setState({ isLoadingErrorMessage: true })
    if (this.state.input === '') {
      this.setState({ faceErrorMessage: 'Field cannot be empty' })
      this.setState({ isLoadingErrorMessage: false })
    } else {
      fetch('http://localhost:3004/imageurl', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: this.state.input,
        }),
      })
        .then(response => response.json())
        .then(response => {
          if (response.outputs[0].data.regions) {
            fetch('http://localhost:3004/image', {
              method: 'put',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                id: this.state.user.id,
              }),
            })
              .then(response => response.json())
              .then(count => {
                this.setState(Object.assign(this.state.user, { rank: count }))
                this.setState({ isLoadingErrorMessage: false })
              })
              .catch(console.log)
          } else {
            return this.setState({ faceErrorMessage: 'No face detected' })
          }
          this.displayFaceBox(this.calculateFaceLocation(response))
        })
        .catch(err => {
          this.setState({ faceErrorMessage: 'Invalid URL' }, () => {
            console.log(err)
          })
          this.setState({ isLoadingErrorMessage: false })
        })
    }
  }

  //Particles
  particlesInit(main: any) {
    // console.log(main)
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  }
  particlesLoaded(container: any) {
    //  console.log(container)
  }

  onRouteChange = (route: string) => {
    if (route === 'signout') {
      this.setState(initialState)
      return
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    } else if (route === 'profile') {
      fetch(`http://localhost:3004/profile/${this.state.user.id}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(response => response.json())
        .then(data => {
          this.loadUser(data)
        })
        .catch(console.log)
    }
    this.setState({ route: route })
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state
    const { name, email, entries, joined, rank } = this.state.user
    return (
      <div className='App'>
        <Particles
          className='particle'
          id='tsparticles'
          options={particlesOptions}
          init={this.particlesInit}
          loaded={this.particlesLoaded}
        />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
          route={this.state.route}
        />
        {route === 'home' ? (
          <div>
            <Logo />
            <Rank name={this.state.user.name} rank={this.state.user.rank} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
              faceErrorMessage={this.state.faceErrorMessage}
              isLoadingErrorMessage={this.state.isLoadingErrorMessage}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        ) : route === 'signin' ? (
          <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : route === 'register' ? (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        ) : (
          <div className='flex'>
            <Logo />
            <Profile
              name={name}
              email={email}
              entries={entries}
              joined={joined}
              rank={rank}
            />
          </div>
        )}
      </div>
    )
  }
}

export default App

//<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
