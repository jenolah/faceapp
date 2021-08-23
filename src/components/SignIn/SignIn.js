import React from 'react'
import './SignIn.css'

class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signInEmail: '',
      signInPassword: '',
      errorMessage: '',
      emailIsValid: false,
      passwordIsValid: false,
    }
  }

  onEmailChange = event => {
    // eslint-disable-next-line
    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,63}$/

    this.setState({ errorMessage: '' })

    if (emailRegex.test(event.target.value)) {
      this.setState({ emailIsValid: true })
    } else {
      this.setState({ emailIsValid: false })
    }
    this.setState({ signInEmail: event.target.value })
  }
  onPasswordChange = event => {
    this.setState({ errorMessage: '' })
    if (event.target.value) {
      this.setState({ passwordIsValid: true })
    } else {
      this.setState({ passwordIsValid: false })
    }
    this.setState({ signInPassword: event.target.value })
  }

  onSubmitSignIn = event => {
    event.preventDefault()
    fetch('http://localhost:3004/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.id) {
          this.props.loadUser(data)
          this.props.onRouteChange('home')
        } else if (data === 'credentials empty') {
          this.setState({ errorMessage: 'Please fill every field in' })
        } else if (data === 'invalid credentials') {
          this.setState({ errorMessage: 'Invalid email or password' })
        } else {
          this.setState({ errorMessage: 'other' })
        }
      })
      .catch(console.log)
  }

  render() {
    const { onRouteChange } = this.props
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-100-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <form className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={this.onEmailChange}
                  className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={this.onPasswordChange}
                  className="b pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
              {this.state.errorMessage !== '' ? (
                <p className="dark-red bg-washed-red b--dark-red ba pa2 fw5 f6">
                  {this.state.errorMessage}
                </p>
              ) : (
                ''
              )}
            </fieldset>

            <div className="">
              <button
                disabled={
                  !this.state.emailIsValid || !this.state.passwordIsValid
                }
                onSubmit={this.onSubmitSignIn}
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
              >
                Sign In
              </button>
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => onRouteChange('register')}
                href="#0"
                className="f6 link dim black db pointer"
              >
                Register
              </p>
            </div>
          </form>
        </main>
      </article>
    )
  }
}

export default SignIn
