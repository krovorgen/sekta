import { FormEvent } from 'react'

import { Modal } from '@alfalab/core-components/modal'
import { Input } from '@alfalab/core-components/input'
// import { Textarea } from '@alfalab/core-components/textarea'
import { Button } from '@alfalab/core-components/button'
import { Gap } from '@alfalab/core-components/gap'

import styles from '../../Forum.module.scss'

export type ModalProps = {
  openModal: boolean
  handleClose: () => void
  onSubmit: (event: FormEvent<Element>) => void
  titleValue: string
  setTitleValue: React.Dispatch<React.SetStateAction<string>>
  firstMessageValue: string
  setFirstMessageValue: React.Dispatch<React.SetStateAction<string>>
}

export const ForumsModal = ({
  openModal,
  handleClose,
  onSubmit,
  titleValue,
  setTitleValue,
  firstMessageValue,
  setFirstMessageValue,
}: ModalProps) => {
  return (
    <Modal open={openModal} onClose={handleClose} size={'l'}>
      <Modal.Header
        hasCloser={true}
        hasBackButton={false}
        sticky={true}
        title={'Что вы хотите написать?'}
      />

      <Modal.Content>
        <form onSubmit={onSubmit}>
          <Input
            value={titleValue}
            block={true}
            onChange={e => setTitleValue(e.target.value)}
            label="Заголовок"
          />
          <Gap size="s" />
          {/* <Textarea
            value={firstMessageValue}
            block={true}
            onChange={e => setFirstMessageValue(e.target.value)}  
            label="То о чем вы хотите написать"
            size="xl"
            minRows={3}
            maxLength={96}
            showCounter={true}
          /> */}
          <textarea
            className={styles.textarea}
            value={firstMessageValue}
            onChange={e => setFirstMessageValue(e.target.value)}
            placeholder="То о чем вы хотите написать"
            rows={5}
          />
        </form>
      </Modal.Content>

      <Modal.Footer sticky={false}>
        <Button view="primary" size="s" onClick={onSubmit}>
          Отправить
        </Button>

        <Button view="secondary" size="s" onClick={handleClose}>
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
