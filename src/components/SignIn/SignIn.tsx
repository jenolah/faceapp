import { useState } from 'react'
import './SignIn.css'
import {State} from '../../App'

type SignInProps = {
  onRouteChange: (route: string) => void,
  loadUser: (data:State["user"]) => void
}

const SignIn = ({ onRouteChange, loadUser }:SignInProps) => {
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [emailIsValid, setEmailIsValid] = useState(false)
  const [passwordIsValid, setPasswordIsValid] = useState(false)

  const onEmailChange = (event: any) => {
    // eslint-disable-next-line
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,63}$/

    setErrorMessage('')
    setEmailIsValid(emailRegex.test(event.target.value))
    setSignInEmail(event.target.value)
  }
  const onPasswordChange = (event:any) => {
    setErrorMessage('')
    setPasswordIsValid(event.target.value)
    setSignInPassword(event.target.value)
  }

  const onSubmitSignIn = async (event:any) => {
    event.preventDefault()
    const response = await fetch('http://localhost:3004/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
    const user = await response.json()
    if (user.id) {
      loadUser(user)
      onRouteChange('home')
    } else if (user === 'credentials empty') {
      setErrorMessage('Please fill every field in')
    } else if (user === 'invalid credentials') {
      setErrorMessage('Invalid email or password')
    } else {
      setErrorMessage('other')
    }
  }

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
                onChange={onEmailChange}
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
                onChange={onPasswordChange}
                className="b pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
              />
            </div>
            {errorMessage !== '' ? (
              <p className="dark-red bg-washed-red b--dark-red ba pa2 fw5 f6">
                {errorMessage}
              </p>
            ) : (
              ''
            )}
          </fieldset>

          <div className="">
            <button
              disabled={!emailIsValid || !passwordIsValid}
              onSubmit={onSubmitSignIn}
              onClick={onSubmitSignIn}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
            >
              Sign In
            </button>
          </div>
          <div className="lh-copy mt3">
            <p
              onClick={() => onRouteChange('register')}
             //href="#0"
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

export default SignIn
