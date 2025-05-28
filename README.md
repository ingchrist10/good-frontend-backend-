

"Build a well-secured, modern API for user authentication using **Django** and **Django REST Framework (DRF)**. Implement **JWT (JSON Web Token) authentication** with `djangorestframework-simplejwt`.

The API should include:
1.  **User Registration:** An endpoint for new user sign-ups with secure password handling.
2.  **User Login:** An endpoint that, upon successful credentials, returns both a short-lived **access token** and a longer-lived **refresh token**.
3.  **Token Refresh:** An endpoint to obtain a new access token using a valid refresh token, implementing **refresh token rotation** and **blacklisting of old tokens**.
4.  **Protected Endpoint:** A sample API endpoint that requires a valid access token for access.

Ensure the implementation adheres to modern security best practices, including:
* **Stateless authentication** using JWTs.
* Proper **password hashing**.
* Robust **input validation** for all incoming data.
* **Rate limiting/throttling** for API endpoints (especially login/registration).
* Handling of **secrets via environment variables** (e.g., Django's `SECRET_KEY`).
* Configuring **CORS (Cross-Origin Resource Sharing)** to allow specific origins.
* Considerations for **HTTPS enforcement** in production.
* **Graceful error handling** without exposing sensitive information.
* Guidance on ensuring `DEBUG=False` in production.

Provide the necessary Django project and app structure, `settings.py` configurations, serializers, views, and URL patterns."
