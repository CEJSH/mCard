import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { css } from '@emotion/react'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useQuery } from 'react-query'
import { colors } from '@/styles/colorPalette'
import { getAdBanners } from '@/remote/adBanner'
import 'swiper/css'

export default function AdBanners() {
  const { data, isLoading } = useQuery(['adBanners'], () => getAdBanners())
  if (data == null || isLoading) {
    return (
      <Container>
        <Flex direction="column" css={bannerContainerStyles}>
          <Text bold>&nbsp;</Text>
          <Text typography="t7">&nbsp;</Text>
        </Flex>
      </Container>
    )
  }
  return (
    <Container>
      <Swiper spaceBetween={8}>
        {data?.map((banner, idx) => {
          return (
            <SwiperSlide key={banner.id}>
              <Link to={banner.link}>
                <Flex direction="column" css={bannerContainerStyles}>
                  <Text bold>{banner.title}</Text>
                  <Text typography="t7">{banner.description}</Text>
                </Flex>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Container>
  )
}

const Container = styled.div`
  padding: 24px;
`

const bannerContainerStyles = css`
  padding: 16px;
  background-color: ${colors.grey};
  border-radius: 4px;
`
