import "react-toastify/dist/ReactToastify.css";
import { useEffect, useRef } from "react";
import { Outlet, Link, useLocation, useSearchParams } from "react-router-dom";
import { toast, ToastContainer, Slide } from "react-toastify";
import { useStore } from "./store.js";
import { SidebarProvider } from "@/shadcn/ui/sidebar.js";
import { AppSidebar } from "@/shadcn/components/app-sidebar";

function RouterComponent() {
  const isLogined = useStore((state) => state.isLogined);
  return (
    <>
      {isLogined ? (
        <Link to="/user" className="p-1 hover:bg-gray-200 ">
          账户
        </Link>
      ) : (
        <>
          <Link to="/account" className="p-1 hover:bg-gray-200 ">
            登录
          </Link>
          <Link to="/account" className="p-1 hover:bg-gray-200 ">
            注册
          </Link>
        </>
      )}
    </>
  );
}

function App() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(location.search);
  const loginIn = useStore((state) => state.loginIn);
  const loginOut = useStore((state) => state.loginOut);
  const toastId = useRef(null);
  useEffect(() => {
    const status = decodeURI(searchParams.get("state"));
    const msg = decodeURI(searchParams.get("msg"));
    if (!toast.isActive(toastId.current)) {
      switch (status) {
        case "login":
          toastId.current = toast.success(msg);
          break;
        case "islogined":
          toastId.current = toast.success("已登录");
          break;
        case "tokenError":
          toastId.current = toast.warning(msg);
          break;
        case "404":
          toastId.current = toast.error("服务器未响应");
          break;
        default:
          break;
      }
    }
    return () => {
      setSearchParams("");
    };
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loginIn();
    } else {
      loginOut();
    }
  }, [loginIn, loginOut]);

  return (
    <>
    <p className="font-bold text-9xl text-amber-300">123</p>
      <SidebarProvider
        open={true}
        className="relative h-screen w-screen"
        style={{
          "--sidebar-width": "20rem",
          "--sidebar-width-mobile": "20rem",
        }}
      >
        <AppSidebar />
        {/* 主体 */}
        <p className="font-semibold bg-blue-500 text-red-500">123456</p>
        <p className="font-semibold bg-blue-500 text-red-500">123456</p>
        <p className="font-semibold bg-blue-500 text-red-500">123456</p>
        <p className="font-semibold bg-blue-500 text-red-500">123456</p>
        <p className="font-semibold bg-blue-500 text-red-500">123456</p>
        <div className=""><Outlet /></div>
      </SidebarProvider>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        closeButton={true}
        transition={Slide}
        hideProgressBar={true}
        pauseOnHover={true}
        pauseOnFocusLoss={false}
        closeOnClick={true}
        newestOnTop={true}
        role="alert"
        theme="light"
      />
    </>
  );
}

export default App;
