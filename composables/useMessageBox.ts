type Variant = 'success' | 'warning' | 'error';

export const useMessageBox = () => {
  const isOpen = useState<boolean>('isOpen', () => false)
  const message = useState<string>('message', () => '')
  const onClickOk = useState<Function>('onClickOk', () => () => {})

  const openMessageBox = (msg: string, clickOk: Function) => {
    isOpen.value = true;
    message.value = msg;
    onClickOk.value = clickOk;
  }

  return {
    isOpen,
    message,
    onClickOk,
    openMessageBox,
  }
}