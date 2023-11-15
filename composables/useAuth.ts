import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'

export const useAuth = () => {
  const token = useState<string | null>('token', () => null)
  const user = useState<User | null>('user', () => null)

  // サインアップ
  const signUp = async (email: string, password: string) => {
    return await new Promise((resolve)=>{
      const auth = getAuth()

      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // サインアップできたらログインする
        resolve("success")
        user.value = userCredential.user;
        userCredential.user
        .getIdToken()
          .then((idToken) => {
            token.value = idToken
          })
        .catch()

        navigateTo('/')
      })
      .catch((error) => {
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
          user.value = userCredential.user;
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
          user.value = null
          resolve()
          navigateTo('/login')
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
        (userData) => {
          if (userData) {
            userData
              .getIdToken()
              .then((idtoken) => {
                token.value = idtoken
                user.value = userData
                resolve()
              })
              .catch(reject)
          } else {
            token.value = null
            user.value = null
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
    user,
    checkAuthState,
  }
}