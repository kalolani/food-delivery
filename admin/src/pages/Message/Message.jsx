import { useStores } from "../../contexts/storeContext";

function Message() {
  const { message } = useStores();
  console.log(message);
  return <div>{message}</div>;
}

export default Message;
