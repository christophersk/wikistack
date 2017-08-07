var sequelize = require('sequelize');
var db = new sequelize('postgres://localhost:5432/wikistack');

const Page = db.define('page', {
  title: {
    type: sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: sequelize.STRING,
    allowNull: false
  },
  content: {
    type: sequelize.TEXT,
    allowNull: false
  },
  status: sequelize.ENUM('open', 'closed'),
  date: {
    type: sequelize.DATE,
    defaultValue: sequelize.NOW
  }
}, {
  getterMethods: {
    route() {
      return '/wiki/' + this.urlTitle;
    }
  }
})

const User = db.define('user', {
  name: {
    type: sequelize.STRING,
    allowNull: false
  },
  email: {
    type: sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
})

module.exports = {
  Page: Page,
  User: User,
  db
};
