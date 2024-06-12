import { useEffect, useState } from "react";
import axios from "axios";
import { useStores } from "../../contexts/storeContext";

function Email() {
  const [emailCount, setEmailCount] = useState(null);
  const { url } = useStores();

  useEffect(() => {
    axios
      .get(`${url}/api/email/count`)
      .then((response) => {
        setEmailCount(response.data.emailCount);
      })
      .catch((error) => {
        console.error("Error fetching user count:", error);
      });
  }, []);

  return (
    <div>{emailCount !== null ? <p>{emailCount}</p> : <p>Loading...</p>}</div>
  );
}

export default Email;
