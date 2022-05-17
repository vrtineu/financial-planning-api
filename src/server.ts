import app from '.';

const port = process.env.PORT;
if (!port) throw new Error('Configurar .env');

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
