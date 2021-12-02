interface NavigationProps {
  onRouteChange: (route: string) => void,
  isSignedIn: boolean,
  route: string,
}

const Navigation = ({ onRouteChange, isSignedIn, route }: NavigationProps) => {
  if (isSignedIn) {
    if (route === "profile") {
      return (
        <div className="flex justify-between">
          <h1 className="flex justify-start f1 black pa2 ph4">Profile</h1>
          <nav className="flex justify-end">
            <p
              onClick={() => onRouteChange("home")}
              className="f3 link dim black underline pa3 pointer"
            >
              Home
            </p>
            <p
              onClick={() => onRouteChange("signout")}
              className="f3 link dim black underline pa3 pointer"
            >
              Sign out
            </p>
          </nav>
        </div>
      )
    } else {
      return (
        <div className="flex justify-between">
          <h1 className="flex justify-start f1 black pa2 ph4">Home</h1>
          <nav style={{ display: "flex", justifyContent: "flex-end" }}>
            <p
              onClick={() => onRouteChange("profile")}
              className="f3 link dim black underline pa3 pointer"
            >
              Profile
            </p>
            <p
              onClick={() => onRouteChange("signout")}
              className="f3 link dim black underline pa3 pointer"
            >
              Sign out
            </p>
          </nav>
        </div>
      )
    }
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => onRouteChange("signin")}
          className="f3 link dim black underline pa3 pointer"
        >
          Sign In
        </p>
        <p
          onClick={() => onRouteChange("register")}
          className="f3 link dim black underline pa3 pointer"
        >
          Register
        </p>
      </nav>
    )
  }
}

export default Navigation
