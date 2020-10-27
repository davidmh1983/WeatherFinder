function checkWrongAnswer(city, country) {
  cy.server();
  cy.route('GET', 'http://api.openweathermap.org/data/2.5/weather*', {
    cod: '404',
    message: 'city not found',
  }).as('response');
  cy.get('input[name="city"]').type(city);
  cy.get('input[name="country"]').type(country);
  cy.get('.form-container button').click();
  cy.wait('@response');
  cy.get('.weather__value').should('have.length', 0);
  cy.get('.weather__error').should('have.length', 1);
}

context('Check reponses', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Existing City that belongs to an existing Country', () => {
    const city = 'Barcelona';
    const country = 'es';
    cy.server();
    cy.route('GET', 'http://api.openweathermap.org/data/2.5/weather*', {
      coord: {
        lon: -3.7,
        lat: 40.42,
      },
      weather: [
        {
          id: 802,
          main: 'Clouds',
          description: 'arida',
          icon: '03d',
        },
      ],
      base: 'stations',
      main: {
        temp: 13.4,
        feels_like: 11.83,
        temp_min: 14.44,
        temp_max: 16.11,
        pressure: 1024,
        humidity: 45,
      },
      visibility: 10000,
      wind: {
        speed: 4.1,
        deg: 230,
      },
      clouds: {
        all: 40,
      },
      dt: 1603549269,
      sys: {
        type: 1,
        id: 6443,
        country: country.toUpperCase(),
        sunrise: 1603521341,
        sunset: 1603560116,
      },
      timezone: 7200,
      id: 3117735,
      name: city,
      cod: 200,
    }).as('response');
    cy.get('input[name="city"]').type(city);
    cy.get('input[name="country"]').type(country);
    cy.get('.form-container button').click();
    cy.wait('@response');
    cy.get('.weather__value').should('have.length', 4);
  });
  it('Existing City that doesnt belong to an existing Country', () => {
    const city = 'Moscow';
    const country = 'fr';
    checkWrongAnswer(city, country);
  });
  it('Existing City and not existing Country', () => {
    const city = 'Moscow';
    const country = 'ddsard';
    checkWrongAnswer(city, country);
  });
  it('Not Existing City and not existing Country', () => {
    const city = 'asdetfg';
    const country = 'ddsard';
    checkWrongAnswer(city, country);
  });
  it('Not Existing City and existing Country', () => {
    const city = 'asdetfg';
    const country = 'fr';
    checkWrongAnswer(city, country);
  });
});
