# Auth Service

## Setup Instructions

### 1. Configure Application Properties
Copy the example configuration file and update with your credentials:

```bash
cp src/main/resources/application.properties.example src/main/resources/application.properties
```

Then edit `application.properties` and replace:
- `YOUR_DATABASE_NAME` - Your MySQL database name
- `YOUR_DB_USERNAME` - Your MySQL username
- `YOUR_DB_PASSWORD` - Your MySQL password
- `YOUR_EMAIL@gmail.com` - Your Gmail address
- `YOUR_GOOGLE_APP_PASSWORD` - Your Google App Password (not regular password)

### 2. Generate Google App Password
1. Go to your Google Account Settings → Security
2. Enable 2-Step Verification (if not already on)
3. Search for "App Passwords"
4. Create a new app password for "Spring Boot" or "PhotoHub"
5. Copy the 16-character code and paste it in `application.properties`

### 3. Run the Service
```bash
./gradlew :auth-service:bootRun
```

## Important Security Notes
- **NEVER** commit `application.properties` to Git
- The `.gitignore` file is configured to exclude this file
- Always use `application.properties.example` as a template
