import Button from '@shared/Button'
import { collection, doc, writeBatch } from 'firebase/firestore'
import { COLLECTIONS } from '@/constants'
import { store } from '@remote/firebase'
import { adBanners } from '@/mock/data'

export function AdBannerListAddButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)

    adBanners.forEach((banner) => {
      const docRef = doc(collection(store, COLLECTIONS.BANNER))

      batch.set(docRef, banner)
    })

    await batch.commit()

    alert('banner list added')
  }

  return <Button onClick={handleButtonClick}>광고 배너 리스트 추가하기</Button>
}
