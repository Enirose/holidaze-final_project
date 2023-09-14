import { registerUrl } from '../../components/constants/constantsUrl';

 
/**
  * Register user data!
  * Whether the user is a venue manager (true or false)
  * @param {*} userData 
  * @param {boolean} venueManager
  * @returns 
  */

export async function RegisterUser(userData) {
  const method = 'post';

  try {
    const response = await fetch( registerUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      // Registration successful
      return { success: true };
    } else {
      // Registration failed
      const data = await response.json();
      console.error('Registration failed:', data);
      return { success: false, message: data.message || 'Registration failed.' };
    }
  } catch (error) {
    console.error('Error during registration:', error);
    return { success: false, message: 'Registration failed. Please try again later.' };
  }
}
