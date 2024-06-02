import { useEffect, useState } from "react";
import axios from "axios";
import { useStores } from "../../contexts/storeContext";

function User() {
  const [userCount, setUserCount] = useState(null);
  const { url } = useStores();

  useEffect(() => {
    axios
      .get(`${url}/api/user/count`)
      .then((response) => {
        setUserCount(response.data.userCount);
      })
      .catch((error) => {
        console.error("Error fetching user count:", error);
      });
  }, []);

  return (
    <div>{userCount !== null ? <p>{userCount}</p> : <p>Loading...</p>}</div>
  );
}

export default User;
