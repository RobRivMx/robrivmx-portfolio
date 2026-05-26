# Motor Principal de FastAPI - AutoFlow & Portfolio
from fastapi import FastAPI

app = FastAPI(title="Portfolio API")

@app.get("/")
def read_root():
    return {"status": "Ecosistema Backend Activo"}