const mysql = require('mysql2/promise');
const concat = require('concat-stream');
const fs = require('fs');
const pump = require('pump');
const fastify = require('fastify')({
  logger: true
});

fastify.register(require('fastify-multipart'));

let con;

const generateResource = (name) => {
  fastify.get(`/${name}`, async (request, reply) => {
    const [rows, _] = await con.query(`select * from ${name};`);
    const result = rows.map(row => ({
      title: row.title,
      link: row.link,
      description: row.description
    }));

    reply.header('Access-Control-Allow-Origin', '*').type('application/json').code(200);
    return { [name]: result };
  });

  fastify.post(`/${name}/edit`, async (request, reply) => {
    const items = JSON.parse(request.body);
    await con.query(`truncate table ${name};`);
    asyncForEach(items, async (item, i) => {
      await con.query(
        `INSERT INTO ${name} (id, title, link, description) VALUES (?, ?, ?, ?);`,
        [i, item.title, item.link, item.description]);
    });

    reply.header('Access-Control-Allow-Origin', '*').type('application/json').code(200);
    return { message: 'OK' };
  });
}

const generateArchives = () => {
  // fastify.get('/uploads', async (req, reply) => {

  // });


  fastify.post('/upload', async (req, reply) => {
    await (new Promise((res, rej) => {
      req.multipart((field, file, filename, encoding, mimetype) => {
        console.log(filename);
        pump(file, fs.createWriteStream(`uploads/${filename}`));
      }, (err) => {
        console.log('upload completed', err);
        res();
      });
    }));

    reply.header('Access-Control-Allow-Origin', '*').type('application/json').code(200);
    return { message: 'OK' };
  });

  fastify.get(`/archive`, async (request, reply) => {
    const [rows, _] = await con.query(`select * from archives;`);
    const result = rows.map(row => ({
      title: row.title,
      link: row.downloads,
      description: row.description
    }));

    reply.header('Access-Control-Allow-Origin', '*').type('application/json').code(200);
    return { archive: result };
  });

  fastify.post(`/archive/edit`, async (request, reply) => {
    const items = JSON.parse(request.body);
    console.log(items);
    await con.query(`truncate table archives;`);
    asyncForEach(items, async (item, i) => {
      const downloads = item.downloads.map(d => `/uploads/${d}`).join(',');
      await con.query(
        `INSERT INTO archives (id, title, downloads, description) VALUES (?, ?, ?, ?);`,
        [i, item.title, downloads, item.description]);
    });

    reply.header('Access-Control-Allow-Origin', '*').type('application/json').code(200);
    return { message: 'OK' };
  });
}

const asyncForEach = async (arr, func) => {
  for (let i = 0; i < arr.length; i++) {
    await func(arr[i], i, arr);
  }
}

(async () => {

  con = await mysql.createConnection({
    host: "localhost",
    user: "dallenjs",
    password: "password",
    database: "dallenjs",
  });

  generateResource('projects');
  generateResource('tools');
  generateArchives();

  fastify.listen(3030, (err, address) => {
    if (err) throw err
    fastify.log.info(`server listening on ${address}`)
  })
})();
