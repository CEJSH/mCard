import Text from '@shared/Text'
import Button from '@shared/Button'
import Input from './components/shared/Input'
import TextField from './components/shared/TextField'
import Alert from './components/shared/Alert'

import { useAlertContext } from './contexts/AlertContext'

function App() {
  const { open } = useAlertContext()
  return (
    <div>
      <Text typography="t1" display="block" color="red">
        t1
      </Text>
      <Text typography="t2" color="blue">
        t2
      </Text>
      <Text typography="t3">t3</Text>
      <Text typography="t4">t4</Text>
      <Text>t5</Text>
      <div style={{ height: 10, width: '100%', background: '#efefef' }} />
      <Button>클릭해주세요</Button>
      <Button color="success">클릭해주세요</Button>
      <Button color="error">클릭해주세요</Button>
      <Button color="success" weak={true}>
        클릭해주세요
      </Button>
      <Button color="error" weak={true}>
        클릭해주세요
      </Button>
      <Button full={true}>클릭해주세요</Button>
      <Button full={true} disabled>
        클릭해주세요
      </Button>
      <div style={{ height: 10, width: '100%', background: '#efefef' }} />
      <Input placeholder="글자를 입력해 주세요" aria-invalid={true} />
      <Input placeholder="글자를 입력해 주세요" aria-invalid={false} />

      <TextField label="id" />
      <TextField label="password" />

      {/* <Alert
        title="alert is here"
        description="안녕하시와요"
        onButtonClick={() => {}}
        open={true}
      /> */}
      <Button
        onClick={() => {
          open({
            title: '카드 신청 완료',
            description: '내역 페이지에서 확인해 주세요',
            onButtonClick: () => {
              //
            },
          })
        }}
      >
        Alert오픈
      </Button>
    </div>
  )
}

export default App
