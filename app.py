import pyodbc
from flask_cors import CORS
from flask import Flask, request, jsonify

app = Flask(__name__)

CORS(app)


# Connect to the SQL Server database
conn = pyodbc.connect('Driver={ODBC Driver 17 for SQL Server};'
                      'Server=DESKTOP-21FSF82\SQLEXPRESS;'
                      'Database=task;'
                      'Trusted_Connection=yes;')

# Create a cursor object
cursor = conn.cursor()


@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    # Perform authentication logic (e.g., verify credentials against a database)
    query = "SELECT * FROM Users WHERE email=? AND password=?"
    cursor.execute(query, (email, password))
    user = cursor.fetchone()

    if user:
        # User exists in the database
        return jsonify({'message': 'Login successful'})
        response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5501')  # Add this line
        return response

    else:
        # Invalid username or password
        return jsonify({'message': 'Invalid username or password'})
        response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5501')  # Add this line
        return response

@app.route('/register', methods=['POST'])
def register():
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')

    # Perform registration logic (e.g., insert user details into a database)
    query = "INSERT INTO Users (username, email, password) VALUES (?, ?, ?)"
    cursor.execute(query, (username, email, password))
    conn.commit()

    return jsonify({'message': 'Registration successful'})

if __name__ == '__main__':
    app.run()
