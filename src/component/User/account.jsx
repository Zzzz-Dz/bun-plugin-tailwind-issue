import { Form, useActionData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStore } from "../../store.js";
import { toast, ToastContainer, Slide } from "react-toastify";
import { Button } from "@/shadcn/ui/button.js";

function LoginForm({ set }) {
	return (
		<Form
			name="login"
			className="flex flex-col items-center gap-4 h-full justify-center relative z-20"
			method="post"
		>
			<input type="hidden" name="formType" value="form1" />
			<label className="tracking-widest">
				<span className="px-2">账户</span>
				<input
					type="text"
					className="form-input rounded-md py-1"
					name="username"
				/>
			</label>
			<label className="tracking-widest">
				<span className="px-2">密码</span>
				<input
					type="text"
					className="form-input rounded-md py-1"
					name="password"
				/>
			</label>
			<div className="flex gap-4">
				<Button type="submit">提交</Button>
				<Button
					type="Button"
					onClick={(e) => {
						e.preventDefault();
						set();
					}}
				>
					注册
				</Button>
			</div>
		</Form>
	);
}

function EnrollForm({ set }) {
	return (
		<Form
			name="enroll"
			className="flex flex-col items-center gap-4 h-full justify-center relative z-20"
			method="post"
		>
			<input type="hidden" name="formType" value="form2" />
			<label className="tracking-widest">
				<span className="px-2">账户</span>
				<input
					type="text"
					className="form-input rounded-md py-1"
					name="username"
				/>
			</label>
			<label className="tracking-widest">
				<span className="px-2">密码</span>
				<input
					type="text"
					className="form-input rounded-md py-1"
					name="password"
				/>
			</label>
			<div className="flex gap-4">
				<Button type="submit">提交</Button>
				<Button
					type="Button"
					onClick={(e) => {
						e.preventDefault();
						set();
					}}
				>
					返回
				</Button>
			</div>
		</Form>
	);
}

function IsFrom() {
	const [state, setState] = useState("login");
	function handelClick() {
		setState(state === "login" ? "enroll" : "login");
	}
	return (
		<>
			{state === "login" ? (
				<LoginForm set={handelClick} />
			) : (
				<EnrollForm set={handelClick} />
			)}
		</>
	);
}

export default function Account() {
	const actionData = useActionData();
	const navigate = useNavigate();
	const loginIn = useStore((state) => state.loginIn);
	useEffect(() => {
		if (actionData) {
			console.log(actionData);
			const { code, msg = null, data = null } = actionData;
			if (code === "500") {
				toast.error("服务器未响应");
			}
			if (code === "502" || code === "501") {
				console.log(msg);
				toast.error(data);
			}
			if (code === "201") {
				toast.success("登录成功");
				setTimeout(() => {
					localStorage.setItem("token", data);
					loginIn();
					navigate("/", { Option: { replace: true } });
				}, 2000);
			}
		}
	}, [actionData, navigate, loginIn]);
	return (
		<>
			<ToastContainer
				position="top-center"
				autoClose={1500}
				closeButton={false}
				transition={Slide}
				hideProgressBar={false}
				pauseOnHover={false}
				pauseOnFocusLoss={false}
				closeOnClick={true}
				newestOnTop={true}
				role="alert"
				theme="light"
			/>
			<div className="flex justify-center items-center relative h-screen">
				<div className=" relative rounded-2xl z-20  border-2 lg:w-2/3 h-3/4 w-[25rem]">
					<IsFrom />
				</div>
			</div>
		</>
	);
}
