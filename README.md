
# Investment Strategy Web Application

## Overview

This project is a front-end web application that allows users to choose between two investment strategies and select individual funds. The application pulls data from static APIs and displays the data visually, including key financial metrics such as analyst ratings, SRRI (risk rating), and portfolio asset distribution.

## Tech Stack

The following technologies are used to build the project:

- **React**: A popular JavaScript library for building user interfaces.
- **Redux Toolkit**: A set of tools for managing the state of the application efficiently.
- **TypeScript**: A strongly typed programming language built on JavaScript.
- **Material UI**: A React component library that implements Google's Material Design.
- **RTK Query**: A powerful data-fetching and caching tool integrated with Redux Toolkit to manage API calls.
- **Next.js**: A React framework that enables server-side rendering and static site generation for enhanced performance.
- **CSS/SCSS**: For styling the application.

## APIs

The application uses the following static APIs to fetch investment strategy and fund data:

- **Growth Funds**:
  - Cautious: [BYW8RV9](https://cdn.core3-dev.ajbbuild.uk/interview/BYW8RV9.json)
  - Balanced: [BYW8RX1](https://cdn.core3-dev.ajbbuild.uk/interview/BYW8RX1.json)
  - Adventurous: [BYW8VG2](https://cdn.core3-dev.ajbbuild.uk/interview/BYW8VG2.json)

- **Responsible Growth Fund**:
  - Responsible: [BN0S2V9](https://cdn.core3-dev.ajbbuild.uk/interview/BN0S2V9.json)

## Features

- Display of investment strategies and funds.
- Integration of data visualizations such as pie charts, star ratings, and risk sliders.
- Ability for the user to select a strategy and fund, saving the selection to local storage.
- Aesthetic and responsive design, optimized for both desktop and mobile devices.

## Running the Application

To run the application locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd <project-folder>
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open the browser and visit `http://localhost:3000` to view the application.

## Testing

The project includes unit tests and integration tests to ensure functionality. You can run the tests with:

```bash
npm run test
```

## Contribution

Feel free to fork this repository and make contributions. If you'd like to contribute, please follow the guidelines below:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes.
4. Open a pull request with a description of your changes.

## License

This project is licensed under the MIT License.
