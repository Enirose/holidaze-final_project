import { profileUrl } from "../../components/constants/constantsUrl";
import { load } from "../../components/localStorage";

export async function FetchUserProfile(user) {
  const method = "get";
  const token = load('token')
  const singleProfileUrl = `${profileUrl}${user.name}`;

  try {
    const response = await fetch(singleProfileUrl, {
      method,
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const userProfileData = await response.json();
      return userProfileData;
    } else {
      throw new Error(`Failed to fetch user profile`);
    }

  } catch (error) {
    throw new Error('Error fetching user profile', error);
  }
}
