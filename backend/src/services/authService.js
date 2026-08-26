const prisma = require('../lib/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('../config/env');

const login = async (email, password) => {
  const admin = await prisma.adminUser.findUnique({ where: { email } });
  
  if (!admin) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);
  
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    { id: admin.id, email: admin.email, name: admin.name },
    env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  return {
    token,
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
    }
  };
};

module.exports = {
  login,
};
