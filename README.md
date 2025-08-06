Real Estate Listing Platform
The Real Estate Listing Platform is a full-stack web application that allows property owners to list their properties for sale and buyers to browse available listings. An admin can manage the platform by viewing user accounts and property listings, with options to approve, reject, or delete submissions.

Features
User registration and login 

Property listing functionality for owners

Browse available properties for buyers

Admin panel to view users and property submissions

Property approval, rejection, and deletion by admin

Search functionality 

Technology Stack
Frontend: React, HTML, CSS
Backend: Flask (Python), Flask-CORS
Database: MySQL (via PyMySQL)

Instructions to run the project

1. Clone the Repository
git clone https://github.com/mrunaaal29/RealEstateListingPlatform.git
cd RealEstateListingPlatform

2. Set Up MySQL Database
Import the SQL dump:
Open phpMyAdmin or your MySQL client.

Create a database named: real_estate

Import the file:
database/real_estate.sql

This will create the required tables and sample data.

3. Start the Backend (Flask API)
Prerequisites:
Python installed (3.8+ recommended)

cd backend
pip install -r requirements.txt

Start the server:
python app.py

4. Start the Frontend (React App)
In a new terminal:
cd frontend
npm install
npm start


Database Configuration
Create a MySQL database named real_estate.

Import the SQL dump from:

database/real_estate.sql
Make sure your database credentials are correctly configured in backend/app.py:

mysql = MySQL()
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'your_password_here'
app.config['MYSQL_DB'] = 'real_estate'
mysql.init_app(app)