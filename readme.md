# Vanilla JS form validation
This project is a raw vanilla JS code sample for form validation. No external dependencies needed.

You can run it locally with your own web server or with python in the terminal:

`   
$ python3 -m http.server 8080
`

To add a field that needs to be validated:
- First add it to the HTML with the oninput and onblur event
- Then add the configuration object in the inputs array in form.js

A configuration object looks like this:
```
fieldKey: {
    item: field dom element,
    value: function to fetch field value,
    isValid: boolean function to check if field is valid,
    sanitizedValue: () => function fetching field value and cleaning it before use,
    mandatory: boolean,
    pristine: boolean to tell if the field has been touched or not. Should be set to true by default,
    errorMessage: Error message to display if isValid returns false
}
```
---
TODO: On script init, append onblur & onchange event to the targeted input elements (so they don't need to be added manually in the HTML).

TODO: Support multiple error messages for a same field (eg. email too short, email format incorrect).

TODO: Allow error messages to be displayed next to the field instead of being all together inside a same element.

TODO: Add a class to inputs in error state.
