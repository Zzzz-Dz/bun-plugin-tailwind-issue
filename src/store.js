import { persist } from "zustand/middleware";
import {create} from "zustand";

const useStore = create(
	persist(
		(set) => ({
			isLogined: window.localStorage.getItem("isLogined") || false,
			loginIn: () => {
				window.localStorage.setItem("isLogined", true);
				set({ isLogined: true });
			},
			loginOut: () => {
				window.localStorage.setItem("isLogined", false);
				set({ isLogined: false });
			},
		}),
		{
			name: "user-storage"
		},
	),
);

export { useStore }