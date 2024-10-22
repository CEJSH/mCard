import { useQuery } from 'react-query'
import { useInView } from 'react-intersection-observer'

import Skeleton from '@shared/Skeleton'
import Spacing from '@shared/Spacing'

export default function Review() {
  const { ref, inView } = useInView({
    triggerOnce: true,
  })

  // 실제 요청하지는 않고 네트워크 요청을 일으키는 것처럼 흉내를 낸다.
  const { data = [], isLoading } = useQuery(
    ['review'],
    () => {
      return new Promise<string[]>((resolve) => {
        setTimeout(() => {
          resolve(['너무 좋아요', '빨리 신청하길!'])
        }, 2_000)
      })
    },
    { enabled: inView },
  )

  return (
    <div ref={ref}>
      {isLoading ? (
        <>
          <Skeleton width={30} height={10} />
          <Spacing size={3} />
          <Skeleton width={30} height={10} />
        </>
      ) : (
        data.map((review) => <div key={review}>{review}</div>)
      )}
      {inView ? 'In View' : 'Not In View'}
    </div>
  )
}
