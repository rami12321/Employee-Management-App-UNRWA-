JsonApp
This project was generated using Angular CLI version 18.2.11.

Prerequisites
Before running the application, ensure that the following dependencies are installed:

Node.js (version 14.x or higher)
npm (Node package manager)
You can verify the installation by running the following commands:

node -v
npm -v


Additionally, ensure that the following packages are installed globally:

Angular CLI
Bootstrap
JSON Server

Setup Instructions:
Download the project and extract the ZIP file.
Place the extracted folder in your desired location.
Open your terminal, command prompt, or VS Code terminal and navigate to the project directory:

cd path/to/your/project


Install the required dependencies by running:

npm install -g npm
npm install -g @angular/cli
npm install bootstrap
npm install -g json-server@0


Start the JSON Server:

json-server --watch db.json


Run the Angular application:

ng serve -o



After executing these steps, the application should be successfully running.
