import React, { useState } from 'react'

const Register = ({ onRouteChange, loadUser }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [nameErrorMessage, setNameErrorMessage] = useState('')
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const [emailIsValid, setEmailIsValid] = useState(false)
  const [passwordIsValid, setPasswordIsValid] = useState(false)
  const [nameIsValid, setNameIsValid] = useState(false)

  const onNameChange = event => {
    setNameErrorMessage('')
    if (event.target.value.length < 3) {
      setNameIsValid(false)
    } else {
      setNameIsValid(true)
    }
    setName(event.target.value)
  }

  const onEmailChange = event => {
    setEmailErrorMessage('')

    // eslint-disable-next-line
    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,63}$/

    if (emailRegex.test(event.target.value)) {
      setEmailIsValid(true)
    } else {
      setEmailIsValid(false)
    }
    setEmail(event.target.value)
  }

  const onPasswordChange = event => {
    setPasswordErrorMessage('')

    // eslint-disable-next-line
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

    if (passwordRegex.test(event.target.value)) {
      setPasswordIsValid(true)
    } else {
      setPasswordIsValid(false)
    }
    setPassword(event.target.value)
  }

  const onSubmitRegister = event => {
    event.preventDefault()

    if (nameIsValid && emailIsValid && passwordIsValid) {
      console.log(email)
      fetch('http://localhost:3004/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
        }),
      })
        .then(response => response.json())
        .then(user => {
          if (user.id) {
            loadUser(user)
            onRouteChange('home')
          }
        })
    }

    if (!nameIsValid) {
      setNameErrorMessage('Name should be at least 3 characters long')
    }
    if (!emailIsValid) {
      setEmailErrorMessage('Invalid email')
    }
    if (!passwordIsValid) {
      setPasswordErrorMessage(
        'Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number'
      )
    }
  }
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
                onChange={onNameChange}
                className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
              />
              {nameErrorMessage ===
              'Name should be at least 3 characters long' ? (
                <p className="dark-red b--dark-red fw4 f7">
                  {nameErrorMessage}
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
                onChange={onEmailChange}
                className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
              />
              {emailErrorMessage === 'Invalid email' ? (
                <p className="dark-red b--dark-red fw4 f7">
                  {emailErrorMessage}
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
                onChange={onPasswordChange}
                className="b pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
              />
              {passwordErrorMessage ===
              'Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number' ? (
                <p className="dark-red b--dark-red fw4 f7">
                  {passwordErrorMessage}
                </p>
              ) : (
                ''
              )}
            </div>
          </fieldset>
          <div className="">
            <button
              // disabled={
              //   !emailIsValid || !passwordIsValid
              // }
              onClick={onSubmitRegister}
              onSubmit={onSubmitRegister}
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
export default Register
