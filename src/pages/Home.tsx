import AdBanners from '@components/home/AdBanners'
import { CardList } from '@components/home/CardList'
import ListRow from '@shared/ListRow'
import Top from '@shared/Top'
import { Suspense } from 'react'

export default function HomePage() {
  return (
    <div>
      <Top title="카드의 정석" subTitle="잘라버려야할 카드이다^_^" />
      <AdBanners />
      <Suspense
        fallback={[...new Array(10)].map((_, idx) => (
          <ListRow.Skeleton key={idx} />
        ))}
      >
        <CardList />
      </Suspense>
    </div>
  )
}
