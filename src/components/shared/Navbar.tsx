import { css } from '@emotion/react'
import { Link, useLocation } from 'react-router-dom'
import { signOut } from 'firebase/auth'

import Flex from './Flex'
import Button from './Button'
import { colors } from '@styles/colorPalette'
import useUser from '@/hooks/auth/useUser'
import { useCallback } from 'react'
import { auth } from '@remote/firebase'
import MyImage from '@components/my/MyImage'

export default function Navbar() {
  const location = useLocation()
  const showSignButton =
    ['/signup', '/signin'].includes(location.pathname) === false

  const user = useUser()

  const renderButton = useCallback(() => {
    if (user != null) {
      return (
        <Link to="/my">
          <MyImage size={40} />
        </Link>
      )
    }
    if (showSignButton) {
      return (
        <Link to="/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      )
    }
  }, [user, showSignButton])

  return (
    <Flex css={navbarContainerStyles} justify={'space-between'} align="center">
      <Link to="/">홈</Link>
      {renderButton()}
    </Flex>
  )
}

const navbarContainerStyles = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.grey};
`
