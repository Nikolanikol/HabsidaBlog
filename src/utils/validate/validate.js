export const getValidate = (formData,  setErrors, checkbox) => {
    const newErrors = {};

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Password is required.";
    } else if (formData.password.length < 5) {
      newErrors.email = "Password must be at least 5 characters.";
    }
    try {
        if (!formData.username.trim()) {
            newErrors.username = "Username is required.";
          } else if (formData.username.length < 3) {
            newErrors.username = "Username must be at least 3 characters.";
          }
        if (!(formData.repeat === formData.password)) {
            newErrors.repeat = "Password must be the same.";
          } else if (formData.password.length < 5) {
            newErrors.email = "Password must be at least 5 characters.";
          }
        if(!checkbox){
        newErrors.checkbox = 'Agree reqired'
        }
    } catch (error) {
        console.log(error)
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Возвращает true, если ошибок нет
  };
  export const getValidateEdit = (formData,  setErrors) => {
    const newErrors = {};

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (formData.password.length < 5) {
      newErrors.email = "Email must be at least 5 characters.";
    }

    if (!formData.username.trim()) {
        newErrors.username = "Username is required.";
        } else if (formData.username.length < 3) {
        newErrors.username = "Username must be at least 3 characters.";
        }
    if (!(formData.avatarImg.trim())) {
        newErrors.avatarImg = "AvatarImg is required";
        } else if (formData.avatarImg.length < 5) {
        newErrors.avatarImg = "AvatarImg must be at least 5 characters.";
        }



    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Возвращает true, если ошибок нет
  };