import ListRow from '@shared/ListRow'

export function CardList() {
  return (
    <div>
      <ul>
        <ListRow
          left={<div>left</div>}
          right={<div>right</div>}
          contents={<ListRow.Texts title="title" subTitle="subtitle" />}
          withArrow
        />
      </ul>
    </div>
  )
}
