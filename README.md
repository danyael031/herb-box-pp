
# Herb Box ++

## Initial setup

Install node dependencies:

```sh
npm install
```

Create `.env` file to setup environment variables:

```sh
cp .env.example .env
```

Add the values to the variables in the `.env` file, and they will be automatically loaded when the project is initialized.

Initialize the db:

```sh
npx prisma migrate dev
```

Run the development server:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

The environment variables are automatically loaded when the project is initialized and when using
the `prisma` commands.

Be careful not to add environment variables to the `.env.example` file, as it is being tracked by Git, and we don't want secrets to be accidentally leaked.

| Name                 | Description                    |
|----------------------|--------------------------------|
| OPENAI_API_KEY       | OpenAI platform API Key        |
| DATABASE_URL_SQLite  | SQLite db file path (Prisma)   |
| SWAGGER_API_DOC_PATH | Swagger API documentation path |

## Simulate connection to the sensors

```sh
./scripts/simulateHistory.sh
```
