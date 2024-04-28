import { useEffect, useState } from "react";
import { fetchData } from "../utils/api";
import { UserInterface } from "../types/UserInterface";

const Userprofile = () => {
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchDataAndHandleErrors = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchData();
        setUsers(data);
        setIsLoading(false);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataAndHandleErrors();
  }, []);
  return (
    <div className="App">
      <h1>Post title</h1>
      {isLoading && <h4>Loading....</h4>}
      {error &&
        <h5>
          {error}
        </h5>}

      {!isLoading &&
        !error &&
        users.length &&
        <ol>
          {users.map((user: UserInterface) =>
            <li key={user.id}>
              <h3>
                {user.name}
              </h3>
              <p>
                {user.email}
              </p>
            </li>
          )}
        </ol>}
    </div>
  );
};

export default Userprofile;
