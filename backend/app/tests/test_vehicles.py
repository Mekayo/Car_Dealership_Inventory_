from fastapi.testclient import TestClient

def get_admin_token_headers(client: TestClient) -> dict:
    client.post("/api/auth/register", json={
        "email": "admin@example.com",
        "password": "adminpassword123",
        "role": "admin"
    })
    login_resp = client.post("/api/auth/login", data={
        "username": "admin@example.com",
        "password": "adminpassword123"
    })
    token = login_resp.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}

def test_vehicle_crud(client: TestClient):
    headers = get_admin_token_headers(client)

    # Create vehicle
    create_resp = client.post("/api/vehicles", headers=headers, json={
        "make": "Toyota",
        "model": "Camry",
        "category": "sedan",
        "price": 25000.0,
        "quantity": 5
    })
    assert create_resp.status_code == 201
    vehicle_id = create_resp.json()["id"]

    # List vehicles with filter
    list_resp = client.get("/api/vehicles?make=Toyota")
    assert list_resp.status_code == 200
    assert len(list_resp.json()) == 1

    # Get single vehicle
    get_resp = client.get(f"/api/vehicles/{vehicle_id}")
    assert get_resp.status_code == 200
    assert get_resp.json()["model"] == "Camry"

    # Update vehicle
    update_resp = client.put(f"/api/vehicles/{vehicle_id}", headers=headers, json={
        "price": 24000.0
    })
    assert update_resp.status_code == 200
    assert update_resp.json()["price"] == 24000.0

    # Delete vehicle
    del_resp = client.delete(f"/api/vehicles/{vehicle_id}", headers=headers)
    assert del_resp.status_code == 204

    # Verify deleted
    get_again = client.get(f"/api/vehicles/{vehicle_id}")
    assert get_again.status_code == 404
