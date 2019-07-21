const mysql = require('mysql2/promise');
const concat = require('concat-stream');
const fs = require('fs');
const pump = require('pump');
const fastify = require('fastify')({
  logger: true
});

fastify.register(require('fastify-multipart'));

let sqlConnection;

let config;
if(process.env.NODE_ENV === 'production') {
  config = JSON.parse(fs.readFileSync('config.json'));
} else {
  config = JSON.parse(fs.readFileSync('config.dev.json'));
}

const adminCookies = ['mcq7pvg8rg1ak7plubh4y'];

const isAdmin = (req) => {
  return req.query && adminCookies.includes(req.query.auth);
}

const generateResource = (name) => {
  fastify.get(`/${name}`, async (request, reply) => {
    const [rows, _] = await sqlConnection.query(`select * from ${name};`);
    const result = rows.map(row => ({
      title: row.title,
      link: row.link,
      description: row.description
    }));

    reply.header('Access-Control-Allow-Origin', '*').type('application/json').code(200);
    return { [name]: result };
  });

  fastify.post(`/${name}/edit`, async (request, reply) => {
    if(!isAdmin(request)) {
      reply.header('Access-Control-Allow-Origin', '*').type('application/json').code(403);
      return { message: 'FAILED' };
    }
    const items = JSON.parse(request.body);
    await sqlConnection.query(`truncate table ${name};`);
    asyncForEach(items, async (item, i) => {
      await sqlConnection.query(
        `INSERT INTO ${name} (id, title, link, description) VALUES (?, ?, ?, ?);`,
        [i, item.title, item.link, item.description]);
    });

    reply.header('Access-Control-Allow-Origin', '*').type('application/json').code(200);
    return { message: 'OK' };
  });
}

const generateArchives = () => {
  fastify.get('/uploads/:fileName', (req, reply) => {
    const stream = fs.createReadStream(`uploads/${req.params.fileName}`, 'utf8');
    reply.header('Access-Control-Allow-Origin', '*').code(200).send(stream);
  });

  fastify.post('/login', async (req, reply) => {
    const body = JSON.parse(req.body);
    if(body.username === config.admin.username &&
      body.password === config.admin.password) {
        const totallySecureCookie = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        adminCookies.push(totallySecureCookie);
        reply.header('Access-Control-Allow-Origin', '*').code(200);
        return { message: 'OK', cookie: totallySecureCookie };
    }

    reply.header('Access-Control-Allow-Origin', '*').type('application/json').code(403);
    return { message: 'FAILED' };
  });


  fastify.post('/upload', async (req, reply) => {
    if(!isAdmin(req)) {
      reply.header('Access-Control-Allow-Origin', '*').type('application/json').code(403);
      return { message: 'FAILED' };
    }
    await (new Promise((res, rej) => {
      req.multipart((field, file, filename, encoding, mimetype) => {
        pump(file, fs.createWriteStream(`uploads/${filename}`));
      }, (err) => {
        console.log('upload completed, error:', err);
        res();
      });
    }));

    reply.header('Access-Control-Allow-Origin', '*').type('application/json').code(200);
    return { message: 'OK' };
  });

  fastify.get(`/archive`, async (request, reply) => {
    const [rows, _] = await sqlConnection.query(`select * from archives;`);
    const result = rows.map(row => ({
      title: row.title,
      link: row.downloads,
      description: row.description
    }));

    reply.header('Access-Control-Allow-Origin', '*').type('application/json').code(200);
    return { archive: result };
  });

  fastify.post(`/archive/edit`, async (request, reply) => {
    if(!isAdmin(request)) {
      reply.header('Access-Control-Allow-Origin', '*').type('application/json').code(403);
      return { message: 'FAILED' };
    }
    const items = JSON.parse(request.body);
    await sqlConnection.query(`truncate table archives;`);
    asyncForEach(items, async (item, i) => {
      const downloads = item.downloads.map(d => `${config.domain}/uploads/${d}`).join(',');
      await sqlConnection.query(
        `INSERT INTO archives (id, title, downloads, description) VALUES (?, ?, ?, ?);`,
        [i, item.title, downloads, item.description]);
    });

    reply.header('Access-Control-Allow-Origin', '*').type('application/json').code(200);
    return { message: 'OK' };
  });
}

const generateHomePage = () => {
  const langExclude = ['HTML', 'CSS'];

  let githubCache = null;

  const calcGithubStats = () => {
    const githubStats = JSON.parse(fs.readFileSync('githubStats.json'));
    let totalCommits = 0;
    let adds = 0;
    let dels = 0;
    const langStats = {};
    Object.keys(githubStats).forEach(repo => {
      const stats = githubStats[repo];
      const {commits, additions, deletions} = stats.raw;
      totalCommits += commits;
      adds += additions;
      dels += deletions;

      Object.keys(stats.langDiv).forEach(lang => {
        if(langExclude.includes(lang)) {
          return;
        }

        const percent = parseFloat(stats.langDiv[lang].replace('%', ''))/100.0;
        if(langStats[lang] === undefined) {
          langStats[lang] = 0;
        }
        langStats[lang] += additions * percent;
      });
    });

    githubCache = {
      commits: totalCommits,
      additions: adds,
      deletions: dels,
      repos: Object.keys(githubStats).length,
      langStats: langStats,
    };
  }

  fastify.get(`/github`, async (request, reply) => {
    if(githubCache === null) {
      calcGithubStats();
    }

    reply.header('Access-Control-Allow-Origin', '*').type('application/json').code(200);
    return { stats: githubCache };
  });
};

const asyncForEach = async (arr, func) => {
  for (let i = 0; i < arr.length; i++) {
    await func(arr[i], i, arr);
  }
}

(async () => {

  sqlConnection = await mysql.createConnection(config.sqlConn);

  generateResource('projects');
  generateResource('tools');
  generateArchives();
  generateHomePage();

  fastify.listen(config.port, (err, address) => {
    if (err) throw err
    fastify.log.info(`server listening on ${address}`)
  })
})();
