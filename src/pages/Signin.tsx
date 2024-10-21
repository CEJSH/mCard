import { useCallback } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import { auth } from '@remote/firebase'
import Form from '@/components/signin/Form'
import { FormValues } from '@/models/signin'
import { useAlertContext } from '@/contexts/AlertContext'
import { FirebaseError } from 'firebase/app'

export default function SigninPage() {
  const { open } = useAlertContext()
  const navigate = useNavigate()

  const handleSubmit = useCallback(
    async (formValues: FormValues) => {
      const { email, password } = formValues
      // 비밀번호 오류시 에러가 발생하므로 try catch
      try {
        await signInWithEmailAndPassword(auth, email, password)
        navigate('/')
      } catch (e) {
        // firebase의 에러
        if (e instanceof FirebaseError) {
          if (e.code === 'auth/wrong-password') {
            open({
              title: '계정의 정보를 다시 확인해주세요',
              onButtonClick: () => {
                //
              },
            })
            return
          }
        }
        // 일반적인 에러
        open({
          title: '잠시 후 다시 시도해주세요.',
          onButtonClick: () => {
            //
            console.log(e)
          },
        })
      }
    },
    [open],
  )

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}
