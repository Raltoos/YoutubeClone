import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { UserLoginContext } from "../../store/LoginCreds/userLoginContext";

const SignIn = () => {
  const { user, setUser } = useContext(UserLoginContext);

  console.log(user);
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Error:", error.code, error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Sign In</h1>
      {user ? (
        <div>
          <p>Signed in as: {user.displayName}</p>
          <p>Email: {user.email}</p>

          <NavLink to="../">
            <button>Coninue logged in</button>
          </NavLink>
        </div>
      ) : (
        <button style={styles.button} onClick={handleSignIn}>
          Sign In with Google
        </button>
      )}
    </div>
  );
};

// Simple styles for the sign-in page
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f7f7f7",
  },
  button: {
    backgroundColor: "#4285F4",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    outline: "none",
  },
};

export default SignIn;
