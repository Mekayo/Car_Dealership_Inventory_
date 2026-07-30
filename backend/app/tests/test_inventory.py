from fastapi.testclient import TestClient

def test_purchase_and_restock(client: TestClient):
    # Register admin and customer
    client.post("/api/auth/register", json={
        "email": "admin_inv@example.com",
        "password": "password123",
        "role": "admin"
    })
    admin_login = client.post("/api/auth/login", data={
        "username": "admin_inv@example.com",
        "password": "password123"
    })
    admin_token = admin_login.json()["access_token"]
    admin_headers = {"Authorization": f"Bearer {admin_token}"}

    client.post("/api/auth/register", json={
        "email": "cust_inv@example.com",
        "password": "password123",
        "role": "customer"
    })
    cust_login = client.post("/api/auth/login", data={
        "username": "cust_inv@example.com",
        "password": "password123"
    })
    cust_token = cust_login.json()["access_token"]
    cust_headers = {"Authorization": f"Bearer {cust_token}"}

    # Create vehicle as admin
    v_resp = client.post("/api/vehicles", headers=admin_headers, json={
        "make": "Honda",
        "model": "Civic",
        "category": "sedan",
        "price": 22000.0,
        "quantity": 10
    })
    v_id = v_resp.json()["id"]

    # Customer purchases 3 vehicles
    purch_resp = client.post(f"/api/vehicles/{v_id}/purchase", headers=cust_headers, json={"quantity": 3})
    assert purch_resp.status_code == 200
    assert purch_resp.json()["quantity"] == 7

    # Restock 5 vehicles as admin
    restock_resp = client.post(f"/api/vehicles/{v_id}/restock", headers=admin_headers, json={"quantity": 5})
    assert restock_resp.status_code == 200
    assert restock_resp.json()["quantity"] == 12
