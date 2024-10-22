import { useCallback } from 'react'

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Button from '@shared/Button'

import useUser from '@hooks/auth/useUser'
import { signOut } from 'firebase/auth'
import { auth } from '@remote/firebase'
import MyImage from '@components/my/MyImage'
import Spacing from '@components/shared/Spacing'

export default function MyPage() {
  const user = useUser()

  const handleLogout = useCallback(() => {
    signOut(auth)
  }, [signOut])

  return (
    <Flex direction="column" align={'center'}>
      <Spacing size={40} />
      <MyImage size={80} mode="upload" />

      <Spacing size={20} />
      <Text bold>{user?.displayName}</Text>

      <Spacing size={20} />
      <Button onClick={handleLogout}>로그아웃</Button>
    </Flex>
  )
}
