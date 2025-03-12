import Cookies from "js-cookie";
export const storeToken = (token: string) => {
	Cookies.set("token", token, {
		expires: 7, // Token expires in 7 days
		secure: false, // Ensures it's only set on HTTPS
		sameSite: "Strict", // Protects against CSRF attacks
	});
};
