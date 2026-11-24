## Backend – kom igång

Varje gruppmedlem har ett eget AWS-konto med en egen DynamoDB-tabell som heter `cantina-db`. Följ stegen nedan en gång när du har klonat eller pullat repot.

### 1. Krav

- **Node.js 23.6 eller nyare** (behövs för att köra `.mts`-filer direkt). Kolla med `node -v`.
- **AWS CLI** installerat.
- Ett konto på **Serverless Framework**.

### 2. Kontrollera DynamoDB-tabellen

I AWS-konsolen: **DynamoDB → Tables → cantina-db**

| Inställning | Värde |
|---|---|
| Region | `eu-north-1` (Stockholm) |
| Partition key | `PK` (String) |
| Sort key | `SK` (String) |
| GSI-namn | `GSI1` |
| GSI partition key | `GSI1PK` (String) |
| GSI sort key | `GSI1SK` (String) |

Namnen måste stämma exakt, inklusive stora och små bokstäver.

### 3. Installera paket

```bash
cd backend
npm install
```

### 4. Logga in i AWS och Serverless

```bash
aws configure
```

Fyll i dina **egna** access keys (IAM → Users → din användare → Security credentials → Create access key) och sätt region till `eu-north-1`.

Kontrollera att det fungerar:

```bash
aws sts get-caller-identity
```

Logga sedan in i Serverless:

```bash
npx serverless login
```

### 5. Skapa `config.yml` och `.env`
Fyll sedan i dina egna värden:

**`config.yml`**
```yaml
org: ditt-serverless-org
role: arn:aws:iam::DITT-KONTO-ID:role/DITT-ROLLNAMN
```

**`.env`**
```
JWT_SECRET=en-lång-hemlig-sträng
```

### 6. Seeda menyn (bara en gång)

```bash
npm run seed
```

Det ska skriva ut `Done! Seeded 20 menu items.`

> ⚠️ Kör bara seed **en gång**. Varje körning skapar nya id:n, så en andra körning ger dubbletter. Har det blivit fel: radera raderna i **Explore table items** (radera inte hela tabellen) och kör seed igen.

Menyn hämtas från `data/menu.mts`. Bilderna ligger i en gemensam, publik S3-bucket, så du behöver inte skapa någon egen bucket.

### 7. Deploya

```bash
npm run deploy
```

När deployen är klar skrivs era endpoints ut. Testa menyn i webbläsaren:

- `https://<din-api-url>/menu` – hela menyn
- `https://<din-api-url>/menu?category=food` – bara mat
- `https://<din-api-url>/menu?category=drinks` – bara dryck

### Scripts

| Kommando | Vad det gör |
|---|---|
| `npm run check` | Kontrollerar TypeScript-koden efter fel |
| `npm run seed` | Fyller `cantina-db` med menyn |
| `npm run deploy` | Laddar upp lambda-funktionerna till AWS |
| `npm run package` | Bygger deploy-paketet utan att ladda upp det |

### Vanliga fel

| Fel | Lösning |
|---|---|
| `ERR_MODULE_NOT_FOUND` | Fel sökväg i en import, kolla att filen finns där importen pekar |
| `ResourceNotFoundException` | Tabellen heter något annat eller ligger i fel region |
| `AccessDeniedException` | IAM-rollen i `config.yml` saknar behörighet till DynamoDB |
| `The security token included in the request is invalid` | Kör `aws configure` igen med giltiga nycklar |
