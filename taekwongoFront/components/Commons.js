export function iconNameFor(training) {
    return training.training_type === "V" ? 'flash' : 'dumbbell';
}

export function isValidTitle(aString) {
    return notEmptyAndFitsRegex(aString, /^[A-Za-z0-9ñ\s]+$/);
}

function notEmptyAndFitsRegex(aString, aRegex) {
    return aString !== "" && aRegex.test(aString);
}

export function checkStatus(response) {
    if (response.status === undefined || (response.status >= 200 && response.status < 300)) {
        return response
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error
    }
}

export function isValidName(aString) {
    return notEmptyAndFitsRegex(aString, /^[A-Za-z\s\u0027\u2019]+$/);
}

export function isValidBirthDate(aDate) {
    return new Date() > aDate;
}

export function isValidEmail(aString) {
    return notEmptyAndFitsRegex(aString, /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

export function isValidPassword(aString) {
    return aString !== undefined && aString.length > 8
}

export function matchBetween(aString, anotherString) {
    return aString === anotherString;
}

export function unitForTraining(training) {
    return training.training_type === 'V' ? 'ms' : 'm/s^2';
}