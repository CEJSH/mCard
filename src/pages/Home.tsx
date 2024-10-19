import AdBanners from '@/components/home/AdBanners'
import { CardList } from '@/components/home/CardList'
import Top from '@shared/Top'

export default function HomePage() {
  return (
    <div>
      <Top title="카드의 정석" subTitle="잘라버려야할 카드이다^_^" />
      <AdBanners />
      <CardList />
    </div>
  )
}
