export const EMAIL_REGEX: RegExp =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const FULL_NAME_REGEX: RegExp = /^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,4}$/;

export const PWD_REGEX: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
