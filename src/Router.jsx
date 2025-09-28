import {
  createHashRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "./app.jsx";
import IP, { port } from "./data/localIp.mjs";
import { HomePage, Account, UserLyaout, ErrorPage } from "./routers.mjs";

function parse_token({ url, username, password }) {
  return new Promise((reslove, reject) => {
    fetch(`http://${IP}:${port}/${url}/${username}/${password}`, {
      method: "POST",
    })
      .then((res) => reslove(res))
      .catch((error) => reject(error));
  });
}

function check_token() {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  }
}

async function from_action({ data, router }) {
  const user = data.username;
  const password = data.password;
  try {
    const response = parse_token({
      url: `user/${router}`,
      username: `${user}`,
      password: `${password}`,
    });
    const Json_data = await response.then((res) => res.json());
    return Json_data;
  } catch (e) {
    console.log(e);
    return { code: "500" };
  }
}

const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route id="root" path="/" element={<App />} errorElement={<ErrorPage />}>
        <Route index element={<HomePage />} />
      </Route>
      {/* 用户 */}
      <Route
        id="User"
        element={<UserLyaout />}
        loader={() => {
          const state = check_token();
          if (state) {
            throw new Response(null, {
              status: 302,
              headers: { Location: "/?state=islogined" },
            });
          }
          return null;
        }}
      >
        <Route
          path="/account"
          element={<Account />}
          action={async ({ request }) => {
            const formAction = Object.fromEntries(await request.formData());
            const data = {
              username: formAction.username,
              password: formAction.password,
            };
            if (formAction.formType === "form1") {
              const state = await from_action({ data: data, router: "login" });
              return state;
            }
            if (formAction.formType === "form2") {
              const state = await from_action({ data: data, router: "enroll" });
              return state;
            }
          }}
        />
      </Route>
    </>
  )
);

export { router };
