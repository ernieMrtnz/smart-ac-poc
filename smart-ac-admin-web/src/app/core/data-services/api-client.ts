/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.11.3.0 (NJsonSchema v10.4.4.0 (Newtonsoft.Json v11.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
    providedIn: 'root'
})
export class AuthenticationClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "https://localhost:44306";
    }

    login(credentials: AuthCredentialModel): Observable<AuthLoginResponseModel> {
        let url_ = this.baseUrl + "/api/auth/login";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(credentials);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processLogin(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processLogin(<any>response_);
                } catch (e) {
                    return <Observable<AuthLoginResponseModel>><any>_observableThrow(e);
                }
            } else
                return <Observable<AuthLoginResponseModel>><any>_observableThrow(response_);
        }));
    }

    protected processLogin(response: HttpResponseBase): Observable<AuthLoginResponseModel> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <AuthLoginResponseModel>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<AuthLoginResponseModel>(<any>null);
    }

    token(serialNumber: string | null): Observable<AuthDeviceResponseModel> {
        let url_ = this.baseUrl + "/api/auth/device/{serialNumber}/token";
        if (serialNumber === undefined || serialNumber === null)
            throw new Error("The parameter 'serialNumber' must be defined.");
        url_ = url_.replace("{serialNumber}", encodeURIComponent("" + serialNumber));
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processToken(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processToken(<any>response_);
                } catch (e) {
                    return <Observable<AuthDeviceResponseModel>><any>_observableThrow(e);
                }
            } else
                return <Observable<AuthDeviceResponseModel>><any>_observableThrow(response_);
        }));
    }

    protected processToken(response: HttpResponseBase): Observable<AuthDeviceResponseModel> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <AuthDeviceResponseModel>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<AuthDeviceResponseModel>(<any>null);
    }
}

@Injectable({
    providedIn: 'root'
})
export class DeviceClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "https://localhost:44306";
    }

    devicePost(request: NewDeviceRequest): Observable<DeviceModel> {
        let url_ = this.baseUrl + "/api/device";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(request);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processDevicePost(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDevicePost(<any>response_);
                } catch (e) {
                    return <Observable<DeviceModel>><any>_observableThrow(e);
                }
            } else
                return <Observable<DeviceModel>><any>_observableThrow(response_);
        }));
    }

    protected processDevicePost(response: HttpResponseBase): Observable<DeviceModel> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <DeviceModel>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<DeviceModel>(<any>null);
    }

    all(): Observable<DeviceModel[]> {
        let url_ = this.baseUrl + "/api/device/all";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processAll(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processAll(<any>response_);
                } catch (e) {
                    return <Observable<DeviceModel[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<DeviceModel[]>><any>_observableThrow(response_);
        }));
    }

    protected processAll(response: HttpResponseBase): Observable<DeviceModel[]> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <DeviceModel[]>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<DeviceModel[]>(<any>null);
    }

    deviceGet(serialNumber: string | null): Observable<DeviceModel> {
        let url_ = this.baseUrl + "/api/device/{serialNumber}";
        if (serialNumber === undefined || serialNumber === null)
            throw new Error("The parameter 'serialNumber' must be defined.");
        url_ = url_.replace("{serialNumber}", encodeURIComponent("" + serialNumber));
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processDeviceGet(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDeviceGet(<any>response_);
                } catch (e) {
                    return <Observable<DeviceModel>><any>_observableThrow(e);
                }
            } else
                return <Observable<DeviceModel>><any>_observableThrow(response_);
        }));
    }

    protected processDeviceGet(response: HttpResponseBase): Observable<DeviceModel> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <DeviceModel>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<DeviceModel>(<any>null);
    }
}

@Injectable({
    providedIn: 'root'
})
export class DeviceDetailClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "https://localhost:44306";
    }

    add(request: DeviceDetailRequest): Observable<DeviceDetailResponseModel> {
        let url_ = this.baseUrl + "/api/DeviceDetail/deviceDetails/add";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(request);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processAdd(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processAdd(<any>response_);
                } catch (e) {
                    return <Observable<DeviceDetailResponseModel>><any>_observableThrow(e);
                }
            } else
                return <Observable<DeviceDetailResponseModel>><any>_observableThrow(response_);
        }));
    }

    protected processAdd(response: HttpResponseBase): Observable<DeviceDetailResponseModel> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            result200 = _responseText === "" ? null : <DeviceDetailResponseModel>JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<DeviceDetailResponseModel>(<any>null);
    }
}

export interface AuthLoginResponseModel {
    isSuccess: boolean;
    userID: number;
    isAdmin: boolean;
    name?: string | undefined;
    token?: string | undefined;
    attemptsleft: number;
    isLocked: boolean;
    errorMessage?: string | undefined;
}

export interface AuthCredentialModel {
    login: string;
    password: string;
}

export interface AuthDeviceResponseModel {
    isSuccess: boolean;
    token?: string | undefined;
}

export interface DeviceModel {
    id: number;
    serialNumber?: string | undefined;
    registrationDate: Date;
    firmwareVersion?: string | undefined;
    statusID: number;
    temperature?: string | undefined;
    airHumidity: number;
    carbonMonoxideLevel: number;
    healthStatus?: string | undefined;
    deviceDetails?: DeviceDetailResponseModel[] | undefined;
}

export interface DeviceDetailResponseModel {
    id: number;
    temperature: number;
    airHumidityPercent: number;
    carbonMonoxideLevel: number;
    healthStatus?: string | undefined;
    deviceID: number;
}

export interface NewDeviceRequest {
    serialNumber?: string | undefined;
    registrationDate: Date;
    firmwareVersion?: string | undefined;
}

export interface DeviceDetailRequest {
    temperature: number;
    airHumidityPercent: number;
    carbonMonoxideLevel: number;
    healthStatus?: string | undefined;
    deviceID: number;
}

export class ApiException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new ApiException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((<any>event.target).result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
}