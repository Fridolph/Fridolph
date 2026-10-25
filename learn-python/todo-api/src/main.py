from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Todo API")


class RootResponse(BaseModel):
    code: int
    message: str


@app.get("/")
async def root() -> RootResponse:
    return RootResponse(code=200, message="ok")

@app.get("/ping")
async def ping() -> dict[str, bool]:
    return {"pong": True}

