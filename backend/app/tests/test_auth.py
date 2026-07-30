from fastapi.testclient import TestClient

def test_register_and_login(client: TestClient):
    # Register customer
    response = client.post("/api/auth/register", json={
        "email": "user@example.com",
        "password": "securepassword123",
        "role": "customer"
    })
    assert response.status_code == 201
    assert response.json()["email"] == "user@example.com"
    assert response.json()["role"] == "customer"

    # Duplicate registration should fail
    dup_resp = client.post("/api/auth/register", json={
        "email": "user@example.com",
        "password": "securepassword123",
        "role": "customer"
    })
    assert dup_resp.status_code == 409

    # Login
    login_resp = client.post("/api/auth/login", data={
        "username": "user@example.com",
        "password": "securepassword123"
    })
    assert login_resp.status_code == 200
    data = login_resp.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
