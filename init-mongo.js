db = db.getSiblingDB('sportinet_db');
db.createUser({
  user: 'sportinetadmin',
  pwd: 'password',
  roles: [
    {
      role: 'readWrite',
      db: 'sportinet_db'
    }
  ]
});
