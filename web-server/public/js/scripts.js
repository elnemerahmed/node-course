const form = document.querySelector( 'form' );
const submit = document.querySelector( '#submit' );
const result = document.querySelector( '#result' );

form.addEventListener( 'submit', ( e ) => {
    submit.setAttribute( 'disabled', 'true' );
    submit.innerText = "Loading";
    e.preventDefault();

    const address = document.querySelector( '#address' );

    fetch( 'http://localhost:3000/weather?address=' + encodeURIComponent( address.value ) ).then( ( response ) => {
        response.json().then( ( data ) => {
            const { error, weather_descriptions, temperature, feelslike, location } = data;
            if ( error ) {
                result.innerText = `Address: ${ address.value } seems to be invalid`;
                submit.innerText = "Search";
                submit.removeAttribute( 'disabled' );
                return;
            }

            result.innerText = `Weather Descriptions: ${ weather_descriptions }\nTemperature: ${ temperature }\nFeels like: ${ feelslike }\nLocation: ${ location }`;
            submit.removeAttribute( 'disabled' );
        } );
    } );
} );

