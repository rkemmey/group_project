import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// On app start, reattach token if it exists
const token = localStorage.getItem('token');
  if (token) {
    api.defaults.headers.common['Authorization'] = `Token ${token}`;
  }



export const userRegistration = async (email, password) => {
  // make the post request
  const response = await api.post("user/signup/", {
      email: email,
      password: password
  });

  // check the response
  // save the auth token
  if (response.status === 201) {
      const { user, token } = response.data
      localStorage.setItem("token", token)

      // set axios to always use the auth token
      api.defaults.headers.common['Authorization'] = `Token ${token}`
      console.log("axios default auth header ", api.defaults.headers.common['Authorization'])

      return user;
  } 

  // Throw error?
  console.log('error creating user')
  return null;
}

export const userLogIn = async (email, password) => {
  const response = await api.post("user/login/", {
      email: email,
      password: password
  });

  if (response.status === 200) {
      const { user, token } = response.data
      localStorage.setItem("token", token);
      api.defaults.headers.common['Authorization'] = `Token ${token}`;

      console.log('userLogIn() success', user);
      return user;
  }

  console.log('login error', response)
  return null;
}

export const userLogOut = async () => {
  // Authorization Header is already set
  const response = await api.post("user/logout/");
  if (response.status === 204) {
      localStorage.removeItem("token");
      delete api.defaults.headers.common['Authorization'];
      console.log('userLogOut() logged out')
      return true;
  }

  console.log('userLogOut failed, error, response is ', response);
  return false;
}

export const userConfirmation = async () => {
  const token = localStorage.getItem("token");
  // if user previously logged in
  if (token) {
      api.defaults.headers.common.Authorization = `Token ${token}`;
      const response = await api.get("users/");
      if (response.status === 200) {
          console.log('userConfirmation success, user info', response.data);
          return response.data;
      }
      console.log('user logged in but GET users/ failed', response)
      // TODO: Get the users lists
  }

  console.log('userconfirmation user not logged in')
  return null;
}

export const getProfile = async () => {
  // authorization is already set b/c user is logged in
  const response = await api.get('user/info/')
  if (response.status === 200) {
      console.log('getProfile success, ', response.data)
      return response.data
  }

  console.log('getProfile error', response)
  return null;
}

export const getSudokuPuzzles = async () => {
  const response = await api.get('sudoku/allpuzzles/')
  if (response.status === 200) {
      console.log('getSudokuPuzzles success, ', response.data)
      return response.data
  }

  console.log('getSudokuPuzzles error', response)
  return null;
}

// export const getASudokuPuzzle = async (id) => {
//   const response = await api.get(`sudoku/puzzle/${id}/`)
//   if (response.status === 200) {
//       console.log('getASudokuPuzzle success, ', response.data)
//       return response.data
//   }

//   console.log('getASudokuPuzzle error', response)
//   return null;
// }

export const getNonogramPuzzles = async () => {
  const response = await api.get('nonogram/allpuzzles/')
  if (response.status === 200) {
      console.log('getNonogramPuzzles success, ', response.data)
      return response.data
  }

  console.log('getNonogramPuzzles error', response)
  return null;
}

export const getNonogramPixels = async () => {
  const response = await api.get('nonogram/allpixels/')
  if (response.status === 200) {
      console.log('getNonogramPixels success, ', response.data)
      return response.data
  }

  console.log('getNonogramPixels error', response)
  return null;
}

export const savePuzzleProgress = async ({ contentTypeId, objectId, progress, isCompleted = false }) => {
  try {
    const response = await api.post('progress/upsert/', {
      content_type: contentTypeId,
      object_id: objectId,
      progress: progress,
      is_completed: isCompleted,
    });

    if (response.status === 201 || response.status === 200) {
      console.log('savePuzzleProgress success', response.data);
      return response.data;
    }

    console.log('savePuzzleProgress unexpected status', response);
    return null;
  } catch (error) {
    console.error('savePuzzleProgress error', error.response || error);
    return null;
  }
};

export const getSavedPuzzles = async () => {
  try {
    const response = await api.get('progress/');
    
    if (response.status === 200) {
      // const { user, token } = response.data
      // localStorage.setItem("token", token);
      // api.defaults.headers.common['Authorization'] = `Token ${token}`;

      console.log('getSavedPuzzles success, ', response.data);
      return response.data;  // Return the list of saved progress
    }

    console.log('getSavedPuzzles error', response);
    return null;  // Return null if there's an error
  } catch (error) {
    console.error('getSavedPuzzles error', error.response || error);
    return null;  // Return null if an exception is thrown
  }
};

export const updateDisplayName = async (newName) => {
  const response = await api.patch('user/update/', {
    display_name: newName
  });

  if (response.status === 200) {
    console.log("updateDisplayName success", response.data);
    return response.data;
  }
  console.log("updateDisplayName failed", response);
  return null;
};

export const deletePuzzleProgress = async (contentType, objectId) => {
  try {
    const response = await api.delete('progress/delete/', {
      data: {
        content_type: contentType,
        object_id: objectId
      }
    });

    if (response.status === 204) {
      console.log("deletePuzzleProgress success");
      return true;
    }

    console.log("deletePuzzleProgress unexpected response", response);
    return false;
  } catch (error) {
    console.log("deletePuzzleProgress failed", error.response?.data || error.message);
    return false;
  }
};
