// Form validation utilities

export const validateName = (name) => {
  if (!name || name.trim().length < 2) {
    return 'Name must be at least 2 characters long';
  }
  if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
    return 'Name can only contain letters and spaces';
  }
  return null;
};

export const validatePhone = (phone) => {
  if (!phone || phone.trim().length === 0) {
    return 'Phone number is required';
  }
  
  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Check for Indian phone number format (10 digits)
  if (cleanPhone.length !== 10) {
    return 'Please enter a valid 10-digit phone number';
  }
  
  // Check if it starts with valid digits (6-9)
  if (!/^[6-9]/.test(cleanPhone)) {
    return 'Phone number must start with 6, 7, 8, or 9';
  }
  
  return null;
};

export const validateCity = (city) => {
  if (!city || city.trim().length < 2) {
    return 'City name must be at least 2 characters long';
  }
  if (!/^[a-zA-Z\s]+$/.test(city.trim())) {
    return 'City name can only contain letters and spaces';
  }
  return null;
};

export const formatPhoneNumber = (phone) => {
  const cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.length === 10) {
    return cleanPhone.replace(/(\d{5})(\d{5})/, '$1 $2');
  }
  return phone;
};