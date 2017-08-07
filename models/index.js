var sequelize = require('sequelize');
var db = new sequelize('postgres://localhost:5432/wikistack');

function generateUrlTitle (title) {
  if (!title) return Math.random().toString(36).substring(2, 7);
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

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
  hooks: {
    beforeValidate: (page, options) => {
      page.urlTitle = generateUrlTitle(page.title);
    }
  },
  getterMethods: {
    route() {
      return '/wiki/' + this.urlTitle;
    }
  }
});

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
