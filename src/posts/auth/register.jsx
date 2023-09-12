import { registerUrl } from "../../components/constants/constantsUrl";

/**
 * This function sends the registered users info / data to the API
 * Register user data to API
 * @param {string} url
 * @param {object} user
 */


// export async function RegisterUser(user) {
//     const method = 'post';

//     try {
//         const response = await fetch(registerUrl, {
//             method,
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(user)
//         });

//         const result = await response.json();

//         if (response.ok) {
//             alert('Registration complete');
//             return result;
        
//         } else {
//             alert('Something went wrong! Please try again!');
//             return false;
//         }
//     } catch (error) {
//         console.error('Error during registration:', error);
//         throw error; // Rethrow the error for better error handling
//     }
    
// }

export async function RegisterUser(user) {
  const method = 'post';

  try {
    const response = await fetch(registerUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error during registration:', error);
    throw error; // Rethrow the error for better error handling
  }
}

