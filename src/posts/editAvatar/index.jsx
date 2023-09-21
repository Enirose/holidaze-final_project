import { profileUrl } from "../../components/constants/constantsUrl";
import { load } from "../../components/localStorage";


export async function EditAvatar(avatar, token) {
  const method = 'put';
  const userName = await load('user');
  const avatarUpdateUrl = `${profileUrl}${userName.name}/media`;

  try {
    const response = await fetch(avatarUpdateUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ avatar }), // Send an object with avatarUrl property
    });

    if (response.ok) {
      console.log('Avatar update successful');
      return true;
    } else {
      console.error('Avatar update failed with status:', response.status);
      return false;
    }
  } catch (error) {
    console.error('Error updating avatar:', error);
    return false;
  }
}
