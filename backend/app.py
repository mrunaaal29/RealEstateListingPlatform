
from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql
import pymysql.cursors
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# DB connection function
def get_connection():
    return pymysql.connect(
        host='localhost',
        user='root',
        password='admin123',
        db='realestate_db',
        cursorclass=pymysql.cursors.DictCursor,
        port=3307
    )

@app.route('/properties', methods=['GET'])
def get_properties():
    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT id, title, description, price, location, image_url FROM properties")
        rows = cursor.fetchall()

        # Define column names
        columns = ['id', 'title', 'description', 'price', 'location', 'image_url']
        
        # Convert each row to a dictionary
        properties = [dict(zip(columns, row)) for row in rows]

        cursor.close()
        conn.close()
        return jsonify(properties)
    except Exception as e:
        print("Error fetching properties:", e)
        return jsonify({"error": "Failed to fetch properties"}), 500
    



# --------------------- AUTH ROUTES ---------------------

# Admin Login
@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM admin WHERE username=%s AND password=%s", (username, password))
    admin = cursor.fetchone()
    conn.close()
    
    if admin:
        return jsonify({"message": "Admin login successful", "admin": admin})
    return jsonify({"message": "Invalid credentials"}), 401

# User Register (Owner/Buyer)
@app.route('/api/register', methods=['POST'])
def register_user():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')  # 'owner' or 'buyer'
    phone = data.get('phone')
    address = data.get('address')
    
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO users (name, email, password, role, phone, address) VALUES (%s, %s, %s, %s, %s, %s)",
                   (name, email, password, role, phone, address))
    conn.commit()
    conn.close()
    return jsonify({"message": "User registered successfully"}), 201

# User Login (Owner/Buyer)
@app.route('/api/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email=%s AND password=%s", (email, password))
    user = cursor.fetchone()
    conn.close()
    
    if user:
        return jsonify({"message": "Login successful", "user": user})
    return jsonify({"message": "Invalid credentials"}), 401

# --------------------- ADMIN FUNCTIONS ---------------------

# View all users
@app.route('/api/admin/users', methods=['GET'])
def get_all_users():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    conn.close()
    return jsonify(users)

# Approve/Reject/Delete listing
@app.route('/api/admin/listings/<int:id>', methods=['PUT', 'DELETE'])
def manage_listing(id):
    conn = get_connection()
    cursor = conn.cursor()
    
    if request.method == 'PUT':
        data = request.get_json()
        status = data.get('status')  # 'approved' or 'rejected'
        cursor.execute("UPDATE listings SET status=%s WHERE id=%s", (status, id))
        conn.commit()
        conn.close()
        return jsonify({"message": "Listing status updated successfully"})
    
    elif request.method == 'DELETE':
        cursor.execute("DELETE FROM listings WHERE id=%s", (id,))
        conn.commit()
        conn.close()
        return jsonify({"message": "Listing deleted successfully"})

# --------------------- OWNER FUNCTIONS ---------------------

# Add new listing
@app.route('/api/listings', methods=['POST'])
def add_listing():
    data = request.get_json()
    owner_id = data.get('owner_id')
    property_name = data.get('property_name')
    description = data.get('description')
    price = data.get('price')
    location = data.get('location')
    property_type = data.get('property_type')
    
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO listings (owner_id, property_name, description, price, location, property_type)
        VALUES (%s, %s, %s, %s, %s, %s)
    """, (owner_id, property_name, description, price, location, property_type))
    conn.commit()
    conn.close()
    return jsonify({"message": "Listing added successfully"}), 201

# Edit listing
@app.route('/api/listings/<int:id>', methods=['PUT'])
def edit_listing(id):
    data = request.get_json()
    property_name = data.get('property_name')
    description = data.get('description')
    price = data.get('price')
    location = data.get('location')
    property_type = data.get('property_type')
    
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE listings SET property_name=%s, description=%s, price=%s, location=%s, property_type=%s
        WHERE id=%s
    """, (property_name, description, price, location, property_type, id))
    conn.commit()
    conn.close()
    return jsonify({"message": "Listing updated successfully"})

# View listings by owner
@app.route('/api/owner/<int:owner_id>/listings', methods=['GET'])
def view_owner_listings(owner_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM listings WHERE owner_id=%s", (owner_id,))
    listings = cursor.fetchall()
    conn.close()
    return jsonify(listings)

# --------------------- BUYER FUNCTIONS ---------------------

# Browse/search all listings (approved only)
@app.route('/api/listings', methods=['GET'])
def browse_listings():
    keyword = request.args.get('q')  # optional query
    conn = get_connection()
    cursor = conn.cursor()
    
    if keyword:
        query = "SELECT * FROM listings WHERE status='approved' AND (property_name LIKE %s OR location LIKE %s)"
        like_keyword = f"%{keyword}%"
        cursor.execute(query, (like_keyword, like_keyword))
    else:
        cursor.execute("SELECT * FROM listings WHERE status='approved'")
    
    listings = cursor.fetchall()
    conn.close()
    return jsonify(listings)

# View personal info (after login)
@app.route('/api/users/<int:id>', methods=['GET'])
def get_user(id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE id=%s", (id,))
    user = cursor.fetchone()
    conn.close()
    if user:
        return jsonify(user)
    return jsonify({"message": "User not found"}), 404

# --------------------- MAIN ---------------------
if __name__ == '__main__':
    app.run(debug=True)
