import ListRow from '@shared/ListRow'
import { useCallback } from 'react'
import flatten from 'lodash.flatten'
import { getCards } from '@/remote/card'
import { useInfiniteQuery } from 'react-query'
import InfiniteScroll from 'react-infinite-scroll-component'
import Badge from '@shared/Badge'
import { useNavigate } from 'react-router-dom'

export function CardList() {
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery(
    ['cards'],
    ({ pageParam = null }) => {
      return getCards(pageParam)
    },
    {
      getNextPageParam: (snapshot) => {
        console.log('snapshot:', snapshot)
        return snapshot.lastVisible
      },
      suspense: true,
    },
  )

  const navigate = useNavigate()

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) return
    fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])

  const cards = flatten(data?.pages.map(({ items }) => items))

  if (data == null) {
    return null
  }
  return (
    <div style={{ height: '80dvh' }}>
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage ?? false}
        loader={<ListRow.Skeleton />}
        next={loadMore}
        scrollThreshold="100px"
      >
        <ul>
          {cards.map((card, index) => {
            return (
              <ListRow
                key={card.id}
                contents={
                  <ListRow.Texts
                    title={`${index + 1}위`}
                    subTitle={`${card.name}`}
                  />
                }
                right={
                  card.payback != null ? <Badge label={card.payback} /> : null
                }
                withArrow
                onClick={() => {
                  navigate(`/card/${card.id}`)
                }}
              />
            )
          })}
        </ul>
      </InfiniteScroll>
    </div>
  )
}
