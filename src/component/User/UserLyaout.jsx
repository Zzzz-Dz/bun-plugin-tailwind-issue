import { Link, Outlet } from "react-router-dom"

export default function UserLyaout(){
    return(
        <div className=" grid grid-flow-col grid-cols-[1fr_60vw] h-screen overflow-clip ">
            {/* 左侧图片壁纸 */}
            <img src="" alt='' />
            {/* 右侧登录注册 */}
            <div className="grid grid-flow-row grid-rows-[3rem_1fr] bg-linear-to-r from-white to-blue-100 ">
                <nav className="grid grid-flow-col place-content-start content-center px-4">
                    <Link className=" font-thin" to={'/'}>首页</Link>
                </nav>
                <Outlet />
            </div>
        </div>
    )
}