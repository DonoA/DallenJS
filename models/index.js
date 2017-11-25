var mysql = require('mysql');
var Sequelize = require('sequelize');
var debug = require('debug')('DallenJS:server');
var fs = require('fs');

var ConnStr = JSON.parse(fs.readFileSync('config.json', 'utf8')).sqlConn;

var sequelize = new Sequelize(
  ConnStr.database,
  ConnStr.user,
  ConnStr.password,
  {
    logging: console.log,
    host: ConnStr.host
  }
);

var User = sequelize.define('users', {
    email: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    },
    icon: {
      type: Sequelize.STRING
    },
    admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
}, {
    freezeTableName: true,
    paranoid: false
});

var ProjectType = sequelize.define('project_types', {
    title: {
        type: Sequelize.STRING
    },
    prefix: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    paranoid: false
});

var Project = sequelize.define('projects', {
    name: {
        type: Sequelize.STRING
    },
    url: {
        type: Sequelize.STRING
    },
    repo: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT
    },
    readme: {
        type: Sequelize.STRING
    }
}, {
    instanceMethods: {
        getPath: function(type) {
            return "/projects/" + type.prefix + "/" + this.url;
        }
    }
});

ProjectType.hasMany(Project);
Project.belongsTo(ProjectType);

var Archive = sequelize.define('archives', {
    name: {
        type: Sequelize.STRING
    },
    prefix: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT
    }
}, {
    freezeTableName: true,
    paranoid: false
});

var Download = sequelize.define('downloads', {
    name: {
        type: Sequelize.STRING
    },
    url: {
        type: Sequelize.TEXT
    }
}, {
    freezeTableName: true,
    paranoid: false
});

Archive.hasMany(Download);
Download.belongsTo(Archive);

function init(){
    sequelize.sync();
};

module.exports = {
    init: init,
    sequelize: sequelize,
    Users: User,
    ProjectTypes: ProjectType,
    Projects: Project,
    Archives: Archive,
    Downloads: Download
};
