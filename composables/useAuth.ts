import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth'

export const useAuth = () => {
  const token = useState<string | null>('token', () => null)

  // サインアップ
  const signUp = async (email: string, password: string) => {
    return await new Promise((resolve)=>{
      const auth = getAuth()

      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential)
        // サインアップできたらログインする
        resolve("success")
      })
      .catch((error) => {
        console.log(error)
        const errorMessage = error.message;
        resolve(errorMessage)
      })
    })
  }

  // サインイン
  const signIn = async (email: string, password: string) => {
    return await new Promise<void>((resolve, reject) => {
      const auth = getAuth()

      return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          userCredential.user
            .getIdToken()
              .then((idToken) => {
                token.value = idToken
                resolve()
              })
            .catch(reject)
        })
    })
  }

  // サインアウト
  const signOut = async () => {
    return await new Promise<void>((resolve, reject) => {
      const auth = getAuth()
      // ログアウトする
      firebaseSignOut(auth)
        .then(() => {
          token.value = null
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  // ログイン状態確認
  const checkAuthState = async () => {
    return await new Promise<void>((resolve, reject) => {
      // client only
      if (process.server) return resolve()
      const auth = getAuth()

      onAuthStateChanged(
        auth,
        (user) => {
          if (user) {
            user
              .getIdToken()
              .then((idtoken) => {
                token.value = idtoken
                resolve()
              })
              .catch(reject)
          } else {
            token.value = null
            resolve()
          }
        },
        (error) => {
          reject(error)
        }
      )
    })
  }

  return {
    signUp,
    signIn,
    signOut,
    token,
    checkAuthState,
  }
}