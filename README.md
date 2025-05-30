

"Build a well-secured, modern API for user authentication using **Django** and **Django REST Framework (DRF)**. Implement **JWT (JSON Web Token) authentication** with `djangorestframework-simplejwt`.

The API should include:
1.  **User Registration:** An endpoint for new user sign-ups with secure password handling.
2.  **User Login:** An endpoint that, upon successful credentials, returns both a short-lived **access token** and a longer-lived **refresh token**.
3.  **Token Refresh:** An endpoint to obtain a new access token using a valid refresh token, implementing **refresh token rotation** and **blacklisting of old tokens**.
4.  **Protected Endpoint:** A sample API endpoint that requires a val