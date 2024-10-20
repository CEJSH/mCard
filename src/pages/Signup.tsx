import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'
import { FormValues } from '@/models/signup'
import Form from '@components/signup/Form'
import { auth, store } from '@/remote/firebase'
import { COLLECTIONS } from '@/constants'

export default function SignupPage() {
  const handleSubmit = async (formValues: FormValues) => {
    const { email, password, name } = formValues

    const { user } = await createUserWithEmailAndPassword(auth, email, password)

    await updateProfile(user, { displayName: name })

    const newUser = {
      uid: user.uid,
      email: user.email,
      displayName: name,
    }

    await setDoc(doc(collection(store, COLLECTIONS.USER), user.uid), newUser)

    // TODO: 로그인
  }

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}
