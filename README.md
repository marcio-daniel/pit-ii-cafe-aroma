# Cafe Aroma da Serra

Loja virtual da cafeteria gourmet (PIT II). Arquitetura MVC: Model e Controller no Spring Boot, View em React.

## Estrutura

- `backend/` — Spring Boot 3, Java 21, H2, sessao HTTP para o carrinho
- `frontend/` — React + TypeScript (Vite)

## Rodar em desenvolvimento

Terminal 1 — API:

```bash
cd backend
./mvnw spring-boot:run
```

Terminal 2 — interface:

```bash
cd frontend
npm install
npm run dev
```

Abra http://localhost:5173 (o Vite encaminha `/api` para a porta 8080).

## Build unico (JAR com a interface)

```bash
cd frontend && npm run build
rm -rf ../backend/src/main/resources/static/*
cp -r dist/* ../backend/src/main/resources/static/
cd ../backend && ./mvnw -DskipTests package
java -jar target/cafe-aroma-0.0.1-SNAPSHOT.jar
```

Ou com Docker:

```bash
docker build -t cafe-aroma .
docker run -p 8080:8080 cafe-aroma
```

Health check: `GET /api/health`
