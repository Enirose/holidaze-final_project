import { loginUrl } from "../../components/constants/constantsUrl";
import * as storage from '../../components/localStorage';



export async function LoginUser(profile, onSuccess, onError) {
  const method = "post";

  try {
    const response = await fetch(loginUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    });

    const json = await response.json();
    const { accessToken, ...user } = json;

    if (response.ok) {
      // Save token and user profile to localStorage
      storage.save("token", accessToken);
      storage.save("user", user);

      // Call the onSuccess callback
      onSuccess();

      return response;
    } else {
      onError("Login failed. Please try again later.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    onError("Login failed. Please try again later.");
  }
}
