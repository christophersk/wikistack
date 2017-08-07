var sequelize = require('sequelize');
var db = new sequelize('postgres://localhost:5432/wikistack');
var marked = require('marked');

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
  },
  tags: {
    type: sequelize.ARRAY(sequelize.TEXT),
    defaultValue: [],
    set(val) {
      this.setDataValue('tags', val.split(/\s*,\s*/))
    }
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
    },
    renderedContent() {
      return marked(this.content.replace(/\[\[(.*?)\]\]/g, '[$1](/wiki/$1)'));
    }
  }
});

Page.findByTag = function(tag) {
  return Page.findAll({
    where: {
      tags: { $overlap: [tag] }
    }
  });
};

Page.prototype.findSimilar = function() {
  return Page.findAll({
    where: {
      tags: { $overlap: this.tags },
      id: { $ne: this.id }
    }
  });
};

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

Page.belongsTo(User, { as: 'author' });

module.exports = {
  Page: Page,
  User: User,
  db
};
