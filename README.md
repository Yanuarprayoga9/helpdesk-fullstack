# Helpdesk 
## <a name="links">🔗 Assets</a>

- Figma Link [https://www.figma.com/design/rL1fkmMtbZAIhXeXkqrzo7/helpdesk-tugas-akhir?node-id=1-233&p=f&t=zSxplxTe9BDdIfta-0](https://www.figma.com/design/rL1fkmMtbZAIhXeXkqrzo7/helpdesk-tugas-akhir?node-id=1-233&p=f&t=zSxplxTe9BDdIfta-0)

- Database Schema Link [https://app.diagrams.net/#G16yTuzhCDS9O6PCf7xJ0kDI0s_64QTUV_#%7B%22pageId%22%3A%22R2lEEEUBdFMjLlhIrx00%22%7D](https://app.diagrams.net/#G16yTuzhCDS9O6PCf7xJ0kDI0s_64QTUV_#%7B%22pageId%22%3A%22R2lEEEUBdFMjLlhIrx00%22%7D)
- Database Relations Link [here](./docs/RELATIONS.md)
- Database ERD Link [here](./docs/erd.png)
- Plan process business [here](https://docs.google.com/document/d/12VTB6BW_HVXTWkGgP6lG2hb2ow1Sk5BGvF6ptn0XCNY/edit?tab=t.0)


### Prerequisites

**Node version 18.7.x**

### Cloning the repository

```shell
git https://github.com/Yanuarprayoga9/helpdesk-fullstack.git
```

### Install packages

```shell
npm i
```

### Setup .env file 
```shell
cp .env.example .env 
```


```js
DATABASE_URL=
DIRECT_URL=


RESEND_API_KEY=

NEXT_PUBLIC_APP_URL=
```

### Setup Prisma
```shell
npm i -D prisma
npm i @prisma/client
npx prisma generate
npx prisma migrate 
npx prisma db push
```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |
