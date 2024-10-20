import {
  collection,
  getDocs,
  QuerySnapshot,
  query,
  limit,
  startAfter,
  doc,
  getDoc,
} from 'firebase/firestore'

import { store } from './firebase'
import { COLLECTIONS } from '@/constants'
import { Card } from '@/models/card'

// pageParam => 지금 보이고 있는 맨 마지막 요소
export async function getCards(pageParam?: QuerySnapshot<Card>) {
  // 맨 처음 불렀을 때에는 커서가(pageParam) 없을 것이기 때문에 쿼리를 분류해주어야 한다(커서 여부에 따라 쿼리를 분류)
  const cardQuery =
    pageParam == null
      ? query(collection(store, COLLECTIONS.CARD), limit(10))
      : query(
          collection(store, COLLECTIONS.CARD),
          startAfter(pageParam),
          limit(10),
        )
  // startAfter로부터 10개를 불러온다!

  const cardSnapshot = await getDocs(cardQuery)
  // 커서라는 걸 뽑아내야 함 (지금 불러온 데이터의 마지막 문서를 커서로 할 것)
  const lastVisible = cardSnapshot.docs[cardSnapshot.docs.length - 1]

  const items = cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))

  return { items, lastVisible }
}

export async function getCard(id: string) {
  const snapshot = await getDoc(doc(store, COLLECTIONS.CARD, id))
  return {
    id,
    ...(snapshot.data() as Card),
  }
}
