import React from 'react'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      name: '',
      nameErrorMessage: '',
      emailErrorMessage: '',
      passwordErrorMessage: '',
      emailIsValid: false,
      passwordIsValid: false,
      nameIsValid: false,
    }
  }
  onNameChange = event => {
    this.setState({ nameErrorMessage: '' })
    if (event.target.value.length < 3) {
      this.setState({ nameIsValid: false })
    } else {
      this.setState({ nameIsValid: true })
    }

    this.setState({ name: event.target.value })
  }

  onEmailChange = event => {
    this.setState({ emailErrorMessage: '' })

    // eslint-disable-next-line
    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,63}$/

    if (emailRegex.test(event.target.value)) {
      this.setState({ emailIsValid: true })
    } else {
      this.setState({ emailIsValid: false })
    }
    this.setState({ email: event.target.value })
  }

  onPasswordChange = event => {
    this.setState({ passwordErrorMessage: '' })

    // eslint-disable-next-line
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

    if (passwordRegex.test(event.target.value)) {
      this.setState({ passwordIsValid: true })
    } else {
      this.setState({ passwordIsValid: false })
    }
    this.setState({ password: event.target.value })
  }

  onSubmitRegister = event => {
    event.preventDefault()

    if (
      this.state.nameIsValid &&
      this.state.emailIsValid &&
      this.state.passwordIsValid
    ) {
      console.log(this.state.email)
      fetch('http://localhost:3004/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          name: this.state.name,
        }),
      })
        .then(response => response.json())
        .then(user => {
          if (user.id) {
            this.props.loadUser(user)
            this.props.onRouteChange('home')
          }
        })
    }

    if (!this.state.nameIsValid) {
      this.setState({
        nameErrorMessage: 'Name should be at least 3 characters long',
      })
    }
    if (!this.state.emailIsValid) {
      this.setState({
        emailErrorMessage: 'Invalid email',
      })
    }
    if (!this.state.passwordIsValid) {
      this.setState({
        passwordErrorMessage:
          'Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number',
      })
    }
  }
  render() {
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-100-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <form className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  onChange={this.onNameChange}
                  className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                />
                {this.state.nameErrorMessage ===
                'Name should be at least 3 characters long' ? (
                  <p className="dark-red b--dark-red fw4 f7">
                    {this.state.nameErrorMessage}
                  </p>
                ) : (
                  ''
                )}
              </div>
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
                {this.state.emailErrorMessage === 'Invalid email' ? (
                  <p className="dark-red b--dark-red fw4 f7">
                    {this.state.emailErrorMessage}
                  </p>
                ) : (
                  ''
                )}
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
                {this.state.passwordErrorMessage ===
                'Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number' ? (
                  <p className="dark-red b--dark-red fw4 f7">
                    {this.state.passwordErrorMessage}
                  </p>
                ) : (
                  ''
                )}
              </div>
            </fieldset>
            <div className="">
              <button
                // disabled={
                //   !this.state.emailIsValid || !this.state.passwordIsValid
                // }
                onClick={this.onSubmitRegister}
                onSubmit={this.onSubmitRegister}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
        </main>
      </article>
    )
  }
}
export default Register
