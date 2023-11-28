import { jwtDecode } from 'jwt-decode';

const getUserIdFromToken = (token) => {
    try {
        const decodedToken = jwtDecode(token);
        console.log('Decoded token:', decodedToken);
        return decodedToken.sub;
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
    }
};

const getEmailFromToken = (token) => {
    try {
        const decodedToken = jwtDecode(token);
        const email = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
        console.log("Decoded email:", email);
        return email;
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
    }
};

export { getEmailFromToken }
