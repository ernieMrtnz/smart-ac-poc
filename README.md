# Smart AC #

## Tech Stack ##
```
REST API -> Microsoft .NET 5 Core Web API 
Admin Web App -> Angular v11
```

Documentation for the Smart AC Devices API

### Auth Endpoints: ###

```
/api/auth/login -> POST =>  Logs in a user to authenticate
```

```
/api/auth/identity -> GET => Checks if user is still valid (token)
```

```
/api/auth/device -> POST => Registers a new device (after registering a device, can use the token from the object returned to make any subsequent calls to devices API)
```

```
/api/auth/token -> POST => Authenticates a device (if for some reason you lose the token, can authenticate again with the serial number --- only used for emergency as it's not certain if reconnection of device would use this since it may be possible the token has been expired)
```

```
/api/auth/employee -> POST => Adds a new user to system (used if you want to create another user to test with)
```

### Device Endpoint: ###
```
/api/device/findDevices -> GET => Finds devices by params (to get list of devices)
```

### Device Detail Endpoints: ###
```
/api/deviceDetails/{id} -> GET => Retrieves a device detail by the device details ID, (alert specific)
```

```
/api/deviceDetails -> POST => Adds a new device details info to the database
```

```
/api/deviceDetails/bulk -> POST => Adds device details in bulk for a device
```

```
/api/deviceDetails/{deviceId}/forChart -> GET => Retrieves device details for chart display by deviceId
```

```
/api/deviceDetails/{id}/resolve -> PUT => Updates the resolution for a device detail that was alerted
```

### Employee/User ###


```
/api/employee/forPaged -> GET => Gets all employees/users
```

```
/api/employee/{id} -> GET => Retrieves an employee/user by an id (the employee id)
```

```
/api/employee/{id}/enable -> PUT => Enables an user's account
```

```
/api/employee/{id}/disable -> PUT => Disables a user's account
```

### Endpoints for the apps: ###
#### Devices API - Base URL #####
Devices API can be found at [https://smartacapppoc.azurewebsites.net](https://smartacapppoc.azurewebsites.net "Devices API")


#### Devices API - Swagger ####
Swagger Docs can be found at: [https://smartacapppoc.azurewebsites.net/swagger/index.html](https://smartacapppoc.azurewebsites.net "Swagger Docs")

#### Admin Web App ####
Admin Web App can be found at: [https://smartac-admin-web.azurewebsites.net](hhttps://smartac-admin-web.azurewebsites.net "Admin Web App")

##### Credentials for Web App #####
```
username: mjordan
password: bullsChicago2020
```
